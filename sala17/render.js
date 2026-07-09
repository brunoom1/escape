/**
 * @module Sala17Render
 * @version 1.0.0
 * @description Renderização cinematográfica da Sala 17 — Sanatório Abandonado
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Estilo: Asylum noir, verde hospitalar desbotado, decadência, mofo
 */

const ASY_WATER_SPOTS = [
  {x:60,y:30,w:80,h:40},{x:400,y:20,w:120,h:50},{x:780,y:35,w:60,h:35},
  {x:250,y:380,w:70,h:30},{x:650,y:400,w:90,h:25}
];
const ASY_CRACKS = [
  {x1:100,y1:200,x2:120,y2:280},{x1:500,y1:150,x2:510,y2:230},
  {x1:700,y1:300,x2:720,y2:390},{x1:350,y1:100,x2:360,y2:180}
];
const ASY_TILES = [
  {x:20,y:450,w:70,h:55},{x:100,y:460,w:65,h:50},{x:180,y:455,w:75,h:52},
  {x:270,y:462,w:68,h:48},{x:350,y:450,w:72,h:55},{x:435,y:458,w:65,h:50},
  {x:515,y:453,w:78,h:52},{x:605,y:460,w:70,h:48},{x:690,y:455,w:68,h:55},
  {x:770,y:462,w:74,h:50}
];

// ============ RECEPÇÃO (Ambiente 1) ============

function renderRecepcao(ctx, state) {
  renderRec_Background(ctx);
  renderRec_Arquitetura(ctx);
  renderRec_Iluminacao(ctx);
  renderRec_Detalhes(ctx);
  renderRec_Decoracao(ctx);
  renderRec_Objetos(ctx, state);
  renderRec_Atmosfera(ctx);
  renderRec_Overlay(ctx);
}

function renderRec_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0e0c');
  grad.addColorStop(0.3, '#0e1412');
  grad.addColorStop(0.6, '#0c1210');
  grad.addColorStop(1, '#080c0a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderRec_Arquitetura(ctx) {
  ctx.fillStyle = '#0e1412';
  ctx.fillRect(0, 0, 900, 440);
  const wallGrad = ctx.createLinearGradient(0, 0, 0, 440);
  wallGrad.addColorStop(0, '#121a16');
  wallGrad.addColorStop(1, '#0a100e');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, 900, 440);
  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  const floorGrad = ctx.createLinearGradient(0, 440, 0, 600);
  floorGrad.addColorStop(0, '#121a14');
  floorGrad.addColorStop(0.4, '#0e1410');
  floorGrad.addColorStop(1, '#080c0a');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#1a3020';
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath(); ctx.moveTo(i * 78, 440); ctx.lineTo(i * 78 - 10, 600); ctx.stroke();
  }
  for (const t of ASY_TILES) {
    ctx.strokeStyle = '#15251a';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(t.x, t.y, t.w, t.h);
  }
}

function renderRec_Iluminacao(ctx) {
  const flicker = Math.sin(Date.now() / 600) * 0.15 + 0.85;
  const glow = ctx.createRadialGradient(450, 30, 5, 450, 30, 250);
  glow.addColorStop(0, `rgba(91, 191, 138, ${0.04 * flicker})`);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(200, 0, 500, 300);
  ctx.fillStyle = `rgba(91, 191, 138, ${0.02 * flicker})`;
  ctx.fillRect(350, 25, 200, 6);
}

function renderRec_Detalhes(ctx) {
  for (const w of ASY_WATER_SPOTS) {
    ctx.fillStyle = 'rgba(60, 80, 60, 0.15)';
    ctx.beginPath(); ctx.ellipse(w.x + w.w/2, w.y + w.h/2, w.w/2, w.h/2, 0.1, 0, Math.PI*2); ctx.fill();
  }
  for (const c of ASY_CRACKS) {
    ctx.strokeStyle = 'rgba(30, 50, 35, 0.3)';
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(c.x1, c.y1); ctx.lineTo(c.x2, c.y2); ctx.stroke();
  }
  ctx.fillStyle = 'rgba(60, 80, 60, 0.08)';
  ctx.fillRect(0, 438, 900, 3);
  ctx.strokeStyle = 'rgba(30, 50, 35, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(200, 480); ctx.quadraticCurveTo(210, 490, 205, 510); ctx.stroke();
}

function renderRec_Decoracao(ctx) {
  ctx.fillStyle = '#1a2a1e';
  ctx.fillRect(0, 440, 900, 3);
  ctx.fillStyle = '#0e1a12';
  ctx.fillRect(15, 20, 100, 180);
  ctx.strokeStyle = '#2a4a32';
  ctx.lineWidth = 3;
  ctx.strokeRect(15, 20, 100, 180);
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(91, 191, 138, 0.05)' : 'rgba(0,0,0,0.2)';
    ctx.fillRect(18, 23 + i * 22, 94, 20);
  }
  ctx.strokeStyle = '#3a5a42';
  ctx.lineWidth = 1;
  ctx.strokeRect(18, 23, 94, 174);
  ctx.fillStyle = '#121a14';
  ctx.fillRect(540, 440, 70, 55);
  ctx.fillStyle = '#1a2a1e';
  ctx.fillRect(545, 435, 60, 10);
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.arc(555, 498, 3, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(595, 498, 3, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#0e1a12';
  ctx.fillRect(0, 10, 900, 8);
  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(900, 10); ctx.stroke();
  ctx.fillStyle = '#121a14';
  ctx.beginPath(); ctx.arc(600, 38, 14, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#2a4a32';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(600, 38, 14, 0, Math.PI*2); ctx.stroke();
  ctx.strokeStyle = '#5bbf8a';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(600, 38); ctx.lineTo(600, 26); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 38); ctx.lineTo(612, 42); ctx.stroke();
}

function renderRec_Objetos(ctx, state) {
  // PORTA PRINCIPAL
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
  ctx.fillStyle = '#3a7a52';
  ctx.beginPath(); ctx.arc(825, 260, 2.5, 0, Math.PI*2); ctx.fill();

  // QUADRO DR. MORETTI
  ctx.fillStyle = '#1a2218';
  ctx.fillRect(340, 40, 220, 170);
  const quadroGrad = ctx.createLinearGradient(345, 45, 345, 205);
  quadroGrad.addColorStop(0, '#1a2a1e');
  quadroGrad.addColorStop(1, '#0e1a12');
  ctx.fillStyle = quadroGrad;
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
  ctx.fillText('FUNDADOR — 1947', 378, 200);

  // ARQUIVO MORTO
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
  ctx.font = '7px Courier New';
  ctx.fillText('INCIDENTE 1994', 105, 288);

  // GAVETA DA RECEPÇÃO
  ctx.fillStyle = '#121a14';
  ctx.fillRect(230, 370, 95, 55);
  ctx.strokeStyle = state.get('gavetaAberta') ? '#3a6a4a' : '#2a4a32';
  ctx.lineWidth = 2;
  ctx.strokeRect(230, 370, 95, 55);
  ctx.fillStyle = '#3a6a4a';
  ctx.fillRect(265, 395, 25, 4);

  // PORTA PORÃO
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(40, 390, 60, 130);
  ctx.strokeStyle = state.get('chaveGerador') ? '#5bbf8a' : '#2a4a32';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 390, 60, 130);
  ctx.fillStyle = '#3a6a4a';
  ctx.font = '9px Courier New';
  ctx.fillText('PORÃO', 48, 475);
  ctx.fillStyle = state.get('chaveGerador') ? '#00ff88' : '#aa4444';
  ctx.beginPath(); ctx.arc(70, 408, 4, 0, Math.PI*2); ctx.fill();
}

function renderRec_Atmosfera(ctx) {
  const t = Date.now() * 0.001;
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#5bbf8a';
  ctx.beginPath();
  ctx.moveTo(450, 10);
  ctx.lineTo(200, 440);
  ctx.lineTo(600, 440);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.globalAlpha = 0.015;
  ctx.fillStyle = '#5bbf8a';
  ctx.beginPath();
  ctx.moveTo(350, 10);
  ctx.lineTo(100, 440);
  ctx.lineTo(500, 440);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function renderRec_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 120, 450, 300, 520);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(5, 12, 10, 0.2)');
  vignette.addColorStop(1, 'rgba(5, 12, 10, 0.5)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(10, 30, 20, 0.06)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ PORÃO / DIRETORIA (Ambiente 2) ============

function renderPorão(ctx, state) {
  renderPor_Background(ctx);
  renderPor_Arquitetura(ctx);
  renderPor_Iluminacao(ctx, state);
  renderPor_Detalhes(ctx);
  renderPor_Decoracao(ctx);
  renderPor_Objetos(ctx, state);
  renderPor_Atmosfera(ctx);
  renderPor_Overlay(ctx);
}

function renderPor_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#060a08');
  grad.addColorStop(0.4, '#0a100e');
  grad.addColorStop(0.8, '#080e0c');
  grad.addColorStop(1, '#040806');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderPor_Arquitetura(ctx) {
  ctx.fillStyle = '#080c0a';
  ctx.fillRect(0, 0, 900, 420);
  ctx.fillStyle = '#0a100e';
  ctx.fillRect(0, 420, 900, 180);
  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 420); ctx.lineTo(900, 420); ctx.stroke();
  ctx.strokeStyle = '#15251a';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath(); ctx.moveTo(i * 120 + 20, 0); ctx.lineTo(i * 120 + 20, 420); ctx.stroke();
  }
  const floorGrad = ctx.createLinearGradient(0, 420, 0, 600);
  floorGrad.addColorStop(0, '#0c1410');
  floorGrad.addColorStop(1, '#060a08');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 420, 900, 180);
  ctx.strokeStyle = '#15251a';
  for (let i = 0; i < 10; i++) {
    ctx.beginPath(); ctx.moveTo(i * 90, 420); ctx.lineTo(i * 90 - 5, 600); ctx.stroke();
  }
}

function renderPor_Iluminacao(ctx, state) {
  const hasPower = state.get('geradorLigado');
  if (hasPower) {
    const glow = ctx.createRadialGradient(200, 30, 5, 200, 30, 200);
    glow.addColorStop(0, 'rgba(255, 200, 50, 0.08)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 400, 300);
    ctx.fillStyle = 'rgba(255, 200, 50, 0.03)';
    ctx.fillRect(180, 20, 40, 6);
  } else {
    const pulse = Math.sin(Date.now() / 800) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(91, 191, 138, ${0.02 + pulse * 0.02})`;
    ctx.fillRect(0, 0, 900, 600);
    ctx.fillStyle = `rgba(0, 0, 0, 0.35)`;
    ctx.fillRect(0, 0, 900, 600);
  }
}

function renderPor_Detalhes(ctx) {
  ctx.fillStyle = 'rgba(60, 50, 30, 0.12)';
  ctx.beginPath(); ctx.ellipse(300, 450, 40, 15, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(700, 460, 35, 12, 0.2, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(40, 60, 40, 0.12)';
  ctx.beginPath(); ctx.ellipse(450, 80, 60, 25, 0, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = 'rgba(30, 50, 35, 0.2)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(150, 300); ctx.lineTo(160, 380); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(750, 200); ctx.lineTo(760, 290); ctx.stroke();
  ctx.strokeStyle = 'rgba(79, 160, 100, 0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(80 + i * 200, 0); ctx.lineTo(80 + i * 200 + 2, 40 + i * 10); ctx.stroke();
    ctx.beginPath(); ctx.arc(80 + i * 200 + 2, 40 + i * 10, 2, 0, Math.PI*2); ctx.fill();
  }
}

function renderPor_Decoracao(ctx) {
  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(0, 20); ctx.lineTo(900, 20); ctx.stroke();
  ctx.strokeStyle = '#2a4a32';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 17); ctx.lineTo(900, 17); ctx.stroke();
  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(40, 20); ctx.lineTo(40, 420); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(860, 20); ctx.lineTo(860, 420); ctx.stroke();
  ctx.fillStyle = '#0e1a12';
  ctx.fillRect(30, 120, 12, 80);
  ctx.fillRect(858, 150, 12, 60);
  ctx.fillStyle = '#0e1a12';
  ctx.fillRect(735, 440, 100, 60);
  ctx.strokeStyle = '#2a4a32';
  ctx.strokeRect(735, 440, 100, 60);
  ctx.fillStyle = '#1a3a2a';
  ctx.fillRect(745, 445, 80, 50);
  ctx.fillStyle = '#5bbf8a';
  ctx.font = '7px Courier New';
  ctx.fillText('QUADRO DE', 748, 468);
  ctx.fillText('FORÇA', 755, 480);
  ctx.fillStyle = '#3a5a42';
  ctx.fillRect(380, 410, 140, 12);
  ctx.fillStyle = '#5bbf8a';
  ctx.font = 'bold 8px Courier New';
  ctx.fillText('PORÃO — ACESSO RESTRITO', 385, 419);
}

function renderPor_Objetos(ctx, state) {
  // GERADOR
  const gerX = 130, gerY = 250, gerW = 160, gerH = 140;
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
  ctx.fillRect(gerX + 10, gerY + 20, gerW - 20, gerH - 40);
  ctx.fillStyle = state.get('geradorLigado') ? '#5bbf8a' : '#4a4a4a';
  ctx.font = '12px Courier New';
  ctx.fillText(state.get('geradorLigado') ? 'ONLINE' : 'OFFLINE', gerX + 35, gerY + 80);
  ctx.fillStyle = state.get('geradorLigado') ? '#00ff88' : '#aa4444';
  ctx.beginPath(); ctx.arc(gerX + gerW - 15, gerY + 15, 4, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#3a6a4a';
  ctx.font = '8px Courier New';
  ctx.fillText('GERADOR DIESEL', gerX + 25, gerY + gerH - 10);

  // CAIXOTES (DIESEL)
  if (!state.get('dieselColetado')) {
    ctx.fillStyle = '#1a2218';
    ctx.fillRect(340, 350, 80, 70);
    ctx.fillRect(355, 310, 65, 55);
    ctx.strokeStyle = '#2a3a2a';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(340, 350, 80, 70);
    ctx.strokeRect(355, 310, 65, 55);
    ctx.fillStyle = '#3a5a42';
    ctx.font = '8px Courier New';
    ctx.fillText('MATERIAL', 352, 385);
    ctx.fillText('HOSPITALAR', 348, 397);
    ctx.strokeStyle = '#5bbf8a44';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(355, 310); ctx.lineTo(340, 350); ctx.stroke();
  }

  // PORTA DIRETORIA
  const podeAbrir = state.get('geradorLigado');
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(680, 250, 60, 140);
  ctx.strokeStyle = podeAbrir ? '#5bbf8a' : '#2a4a32';
  ctx.lineWidth = 2;
  ctx.strokeRect(680, 250, 60, 140);
  ctx.fillStyle = '#3a6a4a';
  ctx.font = '8px Courier New';
  ctx.fillText('DIRETORIA', 683, 360);

  // DIRETORIA (MESA)
  if (state.get('diretoriaAcessivel')) {
    // Mesa
    ctx.fillStyle = '#1a2218';
    ctx.fillRect(520, 330, 140, 90);
    ctx.strokeStyle = '#3a5a42';
    ctx.lineWidth = 2;
    ctx.strokeRect(520, 330, 140, 90);
    ctx.fillStyle = '#2a3a2a';
    ctx.fillRect(525, 328, 130, 5);
    ctx.fillStyle = '#121a14';
    ctx.fillRect(530, 335, 120, 75);
    // Relógio
    ctx.fillStyle = '#0e1410';
    ctx.beginPath(); ctx.arc(590, 349, 12, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#3a6a4a';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(590, 349, 12, 0, Math.PI*2); ctx.stroke();
    ctx.strokeStyle = '#5bbf8a';
    ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(590, 349); ctx.lineTo(590, 339); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(590, 349); ctx.lineTo(600, 349); ctx.stroke();
    // Gaveta
    ctx.fillStyle = '#1a2a1e';
    ctx.fillRect(540, 390, 40, 25);
    ctx.strokeStyle = state.get('bilheteVisto') ? '#3a6a4a' : '#2a4a32';
    ctx.strokeRect(540, 390, 40, 25);
    ctx.fillStyle = '#3a6a4a';
    ctx.fillRect(555, 400, 10, 3);
  }

  // COFRE
  if (state.get('diretoriaAcessivel')) {
    ctx.fillStyle = '#0e1410';
    ctx.fillRect(580, 100, 100, 90);
    const cofreGrad = ctx.createLinearGradient(580, 100, 680, 190);
    cofreGrad.addColorStop(0, '#1a2a1e');
    cofreGrad.addColorStop(0.5, '#0e1410');
    cofreGrad.addColorStop(1, '#080c0a');
    ctx.fillStyle = cofreGrad;
    ctx.fillRect(585, 105, 90, 80);
    ctx.strokeStyle = state.get('cofreAberto') ? '#5bbf8a' : '#2a4a32';
    ctx.lineWidth = 3;
    ctx.strokeRect(580, 100, 100, 90);
    ctx.fillStyle = '#1a2a1e';
    ctx.beginPath(); ctx.arc(630, 145, 14, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#3a6a4a';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(630, 145, 14, 0, Math.PI*2); ctx.stroke();
    ctx.fillStyle = '#5bbf8a';
    ctx.beginPath(); ctx.arc(630, 145, 3, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#3a5a42';
    ctx.font = '7px Courier New';
    ctx.fillText('MORETTI', 608, 177);
  }

  // VOLTAR
  ctx.fillStyle = '#0e1410';
  ctx.fillRect(735, 500, 130, 55);
  ctx.strokeStyle = '#2a4a32';
  ctx.strokeRect(735, 500, 130, 55);
  ctx.fillStyle = '#5bbf8a';
  ctx.font = '11px Courier New';
  ctx.fillText('← Voltar', 770, 532);
}

function renderPor_Atmosfera(ctx) {
  const t = Date.now() * 0.001;
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#8ac0a0';
  for (let i = 0; i < 3; i++) {
    const sx = 300 + i * 250;
    const sy = 30 + Math.sin(t + i) * 15;
    ctx.beginPath(); ctx.ellipse(sx, sy, 20, 30, 0, 0, Math.PI*2); ctx.fill();
  }
  ctx.restore();
  const waterBase = 500 + Math.sin(t * 0.3) * 5;
  ctx.save();
  ctx.globalAlpha = 0.15;
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

function renderPor_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 80, 450, 300, 480);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.5, 'rgba(5, 12, 10, 0.2)');
  vignette.addColorStop(1, 'rgba(5, 12, 10, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(5, 15, 10, 0.08)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// RECEPÇÃO:
//   portaPrincipal: (810, 100, 75, 340)
//   quadroMoretti:  (340, 40, 220, 170)
//   arquivoMorto:   (90, 260, 120, 160)
//   gaveta:         (230, 370, 95, 55)
//   portaPorão:     (40, 390, 60, 130)
//
// PORÃO:
//   gerador:        (130, 250, 160, 140)
//   caixotes:       (340, 310, 85, 110)
//   diretoria:      (680, 250, 60, 140)
//   mesaDiretoria:  (520, 330, 140, 90)   [visível se diretoria acessível]
//   cofre:          (580, 100, 100, 90)    [visível se diretoria acessível]
//   voltar:         (735, 500, 130, 55)
