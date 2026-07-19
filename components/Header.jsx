"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { flagUrl } from "@/lib/data";

export default function Header() {
  const { country, setPickerOpen, cartCount } = useStore();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    const onScroll = () => {
      const hero = document.querySelector("[data-hero]");
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= 72 : window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <Link className="logo" href="/" aria-label="ZEPHRIDE">
            <span className="logo-text">ZEPH<span>RIDE</span></span>
          </Link>
          <nav className="nav" aria-label="Main">
            <Link href="/#bikes">The bikes</Link>
            <Link href="/#shop">Quick shop</Link>
            <Link href="/#faq">FAQ</Link>
          </nav>
          <div className="header-right">
            <button className="country-pill" type="button" onClick={() => setPickerOpen(true)} aria-label="Change country" hidden={!country}>
              {country && <><img src={flagUrl(country.code)} alt="" width={20} height={15} /><span>{country.name}</span></>}
            </button>
            <Link className="cart-btn" href="/cart" aria-label="Cart">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            <button className={`btn-hamburger ${menuOpen ? "open" : ""}`} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><span /><span /></button>
          </div>
        </div>
      </header>

      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label="Mobile">
        <Link href="/#bikes">The bikes</Link>
        <Link href="/#shop">Quick shop</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/#faq">FAQ</Link>
        {country && (
          <button className="country-pill country-pill-mobile" type="button" onClick={() => { setMenuOpen(false); setPickerOpen(true); }}>
            <img src={flagUrl(country.code)} alt="" width={20} height={15} /><span>{country.name}</span>
          </button>
        )}
      </nav>
    </>
  );
}
