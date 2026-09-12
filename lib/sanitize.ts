const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const tagPattern = /<[^>]+>/g;

export function sanitizeText(value: string) {
  return value.replace(scriptPattern, "").replace(tagPattern, "").trim();
}

export function sanitizeMultilineText(value: string) {
  return value
    .replace(scriptPattern, "")
    .split("\n")
    .map((line) => line.replace(tagPattern, "").trimEnd())
    .join("\n")
    .trim();
}

export function slugify(value: string) {
  return sanitizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
