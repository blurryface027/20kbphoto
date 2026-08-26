export interface ImageInfo {
  width: number;
  height: number;
  size: number; // bytes
  format: string;
  name: string;
}

export interface ProcessingResult {
  blob: Blob;
  width: number;
  height: number;
  size: number;
  format: string;
  quality: number;
  dataUrl: string;
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

export function loadImage(file: File): Promise<HTMLImageElement> {
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

function getMimeType(format?: string): string {
  if (!format) return 'image/jpeg';
  if (format.includes('png')) return 'image/png';
  if (format.includes('webp')) return 'image/webp';
  return 'image/jpeg';
}

function blobToResult(blob: Blob, width: number, height: number, quality: number): Promise<ProcessingResult> {
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
        dataUrl: reader.result as string
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function resizeImage(file: File, targetWidth: number, targetHeight: number, format?: string): Promise<ProcessingResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  
  const mimeType = getMimeType(format || file.type);
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), mimeType, 0.92));
  return blobToResult(blob, targetWidth, targetHeight, 0.92);
}

export async function compressToSize(file: File, targetKB: number, format?: string): Promise<ProcessingResult> {
  return compressToRange(file, targetKB * 0.9, targetKB, -1, -1, format);
}

export async function compressToRange(file: File, minKB: number, maxKB: number, targetWidth: number, targetHeight: number, format?: string): Promise<ProcessingResult> {
  const img = await loadImage(file);
  const w = targetWidth > 0 ? targetWidth : img.width;
  const h = targetHeight > 0 ? targetHeight : img.height;
  
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  
  const mimeType = getMimeType(format || file.type);
  const minBytes = minKB * 1024;
  const maxBytes = maxKB * 1024;
  
  let low = 0.05;
  let high = 1.0;
  let quality = 0.92;
  let bestBlob: Blob | null = null;
  let bestQuality = quality;
  let iterations = 0;
  
  let currentWidth = w;
  let currentHeight = h;
  
  while (iterations < 25) {
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), mimeType, quality));
    const size = blob.size;
    
    if (size >= minBytes && size <= maxBytes) {
      bestBlob = blob;
      bestQuality = quality;
      break;
    }
    
    if (size > maxBytes) {
      high = quality;
      quality = low + (high - low) / 2;
      bestBlob = blob;
      bestQuality = quality;
      
      if (quality <= 0.06) {
        currentWidth = Math.floor(currentWidth * 0.95);
        currentHeight = Math.floor(currentHeight * 0.95);
        canvas.width = currentWidth;
        canvas.height = currentHeight;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, currentWidth, currentHeight);
        ctx.drawImage(img, 0, 0, currentWidth, currentHeight);
        quality = 0.8;
        low = 0.05;
        high = 1.0;
      }
    } else {
      low = quality;
      quality = low + (high - low) / 2;
      if (!bestBlob || Math.abs(size - (minBytes+maxBytes)/2) < Math.abs(bestBlob.size - (minBytes+maxBytes)/2)) {
         bestBlob = blob;
         bestQuality = quality;
      }
    }
    iterations++;
  }
  
  if (!bestBlob) {
    bestBlob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), mimeType, 0.92));
  }
  
  return blobToResult(bestBlob, currentWidth, currentHeight, bestQuality);
}

export async function convertFormat(file: File, outputFormat: 'image/jpeg' | 'image/png' | 'image/webp'): Promise<ProcessingResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), outputFormat, 0.92));
  return blobToResult(blob, img.width, img.height, 0.92);
}

export async function cropImage(file: File, cropRect: CropRect): Promise<ProcessingResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = cropRect.width;
  canvas.height = cropRect.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, cropRect.x, cropRect.y, cropRect.width, cropRect.height, 0, 0, cropRect.width, cropRect.height);
  const mimeType = getMimeType(file.type);
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), mimeType, 0.92));
  return blobToResult(blob, cropRect.width, cropRect.height, 0.92);
}

export async function rotateImage(file: File, degrees: number): Promise<ProcessingResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const rad = degrees * Math.PI / 180;
  const sin = Math.abs(Math.sin(rad));
  const cos = Math.abs(Math.cos(rad));
  
  canvas.width = Math.floor(img.width * cos + img.height * sin);
  canvas.height = Math.floor(img.width * sin + img.height * cos);
  
  const ctx = canvas.getContext('2d')!;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  
  const mimeType = getMimeType(file.type);
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), mimeType, 0.92));
  return blobToResult(blob, canvas.width, canvas.height, 0.92);
}

export async function flipImage(file: File, direction: 'horizontal' | 'vertical'): Promise<ProcessingResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  
  ctx.translate(direction === 'horizontal' ? canvas.width : 0, direction === 'vertical' ? canvas.height : 0);
  ctx.scale(direction === 'horizontal' ? -1 : 1, direction === 'vertical' ? -1 : 1);
  ctx.drawImage(img, 0, 0);
  
  const mimeType = getMimeType(file.type);
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), mimeType, 0.92));
  return blobToResult(blob, canvas.width, canvas.height, 0.92);
}

function formatOverlayDate(val?: string, prefix: 'DOP' | 'DOB' = 'DOP'): string {
  if (!val || !val.trim()) return '';
  let trimmed = val.trim();
  
  // Strip existing prefix if typed by user to standardize
  if (trimmed.toUpperCase().startsWith('DOP:')) {
    trimmed = trimmed.slice(4).trim();
  } else if (trimmed.toUpperCase().startsWith('DOB:')) {
    trimmed = trimmed.slice(4).trim();
  }

  // Case 1: YYYY-MM-DD / YYYY/MM/DD / YYYY.MM.DD (from <input type="date">)
  const isoMatch = trimmed.match(/^(\d{4})[-/.](\d{2})[-/.](\d{2})$/);
  if (isoMatch) {
    return `${prefix}: ${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
  }

  // Case 2: DD-MM-YYYY / DD.MM.YYYY / DD/MM/YYYY
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

    // Draw background strip (white by default for SSC/UPSC standards)
    ctx.save();
    ctx.fillStyle = overlay.backgroundColor || '#FFFFFF';
    ctx.globalAlpha = overlay.opacity ?? 1.0;
    ctx.fillRect(0, stripY, canvas.width, stripHeight);
    ctx.restore();

    // Draw subtle border line
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

    // Padding and max available width for text
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
