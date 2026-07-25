/* ZEPHRIDE support chatbot — local keyword-matched knowledge base.
   No external API: instant, free, works offline, and only ever answers
   from real site content (never invents specs, prices, or policy). */
import { PRODUCTS, COUNTRIES, priceFor } from "@/lib/data";

const bikeList = PRODUCTS.map((p) => p.name).join(", ");

export const KB = [
  {
    id: "shipping",
    kw: ["ship", "shipping", "delivery", "deliver", "arrive", "country", "countries", "customs", "how long", "when will"],
    a: `We ship free to all ${COUNTRIES.length} countries we serve — no customs fees or surprise charges inside the EU. Typical delivery is 7–14 working days from order confirmation; we send you the exact window once your order is confirmed.`,
  },
  {
    id: "payment",
    kw: ["pay", "payment", "card", "cash", "when do i pay", "charge", "deposit", "checkout"],
    a: "Nothing is charged at checkout. You place the order, we confirm stock and delivery within 24 hours, and only then you pay — cash on delivery or a secure card link. Your money never moves before that confirmation.",
  },
  {
    id: "returns",
    kw: ["return", "refund", "cancel", "change my mind", "send back", "money back"],
    a: "All sales are final — we don't accept returns. Every bike is still covered by a full 2-year warranty for manufacturing defects, so please check the specs and photos (or ask me!) before ordering.",
  },
  {
    id: "warranty",
    kw: ["warranty", "guarantee", "broken", "defect", "repair", "faulty"],
    a: "Every ZEPHRIDE bike carries a full 2-year warranty against manufacturing defects. If something's wrong, you contact us and we fix or replace the part — no cost to you.",
  },
  {
    id: "assembly",
    kw: ["assemble", "assembly", "build", "unbox", "setup", "set up", "install", "tools"],
    a: "Bikes arrive about 90% assembled. You fit the handlebar, pedals and front wheel with the included tools — roughly 20 minutes, no workshop needed. The manual walks you through every step.",
  },
  {
    id: "battery",
    kw: ["battery", "charge", "charging", "range", "km", "how far", "removable"],
    a: "The battery is removable — it slides out with a key so you can charge it at your desk while the bike stays outside. A full charge takes from around 3 hours. Range varies by model, roughly 50–80 km depending on which bike you pick.",
  },
  {
    id: "certifications",
    kw: ["certified", "certificate", "legal", "compliance", "ce", "safe", "safety", "standard"],
    a: "Every model is tested and documented against CE, LVD, EMC, RoHS, Machinery Directive, UKCA, EN 15194, CPSIA, EN 60335, EN 301 489, UL 2849 and AS/NZS CISPR. You can see every mark in the Certificates section on this page.",
  },
  {
    id: "models",
    kw: ["model", "models", "bikes", "which bike", "difference", "compare", "range of bikes", "lineup", "line-up"],
    a: `We currently sell five models: ${bikeList}. Each has its own page with full specs — tap any bike in the shop grid above, or tell me what matters most to you (range, power, price, extras) and I'll point you to the right one.`,
  },
  {
    id: "order",
    kw: ["order", "buy", "purchase", "how do i order", "cart", "add to cart"],
    a: "Pick a bike, hit “Add to cart,” then go to your cart to enter your delivery address and choose cash-on-delivery or card. No payment is taken at that point — we confirm your order first.",
  },
  {
    id: "contact",
    kw: ["contact", "email", "phone", "human", "speak to someone", "support", "help"],
    a: "I can answer most questions about shipping, payment, warranty and the bikes themselves right here. For anything order-specific, use the form in your cart when you check out — we reply within 24 hours.",
  },
];

// price/spec lookups per product, keyed by name/id keywords
export function productMatch(text, country) {
  const t = text.toLowerCase();
  return PRODUCTS.find((p) => t.includes(p.id) || t.includes(p.name.toLowerCase()));
}

export function priceAnswer(p, country) {
  const price = priceFor(p, country);
  const eur = "€" + price.toLocaleString("en-US");
  return `The ${p.name} is ${eur}${country ? ` shipped to ${country.name}` : ""}, free shipping included. ${p.short}.`;
}

export function bestMatch(input) {
  const words = input.toLowerCase().match(/[a-z0-9]+/g) || [];
  if (!words.length) return null;
  let best = null, bestScore = 0;
  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.kw) {
      if (kw.includes(" ")) { if (input.toLowerCase().includes(kw)) score += 3; }
      else if (words.includes(kw)) score += 2;
      else if (words.some((w) => w.startsWith(kw) || kw.startsWith(w))) score += 1;
    }
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  return bestScore > 0 ? best : null;
}
