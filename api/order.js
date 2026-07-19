// Order requests → email via Resend (server-side, no client keys).
// Requires RESEND_API_KEY set in Vercel → Project → Settings → Environment Variables.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ error: "Email not configured" });

  const { ref, product, price, name, email, country, phone, color, quantity, message } = req.body || {};
  if (!name || !email || !country || !product) return res.status(400).json({ error: "Missing fields" });

  const esc = (s) => String(s ?? "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
  const rows = [
    ["Reference", ref], ["Product", product], ["Price", price], ["Name", name],
    ["Email", email], ["Country", country], ["Phone", phone], ["Color", color],
    ["Quantity", quantity], ["Message", message],
  ].map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#888;font-size:13px">${k}</td><td style="padding:6px 0;font-size:14px"><b>${esc(v)}</b></td></tr>`).join("");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "ZEPHRIDE Orders <onboarding@resend.dev>",
        to: ["cstwebexperience@gmail.com"],
        reply_to: email,
        subject: `New ZEPHRIDE order — ${product} · ${ref}`,
        html: `<h2 style="font-family:sans-serif">New order request</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows}</table>`,
      }),
    });
    if (!r.ok) throw new Error(await r.text());
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ error: "Send failed" });
  }
}
