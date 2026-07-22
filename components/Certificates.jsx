/* Real compliance marks cropped from the supplier's certificate sheet. */
const CERTS = [
  { img: "doc", name: "Declaration of Conformity", note: "CE certified" },
  { img: "lvd", name: "LVD", note: "Electrical safety compliant" },
  { img: "emc", name: "EMC", note: "Electromagnetic compliant" },
  { img: "rohs", name: "RoHS", note: "RoHS compliant" },
  { img: "md", name: "MD", note: "Machinery Directive" },
  { img: "ukca", name: "UKCA", note: "UK compliance certified" },
  { img: "en15194", name: "EN 15194", note: "EN 15194 compliant" },
  { img: "cpsia", name: "CPSIA", note: "Child-safe compliant" },
  { img: "en60335", name: "EN 60335", note: "Electrical safety certified" },
  { img: "en301489", name: "EN 301 489", note: "EMC ready" },
  { img: "ul2849", name: "UL 2849", note: "UL 2849 certified" },
  { img: "cispr", name: "AS/NZS CISPR", note: "EMC ready" },
];

export default function Certificates() {
  return (
    <section className="certs">
      <div className="section-head">
        <span className="section-label">Compliance</span>
        <h2>Certificates <span className="grad">on file.</span></h2>
        <p className="section-lead">Every ZEPHRIDE model is tested and documented against these standards.</p>
      </div>
      <div className="certs-grid">
        {CERTS.map((c) => (
          <div className="cert-card" key={c.name}>
            <span className="cert-mark">
              <img src={`/assets/certs/${c.img}.png`} alt={`${c.name} mark`} width={44} height={44} />
            </span>
            <div>
              <b>{c.name}</b>
              <small>{c.note}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
