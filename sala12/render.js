/**
 * @module Sala12Render
 * @version 1.0.0
 * @description Renderização cinematográfica da Sala 12 — O Teatro Fantasma
 * Ambientes: Palco, Camarim, Sótão dos Órgãos
 * Paleta: ThemeTheater — bg #0c0608, accent #e8c15a, border #5a1f28
 */

const TEA_MOTES = [
  {x:150,y:100,r:1.2},{x:350,y:60,r:1},{x:550,y:130,r:1.4},{x:720,y:80,r:1.1},
  {x:250,y:180,r:0.9},{x:620,y:200,r:1.3},{x:430,y:110,r:1},{x:800,y:150,r:1.2}
];

// ============ PALCO ============
function renderPalco(ctx, state) {
  palBg(ctx); palArq(ctx); palLuz(ctx, state); palObj(ctx, state); palOver(ctx);
}
function palBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#100608'); g.addColorStop(0.5, '#160a0e'); g.addColorStop(1, '#0a0406');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function palArq(ctx) {
  // Cortinas laterais de veludo
  for (const cx of [0, 760]) {
    const cg = ctx.createLinearGradient(cx, 0, cx + 140, 0);
    cg.addColorStop(0, '#3a0a12'); cg.addColorStop(0.5, '#5a1420'); cg.addColorStop(1, '#2a0810');
    ctx.fillStyle = cg; ctx.fillRect(cx, 0, 140, 440);
    // Dobras
    ctx.strokeStyle = 'rgba(20,4,8,0.6)'; ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(cx + 14 + i * 28, 0); ctx.lineTo(cx + 14 + i * 28, 440); ctx.stroke(); }
  }
  // Bambolina superior (cortina de cima)
  const tg = ctx.createLinearGradient(0, 0, 0, 90);
  tg.addColorStop(0, '#5a1420'); tg.addColorStop(1, '#2a0810');
  ctx.fillStyle = tg; ctx.fillRect(0, 0, 900, 90);
  ctx.fillStyle = '#e8c15a';
  for (let i = 0; i < 15; i++) { ctx.beginPath(); ctx.arc(30 + i * 60, 90, 8, 0, Math.PI); ctx.fill(); }
  // Assoalho do palco
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#2a1810'); f.addColorStop(1, '#140a06');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#1c1008'; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(i * 80, 440); ctx.lineTo(i * 80 - 30, 600); ctx.stroke(); }
  ctx.strokeStyle = '#5a1f28'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  ctx.lineWidth = 1;
}
function palLuz(ctx, state) {
  if (state.get('spot')) {
    const s = ctx.createRadialGradient(450, 120, 20, 450, 460, 360);
    s.addColorStop(0, 'rgba(232,193,90,0.22)'); s.addColorStop(0.6, 'rgba(232,193,90,0.06)'); s.addColorStop(1, 'transparent');
    ctx.fillStyle = s; ctx.fillRect(140, 90, 620, 400);
    // Cone do holofote
    ctx.save(); ctx.globalAlpha = 0.06; ctx.fillStyle = '#e8c15a';
    ctx.beginPath(); ctx.moveTo(450, 90); ctx.lineTo(340, 460); ctx.lineTo(560, 460); ctx.closePath(); ctx.fill(); ctx.restore();
  } else {
    ctx.fillStyle = 'rgba(60,20,30,0.06)'; ctx.fillRect(0, 0, 900, 600);
  }
}
function palObj(ctx, state) {
  // --- PARTITURA NO CHÃO (360, 380, 130, 70) ---
  ctx.save(); ctx.translate(425, 415); ctx.rotate(-0.08);
  ctx.fillStyle = state.get('partitura') ? '#c8b890' : '#e8dcc0';
  ctx.fillRect(-65, -35, 130, 70);
  ctx.strokeStyle = '#8a7a5a'; ctx.strokeRect(-65, -35, 130, 70);
  ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 0.7;
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-55, -22 + i * 11); ctx.lineTo(55, -22 + i * 11); ctx.stroke(); }
  ctx.fillStyle = '#2a1a0a';
  ctx.beginPath(); ctx.arc(-30, -8, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -19, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(30, 3, 3, 0, Math.PI * 2); ctx.fill();
  ctx.restore(); ctx.lineWidth = 1;

  // --- POLTRONA 13 na plateia (frente do palco) (150, 500, 90, 70) ---
  ctx.fillStyle = state.get('poltrona') ? '#3a1420' : '#5a1420';
  ctx.fillRect(150, 500, 90, 70);
  ctx.fillStyle = '#3a0e18'; ctx.fillRect(158, 486, 74, 20);
  ctx.strokeStyle = '#e8c15a'; ctx.lineWidth = 1; ctx.strokeRect(150, 500, 90, 70);
  ctx.fillStyle = '#e8c15a'; ctx.font = '10px Georgia'; ctx.fillText('13', 188, 545);

  // --- HOLOFOTE / INTERRUPTOR (700, 470, 80, 90) ---
  ctx.fillStyle = '#1a0e10'; ctx.fillRect(700, 470, 80, 90);
  ctx.strokeStyle = state.get('spot') ? '#e8c15a' : '#5a1f28'; ctx.lineWidth = 2; ctx.strokeRect(700, 470, 80, 90);
  ctx.fillStyle = state.get('spot') ? '#e8c15a' : '#3a2a1a';
  ctx.fillRect(724, 490, 32, 20);
  ctx.fillStyle = '#946066'; ctx.font = '8px Georgia'; ctx.fillText('LUZES', 716, 545);
  ctx.lineWidth = 1;

  // --- CORTINA CENTRAL (mecanismo) (600, 110, 120, 120) ---
  ctx.fillStyle = '#2a0810'; ctx.fillRect(600, 110, 120, 120);
  ctx.strokeStyle = '#5a1f28'; ctx.strokeRect(600, 110, 120, 120);
  ctx.fillStyle = state.get('cortina') ? '#6ec6a0' : '#5a1420';
  ctx.fillRect(636, 150, 48, 40);
  ctx.fillStyle = '#946066'; ctx.font = '8px Georgia'; ctx.fillText('CORTINA', 626, 220);

  // --- PORTA CAMARIM (810, 130, 70, 310) ---
  ctx.fillStyle = '#160a0c'; ctx.fillRect(810, 130, 70, 310);
  ctx.strokeStyle = state.get('chaveCamarim') ? '#e8c15a' : '#5a1f28'; ctx.lineWidth = 3; ctx.strokeRect(810, 130, 70, 310);
  ctx.fillStyle = '#e8c15a'; ctx.font = '18px Georgia'; ctx.fillText('★', 836, 250);
  ctx.fillStyle = '#946066'; ctx.font = '9px Georgia'; ctx.fillText('CAMARIM', 812, 432);
  ctx.lineWidth = 1;
}
function palOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 150, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.7, 'rgba(8,3,5,0.3)'); v.addColorStop(1, 'rgba(8,3,5,0.68)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ CAMARIM ============
function renderCamarim(ctx, state) {
  camBg(ctx); camArq(ctx); camLuz(ctx, state); camObj(ctx, state); camOver(ctx);
}
function camBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#140a0e'); g.addColorStop(0.5, '#180c12'); g.addColorStop(1, '#0c0608');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function camArq(ctx) {
  ctx.fillStyle = '#1c0e14'; ctx.fillRect(0, 0, 900, 440);
  ctx.strokeStyle = 'rgba(90,31,40,0.5)'; ctx.lineWidth = 1;
  for (let i = 0; i < 24; i++) { ctx.beginPath(); ctx.moveTo(i * 40, 0); ctx.lineTo(i * 40, 440); ctx.stroke(); }
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#241010'); f.addColorStop(1, '#120708');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#5a1f28'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  ctx.lineWidth = 1;
}
function camLuz(ctx, state) {
  if (state.get('espelho')) {
    const l = ctx.createRadialGradient(230, 230, 20, 230, 230, 240);
    l.addColorStop(0, 'rgba(255,240,200,0.16)'); l.addColorStop(1, 'transparent');
    ctx.fillStyle = l; ctx.fillRect(0, 40, 480, 420);
  }
}
function camObj(ctx, state) {
  // --- ESPELHO DE CAMARIM (100, 90, 260, 280) ---
  ctx.fillStyle = '#0a0810'; ctx.fillRect(100, 90, 260, 280);
  ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 6; ctx.strokeRect(100, 90, 260, 280);
  const mg = ctx.createLinearGradient(110, 100, 350, 360);
  mg.addColorStop(0, '#1e1a20'); mg.addColorStop(0.5, '#141018'); mg.addColorStop(1, '#100c14');
  ctx.fillStyle = mg; ctx.fillRect(112, 102, 236, 256);
  // Lâmpadas ao redor
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = state.get('espelho') ? '#fff0c0' : '#3a3020';
    ctx.beginPath(); ctx.arc(130 + i * 40, 82, 6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(130 + i * 40, 378, 6, 0, Math.PI * 2); ctx.fill();
  }
  if (state.get('espelho')) {
    ctx.fillStyle = '#d43a4a'; ctx.font = 'italic 15px Georgia';
    ctx.fillText('"Toque minha ária', 140, 210);
    ctx.fillText(' e serás livre."', 150, 232);
    ctx.fillText('— O.G.', 250, 262);
  }
  ctx.lineWidth = 1;

  // --- PENTEADEIRA + GAVETA (100, 380, 260, 70) ---
  ctx.fillStyle = '#2a1810'; ctx.fillRect(100, 380, 260, 70);
  ctx.fillStyle = '#1a1008'; ctx.fillRect(140, 400, 80, 36);
  ctx.strokeStyle = state.get('gaveta') ? '#e8c15a' : '#5a3a1a'; ctx.lineWidth = 1; ctx.strokeRect(140, 400, 80, 36);
  ctx.fillStyle = '#e8c15a'; ctx.fillRect(172, 415, 16, 4);

  // --- CARTAZ (480, 90, 150, 220) ---
  ctx.fillStyle = '#1a0c10'; ctx.fillRect(480, 90, 150, 220);
  ctx.strokeStyle = '#5a1f28'; ctx.lineWidth = 2; ctx.strokeRect(480, 90, 150, 220);
  ctx.fillStyle = '#e8c15a'; ctx.font = 'bold 12px Georgia'; ctx.fillText('A ÓPERA', 510, 130);
  ctx.fillText('DO', 542, 148); ctx.fillText('FANTASMA', 504, 166);
  ctx.fillStyle = '#946066'; ctx.font = '9px Georgia'; ctx.fillText('em 5 atos', 522, 200);
  // Máscara desenhada
  ctx.fillStyle = '#e8d0c4'; ctx.beginPath(); ctx.ellipse(555, 250, 26, 34, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1a0c10'; ctx.beginPath(); ctx.ellipse(546, 244, 5, 7, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(564, 244, 5, 7, 0, 0, Math.PI * 2); ctx.fill();

  // --- BAÚ DE FIGURINOS (680, 360, 150, 90) ---
  ctx.fillStyle = '#241014'; ctx.fillRect(680, 360, 150, 90);
  ctx.fillStyle = '#2e141a'; ctx.fillRect(680, 360, 150, 22);
  ctx.strokeStyle = state.get('mascaraColetada') ? '#e8c15a' : '#5a1f28'; ctx.lineWidth = 2; ctx.strokeRect(680, 360, 150, 90);
  ctx.fillStyle = '#e8c15a'; ctx.fillRect(748, 372, 14, 12);
  ctx.fillStyle = '#946066'; ctx.font = '9px Georgia'; ctx.fillText('FIGURINOS', 712, 440);
  ctx.lineWidth = 1;

  // --- ESCADA SÓTÃO (700, 110, 120, 220) ---
  ctx.fillStyle = '#140a0c'; ctx.fillRect(700, 110, 120, 220);
  ctx.strokeStyle = state.get('mascaraColetada') ? '#e8c15a' : '#5a1f28'; ctx.lineWidth = 3; ctx.strokeRect(700, 110, 120, 220);
  ctx.strokeStyle = '#3a1820'; ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(705, 130 + i * 34); ctx.lineTo(815, 126 + i * 34); ctx.stroke(); }
  ctx.fillStyle = '#946066'; ctx.font = '9px Georgia'; ctx.fillText('↑ SÓTÃO', 726, 322);

  // --- PORTA PALCO (30, 130, 60, 300) ---
  ctx.fillStyle = '#160a0c'; ctx.fillRect(30, 130, 60, 300);
  ctx.strokeStyle = '#5a1f28'; ctx.lineWidth = 2; ctx.strokeRect(30, 130, 60, 300);
  ctx.fillStyle = '#e8c15a'; ctx.beginPath(); ctx.arc(42, 285, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#946066'; ctx.font = '8px Georgia'; ctx.fillText('PALCO', 38, 445);
  ctx.lineWidth = 1;
}
function camOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 150, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.72, 'rgba(8,3,5,0.3)'); v.addColorStop(1, 'rgba(8,3,5,0.66)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ SÓTÃO DOS ÓRGÃOS ============
function renderSotao(ctx, state) {
  sotBg(ctx); sotArq(ctx); sotLuz(ctx, state); sotObj(ctx, state); sotAtm(ctx); sotOver(ctx);
}
function sotBg(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#0a0608'); g.addColorStop(0.5, '#100810'); g.addColorStop(1, '#070406');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 900, 600);
}
function sotArq(ctx) {
  // Vigas de madeira do telhado (triângulo)
  ctx.strokeStyle = '#2a1c14'; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(0, 200); ctx.lineTo(450, 20); ctx.lineTo(900, 200); ctx.stroke();
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(180, 120); ctx.lineTo(180, 440); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(720, 120); ctx.lineTo(720, 440); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(450, 20); ctx.lineTo(450, 300); ctx.stroke();
  // Piso de tábuas
  const f = ctx.createLinearGradient(0, 440, 0, 600);
  f.addColorStop(0, '#1a120a'); f.addColorStop(1, '#0c0806');
  ctx.fillStyle = f; ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#160e08'; for (let i = 0; i < 11; i++) { ctx.beginPath(); ctx.moveTo(i * 85, 440); ctx.lineTo(i * 85 - 20, 600); ctx.stroke(); }
  ctx.strokeStyle = '#5a1f28'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  ctx.lineWidth = 1;
}
function sotLuz(ctx, state) {
  // Luar pela rosácea
  const l = ctx.createRadialGradient(450, 130, 10, 450, 130, 180);
  l.addColorStop(0, 'rgba(150,170,220,0.10)'); l.addColorStop(1, 'transparent');
  ctx.fillStyle = l; ctx.fillRect(270, 40, 360, 300);
  if (state.get('vitoria')) {
    const w = ctx.createRadialGradient(450, 300, 20, 450, 300, 360);
    w.addColorStop(0, 'rgba(232,193,90,0.14)'); w.addColorStop(1, 'transparent');
    ctx.fillStyle = w; ctx.fillRect(0, 0, 900, 600);
  }
}
function sotObj(ctx, state) {
  // --- ROSÁCEA (janela) (390, 60, 120, 120) ---
  ctx.save(); ctx.beginPath(); ctx.arc(450, 120, 58, 0, Math.PI * 2); ctx.clip();
  const rg = ctx.createLinearGradient(392, 62, 508, 178);
  rg.addColorStop(0, '#1a2438'); rg.addColorStop(1, '#0a0e1a');
  ctx.fillStyle = rg; ctx.fillRect(392, 62, 116, 116);
  ctx.restore();
  ctx.strokeStyle = '#5a3a2a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(450, 120, 58, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(450, 120); ctx.lineTo(450 + Math.cos(a) * 58, 120 + Math.sin(a) * 58); ctx.stroke(); }

  // --- ÓRGÃO DE TUBOS (280, 200, 340, 240) ---
  ctx.fillStyle = '#1a0e0a'; ctx.fillRect(280, 250, 340, 190);
  // Tubos
  const tubeH = [180, 150, 120, 95, 120, 150, 180];
  for (let i = 0; i < 7; i++) {
    const th = tubeH[i];
    const tg = ctx.createLinearGradient(300 + i * 46, 0, 300 + i * 46 + 30, 0);
    tg.addColorStop(0, '#5a4028'); tg.addColorStop(0.5, '#8a6a3a'); tg.addColorStop(1, '#5a4028');
    ctx.fillStyle = tg;
    ctx.fillRect(300 + i * 46, 250 - th + 60, 30, th);
    ctx.fillStyle = '#3a2818'; ctx.beginPath(); ctx.ellipse(315 + i * 46, 250 - th + 60, 15, 5, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Teclado
  ctx.fillStyle = '#0c0806'; ctx.fillRect(300, 360, 300, 50);
  ctx.strokeStyle = state.get('vitoria') ? '#6ec6a0' : '#5a1f28'; ctx.lineWidth = 2; ctx.strokeRect(280, 250, 340, 190);
  for (let i = 0; i < 10; i++) { ctx.fillStyle = '#e8dcc8'; ctx.fillRect(306 + i * 29, 366, 25, 38); }
  ctx.lineWidth = 1;
  ctx.fillStyle = '#946066'; ctx.font = '9px Georgia'; ctx.fillText('GRANDE ÓRGÃO', 400, 428);

  // --- CAIXA DE MÚSICA (80, 360, 130, 90) ---
  ctx.fillStyle = '#2a1810'; ctx.fillRect(80, 360, 130, 90);
  ctx.fillStyle = '#3a2418'; ctx.fillRect(80, 360, 130, 20);
  ctx.strokeStyle = state.get('caixaMusica') ? '#e8c15a' : '#5a3a1a'; ctx.lineWidth = 2; ctx.strokeRect(80, 360, 130, 90);
  // Manivela
  ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(210, 400); ctx.lineTo(228, 400); ctx.lineTo(228, 388); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#946066'; ctx.font = '9px Georgia'; ctx.fillText('CAIXA MÚSICA', 96, 440);

  // --- SAÍDA PELO TELHADO (700, 360, 130, 90) ---
  ctx.fillStyle = '#0a0810'; ctx.fillRect(700, 360, 130, 90);
  ctx.strokeStyle = state.get('vitoria') ? '#6ec6a0' : '#5a1f28'; ctx.lineWidth = 3; ctx.strokeRect(700, 360, 130, 90);
  ctx.lineWidth = 1;
  ctx.fillStyle = state.get('vitoria') ? 'rgba(150,180,220,0.3)' : '#0a0810';
  ctx.fillRect(710, 370, 110, 40);
  ctx.fillStyle = '#946066'; ctx.font = '9px Georgia'; ctx.fillText('SAÍDA (TELHADO)', 706, 438);

  // --- ESCADA ↓ (30, 470, 100, 60) ---
  ctx.fillStyle = '#100a0c'; ctx.fillRect(30, 470, 100, 60);
  ctx.strokeStyle = '#5a1f28'; ctx.lineWidth = 2; ctx.strokeRect(30, 470, 100, 60);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#946066'; ctx.font = '10px Georgia'; ctx.fillText('↓ Camarim', 40, 505);
}
function sotAtm(ctx) {
  ctx.save();
  for (const m of TEA_MOTES) { ctx.fillStyle = 'rgba(150,170,220,0.10)'; ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
function sotOver(ctx) {
  const v = ctx.createRadialGradient(450, 300, 140, 450, 300, 540);
  v.addColorStop(0, 'transparent'); v.addColorStop(0.7, 'rgba(6,3,5,0.32)'); v.addColorStop(1, 'rgba(6,3,5,0.7)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// PALCO: partitura(360,380,130,70) poltrona13(150,500,90,70) holofote(700,470,80,90)
//        cortina(600,110,120,120) portaCamarim(810,130,70,310)
// CAMARIM: espelho(100,90,260,280) penteadeira/gaveta(140,400,80,36 -> hit 100,380,260,70)
//          cartaz(480,90,150,220) bau(680,360,150,90) escadaSotao(700,110,120,220) portaPalco(30,130,60,300)
// SÓTÃO: rosacea(390,60,120,120) orgao(280,200,340,240) caixaMusica(80,360,130,90)
//        saida(700,360,130,90) escadaDesce(30,470,100,60)
