export function createFooter() {
    return `
    <div style="background: var(--color-text-dark);">
        <footer class="site-footer">
            <div class="footer-brand">
                <a class="logo" href="#/" style="color: var(--color-ivory); margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <img src="/images/logo.png" alt="AshaCreates Logo" style="height: 50px; width: auto; border-radius: 4px;">
                    <span style="font-size: 1.15em;"><span style="font-family: 'Copperplate Gothic', 'Copperplate Gothic Light', Copperplate, serif; font-weight: normal; letter-spacing: 0.5px; text-transform: uppercase;">Asha</span><span style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600; text-transform: none; margin-left: 2px;">Creates</span></span>
                </a>
                <p style="color: var(--color-ivory);">Made slowly.<br>Inspired by India.</p>
            </div>
            <div class="footer-nav">
                <h5 class="footer-title">Explore</h5>
                <a href="#/shop" class="footer-link">Shop</a>
                <a href="#/story" class="footer-link">Our Story</a>
                <a href="#/journal" class="footer-link">Journal</a>
                <a href="#/contact" class="footer-link">Contact</a>
            </div>
            <div class="footer-nav">
                <h5 class="footer-title">Stay in the loop</h5>
                <p style="font-size: 13px; margin: 0; color: var(--color-cream);">New pieces, small batches & stories from Asha.</p>
                <form class="newsletter-form" onsubmit="event.preventDefault();">
                    <input type="email" placeholder="Your email address" required>
                    <button type="submit" aria-label="Subscribe">→</button>
                </form>
                <a href="#" class="footer-link" style="margin-top: 15px;">Instagram</a>
            </div>
        </footer>
        <div class="footer-bottom" style="color: var(--color-ivory);">
            <span>© 2026 AshaCreates</span>
            <div class="footer-bottom-links">
                <a href="#/privacy" class="footer-link" style="font-size: 11px; color: var(--color-ivory);">Privacy</a>
                <a href="#/terms" class="footer-link" style="font-size: 11px; color: var(--color-ivory);">Terms</a>
            </div>
        </div>
    </div>
    `;
}
