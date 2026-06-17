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
  initOrderForm();
});

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
