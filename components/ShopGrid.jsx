"use client";

import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";

/* eMAG-style quick-shop cards — photo, key specs, stock, price, buy. */
export default function ShopGrid() {
  const { price, euro, addToCart, showToast } = useStore();

  return (
    <section className="shop" id="shop">
      <div className="section-head">
        <span className="section-label">The Range</span>
        <h2>Five machines. <span className="grad">Pick yours.</span></h2>
        <p className="section-lead">Same all-terrain DNA — compare at a glance, buy in two taps. Free shipping, nothing paid until we confirm.</p>
      </div>

      <div className="shop-grid">
        {PRODUCTS.map((p) => {
          const hasPhoto = p.images.length > 0;
          return (
            <article className="scard" key={p.id}>
              <Link className="scard-media" href={`/bikes/${p.id}`} aria-label={`ZEPHRIDE ${p.name}`}>
                {p.badge && <span className="pcard-badge">{p.badge}</span>}
                {hasPhoto
                  ? <Image src={p.images[0]} alt={`ZEPHRIDE ${p.name}`} fill quality={90} sizes="(max-width: 560px) 92vw, 400px" />
                  : <span className="scard-ph">ZEPHRIDE {p.name}<br />Photos coming soon</span>}
              </Link>
              <div className="scard-body">
                <Link className="scard-name" href={`/bikes/${p.id}`}>ZEPHRIDE {p.name}</Link>
                <ul className="scard-specs">
                  <li>{p.specs.Motor}</li>
                  <li>{p.specs.Range} range</li>
                  <li>{p.specs.Battery}</li>
                </ul>
                <span className={`scard-stock ${hasPhoto ? "" : "soon"}`}>{hasPhoto ? "In stock · free shipping" : "Coming soon"}</span>
                <div className="scard-price">{euro(price(p))}</div>
                <div className="scard-actions">
                  {hasPhoto ? (
                    <button className="btn btn-primary" type="button"
                      onClick={() => { addToCart(p.id); showToast(`${p.name} added to cart.`, "success"); }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                      Add to cart
                    </button>
                  ) : (
                    <button className="btn btn-ghost" type="button" disabled>Coming soon</button>
                  )}
                  <Link className="scard-view" href={`/bikes/${p.id}`}>View details →</Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
