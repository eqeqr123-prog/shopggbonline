// DỮ LIỆU SẢN PHẨM
const products = [
  { id: 1, name: "Áo Polo Nam Urban Spirit", price: 300000, img: "ao-polo.jpg", category: "ao-polo", tags: ["new"] },
  { id: 13, name: "Áo Polo Nam Stripe Edge", price: 379000, img: "ao-polo-nam-stripe-egde.jpg", category: "ao-polo", tags: ["best"] },
  { id: 2, name: "Áo Thun Nam Insignia", price: 329000, img: "ao-thun-nam-insignia.jpg", category: "ao-thun", tags: ["best"] },
  { id: 3, name: "Áo Thun Nam Focus", price: 329000, img: "ao-thun-nam-focus.jpg", category: "ao-thun", tags: ["best"] },
  { id: 4, name: "Áo Thun Nam Astra", price: 349000, img: "ao-thun-nam-astra.jpg", category: "ao-thun", tags: ["new"] },
  { id: 5, name: "Áo Thun Nam Rawfield", price: 349000, img: "ao-thun-nam-rawfield.jpg", category: "ao-thun", tags: ["best"] },
  { id: 6, name: "Áo Thun Nam Marvel", price: 399000, img: "ao-thun-nam-marvel-the-amazing.jpg", category: "ao-thun", tags: [] },
  { id: 7, name: "Quần Jean Nam Ống Suông Indigo", price: 500000, img: "quan-jean-nam-ong-suong-indigo.jpg", category: "quan-jean", tags: ["best"] },
  { id: 8, name: "Áo Khoác Jeans Nam Skyfold", price: 600000, img: "ao-khoac-jeans-nam-skyfold.jpg", category: "ao-khoac", tags: ["new"] },
  { id: 9, name: "Áo Polo Nam Gentle", price: 429000, img: "ao-polo-nam-gentle.jpg", category: "ao-polo", tags: ["new"] },
  { id: 10, name: "Áo Polo Nam Quarter Zip Form Regular", price: 379000, img: "ao-polo-nam-quarter-zip-form-regular.jpg", category: "ao-polo", tags: ["new"] },
  { id: 11, name: "Áo Polo Nam Disney Mickey Grid", price: 429000, img: "ao-polo-nam-disney-mickey-grid.jpg", category: "ao-polo", tags: ["new"] },
  { id: 12, name: "Áo Khoác Dù Nam Racing Division", price: 499000, img: "ao-khoac-du-nam-racing-division.jpg", category: "ao-khoac", tags: ["new"] },
  { id: 14, name: "Áo Thun Nam Classic", price: 299000, img: "ao-thun-nam-classic.jpg", category: "ao-thun", tags: ["new"] },
  { id: 15, name: "Áo Polo Nam Elite Mark Form Regular", price: 349000, img: "ao-polo-nam-elite-mark-form-regular.jpg", category: "ao-polo", tags: ["best"] },
  { id: 16, name: "Quần Short Nam Seraphin Form Regular", price: 249000, img: "quan-short-nam-seraphin-form-regular.jpg", category: "quan-short", tags: ["new"] },
  { id: 17, name: "Áo Sweatshirt Nam In Challenge Form Loose", price: 599000, img: "ao-sweatshirt-nam-in-challenge-form-looset.jpg", category: "ao-khoac", tags: ["new"] },
  { id: 18, name: "Áo Sơ Mi Nam Tay Ngắn Cosmic Draft Form Boxy", price: 399000, img: "ao-so-mi-nam-tay-ngan-cosmic-draft-form-boxy.jpg", category: "ao-somi", tags: ["best"] },
  { id: 19, name: "Quần Cargo Kaki Nam Washed Form Straight", price: 449000, img: "quan-cargo-nam-washed-khaki-form-straight.jpg", category: "quan-kaki", tags: ["new"] },
  { id: 20, name: "Áo Thun Nam Seminal Form Boxy", price: 329000, img: "ao-thun-nam-seminal-form-boxy.jpg", category: "ao-thun", tags: ["new"] },
  { id: 21, name: "Quần Jeans Nam Vintage Brown Form Straight", price: 699000, img: "quan-jeans-nam-vintage-brown-form-straight.jpg", category: "quan-jean", tags: ["best"] },
  { id: 22, name: "Quần Jogger Nam Dashfield Nỉ Form Regular", price: 399000, img: "quan-jogger-nam-dashfield-ni-form-regular.jpg", category: "quan-jogger", tags: ["best"] },
  { id: 23, name: "Quần Jogger Cargo Nam Military Form Straight", price: 379000, img: "quan-jogger-nam-military-form-straight.jpg", category: "quan-jogger", tags: ["outlet"] }
];

let cart = [];
let cartToastTimeout = null;
let detailProductId = null;
let detailSelectedSize = "S";
let detailQuantity = 1;
let confirmCallback = null;

// Tạo ID session duy nhất cho mỗi tab
function initTabSession() {
  if (!sessionStorage.getItem('tabSessionId')) {
    const tabId = 'tab_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('tabSessionId', tabId);
  }
  return sessionStorage.getItem('tabSessionId');
}

const tabSessionId = initTabSession();

function loadCurrentUser() {
  return sessionStorage.getItem(`${tabSessionId}_currentUser`) || null;
}

function saveCurrentUser(username) {
  if (username) {
    sessionStorage.setItem(`${tabSessionId}_currentUser`, username);
  } else {
    sessionStorage.removeItem(`${tabSessionId}_currentUser`);
  }
}

let users = loadUsers();
let currentUser = loadCurrentUser();
let currentUserRole = null;

function loadUsers() {
  const raw = localStorage.getItem("users");
  let parsed = [];

  if (raw) {
    try {
      const parsedRaw = JSON.parse(raw);
      parsed = Array.isArray(parsedRaw) ? parsedRaw : [];
    } catch (error) {
      parsed = [];
    }
  }

  let changed = false;
  if (!parsed.some(u => u.username === 'adminshopggb')) {
    parsed.unshift({ username: 'adminshopggb', password: 'adminshopggb', role: 'admin' });
    changed = true;
  }
  if (!parsed.some(u => u.username === 'userdemo')) {
    parsed.push({ username: 'userdemo', password: 'userdemo', role: 'user' });
    changed = true;
  }
  parsed.forEach(user => {
    if (!user.role) {
      user.role = 'user';
      changed = true;
    }
  });
  if (changed) {
    localStorage.setItem("users", JSON.stringify(parsed));
  }
  return parsed;
}

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function loadProfiles() {
  const raw = localStorage.getItem('userProfiles');
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
}

function saveProfiles(profiles) {
  localStorage.setItem('userProfiles', JSON.stringify(profiles));
}

function getCurrentUserInfo() {
  if (!currentUser) return null;
  users = loadUsers();
  return users.find(u => u.username === currentUser) || null;
}

function getCurrentUserProfile() {
  const profiles = loadProfiles();
  return profiles[currentUser] || {};
}

function setCurrentUserProfile(profile) {
  const profiles = loadProfiles();
  profiles[currentUser] = profile;
  saveProfiles(profiles);
}

// HIỂN THỊ SẢN PHẨM
function renderProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  list.forEach(p => {
    const oldPrice = Math.round(p.price * 1.2 / 1000) * 1000;
    container.innerHTML += `
      <div class="card">
        <span class="sale-badge">SALE</span>
        <img src="${p.img}" alt="${p.name}" onclick="showProductDetail(${p.id})">
        <div class="card-body">
          <h4 class="card-title" onclick="showProductDetail(${p.id})">${p.name}</h4>
          <div class="card-prices">
            <span class="card-price">${p.price}đ</span>
            <span class="card-old-price">${oldPrice}đ</span>
          </div>
          <div class="card-actions">
            <button class="buy-btn" onclick="buyNow(${p.id})">Mua ngay</button>
            <button class="addcart-btn" onclick="addToCart(${p.id})">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
    `;
  });
}

function addToCart(id, size = null, quantity = 1) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const item = {
    id: product.id,
    name: product.name,
    price: product.price,
    img: product.img,
    size,
    quantity: quantity || 1
  };

  cart.push(item);
  updateCart();
  showCartToast(item);
}

const categoryNames = {
  all: "Sản phẩm",
  "new": "Sản phẩm mới",
  best: "Bán chạy nhất",
  outlet: "Outlet",
  "ao-thun": "Áo Thun",
  "ao-polo": "Áo Polo",
  "ao-somi": "Áo Sơmi",
  "ao-khoac": "Áo Khoác",
  "ao-ni": "Áo Nỉ & Len",
  "quan-jean": "Quần Jean",
  "quan-short": "Quần Short",
  "quan-kaki": "Quần Kaki & Chino",
  "quan-jogger": "Quần Jogger",
  "quan-boxer": "Quần Boxer",
  giay: "Giày & Dép",
  phukien: "Balo, Túi & Ví",
  non: "Nón",
  thatlung: "Thắt Lưng",
  matkinh: "Mắt Kính"
};

function getCategorySubtitle(category) {
  if (category === "all") return "Những mẫu quần áo nam mới nhất, sale tốt nhất.";
  if (category === "ao-thun") return "Dòng áo thun nam thời trang, phù hợp mọi phong cách.";
  if (category === "ao-polo") return "Các mẫu áo polo lịch lãm, năng động.";
  if (category === "ao-khoac") return "Áo khoác nam đẹp, phù hợp nhiều hoàn cảnh.";
  if (category === "quan-jean") return "Quần jean nam sành điệu và dễ phối đồ.";
  return "Khám phá các sản phẩm được chọn lọc cho bạn.";
}

function goHome() {
  filterProducts('all');
  document.getElementById('searchInput').value = '';
}

function filterProducts(category) {
  const title = categoryNames[category] || "Sản phẩm";
  const subtitle = getCategorySubtitle(category);

  document.getElementById("product-section-title").innerText = title;
  document.getElementById("product-section-subtitle").innerText = subtitle;

  const filtered = products.filter(p => {
    if (category === "all") return true;
    if (category === "new") return p.tags.includes("new");
    if (category === "best") return p.tags.includes("best");
    if (category === "outlet") return p.tags.includes("outlet");
    return p.category === category;
  });

  renderProducts(filtered);
  updateProductCount(filtered.length);
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) dropdown.classList.remove('open');
}

function updateProductCount(count) {
  document.getElementById("product-count").innerText = `Có ${count} sản phẩm`;
}

let pendingProduct = null;

function buyNow(id) {
  if (!currentUser) {
    showLoginRequired();
    return;
  }

  const product = products.find(p => p.id === id);
  if (!product) return;

  const quantity = (detailProductId === id ? detailQuantity : 1) || 1;
  const size = (detailProductId === id ? detailSelectedSize : null);

  pendingProduct = {
    ...product,
    size,
    quantity
  };

  openConfirmModal(`Bạn có muốn mua ${product.name} x${quantity} với giá ${(product.price * quantity).toLocaleString('vi-VN')}đ?`, () => completePurchase(pendingProduct));
}

function openConfirmModal(message, callback) {
  confirmCallback = callback || null;
  const textEl = document.getElementById("confirm-text");
  if (textEl) textEl.innerText = message;
  const modal = document.getElementById("confirm-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeConfirmModal() {
  pendingProduct = null;
  confirmCallback = null;
  document.getElementById("confirm-modal").classList.add("hidden");
}

function confirmBuy() {
  if (confirmCallback) {
    confirmCallback();
  }
  closeConfirmModal();
}

function formatProductDetails(item) {
  const sizeText = item.size ? `size ${item.size}` : 'size mặc định';
  const qtyText = item.quantity && item.quantity > 1 ? `${item.quantity} chiếc` : '1 chiếc';
  return `${item.name} (${sizeText}, ${qtyText})`;
}

function completePurchase(product) {
  if (!product) return;
  const order = createOrder(product);
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);

  const details = formatProductDetails(product);
  showNotification('Mua hàng thành công!', `Bạn đã mua ${details}.\nĐơn hàng ${order.id} đang chờ xử lý.`, 'success');
  openOrdersModal('processing');
}

function generateOrderId() {
  const prefix = 'ORD';
  const random = Math.floor(1000 + Math.random() * 9000);
  const id = `${prefix}${random}`;
  const orders = getOrders();
  return orders.some(o => o.id === id) ? generateOrderId() : id;
}

function createOrder(product) {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  return {
    id: generateOrderId(),
    date,
    owner: currentUser || 'guest',
    items: [{
      id: product.id,
      name: product.name,
      qty: product.quantity || 1,
      size: product.size || null
    }],
    total: (product.price || 0) * (product.quantity || 1),
    status: 'processing',
    received: false
  };
}

function buyAll() {
  if (!currentUser) {
    showLoginRequired();
    return;
  }

  if (cart.length === 0) {
    showNotification('Giỏ hàng trống', 'Không có sản phẩm để mua.', 'error');
    return;
  }

  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalMoney = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  openConfirmModal(`Bạn có chắc muốn mua tất cả ${totalQuantity} sản phẩm trong giỏ hàng với tổng ${totalMoney.toLocaleString('vi-VN')}đ?`, () => completePurchaseAll());
}

function completePurchaseAll() {
  const details = cart.map(item => formatProductDetails(item)).join('\n');
  cart = [];
  updateCart();
  showNotification('Mua hàng thành công!', `Bạn đã mua tất cả sản phẩm:\n${details}`, 'success');
}

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.getElementById("cart-count").innerText = totalItems;

  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  const footer = document.getElementById('cart-footer');
  if (cart.length === 0) {
    list.innerHTML = '<li class="empty-cart">Giỏ hàng trống</li>';
    if (footer) footer.classList.add('hidden');
    return;
  }

  if (footer) footer.classList.remove('hidden');

  cart.forEach((p, index) => {
    const sizeText = p.size ? ` | Size: ${p.size}` : "";
    const qtyText = p.quantity && p.quantity > 1 ? ` x${p.quantity}` : "";
    const totalPrice = (p.price || 0) * (p.quantity || 1);

    list.innerHTML += `
      <li class="cart-item">
        <img src="${p.img}" alt="${p.name}" onclick="showProductDetail(${p.id})" style="cursor:pointer">
        <div class="cart-item-content" onclick="showProductDetail(${p.id})" style="cursor:pointer">
          <span>${p.name}${sizeText}${qtyText}</span>
          <span>${totalPrice.toLocaleString('vi-VN')}đ</span>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">Xóa</button>
      </li>
    `;
  });
}

function showProductDetail(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  detailProductId = id;
  detailSelectedSize = "S";
  detailQuantity = 1;

  document.getElementById("detail-image").src = product.img;
  document.getElementById("detail-image").alt = product.name;
  document.getElementById("detail-title").innerText = product.name;
  document.getElementById("detail-price").innerText = `${product.price.toLocaleString("vi-VN")}đ`;
  document.getElementById("detail-quantity").innerText = detailQuantity;
  updateDetailSizeButtons();

  document.getElementById("product-detail-modal").classList.remove("hidden");
  document.getElementById("cart-box").classList.add("hidden");
  document.getElementById("auth-box").classList.add("hidden");
}

function updateDetailSizeButtons() {
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.toggle('active', btn.innerText === detailSelectedSize);
  });
}

function selectDetailSize(size) {
  detailSelectedSize = size;
  updateDetailSizeButtons();
}

function changeDetailQuantity(delta) {
  detailQuantity = Math.max(1, detailQuantity + delta);
  document.getElementById("detail-quantity").innerText = detailQuantity;
}

function closeProductDetail() {
  document.getElementById("product-detail-modal").classList.add("hidden");
  detailProductId = null;
}

function addToCartFromDetail() {
  if (!detailProductId) return;
  addToCart(detailProductId, detailSelectedSize, detailQuantity);
}

function showCartToast(product) {
  const toast = document.getElementById("cart-toast");
  if (!toast) return;

  toast.querySelector(".toast-status").innerText = "Thêm vào giỏ hàng thành công";
  toast.querySelector(".toast-product").innerText = product.name;
  toast.querySelector(".toast-price").innerText = `${product.price.toLocaleString("vi-VN")}đ`;

  const openBtn = toast.querySelector(".toast-see-cart");
  openBtn.onclick = () => {
    openCart();
    hideCartToast();
  };

  toast.classList.remove("hidden");
  window.requestAnimationFrame(() => toast.classList.add("show"));

  if (cartToastTimeout) {
    clearTimeout(cartToastTimeout);
  }

  cartToastTimeout = setTimeout(() => {
    hideCartToast();
  }, 2800);
}

function hideCartToast() {
  const toast = document.getElementById("cart-toast");
  if (!toast) return;
  toast.classList.remove("show");
  cartToastTimeout = null;
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 220);
}

function removeFromCart(index) {
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  updateCart();
}

function openCart() {
  const authBox = document.getElementById("auth-box");
  if (authBox) authBox.classList.add("hidden");
  const cartBox = document.getElementById("cart-box");
  if (cartBox) cartBox.classList.toggle("hidden");
}

function showLoginRequired() {
  showNotification('Đăng nhập yêu cầu', 'Bạn cần đăng nhập để mua hàng.', 'error');
  const authBox = document.getElementById("auth-box");
  if (authBox) {
    authBox.classList.remove("hidden");
    showLoginForm();
  }
  clearAuthFields();
}

function toggleAuth() {
  if (currentUser) {
    window.location.href = 'profile.html';
    return;
  }

  const cartBox = document.getElementById("cart-box");
  if (cartBox) cartBox.classList.add("hidden");
  const authBox = document.getElementById("auth-box");
  if (authBox) {
    authBox.classList.toggle("hidden");
  }
  clearAuthFields();
}

function clearAuthFields() {
  ["loginUser", "loginPass", "resetUser", "resetPass", "resetPass2", "regUser", "regPass", "regPass2"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

function updateAuthUI() {
  const authLogin = document.getElementById("auth-login");
  const authRegister = document.getElementById("auth-register");
  const authProfile = document.getElementById("auth-profile");
  const authReset = document.getElementById("auth-reset");
  const headerUserName = document.getElementById('header-user-name');

  if (currentUser) {
    const userInfo = getCurrentUserInfo();
    currentUserRole = userInfo?.role || 'user';

    if (authLogin) authLogin.classList.add("hidden");
    if (authRegister) authRegister.classList.add("hidden");
    if (authProfile) authProfile.classList.remove("hidden");
    if (authReset) authReset.classList.add("hidden");
    if (headerUserName) {
      headerUserName.innerText = currentUser;
      headerUserName.classList.remove('hidden');
    }
    renderProfileInfo();
    showAccountEmpty();
  } else {
    currentUserRole = null;
    if (authLogin) authLogin.classList.remove("hidden");
    if (authRegister) authRegister.classList.add("hidden");
    if (authProfile) authProfile.classList.add("hidden");
    if (authReset) authReset.classList.add("hidden");
    if (headerUserName) {
      headerUserName.innerText = '';
      headerUserName.classList.add('hidden');
    }
  }
}

function renderProfileInfo() {
  const profile = getCurrentUserProfile();
  const ids = [
    ['profile-lastname','modal-profile-lastname'],
    ['profile-firstname','modal-profile-firstname'],
    ['profile-phone','modal-profile-phone'],
    ['profile-dob','modal-profile-dob'],
    ['profile-address','modal-profile-address']
  ];
  ids.forEach(([a,b]) => {
    const elA = document.getElementById(a);
    const elB = document.getElementById(b);
    if (elA) elA.value = profile[a.replace(/profile-|modal-profile-/,'')] || '';
    if (elB) elB.value = profile[a.replace(/profile-|modal-profile-/,'')] || '';
  });
}

function saveProfile() {
  if (!currentUser) {
    showNotification('Lỗi', 'Bạn cần đăng nhập để lưu hồ sơ.', 'error');
    return;
  }
  const get = id => (document.getElementById(id) || {}).value || '';
  const profile = {
    lastname: get('profile-lastname') || get('modal-profile-lastname'),
    firstname: get('profile-firstname') || get('modal-profile-firstname'),
    phone: get('profile-phone') || get('modal-profile-phone'),
    dob: get('profile-dob') || get('modal-profile-dob'),
    address: get('profile-address') || get('modal-profile-address')
  };
  setCurrentUserProfile(profile);
  showNotification('Lưu thành công', 'Thông tin của bạn đã được lưu.', 'success');
}

function switchAccountSection(event) {
  const target = event.currentTarget;
  const sectionId = target.dataset.section;
  document.querySelectorAll('.account-item').forEach(btn => btn.classList.remove('active'));
  target.classList.add('active');
  document.querySelectorAll('.account-section').forEach(section => section.classList.add('hidden'));
  // New behavior: open section in a modal window (no right column)
  if (!sectionId) return;

  if (sectionId === 'info') {
    // populate modal fields from saved profile
    const profile = JSON.parse(localStorage.getItem('currentUserProfile') || '{}');
    const ln = document.getElementById('modal-profile-lastname'); if (ln) ln.value = profile.lastname || '';
    const fn = document.getElementById('modal-profile-firstname'); if (fn) fn.value = profile.firstname || '';
    const phone = document.getElementById('modal-profile-phone'); if (phone) phone.value = profile.phone || '';
    const dob = document.getElementById('modal-profile-dob'); if (dob) dob.value = profile.dob || '';
    openModal('modal-info');
    return;
  }

  if (sectionId === 'address') {
    const profile = JSON.parse(localStorage.getItem('currentUserProfile') || '{}');
    const addr = document.getElementById('modal-profile-address'); if (addr) addr.value = profile.address || '';
    openModal('modal-address');
    return;
  }

  if (sectionId.startsWith('orders-')) {
    const status = sectionId.replace('orders-','');
    openModal('modal-orders');
    // render into modal list
    setTimeout(() => renderOrdersList(status, true), 40);
    return;
  }
}

function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('hidden');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add('hidden');
}

function saveProfileFromModal() {
  if (!currentUser) {
    showNotification('Lỗi', 'Bạn cần đăng nhập để lưu hồ sơ.', 'error');
    return;
  }
  const lastname = (document.getElementById('modal-profile-lastname') || {}).value || '';
  const firstname = (document.getElementById('modal-profile-firstname') || {}).value || '';
  const phone = (document.getElementById('modal-profile-phone') || {}).value || '';
  const dob = (document.getElementById('modal-profile-dob') || {}).value || '';
  const profile = getCurrentUserProfile();
  profile.lastname = lastname;
  profile.firstname = firstname;
  profile.phone = phone;
  profile.dob = dob;
  setCurrentUserProfile(profile);
  showNotification('Lưu thành công', 'Thông tin của bạn đã được lưu.', 'success');
  closeModal('modal-info');
}

function saveAddressFromModal() {
  if (!currentUser) {
    showNotification('Lỗi', 'Bạn cần đăng nhập để lưu địa chỉ.', 'error');
    return;
  }
  const address = (document.getElementById('modal-profile-address') || {}).value || '';
  const profile = getCurrentUserProfile();
  profile.address = address;
  setCurrentUserProfile(profile);
  showNotification('Lưu thành công', 'Địa chỉ đã được lưu.', 'success');
  closeModal('modal-address');
}

function openOrdersModal(status) {
  const modal = document.getElementById('modal-orders');
  if (!modal) return;
  modal.classList.remove('hidden');
  renderOrdersList(status, true);
}

function closeOrdersModal() {
  const modal = document.getElementById('modal-orders');
  if (!modal) return;
  modal.classList.add('hidden');
}

function showAccountEmpty() {
  document.querySelectorAll('.account-item').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.account-section').forEach(section => section.classList.add('hidden'));
  const empty = document.getElementById('account-empty');
  if (empty) empty.classList.remove('hidden');
}

function showLoginForm() {
  document.getElementById("auth-login").classList.remove("hidden");
  document.getElementById("auth-register").classList.add("hidden");
  document.getElementById("auth-reset").classList.add("hidden");
}

function showRegisterForm() {
  document.getElementById("auth-login").classList.add("hidden");
  document.getElementById("auth-register").classList.remove("hidden");
  document.getElementById("auth-reset").classList.add("hidden");
  resetRegisterState();
}

function showForgotPassword() {
  const username = document.getElementById("loginUser").value.trim();

  document.getElementById("auth-login").classList.add("hidden");
  document.getElementById("auth-register").classList.add("hidden");
  document.getElementById("auth-reset").classList.remove("hidden");
  document.getElementById("resetUser").value = username;
  document.getElementById("resetPass").value = "";
  document.getElementById("resetPass2").value = "";
  document.getElementById("reset-message").innerText = "";

  const resetBtn = document.getElementById("resetBtn");
  resetBtn.classList.remove("btn-success");
  resetBtn.innerText = "ĐỔI MẬT KHẨU";
  resetBtn.disabled = false;
}

/* Orders handling (stored in localStorage 'orders') */
function getOrders() {
  const raw = localStorage.getItem('orders');
  if (!raw) {
    // create some sample orders
    const sample = [
      { id: 'ORD1001', date: '2026-05-10', items: [{id:1,name:'Áo Polo Nam Urban Spirit', qty:1}], total: 379000, status: 'processing', owner: 'userdemo', received: false },
      { id: 'ORD1002', date: '2026-05-12', items: [{id:7,name:'Quần Jean Nam Ống Suông Indigo', qty:1}], total: 500000, status: 'shipping', owner: 'userdemo', received: false },
      { id: 'ORD1003', date: '2026-05-14', items: [{id:2,name:'Áo Thun Nam Insignia', qty:2}], total: 658000, status: 'delivered', owner: 'userdemo', received: false }
    ];
    localStorage.setItem('orders', JSON.stringify(sample));
    return sample;
  }
  try { return JSON.parse(raw) } catch (e) { return [] }
}

function saveOrders(list) {
  localStorage.setItem('orders', JSON.stringify(list));
}

function getProductImage(item) {
  if (!item) return '';
  if (item.img) return item.img;
  if (item.id) {
    const product = products.find(p => p.id === item.id);
    if (product) return product.img;
  }
  if (item.name) {
    const product = products.find(p => p.name === item.name || item.name.includes(p.name) || p.name.includes(item.name));
    if (product) return product.img;
  }
  return '';
}

function getStatusText(status) {
  const map = {
    processing: 'Đang xử lý',
    pickup: 'Chờ lấy hàng',
    shipping: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy'
  };
  return map[status] || status;
}

function getAdminStatusAction(status) {
  const actions = {
    processing: { label: 'Duyệt chuyển sang chờ lấy hàng', next: 'pickup' },
    pickup: { label: 'Duyệt chuyển sang chờ giao', next: 'shipping' },
    shipping: { label: 'Đã giao', next: 'delivered' }
  };
  return actions[status] || null;
}

let currentOrdersFilter = 'all';

function getOrdersActionsBar(inModal = false) {
  if (!inModal) return null;
  return document.getElementById('orders-modal-actions-main') || document.getElementById('orders-modal-actions');
}

function renderOrdersList(filter, inModal = false) {
  currentOrdersFilter = filter || 'all';
  document.querySelectorAll('.orders-tabs button').forEach(b => b.classList.remove('active'));
  if (inModal) {
    const tab = document.querySelector(`#modal-tab-${filter}, #profile-tab-${filter}, #main-tab-${filter}`);
    if (tab) tab.classList.add('active');
  } else {
    const tab = document.getElementById('tab-' + (filter || 'all'));
    if (tab) tab.classList.add('active');
  }

  let container;
  if (inModal) {
    container = document.getElementById('orders-modal-list') || document.getElementById('orders-modal-list-main') || document.getElementById('orders-modal-list');
    const header = document.querySelector('#modal-orders h2');
    if (header) {
      header.innerText = currentUserRole === 'admin' ? 'ĐƠN HÀNG KHÁCH HÀNG' : 'ĐƠN HÀNG CỦA TÔI';
    }
  } else {
    container = document.getElementById('orders-list');
  }
  if (!container) return;

  const actionsBar = getOrdersActionsBar(inModal);
  const orders = getOrders();
  let list = orders.slice();
  if (filter && filter !== 'all') {
    list = orders.filter(o => o.status === filter);
  }

  const isAdmin = currentUserRole === 'admin';
  if (!isAdmin) {
    list = list.filter(o => o.owner === currentUser);
  }

  const showDeleteActions = ['all', 'delivered', 'cancelled'].includes(filter);
  if (actionsBar) {
    if (showDeleteActions && list.length > 0) {
      let label = 'Xóa tất cả đơn hàng';
      if (filter === 'delivered') label = 'Xóa tất cả đơn hàng đã giao';
      if (filter === 'cancelled') label = 'Xóa tất cả đơn hàng đã hủy';
      actionsBar.innerHTML = `
        <span>${list.length} đơn hàng</span>
        <button onclick="confirmDeleteAllOrders('${filter}')">${label}</button>
      `;
    } else {
      actionsBar.innerHTML = '';
    }
  }

  if (list.length === 0) {
    container.innerHTML = '<p>Không có đơn hàng trong mục này.</p>';
    return;
  }

  container.innerHTML = list.map(o => {
    const itemsText = o.items.map(i => `${i.name} x${i.qty}`).join(', ');
    const firstItem = o.items[0] || {};
    const image = getProductImage(firstItem);
    const canDelete = showDeleteActions && !(isAdmin && filter === 'all');
    const canCancelButton = canCancel(o.status) && !(isAdmin && (filter === 'all' || filter === 'processing' || filter === 'pickup' || filter === 'shipping'));
    const canBuyAgain = false;
    const adminAction = isAdmin ? getAdminStatusAction(o.status) : null;
    const showReceivedButton = !isAdmin && o.status === 'delivered' && !o.received;
    const ownerLabel = isAdmin ? `<div class="order-meta">Khách hàng: ${o.owner}</div>` : '';
    const receivedLabel = o.received ? ' • Đã nhận' : '';

    return `
      <div class="order-card">
        <img class="order-thumb" src="${image}" alt="${firstItem.name || ''}">
        <div class="order-card-info">
          <div><strong>${o.id}</strong> — <span class="order-meta">${o.date}</span></div>
          ${ownerLabel}
          <div class="order-meta">${itemsText}</div>
          <div class="order-meta">Tổng: ${o.total.toLocaleString('vi-VN')}đ</div>
        </div>
        <div class="order-actions">
          <span class="order-meta">${getStatusText(o.status)}${receivedLabel}</span>
          <button onclick="showOrderDetails('${o.id}')">Xem</button>
          ${adminAction ? `<button onclick="advanceOrderStatus('${o.id}')">${adminAction.label}</button>` : ''}
          ${canCancelButton ? `<button onclick="cancelOrder('${o.id}')">Hủy</button>` : ''}
          ${canDelete ? `<button onclick="confirmDeleteOrder('${o.id}')">Xóa</button>` : ''}
          ${canBuyAgain ? `<button onclick="buyOrderAgain('${o.id}')">Mua lại</button>` : ''}
          ${showReceivedButton ? `<button onclick="markOrderReceived('${o.id}')">Đã nhận hàng</button>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function canCancel(status) {
  return status === 'processing' || status === 'pickup';
}

function showOrderDetails(id) {
  const orders = getOrders();
  const o = orders.find(x => x.id === id);
  if (!o) return showNotification('Lỗi', 'Đơn hàng không tồn tại', 'error');
  const items = o.items.map(i => `- ${i.name} x${i.qty}`).join('\n');
  const ownerInfo = currentUserRole === 'admin' ? `Khách hàng: ${o.owner}\n` : '';
  const receivedInfo = o.received ? '\nĐã nhận hàng' : '';
  const msg = `Mã: ${o.id}\nNgày: ${o.date}\n${ownerInfo}Trạng thái: ${getStatusText(o.status)}${receivedInfo}\nSản phẩm:\n${items}\nTổng: ${o.total.toLocaleString('vi-VN')}đ`;
  showNotification('Thông tin đơn hàng', msg, 'info');
}

function advanceOrderStatus(id) {
  if (currentUserRole !== 'admin') return showNotification('Lỗi', 'Chỉ admin mới có thể duyệt đơn hàng.', 'error');
  const orders = getOrders();
  const idx = orders.findIndex(x => x.id === id);
  if (idx === -1) return showNotification('Lỗi', 'Đơn hàng không tồn tại', 'error');
  const action = getAdminStatusAction(orders[idx].status);
  if (!action) return showNotification('Lỗi', 'Đơn hàng không thể thay đổi trạng thái.', 'error');
  orders[idx].status = action.next;
  if (action.next === 'delivered') {
    orders[idx].received = false;
  }
  saveOrders(orders);
  renderOrdersList(currentOrdersFilter, true);
  showNotification('Đã cập nhật', `Đơn hàng đã chuyển sang trạng thái ${getStatusText(action.next)}.`, 'success');
}

function markOrderReceived(id) {
  const orders = getOrders();
  const idx = orders.findIndex(x => x.id === id);
  if (idx === -1) return showNotification('Lỗi', 'Đơn hàng không tồn tại', 'error');
  if (orders[idx].owner !== currentUser) return showNotification('Lỗi', 'Bạn không thể xác nhận đơn hàng này.', 'error');
  orders[idx].received = true;
  saveOrders(orders);
  renderOrdersList(currentOrdersFilter, true);
  showNotification('Cảm ơn', 'Bạn đã xác nhận đã nhận hàng.', 'success');
}

function confirmDeleteOrder(id) {
  openConfirmModal('Bạn có chắc muốn xóa đơn hàng này khỏi danh sách?', () => executeDeleteOrder(id));
}

function executeDeleteOrder(id) {
  const orders = getOrders();
  const remaining = orders.filter(x => x.id !== id);
  saveOrders(remaining);
  renderOrdersList(currentOrdersFilter, true);
  showNotification('Đã xóa', 'Đơn hàng đã được xóa khỏi danh sách.', 'success');
}

function confirmDeleteAllOrders(filter) {
  let message = 'Bạn có chắc muốn xóa tất cả đơn hàng?';
  if (filter === 'delivered') message = 'Bạn có chắc muốn xóa tất cả đơn hàng đã giao?';
  if (filter === 'cancelled') message = 'Bạn có chắc muốn xóa tất cả đơn hàng đã hủy?';
  openConfirmModal(message, () => executeDeleteAllOrders(filter));
}

function executeDeleteAllOrders(filter) {
  const orders = getOrders();
  const isAdmin = currentUserRole === 'admin';
  let remaining;

  if (isAdmin) {
    remaining = filter === 'all' ? [] : orders.filter(o => o.status !== filter);
  } else {
    if (filter === 'all') {
      remaining = orders.filter(o => o.owner !== currentUser);
    } else {
      remaining = orders.filter(o => !(o.owner === currentUser && o.status === filter));
    }
  }

  saveOrders(remaining);
  renderOrdersList(currentOrdersFilter, true);
  const message = filter === 'all'
    ? (isAdmin ? 'Tất cả đơn hàng đã được xóa.' : 'Tất cả đơn hàng của bạn đã được xóa.')
    : (filter === 'delivered'
      ? (isAdmin ? 'Các đơn hàng đã giao đã được xóa.' : 'Các đơn hàng đã giao của bạn đã được xóa.')
      : (isAdmin ? 'Các đơn hàng đã hủy đã được xóa.' : 'Các đơn hàng đã hủy của bạn đã được xóa.'));
  showNotification('Đã xóa', message, 'success');
}

function buyOrderAgain(id) {
  const orders = getOrders();
  const order = orders.find(x => x.id === id);
  if (!order) return showNotification('Lỗi', 'Đơn hàng không tồn tại', 'error');
  if (currentUserRole === 'admin') return;

  order.items.forEach(item => {
    addToCart(item.id, item.size || null, item.qty || 1);
  });

  const cartBox = document.getElementById('cart-box');
  if (cartBox) cartBox.classList.remove('hidden');
  showNotification('Đã thêm vào giỏ hàng', 'Các sản phẩm trong đơn hàng đã được thêm vào giỏ hàng.', 'success');
}

function cancelOrder(id) {
  openConfirmModal('Bạn có chắc muốn hủy đơn hàng này?', () => executeCancelOrder(id));
}

function executeCancelOrder(id) {
  const orders = getOrders();
  const idx = orders.findIndex(x => x.id === id);
  if (idx === -1) return showNotification('Lỗi', 'Đơn hàng không tồn tại', 'error');
  orders[idx].status = 'cancelled';
  saveOrders(orders);
  renderOrdersList(currentOrdersFilter, true);
  showNotification('Đã hủy', 'Đơn hàng đã được hủy.', 'success');
}

function resetPassword() {
  const username = document.getElementById("resetUser").value.trim();
  const password = document.getElementById("resetPass").value;
  const password2 = document.getElementById("resetPass2").value;

  if (!password) {
    showNotification("Lỗi", "Vui lòng nhập mật khẩu mới.", "error");
    return;
  }
  if (!password2) {
    showNotification("Lỗi", "Vui lòng xác nhận mật khẩu mới.", "error");
    return;
  }
  if (password !== password2) {
    showNotification("Lỗi", "Mật khẩu mới không khớp.", "error");
    return;
  }

  users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) {
    showNotification("Lỗi", "Tài khoản không tồn tại.", "error");
    return;
  }

  user.password = password;
  saveUsers();

  const resetBtn = document.getElementById("resetBtn");
  resetBtn.classList.add("btn-success");
  resetBtn.innerText = "✓ ĐÃ ĐỔI MẬT KHẨU";
  resetBtn.disabled = true;

  const messageEl = document.getElementById("reset-message");
  messageEl.innerText = "Mật khẩu đã đổi thành công.";
  messageEl.classList.add("success");

  document.getElementById("loginUser").value = username;
  document.getElementById("loginPass").value = "";
}

function resetRegisterState() {
  const registerBtn = document.getElementById("registerBtn");
  const registerMessage = document.getElementById("register-message");
  if (registerBtn) {
    registerBtn.classList.remove("btn-success");
    registerBtn.innerText = "ĐĂNG KÝ";
    registerBtn.disabled = false;
  }
  if (registerMessage) {
    registerMessage.innerText = "";
  }
}

function register() {
  const u = document.getElementById("regUser").value.trim();
  const p = document.getElementById("regPass").value;
  const p2 = document.getElementById("regPass2").value;

  if (!u) {
    showNotification("Lỗi", "Vui lòng nhập tên đăng nhập.", "error");
    return;
  }
  if (!p) {
    showNotification("Lỗi", "Vui lòng nhập mật khẩu.", "error");
    return;
  }
  if (p !== p2) {
    showNotification("Lỗi", "Mật khẩu không khớp!", "error");
    return;
  }
  if (users.some(user => user.username === u)) {
    showNotification("Lỗi", "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.", "error");
    return;
  }

  users.push({ username: u, password: p });
  saveUsers();

  document.getElementById("regUser").value = "";
  document.getElementById("regPass").value = "";
  document.getElementById("regPass2").value = "";

  showNotification("Đăng ký thành công!", "Bạn có thể đăng nhập ngay bây giờ", "success");
  
  setTimeout(() => {
    closeNotification();
    showLoginForm();
  }, 1500);
}

function showNotification(title, message, type = "success") {
  const modal = document.getElementById("notification-modal");
  const titleEl = document.getElementById("notification-title");
  const msgEl = document.getElementById("notification-message");
  const iconEl = document.getElementById("notification-icon");

  if (!modal || !titleEl || !msgEl || !iconEl) return;

  titleEl.innerText = title;
  msgEl.innerHTML = message.replace(/\n/g, '<br>');
  iconEl.className = 'notification-icon';

  if (type === "success") {
    iconEl.innerHTML = "✓";
    iconEl.classList.add('notification-icon');
    iconEl.style.background = "#25d366";
  } else if (type === "error") {
    iconEl.innerHTML = "!";
    iconEl.classList.add('error');
    iconEl.style.background = "#d10d29";
  } else if (type === "info") {
    iconEl.innerHTML = "i";
    iconEl.classList.add('info');
    iconEl.style.background = "#0b2f6d";
  }

  modal.classList.remove("hidden");
  modal.style.display = "flex";
}

function closeNotification() {
  const modal = document.getElementById("notification-modal");
  modal.classList.add("hidden");
  modal.style.display = "none";
}

function login() {
  const u = document.getElementById("loginUser").value.trim();
  const p = document.getElementById("loginPass").value;

  if (!u) {
    showNotification("Lỗi", "Vui lòng nhập tên đăng nhập.", "error");
    return;
  }
  if (!p) {
    showNotification("Lỗi", "Vui lòng nhập mật khẩu.", "error");
    return;
  }

  users = loadUsers();
  const user = users.find(x => x.username === u);

  if (!user) {
    showNotification("Lỗi", "Tài khoản không tồn tại.", "error");
    return;
  }
  if (user.password !== p) {
    showNotification("Lỗi", "Mật khẩu không đúng.", "error");
    return;
  }

  saveCurrentUser(u);
  currentUser = u;
  document.getElementById("loginUser").value = "";
  document.getElementById("loginPass").value = "";
  updateAuthUI();
  document.getElementById("auth-box").classList.add("hidden");
  showNotification("Đăng nhập thành công!", `Chào mừng ${u}!`, "success");
  
  setTimeout(() => {
    closeNotification();
  }, 1500);
}

function logout() {
  saveCurrentUser(null);
  currentUser = null;
  updateAuthUI();
  const authBox = document.getElementById("auth-box");
  if (authBox) authBox.classList.add("hidden");
  showNotification("Đã đăng xuất!", "Tạm biệt!", "success");
  
  setTimeout(() => {
    closeNotification();
    // If we're on the profile page, go back to homepage so UI reflects logged-out state
    try {
      const path = window.location.pathname || '';
      if (path.endsWith('profile.html')) {
        window.location.href = 'index.html';
      } else {
        // reload to update UI on the same page
        window.location.reload();
      }
    } catch (e) {
      // fallback: no redirect
    }
  }, 1500);
}

// Initialize page-specific UI only when elements exist (prevents errors on profile.html)
updateAuthUI();

if (document.getElementById('product-list')) {
  filterProducts('all');
  updateCart();
  clearAuthFields();

  const searchEl = document.getElementById("searchInput");
  if (searchEl) {
    searchEl.addEventListener("input", function() {
      const keyword = this.value.toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
      renderProducts(filtered);
      updateProductCount(filtered.length);
    });
  }
}

const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

if (dropdownToggle && dropdown) {
  dropdownToggle.addEventListener('click', function(event) {
    event.preventDefault();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
    }
  });
}
