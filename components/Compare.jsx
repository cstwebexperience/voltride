"use client";

import Link from "next/link";
import { PRODUCTS, COMPARE_ROWS } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function Compare() {
  const { price, euro } = useStore();

  return (
    <section className="compare" id="compare">
      <div className="section-head">
        <span className="section-label">Head to head</span>
        <h2>Which one is <span className="grad">yours?</span></h2>
        <p className="section-lead">Every model side by side — the differences that actually matter.</p>
      </div>

      <div className="compare-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col" aria-label="Spec" />
              {PRODUCTS.map((p) => (
                <th scope="col" key={p.id}>
                  <Link href={`/bikes/${p.id}`}>{p.name}</Link>
                  {p.badge && <em>{p.badge}</em>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="compare-price">
              <th scope="row">Price</th>
              {PRODUCTS.map((p) => <td key={p.id}><b>{euro(price(p))}</b></td>)}
            </tr>
            {COMPARE_ROWS.map(([label, get]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {PRODUCTS.map((p) => <td key={p.id}>{get(p)}</td>)}
              </tr>
            ))}
            <tr className="compare-cta">
              <th scope="row" />
              {PRODUCTS.map((p) => (
                <td key={p.id}><Link className="btn btn-ghost btn-sm" href={`/bikes/${p.id}`}>View →</Link></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
