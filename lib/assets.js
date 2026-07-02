/**
 * @module EscapeAssets
 * @version 1.0.0
 * @description Asset loader com preload de imagens e cache.
 *
 * API Pública:
 * - load(manifest) → Promise (resolve quando todos carregarem)
 * - get(key) → Image element (do cache)
 * - isLoaded() → boolean (todos carregados)
 * - getProgress() → { loaded, total, percent }
 *
 * Uso:
 * await EscapeAssets.load({ bg: 'assets/bg.png', obj1: 'assets/obj1.png' });
 * const img = EscapeAssets.get('bg');
 * ctx.drawImage(img, 0, 0);
 */

const EscapeAssets = (() => {
  const cache = {};
  let totalCount = 0;
  let loadedCount = 0;

  function load(manifest) {
    const entries = Object.entries(manifest);
    totalCount = entries.length;
    loadedCount = 0;

    const promises = entries.map(([key, src]) => {
      return new Promise((resolve, reject) => {
        if (cache[key]) {
          loadedCount++;
          resolve(cache[key]);
          return;
        }
        const img = new Image();
        img.onload = () => {
          cache[key] = img;
          loadedCount++;
          resolve(img);
        };
        img.onerror = () => {
          console.warn(`[EscapeAssets] Failed to load: ${src}`);
          loadedCount++;
          resolve(null);
        };
        img.src = src;
      });
    });

    return Promise.all(promises);
  }

  function get(key) {
    return cache[key] || null;
  }

  function isLoaded() {
    return loadedCount >= totalCount && totalCount > 0;
  }

  function getProgress() {
    return {
      loaded: loadedCount,
      total: totalCount,
      percent: totalCount > 0 ? Math.floor((loadedCount / totalCount) * 100) : 0
    };
  }

  return { load, get, isLoaded, getProgress };
})();
