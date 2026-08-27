import { processImage, compressToRange, validateOutput } from "../lib/imageProcessor";

async function createLargeTestBlob(width = 2560, height = 2560): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  
  // Fill with complex visual content (gradient + shapes + noise) to simulate a large 500KB+ photo
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#FF0055");
  grad.addColorStop(0.5, "#00FFCC");
  grad.addColorStop(1, "#330099");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = `rgba(${(i * 37) % 255}, ${(i * 91) % 255}, ${(i * 13) % 255}, 0.7)`;
    ctx.beginPath();
    ctx.arc((i * 127) % width, (i * 311) % height, (i * 19) % 200 + 10, 0, Math.PI * 2);
    ctx.fill();
  }

  return new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.98));
}

async function runKbPresetTests() {
  console.log("=== RUNNING QUICK KB PRESETS COMPRESSION & VALIDATION TESTS ===");
  let errors = 0;

  const testBlob = await createLargeTestBlob(2560, 2560);
  const originalSizeKB = testBlob.size / 1024;
  console.log(`Original Test Image: ${originalSizeKB.toFixed(2)} KB (2560×2560 px)\n`);

  const presetsToTest = [10, 20, 30, 40, 50, 60, 100, 150, 200, 300, 500];

  for (const presetKB of presetsToTest) {
    const result = await processImage(testBlob, {
      targetKB: presetKB,
      format: "image/jpeg",
    });

    const resultSizeKB = result.size / 1024;
    const maxBytes = presetKB * 1024;

    const val = await validateOutput(result.blob, {
      width: result.width,
      height: result.height,
      minKB: 0,
      maxKB: presetKB,
      format: "JPG",
    });

    if (result.size > maxBytes) {
      console.error(
        `❌ Preset ${presetKB} KB FAILED: Output size ${resultSizeKB.toFixed(2)} KB exceeds target ${presetKB} KB!`
      );
      errors++;
    } else if (!val.checks.fileSize) {
      console.error(
        `❌ Preset ${presetKB} KB Validation FAILED: Validation returned invalid for size ${resultSizeKB.toFixed(2)} KB`
      );
      errors++;
    } else {
      console.log(
        `✓ Preset ${presetKB} KB PASSED: Output ${resultSizeKB.toFixed(2)} KB (Req: ≤${presetKB} KB) | Quality ${(result.quality * 100).toFixed(0)}% | Dim ${result.width}×${result.height} px`
      );
    }
  }

  console.log("\n--- TESTING PRESET STATE TRANSITIONS SEQUENCE ---");
  const transitionSequence = [30, 50, 20, 100];
  for (const targetKB of transitionSequence) {
    const result = await processImage(testBlob, {
      targetKB,
      format: "image/jpeg",
    });

    const resultSizeKB = result.size / 1024;
    if (result.size > targetKB * 1024) {
      console.error(`❌ Transition to ${targetKB} KB FAILED: Result was ${resultSizeKB.toFixed(2)} KB`);
      errors++;
    } else {
      console.log(`✓ Transition to ${targetKB} KB Successful: Actual output ${resultSizeKB.toFixed(2)} KB <= ${targetKB} KB`);
    }
  }

  if (errors === 0) {
    console.log("\n🎉 ALL QUICK KB PRESETS & STATE TRANSITION TESTS PASSED PERFECTLY!");
  } else {
    console.error(`\n❌ Total Errors Found: ${errors}`);
    process.exit(1);
  }
}

runKbPresetTests();
