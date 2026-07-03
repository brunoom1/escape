/**
 * @module EscapeAPI
 * @version 1.0.0
 * @description Módulo de integração com API REST e Google Auth.
 *
 * API Pública:
 * - EscapeAPI.getUser() → objeto do usuário logado ou null
 * - EscapeAPI.getToken() → JWT string ou null
 * - EscapeAPI.isLoggedIn() → boolean
 * - EscapeAPI.logout() → limpa sessão
 * - EscapeAPI.handleCredentialResponse(response) → processa login Google
 * - EscapeAPI.registrarResultado(jogo, resultado, tempoSegundos) → envia resultado
 * - EscapeAPI.getResultados() → lista resultados do usuário
 * - EscapeAPI.getRanking() → ranking geral
 * - EscapeAPI.onAuthChange(callback) → registra listener de mudança de auth
 *
 * Configuração:
 * - EscapeAPI.config.clientId → Google Client ID
 * - EscapeAPI.config.apiBase → URL base do worker
 */

const EscapeAPI = (() => {
  // ============ CONFIGURAÇÃO ============
  const config = {
    clientId: '204404731348-njob40jdrqb3j38d0521bgqt8mvaq6uj.apps.googleusercontent.com',
    apiBase: 'https://game-auth-worker.gabrielmendoncanf.workers.dev'
  };

  // ============ STATE ============
  let authListeners = [];

  // ============ HELPERS ============
  function getToken() {
    return localStorage.getItem('app_token');
  }

  function getUser() {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function isLoggedIn() {
    return !!getToken() && !!getUser();
  }

  function logout() {
    localStorage.removeItem('app_token');
    localStorage.removeItem('user');
    notifyAuthChange();
  }

  function notifyAuthChange() {
    const user = getUser();
    for (const cb of authListeners) {
      try { cb(user); } catch (e) { console.error('[EscapeAPI] Auth listener error:', e); }
    }
  }

  function onAuthChange(callback) {
    authListeners.push(callback);
  }

  // ============ AUTH ============
  async function handleCredentialResponse(response) {
    try {
      const resp = await fetch(config.apiBase + '/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: response.credential })
      });

      if (!resp.ok) {
        console.error('[EscapeAPI] Auth failed:', resp.status);
        return { success: false, error: 'Erro ao autenticar' };
      }

      const data = await resp.json();
      if (data.token) {
        localStorage.setItem('app_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        notifyAuthChange();
        return { success: true, user: data.user };
      }

      return { success: false, error: data.error || 'Resposta inesperada' };
    } catch (err) {
      console.error('[EscapeAPI] Auth error:', err);
      return { success: false, error: 'Erro de conexão' };
    }
  }

  // ============ GAME RESULTS ============
  async function registrarResultado(jogo, resultado, tempoSegundos) {
    const token = getToken();
    if (!token) {
      console.warn('[EscapeAPI] Sem token — resultado não enviado');
      return { success: false, error: 'Usuário não logado' };
    }

    try {
      const resp = await fetch(config.apiBase + '/games/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          game_name: jogo,
          result: resultado,
          time_seconds: tempoSegundos
        })
      });

      if (resp.status === 401) {
        console.warn('[EscapeAPI] Token expirado ou inválido');
        logout();
        return { success: false, error: 'Sessão expirada' };
      }

      if (!resp.ok) {
        return { success: false, error: 'Erro ao registrar resultado' };
      }

      return await resp.json();
    } catch (err) {
      console.error('[EscapeAPI] Erro ao registrar resultado:', err);
      return { success: false, error: 'Erro de conexão' };
    }
  }

  async function getResultados() {
    const token = getToken();
    if (!token) return { success: false, error: 'Usuário não logado' };

    try {
      const resp = await fetch(config.apiBase + '/games/results', {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (resp.status === 401) {
        logout();
        return { success: false, error: 'Sessão expirada' };
      }

      if (!resp.ok) return { success: false, error: 'Erro ao buscar resultados' };
      return await resp.json();
    } catch (err) {
      return { success: false, error: 'Erro de conexão' };
    }
  }

  async function getRanking(gameName) {
    try {
      let url = config.apiBase + '/games/ranking';
      if (gameName) {
        url += '?game_name=' + encodeURIComponent(gameName);
      }
      const resp = await fetch(url);
      if (!resp.ok) return { success: false, error: 'Erro ao buscar ranking' };
      return await resp.json();
    } catch (err) {
      return { success: false, error: 'Erro de conexão' };
    }
  }

  // ============ PUBLIC API ============
  return {
    config,
    getToken,
    getUser,
    isLoggedIn,
    logout,
    handleCredentialResponse,
    registrarResultado,
    getResultados,
    getRanking,
    onAuthChange
  };
})();

// Expor globalmente para o callback do Google Identity Services
function handleCredentialResponse(response) {
  EscapeAPI.handleCredentialResponse(response).then(result => {
    if (result.success) {
      console.log('[EscapeAPI] Logado como', result.user.email);
    }
  });
}
