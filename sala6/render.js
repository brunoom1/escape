/**
 * @module Sala6Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 6 — O Museu à Noite
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Ambientes: Galeria, Segurança, Ala Egípcia
 * Paleta: ThemeMuseum — bg #0a0a0f, accent #e8b84a, border #2a2035
 */

// ============ PRÉ-CALCULADOS ============
const GAL_MARBLE = [
  {x:100,y:520,w:80,h:3},{x:300,y:530,w:60,h:2},{x:550,y:515,w:90,h:3},
  {x:700,y:525,w:70,h:2},{x:200,y:540,w:50,h:2}
];
const SEG_WIRES = [
  {x1:60,y1:280,x2:200,y2:290},{x1:300,y1:270,x2:400,y2:275},
  {x1:500,y1:285,x2:650,y2:280}
];
const EGP_CRACKS = [
  {x1:200,y1:100,x2:210,y2:130},{x1:500,y1:80,x2:510,y2:115},
  {x1:750,y1:120,x2:760,y2:150}
];

// ============ GALERIA PRINCIPAL ============

function renderGaleria(ctx, state) {
  renderGal_Background(ctx);
  renderGal_Arquitetura(ctx);
  renderGal_Iluminacao(ctx);
  renderGal_Detalhes(ctx);
  renderGal_Decoracao(ctx);
  renderGal_Objetos(ctx, state);
  renderGal_Atmosfera(ctx, state);
  renderGal_Overlay(ctx);
}

// Camada 1: Background
function renderGal_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#08080e');
  grad.addColorStop(0.4, '#0a0a0f');
  grad.addColorStop(0.8, '#0c0c14');
  grad.addColorStop(1, '#06060a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — paredes nobres, piso de mármore, molduras
function renderGal_Arquitetura(ctx) {
  // Paredes altas com textura
  ctx.fillStyle = '#12101a';
  ctx.fillRect(0, 0, 900, 500);
  // Moldura superior (cornija)
  const cornGrad = ctx.createLinearGradient(0, 0, 0, 15);
  cornGrad.addColorStop(0, '#2a2035');
  cornGrad.addColorStop(1, '#12101a');
  ctx.fillStyle = cornGrad;
  ctx.fillRect(0, 0, 900, 15);
  // Rodapé
  ctx.fillStyle = '#1a1525';
  ctx.fillRect(0, 490, 900, 10);
  // Piso de mármore
  const floorGrad = ctx.createLinearGradient(0, 500, 0, 600);
  floorGrad.addColorStop(0, '#15131a');
  floorGrad.addColorStop(0.5, '#12101a');
  floorGrad.addColorStop(1, '#0a0a0f');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 500, 900, 100);
  // Linhas do mármore
  ctx.strokeStyle = '#1e1a25';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 10; i++) {
    ctx.beginPath(); ctx.moveTo(i * 90, 500); ctx.lineTo(i * 90, 600); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(0, 550); ctx.lineTo(900, 550); ctx.stroke();
  ctx.lineWidth = 1;
  // Borda piso/parede
  ctx.strokeStyle = '#2a2035';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 500); ctx.lineTo(900, 500); ctx.stroke();
  ctx.lineWidth = 1;
}

// Camada 3: Iluminação — focos nas obras, lasers de segurança
function renderGal_Iluminacao(ctx) {
  // Foco no quadro moderno
  const focus1 = ctx.createRadialGradient(140, 50, 5, 140, 50, 180);
  focus1.addColorStop(0, 'rgba(232, 184, 74, 0.08)');
  focus1.addColorStop(1, 'transparent');
  ctx.fillStyle = focus1;
  ctx.fillRect(50, 0, 200, 280);
  // Foco no quadro clássico
  const focus2 = ctx.createRadialGradient(440, 50, 5, 440, 50, 180);
  focus2.addColorStop(0, 'rgba(232, 184, 74, 0.08)');
  focus2.addColorStop(1, 'transparent');
  ctx.fillStyle = focus2;
  ctx.fillRect(330, 0, 200, 280);
  // Reflexo dourado sutil no piso
  ctx.fillStyle = 'rgba(232, 184, 74, 0.01)';
  ctx.fillRect(100, 510, 200, 50);
  ctx.fillRect(380, 510, 200, 50);
}

// Camada 4: Detalhes — veios do mármore, poeira, marcas
function renderGal_Detalhes(ctx) {
  // Veios no mármore
  for (const m of GAL_MARBLE) {
    ctx.fillStyle = 'rgba(30, 25, 40, 0.15)';
    ctx.fillRect(m.x, m.y, m.w, m.h);
  }
  // Poeira nas molduras
  ctx.fillStyle = 'rgba(50, 40, 30, 0.08)';
  ctx.fillRect(60, 245, 160, 2);
  ctx.fillRect(360, 245, 160, 2);
}

// Camada 5: Decoração — colunas, bancos, sinalização
function renderGal_Decoracao(ctx) {
  // Colunas decorativas
  ctx.fillStyle = '#1a1525';
  ctx.fillRect(270, 100, 20, 400);
  ctx.fillRect(570, 100, 20, 400);
  // Capitéis
  ctx.fillStyle = '#2a2035';
  ctx.fillRect(265, 95, 30, 12);
  ctx.fillRect(565, 95, 30, 12);
  // Banco central
  ctx.fillStyle = '#1a1520';
  ctx.fillRect(380, 470, 140, 20);
  ctx.strokeStyle = '#2a2035';
  ctx.strokeRect(380, 470, 140, 20);
}

// Camada 6: Objetos interativos
function renderGal_Objetos(ctx, state) {
  // --- QUADRO MODERNO (60, 50, 160, 200) ---
  ctx.fillStyle = '#1a1828';
  ctx.fillRect(65, 55, 150, 190);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 3;
  ctx.strokeRect(65, 55, 150, 190);
  ctx.lineWidth = 1;
  // Vitrine glow
  ctx.fillStyle = 'rgba(232,184,74,0.06)';
  ctx.fillRect(55, 45, 170, 210);
  // Pintura (noite estrelada simplificada)
  ctx.fillStyle = '#1a237e';
  ctx.fillRect(75, 65, 130, 130);
  ctx.fillStyle = '#ffeb3b';
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.arc(90 + i * 15, 100 + Math.sin(i * 0.8) * 20, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#d4cfc0';
  ctx.font = '10px Georgia';
  ctx.fillText('1889', 125, 235);

  // --- QUADRO CLÁSSICO (360, 50, 160, 200) ---
  ctx.fillStyle = '#1a1828';
  ctx.fillRect(365, 55, 150, 190);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 3;
  ctx.strokeRect(365, 55, 150, 190);
  ctx.lineWidth = 1;
  ctx.fillStyle = 'rgba(232,184,74,0.06)';
  ctx.fillRect(355, 45, 170, 210);
  // O Grito
  ctx.fillStyle = '#ff6f00';
  ctx.fillRect(375, 65, 130, 130);
  ctx.fillStyle = '#263238';
  ctx.beginPath(); ctx.ellipse(440, 120, 20, 30, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d4cfc0';
  ctx.font = '10px Georgia';
  ctx.fillText('1893', 425, 235);

  // --- ESCULTURA (680, 120, 100, 200) ---
  ctx.fillStyle = '#2a2535';
  ctx.fillRect(700, 280, 60, 40); // pedestal
  ctx.fillStyle = '#3a3545';
  ctx.beginPath(); ctx.ellipse(730, 200, 30, 80, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#4a4555';
  ctx.beginPath(); ctx.ellipse(730, 200, 30, 80, 0, 0, Math.PI * 2); ctx.stroke();

  // --- PLACA INFORMATIVA (250, 380, 140, 60) ---
  ctx.fillStyle = '#1a1a12';
  ctx.fillRect(255, 385, 130, 50);
  ctx.strokeStyle = '#3a3a2a';
  ctx.strokeRect(255, 385, 130, 50);
  ctx.fillStyle = '#7a7060';
  ctx.font = '9px Georgia';
  ctx.fillText('INFORMAÇÕES', 278, 415);

  // --- PORTA SEGURANÇA (750, 400, 120, 150) ---
  ctx.fillStyle = '#1a1520';
  ctx.fillRect(755, 405, 110, 140);
  ctx.strokeStyle = state.get('crachaColetado') ? '#4caf50' : '#2a2035';
  ctx.lineWidth = 2;
  ctx.strokeRect(755, 405, 110, 140);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#7a7060';
  ctx.font = '9px Georgia';
  ctx.fillText('SEGURANÇA', 775, 480);
  // Leitor de crachá
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(770, 440, 25, 15);
  ctx.fillStyle = state.get('crachaColetado') ? '#4caf50' : '#c62828';
  ctx.beginPath(); ctx.arc(782, 447, 3, 0, Math.PI * 2); ctx.fill();

  // --- CORREDOR EGÍPCIO (30, 420, 130, 130) ---
  ctx.fillStyle = '#0e0c08';
  ctx.fillRect(35, 425, 120, 120);
  ctx.strokeStyle = state.get('laserDesativado') ? '#4caf50' : '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(35, 425, 120, 120);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#7a7060';
  ctx.font = '9px Georgia';
  ctx.fillText('ALA EGÍPCIA', 50, 490);
}

// Camada 7: Atmosfera — lasers de segurança
function renderGal_Atmosfera(ctx, state) {
  // Lasers vermelhos se ativos
  if (!state || !state.get('laserDesativado')) {
    const alpha = 0.5 + 0.3 * Math.sin(Date.now() / 500);
    ctx.save();
    ctx.strokeStyle = `rgba(255, 26, 26, ${alpha})`;
    ctx.shadowColor = 'rgba(255, 26, 26, 0.8)';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(650, 130); ctx.lineTo(800, 130); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(660, 300); ctx.lineTo(800, 300); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, 420); ctx.lineTo(170, 420); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, 550); ctx.lineTo(170, 550); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(550, 350); ctx.lineTo(550, 500); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(300, 300); ctx.lineTo(550, 300); ctx.stroke();
    ctx.restore();
  }
}

// Camada 8: Overlay
function renderGal_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 130, 450, 300, 530);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(5, 5, 10, 0.2)');
  vignette.addColorStop(1, 'rgba(5, 5, 10, 0.55)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(10, 8, 20, 0.05)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ SALA DE SEGURANÇA ============

function renderSeguranca(ctx, state) {
  renderSeg_Background(ctx);
  renderSeg_Arquitetura(ctx);
  renderSeg_Iluminacao(ctx);
  renderSeg_Detalhes(ctx);
  renderSeg_Decoracao(ctx);
  renderSeg_Objetos(ctx, state);
  renderSeg_Atmosfera(ctx);
  renderSeg_Overlay(ctx);
}

function renderSeg_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a080e');
  grad.addColorStop(0.5, '#0e0c14');
  grad.addColorStop(1, '#080610');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderSeg_Arquitetura(ctx) {
  ctx.fillStyle = '#0e0c14';
  ctx.fillRect(0, 0, 900, 520);
  // Piso escuro
  ctx.fillStyle = '#0a0812';
  ctx.fillRect(0, 520, 900, 80);
  ctx.strokeStyle = '#1a1525';
  ctx.beginPath(); ctx.moveTo(0, 520); ctx.lineTo(900, 520); ctx.stroke();
  // Painéis de parede
  ctx.strokeStyle = '#1a1525';
  for (let i = 0; i < 6; i++) {
    ctx.strokeRect(i * 150 + 10, 10, 140, 505);
  }
}

function renderSeg_Iluminacao(ctx) {
  // Luz dos monitores (azul/verde)
  const monGlow = ctx.createRadialGradient(500, 120, 20, 500, 120, 200);
  monGlow.addColorStop(0, 'rgba(76, 175, 80, 0.05)');
  monGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = monGlow;
  ctx.fillRect(300, 0, 400, 300);
}

function renderSeg_Detalhes(ctx) {
  // Cabos no chão
  for (const w of SEG_WIRES) {
    ctx.strokeStyle = 'rgba(40, 30, 60, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(w.x1, w.y1); ctx.lineTo(w.x2, w.y2); ctx.stroke();
  }
  ctx.lineWidth = 1;
}

function renderSeg_Decoracao(ctx) {
  // Relógio digital na parede
  ctx.fillStyle = '#050510';
  ctx.fillRect(700, 30, 80, 25);
  ctx.fillStyle = '#4caf50';
  ctx.font = '12px Courier New';
  ctx.fillText('02:47:33', 708, 48);
}

function renderSeg_Objetos(ctx, state) {
  // --- DIAGRAMA DE CIRCUITO (50, 50, 250, 200) ---
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(55, 55, 240, 190);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 2;
  ctx.strokeRect(55, 55, 240, 190);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#e8b84a';
  ctx.font = '11px Courier New';
  ctx.fillText('DIAGRAMA DE CIRCUITO', 85, 80);
  // Nodos S1-S4
  const nodos = [{x:100,y:120,l:'S1'},{x:200,y:120,l:'S3'},{x:200,y:200,l:'S2'},{x:100,y:200,l:'S4'}];
  nodos.forEach(n => {
    ctx.fillStyle = '#1a0a0a';
    ctx.beginPath(); ctx.arc(n.x, n.y, 15, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ff1a1a';
    ctx.beginPath(); ctx.arc(n.x, n.y, 15, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#ff1a1a';
    ctx.font = '10px Courier New';
    ctx.fillText(n.l, n.x - 8, n.y + 4);
  });
  // Setas
  ctx.strokeStyle = '#e8b84a';
  ctx.beginPath(); ctx.moveTo(115, 120); ctx.lineTo(185, 120); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(200, 135); ctx.lineTo(200, 185); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(185, 200); ctx.lineTo(115, 200); ctx.stroke();

  // --- MONITORES DE CÂMERA (400, 50, 200, 150) ---
  ctx.fillStyle = '#050510';
  ctx.fillRect(405, 55, 190, 140);
  ctx.strokeStyle = '#2a2035';
  ctx.strokeRect(405, 55, 190, 140);
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = '#0a1510';
    ctx.fillRect(415 + i * 45, 65, 40, 55);
    ctx.strokeStyle = '#1a3a2a';
    ctx.strokeRect(415 + i * 45, 65, 40, 55);
  }
  ctx.fillStyle = '#4caf50';
  ctx.font = '8px Courier New';
  ctx.fillText('CAM1', 420, 110); ctx.fillText('CAM2', 465, 110);
  ctx.fillText('CAM3', 510, 110); ctx.fillText('CAM4', 555, 110);
  ctx.fillStyle = state.get('laserDesativado') ? '#4caf50' : '#ff1a1a';
  ctx.font = '10px Courier New';
  ctx.fillText(state.get('laserDesativado') ? 'LASERS: OFF' : 'LASERS: ATIVOS', 440, 180);

  // --- PAINEL DE SENSORES (350, 320, 200, 140) ---
  ctx.fillStyle = '#0a0a12';
  ctx.fillRect(355, 325, 190, 130);
  ctx.strokeStyle = state.get('laserDesativado') ? '#4caf50' : '#ff1a1a';
  ctx.lineWidth = 2;
  ctx.strokeRect(355, 325, 190, 130);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#d4cfc0';
  ctx.font = '11px Courier New';
  ctx.fillText('PAINEL SENSORES', 388, 355);
  // LEDs
  const sensores = ['sensor1','sensor2','sensor3','sensor4'];
  sensores.forEach((s, i) => {
    ctx.fillStyle = state.get(s) ? '#4caf50' : '#ff1a1a';
    ctx.beginPath(); ctx.arc(385 + i * 40, 400, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d4cfc0';
    ctx.font = '8px Courier New';
    ctx.fillText('S' + (i + 1), 380 + i * 40, 425);
  });

  // --- VOLTAR GALERIA (30, 520, 130, 50) ---
  ctx.fillStyle = '#12101a';
  ctx.fillRect(35, 525, 125, 45);
  ctx.strokeStyle = '#2a2035';
  ctx.strokeRect(35, 525, 125, 45);
  ctx.fillStyle = '#7a7060';
  ctx.font = '11px Georgia';
  ctx.fillText('← Galeria', 60, 552);
}

function renderSeg_Atmosfera(ctx) {
  // Glow dos monitores
  ctx.fillStyle = 'rgba(76, 175, 80, 0.015)';
  ctx.fillRect(400, 200, 200, 300);
}

function renderSeg_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 500);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(5, 3, 10, 0.25)');
  vignette.addColorStop(1, 'rgba(5, 3, 10, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ ALA EGÍPCIA ============

function renderEgipcia(ctx, state) {
  renderEgp_Background(ctx);
  renderEgp_Arquitetura(ctx);
  renderEgp_Iluminacao(ctx);
  renderEgp_Detalhes(ctx);
  renderEgp_Decoracao(ctx);
  renderEgp_Objetos(ctx, state);
  renderEgp_Atmosfera(ctx);
  renderEgp_Overlay(ctx);
}

function renderEgp_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0c0a06');
  grad.addColorStop(0.4, '#0e0c08');
  grad.addColorStop(0.8, '#100e0a');
  grad.addColorStop(1, '#080604');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderEgp_Arquitetura(ctx) {
  // Paredes de pedra arenosa
  ctx.fillStyle = '#141008';
  ctx.fillRect(0, 0, 900, 480);
  // Blocos de pedra
  ctx.strokeStyle = '#1a1608';
  ctx.lineWidth = 0.5;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 7; col++) {
      const offset = row % 2 === 0 ? 0 : 65;
      ctx.strokeRect(col * 130 + offset, row * 60 + 10, 125, 55);
    }
  }
  ctx.lineWidth = 1;
  // Piso de pedra
  ctx.fillStyle = '#100c06';
  ctx.fillRect(0, 480, 900, 120);
  ctx.strokeStyle = '#1a1608';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 480); ctx.lineTo(900, 480); ctx.stroke();
  ctx.lineWidth = 1;
  // Colunas egípcias
  ctx.fillStyle = '#1a1608';
  ctx.fillRect(280, 50, 25, 430);
  ctx.fillRect(600, 50, 25, 430);
  // Capitéis
  ctx.fillStyle = '#2a2010';
  ctx.fillRect(272, 45, 40, 15);
  ctx.fillRect(592, 45, 40, 15);
}

function renderEgp_Iluminacao(ctx) {
  // Tochas (sin-based flicker)
  const flicker = Math.sin(Date.now() / 300) * 0.3 + 0.7;
  // Tocha esquerda
  const torch1 = ctx.createRadialGradient(50, 200, 5, 50, 200, 100);
  torch1.addColorStop(0, `rgba(232, 160, 50, ${0.08 * flicker})`);
  torch1.addColorStop(1, 'transparent');
  ctx.fillStyle = torch1;
  ctx.fillRect(0, 100, 150, 250);
  // Tocha direita
  const torch2 = ctx.createRadialGradient(850, 200, 5, 850, 200, 100);
  torch2.addColorStop(0, `rgba(232, 160, 50, ${0.08 * flicker})`);
  torch2.addColorStop(1, 'transparent');
  ctx.fillStyle = torch2;
  ctx.fillRect(750, 100, 150, 250);
}

function renderEgp_Detalhes(ctx) {
  // Rachaduras na pedra
  ctx.strokeStyle = 'rgba(30, 25, 12, 0.3)';
  ctx.lineWidth = 0.7;
  for (const c of EGP_CRACKS) {
    ctx.beginPath(); ctx.moveTo(c.x1, c.y1); ctx.lineTo(c.x2, c.y2); ctx.stroke();
  }
  ctx.lineWidth = 1;
  // Areia no piso
  ctx.fillStyle = 'rgba(40, 35, 15, 0.06)';
  ctx.beginPath(); ctx.ellipse(450, 500, 200, 20, 0, 0, Math.PI * 2); ctx.fill();
}

function renderEgp_Decoracao(ctx) {
  // Tochas físicas (suportes de parede)
  ctx.fillStyle = '#2a1a08';
  ctx.fillRect(42, 160, 16, 80);
  ctx.fillRect(842, 160, 16, 80);
  // Chama
  ctx.fillStyle = '#e8a030';
  ctx.beginPath(); ctx.ellipse(50, 155, 6, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(850, 155, 6, 10, 0, 0, Math.PI * 2); ctx.fill();
  // Hieróglifos decorativos na cornija
  ctx.fillStyle = '#e8b84a22';
  ctx.font = '14px serif';
  ctx.fillText('𓂀 𓃭 𓆣 𓇳 𓊝', 330, 35);
}

function renderEgp_Objetos(ctx, state) {
  // --- SARCÓFAGO (80, 100, 150, 250) ---
  const sarcGrad = ctx.createLinearGradient(80, 100, 230, 100);
  sarcGrad.addColorStop(0, '#1a1408');
  sarcGrad.addColorStop(0.5, '#2a2010');
  sarcGrad.addColorStop(1, '#1a1408');
  ctx.fillStyle = sarcGrad;
  ctx.fillRect(85, 105, 140, 240);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 2;
  ctx.strokeRect(85, 105, 140, 240);
  ctx.lineWidth = 1;
  // Rosto estilizado
  ctx.fillStyle = '#e8b84a44';
  ctx.beginPath(); ctx.ellipse(155, 170, 25, 35, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#e8b84a88';
  ctx.beginPath(); ctx.ellipse(155, 170, 25, 35, 0, 0, Math.PI * 2); ctx.stroke();
  // Olhos
  ctx.fillStyle = '#e8b84a';
  ctx.beginPath(); ctx.ellipse(145, 165, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(165, 165, 5, 3, 0, 0, Math.PI * 2); ctx.fill();

  // --- HIERÓGLIFOS (350, 80, 200, 180) ---
  ctx.fillStyle = '#141008';
  ctx.fillRect(355, 85, 190, 170);
  ctx.strokeStyle = '#2a2010';
  ctx.strokeRect(355, 85, 190, 170);
  // Hieróglifos
  ctx.fillStyle = '#e8b84a88';
  ctx.font = '18px serif';
  ctx.fillText('𓁹 𓂋 𓃀', 380, 130);
  ctx.fillText('𓇳 𓈖 𓊪', 380, 165);
  ctx.fillText('𓌙 𓎛 𓏏', 380, 200);
  ctx.fillStyle = '#e8b84a';
  ctx.font = '9px Georgia';
  ctx.fillText('"Ouro → Azul → Vermelho"', 370, 240);

  // --- MURAL DE CORES (650, 100, 150, 160) ---
  ctx.fillStyle = '#141008';
  ctx.fillRect(655, 105, 140, 150);
  ctx.strokeStyle = '#2a2010';
  ctx.strokeRect(655, 105, 140, 150);
  // Três círculos de cores
  ctx.fillStyle = '#e8b84a';
  ctx.beginPath(); ctx.arc(695, 180, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1565c0';
  ctx.beginPath(); ctx.arc(725, 180, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#c62828';
  ctx.beginPath(); ctx.arc(755, 180, 18, 0, Math.PI * 2); ctx.fill();
  // Escaravelho
  ctx.fillStyle = '#e8b84a88';
  ctx.font = '16px serif';
  ctx.fillText('𓆣', 715, 230);

  // --- TERMINAL OVERRIDE (350, 380, 200, 120) ---
  ctx.fillStyle = '#0a0a08';
  ctx.fillRect(355, 385, 190, 110);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 2;
  ctx.strokeRect(355, 385, 190, 110);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#e8b84a';
  ctx.font = '10px Courier New';
  ctx.fillText('TERMINAL OVERRIDE', 380, 410);
  // Teclado
  ctx.fillStyle = '#141008';
  ctx.fillRect(370, 430, 160, 40);
  ctx.strokeStyle = '#2a2010';
  ctx.strokeRect(370, 430, 160, 40);
  // Cursor piscante
  const blink = Math.sin(Date.now() / 500) > 0 ? '#e8b84a' : 'transparent';
  ctx.fillStyle = blink;
  ctx.fillRect(380, 445, 8, 12);

  // --- VOLTAR GALERIA (30, 520, 130, 50) ---
  ctx.fillStyle = '#12100a';
  ctx.fillRect(35, 525, 125, 45);
  ctx.strokeStyle = '#2a2010';
  ctx.strokeRect(35, 525, 125, 45);
  ctx.fillStyle = '#7a7060';
  ctx.font = '11px Georgia';
  ctx.fillText('← Galeria', 55, 552);
}

function renderEgp_Atmosfera(ctx) {
  // Poeira dourada flutuando
  ctx.save();
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = '#e8b84a';
  const dustY = Math.sin(Date.now() / 3000) * 20;
  ctx.beginPath(); ctx.arc(300, 250 + dustY, 80, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(600, 300 - dustY, 60, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function renderEgp_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 500);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(10, 8, 4, 0.25)');
  vignette.addColorStop(1, 'rgba(10, 8, 4, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  // Tint dourado
  ctx.fillStyle = 'rgba(20, 15, 5, 0.06)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// Ambiente GALERIA:
//   quadroModerno:    (60, 50, 160, 200)
//   quadroClassico:   (360, 50, 160, 200)
//   escultura:        (680, 120, 100, 200)
//   placaInfo:        (250, 380, 140, 60)
//   portaSeguranca:   (750, 400, 120, 150)
//   corredorEgipcio:  (30, 420, 130, 130)
//
// Ambiente SEGURANÇA:
//   diagramaCircuito: (50, 50, 250, 200)
//   monitorCams:      (400, 50, 200, 150)
//   painelSensores:   (350, 320, 200, 140)
//   voltarGaleria:    (30, 520, 130, 50)
//
// Ambiente ALA EGÍPCIA:
//   sarcofago:         (80, 100, 150, 250)
//   hieroglifos:       (350, 80, 200, 180)
//   muralCores:        (650, 100, 150, 160)
//   terminalOverride:  (350, 380, 200, 120)
//   voltarGaleriaEg:   (30, 520, 130, 50)
