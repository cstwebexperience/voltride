/* ============================================================
   ZEPHRIDE — shared UI + home page
   (data: countries/products/cart live in data.js)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initReveal();
  initHeroVideo();
  initCountry();
  initCatalog();
  updateCartBadge();
});

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
    close();
    document.dispatchEvent(new CustomEvent("zr:country"));
  });

  document.querySelectorAll("[data-country-pill], [data-country-pill-m]").forEach((el) =>
    el.addEventListener("click", open));

  updatePill();
  if (!getCountry()) open();
}

/* refresh any [data-price-for] on country switch */
document.addEventListener("zr:country", () => {
  document.querySelectorAll("[data-price-for]").forEach((el) => {
    const p = productById(el.getAttribute("data-price-for"));
    if (p) el.textContent = euro(priceOf(p));
  });
});

/* ─── Home: product grid (each card links to its own page) ─── */
function initCatalog() {
  const grid = document.querySelector("[data-catalog]");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((p) => `
    <a class="pcard" data-reveal href="product.html?id=${p.id}">
      <div class="pcard-media">
        ${p.badge ? `<span class="pcard-badge">${p.badge}</span>` : ""}
        <img src="${p.images[0]}" alt="ZEPHRIDE ${p.name}" loading="lazy" />
      </div>
      <div class="pcard-body">
        <div class="pcard-top"><h3>${p.name}</h3><span class="pcard-price" data-price-for="${p.id}">${euro(priceOf(p))}</span></div>
        <p class="pcard-short">${p.short}</p>
        <span class="pcard-cta">View bike →</span>
      </div>
    </a>`).join("");

  grid.querySelectorAll("[data-reveal]").forEach((el, i) => setTimeout(() => el.classList.add("in"), 70 * i));
}

/* ─── Hero — static shots, the real clip auto-plays between them ─── */
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
  if (document.body.classList.contains("subpage")) { header.classList.add("scrolled"); return; }
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
