import { formatPrice, generateStarRating } from '../utils/helpers.js';
import { isWishlisted } from '../utils/wishlist.js';

export function createProductCard(product) {
    if (!product) return '';

    const isDiscounted = product.originalPrice && product.originalPrice > product.price;
    const badgeHTML = product.badge ? `<span class="badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` : '';
    const image = product.image || '/images/earrings-jhumka.jpg';
    const descriptor = product.description ? product.description.split('.')[0] : 'Handcrafted • Made in India';
    
    const inWishlist = isWishlisted(product.id);

    return `
        <article class="product-card" data-id="${product.id}">
            <button class="heart wishlist-btn ${inWishlist ? 'is-wishlisted' : ''}" data-id="${product.id}" aria-label="Add ${product.name} to wishlist">
                <svg viewBox="0 0 24 24" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
            <a href="#/product/${product.id}" style="display: block; text-decoration: none; color: inherit; cursor: pointer;">
                <div class="product-image-wrapper">
                    ${badgeHTML}
                    <img src="${image}" alt="${product.name}" loading="lazy">
                </div>
                
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-meta" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                        <div style="color: var(--color-gold); font-size: 12px; margin-bottom: 2px;">
                            ${generateStarRating ? generateStarRating(product.rating || 5) : '★★★★★'}
                            <span style="color: var(--color-brown-soft); font-size: 11px;">(${product.reviews || 0})</span>
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <strong>${formatPrice ? formatPrice(product.price) : '₹' + product.price.toLocaleString('en-IN')}</strong>
                            ${isDiscounted ? `<span style="text-decoration: line-through; opacity: 0.6; font-size: 12px;">${formatPrice ? formatPrice(product.originalPrice) : '₹' + product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                        </div>
                    </div>
                </div>
            </a>
            <button class="btn primary add add-to-cart-btn" data-id="${product.id}">Add to bag →</button>
        </article>
    `;
}
