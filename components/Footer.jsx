import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="logo" href="/" aria-label="ZEPHRIDE"><span className="logo-mark">⚡</span><span className="logo-text">ZEPH<span>RIDE</span></span></Link>
          <p>All-terrain electric bikes, shipped across Europe.</p>
        </div>
        <div className="footer-links">
          <span className="footer-links-title">Explore</span>
          <Link href="/#bikes">The bikes</Link>
          <Link href="/#shop">Quick shop</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <div className="footer-links">
          <span className="footer-links-title">Shop</span>
          <Link href="/cart">Cart</Link>
          <Link href="/bikes/x80pro">X80 Pro</Link>
          <Link href="/bikes/x80ultra">X80 Ultra</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ZEPHRIDE. All rights reserved.</p>
        <p>Specifications are indicative and may vary by configuration.</p>
      </div>
    </footer>
  );
}
