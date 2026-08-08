export function createCollectionCard(collection) {
    if (!collection) return '';

    return `
        <a href="#/shop?collection=${collection.id}" class="collection-card">
            <div class="collection-card-bg" style="background-image: url('${collection.image || 'placeholder.jpg'}');"></div>
            <div class="collection-card-overlay"></div>
            <div class="collection-pattern-overlay"></div>
            <div class="collection-card-content">
                <h3 class="collection-name">${collection.name}</h3>
                <p class="collection-count">${collection.itemCount || 0} Items</p>
                <span class="collection-explore-link">Explore Collection <span class="arrow">→</span></span>
            </div>
        </a>
    `;
}
