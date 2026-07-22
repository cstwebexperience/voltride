/* Compliance marks — inline SVG logos, no external assets. */
const MARK = {
  ce: (
    <svg viewBox="0 0 62 40" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="butt" aria-hidden="true">
      <path d="M27 8a12 12 0 100 24" />
      <path d="M58 8a12 12 0 100 24" />
      <path d="M46 20h11" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5h11l7 7v23H11z" /><path d="M22 5v7h7" /><path d="M15 22l3 3 6-6" />
    </svg>
  ),
  lvd: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="20" cy="20" r="15" /><path d="M22 11l-6 10h5l-2 8 7-11h-5z" fill="currentColor" stroke="none" />
    </svg>
  ),
  emc: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="20" cy="20" r="15" /><circle cx="20" cy="20" r="2.4" fill="currentColor" stroke="none" />
      <path d="M13.5 13.5a9 9 0 000 13M26.5 13.5a9 9 0 010 13" />
    </svg>
  ),
  rohs: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path fill="#3ba03b" d="M31 8c-9 0-17 3-19 13-1 5 1 9 4 11 2-8 7-13 14-16-6 4-10 9-12 17 1 .3 2 .5 3 .5 9 0 13-6 12-15-.4-4-2-8-2-11z" />
    </svg>
  ),
  md: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="20" cy="20" r="4.5" />
      <path d="M20 6v4M20 30v4M6 20h4M30 20h4M10 10l3 3M27 27l3 3M30 10l-3 3M13 27l-3 3" />
    </svg>
  ),
  ukca: (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      <text x="30" y="17" textAnchor="middle" fontFamily="var(--display)" fontWeight="800" fontSize="15" fill="currentColor" letterSpacing="-1">UK</text>
      <text x="30" y="33" textAnchor="middle" fontFamily="var(--display)" fontWeight="800" fontSize="15" fill="currentColor" letterSpacing="-1">CA</text>
    </svg>
  ),
  bike: (
    <svg viewBox="0 0 44 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="27" r="7" /><circle cx="33" cy="27" r="7" />
      <path d="M11 27l7-12h9l-6 12M18 15l-3-4h-4M27 15l4 12" />
    </svg>
  ),
  shieldCheck: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 4l12 4v9c0 8-5 14-12 18-7-4-12-10-12-18V8z" /><path d="M14.5 20l4 4 7-8" />
    </svg>
  ),
  shieldBolt: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 4l12 4v9c0 8-5 14-12 18-7-4-12-10-12-18V8z" /><path d="M21 12l-5 9h4l-1 7 6-10h-4z" fill="currentColor" stroke="none" />
    </svg>
  ),
  radio: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="20" cy="22" r="3" fill="currentColor" stroke="none" /><path d="M20 25v9" />
      <path d="M14 16a8 8 0 000 12M26 16a8 8 0 010 12M10 12a14 14 0 000 20M30 12a14 14 0 010 20" />
    </svg>
  ),
  ul: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="none" stroke="#c8102e" strokeWidth="2.4" />
      <text x="20" y="26" textAnchor="middle" fontFamily="var(--display)" fontWeight="800" fontSize="15" fill="#c8102e" letterSpacing="-.5">UL</text>
    </svg>
  ),
  waves: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="6" y="6" width="28" height="28" rx="6" />
      <path d="M13 24c2-3 4-3 7 0s5 3 7 0M13 17c2-3 4-3 7 0s5 3 7 0" />
    </svg>
  ),
};

const CERTS = [
  { mark: "ce", name: "Declaration of Conformity", note: "CE certified" },
  { mark: "lvd", name: "LVD", note: "Electrical safety compliant" },
  { mark: "emc", name: "EMC", note: "Electromagnetic compliant" },
  { mark: "rohs", name: "RoHS", note: "RoHS compliant" },
  { mark: "md", name: "MD", note: "Machinery Directive" },
  { mark: "ukca", name: "UKCA", note: "UK compliance certified" },
  { mark: "bike", name: "EN 15194", note: "EN 15194 compliant" },
  { mark: "shieldCheck", name: "CPSIA", note: "Child-safe compliant" },
  { mark: "shieldBolt", name: "EN 60335", note: "Electrical safety certified" },
  { mark: "radio", name: "EN 301 489", note: "EMC ready" },
  { mark: "ul", name: "UL 2849", note: "UL 2849 certified" },
  { mark: "waves", name: "AS/NZS CISPR", note: "EMC ready" },
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
            <span className="cert-mark">{MARK[c.mark]}</span>
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
