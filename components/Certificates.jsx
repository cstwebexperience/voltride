const CERTS = [
  { code: "DOC", name: "Declaration of Conformity", note: "CE Certified" },
  { code: "LVD", name: "LVD", note: "Electrical Safety Compliant" },
  { code: "EMC", name: "EMC", note: "Electromagnetic Compliant" },
  { code: "RoHS", name: "RoHS", note: "RoHS Compliant" },
  { code: "MD", name: "MD", note: "Machinery Directive" },
  { code: "UKCA", name: "UKCA", note: "UK Compliance Certified" },
  { code: "EN", name: "EN 15194", note: "EN 15194 Compliant" },
  { code: "CPSIA", name: "CPSIA", note: "Child-Safe Compliant" },
  { code: "EN", name: "EN 60335", note: "Electrical Safety Certified" },
  { code: "EN", name: "EN 301489", note: "EMC Ready" },
  { code: "UL", name: "UL 2849", note: "UL 2849 Certified" },
  { code: "CISPR", name: "AS/NZS CISPR", note: "EMC Ready" },
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
        {CERTS.map((c, i) => (
          <div className="cert-card" key={`${c.name}-${i}`}>
            <span className="cert-code">{c.code}</span>
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
