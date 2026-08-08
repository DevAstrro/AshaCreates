// AshaCreates — Main Application Entry Point
import { registerRoute, initRouter } from './router.js';
import { renderHome } from './pages/home.js';
import { renderShop } from './pages/shop.js';
import { renderProductDetail } from './pages/productDetail.js';
import { renderCart } from './pages/cart.js';
import { renderCheckout } from './pages/checkout.js';
import { renderWishlist } from './pages/wishlist.js';
import { renderStoryPage } from './pages/story.js';
import { renderJournalPage } from './pages/journal.js';
import { renderContactPage } from './pages/contact.js';
import { renderPrivacyPage } from './pages/privacy.js';
import { renderTermsPage } from './pages/terms.js';

// Register all routes
registerRoute('/', (app, params) => renderHome(app, params));
registerRoute('/shop', (app, params) => renderShop(app, params));
registerRoute('/product/:id', (app, params) => renderProductDetail(app, params));
registerRoute('/cart', (app, params) => renderCart(app, params));
registerRoute('/checkout', (app, params) => renderCheckout(app, params));
registerRoute('/wishlist', (app, params) => renderWishlist(app, params));
registerRoute('/story', (app, params) => renderStoryPage(app));
registerRoute('/journal', (app, params) => renderJournalPage(app));
registerRoute('/contact', (app, params) => renderContactPage(app));
registerRoute('/privacy', (app, params) => renderPrivacyPage(app));
registerRoute('/terms', (app, params) => renderTermsPage(app));

import { initNavbar } from './components/navbar.js';
import { initCartDrawer } from './components/cartDrawer.js';

// Initialize global components
initNavbar();
initCartDrawer();

// Initialize the router
initRouter();
