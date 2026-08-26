export interface ImageInfo {
  width: number;
  height: number;
  size: number; // bytes
  format: string;
  name: string;
  dpi?: number;
}

export interface ProcessingResult {
  blob: Blob;
  width: number;
  height: number;
  size: number;
  format: string;
  quality: number;
  dataUrl: string;
  dpi?: number;
}

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TextOverlay {
  name?: string;
  date?: string;
  dop?: string;
  dob?: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
  opacity?: number;
}

export interface ValidationResult {
  valid: boolean;
  checks: {
    dimensions: boolean;
    fileSize: boolean;
    format: boolean;
  };
  details: {
    width: number;
    height: number;
    size: number;
    format: string;
  };
}

export interface Requirements {
  width: number;
  height: number;
  minKB: number;
  maxKB: number;
  format: string;
}

export async function getImageInfo(file: File): Promise<ImageInfo> {
  const img = await loadImage(file);
  return {
    width: img.width,
    height: img.height,
    size: file.size,
    format: file.type,
    name: file.name
  };
}

export function loadImage(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

export function getMimeType(format?: string): string {
  if (!format) return 'image/jpeg';
  const fmt = format.toLowerCase();
  if (fmt.includes('png')) return 'image/png';
  if (fmt.includes('webp')) return 'image/webp';
  if (fmt.includes('jpg') || fmt.includes('jpeg')) return 'image/jpeg';
  return 'image/jpeg';
}

/**
 * Encodes DPI metadata into JPEG (JFIF header) or PNG (pHYs chunk) binary blob.
 */
export async function setDPIInBlob(blob: Blob, dpi: number): Promise<Blob> {
  if (!dpi || dpi <= 0) return blob;
  const mimeType = blob.type;

  try {
    const buffer = await blob.arrayBuffer();
    const view = new DataView(buffer);

    if (mimeType === 'image/jpeg') {
      const bytes = new Uint8Array(buffer);
      // Check JPEG SOI marker (0xFFD8)
      if (bytes[0] === 0xff && bytes[1] === 0xd8) {
        // Check if APP0 marker exists at byte 2
        if (bytes[2] === 0xff && bytes[3] === 0xe0) {
          // JFIF APP0 segment: overwrite unit (byte 13) to 1 (dpi) and density bytes 14-17
          bytes[13] = 1; // dots per inch
          view.setUint16(14, dpi, false); // X density
          view.setUint16(16, dpi, false); // Y density
          return new Blob([bytes], { type: 'image/jpeg' });
        } else {
          // Inject APP0 header right after SOI
          const app0 = new Uint8Array([
            0xff, 0xe0, 0x00, 0x10, // APP0 marker + length (16)
            0x4a, 0x46, 0x49, 0x46, 0x00, // "JFIF\0"
            0x01, 0x02, // Version 1.02
            0x01, // Units: 1 = dots per inch
            (dpi >> 8) & 0xff, dpi & 0xff, // Xdensity
            (dpi >> 8) & 0xff, dpi & 0xff, // Ydensity
            0x00, 0x00 // Thumbnail W, H
          ]);
          const newBytes = new Uint8Array(bytes.length + app0.length);
          newBytes.set(bytes.subarray(0, 2), 0);
          newBytes.set(app0, 2);
          newBytes.set(bytes.subarray(2), 2 + app0.length);
          return new Blob([newBytes], { type: 'image/jpeg' });
        }
      }
    } else if (mimeType === 'image/png') {
      const bytes = new Uint8Array(buffer);
      // PNG Signature check: 89 50 4E 47 0D 0A 1A 0A
      if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
        const ppm = Math.round(dpi * 39.3700787); // pixels per meter
        // Construct pHYs chunk: 4 bytes length (9), 4 bytes type ('pHYs'), 4 bytes X, 4 bytes Y, 1 byte unit (1), 4 bytes CRC
        const phys = new Uint8Array(21);
        const physView = new DataView(phys.buffer);
        physView.setUint32(0, 9, false); // Length
        phys[4] = 0x70; phys[5] = 0x48; phys[6] = 0x59; phys[7] = 0x73; // 'pHYs'
        physView.setUint32(8, ppm, false);
        physView.setUint32(12, ppm, false);
        phys[16] = 1; // meter unit

        // Calculate CRC32 for 'pHYs' + data (bytes 4..16)
        let crc = 0xffffffff;
        for (let i = 4; i < 17; i++) {
          crc ^= phys[i];
          for (let j = 0; j < 8; j++) {
            crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
          }
        }
        crc = (crc ^ 0xffffffff) >>> 0;
        physView.setUint32(17, crc, false);

        // Find position of IHDR (usually at byte 8, length 13 + 12 = 25 bytes => byte 33)
        let insertPos = 33;
        const newBytes = new Uint8Array(bytes.length + phys.length);
        newBytes.set(bytes.subarray(0, insertPos), 0);
        newBytes.set(phys, insertPos);
        newBytes.set(bytes.subarray(insertPos), insertPos + phys.length);
        return new Blob([newBytes], { type: 'image/png' });
      }
    }
  } catch (err) {
    console.warn('Could not inject DPI into blob:', err);
  }

  return blob;
}

function blobToResult(blob: Blob, width: number, height: number, quality: number, dpi?: number): Promise<ProcessingResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        blob,
        width,
        height,
        size: blob.size,
        format: blob.type,
        quality,
        dataUrl: reader.result as string,
        dpi,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export interface ProcessOptions {
  width?: number;
  height?: number;
  scalePercent?: number;
  format?: string;
  targetKB?: number;
  quality?: number;
  backgroundColor?: string;
  rotation?: number; // degrees: 0, 90, 180, 270, or custom angle
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  crop?: CropRect;
  dpi?: number;
}

export async function processImage(file: File | Blob, options: ProcessOptions = {}): Promise<ProcessingResult> {
  const img = await loadImage(file);

  // 1. Create intermediate canvas for Crop, Rotate, Flip
  let srcW = img.width;
  let srcH = img.height;

  let cropX = 0;
  let cropY = 0;
  let cropW = srcW;
  let cropH = srcH;

  if (options.crop && options.crop.width > 0 && options.crop.height > 0) {
    cropX = Math.max(0, Math.min(srcW - 1, options.crop.x));
    cropY = Math.max(0, Math.min(srcH - 1, options.crop.y));
    cropW = Math.min(srcW - cropX, options.crop.width);
    cropH = Math.min(srcH - cropY, options.crop.height);
  }

  const rotation = (options.rotation || 0) % 360;
  const rad = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(rad));
  const cos = Math.abs(Math.cos(rad));

  // Canvas bounds after rotation
  const rotatedW = Math.max(1, Math.round(cropW * cos + cropH * sin));
  const rotatedH = Math.max(1, Math.round(cropW * sin + cropH * cos));

  const transformCanvas = document.createElement('canvas');
  transformCanvas.width = rotatedW;
  transformCanvas.height = rotatedH;
  const transformCtx = transformCanvas.getContext('2d')!;

  transformCtx.save();
  transformCtx.translate(rotatedW / 2, rotatedH / 2);
  if (rotation !== 0) {
    transformCtx.rotate(rad);
  }

  const scaleX = options.flipHorizontal ? -1 : 1;
  const scaleY = options.flipVertical ? -1 : 1;
  if (scaleX !== 1 || scaleY !== 1) {
    transformCtx.scale(scaleX, scaleY);
  }

  transformCtx.drawImage(
    img,
    cropX, cropY, cropW, cropH,
    -cropW / 2, -cropH / 2, cropW, cropH
  );
  transformCtx.restore();

  // 2. Final target dimensions
  let targetWidth = options.width;
  let targetHeight = options.height;

  if (options.scalePercent && options.scalePercent > 0 && (!options.width || !options.height)) {
    const factor = options.scalePercent / 100;
    targetWidth = Math.max(1, Math.round(rotatedW * factor));
    targetHeight = Math.max(1, Math.round(rotatedH * factor));
  }

  const finalW = targetWidth && targetWidth > 0 ? targetWidth : rotatedW;
  const finalH = targetHeight && targetHeight > 0 ? targetHeight : rotatedH;
  const mimeType = getMimeType(options.format || (file as File).type);
  const targetKB = options.targetKB && options.targetKB > 0 ? options.targetKB : 0;

  if (targetKB > 0) {
    // Convert transformCanvas to temporary blob for compressToRange
    const tempBlob = await new Promise<Blob>((resolve) => transformCanvas.toBlob((b) => resolve(b!), mimeType, 0.95));
    const compressed = await compressToRange(
      new File([tempBlob], 'temp.jpg', { type: mimeType }),
      Math.max(1, targetKB * 0.85),
      targetKB,
      finalW,
      finalH,
      mimeType
    );
    if (options.dpi) {
      compressed.blob = await setDPIInBlob(compressed.blob, options.dpi);
      compressed.dpi = options.dpi;
    }
    return compressed;
  }

  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = finalW;
  finalCanvas.height = finalH;
  const finalCtx = finalCanvas.getContext('2d')!;

  if (mimeType === 'image/jpeg' || options.backgroundColor) {
    finalCtx.fillStyle = options.backgroundColor || '#FFFFFF';
    finalCtx.fillRect(0, 0, finalW, finalH);
  }

  finalCtx.drawImage(transformCanvas, 0, 0, finalW, finalH);

  const quality = options.quality ?? 0.92;
  let blob = await new Promise<Blob>((resolve) => finalCanvas.toBlob((b) => resolve(b!), mimeType, quality));

  if (options.dpi) {
    blob = await setDPIInBlob(blob, options.dpi);
  }

  return blobToResult(blob, finalW, finalH, quality, options.dpi);
}

export async function resizeImage(file: File, targetWidth: number, targetHeight: number, format?: string): Promise<ProcessingResult> {
  return processImage(file, { width: targetWidth, height: targetHeight, format });
}

export async function compressToSize(file: File, targetKB: number, format?: string, width?: number, height?: number): Promise<ProcessingResult> {
  return processImage(file, { targetKB, format, width, height });
}

export async function compressToRange(
  file: File,
  minKB: number,
  maxKB: number,
  targetWidth: number,
  targetHeight: number,
  format?: string
): Promise<ProcessingResult> {
  const img = await loadImage(file);
  const w = targetWidth > 0 ? targetWidth : img.width;
  const h = targetHeight > 0 ? targetHeight : img.height;

  const mimeType = getMimeType(format || file.type);
  const maxBytes = Math.max(1024, Math.floor(maxKB * 1024 - 50));
  const minBytes = Math.max(0, Math.floor(minKB * 1024));

  let currentWidth = w;
  let currentHeight = h;

  const canvas = document.createElement('canvas');
  canvas.width = currentWidth;
  canvas.height = currentHeight;
  const ctx = canvas.getContext('2d')!;

  const renderCanvas = (cw: number, ch: number) => {
    canvas.width = cw;
    canvas.height = ch;
    if (mimeType === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, cw, ch);
    } else {
      ctx.clearRect(0, 0, cw, ch);
    }
    ctx.drawImage(img, 0, 0, cw, ch);
  };

  renderCanvas(currentWidth, currentHeight);

  let bestBlob: Blob | null = null;
  let bestQuality = 0.92;

  if (mimeType === 'image/png') {
    let blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), mimeType));
    let iterations = 0;
    while (blob.size > maxBytes && iterations < 50 && currentWidth > 15 && currentHeight > 15) {
      currentWidth = Math.max(10, Math.floor(currentWidth * 0.9));
      currentHeight = Math.max(10, Math.floor(currentHeight * 0.9));
      renderCanvas(currentWidth, currentHeight);
      blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), mimeType));
      iterations++;
    }
    bestBlob = blob;
    bestQuality = 1.0;
  } else {
    let low = 0.01;
    let high = 0.98;
    let quality = 0.85;
    let iterations = 0;

    while (iterations < 30) {
      const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), mimeType, quality));
      const size = blob.size;

      if (size <= maxBytes && size >= minBytes) {
        bestBlob = blob;
        bestQuality = quality;
        break;
      }

      if (size > maxBytes) {
        high = quality;
        quality = low + (high - low) / 2;

        if (quality <= 0.05 && currentWidth > 20 && currentHeight > 20) {
          currentWidth = Math.max(15, Math.floor(currentWidth * 0.88));
          currentHeight = Math.max(15, Math.floor(currentHeight * 0.88));
          renderCanvas(currentWidth, currentHeight);
          quality = 0.75;
          low = 0.01;
          high = 0.98;
        }
      } else {
        bestBlob = blob;
        bestQuality = quality;
        low = quality;
        quality = low + (high - low) / 2;
      }
      iterations++;
    }

    if (!bestBlob || bestBlob.size > maxBytes) {
      let fallbackQuality = 0.85;
      while (fallbackQuality >= 0.02) {
        const testBlob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), mimeType, fallbackQuality));
        if (testBlob.size <= maxBytes) {
          bestBlob = testBlob;
          bestQuality = fallbackQuality;
          break;
        }
        fallbackQuality -= 0.05;
      }
    }
  }

  if (!bestBlob || bestBlob.size > maxBytes) {
    let finalBlob = bestBlob || (await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), mimeType, 0.5)));
    let guard = 0;
    while (finalBlob.size > maxBytes && guard < 40 && currentWidth > 10 && currentHeight > 10) {
      currentWidth = Math.max(10, Math.floor(currentWidth * 0.85));
      currentHeight = Math.max(10, Math.floor(currentHeight * 0.85));
      renderCanvas(currentWidth, currentHeight);
      finalBlob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), mimeType, mimeType === 'image/jpeg' ? 0.7 : 0.92));
      guard++;
    }
    bestBlob = finalBlob;
  }

  return blobToResult(bestBlob, currentWidth, currentHeight, bestQuality);
}

export async function convertFormat(
  file: File,
  outputFormat: 'image/jpeg' | 'image/png' | 'image/webp',
  options?: { width?: number; height?: number; scalePercent?: number; targetKB?: number }
): Promise<ProcessingResult> {
  return processImage(file, {
    format: outputFormat,
    width: options?.width,
    height: options?.height,
    scalePercent: options?.scalePercent,
    targetKB: options?.targetKB,
  });
}

export async function cropImage(file: File, cropRect: CropRect): Promise<ProcessingResult> {
  return processImage(file, { crop: cropRect });
}

export async function rotateImage(file: File, degrees: number): Promise<ProcessingResult> {
  return processImage(file, { rotation: degrees });
}

export async function flipImage(file: File, direction: 'horizontal' | 'vertical'): Promise<ProcessingResult> {
  return processImage(file, {
    flipHorizontal: direction === 'horizontal',
    flipVertical: direction === 'vertical',
  });
}

/**
 * Scans image pixels and detects non-white bounding box for handwritten signature auto-trimming.
 */
export async function autoCropSignature(
  file: File | Blob,
  threshold: number = 240,
  padding: number = 12
): Promise<CropRect | null> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let minX = canvas.width;
  let minY = canvas.height;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Check if pixel is dark/non-white or has alpha
      if (a > 30 && (r < threshold || g < threshold || b < threshold)) {
        found = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!found) return null;

  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(canvas.width, maxX + padding);
  maxY = Math.min(canvas.height, maxY + padding);

  return {
    x: minX,
    y: minY,
    width: Math.max(10, maxX - minX),
    height: Math.max(10, maxY - minY),
  };
}

function formatOverlayDate(val?: string, prefix: 'DOP' | 'DOB' = 'DOP'): string {
  if (!val || !val.trim()) return '';
  let trimmed = val.trim();
  
  if (trimmed.toUpperCase().startsWith('DOP:')) {
    trimmed = trimmed.slice(4).trim();
  } else if (trimmed.toUpperCase().startsWith('DOB:')) {
    trimmed = trimmed.slice(4).trim();
  }

  const isoMatch = trimmed.match(/^(\d{4})[-/.](\d{2})[-/.](\d{2})$/);
  if (isoMatch) {
    return `${prefix}: ${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
  }

  const dmyMatch = trimmed.match(/^(\d{2})[-/.](\d{2})[-/.](\d{4})$/);
  if (dmyMatch) {
    return `${prefix}: ${dmyMatch[1]}/${dmyMatch[2]}/${dmyMatch[3]}`;
  }

  return `${prefix}: ${trimmed}`;
}

export async function addTextOverlay(file: File, overlay: TextOverlay): Promise<ProcessingResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  const linesToDraw: string[] = [];

  if (overlay.name && overlay.name.trim()) {
    linesToDraw.push(overlay.name.trim().toUpperCase());
  }

  const dopVal = overlay.dop ?? overlay.date;
  if (dopVal && dopVal.trim()) {
    linesToDraw.push(formatOverlayDate(dopVal, 'DOP'));
  }

  if (overlay.dob && overlay.dob.trim()) {
    linesToDraw.push(formatOverlayDate(overlay.dob, 'DOB'));
  }

  const lineCount = linesToDraw.length;

  if (lineCount > 0) {
    const stripHeight = Math.max(
      36,
      Math.round(canvas.height * (lineCount === 3 ? 0.20 : lineCount === 2 ? 0.15 : 0.09))
    );
    
    const isTop = overlay.position.startsWith('top');
    const stripY = isTop ? 0 : canvas.height - stripHeight;

    ctx.save();
    ctx.fillStyle = overlay.backgroundColor || '#FFFFFF';
    ctx.globalAlpha = overlay.opacity ?? 1.0;
    ctx.fillRect(0, stripY, canvas.width, stripHeight);
    ctx.restore();

    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = Math.max(1, Math.round(canvas.height / 350));
    ctx.beginPath();
    if (isTop) {
      ctx.moveTo(0, stripHeight);
      ctx.lineTo(canvas.width, stripHeight);
    } else {
      ctx.moveTo(0, stripY);
      ctx.lineTo(canvas.width, stripY);
    }
    ctx.stroke();

    const paddingX = Math.max(12, Math.round(canvas.width * 0.05));
    const maxAvailableWidth = canvas.width - (paddingX * 2);

    let fontSize = Math.max(
      10,
      Math.round(stripHeight / (lineCount === 3 ? 3.6 : lineCount === 2 ? 2.6 : 1.8))
    );

    ctx.font = `bold ${fontSize}px Arial, -apple-system, sans-serif`;
    const maxMeasuredWidth = Math.max(...linesToDraw.map((l) => ctx.measureText(l).width));

    if (maxMeasuredWidth > maxAvailableWidth && maxMeasuredWidth > 0) {
      const scale = maxAvailableWidth / maxMeasuredWidth;
      fontSize = Math.max(9, Math.floor(fontSize * scale * 0.95));
      ctx.font = `bold ${fontSize}px Arial, -apple-system, sans-serif`;
    }

    ctx.fillStyle = overlay.fontColor || '#000000';
    ctx.textBaseline = 'middle';

    if (overlay.position.endsWith('left')) {
      ctx.textAlign = 'left';
    } else if (overlay.position.endsWith('right')) {
      ctx.textAlign = 'right';
    } else {
      ctx.textAlign = 'center';
    }

    let textX = canvas.width / 2;
    if (overlay.position.endsWith('left')) textX = paddingX;
    if (overlay.position.endsWith('right')) textX = canvas.width - paddingX;

    if (lineCount === 3) {
      const positionsY = [
        stripY + Math.round(stripHeight * 0.22),
        stripY + Math.round(stripHeight * 0.50),
        stripY + Math.round(stripHeight * 0.78),
      ];
      linesToDraw.forEach((line, idx) => {
        ctx.fillText(line, textX, positionsY[idx], maxAvailableWidth);
      });
    } else if (lineCount === 2) {
      const positionsY = [
        stripY + Math.round(stripHeight * 0.32),
        stripY + Math.round(stripHeight * 0.72),
      ];
      linesToDraw.forEach((line, idx) => {
        ctx.fillText(line, textX, positionsY[idx], maxAvailableWidth);
      });
    } else {
      const lineY = stripY + Math.round(stripHeight * 0.50);
      ctx.fillText(linesToDraw[0], textX, lineY, maxAvailableWidth);
    }
  }
  
  const mimeType = getMimeType(file.type);
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), mimeType, 0.95));
  return blobToResult(blob, canvas.width, canvas.height, 0.95);
}

export async function validateOutput(blob: Blob, requirements: Requirements): Promise<ValidationResult> {
  const img = await loadImage(new File([blob], 'validate.jpg', { type: blob.type }));
  const sizeKB = blob.size / 1024;
  
  const dimValid = img.width === requirements.width && img.height === requirements.height;
  const sizeValid = sizeKB >= requirements.minKB && sizeKB <= requirements.maxKB;
  const formatValid = getMimeType(blob.type) === getMimeType(requirements.format);
  
  return {
    valid: dimValid && sizeValid && formatValid,
    checks: {
      dimensions: dimValid,
      fileSize: sizeValid,
      format: formatValid
    },
    details: {
      width: img.width,
      height: img.height,
      size: blob.size,
      format: blob.type
    }
  };
}

export async function processForExam(file: File, photo: Requirements, overlay?: TextOverlay): Promise<ProcessingResult> {
  let currentFile = file;
  if (overlay) {
    const res = await addTextOverlay(currentFile, overlay);
    currentFile = new File([res.blob], 'overlay.jpg', { type: res.format });
  }
  return compressToRange(currentFile, photo.minKB, photo.maxKB, photo.width, photo.height, photo.format);
}
