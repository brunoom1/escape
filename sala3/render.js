/**
 * @module Sala3Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 3 — A Mansão dos Blackwood
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Estilo: Gótico sobrenatural, dourado antigo, sombras profundas
 * Ambientes: Salão Principal, Biblioteca, Porão/Ritual
 */

// ============ SALÃO PRINCIPAL ============

function renderSalao(ctx, state) {
  renderSalao_Background(ctx);
  renderSalao_Arquitetura(ctx);
  renderSalao_Iluminacao(ctx, state);
  renderSalao_Detalhes(ctx);
  renderSalao_Decoracao(ctx, state);
  renderSalao_Objetos(ctx, state);
  renderSalao_Atmosfera(ctx);
  renderSalao_Overlay(ctx);
}

// Camada 1: Background — gradiente gótico profundo
function renderSalao_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#050508');
  grad.addColorStop(0.3, '#0d0815');
  grad.addColorStop(0.7, '#1a0a2e');
  grad.addColorStop(1, '#050508');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — paredes góticas, chão de pedra, molduras
function renderSalao_Arquitetura(ctx) {
  // Parede superior com textura de pedra
  ctx.fillStyle = '#1a0a2e';
  ctx.fillRect(0, 0, 900, 420);
  // Barra de moldura gótica (friso)
  const frisoGrad = ctx.createLinearGradient(0, 410, 0, 430);
  frisoGrad.addColorStop(0, '#3d2b1f');
  frisoGrad.addColorStop(0.5, '#5a4030');
  frisoGrad.addColorStop(1, '#3d2b1f');
  ctx.fillStyle = frisoGrad;
  ctx.fillRect(0, 415, 900, 18);
  // Chão de pedra escura
  const floorGrad = ctx.createLinearGradient(0, 433, 0, 600);
  floorGrad.addColorStop(0, '#0d0805');
  floorGrad.addColorStop(0.5, '#0a0608');
  floorGrad.addColorStop(1, '#050308');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 433, 900, 167);
  // Lajes do chão
  ctx.strokeStyle = '#1a1018';
  ctx.lineWidth = 1;
  for (let i = 0; i < 10; i++) {
    const x = i * 95 + 15;
    ctx.beginPath(); ctx.moveTo(x, 433); ctx.lineTo(x - 5, 600); ctx.stroke();
  }
  for (let j = 0; j < 3; j++) {
    ctx.beginPath(); ctx.moveTo(0, 460 + j * 50); ctx.lineTo(900, 460 + j * 50); ctx.stroke();
  }
  // Textura de parede — linhas góticas sutis
  ctx.strokeStyle = 'rgba(60, 30, 60, 0.1)';
  for (let i = 0; i < 18; i++) {
    ctx.beginPath(); ctx.moveTo(i * 50 + 25, 0); ctx.lineTo(i * 50 + 25, 415); ctx.stroke();
  }
}

// Camada 3: Iluminação — fogo da lareira + lustre
function renderSalao_Iluminacao(ctx, state) {
  // Luz quente da lareira (lado esquerdo)
  const fireLightRadius = 220 + Math.sin(Date.now() / 400) * 15;
  const fireLight = ctx.createRadialGradient(140, 430, 10, 140, 430, fireLightRadius);
  fireLight.addColorStop(0, 'rgba(255, 120, 30, 0.12)');
  fireLight.addColorStop(0.4, 'rgba(200, 100, 20, 0.06)');
  fireLight.addColorStop(1, 'transparent');
  ctx.fillStyle = fireLight;
  ctx.fillRect(0, 200, 450, 400);

  // Luz fraca do lustre (central, oscilante)
  const chandelierGlow = 0.04 + Math.sin(Date.now() / 1200) * 0.015;
  const chandLight = ctx.createRadialGradient(450, 60, 5, 450, 60, 250);
  chandLight.addColorStop(0, `rgba(212, 175, 55, ${chandelierGlow})`);
  chandLight.addColorStop(0.5, `rgba(212, 175, 55, ${chandelierGlow * 0.4})`);
  chandLight.addColorStop(1, 'transparent');
  ctx.fillStyle = chandLight;
  ctx.fillRect(200, 0, 500, 350);

  // Sombras longas da lareira
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.moveTo(230, 433); ctx.lineTo(400, 433); ctx.lineTo(500, 600); ctx.lineTo(200, 600);
  ctx.closePath(); ctx.fill();
}

// Camada 4: Detalhes — desgaste, teias, manchas
function renderSalao_Detalhes(ctx) {
  // Manchas de umidade na parede
  ctx.fillStyle = 'rgba(20, 10, 30, 0.3)';
  ctx.beginPath(); ctx.ellipse(700, 50, 60, 20, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(150, 30, 40, 12, 0.2, 0, Math.PI * 2); ctx.fill();

  // Teias de aranha nos cantos
  ctx.strokeStyle = 'rgba(100, 80, 60, 0.12)';
  ctx.lineWidth = 0.5;
  // Canto superior direito
  ctx.beginPath(); ctx.moveTo(900, 0); ctx.quadraticCurveTo(860, 40, 850, 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(900, 0); ctx.quadraticCurveTo(870, 30, 870, 60); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(900, 0); ctx.quadraticCurveTo(880, 20, 890, 50); ctx.stroke();
  // Canto superior esquerdo
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(30, 35, 40, 70); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(20, 25, 25, 55); ctx.stroke();

  // Rachaduras na parede
  ctx.strokeStyle = 'rgba(30, 15, 40, 0.35)';
  ctx.lineWidth = 0.7;
  ctx.beginPath(); ctx.moveTo(600, 0); ctx.lineTo(605, 50); ctx.lineTo(602, 100); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(250, 350); ctx.lineTo(258, 415); ctx.stroke();

  // Poeira no friso
  ctx.fillStyle = 'rgba(60, 40, 30, 0.15)';
  ctx.fillRect(0, 413, 900, 3);
}

// Camada 5: Decoração — elementos não-interativos
function renderSalao_Decoracao(ctx, state) {
  // Rodapé ornamental
  ctx.fillStyle = '#2a1a14';
  ctx.fillRect(0, 430, 900, 5);

  // Arcos góticos na parede (decorativos)
  ctx.strokeStyle = '#2a1a3e';
  ctx.lineWidth = 2;
  // Arco esquerdo
  ctx.beginPath(); ctx.arc(300, 200, 80, Math.PI, 0); ctx.stroke();
  // Arco direito
  ctx.beginPath(); ctx.arc(700, 200, 80, Math.PI, 0); ctx.stroke();

  // Cortinas laterais (drapeados)
  const curtainGrad = ctx.createLinearGradient(0, 0, 30, 0);
  curtainGrad.addColorStop(0, '#2a0a1a');
  curtainGrad.addColorStop(0.5, '#3a1a2a');
  curtainGrad.addColorStop(1, '#2a0a1a');
  ctx.fillStyle = curtainGrad;
  ctx.fillRect(0, 0, 30, 415);
  ctx.fillRect(870, 0, 30, 415);
  // Franja dourada
  ctx.fillStyle = '#8b6914';
  ctx.fillRect(0, 0, 30, 4);
  ctx.fillRect(870, 0, 30, 4);

  // Tapete central
  ctx.fillStyle = 'rgba(80, 20, 30, 0.15)';
  ctx.fillRect(350, 440, 200, 160);
  ctx.strokeStyle = 'rgba(139, 105, 20, 0.2)';
  ctx.strokeRect(350, 440, 200, 160);

  // Lustre (parte decorativa)
  const swayX = Math.sin(Date.now() / 2000) * 3;
  ctx.strokeStyle = '#3d2b1f';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(450, 0); ctx.lineTo(450 + swayX, 30); ctx.stroke();
  // Corpo do lustre
  ctx.fillStyle = '#1a1010';
  ctx.beginPath(); ctx.ellipse(450 + swayX, 45, 45, 15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.ellipse(450 + swayX, 45, 45, 15, 0, 0, Math.PI * 2); ctx.stroke();
  // Velas do lustre
  const candleFlicker = Math.sin(Date.now() / 300) * 2;
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const cx = 450 + swayX + Math.cos(angle) * 30;
    const cy = 45 + Math.sin(angle) * 8;
    ctx.fillStyle = '#d4af37';
    ctx.beginPath(); ctx.ellipse(cx, cy - 5 + candleFlicker * 0.5, 3, 5, 0, 0, Math.PI * 2); ctx.fill();
  }
}

// Camada 6: Objetos interativos — presença visual forte
function renderSalao_Objetos(ctx, state) {
  // --- LAREIRA (esquerda) ---
  // Estrutura de pedra
  const fireGrad = ctx.createLinearGradient(50, 350, 230, 350);
  fireGrad.addColorStop(0, '#1a0f0a');
  fireGrad.addColorStop(0.5, '#2a1a10');
  fireGrad.addColorStop(1, '#1a0f0a');
  ctx.fillStyle = fireGrad;
  ctx.fillRect(50, 350, 180, 160);
  // Moldura da lareira
  ctx.strokeStyle = '#4d3b2f';
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 350, 180, 160);
  // Arco superior da lareira
  ctx.beginPath(); ctx.arc(140, 370, 60, Math.PI, 0); ctx.stroke();
  ctx.lineWidth = 1;
  // Abertura interna (escura)
  ctx.fillStyle = '#050505';
  ctx.fillRect(80, 390, 120, 110);
  // Fogo procedural (sin-based)
  const t = Date.now();
  const fireBase = Math.sin(t / 300) * 4;
  const fire2 = Math.sin(t / 200 + 1) * 3;
  const fire3 = Math.sin(t / 450 + 2) * 5;
  // Chama externa (laranja)
  ctx.fillStyle = '#cc4400';
  ctx.beginPath();
  ctx.ellipse(140 + fire2, 470 + fireBase, 35, 45, 0, 0, Math.PI * 2);
  ctx.fill();
  // Chama média (laranja brilhante)
  ctx.fillStyle = '#ff6600';
  ctx.beginPath();
  ctx.ellipse(135 + fire3, 475 + fireBase, 25, 35, 0, 0, Math.PI * 2);
  ctx.fill();
  // Chama interna (amarela)
  ctx.fillStyle = '#ffaa00';
  ctx.beginPath();
  ctx.ellipse(140 + fire2 * 0.5, 480 + fireBase * 0.7, 15, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  // Brasas
  ctx.fillStyle = '#ff3300';
  ctx.beginPath(); ctx.ellipse(120, 495, 30, 6, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#cc2200';
  ctx.beginPath(); ctx.ellipse(155, 497, 25, 5, 0, 0, Math.PI * 2); ctx.fill();
  // Inscrição na pedra (pista sutil)
  ctx.fillStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.font = '8px serif';
  ctx.fillText('☽ ☾', 105, 365);

  // --- RETRATO DA FAMÍLIA (parede esquerda-centro) ---
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(203, 43, 120, 150);
  // Moldura dourada
  ctx.fillStyle = '#111';
  ctx.fillRect(200, 40, 120, 150);
  const frameGrad = ctx.createLinearGradient(200, 40, 320, 190);
  frameGrad.addColorStop(0, '#8b6914');
  frameGrad.addColorStop(0.3, '#d4af37');
  frameGrad.addColorStop(0.7, '#8b6914');
  frameGrad.addColorStop(1, '#5a4010');
  ctx.strokeStyle = frameGrad;
  ctx.lineWidth = 4;
  ctx.strokeRect(200, 40, 120, 150);
  ctx.lineWidth = 1;
  // Silhuetas (4 figuras)
  ctx.fillStyle = '#2a2020';
  ctx.fillRect(215, 60, 90, 115);
  ctx.fillStyle = '#444';
  ctx.font = '18px serif';
  ctx.fillText('👤', 245, 95);   // pai (topo/Norte)
  ctx.fillText('👤', 245, 145);  // mãe (base/Sul)
  ctx.fillText('👤', 275, 120);  // filho (direita/Leste)
  ctx.fillText('👤', 218, 120);  // filha (esquerda/Oeste)

  // --- RETRATO DA FILHA (parede direita) ---
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(603, 43, 100, 140);
  ctx.fillStyle = '#111';
  ctx.fillRect(600, 40, 100, 140);
  ctx.strokeStyle = '#8b6914';
  ctx.lineWidth = 3;
  ctx.strokeRect(600, 40, 100, 140);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#333';
  ctx.font = '24px serif';
  ctx.fillText('👤', 632, 120);
  // Olhos brilhantes (efeito sobrenatural sutil)
  const eyeGlow = 0.2 + Math.sin(Date.now() / 1500) * 0.1;
  ctx.fillStyle = `rgba(212, 175, 55, ${eyeGlow})`;
  ctx.beginPath(); ctx.arc(643, 98, 2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(657, 98, 2, 0, Math.PI * 2); ctx.fill();

  // --- RELÓGIO DE AVÔ (centro-superior) ---
  // Corpo do relógio
  ctx.fillStyle = '#1a1510';
  ctx.fillRect(420, 30, 70, 120);
  const clockGrad = ctx.createLinearGradient(420, 30, 490, 30);
  clockGrad.addColorStop(0, '#2a1f14');
  clockGrad.addColorStop(0.5, '#3a2f20');
  clockGrad.addColorStop(1, '#2a1f14');
  ctx.fillStyle = clockGrad;
  ctx.fillRect(422, 32, 66, 116);
  ctx.strokeStyle = '#4d3b2f';
  ctx.lineWidth = 2;
  ctx.strokeRect(420, 30, 70, 120);
  // Mostrador circular
  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath(); ctx.arc(455, 70, 22, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(455, 70, 22, 0, Math.PI * 2); ctx.stroke();
  // Números 9:37 — ponteiros
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1.5;
  // Ponteiro hora (apontando ~9h = esquerda)
  ctx.beginPath(); ctx.moveTo(455, 70); ctx.lineTo(438, 70); ctx.stroke();
  // Ponteiro minuto (apontando ~37min = baixo-direita)
  ctx.beginPath(); ctx.moveTo(455, 70); ctx.lineTo(465, 85); ctx.stroke();
  ctx.lineWidth = 1;
  // Número display
  ctx.fillStyle = '#d4af37';
  ctx.font = '10px monospace';
  ctx.fillText('9:37', 440, 110);
  // Pêndulo (sin-based swing)
  const pendAngle = Math.sin(Date.now() / 1000) * 0.15;
  ctx.save();
  ctx.translate(455, 150);
  ctx.rotate(pendAngle);
  ctx.strokeStyle = '#8b6914';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -20); ctx.stroke();
  ctx.fillStyle = '#d4af37';
  ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // --- POLTRONA (centro-baixo) ---
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(355, 408, 130, 100);
  // Corpo
  const chairGrad = ctx.createLinearGradient(350, 400, 350, 500);
  chairGrad.addColorStop(0, '#3a1525');
  chairGrad.addColorStop(0.5, '#2a1020');
  chairGrad.addColorStop(1, '#1a0a15');
  ctx.fillStyle = chairGrad;
  ctx.fillRect(350, 400, 130, 100);
  // Encosto
  ctx.fillStyle = '#3a1525';
  ctx.fillRect(355, 380, 120, 25);
  // Detalhes de estofamento
  ctx.strokeStyle = '#5a2540';
  ctx.lineWidth = 1;
  ctx.strokeRect(350, 400, 130, 100);
  ctx.strokeRect(355, 380, 120, 25);
  // Botões do estofamento
  ctx.fillStyle = '#5a2540';
  ctx.beginPath(); ctx.arc(390, 440, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(415, 440, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(440, 440, 3, 0, Math.PI * 2); ctx.fill();

  // --- COFRE (atrás do retrato da filha, visível se investigado) ---
  if (state.get('retratoFilha')) {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(620, 200, 90, 80);
    const cofreGrad = ctx.createLinearGradient(620, 200, 710, 280);
    cofreGrad.addColorStop(0, '#1a1a1a');
    cofreGrad.addColorStop(0.5, '#2a2a2a');
    cofreGrad.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = cofreGrad;
    ctx.fillRect(625, 205, 80, 70);
    ctx.strokeStyle = state.get('cofreAberto') ? '#d4af37' : '#555';
    ctx.lineWidth = 2;
    ctx.strokeRect(620, 200, 90, 80);
    // Dial
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(665, 240, 12, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#666';
    ctx.beginPath(); ctx.arc(665, 240, 12, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 1;
  }

  // --- PORTA BIBLIOTECA (direita) ---
  ctx.fillStyle = '#0d0805';
  ctx.fillRect(780, 250, 70, 180);
  // Painéis da porta
  ctx.strokeStyle = '#3d2b1f';
  ctx.lineWidth = 2;
  ctx.strokeRect(780, 250, 70, 180);
  ctx.strokeRect(788, 260, 54, 70);
  ctx.strokeRect(788, 345, 54, 70);
  ctx.lineWidth = 1;
  // Maçaneta dourada
  ctx.fillStyle = state.get('chaveColetada') ? '#d4af37' : '#5a4030';
  ctx.beginPath(); ctx.arc(795, 340, 5, 0, Math.PI * 2); ctx.fill();
}

// Camada 7: Atmosfera — reflexos de fogo, partículas externas
function renderSalao_Atmosfera(ctx) {
  // Reflexos de fogo no chão
  ctx.save();
  ctx.globalAlpha = 0.04 + Math.sin(Date.now() / 500) * 0.015;
  ctx.fillStyle = '#ff6600';
  ctx.beginPath();
  ctx.ellipse(140, 500, 80, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Leve brilho dourado no teto (do lustre)
  ctx.save();
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = '#d4af37';
  ctx.fillRect(350, 0, 200, 30);
  ctx.restore();
}

// Camada 8: Overlay — vinheta + tom gótico
function renderSalao_Overlay(ctx) {
  // Vinheta cinematográfica
  const vignette = ctx.createRadialGradient(450, 300, 150, 450, 300, 550);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(5, 5, 8, 0.2)');
  vignette.addColorStop(1, 'rgba(5, 5, 8, 0.55)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);

  // Tom roxo-escuro sutil
  ctx.fillStyle = 'rgba(15, 5, 25, 0.06)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ BIBLIOTECA ============

function renderBiblioteca(ctx, state) {
  renderBib_Background(ctx);
  renderBib_Arquitetura(ctx);
  renderBib_Iluminacao(ctx, state);
  renderBib_Detalhes(ctx);
  renderBib_Decoracao(ctx);
  renderBib_Objetos(ctx, state);
  renderBib_Atmosfera(ctx, state);
  renderBib_Overlay(ctx);
}

// Camada 1: Background
function renderBib_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0d0a05');
  grad.addColorStop(0.4, '#1a1008');
  grad.addColorStop(0.8, '#0d0805');
  grad.addColorStop(1, '#050305');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura
function renderBib_Arquitetura(ctx) {
  // Parede de madeira escura
  ctx.fillStyle = '#1a1008';
  ctx.fillRect(0, 0, 900, 430);
  // Friso de madeira
  const frisoGrad = ctx.createLinearGradient(0, 425, 0, 440);
  frisoGrad.addColorStop(0, '#4d3b2f');
  frisoGrad.addColorStop(0.5, '#6a5040');
  frisoGrad.addColorStop(1, '#4d3b2f');
  ctx.fillStyle = frisoGrad;
  ctx.fillRect(0, 425, 900, 15);
  // Chão de madeira escura
  const floorGrad = ctx.createLinearGradient(0, 440, 0, 600);
  floorGrad.addColorStop(0, '#12100a');
  floorGrad.addColorStop(1, '#0a0806');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 440, 900, 160);
  // Tábuas
  ctx.strokeStyle = '#1a150e';
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath(); ctx.moveTo(i * 78 + 10, 440); ctx.lineTo(i * 78 + 5, 600); ctx.stroke();
  }
  // Painéis de parede
  ctx.strokeStyle = 'rgba(77, 59, 47, 0.25)';
  for (let i = 0; i < 6; i++) {
    ctx.strokeRect(i * 155 + 10, 10, 140, 410);
  }
}

// Camada 3: Iluminação
function renderBib_Iluminacao(ctx, state) {
  // Luz quente do candelabro (se aceso)
  if (state.get('candelabro')) {
    const candleLight = ctx.createRadialGradient(580, 370, 5, 580, 370, 200);
    candleLight.addColorStop(0, 'rgba(212, 175, 55, 0.15)');
    candleLight.addColorStop(0.4, 'rgba(212, 175, 55, 0.05)');
    candleLight.addColorStop(1, 'transparent');
    ctx.fillStyle = candleLight;
    ctx.fillRect(380, 200, 400, 350);
  }

  // Luz ambiente fraca (janela implícita à esquerda)
  const ambient = ctx.createRadialGradient(50, 100, 5, 50, 100, 250);
  ambient.addColorStop(0, 'rgba(150, 120, 80, 0.04)');
  ambient.addColorStop(1, 'transparent');
  ctx.fillStyle = ambient;
  ctx.fillRect(0, 0, 300, 350);

  // Sombras das estantes
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.moveTo(230, 440); ctx.lineTo(300, 440); ctx.lineTo(350, 600); ctx.lineTo(200, 600);
  ctx.closePath(); ctx.fill();
}

// Camada 4: Detalhes
function renderBib_Detalhes(ctx) {
  // Poeira flutuando na luz
  ctx.fillStyle = 'rgba(200, 180, 140, 0.08)';
  ctx.beginPath(); ctx.arc(200, 150, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(400, 80, 1, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(650, 200, 1.2, 0, Math.PI * 2); ctx.fill();

  // Marcas de desgaste no chão
  ctx.strokeStyle = 'rgba(30, 25, 15, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(500, 470); ctx.quadraticCurveTo(520, 480, 510, 500); ctx.stroke();

  // Papel solto no chão
  ctx.fillStyle = 'rgba(200, 180, 150, 0.06)';
  ctx.save();
  ctx.translate(650, 520);
  ctx.rotate(0.3);
  ctx.fillRect(0, 0, 25, 15);
  ctx.restore();
}

// Camada 5: Decoração
function renderBib_Decoracao(ctx) {
  // Rodapé de madeira
  ctx.fillStyle = '#3d2b1f';
  ctx.fillRect(0, 437, 900, 4);

  // Escada rolante de acesso às prateleiras altas (decorativa)
  ctx.strokeStyle = '#3a2f20';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(240, 100); ctx.lineTo(260, 430); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(250, 100); ctx.lineTo(270, 430); ctx.stroke();
  // Degraus
  for (let i = 0; i < 8; i++) {
    const y = 130 + i * 38;
    const x = 241 + (i * 2.5);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 10, y); ctx.stroke();
  }
  ctx.lineWidth = 1;

  // Tapete sob a escrivaninha
  ctx.fillStyle = 'rgba(60, 20, 20, 0.12)';
  ctx.fillRect(330, 455, 210, 100);
  ctx.strokeStyle = 'rgba(139, 105, 20, 0.15)';
  ctx.strokeRect(330, 455, 210, 100);
}

// Camada 6: Objetos interativos
function renderBib_Objetos(ctx, state) {
  // --- ESTANTES DO CHÃO AO TETO (esquerda) ---
  const estGrad = ctx.createLinearGradient(30, 30, 230, 30);
  estGrad.addColorStop(0, '#2a1a10');
  estGrad.addColorStop(0.5, '#3a2a18');
  estGrad.addColorStop(1, '#2a1a10');
  ctx.fillStyle = estGrad;
  ctx.fillRect(30, 30, 200, 400);
  ctx.strokeStyle = '#4d3b2f';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, 200, 400);
  ctx.lineWidth = 1;
  // Prateleiras
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = '#3d2b1f';
    ctx.fillRect(32, 90 + i * 70, 196, 4);
  }
  // Livros variados
  const bookColors = ['#4a1a1a', '#1a3a1a', '#1a1a4a', '#4a3a1a', '#3a1a3a', '#2a3a2a', '#3a2a1a', '#1a2a3a'];
  for (let row = 0; row < 5; row++) {
    for (let i = 0; i < 8; i++) {
      const bh = 40 + (((row * 8 + i) * 7) % 15);
      ctx.fillStyle = bookColors[(row + i) % 8];
      ctx.fillRect(40 + i * 23, 50 + row * 70 + (55 - bh), 19, bh);
    }
  }
  // Grimório destaque (livro vermelho)
  if (!state.get('grimorio')) {
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(50, 180, 40, 55);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(50, 180, 40, 55);
    // Símbolo dourado
    ctx.fillStyle = '#d4af37';
    ctx.font = '12px serif';
    ctx.fillText('✦', 63, 212);
    ctx.lineWidth = 1;
  } else {
    ctx.fillStyle = '#2a0a0a';
    ctx.fillRect(50, 180, 40, 55);
  }

  // --- ESCRIVANINHA (centro) ---
  const deskGrad = ctx.createLinearGradient(350, 300, 350, 420);
  deskGrad.addColorStop(0, '#3a2a18');
  deskGrad.addColorStop(0.3, '#2a1f14');
  deskGrad.addColorStop(1, '#1a150e');
  ctx.fillStyle = deskGrad;
  ctx.fillRect(350, 300, 180, 120);
  // Tampo
  ctx.fillStyle = '#4d3b2f';
  ctx.fillRect(350, 298, 180, 5);
  // Pernas
  ctx.fillStyle = '#1a150e';
  ctx.fillRect(358, 420, 6, 35);
  ctx.fillRect(520, 420, 6, 35);
  ctx.strokeStyle = '#4d3b2f';
  ctx.strokeRect(350, 300, 180, 120);
  // Gaveta
  ctx.fillStyle = '#2a1f14';
  ctx.fillRect(380, 370, 80, 35);
  ctx.strokeStyle = '#4d3b2f';
  ctx.strokeRect(380, 370, 80, 35);
  ctx.fillStyle = '#8b6914';
  ctx.fillRect(410, 385, 20, 4);

  // --- DIÁRIO (sobre a escrivaninha) ---
  if (!state.get('diario')) {
    ctx.fillStyle = '#3a2a1a';
    ctx.fillRect(380, 310, 60, 40);
    ctx.strokeStyle = '#5a4a30';
    ctx.strokeRect(380, 310, 60, 40);
    ctx.fillStyle = '#d4af37';
    ctx.font = '8px monospace';
    ctx.fillText('Diário', 390, 335);
  } else {
    ctx.fillStyle = '#2a1a10';
    ctx.fillRect(380, 310, 60, 40);
  }

  // --- GLOBO TERRESTRE (direita-superior) ---
  // Suporte
  ctx.fillStyle = '#2a1f14';
  ctx.fillRect(636, 210, 8, 25);
  ctx.fillStyle = '#3a2a18';
  ctx.fillRect(620, 232, 40, 6);
  // Globo
  ctx.fillStyle = '#1a2a1a';
  ctx.beginPath(); ctx.arc(640, 180, 38, 0, Math.PI * 2); ctx.fill();
  // Continentes sutis
  ctx.fillStyle = '#2a4a2a';
  ctx.beginPath(); ctx.ellipse(630, 170, 12, 18, 0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(655, 185, 8, 12, -0.2, 0, Math.PI * 2); ctx.fill();
  // Borda
  ctx.strokeStyle = '#4d3b2f';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(640, 180, 38, 0, Math.PI * 2); ctx.stroke();
  // Aro metálico
  ctx.strokeStyle = '#8b6914';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.ellipse(640, 180, 40, 40, 0, 0, Math.PI); ctx.stroke();
  ctx.lineWidth = 1;

  // --- ESPELHO (parede direita) ---
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(700, 60, 70, 120);
  // Moldura ornamental
  const mirrorFrame = ctx.createLinearGradient(700, 60, 770, 180);
  mirrorFrame.addColorStop(0, '#8b6914');
  mirrorFrame.addColorStop(0.5, '#d4af37');
  mirrorFrame.addColorStop(1, '#8b6914');
  ctx.strokeStyle = mirrorFrame;
  ctx.lineWidth = 3;
  ctx.strokeRect(700, 60, 70, 120);
  ctx.lineWidth = 1;
  // Reflexo (superfície do espelho)
  const mirrorGrad = ctx.createLinearGradient(705, 65, 765, 175);
  mirrorGrad.addColorStop(0, '#1a1a2a');
  mirrorGrad.addColorStop(0.5, '#2a2a3a');
  mirrorGrad.addColorStop(1, '#1a1a2a');
  ctx.fillStyle = mirrorGrad;
  ctx.fillRect(705, 65, 60, 110);
  // Reflexo sobrenatural (círculo se espelho investigado)
  if (state.get('espelho')) {
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.beginPath(); ctx.arc(735, 120, 20, 0, Math.PI * 2); ctx.stroke();
  }

  // --- CANDELABRO (centro-direita) ---
  // Haste
  ctx.fillStyle = '#4d3b2f';
  ctx.fillRect(576, 380, 8, 55);
  // Base
  ctx.fillStyle = '#3a2a18';
  ctx.beginPath(); ctx.ellipse(580, 435, 20, 6, 0, 0, Math.PI * 2); ctx.fill();
  // Braços e velas
  const candleLit = state.get('candelabro');
  ctx.strokeStyle = '#4d3b2f';
  ctx.lineWidth = 2;
  // Braço esquerdo
  ctx.beginPath(); ctx.moveTo(580, 385); ctx.quadraticCurveTo(560, 375, 555, 365); ctx.stroke();
  // Braço direito
  ctx.beginPath(); ctx.moveTo(580, 385); ctx.quadraticCurveTo(600, 375, 605, 365); ctx.stroke();
  // Braço central
  ctx.beginPath(); ctx.moveTo(580, 380); ctx.lineTo(580, 360); ctx.stroke();
  ctx.lineWidth = 1;
  // Velas
  ctx.fillStyle = '#f5f0e0';
  ctx.fillRect(552, 350, 6, 16);
  ctx.fillRect(577, 345, 6, 16);
  ctx.fillRect(602, 350, 6, 16);
  // Chamas (se aceso)
  if (candleLit) {
    const flick = Math.sin(Date.now() / 250) * 2;
    ctx.fillStyle = '#ffaa00';
    ctx.beginPath(); ctx.ellipse(555, 347 + flick, 3, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(580, 342 + flick * 0.7, 3, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(605, 347 + flick * 1.2, 3, 6, 0, 0, Math.PI * 2); ctx.fill();
  }

  // --- PORTA PORÃO (direita-baixo, passagem secreta) ---
  if (state.get('passagemPorao')) {
    ctx.fillStyle = '#050305';
    ctx.fillRect(780, 400, 80, 140);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.strokeRect(780, 400, 80, 140);
    // Glow da passagem
    const passGlow = ctx.createRadialGradient(820, 470, 5, 820, 470, 60);
    passGlow.addColorStop(0, 'rgba(212, 175, 55, 0.1)');
    passGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = passGlow;
    ctx.fillRect(760, 410, 120, 130);
    ctx.lineWidth = 1;
  } else {
    // Estante cobrindo a passagem
    ctx.fillStyle = '#2a1a10';
    ctx.fillRect(780, 400, 80, 140);
    ctx.strokeStyle = '#3d2b1f';
    ctx.strokeRect(780, 400, 80, 140);
    // Livros decorativos
    const cols = ['#3a1a1a', '#1a2a1a', '#1a1a3a'];
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = cols[i];
      ctx.fillRect(790 + i * 20, 420, 16, 50);
    }
  }

  // --- BOTÃO VOLTAR (esquerda-baixo) ---
  ctx.fillStyle = '#1a0a2e';
  ctx.fillRect(30, 520, 120, 50);
  ctx.strokeStyle = '#3d2b1f';
  ctx.strokeRect(30, 520, 120, 50);
  ctx.fillStyle = '#8b7355';
  ctx.font = '11px monospace';
  ctx.fillText('\u2190 Sal\u00e3o', 55, 550);
}

// Camada 7: Atmosfera
function renderBib_Atmosfera(ctx, state) {
  // Cheiro de papel velho — partículas de poeira dourada
  const dustAlpha = 0.03 + Math.sin(Date.now() / 2000) * 0.01;
  ctx.fillStyle = `rgba(212, 175, 55, ${dustAlpha})`;
  ctx.beginPath(); ctx.arc(300, 200, 2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(500, 150, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(700, 300, 1.8, 0, Math.PI * 2); ctx.fill();

  // Luz do candelabro refletindo no chão
  if (state.get('candelabro')) {
    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.fillStyle = '#d4af37';
    ctx.beginPath(); ctx.ellipse(580, 480, 60, 15, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
}

// Camada 8: Overlay
function renderBib_Overlay(ctx) {
  // Vinheta quente
  const vignette = ctx.createRadialGradient(450, 300, 120, 450, 300, 520);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(10, 8, 5, 0.2)');
  vignette.addColorStop(1, 'rgba(10, 8, 5, 0.5)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);

  // Tom sépia sutil
  ctx.fillStyle = 'rgba(20, 15, 5, 0.05)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ PORÃO / RITUAL ============

function renderPorao(ctx, state) {
  renderPorao_Background(ctx);
  renderPorao_Arquitetura(ctx);
  renderPorao_Iluminacao(ctx, state);
  renderPorao_Detalhes(ctx);
  renderPorao_Decoracao(ctx, state);
  renderPorao_Objetos(ctx, state);
  renderPorao_Atmosfera(ctx, state);
  renderPorao_Overlay(ctx);
}

// Camada 1: Background
function renderPorao_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#050508');
  grad.addColorStop(0.5, '#0a0a14');
  grad.addColorStop(1, '#050308');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura
function renderPorao_Arquitetura(ctx) {
  // Paredes de pedra bruta
  ctx.fillStyle = '#0a0a12';
  ctx.fillRect(0, 0, 900, 600);
  // Textura de blocos de pedra
  ctx.strokeStyle = 'rgba(30, 30, 50, 0.25)';
  ctx.lineWidth = 1;
  for (let row = 0; row < 8; row++) {
    const y = row * 75;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(900, y); ctx.stroke();
    const offset = (row % 2) * 60;
    for (let col = 0; col < 8; col++) {
      ctx.beginPath(); ctx.moveTo(col * 120 + offset, y); ctx.lineTo(col * 120 + offset, y + 75); ctx.stroke();
    }
  }
  // Chão de pedra irregular
  ctx.fillStyle = '#08080e';
  ctx.fillRect(0, 480, 900, 120);
  ctx.strokeStyle = 'rgba(20, 20, 35, 0.3)';
  ctx.beginPath(); ctx.moveTo(0, 480); ctx.lineTo(900, 480); ctx.stroke();
}

// Camada 3: Iluminação
function renderPorao_Iluminacao(ctx, state) {
  // Brilho sobrenatural do círculo ritual
  const ritualGlow = ctx.createRadialGradient(450, 300, 20, 450, 300, 200);
  ritualGlow.addColorStop(0, 'rgba(212, 175, 55, 0.06)');
  ritualGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.03)');
  ritualGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = ritualGlow;
  ctx.fillRect(250, 100, 400, 400);

  // Velas auto-iluminam (estado supernatural)
  const candleIntensity = 0.08 + Math.sin(Date.now() / 600) * 0.03;
  // Vela Norte
  const vlN = ctx.createRadialGradient(450, 160, 3, 450, 160, 50);
  vlN.addColorStop(0, `rgba(255, 170, 0, ${candleIntensity})`);
  vlN.addColorStop(1, 'transparent');
  ctx.fillStyle = vlN;
  ctx.fillRect(400, 110, 100, 100);
  // Vela Sul
  const vlS = ctx.createRadialGradient(450, 440, 3, 450, 440, 50);
  vlS.addColorStop(0, `rgba(255, 170, 0, ${candleIntensity})`);
  vlS.addColorStop(1, 'transparent');
  ctx.fillStyle = vlS;
  ctx.fillRect(400, 390, 100, 100);
  // Vela Leste
  const vlL = ctx.createRadialGradient(600, 300, 3, 600, 300, 50);
  vlL.addColorStop(0, `rgba(255, 170, 0, ${candleIntensity})`);
  vlL.addColorStop(1, 'transparent');
  ctx.fillStyle = vlL;
  ctx.fillRect(550, 250, 100, 100);
  // Vela Oeste
  const vlO = ctx.createRadialGradient(300, 300, 3, 300, 300, 50);
  vlO.addColorStop(0, `rgba(255, 170, 0, ${candleIntensity})`);
  vlO.addColorStop(1, 'transparent');
  ctx.fillStyle = vlO;
  ctx.fillRect(250, 250, 100, 100);
}

// Camada 4: Detalhes
function renderPorao_Detalhes(ctx) {
  // Umidade nas paredes
  ctx.fillStyle = 'rgba(20, 30, 20, 0.2)';
  ctx.beginPath(); ctx.ellipse(100, 200, 30, 60, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(800, 150, 25, 45, 0.2, 0, Math.PI * 2); ctx.fill();

  // Correntes na parede
  ctx.strokeStyle = 'rgba(80, 80, 100, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(850, 50); ctx.quadraticCurveTo(845, 100, 850, 150); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(860, 50); ctx.quadraticCurveTo(865, 120, 855, 180); ctx.stroke();
  ctx.lineWidth = 1;

  // Rachaduras no chão perto do círculo
  ctx.strokeStyle = 'rgba(40, 40, 60, 0.3)';
  ctx.beginPath(); ctx.moveTo(350, 450); ctx.lineTo(360, 470); ctx.lineTo(355, 480); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(550, 460); ctx.lineTo(558, 475); ctx.stroke();
}

// Camada 5: Decoração
function renderPorao_Decoracao(ctx, state) {
  // --- CÍRCULO RITUAL (elemento central do chão) ---
  // Círculo externo
  ctx.strokeStyle = '#d4af3755';
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(450, 300, 150, 0, Math.PI * 2); ctx.stroke();
  // Círculo interno
  ctx.strokeStyle = '#d4af3733';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(450, 300, 120, 0, Math.PI * 2); ctx.stroke();
  // Cruz cardeal
  ctx.strokeStyle = '#d4af3744';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(450, 150); ctx.lineTo(450, 450); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(300, 300); ctx.lineTo(600, 300); ctx.stroke();
  // Linhas diagonais
  ctx.strokeStyle = '#d4af3722';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(344, 194); ctx.lineTo(556, 406); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(556, 194); ctx.lineTo(344, 406); ctx.stroke();
  // Símbolos nos pontos cardeais
  ctx.fillStyle = '#d4af3788';
  ctx.font = '12px serif';
  ctx.fillText('N', 445, 148);
  ctx.fillText('S', 445, 465);
  ctx.fillText('L', 605, 305);
  ctx.fillText('O', 285, 305);
  // Runas no círculo
  ctx.fillStyle = '#d4af3744';
  ctx.font = '10px serif';
  const runas = ['\u16A0', '\u16A2', '\u16A6', '\u16B1', '\u16B7', '\u16C1', '\u16C7', '\u16D2'];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const rx = 450 + Math.cos(angle) * 135;
    const ry = 300 + Math.sin(angle) * 135;
    ctx.fillText(runas[i], rx - 4, ry + 4);
  }
  ctx.lineWidth = 1;

  // Velas nos pontos cardeais
  const candleFlick = Math.sin(Date.now() / 350) * 2;
  // Norte
  ctx.fillStyle = '#f5f0e0';
  ctx.fillRect(447, 155, 6, 18);
  ctx.fillStyle = '#ffaa00';
  ctx.beginPath(); ctx.ellipse(450, 152 + candleFlick, 3, 6, 0, 0, Math.PI * 2); ctx.fill();
  // Sul
  ctx.fillStyle = '#f5f0e0';
  ctx.fillRect(447, 438, 6, 18);
  ctx.fillStyle = '#ffaa00';
  ctx.beginPath(); ctx.ellipse(450, 435 + candleFlick * 0.8, 3, 6, 0, 0, Math.PI * 2); ctx.fill();
  // Leste
  ctx.fillStyle = '#f5f0e0';
  ctx.fillRect(597, 297, 6, 18);
  ctx.fillStyle = '#ffaa00';
  ctx.beginPath(); ctx.ellipse(600, 294 + candleFlick * 1.1, 3, 6, 0, 0, Math.PI * 2); ctx.fill();
  // Oeste
  ctx.fillStyle = '#f5f0e0';
  ctx.fillRect(297, 297, 6, 18);
  ctx.fillStyle = '#ffaa00';
  ctx.beginPath(); ctx.ellipse(300, 294 + candleFlick * 0.9, 3, 6, 0, 0, Math.PI * 2); ctx.fill();
}

// Camada 6: Objetos interativos
function renderPorao_Objetos(ctx, state) {
  // --- ALTAR CENTRAL ---
  // Base de pedra
  ctx.fillStyle = '#1a1520';
  ctx.fillRect(375, 250, 150, 100);
  const altarGrad = ctx.createLinearGradient(375, 250, 525, 350);
  altarGrad.addColorStop(0, '#1a1520');
  altarGrad.addColorStop(0.5, '#2a2030');
  altarGrad.addColorStop(1, '#1a1520');
  ctx.fillStyle = altarGrad;
  ctx.fillRect(380, 255, 140, 90);
  ctx.strokeStyle = '#3d2b3f';
  ctx.lineWidth = 2;
  ctx.strokeRect(375, 250, 150, 100);
  ctx.lineWidth = 1;
  // Marcas dos 4 pontos no altar
  ctx.strokeStyle = '#d4af3755';
  // Norte (topo)
  ctx.beginPath(); ctx.arc(450, 260, 12, 0, Math.PI * 2); ctx.stroke();
  // Sul (base)
  ctx.beginPath(); ctx.arc(450, 340, 12, 0, Math.PI * 2); ctx.stroke();
  // Leste (direita)
  ctx.beginPath(); ctx.arc(515, 300, 12, 0, Math.PI * 2); ctx.stroke();
  // Oeste (esquerda)
  ctx.beginPath(); ctx.arc(385, 300, 12, 0, Math.PI * 2); ctx.stroke();
  // Label central
  ctx.fillStyle = '#d4af37';
  ctx.font = '9px monospace';
  ctx.fillText('ALTAR', 430, 303);

  // --- GRAVURAS NA PAREDE (esquerda) ---
  ctx.fillStyle = '#0e0e18';
  ctx.fillRect(50, 80, 150, 200);
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 80, 150, 200);
  ctx.lineWidth = 1;
  // Gravuras entalhadas (4 símbolos nas posições cardeais)
  ctx.fillStyle = '#4a4a5a';
  ctx.font = '16px serif';
  ctx.fillText('\u2660', 115, 110); // topo = símbolo (não revela direto)
  ctx.fillText('\u2663', 115, 260); // base
  ctx.fillText('\u2666', 165, 180); // direita
  ctx.fillText('\u2665', 70, 180);  // esquerda
  // Detalhes de entalhes
  ctx.strokeStyle = 'rgba(100, 100, 120, 0.3)';
  ctx.beginPath(); ctx.moveTo(60, 140); ctx.lineTo(190, 140); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(60, 220); ctx.lineTo(190, 220); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(125, 90); ctx.lineTo(125, 270); ctx.stroke();

  // --- VELAS DISPOSTAS (direita) ---
  ctx.fillStyle = '#0e0e14';
  ctx.fillRect(700, 200, 100, 100);
  // 4 velas em cruz
  const positions = [[730, 220], [770, 220], [730, 270], [770, 270]];
  const vFlick = Math.sin(Date.now() / 280) * 1.5;
  for (let i = 0; i < 4; i++) {
    const [vx, vy] = positions[i];
    ctx.fillStyle = '#f5f0e0';
    ctx.fillRect(vx - 3, vy, 6, 20);
    ctx.fillStyle = '#ffaa00';
    ctx.beginPath(); ctx.ellipse(vx, vy - 3 + vFlick * (i % 2 === 0 ? 1 : -1), 3, 5, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(700, 200, 100, 100);

  // --- PEDESTAL COM AMULETO (esquerda-baixo) ---
  // Pedestal de pedra
  ctx.fillStyle = state.get('pedestal') ? '#1a1520' : '#2a2030';
  ctx.fillRect(100, 400, 80, 80);
  ctx.strokeStyle = '#4a3a5a';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(100, 400, 80, 80);
  ctx.lineWidth = 1;
  // Topo do pedestal
  ctx.fillStyle = '#3a3040';
  ctx.fillRect(95, 395, 90, 8);
  // Amuleto (se não coletado)
  if (!state.get('pedestal')) {
    ctx.fillStyle = '#d4af37';
    ctx.beginPath(); ctx.arc(140, 430, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0a0a14';
    ctx.beginPath(); ctx.arc(140, 430, 8, 0, Math.PI * 2); ctx.fill();
    // Olho no centro
    ctx.fillStyle = '#d4af37';
    ctx.beginPath(); ctx.ellipse(140, 430, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0a0a14';
    ctx.beginPath(); ctx.arc(140, 430, 2, 0, Math.PI * 2); ctx.fill();
    // Glow
    ctx.save();
    ctx.shadowColor = '#d4af37';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.beginPath(); ctx.arc(140, 430, 16, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }

  // --- PORTA SELADA (saída, direita-baixo) ---
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(750, 400, 80, 150);
  // Moldura arcana
  ctx.strokeStyle = '#d4af3744';
  ctx.lineWidth = 2;
  ctx.strokeRect(750, 400, 80, 150);
  // Símbolos pulsantes na porta
  const sealPulse = Math.sin(Date.now() / 800) * 0.3 + 0.5;
  ctx.fillStyle = `rgba(212, 175, 55, ${sealPulse * 0.15})`;
  ctx.fillRect(750, 400, 80, 150);
  // Runas na porta
  ctx.fillStyle = `rgba(212, 175, 55, ${sealPulse * 0.5})`;
  ctx.font = '14px serif';
  ctx.fillText('\u16A0', 770, 440);
  ctx.fillText('\u16B1', 800, 470);
  ctx.fillText('\u16C1', 770, 510);
  ctx.fillText('\u16D2', 800, 535);
  ctx.lineWidth = 1;

  // --- BOTÃO VOLTAR (esquerda-baixo) ---
  ctx.fillStyle = '#1a0a2e';
  ctx.fillRect(30, 520, 120, 50);
  ctx.strokeStyle = '#3d2b1f';
  ctx.strokeRect(30, 520, 120, 50);
  ctx.fillStyle = '#8b7355';
  ctx.font = '11px monospace';
  ctx.fillText('\u2190 Biblioteca', 42, 550);
}

// Camada 7: Atmosfera
function renderPorao_Atmosfera(ctx, state) {
  // Neblina sobrenatural baixa
  const fogAlpha = 0.04 + Math.sin(Date.now() / 3000) * 0.015;
  const fogGrad = ctx.createLinearGradient(0, 400, 0, 600);
  fogGrad.addColorStop(0, 'transparent');
  fogGrad.addColorStop(0.5, `rgba(100, 80, 120, ${fogAlpha})`);
  fogGrad.addColorStop(1, `rgba(80, 60, 100, ${fogAlpha * 1.5})`);
  ctx.fillStyle = fogGrad;
  ctx.fillRect(0, 400, 900, 200);

  // Energia do círculo ritual (pulso)
  const energyPulse = Math.sin(Date.now() / 1500) * 0.5 + 0.5;
  ctx.save();
  ctx.globalAlpha = energyPulse * 0.04;
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(450, 300, 150 + energyPulse * 10, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();

  // Partículas douradas flutuando (posições fixas, animação sin)
  ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
  const particleData = [[380, 250], [520, 320], [430, 180], [470, 420], [350, 350]];
  for (let i = 0; i < particleData.length; i++) {
    const [px, py] = particleData[i];
    const offY = Math.sin(Date.now() / 1000 + i * 1.5) * 8;
    ctx.beginPath(); ctx.arc(px, py + offY, 1.5, 0, Math.PI * 2); ctx.fill();
  }
}

// Camada 8: Overlay
function renderPorao_Overlay(ctx) {
  // Vinheta sobrenatural (mais apertada)
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 480);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.6, 'rgba(5, 3, 10, 0.25)');
  vignette.addColorStop(1, 'rgba(5, 3, 10, 0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);

  // Tom sobrenatural roxo
  ctx.fillStyle = 'rgba(20, 5, 30, 0.08)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ POSITION TABLE ============
/*
SALÃO PRINCIPAL:
  ID                | x    | y    | w    | h    | Descrição
  retratoFamilia    | 200  | 40   | 120  | 150  | Retrato da família (parede esq-centro)
  retratoFilha      | 600  | 40   | 100  | 140  | Retrato da filha (parede direita)
  lareira           | 50   | 350  | 180  | 160  | Lareira com fogo (esquerda)
  relogio           | 420  | 30   | 70   | 120  | Relógio de avô (centro-superior)
  poltrona          | 350  | 400  | 130  | 100  | Poltrona (centro-baixo)
  lustre            | 400  | 0    | 100  | 60   | Lustre (centro-topo)
  cofreSalao        | 620  | 200  | 90   | 80   | Cofre (atrás do retrato da filha)
  portaBiblioteca   | 780  | 250  | 70   | 180  | Porta para a biblioteca (direita)

BIBLIOTECA:
  ID                | x    | y    | w    | h    | Descrição
  estante           | 30   | 30   | 200  | 400  | Estantes do chão ao teto (esquerda)
  grimorio          | 50   | 180  | 40   | 55   | Grimório vermelho (na estante)
  escrivaninha      | 350  | 300  | 180  | 120  | Escrivaninha (centro)
  diario            | 380  | 310  | 60   | 40   | Diário (sobre escrivaninha)
  globo             | 600  | 140  | 80   | 100  | Globo terrestre (direita-superior)
  espelho           | 700  | 60   | 70   | 120  | Espelho (parede direita)
  candelabro        | 550  | 350  | 60   | 90   | Candelabro (centro-direita)
  portaPorao        | 780  | 400  | 80   | 140  | Passagem para porão (direita-baixo)
  voltarSalao       | 30   | 520  | 120  | 50   | Botão voltar ao salão

PORÃO / RITUAL:
  ID                | x    | y    | w    | h    | Descrição
  altar             | 375  | 250  | 150  | 100  | Altar ritual (centro)
  gravuras          | 50   | 80   | 150  | 200  | Gravuras na parede (esquerda)
  velas             | 700  | 200  | 100  | 100  | Velas dispostas (direita)
  pedestal          | 100  | 400  | 80   | 80   | Pedestal com amuleto (esquerda-baixo)
  portaSelada       | 750  | 400  | 80   | 150  | Porta selada/saída (direita-baixo)
  voltarBib         | 30   | 520  | 120  | 50   | Botão voltar à biblioteca
*/
