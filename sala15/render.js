/**
 * @module Sala15Render
 * @version 2.1.0
 * @description Renderização da Sala 15 — A Oficina do Relojoeiro (JOGO DE TESTE)
 * Ambientes: Oficina, Depósito
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Paleta: ThemeClockwork — bg #0c0a07, accent #d9a441, border #4a3a22
 * Puzzles manipulativos: relógio (ajuste), remontagem de imagem, sokoban
 */

const OFI_MOTES = [
  {x:150,y:90,r:1.2},{x:340,y:60,r:1},{x:540,y:120,r:1.4},{x:720,y:80,r:1.1},
  {x:240,y:170,r:0.9},{x:620,y:190,r:1.3},{x:440,y:100,r:1},{x:800,y:150,r:1.2}
];

// ---- Decoração pré-calculada (não-interativa, fora das hit areas) ----
const OFI_DECO_CLOCKS = [ {x:305,y:70,r:26}, {x:475,y:55,r:19}, {x:560,y:110,r:15} ];
const OFI_GEARS = [ {x:45,y:288,r:15,t:8}, {x:72,y:302,r:9,t:7}, {x:40,y:352,r:12,t:8} ];
const OFI_STAINS = [ {x:280,y:170,w:70,h:34}, {x:690,y:250,w:70,h:36}, {x:150,y:300,w:52,h:24} ];
const DEP_MOTES = [ {x:280,y:70,r:1},{x:640,y:110,r:1.2},{x:500,y:60,r:0.9},{x:760,y:90,r:1.1},{x:400,y:150,r:1},{x:840,y:200,r:1.3} ];
const DEP_CRATES = [ {x:612,y:372,s:56}, {x:674,y:388,s:42}, {x:628,y:314,s:48} ];
const DEP_STAINS = [ {x:250,y:120,w:70,h:40}, {x:640,y:180,w:80,h:36}, {x:250,y:470,w:120,h:30} ];

// ---- Helpers de decoração ----
function drawWallClock(ctx, cx, cy, r) {
  ctx.save();
  ctx.fillStyle = '#1a1209'; ctx.beginPath(); ctx.arc(cx, cy, r + 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0e0b07'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#5a4126'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#8f7a58'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(-0.7) * r * 0.55, cy + Math.sin(-0.7) * r * 0.55); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(1.5) * r * 0.8, cy + Math.sin(1.5) * r * 0.8); ctx.stroke();
  ctx.fillStyle = '#5a4126'; ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
function drawGear(ctx, cx, cy, r, teeth, color) {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2); ctx.stroke();
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r * 0.7, cy + Math.sin(a) * r * 0.7);
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.stroke();
  }
  ctx.restore();
}
function drawCrate(ctx, x, y, s) {
  ctx.fillStyle = '#241a10'; ctx.fillRect(x, y, s, s);
  ctx.strokeStyle = '#4a3a22'; ctx.lineWidth = 2; ctx.strokeRect(x, y, s, s);
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y); ctx.lineTo(x, y + s); ctx.stroke();
  ctx.lineWidth = 1;
}

// ============ OFICINA ============
function renderOficina(ctx, state) {
  ofiBg(ctx); ofiArq(ctx); ofiLuz(ctx); ofiDet(ctx); ofiDec(ctx); ofiObj(ctx, state); ofiAtm(ctx); ofiOver(ctx);
}
function ofiDet(ctx) {
  // Camada 4: manchas de umidade e marcas de desgaste na parede
  ctx.save();
  for (const s of OFI_STAINS) {
    const g = ctx.createRadialGradient(s.x + s.w / 2, s.y + s.h / 2, 2, s.x + s.w / 2, s.y + s.h / 2, s.w / 2);
    g.addColorStop(0, 'rgba(10,7,4,0.5)'); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(s.x, s.y, s.w, s.h);
  }
  ctx.restore();
}
function ofiDec(ctx) {
  // Camada 5: props não-interativos (relógios de parede, engrenagens em prateleira)
  for (const c of OFI_DECO_CLOCKS) drawWallClock(ctx, c.x, c.y, c.r);
  for (const g of OFI_GEARS) drawGear(ctx, g.x, g.y, g.r, g.t, '#5a4126');
}
function ofiBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#100c08'); g.addColorStop(0.5, '#15110b'); g.addColorStop(1, '#0a0806');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function ofiArq(ctx) {
  ctx.fillStyle = '#1a140d'; ctx.fillRect(0, 0, 900, 440);
  ctx.strokeStyle = 'rgba(74,58,34,0.6)'; ctx.lineWidth = 1;
  for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.moveTo(i * 92, 0); ctx.lineTo(i * 92, 440); ctx.stroke(); }
  ctx.fillStyle = '#241a10'; ctx.fillRect(0, 250, 90, 10); ctx.fillRect(0, 320, 90, 10);
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
  const cx = 175, cy = 145, rr = 52;
  ctx.fillStyle = '#0e0b07'; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d9a441'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#8f7a58';
  for (let i = 0; i < 12; i++) { const a = (i/12)*Math.PI*2; ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*(rr-6), cy+Math.sin(a)*(rr-6)); ctx.lineTo(cx+Math.cos(a)*(rr-2), cy+Math.sin(a)*(rr-2)); ctx.stroke(); }
  if (state.get('relogioOk')) {
    ctx.strokeStyle = '#e6d6b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(-Math.PI/2 + 0.26)*26, cy + Math.sin(-Math.PI/2 + 0.26)*26); ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + 40); ctx.stroke();
  } else if (state.get('ponteiroColetado')) {
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

  // --- BANCADA DE REMONTAGEM (350, 340, 270, 100) ---
  ctx.fillStyle = '#2a1e12'; ctx.fillRect(345, 430, 280, 12);
  ctx.fillStyle = '#1a1209'; ctx.fillRect(350, 340, 270, 100);
  ctx.strokeStyle = state.get('mostradorOk') ? '#4fc7a8' : '#4a3a22'; ctx.lineWidth = 2; ctx.strokeRect(350, 340, 270, 100);
  // Grade 3x3 insinuando os cacos
  ctx.strokeStyle = '#3a2a18';
  for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(410 + i * 55, 352); ctx.lineTo(410 + i * 55, 428); ctx.stroke(); }
  for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(412, 352 + i * 25); ctx.lineTo(578, 352 + i * 25); ctx.stroke(); }
  ctx.strokeStyle = '#4a3a22'; ctx.strokeRect(412, 352, 166, 76);
  // Se montado, mostra um mini mostrador dourado
  if (state.get('mostradorOk')) {
    ctx.strokeStyle = '#d9a441'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(495, 390, 30, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#d9a441'; ctx.font = 'bold 12px Courier New'; ctx.fillText('504', 480, 395);
  }
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8f7a58'; ctx.font = '8px Courier New'; ctx.fillText('BANCADA', 452, 452);

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
  depBg(ctx); depArq(ctx); depLuz(ctx, state); depDet(ctx); depDec(ctx); depObj(ctx, state); depAtm(ctx); depOver(ctx);
}
function depDet(ctx) {
  // Camada 4: manchas e rachaduras
  ctx.save();
  for (const s of DEP_STAINS) {
    const g = ctx.createRadialGradient(s.x + s.w / 2, s.y + s.h / 2, 2, s.x + s.w / 2, s.y + s.h / 2, s.w / 2);
    g.addColorStop(0, 'rgba(8,5,3,0.55)'); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(s.x, s.y, s.w, s.h);
  }
  ctx.strokeStyle = 'rgba(74,58,34,0.35)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(300, 0); ctx.lineTo(320, 60); ctx.lineTo(308, 130); ctx.stroke();
  ctx.restore();
}
function depDec(ctx) {
  // Camada 5: engradados empilhados (não-interativos) e cano no teto
  for (const c of DEP_CRATES) drawCrate(ctx, c.x, c.y, c.s);
  ctx.strokeStyle = '#3a2a18'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(240, 26); ctx.lineTo(900, 26); ctx.stroke();
  ctx.lineWidth = 1;
}
function depAtm(ctx) {
  // Camada 7: poeira suspensa
  ctx.save();
  for (const m of DEP_MOTES) { ctx.fillStyle = 'rgba(217,164,65,0.09)'; ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
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
    const w = ctx.createRadialGradient(805, 425, 10, 805, 425, 220);
    w.addColorStop(0, 'rgba(79,199,168,0.14)'); w.addColorStop(1, 'transparent');
    ctx.fillStyle = w; ctx.fillRect(600, 250, 300, 350);
  }
}
function depObj(ctx, state) {
  // --- ESQUEMA NA PAREDE (60, 80, 160, 140) ---
  ctx.fillStyle = '#241a10'; ctx.fillRect(60, 80, 160, 140);
  ctx.strokeStyle = state.get('esquema') ? '#d9a441' : '#4a3a22'; ctx.lineWidth = 2; ctx.strokeRect(60, 80, 160, 140);
  ctx.fillStyle = '#0e0b07'; ctx.fillRect(74, 94, 132, 100);
  ctx.strokeStyle = '#4fc7a8'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(84 + i * 28, 104); ctx.lineTo(84 + i * 28, 184); ctx.stroke(); }
  for (let i = 0; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(84, 104 + i * 27); ctx.lineTo(196, 104 + i * 27); ctx.stroke(); }
  ctx.fillStyle = '#d4643a'; ctx.font = 'bold 14px Courier New'; ctx.fillText('X', 176, 176);
  ctx.fillStyle = '#8f7a58'; ctx.font = '8px Courier New'; ctx.fillText('ESQUEMA', 116, 210);
  ctx.lineWidth = 1;

  // --- ÁREA DE BLOCOS / SOKOBAN (330, 240, 260, 200) — três marcas, três engradados ---
  ctx.fillStyle = '#120d08'; ctx.fillRect(330, 240, 260, 200);
  const okS = state.get('sokobanOk');
  ctx.strokeStyle = okS ? '#4fc7a8' : '#4a3a22'; ctx.lineWidth = 2; ctx.strokeRect(330, 240, 260, 200);
  ctx.fillStyle = '#d4643a'; ctx.font = 'bold 20px Courier New';
  for (const mx of [372, 452, 532]) ctx.fillText('✕', mx, 306);
  const crates = okS ? [[362, 282], [442, 282], [522, 282]] : [[350, 366], [426, 366], [502, 366]];
  for (const cr of crates) {
    ctx.fillStyle = okS ? '#1a3a30' : '#5a4126'; ctx.fillRect(cr[0], cr[1], 44, 44);
    ctx.strokeStyle = okS ? '#4fc7a8' : '#7a5c34'; ctx.lineWidth = 2; ctx.strokeRect(cr[0], cr[1], 44, 44);
    ctx.beginPath(); ctx.moveTo(cr[0], cr[1]); ctx.lineTo(cr[0] + 44, cr[1] + 44); ctx.moveTo(cr[0] + 44, cr[1]); ctx.lineTo(cr[0], cr[1] + 44); ctx.stroke();
  }
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8f7a58'; ctx.font = '8px Courier New'; ctx.fillText('ENGRADADOS', 418, 430);

  // --- ESCOTILHA DE SAÍDA (740, 360, 130, 130) ---
  ctx.fillStyle = '#0e0b07'; ctx.fillRect(740, 360, 130, 130);
  ctx.strokeStyle = state.get('sokobanOk') ? '#4fc7a8' : '#4a3a22'; ctx.lineWidth = 3; ctx.strokeRect(740, 360, 130, 130);
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
// OFICINA: relogio(100,70,150,170) gaveta(360,250,120,60) bancada(350,340,270,100)
//          ferramentas(620,90,150,120) porta(810,130,70,310)
// DEPÓSITO: esquema(60,80,160,140) blocos(330,240,260,200) escotilha(740,360,130,130) voltar(30,480,100,60)
