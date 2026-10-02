/**
 * lib/utils/slugify.ts
 *
 * Generate URL-safe slugs from titles.
 * Used for property and story slugs.
 */

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")       // spaces → hyphens
    .replace(/[^\w\-]+/g, "")   // remove non-word chars
    .replace(/\-\-+/g, "-")     // collapse multiple hyphens
    .replace(/^-+/, "")         // trim leading hyphens
    .replace(/-+$/, "");        // trim trailing hyphens
}

/**
 * Generate a unique slug by appending a short timestamp if needed.
 */
export function generateSlug(title: string): string {
  const base = slugify(title);
  const timestamp = Date.now().toString(36); // short base-36 timestamp
  return `${base}-${timestamp}`;
}
