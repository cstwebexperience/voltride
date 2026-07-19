const ITEMS = ["FAT TIRES", "STREET-LEGAL", "70 NM TORQUE", "HYDRAULIC BRAKES", "DUAL SUSPENSION", "EN 15194 CERTIFIED", "FREE EU SHIPPING"];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {row.map((t, i) => (
          <span key={i}>{t}<span className="dot"> •</span></span>
        ))}
      </div>
    </div>
  );
}
