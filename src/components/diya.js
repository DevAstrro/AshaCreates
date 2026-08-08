export function createDiya(options = {}) {
    const { size = 'small', lit = false, id = `diya-${Math.random().toString(36).substring(2, 9)}` } = options;
    
    const container = document.createElement('div');
    container.className = `diya-container diya-${size} ${lit ? 'diya-lit' : 'diya-unlit'}`;
    container.id = id;
    
    const width = size === 'medium' ? 80 : 50;
    const height = size === 'medium' ? 60 : 40;

    container.innerHTML = `
        <style>
            .diya-container {
                cursor: pointer;
                display: inline-block;
                position: relative;
                transition: transform 0.3s ease;
            }
            .diya-container:hover {
                transform: scale(1.05);
            }
            .diya-flame-wrapper {
                opacity: 0;
                transform: scale(0);
                transform-origin: bottom center;
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            .diya-lit .diya-flame-wrapper {
                opacity: 1;
                transform: scale(1);
            }
            .diya-lit .diya-glow {
                box-shadow: 0 0 20px 5px rgba(255, 165, 0, 0.4);
                border-radius: 50%;
                position: absolute;
                top: 0; left: 50%;
                transform: translate(-50%, -50%);
                width: ${width * 0.8}px;
                height: ${width * 0.8}px;
                pointer-events: none;
                z-index: 0;
            }
            @keyframes flicker {
                0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
                25% { transform: scale(1.05) rotate(-1deg); opacity: 1; }
                50% { transform: scale(0.95) rotate(1deg); opacity: 0.8; }
                75% { transform: scale(1.02) rotate(0deg); opacity: 0.95; }
            }
            .diya-lit .diya-flame-inner, .diya-lit .diya-flame-outer, .diya-lit .diya-flame-core {
                animation: flicker 0.2s infinite alternate;
                transform-origin: bottom center;
            }
            .diya-container:hover.diya-lit .diya-flame-inner,
            .diya-container:hover.diya-lit .diya-flame-outer {
                animation-duration: 0.1s;
            }
        </style>
        <div class="diya-glow"></div>
        <svg width="${width}" height="${height}" viewBox="0 0 100 80" style="position: relative; z-index: 1;">
            <!-- Flame (Hidden when unlit) -->
            <g class="diya-flame-wrapper">
                <!-- Outer Orange -->
                <path class="diya-flame-outer" d="M50,10 C50,10 65,30 65,45 C65,55 58,60 50,60 C42,60 35,55 35,45 C35,30 50,10 50,10 Z" fill="#FF8C00" opacity="0.8"/>
                <!-- Inner Gold -->
                <path class="diya-flame-inner" d="M50,20 C50,20 60,35 60,45 C60,52 55,57 50,57 C45,57 40,52 40,45 C40,35 50,20 50,20 Z" fill="#FFD700"/>
                <!-- Core White-Blue -->
                <path class="diya-flame-core" d="M50,35 C50,35 54,42 54,48 C54,52 52,54 50,54 C48,54 46,52 46,48 C46,42 50,35 50,35 Z" fill="#FFFFFF"/>
            </g>
            
            <!-- Wick -->
            <path d="M48,58 Q50,50 52,58" stroke="#333" stroke-width="2" fill="none"/>
            
            <!-- Base (Terracotta / Brass) -->
            <path d="M20,55 Q50,85 80,55 Z" fill="#B85D3F"/>
            <ellipse cx="50" cy="55" rx="30" ry="10" fill="#8A3C24"/>
            <path d="M45,64 Q50,66 55,64 L53,75 Q50,78 47,75 Z" fill="#722F19"/>
        </svg>
    `;

    container.addEventListener('click', () => {
        const isLit = container.classList.contains('diya-lit');
        if (isLit) {
            container.classList.remove('diya-lit');
            container.classList.add('diya-unlit');
        } else {
            container.classList.remove('diya-unlit');
            container.classList.add('diya-lit');
        }
    });

    return container;
}
