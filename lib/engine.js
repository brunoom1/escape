/**
 * @module EscapeEngine
 * @version 1.0.0
 * @description Game loop, Canvas setup, resize e render pipeline.
 *
 * API Pública:
 * - create(config) → engine instance
 * - instance.start() → inicia o game loop
 * - instance.stop() → para o game loop
 * - instance.getCanvas() → retorna o canvas element
 * - instance.getCtx() → retorna o context 2d
 * - instance.getSize() → { width, height }
 * - instance.onRender(callback) → registra callback de render
 *
 * Uso:
 * <script src="lib/engine.js"></script>
 * const game = EscapeEngine.create({ canvasId: 'gameCanvas', width: 900, height: 600 });
 * game.onRender((ctx, dt) => { ... });
 * game.start();
 */

const EscapeEngine = (() => {
  function create(config) {
    const {
      canvasId = 'gameCanvas',
      width = 900,
      height = 600,
      backgroundColor = '#0a0a0a'
    } = config || {};

    const canvas = document.getElementById(canvasId);
    if (!canvas) throw new Error(`[EscapeEngine] Canvas #${canvasId} not found`);

    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    let running = false;
    let lastTime = 0;
    let animFrameId = null;
    const renderCallbacks = [];

    function resize() {
      const parent = canvas.parentElement || document.body;
      const maxW = parent.clientWidth;
      const maxH = window.innerHeight * 0.75;
      const scale = Math.min(maxW / width, maxH / height, 1);
      canvas.style.width = `${width * scale}px`;
      canvas.style.height = `${height * scale}px`;
    }

    function loop(timestamp) {
      if (!running) return;
      const dt = lastTime ? (timestamp - lastTime) / 1000 : 0;
      lastTime = timestamp;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      for (const cb of renderCallbacks) {
        cb(ctx, dt, { width, height });
      }

      animFrameId = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      lastTime = 0;
      resize();
      animFrameId = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    }

    function onRender(callback) {
      if (typeof callback === 'function') {
        renderCallbacks.push(callback);
      }
    }

    function getCanvas() { return canvas; }
    function getCtx() { return ctx; }
    function getSize() { return { width, height }; }

    window.addEventListener('resize', resize);
    resize();

    return { start, stop, onRender, getCanvas, getCtx, getSize, resize };
  }

  return { create };
})();
