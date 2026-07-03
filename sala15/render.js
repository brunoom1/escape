/**
 * @module Sala15Render
 * @version 1.0.0
 * @description Renderização da Sala 15 — A Oficina do Relojoeiro (JOGO DE TESTE)
 * Ambientes: Oficina, Depósito
 * Paleta: ThemeClockwork — bg #0c0a07, accent #d9a441, border #4a3a22
 * Puzzles manipulativos: relógio, xadrez, jigsaw, sokoban
 */

const OFI_MOTES = [
  {x:150,y:90,r:1.2},{x:340,y:60,r:1},{x:540,y:120,r:1.4},{x:720,y:80,r:1.1},
  {x:240,y:170,r:0.9},{x:620,y:190,r:1.3},{x:440,y:100,r:1},{x:800,y:150,r:1.2}
];

// ============ OFICINA ============
function renderOficina(ctx, state) {
  ofiBg(ctx); ofiArq(ctx); ofiLuz(ctx); ofiObj(ctx, state); ofiAtm(ctx); ofiOver(ctx);
}
function ofiBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#100c08'); g.addColorStop(0.5, '#15110b'); g.addColorStop(1, '#0a0806');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function ofiArq(ctx) {
  // Parede de madeira com painéis
  ctx.fillStyle = '#1a140d'; ctx.fillRect(0, 0, 900, 440);
  ctx.strokeStyle = 'rgba(74,58,34,0.6)'; ctx.lineWidth = 1;
  for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.moveTo(i * 92, 0); ctx.lineTo(i * 92, 440); ctx.stroke(); }
  // Prateleira com engrenagens decorativas
  ctx.fillStyle = '#241a10'; ctx.fillRect(0, 250, 90, 10); ctx.fillRect(0, 320, 90, 10);
  // Piso
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#241a0f'); f.addColorStop(1, '#120c07');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#1c140a'; for (let i = 0; i < 11; i++) { ctx.beginPath(); ctx.moveTo(i * 85, 440); ctx.lineTo(i * 85 - 18, 600); ctx.stroke(); }
  ctx.strokeStyle = '#4a3a22'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  ctx.lineWidth = 1;
}
function ofiLuz(ctx) {
  const l = ctx.createRadialGradient(450, 60, 20, 450, 60, 360);
  l.addColorStop(0, 'rgba(217,164,65,0.10)'); l.addColorStop(1, 'transparent');
  ctx.fillStyle = l; ctx.fillRect(0, 0, 900, 460);
}
function ofiObj(ctx, state) {
  // --- RELÓGIO DE PAREDE (100, 70, 150, 170) ---
  ctx.fillStyle = '#241a10'; ctx.fillRect(100, 70, 150, 170);
  ctx.strokeStyle = state.get('relogioOk') ? '#4fc7a8' : '#4a3a22'; ctx.lineWidth = 3; ctx.strokeRect(100, 70, 150, 170);
  // Mostrador
  const cx = 175, cy = 145, rr = 52;
  ctx.fillStyle = '#0e0b07'; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d9a441'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke();
  // Marcas de hora
  ctx.strokeStyle = '#8f7a58';
  for (let i = 0; i < 12; i++) { const a = (i/12)*Math.PI*2; ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*(rr-6), cy+Math.sin(a)*(rr-6)); ctx.lineTo(cx+Math.cos(a)*(rr-2), cy+Math.sin(a)*(rr-2)); ctx.stroke(); }
  // Ponteiros: se resolvido, aponta 12:30; senão, parado/ausente
  if (state.get('relogioOk')) {
    // 12:30 → hora entre 12 e 1 (~ -75°), minuto em 6 (para baixo)
    ctx.strokeStyle = '#e6d6b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(-Math.PI/2 + 0.26)*26, cy + Math.sin(-Math.PI/2 + 0.26)*26); ctx.stroke(); // hora ~12:30
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + 40); ctx.stroke(); // minuto no 6
  } else if (state.get('ponteiroColetado')) {
    // só o ponteiro de hora colocado (minuto ausente até resolver)
    ctx.strokeStyle = '#8f7a58'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + 18, cy - 18); ctx.stroke();
  }
  ctx.fillStyle = '#d9a441'; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8f7a58'; ctx.font = '9px Courier New'; ctx.fillText('RELÓGIO', 142, 226);

  // --- GAVETA (360, 250, 120, 60) ---
  ctx.fillStyle = '#241a10'; ctx.fillRect(360, 250, 120, 60);
  ctx.fillStyle = '#1a1209'; ctx.fillRect(372, 262, 96, 36);
  ctx.strokeStyle = state.get('gaveta') ? '#d9a441' : '#4a3a22'; ctx.lineWidth = 1; ctx.strokeRect(372, 262, 96, 36);
  ctx.fillStyle = '#d9a441'; ctx.fillRect(410, 277, 20, 4);
  ctx.fillStyle = '#8f7a58'; ctx.font = '8px Courier New'; ctx.fillText('GAVETA', 396, 304);

  // --- TABULEIRO DE XADREZ (360, 340, 170, 100) ---
  // Mesa
  ctx.fillStyle = '#2a1e12'; ctx.fillRect(345, 430, 200, 12);
  ctx.fillStyle = '#1a1209'; ctx.fillRect(360, 342, 170, 96);
  // Tabuleiro (8x8 mini)
  const bx = 372, by = 350, cell = 20;
  for (let r = 0; r < 4; r++) for (let cc = 0; cc < 8; cc++) {
    ctx.fillStyle = (r + cc) % 2 === 0 ? '#c9b48a' : '#3a2a18';
    ctx.fillRect(bx + cc * cell, by + r * cell, cell, cell);
  }
  ctx.strokeStyle = state.get('xadrezOk') ? '#4fc7a8' : '#4a3a22'; ctx.lineWidth = 2; ctx.strokeRect(360, 342, 170, 96);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8f7a58'; ctx.font = '8px Courier New'; ctx.fillText('XADREZ', 418, 458);

  // --- BANCADA DE MONTAGEM / JIGSAW (560, 340, 200, 100) ---
  ctx.fillStyle = '#2a1e12'; ctx.fillRect(560, 340, 200, 100);
  ctx.fillStyle = '#3a2a18'; ctx.fillRect(560, 340, 200, 12);
  ctx.strokeStyle = state.get('jigsawOk') ? '#4fc7a8' : '#4a3a22'; ctx.lineWidth = 2; ctx.strokeRect(560, 340, 200, 100);
  // Slots da foto
  for (let i = 0; i < 3; i++) { ctx.fillStyle = '#15110b'; ctx.fillRect(578 + i * 58, 366, 48, 52); ctx.strokeStyle = '#4a3a22'; ctx.strokeRect(578 + i * 58, 366, 48, 52); }
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8f7a58'; ctx.font = '8px Courier New'; ctx.fillText('MONTAGEM', 622, 434);

  // --- CAIXA DE FERRAMENTAS (620, 90, 150, 120) ---
  ctx.fillStyle = '#241a10'; ctx.fillRect(620, 90, 150, 120);
  ctx.fillStyle = '#2e2012'; ctx.fillRect(620, 90, 150, 22);
  ctx.strokeStyle = state.get('ferramentas') ? '#d9a441' : '#4a3a22'; ctx.lineWidth = 2; ctx.strokeRect(620, 90, 150, 120);
  ctx.fillStyle = '#d9a441'; ctx.fillRect(688, 102, 14, 10);
  ctx.fillStyle = '#8f7a58'; ctx.font = '9px Courier New'; ctx.fillText('FERRAMENTAS', 636, 200);
  ctx.lineWidth = 1;

  // --- PORTA BLINDADA → DEPÓSITO (810, 130, 70, 310) ---
  ctx.fillStyle = '#161009'; ctx.fillRect(810, 130, 70, 310);
  ctx.strokeStyle = state.get('portaAberta') ? '#4fc7a8' : '#4a3a22'; ctx.lineWidth = 3; ctx.strokeRect(810, 130, 70, 310);
  // Teclado
  ctx.fillStyle = '#0e0b07'; ctx.fillRect(826, 250, 38, 50);
  ctx.strokeStyle = state.get('portaAberta') ? '#4fc7a8' : '#8f7a58'; ctx.lineWidth = 1; ctx.strokeRect(826, 250, 38, 50);
  ctx.fillStyle = '#8f7a58'; ctx.font = '9px Courier New'; ctx.fillText('DEPÓSITO', 812, 432);
}
function ofiAtm(ctx) {
  ctx.save();
  for (const m of OFI_MOTES) { ctx.fillStyle = 'rgba(217,164,65,0.10)'; ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
function ofiOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 150, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.7, 'rgba(6,4,2,0.3)'); v.addColorStop(1, 'rgba(6,4,2,0.66)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ DEPÓSITO ============
function renderDeposito(ctx, state) {
  depBg(ctx); depArq(ctx); depLuz(ctx, state); depObj(ctx, state); depOver(ctx);
}
function depBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#0a0906'); g.addColorStop(0.5, '#100d09'); g.addColorStop(1, '#070504');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function depArq(ctx) {
  ctx.fillStyle = '#161109'; ctx.fillRect(0, 0, 900, 440);
  ctx.strokeStyle = 'rgba(74,58,34,0.4)'; ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(i * 78, 0); ctx.lineTo(i * 78, 440); ctx.stroke(); }
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#1e160c'); f.addColorStop(1, '#0c0805');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#4a3a22'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  ctx.lineWidth = 1;
}
function depLuz(ctx, state) {
  const l = ctx.createRadialGradient(450, 40, 10, 450, 40, 380);
  l.addColorStop(0, 'rgba(217,164,65,0.08)'); l.addColorStop(1, 'transparent');
  ctx.fillStyle = l; ctx.fillRect(0, 0, 900, 460);
  if (state.get('sokobanOk')) {
    const w = ctx.createRadialGradient(800, 420, 10, 800, 420, 220);
    w.addColorStop(0, 'rgba(79,199,168,0.14)'); w.addColorStop(1, 'transparent');
    ctx.fillStyle = w; ctx.fillRect(600, 250, 300, 350);
  }
}
function depObj(ctx, state) {
  // --- ESQUEMA NA PAREDE (60, 80, 160, 140) ---
  ctx.fillStyle = '#241a10'; ctx.fillRect(60, 80, 160, 140);
  ctx.strokeStyle = state.get('esquema') ? '#d9a441' : '#4a3a22'; ctx.lineWidth = 2; ctx.strokeRect(60, 80, 160, 140);
  ctx.fillStyle = '#0e0b07'; ctx.fillRect(74, 94, 132, 100);
  // Mini diagrama: grade com X no canto
  ctx.strokeStyle = '#4fc7a8'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(84 + i * 28, 104); ctx.lineTo(84 + i * 28, 184); ctx.stroke(); }
  for (let i = 0; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(84, 104 + i * 27); ctx.lineTo(196, 104 + i * 27); ctx.stroke(); }
  ctx.fillStyle = '#d4643a'; ctx.font = 'bold 14px Courier New'; ctx.fillText('X', 176, 176);
  ctx.fillStyle = '#8f7a58'; ctx.font = '8px Courier New'; ctx.fillText('ESQUEMA', 116, 210);
  ctx.lineWidth = 1;

  // --- ÁREA DE BLOCOS / SOKOBAN (330, 240, 260, 200) ---
  ctx.fillStyle = '#120d08'; ctx.fillRect(330, 240, 260, 200);
  ctx.strokeStyle = state.get('sokobanOk') ? '#4fc7a8' : '#4a3a22'; ctx.lineWidth = 2; ctx.strokeRect(330, 240, 260, 200);
  // Marca X no piso da área
  ctx.fillStyle = '#d4643a'; ctx.font = 'bold 26px Courier New'; ctx.fillText('✕', 540, 285);
  // Engradado (posição depende de sokobanOk)
  const ex = state.get('sokobanOk') ? 520 : 360;
  const ey = state.get('sokobanOk') ? 255 : 350;
  ctx.fillStyle = '#5a4126'; ctx.fillRect(ex, ey, 54, 54);
  ctx.strokeStyle = '#7a5c34'; ctx.lineWidth = 2; ctx.strokeRect(ex, ey, 54, 54);
  ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + 54, ey + 54); ctx.moveTo(ex + 54, ey); ctx.lineTo(ex, ey + 54); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8f7a58'; ctx.font = '8px Courier New'; ctx.fillText('ENGRADADOS', 418, 430);

  // --- ESCOTILHA DE SAÍDA (740, 360, 130, 130) ---
  ctx.fillStyle = '#0e0b07'; ctx.fillRect(740, 360, 130, 130);
  ctx.strokeStyle = state.get('sokobanOk') ? '#4fc7a8' : '#4a3a22'; ctx.lineWidth = 3; ctx.strokeRect(740, 360, 130, 130);
  // Roda da escotilha
  ctx.strokeStyle = state.get('sokobanOk') ? '#4fc7a8' : '#5a4126'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(805, 425, 34, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(771, 425); ctx.lineTo(839, 425); ctx.moveTo(805, 391); ctx.lineTo(805, 459); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8f7a58'; ctx.font = '9px Courier New'; ctx.fillText('ESCOTILHA', 762, 482);

  // --- VOLTAR OFICINA (30, 480, 100, 60) ---
  ctx.fillStyle = '#120d08'; ctx.fillRect(30, 480, 100, 60);
  ctx.strokeStyle = '#4a3a22'; ctx.lineWidth = 2; ctx.strokeRect(30, 480, 100, 60);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8f7a58'; ctx.font = '10px Courier New'; ctx.fillText('← Oficina', 42, 515);
}
function depOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 140, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.7, 'rgba(4,3,2,0.34)'); v.addColorStop(1, 'rgba(4,3,2,0.72)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// OFICINA: relogio(100,70,150,170) gaveta(360,250,120,60) xadrez(360,340,170,100)
//          jigsaw(560,340,200,100) ferramentas(620,90,150,120) porta(810,130,70,310)
// DEPÓSITO: esquema(60,80,160,140) blocos(330,240,260,200) escotilha(740,360,130,130) voltar(30,480,100,60)
