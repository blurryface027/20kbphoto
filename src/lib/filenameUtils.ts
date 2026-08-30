/**
 * Utility to generate short, clean download filenames.
 * Truncates long, messy original file names (e.g. photo_6116052868985982591_y (1)_11zon.jpg -> photo_6116-resizer.jpg).
 */
export function getShortDownloadFilename(
  originalFile?: File | null,
  suffix = "edit",
  format = "image/jpeg"
): string {
  const ext = format.includes("png") ? "png" : format.includes("webp") ? "webp" : "jpg";

  if (!originalFile || !originalFile.name) {
    return `photo-${suffix}.${ext}`;
  }

  const name = originalFile.name;
  const lastDot = name.lastIndexOf(".");
  let baseName = lastDot > 0 ? name.substring(0, lastDot) : name;

  // Clean out common suffix junk
  baseName = baseName
    .replace(/_11zon/gi, "")
    .replace(/\s*\(\d+\)/g, "")
    .replace(/^WhatsApp Image \d{4}-\d{2}-\d{2} at /gi, "photo-")
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  // If baseName is longer than 12 characters, truncate to 10 characters
  if (baseName.length > 12) {
    baseName = baseName.substring(0, 10);
  }

  if (!baseName) {
    baseName = "photo";
  }

  return `${baseName}-${suffix}.${ext}`;
}
