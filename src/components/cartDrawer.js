import { formatPrice } from '../utils/helpers.js';
import { updateQuantity, removeFromCart, getCart } from '../utils/cart.js';

export function initCartDrawer() {
    const app = document.getElementById('app') || document.body;
    
    // Create DOM elements
    const backdrop = document.createElement('div');
    backdrop.className = 'cart-drawer-backdrop';
    
    const drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    
    drawer.innerHTML = `
        <div class="cart-drawer-header">
            <h2>Shopping Bag <span class="cart-item-count">(0)</span></h2>
            <button class="cart-drawer-close">&times;</button>
        </div>
        <div class="cart-drawer-body">
            <div class="cart-items-list">
                <!-- Items will be injected here -->
                <div class="cart-empty-message">Your bag is empty.</div>
            </div>
        </div>
        <div class="cart-drawer-footer">
            <div class="cart-subtotal-row">
                <span>Subtotal</span>
                <span class="cart-subtotal-amount">₹0</span>
            </div>
            <p class="cart-tax-note">Taxes and shipping calculated at checkout</p>
            <div class="cart-drawer-actions">
                <a href="#/cart" class="btn ghost view-cart-btn">View Cart</a>
                <a href="#/checkout" class="btn primary checkout-btn">Checkout</a>
            </div>
        </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    const closeBtn = drawer.querySelector('.cart-drawer-close');
    const itemsList = drawer.querySelector('.cart-items-list');
    const subtotalEl = drawer.querySelector('.cart-subtotal-amount');
    const countEl = drawer.querySelector('.cart-item-count');

    const open = () => {
        backdrop.classList.add('active');
        drawer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const close = () => {
        backdrop.classList.remove('active');
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);

    const renderItems = (items) => {
        if (!items || items.length === 0) {
            itemsList.innerHTML = '<div class="cart-empty-message">Your bag is empty.</div>';
            subtotalEl.textContent = formatPrice ? formatPrice(0) : '₹0';
            countEl.textContent = '(0)';
            return;
        }

        let subtotal = 0;
        let totalItems = 0;
        
        itemsList.innerHTML = items.map(item => {
            const p = item.product;
            subtotal += p.price * item.quantity;
            totalItems += item.quantity;
            return `
                <div class="cart-drawer-item" data-id="${p.id}">
                    <img src="${p.image}" alt="${p.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${p.name}</h4>
                        <p class="cart-item-price">${formatPrice ? formatPrice(p.price) : '₹' + p.price}</p>
                        <div class="cart-item-qty-row">
                            <div class="qty-selector">
                                <button class="qty-btn qty-minus" data-id="${p.id}">-</button>
                                <span class="qty-value">${item.quantity}</span>
                                <button class="qty-btn qty-plus" data-id="${p.id}">+</button>
                            </div>
                            <button class="cart-item-remove" data-id="${p.id}">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        subtotalEl.textContent = formatPrice ? formatPrice(subtotal) : '₹' + subtotal;
        countEl.textContent = `(${totalItems})`;

        // Re-attach event listeners for newly rendered buttons
        itemsList.querySelectorAll('.qty-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const cart = getCart();
                const item = cart.find(i => i.product.id === id);
                if (item && item.quantity > 1) updateQuantity(id, item.quantity - 1);
            });
        });
        itemsList.querySelectorAll('.qty-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const cart = getCart();
                const item = cart.find(i => i.product.id === id);
                if (item) updateQuantity(id, item.quantity + 1);
            });
        });
        itemsList.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                removeFromCart(id);
            });
        });
    };

    let previousCount = 0;
    
    window.addEventListener('cart-updated', (e) => {
        const newCart = e.detail?.cart || [];
        const newCount = e.detail?.count || 0;
        
        renderItems(newCart);
        
        // Auto-open if items were added
        if (newCount > previousCount && previousCount !== 0 || (newCount === 1 && previousCount === 0 && e.isTrusted === false)) {
            open();
        }
        previousCount = newCount;
    });

    // Handle cart toggling from nav
    const navCartBtn = document.querySelector('.navbar .cart-btn');
    if (navCartBtn) {
        navCartBtn.addEventListener('click', open);
    }

    return { open, close };
}
