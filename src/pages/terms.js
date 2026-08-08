import { createFooter } from '../components/footer.js';

export async function renderTermsPage(container) {
    container.innerHTML = `
        <div style="min-height: 70vh; padding: 120px 8%; max-width: 800px; margin: 0 auto;">
            <p class="eyebrow">LEGAL</p>
            <h1 style="font-size: 48px; margin-bottom: 40px;">Terms of Service</h1>
            
            <div style="color: var(--color-text-dark); line-height: 1.8;">
                <p>Last updated: August 2026</p>
                <h3 style="margin: 30px 0 15px;">1. Agreement to Terms</h3>
                <p>By accessing or using AshaCreates, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
                
                <h3 style="margin: 30px 0 15px;">2. Handmade Nature of Products</h3>
                <p>All our jewelry is handcrafted. As a result, slight variations in color, size, and finish may occur. These are not defects but rather the unique characteristics of handmade items.</p>
                
                <h3 style="margin: 30px 0 15px;">3. Returns and Exchanges</h3>
                <p>We accept returns within 14 days of delivery for unworn items in their original packaging. Custom orders are final sale and cannot be returned or exchanged.</p>
            </div>
        </div>
        ${createFooter()}
    `;
}
