import { initNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { getCart, getCartTotal, clearCart } from '../utils/cart.js';
import { formatPrice } from '../utils/helpers.js';

export async function renderCheckout(container, params) {
    
    
    const cartItems = getCart();
    if(cartItems.length === 0) {
        window.location.hash = '#/cart';
        return;
    }
    
    const total = getCartTotal();
    const shipping = total > 999 ? 0 : 99;
    const finalTotal = total + shipping;

    container.innerHTML = `
        <style>
            .checkout-layout { display: flex; max-width: 1200px; margin: 2rem auto 4rem; padding: 0 2rem; gap: 4rem; }
            .checkout-main { flex: 1; }
            .checkout-sidebar { width: 350px; background: #faf9f6; padding: 2rem; border-radius: 8px; height: fit-content; border: 1px solid #eee; }
            
            .step-indicator { display: flex; justify-content: space-between; margin-bottom: 3rem; position: relative; }
            .step-indicator::before { content: ''; position: absolute; top: 15px; left: 10%; right: 10%; height: 2px; background: #eee; z-index: 1; }
            .step { position: relative; z-index: 2; text-align: center; background: white; padding: 0 10px; color: #999; }
            .step.active { color: #D4AF37; font-weight: bold; }
            .step-circle { width: 32px; height: 32px; border-radius: 50%; background: #eee; color: #999; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; }
            .step.active .step-circle { background: #D4AF37; color: #000; }
            .step.completed .step-circle { background: #800000; color: white; }
            
            .form-section { display: none; }
            .form-section.active { display: block; animation: fadeIn 0.5s; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            
            .input-group { margin-bottom: 1.5rem; }
            .input-group label { display: block; margin-bottom: 0.5rem; color: #555; font-size: 0.9rem; }
            .input-group input, .input-group select { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; outline: none; font-size: 1rem; transition: border 0.3s; }
            .input-group input:focus, .input-group select:focus { border-color: #D4AF37; }
            
            .row { display: flex; gap: 1rem; }
            .col { flex: 1; }
            
            .btn-checkout { background: #800000; color: white; padding: 15px; border: none; border-radius: 4px; font-weight: bold; width: 100%; cursor: pointer; font-size: 1.1rem; margin-top: 1rem; }
            
            @media (max-width: 800px) {
                .checkout-layout { flex-direction: column-reverse; }
                .checkout-sidebar { width: 100%; }
            }
        </style>
        
        <div style="background: #faf9f6; padding: 2rem 0; text-align: center; border-bottom: 1px solid #eee;">
            <h1 style="font-family: 'Playfair Display', serif; color: #800000; font-size: 2rem; margin: 0;">Secure Checkout <i class="fas fa-lock" style="font-size: 1.2rem; color: #D4AF37;"></i></h1>
        </div>
        
        <div class="checkout-layout">
            <div class="checkout-main">
                <div class="step-indicator">
                    <div class="step active" id="step1-ind">
                        <div class="step-circle">1</div>
                        <div>Shipping</div>
                    </div>
                    <div class="step" id="step2-ind">
                        <div class="step-circle">2</div>
                        <div>Payment</div>
                    </div>
                    <div class="step" id="step3-ind">
                        <div class="step-circle">3</div>
                        <div>Confirmation</div>
                    </div>
                </div>
                
                <form id="checkout-form">
                    <!-- STEP 1: SHIPPING -->
                    <div class="form-section active" id="step1">
                        <h2 style="font-family: 'Playfair Display', serif; margin-bottom: 1.5rem;">Shipping Details</h2>
                        <div class="input-group">
                            <label>Full Name</label>
                            <input type="text" id="name" required placeholder="Asha Sharma">
                        </div>
                        <div class="row">
                            <div class="col input-group">
                                <label>Email Address</label>
                                <input type="email" id="email" required placeholder="asha@example.com">
                            </div>
                            <div class="col input-group">
                                <label>Phone Number</label>
                                <input type="tel" id="phone" required placeholder="+91 XXXXX XXXXX">
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Street Address</label>
                            <input type="text" id="address" required placeholder="House No, Street Name">
                        </div>
                        <div class="row">
                            <div class="col input-group">
                                <label>City</label>
                                <input type="text" id="city" required placeholder="Mumbai">
                            </div>
                            <div class="col input-group">
                                <label>State</label>
                                <select id="state" required>
                                    <option value="">Select State</option>
                                    <option value="MH">Maharashtra</option>
                                    <option value="DL">Delhi</option>
                                    <option value="KA">Karnataka</option>
                                </select>
                            </div>
                            <div class="col input-group">
                                <label>Pincode</label>
                                <input type="text" id="pincode" required placeholder="400001">
                            </div>
                        </div>
                        <button type="button" class="btn-checkout" id="btn-to-payment">Continue to Payment</button>
                    </div>
                    
                    <!-- STEP 2: PAYMENT -->
                    <div class="form-section" id="step2">
                        <h2 style="font-family: 'Playfair Display', serif; margin-bottom: 1.5rem;">Payment Method</h2>
                        <div style="background: #f8f9fa; border: 1px solid #ddd; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                            <div style="display: flex; gap: 10px; margin-bottom: 1rem;">
                                <i class="fab fa-cc-visa" style="font-size: 2rem; color: #1a1f71;"></i>
                                <i class="fab fa-cc-mastercard" style="font-size: 2rem; color: #eb001b;"></i>
                                <i class="fab fa-cc-amex" style="font-size: 2rem; color: #002663;"></i>
                            </div>
                            <div class="input-group">
                                <label>Card Number</label>
                                <input type="text" id="card-num" placeholder="XXXX XXXX XXXX XXXX">
                            </div>
                            <div class="input-group">
                                <label>Name on Card</label>
                                <input type="text" id="card-name" placeholder="Name">
                            </div>
                            <div class="row">
                                <div class="col input-group">
                                    <label>Expiry (MM/YY)</label>
                                    <input type="text" id="card-exp" placeholder="MM/YY">
                                </div>
                                <div class="col input-group">
                                    <label>CVV</label>
                                    <input type="password" id="card-cvv" placeholder="123">
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <button type="button" id="btn-back-shipping" style="background: transparent; border: 1px solid #ccc; padding: 15px; border-radius: 4px; cursor: pointer; flex: 1;">Back</button>
                            <button type="submit" class="btn-checkout" style="flex: 2; margin-top: 0; background: #D4AF37; color: #000;">Place Order: ${formatPrice(finalTotal)}</button>
                        </div>
                    </div>
                </form>
                
                <!-- STEP 3: CONFIRMATION -->
                <div class="form-section" id="step3" style="text-align: center; padding: 3rem 0;">
                    <div style="width: 80px; height: 80px; background: #4CAF50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 2rem;">
                        <i class="fas fa-check"></i>
                    </div>
                    <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #333; margin-bottom: 1rem;">Order Placed Successfully!</h2>
                    <p style="color: #666; font-size: 1.1rem; margin-bottom: 2rem;">Thank you for your purchase. Your handcrafted jewelry will be on its way soon.</p>
                    <div style="background: #faf9f6; padding: 1.5rem; border-radius: 8px; display: inline-block; margin-bottom: 2rem; border: 1px dashed #D4AF37;">
                        <p style="margin: 0; font-weight: bold; color: #800000;">Order Number: #ASHA${Math.floor(Math.random()*90000) + 10000}</p>
                    </div>
                    <br>
                    <a href="#/" class="btn-checkout" style="display: inline-block; width: auto; padding: 12px 30px; text-decoration: none;">Return to Home</a>
                </div>
            </div>
            
            <div class="checkout-sidebar" id="order-summary-sidebar">
                <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 1.5rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">Order Summary</h3>
                <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1.5rem;">
                    ${cartItems.map(item => {
                        const product = item.product;
                        return `
                            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                                <div style="position: relative;">
                                    <img src="${product.image || './images/earrings-jhumka.jpg'}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
                                    <span style="position: absolute; top: -5px; right: -5px; background: #800000; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">${item.quantity}</span>
                                </div>
                                <div style="flex: 1;">
                                    <p style="margin: 0; font-weight: bold; font-size: 0.9rem;">${product.name}</p>
                                    <p style="margin: 0; color: #666; font-size: 0.9rem;">${formatPrice(product.price * item.quantity)}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div style="border-top: 1px solid #ddd; padding-top: 1rem; color: #555; font-size: 0.9rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Subtotal</span>
                        <span>${formatPrice(total)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                        <span>Shipping</span>
                        <span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem; color: #800000; border-top: 1px solid #ddd; padding-top: 1rem;">
                        <span>Total</span>
                        <span>${formatPrice(finalTotal)}</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="footer-container"></div>
    `;
    
    container.querySelector('#footer-container').innerHTML = createFooter();
    
    // Interactions
    const form = container.querySelector('#checkout-form');
    const step1 = container.querySelector('#step1');
    const step2 = container.querySelector('#step2');
    const step3 = container.querySelector('#step3');
    
    const ind1 = container.querySelector('#step1-ind');
    const ind2 = container.querySelector('#step2-ind');
    const ind3 = container.querySelector('#step3-ind');
    
    container.querySelector('#btn-to-payment').addEventListener('click', () => {
        // Simple validation
        const inputs = step1.querySelectorAll('input[required], select[required]');
        let valid = true;
        inputs.forEach(i => {
            if(!i.value) { valid = false; i.style.borderColor = 'red'; }
            else { i.style.borderColor = '#ddd'; }
        });
        
        if(valid) {
            step1.classList.remove('active');
            step2.classList.add('active');
            ind1.classList.remove('active');
            ind1.classList.add('completed');
            ind2.classList.add('active');
        } else {
            alert('Please fill all required fields');
        }
    });
    
    container.querySelector('#btn-back-shipping').addEventListener('click', () => {
        step2.classList.remove('active');
        step1.classList.add('active');
        ind2.classList.remove('active');
        ind1.classList.add('active');
        ind1.classList.remove('completed');
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate processing
        const btn = e.target.querySelector('button[type="submit"]');
        btn.textContent = 'Processing...';
        btn.disabled = true;
        
        setTimeout(() => {
            step2.classList.remove('active');
            step3.classList.add('active');
            ind2.classList.remove('active');
            ind2.classList.add('completed');
            ind3.classList.add('active');
            
            // Hide sidebar
            container.querySelector('#order-summary-sidebar').style.display = 'none';
            
            clearCart();
        }, 1500);
    });
}
