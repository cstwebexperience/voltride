import { notFound } from "next/navigation";
import { PRODUCTS, productById } from "@/lib/data";
import ProductView from "@/components/ProductView";

const BASE = "https://voltride-nine.vercel.app";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = productById(id);
  if (!p) return {};
  return {
    title: `${p.name} — Electric Bike`,
    description: `ZEPHRIDE ${p.name}: ${p.tagline} ${p.short}. Free shipping across Europe.`,
    alternates: { canonical: `/bikes/${p.id}` },
    openGraph: { images: [p.images[0]], url: `/bikes/${p.id}` },
  };
}

export default async function BikePage({ params }) {
  const { id } = await params;
  const p = productById(id);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `ZEPHRIDE ${p.name}`,
    description: p.desc,
    image: p.images.map((src) => `${BASE}${src}`),
    brand: { "@type": "Brand", name: "ZEPHRIDE" },
    offers: {
      "@type": "Offer",
      url: `${BASE}/bikes/${p.id}`,
      priceCurrency: "EUR",
      price: p.prices[0],
      availability: p.images.length > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductView product={p} />
    </>
  );
}
