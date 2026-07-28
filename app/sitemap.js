import { PRODUCTS } from "@/lib/data";

const BASE = "https://voltride-nine.vercel.app";

export default function sitemap() {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...PRODUCTS.map((p) => ({
      url: `${BASE}/bikes/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
