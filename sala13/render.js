/**
 * @module Sala13Render
 * @version 1.0.0
 * @description Renderização cinematográfica da Sala 13 — A Mina Abandonada
 * Ambientes: Entrada da Mina, Galeria Profunda, Sala do Elevador
 * Paleta: ThemeMine — bg #0a0806, accent #e0902a, border #4a3420
 */

const MINE_DUST = [
  {x:120,y:90,r:1.3},{x:320,y:60,r:1},{x:520,y:120,r:1.5},{x:700,y:80,r:1.1},
  {x:230,y:170,r:0.9},{x:600,y:190,r:1.3},{x:420,y:100,r:1},{x:800,y:150,r:1.2}
];

// ============ ENTRADA DA MINA ============
function renderEntrada(ctx, state) {
  entBg(ctx); entArq(ctx); entLuz(ctx, state); entObj(ctx, state); entOver(ctx);
}
function entBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#0c0a08'); g.addColorStop(0.5, '#120e0a'); g.addColorStop(1, '#080604');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function entArq(ctx) {
  // Parede de rocha irregular
  ctx.fillStyle = '#171310'; ctx.fillRect(0, 0, 900, 450);
  ctx.strokeStyle = 'rgba(40,30,20,0.6)'; ctx.lineWidth = 1;
  for (let i = 0; i < 14; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 65, 0);
    ctx.lineTo(i * 65 + (i % 2 ? 12 : -12), 220);
    ctx.lineTo(i * 65, 450);
    ctx.stroke();
  }
  // Vigas de madeira (escoras do teto)
  ctx.fillStyle = '#2a1c10';
  ctx.fillRect(0, 40, 900, 16);
  for (let i = 0; i < 6; i++) { ctx.fillRect(60 + i * 150, 40, 18, 120); }
  // Chão de terra
  const f = ctx.createLinearGradient(0, 450, 0, 600);
  f.addColorStop(0, '#1a1208'); f.addColorStop(1, '#0c0805');
  ctx.fillStyle = f; ctx.fillRect(0, 450, 900, 150);
  ctx.strokeStyle = '#4a3420'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 450); ctx.lineTo(900, 450); ctx.stroke();
  // Trilhos
  ctx.strokeStyle = '#3a2e1e'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(380, 450); ctx.lineTo(300, 600); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(470, 450); ctx.lineTo(560, 600); ctx.stroke();
  ctx.strokeStyle = '#2a2014'; ctx.lineWidth = 6;
  for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(360 - i * 12, 470 + i * 24); ctx.lineTo(490 + i * 14, 470 + i * 24); ctx.stroke(); }
  ctx.lineWidth = 1;
}
function entLuz(ctx, state) {
  if (state.get('lampiaoAceso')) {
    const l = ctx.createRadialGradient(150, 250, 8, 150, 250, 240);
    l.addColorStop(0, 'rgba(224,144,42,0.22)'); l.addColorStop(0.5, 'rgba(224,144,42,0.06)'); l.addColorStop(1, 'transparent');
    ctx.fillStyle = l; ctx.fillRect(0, 40, 420, 420);
  }
  // Luz fraca vinda da boca da mina (topo)
  const d = ctx.createLinearGradient(0, 0, 0, 120);
  d.addColorStop(0, 'rgba(120,130,110,0.05)'); d.addColorStop(1, 'transparent');
  ctx.fillStyle = d; ctx.fillRect(0, 0, 900, 120);
}
function entObj(ctx, state) {
  // --- QUADRO DE AVISOS (60, 90, 160, 150) ---
  ctx.fillStyle = '#241a10'; ctx.fillRect(60, 90, 160, 150);
  ctx.strokeStyle = state.get('quadro') ? '#e0902a' : '#4a3420'; ctx.lineWidth = 2; ctx.strokeRect(60, 90, 160, 150);
  ctx.fillStyle = '#d8c090'; ctx.fillRect(74, 104, 60, 44);
  ctx.fillStyle = '#c8b080'; ctx.fillRect(144, 112, 62, 50);
  ctx.fillStyle = '#e0d0a0'; ctx.fillRect(90, 164, 70, 56);
  ctx.strokeStyle = '#5a4a2a'; ctx.strokeRect(74, 104, 60, 44); ctx.strokeRect(144, 112, 62, 50); ctx.strokeRect(90, 164, 70, 56);
  ctx.fillStyle = '#8a7454'; ctx.font = '8px Courier New'; ctx.fillText('AVISOS', 116, 234);
  ctx.lineWidth = 1;

  // --- LAMPIÃO DE CARBURETO (parede) (300, 180, 60, 90) ---
  ctx.fillStyle = '#2a2018'; ctx.fillRect(322, 210, 16, 60);
  const lg = ctx.createRadialGradient(330, 195, 4, 330, 195, 26);
  if (state.get('lampiaoAceso')) { lg.addColorStop(0, '#fff0c0'); lg.addColorStop(0.5, '#e0902a'); lg.addColorStop(1, '#5a3a10'); }
  else { lg.addColorStop(0, '#3a3020'); lg.addColorStop(1, '#1a1610'); }
  ctx.fillStyle = lg; ctx.beginPath(); ctx.ellipse(330, 195, 22, 28, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#4a3a22'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(330, 195, 22, 28, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;

  // --- CAIXA DE FERRAMENTAS (470, 380, 130, 70) ---
  ctx.fillStyle = '#2a1e12'; ctx.fillRect(470, 380, 130, 70);
  ctx.fillStyle = '#3a2a18'; ctx.fillRect(470, 380, 130, 18);
  ctx.strokeStyle = state.get('ferramentas') ? '#e0902a' : '#4a3420'; ctx.lineWidth = 2; ctx.strokeRect(470, 380, 130, 70);
  ctx.fillStyle = '#6a5432'; ctx.fillRect(528, 392, 14, 10);
  ctx.fillStyle = '#8a7454'; ctx.font = '9px Courier New'; ctx.fillText('FERRAMENTAS', 486, 440);
  ctx.lineWidth = 1;

  // --- VAGONETE (640, 360, 150, 110) ---
  const vg = ctx.createLinearGradient(640, 360, 640, 470);
  vg.addColorStop(0, '#3a2a1a'); vg.addColorStop(1, '#1e1408');
  ctx.fillStyle = vg; ctx.fillRect(650, 380, 130, 70);
  ctx.strokeStyle = state.get('vagonete') ? '#e0902a' : '#4a3420'; ctx.lineWidth = 2; ctx.strokeRect(650, 380, 130, 70);
  // Rodas
  ctx.fillStyle = '#1a1410'; ctx.beginPath(); ctx.arc(668, 458, 12, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(762, 458, 12, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#5a4a2a'; ctx.beginPath(); ctx.arc(668, 458, 12, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(762, 458, 12, 0, Math.PI * 2); ctx.stroke();
  // Minério
  ctx.fillStyle = '#4a3a24'; ctx.beginPath(); ctx.arc(690, 382, 8, 0, Math.PI * 2); ctx.arc(715, 380, 10, 0, Math.PI * 2); ctx.arc(740, 384, 7, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7454'; ctx.font = '9px Courier New'; ctx.fillText('VAGONETE', 668, 445);

  // --- TÚNEL → GALERIA (810, 150, 70, 300) ---
  ctx.fillStyle = '#050403'; ctx.beginPath();
  ctx.moveTo(810, 450); ctx.lineTo(810, 200); ctx.quadraticCurveTo(845, 150, 880, 200); ctx.lineTo(880, 450); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = state.get('lampiaoAceso') ? '#e0902a' : '#4a3420'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(810, 450); ctx.lineTo(810, 200); ctx.quadraticCurveTo(845, 150, 880, 200); ctx.lineTo(880, 450); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7454'; ctx.font = '9px Courier New'; ctx.fillText('↓ GALERIA', 812, 435);
}
function entOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 130, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.65, 'rgba(4,3,2,0.4)'); v.addColorStop(1, 'rgba(4,3,2,0.78)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ GALERIA PROFUNDA ============
function renderGaleria(ctx, state) {
  galBg(ctx); galArq(ctx); galLuz(ctx, state); galObj(ctx, state); galAtm(ctx); galOver(ctx);
}
function galBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#080605'); g.addColorStop(0.5, '#0e0b08'); g.addColorStop(1, '#050403');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function galArq(ctx) {
  // Teto abaulado de rocha
  ctx.fillStyle = '#120e0a';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(900, 0); ctx.lineTo(900, 90); ctx.quadraticCurveTo(450, 140, 0, 90); ctx.closePath(); ctx.fill();
  // Escoras de madeira (pilares)
  ctx.fillStyle = '#2a1c10';
  for (const px of [120, 380, 640]) {
    ctx.fillRect(px, 120, 22, 330);
    ctx.fillRect(px - 14, 120, 50, 16);
  }
  // Parede de rocha com veios
  ctx.fillStyle = '#141010'; ctx.fillRect(0, 130, 900, 320);
  ctx.strokeStyle = 'rgba(50,38,24,0.5)'; ctx.lineWidth = 1;
  for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(i * 58, 130); ctx.lineTo(i * 58 + 20, 450); ctx.stroke(); }
  // Chão
  const f = ctx.createLinearGradient(0, 450, 0, 600);
  f.addColorStop(0, '#141008'); f.addColorStop(1, '#080604');
  ctx.fillStyle = f; ctx.fillRect(0, 450, 900, 150);
  ctx.strokeStyle = '#4a3420'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 450); ctx.lineTo(900, 450); ctx.stroke();
  ctx.lineWidth = 1;
}
function galLuz(ctx, state) {
  if (state.get('lampiaoAceso')) {
    const l = ctx.createRadialGradient(450, 260, 20, 450, 260, 420);
    l.addColorStop(0, 'rgba(224,144,42,0.16)'); l.addColorStop(0.6, 'rgba(224,144,42,0.04)'); l.addColorStop(1, 'transparent');
    ctx.fillStyle = l; ctx.fillRect(0, 0, 900, 600);
  } else {
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, 900, 600);
  }
}
function galObj(ctx, state) {
  // --- VEIO DE OURO (100, 180, 130, 120) ---
  ctx.fillStyle = '#1a1410'; ctx.fillRect(100, 180, 130, 120);
  ctx.strokeStyle = state.get('veio') ? '#e0902a' : '#4a3420'; ctx.lineWidth = 2; ctx.strokeRect(100, 180, 130, 120);
  // Vetas douradas
  ctx.strokeStyle = '#e0b050'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(115, 200); ctx.lineTo(150, 230); ctx.lineTo(140, 270); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(180, 195); ctx.lineTo(200, 240); ctx.lineTo(215, 285); ctx.stroke();
  ctx.fillStyle = '#f0c860'; ctx.beginPath(); ctx.arc(150, 230, 4, 0, Math.PI * 2); ctx.arc(200, 240, 3, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7454'; ctx.font = '9px Courier New'; ctx.fillText('VEIO DE OURO', 118, 294);

  // --- PLACA DE PROFUNDIDADE (400, 160, 140, 90) ---
  ctx.fillStyle = '#1e1810'; ctx.fillRect(400, 160, 140, 90);
  ctx.strokeStyle = state.get('placa') ? '#e0902a' : '#4a3420'; ctx.lineWidth = 2; ctx.strokeRect(400, 160, 140, 90);
  ctx.fillStyle = '#d4562a'; ctx.font = 'bold 10px Courier New'; ctx.fillText('NÍVEL PRINCIPAL', 414, 186);
  ctx.fillStyle = '#dcc8a8'; ctx.font = '9px Courier New'; ctx.fillText('PROFUNDIDADE', 420, 210);
  ctx.fillStyle = '#e0902a'; ctx.font = 'bold 16px Courier New'; ctx.fillText('_ 2 0 m', 432, 236);
  ctx.lineWidth = 1;

  // --- ESCORA RACHADA (640, 120, 22, 330 -> hit) ---
  ctx.fillStyle = '#1a1208'; ctx.fillRect(636, 250, 34, 60);
  ctx.strokeStyle = state.get('escora') ? '#e0902a' : '#5a4028'; ctx.lineWidth = 1; ctx.strokeRect(636, 250, 34, 60);

  // --- POÇA D'ÁGUA (250, 470, 180, 60) ---
  const pg = ctx.createRadialGradient(340, 500, 5, 340, 500, 90);
  pg.addColorStop(0, 'rgba(60,90,100,0.5)'); pg.addColorStop(1, 'rgba(20,30,36,0.2)');
  ctx.fillStyle = pg; ctx.beginPath(); ctx.ellipse(340, 500, 90, 26, 0, 0, Math.PI * 2); ctx.fill();

  // --- TÚNEL → ELEVADOR (30, 150, 70, 300) ---
  ctx.fillStyle = '#040302'; ctx.beginPath();
  ctx.moveTo(30, 450); ctx.lineTo(30, 200); ctx.quadraticCurveTo(65, 150, 100, 200); ctx.lineTo(100, 450); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#4a3420'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(30, 450); ctx.lineTo(30, 200); ctx.quadraticCurveTo(65, 150, 100, 200); ctx.lineTo(100, 450); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7454'; ctx.font = '9px Courier New'; ctx.fillText('ELEVADOR', 34, 435);

  // --- TÚNEL ↑ ENTRADA (800, 150, 90, 300) ---
  ctx.fillStyle = '#8a7454'; ctx.font = '9px Courier New'; ctx.fillText('↑ ENTRADA', 806, 300);
  ctx.strokeStyle = '#4a3420'; ctx.lineWidth = 2; ctx.strokeRect(800, 250, 90, 100); ctx.lineWidth = 1;
}
function galAtm(ctx) {
  ctx.save();
  for (const d of MINE_DUST) { ctx.fillStyle = 'rgba(224,144,42,0.10)'; ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
function galOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 120, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.6, 'rgba(2,2,1,0.42)'); v.addColorStop(1, 'rgba(2,2,1,0.82)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ SALA DO ELEVADOR ============
function renderElevador(ctx, state) {
  eleBg(ctx); eleArq(ctx); eleLuz(ctx, state); eleObj(ctx, state); eleOver(ctx);
}
function eleBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#0a0806'); g.addColorStop(0.5, '#100c08'); g.addColorStop(1, '#060403');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function eleArq(ctx) {
  ctx.fillStyle = '#151109'; ctx.fillRect(0, 0, 900, 450);
  // Estrutura metálica do poço
  ctx.strokeStyle = '#2a2014'; ctx.lineWidth = 3;
  for (let i = 0; i < 5; i++) ctx.strokeRect(340 + 0, 40, 220, 400);
  // Cabos verticais
  ctx.strokeStyle = '#3a2e1e'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(400, 40); ctx.lineTo(400, 440); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(500, 40); ctx.lineTo(500, 440); ctx.stroke();
  const f = ctx.createLinearGradient(0, 450, 0, 600);
  f.addColorStop(0, '#141008'); f.addColorStop(1, '#080604');
  ctx.fillStyle = f; ctx.fillRect(0, 450, 900, 150);
  ctx.strokeStyle = '#4a3420'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 450); ctx.lineTo(900, 450); ctx.stroke();
  ctx.lineWidth = 1;
}
function eleLuz(ctx, state) {
  if (state.get('gerador')) {
    const l = ctx.createRadialGradient(450, 40, 10, 450, 40, 400);
    l.addColorStop(0, 'rgba(224,144,42,0.14)'); l.addColorStop(1, 'transparent');
    ctx.fillStyle = l; ctx.fillRect(0, 0, 900, 460);
  } else {
    if (state.get('lampiaoAceso')) {
      const l = ctx.createRadialGradient(700, 300, 10, 700, 300, 300);
      l.addColorStop(0, 'rgba(224,144,42,0.12)'); l.addColorStop(1, 'transparent');
      ctx.fillStyle = l; ctx.fillRect(400, 100, 500, 400);
    } else { ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 0, 900, 600); }
  }
}
function eleObj(ctx, state) {
  // --- CABINE DO ELEVADOR (350, 90, 200, 350) ---
  ctx.fillStyle = '#100c08'; ctx.fillRect(350, 90, 200, 350);
  ctx.strokeStyle = state.get('vitoria') ? '#8ac86a' : '#4a3420'; ctx.lineWidth = 3; ctx.strokeRect(350, 90, 200, 350);
  // Grade da cabine
  ctx.strokeStyle = '#3a2e1e'; ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(360 + i * 34, 110); ctx.lineTo(360 + i * 34, 430); ctx.stroke(); }
  for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(356, 120 + i * 40); ctx.lineTo(544, 120 + i * 40); ctx.stroke(); }
  ctx.lineWidth = 1;

  // --- GERADOR (60, 300, 150, 140) ---
  ctx.fillStyle = '#1a1410'; ctx.fillRect(60, 300, 150, 140);
  const gg = ctx.createLinearGradient(60, 300, 210, 300);
  gg.addColorStop(0, '#2a2014'); gg.addColorStop(0.5, '#3a2e1c'); gg.addColorStop(1, '#2a2014');
  ctx.fillStyle = gg; ctx.fillRect(70, 312, 130, 116);
  ctx.strokeStyle = state.get('gerador') ? '#8ac86a' : '#4a3420'; ctx.lineWidth = 2; ctx.strokeRect(60, 300, 150, 140);
  // Alavanca
  ctx.strokeStyle = '#6a5432'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(130, 400); ctx.lineTo(state.get('gerador') ? 155 : 105, 360); ctx.stroke();
  ctx.fillStyle = state.get('gerador') ? '#8ac86a' : '#d4562a';
  ctx.beginPath(); ctx.arc(state.get('gerador') ? 155 : 105, 360, 7, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7454'; ctx.font = '9px Courier New'; ctx.fillText('GERADOR', 100, 432);
  // LED
  ctx.fillStyle = state.get('gerador') ? '#8ac86a' : '#4a2a1a'; ctx.beginPath(); ctx.arc(185, 322, 4, 0, Math.PI * 2); ctx.fill();

  // --- PAINEL DE CONTROLE (650, 250, 180, 160) ---
  ctx.fillStyle = '#12100a'; ctx.fillRect(650, 250, 180, 160);
  ctx.strokeStyle = state.get('gerador') ? '#e0902a' : '#4a3420'; ctx.lineWidth = 2; ctx.strokeRect(650, 250, 180, 160);
  ctx.fillStyle = '#e0902a'; ctx.font = 'bold 12px Courier New'; ctx.fillText('CONTROLE', 690, 278);
  // Visor 3 dígitos
  ctx.fillStyle = '#0a0805'; ctx.fillRect(668, 292, 144, 40);
  ctx.fillStyle = state.get('gerador') ? '#e0902a' : '#3a2a18'; ctx.font = 'bold 22px Courier New';
  ctx.fillText(state.get('gerador') ? '_ _ _' : 'SEM ENERGIA', state.get('gerador') ? 700 : 676, 320);
  // Botões
  ctx.fillStyle = '#2a2014'; for (let i = 0; i < 3; i++) ctx.fillRect(680 + i * 50, 350, 38, 44);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7454'; ctx.font = '8px Courier New'; ctx.fillText('CÓD. PROFUNDIDADE', 674, 405);

  // --- TÚNEL ↓ GALERIA (30, 470, 100, 60) ---
  ctx.fillStyle = '#0c0a06'; ctx.fillRect(30, 470, 100, 60);
  ctx.strokeStyle = '#4a3420'; ctx.lineWidth = 2; ctx.strokeRect(30, 470, 100, 60);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7454'; ctx.font = '10px Courier New'; ctx.fillText('→ Galeria', 40, 505);
}
function eleOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 130, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.65, 'rgba(2,2,1,0.4)'); v.addColorStop(1, 'rgba(2,2,1,0.8)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// ENTRADA: quadro(60,90,160,150) lampiao(300,180,60,90) ferramentas(470,380,130,70)
//          vagonete(650,380,130,90) tunelGaleria(810,150,70,300)
// GALERIA: veio(100,180,130,120) placa(400,160,140,90) escora(636,250,34,60)
//          tunelElevador(30,150,70,300) tunelEntrada(800,250,90,100)
// ELEVADOR: gerador(60,300,150,140) painel(650,250,180,160) cabine(350,90,200,350) tunelGaleria(30,470,100,60)
