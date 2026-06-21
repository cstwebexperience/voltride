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
  initScrub();
  initOrderForm();
});

/* ─── Scroll-scrub hero (canvas frame sequence + annotations) ─── */
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
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
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
