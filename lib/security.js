const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Validates a media/image/audio source path for security and automatically
 * prefixes relative paths with the NEXT_PUBLIC_BASE_PATH for deployment correctness.
 *
 * - Allows paths starting with '/' (and prepends basePath if missing).
 * - Allows browser-generated 'blob:' URLs.
 * - Rejects external URLs, javascript:, data:, and other schemes to prevent XSS.
 *
 * @param {string} src The source path to validate and resolve.
 * @returns {string|null} The resolved safe URL, or null if invalid/unsafe.
 */
export function getSafeMediaSrc(src) {
  if (!src || typeof src !== "string") return null;

  // Resolve relative paths
  if (src.startsWith("/")) {
    // Prevent double-prefixing if the path already starts with basePath
    if (basePath && !src.startsWith(basePath)) {
      return `${basePath}${src}`;
    }
    return src;
  }

  // Resolve blob URLs (safe browser-generated content)
  if (src.startsWith("blob:")) {
    return src;
  }

  // Reject all other schemes (http://, https://, javascript:, data:, etc.)
  return null;
}
