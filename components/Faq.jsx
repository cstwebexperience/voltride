"use client";

import { useState } from "react";

const FAQS = [
  { q: "Do I need a license, plates or insurance?", a: "No. Every ZEPHRIDE is limited to 250 W / 25 km/h and certified to EN 15194 — in the eyes of EU law it's a bicycle. Unbox it, and ride." },
  { q: "How much does shipping cost?", a: "Nothing. Shipping is free to all 22 countries we serve, and inside the EU there are no customs fees or surprise charges." },
  { q: "When do I pay?", a: "Not at checkout. You place the order, we confirm stock and delivery within 24 hours, and only then you pay — cash on delivery or by secure card link." },
  { q: "How long does delivery take?", a: "Bikes ship from our EU warehouse partners. Typical delivery is 7–14 working days depending on your country — we confirm the exact window with your order." },
  { q: "What about warranty and returns?", a: "You get the full 2-year EU warranty and the 14-day right of return. If something's wrong, you write to us and we fix it — a real human answers." },
  { q: "Is the battery removable?", a: "Yes. The battery slides out with a key, so you can charge it at your desk while the bike stays outside. A full charge takes from around 3 hours." },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="section-head">
        <span className="section-label">Questions</span>
        <h2>Asked all the time. <span className="grad">Answered honestly.</span></h2>
      </div>
      <div className="faq-list">
        {FAQS.map((f, i) => (
          <div className={`faq-item ${open === i ? "open" : ""}`} key={f.q}>
            <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{f.q}</span>
              <i aria-hidden="true">+</i>
            </button>
            <div className="faq-a"><p>{f.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
