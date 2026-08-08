export function initScrollReveal() {
    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Parallax Effect for Hero Art
    const heroArt = document.querySelector('.hero-art');
    if (heroArt && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroArt.style.transform = `translateY(${scrolled * 0.3}px)`;
        }, { passive: true });
    }
}
