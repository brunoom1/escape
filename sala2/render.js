/**
 * @module Sala2Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 2 — Protocolo Omega (Laboratório)
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Ambientes: Lab Principal, Câmara de Contenção, Depósito de Reagentes
 * Paleta: ThemeLab — bg #0a0f0a, accent #00ff88, border #1b5e20
 */

// ============ VARIÁVEIS PRÉ-CALCULADAS (sem Math.random no render) ============
const LAB_SCRATCHES = [
  {x1:120,y1:200,x2:135,y2:215},{x1:400,y1:150,x2:410,y2:170},
  {x1:680,y1:90,x2:700,y2:100},{x1:250,y1:380,x2:270,y2:395},
  {x1:560,y1:320,x2:575,y2:340},{x1:800,y1:200,x2:815,y2:220}
];
const CONT_STAINS = [
  {x:150,y:380,rx:25,ry:10},{x:450,y:420,rx:30,ry:12},
  {x:700,y:460,rx:20,ry:8},{x:300,y:500,rx:35,ry:14}
];
const DEP_CONDENSATION = [
  {x:100,y:50,r:2},{x:250,y:70,r:1.5},{x:400,y:30,r:2.5},
  {x:550,y:60,r:1.8},{x:700,y:40,r:2.2},{x:150,y:120,r:1.3},
  {x:350,y:110,r:2},{x:600,y:100,r:1.6},{x:800,y:80,r:2.1},
  {x:80,y:180,r:1.4},{x:450,y:160,r:1.9},{x:720,y:150,r:1.7}
];

// ============ LAB PRINCIPAL ============

function renderLab(ctx, state) {
  renderLab_Background(ctx);
  renderLab_Arquitetura(ctx);
  renderLab_Iluminacao(ctx, state);
  renderLab_Detalhes(ctx);
  renderLab_Decoracao(ctx);
  renderLab_Objetos(ctx, state);
  renderLab_Atmosfera(ctx);
  renderLab_Overlay(ctx);
}

// Camada 1: Background — gradiente verde-escuro laboratorial
function renderLab_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#060d06');
  grad.addColorStop(0.3, '#0a0f0a');
  grad.addColorStop(0.7, '#0c140e');
  grad.addColorStop(1, '#050a05');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — painéis metálicos, piso industrial, teto com dutos
function renderLab_Arquitetura(ctx) {
  // Teto com dutos
  ctx.fillStyle = '#0c100c';
  ctx.fillRect(0, 0, 900, 35);
  // Dutos horizontais
  const dutoGrad = ctx.createLinearGradient(0, 10, 0, 30);
  dutoGrad.addColorStop(0, '#1a2a1a');
  dutoGrad.addColorStop(0.5, '#253525');
  dutoGrad.addColorStop(1, '#1a2a1a');
  ctx.fillStyle = dutoGrad;
  ctx.fillRect(50, 12, 300, 16);
  ctx.fillRect(550, 12, 280, 16);
  // Juntas dos dutos
  ctx.fillStyle = '#2a3a2a';
  ctx.fillRect(180, 10, 8, 20);
  ctx.fillRect(620, 10, 8, 20);

  // Paredes — painéis metálicos com rebites
  ctx.fillStyle = '#0f1a12';
  ctx.fillRect(0, 35, 900, 415);
  // Linhas de painéis verticais
  ctx.strokeStyle = '#1b3020';
  ctx.lineWidth = 1;
  for (let i = 0; i < 7; i++) {
    const px = i * 135 + 30;
    ctx.beginPath(); ctx.moveTo(px, 35); ctx.lineTo(px, 450); ctx.stroke();
  }
  // Linhas horizontais (juntas)
  ctx.strokeStyle = '#162a1a';
  ctx.beginPath(); ctx.moveTo(0, 200); ctx.lineTo(900, 200); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 350); ctx.lineTo(900, 350); ctx.stroke();
  // Rebites nos cantos dos painéis
  ctx.fillStyle = '#2a4030';
  for (let i = 0; i < 7; i++) {
    const px = i * 135 + 30;
    ctx.beginPath(); ctx.arc(px, 40, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(px, 200, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(px, 350, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(px, 445, 2.5, 0, Math.PI * 2); ctx.fill();
  }

  // Piso industrial — azulejos grandes
  const floorGrad = ctx.createLinearGradient(0, 450, 0, 600);
  floorGrad.addColorStop(0, '#0a150c');
  floorGrad.addColorStop(0.5, '#081008');
  floorGrad.addColorStop(1, '#050a05');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 450, 900, 150);
  // Linha de transição parede/piso
  ctx.strokeStyle = '#1b5e20';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 450); ctx.lineTo(900, 450); ctx.stroke();
  ctx.lineWidth = 1;
  // Grid do piso
  ctx.strokeStyle = '#0f1f12';
  for (let i = 0; i < 10; i++) {
    ctx.beginPath(); ctx.moveTo(i * 100, 450); ctx.lineTo(i * 100, 600); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(0, 525); ctx.lineTo(900, 525); ctx.stroke();
}

// Camada 3: Iluminação — emergência vermelha pulsante + luz ambiente verde fraca
function renderLab_Iluminacao(ctx, state) {
  // Pulso de emergência vermelho (sincronizado com Date.now)
  const pulse = Math.sin(Date.now() / 600) * 0.5 + 0.5;
  // Faixa de alerta superior
  ctx.fillStyle = `rgba(255, 30, 30, ${pulse * 0.12})`;
  ctx.fillRect(0, 0, 900, 8);
  // Glow vermelho nas laterais
  const leftGlow = ctx.createRadialGradient(0, 300, 0, 0, 300, 200);
  leftGlow.addColorStop(0, `rgba(200, 30, 30, ${pulse * 0.06})`);
  leftGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = leftGlow;
  ctx.fillRect(0, 100, 200, 400);
  const rightGlow = ctx.createRadialGradient(900, 300, 0, 900, 300, 200);
  rightGlow.addColorStop(0, `rgba(200, 30, 30, ${pulse * 0.06})`);
  rightGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = rightGlow;
  ctx.fillRect(700, 100, 200, 400);

  // Luz fluorescente verde (teto central, fixa)
  const ceilingLight = ctx.createRadialGradient(450, 35, 10, 450, 35, 350);
  ceilingLight.addColorStop(0, 'rgba(0, 255, 136, 0.06)');
  ceilingLight.addColorStop(0.5, 'rgba(0, 255, 136, 0.02)');
  ceilingLight.addColorStop(1, 'transparent');
  ctx.fillStyle = ceilingLight;
  ctx.fillRect(100, 0, 700, 450);

  // Reflexo da luz no piso
  ctx.fillStyle = 'rgba(0, 200, 100, 0.015)';
  ctx.fillRect(300, 460, 300, 80);
}

// Camada 4: Detalhes — arranhões, manchas, desgaste
function renderLab_Detalhes(ctx) {
  // Arranhões nas paredes
  ctx.strokeStyle = 'rgba(30, 60, 35, 0.4)';
  ctx.lineWidth = 0.7;
  for (const s of LAB_SCRATCHES) {
    ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
  }
  // Mancha de produto químico no piso
  ctx.fillStyle = 'rgba(0, 80, 40, 0.08)';
  ctx.beginPath(); ctx.ellipse(350, 510, 60, 20, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(0, 60, 30, 0.06)';
  ctx.beginPath(); ctx.ellipse(650, 490, 40, 15, 0.3, 0, Math.PI * 2); ctx.fill();
  // Marcas de respingo na parede inferior
  ctx.fillStyle = 'rgba(20, 50, 25, 0.15)';
  ctx.beginPath(); ctx.ellipse(200, 420, 15, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(600, 430, 12, 6, 0.5, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
}

// Camada 5: Decoração — props não-interativos (biohazard, tubulações, placas)
function renderLab_Decoracao(ctx) {
  // Símbolo biohazard na parede (centro-alto)
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = '#ff4444';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(450, 240, 40, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(435, 225, 18, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(465, 225, 18, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(450, 255, 18, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();

  // Tubulação vertical esquerda
  const tuboGrad = ctx.createLinearGradient(20, 35, 35, 35);
  tuboGrad.addColorStop(0, '#1a2a1a');
  tuboGrad.addColorStop(0.5, '#2a4030');
  tuboGrad.addColorStop(1, '#1a2a1a');
  ctx.fillStyle = tuboGrad;
  ctx.fillRect(22, 35, 12, 415);
  // Válvula
  ctx.fillStyle = '#cc3333';
  ctx.beginPath(); ctx.arc(28, 250, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#881111';
  ctx.beginPath(); ctx.arc(28, 250, 3, 0, Math.PI * 2); ctx.fill();

  // Tubulação vertical direita
  ctx.fillStyle = tuboGrad;
  ctx.fillRect(866, 35, 12, 415);
  // Manômetro
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.arc(872, 180, 10, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#3a5a3a';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(872, 180, 10, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(872, 180); ctx.lineTo(878, 174); ctx.stroke();

  // Placa "NÍVEL BSL-2" na parede
  ctx.fillStyle = '#0a1a0e';
  ctx.fillRect(370, 385, 160, 30);
  ctx.strokeStyle = '#1b5e20';
  ctx.strokeRect(370, 385, 160, 30);
  ctx.fillStyle = '#4caf50';
  ctx.font = 'bold 11px Courier New';
  ctx.fillText('⚠ NÍVEL BSL-2', 392, 405);

  // Bancada secundária (fundo) — não-interativa
  ctx.fillStyle = '#0f1a12';
  ctx.fillRect(200, 260, 250, 12);
  ctx.fillStyle = '#162a1a';
  ctx.fillRect(200, 258, 250, 4);
}

// Camada 6: Objetos interativos — 2-3 shades brighter, glow presence
function renderLab_Objetos(ctx, state) {
  // --- COMPUTADOR CENTRAL (350, 50, 160, 120) ---
  // Mesa/bancada
  const bancGrad = ctx.createLinearGradient(320, 160, 320, 180);
  bancGrad.addColorStop(0, '#1a2a1e');
  bancGrad.addColorStop(1, '#0f1a12');
  ctx.fillStyle = bancGrad;
  ctx.fillRect(320, 165, 200, 12);
  // Monitor
  ctx.fillStyle = '#111';
  ctx.fillRect(355, 55, 150, 100);
  ctx.strokeStyle = '#2a4a30';
  ctx.lineWidth = 2;
  ctx.strokeRect(355, 55, 150, 100);
  // Tela — brilha verde
  const screenGrad = ctx.createLinearGradient(360, 60, 360, 145);
  screenGrad.addColorStop(0, '#0a2a12');
  screenGrad.addColorStop(1, '#051a08');
  ctx.fillStyle = screenGrad;
  ctx.fillRect(360, 60, 140, 90);
  // Texto na tela
  ctx.fillStyle = '#00ff88';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText('HELIX OS v3.2.1', 370, 78);
  ctx.fillStyle = '#00cc66';
  ctx.font = '9px Courier New';
  ctx.fillText('> STATUS: ALERTA', 370, 93);
  ctx.fillText('> PROTOCOLO OMEGA', 370, 106);
  if (state.get('computador')) {
    ctx.fillStyle = '#00ff88';
    ctx.fillText('> FÓRMULA CARREGADA', 370, 119);
    ctx.fillText('> ácido→catal→base→oxi', 370, 132);
  } else {
    ctx.fillStyle = '#33aa55';
    ctx.fillText('> ACESSO PENDENTE...', 370, 119);
  }
  // Base do monitor
  ctx.fillStyle = '#1a2a1e';
  ctx.fillRect(410, 155, 40, 12);
  ctx.fillRect(400, 163, 60, 5);
  ctx.lineWidth = 1;

  // --- MICROSCÓPIO (60, 100, 100, 100) ---
  // Base
  ctx.fillStyle = '#1a2a1e';
  ctx.fillRect(80, 170, 60, 30);
  // Coluna
  const microGrad = ctx.createLinearGradient(105, 100, 115, 100);
  microGrad.addColorStop(0, '#2a4030');
  microGrad.addColorStop(0.5, '#3a5a40');
  microGrad.addColorStop(1, '#2a4030');
  ctx.fillStyle = microGrad;
  ctx.fillRect(105, 105, 10, 70);
  // Ocular
  ctx.fillStyle = '#1a3020';
  ctx.fillRect(90, 100, 40, 15);
  ctx.fillStyle = '#254035';
  ctx.beginPath(); ctx.arc(110, 100, 8, 0, Math.PI * 2); ctx.fill();
  // Lente brilhante
  ctx.fillStyle = '#00cc88';
  ctx.beginPath(); ctx.arc(110, 185, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#00ff88';
  ctx.beginPath(); ctx.arc(110, 185, 3, 0, Math.PI * 2); ctx.fill();

  // --- CENTRÍFUGA (60, 280, 110, 80) ---
  // Corpo
  const centGrad = ctx.createLinearGradient(60, 280, 170, 280);
  centGrad.addColorStop(0, '#1a2820');
  centGrad.addColorStop(0.5, '#253a2a');
  centGrad.addColorStop(1, '#1a2820');
  ctx.fillStyle = centGrad;
  ctx.fillRect(62, 282, 106, 76);
  ctx.strokeStyle = '#3a6040';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(62, 282, 106, 76);
  // Tampa circular
  ctx.fillStyle = '#1a2a20';
  ctx.beginPath(); ctx.arc(115, 320, 28, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#4a7a50';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(115, 320, 28, 0, Math.PI * 2); ctx.stroke();
  // Centro da tampa
  ctx.fillStyle = '#0a1a0e';
  ctx.beginPath(); ctx.arc(115, 320, 10, 0, Math.PI * 2); ctx.fill();
  // LED de status
  ctx.fillStyle = '#00ff88';
  ctx.beginPath(); ctx.arc(155, 290, 3, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;

  // --- PAINEL DE ALARME (700, 60, 120, 100) ---
  const alarmOff = state.get('alarmeDesligado');
  // Caixa
  ctx.fillStyle = alarmOff ? '#0a2a15' : '#2a0a0a';
  ctx.fillRect(702, 62, 116, 96);
  ctx.strokeStyle = alarmOff ? '#2e7d32' : '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(702, 62, 116, 96);
  // Visor digital
  ctx.fillStyle = '#050505';
  ctx.fillRect(715, 75, 90, 25);
  ctx.fillStyle = alarmOff ? '#66bb6a' : '#ef5350';
  ctx.font = 'bold 12px Courier New';
  ctx.fillText(alarmOff ? '  SEGURO  ' : ' ⚠ ALERTA ', 722, 93);
  // Botões
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(720, 110, 30, 15);
  ctx.fillRect(760, 110, 30, 15);
  ctx.fillRect(800, 110, 10, 15);
  // Luz pulsante se ativo
  if (!alarmOff) {
    const p = Math.sin(Date.now() / 400) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255, 50, 50, ${p * 0.8})`;
    ctx.beginPath(); ctx.arc(810, 70, 5, 0, Math.PI * 2); ctx.fill();
  } else {
    ctx.fillStyle = '#00ff88';
    ctx.beginPath(); ctx.arc(810, 70, 5, 0, Math.PI * 2); ctx.fill();
  }
  ctx.lineWidth = 1;

  // --- CLIPBOARD NA BANCADA (550, 350, 80, 100) ---
  // Bancada
  ctx.fillStyle = '#162a1a';
  ctx.fillRect(530, 440, 120, 10);
  // Clipboard
  const clipGrad = ctx.createLinearGradient(550, 350, 550, 450);
  clipGrad.addColorStop(0, '#2a3a25');
  clipGrad.addColorStop(1, '#1a2a18');
  ctx.fillStyle = clipGrad;
  ctx.fillRect(555, 355, 70, 90);
  ctx.strokeStyle = '#4a6a40';
  ctx.strokeRect(555, 355, 70, 90);
  // Clip metálico no topo
  ctx.fillStyle = '#6a8a6a';
  ctx.fillRect(575, 350, 30, 8);
  // Linhas de texto simuladas
  ctx.fillStyle = '#3a5a35';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(562, 370 + i * 12, 55, 2);
  }
  // Indicação visual do crachá (se não coletado)
  if (!state.get('clipboard')) {
    ctx.fillStyle = '#4a7a50';
    ctx.fillRect(568, 425, 25, 15);
    ctx.fillStyle = '#00cc66';
    ctx.font = '7px Courier New';
    ctx.fillText('ID', 576, 435);
  }

  // --- PORTA CONTENÇÃO (780, 300, 70, 160) ---
  // Porta metálica pesada
  const portaCGrad = ctx.createLinearGradient(780, 300, 850, 300);
  portaCGrad.addColorStop(0, '#1a2a1e');
  portaCGrad.addColorStop(0.5, '#253a28');
  portaCGrad.addColorStop(1, '#1a2a1e');
  ctx.fillStyle = portaCGrad;
  ctx.fillRect(782, 302, 66, 156);
  ctx.strokeStyle = state.get('crachaColetado') ? '#00ff88' : '#1b5e20';
  ctx.lineWidth = 2;
  ctx.strokeRect(782, 302, 66, 156);
  // Placa
  ctx.fillStyle = '#0a1a0e';
  ctx.fillRect(790, 310, 50, 18);
  ctx.fillStyle = state.get('crachaColetado') ? '#00ff88' : '#ff4444';
  ctx.font = '8px Courier New';
  ctx.fillText(state.get('crachaColetado') ? 'ABERTA' : 'TRANCADA', 794, 322);
  // Leitor de crachá
  ctx.fillStyle = '#111';
  ctx.fillRect(795, 370, 35, 25);
  ctx.strokeStyle = '#3a5a3a';
  ctx.strokeRect(795, 370, 35, 25);
  ctx.lineWidth = 1;

  // --- PORTA DEPÓSITO (50, 440, 100, 120) ---
  const portaDGrad = ctx.createLinearGradient(50, 440, 150, 440);
  portaDGrad.addColorStop(0, '#1a2820');
  portaDGrad.addColorStop(0.5, '#253828');
  portaDGrad.addColorStop(1, '#1a2820');
  ctx.fillStyle = portaDGrad;
  ctx.fillRect(52, 442, 96, 116);
  ctx.strokeStyle = state.get('alarmeDesligado') ? '#00ff88' : '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(52, 442, 96, 116);
  // Texto porta
  ctx.fillStyle = '#0a1a0e';
  ctx.fillRect(62, 480, 76, 16);
  ctx.fillStyle = state.get('alarmeDesligado') ? '#66bb6a' : '#ef5350';
  ctx.font = '8px Courier New';
  ctx.fillText(state.get('alarmeDesligado') ? 'DESBLOQ.' : 'SELADA', 72, 492);
  ctx.lineWidth = 1;
}

// Camada 7: Atmosfera — vapor, pulse de alarme
function renderLab_Atmosfera(ctx) {
  // Névoa no piso (partículas feitas externamente, aqui é só efeito estático)
  const fogGrad = ctx.createLinearGradient(0, 520, 0, 600);
  fogGrad.addColorStop(0, 'transparent');
  fogGrad.addColorStop(0.5, 'rgba(0, 100, 50, 0.03)');
  fogGrad.addColorStop(1, 'rgba(0, 80, 40, 0.05)');
  ctx.fillStyle = fogGrad;
  ctx.fillRect(0, 520, 900, 80);

  // Raio de luz do teto (cone focal)
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#00ff88';
  ctx.beginPath();
  ctx.moveTo(430, 35);
  ctx.lineTo(350, 450);
  ctx.lineTo(550, 450);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Camada 8: Overlay — vinheta + tint verde
function renderLab_Overlay(ctx) {
  // Vinheta
  const vignette = ctx.createRadialGradient(450, 300, 150, 450, 300, 550);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(0, 5, 0, 0.2)');
  vignette.addColorStop(1, 'rgba(0, 5, 0, 0.55)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  // Tint verde suave
  ctx.fillStyle = 'rgba(0, 20, 5, 0.06)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ CÂMARA DE CONTENÇÃO ============

function renderContencao(ctx, state) {
  renderCont_Background(ctx);
  renderCont_Arquitetura(ctx);
  renderCont_Iluminacao(ctx);
  renderCont_Detalhes(ctx);
  renderCont_Decoracao(ctx);
  renderCont_Objetos(ctx, state);
  renderCont_Atmosfera(ctx);
  renderCont_Overlay(ctx);
}

// Camada 1: Background — azul escuro, estéril
function renderCont_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#040810');
  grad.addColorStop(0.4, '#060c18');
  grad.addColorStop(0.8, '#050a14');
  grad.addColorStop(1, '#030610');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — câmara selada, painéis herméticos
function renderCont_Arquitetura(ctx) {
  // Teto reforçado
  ctx.fillStyle = '#080e18';
  ctx.fillRect(0, 0, 900, 40);
  // Trilhos no teto (para equipamento)
  ctx.fillStyle = '#1a2a3a';
  ctx.fillRect(100, 30, 700, 6);
  ctx.fillStyle = '#2a3a4a';
  ctx.fillRect(250, 28, 15, 10);
  ctx.fillRect(550, 28, 15, 10);

  // Paredes herméticas — painéis com bordas azuis
  ctx.fillStyle = '#0a1020';
  ctx.fillRect(0, 40, 900, 420);
  // Painéis verticais
  ctx.strokeStyle = '#1a3050';
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    ctx.strokeRect(i * 155 + 15, 45, 140, 410);
  }
  // Juntas seladas (borracha)
  ctx.fillStyle = '#0c1828';
  for (let i = 0; i < 6; i++) {
    ctx.fillRect(i * 155 + 12, 45, 4, 410);
  }

  // Piso — grade metálica
  const floorGrad = ctx.createLinearGradient(0, 460, 0, 600);
  floorGrad.addColorStop(0, '#0a1420');
  floorGrad.addColorStop(1, '#060a14');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 460, 900, 140);
  ctx.strokeStyle = '#1a2a3a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 460); ctx.lineTo(900, 460); ctx.stroke();
  // Grade do piso
  ctx.strokeStyle = '#0e1a28';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 15; i++) {
    ctx.beginPath(); ctx.moveTo(i * 65, 460); ctx.lineTo(i * 65, 600); ctx.stroke();
  }
  for (let j = 0; j < 3; j++) {
    ctx.beginPath(); ctx.moveTo(0, 460 + j * 50); ctx.lineTo(900, 460 + j * 50); ctx.stroke();
  }
  ctx.lineWidth = 1;
}

// Camada 3: Iluminação — UV azul, fria e constante
function renderCont_Iluminacao(ctx) {
  // Barra UV no teto
  ctx.fillStyle = 'rgba(100, 150, 255, 0.2)';
  ctx.fillRect(200, 36, 500, 5);
  ctx.save();
  ctx.shadowColor = 'rgba(100, 150, 255, 0.4)';
  ctx.shadowBlur = 15;
  ctx.fillStyle = 'rgba(100, 150, 255, 0.3)';
  ctx.fillRect(200, 36, 500, 5);
  ctx.restore();

  // Cone de luz UV descendo
  const uvCone = ctx.createRadialGradient(450, 40, 20, 450, 40, 400);
  uvCone.addColorStop(0, 'rgba(80, 120, 220, 0.08)');
  uvCone.addColorStop(0.5, 'rgba(60, 100, 200, 0.03)');
  uvCone.addColorStop(1, 'transparent');
  ctx.fillStyle = uvCone;
  ctx.fillRect(100, 40, 700, 420);

  // Reflexo azul no piso
  ctx.fillStyle = 'rgba(60, 100, 200, 0.03)';
  ctx.fillRect(200, 470, 500, 60);
}

// Camada 4: Detalhes — manchas de descontaminação
function renderCont_Detalhes(ctx) {
  // Manchas de produto de limpeza/descontaminação no piso
  for (const s of CONT_STAINS) {
    ctx.fillStyle = 'rgba(40, 80, 140, 0.06)';
    ctx.beginPath(); ctx.ellipse(s.x, s.y, s.rx, s.ry, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Marcas de selante nas juntas
  ctx.fillStyle = 'rgba(30, 60, 100, 0.1)';
  ctx.fillRect(167, 45, 3, 410);
  ctx.fillRect(477, 45, 3, 410);
  // Pequenas marcas de desgaste
  ctx.strokeStyle = 'rgba(40, 70, 120, 0.2)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(300, 430); ctx.lineTo(320, 445); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 420); ctx.lineTo(615, 440); ctx.stroke();
  ctx.lineWidth = 1;
}

// Camada 5: Decoração — equipamentos fixos, sinalização
function renderCont_Decoracao(ctx) {
  // Câmera de segurança (canto superior direito)
  ctx.fillStyle = '#1a2a3a';
  ctx.fillRect(820, 45, 30, 20);
  ctx.fillStyle = '#0a1520';
  ctx.beginPath(); ctx.arc(835, 65, 6, 0, Math.PI * 2); ctx.fill();
  // LED da câmera
  ctx.fillStyle = '#ff3333';
  ctx.beginPath(); ctx.arc(845, 50, 2, 0, Math.PI * 2); ctx.fill();

  // Placa CONTENÇÃO BSL-3
  ctx.fillStyle = '#0a1020';
  ctx.fillRect(350, 430, 200, 25);
  ctx.strokeStyle = '#1a3050';
  ctx.strokeRect(350, 430, 200, 25);
  ctx.fillStyle = '#6495ed';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText('☣ CONTENÇÃO BSL-3', 375, 447);

  // Extintores na parede (decorativo)
  ctx.fillStyle = '#2a1010';
  ctx.fillRect(840, 150, 20, 50);
  ctx.fillStyle = '#cc2222';
  ctx.fillRect(843, 155, 14, 40);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(847, 148, 6, 8);
}

// Camada 6: Objetos interativos — contenção
function renderCont_Objetos(ctx, state) {
  // --- PAINEL DE PURIFICAÇÃO (250, 80, 400, 150) ---
  // Corpo do painel
  const painelGrad = ctx.createLinearGradient(250, 80, 250, 230);
  painelGrad.addColorStop(0, '#0c1828');
  painelGrad.addColorStop(0.5, '#122040');
  painelGrad.addColorStop(1, '#0c1828');
  ctx.fillStyle = painelGrad;
  ctx.fillRect(252, 82, 396, 146);
  ctx.strokeStyle = '#2060aa';
  ctx.lineWidth = 2;
  ctx.strokeRect(252, 82, 396, 146);
  // Título
  ctx.fillStyle = '#6495ed';
  ctx.font = 'bold 13px Courier New';
  ctx.fillText('PAINEL DE PURIFICAÇÃO', 340, 108);
  // Slots
  ctx.strokeStyle = '#3070bb';
  ctx.lineWidth = 1.5;
  const slotLabels = ['1', '2', '3', '4'];
  for (let i = 0; i < 4; i++) {
    const sx = 295 + i * 90;
    ctx.fillStyle = '#081420';
    ctx.fillRect(sx, 130, 60, 60);
    ctx.strokeRect(sx, 130, 60, 60);
    ctx.fillStyle = '#3a6aaa';
    ctx.font = '9px Courier New';
    ctx.fillText('SLOT ' + slotLabels[i], sx + 12, 200);
  }
  // Seta entre slots
  ctx.fillStyle = '#4080cc';
  ctx.font = '16px Courier New';
  for (let i = 0; i < 3; i++) {
    ctx.fillText('→', 360 + i * 90, 165);
  }
  // Status
  ctx.fillStyle = '#4488cc';
  ctx.font = '10px Courier New';
  ctx.fillText('STATUS: AGUARDANDO SEQUÊNCIA', 320, 218);
  ctx.lineWidth = 1;

  // --- VISOR DE CONTENÇÃO (60, 100, 130, 130) ---
  // Moldura do visor (circular/oval reforçado)
  ctx.fillStyle = '#0a1520';
  ctx.fillRect(62, 102, 126, 126);
  ctx.strokeStyle = '#2a5070';
  ctx.lineWidth = 3;
  ctx.strokeRect(62, 102, 126, 126);
  // Vidro — esverdeado com conteúdo
  const visorGrad = ctx.createRadialGradient(125, 165, 5, 125, 165, 50);
  visorGrad.addColorStop(0, '#0a3a1a');
  visorGrad.addColorStop(0.7, '#051a0a');
  visorGrad.addColorStop(1, '#030e05');
  ctx.fillStyle = visorGrad;
  ctx.fillRect(70, 110, 110, 110);
  // Toxina — brilho verde interno
  ctx.fillStyle = 'rgba(0, 200, 80, 0.15)';
  ctx.beginPath(); ctx.arc(125, 165, 30, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(0, 255, 100, 0.1)';
  ctx.beginPath(); ctx.arc(125, 165, 18, 0, Math.PI * 2); ctx.fill();
  // Parafusos decorativos
  ctx.fillStyle = '#4a6a7a';
  ctx.beginPath(); ctx.arc(68, 108, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(182, 108, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(68, 222, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(182, 222, 3, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;

  // --- MANUAL DE PROTOCOLOS (700, 300, 100, 120) ---
  // Suporte de parede
  ctx.fillStyle = '#1a2030';
  ctx.fillRect(710, 295, 80, 8);
  // Corpo do manual
  const manualGrad = ctx.createLinearGradient(700, 300, 700, 420);
  manualGrad.addColorStop(0, '#1a2535');
  manualGrad.addColorStop(1, '#0f1a28');
  ctx.fillStyle = manualGrad;
  ctx.fillRect(705, 305, 90, 110);
  ctx.strokeStyle = '#3a5a7a';
  ctx.strokeRect(705, 305, 90, 110);
  // Título do manual
  ctx.fillStyle = '#6495ed';
  ctx.font = 'bold 8px Courier New';
  ctx.fillText('PROTOCOLO', 715, 322);
  ctx.fillText('BSL-3', 730, 335);
  // Linhas simuladas de texto
  ctx.fillStyle = '#2a4a6a';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(712, 348 + i * 12, 75, 2);
  }
  // Selo oficial
  ctx.strokeStyle = '#4a7aaa';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(750, 395, 10, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;

  // --- TUBOS DE EXAUSTÃO (350, 350, 200, 80) ---
  // Moldura dos tubos
  ctx.fillStyle = '#0a1420';
  ctx.fillRect(352, 352, 196, 76);
  ctx.strokeStyle = '#2a4a6a';
  ctx.strokeRect(352, 352, 196, 76);
  // Tubos individuais
  for (let i = 0; i < 5; i++) {
    const tuboGrad2 = ctx.createLinearGradient(370 + i * 35, 360, 370 + i * 35 + 20, 360);
    tuboGrad2.addColorStop(0, '#1a3040');
    tuboGrad2.addColorStop(0.5, '#2a4a60');
    tuboGrad2.addColorStop(1, '#1a3040');
    ctx.fillStyle = tuboGrad2;
    ctx.fillRect(370 + i * 35, 362, 20, 60);
    // Conexão superior
    ctx.fillStyle = '#3a5a6a';
    ctx.fillRect(368 + i * 35, 360, 24, 6);
  }
  // Indicador de temperatura
  ctx.fillStyle = '#081420';
  ctx.fillRect(360, 370, 35, 14);
  ctx.fillStyle = '#4488cc';
  ctx.font = '8px Courier New';
  ctx.fillText('78°C', 365, 380);

  // --- BOTÃO VOLTAR (50, 500, 120, 50) ---
  ctx.fillStyle = '#0c1828';
  ctx.fillRect(52, 502, 116, 46);
  ctx.strokeStyle = '#2060aa';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(52, 502, 116, 46);
  ctx.fillStyle = '#6495ed';
  ctx.font = '12px Courier New';
  ctx.fillText('← Voltar', 75, 530);
  ctx.lineWidth = 1;
}

// Camada 7: Atmosfera — partículas UV no ar
function renderCont_Atmosfera(ctx) {
  // Feixes UV visíveis (poeira no ar iluminada pela UV)
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = '#6495ed';
  ctx.beginPath();
  ctx.moveTo(350, 40);
  ctx.lineTo(250, 460);
  ctx.lineTo(350, 460);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(550, 40);
  ctx.lineTo(600, 460);
  ctx.lineTo(500, 460);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Camada 8: Overlay — vinheta azul
function renderCont_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 120, 450, 300, 530);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(0, 5, 20, 0.25)');
  vignette.addColorStop(1, 'rgba(0, 5, 20, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  // Tint azul gelo
  ctx.fillStyle = 'rgba(0, 10, 30, 0.05)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ DEPÓSITO DE REAGENTES ============

function renderDeposito(ctx, state) {
  renderDep_Background(ctx);
  renderDep_Arquitetura(ctx);
  renderDep_Iluminacao(ctx);
  renderDep_Detalhes(ctx);
  renderDep_Decoracao(ctx);
  renderDep_Objetos(ctx, state);
  renderDep_Atmosfera(ctx);
  renderDep_Overlay(ctx);
}

// Camada 1: Background — branco frio/cinza
function renderDep_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#080c14');
  grad.addColorStop(0.3, '#0a1018');
  grad.addColorStop(0.7, '#0c1220');
  grad.addColorStop(1, '#060a10');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — prateleiras industriais, piso epóxi
function renderDep_Arquitetura(ctx) {
  // Teto com lâmpadas fluorescentes
  ctx.fillStyle = '#0a0e14';
  ctx.fillRect(0, 0, 900, 30);
  // Lâmpadas
  ctx.fillStyle = 'rgba(200, 220, 255, 0.15)';
  ctx.fillRect(150, 20, 180, 6);
  ctx.fillRect(500, 20, 180, 6);

  // Parede de fundo — azulejos industriais
  ctx.fillStyle = '#0c1220';
  ctx.fillRect(0, 30, 900, 420);
  // Azulejos
  ctx.strokeStyle = '#141e2e';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.strokeRect(i * 75 + 5, 30 + j * 70, 73, 68);
    }
  }

  // Piso epóxi — reflexivo
  const floorGrad = ctx.createLinearGradient(0, 450, 0, 600);
  floorGrad.addColorStop(0, '#0e1828');
  floorGrad.addColorStop(0.3, '#0a1420');
  floorGrad.addColorStop(1, '#060a14');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 450, 900, 150);
  // Borda piso
  ctx.strokeStyle = '#1a2a40';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 450); ctx.lineTo(900, 450); ctx.stroke();
  // Reflexo do fluorescente no piso
  ctx.fillStyle = 'rgba(180, 200, 240, 0.015)';
  ctx.fillRect(150, 460, 180, 40);
  ctx.fillRect(500, 460, 180, 40);
  ctx.lineWidth = 1;
}

// Camada 3: Iluminação — branca fria, fluorescente
function renderDep_Iluminacao(ctx) {
  // Luz principal — branca fria do teto
  const mainLight = ctx.createRadialGradient(450, 30, 20, 450, 30, 450);
  mainLight.addColorStop(0, 'rgba(180, 200, 240, 0.08)');
  mainLight.addColorStop(0.4, 'rgba(150, 180, 220, 0.03)');
  mainLight.addColorStop(1, 'transparent');
  ctx.fillStyle = mainLight;
  ctx.fillRect(0, 0, 900, 450);

  // Luz secundária (esquerda)
  const secLight = ctx.createRadialGradient(240, 23, 5, 240, 23, 250);
  secLight.addColorStop(0, 'rgba(180, 200, 240, 0.05)');
  secLight.addColorStop(1, 'transparent');
  ctx.fillStyle = secLight;
  ctx.fillRect(50, 0, 400, 350);

  // Luz do refrigerador (glow frio)
  const fridgeGlow = ctx.createRadialGradient(710, 190, 10, 710, 190, 100);
  fridgeGlow.addColorStop(0, 'rgba(100, 180, 255, 0.04)');
  fridgeGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = fridgeGlow;
  ctx.fillRect(600, 100, 220, 200);
}

// Camada 4: Detalhes — condensação, gelo
function renderDep_Detalhes(ctx) {
  // Gotas de condensação na parede
  ctx.fillStyle = 'rgba(100, 160, 220, 0.08)';
  for (const d of DEP_CONDENSATION) {
    ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
  }
  // Trilhas de condensação (escorrendo)
  ctx.strokeStyle = 'rgba(80, 140, 200, 0.05)';
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(100, 52); ctx.lineTo(101, 100); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(400, 32); ctx.lineTo(401, 85); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(700, 42); ctx.lineTo(701, 95); ctx.stroke();
  ctx.lineWidth = 1;
  // Cristais de gelo no chão perto do refrigerador
  ctx.fillStyle = 'rgba(150, 200, 255, 0.04)';
  ctx.beginPath(); ctx.ellipse(700, 460, 40, 8, 0, 0, Math.PI * 2); ctx.fill();
}

// Camada 5: Decoração — sinalizações, prateleiras de fundo
function renderDep_Decoracao(ctx) {
  // Prateleira superior (fundo, não interativa)
  ctx.fillStyle = '#1a2535';
  ctx.fillRect(50, 210, 550, 5);
  // Suportes
  ctx.fillStyle = '#1a2a3a';
  ctx.fillRect(100, 210, 5, 30);
  ctx.fillRect(300, 210, 5, 30);
  ctx.fillRect(500, 210, 5, 30);
  // Frascos de fundo (não interativos)
  ctx.fillStyle = '#1a2a30';
  ctx.fillRect(130, 185, 18, 25);
  ctx.fillRect(180, 188, 15, 22);
  ctx.fillRect(350, 183, 20, 27);
  ctx.fillRect(420, 190, 14, 20);

  // Sinalização de temperatura
  ctx.fillStyle = '#0a1420';
  ctx.fillRect(50, 420, 120, 25);
  ctx.strokeStyle = '#2a4a6a';
  ctx.strokeRect(50, 420, 120, 25);
  ctx.fillStyle = '#6495ed';
  ctx.font = '9px Courier New';
  ctx.fillText('🌡 TEMP: -4°C', 60, 437);

  // Ventilação
  ctx.fillStyle = '#0c1828';
  ctx.fillRect(800, 40, 60, 40);
  ctx.strokeStyle = '#1a3050';
  ctx.strokeRect(800, 40, 60, 40);
  // Grades da ventilação
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = '#1a2a40';
    ctx.fillRect(805, 47 + i * 9, 50, 3);
  }
}

// Camada 6: Objetos interativos — depósito
function renderDep_Objetos(ctx, state) {
  // --- PRATELEIRA DE REAGENTES ---
  // Prateleira principal
  ctx.fillStyle = '#1a2a3a';
  ctx.fillRect(45, 175, 540, 6);
  // Suportes
  ctx.fillStyle = '#2a3a4a';
  ctx.fillRect(55, 175, 5, 20);
  ctx.fillRect(280, 175, 5, 20);
  ctx.fillRect(575, 175, 5, 20);

  // Reagentes individuais
  const reagentes = [
    { x: 60, color: '#1565c0', label: 'R-01', glow: '#2196f3' },
    { x: 170, color: '#c62828', label: 'R-02', glow: '#ef5350' },
    { x: 280, color: '#2e7d32', label: 'R-03', glow: '#66bb6a' },
    { x: 390, color: '#f57f17', label: 'R-04', glow: '#fdd835' },
    { x: 500, color: '#6a1b9a', label: 'R-05', glow: '#ab47bc' },
  ];

  for (let i = 0; i < 5; i++) {
    const r = reagentes[i];
    // Área do reagente (background)
    ctx.fillStyle = '#0a1420';
    ctx.fillRect(r.x, 82, 76, 96);
    ctx.strokeStyle = '#1a2a3a';
    ctx.strokeRect(r.x, 82, 76, 96);

    // Frasco
    const frascoGrad = ctx.createLinearGradient(r.x + 20, 95, r.x + 55, 95);
    frascoGrad.addColorStop(0, r.color);
    frascoGrad.addColorStop(0.5, r.glow);
    frascoGrad.addColorStop(1, r.color);
    ctx.fillStyle = frascoGrad;
    ctx.fillRect(r.x + 22, 98, 32, 50);
    // Tampa do frasco
    ctx.fillStyle = '#2a3a4a';
    ctx.fillRect(r.x + 26, 92, 24, 8);
    // Reflexo no frasco
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(r.x + 25, 100, 6, 30);
    // Etiqueta
    ctx.fillStyle = '#c8dce8';
    ctx.font = 'bold 10px Courier New';
    ctx.fillText(r.label, r.x + 25, 168);
  }

  // --- REFRIGERADOR (650, 100, 120, 180) ---
  // Corpo
  const fridgeGrad = ctx.createLinearGradient(650, 100, 770, 100);
  fridgeGrad.addColorStop(0, '#1a2a3a');
  fridgeGrad.addColorStop(0.5, '#253a4a');
  fridgeGrad.addColorStop(1, '#1a2a3a');
  ctx.fillStyle = fridgeGrad;
  ctx.fillRect(652, 102, 116, 176);
  ctx.strokeStyle = '#3a6080';
  ctx.lineWidth = 2;
  ctx.strokeRect(652, 102, 116, 176);
  // Divisória horizontal
  ctx.strokeStyle = '#2a4a60';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(655, 190); ctx.lineTo(765, 190); ctx.stroke();
  // Puxador
  ctx.fillStyle = '#5a8aaa';
  ctx.fillRect(750, 130, 8, 40);
  ctx.fillRect(750, 210, 8, 40);
  // Display de temperatura
  ctx.fillStyle = '#050a10';
  ctx.fillRect(665, 110, 50, 18);
  ctx.fillStyle = '#4fc3f7';
  ctx.font = '10px Courier New';
  ctx.fillText('-4°C', 673, 123);
  // LED
  ctx.fillStyle = '#4fc3f7';
  ctx.beginPath(); ctx.arc(728, 118, 3, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;

  // --- TABELA PERIÓDICA (650, 350, 150, 100) ---
  ctx.fillStyle = '#0c1820';
  ctx.fillRect(652, 352, 146, 96);
  ctx.strokeStyle = '#2a4a6a';
  ctx.strokeRect(652, 352, 146, 96);
  // Grid simplificado
  ctx.strokeStyle = '#1a3050';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 4; j++) {
      ctx.strokeRect(658 + i * 17, 358 + j * 22, 15, 20);
    }
  }
  // Destaque no KMn
  ctx.fillStyle = 'rgba(200, 100, 255, 0.15)';
  ctx.fillRect(692 + 17, 358 + 22, 15, 20);
  ctx.strokeStyle = '#ab47bc';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(692 + 17, 358 + 22, 15, 20);
  ctx.fillStyle = '#ab47bc';
  ctx.font = '7px Courier New';
  ctx.fillText('Mn', 696 + 17, 373 + 22);
  ctx.lineWidth = 1;

  // --- BOTÃO VOLTAR (50, 500, 120, 50) ---
  ctx.fillStyle = '#0c1828';
  ctx.fillRect(52, 502, 116, 46);
  ctx.strokeStyle = '#2a5080';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(52, 502, 116, 46);
  ctx.fillStyle = '#6495ed';
  ctx.font = '12px Courier New';
  ctx.fillText('← Voltar', 75, 530);
  ctx.lineWidth = 1;
}

// Camada 7: Atmosfera — vapor de condensação
function renderDep_Atmosfera(ctx) {
  // Névoa fria próxima ao refrigerador
  const mist = ctx.createRadialGradient(710, 290, 10, 710, 290, 120);
  mist.addColorStop(0, 'rgba(100, 180, 255, 0.04)');
  mist.addColorStop(1, 'transparent');
  ctx.fillStyle = mist;
  ctx.fillRect(590, 180, 250, 220);

  // Vapor geral no piso
  const floorMist = ctx.createLinearGradient(0, 530, 0, 600);
  floorMist.addColorStop(0, 'transparent');
  floorMist.addColorStop(0.5, 'rgba(100, 150, 220, 0.02)');
  floorMist.addColorStop(1, 'rgba(80, 130, 200, 0.04)');
  ctx.fillStyle = floorMist;
  ctx.fillRect(0, 530, 900, 70);
}

// Camada 8: Overlay — vinheta branca-fria
function renderDep_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 130, 450, 300, 540);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(0, 5, 15, 0.2)');
  vignette.addColorStop(1, 'rgba(0, 5, 15, 0.5)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  // Tint frio suave
  ctx.fillStyle = 'rgba(0, 5, 20, 0.04)';
  ctx.fillRect(0, 0, 900, 600);
}

/*
POSITION TABLE (for hit areas):
| Object          | Environment | x   | y   | w   | h   |
|-----------------|-------------|-----|-----|-----|-----|
| computador      | lab         | 350 | 50  | 160 | 120 |
| microscopio     | lab         | 60  | 100 | 100 | 100 |
| centrifuga      | lab         | 60  | 280 | 110 | 80  |
| painelAlarme    | lab         | 700 | 60  | 120 | 100 |
| clipboard       | lab         | 550 | 350 | 80  | 100 |
| portaContencao  | lab         | 780 | 300 | 70  | 160 |
| portaDeposito   | lab         | 50  | 440 | 100 | 120 |
| painelPurif     | contencao   | 250 | 80  | 400 | 150 |
| visor           | contencao   | 60  | 100 | 130 | 130 |
| manual          | contencao   | 700 | 300 | 100 | 120 |
| tubos           | contencao   | 350 | 350 | 200 | 80  |
| voltarLab1      | contencao   | 50  | 500 | 120 | 50  |
| reagente1       | deposito    | 60  | 80  | 80  | 100 |
| reagente2       | deposito    | 170 | 80  | 80  | 100 |
| reagente3       | deposito    | 280 | 80  | 80  | 100 |
| reagente4       | deposito    | 390 | 80  | 80  | 100 |
| reagente5       | deposito    | 500 | 80  | 80  | 100 |
| refrigerador    | deposito    | 650 | 100 | 120 | 180 |
| tabelaPeriodica | deposito    | 650 | 350 | 150 | 100 |
| voltarLab2      | deposito    | 50  | 500 | 120 | 50  |
*/
