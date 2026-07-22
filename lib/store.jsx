"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { COUNTRIES, PRODUCTS, productById, priceFor, euro } from "@/lib/data";

const StoreCtx = createContext(null);

export function StoreProvider({ children }) {
  const [countryCode, setCountryCode] = useState(null);
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      const c = localStorage.getItem("zr_country");
      if (COUNTRIES.some((x) => x.code === c)) setCountryCode(c);
      else setPickerOpen(true);
      const stored = JSON.parse(localStorage.getItem("zr_cart") || "[]");
      if (Array.isArray(stored)) setCart(stored.filter((i) => productById(i.id)));
    } catch {}
    setReady(true);
  }, []);

  const country = COUNTRIES.find((c) => c.code === countryCode) || null;

  const chooseCountry = useCallback((code) => {
    setCountryCode(code);
    setPickerOpen(false);
    try { localStorage.setItem("zr_country", code); } catch {}

    // Offer the page in the country's language via Google Translate.
    // Source content stays English; a googtrans cookie drives the on-page
    // translation and we reload only when the target language changes.
    try {
      const lang = (COUNTRIES.find((c) => c.code === code) || {}).lang || "en";
      const m = document.cookie.match(/googtrans=\/en\/([a-z-]+)/);
      const current = m ? m[1] : "en";
      if (lang === current) return;
      const host = location.hostname;
      const kill = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
      if (lang === "en") {
        document.cookie = `googtrans=;path=/;${kill}`;
        document.cookie = `googtrans=;path=/;domain=.${host};${kill}`;
      } else {
        document.cookie = `googtrans=/en/${lang};path=/`;
        document.cookie = `googtrans=/en/${lang};path=/;domain=.${host}`;
      }
      location.reload();
    } catch {}
  }, []);

  const persist = (next) => {
    setCart(next);
    try { localStorage.setItem("zr_cart", JSON.stringify(next)); } catch {}
  };

  const addToCart = useCallback((id, qty = 1) => {
    setCart((cur) => {
      const next = cur.some((i) => i.id === id)
        ? cur.map((i) => (i.id === id ? { ...i, qty: Math.min(9, i.qty + qty) } : i))
        : [...cur, { id, qty }];
      try { localStorage.setItem("zr_cart", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setCart((cur) => {
      const next = qty <= 0
        ? cur.filter((i) => i.id !== id)
        : cur.map((i) => (i.id === id ? { ...i, qty: Math.min(9, qty) } : i));
      try { localStorage.setItem("zr_cart", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const clearCart = useCallback(() => persist([]), []);

  const showToast = useCallback((msg, type = "") => {
    setToast({ msg, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  }, []);

  const price = useCallback((p) => priceFor(p, country), [country]);
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => {
    const p = productById(i.id);
    return s + (p ? priceFor(p, country) * i.qty : 0);
  }, 0);

  return (
    <StoreCtx.Provider value={{
      ready, country, pickerOpen, setPickerOpen, chooseCountry,
      cart, addToCart, setQty, clearCart, cartCount, cartTotal,
      price, euro, toast, showToast,
    }}>
      {children}
    </StoreCtx.Provider>
  );
}

export const useStore = () => useContext(StoreCtx);
