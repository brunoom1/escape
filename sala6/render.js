/**
 * @module Sala6Render
 * @version 3.0.0
 * @description Renderização cinematográfica — Sala 6: O Museu à Noite
 * 8 camadas por ambiente (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Ambientes: Galeria Principal, Sala de Segurança, Ala Egípcia
 * Paleta ThemeMuseum: bg #0a0a0f, accent #e8b84a, border #2a2035, laser #ff1a1a
 */

// ═══════════════ PRÉ-CALCULADOS ═══════════════
const MARBLE_VEINS = [
  {x:80,y:518,w:95,h:2,a:0.12},{x:220,y:535,w:70,h:1.5,a:0.09},
  {x:400,y:522,w:110,h:2,a:0.14},{x:580,y:540,w:65,h:1.5,a:0.08},
  {x:700,y:525,w:80,h:2,a:0.11},{x:150,y:550,w:55,h:1,a:0.07},
  {x:500,y:555,w:90,h:1.5,a:0.10},{x:820,y:530,w:50,h:1,a:0.06}
];
const SPOT_LIGHTS = [
  {cx:155,cy:20,r:200,ix:155,iy:150},{cx:450,cy:20,r:200,ix:450,iy:150},
  {cx:730,cy:20,r:160,ix:730,iy:180}
];
const LASERS_GAL = [
  {x1:0,y1:380,x2:260,y2:380},{x1:290,y1:350,x2:560,y2:350},
  {x1:590,y1:320,x2:900,y2:320},{x1:640,y1:130,x2:900,y2:130},
  {x1:640,y1:260,x2:900,y2:260},{x1:0,y1:440,x2:180,y2:440}
];
const SEG_CABLES = [
  {x1:50,y1:530,x2:200,y2:535,c:'#1a1030'},{x1:300,y1:540,x2:500,y2:532,c:'#0a1a10'},
  {x1:600,y1:528,x2:800,y2:540,c:'#1a1030'},{x1:150,y1:545,x2:350,y2:550,c:'#0a1a10'}
];
const EGP_BLOCKS = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 6; col++) {
    const ox = row % 2 === 0 ? 0 : 75;
    EGP_BLOCKS.push({x: col * 150 + ox + 5, y: row * 60 + 5, w: 140, h: 55});
  }
}
const DUST_MOTES = [];
for (let i = 0; i < 30; i++) {
  DUST_MOTES.push({
    bx: 50 + Math.random() * 800, by: 50 + Math.random() * 400,
    speed: 0.3 + Math.random() * 0.7, phase: Math.random() * Math.PI * 2,
    size: 0.8 + Math.random() * 1.2
  });
}

// ═══════════════ GALERIA PRINCIPAL ═══════════════

function renderGaleria(ctx, state) {
  renderGal_L1_Background(ctx);
  renderGal_L2_Arquitetura(ctx);
  renderGal_L3_Iluminacao(ctx);
  renderGal_L4_Detalhes(ctx);
  renderGal_L5_Decoracao(ctx);
  renderGal_L6_Objetos(ctx, state);
  renderGal_L7_Atmosfera(ctx, state);
  renderGal_L8_Overlay(ctx);
}

// L1: Background — dark elegant gradient
function renderGal_L1_Background(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#06060b');
  g.addColorStop(0.3, '#0a0a0f');
  g.addColorStop(0.7, '#0c0b12');
  g.addColorStop(1, '#050508');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 900, 600);
}

// L2: Architecture — marble floors, tall walls, cornices, columns
function renderGal_L2_Arquitetura(ctx) {
  // Tall walls
  const wallG = ctx.createLinearGradient(0, 0, 0, 500);
  wallG.addColorStop(0, '#0e0d14');
  wallG.addColorStop(0.5, '#100f18');
  wallG.addColorStop(1, '#0c0b12');
  ctx.fillStyle = wallG;
  ctx.fillRect(0, 0, 900, 500);

  // Upper cornice — double molding
  const cornG = ctx.createLinearGradient(0, 0, 0, 20);
  cornG.addColorStop(0, '#2a2035');
  cornG.addColorStop(0.5, '#1a1525');
  cornG.addColorStop(1, '#0e0d14');
  ctx.fillStyle = cornG;
  ctx.fillRect(0, 0, 900, 20);
  ctx.fillStyle = '#e8b84a';
  ctx.globalAlpha = 0.08;
  ctx.fillRect(0, 18, 900, 2);
  ctx.globalAlpha = 1;

  // Baseboard
  ctx.fillStyle = '#1a1525';
  ctx.fillRect(0, 488, 900, 12);
  ctx.fillStyle = '#e8b84a';
  ctx.globalAlpha = 0.06;
  ctx.fillRect(0, 488, 900, 1);
  ctx.globalAlpha = 1;

  // Marble floor
  const flG = ctx.createLinearGradient(0, 500, 0, 600);
  flG.addColorStop(0, '#14121a');
  flG.addColorStop(0.4, '#11101a');
  flG.addColorStop(1, '#0a090e');
  ctx.fillStyle = flG;
  ctx.fillRect(0, 500, 900, 100);

  // Floor tile lines
  ctx.strokeStyle = 'rgba(42, 32, 53, 0.4)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 9; i++) {
    ctx.beginPath(); ctx.moveTo(i * 100, 500); ctx.lineTo(i * 100, 600); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(0, 550); ctx.lineTo(900, 550); ctx.stroke();
  ctx.lineWidth = 1;

  // Floor/wall border — strong line
  ctx.strokeStyle = '#2a2035';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 500); ctx.lineTo(900, 500); ctx.stroke();
  ctx.lineWidth = 1;

  // Columns — classical proportions
  drawColumn(ctx, 265, 30, 28, 468);
  drawColumn(ctx, 565, 30, 28, 468);
}

function drawColumn(ctx, x, y, w, h) {
  // Base
  ctx.fillStyle = '#1e1a28';
  ctx.fillRect(x - 6, y + h - 15, w + 12, 15);
  // Shaft with gradient
  const cg = ctx.createLinearGradient(x, 0, x + w, 0);
  cg.addColorStop(0, '#16141e');
  cg.addColorStop(0.3, '#1e1a28');
  cg.addColorStop(0.7, '#1e1a28');
  cg.addColorStop(1, '#12101a');
  ctx.fillStyle = cg;
  ctx.fillRect(x, y + 18, w, h - 33);
  // Fluting lines
  ctx.strokeStyle = 'rgba(42, 32, 53, 0.2)';
  ctx.lineWidth = 0.5;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(x + i * (w/4), y + 20); ctx.lineTo(x + i * (w/4), y + h - 18); ctx.stroke();
  }
  ctx.lineWidth = 1;
  // Capital
  ctx.fillStyle = '#2a2035';
  ctx.fillRect(x - 8, y, w + 16, 18);
  ctx.fillStyle = '#e8b84a';
  ctx.globalAlpha = 0.12;
  ctx.fillRect(x - 8, y + 16, w + 16, 2);
  ctx.globalAlpha = 1;
}

// L3: Lighting — spotlights on artworks, security camera LEDs
function renderGal_L3_Iluminacao(ctx) {
  // Warm gold spotlights cones
  for (const s of SPOT_LIGHTS) {
    const g = ctx.createRadialGradient(s.cx, s.cy, 3, s.ix, s.iy, s.r);
    g.addColorStop(0, 'rgba(232, 184, 74, 0.12)');
    g.addColorStop(0.4, 'rgba(232, 184, 74, 0.04)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(s.cx - 5, s.cy);
    ctx.lineTo(s.ix - s.r * 0.6, s.iy + s.r * 0.3);
    ctx.lineTo(s.ix + s.r * 0.6, s.iy + s.r * 0.3);
    ctx.closePath();
    ctx.fill();
  }
  // Spot light housings
  for (const s of SPOT_LIGHTS) {
    ctx.fillStyle = '#1a1525';
    ctx.fillRect(s.cx - 8, 0, 16, 8);
    ctx.fillStyle = '#e8b84a';
    ctx.globalAlpha = 0.3;
    ctx.beginPath(); ctx.arc(s.cx, 8, 3, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  // Security cameras — red dots (top corners)
  ctx.fillStyle = '#ff1a1a';
  ctx.globalAlpha = 0.6 + 0.3 * Math.sin(Date.now() / 800);
  ctx.beginPath(); ctx.arc(50, 25, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(850, 25, 3, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;
  // Camera housings
  ctx.fillStyle = '#1a1525';
  ctx.fillRect(40, 15, 20, 12);
  ctx.fillRect(840, 15, 20, 12);
}

// L4: Details — marble veins, dust on frames, wear marks, floor reflections
function renderGal_L4_Detalhes(ctx) {
  // Marble veins
  for (const v of MARBLE_VEINS) {
    ctx.fillStyle = `rgba(30, 26, 40, ${v.a})`;
    ctx.fillRect(v.x, v.y, v.w, v.h);
  }
  // Dust on frame tops
  ctx.fillStyle = 'rgba(60, 50, 35, 0.06)';
  ctx.fillRect(80, 97, 150, 2);
  ctx.fillRect(378, 97, 145, 2);
  // Wear marks on floor near artworks
  ctx.fillStyle = 'rgba(20, 18, 28, 0.3)';
  ctx.beginPath(); ctx.ellipse(155, 510, 50, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(450, 510, 50, 4, 0, 0, Math.PI * 2); ctx.fill();
  // Floor reflections — dim gold under spotlights
  ctx.fillStyle = 'rgba(232, 184, 74, 0.015)';
  ctx.beginPath(); ctx.ellipse(155, 530, 60, 15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(450, 530, 60, 15, 0, 0, Math.PI * 2); ctx.fill();
}

// L5: Decoration — benches, signage, non-interactive frames, camera housings
function renderGal_L5_Decoracao(ctx) {
  // Central bench
  const benchG = ctx.createLinearGradient(370, 460, 370, 490);
  benchG.addColorStop(0, '#1e1a25');
  benchG.addColorStop(1, '#14121a');
  ctx.fillStyle = benchG;
  ctx.fillRect(370, 462, 160, 26);
  ctx.strokeStyle = '#2a2035';
  ctx.strokeRect(370, 462, 160, 26);
  // Bench legs
  ctx.fillStyle = '#1a1525';
  ctx.fillRect(378, 488, 8, 12);
  ctx.fillRect(522, 488, 8, 12);

  // Wall signage — "SILÊNCIO"
  ctx.fillStyle = '#0e0d14';
  ctx.fillRect(420, 420, 60, 20);
  ctx.strokeStyle = 'rgba(42, 32, 53, 0.3)';
  ctx.strokeRect(420, 420, 60, 20);
  ctx.fillStyle = 'rgba(212, 207, 192, 0.3)';
  ctx.font = '8px Georgia';
  ctx.fillText('SILÊNCIO', 429, 434);

  // Small decorative frame (non-interactive, high on wall)
  ctx.strokeStyle = 'rgba(42, 32, 53, 0.4)';
  ctx.strokeRect(820, 60, 50, 70);
  ctx.fillStyle = '#0c0b12';
  ctx.fillRect(822, 62, 46, 66);
}

// L6: Objects — artwork frames with GOLD borders, security panels, interactive items
function renderGal_L6_Objetos(ctx, state) {
  // ─── QUADRO MODERNO (65, 100, 180, 220) ───
  // Warm vitrine glow
  ctx.fillStyle = 'rgba(232, 184, 74, 0.04)';
  ctx.fillRect(55, 90, 200, 240);
  // Frame with gold border
  ctx.fillStyle = '#0e0d14';
  ctx.fillRect(70, 105, 170, 210);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 3;
  ctx.strokeRect(70, 105, 170, 210);
  ctx.lineWidth = 1;
  // Inner gold detail
  ctx.strokeStyle = 'rgba(232, 184, 74, 0.3)';
  ctx.strokeRect(74, 109, 162, 202);
  // Painting — Noite Estrelada (simplified)
  const skyG = ctx.createLinearGradient(80, 115, 80, 250);
  skyG.addColorStop(0, '#0d1b4a');
  skyG.addColorStop(1, '#1a237e');
  ctx.fillStyle = skyG;
  ctx.fillRect(80, 115, 150, 145);
  // Stars
  ctx.fillStyle = '#ffeb3b';
  const stars = [{x:100,y:140,r:4},{x:130,y:130,r:3},{x:160,y:145,r:5},{x:190,y:135,r:3},{x:120,y:170,r:4},{x:170,y:165,r:3},{x:200,y:155,r:4}];
  for (const s of stars) {
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255, 235, 59, 0.3)';
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r + 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffeb3b';
  }
  // Cypress tree
  ctx.fillStyle = '#1b5e20';
  ctx.beginPath(); ctx.ellipse(110, 230, 8, 30, 0, 0, Math.PI * 2); ctx.fill();
  // Village
  ctx.fillStyle = '#1a1040';
  ctx.fillRect(80, 240, 150, 20);
  // Plaque
  ctx.fillStyle = '#0a090e';
  ctx.fillRect(115, 270, 80, 22);
  ctx.fillStyle = '#d4cfc0';
  ctx.font = '9px Georgia';
  ctx.fillText('Noite Estrelada', 120, 283);
  ctx.fillStyle = '#e8b84a';
  ctx.font = 'bold 10px Georgia';
  ctx.fillText('1889', 143, 295);

  // ─── QUADRO CLÁSSICO (365, 100, 170, 220) ───
  ctx.fillStyle = 'rgba(232, 184, 74, 0.04)';
  ctx.fillRect(355, 90, 190, 240);
  ctx.fillStyle = '#0e0d14';
  ctx.fillRect(370, 105, 160, 210);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 3;
  ctx.strokeRect(370, 105, 160, 210);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(232, 184, 74, 0.3)';
  ctx.strokeRect(374, 109, 152, 202);
  // Painting — O Grito (simplified)
  const cryG = ctx.createLinearGradient(380, 115, 380, 260);
  cryG.addColorStop(0, '#e65100');
  cryG.addColorStop(0.5, '#bf360c');
  cryG.addColorStop(1, '#4e342e');
  ctx.fillStyle = cryG;
  ctx.fillRect(380, 115, 140, 145);
  // Figure
  ctx.fillStyle = '#3e2723';
  ctx.beginPath(); ctx.ellipse(450, 190, 18, 28, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d7ccc8';
  ctx.beginPath(); ctx.ellipse(450, 175, 12, 16, 0, 0, Math.PI * 2); ctx.fill();
  // Mouth
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath(); ctx.ellipse(450, 183, 5, 8, 0, 0, Math.PI * 2); ctx.fill();
  // Eyes
  ctx.beginPath(); ctx.ellipse(445, 172, 3, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(455, 172, 3, 4, 0, 0, Math.PI * 2); ctx.fill();
  // Railing
  ctx.strokeStyle = '#4e342e';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(380, 220); ctx.lineTo(520, 220); ctx.stroke();
  ctx.lineWidth = 1;
  // Plaque
  ctx.fillStyle = '#0a090e';
  ctx.fillRect(415, 270, 70, 22);
  ctx.fillStyle = '#d4cfc0';
  ctx.font = '9px Georgia';
  ctx.fillText('O Grito', 432, 283);
  ctx.fillStyle = '#e8b84a';
  ctx.font = 'bold 10px Georgia';
  ctx.fillText('1893', 438, 295);

  // ─── ESCULTURA (670, 120, 120, 240) ───
  // Pedestal
  ctx.fillStyle = '#1e1a28';
  ctx.fillRect(695, 310, 70, 50);
  ctx.strokeStyle = '#2a2035';
  ctx.strokeRect(695, 310, 70, 50);
  // Pedestal top
  ctx.fillStyle = '#24203a';
  ctx.fillRect(690, 305, 80, 8);
  // Sculpture body (abstract figure)
  const scG = ctx.createLinearGradient(710, 150, 750, 150);
  scG.addColorStop(0, '#2a2535');
  scG.addColorStop(0.5, '#3a3545');
  scG.addColorStop(1, '#2a2535');
  ctx.fillStyle = scG;
  ctx.beginPath();
  ctx.moveTo(730, 140);
  ctx.bezierCurveTo(700, 170, 705, 250, 710, 305);
  ctx.lineTo(750, 305);
  ctx.bezierCurveTo(755, 250, 760, 170, 730, 140);
  ctx.fill();
  ctx.strokeStyle = '#4a4555';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(730, 140);
  ctx.bezierCurveTo(700, 170, 705, 250, 710, 305);
  ctx.lineTo(750, 305);
  ctx.bezierCurveTo(755, 250, 760, 170, 730, 140);
  ctx.stroke();
  ctx.lineWidth = 1;
  // Head
  ctx.fillStyle = '#3a3545';
  ctx.beginPath(); ctx.ellipse(730, 135, 14, 18, 0, 0, Math.PI * 2); ctx.fill();

  // ─── PLACA INFORMATIVA (300, 400, 180, 55) ───
  ctx.fillStyle = '#0e0d0a';
  ctx.fillRect(305, 405, 170, 45);
  ctx.strokeStyle = '#3a3a28';
  ctx.strokeRect(305, 405, 170, 45);
  ctx.fillStyle = '#e8b84a';
  ctx.globalAlpha = 0.1;
  ctx.fillRect(305, 405, 170, 2);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#7a7060';
  ctx.font = '10px Georgia';
  ctx.fillText('INFORMAÇÕES DO MUSEU', 320, 425);
  ctx.fillStyle = 'rgba(212, 207, 192, 0.4)';
  ctx.font = '8px Georgia';
  ctx.fillText('Exposição Permanente', 335, 440);

  // ─── PORTA SEGURANÇA (740, 370, 130, 160) ───
  ctx.fillStyle = '#0c0b10';
  ctx.fillRect(745, 375, 120, 150);
  const doorBorder = state.get('crachaColetado') ? '#4caf50' : '#2a2035';
  ctx.strokeStyle = doorBorder;
  ctx.lineWidth = 2;
  ctx.strokeRect(745, 375, 120, 150);
  ctx.lineWidth = 1;
  // Door handle
  ctx.fillStyle = '#2a2535';
  ctx.fillRect(845, 440, 10, 30);
  // Badge reader
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(755, 430, 30, 20);
  ctx.strokeStyle = '#1a1525';
  ctx.strokeRect(755, 430, 30, 20);
  const ledColor = state.get('crachaColetado') ? '#4caf50' : '#c62828';
  ctx.fillStyle = ledColor;
  ctx.beginPath(); ctx.arc(770, 440, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = ledColor;
  ctx.globalAlpha = 0.3;
  ctx.beginPath(); ctx.arc(770, 440, 8, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;
  // Label
  ctx.fillStyle = '#7a7060';
  ctx.font = '9px Georgia';
  ctx.fillText('SEGURANÇA', 768, 510);
  ctx.fillText('Acesso restrito', 763, 522);

  // ─── CORREDOR EGÍPCIO (20, 380, 140, 145) ───
  ctx.fillStyle = '#0a0908';
  ctx.fillRect(25, 385, 130, 135);
  const corrBorder = state.get('laserDesativado') ? '#4caf50' : '#c62828';
  ctx.strokeStyle = corrBorder;
  ctx.lineWidth = 2;
  ctx.strokeRect(25, 385, 130, 135);
  ctx.lineWidth = 1;
  // Archway
  ctx.strokeStyle = 'rgba(42, 32, 53, 0.5)';
  ctx.beginPath();
  ctx.arc(90, 385, 60, Math.PI, 0);
  ctx.stroke();
  // Label
  ctx.fillStyle = '#7a7060';
  ctx.font = '9px Georgia';
  ctx.fillText('ALA EGÍPCIA', 42, 460);
  ctx.fillText('→', 82, 480);
}

// L7: Atmosphere — LASERS (pulsing red with shadowBlur glow), dust motes in spotlight beams
function renderGal_L7_Atmosfera(ctx, state) {
  // Pulsing red lasers
  if (!state || !state.get('laserDesativado')) {
    const t = Date.now() / 400;
    const alpha = 0.55 + 0.35 * Math.sin(t);
    const alpha2 = 0.55 + 0.35 * Math.sin(t + 1.2);
    ctx.save();
    ctx.strokeStyle = `rgba(255, 26, 26, ${alpha})`;
    ctx.shadowColor = 'rgba(255, 26, 26, 0.9)';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2.5;
    for (let i = 0; i < LASERS_GAL.length; i++) {
      const l = LASERS_GAL[i];
      const a = i % 2 === 0 ? alpha : alpha2;
      ctx.strokeStyle = `rgba(255, 26, 26, ${a})`;
      ctx.beginPath(); ctx.moveTo(l.x1, l.y1); ctx.lineTo(l.x2, l.y2); ctx.stroke();
    }
    // Laser reflections on floor
    ctx.shadowBlur = 0;
    ctx.fillStyle = `rgba(255, 26, 26, ${alpha * 0.04})`;
    ctx.fillRect(0, 500, 900, 100);
    ctx.restore();
  }

  // Dust motes floating in spotlight beams
  const now = Date.now() / 1000;
  ctx.fillStyle = 'rgba(232, 184, 74, 0.2)';
  for (const d of DUST_MOTES) {
    const y = d.by + Math.sin(now * d.speed + d.phase) * 30;
    const x = d.bx + Math.cos(now * d.speed * 0.7 + d.phase) * 15;
    // Only show dust in spotlight areas (y < 350)
    if (y < 350 && y > 50) {
      ctx.beginPath(); ctx.arc(x, y, d.size, 0, Math.PI * 2); ctx.fill();
    }
  }
}

// L8: Overlay — elegant vignette + subtle purple tint
function renderGal_L8_Overlay(ctx) {
  const vig = ctx.createRadialGradient(450, 300, 150, 450, 300, 550);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(0.6, 'rgba(5, 4, 10, 0.15)');
  vig.addColorStop(0.85, 'rgba(5, 4, 10, 0.35)');
  vig.addColorStop(1, 'rgba(3, 2, 8, 0.6)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, 900, 600);
  // Subtle purple tint
  ctx.fillStyle = 'rgba(15, 8, 25, 0.04)';
  ctx.fillRect(0, 0, 900, 600);
}

// ═══════════════ SALA DE SEGURANÇA ═══════════════

function renderSeguranca(ctx, state) {
  renderSeg_L1_Background(ctx);
  renderSeg_L2_Arquitetura(ctx);
  renderSeg_L3_Iluminacao(ctx);
  renderSeg_L4_Detalhes(ctx);
  renderSeg_L5_Decoracao(ctx);
  renderSeg_L6_Objetos(ctx, state);
  renderSeg_L7_Atmosfera(ctx);
  renderSeg_L8_Overlay(ctx);
}

// L1: Background — dark cramped tech room
function renderSeg_L1_Background(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#08070e');
  g.addColorStop(0.5, '#0a0912');
  g.addColorStop(1, '#060510');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 900, 600);
}

// L2: Architecture — cramped tech room, low ceiling feel, metal walls
function renderSeg_L2_Arquitetura(ctx) {
  // Metal wall panels
  ctx.fillStyle = '#0c0b14';
  ctx.fillRect(0, 0, 900, 520);
  // Panel seams (vertical)
  ctx.strokeStyle = 'rgba(26, 21, 37, 0.5)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 6; i++) {
    ctx.beginPath(); ctx.moveTo(i * 150, 0); ctx.lineTo(i * 150, 520); ctx.stroke();
  }
  // Horizontal seam
  ctx.beginPath(); ctx.moveTo(0, 260); ctx.lineTo(900, 260); ctx.stroke();
  // Low ceiling duct
  ctx.fillStyle = '#0a0912';
  ctx.fillRect(0, 0, 900, 25);
  ctx.strokeStyle = '#1a1525';
  ctx.beginPath(); ctx.moveTo(0, 25); ctx.lineTo(900, 25); ctx.stroke();
  // Floor — anti-static dark
  ctx.fillStyle = '#080712';
  ctx.fillRect(0, 520, 900, 80);
  ctx.strokeStyle = '#1a1525';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, 520); ctx.lineTo(900, 520); ctx.stroke();
  ctx.lineWidth = 1;
}

// L3: Lighting — monitor glow (green), status LEDs
function renderSeg_L3_Iluminacao(ctx) {
  // Monitor bank glow
  const glow1 = ctx.createRadialGradient(500, 100, 20, 500, 100, 250);
  glow1.addColorStop(0, 'rgba(76, 175, 80, 0.06)');
  glow1.addColorStop(1, 'transparent');
  ctx.fillStyle = glow1;
  ctx.fillRect(300, 0, 400, 300);
  // Panel glow (red or green)
  const panelColor = 'rgba(255, 26, 26, 0.03)';
  const glow2 = ctx.createRadialGradient(450, 380, 20, 450, 380, 150);
  glow2.addColorStop(0, panelColor);
  glow2.addColorStop(1, 'transparent');
  ctx.fillStyle = glow2;
  ctx.fillRect(300, 280, 300, 220);
  // Ceiling strip LEDs
  ctx.fillStyle = '#4caf50';
  ctx.globalAlpha = 0.15;
  for (let i = 0; i < 8; i++) {
    ctx.fillRect(50 + i * 110, 10, 30, 3);
  }
  ctx.globalAlpha = 1;
}

// L4: Details — cables on floor, scratches, wear
function renderSeg_L4_Detalhes(ctx) {
  for (const c of SEG_CABLES) {
    ctx.strokeStyle = c.c;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(c.x1, c.y1);
    ctx.quadraticCurveTo((c.x1 + c.x2) / 2, c.y1 + 10, c.x2, c.y2);
    ctx.stroke();
  }
  ctx.lineWidth = 1;
  // Scuff marks
  ctx.fillStyle = 'rgba(20, 18, 30, 0.2)';
  ctx.fillRect(200, 535, 40, 3);
  ctx.fillRect(500, 540, 35, 2);
}

// L5: Decoration — clock, rack cabinets, ventilation
function renderSeg_L5_Decoracao(ctx) {
  // Digital clock
  ctx.fillStyle = '#050510';
  ctx.fillRect(720, 35, 100, 30);
  ctx.strokeStyle = '#1a1525';
  ctx.strokeRect(720, 35, 100, 30);
  ctx.fillStyle = '#4caf50';
  ctx.font = '14px "Courier New", monospace';
  ctx.fillText('02:47:33', 730, 55);
  // Server rack silhouettes
  ctx.fillStyle = '#0a0912';
  ctx.fillRect(20, 280, 80, 230);
  ctx.strokeStyle = '#1a1525';
  ctx.strokeRect(20, 280, 80, 230);
  // Rack LEDs
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 3 === 0 ? '#4caf50' : '#ff1a1a';
    ctx.globalAlpha = 0.4;
    ctx.fillRect(30, 295 + i * 26, 5, 3);
    ctx.globalAlpha = 1;
  }
  // Vent grille (top right)
  ctx.fillStyle = '#0a0912';
  ctx.fillRect(830, 40, 50, 40);
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = '#060510';
    ctx.fillRect(835, 44 + i * 8, 40, 4);
  }
}

// L6: Objects — circuit diagram, monitors, sensor panel
function renderSeg_L6_Objetos(ctx, state) {
  // ─── DIAGRAMA DE CIRCUITO (50, 50, 280, 200) ───
  ctx.fillStyle = '#060510';
  ctx.fillRect(55, 55, 270, 190);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 2;
  ctx.strokeRect(55, 55, 270, 190);
  ctx.lineWidth = 1;
  // Title
  ctx.fillStyle = '#e8b84a';
  ctx.font = '11px "Courier New", monospace';
  ctx.fillText('DIAGRAMA DE CIRCUITO', 100, 78);
  ctx.strokeStyle = 'rgba(232, 184, 74, 0.3)';
  ctx.beginPath(); ctx.moveTo(65, 85); ctx.lineTo(315, 85); ctx.stroke();
  // Circuit nodes S1-S4 with connections
  const nodes = [
    {x:120, y:130, label:'S1'},
    {x:240, y:130, label:'S3'},
    {x:240, y:200, label:'S2'},
    {x:120, y:200, label:'S4'}
  ];
  // Connection arrows (S1→S3, S3→S2, S2→S4)
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 1.5;
  // S1 → S3
  ctx.beginPath(); ctx.moveTo(138, 130); ctx.lineTo(220, 130); ctx.stroke();
  drawArrow(ctx, 220, 130, 0);
  // S3 → S2
  ctx.beginPath(); ctx.moveTo(240, 148); ctx.lineTo(240, 182); ctx.stroke();
  drawArrow(ctx, 240, 182, Math.PI / 2);
  // S2 → S4
  ctx.beginPath(); ctx.moveTo(222, 200); ctx.lineTo(138, 200); ctx.stroke();
  drawArrow(ctx, 138, 200, Math.PI);
  ctx.lineWidth = 1;
  // Node circles
  for (const n of nodes) {
    ctx.fillStyle = '#0a0508';
    ctx.beginPath(); ctx.arc(n.x, n.y, 16, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ff1a1a';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(n.x, n.y, 16, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = '#ff1a1a';
    ctx.font = '11px "Courier New", monospace';
    ctx.fillText(n.label, n.x - 8, n.y + 4);
  }
  // Caption
  ctx.fillStyle = 'rgba(212, 207, 192, 0.4)';
  ctx.font = '8px "Courier New", monospace';
  ctx.fillText('S1 alimenta S3', 90, 230);
  ctx.fillText('S3 alimenta S2', 170, 230);
  ctx.fillText('S2 alimenta S4', 90, 240);

  // ─── MONITORES (420, 50, 220, 160) ───
  ctx.fillStyle = '#030308';
  ctx.fillRect(425, 55, 210, 150);
  ctx.strokeStyle = '#2a2035';
  ctx.lineWidth = 2;
  ctx.strokeRect(425, 55, 210, 150);
  ctx.lineWidth = 1;
  // 4 camera feeds
  for (let i = 0; i < 4; i++) {
    const cx = 435 + (i % 2) * 100;
    const cy = 65 + Math.floor(i / 2) * 72;
    ctx.fillStyle = '#061008';
    ctx.fillRect(cx, cy, 90, 62);
    ctx.strokeStyle = '#1a3020';
    ctx.strokeRect(cx, cy, 90, 62);
    ctx.fillStyle = '#4caf50';
    ctx.font = '8px "Courier New", monospace';
    ctx.fillText('CAM' + (i + 1), cx + 4, cy + 12);
    // Scanline effect
    ctx.fillStyle = 'rgba(76, 175, 80, 0.03)';
    const scanY = (Date.now() / 30 + i * 20) % 62;
    ctx.fillRect(cx, cy + scanY, 90, 2);
  }
  // Status text
  const laserStatus = state.get('laserDesativado');
  ctx.fillStyle = laserStatus ? '#4caf50' : '#ff1a1a';
  ctx.font = '10px "Courier New", monospace';
  ctx.fillText(laserStatus ? '● LASERS: OFFLINE' : '● LASERS: ATIVOS', 455, 195);

  // ─── PAINEL DE SENSORES (380, 310, 220, 150) ───
  ctx.fillStyle = '#080712';
  ctx.fillRect(385, 315, 210, 140);
  const panelBorder = state.get('laserDesativado') ? '#4caf50' : '#ff1a1a';
  ctx.strokeStyle = panelBorder;
  ctx.lineWidth = 2;
  ctx.strokeRect(385, 315, 210, 140);
  ctx.lineWidth = 1;
  // Title
  ctx.fillStyle = '#d4cfc0';
  ctx.font = '11px "Courier New", monospace';
  ctx.fillText('PAINEL DE SENSORES', 415, 340);
  // Sensor LEDs
  const sNames = ['sensor1','sensor2','sensor3','sensor4'];
  for (let i = 0; i < 4; i++) {
    const sx = 415 + i * 48;
    const active = state.get(sNames[i]);
    ctx.fillStyle = active ? '#4caf50' : '#ff1a1a';
    ctx.beginPath(); ctx.arc(sx, 380, 10, 0, Math.PI * 2); ctx.fill();
    // Glow
    ctx.fillStyle = active ? 'rgba(76,175,80,0.2)' : 'rgba(255,26,26,0.2)';
    ctx.beginPath(); ctx.arc(sx, 380, 16, 0, Math.PI * 2); ctx.fill();
    // Label
    ctx.fillStyle = '#d4cfc0';
    ctx.font = '9px "Courier New", monospace';
    ctx.fillText('S' + (i+1), sx - 6, 405);
  }
  // Status bar
  ctx.fillStyle = '#060510';
  ctx.fillRect(395, 420, 190, 20);
  ctx.fillStyle = state.get('laserDesativado') ? '#4caf50' : '#ff1a1a';
  ctx.font = '9px "Courier New", monospace';
  ctx.fillText(state.get('laserDesativado') ? 'STATUS: TODOS OFF' : 'STATUS: SEGURANÇA ATIVA', 405, 434);

  // ─── VOLTAR GALERIA (30, 530, 140, 45) ───
  ctx.fillStyle = '#0c0b14';
  ctx.fillRect(35, 535, 130, 40);
  ctx.strokeStyle = '#2a2035';
  ctx.strokeRect(35, 535, 130, 40);
  ctx.fillStyle = '#d4cfc0';
  ctx.font = '11px Georgia';
  ctx.fillText('← Galeria', 62, 560);
}

function drawArrow(ctx, x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = '#e8b84a';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-8, -4);
  ctx.lineTo(-8, 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// L7: Atmosphere — monitor flicker, subtle electromagnetic hum visual
function renderSeg_L7_Atmosfera(ctx) {
  // Faint green scan across screens
  ctx.fillStyle = 'rgba(76, 175, 80, 0.01)';
  ctx.fillRect(400, 50, 250, 180);
  // Electromagnetic interference lines
  ctx.strokeStyle = 'rgba(76, 175, 80, 0.03)';
  ctx.lineWidth = 0.5;
  const ht = (Date.now() / 50) % 600;
  ctx.beginPath(); ctx.moveTo(0, ht); ctx.lineTo(900, ht); ctx.stroke();
  ctx.lineWidth = 1;
}

// L8: Overlay
function renderSeg_L8_Overlay(ctx) {
  const vig = ctx.createRadialGradient(450, 300, 100, 450, 300, 500);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(0.6, 'rgba(4, 3, 10, 0.2)');
  vig.addColorStop(1, 'rgba(3, 2, 8, 0.65)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, 900, 600);
  // Tech tint
  ctx.fillStyle = 'rgba(5, 10, 5, 0.03)';
  ctx.fillRect(0, 0, 900, 600);
}

// ═══════════════ ALA EGÍPCIA ═══════════════

function renderEgipcia(ctx, state) {
  renderEgp_L1_Background(ctx);
  renderEgp_L2_Arquitetura(ctx);
  renderEgp_L3_Iluminacao(ctx);
  renderEgp_L4_Detalhes(ctx);
  renderEgp_L5_Decoracao(ctx);
  renderEgp_L6_Objetos(ctx, state);
  renderEgp_L7_Atmosfera(ctx);
  renderEgp_L8_Overlay(ctx);
}

// L1: Background — warm dark tones
function renderEgp_L1_Background(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#0a0806');
  g.addColorStop(0.4, '#0c0a07');
  g.addColorStop(0.8, '#0e0c08');
  g.addColorStop(1, '#080604');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 900, 600);
}

// L2: Architecture — sand-colored stone blocks, Egyptian columns, torch alcoves
function renderEgp_L2_Arquitetura(ctx) {
  // Stone walls
  ctx.fillStyle = '#120e08';
  ctx.fillRect(0, 0, 900, 490);
  // Stone blocks
  ctx.strokeStyle = 'rgba(26, 22, 10, 0.35)';
  ctx.lineWidth = 0.5;
  for (const b of EGP_BLOCKS) {
    ctx.strokeRect(b.x, b.y, b.w, b.h);
  }
  ctx.lineWidth = 1;
  // Stone floor
  const flG = ctx.createLinearGradient(0, 490, 0, 600);
  flG.addColorStop(0, '#100c06');
  flG.addColorStop(1, '#080604');
  ctx.fillStyle = flG;
  ctx.fillRect(0, 490, 900, 110);
  // Floor border
  ctx.strokeStyle = '#1a1608';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 490); ctx.lineTo(900, 490); ctx.stroke();
  ctx.lineWidth = 1;
  // Egyptian columns — lotus style
  drawEgyptColumn(ctx, 275, 40, 30, 448);
  drawEgyptColumn(ctx, 595, 40, 30, 448);
  // Ceiling lintel with hieroglyphic band
  ctx.fillStyle = '#1a1608';
  ctx.fillRect(0, 0, 900, 18);
  ctx.fillStyle = 'rgba(232, 184, 74, 0.06)';
  ctx.fillRect(0, 16, 900, 2);
}

function drawEgyptColumn(ctx, x, y, w, h) {
  // Base — wider
  ctx.fillStyle = '#1a1608';
  ctx.fillRect(x - 8, y + h - 20, w + 16, 20);
  // Shaft
  const cg = ctx.createLinearGradient(x, 0, x + w, 0);
  cg.addColorStop(0, '#141008');
  cg.addColorStop(0.5, '#1a1608');
  cg.addColorStop(1, '#141008');
  ctx.fillStyle = cg;
  ctx.fillRect(x, y + 20, w, h - 40);
  // Lotus capital
  ctx.fillStyle = '#2a2010';
  ctx.beginPath();
  ctx.moveTo(x - 10, y + 20);
  ctx.lineTo(x + w + 10, y + 20);
  ctx.lineTo(x + w + 5, y);
  ctx.lineTo(x - 5, y);
  ctx.closePath();
  ctx.fill();
  // Gold trim
  ctx.fillStyle = 'rgba(232, 184, 74, 0.1)';
  ctx.fillRect(x - 10, y + 18, w + 20, 2);
}

// L3: Lighting — torches (flickering warm), UV glow on artifacts
function renderEgp_L3_Iluminacao(ctx) {
  const flicker = 0.7 + 0.3 * Math.sin(Date.now() / 250);
  const flicker2 = 0.7 + 0.3 * Math.sin(Date.now() / 300 + 1.5);
  // Left torch glow
  const t1 = ctx.createRadialGradient(55, 200, 5, 55, 200, 140);
  t1.addColorStop(0, `rgba(232, 150, 50, ${0.1 * flicker})`);
  t1.addColorStop(0.5, `rgba(232, 150, 50, ${0.03 * flicker})`);
  t1.addColorStop(1, 'transparent');
  ctx.fillStyle = t1;
  ctx.fillRect(0, 80, 200, 300);
  // Right torch glow
  const t2 = ctx.createRadialGradient(845, 200, 5, 845, 200, 140);
  t2.addColorStop(0, `rgba(232, 150, 50, ${0.1 * flicker2})`);
  t2.addColorStop(0.5, `rgba(232, 150, 50, ${0.03 * flicker2})`);
  t2.addColorStop(1, 'transparent');
  ctx.fillStyle = t2;
  ctx.fillRect(700, 80, 200, 300);
  // UV glow on sarcophagus
  const uv = ctx.createRadialGradient(155, 220, 10, 155, 220, 100);
  uv.addColorStop(0, 'rgba(100, 50, 200, 0.04)');
  uv.addColorStop(1, 'transparent');
  ctx.fillStyle = uv;
  ctx.fillRect(50, 120, 210, 260);
}

// L4: Details — cracks in stone, sand accumulation, age marks
function renderEgp_L4_Detalhes(ctx) {
  // Cracks
  ctx.strokeStyle = 'rgba(30, 25, 10, 0.25)';
  ctx.lineWidth = 0.7;
  ctx.beginPath(); ctx.moveTo(200, 80); ctx.lineTo(210, 120); ctx.lineTo(205, 140); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(500, 60); ctx.lineTo(510, 100); ctx.lineTo(505, 120); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(750, 90); ctx.lineTo(755, 130); ctx.lineTo(748, 145); ctx.stroke();
  ctx.lineWidth = 1;
  // Sand accumulation at floor edges
  ctx.fillStyle = 'rgba(50, 42, 20, 0.08)';
  ctx.beginPath(); ctx.ellipse(450, 510, 250, 15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(50, 42, 20, 0.05)';
  ctx.beginPath(); ctx.ellipse(100, 500, 80, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(800, 500, 80, 8, 0, 0, Math.PI * 2); ctx.fill();
}

// L5: Decoration — torch brackets, hieroglyphic friezes, non-interactive urns
function renderEgp_L5_Decoracao(ctx) {
  // Torch brackets
  ctx.fillStyle = '#2a1a08';
  ctx.fillRect(45, 160, 18, 80);
  ctx.fillRect(837, 160, 18, 80);
  // Flames
  const fl = 0.8 + 0.2 * Math.sin(Date.now() / 200);
  ctx.fillStyle = `rgba(232, 160, 50, ${fl})`;
  ctx.beginPath(); ctx.ellipse(54, 152, 7, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(846, 152, 7, 12, 0, 0, Math.PI * 2); ctx.fill();
  // Outer flame glow
  ctx.fillStyle = `rgba(255, 200, 50, ${fl * 0.3})`;
  ctx.beginPath(); ctx.ellipse(54, 150, 10, 16, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(846, 150, 10, 16, 0, 0, Math.PI * 2); ctx.fill();

  // Decorative hieroglyphic frieze on lintel
  ctx.fillStyle = 'rgba(232, 184, 74, 0.12)';
  ctx.font = '12px serif';
  ctx.fillText('\u{13000} \u{1309B} \u{130AD} \u{131CB} \u{1335D}', 350, 13);

  // Decorative urns
  ctx.fillStyle = '#1a1408';
  ctx.beginPath();
  ctx.moveTo(460, 490); ctx.lineTo(450, 460); ctx.lineTo(470, 445);
  ctx.lineTo(490, 445); ctx.lineTo(510, 460); ctx.lineTo(500, 490);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#2a2010';
  ctx.stroke();
}

// L6: Objects — sarcophagus with gold, hieroglyphs panel, color mural, override terminal
function renderEgp_L6_Objetos(ctx, state) {
  // ─── SARCÓFAGO (70, 100, 170, 280) ───
  const sarcG = ctx.createLinearGradient(70, 100, 240, 100);
  sarcG.addColorStop(0, '#1a1408');
  sarcG.addColorStop(0.3, '#2a2010');
  sarcG.addColorStop(0.7, '#2a2010');
  sarcG.addColorStop(1, '#1a1408');
  ctx.fillStyle = sarcG;
  // Sarcophagus shape (tapered)
  ctx.beginPath();
  ctx.moveTo(100, 105); ctx.lineTo(210, 105);
  ctx.lineTo(220, 375); ctx.lineTo(90, 375);
  ctx.closePath();
  ctx.fill();
  // Gold border
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(100, 105); ctx.lineTo(210, 105);
  ctx.lineTo(220, 375); ctx.lineTo(90, 375);
  ctx.closePath();
  ctx.stroke();
  ctx.lineWidth = 1;
  // Face mask area
  ctx.fillStyle = 'rgba(232, 184, 74, 0.15)';
  ctx.beginPath(); ctx.ellipse(155, 165, 28, 38, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(232, 184, 74, 0.5)';
  ctx.beginPath(); ctx.ellipse(155, 165, 28, 38, 0, 0, Math.PI * 2); ctx.stroke();
  // Eyes (kohl-lined)
  ctx.fillStyle = '#e8b84a';
  ctx.beginPath(); ctx.ellipse(143, 160, 6, 3, -0.1, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(167, 160, 6, 3, 0.1, 0, Math.PI * 2); ctx.fill();
  // Nemes headdress lines
  ctx.strokeStyle = 'rgba(232, 184, 74, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(127, 130); ctx.lineTo(127, 200); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(183, 130); ctx.lineTo(183, 200); ctx.stroke();
  // Chest decorations
  ctx.strokeStyle = 'rgba(232, 184, 74, 0.2)';
  for (let i = 0; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(110, 220 + i * 30); ctx.lineTo(200, 220 + i * 30); ctx.stroke();
  }
  // Gold shimmer
  ctx.fillStyle = 'rgba(232, 184, 74, 0.03)';
  ctx.fillRect(85, 100, 140, 280);

  // ─── HIERÓGLIFOS (340, 70, 220, 200) ───
  ctx.fillStyle = '#100c06';
  ctx.fillRect(345, 75, 210, 190);
  ctx.strokeStyle = '#2a2010';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(345, 75, 210, 190);
  ctx.lineWidth = 1;
  // Border detail
  ctx.strokeStyle = 'rgba(232, 184, 74, 0.15)';
  ctx.strokeRect(350, 80, 200, 180);
  // Hieroglyphic text
  ctx.fillStyle = 'rgba(232, 184, 74, 0.6)';
  ctx.font = '20px serif';
  ctx.fillText('\u{13080} \u{1308B} \u{13000}', 370, 120);
  ctx.fillText('\u{131CB} \u{13216} \u{132AA}', 370, 155);
  ctx.fillText('\u{13319} \u{1339C} \u{1340E}', 370, 190);
  // Interpretive text (the hint about colors)
  ctx.fillStyle = '#e8b84a';
  ctx.font = '9px Georgia';
  ctx.fillText('"Primeiro o sol nasce,', 365, 230);
  ctx.fillText('depois o Nilo flui,', 370, 243);
  ctx.fillText('e o fogo consome."', 375, 256);

  // ─── MURAL DE CORES (640, 90, 170, 180) ───
  ctx.fillStyle = '#100c06';
  ctx.fillRect(645, 95, 160, 170);
  ctx.strokeStyle = '#2a2010';
  ctx.strokeRect(645, 95, 160, 170);
  // Three ritual circles
  ctx.fillStyle = '#e8b84a';
  ctx.beginPath(); ctx.arc(690, 175, 20, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(232, 184, 74, 0.2)';
  ctx.beginPath(); ctx.arc(690, 175, 26, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#1565c0';
  ctx.beginPath(); ctx.arc(725, 175, 20, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(21, 101, 192, 0.2)';
  ctx.beginPath(); ctx.arc(725, 175, 26, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#c62828';
  ctx.beginPath(); ctx.arc(760, 175, 20, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(198, 40, 40, 0.2)';
  ctx.beginPath(); ctx.arc(760, 175, 26, 0, Math.PI * 2); ctx.fill();

  // Labels
  ctx.fillStyle = 'rgba(212, 207, 192, 0.5)';
  ctx.font = '8px Georgia';
  ctx.fillText('Sol', 683, 210);
  ctx.fillText('Nilo', 716, 210);
  ctx.fillText('Fogo', 750, 210);
  // Scarab symbol
  ctx.fillStyle = 'rgba(232, 184, 74, 0.5)';
  ctx.font = '22px serif';
  ctx.fillText('\u{130A3}', 713, 250);

  // ─── TERMINAL OVERRIDE (340, 380, 220, 130) ───
  ctx.fillStyle = '#080806';
  ctx.fillRect(345, 385, 210, 120);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 2;
  ctx.strokeRect(345, 385, 210, 120);
  ctx.lineWidth = 1;
  // Screen area
  ctx.fillStyle = '#0a0a08';
  ctx.fillRect(355, 395, 190, 50);
  ctx.strokeStyle = 'rgba(232, 184, 74, 0.3)';
  ctx.strokeRect(355, 395, 190, 50);
  // Title
  ctx.fillStyle = '#e8b84a';
  ctx.font = '10px "Courier New", monospace';
  ctx.fillText('TERMINAL OVERRIDE', 385, 415);
  // Blinking cursor
  const blink = Math.sin(Date.now() / 400) > 0;
  if (blink) {
    ctx.fillStyle = '#e8b84a';
    ctx.fillRect(365, 430, 8, 12);
  }
  // Keyboard area
  ctx.fillStyle = '#0c0a06';
  ctx.fillRect(355, 455, 190, 40);
  ctx.strokeStyle = 'rgba(42, 32, 16, 0.5)';
  ctx.strokeRect(355, 455, 190, 40);
  // Key outlines
  for (let i = 0; i < 10; i++) {
    ctx.strokeStyle = 'rgba(232, 184, 74, 0.15)';
    ctx.strokeRect(360 + i * 18, 460, 15, 12);
  }
  for (let i = 0; i < 9; i++) {
    ctx.strokeRect(365 + i * 18, 476, 15, 12);
  }

  // ─── VOLTAR GALERIA (25, 530, 140, 45) ───
  ctx.fillStyle = '#0c0a06';
  ctx.fillRect(30, 535, 130, 40);
  ctx.strokeStyle = '#2a2010';
  ctx.strokeRect(30, 535, 130, 40);
  ctx.fillStyle = '#d4cfc0';
  ctx.font = '11px Georgia';
  ctx.fillText('\u2190 Galeria', 55, 560);
}

// L7: Atmosphere — golden dust motes, warm air shimmer
function renderEgp_L7_Atmosfera(ctx) {
  // Golden dust particles floating
  const now = Date.now() / 1000;
  ctx.fillStyle = 'rgba(232, 184, 74, 0.15)';
  for (let i = 0; i < 15; i++) {
    const x = 100 + i * 55 + Math.sin(now * 0.5 + i) * 20;
    const y = 100 + Math.sin(now * 0.3 + i * 0.7) * 150 + 100;
    const size = 0.8 + Math.sin(now + i * 2) * 0.4;
    ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
  }
  // Warm air shimmer (very subtle horizontal distortion suggestion)
  ctx.fillStyle = 'rgba(232, 150, 50, 0.008)';
  const shimY = 200 + Math.sin(now * 0.8) * 50;
  ctx.fillRect(0, shimY, 900, 30);
}

// L8: Overlay — vignette + golden tint
function renderEgp_L8_Overlay(ctx) {
  const vig = ctx.createRadialGradient(450, 300, 120, 450, 300, 520);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(0.6, 'rgba(8, 6, 3, 0.2)');
  vig.addColorStop(0.85, 'rgba(6, 4, 2, 0.4)');
  vig.addColorStop(1, 'rgba(4, 3, 1, 0.65)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, 900, 600);
  // Golden tint
  ctx.fillStyle = 'rgba(25, 18, 5, 0.05)';
  ctx.fillRect(0, 0, 900, 600);
}

// ═══════════════ TABELA DE POSIÇÕES ═══════════════
/*
 * Ambiente GALERIA PRINCIPAL:
 *   quadroModerno:    (65, 100, 180, 220)
 *   quadroClassico:   (365, 100, 170, 220)
 *   escultura:        (670, 120, 120, 240)   [blockedBy: laser]
 *   placaInfo:        (300, 400, 180, 55)
 *   portaSeguranca:   (740, 370, 130, 160)
 *   corredorEgipcio:  (20, 380, 140, 145)
 *
 * Ambiente SALA DE SEGURANÇA:
 *   diagramaCircuito: (50, 50, 280, 200)
 *   monitorCams:      (420, 50, 220, 160)
 *   painelSensores:   (380, 310, 220, 150)
 *   voltarGaleria:    (30, 530, 140, 45)
 *
 * Ambiente ALA EGÍPCIA:
 *   sarcofago:        (70, 100, 170, 280)
 *   hieroglifos:      (340, 70, 220, 200)
 *   muralCores:       (640, 90, 170, 180)
 *   terminalOverride: (340, 380, 220, 130)
 *   voltarGaleriaEg:  (25, 530, 140, 45)
 */
