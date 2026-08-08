// Simple hash-based SPA router for AshaCreates

const routes = {};
let currentCleanup = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  const hash = window.location.hash.slice(1) || '/';
  return hash;
}

export function getRouteParams() {
  const hash = getCurrentRoute();
  const parts = hash.split('/').filter(Boolean);
  return parts;
}

async function handleRouteChange() {
  const hash = getCurrentRoute();
  const app = document.getElementById('app');

  // Find matching route
  let handler = null;
  let params = {};

  // Try exact match first
  if (routes[hash]) {
    handler = routes[hash];
  } else {
    // Try pattern matching (e.g., /product/:id)
    for (const [pattern, h] of Object.entries(routes)) {
      const patternParts = pattern.split('/').filter(Boolean);
      const hashParts = hash.split('/').filter(Boolean);

      if (patternParts.length === hashParts.length) {
        let match = true;
        const extractedParams = {};

        for (let i = 0; i < patternParts.length; i++) {
          if (patternParts[i].startsWith(':')) {
            extractedParams[patternParts[i].slice(1)] = hashParts[i];
          } else if (patternParts[i] !== hashParts[i]) {
            match = false;
            break;
          }
        }

        if (match) {
          handler = h;
          params = extractedParams;
          break;
        }
      }
    }
  }

  if (handler) {
    // Cleanup previous page
    if (currentCleanup && typeof currentCleanup === 'function') {
      currentCleanup();
    }

    // Page transition
    app.classList.add('page-transitioning');

    await new Promise(resolve => setTimeout(resolve, 200));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Render the new page
    currentCleanup = await handler(app, params);

    // Remove transition class
    requestAnimationFrame(() => {
      app.classList.remove('page-transitioning');
      app.classList.add('page-entered');
      setTimeout(() => app.classList.remove('page-entered'), 500);
    });
  } else {
    // 404
    app.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:2rem;">
        <h1 style="font-family:'Playfair Display',serif;font-size:4rem;color:var(--color-maroon);">404</h1>
        <p style="font-size:1.2rem;color:var(--color-warm-brown);margin:1rem 0 2rem;">This page seems to have wandered off.</p>
        <a href="#/" style="display:inline-block;padding:0.8rem 2rem;background:var(--color-gold);color:white;text-decoration:none;border-radius:4px;font-weight:600;">Return Home</a>
      </div>
    `;
  }
}

export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);

  // Handle initial load
  if (!window.location.hash) {
    window.location.hash = '/';
  } else {
    handleRouteChange();
  }
}
