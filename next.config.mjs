/** @type {import('next').NextConfig} */

// Content-Security-Policy. Allows our own assets, flag images, and the
// Google Translate widget (only loaded when a visitor opts into a language).
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: https://flagcdn.com https://www.google.com https://www.gstatic.com https://translate.googleapis.com https://fonts.gstatic.com https://*.gstatic.com",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://www.gstatic.com https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://www.google.com https://www.gstatic.com",
  "connect-src 'self' https://translate.googleapis.com https://translate.google.com",
  "frame-src https://translate.google.com https://www.google.com",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "flagcdn.com" }],
    minimumCacheTTL: 3600,
  },
  async headers() {
    // Skip the strict CSP in dev: it blocks 'unsafe-eval', which Next's
    // dev-mode React Refresh runtime needs — without this, the whole
    // client bundle throws on load and the page never hydrates.
    if (process.env.NODE_ENV !== "production") return [];
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // These files (video, product photos, cert marks) get overwritten in
        // place under the same filename as we iterate — "immutable" caching
        // here means browsers keep serving stale content forever after an
        // update. Short cache + must-revalidate so edits actually show up.
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
