/* ============================================================
   ZEPHRIDE — cart & checkout (address + cash/card, order via /api/order)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-cart-page]");
  if (!root) return;

  function render() {
    const cart = getCart();
    const c = getCountry();

    if (!cart.length) {
      root.innerHTML = `
        <div class="cart-empty" data-reveal>
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <h1>Your cart is empty</h1>
          <p>Pick a machine and it'll wait for you here.</p>
          <a class="btn btn-primary" href="index.html#bikes">Browse the bikes →</a>
        </div>`;
      root.querySelector("[data-reveal]").classList.add("in");
      return;
    }

    const rows = cart.map((i) => {
      const p = productById(i.id);
      if (!p) return "";
      return `
        <div class="cart-item" data-id="${p.id}">
          <a class="cart-item-img" href="product.html?id=${p.id}"><img src="${p.images[0]}" alt="${p.name}" /></a>
          <div class="cart-item-info">
            <a class="cart-item-name" href="product.html?id=${p.id}">ZEPHRIDE ${p.name}</a>
            <span class="cart-item-short">${p.short}</span>
            <button class="cart-item-remove" type="button" data-remove="${p.id}">Remove</button>
          </div>
          <div class="cart-item-side">
            <div class="pp-qty">
              <button type="button" data-dec="${p.id}" aria-label="Less">−</button>
              <span>${i.qty}</span>
              <button type="button" data-inc="${p.id}" aria-label="More">+</button>
            </div>
            <span class="cart-item-price">${euro(priceOf(p) * i.qty)}</span>
          </div>
        </div>`;
    }).join("");

    root.innerHTML = `
      <div class="cart-head">
        <h1>Your <span class="grad">cart.</span></h1>
        <p>${cartCount()} item${cartCount() > 1 ? "s" : ""} · free shipping${c ? ` to ${c.name}` : ""}</p>
      </div>

      <div class="cart-grid">
        <section class="cart-items">${rows}</section>

        <aside class="cart-checkout">
          <div class="cart-summary">
            <div class="cart-sum-row"><span>Subtotal</span><b>${euro(cartTotal())}</b></div>
            <div class="cart-sum-row"><span>Shipping</span><b class="free">Free</b></div>
            <div class="cart-sum-row cart-sum-total"><span>Total</span><b>${euro(cartTotal())}</b></div>
          </div>

          <form class="cart-form" data-checkout-form novalidate>
            <h2>Delivery address</h2>
            <div class="form-row-2">
              <div class="form-group"><label>Full name *</label><input type="text" name="name" placeholder="John Rider" required autocomplete="name" /></div>
              <div class="form-group"><label>Phone *</label><input type="tel" name="phone" placeholder="+49 151 1234 5678" required autocomplete="tel" /></div>
            </div>
            <div class="form-group"><label>Email *</label><input type="email" name="email" placeholder="you@email.com" required autocomplete="email" /></div>
            <div class="form-row-2">
              <div class="form-group"><label>Country *</label>
                <select name="country" required>
                  ${COUNTRIES.map((x) => `<option value="${x.name}" ${c && c.code === x.code ? "selected" : ""}>${x.name}</option>`).join("")}
                </select>
              </div>
              <div class="form-group"><label>City *</label><input type="text" name="city" placeholder="Berlin" required autocomplete="address-level2" /></div>
            </div>
            <div class="form-row-2">
              <div class="form-group"><label>Street &amp; number *</label><input type="text" name="address" placeholder="Hauptstraße 12" required autocomplete="street-address" /></div>
              <div class="form-group"><label>Postal code *</label><input type="text" name="zip" placeholder="10115" required autocomplete="postal-code" /></div>
            </div>

            <h2>Payment</h2>
            <div class="pay-options">
              <label class="pay-option">
                <input type="radio" name="payment" value="Cash on delivery" checked />
                <span class="pay-box">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/></svg>
                  <span><b>Cash on delivery</b><small>Pay the courier when the bike arrives</small></span>
                </span>
              </label>
              <label class="pay-option">
                <input type="radio" name="payment" value="Card" />
                <span class="pay-box">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                  <span><b>Card</b><small>We email you a secure payment link on confirmation</small></span>
                </span>
              </label>
            </div>

            <button class="btn btn-primary btn-block" type="submit" data-checkout-submit>Place order · ${euro(cartTotal())}</button>
            <p class="form-note">No charge yet — we confirm stock &amp; delivery within 24h before anything is paid.</p>
          </form>
        </aside>
      </div>`;

    // qty / remove
    root.querySelectorAll("[data-inc]").forEach((b) => b.addEventListener("click", () => {
      const id = b.getAttribute("data-inc");
      const item = getCart().find((i) => i.id === id);
      setCartQty(id, Math.min(9, (item ? item.qty : 0) + 1)); render();
    }));
    root.querySelectorAll("[data-dec]").forEach((b) => b.addEventListener("click", () => {
      const id = b.getAttribute("data-dec");
      const item = getCart().find((i) => i.id === id);
      setCartQty(id, (item ? item.qty : 1) - 1); render();
    }));
    root.querySelectorAll("[data-remove]").forEach((b) => b.addEventListener("click", () => {
      setCartQty(b.getAttribute("data-remove"), 0); render();
    }));

    bindCheckout(root.querySelector("[data-checkout-form]"));
  }

  function bindCheckout(form) {
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
      const items = getCart().map((i) => {
        const p = productById(i.id);
        return { name: p ? p.name : i.id, qty: i.qty, price: p ? euro(priceOf(p)) : "—" };
      });

      const btn = form.querySelector("[data-checkout-submit]");
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Placing order…";

      try {
        const res = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ref,
            items,
            total: euro(cartTotal()),
            payment: data.payment,
            name: data.name,
            email: data.email,
            phone: data.phone,
            country: data.country,
            city: data.city,
            address: data.address,
            zip: data.zip,
          }),
        });
        if (!res.ok) throw new Error("Request failed");
        saveCart([]);
        root.innerHTML = `
          <div class="cart-empty cart-done in" data-reveal>
            <div class="cart-done-check">✓</div>
            <h1>Order received!</h1>
            <p>Reference <b>${ref}</b> — we'll confirm stock, delivery and payment by email within 24h.<br/>Nothing is charged until then.</p>
            <a class="btn btn-primary" href="index.html#bikes">Back to the bikes →</a>
          </div>`;
        window.scrollTo({ top: 0 });
      } catch (err) {
        showToast("Couldn't send right now — email us at " + ORDER_EMAIL, "error");
        btn.disabled = false;
        btn.textContent = original;
      }
    });

    form.querySelectorAll("input, select").forEach((field) => {
      field.addEventListener("input", () => {
        const group = field.closest(".form-group");
        if (group) group.classList.remove("invalid");
      });
    });
  }

  render();
  document.addEventListener("zr:country", render);
});
