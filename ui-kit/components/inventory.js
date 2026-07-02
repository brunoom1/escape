/**
 * @module UIInventory
 * @version 1.0.0
 * @description Componente visual de inventário dinâmico. Usa UITokens para estilização.
 *
 * API Pública:
 * - create(containerId) → inicializa container
 * - render(containerId, items) → renderiza itens no container
 * - animateAdd(containerId, item) → adiciona com animação
 *
 * Uso:
 * UIInventory.create('inventory');
 * UIInventory.render('inventory', inventory.getAll());
 */

const UIInventory = (() => {
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
    });

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
      cursor: 'default',
      transition: `transform ${UITokens.get('transitionSpeed')}`,
    });

    slot.textContent = item.emoji;
    slot.title = item.label;

    slot.addEventListener('mouseenter', () => {
      slot.style.transform = 'scale(1.1)';
    });
    slot.addEventListener('mouseleave', () => {
      slot.style.transform = 'scale(1)';
    });

    return slot;
  }

  function render(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

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

    // Remove empty text if present
    const emptySpan = container.querySelector('span');
    if (emptySpan) {
      container.innerHTML = '';
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

  return { create, render, animateAdd };
})();
