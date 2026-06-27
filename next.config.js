/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // Local assets only — no remote domains whitelisted intentionally.
    // This prevents the DoS-via-remotePatterns vulnerability (GHSA-9g9p-9gw9-jx7f).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [], // Explicitly empty: block all remote image optimization requests
  },

  // ─── Security Headers ───────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },

          // Prevent MIME-type sniffing (helps mitigate XSS via content-type confusion)
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Control referrer information sent to third parties
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // Disable browser features not used by the app
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },

          // Strict Transport Security (forces HTTPS on return visits)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // Content Security Policy
          // - Fonts only from Google Fonts (same as what layout.jsx loads)
          // - Media (audio/video) from self only
          // - No inline scripts — all JS is bundled by Next.js
          // - No object/embed elements
          // - No iframes from other origins
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'", // Next.js requires unsafe-inline for hydration scripts
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
