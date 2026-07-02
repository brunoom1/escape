/**
 * @module UISuccessOverlay
 * @version 1.0.0
 * @description Tela de vitória (overlay). Exibe tempo, mensagem e links de navegação.
 *
 * API Pública:
 * - create(containerId) → inicializa overlay (hidden)
 * - show(containerId, config) → exibe overlay com dados
 * - hide(containerId) → esconde overlay
 *
 * config: { title, subtitle, time, links: [{ text, href }] }
 *
 * Uso:
 * UISuccessOverlay.create('success');
 * UISuccessOverlay.show('success', {
 *   title: '🎉 VOCÊ ESCAPOU!',
 *   time: '2m 34s',
 *   links: [{ text: 'Voltar ao Lobby', href: '../index.html' }]
 * });
 */

const UISuccessOverlay = (() => {
  function create(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    Object.assign(container.style, {
      position: 'fixed',
      inset: '0',
      background: UITokens.get('colorOverlay'),
      display: 'none',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: UITokens.get('spacingLg'),
      zIndex: '9999',
      fontFamily: UITokens.get('fontFamily'),
    });

    return container;
  }

  function show(containerId, config) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { title = '🎉 VOCÊ ESCAPOU!', subtitle = '', time = '', links = [] } = config || {};

    container.innerHTML = '';

    // Title
    const h2 = document.createElement('h2');
    h2.textContent = title;
    Object.assign(h2.style, {
      color: UITokens.get('colorSuccess'),
      fontSize: UITokens.get('fontSizeTitle'),
      textAlign: 'center',
      margin: '0',
    });
    container.appendChild(h2);

    // Subtitle
    if (subtitle) {
      const sub = document.createElement('p');
      sub.textContent = subtitle;
      sub.style.color = UITokens.get('colorTextMuted');
      sub.style.margin = '0';
      container.appendChild(sub);
    }

    // Time
    if (time) {
      const p = document.createElement('p');
      p.textContent = `Tempo: ${time}`;
      Object.assign(p.style, {
        color: UITokens.get('colorText'),
        fontSize: UITokens.get('fontSizeLg'),
        margin: '0',
      });
      container.appendChild(p);
    }

    // Links
    const linksDiv = document.createElement('div');
    linksDiv.style.display = 'flex';
    linksDiv.style.gap = UITokens.get('spacingMd');
    linksDiv.style.flexWrap = 'wrap';
    linksDiv.style.justifyContent = 'center';

    links.forEach(link => {
      const a = document.createElement('a');
      a.textContent = link.text;
      a.href = link.href;
      Object.assign(a.style, {
        padding: `${UITokens.get('spacingSm')} ${UITokens.get('spacingLg')}`,
        background: UITokens.get('colorBgSecondary'),
        border: `${UITokens.get('borderWidth')} solid ${UITokens.get('colorBorder')}`,
        borderRadius: UITokens.get('borderRadiusSm'),
        color: UITokens.get('colorText'),
        fontFamily: UITokens.get('fontFamily'),
        fontSize: UITokens.get('fontSizeBase'),
        textDecoration: 'none',
        transition: `all ${UITokens.get('transitionSpeed')}`,
      });
      a.addEventListener('mouseenter', () => {
        a.style.borderColor = UITokens.get('colorBorderActive');
        a.style.color = UITokens.get('colorAccent');
      });
      a.addEventListener('mouseleave', () => {
        a.style.borderColor = UITokens.get('colorBorder');
        a.style.color = UITokens.get('colorText');
      });
      linksDiv.appendChild(a);
    });

    container.appendChild(linksDiv);
    container.style.display = 'flex';
  }

  function hide(containerId) {
    const container = document.getElementById(containerId);
    if (container) container.style.display = 'none';
  }

  return { create, show, hide };
})();
