import { notFound } from "next/navigation";
import { PRODUCTS, productById } from "@/lib/data";
import ProductView from "@/components/ProductView";

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
    openGraph: { images: [p.images[0]] },
  };
}

export default async function BikePage({ params }) {
  const { id } = await params;
  const p = productById(id);
  if (!p) notFound();
  return <ProductView product={p} />;
}
