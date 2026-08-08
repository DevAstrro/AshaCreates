import { initNavbar } from '../components/navbar.js';
import { initCartDrawer } from '../components/cartDrawer.js';
import { createFooter } from '../components/footer.js';
import { getBestsellers, getProductById } from '../data/products.js';
import { addToCart } from '../utils/cart.js';
import { toggleWishlist, isWishlisted } from '../utils/wishlist.js';
import { initMagneticButtons } from '../components/magnetic.js';
import { initScrollReveal } from '../utils/scrollAnimations.js';
import { initFloatingMotifs } from '../components/motifs.js';

const renderAnnouncement = () => `
    <div class="announcement-bar">
        <span>✦</span>
        HANDCRAFTED IN SMALL BATCHES • INSPIRED BY INDIAN ARTISTRY • MADE TO BE KEPT
        <span>✦</span>
    </div>
`;

const renderHero = () => `
    <section class="hero reveal">
        <div class="hero-copy">
            <p class="eyebrow">HANDMADE • INDIAN INSPIRED • MADE WITH LOVE</p>
            <h1>Little pieces of<br><em>Indian magic.</em></h1>
            <p class="hero-copy-desc">I started AshaCreates to share the beauty of Indian heritage through jewelry that feels deeply personal. Every piece here is handcrafted with care, meant to bring a little warmth and joy to your everyday moments.</p>
            <div class="hero-buttons">
                <a class="btn primary" href="#/shop">Shop the collection <span>→</span></a>
                <a class="btn ghost" href="#/story">Our story</a>
            </div>
        </div>
        <div class="hero-image-container reveal delay-1">
            <div class="hero-product-frame">
                <img src="/images/hero-ornament.jpg" alt="AshaCreates Jewelry" fetchpriority="high">
            </div>
        </div>
    </section>
`;

const renderDivider = () => `
    <div class="ornament-divider" aria-hidden="true" style="display: flex; align-items: center; justify-content: center; gap: 15px; margin: 40px 0;">
        <span style="height: 1px; width: 60px; background: var(--color-gold); opacity: 0.3;"></span>
        <svg class="diya-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 2px 4px rgba(217,136,78,0.3));">
            <!-- Flame -->
            <path d="M12 2C12 2 9 7 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 7 12 2 12 2Z" fill="var(--color-gold)"/>
            <!-- Bowl -->
            <path d="M4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14H4Z" fill="var(--color-maroon)"/>
        </svg>
        <span style="height: 1px; width: 60px; background: var(--color-gold); opacity: 0.3;"></span>
    </div>
`;

const renderCollections = () => `
    <section id="collections" class="section reveal delay-1">
        <div class="section-head">
            <div>
                <p class="eyebrow">EXPLORE</p>
                <h2>Made for every <em>moment.</em></h2>
            </div>
            <a class="text-link" href="#/shop">
                View all <span>→</span>
            </a>
        </div>
        <div class="collections-grid">
            <a href="#/shop?category=everyday" class="collection-photo-card">
                <img src="/images/earrings-jhumka.jpg" alt="Everyday" loading="lazy">
                <div class="overlay"></div>
                <div class="content">
                    <span>Everyday</span>
                    <small>Pieces for every day →</small>
                </div>
            </a>
            <a href="#/shop?category=necklaces" class="collection-photo-card">
                <img src="/images/necklace-kundan.jpg" alt="Necklaces" loading="lazy">
                <div class="overlay"></div>
                <div class="content">
                    <span>Necklaces</span>
                    <small>Layered elegance →</small>
                </div>
            </a>
            <a href="#/shop?category=festive" class="collection-photo-card">
                <img src="/images/festive-set.jpg" alt="Festive" loading="lazy">
                <div class="overlay"></div>
                <div class="content">
                    <span>Festive</span>
                    <small>Statement jewelry →</small>
                </div>
            </a>
            <a href="#/shop?category=custom" class="collection-photo-card">
                <img src="/images/artisan-workspace.jpg" alt="Custom" loading="lazy">
                <div class="overlay"></div>
                <div class="content">
                    <span>Custom</span>
                    <small>Made for you →</small>
                </div>
            </a>
        </div>
    </section>
`;

const renderBestsellers = () => {
    const productsHtml = getBestsellers().slice(0, 4).map((p) => {
        const image = p.image || '/images/earrings-jhumka.jpg';
        // Mock descriptor if none exists in data
        const descriptor = p.description ? p.description.split('.')[0] : 'Handcrafted • Made in India';
        const inWishlist = isWishlisted(p.id);
        return `
            <article class="product-card">
                <button class="heart wishlist-btn ${inWishlist ? 'is-wishlisted' : ''}" data-id="${p.id}" aria-label="Add ${p.name} to wishlist">
                    <svg viewBox="0 0 24 24" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <a href="#/product/${p.id}" style="display: block; text-decoration: none; color: inherit; cursor: pointer;">
                    <div class="product-image-wrapper">
                        <img src="${image}" alt="${p.name}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${p.name}</h3>
                        <div class="product-meta" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                            <span style="font-size: 11px; opacity: 0.8;">${descriptor}</span>
                            <strong>₹${p.price.toLocaleString('en-IN')}</strong>
                        </div>
                    </div>
                </a>
                <button class="btn primary add add-to-cart-btn" data-id="${p.id}">Add to bag →</button>
            </article>
        `;
    }).join("");

    return `
        <section id="shop" class="section reveal" style="background: var(--color-ivory);">
            <div class="section-head">
                <div>
                    <p class="eyebrow">THE EDIT</p>
                    <h2>Beloved <em>pieces.</em></h2>
                    <p style="font-size: 14px; color: var(--color-brown-soft); margin-top: 5px;">A few of the pieces our customers return to, again and again.</p>
                </div>
            </div>
            <div class="product-grid">
                ${productsHtml}
            </div>
        </section>
    `;
};

const renderStory = () => `
    <section id="story" class="story-section reveal">
        <div class="story-image-container">
            <img src="/images/custom-pendant.jpg" alt="The Asha Story" loading="lazy">
        </div>
        <div class="story-copy">
            <p class="eyebrow">THE ASHA STORY</p>
            <h2>Tradition, with a little <em>twist.</em></h2>
            <p class="story-desc">I've always believed that the things we wear should tell a story. AshaCreates was born from my love for the vibrant colors, intricate motifs, and joyous celebrations of India.</p>
            <p class="story-desc">I sit down every day to shape and assemble these pieces by hand, pouring my heart into every detail. Because they aren't mass-produced, each ornament carries its own unique little quirks. I think that's the true magic of handmade jewelry—it's wonderfully imperfect and completely yours.</p>
            <a class="btn primary" href="#/story" style="align-self: flex-start; margin-top: 18px;">Discover the pieces <span>→</span></a>
        </div>
    </section>
`;

const renderCraftsmanship = () => `
    <section class="section craftsmanship-section reveal">
        <div class="craftsmanship-copy">
            <p class="eyebrow">CRAFTSMANSHIP</p>
            <h2>Made <em>slowly.</em></h2>
            <p style="color: var(--color-brown-soft); margin-bottom: 30px;">From the first sketch to the final polish, every piece passes through human hands.</p>
            
            <div class="craft-steps">
                <div>
                    <span class="craft-step-number">01</span>
                    <strong class="craft-step-title">SHAPE</strong>
                    <p style="color: var(--color-brown-soft); font-size: 14px; margin: 5px 0 0;">Each piece begins with a form.</p>
                </div>
                <div>
                    <span class="craft-step-number">02</span>
                    <strong class="craft-step-title">ASSEMBLE</strong>
                    <p style="color: var(--color-brown-soft); font-size: 14px; margin: 5px 0 0;">Details are joined by hand.</p>
                </div>
                <div>
                    <span class="craft-step-number">03</span>
                    <strong class="craft-step-title">FINISH</strong>
                    <p style="color: var(--color-brown-soft); font-size: 14px; margin: 5px 0 0;">Every piece is checked before it leaves us.</p>
                </div>
            </div>
        </div>
        <div>
            <img src="/images/artisan-workspace.jpg" alt="Craftsmanship" class="craft-image" loading="lazy">
        </div>
    </section>
`;

const renderMaterials = () => `
    <section class="materials-section reveal delay-1">
        <h2 style="font-size: clamp(32px, 4vw, 45px); margin-bottom: 40px;">The little details <em>matter.</em></h2>
        <div class="materials-grid">
            <div class="material-item">
                <div class="material-icon icon-brass"></div>
                <h4 style="color: var(--color-maroon); font-family: var(--font-family-body);">Brass</h4>
                <p style="color: var(--color-brown-soft); font-size: 14px;">Warm, timeless and beautifully imperfect.</p>
            </div>
            <div class="material-item">
                <div class="material-icon icon-gold"></div>
                <h4 style="color: var(--color-maroon); font-family: var(--font-family-body);">Gold finish</h4>
                <p style="color: var(--color-brown-soft); font-size: 14px;">Softly luminous, never overly polished.</p>
            </div>
            <div class="material-item">
                <div class="material-icon icon-kundan"></div>
                <h4 style="color: var(--color-maroon); font-family: var(--font-family-body);">Kundan</h4>
                <p style="color: var(--color-brown-soft); font-size: 14px;">Traditional detail with a contemporary expression.</p>
            </div>
        </div>
    </section>
`;

const renderReviews = () => `
    <section id="reviews" class="section reveal" style="background: var(--color-ivory);">
        <div class="section-head">
            <div>
                <p class="eyebrow">KIND WORDS</p>
                <h2>Loved by <em>you.</em></h2>
            </div>
        </div>
        <div class="reviews-grid">
            <blockquote class="review-card">
                <div class="review-stars">★★★★★</div>
                “I bought the Jhumkas for my sister's wedding and ended up wearing them three times that month.”
                <footer class="review-author">— Ananya S. · The Gul Jhumkas</footer>
            </blockquote>
            <blockquote class="review-card">
                <div class="review-stars">★★★★★</div>
                “The Kundan Choker is a showstopper! Beautifully packed and exactly what I was hoping for.”
                <footer class="review-author">— Meera K. · Kundan Choker</footer>
            </blockquote>
            <blockquote class="review-card">
                <div class="review-stars">★★★★★</div>
                “It feels like wearing a tiny piece of a celebration. You can actually feel the handmade touch.”
                <footer class="review-author">— Diya S. · Meera Drops</footer>
            </blockquote>
        </div>
    </section>
`;

const renderFinalCta = () => `
    <section class="final-cta reveal delay-1">
        ${renderDivider()}
        <h2>A little piece of India,<br><em>made for you.</em></h2>
        <a class="btn primary" href="#/shop" style="margin-top: 20px;">Discover the collection →</a>
        ${renderDivider()}
    </section>
`;



export async function renderHome(container) {
    
    
    
    // Inject the grain overlay into the body if it doesn't exist
    if (!document.querySelector('.grain')) {
        const grain = document.createElement('div');
        grain.className = 'grain';
        document.body.appendChild(grain);
    }
    
    container.innerHTML = `
        <main>
            ${renderAnnouncement()}
            ${renderHero()}
            ${renderCollections()}
            ${renderDivider()}
            ${renderBestsellers()}
            ${renderDivider()}
            ${renderStory()}
            ${renderCraftsmanship()}
            ${renderMaterials()}
            ${renderReviews()}
            ${renderFinalCta()}
            ${createFooter()}
        </main>
    `;

    const handleClick = (e) => {
        // Handle add to cart
        const addToCartBtn = e.target.closest('.add-to-cart-btn');
        if (addToCartBtn) {
            const id = addToCartBtn.dataset.id;
            const product = getProductById(id);
            if (product) addToCart(product);
        }
        
        // Handle wishlist
        const wishlistBtn = e.target.closest('.wishlist-btn');
        if (wishlistBtn) {
            const id = wishlistBtn.dataset.id;
            const product = getProductById(id);
            const isWishlisted = toggleWishlist(id);
            
            wishlistBtn.classList.toggle('is-wishlisted', isWishlisted);
            const svg = wishlistBtn.querySelector('svg');
            if (svg) svg.setAttribute('fill', isWishlisted ? 'currentColor' : 'none');
            wishlistBtn.setAttribute(
                'aria-label',
                isWishlisted
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
            );
        }
    };

    // Setup event delegation
    container.addEventListener('click', handleClick);

    // Initialize interactive enhancements without setTimeout
    initScrollReveal();
    initFloatingMotifs(container);

    return () => {
        container.removeEventListener('click', handleClick);
    };
}
