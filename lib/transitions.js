/**
 * @module EscapeTransitions
 * @version 1.0.0
 * @description Fade in/out e transições entre ambientes no Canvas.
 *
 * API Pública:
 * - fadeOut(ctx, width, height, duration, onComplete) → inicia fade out
 * - fadeIn(ctx, width, height, duration, onComplete) → inicia fade in
 * - crossfade(ctx, width, height, duration, onMiddle, onComplete) → fade out → callback → fade in
 * - isTransitioning() → boolean
 * - getAlpha() → alpha atual da transição (0-1, para overlay)
 *
 * Uso:
 * EscapeTransitions.crossfade(ctx, 900, 600, 500, () => { ambienteAtual = 'novo'; }, () => {});
 */

const EscapeTransitions = (() => {
  let transitioning = false;
  let alpha = 0;
  let direction = 0; // 1 = fading out, -1 = fading in
  let startTime = 0;
  let duration = 0;
  let middleCallback = null;
  let completeCallback = null;
  let middleFired = false;

  function fadeOut(ctx, width, height, dur, onComplete) {
    transitioning = true;
    direction = 1;
    alpha = 0;
    startTime = performance.now();
    duration = dur || 400;
    middleCallback = null;
    completeCallback = onComplete || null;
    middleFired = false;
  }

  function fadeIn(ctx, width, height, dur, onComplete) {
    transitioning = true;
    direction = -1;
    alpha = 1;
    startTime = performance.now();
    duration = dur || 400;
    middleCallback = null;
    completeCallback = onComplete || null;
    middleFired = false;
  }

  function crossfade(ctx, width, height, dur, onMiddle, onComplete) {
    transitioning = true;
    direction = 1;
    alpha = 0;
    startTime = performance.now();
    duration = (dur || 600) / 2;
    middleCallback = onMiddle || null;
    completeCallback = onComplete || null;
    middleFired = false;
  }

  function update() {
    if (!transitioning) return;

    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    if (direction === 1) {
      alpha = progress;
      if (progress >= 1) {
        if (middleCallback && !middleFired) {
          middleFired = true;
          middleCallback();
          // Start fade in
          direction = -1;
          startTime = performance.now();
        } else if (!middleCallback) {
          transitioning = false;
          if (completeCallback) completeCallback();
        }
      }
    } else if (direction === -1) {
      alpha = 1 - progress;
      if (progress >= 1) {
        alpha = 0;
        transitioning = false;
        if (completeCallback) completeCallback();
      }
    }
  }

  function render(ctx, width, height) {
    if (!transitioning && alpha <= 0) return;
    update();
    if (alpha > 0) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  }

  function isTransitioning() {
    return transitioning;
  }

  function getAlpha() {
    return alpha;
  }

  return { fadeOut, fadeIn, crossfade, render, isTransitioning, getAlpha };
})();
