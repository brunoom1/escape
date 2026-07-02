/**
 * @module UIPanel
 * @version 1.0.0
 * @description Painel modal genérico (sobreposição para puzzles, cofres, interações complexas).
 *
 * API Pública:
 * - create(containerId) → inicializa panel (hidden)
 * - show(containerId) → exibe panel
 * - hide(containerId) → esconde panel
 * - setContent(containerId, htmlContent) → define conteúdo interno
 *
 * Uso:
 * UIPanel.create('puzzle-panel');
 * UIPanel.setContent('puzzle-panel', '<p>Digite o código:</p><input ...>');
 * UIPanel.show('puzzle-panel');
 */

const UIPanel = (() => {
  function create(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    Object.assign(container.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: UITokens.get('colorBgSecondary'),
      border: `${UITokens.get('borderWidthActive')} solid ${UITokens.get('colorBorder')}`,
      borderRadius: UITokens.get('borderRadius'),
      padding: UITokens.get('spacingXl'),
      textAlign: 'center',
      display: 'none',
      zIndex: '100',
      fontFamily: UITokens.get('fontFamily'),
      color: UITokens.get('colorText'),
      minWidth: '280px',
      maxWidth: '90%',
      boxShadow: `0 0 30px rgba(0,0,0,0.8)`,
    });

    return container;
  }

  function show(containerId) {
    const container = document.getElementById(containerId);
    if (container) container.style.display = 'block';
  }

  function hide(containerId) {
    const container = document.getElementById(containerId);
    if (container) container.style.display = 'none';
  }

  function setContent(containerId, htmlContent) {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = htmlContent;
  }

  return { create, show, hide, setContent };
})();
