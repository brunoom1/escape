/**
 * @module Sala5Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 5 — O Submarino Afundado
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Ambientes: Proa, Máquinas
 * Paleta: ThemeSubmarine — bg #0a1628, accent #4fc3f7, border #1a3a5a
 */

// ============ PRÉ-CALCULADOS ============
const SUB_RIVETS = [];
for (let i = 0; i < 25; i++) { SUB_RIVETS.push({ x: 35 + i * 36, y: 18 }); }
const SUB_RUST = [
  {x:80,y:150,rx:20,ry:8},{x:350,y:200,rx:15,ry:6},{x:700,y:180,rx:25,ry:10},
  {x:500,y:350,rx:18,ry:7},{x:200,y:400,rx:22,ry:9}
];
const MACH_GAUGES = [{x:120,y:160},{x:320,y:160},{x:520,y:160}];

// ============ COMPARTIMENTO DE PROA ============

function renderProa(ctx, state) {
  renderProa_Background(ctx);
  renderProa_Arquitetura(ctx);
  renderProa_Iluminacao(ctx);
  renderProa_Detalhes(ctx);
  renderProa_Decoracao(ctx);
  renderProa_Objetos(ctx, state);
  renderProa_Atmosfera(ctx);
  renderProa_Overlay(ctx);
}

// Camada 1: Background — azul marinho profundo
function renderProa_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#060e1a');
  grad.addColorStop(0.3, '#0a1628');
  grad.addColorStop(0.7, '#0c1a30');
  grad.addColorStop(1, '#081420');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — casco metálico curvo, rebites, corredores
function renderProa_Arquitetura(ctx) {
  // Teto curvo do casco
  ctx.fillStyle = '#0c1828';
  ctx.fillRect(0, 0, 900, 35);
  // Curvatura do casco
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 35); ctx.quadraticCurveTo(450, 25, 900, 35); ctx.stroke();
  ctx.lineWidth = 1;
  // Rebites
  ctx.fillStyle = '#2a4a6a';
  for (const r of SUB_RIVETS) {
    ctx.beginPath(); ctx.arc(r.x, r.y, 3, 0, Math.PI * 2); ctx.fill();
  }
  // Paredes de casco — chapas de aço
  ctx.fillStyle = '#0e1e35';
  ctx.fillRect(0, 35, 900, 425);
  // Faixas horizontais do casco
  ctx.strokeStyle = '#1a3a5a';
  for (let i = 0; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(0, 120 + i * 100); ctx.lineTo(900, 120 + i * 100); ctx.stroke();
  }
  // Piso de grade metálica
  const floorGrad = ctx.createLinearGradient(0, 460, 0, 600);
  floorGrad.addColorStop(0, '#0a1828');
  floorGrad.addColorStop(1, '#060e1a');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 460, 900, 140);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 460); ctx.lineTo(900, 460); ctx.stroke();
  ctx.lineWidth = 1;
  // Grades
  ctx.strokeStyle = '#0e1a28';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 15; i++) {
    ctx.beginPath(); ctx.moveTo(i * 65, 460); ctx.lineTo(i * 65, 600); ctx.stroke();
  }
  ctx.lineWidth = 1;
}

// Camada 3: Iluminação — luzes de emergência, bioluminescência externa
function renderProa_Iluminacao(ctx) {
  // Luz de emergência amarela fraca (teto)
  const emergLight = ctx.createRadialGradient(450, 35, 10, 450, 35, 300);
  emergLight.addColorStop(0, 'rgba(200, 180, 100, 0.05)');
  emergLight.addColorStop(0.5, 'rgba(180, 160, 80, 0.02)');
  emergLight.addColorStop(1, 'transparent');
  ctx.fillStyle = emergLight;
  ctx.fillRect(150, 0, 600, 400);
  // Bioluminescência (luz azul das janelas externas)
  const bioGlow = ctx.createRadialGradient(450, 300, 50, 450, 300, 450);
  bioGlow.addColorStop(0, 'rgba(79, 195, 247, 0.03)');
  bioGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = bioGlow;
  ctx.fillRect(0, 0, 900, 600);
  // Reflexo de água oscilante (sin-based)
  const waterOsc = Math.sin(Date.now() / 1500) * 0.02 + 0.02;
  ctx.fillStyle = `rgba(20, 60, 140, ${waterOsc})`;
  ctx.fillRect(0, 500, 900, 100);
}

// Camada 4: Detalhes — ferrugem, condensação, goteiras
function renderProa_Detalhes(ctx) {
  // Manchas de ferrugem
  for (const r of SUB_RUST) {
    ctx.fillStyle = 'rgba(120, 60, 20, 0.08)';
    ctx.beginPath(); ctx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Goteiras (trilhas verticais)
  ctx.strokeStyle = 'rgba(80, 140, 200, 0.06)';
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(200, 35); ctx.lineTo(201, 120); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 35); ctx.lineTo(601, 100); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(780, 35); ctx.lineTo(781, 90); ctx.stroke();
  ctx.lineWidth = 1;
  // Condensação
  ctx.fillStyle = 'rgba(100, 180, 240, 0.06)';
  ctx.beginPath(); ctx.arc(150, 60, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(400, 45, 2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(650, 55, 1.8, 0, Math.PI * 2); ctx.fill();
}

// Camada 5: Decoração — equipamentos de fundo
function renderProa_Decoracao(ctx) {
  // Radar silencioso (decorativo)
  ctx.fillStyle = '#0a1520';
  ctx.beginPath(); ctx.arc(800, 80, 30, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#1a3a5a';
  ctx.beginPath(); ctx.arc(800, 80, 30, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#1a3a5a44';
  ctx.beginPath(); ctx.arc(800, 80, 20, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(800, 80, 10, 0, Math.PI * 2); ctx.stroke();
  // Cabo de força no teto
  ctx.strokeStyle = '#2a4a6a';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(100, 32); ctx.quadraticCurveTo(450, 38, 800, 32); ctx.stroke();
  ctx.lineWidth = 1;
  // Bancada lateral (sem interação)
  ctx.fillStyle = '#0c1a2e';
  ctx.fillRect(300, 420, 150, 35);
  ctx.strokeStyle = '#1a3a5a';
  ctx.strokeRect(300, 420, 150, 35);
}

// Camada 6: Objetos interativos
function renderProa_Objetos(ctx, state) {
  // --- PERISCÓPIO (400, 30, 80, 150) ---
  ctx.fillStyle = '#1a2a3a';
  ctx.fillRect(420, 35, 40, 140);
  ctx.fillStyle = '#2a4a6a';
  ctx.fillRect(410, 35, 60, 20);
  // Lente
  ctx.fillStyle = '#0a2040';
  ctx.beginPath(); ctx.arc(440, 42, 8, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#4fc3f7';
  ctx.beginPath(); ctx.arc(440, 42, 8, 0, Math.PI * 2); ctx.stroke();

  // --- MESA DE NAVEGAÇÃO (100, 150, 200, 120) ---
  ctx.fillStyle = '#1a2a1a';
  ctx.fillRect(105, 155, 190, 110);
  ctx.strokeStyle = '#2a4a3a';
  ctx.strokeRect(105, 155, 190, 110);
  // Carta náutica
  ctx.fillStyle = '#2a3a2a';
  ctx.fillRect(115, 165, 170, 80);
  ctx.fillStyle = '#4a7a5a';
  ctx.font = '9px Courier New';
  ctx.fillText('CARTA NÁUTICA', 140, 200);
  ctx.fillText('Canal 7 ⊙', 155, 220);

  // --- ARMÁRIO DE SUPRIMENTOS (650, 100, 120, 200) ---
  ctx.fillStyle = '#1a1a2a';
  ctx.fillRect(655, 105, 110, 190);
  ctx.strokeStyle = '#3a3a5a';
  ctx.strokeRect(655, 105, 110, 190);
  // Puxador
  ctx.fillStyle = '#4a6a8a';
  ctx.fillRect(695, 195, 30, 6);
  // Label
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '8px Courier New';
  ctx.fillText('SUPRIMENTOS', 665, 275);

  // --- MANUAL DE EMERGÊNCIA (150, 350, 120, 80) ---
  ctx.fillStyle = '#2a2a1a';
  ctx.fillRect(155, 355, 110, 70);
  ctx.strokeStyle = '#5a5a3a';
  ctx.strokeRect(155, 355, 110, 70);
  ctx.fillStyle = '#aaa';
  ctx.font = '9px Courier New';
  ctx.fillText('MANUAL EMERG.', 163, 395);

  // --- PAINEL DE COMUNICAÇÃO (600, 350, 150, 100) ---
  ctx.fillStyle = '#0a1520';
  ctx.fillRect(605, 355, 140, 90);
  ctx.strokeStyle = '#1a3a5a';
  ctx.strokeRect(605, 355, 140, 90);
  ctx.fillStyle = '#4fc3f7';
  ctx.font = '9px Courier New';
  ctx.fillText('COMM PANEL', 630, 380);
  ctx.fillText('147.3 MHz', 635, 405);
  // LED
  const commPulse = Math.sin(Date.now() / 1000) * 0.5 + 0.5;
  ctx.fillStyle = `rgba(79, 195, 247, ${0.3 + commPulse * 0.4})`;
  ctx.beginPath(); ctx.arc(730, 365, 3, 0, Math.PI * 2); ctx.fill();

  // --- ESCOTILHA → MÁQUINAS (780, 400, 80, 120) ---
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath(); ctx.arc(820, 460, 40, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = state.get('chaveColetada') ? '#4fc3f7' : '#333';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(820, 460, 40, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;
  // Cruz da escotilha
  ctx.strokeStyle = '#2a4a6a';
  ctx.beginPath(); ctx.moveTo(800, 460); ctx.lineTo(840, 460); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(820, 440); ctx.lineTo(820, 480); ctx.stroke();
}

// Camada 7: Atmosfera
function renderProa_Atmosfera(ctx) {
  // Reflexos ondulantes no casco
  ctx.save();
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = '#4fc3f7';
  const wave = Math.sin(Date.now() / 2000) * 10;
  ctx.beginPath();
  ctx.moveTo(0, 460 + wave);
  ctx.quadraticCurveTo(225, 450 + wave, 450, 460 + wave);
  ctx.quadraticCurveTo(675, 470 + wave, 900, 460 + wave);
  ctx.lineTo(900, 600); ctx.lineTo(0, 600);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

// Camada 8: Overlay
function renderProa_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 120, 450, 300, 530);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.6, 'rgba(0, 10, 30, 0.2)');
  vignette.addColorStop(1, 'rgba(0, 10, 30, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  // Tint azul profundo
  ctx.fillStyle = 'rgba(0, 10, 40, 0.06)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ SALA DE MÁQUINAS ============

function renderMaquinas(ctx, state) {
  renderMaq_Background(ctx);
  renderMaq_Arquitetura(ctx);
  renderMaq_Iluminacao(ctx, state);
  renderMaq_Detalhes(ctx);
  renderMaq_Decoracao(ctx);
  renderMaq_Objetos(ctx, state);
  renderMaq_Atmosfera(ctx);
  renderMaq_Overlay(ctx);
}

// Camada 1: Background
function renderMaq_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#080e1a');
  grad.addColorStop(0.4, '#0c1a2e');
  grad.addColorStop(0.8, '#0a1625');
  grad.addColorStop(1, '#060c14');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — tubulações pesadas, válvulas, caldeira
function renderMaq_Arquitetura(ctx) {
  // Teto com dutos
  ctx.fillStyle = '#0a1420';
  ctx.fillRect(0, 0, 900, 30);
  // Tubulações principais horizontais
  ctx.strokeStyle = '#2a4a6a';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(150, 230); ctx.lineTo(150, 320); ctx.lineTo(750, 320); ctx.lineTo(750, 230); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(350, 230); ctx.lineTo(350, 320); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(550, 230); ctx.lineTo(550, 320); ctx.stroke();
  ctx.lineWidth = 1;
  // Parede
  ctx.fillStyle = '#0c1a2e';
  ctx.fillRect(0, 30, 900, 430);
  // Piso
  const floorGrad = ctx.createLinearGradient(0, 460, 0, 600);
  floorGrad.addColorStop(0, '#0a1420');
  floorGrad.addColorStop(1, '#060c14');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 460, 900, 140);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 460); ctx.lineTo(900, 460); ctx.stroke();
  ctx.lineWidth = 1;
}

// Camada 3: Iluminação
function renderMaq_Iluminacao(ctx, state) {
  // Luz de alerta se gerador offline
  if (!state.get('geradorAtivo')) {
    const pulse = Math.sin(Date.now() / 800) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255, 80, 0, ${pulse * 0.06})`;
    ctx.fillRect(0, 0, 900, 600);
  } else {
    // Verde estável se gerador ativo
    ctx.fillStyle = 'rgba(0, 200, 100, 0.02)';
    ctx.fillRect(0, 0, 900, 600);
  }
  // Luz focal central
  const topLight = ctx.createRadialGradient(450, 30, 10, 450, 30, 280);
  topLight.addColorStop(0, 'rgba(150, 180, 220, 0.04)');
  topLight.addColorStop(1, 'transparent');
  ctx.fillStyle = topLight;
  ctx.fillRect(150, 0, 600, 350);
}

// Camada 4: Detalhes
function renderMaq_Detalhes(ctx) {
  // Óleo no piso
  ctx.fillStyle = 'rgba(30, 50, 80, 0.08)';
  ctx.beginPath(); ctx.ellipse(300, 490, 40, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(600, 500, 30, 10, 0.3, 0, Math.PI * 2); ctx.fill();
  // Soldas nas tubulações
  ctx.fillStyle = 'rgba(100, 130, 160, 0.1)';
  ctx.fillRect(148, 270, 6, 6);
  ctx.fillRect(348, 270, 6, 6);
  ctx.fillRect(548, 270, 6, 6);
}

// Camada 5: Decoração
function renderMaq_Decoracao(ctx) {
  // Manômetros nas tubulações (decorativos)
  for (const g of MACH_GAUGES) {
    ctx.fillStyle = '#0a1a2a';
    ctx.beginPath(); ctx.arc(g.x, g.y, 18, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#2a4a6a';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(g.x, g.y, 18, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 1;
    // Agulha
    ctx.strokeStyle = '#4fc3f7';
    ctx.beginPath(); ctx.moveTo(g.x, g.y); ctx.lineTo(g.x + 10, g.y - 8); ctx.stroke();
  }
  // Placa MÁQUINAS
  ctx.fillStyle = '#0a1420';
  ctx.fillRect(380, 440, 140, 18);
  ctx.strokeStyle = '#1a3a5a';
  ctx.strokeRect(380, 440, 140, 18);
  ctx.fillStyle = '#4fc3f7';
  ctx.font = '9px Courier New';
  ctx.fillText('SALA DE MÁQUINAS', 392, 453);
}

// Camada 6: Objetos interativos
function renderMaq_Objetos(ctx, state) {
  // --- VÁLVULAS (3 unidades) ---
  const valvulas = [
    {x:100,y:100,cor:'#1565c0',label:'AZUL'},
    {x:300,y:100,cor:'#c62828',label:'VERM'},
    {x:500,y:100,cor:'#f9a825',label:'AMAR'}
  ];
  valvulas.forEach(v => {
    ctx.fillStyle = '#0a1a2a';
    ctx.fillRect(v.x, v.y, 100, 120);
    ctx.strokeStyle = v.cor;
    ctx.lineWidth = 2;
    ctx.strokeRect(v.x, v.y, 100, 120);
    // Volante da válvula
    ctx.beginPath(); ctx.arc(v.x + 50, v.y + 50, 25, 0, Math.PI * 2);
    ctx.strokeStyle = v.cor; ctx.stroke();
    // Raios do volante
    ctx.beginPath(); ctx.moveTo(v.x + 50, v.y + 25); ctx.lineTo(v.x + 50, v.y + 75); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(v.x + 25, v.y + 50); ctx.lineTo(v.x + 75, v.y + 50); ctx.stroke();
    // Label
    ctx.fillStyle = v.cor;
    ctx.font = '10px Courier New';
    ctx.fillText(v.label, v.x + 35, v.y + 110);
    ctx.lineWidth = 1;
  });

  // --- PAINEL DO GERADOR (350, 320, 200, 100) ---
  ctx.fillStyle = '#0a2a1a';
  ctx.fillRect(355, 325, 190, 90);
  ctx.strokeStyle = state.get('geradorAtivo') ? '#00ff88' : '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.strokeRect(355, 325, 190, 90);
  ctx.fillStyle = state.get('geradorAtivo') ? '#00ff88' : '#4a7a9a';
  ctx.font = '12px Courier New';
  ctx.fillText(state.get('geradorAtivo') ? 'ONLINE' : 'OFFLINE', 410, 375);
  ctx.lineWidth = 1;

  // --- RÁDIO DE EMERGÊNCIA (680, 120, 130, 120) ---
  ctx.fillStyle = '#1a1a0a';
  ctx.fillRect(685, 125, 120, 110);
  ctx.strokeStyle = '#3a3a2a';
  ctx.strokeRect(685, 125, 120, 110);
  ctx.fillStyle = '#4fc3f7';
  ctx.font = '9px Courier New';
  ctx.fillText('RADIO EMERG.', 700, 185);
  // Dial
  ctx.strokeStyle = '#4fc3f7';
  ctx.beginPath(); ctx.arc(745, 155, 15, 0, Math.PI * 2); ctx.stroke();

  // --- ESCOTILHA DE FUGA (700, 400, 120, 130) ---
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath(); ctx.arc(760, 465, 50, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = state.get('geradorAtivo') ? '#00ff88' : '#333';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(760, 465, 50, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '10px Courier New';
  ctx.fillText('FUGA', 742, 470);

  // --- VOLTAR PROA (30, 500, 120, 50) ---
  ctx.fillStyle = '#0e1e35';
  ctx.fillRect(35, 505, 115, 45);
  ctx.strokeStyle = '#1a3a5a';
  ctx.strokeRect(35, 505, 115, 45);
  ctx.fillStyle = '#4a7a9a';
  ctx.font = '11px Courier New';
  ctx.fillText('← Proa', 60, 532);
}

// Camada 7: Atmosfera
function renderMaq_Atmosfera(ctx) {
  // Vapor das tubulações
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#88ccff';
  ctx.beginPath();
  ctx.moveTo(145, 320); ctx.lineTo(130, 460); ctx.lineTo(170, 460);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(750, 320); ctx.lineTo(735, 460); ctx.lineTo(765, 460);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

// Camada 8: Overlay
function renderMaq_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 120, 450, 300, 530);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.6, 'rgba(0, 10, 30, 0.25)');
  vignette.addColorStop(1, 'rgba(0, 10, 30, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(0, 8, 25, 0.05)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// Ambiente PROA:
//   periscopio:  (400, 30, 80, 150)
//   mesa:        (100, 150, 200, 120)
//   armario:     (650, 100, 120, 200)
//   manual:      (150, 350, 120, 80)
//   painelComm:  (600, 350, 150, 100)
//   escotilha:   (780, 400, 80, 120)
//
// Ambiente MÁQUINAS:
//   valvAzul:       (100, 100, 100, 120)
//   valvVerm:       (300, 100, 100, 120)
//   valvAmar:       (500, 100, 100, 120)
//   painelGer:      (350, 320, 200, 100)
//   radio:          (680, 120, 130, 120)
//   escotilhaFuga:  (700, 400, 120, 130)
//   voltarProa:     (30, 500, 120, 50)
