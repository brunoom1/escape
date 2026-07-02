/**
 * @module Sala7Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 7 — O Orient Express
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Ambientes: Restaurante, Cabines, Locomotiva
 * Paleta: ThemeArtDeco — bg #0a0806, accent #d4a843, border #3d3020
 */

// ============ PRÉ-CALCULADOS ============
const DECO_DIAMONDS = [
  {x:90,y:50},{x:270,y:50},{x:450,y:50},{x:630,y:50},{x:810,y:50}
];
const TRAIN_TREES = [
  {x:30},{x:140},{x:250},{x:360},{x:470},{x:580},{x:690},{x:800}
];
const LOCO_GAUGES = [
  {x:130,y:90},{x:200,y:90},{x:270,y:90}
];

// ============ VAGÃO RESTAURANTE ============

function renderRestaurante(ctx, state) {
  renderRest_Background(ctx);
  renderRest_Arquitetura(ctx);
  renderRest_Iluminacao(ctx);
  renderRest_Detalhes(ctx);
  renderRest_Decoracao(ctx);
  renderRest_Objetos(ctx, state);
  renderRest_Atmosfera(ctx);
  renderRest_Overlay(ctx);
}

function renderRest_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0d0a06');
  grad.addColorStop(0.3, '#1a150e');
  grad.addColorStop(0.7, '#12100a');
  grad.addColorStop(1, '#0a0806');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderRest_Arquitetura(ctx) {
  // Paredes de mogno com painéis
  ctx.fillStyle = '#1f1810';
  ctx.fillRect(0, 0, 900, 450);
  // Wainscoting (painéis)
  ctx.strokeStyle = '#3d3020';
  for (let i = 0; i < 9; i++) { ctx.strokeRect(i * 100 + 5, 5, 90, 440); }
  // Art deco diamantes na parede (topo)
  ctx.strokeStyle = '#d4a84322';
  for (const d of DECO_DIAMONDS) {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + 40, d.y + 40);
    ctx.lineTo(d.x, d.y + 80); ctx.lineTo(d.x - 40, d.y + 40);
    ctx.closePath(); ctx.stroke();
  }
  // Piso — carpete
  ctx.fillStyle = '#12100a';
  ctx.fillRect(0, 450, 900, 150);
  ctx.fillStyle = '#2a1a12';
  ctx.fillRect(50, 460, 800, 120);
  ctx.strokeStyle = '#d4a84333';
  ctx.strokeRect(55, 465, 790, 110);
  ctx.strokeRect(70, 478, 760, 84);
}

function renderRest_Iluminacao(ctx) {
  // Lustre central (glow dourado)
  const lustreGlow = ctx.createRadialGradient(450, 50, 10, 450, 50, 250);
  lustreGlow.addColorStop(0, 'rgba(212, 168, 67, 0.1)');
  lustreGlow.addColorStop(0.4, 'rgba(212, 168, 67, 0.03)');
  lustreGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = lustreGlow;
  ctx.fillRect(200, 0, 500, 400);
  // Reflexo no piso
  ctx.fillStyle = 'rgba(212, 168, 67, 0.01)';
  ctx.fillRect(300, 470, 300, 60);
}

function renderRest_Detalhes(ctx) {
  // Desgaste nos painéis
  ctx.fillStyle = 'rgba(40, 30, 15, 0.1)';
  ctx.fillRect(200, 400, 100, 3);
  ctx.fillRect(600, 410, 80, 2);
  // Marca de taça no tecido da mesa
  ctx.strokeStyle = 'rgba(100, 80, 40, 0.08)';
  ctx.beginPath(); ctx.arc(420, 345, 12, 0, Math.PI * 2); ctx.stroke();
}

function renderRest_Decoracao(ctx) {
  // Janelas com paisagem (esquerda e direita)
  renderWindow(ctx, 60, 100, 140, 180);
  renderWindow(ctx, 700, 100, 140, 180);
  // Lustre físico
  ctx.strokeStyle = '#d4a843';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(450, 0); ctx.lineTo(450, 25); ctx.stroke();
  ctx.fillStyle = '#d4a84366';
  ctx.beginPath();
  ctx.moveTo(400, 25); ctx.lineTo(500, 25); ctx.lineTo(480, 70); ctx.lineTo(420, 70);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#d4a843';
  ctx.beginPath();
  ctx.moveTo(400, 25); ctx.lineTo(500, 25); ctx.lineTo(480, 70); ctx.lineTo(420, 70);
  ctx.closePath(); ctx.stroke();
  // Crystal drops
  for (let i = 0; i < 5; i++) {
    const cx = 420 + i * 15;
    const brightness = 0.3 + Math.sin(Date.now() / 500 + i) * 0.2;
    ctx.fillStyle = `rgba(212,168,67,${brightness})`;
    ctx.beginPath(); ctx.ellipse(cx, 75, 2, 6, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Cadeiras (decorativas)
  ctx.fillStyle = '#4a1020';
  ctx.fillRect(330, 400, 60, 50);
  ctx.strokeStyle = '#6a2030';
  ctx.strokeRect(330, 400, 60, 50);
  ctx.fillStyle = '#4a1020';
  ctx.fillRect(560, 400, 60, 50);
  ctx.strokeStyle = '#6a2030';
  ctx.strokeRect(560, 400, 60, 50);
}

// Helper: janela com parallax
function renderWindow(ctx, x, y, w, h) {
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  // Céu noturno
  const skyGrad = ctx.createLinearGradient(x, y, x, y + h);
  skyGrad.addColorStop(0, '#0d1520');
  skyGrad.addColorStop(1, '#1a2a3a');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(x, y, w, h);
  // Montanhas
  ctx.fillStyle = '#0a1218';
  ctx.beginPath(); ctx.moveTo(x, y + h);
  for (let i = 0; i <= w; i += 30) {
    ctx.lineTo(x + i, y + h - 40 - Math.sin(i * 0.03 + Date.now() * 0.0001) * 25);
  }
  ctx.lineTo(x + w, y + h); ctx.fill();
  ctx.restore();
  // Moldura brass
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, w, h);
  ctx.strokeStyle = '#d4a843';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
}

function renderRest_Objetos(ctx, state) {
  // --- MENU DO JANTAR (350, 300, 120, 80) ---
  // Mesa
  ctx.fillStyle = '#f5f0e8';
  ctx.fillRect(300, 310, 220, 70);
  ctx.strokeStyle = '#8b7340';
  ctx.strokeRect(300, 310, 220, 70);
  // Pernas da mesa
  ctx.fillStyle = '#3d3020';
  ctx.fillRect(310, 380, 8, 60);
  ctx.fillRect(502, 380, 8, 60);
  // Menu
  ctx.fillStyle = '#f8f4e8';
  ctx.fillRect(360, 315, 100, 55);
  ctx.strokeStyle = '#8b7340';
  ctx.strokeRect(360, 315, 100, 55);
  ctx.fillStyle = '#3d3020';
  ctx.font = '9px Georgia';
  ctx.fillText('MENU', 393, 335);
  ctx.fillText('Filet...28F', 370, 350);
  ctx.fillText('Vin.....15F', 370, 362);

  // --- GARRAFA DE VINHO (200, 280, 50, 100) ---
  ctx.fillStyle = '#2a0a0a';
  ctx.fillRect(212, 290, 20, 80);
  ctx.fillStyle = '#4a1a1a';
  ctx.fillRect(218, 280, 8, 20);
  ctx.fillStyle = '#f5f0e8';
  ctx.fillRect(210, 310, 24, 30);
  ctx.fillStyle = '#3d3020';
  ctx.font = '7px Georgia';
  ctx.fillText('1934', 212, 328);

  // --- TOALHA DOBRADA (550, 320, 100, 60) ---
  ctx.fillStyle = '#f5f0e8';
  ctx.fillRect(555, 325, 90, 45);
  ctx.strokeStyle = '#d4a84344';
  ctx.strokeRect(555, 325, 90, 45);

  // --- LUSTRE (400, 20, 120, 70) --- (hit area for lustre object)
  // Already rendered in decoration

  // --- RELÓGIO DE PAREDE (50, 80, 70, 100) ---
  ctx.fillStyle = '#1a1510';
  ctx.fillRect(55, 85, 60, 90);
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 2;
  ctx.strokeRect(55, 85, 60, 90);
  // Face
  ctx.fillStyle = '#f5f0e8';
  ctx.beginPath(); ctx.arc(85, 120, 20, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#3d3020';
  ctx.beginPath(); ctx.arc(85, 120, 20, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#3d3020';
  ctx.font = '8px Georgia';
  ctx.fillText('11:47', 70, 123);
  ctx.lineWidth = 1;

  // --- PORTA CABINES (800, 180, 70, 250) ---
  ctx.fillStyle = '#12100a';
  ctx.fillRect(805, 185, 60, 240);
  ctx.strokeStyle = state.get('portaCabines') ? '#d4a843' : '#3d3020';
  ctx.lineWidth = 2;
  ctx.strokeRect(805, 185, 60, 240);
  ctx.lineWidth = 1;
  // Maçaneta
  ctx.fillStyle = '#d4a843';
  ctx.beginPath(); ctx.arc(815, 305, 4, 0, Math.PI * 2); ctx.fill();
}

function renderRest_Atmosfera(ctx) {
  // Fumaça do trem passando pela janela
  ctx.save();
  ctx.globalAlpha = 0.015;
  ctx.fillStyle = '#d4a843';
  ctx.beginPath();
  ctx.moveTo(60, 100); ctx.lineTo(200, 280); ctx.lineTo(60, 280);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function renderRest_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 130, 450, 300, 530);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(10, 8, 5, 0.2)');
  vignette.addColorStop(1, 'rgba(10, 8, 5, 0.5)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(20, 15, 8, 0.06)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ VAGÃO DE CABINES ============

function renderCabines(ctx, state) {
  renderCab_Background(ctx);
  renderCab_Arquitetura(ctx);
  renderCab_Iluminacao(ctx);
  renderCab_Detalhes(ctx);
  renderCab_Decoracao(ctx);
  renderCab_Objetos(ctx, state);
  renderCab_Atmosfera(ctx);
  renderCab_Overlay(ctx);
}

function renderCab_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0d0a06');
  grad.addColorStop(0.5, '#1a150e');
  grad.addColorStop(1, '#0a0806');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderCab_Arquitetura(ctx) {
  // Paredes de mogno
  ctx.fillStyle = '#1f1810';
  ctx.fillRect(0, 0, 900, 480);
  // Painéis verticais
  ctx.strokeStyle = '#3d3020';
  for (let i = 0; i < 12; i++) {
    ctx.beginPath(); ctx.moveTo(i * 75, 0); ctx.lineTo(i * 75, 480); ctx.stroke();
  }
  // Dado rail (moldura horizontal)
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 130); ctx.lineTo(900, 130); ctx.stroke();
  ctx.lineWidth = 1;
  // Carpete vermelho
  ctx.fillStyle = '#4a1020';
  ctx.fillRect(0, 480, 900, 120);
  ctx.strokeStyle = '#d4a84322';
  ctx.strokeRect(10, 490, 880, 100);
}

function renderCab_Iluminacao(ctx) {
  // Lâmpada de corredor
  const lampGlow = 0.3 + Math.sin(Date.now() / 1000) * 0.1;
  ctx.fillStyle = `rgba(212,168,67,${lampGlow * 0.3})`;
  ctx.beginPath(); ctx.ellipse(450, 15, 30, 80, 0, 0, Math.PI * 2); ctx.fill();
  // Glow sutil no carpete
  ctx.fillStyle = 'rgba(212, 168, 67, 0.01)';
  ctx.fillRect(200, 500, 500, 80);
}

function renderCab_Detalhes(ctx) {
  // Marcas no carpete
  ctx.fillStyle = 'rgba(80, 30, 40, 0.06)';
  ctx.beginPath(); ctx.ellipse(450, 530, 100, 20, 0, 0, Math.PI * 2); ctx.fill();
}

function renderCab_Decoracao(ctx) {
  // Janela no corredor
  renderWindow(ctx, 600, 30, 100, 90);
  // Lâmpada de teto
  ctx.fillStyle = '#d4a84344';
  ctx.beginPath(); ctx.ellipse(450, 10, 40, 8, 0, 0, Math.PI * 2); ctx.fill();
}

function renderCab_Objetos(ctx, state) {
  // --- CABINES 1, 2, 3 ---
  const cabines = [
    { x: 50, y: 150, open: true, label: '1' },
    { x: 220, y: 150, open: state.get('cabineAberta'), label: '2' },
    { x: 400, y: 150, open: true, label: '3' }
  ];
  cabines.forEach(c => {
    ctx.fillStyle = c.open ? '#12100a' : '#1a150e';
    ctx.fillRect(c.x, c.y, 120, 180);
    ctx.strokeStyle = c.open ? '#d4a843' : '#5a4a30';
    ctx.lineWidth = 2;
    ctx.strokeRect(c.x, c.y, 120, 180);
    ctx.lineWidth = 1;
    // Número
    ctx.fillStyle = '#d4a843';
    ctx.font = '16px Georgia';
    ctx.fillText(c.label, c.x + 55, c.y + 100);
    // Maçaneta
    ctx.fillStyle = '#8b7340';
    ctx.beginPath(); ctx.arc(c.x + 105, c.y + 95, 5, 0, Math.PI * 2); ctx.fill();
    // Cadeado se trancada
    if (!c.open) {
      ctx.fillStyle = '#5a4a30';
      ctx.fillRect(c.x + 95, c.y + 85, 15, 10);
    }
  });

  // --- DIÁRIO NO CHÃO (80, 400, 80, 50) ---
  if (!state.get('diario')) {
    ctx.fillStyle = '#3a2a1a';
    ctx.fillRect(85, 405, 70, 40);
    ctx.strokeStyle = '#5a4a30';
    ctx.strokeRect(85, 405, 70, 40);
    ctx.fillStyle = '#8a7a60';
    ctx.font = '8px Georgia';
    ctx.fillText('Diário', 97, 428);
  }

  // --- MALETA DE COURO (430, 400, 90, 60) ---
  ctx.fillStyle = '#3a2a18';
  ctx.fillRect(435, 405, 80, 50);
  ctx.strokeStyle = '#5a4a30';
  ctx.strokeRect(435, 405, 80, 50);
  ctx.fillStyle = '#8b7340';
  ctx.fillRect(465, 403, 20, 4);

  // --- PORTA LOCOMOTIVA (750, 180, 70, 250) ---
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(755, 185, 60, 240);
  ctx.strokeStyle = state.get('chaveMestre') ? '#4caf50' : '#5a4a30';
  ctx.lineWidth = 2;
  ctx.strokeRect(755, 185, 60, 240);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a60';
  ctx.font = '9px Georgia';
  ctx.fillText('LOCOMOTIVA', 757, 310);

  // --- VOLTAR RESTAURANTE (30, 520, 140, 50) ---
  if (!state.get('vagaoRestLocked')) {
    ctx.fillStyle = '#1a150e';
    ctx.fillRect(35, 525, 135, 45);
    ctx.strokeStyle = '#3d3020';
    ctx.strokeRect(35, 525, 135, 45);
    ctx.fillStyle = '#8a7a60';
    ctx.font = '11px Georgia';
    ctx.fillText('← Restaurante', 45, 552);
  } else {
    ctx.fillStyle = '#12100a';
    ctx.fillRect(35, 525, 135, 45);
    ctx.strokeStyle = '#c6282844';
    ctx.strokeRect(35, 525, 135, 45);
    ctx.fillStyle = '#c6282888';
    ctx.font = '10px Georgia';
    ctx.fillText('DESACOPLADO', 48, 552);
  }
}

function renderCab_Atmosfera(ctx) {
  // Vibração do trem (leve shake via glow)
  ctx.save();
  ctx.globalAlpha = 0.01;
  ctx.fillStyle = '#d4a843';
  ctx.fillRect(0, 0, 900, 600);
  ctx.restore();
}

function renderCab_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 520);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(10, 8, 4, 0.2)');
  vignette.addColorStop(1, 'rgba(10, 8, 4, 0.55)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ LOCOMOTIVA ============

function renderLocomotiva(ctx, state) {
  renderLoco_Background(ctx);
  renderLoco_Arquitetura(ctx);
  renderLoco_Iluminacao(ctx);
  renderLoco_Detalhes(ctx);
  renderLoco_Decoracao(ctx);
  renderLoco_Objetos(ctx, state);
  renderLoco_Atmosfera(ctx);
  renderLoco_Overlay(ctx);
}

function renderLoco_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0806');
  grad.addColorStop(0.3, '#141010');
  grad.addColorStop(0.7, '#1a1210');
  grad.addColorStop(1, '#0a0806');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderLoco_Arquitetura(ctx) {
  // Teto metálico industrial
  ctx.fillStyle = '#0e0c08';
  ctx.fillRect(0, 0, 900, 30);
  // Paredes de ferro negro
  ctx.fillStyle = '#141010';
  ctx.fillRect(0, 30, 900, 430);
  // Rebites grandes
  ctx.fillStyle = '#2a2020';
  for (let i = 0; i < 10; i++) {
    ctx.beginPath(); ctx.arc(50 + i * 90, 40, 4, 0, Math.PI * 2); ctx.fill();
  }
  // Piso de ferro com grade
  ctx.fillStyle = '#0e0c08';
  ctx.fillRect(0, 460, 900, 140);
  ctx.strokeStyle = '#2a2020';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 460); ctx.lineTo(900, 460); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#1a1210';
  for (let i = 0; i < 12; i++) {
    ctx.beginPath(); ctx.moveTo(i * 80, 460); ctx.lineTo(i * 80, 600); ctx.stroke();
  }
}

function renderLoco_Iluminacao(ctx) {
  // Brilho da fornalha
  const fireGlow = ctx.createRadialGradient(765, 360, 20, 765, 360, 200);
  fireGlow.addColorStop(0, 'rgba(255, 100, 20, 0.1)');
  fireGlow.addColorStop(0.4, 'rgba(200, 60, 10, 0.04)');
  fireGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = fireGlow;
  ctx.fillRect(560, 160, 340, 440);
  // Flicker
  const flicker = Math.sin(Date.now() / 200) * 0.03 + 0.03;
  ctx.fillStyle = `rgba(255, 80, 0, ${flicker})`;
  ctx.fillRect(700, 300, 130, 120);
}

function renderLoco_Detalhes(ctx) {
  // Fuligem
  ctx.fillStyle = 'rgba(20, 15, 10, 0.15)';
  ctx.beginPath(); ctx.ellipse(500, 50, 120, 20, 0, 0, Math.PI * 2); ctx.fill();
  // Riscos no ferro
  ctx.strokeStyle = 'rgba(40, 30, 20, 0.2)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(400, 200); ctx.lineTo(420, 220); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(200, 350); ctx.lineTo(215, 370); ctx.stroke();
  ctx.lineWidth = 1;
}

function renderLoco_Decoracao(ctx) {
  // Tubulações e válvulas (fundo)
  ctx.strokeStyle = '#2a2020';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(50, 200); ctx.lineTo(300, 200); ctx.lineTo(300, 400); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 150); ctx.lineTo(600, 300); ctx.stroke();
  ctx.lineWidth = 1;
  // Placa do fabricante
  ctx.fillStyle = '#1a1510';
  ctx.fillRect(400, 430, 100, 22);
  ctx.strokeStyle = '#8b7340';
  ctx.strokeRect(400, 430, 100, 22);
  ctx.fillStyle = '#8b7340';
  ctx.font = '8px Georgia';
  ctx.fillText('ORIENT EXP. 1927', 410, 445);
}

function renderLoco_Objetos(ctx, state) {
  // --- PAINEL DE MANÔMETROS (100, 50, 180, 120) ---
  ctx.fillStyle = '#0a0a08';
  ctx.fillRect(105, 55, 170, 110);
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 2;
  ctx.strokeRect(105, 55, 170, 110);
  ctx.lineWidth = 1;
  // 3 Manômetros
  for (const g of LOCO_GAUGES) {
    ctx.fillStyle = '#f5f0e8';
    ctx.beginPath(); ctx.arc(g.x, g.y, 22, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#3d3020';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(g.x, g.y, 22, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 1;
    // Escala
    ctx.fillStyle = '#3d3020';
    ctx.font = '6px Georgia';
    ctx.fillText('0', g.x - 16, g.y + 12);
    ctx.fillText('50', g.x + 10, g.y + 12);
    // Agulha
    ctx.strokeStyle = '#c62828';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(g.x, g.y); ctx.lineTo(g.x + 12, g.y - 8); ctx.stroke();
    ctx.lineWidth = 1;
  }
  ctx.fillStyle = '#d4a843';
  ctx.font = '9px Georgia';
  ctx.fillText('MANÔMETROS (0-50 PSI)', 115, 155);

  // --- ALAVANCAS DE FREIO (350, 150, 200, 250) ---
  ctx.fillStyle = '#141010';
  ctx.fillRect(355, 155, 190, 240);
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 2;
  ctx.strokeRect(355, 155, 190, 240);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#d4a843';
  ctx.font = '11px Georgia';
  ctx.fillText('ALAVANCAS DE FREIO', 380, 180);
  // 3 Alavancas
  for (let i = 0; i < 3; i++) {
    const ax = 390 + i * 55;
    // Trilho
    ctx.fillStyle = '#2a2020';
    ctx.fillRect(ax + 8, 200, 6, 160);
    // Punho
    ctx.fillStyle = '#8b7340';
    ctx.fillRect(ax, 280, 22, 30);
    ctx.strokeStyle = '#d4a843';
    ctx.strokeRect(ax, 280, 22, 30);
    // Label
    ctx.fillStyle = '#8a7a60';
    ctx.font = '8px Georgia';
    ctx.fillText((i + 1).toString(), ax + 8, 375);
  }

  // --- FORNALHA (700, 300, 130, 120) ---
  ctx.fillStyle = '#1a0a0a';
  ctx.fillRect(705, 305, 120, 110);
  ctx.strokeStyle = '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(705, 305, 120, 110);
  ctx.lineWidth = 1;
  // Fogo
  const fireFlicker = Math.sin(Date.now() / 150) * 0.2 + 0.8;
  ctx.fillStyle = `rgba(255, 120, 20, ${fireFlicker * 0.4})`;
  ctx.beginPath(); ctx.ellipse(765, 360, 35, 30, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = `rgba(255, 200, 50, ${fireFlicker * 0.3})`;
  ctx.beginPath(); ctx.ellipse(765, 360, 20, 18, 0, 0, Math.PI * 2); ctx.fill();

  // --- MAPA FERROVIÁRIO (650, 50, 120, 80) ---
  ctx.fillStyle = '#2a2418';
  ctx.fillRect(655, 55, 110, 70);
  ctx.strokeStyle = '#5a4a30';
  ctx.strokeRect(655, 55, 110, 70);
  // Trilha ferroviária
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(665, 90); ctx.lineTo(750, 90); ctx.stroke();
  // Estação
  ctx.fillStyle = '#d4a843';
  ctx.beginPath(); ctx.arc(750, 90, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#8a7a60';
  ctx.font = '7px Georgia';
  ctx.fillText('Innsbruck', 660, 115);
  // Curva perigosa
  ctx.strokeStyle = '#c62828';
  ctx.beginPath(); ctx.arc(720, 90, 10, Math.PI, Math.PI * 1.5); ctx.stroke();

  // --- VOLTAR CABINES (30, 520, 140, 50) ---
  if (!state.get('vagaoCabLocked')) {
    ctx.fillStyle = '#1a150e';
    ctx.fillRect(35, 525, 135, 45);
    ctx.strokeStyle = '#3d3020';
    ctx.strokeRect(35, 525, 135, 45);
    ctx.fillStyle = '#8a7a60';
    ctx.font = '11px Georgia';
    ctx.fillText('← Cabines', 55, 552);
  } else {
    ctx.fillStyle = '#12100a';
    ctx.fillRect(35, 525, 135, 45);
    ctx.strokeStyle = '#c6282844';
    ctx.strokeRect(35, 525, 135, 45);
    ctx.fillStyle = '#c6282888';
    ctx.font = '10px Georgia';
    ctx.fillText('DESACOPLADO', 48, 552);
  }
}

function renderLoco_Atmosfera(ctx) {
  // Calor da fornalha
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#ff6600';
  ctx.beginPath();
  ctx.moveTo(765, 300); ctx.lineTo(700, 150); ctx.lineTo(830, 150);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function renderLoco_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 520);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.6, 'rgba(10, 5, 3, 0.25)');
  vignette.addColorStop(1, 'rgba(10, 5, 3, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  // Tint quente
  ctx.fillStyle = 'rgba(20, 10, 5, 0.05)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// Ambiente RESTAURANTE:
//   menu:         (350, 300, 120, 80)
//   garrafa:      (200, 280, 50, 100)
//   toalha:       (550, 320, 100, 60)
//   lustre:       (400, 20, 120, 70)
//   relogio:      (50, 80, 70, 100)
//   portaCabines: (800, 180, 70, 250)
//
// Ambiente CABINES:
//   cabine1:         (50, 150, 120, 180)
//   cabine2:         (220, 150, 120, 180)
//   cabine3:         (400, 150, 120, 180)
//   diario:          (80, 400, 80, 50)
//   maleta:          (430, 400, 90, 60)
//   portaLocomotiva: (750, 180, 70, 250)
//   voltarRest:      (30, 520, 140, 50)
//
// Ambiente LOCOMOTIVA:
//   manometro:  (100, 50, 180, 120)
//   alavancas:  (350, 150, 200, 250)
//   carvao:     (700, 300, 130, 120)
//   mapa:       (650, 50, 120, 80)
//   voltarCab:  (30, 520, 140, 50)
