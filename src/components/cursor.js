export function initCustomCursor() {
    if (window.innerWidth <= 768) return; // Don't run on mobile

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant update for the dot
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smooth trailing update for the outer circle/flame
    const render = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        requestAnimationFrame(render);
    };
    render();

    // Hover states
    const addHoverState = () => {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
    };
    const removeHoverState = () => {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
    };

    document.querySelectorAll('a, button, .diya, .story-image').forEach(el => {
        el.addEventListener('mouseenter', addHoverState);
        el.addEventListener('mouseleave', removeHoverState);
    });

    // Handle dynamically added elements via event delegation
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .diya, .story-image')) {
            addHoverState();
        } else {
            removeHoverState();
        }
    });
}
