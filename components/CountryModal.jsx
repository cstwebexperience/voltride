"use client";

import { useStore } from "@/lib/store";
import { COUNTRIES, flagUrl } from "@/lib/data";

export default function CountryModal() {
  const { ready, pickerOpen, chooseCountry } = useStore();
  if (!ready || !pickerOpen) return null;

  return (
    <div className="country-modal open" role="dialog" aria-modal="true" aria-label="Choose your country">
      <div className="country-card">
        <div className="country-glow" aria-hidden="true" />
        <span className="region-brand">ZEPH<span>RIDE</span></span>
        <h2>Where are you riding from?</h2>
        <p>Prices, delivery and availability are tailored to your country.</p>
        <div className="country-grid">
          {COUNTRIES.map((c) => (
            <button key={c.code} type="button" onClick={() => chooseCountry(c.code)}>
              <img src={flagUrl(c.code)} alt="" width={24} height={18} loading="lazy" />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
        <p className="country-foot">Free shipping · no customs fees inside the EU</p>
      </div>
    </div>
  );
}
