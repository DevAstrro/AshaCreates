import { generateStarRating } from '../utils/helpers.js';

export function createReviewCard(review) {
    if (!review) return '';

    const authorName = review.name || review.author || 'Anonymous';
    const initials = authorName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const verifiedBadge = review.verified ? `
        <span class="verified-badge" title="Verified Buyer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4A853" stroke="white" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        </span>
    ` : '';

    return `
        <div class="review-card">
            <div class="review-quote-mark">"</div>
            <div class="review-rating">
                ${generateStarRating ? generateStarRating(review.rating) : '★★★★★'}
            </div>
            <p class="review-text">${review.text}</p>
            <div class="review-author-row">
                <div class="review-avatar">${initials}</div>
                <div class="review-author-info">
                    <span class="review-author-name">${authorName} ${verifiedBadge}</span>
                    <span class="review-date">${review.date || 'Recent'}</span>
                </div>
            </div>
        </div>
    `;
}
