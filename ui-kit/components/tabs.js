/**
 * @module UITabs
 * @version 1.0.0
 * @description Tabs de navegação entre ambientes. Suporta estados: ativo, disponível, bloqueado.
 *
 * API Pública:
 * - create(containerId, tabsConfig, onChange) → inicializa tabs
 * - setActive(containerId, tabId) → marca tab como ativa
 * - unlock(containerId, tabId) → desbloqueia uma tab
 * - lock(containerId, tabId) → bloqueia uma tab
 *
 * tabsConfig: [{ id, label, locked }]
 *
 * Uso:
 * UITabs.create('tabs', [
 *   { id: 'escritorio', label: 'Escritório', locked: false },
 *   { id: 'arquivo', label: 'Arquivo', locked: true }
 * ], (tabId) => { trocarAmbiente(tabId); });
 */

const UITabs = (() => {
  const instances = {};

  function create(containerId, tabsConfig, onChange) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    Object.assign(container.style, {
      display: 'flex',
      gap: UITokens.get('spacingSm'),
      padding: UITokens.get('spacingSm'),
      background: UITokens.get('colorBgSecondary'),
      border: `${UITokens.get('borderWidth')} solid ${UITokens.get('colorBorder')}`,
      borderRadius: UITokens.get('borderRadius'),
    });

    const state = {
      tabs: tabsConfig.map(t => ({ ...t, locked: t.locked || false })),
      active: tabsConfig[0]?.id || null,
      onChange: onChange || null
    };

    instances[containerId] = state;
    renderTabs(container, state);
    return container;
  }

  function renderTabs(container, state) {
    container.innerHTML = '';

    state.tabs.forEach(tab => {
      const btn = document.createElement('button');
      const isActive = tab.id === state.active;
      const isLocked = tab.locked;

      btn.textContent = isLocked ? `${tab.label} 🔒` : tab.label;
      btn.dataset.tabId = tab.id;

      Object.assign(btn.style, {
        padding: `${UITokens.get('spacingSm')} ${UITokens.get('spacingMd')}`,
        background: isActive ? UITokens.get('colorAccent') + '22' : 'transparent',
        border: `${UITokens.get('borderWidth')} solid ${isActive ? UITokens.get('colorBorderActive') : 'transparent'}`,
        borderRadius: UITokens.get('borderRadiusSm'),
        color: isActive ? UITokens.get('colorAccent') : isLocked ? UITokens.get('colorTextMuted') : UITokens.get('colorText'),
        fontFamily: UITokens.get('fontFamily'),
        fontSize: UITokens.get('fontSizeSm'),
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? '0.5' : '1',
        transition: `all ${UITokens.get('transitionSpeed')}`,
      });

      if (!isLocked) {
        btn.addEventListener('click', () => {
          state.active = tab.id;
          renderTabs(container, state);
          if (state.onChange) state.onChange(tab.id);
        });
        btn.addEventListener('mouseenter', () => {
          if (tab.id !== state.active) {
            btn.style.borderColor = UITokens.get('colorBorder');
          }
        });
        btn.addEventListener('mouseleave', () => {
          if (tab.id !== state.active) {
            btn.style.borderColor = 'transparent';
          }
        });
      }

      container.appendChild(btn);
    });
  }

  function setActive(containerId, tabId) {
    const state = instances[containerId];
    if (!state) return;
    state.active = tabId;
    const container = document.getElementById(containerId);
    renderTabs(container, state);
  }

  function unlock(containerId, tabId) {
    const state = instances[containerId];
    if (!state) return;
    const tab = state.tabs.find(t => t.id === tabId);
    if (tab) {
      tab.locked = false;
      const container = document.getElementById(containerId);
      renderTabs(container, state);
    }
  }

  function lock(containerId, tabId) {
    const state = instances[containerId];
    if (!state) return;
    const tab = state.tabs.find(t => t.id === tabId);
    if (tab) {
      tab.locked = true;
      const container = document.getElementById(containerId);
      renderTabs(container, state);
    }
  }

  return { create, setActive, unlock, lock };
})();
