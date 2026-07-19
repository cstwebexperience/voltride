// Orders are validated and logged (visible in Vercel → Project → Logs).
// No email service is connected yet — plug one in here when decided.
export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }

  const { ref, items, total, payment, name, email, phone, country, city, address, zip } = body || {};
  if (!name || !email || !country || !Array.isArray(items) || !items.length) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  console.log("ZEPHRIDE ORDER", JSON.stringify({ ref, items, total, payment, name, email, phone, country, city, address, zip }));
  return Response.json({ ok: true });
}
