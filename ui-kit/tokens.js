/**
 * @module UITokens
 * @version 1.0.0
 * @description Design tokens base da marca. Cada tema pode sobrescrever qualquer token.
 *
 * API Pública:
 * - get(key) → valor do token
 * - getAll() → cópia de todos os tokens
 * - apply(overrides) → sobrescreve tokens (merge)
 * - reset() → volta aos defaults da marca
 *
 * Uso:
 * UITokens.apply(ThemeNoir); // aplica tema
 * const cor = UITokens.get('colorAccent'); // '#ffcc00' ou override
 */

const UITokens = (() => {
  const defaults = {
    // Cores
    colorBg: '#0a0a0a',
    colorBgSecondary: '#1a1a1a',
    colorBgTertiary: '#111111',
    colorAccent: '#ffcc00',
    colorSuccess: '#00ff88',
    colorDanger: '#ff4444',
    colorText: '#e0e0e0',
    colorTextMuted: '#888888',
    colorBorder: '#333333',
    colorBorderActive: '#ffcc00',
    colorOverlay: 'rgba(0, 0, 0, 0.9)',

    // Tipografia
    fontFamily: "'Courier New', monospace",
    fontSizeXs: '0.75rem',
    fontSizeSm: '0.85rem',
    fontSizeBase: '1rem',
    fontSizeLg: '1.2rem',
    fontSizeXl: '1.5rem',
    fontSizeTitle: '2rem',

    // Espaçamento
    spacingXs: '4px',
    spacingSm: '8px',
    spacingMd: '16px',
    spacingLg: '24px',
    spacingXl: '32px',

    // Bordas
    borderRadius: '8px',
    borderRadiusSm: '4px',
    borderWidth: '1px',
    borderWidthActive: '2px',

    // Efeitos
    glowColor: 'rgba(255, 204, 0, 0.5)',
    glowRadius: '15px',
    transitionSpeed: '200ms',
    transitionSpeedSlow: '400ms',

    // Inventário
    inventorySlotSize: '50px',
    inventoryGap: '8px',

    // Tabs
    tabHeight: '40px',

    // Message box
    messageMinHeight: '60px',
  };

  let current = { ...defaults };

  function get(key) {
    return current[key];
  }

  function getAll() {
    return { ...current };
  }

  function apply(overrides) {
    if (overrides && typeof overrides === 'object') {
      current = { ...current, ...overrides };
    }
  }

  function reset() {
    current = { ...defaults };
  }

  return { get, getAll, apply, reset };
})();
