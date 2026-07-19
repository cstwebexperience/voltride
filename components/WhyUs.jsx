const POINTS = [
  { n: "01", t: "Street-legal everywhere", d: "250 W, 25 km/h, EN 15194 & CE certified. Legally a bicycle in the whole EU — no license, no plates, no insurance." },
  { n: "02", t: "Nothing paid up front", d: "Order now, pay when we confirm — cash to the courier or a secure card link. Your money never moves before your bike does." },
  { n: "03", t: "Free shipping, no customs", d: "Delivered to 22 European countries with zero shipping cost and zero customs surprises inside the EU." },
  { n: "04", t: "2-year warranty · 14-day returns", d: "Full EU consumer protection on every bike, and a real human answering within 24 hours." },
];

export default function WhyUs() {
  return (
    <section className="whyus">
      <div className="section-head">
        <span className="section-label">Why ZEPHRIDE</span>
        <h2>Buying a bike online <span className="grad">shouldn&apos;t feel like a gamble.</span></h2>
      </div>
      <div className="whyus-grid">
        {POINTS.map((p) => (
          <article className="whyus-card" key={p.n}>
            <span className="feature-num">{p.n}</span>
            <h3>{p.t}</h3>
            <p>{p.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
