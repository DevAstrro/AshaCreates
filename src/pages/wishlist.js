import { initNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { createProductCard } from '../components/productCard.js';
import { initCartDrawer } from '../components/cartDrawer.js';
import { getProductById } from '../data/products.js';
import { getWishlist, toggleWishlist } from '../utils/wishlist.js';
import { addToCart } from '../utils/cart.js';
import { initScrollReveal } from '../utils/scrollAnimations.js';

export async function renderWishlist(container, params) {
    
    
    
    const renderWishlistGrid = () => {
        const wishlistIds = getWishlist();
        const wishlistProducts = wishlistIds.map(id => getProductById(id)).filter(Boolean);
        
        const mainContent = container.querySelector('#wishlist-content');
        if (!mainContent) return; // Not yet initialized

        if (wishlistProducts.length === 0) {
            mainContent.innerHTML = `
                <div style="min-height: 50vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
                    <i class="far fa-heart" style="font-size: 5rem; color: var(--border-warm); margin-bottom: 2rem;"></i>
                    <h2 style="font-family: var(--font-family-heading); font-size: 2rem; color: var(--color-text-dark); margin-bottom: 1rem;">Your wishlist is empty</h2>
                    <p style="color: var(--color-brown-soft); margin-bottom: 2rem;">Discover the perfect pieces and save them for later.</p>
                    <a href="#/shop" class="btn" style="background: var(--color-maroon); color: var(--color-ivory); padding: 12px 30px; text-decoration: none; border-radius: var(--border-radius-full); font-weight: 500;">Explore Collection</a>
                </div>
            `;
            return;
        }

        const productsHtml = wishlistProducts.map(p => `
            <div data-reveal="fade-up">
                ${createProductCard(p)}
            </div>
        `).join('');

        mainContent.innerHTML = `
            <div class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 2rem;">
                ${productsHtml}
            </div>
        `;

        // Attach event listeners for the newly rendered cards
        mainContent.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = btn.dataset.id || btn.closest('[data-id]')?.dataset.id;
                const product = getProductById(id);
                if (product) addToCart(product, 1);
            });
        });
        
        mainContent.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.target.closest('[data-id]').dataset.id;
                toggleWishlist(id);
                renderWishlistGrid(); // Re-render to remove the item instantly
            });
        });

        initScrollReveal();
    };

    container.innerHTML = `
        <div class="page-header" style="text-align: center; padding: 100px 2rem 60px; background: var(--color-ivory);">
            <p class="eyebrow" style="margin-bottom: 20px;">YOUR SAVED PIECES</p>
            <h1 style="font-size: clamp(40px, 5vw, 58px); color: var(--color-text-dark); margin-bottom: 15px;"><em>Wishlist</em></h1>
        </div>
        
        <div id="wishlist-content" style="max-width: 1200px; margin: 4rem auto; padding: 0 2rem;">
            <!-- Content injected by renderWishlistGrid -->
        </div>
        
        <div id="footer-container"></div>
    `;
    
    container.querySelector('#footer-container').innerHTML = createFooter();
    renderWishlistGrid();
}
