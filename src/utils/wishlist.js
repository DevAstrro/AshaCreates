const STORAGE_KEY = 'asha_wishlist';

function saveAndDispatch(wishlist) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  window.dispatchEvent(new CustomEvent('wishlist-updated', {
    detail: { wishlist, count: getWishlistCount() }
  }));
}

export function getWishlist() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error parsing wishlist from localStorage', e);
    return [];
  }
}

export function toggleWishlist(productId) {
  let wishlist = getWishlist();
  let isAdded = false;
  
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
  } else {
    wishlist.push(productId);
    isAdded = true;
  }
  
  saveAndDispatch(wishlist);
  return isAdded;
}

export function isWishlisted(productId) {
  return getWishlist().includes(productId);
}

export function getWishlistCount() {
  return getWishlist().length;
}
