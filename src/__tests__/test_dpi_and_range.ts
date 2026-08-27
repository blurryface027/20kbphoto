import { readDPIFromBlob, setDPIInBlob, padBlobToMinBytes } from "../lib/imageProcessor";
import { exams } from "../data/exams";

async function runDpiAndRangeTests() {
  console.log("=== RUNNING DPI AND FILE SIZE RANGE VALIDATION TESTS ===");

  let errors = 0;

  // 1. Test DPI Binary Parsing and Injection (JPEG)
  for (const testDpi of [72, 96, 150, 200, 250, 300, 600]) {
    // Minimal JPEG binary SOI + APP0 + EOI
    const dummyJpeg = new Uint8Array([
      0xff, 0xd8, // SOI
      0xff, 0xe0, 0x00, 0x10, // APP0 len 16
      0x4a, 0x46, 0x49, 0x46, 0x00, // "JFIF\0"
      0x01, 0x02, // ver 1.02
      0x01, // unit = 1 (dpi)
      0x00, 0x48, 0x00, 0x48, // 72 x 72
      0x00, 0x00, // thumb
      0xff, 0xd9 // EOI
    ]);
    const baseBlob = new Blob([dummyJpeg], { type: "image/jpeg" });
    const modifiedBlob = await setDPIInBlob(baseBlob, testDpi);
    const parsedDpi = await readDPIFromBlob(modifiedBlob);

    if (parsedDpi !== testDpi) {
      console.error(`❌ JPEG DPI Mismatch: Expected ${testDpi}, got ${parsedDpi}`);
      errors++;
    } else {
      console.log(`✓ JPEG DPI ${testDpi} verified in binary metadata`);
    }
  }

  // 2. Test DPI Binary Parsing and Injection (PNG)
  for (const testDpi of [72, 200, 300, 600]) {
    // Minimal PNG header + IHDR
    const dummyPng = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG Signature
      0x00, 0x00, 0x00, 0x0d, // IHDR len 13
      0x49, 0x48, 0x44, 0x52, // 'IHDR'
      0x00, 0x00, 0x00, 0x0a, 0x00, 0x00, 0x00, 0x0a, 0x08, 0x02, 0x00, 0x00, 0x00,
      0x02, 0x50, 0x58, 0xea // IHDR CRC
    ]);
    const baseBlob = new Blob([dummyPng], { type: "image/png" });
    const modifiedBlob = await setDPIInBlob(baseBlob, testDpi);
    const parsedDpi = await readDPIFromBlob(modifiedBlob);

    if (parsedDpi !== testDpi) {
      console.error(`❌ PNG DPI Mismatch: Expected ${testDpi}, got ${parsedDpi}`);
      errors++;
    } else {
      console.log(`✓ PNG DPI ${testDpi} verified in binary metadata`);
    }
  }

  // 3. Test Binary Padding for File Size Ranges
  const rangeTests = [
    { minKB: 20, maxKB: 50 },
    { minKB: 30, maxKB: 100 },
    { minKB: 10, maxKB: 100 },
    { minKB: 20, maxKB: 300 },
    { minKB: 50, maxKB: 150 },
  ];

  for (const r of rangeTests) {
    const minBytes = r.minKB * 1024;
    const maxBytes = r.maxKB * 1024;
    const targetBytes = minBytes + Math.floor((maxBytes - minBytes) * 0.92);

    // Small 5KB JPEG blob
    const smallBuffer = new Uint8Array(5120);
    smallBuffer[0] = 0xff; smallBuffer[1] = 0xd8; // SOI
    smallBuffer[smallBuffer.length - 2] = 0xff; smallBuffer[smallBuffer.length - 1] = 0xd9; // EOI
    const smallBlob = new Blob([smallBuffer], { type: "image/jpeg" });

    const paddedBlob = await padBlobToMinBytes(smallBlob, minBytes, targetBytes);
    const sizeKB = paddedBlob.size / 1024;

    if (paddedBlob.size < minBytes || paddedBlob.size > maxBytes) {
      console.error(`❌ Range Padding Failure for ${r.minKB}-${r.maxKB}KB: Result ${sizeKB.toFixed(2)}KB`);
      errors++;
    } else {
      console.log(`✓ Range ${r.minKB}-${r.maxKB}KB successfully satisfied: Padded file is ${sizeKB.toFixed(2)}KB`);
    }
  }

  // 4. Audit all Exam Requirements Data
  console.log(`\n--- AUDITING ${exams.length} EXAM PRESETS ---`);
  let minMaxValidCount = 0;
  for (const exam of exams) {
    // Audit Photo
    if (exam.photo.minKB > exam.photo.maxKB) {
      console.error(`❌ Invalid exam photo range for ${exam.name}: minKB ${exam.photo.minKB} > maxKB ${exam.photo.maxKB}`);
      errors++;
    } else {
      minMaxValidCount++;
    }

    // Audit Signature
    if (exam.signature.minKB > exam.signature.maxKB) {
      console.error(`❌ Invalid exam signature range for ${exam.name}: minKB ${exam.signature.minKB} > maxKB ${exam.signature.maxKB}`);
      errors++;
    } else {
      minMaxValidCount++;
    }
  }

  console.log(`✓ Audited ${minMaxValidCount} requirements across ${exams.length} exams.`);

  if (errors === 0) {
    console.log("\n🎉 ALL DPI AND FILE SIZE RANGE TESTS PASSED PERFECTLY!");
  } else {
    console.error(`\n❌ Total Errors Found: ${errors}`);
    process.exit(1);
  }
}

runDpiAndRangeTests();
