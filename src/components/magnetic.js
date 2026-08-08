export function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn');

    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const position = el.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            // Adjust the intensity of the pull
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
            el.style.transition = 'transform 0.3s ease';
        });
        
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'none'; // Remove transition when pulling
        });
    });
}
