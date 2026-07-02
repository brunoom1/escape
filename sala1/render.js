/**
 * @module Sala1Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 1 — Escritório do Detetive
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Estilo: Film noir, sombras longas, sépia, tensão
 */

// ============ ESCRITÓRIO PRINCIPAL ============

function renderEscritorio(ctx, state) {
  renderEsc_Background(ctx);
  renderEsc_Arquitetura(ctx);
  renderEsc_Iluminacao(ctx, state);
  renderEsc_Detalhes(ctx);
  renderEsc_Decoracao(ctx);
  renderEsc_Objetos(ctx, state);
  renderEsc_Atmosfera(ctx);
  renderEsc_Overlay(ctx);
}

// Camada 1: Background — gradiente noir profundo
function renderEsc_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0d0908');
  grad.addColorStop(0.4, '#1a1410');
  grad.addColorStop(1, '#0a0806');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — paredes, chão, molduras
function renderEsc_Arquitetura(ctx) {
  // Parede com textura de papel de parede desgastado
  ctx.fillStyle = '#1a1610';
  ctx.fillRect(0, 0, 900, 430);
  // Barra de moldura (rodapé de parede)
  const moldGrad = ctx.createLinearGradient(0, 410, 0, 430);
  moldGrad.addColorStop(0, '#3d3020');
  moldGrad.addColorStop(1, '#1a1408');
  ctx.fillStyle = moldGrad;
  ctx.fillRect(0, 415, 900, 18);
  // Chão de madeira com gradiente de profundidade
  const floorGrad = ctx.createLinearGradient(0, 433, 0, 600);
  floorGrad.addColorStop(0, '#1a1408');
  floorGrad.addColorStop(0.3, '#12100a');
  floorGrad.addColorStop(1, '#0a0806');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 433, 900, 167);
  // Tábuas do chão
  ctx.strokeStyle = '#1e180f';
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    const x = i * 78 + 20;
    ctx.beginPath(); ctx.moveTo(x, 433); ctx.lineTo(x - 10, 600); ctx.stroke();
  }
  // Textura da parede — linhas verticais sutis (papel de parede)
  ctx.strokeStyle = 'rgba(60, 50, 35, 0.15)';
  for (let i = 0; i < 30; i++) {
    ctx.beginPath(); ctx.moveTo(i * 30 + 5, 0); ctx.lineTo(i * 30 + 5, 415); ctx.stroke();
  }
}

// Camada 3: Iluminação — luz da luminária (focal) + luz da janela (ambiente)
function renderEsc_Iluminacao(ctx, state) {
  // Luz ambiente vinda de uma janela implícita (lado esquerdo superior)
  const ambientLight = ctx.createRadialGradient(100, 80, 10, 100, 80, 350);
  ambientLight.addColorStop(0, 'rgba(180, 160, 120, 0.06)');
  ambientLight.addColorStop(1, 'transparent');
  ctx.fillStyle = ambientLight;
  ctx.fillRect(0, 0, 450, 400);

  // Luz focal da luminária (se acesa)
  if (state.get('luminaria')) {
    const lampLight = ctx.createRadialGradient(729, 270, 5, 729, 270, 200);
    lampLight.addColorStop(0, 'rgba(201, 168, 76, 0.2)');
    lampLight.addColorStop(0.4, 'rgba(201, 168, 76, 0.08)');
    lampLight.addColorStop(1, 'transparent');
    ctx.fillStyle = lampLight;
    ctx.fillRect(530, 100, 370, 400);
  }

  // Sombras longas projetadas (noir) — sombra da estante
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.moveTo(170, 433); ctx.lineTo(250, 433); ctx.lineTo(200, 600); ctx.lineTo(130, 600);
  ctx.closePath(); ctx.fill();

  // Sombra da mesa
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.moveTo(260, 433); ctx.lineTo(520, 433); ctx.lineTo(560, 600); ctx.lineTo(220, 600);
  ctx.closePath(); ctx.fill();
}

// Camada 4: Detalhes — textura de desgaste, poeira, marcas
function renderEsc_Detalhes(ctx) {
  // Manchas de umidade na parede (superior)
  ctx.fillStyle = 'rgba(40, 30, 20, 0.3)';
  ctx.beginPath(); ctx.ellipse(650, 30, 80, 25, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(200, 50, 50, 15, 0.3, 0, Math.PI * 2); ctx.fill();

  // Rachaduras sutis na parede
  ctx.strokeStyle = 'rgba(30, 25, 18, 0.4)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(580, 0); ctx.lineTo(590, 60); ctx.lineTo(585, 120); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(320, 380); ctx.lineTo(330, 415); ctx.stroke();

  // Poeira acumulada na moldura
  ctx.fillStyle = 'rgba(80, 70, 50, 0.15)';
  ctx.fillRect(0, 413, 900, 3);

  // Marcas no chão (arranhões de cadeira)
  ctx.strokeStyle = 'rgba(30, 25, 15, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(400, 480); ctx.quadraticCurveTo(420, 490, 410, 510); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(380, 500); ctx.quadraticCurveTo(395, 510, 390, 530); ctx.stroke();
}

// Camada 5: Decoração — elementos não-interativos (ambiência)
function renderEsc_Decoracao(ctx) {
  // Rodapé de madeira
  ctx.fillStyle = '#2a1f14';
  ctx.fillRect(0, 430, 900, 5);

  // Janela com persiana (lado esquerdo, alta) — luz noir entrando
  ctx.fillStyle = '#0a0806';
  ctx.fillRect(15, 30, 100, 140);
  ctx.strokeStyle = '#3d3020';
  ctx.lineWidth = 3;
  ctx.strokeRect(15, 30, 100, 140);
  // Persianas parcialmente abertas — faixas de luz
  for (let i = 0; i < 7; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(180, 160, 120, 0.08)' : 'rgba(0,0,0,0.3)';
    ctx.fillRect(18, 33 + i * 19, 94, 17);
  }
  // Moldura interna
  ctx.strokeStyle = '#4d3b2f';
  ctx.lineWidth = 1;
  ctx.strokeRect(18, 33, 94, 134);

  // Cadeira de escritório (frente à mesa)
  ctx.fillStyle = '#1a1210';
  ctx.fillRect(360, 445, 80, 55);
  ctx.fillStyle = '#2a1f14';
  ctx.fillRect(370, 435, 60, 15);
  // Rodas
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.arc(375, 505, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(425, 505, 4, 0, Math.PI * 2); ctx.fill();

  // Relógio de parede (no topo)
  ctx.fillStyle = '#1a1510';
  ctx.beginPath(); ctx.arc(550, 50, 22, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#3d3020';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(550, 50, 22, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#c9a84c';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(550, 50); ctx.lineTo(550, 35); ctx.stroke(); // hora
  ctx.beginPath(); ctx.moveTo(550, 50); ctx.lineTo(562, 55); ctx.stroke(); // minuto
}

// Camada 6: Objetos interativos — mais claros que o cenário, com presença visual
function renderEsc_Objetos(ctx, state) {
  // --- ESTANTE (esquerda) ---
  // Corpo
  const estGrad = ctx.createLinearGradient(30, 80, 170, 80);
  estGrad.addColorStop(0, '#2a1f14');
  estGrad.addColorStop(0.5, '#3a2f20');
  estGrad.addColorStop(1, '#2a1f14');
  ctx.fillStyle = estGrad;
  ctx.fillRect(140, 80, 145, 345);
  ctx.strokeStyle = '#4d3b2f';
  ctx.lineWidth = 2;
  ctx.strokeRect(140, 80, 145, 345);
  // Prateleiras
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = '#3d2f1f';
    ctx.fillRect(142, 140 + i * 70, 141, 4);
  }
  // Livros variados
  const bookColors = ['#4a1a1a', '#1a3a1a', '#1a1a4a', '#4a3a1a', '#3a1a3a', '#2a3a2a'];
  for (let row = 0; row < 4; row++) {
    for (let i = 0; i < 6; i++) {
      const bh = 40 + Math.random() * 15;
      ctx.fillStyle = bookColors[(row + i) % 6];
      ctx.fillRect(148 + i * 22, 100 + row * 70 + (55 - bh), 18, bh);
    }
  }
  // Livro vermelho destaque (brilha se gaveta aberta)
  ctx.fillStyle = state.get('passagemAberta') ? '#4d0000' : '#cc2200';
  ctx.fillRect(170, 170, 26, 48);
  if (!state.get('passagemAberta') && state.get('gavetaAberta')) {
    ctx.shadowColor = '#c9a84c';
    ctx.shadowBlur = 12;
    ctx.strokeStyle = '#c9a84c';
    ctx.lineWidth = 1;
    ctx.strokeRect(170, 170, 26, 48);
    ctx.shadowBlur = 0;
  }

  // --- QUADRO DE INVESTIGAÇÃO ---
  ctx.fillStyle = '#0a0806';
  ctx.fillRect(340, 40, 220, 165);
  // Cortiça
  const corkGrad = ctx.createLinearGradient(345, 45, 345, 200);
  corkGrad.addColorStop(0, '#3a2a18');
  corkGrad.addColorStop(1, '#2a1a10');
  ctx.fillStyle = corkGrad;
  ctx.fillRect(345, 45, 210, 155);
  // Moldura
  ctx.strokeStyle = '#5a4030';
  ctx.lineWidth = 4;
  ctx.strokeRect(340, 40, 220, 165);
  ctx.lineWidth = 1;
  // Fotos e papéis
  ctx.fillStyle = '#d4c9a8';
  ctx.fillRect(360, 60, 40, 30); // foto 1
  ctx.fillRect(420, 80, 50, 35); // foto 2
  ctx.fillStyle = '#f5f0e0';
  ctx.fillRect(490, 55, 45, 30); // papel
  // Fios vermelhos
  ctx.strokeStyle = '#8b1a1a';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(380, 75); ctx.lineTo(445, 97); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(470, 95); ctx.lineTo(512, 70); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(400, 90); ctx.lineTo(480, 140); ctx.stroke();
  // Pins
  ctx.fillStyle = '#c62828';
  ctx.beginPath(); ctx.arc(380, 75, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(445, 97, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(512, 70, 3, 0, Math.PI * 2); ctx.fill();
  // Texto central
  ctx.fillStyle = '#c9a84c';
  ctx.font = 'bold 11px Courier New';
  ctx.fillText('CASO #847', 385, 160);
  ctx.fillStyle = '#8b7355';
  ctx.font = '9px Courier New';
  ctx.fillText('MERIDIAN', 395, 175);
  ctx.fillText('V. Torres', 395, 188);

  // --- MESA DO DETETIVE ---
  const mesaGrad = ctx.createLinearGradient(260, 295, 260, 420);
  mesaGrad.addColorStop(0, '#3a2f20');
  mesaGrad.addColorStop(0.3, '#2a1f14');
  mesaGrad.addColorStop(1, '#1a150e');
  ctx.fillStyle = mesaGrad;
  ctx.fillRect(280, 295, 280, 130);
  // Borda da mesa (espessura)
  ctx.fillStyle = '#4d3b2f';
  ctx.fillRect(280, 293, 280, 5);
  // Pernas
  ctx.fillStyle = '#1a150e';
  ctx.fillRect(290, 425, 8, 45);
  ctx.fillRect(548, 425, 8, 45);
  // Laptop
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(310, 310, 120, 75);
  // Tela do laptop
  const screenColor = state.get('laptopVisto') ? '#0d1a0d' : '#050a05';
  ctx.fillStyle = screenColor;
  ctx.fillRect(315, 315, 110, 55);
  if (state.get('laptopVisto')) {
    ctx.fillStyle = '#3a6a3a';
    ctx.font = '8px Courier New';
    ctx.fillText('> formato 4 dig', 320, 335);
    ctx.fillText('> bat: 3%', 320, 350);
  } else {
    // Standby glow sutil
    ctx.fillStyle = 'rgba(50, 100, 50, 0.1)';
    ctx.fillRect(315, 315, 110, 55);
  }
  // Teclado
  ctx.fillStyle = '#111';
  ctx.fillRect(310, 370, 120, 15);

  // Gaveta
  ctx.fillStyle = '#1a1610';
  ctx.fillRect(445, 360, 95, 50);
  ctx.strokeStyle = state.get('gavetaAberta') ? '#5a4a30' : '#3d3020';
  ctx.strokeRect(445, 360, 95, 50);
  // Puxador da gaveta
  ctx.fillStyle = '#8b7340';
  ctx.fillRect(480, 382, 25, 4);

  // --- LUMINÁRIA ---
  // Base
  ctx.fillStyle = '#2a2520';
  ctx.fillRect(720, 370, 12, 55);
  // Haste
  ctx.fillStyle = '#3a3025';
  ctx.fillRect(724, 270, 4, 100);
  // Cúpula
  const lampGrad = ctx.createRadialGradient(726, 260, 5, 726, 260, 35);
  if (state.get('luminaria')) {
    lampGrad.addColorStop(0, '#c9a84c');
    lampGrad.addColorStop(0.5, '#8b6914');
    lampGrad.addColorStop(1, '#3d2b0a');
  } else {
    lampGrad.addColorStop(0, '#4a4035');
    lampGrad.addColorStop(1, '#2a2520');
  }
  ctx.fillStyle = lampGrad;
  ctx.beginPath(); ctx.ellipse(726, 260, 35, 20, 0, Math.PI, 0); ctx.fill();

  // --- LIXEIRA ---
  ctx.fillStyle = '#1a1a18';
  ctx.fillRect(760, 480, 55, 65);
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.strokeRect(760, 480, 55, 65);
  // Papéis saindo
  ctx.fillStyle = '#d4c9a8';
  ctx.save();
  ctx.translate(780, 478);
  ctx.rotate(-0.2);
  ctx.fillRect(0, 0, 20, 12);
  ctx.restore();
  ctx.save();
  ctx.translate(792, 475);
  ctx.rotate(0.15);
  ctx.fillRect(0, 0, 18, 10);
  ctx.restore();

  // --- COFRE ---
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(620, 80, 110, 100);
  // Frente metálica
  const cofreGrad = ctx.createLinearGradient(620, 80, 730, 180);
  cofreGrad.addColorStop(0, '#2a2a2a');
  cofreGrad.addColorStop(0.5, '#1a1a1a');
  cofreGrad.addColorStop(1, '#0a0a0a');
  ctx.fillStyle = cofreGrad;
  ctx.fillRect(625, 85, 100, 90);
  ctx.strokeStyle = state.get('cofreAberto') ? '#5fa85f' : '#555';
  ctx.lineWidth = 3;
  ctx.strokeRect(620, 80, 110, 100);
  // Dial
  ctx.fillStyle = '#333';
  ctx.beginPath(); ctx.arc(675, 130, 15, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(675, 130, 15, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#888';
  ctx.beginPath(); ctx.arc(675, 130, 3, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;

  // --- PORTA ---
  ctx.fillStyle = '#1a0f08';
  ctx.fillRect(810, 130, 70, 290);
  // Painel decorativo
  ctx.strokeStyle = '#3d2b1f';
  ctx.lineWidth = 2;
  ctx.strokeRect(810, 130, 70, 290);
  ctx.strokeRect(818, 145, 54, 120);
  ctx.strokeRect(818, 280, 54, 120);
  // Maçaneta
  ctx.fillStyle = '#c9a84c';
  ctx.beginPath(); ctx.arc(825, 280, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#8b6914';
  ctx.beginPath(); ctx.arc(825, 280, 3, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
}

// Camada 7: Atmosfera — partículas são renderizadas externamente (dust system)
function renderEsc_Atmosfera(ctx) {
  // Raios de luz entrando pela janela (efeito noir)
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = '#c9a84c';
  ctx.beginPath();
  ctx.moveTo(65, 30);
  ctx.lineTo(300, 433);
  ctx.lineTo(200, 433);
  ctx.lineTo(15, 30);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Segundo raio mais fraco
  ctx.save();
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = '#c9a84c';
  ctx.beginPath();
  ctx.moveTo(90, 80);
  ctx.lineTo(350, 433);
  ctx.lineTo(280, 433);
  ctx.lineTo(50, 80);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Camada 8: Overlay final — vinheta + ajuste de cor
function renderEsc_Overlay(ctx) {
  // Vinheta cinematográfica
  const vignette = ctx.createRadialGradient(450, 300, 150, 450, 300, 550);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);

  // Leve tom sépia sobre tudo
  ctx.fillStyle = 'rgba(30, 20, 10, 0.08)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ ARQUIVO SECRETO ============

function renderArquivo(ctx, state) {
  renderArq_Background(ctx);
  renderArq_Arquitetura(ctx);
  renderArq_Iluminacao(ctx);
  renderArq_Objetos(ctx, state);
  renderArq_Overlay(ctx);
}

function renderArq_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0e14');
  grad.addColorStop(0.5, '#0e1218');
  grad.addColorStop(1, '#080c10');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderArq_Arquitetura(ctx) {
  // Chão de concreto
  const floorGrad = ctx.createLinearGradient(0, 460, 0, 600);
  floorGrad.addColorStop(0, '#12161c');
  floorGrad.addColorStop(1, '#0a0e14');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 460, 900, 140);
  ctx.strokeStyle = '#1a2030';
  ctx.beginPath(); ctx.moveTo(0, 460); ctx.lineTo(900, 460); ctx.stroke();

  // Paredes metálicas — painéis
  ctx.strokeStyle = '#1a2535';
  for (let i = 0; i < 6; i++) {
    ctx.strokeRect(i * 150 + 10, 10, 140, 440);
  }
}

function renderArq_Iluminacao(ctx) {
  // Luz de neon no teto (fria, azulada)
  ctx.fillStyle = 'rgba(100, 160, 220, 0.03)';
  ctx.fillRect(200, 0, 500, 200);

  // Reflexo do neon no chão
  ctx.fillStyle = 'rgba(80, 130, 180, 0.02)';
  ctx.fillRect(250, 480, 400, 100);

  // Tubo de neon
  ctx.fillStyle = 'rgba(150, 200, 255, 0.15)';
  ctx.fillRect(350, 5, 200, 4);
  ctx.shadowColor = 'rgba(150, 200, 255, 0.3)';
  ctx.shadowBlur = 10;
  ctx.fillRect(350, 5, 200, 4);
  ctx.shadowBlur = 0;
}

function renderArq_Objetos(ctx, state) {
  // Gavetas metálicas (A-D)
  const gavetaLabels = ['A', 'B', 'C', 'D'];
  for (let i = 0; i < 4; i++) {
    const gy = 100 + i * 85;
    const gavetaGrad = ctx.createLinearGradient(80, gy, 240, gy);
    gavetaGrad.addColorStop(0, '#1a2535');
    gavetaGrad.addColorStop(0.5, '#243040');
    gavetaGrad.addColorStop(1, '#1a2535');
    ctx.fillStyle = gavetaGrad;
    ctx.fillRect(80, gy, 160, 72);
    ctx.strokeStyle = '#3a4a5a';
    ctx.lineWidth = 1;
    ctx.strokeRect(80, gy, 160, 72);
    // Puxador metálico
    ctx.fillStyle = '#6a7a8a';
    ctx.fillRect(140, gy + 32, 40, 6);
    // Label
    ctx.fillStyle = '#8a9aaa';
    ctx.font = 'bold 14px Courier New';
    ctx.fillText(gavetaLabels[i], 155, gy + 22);
    // Cadeado na D
    if (i === 3) { ctx.fillStyle = '#555'; ctx.font = '14px serif'; ctx.fillText('🔒', 210, gy + 45); }
  }

  // Mural de recortes
  ctx.fillStyle = '#1a1a0c';
  ctx.fillRect(340, 50, 270, 210);
  ctx.strokeStyle = '#4d4d3d';
  ctx.lineWidth = 2;
  ctx.strokeRect(340, 50, 270, 210);
  ctx.lineWidth = 1;
  // Recortes de jornal
  ctx.fillStyle = '#d4c9a8';
  ctx.fillRect(360, 70, 100, 55);
  ctx.fillRect(480, 90, 110, 45);
  ctx.fillStyle = '#f5f0e0';
  ctx.fillRect(370, 140, 80, 40);
  ctx.fillRect(470, 150, 90, 50);
  // Círculo vermelho
  ctx.strokeStyle = '#c62828';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(525, 115, 18, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;
  // Texto
  ctx.fillStyle = '#4a4a3a';
  ctx.font = '8px Courier New';
  ctx.fillText('MERIDIAN FECHA', 365, 85);
  ctx.fillText('CONTRATO', 365, 97);

  // Pasta aberta sobre mesa pequena
  ctx.fillStyle = '#1a1a14';
  ctx.fillRect(440, 340, 160, 20); // mesinha
  ctx.fillStyle = '#2a2410';
  ctx.fillRect(450, 355, 140, 95);
  ctx.strokeStyle = '#5a4a30';
  ctx.strokeRect(450, 355, 140, 95);
  // Texto na pasta
  ctx.fillStyle = '#d4c9a8';
  ctx.font = '9px Courier New';
  ctx.fillText('Conclusão:', 465, 380);
  ctx.fillText('"O código é', 465, 395);
  ctx.fillText(' o caso."', 465, 410);
  ctx.fillStyle = '#8b7355';
  ctx.fillText('— A.M.', 465, 430);

  // Botão voltar (visual)
  ctx.fillStyle = '#1a2030';
  ctx.fillRect(735, 500, 130, 55);
  ctx.strokeStyle = '#3a4a5a';
  ctx.strokeRect(735, 500, 130, 55);
  ctx.fillStyle = '#8a9aaa';
  ctx.font = '12px Courier New';
  ctx.fillText('← Voltar', 765, 532);
}

function renderArq_Overlay(ctx) {
  // Vinheta fria
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 500);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.8, 'rgba(0, 5, 15, 0.3)');
  vignette.addColorStop(1, 'rgba(0, 5, 15, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
}
