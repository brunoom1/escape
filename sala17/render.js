/**
 * @module Sala17Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 17 — Sanatório Santa Clara
 * Padrão: 8 camadas por ambiente
 * Estilo: Asylum — verde hospitalar desbotado, decadência, suspense psicológico
 */

// Pre-calculated constants (NO Math.random() in render loop — projeto lesson #2)
const S17_WATER_SPOTS = [
  {x:60,y:30,w:80,h:40},{x:400,y:20,w:120,h:50},{x:780,y:35,w:60,h:35},
  {x:250,y:380,w:70,h:30},{x:650,y:400,w:90,h:25}
];
const S17_CRACKS = [
  {x1:100,y:200,x2:120,y:280},{x1:500,y:150,x2:510,y:230},
  {x1:700,y:300,x2:720,y:390},{x1:350,y:100,x2:360,y:180}
];
const S17_TILES = [
  {x:20,y:440,w:72,h:55},{x:100,y:448,w:68,h:52},{x:180,y:442,w:75,h:54},
  {x:270,y:450,w:68,h:50},{x:350,y:440,w:72,h:55},{x:440,y:448,w:65,h:52},
  {x:520,y:443,w:78,h:54},{x:610,y:450,w:70,h:50},{x:695,y:445,w:68,h:55},
  {x:775,y:450,w:74,h:50}
];

const S17_PIPE_SEGMENTS = [
  {x:40,y:0,w:8,h:90},{x:40,y:100,w:60,h:8},{x:92,y:100,w:8,h:140},
  {x:92,y:240,w:70,h:8},{x:154,y:240,w:8,h:120}
];

// ==================== RECEPÇÃO — Ambiente 1 ====================

function renderRecepcao(ctx, state) {
  renderRec_bg(ctx);
  renderRec_arquitetura(ctx);
  renderRec_iluminacao(ctx);
  renderRec_detalhes(ctx);
  renderRec_decoracao(ctx);
  renderRec_objetos(ctx, state);
  renderRec_atmosfera(ctx);
  renderRec_overlay(ctx);
}

function renderRec_bg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#0a0e0c');
  g.addColorStop(0.3, '#0e1412');
  g.addColorStop(0.7, '#0c1210');
  g.addColorStop(1, '#080c0a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 900, 600);
}

function renderRec_arquitetura(ctx) {
  const wall = ctx.createLinearGradient(0, 0, 0, 440);
  wall.addColorStop(0, '#121a16');
  wall.addColorStop(1, '#0a100e');
  ctx.fillStyle = wall;
  ctx.fillRect(0, 0, 900, 440);
  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();

  const floor = ctx.createLinearGradient(0, 440, 0, 600);
  floor.addColorStop(0, '#121a14');
  floor.addColorStop(0.4, '#0e1410');
  floor.addColorStop(1, '#080c0a');
  ctx.fillStyle = floor;
  ctx.fillRect(0, 440, 900, 160);

  ctx.strokeStyle = '#1a3020';
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath(); ctx.moveTo(i * 78, 440); ctx.lineTo(i * 78 - 10, 600); ctx.stroke();
  }
  for (const t of S17_TILES) {
    ctx.strokeStyle = '#15251a';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(t.x, t.y, t.w, t.h);
  }

  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(0, 20); ctx.lineTo(900, 20); ctx.stroke();
  ctx.strokeStyle = '#2a4a32';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 17); ctx.lineTo(900, 17); ctx.stroke();
}

function renderRec_iluminacao(ctx) {
  const flicker = Math.sin(Date.now() / 500) * 0.12 + 0.88;
  const glow = ctx.createRadialGradient(450, 25, 5, 450, 25, 280);
  glow.addColorStop(0, `rgba(91, 191, 138, ${0.05 * flicker})`);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(180, 0, 540, 320);
  ctx.fillStyle = `rgba(91, 191, 138, ${0.025 * flicker})`;
  ctx.fillRect(350, 22, 200, 4);
}

function renderRec_detalhes(ctx) {
  for (const w of S17_WATER_SPOTS) {
    ctx.fillStyle = 'rgba(60, 80, 60, 0.15)';
    ctx.beginPath(); ctx.ellipse(w.x + w.w/2, w.y + w.h/2, w.w/2, w.h/2, 0.1, 0, Math.PI*2); ctx.fill();
  }
  for (const c of S17_CRACKS) {
    ctx.strokeStyle = 'rgba(30, 50, 35, 0.3)';
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(c.x1, c.y1); ctx.lineTo(c.x2, c.y2); ctx.stroke();
  }
  ctx.fillStyle = 'rgba(60, 80, 60, 0.08)';
  ctx.fillRect(0, 438, 900, 3);
}

function renderRec_decoracao(ctx) {
  ctx.fillStyle = '#1a2a1e';
  ctx.fillRect(0, 441, 900, 2);
  ctx.fillStyle = '#121a14';
  ctx.fillRect(540, 440, 70, 55);
  ctx.fillStyle = '#1a2a1e';
  ctx.fillRect(545, 435, 60, 10);
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.arc(555, 498, 3, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(595, 498, 3, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#0e1a12';
  ctx.fillRect(0, 0, 900, 14);
  ctx.fillStyle = '#121a14';
  ctx.beginPath(); ctx.arc(600, 35, 14, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#2a4a32';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(600, 35, 14, 0, Math.PI*2); ctx.stroke();
  ctx.strokeStyle = '#5bbf8a';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(600, 35); ctx.lineTo(600, 23); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 35); ctx.lineTo(612, 39); ctx.stroke();
}

function renderRec_objetos(ctx, state) {
  // --- PORTA PRINCIPAL (810,100, 75,340) ---
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(810, 100, 75, 340);
  ctx.strokeStyle = '#2a4a32';
  ctx.lineWidth = 3;
  ctx.strokeRect(810, 100, 75, 340);
  ctx.strokeStyle = '#3a5a42';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(818, 115, 59, 150);
  ctx.strokeRect(818, 280, 59, 150);
  ctx.fillStyle = '#5bbf8a';
  ctx.beginPath(); ctx.arc(825, 260, 5, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = state.get('cofreAberto') ? '#00ff88' : '#3a7a52';
  ctx.beginPath(); ctx.arc(825, 260, 2.5, 0, Math.PI*2); ctx.fill();

  // --- QUADRO DR. MORETTI (340,40, 220,170) ---
  ctx.fillStyle = '#1a2218';
  ctx.fillRect(340, 40, 220, 170);
  const qGrad = ctx.createLinearGradient(345, 45, 345, 205);
  qGrad.addColorStop(0, '#1a2a1e');
  qGrad.addColorStop(1, '#0e1a12');
  ctx.fillStyle = qGrad;
  ctx.fillRect(345, 45, 210, 160);
  ctx.strokeStyle = '#3a6a4a';
  ctx.lineWidth = 4;
  ctx.strokeRect(340, 40, 220, 170);
  ctx.fillStyle = '#d4c9a8';
  ctx.fillRect(400, 65, 90, 100);
  ctx.strokeStyle = '#8b7a5a';
  ctx.strokeRect(400, 65, 90, 100);
  ctx.fillStyle = '#2a1a10';
  ctx.beginPath(); ctx.arc(445, 110, 25, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#4a3a2a';
  ctx.beginPath(); ctx.arc(445, 110, 25, 0, Math.PI*2); ctx.stroke();
  ctx.fillStyle = '#e0d0b0';
  ctx.beginPath(); ctx.arc(443, 108, 5, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#5a3a2a';
  ctx.fillRect(440, 130, 10, 30);
  ctx.fillStyle = '#c9a84c';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText('DR. H. MORETTI', 375, 185);
  ctx.fillStyle = '#8b7a5a';
  ctx.font = '9px Courier New';
  ctx.fillText('FUNDADOR', 395, 200);
  if (state.get('quadroVisto')) {
    ctx.fillStyle = 'rgba(91, 191, 138, 0.25)';
    ctx.beginPath(); ctx.arc(212, 168, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5bbf8a';
    ctx.font = 'bold 9px Courier New';
    ctx.fillText('\u2713', 209, 171);
  }

  // --- ARQUIVO MORTO (90,260, 120,160) ---
  ctx.fillStyle = '#121a14';
  ctx.fillRect(90, 260, 120, 160);
  ctx.strokeStyle = '#2a4a32';
  ctx.lineWidth = 2;
  ctx.strokeRect(90, 260, 120, 160);
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = '#1a2a1e';
    ctx.fillRect(100, 270 + i * 33, 100, 28);
    ctx.strokeStyle = '#2a3a2a';
    ctx.strokeRect(100, 270 + i * 33, 100, 28);
  }
  ctx.fillStyle = '#5bbf8a';
  ctx.font = '9px Courier New';
  ctx.fillText('INCIDENTE 1994', 103, 288);
  if (state.get('arquivoVisto')) {
    ctx.fillStyle = 'rgba(91, 191, 138, 0.25)';
    ctx.beginPath(); ctx.arc(188, 178, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5bbf8a';
    ctx.font = 'bold 9px Courier New';
    ctx.fillText('\u2713', 185, 181);
  }

  // --- GAVETA DA RECEPÇÃO (230,370, 95,55) ---
  ctx.fillStyle = '#121a14';
  ctx.fillRect(230, 370, 95, 55);
  const gavetaAberta = state.get('gavetaAberta');
  ctx.strokeStyle = gavetaAberta ? '#5bbf8a' : '#2a4a32';
  ctx.lineWidth = 2;
  ctx.strokeRect(230, 370, 95, 55);
  if (gavetaAberta) {
    ctx.fillStyle = '#1a2a1e';
    ctx.fillRect(230, 370, 95, 55);
    ctx.fillStyle = '#121a14';
    ctx.fillRect(233, 373, 89, 40);
    ctx.strokeStyle = '#5bbf8a';
    ctx.strokeRect(233, 373, 89, 40);
  }
  ctx.fillStyle = '#3a6a4a';
  ctx.fillRect(265, 395, 25, 4);

  // --- CARTA DA ENFª LÚCIA (620,350, 80,70) ---
  if (!state.get('cartaLuciaLida')) {
    ctx.fillStyle = '#1a2218';
    ctx.fillRect(620, 350, 80, 70);
    ctx.strokeStyle = '#2a4a32';
    ctx.lineWidth = 2;
    ctx.strokeRect(620, 350, 80, 70);
    ctx.fillStyle = '#e8d8b8';
    ctx.fillRect(630, 355, 60, 40);
    ctx.strokeStyle = '#8b7a5a';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(630, 355, 60, 40);
    ctx.fillStyle = '#8b7a5a';
    ctx.font = '8px Courier New';
    ctx.fillText('Confidencial', 633, 370);
    ctx.fillText('L. Vargas', 638, 385);
  } else {
    ctx.fillStyle = '#121a14';
    ctx.fillRect(620, 350, 80, 70);
    ctx.fillStyle = 'rgba(91, 191, 138, 0.25)';
    ctx.beginPath(); ctx.arc(636, 356, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5bbf8a';
    ctx.font = 'bold 9px Courier New';
    ctx.fillText('\u2713', 633, 359);
  }

  // --- PORTA ENFERMARIA (40,370, 60,140) ---
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(40, 370, 60, 140);
  ctx.strokeStyle = state.get('chaveEnfermaria') ? '#5bbf8a' : '#2a4a32';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 370, 60, 140);
  ctx.fillStyle = '#3a6a4a';
  ctx.font = '8px Courier New';
  ctx.fillText('ENFER-', 48, 450);
  ctx.fillText('MARIA', 48, 462);
  ctx.fillStyle = state.get('chaveEnfermaria') ? '#00ff88' : '#aa4444';
  ctx.beginPath(); ctx.arc(68, 390, 4, 0, Math.PI*2); ctx.fill();
}

function renderRec_atmosfera(ctx) {
  ctx.save();
  ctx.globalAlpha = 0.025;
  ctx.fillStyle = '#5bbf8a';
  ctx.beginPath();
  ctx.moveTo(450, 10);
  ctx.lineTo(150, 440);
  ctx.lineTo(650, 440);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function renderRec_overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 540);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(5, 12, 10, 0.2)');
  vignette.addColorStop(1, 'rgba(5, 12, 10, 0.55)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(10, 30, 20, 0.05)';
  ctx.fillRect(0, 0, 900, 600);
}

// ==================== ENFERMARIA — Ambiente 2 ====================

function renderEnfermaria(ctx, state) {
  renderEnf_bg(ctx);
  renderEnf_arquitetura(ctx);
  renderEnf_iluminacao(ctx);
  renderEnf_detalhes(ctx);
  renderEnf_decoracao(ctx);
  renderEnf_objetos(ctx, state);
  renderEnf_atmosfera(ctx);
  renderEnf_overlay(ctx);
}

function renderEnf_bg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#0c1412');
  g.addColorStop(0.3, '#0e1814');
  g.addColorStop(0.6, '#0a1210');
  g.addColorStop(1, '#060c0a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 900, 600);
}

function renderEnf_arquitetura(ctx) {
  const wall = ctx.createLinearGradient(0, 0, 0, 420);
  wall.addColorStop(0, '#141e18');
  wall.addColorStop(0.5, '#0e1812');
  wall.addColorStop(1, '#0a120e');
  ctx.fillStyle = wall;
  ctx.fillRect(0, 0, 900, 420);
  ctx.strokeStyle = '#1a3020';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 420); ctx.lineTo(900, 420); ctx.stroke();

  const floor = ctx.createLinearGradient(0, 420, 0, 600);
  floor.addColorStop(0, '#101a14');
  floor.addColorStop(1, '#080c0a');
  ctx.fillStyle = floor;
  ctx.fillRect(0, 420, 900, 180);

  ctx.strokeStyle = '#15251a';
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath(); ctx.moveTo(i * 78, 420); ctx.lineTo(i * 78 - 5, 600); ctx.stroke();
  }
  for (let i = 0; i < 7; i++) {
    ctx.strokeStyle = '#1a2a1e';
    ctx.beginPath(); ctx.moveTo(i * 140 + 70, 0); ctx.lineTo(i * 140 + 70, 420); ctx.stroke();
  }

  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(900, 22); ctx.stroke();
}

function renderEnf_iluminacao(ctx) {
  const pulse = Math.sin(Date.now() / 700) * 0.1 + 0.9;
  const glow = ctx.createRadialGradient(450, 22, 5, 450, 22, 200);
  glow.addColorStop(0, `rgba(91, 191, 138, ${0.04 * pulse})`);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(200, 0, 500, 250);
}

function renderEnf_detalhes(ctx) {
  ctx.fillStyle = 'rgba(50, 70, 50, 0.1)';
  ctx.beginPath(); ctx.ellipse(200, 440, 35, 12, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(650, 450, 40, 10, 0.2, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = 'rgba(30, 48, 35, 0.25)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(280, 100); ctx.lineTo(285, 200); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 50); ctx.lineTo(608, 140); ctx.stroke();
  for (const seg of S17_PIPE_SEGMENTS) {
    ctx.fillStyle = '#0e1410';
    ctx.fillRect(seg.x, seg.y, seg.w, seg.h);
  }
}

function renderEnf_decoracao(ctx) {
  for (let i = 0; i < 4; i++) {
    const bx = 160 + i * 170;
    ctx.fillStyle = '#0e1410';
    ctx.fillRect(bx, 40, 80, 140);
    ctx.strokeStyle = '#1a3020';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bx, 40, 80, 140);
    ctx.fillStyle = '#121a14';
    ctx.fillRect(bx + 5, 45, 70, 25);
    ctx.fillStyle = '#8b7a5a';
    ctx.font = '7px Courier New';
    ctx.fillText('LEITO ' + (i + 1), bx + 12, 61);
  }
  ctx.fillStyle = '#0e1812';
  ctx.fillRect(20, 40, 120, 140);
  ctx.strokeStyle = '#1a3020';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(20, 40, 120, 140);
  ctx.fillStyle = '#5bbf8a';
  ctx.font = '8px Courier New';
  ctx.fillText('ALA B', 55, 120);
  ctx.fillText('QUARTOS', 48, 135);
  ctx.fillText('301-315', 50, 150);
}

function renderEnf_objetos(ctx, state) {
  // --- LEITO COM PRONTUÁRIO (180,100, 80,120) ---
  ctx.fillStyle = '#121a14';
  ctx.fillRect(180, 100, 80, 120);
  ctx.strokeStyle = state.get('prontuarioVisto') ? '#5bbf8a' : '#1a3a2a';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(180, 100, 80, 120);
  ctx.fillStyle = '#1a2a1e';
  ctx.fillRect(185, 105, 70, 110);
  if (!state.get('prontuarioVisto')) {
    ctx.fillStyle = '#e8d8b8';
    ctx.fillRect(200, 130, 40, 55);
    ctx.strokeStyle = '#8b7a5a';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(200, 130, 40, 55);
    ctx.fillStyle = '#5a3a2a';
    ctx.font = '7px Courier New';
    ctx.fillText('J. Ribeiro', 203, 155);
  } else {
    ctx.fillStyle = 'rgba(91, 191, 138, 0.25)';
    ctx.beginPath(); ctx.arc(238, 134, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5bbf8a';
    ctx.font = 'bold 9px Courier New';
    ctx.fillText('\u2713', 235, 137);
  }

  // --- DIÁRIO DE EXPERIMENTOS (430,80, 80,120) ---
  if (!state.get('diarioVisto')) {
    ctx.fillStyle = '#121a14';
    ctx.fillRect(430, 80, 80, 120);
    ctx.strokeStyle = '#1a3a2a';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(430, 80, 80, 120);
    ctx.fillStyle = '#1a2a1e';
    ctx.fillRect(435, 85, 70, 110);
    ctx.fillStyle = '#3a2a1a';
    ctx.fillRect(445, 100, 50, 65);
    ctx.strokeStyle = '#6a4a2a';
    ctx.lineWidth = 1;
    ctx.strokeRect(445, 100, 50, 65);
    ctx.fillStyle = '#8b7a5a';
    ctx.font = '7px Courier New';
    ctx.fillText('DIARIO', 452, 120);
    ctx.fillText('EXPERI-', 448, 132);
    ctx.fillText('MENTOS', 450, 144);
  } else {
    ctx.fillStyle = '#121a14';
    ctx.fillRect(430, 80, 80, 120);
    ctx.fillStyle = 'rgba(91, 191, 138, 0.25)';
    ctx.beginPath(); ctx.arc(446, 86, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5bbf8a';
    ctx.font = 'bold 9px Courier New';
    ctx.fillText('\u2713', 443, 89);
  }

  // --- PAINEL CRONOLÓGICO (340,360, 230,100) ---
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(340, 360, 230, 100);
  const painelResolvido = state.get('painelResolvido');
  ctx.strokeStyle = painelResolvido ? '#00ff88' : '#2a4a32';
  ctx.lineWidth = 2;
  ctx.strokeRect(340, 360, 230, 100);
  ctx.fillStyle = '#121a14';
  ctx.fillRect(345, 365, 220, 90);
  ctx.fillStyle = '#5bbf8a';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText('REGISTRO CRONOLÓGICO', 355, 388);
  ctx.fillStyle = '#1a3020';
  ctx.fillRect(355, 395, 200, 2);
  if (painelResolvido) {
    ctx.fillStyle = '#00ff88';
    ctx.font = 'bold 12px Courier New';
    ctx.fillText('SEQUÊNCIA VERIFICADA', 363, 442);
    ctx.fillText('\u2713 ENERGIA RESTAURADA', 365, 455);
  } else {
    ctx.fillStyle = '#3a5a42';
    ctx.font = '9px Courier New';
    ctx.fillText('Insira a ordem correta', 365, 442);
  }

  // --- DISJUNTOR (770,180, 80,100) ---
  ctx.fillStyle = '#121a14';
  ctx.fillRect(770, 180, 80, 100);
  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 2;
  ctx.strokeRect(770, 180, 80, 100);
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(775, 185, 70, 90);
  const energiaRestaurada = state.get('energiaRestaurada');
  for (let j = 0; j < 3; j++) {
    ctx.fillStyle = energiaRestaurada ? '#00ff88' : '#aa4444';
    ctx.fillRect(785, 200 + j * 25, 12, 18);
    ctx.strokeStyle = '#1a3a2a';
    ctx.strokeRect(785, 200 + j * 25, 12, 18);
  }
  ctx.fillStyle = '#5bbf8a';
  ctx.font = '8px Courier New';
  ctx.fillText('DISJUNTOR', 780, 285);

  // --- ARMÁRIO DE MEDICAMENTOS (680,270, 60,130) ---
  ctx.fillStyle = '#121a14';
  ctx.fillRect(680, 270, 60, 130);
  ctx.strokeStyle = state.get('armarioVisto') ? '#5bbf8a' : '#1a3a2a';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(680, 270, 60, 130);
  ctx.fillStyle = '#3a5a42';
  ctx.font = '8px Courier New';
  ctx.fillText('MEDIC', 688, 340);
  ctx.fillText('AMENTOS', 686, 352);

  // --- PORTA RECEPÇÃO (740,480, 130,80) ---
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(740, 480, 130, 80);
  ctx.strokeStyle = '#2a4a32';
  ctx.lineWidth = 2;
  ctx.strokeRect(740, 480, 130, 80);
  ctx.fillStyle = '#5bbf8a';
  ctx.font = '10px Courier New';
  ctx.fillText('\u2190 Recep\u00e7\u00e3o', 755, 528);

  // --- PORTA PORÃO (30,430, 65,100) ---
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(30, 430, 65, 100);
  const poraoAberto = state.get('energiaRestaurada');
  ctx.strokeStyle = poraoAberto ? '#5bbf8a' : '#1a3a2a';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 430, 65, 100);
  ctx.fillStyle = '#5bbf8a';
  ctx.font = '8px Courier New';
  ctx.fillText('PORAO', 40, 490);
  ctx.fillStyle = poraoAberto ? '#00ff88' : '#aa4444';
  ctx.beginPath(); ctx.arc(57, 450, 3.5, 0, Math.PI*2); ctx.fill();
}

function renderEnf_atmosfera(ctx) {
  const t = Date.now() * 0.001;
  ctx.save();
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = '#8ac0a0';
  for (let i = 0; i < 4; i++) {
    const sx = 100 + i * 240;
    const sy = 30 + Math.sin(t * 0.7 + i * 1.3) * 12;
    ctx.beginPath(); ctx.ellipse(sx, sy, 18, 25, 0, 0, Math.PI*2); ctx.fill();
  }
  ctx.restore();
}

function renderEnf_overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 60, 450, 300, 520);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.5, 'rgba(5, 12, 10, 0.2)');
  vignette.addColorStop(1, 'rgba(3, 10, 8, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(8, 20, 14, 0.06)';
  ctx.fillRect(0, 0, 900, 600);
}

// ==================== PORÃO / DIRETORIA — Ambiente 3 ====================

function renderPorao(ctx, state) {
  renderPor_bg(ctx);
  renderPor_arquitetura(ctx);
  renderPor_iluminacao(ctx, state);
  renderPor_detalhes(ctx);
  renderPor_decoracao(ctx, state);
  renderPor_objetos(ctx, state);
  renderPor_atmosfera(ctx, state);
  renderPor_overlay(ctx);
}

function renderPor_bg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#060a08');
  g.addColorStop(0.4, '#0a100e');
  g.addColorStop(0.8, '#080e0c');
  g.addColorStop(1, '#040806');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 900, 600);
}

function renderPor_arquitetura(ctx) {
  ctx.fillStyle = '#080c0a';
  ctx.fillRect(0, 0, 900, 410);
  ctx.fillStyle = '#0a100e';
  ctx.fillRect(0, 410, 900, 190);
  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 410); ctx.lineTo(900, 410); ctx.stroke();
  ctx.strokeStyle = '#15251a';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath(); ctx.moveTo(i * 120 + 20, 0); ctx.lineTo(i * 120 + 20, 410); ctx.stroke();
  }
  const floor = ctx.createLinearGradient(0, 410, 0, 600);
  floor.addColorStop(0, '#0c1410');
  floor.addColorStop(1, '#060a08');
  ctx.fillStyle = floor;
  ctx.fillRect(0, 410, 900, 190);
  ctx.strokeStyle = '#15251a';
  ctx.lineWidth = 1;
  for (let i = 0; i < 10; i++) {
    ctx.beginPath(); ctx.moveTo(i * 90, 410); ctx.lineTo(i * 90 - 5, 600); ctx.stroke();
  }
}

function renderPor_iluminacao(ctx, state) {
  const hasPower = state.get('geradorLigado');
  if (hasPower) {
    const glow = ctx.createRadialGradient(200, 30, 5, 200, 30, 250);
    glow.addColorStop(0, 'rgba(255, 200, 50, 0.1)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 450, 350);
    ctx.fillStyle = 'rgba(255, 200, 50, 0.04)';
    ctx.fillRect(170, 20, 60, 6);
  } else {
    const pulse = Math.sin(Date.now() / 800) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(91, 191, 138, ${0.015 + pulse * 0.02})`;
    ctx.fillRect(0, 0, 900, 600);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, 900, 600);
  }
}

function renderPor_detalhes(ctx) {
  ctx.fillStyle = 'rgba(60, 50, 30, 0.12)';
  ctx.beginPath(); ctx.ellipse(300, 440, 40, 15, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(700, 450, 35, 12, 0.2, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(40, 60, 40, 0.1)';
  ctx.beginPath(); ctx.ellipse(450, 80, 60, 25, 0, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = 'rgba(30, 50, 35, 0.2)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(150, 280); ctx.lineTo(160, 360); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(750, 200); ctx.lineTo(760, 290); ctx.stroke();
}

function renderPor_decoracao(ctx, state) {
  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(40, 20); ctx.lineTo(40, 410); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(860, 20); ctx.lineTo(860, 410); ctx.stroke();
  ctx.fillStyle = '#0e1a12';
  ctx.fillRect(30, 120, 12, 80);
  ctx.fillRect(858, 150, 12, 60);

  // Quadro de força
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(740, 440, 100, 60);
  ctx.strokeStyle = '#2a4a32';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(740, 440, 100, 60);
  ctx.fillStyle = '#121a14';
  ctx.fillRect(745, 445, 90, 50);
  ctx.fillStyle = '#5bbf8a';
  ctx.font = '8px Courier New';
  ctx.fillText('QUADRO DE', 750, 468);
  ctx.fillText('FOR\u00c7A', 762, 480);
}

function renderPor_objetos(ctx, state) {
  // --- GERADOR (100,280, 160,130) ---
  const gerX = 100, gerY = 280, gerW = 160, gerH = 130;
  ctx.fillStyle = '#0a100e';
  ctx.fillRect(gerX, gerY, gerW, gerH);
  ctx.strokeStyle = state.get('geradorLigado') ? '#5bbf8a' : '#2a4a32';
  ctx.lineWidth = 2;
  ctx.strokeRect(gerX, gerY, gerW, gerH);
  const gerGrad = ctx.createLinearGradient(gerX, gerY, gerX + gerW, gerY);
  gerGrad.addColorStop(0, '#121a14');
  gerGrad.addColorStop(0.5, '#1a2a1e');
  gerGrad.addColorStop(1, '#121a14');
  ctx.fillStyle = gerGrad;
  ctx.fillRect(gerX + 10, gerY + 15, gerW - 20, gerH - 30);
  ctx.fillStyle = state.get('geradorLigado') ? '#5bbf8a' : '#4a4a4a';
  ctx.font = '12px Courier New';
  ctx.fillText(state.get('geradorLigado') ? 'ONLINE' : 'OFFLINE', gerX + 30, gerY + 75);
  ctx.fillStyle = state.get('geradorLigado') ? '#00ff88' : '#aa4444';
  ctx.beginPath(); ctx.arc(gerX + gerW - 15, gerY + 15, 4, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#3a6a4a';
  ctx.font = '8px Courier New';
  ctx.fillText('GERADOR DIESEL', gerX + 25, gerY + gerH - 8);

  // --- CAIXOTES — DIESEL (320,340, 85,90) ---
  if (!state.get('dieselColetado')) {
    ctx.fillStyle = '#1a2218';
    ctx.fillRect(320, 340, 85, 90);
    ctx.fillRect(335, 305, 65, 50);
    ctx.strokeStyle = '#2a3a2a';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(320, 340, 85, 90);
    ctx.strokeRect(335, 305, 65, 50);
    ctx.fillStyle = '#3a5a42';
    ctx.font = '8px Courier New';
    ctx.fillText('MATERIAL', 332, 375);
    ctx.fillText('HOSPITALAR', 328, 387);
    ctx.strokeStyle = '#5bbf8a44';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(335, 305); ctx.lineTo(320, 340); ctx.stroke();
  }

  // --- DIRETORIA (quadro visual) (520, 200, 340, 250) ---
  const dirAberta = state.get('diretoriaAcessivel');
  if (dirAberta) {
    // Moldura da sala da diretoria
    ctx.fillStyle = '#0a100e';
    ctx.fillRect(510, 30, 360, 340);
    ctx.strokeStyle = '#1a3a2a';
    ctx.lineWidth = 2;
    ctx.strokeRect(510, 30, 360, 340);
    ctx.fillStyle = '#0e1410';
    ctx.fillRect(515, 35, 350, 330);
    ctx.fillStyle = '#1a3020';
    ctx.font = 'bold 9px Courier New';
    ctx.fillText('DIRETORIA', 655, 30);

    // Mesa da diretoria
    ctx.fillStyle = '#1a2218';
    ctx.fillRect(550, 300, 150, 65);
    ctx.strokeStyle = '#3a5a42';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(550, 300, 150, 65);
    ctx.fillStyle = '#2a3a2a';
    ctx.fillRect(555, 296, 140, 5);
    ctx.fillStyle = '#121a14';
    ctx.fillRect(560, 305, 130, 52);

    // Relógio na mesa
    ctx.fillStyle = '#0e1410';
    ctx.beginPath(); ctx.arc(625, 320, 13, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#3a6a4a';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(625, 320, 13, 0, Math.PI*2); ctx.stroke();
    ctx.strokeStyle = '#5bbf8a';
    ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(625, 320); ctx.lineTo(625, 310); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(625, 320); ctx.lineTo(635, 320); ctx.stroke();

    // Gaveta da mesa — objeto separado!
    ctx.fillStyle = '#1a2a1e';
    ctx.fillRect(580, 340, 35, 20);
    ctx.strokeStyle = state.get('bilheteLido') ? '#5bbf8a' : '#2a4a32';
    ctx.strokeRect(580, 340, 35, 20);
    ctx.fillStyle = '#3a6a4a';
    ctx.fillRect(593, 348, 9, 3);

    // Cofre
    ctx.fillStyle = '#0e1410';
    ctx.fillRect(720, 60, 110, 100);
    const cofreGrad = ctx.createLinearGradient(720, 60, 830, 160);
    cofreGrad.addColorStop(0, '#1a2a1e');
    cofreGrad.addColorStop(0.5, '#0e1410');
    cofreGrad.addColorStop(1, '#080c0a');
    ctx.fillStyle = cofreGrad;
    ctx.fillRect(725, 65, 100, 90);
    ctx.strokeStyle = state.get('cofreAberto') ? '#00ff88' : '#2a4a32';
    ctx.lineWidth = 3;
    ctx.strokeRect(720, 60, 110, 100);
    ctx.fillStyle = '#1a2a1e';
    ctx.beginPath(); ctx.arc(775, 110, 16, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#3a6a4a';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(775, 110, 16, 0, Math.PI*2); ctx.stroke();
    ctx.fillStyle = '#5bbf8a';
    ctx.beginPath(); ctx.arc(775, 110, 3.5, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#3a5a42';
    ctx.font = '8px Courier New';
    ctx.fillText('MORETTI', 752, 148);

    // Diário do Moretti (sobre a mesa)
    if (!state.get('diarioMorettiLido')) {
      ctx.fillStyle = '#3a2a1a';
      ctx.fillRect(680, 295, 45, 55);
      ctx.strokeStyle = '#6a4a2a';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(680, 295, 45, 55);
      ctx.fillStyle = '#8b7a5a';
      ctx.font = '7px Courier New';
      ctx.fillText('ANOTA-', 686, 320);
      ctx.fillText('\u00c7\u00d5ES', 688, 332);
    }
  } else {
    const portaGrad = ctx.createLinearGradient(510, 35, 510, 375);
    portaGrad.addColorStop(0, '#0e1410');
    portaGrad.addColorStop(1, '#1a2a1e');
    ctx.fillStyle = portaGrad;
    ctx.fillRect(510, 35, 30, 340);
    ctx.strokeStyle = '#2a4a32';
    ctx.lineWidth = 2;
    ctx.strokeRect(510, 35, 30, 340);
    ctx.fillStyle = '#3a6a4a';
    ctx.font = '8px Courier New';
    ctx.save();
    ctx.translate(525, 200);
    ctx.rotate(Math.PI / 2);
    ctx.fillText('DIRETORIA', 0, 0);
    ctx.restore();
    ctx.fillStyle = '#aa4444';
    ctx.beginPath(); ctx.arc(525, 50, 4, 0, Math.PI*2); ctx.fill();
  }

  // --- VOLTAR (740,510, 130,55) ---
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(740, 510, 130, 55);
  ctx.strokeStyle = '#2a4a32';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(740, 510, 130, 55);
  ctx.fillStyle = '#5bbf8a';
  ctx.font = '10px Courier New';
  ctx.fillText('\u2190 Enfermaria', 755, 542);

  // Verificação visual nos objetos já vistos
  if (state.get('mesaVista')) {
    ctx.fillStyle = 'rgba(91, 191, 138, 0.25)';
    ctx.beginPath(); ctx.arc(700, 298, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5bbf8a';
    ctx.font = 'bold 9px Courier New';
    ctx.fillText('\u2713', 697, 301);
  }
}

function renderPor_atmosfera(ctx, state) {
  const t = Date.now() * 0.001;
  ctx.save();
  ctx.globalAlpha = 0.025;
  ctx.fillStyle = '#8ac0a0';
  for (let i = 0; i < 3; i++) {
    const sx = 300 + i * 250;
    const sy = 30 + Math.sin(t * 0.5 + i) * 15;
    ctx.beginPath(); ctx.ellipse(sx, sy, 20, 30, 0, 0, Math.PI*2); ctx.fill();
  }
  ctx.restore();

  if (!state.get('geradorLigado')) {
    const waterBase = 500 + Math.sin(t * 0.3) * 5;
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = 'rgba(20, 60, 40, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, waterBase);
    for (let x = 0; x <= 900; x += 15) {
      const y = waterBase + Math.sin(x * 0.01 + t * 1.2) * 3;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(900, 600);
    ctx.lineTo(0, 600);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function renderPor_overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 60, 450, 300, 500);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.5, 'rgba(5, 12, 10, 0.2)');
  vignette.addColorStop(1, 'rgba(3, 10, 8, 0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(5, 15, 10, 0.07)';
  ctx.fillRect(0, 0, 900, 600);
}

// ==================== TABELA DE POSIÇÕES ====================
// RECEPÇÃO:
//   portaPrincipal:    (810, 100, 75, 340)
//   quadroMoretti:     (340, 40, 220, 170)
//   arquivoMorto:      (90, 260, 120, 160)
//   gaveta:            (230, 370, 95, 55)
//   cartaLucia:        (620, 350, 80, 70)
//   portaEnfermaria:   (40, 370, 60, 140)
//
// ENFERMARIA:
//   prontuarioJoao:    (180, 100, 80, 120)
//   diarioExperimentos:(430, 80, 80, 120)
//   painelCronologico: (340, 360, 230, 100)
//   disjuntor:         (770, 180, 80, 100)
//   armarioMedicamentos:(680, 270, 60, 130)
//   portaRecepcao:     (740, 480, 130, 80)
//   portaPorao:        (30, 430, 65, 100)
//
// PORÃO:
//   gerador:           (100, 280, 160, 130)
//   caixotes:          (320, 305, 90, 130)
//   portaDiretoria:    (510, 35, 30, 340)   [se fechada]
//   mesaDiretoria:     (550, 300, 150, 65)   [se diretoria aberta]
//   gavetaDiretoria:   (580, 340, 35, 20)    [se diretoria aberta]
//   cofre:             (720, 60, 110, 100)   [se diretoria aberta]
//   diarioMoretti:     (680, 295, 45, 55)    [se diretoria aberta]
//   voltar:            (740, 510, 130, 55)
