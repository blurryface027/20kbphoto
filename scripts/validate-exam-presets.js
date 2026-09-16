const fs = require('fs');
const path = require('path');

function runValidation() {
  console.log("=== RUNNING EXAM PRESET SYSTEM VALIDATION ===");

  const examsFilePath = path.join(__dirname, '../src/data/exams.ts');
  const text = fs.readFileSync(examsFilePath, 'utf8');

  const startStr = 'export const exams: Exam[] = ';
  const startPos = text.indexOf(startStr);
  if (startPos === -1) {
    console.error("❌ Failed: Could not find exams array in exams.ts");
    process.exit(1);
  }

  const bracketStart = startPos + startStr.length;
  const endStr = '];\nexport const categories =';
  const endPos = text.indexOf(endStr, bracketStart);
  if (endPos === -1) {
    console.error("❌ Failed: Could not find end of exams array in exams.ts");
    process.exit(1);
  }

  const jsonStr = text.substring(bracketStart, endPos + 1);
  let exams;
  try {
    exams = JSON.parse(jsonStr);
  } catch (err) {
    console.error("❌ Failed: Invalid JSON syntax in exams array:", err.message);
    process.exit(1);
  }

  console.log(`Loaded ${exams.length} exams for validation.`);

  let errors = 0;
  let warnings = 0;
  const slugsSeen = new Set();
  const validStatuses = new Set(['verified', 'partially_verified', 'unverified', 'needs-review', 'conflicting', 'unknown']);

  exams.forEach((exam, idx) => {
    const identifier = exam.slug || exam.name || `Index ${idx}`;

    // 1. Slug check
    if (!exam.slug) {
      console.error(`❌ Error [${identifier}]: Missing slug`);
      errors++;
    } else if (slugsSeen.has(exam.slug)) {
      console.error(`❌ Error [${identifier}]: Duplicate slug "${exam.slug}"`);
      errors++;
    } else {
      slugsSeen.add(exam.slug);
    }

    // 2. Name & Category check
    if (!exam.name) {
      console.error(`❌ Error [${identifier}]: Missing exam name`);
      errors++;
    }
    if (!exam.category) {
      console.error(`❌ Error [${identifier}]: Missing category`);
      errors++;
    }

    // 3. Photo check
    const photo = exam.photo;
    if (!photo) {
      console.error(`❌ Error [${identifier}]: Missing photo requirements`);
      errors++;
    } else {
      if (typeof photo.width !== 'number' || photo.width <= 0) {
        console.error(`❌ Error [${identifier}]: Invalid photo width (${photo.width})`);
        errors++;
      }
      if (typeof photo.height !== 'number' || photo.height <= 0) {
        console.error(`❌ Error [${identifier}]: Invalid photo height (${photo.height})`);
        errors++;
      }
      if (typeof photo.minKB !== 'number' || photo.minKB < 0) {
        console.error(`❌ Error [${identifier}]: Invalid photo minKB (${photo.minKB})`);
        errors++;
      }
      if (typeof photo.maxKB !== 'number' || photo.maxKB <= 0) {
        console.error(`❌ Error [${identifier}]: Invalid photo maxKB (${photo.maxKB})`);
        errors++;
      }
      if (photo.minKB > photo.maxKB) {
        console.error(`❌ Error [${identifier}]: Photo minKB (${photo.minKB}) > maxKB (${photo.maxKB})`);
        errors++;
      }
      if (!photo.format) {
        console.error(`❌ Error [${identifier}]: Missing photo format`);
        errors++;
      }
    }

    // 4. Signature check
    const sig = exam.signature;
    if (!sig) {
      console.error(`❌ Error [${identifier}]: Missing signature requirements`);
      errors++;
    } else {
      if (typeof sig.width !== 'number' || sig.width <= 0) {
        console.error(`❌ Error [${identifier}]: Invalid signature width (${sig.width})`);
        errors++;
      }
      if (typeof sig.height !== 'number' || sig.height <= 0) {
        console.error(`❌ Error [${identifier}]: Invalid signature height (${sig.height})`);
        errors++;
      }
      if (typeof sig.minKB !== 'number' || sig.minKB < 0) {
        console.error(`❌ Error [${identifier}]: Invalid signature minKB (${sig.minKB})`);
        errors++;
      }
      if (typeof sig.maxKB !== 'number' || sig.maxKB <= 0) {
        console.error(`❌ Error [${identifier}]: Invalid signature maxKB (${sig.maxKB})`);
        errors++;
      }
      if (sig.minKB > sig.maxKB) {
        console.error(`❌ Error [${identifier}]: Signature minKB (${sig.minKB}) > maxKB (${sig.maxKB})`);
        errors++;
      }
      if (!sig.format) {
        console.error(`❌ Error [${identifier}]: Missing signature format`);
        errors++;
      }
    }

    // 5. Source metadata check
    if (!exam.sourceUrl && !photo?.sourceUrl) {
      console.warn(`⚠️ Warning [${identifier}]: Missing sourceUrl`);
      warnings++;
    }
    if (!validStatuses.has(exam.verificationStatus)) {
      console.error(`❌ Error [${identifier}]: Invalid verificationStatus "${exam.verificationStatus}"`);
      errors++;
    }
  });

  console.log("\n--- VALIDATION SUMMARY ---");
  console.log(`Total Exams Audited: ${exams.length}`);
  console.log(`Unique Slugs Verified: ${slugsSeen.size}`);
  console.log(`Errors Found: ${errors}`);
  console.log(`Warnings Found: ${warnings}`);

  if (errors > 0) {
    console.error("\n❌ VALIDATION FAILED WITH ERRORS");
    process.exit(1);
  } else {
    console.log("\n✅ ALL EXAM PRESETS PASSED VALIDATION PERFECTLY!");
  }
}

runValidation();
