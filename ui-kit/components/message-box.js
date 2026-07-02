/**
 * @module UIMessageBox
 * @version 1.0.0
 * @description Caixa de mensagens narrativas. Exibe texto com animação de digitação opcional.
 *
 * API Pública:
 * - create(containerId) → inicializa container
 * - show(containerId, text, options) → exibe mensagem (options: { html, animate })
 * - clear(containerId) → limpa mensagem
 *
 * Uso:
 * UIMessageBox.create('message');
 * UIMessageBox.show('message', 'Dentro da gaveta há um bilhete...');
 */

const UIMessageBox = (() => {
  function create(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    Object.assign(container.style, {
      minHeight: UITokens.get('messageMinHeight'),
      padding: UITokens.get('spacingMd'),
      background: UITokens.get('colorBgTertiary'),
      border: `${UITokens.get('borderWidth')} solid ${UITokens.get('colorBorder')}`,
      borderRadius: UITokens.get('borderRadius'),
      fontFamily: UITokens.get('fontFamily'),
      fontSize: UITokens.get('fontSizeBase'),
      color: UITokens.get('colorTextMuted'),
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `all ${UITokens.get('transitionSpeed')}`,
      lineHeight: '1.5',
    });

    return container;
  }

  function show(containerId, text, options) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { html = false, animate = false } = options || {};

    if (html) {
      container.innerHTML = text;
    } else {
      container.textContent = text;
    }

    // Flash effect
    container.style.borderColor = UITokens.get('colorAccent');
    setTimeout(() => {
      container.style.borderColor = UITokens.get('colorBorder');
    }, 300);
  }

  function clear(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.textContent = '';
  }

  return { create, show, clear };
})();
