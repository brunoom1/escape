/**
 * @module UIInventory
 * @version 1.1.0
 * @description Componente visual de inventário dinâmico com inspeção de itens.
 *
 * API Pública:
 * - create(containerId, options) → inicializa container
 * - render(containerId, items) → renderiza itens no container
 * - animateAdd(containerId, item) → adiciona com animação
 * - onInspect(callback) → registra callback quando item é inspecionado
 *
 * Uso:
 * UIInventory.create('inventory');
 * UIInventory.onInspect((item) => { msg(item.label); });
 * UIInventory.render('inventory', inventory.getAll());
 */

const UIInventory = (() => {
  let inspectCallback = null;
  let inspectOverlay = null;

  function create(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    Object.assign(container.style, {
      display: 'flex',
      flexWrap: 'wrap',
      gap: UITokens.get('inventoryGap'),
      padding: `${UITokens.get('spacingSm')} ${UITokens.get('spacingMd')}`,
      background: UITokens.get('colorBgSecondary'),
      border: `${UITokens.get('borderWidth')} solid ${UITokens.get('colorBorder')}`,
      borderRadius: UITokens.get('borderRadius'),
      minHeight: UITokens.get('inventorySlotSize'),
      alignItems: 'center',
      justifyContent: 'center',
      transition: `all ${UITokens.get('transitionSpeed')}`,
      position: 'relative',
    });

    // Criar overlay de inspeção (tooltip expandido)
    inspectOverlay = document.createElement('div');
    inspectOverlay.id = 'inventory-inspect';
    Object.assign(inspectOverlay.style, {
      position: 'absolute',
      bottom: '110%',
      left: '50%',
      transform: 'translateX(-50%) scale(0.9)',
      background: UITokens.get('colorBgSecondary'),
      border: `2px solid ${UITokens.get('colorBorderActive')}`,
      borderRadius: UITokens.get('borderRadius'),
      padding: UITokens.get('spacingMd'),
      display: 'none',
      opacity: '0',
      transition: 'opacity 0.2s, transform 0.2s',
      zIndex: '50',
      minWidth: '220px',
      maxWidth: '350px',
      textAlign: 'center',
      fontFamily: UITokens.get('fontFamily'),
      boxShadow: `0 4px 20px rgba(0,0,0,0.6)`,
      pointerEvents: 'none',
    });
    container.appendChild(inspectOverlay);

    return container;
  }

  function createSlot(item) {
    const slot = document.createElement('div');
    const size = UITokens.get('inventorySlotSize');

    Object.assign(slot.style, {
      width: size,
      height: size,
      border: `${UITokens.get('borderWidthActive')} solid ${UITokens.get('colorBorderActive')}`,
      background: `${UITokens.get('colorAccent')}15`,
      borderRadius: UITokens.get('borderRadiusSm'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      cursor: 'pointer',
      transition: `transform ${UITokens.get('transitionSpeed')}, border-color ${UITokens.get('transitionSpeed')}`,
      userSelect: 'none',
    });

    slot.textContent = item.emoji;
    slot.title = 'Clique para inspecionar';

    slot.addEventListener('mouseenter', () => {
      slot.style.transform = 'scale(1.1)';
      slot.style.borderColor = UITokens.get('colorAccent');
    });
    slot.addEventListener('mouseleave', () => {
      slot.style.transform = 'scale(1)';
      slot.style.borderColor = UITokens.get('colorBorderActive');
    });

    // Clique para inspecionar
    slot.addEventListener('click', () => {
      showInspect(item);
      if (inspectCallback) inspectCallback(item);
    });

    return slot;
  }

  function showInspect(item) {
    if (!inspectOverlay) return;

    inspectOverlay.innerHTML = `
      <div style="font-size:2.5rem; margin-bottom:8px;">${item.emoji}</div>
      <div style="color:${UITokens.get('colorAccent')}; font-size:${UITokens.get('fontSizeLg')}; font-weight:bold; margin-bottom:6px;">${item.label}</div>
      <div style="color:${UITokens.get('colorTextMuted')}; font-size:${UITokens.get('fontSizeSm')};">Clique em qualquer lugar para fechar</div>
    `;

    inspectOverlay.style.display = 'block';
    inspectOverlay.style.pointerEvents = 'auto';
    requestAnimationFrame(() => {
      inspectOverlay.style.opacity = '1';
      inspectOverlay.style.transform = 'translateX(-50%) scale(1)';
    });

    // Fechar ao clicar em qualquer lugar
    const closeHandler = (e) => {
      if (e.target === inspectOverlay || inspectOverlay.contains(e.target)) return;
      hideInspect();
      document.removeEventListener('click', closeHandler);
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 100);
  }

  function hideInspect() {
    if (!inspectOverlay) return;
    inspectOverlay.style.opacity = '0';
    inspectOverlay.style.transform = 'translateX(-50%) scale(0.9)';
    inspectOverlay.style.pointerEvents = 'none';
    setTimeout(() => { inspectOverlay.style.display = 'none'; }, 200);
  }

  function render(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Preservar overlay
    const overlay = container.querySelector('#inventory-inspect');
    container.innerHTML = '';
    if (overlay) container.appendChild(overlay);

    if (items.length === 0) {
      container.style.justifyContent = 'center';
      const empty = document.createElement('span');
      empty.textContent = 'Inventário vazio';
      empty.style.color = UITokens.get('colorTextMuted');
      empty.style.fontSize = UITokens.get('fontSizeSm');
      empty.style.fontFamily = UITokens.get('fontFamily');
      container.appendChild(empty);
      return;
    }

    container.style.justifyContent = 'flex-start';
    items.forEach(item => {
      container.appendChild(createSlot(item));
    });
  }

  function animateAdd(containerId, item) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const emptySpan = container.querySelector('span');
    if (emptySpan) {
      emptySpan.remove();
      container.style.justifyContent = 'flex-start';
    }

    const slot = createSlot(item);
    slot.style.transform = 'scale(0)';
    container.appendChild(slot);

    requestAnimationFrame(() => {
      slot.style.transform = 'scale(1.2)';
      setTimeout(() => {
        slot.style.transform = 'scale(1)';
      }, 150);
    });
  }

  function onInspect(callback) {
    if (typeof callback === 'function') inspectCallback = callback;
  }

  return { create, render, animateAdd, onInspect };
})();
