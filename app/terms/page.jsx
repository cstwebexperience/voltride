export const metadata = {
  title: "Terms & Conditions",
  description: "ZEPHRIDE Terms & Conditions — orders, payment, shipping, warranty and our all-sales-final policy.",
};

export default function TermsPage() {
  return (
    <main className="legal">
      <div className="legal-head">
        <span className="section-label">Legal</span>
        <h1>Terms &amp; <span className="grad">Conditions.</span></h1>
        <p className="legal-updated">Last updated: July 2026</p>
      </div>

      <div className="legal-body">
        <p className="legal-intro">
          These Terms &amp; Conditions ("Terms") govern every order placed through the ZEPHRIDE
          website (the "Site"). By placing an order, adding a product to your cart, or otherwise
          using the Site, you confirm that you have read, understood and agree to be bound by
          these Terms in full. If you do not agree with any part of these Terms, please do not
          place an order.
        </p>

        <h2>1. Who we are</h2>
        <p>
          ZEPHRIDE sells electric bicycles directly to consumers across the European countries
          listed on the Site. All prices shown are in Euros (€), are specific to the delivery
          country you select, and already include shipping unless stated otherwise.
        </p>

        <h2>2. Orders &amp; order confirmation</h2>
        <p>
          Placing an order through the Site (including via the cart and checkout flow) is a
          request to purchase, not an automatic contract of sale. Every order is manually
          reviewed for stock and delivery availability. A contract between you and ZEPHRIDE is
          only formed once we confirm your order in writing. We reserve the right to refuse,
          cancel or limit any order at our discretion, including in cases of suspected error,
          fraud, or unavailability of stock — in which case no payment will be taken or, if
          already taken, it will be refunded in full.
        </p>

        <h2>3. Pricing &amp; product information</h2>
        <p>
          We take reasonable care to ensure prices, specifications, images and descriptions on
          the Site are accurate at the time of publishing. Minor variations between the product
          shown and the product delivered (such as color rendering, packaging, or component
          revisions from the manufacturer) may occur and do not constitute a defect. Prices are
          subject to change without notice, but the price confirmed to you at order confirmation
          is the price you will pay.
        </p>

        <h2>4. Payment</h2>
        <p>
          No payment is collected at the moment you submit an order through the Site. Once your
          order is confirmed, payment is completed either (a) in cash to the courier upon
          delivery ("cash on delivery"), or (b) by card through a secure payment link sent to you
          by email after confirmation. Full payment is due before or at the point of delivery, as
          agreed at confirmation. Refusing delivery or refusing to pay after confirming an order
          may result in the order being cancelled and any applicable costs being charged back to
          you.
        </p>

        <h2 id="returns">5. All sales are final — no returns</h2>
        <p className="legal-highlight">
          Except where a defect is covered under Section&nbsp;7 (Warranty), <strong>all sales made
          through this Site are final.</strong> We do not accept returns, exchanges, or
          cancellations once an order has been confirmed and dispatched, for any reason,
          including but not limited to change of mind, incorrect expectations about size, weight,
          appearance, performance, or suitability for a particular use.
        </p>
        <p>
          By placing an order you expressly acknowledge and accept this no-returns policy. We
          strongly encourage you to read the full specifications, photos and FAQ on each product
          page, and to contact us with any question <em>before</em> ordering, since no request for
          return will be accepted after the order is confirmed.
        </p>

        <h2>6. Shipping &amp; delivery</h2>
        <p>
          We ship to the countries listed in the country selector on the Site. Estimated delivery
          windows are communicated at order confirmation and are not guaranteed delivery dates —
          they depend on carrier performance, customs handling where applicable, and product
          availability. ZEPHRIDE is not liable for delays caused by the courier, customs
          authorities, weather, or other circumstances outside our reasonable control. Risk in the
          product passes to you upon delivery.
        </p>

        <h2>7. Warranty</h2>
        <p>
          Every ZEPHRIDE bike is covered by a 2-year manufacturer warranty against manufacturing
          defects in materials and workmanship under normal use, starting from the delivery date.
          The warranty does not cover: normal wear and tear (tyres, brake pads, chains); damage
          from accidents, misuse, improper assembly, unauthorized modification, or lack of
          maintenance; cosmetic damage that does not affect function; or damage occurring after
          the product leaves our carrier's custody due to causes unrelated to manufacturing. A
          valid warranty claim will be repaired or the defective part replaced at our discretion;
          it does not entitle you to a refund or to return the bike as a whole outside of what is
          described in this section.
        </p>

        <h2>8. Certification &amp; compliance</h2>
        <p>
          Our products are tested and documented against CE, LVD, EMC, RoHS, Machinery Directive
          (MD), UKCA, EN&nbsp;15194, CPSIA, EN&nbsp;60335, EN&nbsp;301489, UL&nbsp;2849 and
          AS/NZS&nbsp;CISPR standards, as listed on the Site. Local rules on how and where an
          electric bicycle may be ridden vary by country and are the sole responsibility of the
          buyer to check and comply with before use. ZEPHRIDE makes no representation as to the
          legal status of any product in your specific jurisdiction.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by applicable law, ZEPHRIDE's total liability arising
          out of or in connection with any order shall not exceed the amount actually paid for
          that order. ZEPHRIDE shall not be liable for any indirect, incidental, or consequential
          loss, including loss of use, loss of time, or loss of enjoyment. Nothing in these Terms
          excludes or limits liability that cannot be excluded or limited under applicable
          mandatory law.
        </p>

        <h2>10. Assembly &amp; use</h2>
        <p>
          Bikes are shipped partially assembled. You are responsible for completing final
          assembly correctly using the supplied instructions and tools, for verifying all
          fasteners, brakes and the drivetrain are correctly tightened and adjusted before first
          ride, and for wearing appropriate safety equipment. ZEPHRIDE is not liable for injury or
          damage arising from incomplete, incorrect, or unsafe assembly or use.
        </p>

        <h2>11. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. The version published on the Site at the
          time you place an order is the version that applies to that order.
        </p>

        <h2>12. Governing law</h2>
        <p>
          These Terms are governed by the laws applicable in the country from which ZEPHRIDE
          operates, without regard to conflict-of-law principles, except where mandatory consumer
          protection law in your country of residence grants you rights that cannot be waived by
          contract.
        </p>

        <p className="legal-footnote">
          By placing an order you confirm you have read and accepted these Terms &amp; Conditions
          in full, including the no-returns policy described in Section&nbsp;5.
        </p>
      </div>
    </main>
  );
}
