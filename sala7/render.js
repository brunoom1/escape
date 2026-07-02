/**
 * @module Sala7Render
 * @version 3.0.0
 * @description Renderização cinematográfica da Sala 7 — O Orient Express
 * Ambientes: Restaurante, Cabines, Locomotiva
 * Paleta: ThemeArtDeco — bg #0a0806, accent #d4a843, border #3d3020, font Georgia
 */

const DECO_DIAMONDS = [
  {x:90,y:50},{x:270,y:50},{x:450,y:50},{x:630,y:50},{x:810,y:50}
];
const LOCO_GAUGES = [{x:150,y:110},{x:250,y:110},{x:350,y:110}];

// ============ VAGÃO RESTAURANTE ============

function renderRestaurante(ctx, state) {
  const t = Date.now();
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0d0a06');
  grad.addColorStop(0.3, '#1a150e');
  grad.addColorStop(0.7, '#12100a');
  grad.addColorStop(1, '#0a0806');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);

  // Paredes de mogno com painéis
  ctx.fillStyle = '#1f1810';
  ctx.fillRect(0, 0, 900, 450);
  ctx.strokeStyle = '#3d3020';
  for (let i = 0; i < 9; i++) { ctx.strokeRect(i * 100 + 5, 5, 90, 440); }

  // Art deco diamond patterns
  ctx.strokeStyle = '#d4a84322';
  for (const d of DECO_DIAMONDS) {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + 40, d.y + 40);
    ctx.lineTo(d.x, d.y + 80); ctx.lineTo(d.x - 40, d.y + 40);
    ctx.closePath(); ctx.stroke();
  }

  // Carpete com padrões
  ctx.fillStyle = '#12100a';
  ctx.fillRect(0, 450, 900, 150);
  ctx.fillStyle = '#2a1a12';
  ctx.fillRect(50, 460, 800, 120);
  ctx.strokeStyle = '#d4a84333';
  ctx.strokeRect(55, 465, 790, 110);
  ctx.strokeRect(70, 478, 760, 84);
  // Padrões geométricos no carpete
  for (let i = 0; i < 8; i++) {
    const px = 100 + i * 95;
    ctx.strokeStyle = '#d4a84318';
    ctx.beginPath();
    ctx.moveTo(px, 490); ctx.lineTo(px + 15, 510); ctx.lineTo(px, 530); ctx.lineTo(px - 15, 510);
    ctx.closePath(); ctx.stroke();
  }

  // Janelas com paisagem parallax noturna
  renderTrainWindow(ctx, 60, 100, 140, 180, t);
  renderTrainWindow(ctx, 700, 100, 140, 180, t);

  // Lustre com cristais (sin-based shimmer)
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
  // Crystal drops shimmer
  for (let i = 0; i < 7; i++) {
    const cx = 415 + i * 12;
    const brightness = 0.3 + Math.sin(t / 500 + i * 0.9) * 0.2;
    ctx.fillStyle = `rgba(212,168,67,${brightness})`;
    ctx.beginPath(); ctx.ellipse(cx, 75, 2, 6, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Lustre glow
  const lustreGlow = ctx.createRadialGradient(450, 50, 10, 450, 50, 250);
  lustreGlow.addColorStop(0, 'rgba(212, 168, 67, 0.1)');
  lustreGlow.addColorStop(0.4, 'rgba(212, 168, 67, 0.03)');
  lustreGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = lustreGlow;
  ctx.fillRect(200, 0, 500, 400);

  // Mesa com toalha branca e borda dourada
  ctx.fillStyle = '#f5f0e8';
  ctx.fillRect(300, 310, 220, 70);
  ctx.strokeStyle = '#d4a843';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(300, 310, 220, 70);
  ctx.lineWidth = 1;
  // Pernas da mesa
  ctx.fillStyle = '#3d3020';
  ctx.fillRect(310, 380, 8, 60);
  ctx.fillRect(502, 380, 8, 60);
  // Menu na mesa
  ctx.fillStyle = '#f8f4e8';
  ctx.fillRect(360, 315, 100, 55);
  ctx.strokeStyle = '#8b7340';
  ctx.strokeRect(360, 315, 100, 55);
  ctx.fillStyle = '#3d3020';
  ctx.font = '9px Georgia';
  ctx.fillText('MENU', 393, 332);
  ctx.font = '7px Georgia';
  ctx.fillText('Crème Brûlée..7F', 365, 345);
  ctx.fillText('Vin Rouge....15F', 365, 356);
  ctx.fillText('Filet Mignon.28F', 365, 367);

  // Garrafa de vinho
  ctx.fillStyle = '#2a0a0a';
  ctx.fillRect(212, 290, 20, 80);
  ctx.fillStyle = '#4a1a1a';
  ctx.fillRect(218, 280, 8, 20);
  ctx.fillStyle = '#f5f0e8';
  ctx.fillRect(210, 310, 24, 30);
  ctx.fillStyle = '#3d3020';
  ctx.font = '7px Georgia';
  ctx.fillText('1934', 212, 328);

  // Toalha dobrada
  ctx.fillStyle = '#f5f0e8';
  ctx.fillRect(555, 325, 90, 45);
  ctx.strokeStyle = '#d4a84344';
  ctx.strokeRect(555, 325, 90, 45);

  // Cadeiras
  ctx.fillStyle = '#4a1020';
  ctx.fillRect(330, 400, 60, 50);
  ctx.strokeStyle = '#6a2030';
  ctx.strokeRect(330, 400, 60, 50);
  ctx.fillStyle = '#4a1020';
  ctx.fillRect(510, 400, 60, 50);
  ctx.strokeStyle = '#6a2030';
  ctx.strokeRect(510, 400, 60, 50);

  // Brass details (corrimões)
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 445); ctx.lineTo(900, 445); ctx.stroke();
  ctx.lineWidth = 1;

  // Porta para Cabines
  ctx.fillStyle = '#12100a';
  ctx.fillRect(805, 185, 60, 240);
  ctx.strokeStyle = state.get('portaCabines') ? '#d4a843' : '#3d3020';
  ctx.lineWidth = 2;
  ctx.strokeRect(805, 185, 60, 240);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#d4a843';
  ctx.beginPath(); ctx.arc(815, 305, 4, 0, Math.PI * 2); ctx.fill();

  // Vignette overlay
  const vignette = ctx.createRadialGradient(450, 300, 130, 450, 300, 530);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(10, 8, 5, 0.2)');
  vignette.addColorStop(1, 'rgba(10, 8, 5, 0.5)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
}

// Helper: janela com parallax night landscape
function renderTrainWindow(ctx, x, y, w, h, t) {
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  const skyGrad = ctx.createLinearGradient(x, y, x, y + h);
  skyGrad.addColorStop(0, '#0d1520');
  skyGrad.addColorStop(1, '#1a2a3a');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(x, y, w, h);
  // Stars
  for (let i = 0; i < 5; i++) {
    const sx = x + 20 + i * 25;
    const sy = y + 15 + Math.sin(i * 2.3) * 20;
    const sb = 0.3 + Math.sin(t / 1500 + i) * 0.2;
    ctx.fillStyle = `rgba(255,255,220,${sb})`;
    ctx.fillRect(sx, sy, 1.5, 1.5);
  }
  // Mountains via sin (parallax)
  ctx.fillStyle = '#0a1218';
  ctx.beginPath(); ctx.moveTo(x, y + h);
  for (let i = 0; i <= w; i += 10) {
    const mh = 40 + Math.sin((i + t * 0.01) * 0.04) * 25;
    ctx.lineTo(x + i, y + h - mh);
  }
  ctx.lineTo(x + w, y + h); ctx.fill();
  ctx.restore();
  // Brass frame
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, w, h);
  ctx.strokeStyle = '#d4a843';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
}

// ============ VAGÃO DE CABINES ============

function renderCabines(ctx, state) {
  const t = Date.now();
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0d0a06');
  grad.addColorStop(0.5, '#1a150e');
  grad.addColorStop(1, '#0a0806');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);

  // Paredes de mogno — corredor estreito
  ctx.fillStyle = '#1f1810';
  ctx.fillRect(0, 0, 900, 480);
  ctx.strokeStyle = '#3d3020';
  for (let i = 0; i < 12; i++) {
    ctx.beginPath(); ctx.moveTo(i * 75, 0); ctx.lineTo(i * 75, 480); ctx.stroke();
  }
  // Dado rail
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 130); ctx.lineTo(900, 130); ctx.stroke();
  ctx.lineWidth = 1;

  // Red carpet runner
  ctx.fillStyle = '#4a1020';
  ctx.fillRect(0, 480, 900, 120);
  ctx.fillStyle = '#5a1828';
  ctx.fillRect(300, 485, 300, 110);
  ctx.strokeStyle = '#d4a84322';
  ctx.strokeRect(305, 490, 290, 100);

  // Overhead lamp glow (sin-based)
  const lampGlow = 0.3 + Math.sin(t / 1000) * 0.1;
  ctx.fillStyle = `rgba(212,168,67,${lampGlow * 0.3})`;
  ctx.beginPath(); ctx.ellipse(450, 15, 30, 80, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d4a84344';
  ctx.beginPath(); ctx.ellipse(450, 10, 40, 8, 0, 0, Math.PI * 2); ctx.fill();

  // Cabines 1, 2, 3 (numbered doors)
  const cabines = [
    { x: 80, y: 150, label: '1', open: true },
    { x: 300, y: 150, label: '2', open: state.get('cabineAberta') },
    { x: 520, y: 150, label: '3', open: true }
  ];
  cabines.forEach(c => {
    ctx.fillStyle = c.open ? '#12100a' : '#1a150e';
    ctx.fillRect(c.x, c.y, 140, 200);
    ctx.strokeStyle = c.open ? '#d4a843' : '#5a4a30';
    ctx.lineWidth = 2;
    ctx.strokeRect(c.x, c.y, 140, 200);
    ctx.lineWidth = 1;
    ctx.fillStyle = '#d4a843';
    ctx.font = '18px Georgia';
    ctx.fillText(c.label, c.x + 62, c.y + 110);
    ctx.fillStyle = '#8b7340';
    ctx.beginPath(); ctx.arc(c.x + 125, c.y + 105, 5, 0, Math.PI * 2); ctx.fill();
    if (!c.open) {
      ctx.fillStyle = '#5a4a30';
      ctx.fillRect(c.x + 115, c.y + 95, 15, 12);
    }
  });

  // Luggage rack
  ctx.fillStyle = '#3d3020';
  ctx.fillRect(700, 50, 160, 10);
  ctx.fillRect(700, 50, 5, 80);
  ctx.fillRect(855, 50, 5, 80);
  // Suitcase on rack
  ctx.fillStyle = '#2a1a10';
  ctx.fillRect(720, 25, 60, 25);
  ctx.strokeStyle = '#5a4a30';
  ctx.strokeRect(720, 25, 60, 25);

  // Diário no chão
  if (!state.get('diario')) {
    ctx.fillStyle = '#3a2a1a';
    ctx.fillRect(85, 405, 70, 40);
    ctx.strokeStyle = '#5a4a30';
    ctx.strokeRect(85, 405, 70, 40);
    ctx.fillStyle = '#8a7a60';
    ctx.font = '8px Georgia';
    ctx.fillText('Diário', 97, 428);
  }

  // Porta Locomotiva
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(755, 185, 60, 240);
  ctx.strokeStyle = state.get('chaveMestre') ? '#4caf50' : '#5a4a30';
  ctx.lineWidth = 2;
  ctx.strokeRect(755, 185, 60, 240);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a60';
  ctx.font = '9px Georgia';
  ctx.fillText('LOCOMOTIVA', 757, 310);

  // Voltar Restaurante
  if (!state.get('vagaoRestLocked')) {
    ctx.fillStyle = '#1a150e';
    ctx.fillRect(35, 525, 135, 45);
    ctx.strokeStyle = '#3d3020';
    ctx.strokeRect(35, 525, 135, 45);
    ctx.fillStyle = '#8a7a60';
    ctx.font = '11px Georgia';
    ctx.fillText('\u2190 Restaurante', 45, 552);
  } else {
    ctx.fillStyle = '#12100a';
    ctx.fillRect(35, 525, 135, 45);
    ctx.strokeStyle = '#c6282844';
    ctx.strokeRect(35, 525, 135, 45);
    ctx.fillStyle = '#c6282888';
    ctx.font = '10px Georgia';
    ctx.fillText('DESACOPLADO', 48, 552);
  }

  // Vignette
  const vig = ctx.createRadialGradient(450, 300, 100, 450, 300, 520);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(0.7, 'rgba(10, 8, 4, 0.2)');
  vig.addColorStop(1, 'rgba(10, 8, 4, 0.55)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ LOCOMOTIVA ============

function renderLocomotiva(ctx, state) {
  const t = Date.now();
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0806');
  grad.addColorStop(0.3, '#141010');
  grad.addColorStop(0.7, '#1a1210');
  grad.addColorStop(1, '#0a0806');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);

  // Industrial metal ceiling
  ctx.fillStyle = '#0e0c08';
  ctx.fillRect(0, 0, 900, 30);
  // Iron walls
  ctx.fillStyle = '#141010';
  ctx.fillRect(0, 30, 900, 430);
  // Rivets
  ctx.fillStyle = '#2a2020';
  for (let i = 0; i < 10; i++) {
    ctx.beginPath(); ctx.arc(50 + i * 90, 40, 4, 0, Math.PI * 2); ctx.fill();
  }
  // Iron grate floor
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

  // Pipes
  ctx.strokeStyle = '#2a2020';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(50, 200); ctx.lineTo(300, 200); ctx.lineTo(300, 400); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 150); ctx.lineTo(600, 300); ctx.stroke();
  ctx.lineWidth = 1;

  // Furnace with fire (sin-based)
  ctx.fillStyle = '#1a0a0a';
  ctx.fillRect(705, 305, 120, 110);
  ctx.strokeStyle = '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(705, 305, 120, 110);
  ctx.lineWidth = 1;
  const fireFlicker = Math.sin(t / 150) * 0.2 + 0.8;
  ctx.fillStyle = `rgba(255, 120, 20, ${fireFlicker * 0.4})`;
  ctx.beginPath(); ctx.ellipse(765, 360, 35, 30, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = `rgba(255, 200, 50, ${fireFlicker * 0.3})`;
  ctx.beginPath(); ctx.ellipse(765, 360, 20, 18, 0, 0, Math.PI * 2); ctx.fill();
  // Furnace glow
  const fireGlow = ctx.createRadialGradient(765, 360, 20, 765, 360, 200);
  fireGlow.addColorStop(0, 'rgba(255, 100, 20, 0.1)');
  fireGlow.addColorStop(0.4, 'rgba(200, 60, 10, 0.04)');
  fireGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = fireGlow;
  ctx.fillRect(560, 160, 340, 440);

  // Coal pile
  ctx.fillStyle = '#0a0a08';
  ctx.beginPath(); ctx.ellipse(765, 430, 50, 20, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1a1210';
  for (let i = 0; i < 6; i++) {
    const cx = 740 + Math.sin(i * 1.8) * 30;
    const cy = 425 + Math.sin(i * 2.5) * 10;
    ctx.beginPath(); ctx.arc(cx, cy, 5 + Math.sin(i) * 2, 0, Math.PI * 2); ctx.fill();
  }

  // 3 Manometers panel (0-50 PSI scale)
  ctx.fillStyle = '#0a0a08';
  ctx.fillRect(105, 55, 300, 130);
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 2;
  ctx.strokeRect(105, 55, 300, 130);
  ctx.lineWidth = 1;
  for (const g of LOCO_GAUGES) {
    ctx.fillStyle = '#f5f0e8';
    ctx.beginPath(); ctx.arc(g.x, g.y, 25, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#3d3020';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(g.x, g.y, 25, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = '#3d3020';
    ctx.font = '6px Georgia';
    ctx.fillText('0', g.x - 18, g.y + 14);
    ctx.fillText('25', g.x - 4, g.y - 18);
    ctx.fillText('50', g.x + 12, g.y + 14);
    // Needle (animated idle)
    const angle = -Math.PI * 0.75 + Math.sin(t / 2000 + g.x * 0.01) * 0.1;
    ctx.strokeStyle = '#c62828';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(g.x, g.y);
    ctx.lineTo(g.x + Math.cos(angle) * 16, g.y + Math.sin(angle) * 16);
    ctx.stroke();
    ctx.lineWidth = 1;
  }
  ctx.fillStyle = '#d4a843';
  ctx.font = '9px Georgia';
  ctx.fillText('MAN\u00D4METROS (0\u201350 PSI)', 140, 175);

  // Brake levers
  ctx.fillStyle = '#141010';
  ctx.fillRect(455, 155, 190, 260);
  ctx.strokeStyle = '#8b7340';
  ctx.lineWidth = 2;
  ctx.strokeRect(455, 155, 190, 260);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#d4a843';
  ctx.font = '11px Georgia';
  ctx.fillText('ALAVANCAS DE FREIO', 478, 180);
  for (let i = 0; i < 3; i++) {
    const ax = 490 + i * 50;
    ctx.fillStyle = '#2a2020';
    ctx.fillRect(ax + 8, 200, 6, 180);
    ctx.fillStyle = '#8b7340';
    ctx.fillRect(ax, 300, 22, 30);
    ctx.strokeStyle = '#d4a843';
    ctx.strokeRect(ax, 300, 22, 30);
    ctx.fillStyle = '#8a7a60';
    ctx.font = '9px Georgia';
    ctx.fillText((i + 1).toString(), ax + 7, 400);
  }

  // Speed indicator
  ctx.fillStyle = '#0a0a08';
  ctx.fillRect(455, 430, 120, 30);
  ctx.strokeStyle = '#c62828';
  ctx.strokeRect(455, 430, 120, 30);
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 12px Georgia';
  ctx.fillText('120 km/h', 470, 450);

  // Manufacturer plate
  ctx.fillStyle = '#1a1510';
  ctx.fillRect(100, 430, 100, 22);
  ctx.strokeStyle = '#8b7340';
  ctx.strokeRect(100, 430, 100, 22);
  ctx.fillStyle = '#8b7340';
  ctx.font = '8px Georgia';
  ctx.fillText('ORIENT EXP. 1927', 108, 445);

  // Voltar Cabines
  if (!state.get('vagaoCabLocked')) {
    ctx.fillStyle = '#1a150e';
    ctx.fillRect(35, 525, 135, 45);
    ctx.strokeStyle = '#3d3020';
    ctx.strokeRect(35, 525, 135, 45);
    ctx.fillStyle = '#8a7a60';
    ctx.font = '11px Georgia';
    ctx.fillText('\u2190 Cabines', 55, 552);
  } else {
    ctx.fillStyle = '#12100a';
    ctx.fillRect(35, 525, 135, 45);
    ctx.strokeStyle = '#c6282844';
    ctx.strokeRect(35, 525, 135, 45);
    ctx.fillStyle = '#c6282888';
    ctx.font = '10px Georgia';
    ctx.fillText('DESACOPLADO', 48, 552);
  }

  // Vignette + heat tint
  const vig2 = ctx.createRadialGradient(450, 300, 100, 450, 300, 520);
  vig2.addColorStop(0, 'transparent');
  vig2.addColorStop(0.6, 'rgba(10, 5, 3, 0.25)');
  vig2.addColorStop(1, 'rgba(10, 5, 3, 0.6)');
  ctx.fillStyle = vig2;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// Ambiente RESTAURANTE:
//   menu:         (350, 300, 120, 80)
//   garrafa:      (200, 270, 50, 110)
//   toalha:       (550, 320, 100, 55)
//   lustre:       (400, 20, 120, 70)
//   portaCabines: (800, 180, 70, 250)
//
// Ambiente CABINES:
//   cabine1:         (80, 150, 140, 200)
//   cabine2:         (300, 150, 140, 200)
//   cabine3:         (520, 150, 140, 200)
//   diario:          (80, 400, 80, 50)
//   portaLocomotiva: (750, 180, 70, 250)
//   voltarRest:      (30, 520, 140, 50)
//
// Ambiente LOCOMOTIVA:
//   manometros: (100, 50, 310, 140)
//   alavancas:  (450, 150, 200, 270)
//   fornalha:   (700, 300, 130, 120)
//   voltarCab:  (30, 520, 140, 50)
