/**
 * @module EscapeState
 * @version 1.0.0
 * @description State management para o jogo. Gerencia flags, ambiente atual e persistência entre ambientes.
 *
 * API Pública:
 * - create(config) → state instance
 * - instance.get(key) → valor
 * - instance.set(key, value) → define valor
 * - instance.toggle(key) → inverte booleano
 * - instance.getAmbiente() → ambiente atual
 * - instance.setAmbiente(nome) → muda ambiente
 * - instance.getAll() → cópia do estado completo
 * - instance.onChange(callback) → registra listener de mudança
 *
 * Uso:
 * const state = EscapeState.create({ ambiente: 'escritorio', flags: { gavetaAberta: false } });
 * state.set('gavetaAberta', true);
 */

const EscapeState = (() => {
  function create(config) {
    const { ambiente = 'default', flags = {} } = config || {};

    let currentAmbiente = ambiente;
    const data = { ...flags };
    const listeners = [];

    function notify(key, value) {
      for (const cb of listeners) {
        cb(key, value, { ...data });
      }
    }

    function get(key) {
      return data[key];
    }

    function set(key, value) {
      data[key] = value;
      notify(key, value);
    }

    function toggle(key) {
      data[key] = !data[key];
      notify(key, data[key]);
    }

    function getAmbiente() {
      return currentAmbiente;
    }

    function setAmbiente(nome) {
      const prev = currentAmbiente;
      currentAmbiente = nome;
      notify('__ambiente__', { from: prev, to: nome });
    }

    function getAll() {
      return { ambiente: currentAmbiente, ...data };
    }

    function onChange(callback) {
      if (typeof callback === 'function') listeners.push(callback);
    }

    return { get, set, toggle, getAmbiente, setAmbiente, getAll, onChange };
  }

  return { create };
})();
