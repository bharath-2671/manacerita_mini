/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ─── Static Export for GitHub Pages ──────────────────────────────────────
  // Generates a fully static `out/` directory that GitHub Pages can serve.
  output: "export",

  // The repo is at github.com/bharath-2671/manacerita_mini,
  // so GitHub Pages serves at bharath-2671.github.io/manacerita_mini/
  basePath: "/manacerita_mini",

  // Trailing slash makes all paths resolve correctly on GitHub Pages
  // (e.g. /manacerita_mini/ instead of /manacerita_mini)
  trailingSlash: true,

  images: {
    // next/image optimization requires a server — disable it for static export.
    // All images in this app are already locally optimised assets.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [], // Explicitly block all remote image requests
  },

  // ─── Security Headers ─────────────────────────────────────────────────────
  // NOTE: headers() has NO effect in static export mode (output: "export")
  // because there is no server to apply them. They are kept here so that if
  // you ever switch to a server-side host (Vercel, Netlify, self-hosted) the
  // headers will automatically apply without any extra work.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
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
