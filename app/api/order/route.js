// Order requests → email via Resend (server-side).
// Requires RESEND_API_KEY in Vercel → Project → Settings → Environment Variables.
export async function POST(req) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Email not configured" }, { status: 500 });

  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }

  const { ref, items, total, payment, name, email, phone, country, city, address, zip } = body || {};
  if (!name || !email || !country || !Array.isArray(items) || !items.length) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const esc = (s) => String(s ?? "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

  const itemRows = items.map((i) =>
    `<tr><td style="padding:5px 14px 5px 0">${esc(i.name)}</td><td style="padding:5px 14px 5px 0">× ${esc(i.qty)}</td><td style="padding:5px 0"><b>${esc(i.price)}</b></td></tr>`).join("");

  const infoRows = [
    ["Reference", ref], ["Total", total], ["Payment", payment],
    ["Name", name], ["Email", email], ["Phone", phone],
    ["Country", country], ["City", city], ["Address", address], ["Postal code", zip],
  ].map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#888;font-size:13px">${k}</td><td style="padding:6px 0;font-size:14px"><b>${esc(v)}</b></td></tr>`).join("");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "ZEPHRIDE Orders <onboarding@resend.dev>",
        to: ["cstwebexperience@gmail.com"],
        reply_to: email,
        subject: `New ZEPHRIDE order · ${total} · ${ref}`,
        html: `<div style="font-family:sans-serif">
          <h2>New order</h2>
          <table style="border-collapse:collapse">${itemRows}</table>
          <hr style="border:none;border-top:1px solid #ddd;margin:14px 0"/>
          <table style="border-collapse:collapse">${infoRows}</table>
        </div>`,
      }),
    });
    if (!r.ok) throw new Error(await r.text());
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Send failed" }, { status: 502 });
  }
}
