/**
 * @module Sala11Render
 * @version 1.0.0
 * @description Renderização cinematográfica da Sala 11 — O Grande Hotel
 * Ambientes: Recepção, Suíte 237, Porão
 * Paleta: ThemeHotel — bg #0f0708, accent #d4a95a, border #4a2a2e
 */

const HOTEL_DUST = [
  {x:120,y:80,r:1.2},{x:300,y:140,r:1},{x:500,y:60,r:1.5},{x:700,y:120,r:1.1},
  {x:200,y:200,r:0.9},{x:600,y:220,r:1.3},{x:400,y:90,r:1},{x:800,y:180,r:1.2}
];

// ============ RECEPÇÃO ============
function renderRecepcao(ctx, state) {
  recBg(ctx); recArq(ctx); recLuz(ctx); recDet(ctx); recObj(ctx, state); recOver(ctx);
}
function recBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#150a0c'); g.addColorStop(0.5, '#1a0e10'); g.addColorStop(1, '#0d0708');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function recArq(ctx) {
  // Papel de parede bordô com listras
  ctx.fillStyle = '#1e1012'; ctx.fillRect(0, 0, 900, 430);
  ctx.strokeStyle = 'rgba(74,42,46,0.6)'; ctx.lineWidth = 1;
  for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.moveTo(i * 32, 0); ctx.lineTo(i * 32, 430); ctx.stroke(); }
  // Rodateto dourado
  ctx.fillStyle = '#4a2a1e'; ctx.fillRect(0, 60, 900, 8);
  ctx.fillStyle = '#6a4a2a'; ctx.fillRect(0, 58, 900, 3);
  // Carpete
  const c = ctx.createLinearGradient(0, 430, 0, 600);
  c.addColorStop(0, '#3a1416'); c.addColorStop(1, '#1e0a0c');
  ctx.fillStyle = c; ctx.fillRect(0, 430, 900, 170);
  ctx.strokeStyle = '#4a1a1e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 430); ctx.lineTo(900, 430); ctx.stroke();
  // Padrão do carpete
  ctx.strokeStyle = 'rgba(212,169,90,0.12)';
  for (let i = 0; i < 9; i++) { ctx.strokeRect(40 + i * 95, 460, 60, 40); }
  ctx.lineWidth = 1;
}
function recLuz(ctx) {
  const l = ctx.createRadialGradient(450, 40, 20, 450, 40, 360);
  l.addColorStop(0, 'rgba(212,169,90,0.10)'); l.addColorStop(1, 'transparent');
  ctx.fillStyle = l; ctx.fillRect(0, 0, 900, 460);
  // Lustre insinuado
  ctx.fillStyle = 'rgba(212,169,90,0.5)';
  ctx.beginPath(); ctx.arc(450, 30, 6, 0, Math.PI * 2); ctx.fill();
}
function recDet(ctx) {
  ctx.fillStyle = 'rgba(30,15,16,0.4)';
  ctx.beginPath(); ctx.ellipse(250, 55, 60, 18, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(720, 48, 45, 14, 0.3, 0, Math.PI * 2); ctx.fill();
}
function recObj(ctx, state) {
  // --- BALCÃO DE RECEPÇÃO + LIVRO (300, 340, 260, 100) ---
  const b = ctx.createLinearGradient(300, 340, 300, 440);
  b.addColorStop(0, '#3a2416'); b.addColorStop(1, '#1e120a');
  ctx.fillStyle = b; ctx.fillRect(300, 340, 260, 100);
  ctx.fillStyle = '#4a2e1a'; ctx.fillRect(300, 336, 260, 6);
  // Livro de registro aberto
  ctx.fillStyle = state.get('livro') ? '#8a7a5a' : '#c8b88a';
  ctx.fillRect(360, 356, 90, 56);
  ctx.strokeStyle = '#3a2a12'; ctx.strokeRect(360, 356, 90, 56);
  ctx.strokeStyle = '#7a6a4a'; ctx.beginPath(); ctx.moveTo(405, 356); ctx.lineTo(405, 412); ctx.stroke();
  ctx.fillStyle = '#5a4a2a'; ctx.font = '7px Georgia';
  for (let i = 0; i < 4; i++) { ctx.fillText('———', 366, 370 + i * 10); ctx.fillText('———', 412, 370 + i * 10); }
  // Sino de recepção
  ctx.fillStyle = '#d4a95a'; ctx.beginPath(); ctx.arc(500, 344, 12, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#a07a2a'; ctx.beginPath(); ctx.arc(500, 332, 3, 0, Math.PI * 2); ctx.fill();

  // --- ESCANINHO DE CHAVES (600, 90, 200, 160) ---
  ctx.fillStyle = '#241416'; ctx.fillRect(600, 90, 200, 160);
  ctx.strokeStyle = state.get('chaveColetada') ? '#d4a95a' : '#4a2a2e'; ctx.lineWidth = 2;
  ctx.strokeRect(600, 90, 200, 160);
  // Escaninhos (grid)
  ctx.strokeStyle = '#3a2024'; ctx.lineWidth = 1;
  for (let r = 0; r < 4; r++) for (let cc = 0; cc < 5; cc++) {
    ctx.strokeRect(608 + cc * 38, 98 + r * 38, 34, 34);
  }
  // Chave 237 pendurada (se não coletada)
  if (!state.get('chaveColetada')) {
    ctx.fillStyle = '#d4a95a';
    ctx.fillRect(662, 172, 3, 16); ctx.beginPath(); ctx.arc(663, 172, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(662, 186, 8, 2);
  }
  ctx.fillStyle = '#8a6a62'; ctx.font = '8px Georgia'; ctx.fillText('237', 655, 240);

  // --- QUADRO DO FUNDADOR (60, 90, 150, 190) ---
  ctx.fillStyle = '#2a1a10'; ctx.fillRect(60, 90, 150, 190);
  ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 6; ctx.strokeRect(60, 90, 150, 190);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#1a1218'; ctx.fillRect(74, 104, 122, 162);
  // Silhueta
  ctx.fillStyle = '#2e2028'; ctx.beginPath(); ctx.arc(135, 160, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(105, 186, 60, 70);
  ctx.fillStyle = '#8a6a62'; ctx.font = '9px Georgia'; ctx.fillText('FUNDADOR', 98, 258);

  // --- RELÓGIO DE PAREDE (420, 90, 70, 120) ---
  ctx.fillStyle = '#2a1a12'; ctx.fillRect(420, 90, 70, 120);
  ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 3; ctx.strokeRect(420, 90, 70, 120);
  ctx.fillStyle = '#1a1210'; ctx.beginPath(); ctx.arc(455, 135, 26, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d4a95a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(455, 135, 26, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#c8b088'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(455, 135); ctx.lineTo(455, 118); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(455, 135); ctx.lineTo(469, 140); ctx.stroke();
  ctx.lineWidth = 1;

  // --- ESCADARIA → SUÍTE (porta, 810, 120, 70, 320) ---
  ctx.fillStyle = '#1a0e10'; ctx.fillRect(810, 120, 70, 320);
  ctx.strokeStyle = state.get('chaveColetada') ? '#d4a95a' : '#4a2a2e'; ctx.lineWidth = 3;
  ctx.strokeRect(810, 120, 70, 320);
  ctx.strokeStyle = '#3a2024'; ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(815, 150 + i * 34); ctx.lineTo(875, 145 + i * 34); ctx.stroke(); }
  ctx.fillStyle = '#8a6a62'; ctx.font = '9px Georgia'; ctx.fillText('↑ SUÍTES', 818, 432);
}
function recOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 150, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.7, 'rgba(10,4,6,0.28)'); v.addColorStop(1, 'rgba(10,4,6,0.66)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ SUÍTE 237 ============
function renderSuite(ctx, state) {
  suiBg(ctx); suiArq(ctx); suiLuz(ctx); suiObj(ctx, state); suiOver(ctx);
}
function suiBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#120a10'); g.addColorStop(0.5, '#180e14'); g.addColorStop(1, '#0d0709');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function suiArq(ctx) {
  ctx.fillStyle = '#1c1016'; ctx.fillRect(0, 0, 900, 440);
  // Boiserie (painéis de parede)
  ctx.strokeStyle = 'rgba(74,42,46,0.7)'; ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) ctx.strokeRect(20 + i * 145, 80, 120, 300);
  // Piso de madeira
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#2a1810'); f.addColorStop(1, '#150c08');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#1e1208'; for (let i = 0; i < 11; i++) { ctx.beginPath(); ctx.moveTo(i * 85, 440); ctx.lineTo(i * 85 - 15, 600); ctx.stroke(); }
  ctx.strokeStyle = '#4a2a2e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  ctx.lineWidth = 1;
}
function suiLuz(ctx) {
  const l = ctx.createRadialGradient(700, 120, 10, 700, 120, 260);
  l.addColorStop(0, 'rgba(212,169,90,0.12)'); l.addColorStop(1, 'transparent');
  ctx.fillStyle = l; ctx.fillRect(450, 0, 450, 400);
}
function suiObj(ctx, state) {
  // --- CAMA (60, 320, 260, 140) ---
  ctx.fillStyle = '#2a1a1e'; ctx.fillRect(60, 340, 260, 120);
  ctx.fillStyle = '#3a2028'; ctx.fillRect(60, 320, 60, 140); // cabeceira
  ctx.fillStyle = state.get('cama') ? '#5a4a4a' : '#7a6a64'; ctx.fillRect(120, 350, 190, 70); // colcha
  ctx.strokeStyle = '#4a2a2e'; ctx.strokeRect(120, 350, 190, 70);
  ctx.fillStyle = '#8a7a72'; ctx.fillRect(130, 336, 60, 26); // travesseiro

  // --- COFRE (400, 330, 110, 100) ---
  ctx.fillStyle = '#1a1214'; ctx.fillRect(400, 330, 110, 100);
  const cg = ctx.createLinearGradient(400, 330, 510, 430);
  cg.addColorStop(0, '#2a2226'); cg.addColorStop(1, '#12100e');
  ctx.fillStyle = cg; ctx.fillRect(406, 336, 98, 88);
  ctx.strokeStyle = state.get('cofreAberto') ? '#7fc98a' : '#4a2a2e'; ctx.lineWidth = 3;
  ctx.strokeRect(400, 330, 110, 100);
  ctx.fillStyle = '#3a3236'; ctx.beginPath(); ctx.arc(455, 380, 15, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d4a95a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(455, 380, 15, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#d4a95a'; ctx.beginPath(); ctx.arc(455, 380, 3, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;

  // --- ESPELHO (600, 100, 120, 200) ---
  ctx.fillStyle = '#0a0810'; ctx.fillRect(600, 100, 120, 200);
  ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 6; ctx.strokeRect(600, 100, 120, 200);
  ctx.lineWidth = 1;
  const mg = ctx.createLinearGradient(606, 106, 714, 294);
  mg.addColorStop(0, '#1a2028'); mg.addColorStop(0.5, '#12161c'); mg.addColorStop(1, '#0e1216');
  ctx.fillStyle = mg; ctx.fillRect(606, 106, 108, 188);
  // Marca de batom (se investigado)
  if (state.get('espelho')) {
    ctx.fillStyle = '#c0473f'; ctx.font = 'bold 22px Georgia';
    ctx.fillText('ᒎƐϽ', 620, 200); // número refletido, estilizado
  } else {
    ctx.fillStyle = 'rgba(192,71,63,0.25)'; ctx.font = 'bold 22px Georgia';
    ctx.fillText('· · ·', 632, 200);
  }

  // --- TELEFONE (760, 350, 90, 70) ---
  ctx.fillStyle = '#1a1012'; ctx.fillRect(760, 375, 90, 45);
  ctx.fillStyle = '#2a1a1e'; ctx.fillRect(768, 360, 74, 20);
  ctx.fillStyle = '#d4a95a'; ctx.beginPath(); ctx.arc(772, 385, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#8a6a62'; ctx.font = '8px Georgia'; ctx.fillText('☎', 800, 392);

  // --- ALÇAPÃO → PORÃO (150, 470, 120, 80) ---
  ctx.fillStyle = '#1a100a'; ctx.fillRect(150, 470, 120, 80);
  ctx.strokeStyle = state.get('poraoLiberado') ? '#d4a95a' : '#4a2a2e'; ctx.lineWidth = 3;
  ctx.strokeRect(150, 470, 120, 80);
  ctx.fillStyle = '#d4a95a'; ctx.fillRect(250, 505, 12, 10); // argola
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a6a62'; ctx.font = '9px Georgia'; ctx.fillText('↓ PORÃO', 168, 515);

  // --- PORTA → RECEPÇÃO (30, 120, 70, 300) ---
  ctx.fillStyle = '#1a0e10'; ctx.fillRect(30, 120, 70, 300);
  ctx.strokeStyle = '#4a2a2e'; ctx.lineWidth = 2; ctx.strokeRect(30, 120, 70, 300);
  ctx.fillStyle = '#d4a95a'; ctx.beginPath(); ctx.arc(42, 275, 5, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a6a62'; ctx.font = '9px Georgia'; ctx.fillText('← SAIR', 40, 435);
}
function suiOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 150, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.72, 'rgba(10,4,6,0.3)'); v.addColorStop(1, 'rgba(10,4,6,0.66)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ PORÃO ============
function renderPorao(ctx, state) {
  porBg(ctx); porArq(ctx); porLuz(ctx, state); porObj(ctx, state); porOver(ctx);
}
function porBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#0a0a0c'); g.addColorStop(0.5, '#0e0e10'); g.addColorStop(1, '#060608');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function porArq(ctx) {
  // Paredes de concreto
  ctx.fillStyle = '#141414'; ctx.fillRect(0, 0, 900, 450);
  ctx.strokeStyle = '#1e1e20'; ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) ctx.strokeRect(i * 150 + 10, 20, 140, 420);
  // Piso
  const f = ctx.createLinearGradient(0, 450, 0, 600);
  f.addColorStop(0, '#101012'); f.addColorStop(1, '#08080a');
  ctx.fillStyle = f; ctx.fillRect(0, 450, 900, 150);
  ctx.strokeStyle = '#1c1c1e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 450); ctx.lineTo(900, 450); ctx.stroke();
  ctx.lineWidth = 1;
  // Canos no teto
  ctx.strokeStyle = '#2a2420'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(0, 30); ctx.lineTo(900, 34); ctx.stroke();
  ctx.lineWidth = 1;
}
function porLuz(ctx, state) {
  if (state.get('energiaPorao')) {
    const l = ctx.createRadialGradient(450, 40, 10, 450, 40, 400);
    l.addColorStop(0, 'rgba(212,169,90,0.10)'); l.addColorStop(1, 'transparent');
    ctx.fillStyle = l; ctx.fillRect(0, 0, 900, 460);
  } else {
    // Luz de emergência fraca vermelha
    const p = Math.sin(Date.now() / 700) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(192,71,63,${0.04 + p * 0.04})`; ctx.fillRect(0, 0, 900, 600);
  }
}
function porObj(ctx, state) {
  // --- CALDEIRA (60, 180, 160, 240) ---
  const cg = ctx.createLinearGradient(60, 180, 220, 180);
  cg.addColorStop(0, '#2a1e18'); cg.addColorStop(0.5, '#3a2a20'); cg.addColorStop(1, '#2a1e18');
  ctx.fillStyle = cg; ctx.fillRect(60, 180, 160, 240);
  ctx.strokeStyle = '#4a3428'; ctx.lineWidth = 2; ctx.strokeRect(60, 180, 160, 240);
  // Porta da fornalha
  ctx.fillStyle = state.get('caldeira') ? '#c0473f' : '#1a120e';
  ctx.beginPath(); ctx.arc(140, 300, 32, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#5a4030'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(140, 300, 32, 0, Math.PI * 2); ctx.stroke();
  // Manômetro
  ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(180, 220, 12, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d4a95a'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(180, 220); ctx.lineTo(187, 214); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a6a62'; ctx.font = '9px Georgia'; ctx.fillText('CALDEIRA', 100, 405);

  // --- PAINEL ELÉTRICO (400, 160, 200, 180) ---
  ctx.fillStyle = '#12140f'; ctx.fillRect(400, 160, 200, 180);
  ctx.strokeStyle = state.get('energiaPorao') ? '#7fc98a' : '#4a2a2e'; ctx.lineWidth = 2;
  ctx.strokeRect(400, 160, 200, 180);
  ctx.fillStyle = '#d4a95a'; ctx.font = 'bold 12px Georgia'; ctx.fillText('DISJUNTORES', 428, 186);
  // 3 disjuntores (visual, com amperagem)
  const amps = ['30A', '5A', '15A'];
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = '#0a0c08'; ctx.fillRect(420 + i * 58, 210, 44, 80);
    ctx.strokeStyle = '#3a4a30'; ctx.strokeRect(420 + i * 58, 210, 44, 80);
    // Alavanca
    const on = state.get('energiaPorao');
    ctx.fillStyle = on ? '#7fc98a' : '#5a3a3a';
    ctx.fillRect(432 + i * 58, on ? 222 : 254, 20, 24);
    ctx.fillStyle = '#c8b088'; ctx.font = '9px Georgia'; ctx.fillText(amps[i], 428 + i * 58, 305);
  }

  // --- PRATELEIRA (700, 150, 150, 200) ---
  ctx.fillStyle = '#1a1410'; ctx.fillRect(700, 150, 150, 200);
  ctx.strokeStyle = '#3a2a1e'; ctx.strokeRect(700, 150, 150, 200);
  for (let i = 0; i < 3; i++) { ctx.fillStyle = '#2a2018'; ctx.fillRect(704, 200 + i * 50, 142, 5); }
  // Caixas
  ctx.fillStyle = '#3a2a1a'; ctx.fillRect(714, 160, 40, 36); ctx.fillRect(770, 210, 46, 40);
  ctx.fillStyle = '#8a6a62'; ctx.font = '9px Georgia'; ctx.fillText('ALMOXARIFADO', 712, 342);

  // --- PORTA DE SAÍDA (400, 440, 120, 140) ---
  ctx.fillStyle = '#0e0e10'; ctx.fillRect(400, 440, 120, 140);
  ctx.strokeStyle = state.get('energiaPorao') ? '#7fc98a' : '#4a2a2e'; ctx.lineWidth = 3;
  ctx.strokeRect(400, 440, 120, 140);
  ctx.lineWidth = 1;
  ctx.fillStyle = state.get('energiaPorao') ? '#7fc98a' : '#5a3a3a';
  ctx.fillRect(410, 448, 100, 20);
  ctx.fillStyle = '#0e0e10'; ctx.font = 'bold 10px Georgia';
  ctx.fillText(state.get('energiaPorao') ? 'SAÍDA ✓' : 'SAÍDA ✗', 430, 462);
  ctx.fillStyle = '#d4a95a'; ctx.beginPath(); ctx.arc(505, 512, 5, 0, Math.PI * 2); ctx.fill();

  // --- ESCADA ↑ (30, 470, 100, 60) ---
  ctx.fillStyle = '#0e0c10'; ctx.fillRect(30, 470, 100, 60);
  ctx.strokeStyle = '#4a2a2e'; ctx.lineWidth = 2; ctx.strokeRect(30, 470, 100, 60);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a6a62'; ctx.font = '10px Georgia'; ctx.fillText('↑ Suíte', 46, 505);
}
function porOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 130, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.7, 'rgba(4,4,6,0.35)'); v.addColorStop(1, 'rgba(4,4,6,0.72)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// RECEPÇÃO: quadro(60,90,150,190) relogio(420,90,70,120) balcao/livro(300,340,260,100)
//           sino(dentro do balcao ~490,332) escaninho(600,90,200,160) escada(810,120,70,320)
// SUÍTE: porta(30,120,70,300) cama(60,320,260,140) cofre(400,330,110,100)
//        espelho(600,100,120,200) telefone(760,350,90,70) alcapao(150,470,120,80)
// PORÃO: caldeira(60,180,160,240) painel(400,160,200,180) prateleira(700,150,150,200)
//        saida(400,440,120,140) escada(30,470,100,60)
