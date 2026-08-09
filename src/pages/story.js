import { createFooter } from '../components/footer.js';

export async function renderStoryPage(container) {
    container.innerHTML = `
        <div style="min-height: 70vh; padding: 120px 8%; max-width: 800px; margin: 0 auto; text-align: center;">
            <p class="eyebrow">OUR STORY</p>
            <h1 style="font-size: 48px; margin-bottom: 30px;">Tradition, with a little <em>twist.</em></h1>
            <img src="./images/custom-pendant.jpg" alt="AshaCreates Workshop" style="width: 100%; border-radius: 16px; margin-bottom: 40px; box-shadow: var(--shadow-soft);">
            <p style="font-size: 18px; line-height: 1.8; color: var(--color-text-dark); text-align: left; margin-bottom: 20px;">
                I've always believed that the things we wear should tell a story. AshaCreates was born from my love for the vibrant colors, intricate motifs, and joyous celebrations of India.
            </p>
            <p style="font-size: 18px; line-height: 1.8; color: var(--color-text-dark); text-align: left; margin-bottom: 20px;">
                I sit down every day to shape and assemble these pieces by hand, pouring my heart into every detail. Because they aren't mass-produced, each ornament carries its own unique little quirks. I think that's the true magic of handmade jewelry—it's wonderfully imperfect and completely yours.
            </p>
        </div>
        ${createFooter()}
    `;
}
