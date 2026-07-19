"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COUNTRIES, productById } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function CartView() {
  const { ready, country, cart, setQty, clearCart, cartCount, cartTotal, price, euro, showToast } = useStore();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(null);
  const [invalid, setInvalid] = useState({});

  if (!ready) return <main className="cart-page" />;

  if (done) {
    return (
      <main className="cart-page">
        <div className="cart-empty cart-done in">
          <div className="cart-done-check">✓</div>
          <h1>Order received!</h1>
          <p>Reference <b>{done}</b> — we&apos;ll confirm stock, delivery and payment by email within 24h.<br />Nothing is charged until then.</p>
          <Link className="btn btn-primary" href="/#bikes">Back to the bikes →</Link>
        </div>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main className="cart-page">
        <div className="cart-empty in">
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <h1>Your cart is empty</h1>
          <p>Pick a machine and it&apos;ll wait for you here.</p>
          <Link className="btn btn-primary" href="/#bikes">Browse the bikes →</Link>
        </div>
      </main>
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const bad = {};
    ["name", "phone", "email", "city", "address", "zip"].forEach((k) => {
      if (!String(data[k] || "").trim()) bad[k] = true;
    });
    if (!/^\S+@\S+\.\S+$/.test(data.email || "")) bad.email = true;
    setInvalid(bad);
    if (Object.keys(bad).length) { showToast("Please fill in the required fields.", "error"); return; }

    const ref = "ZR-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" +
                Math.random().toString(36).slice(2, 6).toUpperCase();
    const items = cart.map((i) => {
      const p = productById(i.id);
      return { name: p ? p.name : i.id, qty: i.qty, price: p ? euro(price(p)) : "—" };
    });

    setSending(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref, items, total: euro(cartTotal), payment: data.payment,
          name: data.name, email: data.email, phone: data.phone,
          country: data.country, city: data.city, address: data.address, zip: data.zip,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      clearCart();
      setDone(ref);
      window.scrollTo({ top: 0 });
    } catch {
      showToast("Couldn't send right now — please try again in a moment.", "error");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="cart-page">
      <div className="cart-head">
        <h1>Your <span className="grad">cart.</span></h1>
        <p>{cartCount} item{cartCount > 1 ? "s" : ""} · free shipping{country ? ` to ${country.name}` : ""}</p>
      </div>

      <div className="cart-grid">
        <section className="cart-items">
          {cart.map((i) => {
            const p = productById(i.id);
            if (!p) return null;
            return (
              <div className="cart-item" key={p.id}>
                <Link className="cart-item-img" href={`/bikes/${p.id}`}>
                  <Image src={p.images[0]} alt={p.name} width={116} height={88} />
                </Link>
                <div className="cart-item-info">
                  <Link className="cart-item-name" href={`/bikes/${p.id}`}>ZEPHRIDE {p.name}</Link>
                  <span className="cart-item-short">{p.short}</span>
                  <button className="cart-item-remove" type="button" onClick={() => setQty(p.id, 0)}>Remove</button>
                </div>
                <div className="cart-item-side">
                  <div className="pp-qty">
                    <button type="button" onClick={() => setQty(p.id, i.qty - 1)} aria-label="Less">−</button>
                    <span>{i.qty}</span>
                    <button type="button" onClick={() => setQty(p.id, i.qty + 1)} aria-label="More">+</button>
                  </div>
                  <span className="cart-item-price">{euro(price(p) * i.qty)}</span>
                </div>
              </div>
            );
          })}
        </section>

        <aside className="cart-checkout">
          <div className="cart-summary">
            <div className="cart-sum-row"><span>Subtotal</span><b>{euro(cartTotal)}</b></div>
            <div className="cart-sum-row"><span>Shipping</span><b className="free">Free</b></div>
            <div className="cart-sum-row cart-sum-total"><span>Total</span><b>{euro(cartTotal)}</b></div>
          </div>

          <form className="cart-form" onSubmit={onSubmit} noValidate>
            <h2>Delivery address</h2>
            <div className="form-row-2">
              <div className={`form-group ${invalid.name ? "invalid" : ""}`}><label>Full name *</label><input type="text" name="name" placeholder="John Rider" autoComplete="name" /></div>
              <div className={`form-group ${invalid.phone ? "invalid" : ""}`}><label>Phone *</label><input type="tel" name="phone" placeholder="+49 151 1234 5678" autoComplete="tel" /></div>
            </div>
            <div className={`form-group ${invalid.email ? "invalid" : ""}`}><label>Email *</label><input type="email" name="email" placeholder="you@email.com" autoComplete="email" /></div>
            <div className="form-row-2">
              <div className="form-group"><label>Country *</label>
                <select name="country" defaultValue={country?.name || "Germany"}>
                  {COUNTRIES.map((x) => <option key={x.code} value={x.name}>{x.name}</option>)}
                </select>
              </div>
              <div className={`form-group ${invalid.city ? "invalid" : ""}`}><label>City *</label><input type="text" name="city" placeholder="Berlin" autoComplete="address-level2" /></div>
            </div>
            <div className="form-row-2">
              <div className={`form-group ${invalid.address ? "invalid" : ""}`}><label>Street &amp; number *</label><input type="text" name="address" placeholder="Hauptstraße 12" autoComplete="street-address" /></div>
              <div className={`form-group ${invalid.zip ? "invalid" : ""}`}><label>Postal code *</label><input type="text" name="zip" placeholder="10115" autoComplete="postal-code" /></div>
            </div>

            <h2>Payment</h2>
            <div className="pay-options">
              <label className="pay-option">
                <input type="radio" name="payment" value="Cash on delivery" defaultChecked />
                <span className="pay-box">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/></svg>
                  <span><b>Cash on delivery</b><small>Pay the courier when the bike arrives</small></span>
                </span>
              </label>
              <label className="pay-option">
                <input type="radio" name="payment" value="Card" />
                <span className="pay-box">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                  <span><b>Card</b><small>We email you a secure payment link on confirmation</small></span>
                </span>
              </label>
            </div>

            <button className="btn btn-primary btn-block" type="submit" disabled={sending}>
              {sending ? "Placing order…" : `Place order · ${euro(cartTotal)}`}
            </button>
            <p className="form-note">No charge yet — we confirm stock &amp; delivery within 24h before anything is paid.</p>
          </form>
        </aside>
      </div>
    </main>
  );
}
