/* ============================================================
   ZEPHRIDE — fat-tire e-bike store
   ============================================================ */

const ORDER_EMAIL = "cstwebexperience@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initReveal();
  initHeroVideo();
  initCountry();
  initCatalog();
});

/* ─── Countries we ship to (price group per supplier tariff) ───
   Selling price = supplier cost × 1.75, rounded up to a clean …9. */
const COUNTRIES = [
  { code: "de", name: "Germany",        g: 0 },
  { code: "fr", name: "France",         g: 2 },
  { code: "it", name: "Italy",          g: 5 },
  { code: "es", name: "Spain",          g: 3 },
  { code: "nl", name: "Netherlands",    g: 1 },
  { code: "be", name: "Belgium",        g: 1 },
  { code: "at", name: "Austria",        g: 2 },
  { code: "pl", name: "Poland",         g: 6 },
  { code: "ro", name: "Romania",        g: 4 },
  { code: "cz", name: "Czech Republic", g: 3 },
  { code: "dk", name: "Denmark",        g: 2 },
  { code: "se", name: "Sweden",         g: 4 },
  { code: "fi", name: "Finland",        g: 4 },
  { code: "ie", name: "Ireland",        g: 4 },
  { code: "gr", name: "Greece",         g: 4 },
  { code: "hu", name: "Hungary",        g: 4 },
  { code: "lu", name: "Luxembourg",     g: 1 },
  { code: "ee", name: "Estonia",        g: 4 },
  { code: "lv", name: "Latvia",         g: 4 },
  { code: "lt", name: "Lithuania",      g: 4 },
  { code: "si", name: "Slovenia",       g: 4 },
  { code: "li", name: "Liechtenstein",  g: 4 },
];
const flagUrl = (code, size = 40) => `https://flagcdn.com/w${size}/${code}.png`;

function getCountry() {
  const saved = localStorage.getItem("zr_country");
  return COUNTRIES.find((c) => c.code === saved) || null;
}

/* ─── Product catalog ───
   prices[] indexes match the price groups:
   0 DE · 1 BE/LU/NL · 2 AT/DK/FR · 3 CZ/ES · 4 EE/FI/GR/HU/IE/LI/LT/LV/RO/SE/SI · 5 IT · 6 PL */
const PRODUCTS = [
  {
    id: "x80pro", name: "X80 Pro", badge: "Best-seller",
    prices: [1209, 1209, 1229, 1249, 1249, 1249, 1229],
    images: ["assets/images/products/x80pro/1.jpg", "assets/images/products/x80pro/2.jpg", "assets/images/products/x80pro/3.jpg", "assets/images/products/x80pro/4.jpg"],
    tagline: "The all-rounder that does everything.",
    short: "250 W · 50–65 km · Find My + Alarm",
    highlights: ["Find My anti-loss tracking", "Throttle + front rack + rear seat", "Hydraulic disc brakes"],
    specs: { "Motor": "48 V · 250 W", "Battery": "48 V · 15 Ah", "Range": "50–65 km", "Top speed": "25 km/h · road-legal", "Brakes": "Front & rear hydraulic disc", "Tyres": "20 × 4.0 fat", "Smart": "NFC · APP · Anti-loss (Find My) · Alarm", "Extras": "Throttle, front rack, rear seat", "Weight": "43 kg net · 51 kg gross", "Certified": "CE · EN 15194 · UKCA · RoHS" },
    desc: "The X80 Pro is our do-everything fat-tyre e-bike. Street-legal 250 W drive, 50–65 km of range and full smart connectivity — NFC unlock, app control, Find My anti-loss and a built-in alarm. It ships with a throttle, front rack and rear seat, so it's ready for the commute, the trail or a second rider straight out of the box."
  },
  {
    id: "x90", name: "X90", badge: "",
    prices: [1209, 1209, 1229, 1249, 1249, 1249, 1229],
    images: ["assets/images/products/x90/1.jpg"],
    tagline: "Same power, cleaner lines.",
    short: "250 W · 50–65 km · Find My + Alarm",
    highlights: ["Streamlined frame", "Find My + Alarm", "20×4.0 all-terrain"],
    specs: { "Motor": "48 V · 250 W", "Battery": "48 V · 15 Ah", "Range": "50–65 km", "Top speed": "25 km/h · road-legal", "Brakes": "Front & rear hydraulic disc", "Tyres": "20 × 4.0 fat", "Smart": "NFC · APP · Anti-loss (Find My) · Alarm", "Extras": "Throttle, front rack, rear seat", "Weight": "43 kg net · 50 kg gross", "Certified": "CE · EN 15194 · UKCA · RoHS" },
    desc: "The X90 shares the X80 Pro's drivetrain and smart features in a slightly sleeker package. 250 W, 50–65 km range, hydraulic discs and full anti-loss tracking — a clean, confident all-terrain ride for the city and beyond."
  },
  {
    id: "x80ultra", name: "X80 Ultra", badge: "Most range",
    prices: [1259, 1259, 1279, 1299, 1299, 1299, 1279],
    images: ["assets/images/products/x80ultra/1.jpg", "assets/images/products/x80ultra/2.jpg", "assets/images/products/x80ultra/3.jpg", "assets/images/products/x80ultra/4.jpg", "assets/images/products/x80ultra/5.jpg"],
    tagline: "More power. More battery. TFT dash.",
    short: "250/500 W · 60–80 km · TFT display",
    highlights: ["Up to 500 W", "60–80 km range", "Full-colour TFT display"],
    specs: { "Motor": "48 V · 250 / 500 W", "Battery": "48 V · 18.2 Ah", "Range": "60–80 km", "Top speed": "25 km/h · road-legal", "Display": "Full-colour TFT", "Brakes": "Front & rear hydraulic disc", "Tyres": "20 × 4.0 fat", "Smart": "TFT · NFC · APP · Anti-loss (Find My) · Alarm", "Weight": "43 kg net · 48.5 kg gross", "Certified": "CE · EN 15194 · UKCA · RoHS" },
    desc: "The X80 Ultra steps everything up: a bigger 18.2 Ah battery for 60–80 km of range, up to 500 W on tap and a crisp full-colour TFT dashboard. All the smart features of the Pro, with the endurance and punch for longer, wilder rides."
  },
  {
    id: "x70", name: "X70", badge: "Most power",
    prices: [1279, 1279, 1299, 1319, 1319, 1299, 1279],
    images: ["assets/images/products/x70/1.jpg", "assets/images/products/x70/2.jpg", "assets/images/products/x70/3.jpg", "assets/images/products/x70/4.jpg", "assets/images/products/x70/5.jpg"],
    tagline: "Steel-framed, up to 750 W.",
    short: "250/500/750 W · steel frame · 50–60 km",
    highlights: ["Up to 750 W", "Heavy-duty steel frame", "Hydraulic brakes"],
    specs: { "Motor": "48 V · 250 / 500 / 750 W", "Battery": "48 V · 15.6 Ah", "Range": "50–60 km", "Top speed": "25 km/h · road-legal", "Frame": "Reinforced steel", "Brakes": "Front & rear hydraulic disc", "Tyres": "20 × 4.0 fat", "Weight": "43 kg net · 51 kg gross", "Certified": "CE · EN 15194 · UKCA · RoHS" },
    desc: "The X70 is the muscle of the range — a reinforced steel frame and a motor that scales up to 750 W. Built to haul, climb and take a beating, with hydraulic discs to rein it all in. For riders who want maximum grunt."
  },
  {
    id: "x50", name: "X50", badge: "",
    prices: [1299, 1279, 1299, 1319, 1319, 1249, 1319],
    images: ["assets/images/products/x50/1.jpg", "assets/images/products/x50/2.jpg", "assets/images/products/x50/3.jpg", "assets/images/products/x50/4.jpg"],
    tagline: "Loaded with extras.",
    short: "250 W · 50–65 km · rear seat + phone bag",
    highlights: ["Chain cover + alarm", "Rear seat + phone bag included", "Lightest at 41 kg"],
    specs: { "Motor": "48 V · 250 W", "Battery": "48 V · 15 Ah", "Range": "50–65 km", "Top speed": "25 km/h · road-legal", "Brakes": "Front & rear hydraulic disc", "Tyres": "20 × 4.0 fat", "Extras": "Alarm, chain cover, rear seat, phone bag", "Weight": "41 kg net · 46 kg gross", "Certified": "CE · EN 15194 · UKCA · RoHS" },
    desc: "The X50 comes fully kitted — alarm, chain cover, a rear passenger seat and a phone bag all included. At 41 kg it's the lightest in the line-up, making it the friendliest daily rider without giving up the fat-tyre, full-suspension DNA."
  },
];

function euro(n) { return "€" + n.toLocaleString("en-US"); }
function priceOf(p) {
  const c = getCountry();
  return p.prices[c ? c.g : 0];
}

/* ─── Country welcome modal + header pill ─── */
function initCountry() {
  const modal = document.querySelector("[data-country-modal]");
  const grid = document.querySelector("[data-country-grid]");
  if (!modal || !grid) return;

  grid.innerHTML = COUNTRIES.map((c) => `
    <button type="button" data-c="${c.code}">
      <img src="${flagUrl(c.code)}" alt="" width="24" height="18" loading="lazy" />
      <span>${c.name}</span>
    </button>`).join("");

  function updatePill() {
    const c = getCountry();
    ["[data-country-pill]", "[data-country-pill-m]"].forEach((sel) => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.hidden = !c;
      if (c) {
        el.querySelector("img").src = flagUrl(c.code);
        el.querySelector("span").textContent = c.name;
      }
    });
  }

  function open() { modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function close() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-c]");
    if (!btn) return;
    localStorage.setItem("zr_country", btn.getAttribute("data-c"));
    updatePill();
    refreshPrices();
    close();
  });

  document.querySelectorAll("[data-country-pill], [data-country-pill-m]").forEach((el) =>
    el.addEventListener("click", open));

  updatePill();
  if (!getCountry()) open();
}

/* re-render all visible prices after a country switch */
function refreshPrices() {
  document.querySelectorAll("[data-price-for]").forEach((el) => {
    const p = PRODUCTS.find((x) => x.id === el.getAttribute("data-price-for"));
    if (p) el.textContent = euro(priceOf(p));
  });
}

/* ─── Product grid + eMAG-style detail modal ─── */
function initCatalog() {
  const grid = document.querySelector("[data-catalog]");
  const modal = document.querySelector("[data-pd-modal]");
  if (!grid || !modal) return;
  const panel = modal.querySelector("[data-pd-panel]");

  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="pcard" data-reveal data-open="${p.id}">
      <div class="pcard-media">
        ${p.badge ? `<span class="pcard-badge">${p.badge}</span>` : ""}
        <img src="${p.images[0]}" alt="ZEPHRIDE ${p.name}" loading="lazy" />
      </div>
      <div class="pcard-body">
        <div class="pcard-top"><h3>${p.name}</h3><span class="pcard-price" data-price-for="${p.id}">${euro(priceOf(p))}</span></div>
        <p class="pcard-short">${p.short}</p>
        <button class="pcard-cta" type="button">View details →</button>
      </div>
    </article>`).join("");

  function open(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const c = getCountry();
    panel.innerHTML = `
      <button class="pd-close" type="button" data-pd-close aria-label="Close">✕</button>
      <div class="pd-gallery">
        <div class="pd-stage"><img data-pd-main src="${p.images[0]}" alt="ZEPHRIDE ${p.name}" /></div>
        ${p.images.length > 1 ? `
        <div class="pd-thumbs">
          ${p.images.map((src, i) => `<button type="button" class="${i === 0 ? "on" : ""}" data-thumb="${src}"><img src="${src}" alt="" loading="lazy" /></button>`).join("")}
        </div>` : ""}
      </div>
      <div class="pd-info">
        ${p.badge ? `<span class="kicker">${p.badge}</span>` : ""}
        <h3 class="pd-name">${p.name}</h3>
        <p class="pd-tagline">${p.tagline}</p>
        <div class="pd-price"><span data-price-for="${p.id}">${euro(priceOf(p))}</span>
          <span class="pd-price-note">· free shipping${c ? ` to ${c.name}` : ""}</span>
        </div>
        <p class="pd-desc">${p.desc}</p>
        <ul class="pd-high">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
        <div class="pd-specs">${Object.entries(p.specs).map(([k, v]) => `<div class="pd-row"><span>${k}</span><b>${v}</b></div>`).join("")}</div>

        <form class="pd-form" data-order-form novalidate>
          <h4>Order the ${p.name}</h4>
          <p class="pd-form-lead">No payment now — we confirm price, availability and delivery within 24h.</p>
          <div class="form-row-2">
            <div class="form-group"><label>Full name *</label><input type="text" name="name" placeholder="John Rider" required autocomplete="name" /></div>
            <div class="form-group"><label>Email *</label><input type="email" name="email" placeholder="you@email.com" required autocomplete="email" /></div>
          </div>
          <div class="form-row-2">
            <div class="form-group"><label>Country *</label>
              <select name="country" required>
                ${COUNTRIES.map((x) => `<option value="${x.name}" ${c && c.code === x.code ? "selected" : ""}>${x.name}</option>`).join("")}
              </select>
            </div>
            <div class="form-group"><label>Phone / WhatsApp</label><input type="tel" name="phone" placeholder="+49 151 1234 5678" autocomplete="tel" /></div>
          </div>
          <div class="form-row-2">
            <div class="form-group"><label>Quantity</label>
              <select name="quantity"><option>1</option><option>2</option><option>3</option><option>4+</option></select>
            </div>
            <div class="form-group"><label>Color</label>
              <select name="color"><option value="">No preference</option><option>Black</option><option>Grey</option></select>
            </div>
          </div>
          <div class="form-group"><label>Message (optional)</label><textarea name="message" placeholder="Anything we should know about your order or delivery?"></textarea></div>
          <button class="btn btn-primary btn-block" type="submit" data-order-submit>Send order request →</button>
          <p class="form-note">By sending you agree we may contact you about your request. No payment is taken here.</p>
        </form>
      </div>`;
    bindOrderForm(panel.querySelector("[data-order-form]"), p);

    const main = panel.querySelector("[data-pd-main]");
    panel.querySelectorAll("[data-thumb]").forEach((btn) =>
      btn.addEventListener("click", () => {
        main.src = btn.getAttribute("data-thumb");
        panel.querySelectorAll("[data-thumb]").forEach((b) => b.classList.toggle("on", b === btn));
      }));

    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    panel.scrollTop = 0;
  }
  function close() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }

  grid.querySelectorAll("[data-open]").forEach((el) => el.addEventListener("click", () => open(el.getAttribute("data-open"))));
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-pd-close]") || e.target.classList.contains("pd-backdrop")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  grid.querySelectorAll("[data-reveal]").forEach((el, i) => setTimeout(() => el.classList.add("in"), 70 * i));
}

/* ─── Order form (per product, sent server-side via /api/order) ─── */
function bindOrderForm(form, product) {
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const group = field.closest(".form-group");
      const ok = field.checkValidity() && field.value.trim() !== "";
      if (group) group.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) { showToast("Please fill in the required fields.", "error"); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    const ref = "ZR-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" +
                Math.random().toString(36).slice(2, 6).toUpperCase();

    const btn = form.querySelector("[data-order-submit]");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending…";

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref,
          product: product.name,
          price: euro(priceOf(product)),
          name: data.name,
          email: data.email,
          country: data.country,
          phone: data.phone || "—",
          color: data.color || "No preference",
          quantity: data.quantity || "1",
          message: data.message || "—",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      showToast(`Order request sent! Ref ${ref}. We'll reply within 24h.`, "success");
      form.reset();
      form.querySelectorAll(".invalid").forEach((g) => g.classList.remove("invalid"));
    } catch (err) {
      showToast("Couldn't send right now — email us at " + ORDER_EMAIL, "error");
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      const group = field.closest(".form-group");
      if (group) group.classList.remove("invalid");
    });
  });
}

/* ─── Hero — 4 static shots, the REAL clip (full quality) auto-plays between them. ─── */
function initHeroVideo() {
  const section = document.querySelector("[data-hero]");
  if (!section) return;

  const sticky    = section.querySelector(".hv-sticky");
  const video     = section.querySelector("[data-hv-video]");
  const notes     = Array.from(section.querySelectorAll(".hv-note"));
  const loadingEl = section.querySelector("[data-hv-loading]");
  const fabEl     = document.querySelector(".fab");

  const SRC_WIDE = "assets/video/hero-16x9.mp4";
  const SRC_TALL = "assets/video/hero-9x16.mp4";
  const CH_VH = 76;
  const KF = [0.02, 0.29, 0.55, 0.80, 0.97];
  const N = KF.length;

  section.style.height = (N * CH_VH) + "vh";

  let dur = 0, isTall = null, settled = 0, primed = false;

  function pickSrc() {
    const tall = window.innerWidth < window.innerHeight;
    if (tall === isTall) return;
    isTall = tall; primed = false;
    video.src = tall ? SRC_TALL : SRC_WIDE;
    video.load();
  }
  const play = () => { const q = video.play(); if (q && q.catch) q.catch(() => {}); };

  video.muted = true; video.playsInline = true;
  video.addEventListener("loadedmetadata", () => { dur = video.duration || 6; try { video.currentTime = KF[settled] * dur; } catch (e) {} });
  video.addEventListener("loadeddata", () => {
    dur = video.duration || 6;
    if (!primed) { primed = true; try { video.currentTime = KF[settled] * dur; } catch (e) {} video.pause(); }
    if (loadingEl) loadingEl.classList.add("hidden");
  });
  pickSrc();

  function progress() {
    const r = section.getBoundingClientRect();
    const total = r.height - sticky.clientHeight;
    const p = total > 0 ? -r.top / total : 0;
    return Math.max(0, Math.min(1, p));
  }

  let rafId = null, inView = true;
  function frame() {
    if (dur > 0) {
      const p = progress();
      const target = Math.max(0, Math.min(N - 1, Math.floor(p * N)));
      const ct = video.currentTime;

      if (target > settled) {
        if (video.paused) play();
        if (ct >= KF[target] * dur - 0.02) { video.pause(); settled = target; }
      } else if (target < settled) {
        if (!video.paused) video.pause();
        try { video.currentTime = KF[target] * dur; } catch (e) {}
        settled = target;
      } else {
        if (!video.paused) video.pause();
        if (!video.seeking && Math.abs(ct - KF[settled] * dur) > 0.2) {
          try { video.currentTime = KF[settled] * dur; } catch (e) {}
        }
      }

      const holding = target === settled;
      notes.forEach((el, i) => el.classList.toggle("is-on", holding && i === settled));

      if (fabEl) {
        const pastHero = section.getBoundingClientRect().bottom < sticky.clientHeight - 2;
        fabEl.classList.toggle("is-hidden", !pastHero && p < 0.92);
      }
    }
    rafId = inView ? requestAnimationFrame(frame) : null;
  }
  function startLoop() { if (rafId == null) rafId = requestAnimationFrame(frame); }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((es) => { inView = es[0].isIntersecting; if (inView) startLoop(); else video.pause(); }, { rootMargin: "200px" }).observe(section);
  }
  window.addEventListener("scroll", startLoop, { passive: true });
  window.addEventListener("resize", pickSrc);
  window.addEventListener("orientationchange", () => setTimeout(pickSrc, 300));
  document.addEventListener("visibilitychange", () => { if (!document.hidden) startLoop(); });
  startLoop();
}

/* ─── Header shrink on scroll ─── */
function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const hero = document.querySelector("[data-hero]");
  const onScroll = () => {
    const past = hero ? hero.getBoundingClientRect().bottom <= 72 : window.scrollY > 20;
    header.classList.toggle("scrolled", past);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ─── Mobile nav ─── */
function initMobileNav() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-mobile-nav]");
  if (!toggle || !nav) return;

  const close = () => { toggle.classList.remove("open"); nav.classList.remove("open"); };

  toggle.addEventListener("click", () => {
    const open = toggle.classList.toggle("open");
    nav.classList.toggle("open", open);
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* ─── Reveal on scroll ─── */
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ─── Toast ─── */
let toastTimer;
function showToast(msg, type = "") {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;
  toast.textContent = msg;
  toast.className = "toast show" + (type ? " " + type : "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = "toast"; }, 4200);
}
