/**
 * @module EscapeInventory
 * @version 1.0.0
 * @description Lógica de inventário (dados). Add, remove, check, list.
 * A renderização visual fica na ui-kit. Este módulo é apenas dados.
 *
 * API Pública:
 * - create() → inventory instance
 * - instance.add(id, emoji, label) → adiciona item (ignora duplicatas)
 * - instance.remove(id) → remove item pelo id
 * - instance.has(id) → boolean
 * - instance.getAll() → array de itens
 * - instance.count() → número de itens
 * - instance.clear() → limpa inventário
 * - instance.onChange(callback) → listener de mudança
 *
 * Uso:
 * const inv = EscapeInventory.create();
 * inv.add('chave', '🗝️', 'Chave antiga');
 * if (inv.has('chave')) { ... }
 */

const EscapeInventory = (() => {
  function create() {
    const items = [];
    const listeners = [];

    function notify(action, item) {
      for (const cb of listeners) {
        cb(action, item, [...items]);
      }
    }

    function add(id, emoji, label) {
      if (items.find(i => i.id === id)) return false;
      const item = { id, emoji, label };
      items.push(item);
      notify('add', item);
      return true;
    }

    function remove(id) {
      const idx = items.findIndex(i => i.id === id);
      if (idx === -1) return false;
      const removed = items.splice(idx, 1)[0];
      notify('remove', removed);
      return true;
    }

    function has(id) {
      return items.some(i => i.id === id);
    }

    function getAll() {
      return [...items];
    }

    function count() {
      return items.length;
    }

    function clear() {
      items.length = 0;
      notify('clear', null);
    }

    function onChange(callback) {
      if (typeof callback === 'function') listeners.push(callback);
    }

    return { add, remove, has, getAll, count, clear, onChange };
  }

  return { create };
})();
