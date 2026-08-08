export function createRangoli(type = 'circular', options = {}) {
    const { size = 300, color = '#D4A853', animated = true, className = '' } = options;
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', size);
    svg.setAttribute('height', type === 'divider' ? size / 4 : size);
    svg.setAttribute('viewBox', type === 'divider' ? '0 0 400 100' : '0 0 200 200');
    svg.setAttribute('class', `rangoli-svg ${className}`);
    svg.style.pointerEvents = 'none';

    let content = '';

    if (type === 'circular') {
        content = `
            <defs>
                <g id="petal">
                    <path class="rangoli-path" d="M100,100 C80,60 90,20 100,10 C110,20 120,60 100,100 Z" 
                          fill="url(#gold-grad)" stroke="${color}" stroke-width="1.5" />
                    <circle class="rangoli-path" cx="100" cy="25" r="3" fill="${color}" />
                </g>
                <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${color}" stop-opacity="0.8"/>
                    <stop offset="100%" stop-color="#fff" stop-opacity="0.1"/>
                </linearGradient>
            </defs>
            <circle class="rangoli-path" cx="100" cy="100" r="15" fill="none" stroke="${color}" stroke-width="2"/>
            <circle class="rangoli-path" cx="100" cy="100" r="25" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="4,4"/>
            ${[0, 45, 90, 135, 180, 225, 270, 315].map(angle => 
                `<use href="#petal" transform="rotate(${angle} 100 100)" class="rangoli-interactive" />`
            ).join('')}
        `;
    } else if (type === 'corner') {
        content = `
            <defs>
                <linearGradient id="gold-grad-corner" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${color}" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <path class="rangoli-path" d="M0,0 L200,0 C200,100 100,200 0,200 Z" fill="none" stroke="${color}" stroke-width="2"/>
            <path class="rangoli-path" d="M0,0 L150,0 C150,75 75,150 0,150 Z" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="5,5"/>
            <path class="rangoli-path rangoli-interactive" d="M0,0 C50,20 80,80 0,100 C20,50 80,20 100,0 Z" fill="url(#gold-grad-corner)" stroke="${color}"/>
        `;
    } else if (type === 'divider') {
        content = `
            <path class="rangoli-path" d="M0,50 Q100,10 200,50 T400,50" fill="none" stroke="${color}" stroke-width="2"/>
            <path class="rangoli-path" d="M0,50 Q100,90 200,50 T400,50" fill="none" stroke="${color}" stroke-width="2"/>
            <circle class="rangoli-path rangoli-interactive" cx="200" cy="50" r="10" fill="${color}"/>
        `;
    }

    const style = document.createElement('style');
    style.textContent = `
        .rangoli-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: ${animated ? '1000' : '0'};
            animation: ${animated ? 'drawRangoli 3s ease-in-out forwards' : 'none'};
        }
        @keyframes drawRangoli {
            to { stroke-dashoffset: 0; }
        }
        .rangoli-interactive {
            pointer-events: auto;
            transition: opacity 0.3s, filter 0.3s;
        }
        .rangoli-interactive:hover {
            opacity: 0.8;
            filter: brightness(1.2);
            cursor: pointer;
        }
    `;

    svg.appendChild(style);
    svg.innerHTML += content;
    
    return svg;
}
