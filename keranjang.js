document.addEventListener("DOMContentLoaded", () => {
  const cartItemsList = document.getElementById("cartItemsList");
  const selectAllCheckbox = document.getElementById("selectAllCheckbox");
  const grandTotalEl = document.getElementById("grandTotal");
  const btnCheckoutWA = document.getElementById("btnCheckoutWA");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      cartItemsList.innerHTML = `<div class="cart-empty-msg"><p>Keranjang Anda masih kosong.</p></div>`;
      grandTotalEl.textContent = "RP 0.00";
      selectAllCheckbox.checked = false;
      return;
    }

    let allSelected = true;

    cart.forEach((item, index) => {
      if (!item.selected) allSelected = false;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";

      itemEl.innerHTML = `
        <input type="checkbox" class="cart-item-check" ${item.selected ? "checked" : ""} data-index="${index}">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <div class="item-price">RP ${item.price.toLocaleString('id-ID')}.00</div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-btn btn-minus" data-index="${index}">-</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn btn-plus" data-index="${index}">+</button>
          </div>
          <button class="btn-remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;

      cartItemsList.appendChild(itemEl);
    });

    selectAllCheckbox.checked = cart.length > 0 && allSelected;
    calculateTotal();
  }

  function calculateTotal() {
    const total = cart.reduce((sum, item) => {
      return item.selected ? sum + (item.price * item.qty) : sum;
    }, 0);

    grandTotalEl.textContent = `RP ${total.toLocaleString('id-ID')}.00`;
  }

  // EVENT SELECT ALL
  selectAllCheckbox.addEventListener("change", (e) => {
    const checked = e.target.checked;
    cart.forEach(item => item.selected = checked);
    saveCart();
    renderCart();
  });

  // DELEGASI EVENT DI LIST KERANJANG
  cartItemsList.addEventListener("click", (e) => {
    const target = e.target;
    const index = target.getAttribute("data-index") || target.closest("button")?.getAttribute("data-index");

    if (index === null || index === undefined) return;

    // CHECKBOX PER ITEM
    if (target.classList.contains("cart-item-check")) {
      cart[index].selected = target.checked;
      saveCart();
      renderCart();
    }

    // KURANG QTY
    if (target.classList.contains("btn-minus")) {
      if (cart[index].qty > 1) {
        cart[index].qty -= 1;
      } else {
        cart.splice(index, 1);
      }
      saveCart();
      renderCart();
    }

    // TAMBAH QTY
    if (target.classList.contains("btn-plus")) {
      cart[index].qty += 1;
      saveCart();
      renderCart();
    }

    // HAPUS ITEM
    if (target.classList.contains("btn-remove-item") || target.closest(".btn-remove-item")) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });

  // CHECKOUT VIA WHATSAPP (082282268350)
  btnCheckoutWA.addEventListener("click", () => {
    const selectedItems = cart.filter(item => item.selected);

    if (selectedItems.length === 0) {
      alert("Pilih minimal satu produk untuk di-checkout!");
      return;
    }

    const phoneNumber = "6282282268350";
    let message = "Halo WHITE.WEB, Saya mau pesan produk berikut:\n\n";
    let grandTotal = 0;

    selectedItems.forEach((item, i) => {
      const subtotal = item.price * item.qty;
      grandTotal += subtotal;
      message += `${i + 1}. ${item.name}\n   Jumlah: ${item.qty}x\n   Harga: RP ${item.price.toLocaleString('id-ID')}.00\n   Subtotal: RP ${subtotal.toLocaleString('id-ID')}.00\n\n`;
    });

    message += `*Total Pembayaran: RP ${grandTotal.toLocaleString('id-ID')}.00*\n\nMohon diproses, terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  });

  renderCart();
});