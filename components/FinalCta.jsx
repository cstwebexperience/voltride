import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="final-cta">
      <div className="final-cta-inner">
        <h2>The road ends.<br /><span className="grad">You don&apos;t have to.</span></h2>
        <p>Pick your machine, tell us where to send it, pay when it&apos;s confirmed. That&apos;s the whole deal.</p>
        <Link className="btn btn-primary btn-lg" href="/#bikes">Choose your bike →</Link>
      </div>
    </section>
  );
}
