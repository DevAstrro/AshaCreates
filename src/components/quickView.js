import { formatPrice, generateStarRating } from '../utils/helpers.js';

let modal = null;
let backdrop = null;

function createModalDOM() {
    const app = document.getElementById('app') || document.body;
    
    backdrop = document.createElement('div');
    backdrop.className = 'quick-view-backdrop';
    
    modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    
    app.appendChild(backdrop);
    app.appendChild(modal);

    const close = () => closeQuickView();
    backdrop.addEventListener('click', close);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            close();
        }
    });
}

export function openQuickView(product) {
    if (!product) return;
    if (!modal) createModalDOM();

    // Default quantity
    let currentQty = 1;

    modal.innerHTML = `
        <button class="quick-view-close">&times;</button>
        <div class="quick-view-content">
            <div class="quick-view-image-container">
                <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}">
            </div>
            <div class="quick-view-details">
                <h2 class="quick-view-title">${product.name}</h2>
                <div class="quick-view-rating">
                    ${generateStarRating ? generateStarRating(product.rating || 5) : '★★★★★'}
                    <span>(${product.reviews || 0} reviews)</span>
                </div>
                <div class="quick-view-price-row">
                    <span class="price">${formatPrice ? formatPrice(product.price) : '₹' + product.price}</span>
                    ${product.originalPrice && product.originalPrice > product.price ? `<span class="original-price">${formatPrice ? formatPrice(product.originalPrice) : '₹' + product.originalPrice}</span>` : ''}
                </div>
                <p class="quick-view-description">${product.shortDescription || 'Experience the beauty of Indian craftsmanship with this stunning piece. Handcrafted to perfection.'}</p>
                
                <div class="quick-view-add-section">
                    <div class="qty-selector">
                        <button class="qty-btn" id="qv-qty-minus">-</button>
                        <span class="qty-value" id="qv-qty-value">${currentQty}</span>
                        <button class="qty-btn" id="qv-qty-plus">+</button>
                    </div>
                    <button class="btn-primary" id="qv-add-to-cart">Add to Cart</button>
                </div>
                
                <a href="#/product/${product.id}" class="quick-view-full-link">View Full Details</a>
            </div>
        </div>
    `;

    // Add event listeners for this specific modal render
    modal.querySelector('.quick-view-close').addEventListener('click', closeQuickView);
    
    const qtyVal = modal.querySelector('#qv-qty-value');
    modal.querySelector('#qv-qty-minus').addEventListener('click', () => {
        if (currentQty > 1) {
            currentQty--;
            qtyVal.textContent = currentQty;
        }
    });
    modal.querySelector('#qv-qty-plus').addEventListener('click', () => {
        currentQty++;
        qtyVal.textContent = currentQty;
    });

    modal.querySelector('#qv-add-to-cart').addEventListener('click', () => {
        // Dispatch custom event to add to cart
        window.dispatchEvent(new CustomEvent('add-to-cart', { 
            detail: { product, quantity: currentQty } 
        }));
        closeQuickView();
    });

    // Show modal with animation
    backdrop.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

export function closeQuickView() {
    if (modal) {
        modal.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
}
