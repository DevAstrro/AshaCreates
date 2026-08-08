import { initNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { createProductCard } from '../components/productCard.js';
import { initCartDrawer } from '../components/cartDrawer.js';
import { getProductById, getRelatedProducts } from '../data/products.js';
import { addToCart } from '../utils/cart.js';
import { toggleWishlist, isWishlisted } from '../utils/wishlist.js';
import { formatPrice, generateStarRating, getImagePath } from '../utils/helpers.js';
import { initScrollReveal } from '../utils/scrollAnimations.js';

export async function renderProductDetail(container, params) {
    
    
    
    const product = getProductById(params.id);
    if (!product) {
        container.innerHTML = '<div style="padding: 5rem; text-align: center;"><h2>Product not found</h2><a href="#/shop">Return to Shop</a></div>';
        return;
    }

    const relatedProducts = getRelatedProducts(product.id, 4);
    
    // Need mock values for images, thumbnails if not array
    const images = Array.isArray(product.images) ? product.images : [product.image, product.image, product.image];
    
    container.innerHTML = `
        <style>
            .product-layout { display: flex; max-width: 1200px; margin: 2rem auto; padding: 0 2rem; gap: 4rem; }
            .product-gallery { width: 55%; }
            .product-info { width: 45%; }
            .indian-frame { border: 2px solid #D4AF37; padding: 2rem; position: relative; background: #fff; border-radius: 8px; }
            .indian-frame::before, .indian-frame::after { content: ''; position: absolute; width: 20px; height: 20px; border: 2px solid #D4AF37; }
            .indian-frame::before { top: 5px; left: 5px; border-right: none; border-bottom: none; }
            .indian-frame::after { bottom: 5px; right: 5px; border-left: none; border-top: none; }
            
            .main-image-container { overflow: hidden; border-radius: 8px; margin-bottom: 1rem; cursor: zoom-in; position: relative; aspect-ratio: 4/5; }
            .main-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
            .main-image-container:hover .main-image { transform: scale(1.5); }
            
            .thumbnail-row { display: flex; gap: 1rem; }
            .thumbnail { width: 80px; height: 80px; object-fit: cover; border: 2px solid transparent; cursor: pointer; border-radius: 4px; transition: border 0.2s; }
            .thumbnail.active { border-color: #800000; }
            
            .qty-control { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 4px; width: fit-content; }
            .qty-btn { background: none; border: none; padding: 8px 12px; cursor: pointer; font-size: 1.2rem; color: #333; }
            .qty-input { width: 40px; text-align: center; border: none; border-left: 1px solid #ddd; border-right: 1px solid #ddd; padding: 8px 0; font-size: 1rem; pointer-events: none; }
            
            .accordion-header { display: flex; justify-content: space-between; cursor: pointer; padding: 1rem 0; font-weight: bold; border-bottom: 1px solid #eee; }
            .accordion-content { display: none; padding: 1rem 0; color: #666; font-size: 0.9rem; border-bottom: 1px solid #eee; }
            .accordion-content.active { display: block; }
            
            @media (max-width: 900px) {
                .product-layout { flex-direction: column; }
                .product-gallery, .product-info { width: 100%; }
            }
        </style>
        
        <div class="breadcrumb" style="max-width: 1200px; margin: 2rem auto 0; padding: 0 2rem; font-size: 0.9rem; color: var(--color-brown-soft); font-family: var(--font-family-body);">
            <a href="#/" style="color: var(--color-brown-soft); text-decoration: none; transition: color 0.3s;">Home</a> &rsaquo; 
            <a href="#/shop" style="color: var(--color-brown-soft); text-decoration: none; transition: color 0.3s;">Shop</a> &rsaquo; 
            <span style="color: var(--color-text-dark);">${product.name}</span>
        </div>
        
        <div class="product-layout">
            <div class="product-gallery">
                <div class="main-image-container" id="main-image-container">
                    <img src="${images[0]}" alt="${product.name}" class="main-image" id="main-image">
                </div>
                <div class="thumbnail-row">
                    ${images.map((img, i) => `
                        <img src="${img}" class="thumbnail ${i===0 ? 'active' : ''}" data-src="${img}" alt="Thumbnail ${i+1}">
                    `).join('')}
                </div>
            </div>
            
            <div class="product-info">
                <div style="padding: 1rem 0; position: relative;">
                    <h1 style="font-family: var(--font-family-heading); font-size: clamp(32px, 4vw, 42px); color: var(--color-text-dark); margin-bottom: 0.5rem; line-height: 1.1;">${product.name}</h1>
                    
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <span style="font-size: 1.8rem; font-weight: 500; color: var(--color-maroon);">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span style="text-decoration: line-through; color: var(--color-brown-soft);">${formatPrice(product.originalPrice)}</span>
                        <span style="background: var(--color-cream); color: var(--color-maroon); padding: 4px 10px; border-radius: var(--border-radius-full); font-size: 0.8rem; font-weight: 600;">Save ${formatPrice(product.originalPrice - product.price)}</span>` : ''}
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem;">
                        <div style="color: var(--color-gold); font-size: 14px;">${generateStarRating(product.rating || 5)}</div>
                        <span style="color: var(--color-brown-soft); font-size: 0.9rem;">(${product.reviews || 12} reviews)</span>
                    </div>
                    
                    <p style="color: var(--color-text-dark); line-height: 1.7; margin-bottom: 2rem; font-size: 1.05rem;">${product.description || 'A beautiful handcrafted piece that embodies the essence of traditional Indian artistry.'}</p>
                    
                    <div style="margin-bottom: 2rem;">
                        <strong style="display: block; margin-bottom: 0.8rem; color: var(--color-text-dark); font-family: var(--font-family-heading); font-size: 1.1rem;">Details & Materials</strong>
                        <ul style="color: var(--color-brown-soft); padding-left: 1.2rem; font-size: 0.95rem; display: flex; flex-direction: column; gap: 8px;">
                            <li>Premium quality materials</li>
                            <li>Hypoallergenic finish</li>
                            <li>Ethically sourced components</li>
                        </ul>
                    </div>
                    
                    <div style="background: var(--color-cream); padding: 12px 16px; border-radius: var(--border-radius-sm); display: inline-flex; align-items: center; gap: 10px; margin-bottom: 2.5rem; border: 1px solid var(--border-warm);">
                        <span style="font-size: 1.2rem;">🪔</span> <span style="font-size: 0.9rem; font-weight: 500; color: var(--color-maroon);">Handcrafted with Love in India</span>
                    </div>
                    
                    <div class="accordion">
                        <div class="accordion-header">
                            <span style="font-family: var(--font-family-heading); font-size: 1.1rem; color: var(--color-text-dark);">Care Instructions</span>
                            <span style="color: var(--color-brown-soft);">+</span>
                        </div>
                        <div class="accordion-content" style="line-height: 1.6;">
                            Keep away from moisture, perfumes, and harsh chemicals. Store in the provided AshaCreates pouch when not in use.
                        </div>
                    </div>
                    
                    <div style="margin: 2rem 0; height: 1px; background: var(--border-warm);"></div>
                    
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
                        <div class="qty-control" style="border-color: var(--border-warm); border-radius: var(--border-radius-full); overflow: hidden;">
                            <button class="qty-btn minus" style="padding: 10px 15px; background: var(--color-ivory); color: var(--color-maroon);">-</button>
                            <input type="text" class="qty-input" value="1" style="background: var(--color-ivory); color: var(--color-text-dark); font-weight: 600;">
                            <button class="qty-btn plus" style="padding: 10px 15px; background: var(--color-ivory); color: var(--color-maroon);">+</button>
                        </div>
                        <div style="color: var(--color-brown-soft); font-size: 0.9rem; font-weight: 500;">In Stock</div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
                        <button id="add-to-cart" class="btn" style="background: var(--color-ivory); color: var(--color-maroon); border: 1px solid var(--border-warm); padding: 16px; border-radius: var(--border-radius-full); cursor: pointer; font-size: 1.05rem; font-weight: 500; width: 100%; transition: all 0.3s ease;">Add to Cart</button>
                        <button id="buy-now" class="btn" style="background: var(--color-maroon); color: var(--color-ivory); border: 1px solid var(--color-maroon); padding: 16px; border-radius: var(--border-radius-full); cursor: pointer; font-size: 1.05rem; font-weight: 500; width: 100%; transition: all 0.3s ease;">Buy Now</button>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <button id="wishlist-toggle" style="background: none; border: none; color: var(--color-brown-soft); display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.95rem; font-weight: 500; transition: color 0.3s;">
                            <i class="${isWishlisted(product.id) ? 'fas' : 'far'} fa-heart" style="color: ${isWishlisted(product.id) ? 'var(--color-maroon)' : 'inherit'}; font-size: 1.2rem;"></i>
                            <span>${isWishlisted(product.id) ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
                        </button>
                        
                        <div style="display: flex; align-items: center; gap: 8px; color: var(--color-brown-soft); font-size: 0.95rem;">
                            <i class="fas fa-truck"></i> Free delivery above ₹999
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <section class="related-products" style="max-width: 1200px; margin: 5rem auto; padding: 0 2rem;">
            <h2 style="text-align: center; font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem;">You May Also Like</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem;">
                ${relatedProducts.map(p => createProductCard(p)).join('')}
            </div>
        </section>
        
        <div id="footer-container"></div>
    `;
    
    container.querySelector('#footer-container').innerHTML = createFooter();
    
    // Interactions
    const mainImg = container.querySelector('#main-image');
    const containerEl = container.querySelector('#main-image-container');
    
    // Thumbnail swap
    container.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            container.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            mainImg.src = e.target.dataset.src;
        });
    });
    
    // Zoom effect
    containerEl.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = containerEl.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        mainImg.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    });
    containerEl.addEventListener('mouseleave', () => {
        mainImg.style.transformOrigin = 'center center';
    });
    
    // Accordion
    const accordionHeader = container.querySelector('.accordion-header');
    const accordionContent = container.querySelector('.accordion-content');
    accordionHeader.addEventListener('click', () => {
        accordionContent.classList.toggle('active');
        accordionHeader.querySelector('span:last-child').textContent = accordionContent.classList.contains('active') ? '-' : '+';
    });
    
    // Qty control
    const qtyInput = container.querySelector('.qty-input');
    container.querySelector('.minus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if(val > 1) qtyInput.value = val - 1;
    });
    container.querySelector('.plus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if(val < 10) qtyInput.value = val + 1;
    });
    
    // Add to Cart
    container.querySelector('#add-to-cart').addEventListener('click', () => {
        addToCart(product, parseInt(qtyInput.value));
    });
    
    // Buy Now
    container.querySelector('#buy-now').addEventListener('click', () => {
        addToCart(product, parseInt(qtyInput.value));
        window.location.hash = '#/checkout';
    });
    
    // Wishlist
    const wlBtn = container.querySelector('#wishlist-toggle');
    wlBtn.addEventListener('click', () => {
        toggleWishlist(product.id);
        const icon = wlBtn.querySelector('i');
        const text = wlBtn.querySelector('span');
        if(isWishlisted(product.id)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#800000';
            text.textContent = 'Added to Wishlist';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = 'inherit';
            text.textContent = 'Add to Wishlist';
        }
    });

    initScrollReveal();
}
