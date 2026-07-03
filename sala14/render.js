/**
 * @module Sala14Render
 * @version 1.0.0
 * @description Renderização cinematográfica da Sala 14 — O Observatório
 * Ambientes: Sala de Controle, Cúpula do Telescópio, Arquivo Estelar
 * Paleta: ThemeObservatory — bg #05060f, accent #8ab4ff, border #26305a
 */

const STARS_BG = [
  {x:60,y:50},{x:140,y:90},{x:220,y:40},{x:300,y:110},{x:390,y:60},{x:470,y:100},
  {x:560,y:45},{x:640,y:95},{x:730,y:55},{x:820,y:100},{x:100,y:160},{x:260,y:180},
  {x:430,y:150},{x:610,y:170},{x:780,y:150},{x:180,y:230},{x:520,y:210},{x:700,y:240}
];
// Constelação de Órion (esquemática)
const ORION = [
  {x:0,y:0},{x:40,y:-10},{x:80,y:5},{x:20,y:50},{x:40,y:55},{x:60,y:50},{x:10,y:100},{x:70,y:105}
];

function drawStars(ctx, ox, oy, w, h, twinkle) {
  for (const s of STARS_BG) {
    if (s.x < ox || s.x > ox + w || s.y < oy || s.y > oy + h) continue;
    ctx.fillStyle = `rgba(200,215,255,${twinkle ? 0.5 + Math.sin((Date.now()/500) + s.x) * 0.3 : 0.6})`;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.x % 3 === 0 ? 1.4 : 0.9, 0, Math.PI * 2); ctx.fill();
  }
}

// ============ SALA DE CONTROLE ============
function renderControle(ctx, state) {
  ctrlBg(ctx); ctrlArq(ctx); ctrlLuz(ctx, state); ctrlObj(ctx, state); ctrlOver(ctx);
}
function ctrlBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#070812'); g.addColorStop(0.5, '#0a0c1c'); g.addColorStop(1, '#05060f');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function ctrlArq(ctx) {
  ctx.fillStyle = '#0b0e1e'; ctx.fillRect(0, 0, 900, 440);
  // Painéis metálicos
  ctx.strokeStyle = '#1a2244'; ctx.lineWidth = 1;
  for (let i = 0; i < 7; i++) ctx.strokeRect(i * 130 + 10, 30, 120, 210);
  // Piso técnico
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#0a0e1e'); f.addColorStop(1, '#05060f');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#26305a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  ctx.strokeStyle = '#12183a'; ctx.lineWidth = 1;
  for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(i * 65, 440); ctx.lineTo(i * 65, 600); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(0, 520); ctx.lineTo(900, 520); ctx.stroke();
}
function ctrlLuz(ctx, state) {
  if (state.get('energia')) {
    const l = ctx.createRadialGradient(450, 40, 20, 450, 40, 340);
    l.addColorStop(0, 'rgba(138,180,255,0.08)'); l.addColorStop(1, 'transparent');
    ctx.fillStyle = l; ctx.fillRect(0, 0, 900, 460);
  } else {
    const p = Math.sin(Date.now() / 900) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255,106,138,${0.03 + p * 0.03})`; ctx.fillRect(0, 0, 900, 600);
  }
}
function ctrlObj(ctx, state) {
  // --- PAINEL DE ENERGIA (60, 90, 150, 160) ---
  ctx.fillStyle = '#0d1024'; ctx.fillRect(60, 90, 150, 160);
  ctx.strokeStyle = state.get('energia') ? '#7fe0c4' : '#26305a'; ctx.lineWidth = 2; ctx.strokeRect(60, 90, 150, 160);
  ctx.fillStyle = '#8ab4ff'; ctx.font = 'bold 11px Courier New'; ctx.fillText('ENERGIA', 98, 116);
  // Slot de fusível
  ctx.fillStyle = state.get('energia') ? '#0a2a20' : '#2a0a12'; ctx.fillRect(90, 130, 90, 50);
  ctx.strokeStyle = state.get('energia') ? '#7fe0c4' : '#ff6a8a'; ctx.strokeRect(90, 130, 90, 50);
  ctx.fillStyle = state.get('energia') ? '#7fe0c4' : '#5a648c'; ctx.font = '9px Courier New';
  ctx.fillText(state.get('energia') ? 'ONLINE' : 'SLOT VAZIO', 100, 160);
  // Botões
  ctx.fillStyle = '#1a2244'; for (let i = 0; i < 3; i++) ctx.fillRect(90 + i * 32, 200, 24, 28);
  ctx.lineWidth = 1;

  // --- MONITOR PRINCIPAL (330, 70, 240, 170) ---
  ctx.fillStyle = '#060810'; ctx.fillRect(330, 70, 240, 170);
  ctx.strokeStyle = '#26305a'; ctx.lineWidth = 2; ctx.strokeRect(330, 70, 240, 170);
  const sg = ctx.createLinearGradient(338, 78, 338, 232);
  sg.addColorStop(0, state.get('energia') ? '#0a1830' : '#080a14'); sg.addColorStop(1, '#05070f');
  ctx.fillStyle = sg; ctx.fillRect(338, 78, 224, 154);
  if (state.get('energia')) {
    ctx.fillStyle = '#8ab4ff'; ctx.font = 'bold 11px Courier New';
    ctx.fillText('OBSERVATÓRIO — SISTEMA', 350, 100);
    ctx.fillStyle = '#7fe0c4'; ctx.font = '10px Courier New';
    ctx.fillText('> ALVO PERDIDO', 350, 124);
    ctx.fillText('> Reaponte o telescópio', 350, 142);
    if (state.get('monitor')) {
      ctx.fillStyle = '#8ab4ff';
      ctx.fillText('> "Busque o CAÇADOR', 350, 168);
      ctx.fillText('   no céu de inverno."', 350, 184);
    } else {
      ctx.fillStyle = '#5a648c'; ctx.fillText('> [clique para ler]', 350, 168);
    }
  } else {
    ctx.fillStyle = '#2a3050'; ctx.font = '11px Courier New'; ctx.fillText('SEM SINAL', 420, 160);
  }
  ctx.lineWidth = 1;

  // --- GAVETA DE INSTRUMENTOS (330, 360, 160, 70) ---
  ctx.fillStyle = '#0d1024'; ctx.fillRect(330, 360, 160, 70);
  ctx.fillStyle = '#0a0c1c'; ctx.fillRect(346, 378, 128, 36);
  ctx.strokeStyle = state.get('gaveta') ? '#8ab4ff' : '#26305a'; ctx.lineWidth = 1; ctx.strokeRect(346, 378, 128, 36);
  ctx.fillStyle = '#8ab4ff'; ctx.fillRect(400, 393, 20, 4);
  ctx.fillStyle = '#5a648c'; ctx.font = '8px Courier New'; ctx.fillText('INSTRUMENTOS', 356, 424);

  // --- PORTA CÚPULA (810, 120, 70, 320) ---
  ctx.fillStyle = '#080a18'; ctx.fillRect(810, 120, 70, 320);
  ctx.strokeStyle = state.get('energia') ? '#8ab4ff' : '#26305a'; ctx.lineWidth = 3; ctx.strokeRect(810, 120, 70, 320);
  ctx.fillStyle = '#5a648c'; ctx.font = '9px Courier New'; ctx.fillText('↑ CÚPULA', 814, 432);
  ctx.lineWidth = 1;

  // --- PORTA ARQUIVO (620, 300, 130, 140) ---
  ctx.fillStyle = '#080a18'; ctx.fillRect(620, 300, 130, 140);
  ctx.strokeStyle = state.get('chaveArquivo') ? '#8ab4ff' : '#26305a'; ctx.lineWidth = 3; ctx.strokeRect(620, 300, 130, 140);
  ctx.fillStyle = '#8ab4ff'; ctx.beginPath(); ctx.arc(636, 375, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#5a648c'; ctx.font = '9px Courier New'; ctx.fillText('ARQUIVO', 650, 432);
  ctx.lineWidth = 1;
}
function ctrlOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 150, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.7, 'rgba(2,3,8,0.3)'); v.addColorStop(1, 'rgba(2,3,8,0.66)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ ARQUIVO ESTELAR ============
function renderArquivo(ctx, state) {
  arqBg(ctx); arqArq(ctx); arqLuz(ctx); arqObj(ctx, state); arqOver(ctx);
}
function arqBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#070915'); g.addColorStop(0.5, '#0a0c1c'); g.addColorStop(1, '#05060f');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function arqArq(ctx) {
  ctx.fillStyle = '#0b0d1c'; ctx.fillRect(0, 0, 900, 440);
  // Prateleiras de mapas
  ctx.fillStyle = '#12162e';
  for (let r = 0; r < 3; r++) { ctx.fillRect(40, 70 + r * 90, 250, 12); }
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#0a0c1a'); f.addColorStop(1, '#05060f');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#26305a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  ctx.lineWidth = 1;
}
function arqLuz(ctx) {
  const l = ctx.createRadialGradient(450, 120, 20, 450, 120, 320);
  l.addColorStop(0, 'rgba(138,180,255,0.06)'); l.addColorStop(1, 'transparent');
  ctx.fillStyle = l; ctx.fillRect(0, 0, 900, 460);
}
function arqObj(ctx, state) {
  // --- ESTANTE DE MAPAS (40, 60, 250, 300) [mapa estelar principal] ---
  ctx.fillStyle = '#0d1024'; ctx.fillRect(40, 60, 250, 300);
  ctx.strokeStyle = state.get('mapa') ? '#8ab4ff' : '#26305a'; ctx.lineWidth = 2; ctx.strokeRect(40, 60, 250, 300);
  // Rolos de mapas
  for (let r = 0; r < 3; r++) for (let cc = 0; cc < 5; cc++) {
    ctx.fillStyle = ['#2a3358','#243052','#2e3860'][(r+cc)%3];
    ctx.fillRect(52 + cc * 46, 90 + r * 90, 40, 60);
  }
  ctx.lineWidth = 1;
  ctx.fillStyle = '#5a648c'; ctx.font = '9px Courier New'; ctx.fillText('MAPAS ESTELARES', 96, 350);

  // --- GLOBO CELESTE (360, 200, 180, 180) ---
  const cx = 450, cy = 285, rr = 82;
  const gg = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, rr);
  gg.addColorStop(0, '#1a2450'); gg.addColorStop(1, '#0a0e22');
  ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = state.get('globo') ? '#8ab4ff' : '#3a4676'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke();
  // Linhas de coordenadas
  ctx.strokeStyle = 'rgba(138,180,255,0.25)'; ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.ellipse(cx, cy, rr, rr * (i/4), 0, 0, Math.PI * 2); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(cx, cy - rr); ctx.lineTo(cx, cy + rr); ctx.stroke();
  // Estrelinhas no globo
  ctx.fillStyle = '#c8d0ec';
  for (const p of ORION) { ctx.beginPath(); ctx.arc(cx - 30 + p.x * 0.7, cy - 40 + p.y * 0.7, 1.6, 0, Math.PI * 2); ctx.fill(); }
  // Base
  ctx.fillStyle = '#1a2244'; ctx.fillRect(cx - 30, cy + rr, 60, 20);
  ctx.lineWidth = 1;

  // --- MESA DE CARTAS (600, 360, 200, 80) ---
  ctx.fillStyle = '#12162e'; ctx.fillRect(600, 360, 200, 80);
  ctx.fillStyle = '#e0dcc0'; ctx.save(); ctx.translate(690, 395); ctx.rotate(0.06); ctx.fillRect(-50, -22, 100, 50); ctx.restore();
  ctx.strokeStyle = state.get('mesa') ? '#8ab4ff' : '#26305a'; ctx.lineWidth = 1; ctx.strokeRect(600, 360, 200, 80);
  ctx.fillStyle = '#5a648c'; ctx.font = '8px Courier New'; ctx.fillText('MESA DE CARTAS', 650, 432);

  // --- COFRE DE DADOS (640, 90, 150, 140) ---
  ctx.fillStyle = '#0d1024'; ctx.fillRect(640, 90, 150, 140);
  ctx.strokeStyle = '#26305a'; ctx.lineWidth = 2; ctx.strokeRect(640, 90, 150, 140);
  ctx.fillStyle = '#0a0c1c'; ctx.fillRect(652, 104, 126, 100);
  ctx.fillStyle = '#3a4676'; ctx.beginPath(); ctx.arc(715, 154, 16, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#8ab4ff'; ctx.beginPath(); ctx.arc(715, 154, 16, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#5a648c'; ctx.font = '8px Courier New'; ctx.fillText('DADOS', 694, 222);

  // --- PORTA CONTROLE (30, 130, 60, 300) ---
  ctx.fillStyle = '#080a18'; ctx.fillRect(30, 130, 60, 300);
  ctx.strokeStyle = '#26305a'; ctx.lineWidth = 2; ctx.strokeRect(30, 130, 60, 300);
  ctx.fillStyle = '#8ab4ff'; ctx.beginPath(); ctx.arc(42, 285, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#5a648c'; ctx.font = '8px Courier New'; ctx.fillText('CONTROLE', 34, 445);
  ctx.lineWidth = 1;
}
function arqOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 150, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.72, 'rgba(2,3,8,0.3)'); v.addColorStop(1, 'rgba(2,3,8,0.66)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ CÚPULA DO TELESCÓPIO ============
function renderCupula(ctx, state) {
  cupBg(ctx); cupArq(ctx); cupCeu(ctx, state); cupObj(ctx, state); cupOver(ctx);
}
function cupBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#04050d'); g.addColorStop(0.5, '#07091a'); g.addColorStop(1, '#04050d');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function cupArq(ctx) {
  // Cúpula (semicírculo) com gomos
  ctx.fillStyle = '#0a0e20';
  ctx.beginPath(); ctx.arc(450, 300, 420, Math.PI, 0); ctx.fill();
  ctx.strokeStyle = '#1a2244'; ctx.lineWidth = 2;
  for (let i = 0; i <= 8; i++) { const a = Math.PI + (i / 8) * Math.PI; ctx.beginPath(); ctx.moveTo(450, 300); ctx.lineTo(450 + Math.cos(a) * 420, 300 + Math.sin(a) * 420); ctx.stroke(); }
  // Anéis
  for (let r = 1; r <= 3; r++) { ctx.beginPath(); ctx.arc(450, 300, r * 105, Math.PI, 0); ctx.stroke(); }
  // Piso
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#0a0c1a'); f.addColorStop(1, '#05060f');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#26305a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  ctx.lineWidth = 1;
}
function cupCeu(ctx, state) {
  // Fenda da cúpula (aberta se energia) mostrando o céu
  if (state.get('energia')) {
    ctx.save();
    ctx.beginPath(); ctx.moveTo(410, 300); ctx.lineTo(380, 30); ctx.lineTo(520, 30); ctx.lineTo(490, 300); ctx.closePath(); ctx.clip();
    const sky = ctx.createLinearGradient(0, 30, 0, 300);
    sky.addColorStop(0, '#0a1030'); sky.addColorStop(1, '#060a1c');
    ctx.fillStyle = sky; ctx.fillRect(360, 30, 180, 280);
    drawStars(ctx, 360, 30, 180, 280, true);
    // Órion na fenda se alinhado
    if (state.get('vitoria')) {
      ctx.strokeStyle = 'rgba(138,180,255,0.7)'; ctx.lineWidth = 1;
      ctx.fillStyle = '#dfe8ff';
      for (const p of ORION) { ctx.beginPath(); ctx.arc(410 + p.x, 90 + p.y, 2.2, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();
  }
}
function cupObj(ctx, state) {
  // --- TELESCÓPIO (350, 250, 240, 200) ---
  ctx.save();
  ctx.translate(450, 400);
  ctx.rotate(state.get('vitoria') ? -0.9 : -0.5);
  const tg = ctx.createLinearGradient(0, -18, 0, 18);
  tg.addColorStop(0, '#2a3468'); tg.addColorStop(0.5, '#3a4680'); tg.addColorStop(1, '#1a2248');
  ctx.fillStyle = tg; ctx.fillRect(-30, -20, 220, 40);
  ctx.fillStyle = '#0a0c1c'; ctx.beginPath(); ctx.ellipse(190, 0, 8, 22, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = state.get('vitoria') ? '#7fe0c4' : '#26305a'; ctx.lineWidth = 2; ctx.strokeRect(-30, -20, 220, 40);
  ctx.restore();
  // Montagem/tripé
  ctx.strokeStyle = '#2a3458'; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(450, 400); ctx.lineTo(420, 470); ctx.moveTo(450, 400); ctx.lineTo(480, 470); ctx.stroke();
  ctx.lineWidth = 1;
  // Base
  ctx.fillStyle = '#12162e'; ctx.fillRect(400, 460, 100, 20);

  // --- CONSOLE DE ALINHAMENTO (640, 340, 200, 120) ---
  ctx.fillStyle = '#0d1024'; ctx.fillRect(640, 340, 200, 120);
  ctx.strokeStyle = state.get('energia') ? '#8ab4ff' : '#26305a'; ctx.lineWidth = 2; ctx.strokeRect(640, 340, 200, 120);
  ctx.fillStyle = '#8ab4ff'; ctx.font = 'bold 11px Courier New'; ctx.fillText('ALINHAMENTO', 680, 366);
  ctx.fillStyle = '#060810'; ctx.fillRect(656, 378, 168, 34);
  ctx.fillStyle = state.get('vitoria') ? '#7fe0c4' : '#3a4676'; ctx.font = '13px Courier New';
  ctx.fillText(state.get('vitoria') ? 'ALVO TRAVADO ✓' : 'AGUARDANDO...', 668, 400);
  ctx.fillStyle = '#1a2244'; for (let i = 0; i < 4; i++) ctx.fillRect(660 + i * 42, 424, 32, 24);
  ctx.lineWidth = 1;

  // --- RODA DE FILTROS (70, 320, 150, 140) ---
  ctx.fillStyle = '#0d1024'; ctx.fillRect(70, 320, 150, 140);
  ctx.strokeStyle = state.get('filtros') ? '#8ab4ff' : '#26305a'; ctx.lineWidth = 2; ctx.strokeRect(70, 320, 150, 140);
  ctx.fillStyle = '#1a2450'; ctx.beginPath(); ctx.arc(145, 390, 46, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#3a4676'; ctx.beginPath(); ctx.arc(145, 390, 46, 0, Math.PI * 2); ctx.stroke();
  const filtCols = ['#ff6a8a','#8ab4ff','#7fe0c4','#e0d060'];
  for (let i = 0; i < 4; i++) { const a = (i/4)*Math.PI*2; ctx.fillStyle = filtCols[i]; ctx.beginPath(); ctx.arc(145 + Math.cos(a)*24, 390 + Math.sin(a)*24, 9, 0, Math.PI*2); ctx.fill(); }
  ctx.lineWidth = 1;
  ctx.fillStyle = '#5a648c'; ctx.font = '9px Courier New'; ctx.fillText('FILTROS', 118, 452);

  // --- ESCADA ↓ CONTROLE (30, 480, 100, 60) ---
  ctx.fillStyle = '#080a18'; ctx.fillRect(30, 480, 100, 60);
  ctx.strokeStyle = '#26305a'; ctx.lineWidth = 2; ctx.strokeRect(30, 480, 100, 60);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#5a648c'; ctx.font = '10px Courier New'; ctx.fillText('↓ Controle', 40, 515);
}
function cupOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 150, 450, 300, 560);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.72, 'rgba(2,3,8,0.28)'); v.addColorStop(1, 'rgba(2,3,8,0.66)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// CONTROLE: painelEnergia(60,90,150,160) monitor(330,70,240,170) gaveta(330,360,160,70)
//           portaCupula(810,120,70,320) portaArquivo(620,300,130,140)
// ARQUIVO: mapa(40,60,250,300) globo(360,200,180,180 -> hit) mesa(600,360,200,80)
//          cofre(640,90,150,140) portaControle(30,130,60,300)
// CÚPULA: telescopio(350,250,240,200 -> hit) console(640,340,200,120)
//         filtros(70,320,150,140) escadaControle(30,480,100,60)
