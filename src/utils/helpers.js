// Dummy helpers to prevent runtime errors in components until main implementation is done
export function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

export function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '<span class="stars">' + 
           '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + // Simplified half star
           '☆'.repeat(emptyStars) + 
           '</span>';
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function getImagePath(id) {
    return './images/placeholder.jpg';
}
