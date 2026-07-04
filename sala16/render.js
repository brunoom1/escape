/**
 * @module Sala16Render
 * @version 1.0.0
 * @description Renderização da Sala 16 — O Cofre do Banco
 * Ambientes: Tesouraria, Escritório
 * Paleta: ThemeArtDeco — bg #0a0806, accent #d4a843, border #3d3020
 */

const TES_GILT = [
  {x:60,y:68,r:1.1},{x:220,y:55,r:1},{x:400,y:72,r:1.3},{x:560,y:48,r:0.9},
  {x:720,y:60,r:1.2},{x:300,y:120,r:0.8},{x:500,y:110,r:1},{x:780,y:130,r:1.1}
];

// ============ TESOURARIA ============
function renderTesouraria(ctx, state) {
  tesBg(ctx); tesArq(ctx); tesLuz(ctx); tesObj(ctx, state); tesOver(ctx);
}
function tesBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#0e0b07'); g.addColorStop(0.4, '#14100a'); g.addColorStop(1, '#080604');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function tesArq(ctx) {
  // Painéis de madeira escura nas paredes
  ctx.fillStyle = '#1a140d'; ctx.fillRect(0, 0, 900, 440);
  ctx.strokeStyle = 'rgba(50,38,24,0.5)'; ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(i * 78, 0); ctx.lineTo(i * 78, 440); ctx.stroke(); }
  // Faixa de mármore verde no meio
  ctx.fillStyle = '#1a2a20'; ctx.fillRect(0, 180, 900, 14);
  ctx.fillStyle = '#2a3a30'; ctx.fillRect(0, 180, 900, 3);
  // Balcão de mármore
  const bc = ctx.createLinearGradient(0, 380, 0, 450);
  bc.addColorStop(0, '#2a3a30'); bc.addColorStop(0.5, '#1e2a24'); bc.addColorStop(1, '#141a16');
  ctx.fillStyle = bc; ctx.fillRect(420, 380, 250, 70);
  ctx.strokeStyle = '#3d3020'; ctx.lineWidth = 2; ctx.strokeRect(420, 380, 250, 70);
  // Chão de mármore xadrez
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#1a1410'); f.addColorStop(1, '#0c0a06');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#4a3420'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  // Padrão xadrez sutil
  ctx.strokeStyle = 'rgba(61,48,32,0.2)'; ctx.lineWidth = 1;
  for (let r = 0; r < 5; r++) { ctx.beginPath(); ctx.moveTo(0, 450 + r * 32); ctx.lineTo(900, 450 + r * 32); ctx.stroke(); }
  // Friso decorativo art déco no topo
  ctx.fillStyle = '#d4a843'; ctx.fillRect(0, 38, 900, 2);
  for (let i = 0; i < 18; i++) { ctx.fillStyle = '#d4a843'; ctx.fillRect(8 + i * 50, 24, 30, 14); ctx.fillStyle = '#3d3020'; ctx.fillRect(8 + i * 50, 24, 30, 2); }
  ctx.lineWidth = 1;
}
function tesLuz(ctx) {
  // Lustre dourado
  const l = ctx.createRadialGradient(450, 70, 8, 450, 70, 260);
  l.addColorStop(0, 'rgba(212,168,67,0.12)'); l.addColorStop(0.6, 'rgba(212,168,67,0.04)'); l.addColorStop(1, 'transparent');
  ctx.fillStyle = l; ctx.fillRect(200, 0, 500, 300);
}
function tesObj(ctx, state) {
  // --- PORTA DO COFRE (80, 160, 170, 280) ---
  ctx.fillStyle = '#100c08'; ctx.fillRect(80, 160, 170, 280);
  ctx.strokeStyle = state.get('portaAberta') ? '#4caf50' : '#3d3020'; ctx.lineWidth = 4; ctx.strokeRect(80, 160, 170, 280);
  // Círculo do cofre
  const cx = 165, cy = 300, r = 85;
  ctx.fillStyle = '#0a0806'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = state.get('portaAberta') ? '#4caf50' : '#d4a843'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  // Raios da roda
  ctx.strokeStyle = '#3d3020'; ctx.lineWidth = 2;
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * 60, cy + Math.sin(a) * 60); ctx.stroke(); }
  ctx.strokeStyle = '#5a4a2a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = state.get('portaAberta') ? '#4caf50' : '#d4a843'; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a60'; ctx.font = '9px Georgia, serif'; ctx.fillText('COFRE FORT', 106, 430);

  // --- GAVETA (260, 200, 170, 70) ---
  ctx.fillStyle = '#2a1e12'; ctx.fillRect(260, 200, 170, 70);
  ctx.fillStyle = '#1e1408'; ctx.fillRect(270, 210, 150, 48);
  ctx.strokeStyle = state.get('gavetaOk') ? '#d4a843' : '#3d3020'; ctx.lineWidth = 2; ctx.strokeRect(260, 200, 170, 70);
  // Puxador
  ctx.fillStyle = '#d4a843'; ctx.fillRect(335, 232, 20, 6);
  ctx.fillStyle = '#8a7a60'; ctx.font = '9px Georgia, serif'; ctx.fillText('CAIXA FORTE', 292, 260);
  ctx.lineWidth = 1;

  // --- PRATELEIRA (680, 70, 170, 220) ---
  ctx.fillStyle = '#1e1810'; ctx.fillRect(680, 70, 170, 220);
  ctx.strokeStyle = state.get('livroOk') ? '#d4a843' : '#3d3020'; ctx.lineWidth = 2; ctx.strokeRect(680, 70, 170, 220);
  // Prateleiras
  ctx.fillStyle = '#3d3020'; ctx.fillRect(680, 108, 170, 6); ctx.fillRect(680, 162, 170, 6); ctx.fillRect(680, 216, 170, 6);
  // Livros
  ctx.fillStyle = '#8a2020'; ctx.fillRect(694, 78, 22, 30); ctx.fillStyle = '#2a4a30'; ctx.fillRect(722, 82, 18, 26);
  ctx.fillStyle = '#5a3a1a'; ctx.fillRect(698, 118, 24, 44); ctx.fillStyle = '#3a2a4a'; ctx.fillRect(728, 124, 20, 38);
  ctx.fillStyle = '#6a4a2a'; ctx.fillRect(694, 174, 26, 42); ctx.fillStyle = '#4a2a2a'; ctx.fillRect(726, 178, 18, 38);
  ctx.fillStyle = '#8a7a60'; ctx.font = '8px Georgia, serif'; ctx.fillText('LIVROS', 756, 276);
  ctx.lineWidth = 1;

  // --- GRADE (810, 180, 70, 260) ---
  ctx.fillStyle = '#0a0806'; ctx.fillRect(810, 180, 70, 260);
  ctx.strokeStyle = state.get('cartaoColetado') ? '#d4a843' : '#3d3020'; ctx.lineWidth = 3; ctx.strokeRect(810, 180, 70, 260);
  // Barras de ferro
  ctx.strokeStyle = '#3d3020'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(822, 180); ctx.lineTo(822, 440); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(838, 180); ctx.lineTo(838, 440); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(854, 180); ctx.lineTo(854, 440); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(870, 180); ctx.lineTo(870, 440); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a60'; ctx.font = '9px Georgia, serif'; ctx.fillText('ESCRITÓRIO', 812, 424);
}
function tesOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 120, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.65, 'rgba(8,6,4,0.35)'); v.addColorStop(1, 'rgba(8,6,4,0.72)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ ESCRITÓRIO ============
function renderEscritorio(ctx, state) {
  escBg(ctx); escArq(ctx); escLuz(ctx); escObj(ctx, state); escOver(ctx);
}
function escBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#100c08'); g.addColorStop(0.4, '#16120c'); g.addColorStop(1, '#0a0806');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function escArq(ctx) {
  // Lambril de madeira
  ctx.fillStyle = '#1a140d'; ctx.fillRect(0, 0, 900, 440);
  ctx.strokeStyle = 'rgba(61,48,32,0.4)'; ctx.lineWidth = 1;
  for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(i * 66, 0); ctx.lineTo(i * 66, 440); ctx.stroke(); }
  // Faixa decorativa
  ctx.fillStyle = '#d4a843'; ctx.fillRect(0, 100, 900, 2);
  ctx.fillStyle = '#2a2014'; ctx.fillRect(0, 180, 900, 80);
  ctx.strokeStyle = '#3d3020'; ctx.lineWidth = 1;
  for (let i = 0; i < 26; i++) { ctx.fillStyle = i % 2 === 0 ? '#d4a843' : '#2a2014'; ctx.fillRect(i * 35, 182, 35, 76); }
  // Janela (com cortinas)
  ctx.fillStyle = '#0a0806'; ctx.fillRect(600, 40, 180, 240);
  ctx.strokeStyle = '#3d3020'; ctx.lineWidth = 2; ctx.strokeRect(600, 40, 180, 240);
  ctx.strokeStyle = '#3d3020'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(690, 40); ctx.lineTo(690, 280); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 150); ctx.lineTo(780, 150); ctx.stroke();
  // Cortinas
  ctx.fillStyle = 'rgba(90,30,30,0.5)'; ctx.fillRect(590, 40, 16, 240); ctx.fillRect(774, 40, 16, 240);
  // Chão
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#1a1410'); f.addColorStop(1, '#0c0a06');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#4a3420'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  // Tapete
  ctx.fillStyle = '#2a1a14'; ctx.fillRect(100, 460, 500, 120);
  ctx.strokeStyle = '#d4a843'; ctx.lineWidth = 1; ctx.strokeRect(120, 470, 460, 100);
  ctx.strokeStyle = 'rgba(212,168,67,0.3)'; ctx.lineWidth = 1; ctx.strokeRect(140, 485, 420, 70);
  ctx.lineWidth = 1;
}
function escLuz(ctx) {
  // Abajur na escrivaninha
  const l = ctx.createRadialGradient(130, 230, 6, 130, 230, 200);
  l.addColorStop(0, 'rgba(212,168,67,0.14)'); l.addColorStop(0.5, 'rgba(212,168,67,0.05)'); l.addColorStop(1, 'transparent');
  ctx.fillStyle = l; ctx.fillRect(0, 100, 350, 350);
}
function escObj(ctx, state) {
  // --- ESCRIVANINHA (50, 200, 180, 120) ---
  ctx.fillStyle = '#2a1e12'; ctx.fillRect(50, 200, 180, 120);
  ctx.fillStyle = '#1e1408'; ctx.fillRect(56, 210, 168, 100);
  ctx.strokeStyle = state.get('calendarioOk') ? '#d4a843' : '#3d3020'; ctx.lineWidth = 2; ctx.strokeRect(50, 200, 180, 120);
  // Abajur
  ctx.fillStyle = '#d4a843'; ctx.beginPath(); ctx.moveTo(192, 205); ctx.lineTo(210, 195); ctx.lineTo(216, 205); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#5a4a2a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(204, 205); ctx.lineTo(204, 220); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a60'; ctx.font = '9px Georgia, serif'; ctx.fillText('ESCRIVANINHA', 74, 310);

  // --- RELÓGIO DE PÊNDULO (350, 40, 180, 360) ---
  ctx.fillStyle = '#1a1208'; ctx.fillRect(350, 40, 180, 360);
  ctx.strokeStyle = '#3d3020'; ctx.lineWidth = 3; ctx.strokeRect(350, 40, 180, 360);
  // Tórax do relógio
  ctx.fillStyle = '#2a1e12'; ctx.fillRect(360, 50, 160, 120);
  ctx.fillStyle = '#0e0b07'; ctx.beginPath(); ctx.arc(440, 108, 44, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d4a843'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(440, 108, 44, 0, Math.PI * 2); ctx.stroke();
  // Ponteiros (sempre marcando ~10:10)
  ctx.strokeStyle = '#d4a843'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(440, 108); ctx.lineTo(440 + Math.cos(-0.52) * 22, 108 + Math.sin(-0.52) * 22); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(440, 108); ctx.lineTo(440 + Math.cos(2.0) * 30, 108 + Math.sin(2.0) * 30); ctx.stroke();
  ctx.lineWidth = 1;
  // Corpo do relógio (porta)
  ctx.fillStyle = '#1a140d'; ctx.fillRect(370, 180, 140, 200);
  ctx.strokeStyle = '#3d3020'; ctx.lineWidth = 2; ctx.strokeRect(370, 180, 140, 200);
  // Pêndulo
  ctx.strokeStyle = '#d4a843'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(440, 180); ctx.lineTo(430, 280); ctx.stroke();
  ctx.fillStyle = '#d4a843'; ctx.beginPath(); ctx.arc(430, 285, 10, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a60'; ctx.font = '8px Georgia, serif'; ctx.fillText('RELÓGIO', 450, 390);

  // --- QUADRO NA PAREDE (720, 60, 140, 170) ---
  ctx.fillStyle = '#1a1410'; ctx.fillRect(720, 60, 140, 170);
  ctx.strokeStyle = '#d4a843'; ctx.lineWidth = 4; ctx.strokeRect(720, 60, 140, 170);
  ctx.strokeStyle = '#3d3020'; ctx.lineWidth = 2; ctx.strokeRect(730, 70, 120, 150);
  ctx.fillStyle = '#0e0b07'; ctx.beginPath(); ctx.arc(790, 140, 42, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d4a843'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(790, 140, 38, 0, Math.PI * 2); ctx.stroke();
  // Paisagem estilizada dentro do quadro
  ctx.fillStyle = '#3d3020'; ctx.fillRect(760, 182, 60, 30);
  ctx.fillStyle = '#5a4a2a'; ctx.fillRect(790, 188, 18, 24);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a60'; ctx.font = '8px Georgia, serif'; ctx.fillText('QUADRO', 770, 224);

  // --- VOLTAR TESOURARIA ---
  ctx.fillStyle = '#0c0a06'; ctx.fillRect(30, 470, 100, 60);
  ctx.strokeStyle = '#3d3020'; ctx.lineWidth = 2; ctx.strokeRect(30, 470, 100, 60);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a60'; ctx.font = '10px Georgia, serif'; ctx.fillText('→ Tesouraria', 38, 505);
}
function escOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 130, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.6, 'rgba(8,6,4,0.3)'); v.addColorStop(1, 'rgba(8,6,4,0.68)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// TESOURARIA: porta_cofre(80,160,170,280) gaveta(260,200,170,70)
//             prateleira(680,70,170,220) grade(810,180,70,260)
// ESCRITÓRIO: escrivaninha(50,200,180,120) relogio(350,40,180,360)
//             quadro(720,60,140,170) voltar(30,470,100,60)
