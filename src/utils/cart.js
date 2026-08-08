const STORAGE_KEY = 'asha_cart';

function saveAndDispatch(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart-updated', {
    detail: { cart, count: getCartCount(), total: getCartTotal() }
  }));
}

export function getCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error parsing cart from localStorage', e);
    return [];
  }
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({ product, quantity: qty });
  }
  saveAndDispatch(cart);
}

export function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.product.id !== productId);
  saveAndDispatch(updatedCart);
}

export function updateQuantity(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(item => item.product.id !== productId);
  } else {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity = qty;
    }
  }
  saveAndDispatch(cart);
}

export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function clearCart() {
  saveAndDispatch([]);
}
