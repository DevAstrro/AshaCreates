import { initNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { getCart, getCartTotal, removeFromCart, updateQuantity } from '../utils/cart.js';
import { formatPrice, getImagePath } from '../utils/helpers.js';

export async function renderCart(container, params) {
    
    
    const renderCartContents = () => {
        const cartItems = getCart();
        const total = getCartTotal();
        
        if (cartItems.length === 0) {
            container.innerHTML = `
                <div style="min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
                    <i class="fas fa-shopping-bag" style="font-size: 5rem; color: #eee; margin-bottom: 2rem;"></i>
                    <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #333; margin-bottom: 1rem;">Your bag is empty</h2>
                    <p style="color: #666; margin-bottom: 2rem;">Looks like you haven't added anything to your cart yet.</p>
                    <a href="#/shop" class="btn" style="background: #D4AF37; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">Continue Shopping</a>
                </div>
                <div id="footer-container"></div>
            `;
            container.querySelector('#footer-container').innerHTML = createFooter();
            return;
        }

        let shipping = total > 999 ? 0 : 99;
        let discount = 0; // Handled later if coupon applied
        
        container.innerHTML = `
            <style>
                .cart-layout { display: flex; max-width: 1200px; margin: 4rem auto; padding: 0 2rem; gap: 3rem; }
                .cart-items { flex: 1; }
                .order-summary { width: 350px; flex-shrink: 0; background: #faf9f6; padding: 2rem; border-radius: 8px; height: fit-content; }
                
                .cart-item-row { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem 0; border-bottom: 1px solid #eee; }
                .cart-item-img { width: 80px; height: 80px; object-fit: cover; border-radius: 4px; }
                .cart-item-info { flex: 1; }
                
                .qty-control { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 4px; width: fit-content; }
                .qty-btn { background: none; border: none; padding: 4px 10px; cursor: pointer; }
                .qty-input { width: 30px; text-align: center; border: none; border-left: 1px solid #ddd; border-right: 1px solid #ddd; padding: 4px 0; }
                
                .remove-btn { color: #999; background: none; border: none; cursor: pointer; font-size: 1.2rem; }
                .remove-btn:hover { color: #800000; }
                
                .summary-row { display: flex; justify-content: space-between; margin-bottom: 1rem; color: #555; }
                
                @media (max-width: 800px) {
                    .cart-layout { flex-direction: column; }
                    .order-summary { width: 100%; }
                    .cart-item-row { flex-wrap: wrap; }
                }
            </style>
            
            <div style="max-width: 1200px; margin: 0 auto; padding: 2rem 2rem 0;">
                <h1 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #800000; border-bottom: 2px solid #D4AF37; padding-bottom: 1rem; display: inline-block;">Shopping Bag</h1>
                <span style="color: #666; margin-left: 1rem;">(${cartItems.length} items)</span>
            </div>
            
            <div class="cart-layout">
                <div class="cart-items">
                    <div class="cart-headers" style="display: flex; border-bottom: 1px solid #ddd; padding-bottom: 1rem; color: #666; font-size: 0.9rem; font-weight: bold; text-transform: uppercase;">
                        <div style="flex: 1;">Product</div>
                        <div style="width: 100px; text-align: center;">Price</div>
                        <div style="width: 120px; text-align: center;">Quantity</div>
                        <div style="width: 100px; text-align: right;">Total</div>
                        <div style="width: 40px;"></div>
                    </div>
                    
                    ${cartItems.map(item => {
                        const product = item.product;
                        if(!product) return '';
                        return `
                        <div class="cart-item-row" data-id="${product.id}">
                            <img src="${product.image || getImagePath(product.id)}" alt="${product.name}" class="cart-item-img">
                            <div class="cart-item-info">
                                <a href="#/product/${product.id}" style="text-decoration: none; color: #333; font-weight: bold; font-family: 'Playfair Display', serif; font-size: 1.1rem; display: block; margin-bottom: 0.5rem;">${product.name}</a>
                                <p style="color: #666; font-size: 0.85rem; margin: 0;">Handcrafted</p>
                            </div>
                            <div style="width: 100px; text-align: center; color: #555;">${formatPrice(product.price)}</div>
                            <div style="width: 120px; display: flex; justify-content: center;">
                                <div class="qty-control">
                                    <button class="qty-btn minus">-</button>
                                    <input type="text" class="qty-input" value="${item.quantity}" readonly>
                                    <button class="qty-btn plus">+</button>
                                </div>
                            </div>
                            <div style="width: 100px; text-align: right; font-weight: bold; color: #333;">${formatPrice(product.price * item.quantity)}</div>
                            <div style="width: 40px; text-align: right;">
                                <button class="remove-btn"><i class="fas fa-times"></i></button>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="order-summary">
                    <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 1.5rem; color: #333; font-size: 1.5rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">Order Summary</h3>
                    
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${formatPrice(total)}</span>
                    </div>
                    
                    <div class="summary-row">
                        <span>Shipping <br><small style="font-size: 0.7rem;">(Free above ₹999)</small></span>
                        <span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                    </div>
                    
                    <div class="coupon-section" style="margin: 1.5rem 0; display: flex; gap: 10px;">
                        <input type="text" id="coupon-input" placeholder="Coupon code (e.g. ASHA10)" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        <button id="apply-coupon" style="background: #333; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer;">Apply</button>
                    </div>
                    
                    <div id="discount-row" class="summary-row" style="display: none; color: #2e7d32;">
                        <span>Discount</span>
                        <span id="discount-amount"></span>
                    </div>
                    
                    <div style="height: 1px; background: #ddd; margin: 1rem 0;"></div>
                    
                    <div class="summary-row" style="font-weight: bold; font-size: 1.2rem; color: #800000;">
                        <span>Total</span>
                        <span id="final-total">${formatPrice(total + shipping)}</span>
                    </div>
                    
                    <a href="#/checkout" class="btn" style="display: block; width: 100%; text-align: center; background: #D4AF37; color: #000; font-weight: bold; padding: 15px; border: none; border-radius: 4px; text-decoration: none; margin-top: 2rem; font-size: 1.1rem;">Proceed to Checkout</a>
                    <a href="#/shop" style="display: block; text-align: center; margin-top: 1rem; color: #666; text-decoration: none; font-size: 0.9rem;">Continue Shopping</a>
                </div>
            </div>
            <div id="footer-container"></div>
        `;
        
        container.querySelector('#footer-container').innerHTML = createFooter();
        
        // Setup listeners
        container.querySelectorAll('.cart-item-row').forEach(row => {
            const id = row.dataset.id;
            const input = row.querySelector('.qty-input');
            
            row.querySelector('.minus').addEventListener('click', () => {
                let val = parseInt(input.value);
                if(val > 1) updateQuantity(id, val - 1);
            });
            row.querySelector('.plus').addEventListener('click', () => {
                let val = parseInt(input.value);
                if(val < 10) updateQuantity(id, val + 1);
            });
            row.querySelector('.remove-btn').addEventListener('click', () => {
                removeFromCart(id);
            });
        });
        
        // Coupon logic
        const applyBtn = container.querySelector('#apply-coupon');
        if(applyBtn) {
            applyBtn.addEventListener('click', () => {
                const code = container.querySelector('#coupon-input').value.trim().toUpperCase();
                if(code === 'ASHA10') {
                    discount = total * 0.1;
                    container.querySelector('#discount-row').style.display = 'flex';
                    container.querySelector('#discount-amount').textContent = '-' + formatPrice(discount);
                    container.querySelector('#final-total').textContent = formatPrice(total + shipping - discount);
                    applyBtn.textContent = 'Applied';
                    applyBtn.style.background = '#2e7d32';
                    applyBtn.disabled = true;
                } else {
                    alert('Invalid coupon code');
                }
            });
        }
    };
    
    // Listen for cart updates
    const handleCartUpdate = () => renderCartContents();
    window.addEventListener('cart-updated', handleCartUpdate);
    
    renderCartContents();
    
    // Cleanup
    return () => {
        window.removeEventListener('cart-updated', handleCartUpdate);
    };
}
