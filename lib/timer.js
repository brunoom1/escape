/**
 * @module EscapeTimer
 * @version 1.0.0
 * @description Cronômetro para medir tempo de resolução.
 *
 * API Pública:
 * - create() → timer instance
 * - instance.start() → inicia contagem
 * - instance.stop() → para contagem
 * - instance.reset() → zera
 * - instance.getElapsed() → milissegundos decorridos
 * - instance.format() → string formatada "Xm Xs"
 * - instance.isRunning() → boolean
 *
 * Uso:
 * const timer = EscapeTimer.create();
 * timer.start();
 * // ... jogador resolve ...
 * timer.stop();
 * console.log(timer.format()); // "2m 34s"
 */

const EscapeTimer = (() => {
  function create() {
    let startTime = 0;
    let elapsed = 0;
    let running = false;

    function start() {
      if (running) return;
      running = true;
      startTime = Date.now() - elapsed;
    }

    function stop() {
      if (!running) return;
      running = false;
      elapsed = Date.now() - startTime;
    }

    function reset() {
      running = false;
      elapsed = 0;
      startTime = 0;
    }

    function getElapsed() {
      if (running) return Date.now() - startTime;
      return elapsed;
    }

    function format() {
      const totalSec = Math.floor(getElapsed() / 1000);
      const min = Math.floor(totalSec / 60);
      const sec = totalSec % 60;
      return `${min}m ${sec}s`;
    }

    function isRunning() {
      return running;
    }

    return { start, stop, reset, getElapsed, format, isRunning };
  }

  return { create };
})();
