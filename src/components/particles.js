export function initParticles(containerEl) {
    if (!containerEl) return () => {};

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    containerEl.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let isRunning = true;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        return () => containerEl.removeChild(canvas);
    }

    const resize = () => {
        canvas.width = containerEl.offsetWidth;
        canvas.height = containerEl.offsetHeight;
        initParticlesList();
    };

    const initParticlesList = () => {
        particles = [];
        const count = window.innerWidth < 768 ? 20 : 40;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: 0,
                vy: -(Math.random() * 0.5 + 0.2),
                alpha: Math.random(),
                fadeDir: Math.random() > 0.5 ? 0.01 : -0.01,
                angle: Math.random() * Math.PI * 2,
                angleSpeed: Math.random() * 0.02
            });
        }
    };

    const draw = () => {
        if (!isRunning) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            // Horizontal sway
            p.x += Math.sin(p.angle) * 0.5;
            p.y += p.vy;
            p.angle += p.angleSpeed;

            // Fade lifecycle
            p.alpha += p.fadeDir;
            if (p.alpha >= 1) { p.alpha = 1; p.fadeDir = -0.005; }
            if (p.alpha <= 0) {
                p.alpha = 0;
                p.fadeDir = 0.01;
                p.y = canvas.height;
                p.x = Math.random() * canvas.width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 168, 83, ${p.alpha})`;
            ctx.fill();
        });

        animationFrameId = requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            isRunning = false;
        } else {
            isRunning = true;
            draw();
        }
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resize();
    draw();

    return function cleanup() {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (containerEl.contains(canvas)) {
            containerEl.removeChild(canvas);
        }
    };
}
