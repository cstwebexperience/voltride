/* ============================================================
   ZEPHRIDE — Fat X80 Pro
   ============================================================ */

/* Where order requests are emailed.
   formsubmit.co works CLIENT-SIDE with zero config.
   One-time setup: the FIRST time a request is sent, formsubmit emails
   you an "Activate Form" link — click it once and you're set forever.
   EDIT this to the inbox you want orders to land in. */
const ORDER_EMAIL = "cstwebexperience@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initReveal();
  initCountUp();
  initHeroVideo();
  initCatalog();
  initRegion();
  initOrderForm();
});

/* ─── Product catalog (cards + eMAG/Alibaba-style detail) ─── */
const PRODUCTS = [
  {
    id: "x80pro", name: "X80 Pro", price: 1209, badge: "Best-seller",
    tagline: "The all-rounder that does everything.",
    short: "250 W · 50–65 km · Find My + Alarm",
    highlights: ["Find My anti-loss tracking", "Throttle + front rack + rear seat", "Hydraulic disc brakes"],
    specs: { "Motor": "48 V · 250 W", "Battery": "48 V · 15 Ah", "Range": "50–65 km", "Top speed": "25 km/h · road-legal", "Brakes": "Front & rear hydraulic disc", "Tyres": "20 × 4.0 fat", "Smart": "NFC · APP · Anti-loss (Find My) · Alarm", "Extras": "Throttle, front rack, rear seat", "Weight": "43 kg net · 51 kg gross" },
    desc: "The X80 Pro is our do-everything fat-tyre e-bike. Street-legal 250 W drive, 50–65 km of range and full smart connectivity — NFC unlock, app control, Find My anti-loss and a built-in alarm. It ships with a throttle, front rack and rear seat, so it's ready for the commute, the trail or a second rider straight out of the box."
  },
  {
    id: "x90", name: "X90", price: 1209, badge: "",
    tagline: "Same power, cleaner lines.",
    short: "250 W · 50–65 km · Find My + Alarm",
    highlights: ["Streamlined frame", "Find My + Alarm", "20×4.0 all-terrain"],
    specs: { "Motor": "48 V · 250 W", "Battery": "48 V · 15 Ah", "Range": "50–65 km", "Top speed": "25 km/h · road-legal", "Brakes": "Front & rear hydraulic disc", "Tyres": "20 × 4.0 fat", "Smart": "NFC · APP · Anti-loss (Find My) · Alarm", "Extras": "Throttle, front rack, rear seat", "Weight": "43 kg net · 50 kg gross" },
    desc: "The X90 shares the X80 Pro's drivetrain and smart features in a slightly sleeker package. 250 W, 50–65 km range, hydraulic discs and full anti-loss tracking — a clean, confident all-terrain ride for the city and beyond."
  },
  {
    id: "x80ultra", name: "X80 Ultra", price: 1259, badge: "Most range",
    tagline: "More power. More battery. TFT dash.",
    short: "250/500 W · 60–80 km · TFT display",
    highlights: ["Up to 500 W", "60–80 km range", "Full-colour TFT display"],
    specs: { "Motor": "48 V · 250 / 500 W", "Battery": "48 V · 18.2 Ah", "Range": "60–80 km", "Top speed": "25 km/h · road-legal", "Display": "Full-colour TFT", "Brakes": "Front & rear hydraulic disc", "Tyres": "20 × 4.0 fat", "Smart": "TFT · NFC · APP · Anti-loss (Find My) · Alarm", "Weight": "43 kg net · 49.5 kg gross" },
    desc: "The X80 Ultra steps everything up: a bigger 18.2 Ah battery for 60–80 km of range, up to 500 W on tap and a crisp full-colour TFT dashboard. All the smart features of the Pro, with the endurance and punch for longer, wilder rides."
  },
  {
    id: "x70", name: "X70", price: 1279, badge: "Most power",
    tagline: "Steel-framed, up to 750 W.",
    short: "250/500/750 W · steel frame · 50–60 km",
    highlights: ["Up to 750 W", "Heavy-duty steel frame", "Hydraulic brakes"],
    specs: { "Motor": "48 V · 250 / 500 / 750 W", "Battery": "48 V · 15.6 Ah", "Range": "50–60 km", "Top speed": "25 km/h · road-legal", "Frame": "Reinforced steel", "Brakes": "Front & rear hydraulic disc", "Tyres": "20 × 4.0 fat", "Weight": "43 kg net · 51 kg gross" },
    desc: "The X70 is the muscle of the range — a reinforced steel frame and a motor that scales up to 750 W. Built to haul, climb and take a beating, with hydraulic discs to rein it all in. For riders who want maximum grunt."
  },
  {
    id: "x50", name: "X50", price: 1299, badge: "",
    tagline: "Loaded with extras.",
    short: "250 W · 50–65 km · rear seat + phone bag",
    highlights: ["Chain cover + alarm", "Rear seat + phone bag included", "Lightest at 41 kg"],
    specs: { "Motor": "48 V · 250 W", "Battery": "48 V · 15 Ah", "Range": "50–65 km", "Top speed": "25 km/h · road-legal", "Brakes": "Front & rear hydraulic disc", "Tyres": "20 × 4.0 fat", "Extras": "Alarm, chain cover, rear seat, phone bag", "Weight": "41 kg net · 46 kg gross" },
    desc: "The X50 comes fully kitted — alarm, chain cover, a rear passenger seat and a phone bag all included. At 41 kg it's the lightest in the line-up, making it the friendliest daily rider without giving up the fat-tyre, full-suspension DNA."
  },
];

function euro(n) { return "€" + n.toLocaleString("en-US"); }

function initCatalog() {
  const grid = document.querySelector("[data-catalog]");
  const modal = document.querySelector("[data-pd-modal]");
  if (!grid || !modal) return;
  const panel = modal.querySelector("[data-pd-panel]");

  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="pcard" data-reveal data-open="${p.id}">
      <div class="pcard-media">
        ${p.badge ? `<span class="pcard-badge">${p.badge}</span>` : ""}
        <div class="pcard-ph"><span>${p.name}</span><small>photo coming soon</small></div>
      </div>
      <div class="pcard-body">
        <div class="pcard-top"><h3>${p.name}</h3><span class="pcard-price">${euro(p.price)}</span></div>
        <p class="pcard-short">${p.short}</p>
        <button class="pcard-cta" type="button">View details →</button>
      </div>
    </article>`).join("");

  function open(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    panel.innerHTML = `
      <button class="pd-close" type="button" data-pd-close aria-label="Close">✕</button>
      <div class="pd-media"><div class="pcard-ph"><span>${p.name}</span><small>photo coming soon</small></div></div>
      <div class="pd-info">
        ${p.badge ? `<span class="kicker">${p.badge}</span>` : ""}
        <h3 class="pd-name">${p.name}</h3>
        <p class="pd-tagline">${p.tagline}</p>
        <div class="pd-price">${euro(p.price)} <span>· free worldwide shipping</span></div>
        <p class="pd-desc">${p.desc}</p>
        <ul class="pd-high">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
        <div class="pd-specs">${Object.entries(p.specs).map(([k, v]) => `<div class="pd-row"><span>${k}</span><b>${v}</b></div>`).join("")}</div>
        <a class="btn btn-primary btn-block" href="mailto:cstwebexperience@gmail.com?subject=${encodeURIComponent("Order — " + p.name)}&body=${encodeURIComponent("Hi, I'd like to order the " + p.name + " (" + euro(p.price) + "). My country: ")}">Order the ${p.name} →</a>
        <p class="form-note">No payment here — we reply within 24h with availability &amp; delivery.</p>
      </div>`;
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function close() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }

  grid.querySelectorAll("[data-open]").forEach((el) => el.addEventListener("click", () => open(el.getAttribute("data-open"))));
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-pd-close]") || e.target.classList.contains("pd-backdrop")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  // reveal the freshly injected cards (staggered)
  grid.querySelectorAll("[data-reveal]").forEach((el, i) => setTimeout(() => el.classList.add("in"), 70 * i));
}

/* ─── Region + language welcome ─── */
function initRegion() {
  const modal = document.querySelector("[data-region-modal]");
  if (!modal) return;
  if (localStorage.getItem("zr_region")) { modal.remove(); return; }
  modal.classList.add("open");
  modal.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-region]");
    if (!btn) return;
    localStorage.setItem("zr_region", btn.getAttribute("data-region"));
    const lang = modal.querySelector("[data-lang]");
    if (lang) localStorage.setItem("zr_lang", lang.value);
    modal.classList.remove("open");
    setTimeout(() => modal.remove(), 400);
  });
}

/* ─── Hero — 4 static shots, the REAL clip (full quality) auto-plays between them.
       A light scroll plays the transition to the next shot, then it holds. ─── */
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
  const CH_VH = 76;                              // scroll length per chapter
  const KF = [0.02, 0.29, 0.55, 0.80, 0.97];     // the 5 shots: City-front · City-side · Mountain · Beach · POV ride
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
        // play the REAL transition forward toward the next shot (full 60fps, like the video)
        if (video.paused) play();
        if (ct >= KF[target] * dur - 0.02) { video.pause(); settled = target; }
      } else if (target < settled) {
        // scrolled back → snap to the previous shot
        if (!video.paused) video.pause();
        try { video.currentTime = KF[target] * dur; } catch (e) {}
        settled = target;
      } else {
        // holding on the current shot — park exactly on it
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

/* ─── (legacy) Scroll-scrub hero — inert now that there is no [data-scrub] element ─── */
function initScrub() {
  const section = document.querySelector("[data-scrub]");
  if (!section) return;

  const sticky    = section.querySelector(".scrub-sticky");
  const canvas    = section.querySelector("[data-scrub-canvas]");
  const ctx       = canvas.getContext("2d", { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  const frameEl   = section.querySelector("[data-scrub-frame]");
  const introEl   = section.querySelector("[data-scrub-intro]");
  const ctaEl     = section.querySelector("[data-scrub-cta]");
  const hintEl    = section.querySelector("[data-scrub-hint]");
  const loadingEl = section.querySelector("[data-scrub-loading]");
  const flashEl   = section.querySelector("[data-scrub-flash]");
  const annoEls   = Array.from(section.querySelectorAll("[data-anno]"));
  const fabEl     = document.querySelector(".fab");

  const HOLD = 0.42;             // share of each scene spent holding the still (with its info shown)
  const SCENE_VH = 110;          // scroll length per scene

  // Each scene has a portrait (tall, 9:16) and a landscape (wide, 16:9) frame set.
  const scenes = [
    { tall: { dir: "assets/frames/mountain/", count: 60 }, wide: { dir: "assets/frames/mountain-wide/", count: 60 } },
    { tall: { dir: "assets/frames/forest/",   count: 60 }, wide: { dir: "assets/frames/forest-wide/", count: 60 } },
    { tall: { dir: "assets/frames/city/",     count: 60 }, wide: { dir: "assets/frames/city-wide/",   count: 60 } },
  ];
  section.style.height = scenes.length * SCENE_VH + "vh";

  const TALL_ASPECT = 9 / 16, WIDE_ASPECT = 16 / 9;
  let landscape = false; // recomputed on resize; each scene uses its wide set in landscape if it has one

  const initSet = (set) => { if (set && !set.imgs) { set.imgs = new Array(set.count); set.loaded = 0; set.ready = false; set.requested = false; } };
  scenes.forEach((s) => { initSet(s.tall); initSet(s.wide); });

  const activeSet = (s) => (landscape && s.wide ? s.wide : s.tall);
  const aspectOf  = (s) => (landscape && s.wide ? WIDE_ASPECT : TALL_ASPECT);

  const pad = (n) => String(n).padStart(3, "0");
  function loadSet(set, isFirst) {
    if (!set || set.requested) return;
    set.requested = true;
    for (let i = 0; i < set.count; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        set.loaded++;
        if (set.loaded >= set.count) { set.ready = true; if (isFirst && loadingEl) loadingEl.classList.add("hidden"); }
        if (isFirst && i === 0) draw();
      };
      img.src = set.dir + pad(i + 1) + ".jpg";
      set.imgs[i] = img;
    }
  }
  function loadScene(si) { const s = scenes[si]; if (!s) return; loadSet(activeSet(s), si === 0); }

  let vw = 0, vh = 0, dpr = 1, rect = { x: 0, y: 0, w: 0, h: 0 };

  function computeRect(fa) {
    // ALWAYS cover the viewport — full-bleed on every device (phone + desktop), no glass edges
    let w = vw, h = vw / fa;
    if (h < vh) { h = vh; w = vh * fa; }
    rect = { x: (vw - w) / 2, y: (vh - h) / 2, w, h };
    frameEl.style.left = rect.x + "px";
    frameEl.style.top = rect.y + "px";
    frameEl.style.width = rect.w + "px";
    frameEl.style.height = rect.h + "px";
  }

  function resize() {
    vw = sticky.clientWidth; vh = sticky.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    canvas.style.width = vw + "px";
    canvas.style.height = vh + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high"; // resizing the canvas resets these
    landscape = vw > vh;
    loadScene(0); loadScene(1);
    draw(); // draw computes the rect per active scene aspect
  }

  function state() {
    const r = section.getBoundingClientRect();
    const total = r.height - vh;
    let p = total > 0 ? -r.top / total : 0;
    p = Math.max(0, Math.min(1, p));
    const pos = p * scenes.length;
    let si = Math.min(Math.floor(pos), scenes.length - 1);
    let frac = pos - si;
    if (si === scenes.length - 1) frac = Math.min(frac, 1);
    return { p, si, frac };
  }

  function draw() {
    const st = state();
    const s = scenes[st.si];
    const set = activeSet(s);
    const fa = aspectOf(s);
    computeRect(fa);
    frameEl.classList.toggle("wide", fa === WIDE_ASPECT);
    loadScene(st.si);
    loadScene(st.si + 1);

    // frame index (held still during the scene's hold, then scrubs)
    let f = 0, scrubP = 0;
    if (st.frac >= HOLD) {
      scrubP = (st.frac - HOLD) / (1 - HOLD);
      f = Math.round(scrubP * (set.count - 1));
    }

    const img = (set.ready && set.imgs[f] && set.imgs[f].complete) ? set.imgs[f]
              : (set.imgs[0] && set.imgs[0].complete ? set.imgs[0] : null);
    ctx.fillStyle = "#08080a";
    ctx.fillRect(0, 0, vw, vh);
    if (img) ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);

    // smooth bump 0→1→0 across [a,b]
    const bump = (x, a, b, rin, rout) => {
      if (x < a || x > b) return 0;
      const l = (x - a) / (b - a);
      return Math.max(0, Math.min(1, Math.min(l / rin, (1 - l) / rout)));
    };

    // intro shows first (scene 0), THEN annotations — never both at once
    let introOp = 0;
    if (st.si === 0) {
      if (st.frac < HOLD * 0.4) introOp = 1;
      else if (st.frac < HOLD * 0.58) introOp = 1 - (st.frac - HOLD * 0.4) / (HOLD * 0.18);
    }
    introEl.style.opacity = introOp;
    introEl.style.pointerEvents = introOp > 0.5 ? "auto" : "none";

    // info stays visible for (almost) the whole hold, fading only as the scene transitions
    const aEnd = HOLD + 0.05;
    const annoOn = st.si === 0
      ? bump(st.frac, HOLD * 0.52, aEnd, 0.16, 0.22)
      : bump(st.frac, 0.0, aEnd, 0.10, 0.22);
    annoEls.forEach((el, i) => {
      const active = i === st.si;   // clean captions are centered — work on mobile & desktop
      el.classList.toggle("show", active && annoOn > 0.4);
      el.style.opacity = active ? annoOn : 0;
    });

    // final CTA on last scene
    const last = scenes.length - 1;
    let ctaOp = st.si === last ? (st.frac - 0.55) / 0.25 : 0;
    ctaOp = Math.max(0, Math.min(1, ctaOp));
    ctaEl.style.opacity = ctaOp;
    ctaEl.style.pointerEvents = ctaOp > 0.5 ? "auto" : "none";

    // floating Order button: hidden over the intro & when the hero's own CTA is up;
    // always visible once you've scrolled past the hero into the page content
    if (fabEl) {
      const pastHero = section.getBoundingClientRect().bottom < vh - 2;
      fabEl.classList.toggle("is-hidden", !pastHero && (st.p < 0.04 || ctaOp > 0.3));
    }

    // scroll hint (only at very top)
    if (hintEl) hintEl.style.opacity = st.p < 0.02 ? 1 : 0;

    // flash at scene boundaries
    let flash = 0;
    if (st.si < last && st.frac > 0.85) flash = (st.frac - 0.85) / 0.15;
    if (st.si > 0 && st.frac < 0.15) flash = Math.max(flash, (0.15 - st.frac) / 0.15);
    if (flashEl) flashEl.style.opacity = flash * 0.9;
  }

  // SMOOTH: redraw every animation frame while the hero is on screen (no scroll-throttle gaps)
  let rafId = null, inView = true;
  function loop() { draw(); rafId = inView ? requestAnimationFrame(loop) : null; }
  function startLoop() { if (rafId == null) rafId = requestAnimationFrame(loop); }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((es) => { inView = es[0].isIntersecting; if (inView) startLoop(); }, { rootMargin: "150px" }).observe(section);
  }
  // robust across devices: resize, rotation, iOS/Android address-bar (visualViewport)
  let rT;
  const onResize = () => { clearTimeout(rT); rT = setTimeout(resize, 80); };
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", () => setTimeout(resize, 250));
  if (window.visualViewport) window.visualViewport.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) startLoop(); });
  window.addEventListener("scroll", startLoop, { passive: true });
  resize();
  startLoop();
}

/* ─── Animated count-up for hero stats ─── */
function initCountUp() {
  const els = document.querySelectorAll("[data-spec]");
  if (!els.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  const run = (el) => {
    const node = el.firstChild; // leading text node holds the number
    const target = parseInt((node.textContent || "").replace(/\D/g, ""), 10);
    if (!target || node.nodeType !== 3) return;
    const dur = 1100;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      node.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    }),
    { threshold: 0.6 }
  );
  els.forEach((el) => io.observe(el));
}

/* ─── Header shrink on scroll ─── */
function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const hero = document.querySelector("[data-hero]");
  const onScroll = () => {
    // transparent while the hero fills the screen, solid glass once scrolled past it
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

/* ─── Order / inquiry form ─── */
function initOrderForm() {
  const form = document.querySelector("[data-order-form]");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate required fields
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

    const payload = {
      _subject: `New ZEPHRIDE order request · ${ref}`,
      _template: "table",
      _captcha: "false",
      Reference: ref,
      Product: "Fat X80 Pro",
      Name: data.name,
      Email: data.email,
      Country: data.country,
      Phone: data.phone || "—",
      Color: data.color || "No preference",
      Quantity: data.quantity || "1",
      Message: data.message || "—",
    };

    const btn = form.querySelector("[data-order-submit]");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending…";

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(ORDER_EMAIL)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
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

  // Clear invalid state as the user types
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      const group = field.closest(".form-group");
      if (group) group.classList.remove("invalid");
    });
  });
}
