/* ============================================================
   ZEPHRIDE — product page (eMAG-style: gallery left, buy box right)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-product-page]");
  if (!root) return;

  const id = new URLSearchParams(location.search).get("id");
  const p = productById(id);
  if (!p) { location.replace("index.html#bikes"); return; }

  document.title = `ZEPHRIDE ${p.name} — Electric Bike`;

  function render() {
    const c = getCountry();
    root.innerHTML = `
      <nav class="pp-crumbs" aria-label="Breadcrumb">
        <a href="index.html">Home</a><span>/</span>
        <a href="index.html#bikes">Electric bikes</a><span>/</span>
        <b>${p.name}</b>
      </nav>

      <div class="pp-head">
        ${p.badge ? `<span class="pcard-badge pp-badge">${p.badge}</span>` : ""}
        <h1>ZEPHRIDE ${p.name} <span class="pp-sub">— ${p.tagline}</span></h1>
      </div>

      <div class="pp-grid">
        <!-- gallery -->
        <section class="pp-gallery">
          <div class="pp-stage"><img data-pp-main src="${p.images[0]}" alt="ZEPHRIDE ${p.name}" /></div>
          ${p.images.length > 1 ? `
          <div class="pp-thumbs">
            ${p.images.map((src, i) => `<button type="button" class="${i === 0 ? "on" : ""}" data-thumb="${src}"><img src="${src}" alt="" loading="lazy" /></button>`).join("")}
          </div>` : ""}
        </section>

        <!-- buy box -->
        <aside class="pp-buy">
          <div class="pp-price" data-price-for="${p.id}">${euro(priceOf(p))}</div>
          <p class="pp-ship">Free shipping${c ? ` to <b>${c.name}</b>` : " across Europe"} · no customs fees</p>
          <div class="pp-qty-row">
            <label>Qty</label>
            <div class="pp-qty">
              <button type="button" data-q="-1" aria-label="Less">−</button>
              <span data-qty>1</span>
              <button type="button" data-q="1" aria-label="More">+</button>
            </div>
          </div>
          <button class="btn btn-primary btn-block" type="button" data-add>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Add to cart
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-buy>Buy now</button>
          <ul class="pp-trust">
            <li>No payment now — pay cash or card on confirmation</li>
            <li>14-day return right</li>
            <li>2-year EU warranty</li>
            <li>CE · EN 15194 street-legal</li>
          </ul>
        </aside>
      </div>

      <!-- details -->
      <div class="pp-details">
        <section class="pp-desc-block">
          <h2>About the ${p.name}</h2>
          <p>${p.desc}</p>
          <ul class="pd-high">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
        </section>
        <section class="pp-specs-block">
          <h2>Specifications</h2>
          <div class="pd-specs">${Object.entries(p.specs).map(([k, v]) => `<div class="pd-row"><span>${k}</span><b>${v}</b></div>`).join("")}</div>
        </section>
      </div>`;

    // gallery
    const main = root.querySelector("[data-pp-main]");
    root.querySelectorAll("[data-thumb]").forEach((btn) =>
      btn.addEventListener("click", () => {
        main.src = btn.getAttribute("data-thumb");
        root.querySelectorAll("[data-thumb]").forEach((b) => b.classList.toggle("on", b === btn));
      }));

    // qty
    let qty = 1;
    const qtyEl = root.querySelector("[data-qty]");
    root.querySelectorAll("[data-q]").forEach((btn) =>
      btn.addEventListener("click", () => {
        qty = Math.max(1, Math.min(9, qty + parseInt(btn.getAttribute("data-q"), 10)));
        qtyEl.textContent = qty;
      }));

    // cart actions
    root.querySelector("[data-add]").addEventListener("click", () => {
      addToCart(p.id, qty);
      showToast(`${p.name} added to cart.`, "success");
    });
    root.querySelector("[data-buy]").addEventListener("click", () => {
      addToCart(p.id, qty);
      location.href = "cart.html";
    });
  }

  render();
  document.addEventListener("zr:country", render);
});
