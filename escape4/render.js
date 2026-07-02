/**
 * @module Escape4Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 4 — Estação Espacial
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Ambientes: Comando, Energia, Cápsula
 * Paleta: ThemeSciFi — bg #050810, accent #00d4ff, border #1a3a5a
 */

// ============ PRÉ-CALCULADOS (sem Math.random no render) ============
const CMD_PANELS = [
  {x:50,y:40,w:80,h:60},{x:150,y:50,w:70,h:50},{x:600,y:45,w:90,h:55},
  {x:720,y:55,w:75,h:50},{x:820,y:40,w:60,h:65}
];
const ENG_PIPES = [
  {x1:50,y1:80,x2:50,y2:400},{x1:150,y1:60,x2:150,y2:350},
  {x1:850,y1:70,x2:850,y2:380},{x1:750,y1:90,x2:750,y2:360}
];
const CAP_BOLTS = [
  {x:100,y:80},{x:200,y:75},{x:300,y:82},{x:500,y:78},
  {x:600,y:84},{x:700,y:76},{x:800,y:80}
];

// ============ MÓDULO DE COMANDO ============

function renderComando(ctx, state) {
  renderCmd_Background(ctx);
  renderCmd_Arquitetura(ctx);
  renderCmd_Iluminacao(ctx, state);
  renderCmd_Detalhes(ctx);
  renderCmd_Decoracao(ctx);
  renderCmd_Objetos(ctx, state);
  renderCmd_Atmosfera(ctx);
  renderCmd_Overlay(ctx);
}

// Camada 1: Background — gradiente azul profundo espacial
function renderCmd_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#020408');
  grad.addColorStop(0.3, '#050810');
  grad.addColorStop(0.7, '#080c18');
  grad.addColorStop(1, '#040610');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — painéis metálicos futuristas, teto com trilhos
function renderCmd_Arquitetura(ctx) {
  // Teto com estrutura
  ctx.fillStyle = '#080c14';
  ctx.fillRect(0, 0, 900, 30);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, 30); ctx.lineTo(900, 30); ctx.stroke();
  // Trilhos no teto
  ctx.fillStyle = '#0e1828';
  ctx.fillRect(100, 8, 700, 6);
  ctx.fillStyle = '#1a3a5a';
  ctx.fillRect(300, 6, 12, 10);
  ctx.fillRect(580, 6, 12, 10);

  // Paredes — painéis hexagonais sutis
  ctx.fillStyle = '#0a1020';
  ctx.fillRect(0, 30, 900, 430);
  ctx.strokeStyle = '#0e1a30';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 7; i++) {
    ctx.strokeRect(i * 130 + 10, 35, 125, 210);
    ctx.strokeRect(i * 130 + 10, 250, 125, 210);
  }
  // Juntas horizontais
  ctx.strokeStyle = '#1a2a40';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, 245); ctx.lineTo(900, 245); ctx.stroke();

  // Piso metálico — grade com brilho
  const floorGrad = ctx.createLinearGradient(0, 460, 0, 600);
  floorGrad.addColorStop(0, '#0c1420');
  floorGrad.addColorStop(0.5, '#0a1018');
  floorGrad.addColorStop(1, '#060a10');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 460, 900, 140);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 460); ctx.lineTo(900, 460); ctx.stroke();
  ctx.lineWidth = 1;
  // Grid do piso
  ctx.strokeStyle = '#0e1a28';
  for (let i = 0; i < 13; i++) {
    ctx.beginPath(); ctx.moveTo(i * 72, 460); ctx.lineTo(i * 72, 600); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(0, 530); ctx.lineTo(900, 530); ctx.stroke();
}

// Camada 3: Iluminação — neon azul pulsante + emergência
function renderCmd_Iluminacao(ctx, state) {
  const pulse = Math.sin(Date.now() / 800) * 0.5 + 0.5;
  // Faixa de LED azul no teto
  ctx.fillStyle = `rgba(0, 212, 255, ${0.1 + pulse * 0.05})`;
  ctx.fillRect(200, 28, 500, 4);
  // Glow central do teto
  const ceilGlow = ctx.createRadialGradient(450, 30, 10, 450, 30, 300);
  ceilGlow.addColorStop(0, 'rgba(0, 180, 220, 0.06)');
  ceilGlow.addColorStop(0.5, 'rgba(0, 150, 200, 0.02)');
  ceilGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = ceilGlow;
  ctx.fillRect(150, 0, 600, 400);
  // Emergência vermelha lateral sutil
  const redPulse = Math.sin(Date.now() / 1200) * 0.5 + 0.5;
  ctx.fillStyle = `rgba(255, 50, 50, ${redPulse * 0.04})`;
  ctx.fillRect(0, 0, 30, 600);
  ctx.fillRect(870, 0, 30, 600);
  // Reflexo no piso
  ctx.fillStyle = 'rgba(0, 180, 220, 0.02)';
  ctx.fillRect(300, 470, 300, 60);
}

// Camada 4: Detalhes — marcas, desgaste, circuitos expostos
function renderCmd_Detalhes(ctx) {
  // Circuitos expostos na parede
  ctx.strokeStyle = 'rgba(0, 100, 150, 0.15)';
  ctx.lineWidth = 0.7;
  ctx.beginPath(); ctx.moveTo(680, 100); ctx.lineTo(700, 120); ctx.lineTo(720, 115); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(120, 300); ctx.lineTo(140, 310); ctx.lineTo(135, 330); ctx.stroke();
  // Arranhões no piso
  ctx.strokeStyle = 'rgba(20, 50, 80, 0.2)';
  ctx.beginPath(); ctx.moveTo(200, 480); ctx.lineTo(220, 500); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 490); ctx.lineTo(620, 510); ctx.stroke();
  // Manchas de fluido
  ctx.fillStyle = 'rgba(0, 80, 120, 0.05)';
  ctx.beginPath(); ctx.ellipse(400, 520, 50, 15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
}

// Camada 5: Decoração — props não-interativos
function renderCmd_Decoracao(ctx) {
  // Painéis secundários decorativos nas paredes
  for (const p of CMD_PANELS) {
    ctx.fillStyle = '#0a1520';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.strokeStyle = '#1a3a5a';
    ctx.strokeRect(p.x, p.y, p.w, p.h);
    // LED piscando
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath(); ctx.arc(p.x + p.w - 8, p.y + 8, 2, 0, Math.PI * 2); ctx.fill();
  }
  // Placa "MÓDULO DE COMANDO"
  ctx.fillStyle = '#080c14';
  ctx.fillRect(350, 430, 200, 25);
  ctx.strokeStyle = '#1a3a5a';
  ctx.strokeRect(350, 430, 200, 25);
  ctx.fillStyle = '#00d4ff';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText('MÓDULO DE COMANDO', 380, 447);
  // Cadeira lateral
  ctx.fillStyle = '#0c1420';
  ctx.fillRect(620, 350, 50, 80);
  ctx.fillStyle = '#1a2a40';
  ctx.fillRect(625, 345, 40, 10);
}

// Camada 6: Objetos interativos — com brilho destacado
function renderCmd_Objetos(ctx, state) {
  // --- TERMINAL PRINCIPAL (300, 50, 200, 130) ---
  ctx.fillStyle = '#0a0a12';
  ctx.fillRect(305, 55, 190, 120);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.strokeRect(305, 55, 190, 120);
  // Tela
  const screenGrad = ctx.createLinearGradient(310, 60, 310, 160);
  screenGrad.addColorStop(0, '#001a2a');
  screenGrad.addColorStop(1, '#000810');
  ctx.fillStyle = screenGrad;
  ctx.fillRect(310, 60, 180, 100);
  ctx.fillStyle = '#00d4ff';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText('STATION OS v7.1', 320, 80);
  ctx.fillStyle = '#0099bb';
  ctx.font = '9px Courier New';
  ctx.fillText('> EMERGENCY MODE', 320, 95);
  ctx.fillText('> SYSTEMS OFFLINE', 320, 110);
  if (state.get('terminal')) {
    ctx.fillStyle = '#00d4ff';
    ctx.fillText('> PROTOCOLO: FUGA', 320, 125);
    ctx.fillText('> Ordem dependência', 320, 140);
  } else {
    ctx.fillStyle = '#006688';
    ctx.fillText('> ACESSO PENDENTE...', 320, 125);
  }
  ctx.lineWidth = 1;

  // --- MAPA DA ESTAÇÃO (600, 40, 150, 120) ---
  ctx.fillStyle = '#0a1520';
  ctx.fillRect(605, 45, 140, 110);
  ctx.strokeStyle = '#1a3a5a';
  ctx.strokeRect(605, 45, 140, 110);
  // Diagrama holográfico
  ctx.fillStyle = '#00d4ff44';
  ctx.fillRect(620, 80, 30, 20);
  ctx.fillRect(660, 80, 30, 20);
  ctx.fillRect(700, 80, 30, 20);
  ctx.strokeStyle = '#00d4ff66';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(650, 90); ctx.lineTo(660, 90); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(690, 90); ctx.lineTo(700, 90); ctx.stroke();
  ctx.fillStyle = '#00d4ff';
  ctx.font = '7px Courier New';
  ctx.fillText('CMD', 626, 93);
  ctx.fillText('ENG', 666, 93);
  ctx.fillText('CAP', 706, 93);
  ctx.fillStyle = '#00d4ff88';
  ctx.font = '8px Courier New';
  ctx.fillText('MAPA ESTAÇÃO', 625, 68);

  // --- CADEIRA DO CAPITÃO (380, 300, 140, 120) ---
  const cadGrad = ctx.createLinearGradient(380, 300, 380, 420);
  cadGrad.addColorStop(0, '#1a1a2a');
  cadGrad.addColorStop(1, '#0c0c18');
  ctx.fillStyle = cadGrad;
  ctx.fillRect(385, 305, 130, 110);
  ctx.strokeStyle = '#2a2a4a';
  ctx.strokeRect(385, 305, 130, 110);
  // Encosto
  ctx.fillStyle = '#1a1a30';
  ctx.fillRect(395, 295, 110, 15);
  // Identificação
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '10px Courier New';
  ctx.fillText('CAP. TORRES', 405, 365);
  if (!state.get('cadeira')) {
    ctx.fillStyle = '#00d4ff44';
    ctx.font = '8px Courier New';
    ctx.fillText('(algo embaixo?)', 410, 400);
  }

  // --- JANELA ESPACIAL (50, 60, 180, 200) ---
  ctx.fillStyle = '#000005';
  ctx.fillRect(55, 65, 170, 190);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 3;
  ctx.strokeRect(55, 65, 170, 190);
  ctx.lineWidth = 1;
  // Estrelas fixas (pré-calculadas)
  ctx.fillStyle = '#ffffff';
  const starPositions = [[80,90],[120,110],[160,85],[100,150],[180,130],[90,200],[150,180],[200,100],[130,220],[170,160]];
  for (const [sx, sy] of starPositions) {
    ctx.beginPath(); ctx.arc(sx, sy, 0.8, 0, Math.PI * 2); ctx.fill();
  }
  // Estrela principal — Proxima Centauri
  ctx.fillStyle = '#ffffaa';
  ctx.beginPath(); ctx.arc(140, 140, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffffdd';
  ctx.beginPath(); ctx.arc(140, 140, 3, 0, Math.PI * 2); ctx.fill();
  // Glow da estrela
  const starGlow = ctx.createRadialGradient(140, 140, 3, 140, 140, 20);
  starGlow.addColorStop(0, 'rgba(255, 255, 170, 0.3)');
  starGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = starGlow;
  ctx.fillRect(120, 120, 40, 40);

  // --- PORTA ENERGIA (780, 250, 70, 180) ---
  const portaGrad = ctx.createLinearGradient(780, 250, 850, 250);
  portaGrad.addColorStop(0, '#0a0a14');
  portaGrad.addColorStop(0.5, '#0e1020');
  portaGrad.addColorStop(1, '#0a0a14');
  ctx.fillStyle = portaGrad;
  ctx.fillRect(785, 255, 65, 175);
  ctx.strokeStyle = state.get('cartaoColetado') ? '#00d4ff' : '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.strokeRect(785, 255, 65, 175);
  // Label
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '10px Courier New';
  ctx.fillText('ENG →', 795, 345);
  // Leitor de cartão
  ctx.fillStyle = '#050810';
  ctx.fillRect(790, 380, 30, 20);
  ctx.strokeStyle = state.get('cartaoColetado') ? '#00ff88' : '#333';
  ctx.strokeRect(790, 380, 30, 20);
  ctx.lineWidth = 1;
}

// Camada 7: Atmosfera — nebulosa, brilho estelar
function renderCmd_Atmosfera(ctx) {
  // Cone de luz azul do teto
  ctx.save();
  ctx.globalAlpha = 0.025;
  ctx.fillStyle = '#00d4ff';
  ctx.beginPath();
  ctx.moveTo(420, 30); ctx.lineTo(320, 460); ctx.lineTo(520, 460);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  // Névoa fina no piso
  const fogGrad = ctx.createLinearGradient(0, 540, 0, 600);
  fogGrad.addColorStop(0, 'transparent');
  fogGrad.addColorStop(1, 'rgba(0, 100, 150, 0.03)');
  ctx.fillStyle = fogGrad;
  ctx.fillRect(0, 540, 900, 60);
}

// Camada 8: Overlay — vinheta + tint azul
function renderCmd_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 150, 450, 300, 550);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(0, 5, 15, 0.2)');
  vignette.addColorStop(1, 'rgba(0, 5, 15, 0.55)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(0, 10, 20, 0.05)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ MÓDULO DE ENERGIA ============

function renderEnergia(ctx, state) {
  renderEng_Background(ctx);
  renderEng_Arquitetura(ctx);
  renderEng_Iluminacao(ctx, state);
  renderEng_Detalhes(ctx);
  renderEng_Decoracao(ctx);
  renderEng_Objetos(ctx, state);
  renderEng_Atmosfera(ctx);
  renderEng_Overlay(ctx);
}

// Camada 1: Background
function renderEng_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#040608');
  grad.addColorStop(0.4, '#080c14');
  grad.addColorStop(0.8, '#060a10');
  grad.addColorStop(1, '#030508');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — industrial pesada, tubulações
function renderEng_Arquitetura(ctx) {
  // Teto pesado
  ctx.fillStyle = '#060a10';
  ctx.fillRect(0, 0, 900, 35);
  // Dutos grossos no teto
  ctx.fillStyle = '#1a2a3a';
  ctx.fillRect(80, 10, 250, 14);
  ctx.fillRect(550, 10, 280, 14);
  // Paredes industriais
  ctx.fillStyle = '#0a1018';
  ctx.fillRect(0, 35, 900, 425);
  // Grades verticais
  ctx.strokeStyle = '#1a2a3a';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath(); ctx.moveTo(i * 120 + 40, 35); ctx.lineTo(i * 120 + 40, 460); ctx.stroke();
  }
  // Tubulações laterais
  for (const p of ENG_PIPES) {
    const pipeGrad = ctx.createLinearGradient(p.x1 - 5, 0, p.x1 + 5, 0);
    pipeGrad.addColorStop(0, '#1a2a3a');
    pipeGrad.addColorStop(0.5, '#2a4a5a');
    pipeGrad.addColorStop(1, '#1a2a3a');
    ctx.fillStyle = pipeGrad;
    ctx.fillRect(p.x1 - 5, p.y1, 10, p.y2 - p.y1);
  }
  // Piso
  const floorGrad = ctx.createLinearGradient(0, 460, 0, 600);
  floorGrad.addColorStop(0, '#0a1218');
  floorGrad.addColorStop(1, '#060a0e');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 460, 900, 140);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 460); ctx.lineTo(900, 460); ctx.stroke();
  ctx.lineWidth = 1;
}

// Camada 3: Iluminação
function renderEng_Iluminacao(ctx, state) {
  const pulse = state.get('energiaRestaurada') ? 0 : Math.sin(Date.now() / 600) * 0.15;
  // Alerta laranja se sem energia
  ctx.fillStyle = `rgba(255, 100, 0, ${pulse})`;
  ctx.fillRect(0, 0, 900, 5);
  // Luz fraca do teto
  const topLight = ctx.createRadialGradient(450, 35, 10, 450, 35, 250);
  topLight.addColorStop(0, 'rgba(100, 150, 200, 0.04)');
  topLight.addColorStop(1, 'transparent');
  ctx.fillStyle = topLight;
  ctx.fillRect(200, 0, 500, 350);
  // Glow verde se energia restaurada
  if (state.get('energiaRestaurada')) {
    ctx.fillStyle = 'rgba(0, 255, 136, 0.02)';
    ctx.fillRect(0, 0, 900, 600);
  }
}

// Camada 4: Detalhes
function renderEng_Detalhes(ctx) {
  // Ferrugem nas tubulações
  ctx.fillStyle = 'rgba(100, 50, 20, 0.08)';
  ctx.beginPath(); ctx.ellipse(50, 200, 8, 20, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(850, 180, 8, 15, 0, 0, Math.PI * 2); ctx.fill();
  // Marcas de solda
  ctx.strokeStyle = 'rgba(60, 80, 100, 0.15)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(300, 200); ctx.lineTo(310, 210); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 300); ctx.lineTo(610, 295); ctx.stroke();
  ctx.lineWidth = 1;
}

// Camada 5: Decoração
function renderEng_Decoracao(ctx) {
  // Extintor
  ctx.fillStyle = '#2a0a0a';
  ctx.fillRect(870, 300, 18, 50);
  ctx.fillStyle = '#cc2222';
  ctx.fillRect(873, 305, 12, 40);
  // Placa PERIGO
  ctx.fillStyle = '#0a1018';
  ctx.fillRect(380, 430, 140, 25);
  ctx.strokeStyle = '#ff8800';
  ctx.strokeRect(380, 430, 140, 25);
  ctx.fillStyle = '#ff8800';
  ctx.font = 'bold 9px Courier New';
  ctx.fillText('⚡ ALTA TENSÃO', 398, 447);
}

// Camada 6: Objetos interativos
function renderEng_Objetos(ctx, state) {
  // --- PAINEL DE FUSÍVEIS (300, 50, 250, 150) ---
  ctx.fillStyle = '#0a1520';
  ctx.fillRect(305, 55, 240, 140);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.strokeRect(305, 55, 240, 140);
  // Slots de fusíveis
  for (let i = 0; i < 5; i++) {
    const slotOk = i !== 2 || state.get('energiaRestaurada');
    ctx.fillStyle = slotOk ? '#0a2a1a' : '#2a0a0a';
    ctx.fillRect(320 + i * 44, 80, 35, 80);
    ctx.strokeStyle = slotOk ? '#2e7d32' : '#c62828';
    ctx.strokeRect(320 + i * 44, 80, 35, 80);
  }
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '9px Courier New';
  ctx.fillText('FUSÍVEIS', 395, 180);
  ctx.lineWidth = 1;

  // --- GERADOR PRINCIPAL (60, 150, 180, 200) ---
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(65, 155, 170, 190);
  ctx.strokeStyle = state.get('energiaRestaurada') ? '#00d4ff' : '#333';
  ctx.lineWidth = 2;
  ctx.strokeRect(65, 155, 170, 190);
  // Corpo do gerador
  const genGrad = ctx.createLinearGradient(65, 155, 235, 155);
  genGrad.addColorStop(0, '#0c1420');
  genGrad.addColorStop(0.5, '#142030');
  genGrad.addColorStop(1, '#0c1420');
  ctx.fillStyle = genGrad;
  ctx.fillRect(75, 180, 150, 140);
  // Status
  ctx.fillStyle = state.get('energiaRestaurada') ? '#00d4ff' : '#4a4a4a';
  ctx.font = '12px Courier New';
  ctx.fillText(state.get('energiaRestaurada') ? 'ONLINE' : 'OFFLINE', 110, 255);
  // LED
  ctx.fillStyle = state.get('energiaRestaurada') ? '#00ff88' : '#ff3333';
  ctx.beginPath(); ctx.arc(220, 170, 4, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;

  // --- ARMÁRIO TÉCNICO (650, 100, 120, 180) ---
  ctx.fillStyle = '#1a1a2a';
  ctx.fillRect(655, 105, 110, 170);
  ctx.strokeStyle = '#2a3a5a';
  ctx.strokeRect(655, 105, 110, 170);
  // Puxador
  ctx.fillStyle = '#4a6a8a';
  ctx.fillRect(695, 185, 30, 6);
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '9px Courier New';
  ctx.fillText('SUPRIMENTOS', 662, 255);

  // --- DUTO DE VENTILAÇÃO (400, 400, 200, 100) ---
  ctx.fillStyle = '#0a0a10';
  ctx.fillRect(405, 405, 190, 90);
  ctx.strokeStyle = '#1a2a3a';
  ctx.strokeRect(405, 405, 190, 90);
  // Grades do duto
  ctx.fillStyle = '#1a2a3a';
  for (let i = 0; i < 8; i++) {
    ctx.fillRect(420, 420 + i * 9, 160, 3);
  }

  // --- PORTA COMANDO (30, 450, 100, 100) ---
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(35, 455, 95, 95);
  ctx.strokeStyle = '#1a3a5a';
  ctx.strokeRect(35, 455, 95, 95);
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '10px Courier New';
  ctx.fillText('← CMD', 52, 505);

  // --- PORTA CÁPSULA (780, 300, 70, 150) ---
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(785, 305, 65, 145);
  ctx.strokeStyle = state.get('energiaRestaurada') ? '#00d4ff' : '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.strokeRect(785, 305, 65, 145);
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '10px Courier New';
  ctx.fillText('CAP →', 795, 380);
  ctx.lineWidth = 1;
}

// Camada 7: Atmosfera
function renderEng_Atmosfera(ctx) {
  // Vapor subindo das tubulações
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#88ccff';
  ctx.beginPath();
  ctx.moveTo(45, 400); ctx.lineTo(30, 200); ctx.lineTo(70, 200);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(855, 380); ctx.lineTo(840, 180); ctx.lineTo(870, 180);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

// Camada 8: Overlay
function renderEng_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 120, 450, 300, 530);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(0, 5, 15, 0.25)');
  vignette.addColorStop(1, 'rgba(0, 5, 15, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ MÓDULO DA CÁPSULA ============

function renderCapsula(ctx, state) {
  renderCap_Background(ctx);
  renderCap_Arquitetura(ctx);
  renderCap_Iluminacao(ctx);
  renderCap_Detalhes(ctx);
  renderCap_Decoracao(ctx);
  renderCap_Objetos(ctx, state);
  renderCap_Atmosfera(ctx);
  renderCap_Overlay(ctx);
}

// Camada 1: Background
function renderCap_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#030508');
  grad.addColorStop(0.3, '#050810');
  grad.addColorStop(0.7, '#040710');
  grad.addColorStop(1, '#020406');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — cápsula curva, compacta
function renderCap_Arquitetura(ctx) {
  // Teto curvo
  ctx.fillStyle = '#060a14';
  ctx.fillRect(0, 0, 900, 25);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 1;
  // Arco do teto
  ctx.beginPath(); ctx.moveTo(50, 25); ctx.quadraticCurveTo(450, 10, 850, 25); ctx.stroke();
  // Paredes com curvatura
  ctx.fillStyle = '#080c18';
  ctx.fillRect(0, 25, 900, 435);
  // Painéis curvos
  ctx.strokeStyle = '#0e1a30';
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 150 + 50, 30);
    ctx.quadraticCurveTo(i * 150 + 75, 230, i * 150 + 50, 460);
    ctx.stroke();
  }
  // Piso
  ctx.fillStyle = '#0a1018';
  ctx.fillRect(0, 460, 900, 140);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 460); ctx.lineTo(900, 460); ctx.stroke();
  ctx.lineWidth = 1;
  // Bolts no teto
  ctx.fillStyle = '#2a4a6a';
  for (const b of CAP_BOLTS) {
    ctx.beginPath(); ctx.arc(b.x, b.y, 2.5, 0, Math.PI * 2); ctx.fill();
  }
}

// Camada 3: Iluminação
function renderCap_Iluminacao(ctx) {
  // Neon azul brilhante do painel de ignição
  const panelGlow = ctx.createRadialGradient(450, 150, 30, 450, 150, 250);
  panelGlow.addColorStop(0, 'rgba(0, 212, 255, 0.08)');
  panelGlow.addColorStop(0.5, 'rgba(0, 180, 220, 0.03)');
  panelGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = panelGlow;
  ctx.fillRect(200, 0, 500, 400);
  // Luzes laterais frias
  ctx.fillStyle = 'rgba(0, 100, 180, 0.02)';
  ctx.fillRect(0, 100, 60, 300);
  ctx.fillRect(840, 100, 60, 300);
}

// Camada 4: Detalhes
function renderCap_Detalhes(ctx) {
  // Cabos expostos
  ctx.strokeStyle = 'rgba(0, 80, 120, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(20, 200); ctx.quadraticCurveTo(30, 300, 20, 400); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(880, 180); ctx.quadraticCurveTo(870, 300, 880, 420); ctx.stroke();
  ctx.lineWidth = 1;
  // Etiquetas
  ctx.fillStyle = 'rgba(0, 150, 200, 0.08)';
  ctx.fillRect(22, 290, 20, 10);
  ctx.fillRect(862, 280, 20, 10);
}

// Camada 5: Decoração
function renderCap_Decoracao(ctx) {
  // Assento do piloto (esquerda)
  ctx.fillStyle = '#0c1020';
  ctx.fillRect(50, 380, 80, 70);
  ctx.strokeStyle = '#1a2a40';
  ctx.strokeRect(50, 380, 80, 70);
  // Cintos de segurança
  ctx.strokeStyle = '#2a4a6a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(70, 380); ctx.lineTo(90, 420); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(110, 380); ctx.lineTo(90, 420); ctx.stroke();
  ctx.lineWidth = 1;
  // Placa CÁPSULA DE FUGA
  ctx.fillStyle = '#060a14';
  ctx.fillRect(350, 440, 200, 20);
  ctx.strokeStyle = '#00d4ff';
  ctx.strokeRect(350, 440, 200, 20);
  ctx.fillStyle = '#00d4ff';
  ctx.font = 'bold 9px Courier New';
  ctx.fillText('CÁPSULA DE FUGA — E-7', 370, 454);
}

// Camada 6: Objetos interativos
function renderCap_Objetos(ctx, state) {
  // --- PAINEL DE IGNIÇÃO (250, 60, 400, 180) ---
  ctx.fillStyle = '#0a1520';
  ctx.fillRect(255, 65, 390, 170);
  ctx.strokeStyle = '#00d4ff';
  ctx.lineWidth = 2;
  ctx.strokeRect(255, 65, 390, 170);
  ctx.fillStyle = '#00d4ff';
  ctx.font = '13px Courier New';
  ctx.fillText('PAINEL DE IGNIÇÃO', 370, 95);
  // Slots
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '10px Courier New';
  ctx.fillText('[ 1: ___ ] → [ 2: ___ ] → [ 3: ___ ] → [ 4: ___ ]', 285, 150);
  // LEDs de status
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(310 + i * 95, 200, 5, 0, Math.PI * 2); ctx.fill();
  }
  ctx.lineWidth = 1;

  // --- VISOR DA CÁPSULA (50, 80, 150, 150) ---
  ctx.fillStyle = '#000008';
  ctx.fillRect(55, 85, 145, 140);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.strokeRect(55, 85, 145, 140);
  // Estrela no visor
  ctx.fillStyle = '#ffffaa';
  ctx.beginPath(); ctx.arc(127, 155, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#00d4ff44';
  ctx.font = '8px Courier New';
  ctx.fillText('PROXIMA CENTAURI', 70, 210);
  ctx.lineWidth = 1;

  // --- MANUAL DE EMERGÊNCIA (700, 300, 120, 100) ---
  ctx.fillStyle = '#1a1510';
  ctx.fillRect(705, 305, 110, 90);
  ctx.strokeStyle = '#3a3020';
  ctx.strokeRect(705, 305, 110, 90);
  ctx.fillStyle = '#b8a888';
  ctx.font = '10px Courier New';
  ctx.fillText('MANUAL', 735, 345);
  ctx.fillText('CAP. 7', 740, 360);
  // Linhas de texto
  ctx.fillStyle = '#5a4a30';
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(715, 370 + i * 10, 80, 2);
  }

  // --- VOLTAR ENERGIA (30, 480, 120, 60) ---
  ctx.fillStyle = '#0a1020';
  ctx.fillRect(35, 485, 115, 55);
  ctx.strokeStyle = '#1a3a5a';
  ctx.strokeRect(35, 485, 115, 55);
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '11px Courier New';
  ctx.fillText('← Energia', 52, 517);
}

// Camada 7: Atmosfera
function renderCap_Atmosfera(ctx) {
  // Feixes de luz no visor
  ctx.save();
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = '#ffffaa';
  ctx.beginPath();
  ctx.moveTo(127, 155); ctx.lineTo(50, 460); ctx.lineTo(200, 460);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

// Camada 8: Overlay
function renderCap_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 120, 450, 300, 520);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(0, 3, 12, 0.25)');
  vignette.addColorStop(1, 'rgba(0, 3, 12, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(0, 5, 15, 0.04)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// Ambiente COMANDO:
//   terminal:     (300, 50, 200, 130)
//   mapa:         (600, 40, 150, 120)
//   cadeira:      (380, 300, 140, 120)
//   janela:       (50, 60, 180, 200)
//   portaEnergia: (780, 250, 70, 180)
//
// Ambiente ENERGIA:
//   painelFusiveis: (300, 50, 250, 150)
//   gerador:        (60, 150, 180, 200)
//   armario:        (650, 100, 120, 180)
//   duto:           (400, 400, 200, 100)
//   portaComando:   (30, 450, 100, 100)
//   portaCapsula:   (780, 300, 70, 150)
//
// Ambiente CÁPSULA:
//   painelIgnicao:  (250, 60, 400, 180)
//   visor:          (50, 80, 150, 150)
//   manualEmerg:    (700, 300, 120, 100)
//   voltarEnergia:  (30, 480, 120, 60)
