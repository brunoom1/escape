/**
 * @module Sala8Render
 * @version 3.0.0
 * @description Renderização cinematográfica da Sala 8 — Pirâmide de Khufu
 * Ambientes: Antecâmara, Corredor, Câmara
 * Paleta: ThemeEgypt — bg #0d0a06, accent #d4a843, border #3d3010
 */

const ANTE_STONES = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 7; col++) {
    ANTE_STONES.push({ x: col * 130 + (row % 2) * 65, y: row * 60 + 10, w: 125, h: 55 });
  }
}
const CORR_TORCHES = [{x:220,y:150},{x:680,y:150},{x:220,y:380},{x:680,y:380}];

// ============ ANTECÂMARA ============

function renderAntecamara(ctx, state) {
  const t = Date.now();
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0d0a06');
  grad.addColorStop(0.3, '#14100a');
  grad.addColorStop(0.7, '#100c08');
  grad.addColorStop(1, '#0a0806');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);

  // Stone block walls
  ctx.fillStyle = '#1a1408';
  ctx.fillRect(0, 0, 900, 480);
  ctx.strokeStyle = '#241a0c';
  ctx.lineWidth = 0.5;
  for (const s of ANTE_STONES) {
    if (s.x < 900 && s.y < 480) ctx.strokeRect(s.x, s.y, s.w, s.h);
  }
  ctx.lineWidth = 1;

  // Stone floor
  const floorGrad = ctx.createLinearGradient(0, 480, 0, 600);
  floorGrad.addColorStop(0, '#14100a');
  floorGrad.addColorStop(1, '#0a0806');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 480, 900, 120);
  ctx.strokeStyle = '#3d3010';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 480); ctx.lineTo(900, 480); ctx.stroke();
  ctx.lineWidth = 1;

  // Torches with sin-based flicker
  const flicker = Math.sin(t / 250) * 0.3 + 0.7;
  // Left torch
  ctx.fillStyle = '#3d2a10';
  ctx.fillRect(142, 160, 16, 80);
  ctx.fillStyle = `rgba(232,160,50,${flicker})`;
  ctx.beginPath(); ctx.ellipse(150, 155, 8, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = `rgba(255,204,0,${flicker * 0.8})`;
  ctx.beginPath(); ctx.ellipse(150, 152, 4, 6, 0, 0, Math.PI * 2); ctx.fill();
  // Right torch
  ctx.fillStyle = '#3d2a10';
  ctx.fillRect(742, 160, 16, 80);
  ctx.fillStyle = `rgba(232,160,50,${flicker})`;
  ctx.beginPath(); ctx.ellipse(750, 155, 8, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = `rgba(255,204,0,${flicker * 0.8})`;
  ctx.beginPath(); ctx.ellipse(750, 152, 4, 6, 0, 0, Math.PI * 2); ctx.fill();
  // Torch glow
  const tGlow1 = ctx.createRadialGradient(150, 160, 5, 150, 160, 150);
  tGlow1.addColorStop(0, `rgba(232,160,50,${0.1 * flicker})`);
  tGlow1.addColorStop(1, 'transparent');
  ctx.fillStyle = tGlow1;
  ctx.fillRect(0, 50, 300, 350);
  const tGlow2 = ctx.createRadialGradient(750, 160, 5, 750, 160, 150);
  tGlow2.addColorStop(0, `rgba(232,160,50,${0.1 * flicker})`);
  tGlow2.addColorStop(1, 'transparent');
  ctx.fillStyle = tGlow2;
  ctx.fillRect(600, 50, 300, 350);

  // Rosetta stone panel
  ctx.fillStyle = '#1a1408';
  ctx.fillRect(60, 80, 180, 280);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(60, 80, 180, 280);
  ctx.fillStyle = '#d4a84388';
  ctx.font = '14px serif';
  ctx.fillText('\u{1F319} \u{1F4A7} \u{1F525}', 80, 130);
  ctx.fillText('\u{2600} \u{1F3D4} \u{1F4A8}', 80, 165);
  ctx.fillText('\u{1F331} \u{1F480}', 80, 200);
  ctx.fillStyle = '#d4a843';
  ctx.font = '9px Georgia';
  ctx.fillText('Sol = \u2600\uFE0F', 80, 240);
  ctx.fillText('\u00C1gua = \u{1F4A7}', 80, 258);
  ctx.fillText('Terra = \u{1F3D4}\uFE0F', 80, 276);
  ctx.fillText('Vida = \u{1F331}', 80, 294);
  ctx.fillStyle = '#8a7a50';
  ctx.font = '8px Georgia';
  ctx.fillText('(os demais...)', 80, 320);
  ctx.fillText('permanecem ocultos', 80, 335);

  // Papyrus fragments
  if (!state.get('fragmento1')) {
    ctx.fillStyle = '#3d2a10';
    ctx.fillRect(380, 420, 140, 60);
    ctx.strokeStyle = '#5a4a30';
    ctx.strokeRect(380, 420, 140, 60);
    ctx.fillStyle = '#d4a84388';
    ctx.font = '8px Georgia';
    ctx.fillText('fragmento de papiro', 393, 455);
  }

  // Canopic jars
  ctx.fillStyle = '#2a1a0a';
  for (let i = 0; i < 4; i++) {
    const jx = 620 + i * 40;
    ctx.beginPath(); ctx.ellipse(jx, 440, 14, 25, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#d4a84344';
    ctx.beginPath(); ctx.ellipse(jx, 440, 14, 25, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#d4a84366';
    ctx.beginPath(); ctx.ellipse(jx, 415, 8, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#2a1a0a';
  }

  // Passage to corredor
  ctx.fillStyle = '#0a0806';
  ctx.fillRect(785, 200, 80, 200);
  ctx.strokeStyle = state.get('temTocha') ? '#d4a843' : '#3d3010';
  ctx.lineWidth = 2;
  ctx.strokeRect(785, 200, 80, 200);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a50';
  ctx.font = '9px Georgia';
  ctx.fillText('CORREDOR \u2192', 795, 305);

  // Torch on wall (collectible)
  if (!state.get('temTocha')) {
    ctx.fillStyle = '#3d2a10';
    ctx.fillRect(440, 100, 12, 60);
    ctx.fillStyle = '#e8a030';
    ctx.beginPath(); ctx.ellipse(446, 95, 7, 10, 0, 0, Math.PI * 2); ctx.fill();
  }

  // Dust atmosphere
  ctx.save();
  ctx.globalAlpha = 0.015;
  ctx.fillStyle = '#d4a843';
  const driftY = Math.sin(t / 4000) * 30;
  ctx.beginPath(); ctx.arc(450, 300 + driftY, 120, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // Vignette
  const vig = ctx.createRadialGradient(450, 300, 100, 450, 300, 500);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(0.7, 'rgba(10, 8, 4, 0.3)');
  vig.addColorStop(1, 'rgba(10, 8, 4, 0.65)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ CORREDOR ============

function renderCorredor(ctx, state) {
  const t = Date.now();
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0806');
  grad.addColorStop(0.5, '#0e0c08');
  grad.addColorStop(1, '#080604');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);

  // Narrow perspective (converging walls)
  ctx.fillStyle = '#14100a';
  ctx.fillRect(0, 0, 900, 600);
  ctx.fillStyle = '#1a1408';
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(200, 80); ctx.lineTo(200, 520); ctx.lineTo(0, 600);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(900, 0); ctx.lineTo(700, 80); ctx.lineTo(700, 520); ctx.lineTo(900, 600);
  ctx.closePath(); ctx.fill();
  // Perspective lines
  ctx.strokeStyle = '#241a0c';
  ctx.beginPath(); ctx.moveTo(200, 80); ctx.lineTo(700, 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(200, 520); ctx.lineTo(700, 520); ctx.stroke();
  // Ceiling & floor
  ctx.fillStyle = '#0e0c08';
  ctx.fillRect(200, 80, 500, 30);
  ctx.fillStyle = '#100c06';
  ctx.fillRect(200, 490, 500, 30);

  // Floor tiles with hieroglyphs
  ctx.strokeStyle = '#3d301044';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.strokeRect(220 + i * 78, 395 + j * 40, 74, 36);
    }
  }

  // Torches
  for (const tc of CORR_TORCHES) {
    const fl = Math.sin(t / 200 + tc.x * 0.1) * 0.3 + 0.7;
    ctx.fillStyle = '#3d2a10';
    ctx.fillRect(tc.x - 4, tc.y, 8, 50);
    ctx.fillStyle = `rgba(232,160,50,${fl})`;
    ctx.beginPath(); ctx.ellipse(tc.x, tc.y - 5, 6, 10, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(255,204,0,${fl * 0.8})`;
    ctx.beginPath(); ctx.ellipse(tc.x, tc.y - 8, 3, 5, 0, 0, Math.PI * 2); ctx.fill();
    const glow = ctx.createRadialGradient(tc.x, tc.y, 3, tc.x, tc.y, 80);
    glow.addColorStop(0, `rgba(232, 150, 40, ${0.08 * fl})`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(tc.x - 80, tc.y - 80, 160, 160);
  }

  // Mural panels on walls
  // Left mural
  ctx.fillStyle = '#1a1408';
  ctx.fillRect(50, 120, 140, 220);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(50, 120, 140, 220);
  ctx.fillStyle = '#d4a84366';
  ctx.font = '16px serif';
  ctx.fillText('\u2600\uFE0F \u2194 \u{1F319}', 75, 200);
  ctx.fillText('\u{1F4A7} \u2194 \u{1F525}', 75, 240);

  // Right mural
  ctx.fillStyle = '#1a1408';
  ctx.fillRect(710, 120, 140, 220);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(710, 120, 140, 220);
  ctx.fillStyle = '#d4a84366';
  ctx.font = '16px serif';
  ctx.fillText('\u{1F3D4}\uFE0F \u2194 \u{1F4A8}', 730, 200);
  ctx.fillText('\u{1F331} \u2194 \u{1F480}', 730, 240);

  // Inscription on ceiling (fragmento2)
  ctx.fillStyle = '#d4a84344';
  ctx.font = '10px Georgia';
  ctx.fillText('\u{1F4DC} inscri\u00E7\u00E3o no teto...', 350, 100);

  // Door to Câmara
  ctx.fillStyle = '#0e0a06';
  ctx.fillRect(405, 395, 90, 120);
  ctx.strokeStyle = state.get('tilesResolvido') ? '#d4a843' : '#3d3010';
  ctx.lineWidth = 2;
  ctx.strokeRect(405, 395, 90, 120);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a7a50';
  ctx.font = '9px Georgia';
  ctx.fillText('C\u00C2MARA \u2192', 415, 460);

  // Back to Antecâmara
  ctx.fillStyle = '#14100a';
  ctx.fillRect(35, 535, 125, 40);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(35, 535, 125, 40);
  ctx.fillStyle = '#8a7a50';
  ctx.font = '10px Georgia';
  ctx.fillText('\u2190 Antec\u00E2mara', 42, 560);

  // Vignette
  const vig2 = ctx.createRadialGradient(450, 300, 80, 450, 300, 480);
  vig2.addColorStop(0, 'transparent');
  vig2.addColorStop(0.6, 'rgba(8, 6, 3, 0.3)');
  vig2.addColorStop(1, 'rgba(8, 6, 3, 0.7)');
  ctx.fillStyle = vig2;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ CÂMARA DO FARAÓ ============

function renderCamara(ctx, state) {
  const t = Date.now();
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0806');
  grad.addColorStop(0.3, '#12100a');
  grad.addColorStop(0.7, '#0e0c08');
  grad.addColorStop(1, '#080604');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);

  // Grand chamber walls
  ctx.fillStyle = '#14100a';
  ctx.fillRect(0, 0, 900, 500);
  ctx.strokeStyle = '#241a0c';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 5; i++) ctx.strokeRect(i * 180 + 10, 25, 170, 470);
  ctx.lineWidth = 1;
  // Floor
  ctx.fillStyle = '#100c06';
  ctx.fillRect(0, 500, 900, 100);
  ctx.strokeStyle = '#3d3010';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 500); ctx.lineTo(900, 500); ctx.stroke();
  ctx.lineWidth = 1;

  // Central mystical glow
  const cGlow = ctx.createRadialGradient(450, 300, 30, 450, 300, 350);
  cGlow.addColorStop(0, 'rgba(212, 164, 67, 0.06)');
  cGlow.addColorStop(0.5, 'rgba(200, 150, 50, 0.02)');
  cGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = cGlow;
  ctx.fillRect(100, 0, 700, 600);

  // Gold sarcophagus with mask
  const sarcGrad = ctx.createLinearGradient(350, 80, 550, 80);
  sarcGrad.addColorStop(0, '#2a2010');
  sarcGrad.addColorStop(0.5, '#3d3018');
  sarcGrad.addColorStop(1, '#2a2010');
  ctx.fillStyle = sarcGrad;
  ctx.fillRect(355, 85, 190, 180);
  ctx.strokeStyle = '#d4a843';
  ctx.lineWidth = 2;
  ctx.strokeRect(355, 85, 190, 180);
  ctx.lineWidth = 1;
  // Mask
  ctx.fillStyle = '#d4a84388';
  ctx.beginPath(); ctx.ellipse(450, 155, 35, 50, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d4a843';
  ctx.beginPath(); ctx.ellipse(450, 155, 35, 50, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#1565c0';
  ctx.beginPath(); ctx.ellipse(438, 148, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(462, 148, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d4a843';
  ctx.beginPath(); ctx.moveTo(415, 115); ctx.lineTo(450, 100); ctx.lineTo(485, 115); ctx.stroke();

  // Central altar with 5 circular slots
  ctx.fillStyle = '#1a1408';
  ctx.fillRect(280, 320, 340, 140);
  ctx.strokeStyle = '#d4a843';
  ctx.lineWidth = 2;
  ctx.strokeRect(280, 320, 340, 140);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#d4a843';
  ctx.font = '10px Georgia';
  ctx.fillText('ALTAR DA CRIA\u00C7\u00C3O', 390, 345);
  // 5 slots
  for (let i = 0; i < 5; i++) {
    const sx = 320 + i * 58;
    ctx.strokeStyle = '#d4a84388';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(sx, 400, 18, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#0a0806';
    ctx.beginPath(); ctx.arc(sx, 400, 16, 0, Math.PI * 2); ctx.fill();
    ctx.lineWidth = 1;
    // Slot number
    ctx.fillStyle = '#d4a84344';
    ctx.font = '8px Georgia';
    ctx.fillText((i + 1).toString(), sx - 3, 430);
  }

  // Jewels in walls
  const jewels = [
    {x:200,y:200,c:'#d4a843'},{x:700,y:180,c:'#1565c0'},
    {x:150,y:350,c:'#c62828'},{x:750,y:340,c:'#2e7d32'}
  ];
  for (const j of jewels) {
    const jb = 0.4 + Math.sin(t / 1200 + j.x * 0.01) * 0.2;
    ctx.fillStyle = j.c + '66';
    ctx.beginPath(); ctx.arc(j.x, j.y, 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(212,164,67,${jb})`;
    ctx.beginPath(); ctx.arc(j.x, j.y, 5, 0, Math.PI * 2); ctx.stroke();
  }

  // Cartouche
  ctx.strokeStyle = '#d4a84366';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(450, 50, 60, 20, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#d4a84388';
  ctx.font = '12px serif';
  ctx.fillText('\u{1F3D4} \u{1F4A7} \u{1F331}', 420, 55);
  ctx.lineWidth = 1;

  // Fragment 3 (tábua de pedra)
  if (!state.get('fragmento3')) {
    ctx.fillStyle = '#1a1408';
    ctx.fillRect(660, 420, 140, 60);
    ctx.strokeStyle = '#3d3010';
    ctx.strokeRect(660, 420, 140, 60);
    ctx.fillStyle = '#8a7a50';
    ctx.font = '8px Georgia';
    ctx.fillText('t\u00E1bua de pedra', 680, 455);
  }

  // Back to Corredor
  ctx.fillStyle = '#14100a';
  ctx.fillRect(35, 535, 125, 40);
  ctx.strokeStyle = '#3d3010';
  ctx.strokeRect(35, 535, 125, 40);
  ctx.fillStyle = '#8a7a50';
  ctx.font = '10px Georgia';
  ctx.fillText('\u2190 Corredor', 50, 560);

  // Vignette
  const vig3 = ctx.createRadialGradient(450, 300, 100, 450, 300, 500);
  vig3.addColorStop(0, 'transparent');
  vig3.addColorStop(0.6, 'rgba(10, 8, 4, 0.3)');
  vig3.addColorStop(1, 'rgba(10, 8, 4, 0.65)');
  ctx.fillStyle = vig3;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// Ambiente ANTECÂMARA:
//   rosetta:         (55, 75, 190, 290)
//   tocha:           (430, 85, 40, 80)
//   fragmento1:      (375, 415, 150, 70)
//   vasos:           (600, 410, 180, 70)
//   passagemCorredor:(780, 195, 90, 215)
//
// Ambiente CORREDOR:
//   muralEsq:       (45, 115, 150, 230)
//   muralDir:       (705, 115, 150, 230)
//   fragmento2:     (320, 85, 260, 30)
//   tiles:          (220, 390, 460, 125)
//   portaCamara:    (400, 390, 100, 130)
//   voltarAnte:     (30, 530, 130, 45)
//
// Ambiente CÂMARA:
//   altar:          (275, 315, 350, 150)
//   sarcofago:      (350, 80, 200, 190)
//   fragmento3:     (655, 415, 150, 70)
//   voltarCorredor: (30, 530, 130, 45)
