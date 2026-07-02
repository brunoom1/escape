/**
 * @module Sala8Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 8 — Pirâmide de Khufu
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Ambientes: Antecâmara, Corredor, Câmara
 * Paleta: ThemeEgypt — bg #0d0a06, accent #e8b84a, border #3d3010
 */

// ============ PRÉ-CALCULADOS ============
const ANTE_STONES = [];
for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 7; col++) {
    ANTE_STONES.push({ x: col * 130 + (row % 2) * 65, y: row * 60 + 10, w: 125, h: 55 });
  }
}
const CORR_TORCHES = [{x:50,y:150},{x:850,y:150},{x:50,y:350},{x:850,y:350}];
const CAM_JEWELS = [
  {x:200,y:200,c:'#e8b84a'},{x:400,y:180,c:'#1565c0'},{x:600,y:190,c:'#c62828'},
  {x:300,y:350,c:'#e8b84a'},{x:700,y:340,c:'#2e7d32'}
];

// ============ ANTECÂMARA ============

function renderAntecamara(ctx, state) {
  renderAnte_Background(ctx);
  renderAnte_Arquitetura(ctx);
  renderAnte_Iluminacao(ctx);
  renderAnte_Detalhes(ctx);
  renderAnte_Decoracao(ctx);
  renderAnte_Objetos(ctx, state);
  renderAnte_Atmosfera(ctx);
  renderAnte_Overlay(ctx);
}

function renderAnte_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0d0a06');
  grad.addColorStop(0.3, '#14100a');
  grad.addColorStop(0.7, '#100c08');
  grad.addColorStop(1, '#0a0806');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderAnte_Arquitetura(ctx) {
  // Paredes de blocos de pedra calcária
  ctx.fillStyle = '#1a1408';
  ctx.fillRect(0, 0, 900, 480);
  // Blocos
  ctx.strokeStyle = '#241a0c';
  ctx.lineWidth = 0.5;
  for (const s of ANTE_STONES) {
    if (s.x < 900 && s.y < 480) {
      ctx.strokeRect(s.x, s.y, s.w, s.h);
    }
  }
  ctx.lineWidth = 1;
  // Piso de pedra lisa
  const floorGrad = ctx.createLinearGradient(0, 480, 0, 600);
  floorGrad.addColorStop(0, '#14100a');
  floorGrad.addColorStop(1, '#0a0806');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 480, 900, 120);
  // Borda
  ctx.strokeStyle = '#3d3010';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 480); ctx.lineTo(900, 480); ctx.stroke();
  ctx.lineWidth = 1;
  // Arco da entrada
  ctx.strokeStyle = '#3d3010';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(300, 480); ctx.lineTo(300, 100);
  ctx.quadraticCurveTo(450, 50, 600, 100);
  ctx.lineTo(600, 480);
  ctx.stroke();
  ctx.lineWidth = 1;
}

function renderAnte_Iluminacao(ctx) {
  // Tochas (sin-based)
  const flicker = Math.sin(Date.now() / 250) * 0.3 + 0.7;
  const torch1 = ctx.createRadialGradient(150, 200, 5, 150, 200, 150);
  torch1.addColorStop(0, `rgba(232, 160, 50, ${0.1 * flicker})`);
  torch1.addColorStop(1, 'transparent');
  ctx.fillStyle = torch1;
  ctx.fillRect(0, 50, 300, 350);
  const torch2 = ctx.createRadialGradient(750, 200, 5, 750, 200, 150);
  torch2.addColorStop(0, `rgba(232, 160, 50, ${0.1 * flicker})`);
  torch2.addColorStop(1, 'transparent');
  ctx.fillStyle = torch2;
  ctx.fillRect(600, 50, 300, 350);
}

function renderAnte_Detalhes(ctx) {
  // Areia acumulada nos cantos
  ctx.fillStyle = 'rgba(60, 50, 20, 0.08)';
  ctx.beginPath(); ctx.ellipse(100, 490, 80, 15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(800, 490, 70, 12, 0, 0, Math.PI * 2); ctx.fill();
  // Rachaduras
  ctx.strokeStyle = 'rgba(40, 30, 15, 0.2)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(450, 80); ctx.lineTo(455, 130); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(200, 300); ctx.lineTo(210, 330); ctx.stroke();
  ctx.lineWidth = 1;
}

function renderAnte_Decoracao(ctx) {
  // Tochas físicas
  ctx.fillStyle = '#3d2a10';
  ctx.fillRect(142, 160, 16, 80);
  ctx.fillRect(742, 160, 16, 80);
  // Chamas
  ctx.fillStyle = '#e8a030';
  ctx.beginPath(); ctx.ellipse(150, 155, 8, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffcc00';
  ctx.beginPath(); ctx.ellipse(150, 152, 4, 6, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8a030';
  ctx.beginPath(); ctx.ellipse(750, 155, 8, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffcc00';
  ctx.beginPath(); ctx.ellipse(750, 152, 4, 6, 0, 0, Math.PI * 2); ctx.fill();
  // Hieróglifos decorativos no arco
  ctx.fillStyle = '#e8b84a33';
  ctx.font = '12px serif';
  ctx.fillText('𓂀 𓁹 𓃭 𓆣', 380, 85);
  // Escaravelho sobre a entrada
  ctx.fillStyle = '#e8b84a55';
  ctx.font = '20px serif';
  ctx.fillText('𓆣', 435, 75);
}

function renderAnte_Objetos(ctx, state) {
  // --- ESTELA DE PEDRA (100, 100, 130, 220) ---
  ctx.fillStyle = '#1a1408';
  ctx.fillRect(105, 105, 120, 210);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(105, 105, 120, 210);
  // Hieróglifos na estela
  ctx.fillStyle = '#e8b84a88';
  ctx.font = '14px serif';
  ctx.fillText('𓁹 𓊪 𓎛', 120, 150);
  ctx.fillText('𓇳 𓈖 𓏏', 120, 185);
  ctx.fillText('𓌙 𓃀 𓂋', 120, 220);
  ctx.fillStyle = '#e8b84a';
  ctx.font = '8px Courier New';
  ctx.fillText('"O olho vê', 115, 270);
  ctx.fillText(' a verdade"', 115, 285);

  // --- ALTAR (350, 200, 200, 120) ---
  const altGrad = ctx.createLinearGradient(350, 200, 350, 320);
  altGrad.addColorStop(0, '#2a2010');
  altGrad.addColorStop(1, '#1a1408');
  ctx.fillStyle = altGrad;
  ctx.fillRect(355, 205, 190, 110);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 2;
  ctx.strokeRect(355, 205, 190, 110);
  ctx.lineWidth = 1;
  // Objetos no altar
  ctx.fillStyle = '#e8b84a';
  ctx.beginPath(); ctx.arc(400, 260, 8, 0, Math.PI * 2); ctx.fill(); // ankh
  ctx.fillStyle = '#1565c0';
  ctx.beginPath(); ctx.arc(450, 260, 6, 0, Math.PI * 2); ctx.fill(); // lapis
  ctx.fillStyle = '#c62828';
  ctx.beginPath(); ctx.arc(500, 260, 7, 0, Math.PI * 2); ctx.fill(); // rubi

  // --- MURAL DE ANÚBIS (650, 80, 150, 250) ---
  ctx.fillStyle = '#141008';
  ctx.fillRect(655, 85, 140, 240);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(655, 85, 140, 240);
  // Silhueta de Anúbis
  ctx.fillStyle = '#e8b84a44';
  ctx.beginPath();
  ctx.moveTo(725, 120); ctx.lineTo(710, 180); ctx.lineTo(700, 280);
  ctx.lineTo(750, 280); ctx.lineTo(740, 180);
  ctx.closePath(); ctx.fill();
  // Cabeça de chacal
  ctx.beginPath();
  ctx.moveTo(725, 120); ctx.lineTo(715, 100); ctx.lineTo(735, 100);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e8b84a';
  ctx.font = '8px Courier New';
  ctx.fillText('ANÚBIS', 705, 305);

  // --- PASSAGEM AO CORREDOR (380, 400, 140, 100) ---
  ctx.fillStyle = '#0a0806';
  ctx.fillRect(385, 405, 130, 90);
  ctx.strokeStyle = state.get('estelaLida') ? '#e8b84a' : '#3d3010';
  ctx.lineWidth = 2;
  ctx.strokeRect(385, 405, 130, 90);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a50';
  ctx.font = '10px Courier New';
  ctx.fillText('CORREDOR →', 400, 455);

  // --- VOLTAR (30, 520, 120, 50) ---
  ctx.fillStyle = '#14100a';
  ctx.fillRect(35, 525, 115, 45);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(35, 525, 115, 45);
  ctx.fillStyle = '#8a7a50';
  ctx.font = '10px Courier New';
  ctx.fillText('← Saída', 55, 552);
}

function renderAnte_Atmosfera(ctx) {
  // Poeira no ar
  ctx.save();
  ctx.globalAlpha = 0.015;
  ctx.fillStyle = '#e8b84a';
  const driftY = Math.sin(Date.now() / 4000) * 30;
  ctx.beginPath(); ctx.arc(350, 250 + driftY, 100, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function renderAnte_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 500);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.7, 'rgba(10, 8, 4, 0.3)');
  vignette.addColorStop(1, 'rgba(10, 8, 4, 0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(15, 12, 5, 0.06)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ CORREDOR ============

function renderCorredor(ctx, state) {
  renderCorr_Background(ctx);
  renderCorr_Arquitetura(ctx);
  renderCorr_Iluminacao(ctx);
  renderCorr_Detalhes(ctx);
  renderCorr_Decoracao(ctx);
  renderCorr_Objetos(ctx, state);
  renderCorr_Atmosfera(ctx);
  renderCorr_Overlay(ctx);
}

function renderCorr_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0806');
  grad.addColorStop(0.5, '#0e0c08');
  grad.addColorStop(1, '#080604');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderCorr_Arquitetura(ctx) {
  // Corredor estreito com perspectiva
  ctx.fillStyle = '#14100a';
  ctx.fillRect(0, 0, 900, 600);
  // Paredes convergentes (perspectiva)
  ctx.fillStyle = '#1a1408';
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(200, 80); ctx.lineTo(200, 520); ctx.lineTo(0, 600);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(900, 0); ctx.lineTo(700, 80); ctx.lineTo(700, 520); ctx.lineTo(900, 600);
  ctx.closePath(); ctx.fill();
  // Linhas de perspectiva
  ctx.strokeStyle = '#241a0c';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(200, 80); ctx.lineTo(700, 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(200, 520); ctx.lineTo(700, 520); ctx.stroke();
  // Teto
  ctx.fillStyle = '#0e0c08';
  ctx.fillRect(200, 80, 500, 30);
  // Piso
  ctx.fillStyle = '#100c06';
  ctx.fillRect(200, 490, 500, 30);
  // Blocos nas paredes laterais
  ctx.strokeStyle = '#241a0c';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 6; i++) {
    ctx.strokeRect(210, 115 + i * 60, 480, 55);
  }
  ctx.lineWidth = 1;
}

function renderCorr_Iluminacao(ctx) {
  // Tochas nos suportes
  for (const t of CORR_TORCHES) {
    const flicker = Math.sin(Date.now() / 200 + t.x * 0.1) * 0.3 + 0.7;
    const glow = ctx.createRadialGradient(t.x, t.y, 3, t.x, t.y, 80);
    glow.addColorStop(0, `rgba(232, 150, 40, ${0.08 * flicker})`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(t.x - 80, t.y - 80, 160, 160);
  }
}

function renderCorr_Detalhes(ctx) {
  // Teias de aranha nos cantos
  ctx.strokeStyle = 'rgba(80, 70, 50, 0.06)';
  ctx.lineWidth = 0.3;
  ctx.beginPath(); ctx.moveTo(200, 80); ctx.lineTo(230, 110); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(200, 80); ctx.lineTo(210, 115); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(700, 80); ctx.lineTo(680, 105); ctx.stroke();
  ctx.lineWidth = 1;
  // Areia no piso
  ctx.fillStyle = 'rgba(50, 40, 15, 0.06)';
  ctx.fillRect(250, 500, 400, 15);
}

function renderCorr_Decoracao(ctx) {
  // Tochas físicas nos suportes
  for (const t of CORR_TORCHES) {
    ctx.fillStyle = '#3d2a10';
    ctx.fillRect(t.x - 4, t.y, 8, 50);
    ctx.fillStyle = '#e8a030';
    ctx.beginPath(); ctx.ellipse(t.x, t.y - 5, 6, 10, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffcc00';
    ctx.beginPath(); ctx.ellipse(t.x, t.y - 8, 3, 5, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Hieróglifos nas paredes (faixa decorativa)
  ctx.fillStyle = '#e8b84a22';
  ctx.font = '10px serif';
  ctx.fillText('𓁹 𓂋 𓃀 𓇳 𓈖 𓊪 𓌙 𓎛', 250, 105);
}

function renderCorr_Objetos(ctx, state) {
  // --- ARMADILHA DE PISO (300, 250, 300, 100) ---
  ctx.fillStyle = '#100c06';
  ctx.fillRect(305, 255, 290, 90);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 1;
  // Padrão de placas de pressão
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      ctx.strokeRect(315 + i * 68, 265 + j * 40, 60, 35);
    }
  }
  ctx.fillStyle = '#e8b84a';
  ctx.font = '8px Courier New';
  ctx.fillText('PLACAS DE PRESSÃO', 370, 340);

  // --- RELEVO NA PAREDE (250, 130, 400, 100) ---
  ctx.fillStyle = '#1a1408';
  ctx.fillRect(255, 135, 390, 90);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(255, 135, 390, 90);
  // Figuras egípcias
  ctx.fillStyle = '#e8b84a66';
  ctx.font = '22px serif';
  ctx.fillText('𓀀 𓁐 𓂧 𓃭 𓆣', 300, 190);

  // --- NICHO COM ITEM (650, 200, 100, 150) ---
  ctx.fillStyle = '#0a0806';
  ctx.fillRect(655, 205, 90, 140);
  ctx.strokeStyle = '#e8b84a';
  ctx.strokeRect(655, 205, 90, 140);
  // Ânfora
  ctx.fillStyle = '#3d2a10';
  ctx.beginPath(); ctx.ellipse(700, 300, 20, 30, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8b84a44';
  ctx.beginPath(); ctx.ellipse(700, 300, 12, 18, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#8a7a50';
  ctx.font = '8px Courier New';
  ctx.fillText('ÂNFORA', 677, 340);

  // --- PORTA CÂMARA (400, 400, 100, 120) ---
  ctx.fillStyle = '#0e0a06';
  ctx.fillRect(405, 405, 90, 110);
  ctx.strokeStyle = state.get('passagemAberta') ? '#e8b84a' : '#3d3010';
  ctx.lineWidth = 2;
  ctx.strokeRect(405, 405, 90, 110);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a50';
  ctx.font = '9px Courier New';
  ctx.fillText('CÂMARA →', 415, 465);

  // --- VOLTAR ANTECÂMARA (30, 520, 130, 50) ---
  ctx.fillStyle = '#14100a';
  ctx.fillRect(35, 525, 125, 45);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(35, 525, 125, 45);
  ctx.fillStyle = '#8a7a50';
  ctx.font = '10px Courier New';
  ctx.fillText('← Antecâm.', 42, 552);
}

function renderCorr_Atmosfera(ctx) {
  ctx.save();
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = '#e8b84a';
  ctx.beginPath();
  ctx.moveTo(450, 80); ctx.lineTo(350, 520); ctx.lineTo(550, 520);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function renderCorr_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 80, 450, 300, 480);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.6, 'rgba(8, 6, 3, 0.3)');
  vignette.addColorStop(1, 'rgba(8, 6, 3, 0.7)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ CÂMARA DO FARAÓ ============

function renderCamara(ctx, state) {
  renderCam_Background(ctx);
  renderCam_Arquitetura(ctx);
  renderCam_Iluminacao(ctx);
  renderCam_Detalhes(ctx);
  renderCam_Decoracao(ctx);
  renderCam_Objetos(ctx, state);
  renderCam_Atmosfera(ctx);
  renderCam_Overlay(ctx);
}

function renderCam_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0806');
  grad.addColorStop(0.3, '#12100a');
  grad.addColorStop(0.7, '#0e0c08');
  grad.addColorStop(1, '#080604');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

function renderCam_Arquitetura(ctx) {
  // Grande câmara — teto alto com vigas de pedra
  ctx.fillStyle = '#14100a';
  ctx.fillRect(0, 0, 900, 500);
  // Vigas do teto
  ctx.fillStyle = '#1a1408';
  ctx.fillRect(0, 0, 900, 20);
  ctx.fillRect(200, 15, 20, 10);
  ctx.fillRect(450, 15, 20, 10);
  ctx.fillRect(680, 15, 20, 10);
  // Paredes com relevos
  ctx.strokeStyle = '#241a0c';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 5; i++) {
    ctx.strokeRect(i * 180 + 10, 25, 170, 470);
  }
  ctx.lineWidth = 1;
  // Piso
  ctx.fillStyle = '#100c06';
  ctx.fillRect(0, 500, 900, 100);
  ctx.strokeStyle = '#3d3010';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 500); ctx.lineTo(900, 500); ctx.stroke();
  ctx.lineWidth = 1;
}

function renderCam_Iluminacao(ctx) {
  // Luz central mística (ouro)
  const centerGlow = ctx.createRadialGradient(450, 300, 30, 450, 300, 350);
  centerGlow.addColorStop(0, 'rgba(232, 184, 74, 0.06)');
  centerGlow.addColorStop(0.5, 'rgba(200, 150, 50, 0.02)');
  centerGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = centerGlow;
  ctx.fillRect(100, 0, 700, 600);
  // Glow das joias
  for (const j of CAM_JEWELS) {
    ctx.fillStyle = j.c + '11';
    ctx.beginPath(); ctx.arc(j.x, j.y, 30, 0, Math.PI * 2); ctx.fill();
  }
}

function renderCam_Detalhes(ctx) {
  // Ouro nas juntas da pedra
  ctx.fillStyle = 'rgba(232, 184, 74, 0.03)';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(i * 180 + 10, 25, 2, 470);
    ctx.fillRect(i * 180 + 178, 25, 2, 470);
  }
}

function renderCam_Decoracao(ctx) {
  // Joias incrustadas nas paredes (decoração)
  for (const j of CAM_JEWELS) {
    ctx.fillStyle = j.c + '66';
    ctx.beginPath(); ctx.arc(j.x, j.y, 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#e8b84a';
    ctx.beginPath(); ctx.arc(j.x, j.y, 5, 0, Math.PI * 2); ctx.stroke();
  }
  // Cartouche do faraó (centro-alto)
  ctx.strokeStyle = '#e8b84a66';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(450, 60, 60, 25, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#e8b84a88';
  ctx.font = '14px serif';
  ctx.fillText('𓇳 𓂋 𓆣', 420, 65);
  ctx.lineWidth = 1;
}

function renderCam_Objetos(ctx, state) {
  // --- SARCÓFAGO CENTRAL (350, 150, 200, 280) ---
  const sarcGrad = ctx.createLinearGradient(350, 150, 550, 150);
  sarcGrad.addColorStop(0, '#2a2010');
  sarcGrad.addColorStop(0.5, '#3d3018');
  sarcGrad.addColorStop(1, '#2a2010');
  ctx.fillStyle = sarcGrad;
  ctx.fillRect(355, 155, 190, 270);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 2;
  ctx.strokeRect(355, 155, 190, 270);
  ctx.lineWidth = 1;
  // Máscara dourada
  ctx.fillStyle = '#e8b84a88';
  ctx.beginPath(); ctx.ellipse(450, 230, 35, 50, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#e8b84a';
  ctx.beginPath(); ctx.ellipse(450, 230, 35, 50, 0, 0, Math.PI * 2); ctx.stroke();
  // Olhos
  ctx.fillStyle = '#1565c0';
  ctx.beginPath(); ctx.ellipse(438, 225, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(462, 225, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
  // Nemes (toca faraônica)
  ctx.strokeStyle = '#e8b84a';
  ctx.beginPath(); ctx.moveTo(415, 190); ctx.lineTo(450, 175); ctx.lineTo(485, 190); ctx.stroke();

  // --- PAINEL DE MECANISMO (100, 300, 180, 150) ---
  ctx.fillStyle = '#14100a';
  ctx.fillRect(105, 305, 170, 140);
  ctx.strokeStyle = '#e8b84a';
  ctx.lineWidth = 2;
  ctx.strokeRect(105, 305, 170, 140);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#e8b84a';
  ctx.font = '9px Courier New';
  ctx.fillText('MECANISMO', 145, 330);
  // Engrenagens
  ctx.strokeStyle = '#e8b84a88';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(160, 380, 20, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(210, 380, 15, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;
  // Alavanca
  ctx.fillStyle = '#3d3010';
  ctx.fillRect(240, 350, 15, 70);
  ctx.fillStyle = '#e8b84a';
  ctx.beginPath(); ctx.arc(247, 345, 8, 0, Math.PI * 2); ctx.fill();

  // --- TESOUROS (650, 250, 150, 180) ---
  ctx.fillStyle = '#14100a';
  ctx.fillRect(655, 255, 140, 170);
  ctx.strokeStyle = '#e8b84a';
  ctx.strokeRect(655, 255, 140, 170);
  // Baú
  ctx.fillStyle = '#3d2a10';
  ctx.fillRect(680, 330, 90, 60);
  ctx.strokeStyle = '#e8b84a';
  ctx.strokeRect(680, 330, 90, 60);
  // Ouro brilhante
  ctx.fillStyle = '#e8b84a';
  ctx.beginPath(); ctx.arc(705, 310, 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(730, 305, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(755, 310, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#8a7a50';
  ctx.font = '8px Courier New';
  ctx.fillText('TESOUROS', 690, 280);

  // --- VOLTAR CORREDOR (30, 520, 130, 50) ---
  ctx.fillStyle = '#14100a';
  ctx.fillRect(35, 525, 125, 45);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(35, 525, 125, 45);
  ctx.fillStyle = '#8a7a50';
  ctx.font = '10px Courier New';
  ctx.fillText('← Corredor', 45, 552);
}

function renderCam_Atmosfera(ctx) {
  // Brilho místico do sarcófago
  ctx.save();
  ctx.globalAlpha = 0.025;
  ctx.fillStyle = '#e8b84a';
  ctx.beginPath();
  ctx.moveTo(450, 155); ctx.lineTo(350, 500); ctx.lineTo(550, 500);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function renderCam_Overlay(ctx) {
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 500);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.6, 'rgba(10, 8, 4, 0.3)');
  vignette.addColorStop(1, 'rgba(10, 8, 4, 0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = 'rgba(15, 12, 5, 0.05)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// Ambiente ANTECÂMARA:
//   estela:          (100, 100, 130, 220)
//   altar:           (350, 200, 200, 120)
//   muralAnubis:     (650, 80, 150, 250)
//   passagemCorredr: (380, 400, 140, 100)
//   voltarSaida:     (30, 520, 120, 50)
//
// Ambiente CORREDOR:
//   armadilha:      (300, 250, 300, 100)
//   relevo:         (250, 130, 400, 100)
//   nicho:          (650, 200, 100, 150)
//   portaCamara:    (400, 400, 100, 120)
//   voltarAntecam:  (30, 520, 130, 50)
//
// Ambiente CÂMARA:
//   sarcofago:      (350, 150, 200, 280)
//   painelMecanismo:(100, 300, 180, 150)
//   tesouros:       (650, 250, 150, 180)
//   voltarCorredor: (30, 520, 130, 50)
