/**
 * @module UIButton
 * @version 1.0.0
 * @description Botões estilizados com estados (normal, hover, active, disabled).
 *
 * API Pública:
 * - create(text, onClick, options) → button element
 * - style(btn) → aplica estilo ao botão existente
 *
 * Uso:
 * const btn = UIButton.create('Tentar', () => { tentarCodigo(); });
 * container.appendChild(btn);
 */

const UIButton = (() => {
  function applyStyle(btn, variant) {
    const isLink = variant === 'link';

    Object.assign(btn.style, {
      padding: `${UITokens.get('spacingSm')} ${UITokens.get('spacingLg')}`,
      background: isLink ? 'transparent' : UITokens.get('colorBgSecondary'),
      border: `${UITokens.get('borderWidth')} solid ${UITokens.get('colorBorder')}`,
      borderRadius: UITokens.get('borderRadiusSm'),
      color: UITokens.get('colorText'),
      fontFamily: UITokens.get('fontFamily'),
      fontSize: UITokens.get('fontSizeBase'),
      cursor: 'pointer',
      transition: `all ${UITokens.get('transitionSpeed')}`,
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.borderColor = UITokens.get('colorBorderActive');
      btn.style.color = UITokens.get('colorAccent');
      btn.style.background = UITokens.get('colorAccent') + '11';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.borderColor = UITokens.get('colorBorder');
      btn.style.color = UITokens.get('colorText');
      btn.style.background = isLink ? 'transparent' : UITokens.get('colorBgSecondary');
    });
  }

  function create(text, onClick, options) {
    const { variant = 'default', disabled = false } = options || {};
    const btn = document.createElement('button');
    btn.textContent = text;

    applyStyle(btn, variant);

    if (disabled) {
      btn.style.opacity = '0.4';
      btn.style.cursor = 'not-allowed';
    } else if (onClick) {
      btn.addEventListener('click', onClick);
    }

    return btn;
  }

  function style(btn, variant) {
    applyStyle(btn, variant);
    return btn;
  }

  return { create, style };
})();
