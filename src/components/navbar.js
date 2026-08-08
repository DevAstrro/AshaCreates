export function initNavbar() {
    const app = document.getElementById('app') || document.body;
    const nav = document.createElement('nav');
    nav.className = 'navbar';

    nav.innerHTML = `
        <div class="navbar-container" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <!-- Mobile Menu Button -->
            <button class="mobile-menu-btn icon-btn" aria-label="Menu" style="display: none;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

            <!-- Logo -->
            <a href="#/" class="logo" style="display: flex; align-items: center; gap: 10px;">
                <img src="/images/logo.png" alt="AshaCreates Logo" style="height: 40px; width: auto; border-radius: 4px;">
                <span style="font-size: 1.15em;"><span style="font-family: 'Copperplate Gothic', 'Copperplate Gothic Light', Copperplate, serif; font-weight: normal; letter-spacing: 0.5px; text-transform: uppercase;">Asha</span><span style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600; text-transform: none; margin-left: 2px;">Creates</span></span>
            </a>

            <!-- Center Links (Desktop) -->
            <div class="nav-links">
                <a href="#/" class="nav-link">Home</a>
                <a href="#/shop" class="nav-link">Shop</a>
                <a href="#/shop" class="nav-link">Collections</a>
                <a href="#our-story" class="nav-link">Our Story</a>
            </div>

            <!-- Right Icons -->
            <div class="nav-actions">
                <button class="icon-btn search-btn" aria-label="Search">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
                <a href="#/wishlist" class="icon-btn wishlist-btn" aria-label="Wishlist">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span class="badge wishlist-badge">0</span>
                </a>
                <button class="icon-btn cart-btn" aria-label="Cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <span class="badge cart-badge">0</span>
                </button>
            </div>
        </div>

        <!-- Mobile Drawer -->
        <style>
            .mobile-menu-drawer { position: fixed; top: 0; left: -100%; width: 280px; height: 100vh; background: var(--color-ivory); z-index: 100; transition: left 0.3s; padding: 20px; display: flex; flex-direction: column; gap: 20px; box-shadow: var(--shadow-medium); }
            .mobile-menu-drawer.active { left: 0; }
            .mobile-close-btn { align-self: flex-end; background: none; border: none; font-size: 24px; cursor: pointer; color: var(--color-text-dark); }
            .mobile-links { display: flex; flex-direction: column; gap: 15px; }
            .mobile-link { text-decoration: none; color: var(--color-text-dark); font-size: 18px; font-weight: 500; font-family: var(--font-family-body); }
            .mobile-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 90; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
            .mobile-backdrop.active { opacity: 1; pointer-events: auto; }
            @media (max-width: 768px) {
                .mobile-menu-btn { display: block !important; }
            }
        </style>
        <div class="mobile-menu-drawer">
            <button class="mobile-close-btn">&times;</button>
            <div class="mobile-links">
                <a href="#/" class="mobile-link">Home</a>
                <a href="#/shop" class="mobile-link">Shop</a>
                <a href="#/shop" class="mobile-link">Collections</a>
                <a href="#our-story" class="mobile-link">Our Story</a>
            </div>
        </div>
        <div class="mobile-backdrop"></div>
    `;

    document.body.insertBefore(nav, document.body.firstChild);

    // Scroll listener for premium transparent -> solid effect
    const handleScroll = () => {
        if (window.scrollY > 80) {
            nav.classList.add('navbar-scrolled');
        } else {
            nav.classList.remove('navbar-scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // Active link highlighting
    const updateActiveLink = () => {
        const hash = window.location.hash || '#/';
        document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    window.addEventListener('hashchange', updateActiveLink);
    updateActiveLink();

    // Mobile Menu logic
    const mobileBtn = nav.querySelector('.mobile-menu-btn');
    const closeBtn = nav.querySelector('.mobile-close-btn');
    const drawer = nav.querySelector('.mobile-menu-drawer');
    const backdrop = nav.querySelector('.mobile-backdrop');

    const toggleMenu = (show) => {
        drawer.classList.toggle('active', show);
        backdrop.classList.toggle('active', show);
    };

    mobileBtn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));
    backdrop.addEventListener('click', () => toggleMenu(false));
    nav.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Update Badges via custom events
    const cartBadge = nav.querySelector('.cart-badge');
    const cartBtn = nav.querySelector('.cart-btn');
    const wishlistBadge = nav.querySelector('.wishlist-badge');

    const updateCart = (e) => {
        const count = e.detail?.count || 0;
        cartBadge.textContent = count;
        // Bounce animation
        cartBtn.classList.remove('cart-bounce');
        void cartBtn.offsetWidth; // trigger reflow
        cartBtn.classList.add('cart-bounce');
    };

    const updateWishlist = (e) => {
        wishlistBadge.textContent = e.detail?.count || 0;
    };

    window.addEventListener('cart-updated', updateCart);
    window.addEventListener('wishlist-updated', updateWishlist);

    // Return cleanup
    return function cleanup() {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('hashchange', updateActiveLink);
        window.removeEventListener('cart-updated', updateCart);
        window.removeEventListener('wishlist-updated', updateWishlist);
        if (nav.parentNode) nav.parentNode.removeChild(nav);
    };
}
