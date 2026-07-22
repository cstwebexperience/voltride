// Orders are validated and logged (visible in Vercel → Project → Logs).
// No email service is connected yet — plug one in here when decided.

export const runtime = "nodejs";

const str = (v, max) => String(v ?? "").slice(0, max).trim();
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req) {
  // Only accept JSON, and cap the payload so a bot can't stream junk.
  if (!(req.headers.get("content-type") || "").includes("application/json")) {
    return Response.json({ error: "Unsupported media type" }, { status: 415 });
  }
  const raw = await req.text();
  if (raw.length > 8000) return Response.json({ error: "Payload too large" }, { status: 413 });

  let body;
  try { body = JSON.parse(raw); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }
  if (!body || typeof body !== "object") return Response.json({ error: "Bad request" }, { status: 400 });

  // Honeypot: real customers never fill a hidden field.
  if (str(body.company, 100)) return Response.json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 160);
  const country = str(body.country, 80);
  const items = Array.isArray(body.items) ? body.items.slice(0, 20) : [];

  if (!name || !isEmail(email) || !country || !items.length) {
    return Response.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const order = {
    ref: str(body.ref, 40),
    items: items.map((i) => ({ name: str(i?.name, 60), qty: Number(i?.qty) || 1, price: str(i?.price, 20) })),
    total: str(body.total, 20),
    payment: str(body.payment, 40),
    name, email,
    phone: str(body.phone, 40),
    country,
    city: str(body.city, 80),
    address: str(body.address, 160),
    zip: str(body.zip, 20),
  };

  console.log("ZEPHRIDE ORDER", JSON.stringify(order));
  return Response.json({ ok: true });
}

export function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
