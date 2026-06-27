const isGithubActions = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Only apply static export configuration when building on GitHub Actions
  output: isGithubActions ? "export" : undefined,
  basePath: isGithubActions ? "/manacerita_mini" : undefined,
  trailingSlash: isGithubActions ? true : undefined,

  images: {
    // Local assets only.
    // Use Vercel's native image optimization, but fall back to unoptimized on GitHub Pages static export.
    unoptimized: isGithubActions,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [], // Explicitly empty to prevent remote image optimizer DoS vectors
  },

  // ─── Security Headers ───────────────────────────────────────────────────────
  // Active when running on Vercel or a server environment.
  // Next.js ignores this property when output is 'export' (on GitHub Pages).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },

          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Control referrer information sent to third parties
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // Disable browser features not used by the app
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },

          // Strict Transport Security (forces HTTPS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "media-src 'self'",
              "connect-src 'self'",
              "object-src 'none'",
              "frame-src 'none'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
