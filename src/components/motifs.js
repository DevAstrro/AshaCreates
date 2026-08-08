export function initFloatingMotifs(container) {
    if (window.innerWidth <= 768) return; // Disable on small screens for performance

    const petalContainer = document.createElement('div');
    petalContainer.className = 'petal-container';
    petalContainer.style.position = 'absolute';
    petalContainer.style.top = '0';
    petalContainer.style.left = '0';
    petalContainer.style.width = '100%';
    petalContainer.style.height = '100%';
    petalContainer.style.pointerEvents = 'none';
    petalContainer.style.overflow = 'hidden';
    petalContainer.style.zIndex = '1';

    // The hero section needs relative positioning for this absolute container
    const hero = container.querySelector('.hero');
    if (hero) {
        hero.appendChild(petalContainer);
    }

    const petalCount = 15;
    
    for (let i = 0; i < petalCount; i++) {
        createPetal(petalContainer);
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    
    // Randomize colors (marigold yellows and oranges)
    const colors = ['#e7a34c', '#dfb47d', '#c8a17d', '#e9a348'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Style as a soft, slightly elongated glowing dot
    petal.style.position = 'absolute';
    petal.style.background = color;
    petal.style.width = Math.random() * 6 + 4 + 'px';
    petal.style.height = Math.random() * 6 + 4 + 'px';
    petal.style.borderRadius = '50% 50% 50% 2px';
    petal.style.filter = `blur(${Math.random() * 2 + 1}px)`;
    petal.style.opacity = Math.random() * 0.4 + 0.1;

    // Initial position
    const startX = Math.random() * 100; // vw
    const startY = -10; // Start slightly above the container
    petal.style.left = startX + '%';
    petal.style.top = startY + '%';

    container.appendChild(petal);

    // Animate
    animatePetal(petal);
}

function animatePetal(petal) {
    const duration = Math.random() * 8000 + 7000; // 7-15 seconds
    const endY = 110; // Travel slightly past the bottom
    const swingX = (Math.random() - 0.5) * 20; // Float left/right by up to 10%
    const rotation = Math.random() * 360;

    const animation = petal.animate([
        { transform: `translate(0, 0) rotate(0deg)` },
        { transform: `translate(${swingX}vw, ${endY}vh) rotate(${rotation}deg)` }
    ], {
        duration: duration,
        easing: 'ease-in-out',
        iterations: Infinity
    });
}
