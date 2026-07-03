/**
 * @module Sala10Render
 * @version 1.0.0
 * @description Renderização cinematográfica da Sala 10 — O Farol da Tempestade
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Ambientes: Sala do Faroleiro, Sala da Lente
 * Paleta: ThemeLighthouse — bg #060d12, accent #ffb037, border #1c3a4a
 */

// ============ PRÉ-CALCULADOS (sem Math.random no render) ============
const FAR_RAINDROPS = [
  {x:40,y:60,len:22},{x:120,y:20,len:28},{x:200,y:90,len:20},{x:300,y:40,len:26},
  {x:390,y:70,len:24},{x:470,y:15,len:30},{x:560,y:85,len:22},{x:650,y:35,len:27},
  {x:740,y:60,len:23},{x:820,y:25,len:29},{x:880,y:100,len:21},{x:80,y:150,len:25},
  {x:250,y:180,len:20},{x:430,y:160,len:26},{x:610,y:190,len:22},{x:790,y:170,len:24}
];
const LENS_SPARKS = [
  {x:430,y:150,r:1.5},{x:470,y:130,r:1},{x:450,y:180,r:2},{x:410,y:160,r:1.2},
  {x:490,y:170,r:1.6},{x:440,y:120,r:1},{x:465,y:200,r:1.4}
];

// ============ SALA DO FAROLEIRO ============

function renderFaroleiro(ctx, state) {
  renderFar_Background(ctx);
  renderFar_Arquitetura(ctx);
  renderFar_Iluminacao(ctx, state);
  renderFar_Detalhes(ctx);
  renderFar_Decoracao(ctx);
  renderFar_Objetos(ctx, state);
  renderFar_Atmosfera(ctx);
  renderFar_Overlay(ctx);
}

// Camada 1: Background — gradiente tempestuoso frio
function renderFar_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#060d12');
  grad.addColorStop(0.4, '#0a1620');
  grad.addColorStop(0.75, '#0a141c');
  grad.addColorStop(1, '#050a0e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — paredes circulares de pedra, piso de madeira
function renderFar_Arquitetura(ctx) {
  // Parede de pedra curva
  ctx.fillStyle = '#0f1e28';
  ctx.fillRect(0, 0, 900, 440);
  // Fiadas de pedra (curvatura da torre)
  ctx.strokeStyle = '#16303e';
  ctx.lineWidth = 1;
  for (let r = 0; r < 8; r++) {
    const y = 40 + r * 50;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(450, y - 14, 900, y);
    ctx.stroke();
  }
  // Juntas verticais alternadas
  for (let r = 0; r < 8; r++) {
    const y = 40 + r * 50;
    const offset = (r % 2) * 60;
    for (let x = offset; x < 900; x += 120) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 50);
      ctx.stroke();
    }
  }
  // Piso de madeira
  const floor = ctx.createLinearGradient(0, 440, 0, 600);
  floor.addColorStop(0, '#1a1208');
  floor.addColorStop(1, '#0d0904');
  ctx.fillStyle = floor;
  ctx.fillRect(0, 440, 900, 160);
  ctx.strokeStyle = '#241a0c';
  for (let i = 0; i < 10; i++) {
    ctx.beginPath(); ctx.moveTo(i * 95, 440); ctx.lineTo(i * 95 - 20, 600); ctx.stroke();
  }
  ctx.strokeStyle = '#1c3a4a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 440); ctx.lineTo(900, 440); ctx.stroke();
  ctx.lineWidth = 1;
}

// Camada 3: Iluminação — lampião quente + relâmpago pela janela
function renderFar_Iluminacao(ctx, state) {
  // Relâmpago intermitente pela janela (pré-determinístico por tempo)
  const flash = Math.max(0, Math.sin(Date.now() / 1700)) * Math.max(0, Math.sin(Date.now() / 240));
  const janela = ctx.createRadialGradient(140, 150, 10, 140, 150, 260);
  janela.addColorStop(0, `rgba(150, 190, 220, ${0.05 + flash * 0.25})`);
  janela.addColorStop(1, 'transparent');
  ctx.fillStyle = janela;
  ctx.fillRect(0, 0, 420, 420);

  // Luz quente do lampião (se aceso)
  if (state.get('lampiao')) {
    const lamp = ctx.createRadialGradient(690, 300, 8, 690, 300, 200);
    lamp.addColorStop(0, 'rgba(255, 176, 55, 0.22)');
    lamp.addColorStop(0.5, 'rgba(255, 140, 40, 0.08)');
    lamp.addColorStop(1, 'transparent');
    ctx.fillStyle = lamp;
    ctx.fillRect(500, 130, 380, 340);
  }
}

// Camada 4: Detalhes — infiltração, manchas de maresia
function renderFar_Detalhes(ctx) {
  ctx.fillStyle = 'rgba(30, 60, 70, 0.25)';
  ctx.beginPath(); ctx.ellipse(300, 60, 70, 22, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(760, 90, 50, 16, 0.3, 0, Math.PI * 2); ctx.fill();
  // Sal cristalizado nas juntas
  ctx.fillStyle = 'rgba(120, 150, 160, 0.1)';
  ctx.fillRect(0, 438, 900, 3);
  // Arranhões no chão
  ctx.strokeStyle = 'rgba(10, 8, 4, 0.4)';
  ctx.beginPath(); ctx.moveTo(400, 500); ctx.quadraticCurveTo(430, 512, 415, 535); ctx.stroke();
}

// Camada 5: Decoração — janela redonda, rede, quadro
function renderFar_Decoracao(ctx) {
  // Janela redonda (olho de boi) com tempestade
  ctx.save();
  ctx.beginPath(); ctx.arc(140, 150, 75, 0, Math.PI * 2); ctx.clip();
  const storm = ctx.createLinearGradient(65, 75, 215, 225);
  storm.addColorStop(0, '#16323f');
  storm.addColorStop(1, '#081018');
  ctx.fillStyle = storm; ctx.fillRect(65, 75, 150, 150);
  // Ondas ao longe
  ctx.strokeStyle = 'rgba(90,130,150,0.5)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(70, 170 + i * 14);
    ctx.quadraticCurveTo(140, 160 + i * 14, 210, 172 + i * 14);
    ctx.stroke();
  }
  ctx.restore();
  // Moldura de metal da janela
  ctx.strokeStyle = '#2a4a5a';
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(140, 150, 75, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#3a5a6a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(65, 150); ctx.lineTo(215, 150); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(140, 75); ctx.lineTo(140, 225); ctx.stroke();
  ctx.lineWidth = 1;

  // Rede de pesca pendurada (canto superior direito)
  ctx.strokeStyle = 'rgba(120, 130, 90, 0.35)';
  for (let i = 0; i < 6; i++) {
    ctx.beginPath(); ctx.moveTo(760 + i * 22, 30); ctx.lineTo(770 + i * 22, 110); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(760, 40 + i * 14); ctx.lineTo(880, 44 + i * 14); ctx.stroke();
  }
}

// Camada 6: Objetos interativos
function renderFar_Objetos(ctx, state) {
  // --- ESCRIVANINHA + DIÁRIO (300, 360, 180, 80) ---
  const mesaGrad = ctx.createLinearGradient(300, 360, 300, 440);
  mesaGrad.addColorStop(0, '#3a2a14');
  mesaGrad.addColorStop(1, '#1e1408');
  ctx.fillStyle = mesaGrad;
  ctx.fillRect(300, 360, 180, 80);
  ctx.fillStyle = '#4a3418';
  ctx.fillRect(300, 358, 180, 5);
  // Diário sobre a mesa
  ctx.fillStyle = state.get('diario') ? '#5a3a1a' : '#7a4a1e';
  ctx.fillRect(330, 372, 60, 42);
  ctx.strokeStyle = '#2a1a0a';
  ctx.strokeRect(330, 372, 60, 42);
  ctx.fillStyle = '#c8b088';
  ctx.font = '8px Courier New';
  ctx.fillText('DIÁRIO', 338, 396);
  // Pernas
  ctx.fillStyle = '#1e1408';
  ctx.fillRect(310, 440, 8, 30);
  ctx.fillRect(462, 440, 8, 30);

  // --- ARMÁRIO DE CHAVES (40, 250, 90, 150) ---
  ctx.fillStyle = '#12242e';
  ctx.fillRect(40, 250, 90, 150);
  ctx.strokeStyle = state.get('armario') ? '#ffb037' : '#1c3a4a';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 250, 90, 150);
  ctx.fillStyle = '#0a161e';
  ctx.fillRect(48, 262, 74, 126);
  // Ganchos
  ctx.fillStyle = '#3a5a6a';
  for (let i = 0; i < 3; i++) {
    ctx.beginPath(); ctx.arc(62 + i * 25, 300, 3, 0, Math.PI * 2); ctx.fill();
  }
  // Chave pendurada (se não coletada)
  if (!state.get('chaveColetada')) {
    ctx.fillStyle = '#ffb037';
    ctx.fillRect(85, 303, 4, 22);
    ctx.beginPath(); ctx.arc(87, 303, 5, 0, Math.PI * 2); ctx.stroke();
    ctx.fillRect(85, 322, 10, 3);
  }
  ctx.lineWidth = 1;
  ctx.fillStyle = '#5f8296';
  ctx.font = '9px Courier New';
  ctx.fillText('CHAVES', 58, 380);

  // --- RÁDIO / TRANSMISSOR (560, 300, 130, 100) ---
  ctx.fillStyle = '#101c14';
  ctx.fillRect(560, 300, 130, 100);
  ctx.strokeStyle = '#2a4a3a';
  ctx.lineWidth = 2;
  ctx.strokeRect(560, 300, 130, 100);
  // Visor
  ctx.fillStyle = '#04120a';
  ctx.fillRect(572, 312, 106, 34);
  ctx.fillStyle = state.get('radio') ? '#4fd6c4' : '#1a5a4a';
  ctx.font = '10px Courier New';
  ctx.fillText(state.get('radio') ? 'FREQ REGISTRADA' : 'ESTÁTICA...', 578, 333);
  // Botões
  ctx.fillStyle = '#2a3a30';
  for (let i = 0; i < 4; i++) { ctx.fillRect(576 + i * 28, 358, 20, 14); }
  // Dial
  ctx.fillStyle = '#3a5a4a';
  ctx.beginPath(); ctx.arc(650, 380, 10, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#4fd6c4';
  ctx.beginPath(); ctx.moveTo(650, 380); ctx.lineTo(656, 373); ctx.stroke();

  // --- LAMPIÃO (660, 250, 60, 60) ---
  ctx.fillStyle = '#2a2418';
  ctx.fillRect(682, 300, 16, 60);
  const lampGrad = ctx.createRadialGradient(690, 275, 4, 690, 275, 26);
  if (state.get('lampiao')) {
    lampGrad.addColorStop(0, '#fff0c0');
    lampGrad.addColorStop(0.5, '#ffb037');
    lampGrad.addColorStop(1, '#5a3a10');
  } else {
    lampGrad.addColorStop(0, '#3a3428');
    lampGrad.addColorStop(1, '#1a1810');
  }
  ctx.fillStyle = lampGrad;
  ctx.beginPath(); ctx.ellipse(690, 275, 22, 30, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#4a4028';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(690, 275, 22, 30, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;

  // --- BAÚ DE FERRAMENTAS (760, 420, 110, 70) ---
  ctx.fillStyle = '#241810';
  ctx.fillRect(760, 420, 110, 70);
  ctx.strokeStyle = state.get('bau') ? '#ffb037' : '#3a2a18';
  ctx.lineWidth = 2;
  ctx.strokeRect(760, 420, 110, 70);
  // Tampa
  ctx.fillStyle = '#2e2014';
  ctx.fillRect(760, 420, 110, 18);
  // Fechadura
  ctx.fillStyle = '#ffb037';
  ctx.fillRect(808, 432, 14, 12);
  ctx.lineWidth = 1;

  // --- ESCADA ESPIRAL → LENTE (porta, 810, 130, 70, 290) ---
  ctx.fillStyle = '#0a141c';
  ctx.fillRect(810, 130, 70, 290);
  ctx.strokeStyle = state.get('escadaLiberada') ? '#ffb037' : '#1c3a4a';
  ctx.lineWidth = 3;
  ctx.strokeRect(810, 130, 70, 290);
  ctx.lineWidth = 1;
  // Degraus insinuados
  ctx.strokeStyle = '#16303e';
  for (let i = 0; i < 9; i++) {
    ctx.beginPath(); ctx.moveTo(815, 150 + i * 30); ctx.lineTo(875, 145 + i * 30); ctx.stroke();
  }
  ctx.fillStyle = '#5f8296';
  ctx.font = '9px Courier New';
  ctx.fillText('↑ LENTE', 818, 415);
}

// Camada 7: Atmosfera — chuva batendo, vapor
function renderFar_Atmosfera(ctx) {
  ctx.save();
  ctx.strokeStyle = 'rgba(150, 180, 200, 0.12)';
  ctx.lineWidth = 1;
  for (const d of FAR_RAINDROPS) {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - 4, d.y + d.len);
    ctx.stroke();
  }
  ctx.restore();
}

// Camada 8: Overlay — vinheta fria
function renderFar_Overlay(ctx) {
  const vig = ctx.createRadialGradient(450, 300, 140, 450, 300, 540);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(0.7, 'rgba(0, 8, 12, 0.25)');
  vig.addColorStop(1, 'rgba(0, 8, 12, 0.62)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ SALA DA LENTE ============

function renderLente(ctx, state) {
  renderLen_Background(ctx);
  renderLen_Arquitetura(ctx);
  renderLen_Iluminacao(ctx, state);
  renderLen_Detalhes(ctx);
  renderLen_Objetos(ctx, state);
  renderLen_Atmosfera(ctx, state);
  renderLen_Overlay(ctx);
}

function renderLen_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#081018');
  grad.addColorStop(0.5, '#0a1620');
  grad.addColorStop(1, '#050a10');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderLen_Arquitetura(ctx) {
  // Cúpula de vidro — vigas radiais
  ctx.strokeStyle = '#1c3a4a';
  ctx.lineWidth = 2;
  for (let i = 0; i <= 10; i++) {
    const x = i * 90;
    ctx.beginPath(); ctx.moveTo(450, 20); ctx.lineTo(x, 300); ctx.stroke();
  }
  // Anéis da cúpula
  for (let r = 1; r <= 3; r++) {
    ctx.beginPath();
    ctx.ellipse(450, 60, r * 130, r * 55, 0, 0, Math.PI);
    ctx.stroke();
  }
  // Piso metálico circular
  const floor = ctx.createLinearGradient(0, 420, 0, 600);
  floor.addColorStop(0, '#12222c');
  floor.addColorStop(1, '#070f16');
  ctx.fillStyle = floor;
  ctx.fillRect(0, 420, 900, 180);
  ctx.strokeStyle = '#1c3a4a';
  ctx.beginPath(); ctx.moveTo(0, 420); ctx.lineTo(900, 420); ctx.stroke();
  // Chapa xadrez
  ctx.strokeStyle = '#0e1a22';
  for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(i * 65, 420); ctx.lineTo(i * 65, 600); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(0, 500); ctx.lineTo(900, 500); ctx.stroke();
  ctx.lineWidth = 1;
}

function renderLen_Iluminacao(ctx, state) {
  // Céu tempestuoso visto pela cúpula
  const flash = Math.max(0, Math.sin(Date.now() / 1500)) * Math.max(0, Math.sin(Date.now() / 200));
  ctx.fillStyle = `rgba(140, 180, 210, ${0.03 + flash * 0.2})`;
  ctx.fillRect(0, 0, 900, 300);

  // Feixe do farol (se aceso) — cone giratório
  if (state.get('farolAceso')) {
    const ang = (Date.now() / 1400) % (Math.PI * 2);
    ctx.save();
    ctx.translate(450, 300);
    ctx.rotate(ang);
    const beam = ctx.createLinearGradient(0, 0, 600, 0);
    beam.addColorStop(0, 'rgba(255, 220, 120, 0.35)');
    beam.addColorStop(1, 'transparent');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(600, -80);
    ctx.lineTo(600, 80);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function renderLen_Detalhes(ctx) {
  // Condensação nos vidros
  ctx.fillStyle = 'rgba(120, 160, 180, 0.06)';
  for (let i = 0; i < 8; i++) {
    ctx.beginPath(); ctx.arc(120 + i * 90, 120 + (i % 3) * 30, 3, 0, Math.PI * 2); ctx.fill();
  }
}

function renderLen_Objetos(ctx, state) {
  // --- LENTE DE FRESNEL CENTRAL (350, 200, 200, 220) ---
  const lensGrad = ctx.createRadialGradient(450, 300, 20, 450, 300, 110);
  if (state.get('farolAceso')) {
    lensGrad.addColorStop(0, '#fff3c0');
    lensGrad.addColorStop(0.4, '#ffb037');
    lensGrad.addColorStop(1, 'rgba(255,176,55,0.1)');
  } else {
    lensGrad.addColorStop(0, '#2a4a5a');
    lensGrad.addColorStop(1, 'rgba(20,40,50,0.2)');
  }
  ctx.fillStyle = lensGrad;
  ctx.beginPath(); ctx.ellipse(450, 300, 100, 110, 0, 0, Math.PI * 2); ctx.fill();
  // Anéis prismáticos da lente
  ctx.strokeStyle = state.get('farolAceso') ? 'rgba(255,240,190,0.6)' : 'rgba(90,130,150,0.4)';
  ctx.lineWidth = 1.5;
  for (let r = 1; r <= 6; r++) {
    ctx.beginPath(); ctx.ellipse(450, 300, r * 15, r * 16.5, 0, 0, Math.PI * 2); ctx.stroke();
  }
  // Estrutura de latão
  ctx.strokeStyle = '#8a6a2a';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.ellipse(450, 300, 100, 110, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;

  // --- PAINEL DE ENGRENAGENS (rotação) (90, 240, 150, 150) ---
  ctx.fillStyle = '#0e1a22';
  ctx.fillRect(90, 240, 150, 150);
  ctx.strokeStyle = state.get('engrenagens') ? '#ffb037' : '#1c3a4a';
  ctx.lineWidth = 2;
  ctx.strokeRect(90, 240, 150, 150);
  // Engrenagens (estáticas — ângulo baseado em flag, não em random)
  const gearAng = state.get('engrenagens') ? (Date.now() / 900) : 0.4;
  drawGear(ctx, 150, 300, 34, 10, gearAng, state.get('engrenagens') ? '#ffb037' : '#3a5a6a');
  drawGear(ctx, 200, 340, 24, 8, -gearAng * 1.4, state.get('engrenagens') ? '#ffcc66' : '#2e4a5a');
  ctx.fillStyle = '#5f8296';
  ctx.font = '9px Courier New';
  ctx.fillText('MECANISMO', 118, 378);
  ctx.lineWidth = 1;

  // --- PAINEL DE IGNIÇÃO DO FAROL (620, 250, 180, 150) ---
  ctx.fillStyle = '#0d1a24';
  ctx.fillRect(620, 250, 180, 150);
  ctx.strokeStyle = '#1c3a4a';
  ctx.lineWidth = 2;
  ctx.strokeRect(620, 250, 180, 150);
  ctx.fillStyle = '#ffb037';
  ctx.font = 'bold 12px Courier New';
  ctx.fillText('IGNIÇÃO', 665, 278);
  // Três seletores
  ctx.strokeStyle = '#2a4a5a';
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = '#081218';
    ctx.fillRect(640 + i * 52, 300, 40, 50);
    ctx.strokeRect(640 + i * 52, 300, 40, 50);
  }
  ctx.fillStyle = '#5f8296';
  ctx.font = '8px Courier New';
  ctx.fillText('SEQ. 3 DÍGITOS', 655, 372);
  ctx.lineWidth = 1;

  // --- ESCADA ↓ (30, 470, 110, 60) ---
  ctx.fillStyle = '#0a141c';
  ctx.fillRect(30, 470, 110, 60);
  ctx.strokeStyle = '#1c3a4a';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 470, 110, 60);
  ctx.fillStyle = '#5f8296';
  ctx.font = '11px Courier New';
  ctx.fillText('↓ Faroleiro', 44, 505);
  ctx.lineWidth = 1;
}

function drawGear(ctx, cx, cy, radius, teeth, ang, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(ang);
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const a2 = ((i + 0.5) / teeth) * Math.PI * 2;
    ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
    ctx.lineTo(Math.cos(a2) * (radius + 6), Math.sin(a2) * (radius + 6));
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#081218';
  ctx.beginPath(); ctx.arc(0, 0, radius * 0.4, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function renderLen_Atmosfera(ctx, state) {
  if (state.get('farolAceso')) {
    // Faíscas de luz ao redor da lente
    ctx.save();
    for (const s of LENS_SPARKS) {
      ctx.fillStyle = 'rgba(255, 240, 190, 0.5)';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
}

function renderLen_Overlay(ctx) {
  const vig = ctx.createRadialGradient(450, 300, 150, 450, 300, 540);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(0.75, 'rgba(0, 6, 12, 0.22)');
  vig.addColorStop(1, 'rgba(0, 6, 12, 0.6)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// FAROLEIRO:
//   armario:        (40, 250, 90, 150)
//   diario/mesa:    (300, 360, 180, 80)
//   radio:          (560, 300, 130, 100)
//   lampiao:        (660, 250, 60, 60)   [hit 660,250,60,110 aprox]
//   bau:            (760, 420, 110, 70)
//   escada→lente:   (810, 130, 70, 290)
// LENTE:
//   engrenagens:    (90, 240, 150, 150)
//   lente:          (350, 200, 200, 220)
//   ignicao:        (620, 250, 180, 150)
//   escada↓:        (30, 470, 110, 60)
