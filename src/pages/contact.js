import { createFooter } from '../components/footer.js';

export async function renderContactPage(container) {
    container.innerHTML = `
        <div style="min-height: 70vh; padding: 120px 8%; max-width: 600px; margin: 0 auto; text-align: center;">
            <p class="eyebrow">GET IN TOUCH</p>
            <h1 style="font-size: 48px; margin-bottom: 20px;">We'd love to <em>hear from you.</em></h1>
            <p style="color: var(--color-brown-soft); margin-bottom: 40px;">Have a question about a piece, or want to inquire about custom orders? Send us a note below.</p>
            
            <form onsubmit="event.preventDefault(); alert('Message sent successfully! We will get back to you soon.');" style="display: flex; flex-direction: column; gap: 20px; text-align: left;">
                <div>
                    <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Name</label>
                    <input type="text" required style="width: 100%; padding: 15px; border: 1px solid var(--border-warm); border-radius: 8px; background: #fff; font-family: inherit;">
                </div>
                <div>
                    <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Email</label>
                    <input type="email" required style="width: 100%; padding: 15px; border: 1px solid var(--border-warm); border-radius: 8px; background: #fff; font-family: inherit;">
                </div>
                <div>
                    <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Message</label>
                    <textarea required rows="5" style="width: 100%; padding: 15px; border: 1px solid var(--border-warm); border-radius: 8px; background: #fff; font-family: inherit; resize: vertical;"></textarea>
                </div>
                <button type="submit" class="btn primary" style="width: 100%; padding: 15px; font-size: 16px; border-radius: 8px;">Send Message</button>
            </form>
        </div>
        ${createFooter()}
    `;
}
