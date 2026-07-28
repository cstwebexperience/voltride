const BASE = "https://voltride-nine.vercel.app";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/cart" }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
