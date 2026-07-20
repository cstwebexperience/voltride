"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function ProductView({ product: p }) {
  const { country, price, euro, addToCart, showToast } = useStore();
  const router = useRouter();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <main className="pp">
      <nav className="pp-crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/#bikes">Electric bikes</Link><span>/</span>
        <b>{p.name}</b>
      </nav>

      <div className="pp-head">
        {p.badge && <span className="pcard-badge pp-badge">{p.badge}</span>}
        <h1>ZEPHRIDE {p.name} <span className="pp-sub">— {p.tagline}</span></h1>
      </div>

      <div className="pp-grid">
        <section className="pp-gallery">
          <div className="pp-stage">
            <Image src={p.images[img]} alt={`ZEPHRIDE ${p.name}`} fill priority sizes="(max-width: 880px) 100vw, 58vw" />
          </div>
          {p.images.length > 1 && (
            <div className="pp-thumbs">
              {p.images.map((src, i) => (
                <button type="button" key={src} className={i === img ? "on" : ""} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`}>
                  <Image src={src} alt="" width={92} height={68} />
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="pp-buy">
          <div className="pp-price">{euro(price(p))}</div>
          <p className="pp-ship">Free shipping{country ? <> to <b>{country.name}</b></> : " across Europe"} · no customs fees</p>
          <div className="pp-qty-row">
            <label>Qty</label>
            <div className="pp-qty">
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Less">−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty(Math.min(9, qty + 1))} aria-label="More">+</button>
            </div>
          </div>
          <button className="btn btn-primary btn-block" type="button"
            onClick={() => { addToCart(p.id, qty); showToast(`${p.name} added to cart.`, "success"); }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Add to cart
          </button>
          <button className="btn btn-ghost btn-block" type="button"
            onClick={() => { addToCart(p.id, qty); router.push("/cart"); }}>
            Buy now
          </button>
          <ul className="pp-trust">
            <li>No payment now — pay cash or card on confirmation</li>
            <li>All sales final — no returns accepted</li>
            <li>2-year EU warranty</li>
            <li>CE · EN 15194 certified</li>
          </ul>
        </aside>
      </div>

      <div className="pp-details">
        <section className="pp-desc-block">
          <h2>About the {p.name}</h2>
          <p>{p.desc}</p>
          <ul className="pd-high">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        </section>
        <section className="pp-specs-block">
          <h2>Specifications</h2>
          <div className="pd-specs">
            {Object.entries(p.specs).map(([k, v]) => (
              <div className="pd-row" key={k}><span>{k}</span><b>{v}</b></div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
