/**
 * @module EscapeEvents
 * @version 1.0.0
 * @description Sistema de eventos pub/sub para comunicação entre módulos.
 *
 * API Pública:
 * - create() → event bus instance
 * - instance.on(event, callback) → registra listener
 * - instance.off(event, callback) → remove listener
 * - instance.emit(event, data) → dispara evento
 * - instance.once(event, callback) → listener que dispara uma vez
 *
 * Uso:
 * const bus = EscapeEvents.create();
 * bus.on('itemCollected', (item) => { ... });
 * bus.emit('itemCollected', { id: 'chave', emoji: '🗝️' });
 */

const EscapeEvents = (() => {
  function create() {
    const handlers = {};

    function on(event, callback) {
      if (!handlers[event]) handlers[event] = [];
      handlers[event].push(callback);
    }

    function off(event, callback) {
      if (!handlers[event]) return;
      handlers[event] = handlers[event].filter(cb => cb !== callback);
    }

    function emit(event, data) {
      if (!handlers[event]) return;
      for (const cb of handlers[event]) {
        cb(data);
      }
    }

    function once(event, callback) {
      const wrapper = (data) => {
        off(event, wrapper);
        callback(data);
      };
      on(event, wrapper);
    }

    return { on, off, emit, once };
  }

  return { create };
})();
