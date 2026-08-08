import { createFooter } from '../components/footer.js';

export async function renderPrivacyPage(container) {
    container.innerHTML = `
        <div style="min-height: 70vh; padding: 120px 8%; max-width: 800px; margin: 0 auto;">
            <p class="eyebrow">LEGAL</p>
            <h1 style="font-size: 48px; margin-bottom: 40px;">Privacy Policy</h1>
            
            <div style="color: var(--color-text-dark); line-height: 1.8;">
                <p>Last updated: August 2026</p>
                <h3 style="margin: 30px 0 15px;">1. Information We Collect</h3>
                <p>We collect information you provide directly to us when you make a purchase, create an account, or contact us for support. This may include your name, email address, shipping address, and payment information.</p>
                
                <h3 style="margin: 30px 0 15px;">2. How We Use Your Information</h3>
                <p>We use the information we collect to process your orders, communicate with you about your purchases, and send you updates about our latest collections if you have opted in to our newsletter.</p>
                
                <h3 style="margin: 30px 0 15px;">3. Information Sharing</h3>
                <p>We do not sell or rent your personal information to third parties. We only share information with service providers who assist us in operating our website and fulfilling your orders (e.g., shipping partners).</p>
            </div>
        </div>
        ${createFooter()}
    `;
}
