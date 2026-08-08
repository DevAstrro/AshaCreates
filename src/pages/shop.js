import { initNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { createProductCard } from '../components/productCard.js';
import { initCartDrawer } from '../components/cartDrawer.js';
import { openQuickView } from '../components/quickView.js';
import { products, getProductById } from '../data/products.js';
import { collections } from '../data/collections.js';
import { addToCart } from '../utils/cart.js';
import { toggleWishlist } from '../utils/wishlist.js';
import { initScrollReveal } from '../utils/scrollAnimations.js';
import { debounce } from '../utils/helpers.js';

export async function renderShop(container, params) {
    
    
    
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const initialCollection = urlParams.get('collection');
    
    let currentProducts = [...products];
    let filters = {
        collections: initialCollection ? [initialCollection] : [],
        maxPrice: 5000,
        search: ''
    };
    let currentSort = 'newest';

    const renderGrid = () => {
        // Apply filters
        let filtered = currentProducts.filter(p => {
            const matchCollection = filters.collections.length === 0 || filters.collections.includes(p.collection);
            const matchPrice = p.price <= filters.maxPrice;
            const matchSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
            return matchCollection && matchPrice && matchSearch;
        });

        // Apply sort
        filtered.sort((a, b) => {
            if (currentSort === 'price-low') return a.price - b.price;
            if (currentSort === 'price-high') return b.price - a.price;
            if (currentSort === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            if (currentSort === 'popular') return (b.sales || 0) - (a.sales || 0);
            return 0;
        });

        const gridContainer = container.querySelector('.product-grid');
        const countDisplay = container.querySelector('.results-count');
        
        countDisplay.textContent = `Showing ${filtered.length} products`;
        
        if (filtered.length === 0) {
            gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: #666;">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">No products found matching your criteria.</p>
                <button id="clear-all-filters" class="btn" style="background: #800000; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Clear All Filters</button>
            </div>`;
            
            const clearBtn = gridContainer.querySelector('#clear-all-filters');
            if(clearBtn) {
                clearBtn.addEventListener('click', () => {
                    filters = { collections: [], maxPrice: 5000, search: '' };
                    container.querySelectorAll('.collection-cb').forEach(cb => cb.checked = false);
                    container.querySelector('#price-range').value = 5000;
                    container.querySelector('#price-display').textContent = '₹5000';
                    container.querySelector('#search-input').value = '';
                    renderActiveFilters();
                    renderGrid();
                });
            }
        } else {
            gridContainer.innerHTML = filtered.map((p, i) => `<div data-reveal="fade-up" data-delay="${(i%4) * 100}">${createProductCard(p)}</div>`).join('');
            
            // Re-attach event listeners for new cards
            gridContainer.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const id = btn.dataset.productId || btn.closest('[data-id]')?.dataset.id;
                    const product = getProductById(id);
                    if (product) addToCart(product, 1);
                });
            });
            gridContainer.querySelectorAll('.wishlist-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const id = e.target.closest('[data-id]').dataset.id;
                    const isWishlisted = toggleWishlist(id);
                    btn.classList.toggle('is-wishlisted', isWishlisted);
                    const svg = btn.querySelector('svg');
                    if (svg) svg.setAttribute('fill', isWishlisted ? 'currentColor' : 'none');
                });
            });
            gridContainer.querySelectorAll('.quick-view-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if(openQuickView) openQuickView(e.target.closest('[data-id]').dataset.id);
                });
            });
            
            initScrollReveal();
        }
    };

    const renderActiveFilters = () => {
        const chipsContainer = container.querySelector('.active-filters');
        let html = '';
        filters.collections.forEach(c => {
            html += `<span class="filter-chip" style="display: inline-block; background: #FFF8DC; border: 1px solid #D4AF37; padding: 5px 10px; border-radius: 15px; margin-right: 10px; margin-bottom: 10px; font-size: 0.9rem;">
                ${c} <button data-collection="${c}" class="remove-chip" style="background: none; border: none; color: #800000; cursor: pointer; margin-left: 5px;">&times;</button>
            </span>`;
        });
        if(filters.maxPrice < 5000) {
             html += `<span class="filter-chip" style="display: inline-block; background: #FFF8DC; border: 1px solid #D4AF37; padding: 5px 10px; border-radius: 15px; margin-right: 10px; margin-bottom: 10px; font-size: 0.9rem;">
                Up to ₹${filters.maxPrice} <button class="remove-price-chip" style="background: none; border: none; color: #800000; cursor: pointer; margin-left: 5px;">&times;</button>
            </span>`;
        }
        chipsContainer.innerHTML = html;

        chipsContainer.querySelectorAll('.remove-chip').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const c = e.target.dataset.collection;
                filters.collections = filters.collections.filter(x => x !== c);
                container.querySelector(`.collection-cb[value="${c}"]`).checked = false;
                renderActiveFilters();
                renderGrid();
            });
        });
        const priceChip = chipsContainer.querySelector('.remove-price-chip');
        if(priceChip) {
            priceChip.addEventListener('click', () => {
                filters.maxPrice = 5000;
                container.querySelector('#price-range').value = 5000;
                container.querySelector('#price-display').textContent = '₹5000';
                renderActiveFilters();
                renderGrid();
            });
        }
    };

    container.innerHTML = `
        <style>
            .shop-layout { display: flex; max-width: 1200px; margin: 2rem auto; padding: 0 2rem; gap: 2rem; }
            .sidebar { width: 250px; flex-shrink: 0; }
            .main-content { flex: 1; }
            .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
            @media (max-width: 768px) {
                .shop-layout { flex-direction: column; }
                .sidebar { width: 100%; display: none; } /* Could add a toggle button to show */
                .sidebar.active { display: block; }
            }
        </style>
        
        <div class="page-header" style="text-align: center; padding: 100px 2rem 60px; background: var(--color-ivory); position: relative;">
            <p class="eyebrow" style="margin-bottom: 20px;">ASHACREATES</p>
            <h1 style="font-size: clamp(40px, 5vw, 58px); color: var(--color-text-dark); margin-bottom: 15px;">Our <em>Collection</em></h1>
            <p style="color: var(--color-brown-soft); font-size: 16px; max-width: 600px; margin: 0 auto;">Discover the perfect piece that speaks to your soul.</p>
        </div>
        
        <div class="shop-controls" style="max-width: 1200px; margin: 2rem auto 0; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <button id="mobile-filter-btn" class="btn btn-outline" style="display: none; border: 1px solid var(--border-warm); color: var(--color-brown-soft); padding: 8px 16px; background: transparent; border-radius: 4px;">Filters</button>
            <div class="search-bar" style="position: relative; flex: 1; max-width: 400px;">
                <input type="text" id="search-input" placeholder="Search pieces..." style="width: 100%; padding: 12px 15px 12px 40px; border: 1px solid var(--border-warm); border-radius: var(--border-radius-full); outline: none; background: var(--color-cream); color: var(--color-text-dark); font-family: var(--font-family-body);">
                <i class="fas fa-search" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--color-brown-soft); font-size: 14px;"></i>
            </div>
            <div class="sort-control">
                <select id="sort-dropdown" style="padding: 12px 35px 12px 15px; border: 1px solid var(--border-warm); border-radius: var(--border-radius-full); outline: none; background: var(--color-cream) url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%238c6b5d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>') no-repeat right 15px center; color: var(--color-text-dark); font-family: var(--font-family-body); appearance: none; cursor: pointer;">
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                </select>
            </div>
        </div>

        <div class="shop-layout">
            <aside class="sidebar">
                <div class="filter-group" style="margin-bottom: 2rem;">
                    <h3 style="font-family: 'Playfair Display', serif; color: #800000; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Categories</h3>
                    <div class="checkbox-list">
                        ${collections.map(c => `
                            <label style="display: block; margin-bottom: 0.5rem; cursor: pointer; color: #444;">
                                <input type="checkbox" class="collection-cb" value="${c.id}" ${initialCollection === c.id ? 'checked' : ''} style="accent-color: #D4AF37; margin-right: 8px;">
                                ${c.name}
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <div class="filter-group" style="margin-bottom: 2rem;">
                    <h3 style="font-family: 'Playfair Display', serif; color: #800000; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Price Range</h3>
                    <input type="range" id="price-range" min="0" max="5000" step="100" value="5000" style="width: 100%; accent-color: #D4AF37;">
                    <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; color: #666; font-size: 0.9rem;">
                        <span>₹0</span>
                        <span id="price-display">₹5000</span>
                    </div>
                </div>
            </aside>
            
            <main class="main-content">
                <div class="active-filters-row" style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <div class="active-filters"></div>
                    <div class="results-count" style="color: #666; font-size: 0.9rem;"></div>
                </div>
                <div class="product-grid"></div>
            </main>
        </div>
        <div id="footer-container"></div>
    `;
    
    container.querySelector('#footer-container').innerHTML = createFooter();
    
    // Mobile filter toggle
    const mobileStyle = document.createElement('style');
    mobileStyle.innerHTML = `@media (max-width: 768px) { #mobile-filter-btn { display: block !important; } }`;
    container.appendChild(mobileStyle);
    
    container.querySelector('#mobile-filter-btn').addEventListener('click', () => {
        container.querySelector('.sidebar').classList.toggle('active');
    });

    // Event Listeners for Filters
    const searchInput = container.querySelector('#search-input');
    searchInput.addEventListener('input', debounce((e) => {
        filters.search = e.target.value;
        renderGrid();
    }, 300));

    container.querySelectorAll('.collection-cb').forEach(cb => {
        cb.addEventListener('change', (e) => {
            if(e.target.checked) {
                filters.collections.push(e.target.value);
            } else {
                filters.collections = filters.collections.filter(c => c !== e.target.value);
            }
            renderActiveFilters();
            renderGrid();
        });
    });

    const priceRange = container.querySelector('#price-range');
    const priceDisplay = container.querySelector('#price-display');
    priceRange.addEventListener('input', (e) => {
        priceDisplay.textContent = `₹${e.target.value}`;
    });
    priceRange.addEventListener('change', (e) => {
        filters.maxPrice = Number(e.target.value);
        renderActiveFilters();
        renderGrid();
    });

    const sortDropdown = container.querySelector('#sort-dropdown');
    sortDropdown.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderGrid();
    });

    // Initial render
    renderActiveFilters();
    renderGrid();
}
