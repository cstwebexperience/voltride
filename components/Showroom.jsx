"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";

/* The pitch billboards — one full ad per bike, alternating sides. */
const ADS = {
  x80pro:   { head: ["One bike.", "Every excuse gone."],   chips: ["Find My tracking", "2-rider ready", "Front rack included"] },
  x90:      { head: ["The clean", "machine."],              chips: ["Sleeker frame", "Same 250 W punch", "App + alarm"] },
  x80ultra: { head: ["Go further than", "your plans."],     chips: ["18.2 Ah battery", "Up to 80 km", "Colour TFT dash"] },
  x70:      { head: ["Built like a tank.", "Rides like a dream."], chips: ["Steel frame", "Up to 750 W", "Hydraulic discs"] },
  x50:      { head: ["Everything on.", "Nothing extra to buy."],   chips: ["41 kg — lightest", "Phone bag + rear seat", "Alarm included"] },
};

export default function Showroom() {
  const { price, euro, addToCart, showToast } = useStore();
  const rootRef = useRef(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll("[data-reveal]");
    if (!els?.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="showroom" ref={rootRef} id="showroom">
      <div className="section-head" data-reveal>
        <span className="section-label">The Line-up</span>
        <h2>Five machines. <span className="grad">Zero compromises.</span></h2>
        <p className="section-lead">Same all-terrain DNA — fat tyres, full suspension, street-legal 25 km/h. Pick the attitude that fits your ride.</p>
      </div>

      {PRODUCTS.map((p, i) => {
        const ad = ADS[p.id];
        return (
          <article className={`bb ${i % 2 ? "bb-flip" : ""}`} key={p.id} data-reveal>
            <Link className="bb-media" href={`/bikes/${p.id}`} aria-label={`ZEPHRIDE ${p.name}`}>
              <Image
                src={p.images[0]}
                alt={`ZEPHRIDE ${p.name}`}
                fill
                sizes="(max-width: 880px) 100vw, 58vw"
                priority={i === 0}
              />
              {p.badge && <span className="pcard-badge">{p.badge}</span>}
            </Link>
            <div className="bb-copy">
              <span className="bb-model">ZEPHRIDE {p.name}</span>
              <h3 className="bb-head">{ad.head[0]}<br /><span className="grad">{ad.head[1]}</span></h3>
              <p className="bb-pitch">{p.pitch}</p>
              <div className="bb-chips">{ad.chips.map((c) => <span key={c}>{c}</span>)}</div>
              <div className="bb-buy">
                <span className="bb-price">{euro(price(p))}</span>
                <span className="bb-ship">free shipping</span>
              </div>
              <div className="bb-actions">
                <Link className="btn btn-primary" href={`/bikes/${p.id}`}>See the {p.name} →</Link>
                <button
                  className="btn btn-ghost" type="button"
                  onClick={() => { addToCart(p.id); showToast(`${p.name} added to cart.`, "success"); }}
                >Add to cart</button>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
