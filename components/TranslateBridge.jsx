"use client";

import { useEffect } from "react";

/* Loads Google's website translation widget ONLY when a translation is
   active (a googtrans cookie is set). English visitors never load Google's
   script, keeping the default experience fast and third-party-free. */
export default function TranslateBridge() {
  useEffect(() => {
    if (!/googtrans=\/en\/[a-z-]+/.test(document.cookie)) return;
    if (document.getElementById("gt-script")) return;
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      } catch {}
    };
    const s = document.createElement("script");
    s.id = "gt-script";
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return <div id="google_translate_element" aria-hidden="true" style={{ display: "none" }} />;
}
