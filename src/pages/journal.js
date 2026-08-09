import { createFooter } from '../components/footer.js';

export async function renderJournalPage(container) {
    container.innerHTML = `
        <div style="min-height: 70vh; padding: 120px 8%; max-width: 1000px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 60px;">
                <p class="eyebrow">THE JOURNAL</p>
                <h1 style="font-size: 48px;">Stories & <em>Inspirations</em></h1>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
                <article>
                    <img src="./images/artisan-workspace.jpg" alt="Workspace" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 12px; margin-bottom: 20px;">
                    <p class="eyebrow">BEHIND THE SCENES</p>
                    <h3 style="font-size: 24px; margin-bottom: 10px;">The Making of Our Festive Collection</h3>
                    <p style="color: var(--color-brown-soft); line-height: 1.6;">A look into the days of sketching, shaping, and painting that bring our most vibrant collection to life...</p>
                </article>
                <article>
                    <img src="./images/bracelet-bells.jpg" alt="Styling" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 12px; margin-bottom: 20px;">
                    <p class="eyebrow">STYLING GUIDE</p>
                    <h3 style="font-size: 24px; margin-bottom: 10px;">How to Layer Heritage Pieces</h3>
                    <p style="color: var(--color-brown-soft); line-height: 1.6;">Tips on mixing modern outfits with traditional Kundan and oxidized silver jewelry for a balanced look...</p>
                </article>
            </div>
        </div>
        ${createFooter()}
    `;
}
