/**
 * @module Sala9Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 9 — Bunker da Guerra Fria
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Ambientes: Escritório, Comunicações, Arquivos
 * Paleta: ThemeColdWar — bg #0a0a0c, accent #c62828, border #2a2a3a
 */

// ============ PRÉ-CALCULADOS ============
const BUNKER_CRACKS = [
  {x1:150,y1:100,x2:160,y2:140},{x1:400,y1:50,x2:405,y2:90},
  {x1:700,y1:80,x2:710,y2:120},{x1:250,y1:350,x2:260,y2:380}
];
const BUNKER_STAINS = [
  {x:200,y:450,rx:40,ry:12},{x:600,y:460,rx:30,ry:10},
  {x:400,y:520,rx:50,ry:15}
];
const COMM_LIGHTS = [{x:150,y:20},{x:450,y:20},{x:750,y:20}];

// ============ ESCRITÓRIO ============

function renderEscritorio(ctx, state) {
  renderEsc_Background(ctx);
  renderEsc_Arquitetura(ctx);
  renderEsc_Iluminacao(ctx);
  renderEsc_Detalhes(ctx);
  renderEsc_Decoracao(ctx);
  renderEsc_Objetos(ctx, state);
  renderEsc_Atmosfera(ctx);
  renderEsc_Overlay(ctx);
}

function renderEsc_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0a0c');
  grad.addColorStop(0.4, '#0c0c10');
  grad.addColorStop(0.8, '#0a0a0e');
  grad.addColorStop(1, '#08080a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderEsc_Arquitetura(ctx) {
  // Paredes de concreto brutal
  ctx.fillStyle = '#141418';
  ctx.fillRect(0, 0, 900, 460);
  // Textura do concreto — juntas
  ctx.strokeStyle = '#1a1a20';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath(); ctx.moveTo(0, i * 80 + 40); ctx.lineTo(900, i * 80 + 40); ctx.stroke();
  }
  for (let i = 0; i < 8; i++) {
    ctx.beginPath(); ctx.moveTo(i * 120 + 30, 0); ctx.lineTo(i * 120 + 30, 460); ctx.stroke();
  }
  ctx.lineWidth = 1;
  // Piso de concreto liso
  const floorGrad = ctx.createLinearGradient(0, 460, 0, 600);
  floorGrad.addColorStop(0, '#121218');
  floorGrad.addColorStop(1, '#0a0a0e');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 460, 900, 140);
  // Borda
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 460); ctx.lineTo(900, 460); ctx.stroke();
  ctx.lineWidth = 1;
  // Faixa vermelha soviética (superior)
  ctx.fillStyle = '#c6282833';
  ctx.fillRect(0, 0, 900, 5);
}

function renderEsc_Iluminacao(ctx) {
  // Lâmpada de tungstênio (amarela fraca)
  const bulbGlow = ctx.createRadialGradient(450, 20, 5, 450, 20, 300);
  bulbGlow.addColorStop(0, 'rgba(200, 180, 100, 0.06)');
  bulbGlow.addColorStop(0.4, 'rgba(180, 160, 80, 0.02)');
  bulbGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = bulbGlow;
  ctx.fillRect(150, 0, 600, 400);
  // Flicker
  const flick = Math.sin(Date.now() / 2000) * 0.01;
  ctx.fillStyle = `rgba(200, 180, 100, ${flick + 0.01})`;
  ctx.fillRect(0, 0, 900, 600);
}

function renderEsc_Detalhes(ctx) {
  // Rachaduras no concreto
  ctx.strokeStyle = 'rgba(30, 30, 40, 0.3)';
  ctx.lineWidth = 0.5;
  for (const c of BUNKER_CRACKS) {
    ctx.beginPath(); ctx.moveTo(c.x1, c.y1); ctx.lineTo(c.x2, c.y2); ctx.stroke();
  }
  ctx.lineWidth = 1;
  // Manchas de umidade
  for (const s of BUNKER_STAINS) {
    ctx.fillStyle = 'rgba(20, 25, 35, 0.08)';
    ctx.beginPath(); ctx.ellipse(s.x, s.y, s.rx, s.ry, 0, 0, Math.PI * 2); ctx.fill();
  }
}

function renderEsc_Decoracao(ctx) {
  // Lâmpada física
  ctx.fillStyle = '#2a2a30';
  ctx.fillRect(445, 5, 10, 15);
  ctx.fillStyle = 'rgba(200, 180, 100, 0.5)';
  ctx.beginPath(); ctx.arc(450, 22, 6, 0, Math.PI * 2); ctx.fill();
  // Bandeira/propaganda
  ctx.fillStyle = '#c6282844';
  ctx.fillRect(50, 20, 80, 50);
  ctx.strokeStyle = '#c62828';
  ctx.strokeRect(50, 20, 80, 50);
  // Estrela
  ctx.fillStyle = '#e8b84a88';
  ctx.font = '20px serif';
  ctx.fillText('☭', 72, 55);
  // Tubo de aquecimento
  ctx.fillStyle = '#2a2a30';
  ctx.fillRect(870, 50, 12, 400);
  ctx.fillStyle = '#3a3a40';
  ctx.fillRect(868, 150, 16, 8);
  ctx.fillRect(868, 300, 16, 8);
}

function renderEsc_Objetos(ctx, state) {
  // --- MESA DO OFICIAL (250, 250, 280, 130) ---
  const mesaGrad = ctx.createLinearGradient(250, 250, 250, 380);
  mesaGrad.addColorStop(0, '#2a2a30');
  mesaGrad.addColorStop(1, '#1a1a20');
  ctx.fillStyle = mesaGrad;
  ctx.fillRect(255, 255, 270, 120);
  ctx.strokeStyle = '#3a3a40';
  ctx.strokeRect(255, 255, 270, 120);
  // Pernas
  ctx.fillStyle = '#1a1a20';
  ctx.fillRect(265, 375, 8, 80);
  ctx.fillRect(507, 375, 8, 80);
  // Documentos na mesa
  ctx.fillStyle = '#d4d0c0';
  ctx.fillRect(280, 270, 80, 60);
  ctx.fillStyle = '#f5f0e0';
  ctx.fillRect(380, 275, 100, 50);
  // Carimbo CLASSIFICADO
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 8px Courier New';
  ctx.fillText('СЕКРЕТНО', 290, 310);

  // --- MÁQUINA DE ESCREVER (600, 200, 140, 100) ---
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(605, 205, 130, 90);
  ctx.strokeStyle = '#3a3a40';
  ctx.strokeRect(605, 205, 130, 90);
  // Teclas
  ctx.fillStyle = '#2a2a30';
  for (let i = 0; i < 8; i++) {
    ctx.beginPath(); ctx.arc(620 + i * 14, 270, 5, 0, Math.PI * 2); ctx.fill();
  }
  // Papel
  ctx.fillStyle = '#d4d0c0';
  ctx.fillRect(620, 200, 100, 30);
  ctx.fillStyle = '#333';
  ctx.font = '6px Courier New';
  ctx.fillText('PROTOCOLO 7-B', 630, 215);

  // --- COFRE (50, 150, 120, 150) ---
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(55, 155, 110, 140);
  const cofreGrad = ctx.createLinearGradient(55, 155, 165, 295);
  cofreGrad.addColorStop(0, '#2a2a2a');
  cofreGrad.addColorStop(0.5, '#1a1a1a');
  cofreGrad.addColorStop(1, '#0a0a0a');
  ctx.fillStyle = cofreGrad;
  ctx.fillRect(60, 160, 100, 130);
  ctx.strokeStyle = '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(55, 155, 110, 140);
  ctx.lineWidth = 1;
  // Dial
  ctx.fillStyle = '#333';
  ctx.beginPath(); ctx.arc(110, 225, 18, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(110, 225, 18, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#c62828';
  ctx.beginPath(); ctx.arc(110, 225, 3, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;

  // --- MAPA DE GUERRA (350, 50, 200, 130) ---
  ctx.fillStyle = '#1a1a14';
  ctx.fillRect(355, 55, 190, 120);
  ctx.strokeStyle = '#3a3a2a';
  ctx.strokeRect(355, 55, 190, 120);
  // Mapa simplificado
  ctx.strokeStyle = '#c6282888';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(450, 115, 30, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(430, 90); ctx.lineTo(470, 140); ctx.stroke();
  ctx.fillStyle = '#c62828';
  ctx.font = '8px Courier New';
  ctx.fillText('ЗОНА A', 380, 75);
  ctx.fillText('ЗОНА B', 480, 155);

  // --- PORTA COMUNICAÇÕES (780, 200, 80, 200) ---
  ctx.fillStyle = '#0c0c10';
  ctx.fillRect(785, 205, 70, 190);
  ctx.strokeStyle = state.get('portaComm') ? '#4caf50' : '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.strokeRect(785, 205, 70, 190);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '9px Courier New';
  ctx.fillText('СВЯЗЬ →', 793, 305);
}

function renderEsc_Atmosfera(ctx) {
  // Poeira visível na lâmpada
  ctx.save();
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = '#c8c8a0';
  ctx.beginPath();
  ctx.moveTo(445, 22); ctx.lineTo(350, 460); ctx.lineTo(550, 460);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function renderEsc_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 130, 450, 300, 530);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(5, 5, 8, 0.25)');
  vignette.addColorStop(1, 'rgba(5, 5, 8, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ SALA DE COMUNICAÇÕES ============

function renderComunicacoes(ctx, state) {
  renderComm_Background(ctx);
  renderComm_Arquitetura(ctx);
  renderComm_Iluminacao(ctx);
  renderComm_Detalhes(ctx);
  renderComm_Decoracao(ctx);
  renderComm_Objetos(ctx, state);
  renderComm_Atmosfera(ctx);
  renderComm_Overlay(ctx);
}

function renderComm_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#080810');
  grad.addColorStop(0.5, '#0c0c14');
  grad.addColorStop(1, '#08080c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderComm_Arquitetura(ctx) {
  // Paredes com painéis metálicos
  ctx.fillStyle = '#10101a';
  ctx.fillRect(0, 0, 900, 470);
  // Racks de equipamento
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    ctx.strokeRect(i * 180 + 10, 10, 170, 455);
  }
  // Piso
  ctx.fillStyle = '#0c0c10';
  ctx.fillRect(0, 470, 900, 130);
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(900, 470); ctx.stroke();
  ctx.lineWidth = 1;
}

function renderComm_Iluminacao(ctx) {
  // Luzes fluorescentes (3 no teto)
  for (const l of COMM_LIGHTS) {
    ctx.fillStyle = 'rgba(180, 200, 220, 0.12)';
    ctx.fillRect(l.x - 40, l.y, 80, 4);
    const glow = ctx.createRadialGradient(l.x, l.y, 5, l.x, l.y, 200);
    glow.addColorStop(0, 'rgba(180, 200, 220, 0.04)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(l.x - 200, 0, 400, 300);
  }
  // Flicker na terceira lâmpada
  const flick = Math.sin(Date.now() / 100) > 0.8 ? 0.08 : 0;
  ctx.fillStyle = `rgba(180, 200, 220, ${flick})`;
  ctx.fillRect(650, 0, 200, 100);
}

function renderComm_Detalhes(ctx) {
  // Cabos no piso
  ctx.strokeStyle = 'rgba(30, 30, 50, 0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(100, 470); ctx.quadraticCurveTo(300, 490, 500, 470); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(400, 470); ctx.quadraticCurveTo(600, 485, 800, 470); ctx.stroke();
  ctx.lineWidth = 1;
}

function renderComm_Decoracao(ctx) {
  // Relógio DOOMSDAY
  ctx.fillStyle = '#0a0a10';
  ctx.fillRect(400, 30, 100, 40);
  ctx.strokeStyle = '#c62828';
  ctx.strokeRect(400, 30, 100, 40);
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 14px Courier New';
  ctx.fillText('23:57', 418, 57);
  // Label
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '7px Courier New';
  ctx.fillText('DOOMSDAY CLOCK', 410, 42);
}

function renderComm_Objetos(ctx, state) {
  // --- CONSOLE DE RÁDIO (100, 100, 250, 180) ---
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(105, 105, 240, 170);
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.strokeRect(105, 105, 240, 170);
  ctx.lineWidth = 1;
  // Dials
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = '#1a1a20';
    ctx.beginPath(); ctx.arc(160 + i * 60, 180, 20, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4a4a5a';
    ctx.beginPath(); ctx.arc(160 + i * 60, 180, 20, 0, Math.PI * 2); ctx.stroke();
    // Agulha
    ctx.strokeStyle = '#c62828';
    ctx.beginPath(); ctx.moveTo(160 + i * 60, 180); ctx.lineTo(165 + i * 60, 165); ctx.stroke();
  }
  // Frequência display
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(130, 220, 180, 30);
  ctx.fillStyle = '#4caf50';
  ctx.font = '12px Courier New';
  ctx.fillText('FREQ: 103.7 MHz', 140, 240);
  // VU meter animado
  const vu = Math.sin(Date.now() / 300) * 0.3 + 0.5;
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(130, 255, 180 * vu, 8);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(130, 255, 180, 8);

  // --- MESA DE DECODIFICAÇÃO (450, 150, 200, 150) ---
  ctx.fillStyle = '#141418';
  ctx.fillRect(455, 155, 190, 140);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(455, 155, 190, 140);
  // Enigma machine
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(480, 180, 140, 80);
  ctx.strokeStyle = '#4a4a5a';
  ctx.strokeRect(480, 180, 140, 80);
  // Rotores
  ctx.fillStyle = '#3a3a40';
  ctx.beginPath(); ctx.arc(520, 210, 12, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(555, 210, 12, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(590, 210, 12, 0, Math.PI * 2); ctx.fill();
  // Letras
  ctx.fillStyle = '#c8c8d0';
  ctx.font = '8px Courier New';
  ctx.fillText('A', 517, 213); ctx.fillText('M', 552, 213); ctx.fillText('X', 587, 213);
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '9px Courier New';
  ctx.fillText('ENIGMA M4', 500, 275);

  // --- TELÉGRAFO (700, 100, 130, 120) ---
  ctx.fillStyle = '#1a1a10';
  ctx.fillRect(705, 105, 120, 110);
  ctx.strokeStyle = '#3a3a2a';
  ctx.strokeRect(705, 105, 120, 110);
  // Chave telegráfica
  ctx.fillStyle = '#2a2a20';
  ctx.fillRect(730, 160, 60, 8);
  ctx.fillStyle = '#8b7340';
  ctx.beginPath(); ctx.arc(760, 155, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '8px Courier New';
  ctx.fillText('MORSE', 740, 130);

  // --- PAINEL DE ALERTA (350, 350, 200, 100) ---
  ctx.fillStyle = '#0a0a10';
  ctx.fillRect(355, 355, 190, 90);
  const alertPulse = Math.sin(Date.now() / 700) * 0.5 + 0.5;
  ctx.strokeStyle = `rgba(198, 40, 40, ${0.4 + alertPulse * 0.4})`;
  ctx.lineWidth = 2;
  ctx.strokeRect(355, 355, 190, 90);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 11px Courier New';
  ctx.fillText('⚠ DEFCON 2', 400, 390);
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '9px Courier New';
  ctx.fillText('Status: ELEVADO', 385, 420);

  // --- PORTA ARQUIVOS (780, 300, 80, 150) ---
  ctx.fillStyle = '#0c0c10';
  ctx.fillRect(785, 305, 70, 140);
  ctx.strokeStyle = state.get('portaArquivos') ? '#4caf50' : '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.strokeRect(785, 305, 70, 140);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '8px Courier New';
  ctx.fillText('АРХИВ →', 793, 380);

  // --- VOLTAR ESCRITÓRIO (30, 520, 130, 50) ---
  ctx.fillStyle = '#10101a';
  ctx.fillRect(35, 525, 125, 45);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(35, 525, 125, 45);
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '10px Courier New';
  ctx.fillText('← Escritório', 42, 552);
}

function renderComm_Atmosfera(ctx) {
  // Estática no ar (glow dos equipamentos)
  ctx.fillStyle = 'rgba(76, 175, 80, 0.01)';
  ctx.fillRect(100, 100, 250, 180);
  ctx.fillStyle = 'rgba(198, 40, 40, 0.01)';
  ctx.fillRect(350, 350, 200, 100);
}

function renderComm_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 120, 450, 300, 530);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(5, 5, 10, 0.25)');
  vignette.addColorStop(1, 'rgba(5, 5, 10, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ SALA DE ARQUIVOS ============

function renderArquivos(ctx, state) {
  renderArq_Background(ctx);
  renderArq_Arquitetura(ctx);
  renderArq_Iluminacao(ctx);
  renderArq_Detalhes(ctx);
  renderArq_Decoracao(ctx);
  renderArq_Objetos(ctx, state);
  renderArq_Atmosfera(ctx);
  renderArq_Overlay(ctx);
}

function renderArq_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0a0e');
  grad.addColorStop(0.5, '#0e0e14');
  grad.addColorStop(1, '#08080c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderArq_Arquitetura(ctx) {
  // Sala de arquivos — prateleiras metálicas
  ctx.fillStyle = '#12121a';
  ctx.fillRect(0, 0, 900, 470);
  // Piso
  ctx.fillStyle = '#0c0c10';
  ctx.fillRect(0, 470, 900, 130);
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(900, 470); ctx.stroke();
  ctx.lineWidth = 1;
  // Prateleiras laterais
  ctx.fillStyle = '#1a1a24';
  ctx.fillRect(30, 50, 180, 410);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(30, 50, 180, 410);
  ctx.fillStyle = '#1a1a24';
  ctx.fillRect(690, 50, 180, 410);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(690, 50, 180, 410);
  // Prateleiras internas
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = '#2a2a30';
    ctx.fillRect(35, 80 + i * 80, 170, 3);
    ctx.fillRect(695, 80 + i * 80, 170, 3);
  }
}

function renderArq_Iluminacao(ctx) {
  // Neon frio do teto
  ctx.fillStyle = 'rgba(150, 180, 220, 0.1)';
  ctx.fillRect(350, 10, 200, 4);
  const glow = ctx.createRadialGradient(450, 10, 10, 450, 10, 250);
  glow.addColorStop(0, 'rgba(150, 180, 220, 0.04)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(200, 0, 500, 350);
}

function renderArq_Detalhes(ctx) {
  // Poeira nas prateleiras
  ctx.fillStyle = 'rgba(40, 40, 50, 0.08)';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(35, 78 + i * 80, 170, 2);
    ctx.fillRect(695, 78 + i * 80, 170, 2);
  }
}

function renderArq_Decoracao(ctx) {
  // Caixas de arquivo nas prateleiras
  const boxColors = ['#2a2020', '#20202a', '#202a20', '#2a2a20', '#2a202a'];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.fillStyle = boxColors[(i + j) % 5];
      ctx.fillRect(40 + j * 55, 55 + i * 80, 50, 22);
      ctx.fillRect(700 + j * 55, 55 + i * 80, 50, 22);
    }
  }
  // Label АРХИВ
  ctx.fillStyle = '#0a0a10';
  ctx.fillRect(380, 440, 140, 22);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(380, 440, 140, 22);
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '9px Courier New';
  ctx.fillText('АРХИВ — СЕКРЕТНО', 388, 455);
}

function renderArq_Objetos(ctx, state) {
  // --- GAVETA CLASSIFICADA (300, 100, 200, 120) ---
  ctx.fillStyle = '#1a1a24';
  ctx.fillRect(305, 105, 190, 110);
  ctx.strokeStyle = '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(305, 105, 190, 110);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText('CLASSIFICADO', 350, 130);
  // Puxador
  ctx.fillStyle = '#4a4a5a';
  ctx.fillRect(380, 165, 40, 6);
  // Selo
  ctx.strokeStyle = '#c6282888';
  ctx.beginPath(); ctx.arc(400, 190, 12, 0, Math.PI * 2); ctx.stroke();

  // --- TERMINAL DE COMPUTADOR (300, 280, 200, 140) ---
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(305, 285, 190, 130);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(305, 285, 190, 130);
  // Tela
  ctx.fillStyle = '#0a1a0a';
  ctx.fillRect(315, 295, 170, 90);
  ctx.fillStyle = '#4caf50';
  ctx.font = '9px Courier New';
  ctx.fillText('> СИСТЕМА ГОТОВА', 325, 320);
  ctx.fillText('> ВВЕДИТЕ КОД_', 325, 340);
  // Cursor
  const blink = Math.sin(Date.now() / 500) > 0 ? '#4caf50' : 'transparent';
  ctx.fillStyle = blink;
  ctx.fillRect(420, 332, 7, 10);
  // Teclado
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(315, 390, 170, 18);

  // --- MICROFILME (600, 150, 120, 100) ---
  ctx.fillStyle = '#141418';
  ctx.fillRect(605, 155, 110, 90);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(605, 155, 110, 90);
  // Rolo de filme
  ctx.strokeStyle = '#4a4a5a';
  ctx.beginPath(); ctx.arc(640, 200, 15, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(690, 200, 15, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#2a2a3a';
  ctx.beginPath(); ctx.moveTo(655, 200); ctx.lineTo(675, 200); ctx.stroke();
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '8px Courier New';
  ctx.fillText('МИКРОФИЛЬМ', 615, 235);

  // --- PAINEL DE AUTODESTRUIÇÃO (550, 350, 180, 100) ---
  ctx.fillStyle = '#1a0a0a';
  ctx.fillRect(555, 355, 170, 90);
  ctx.strokeStyle = '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(555, 355, 170, 90);
  ctx.lineWidth = 1;
  // Botão vermelho grande
  ctx.fillStyle = '#c62828';
  ctx.beginPath(); ctx.arc(640, 400, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ff4444';
  ctx.beginPath(); ctx.arc(640, 400, 12, 0, Math.PI * 2); ctx.fill();
  // Tampa de proteção
  ctx.strokeStyle = '#ffcc00';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(620, 385); ctx.lineTo(620, 378); ctx.lineTo(660, 378); ctx.lineTo(660, 385);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 8px Courier New';
  ctx.fillText('УНИЧТОЖИТЬ', 590, 435);

  // --- VOLTAR COMUNICAÇÕES (30, 520, 140, 50) ---
  ctx.fillStyle = '#10101a';
  ctx.fillRect(35, 525, 135, 45);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(35, 525, 135, 45);
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '10px Courier New';
  ctx.fillText('← Comunic.', 48, 552);
}

function renderArq_Atmosfera(ctx) {
  // Glow do terminal
  ctx.fillStyle = 'rgba(76, 175, 80, 0.015)';
  ctx.fillRect(300, 280, 200, 140);
  // Glow vermelho do botão
  const pulse = Math.sin(Date.now() / 1000) * 0.01 + 0.01;
  ctx.fillStyle = `rgba(198, 40, 40, ${pulse})`;
  ctx.fillRect(550, 350, 180, 100);
}

function renderArq_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 500);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(5, 5, 10, 0.3)');
  vignette.addColorStop(1, 'rgba(5, 5, 10, 0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// Ambiente ESCRITÓRIO:
//   mesa:           (250, 250, 280, 130)
//   maquinaEscrever:(600, 200, 140, 100)
//   cofre:          (50, 150, 120, 150)
//   mapaGuerra:     (350, 50, 200, 130)
//   portaComm:      (780, 200, 80, 200)
//
// Ambiente COMUNICAÇÕES:
//   consoleRadio:   (100, 100, 250, 180)
//   mesaDecod:      (450, 150, 200, 150)
//   telegrafo:      (700, 100, 130, 120)
//   painelAlerta:   (350, 350, 200, 100)
//   portaArquivos:  (780, 300, 80, 150)
//   voltarEsc:      (30, 520, 130, 50)
//
// Ambiente ARQUIVOS:
//   gavetaClass:    (300, 100, 200, 120)
//   terminal:       (300, 280, 200, 140)
//   microfilme:     (600, 150, 120, 100)
//   painelDestru:   (550, 350, 180, 100)
//   voltarComm:     (30, 520, 140, 50)
