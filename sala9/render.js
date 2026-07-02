/**
 * @module Sala9Render
 * @version 3.0.0
 * @description Renderização cinematográfica da Sala 9 — Bunker da Guerra Fria
 * Ambientes: Escritório, Comunicações, Arquivos
 * Paleta: ThemeColdWar — bg #0a0a0c, accent #c62828, border #2a2a3a
 */

const BUNKER_CRACKS = [
  {x1:150,y1:100,x2:160,y2:140},{x1:400,y1:50,x2:405,y2:90},
  {x1:700,y1:80,x2:710,y2:120},{x1:250,y1:350,x2:260,y2:380}
];
const COMM_LIGHTS = [{x:150,y:20},{x:450,y:20},{x:750,y:20}];

// ============ ESCRITÓRIO ============

function renderEscritorio(ctx, state) {
  const t = Date.now();
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0a0c');
  grad.addColorStop(0.4, '#0c0c10');
  grad.addColorStop(0.8, '#0a0a0e');
  grad.addColorStop(1, '#08080a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);

  // Concrete brutalist walls
  ctx.fillStyle = '#141418';
  ctx.fillRect(0, 0, 900, 460);
  ctx.strokeStyle = '#1a1a20';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath(); ctx.moveTo(0, i * 80 + 40); ctx.lineTo(900, i * 80 + 40); ctx.stroke();
  }
  for (let i = 0; i < 8; i++) {
    ctx.beginPath(); ctx.moveTo(i * 120 + 30, 0); ctx.lineTo(i * 120 + 30, 460); ctx.stroke();
  }
  ctx.lineWidth = 1;
  // Cracks
  ctx.strokeStyle = 'rgba(30, 30, 40, 0.3)';
  ctx.lineWidth = 0.5;
  for (const c of BUNKER_CRACKS) {
    ctx.beginPath(); ctx.moveTo(c.x1, c.y1); ctx.lineTo(c.x2, c.y2); ctx.stroke();
  }
  ctx.lineWidth = 1;

  // Floor
  const floorGrad = ctx.createLinearGradient(0, 460, 0, 600);
  floorGrad.addColorStop(0, '#121218');
  floorGrad.addColorStop(1, '#0a0a0e');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 460, 900, 140);
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 460); ctx.lineTo(900, 460); ctx.stroke();
  ctx.lineWidth = 1;

  // Soviet red stripe
  ctx.fillStyle = '#c6282833';
  ctx.fillRect(0, 0, 900, 5);

  // Tungsten lamp
  const flick = Math.sin(t / 2000) * 0.01;
  ctx.fillStyle = '#2a2a30';
  ctx.fillRect(445, 5, 10, 15);
  ctx.fillStyle = 'rgba(200, 180, 100, 0.5)';
  ctx.beginPath(); ctx.arc(450, 22, 6, 0, Math.PI * 2); ctx.fill();
  const bulbGlow = ctx.createRadialGradient(450, 20, 5, 450, 20, 300);
  bulbGlow.addColorStop(0, `rgba(200, 180, 100, ${0.06 + flick})`);
  bulbGlow.addColorStop(0.4, 'rgba(180, 160, 80, 0.02)');
  bulbGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = bulbGlow;
  ctx.fillRect(150, 0, 600, 400);

  // Soviet propaganda poster with star
  ctx.fillStyle = '#c6282844';
  ctx.fillRect(50, 20, 100, 70);
  ctx.strokeStyle = '#c62828';
  ctx.strokeRect(50, 20, 100, 70);
  ctx.fillStyle = '#e8b84a88';
  ctx.font = '24px serif';
  ctx.fillText('\u2606', 82, 65);
  ctx.fillStyle = '#c8c8d0';
  ctx.font = '6px Courier New';
  ctx.fillText('REVOLUÇÃO', 67, 82);

  // Heavy desk
  const mesaGrad = ctx.createLinearGradient(250, 250, 250, 380);
  mesaGrad.addColorStop(0, '#2a2a30');
  mesaGrad.addColorStop(1, '#1a1a20');
  ctx.fillStyle = mesaGrad;
  ctx.fillRect(255, 260, 270, 110);
  ctx.strokeStyle = '#3a3a40';
  ctx.strokeRect(255, 260, 270, 110);
  ctx.fillStyle = '#1a1a20';
  ctx.fillRect(265, 370, 8, 80);
  ctx.fillRect(507, 370, 8, 80);

  // Burned documents on desk
  ctx.fillStyle = '#d4d0c0';
  ctx.fillRect(280, 270, 80, 50);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(280, 305, 80, 15); // burned edge
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 7px Courier New';
  ctx.fillText('CIFRA:', 285, 285);
  ctx.fillStyle = '#333';
  ctx.font = '7px Courier New';
  ctx.fillText('deslocamento', 285, 296);
  ctx.fillText('triplo', 285, 306);

  // Calendar "1962"
  ctx.fillStyle = '#f5f0e0';
  ctx.fillRect(680, 60, 80, 90);
  ctx.strokeStyle = '#c62828';
  ctx.strokeRect(680, 60, 80, 90);
  ctx.fillStyle = '#c62828';
  ctx.fillRect(680, 60, 80, 20);
  ctx.fillStyle = '#f5f0e0';
  ctx.font = 'bold 8px Courier New';
  ctx.fillText('OUTUBRO', 695, 74);
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 22px Courier New';
  ctx.fillText('1962', 690, 120);

  // Safe
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(55, 180, 110, 130);
  const cofreGrad = ctx.createLinearGradient(55, 180, 165, 310);
  cofreGrad.addColorStop(0, '#2a2a2a');
  cofreGrad.addColorStop(0.5, '#1a1a1a');
  cofreGrad.addColorStop(1, '#0a0a0a');
  ctx.fillStyle = cofreGrad;
  ctx.fillRect(60, 185, 100, 120);
  ctx.strokeStyle = '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(55, 180, 110, 130);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#333';
  ctx.beginPath(); ctx.arc(110, 245, 18, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(110, 245, 18, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;

  // Desk drawer area (gaveta)
  ctx.fillStyle = '#1a1a20';
  ctx.fillRect(380, 275, 120, 40);
  ctx.strokeStyle = '#3a3a40';
  ctx.strokeRect(380, 275, 120, 40);
  ctx.fillStyle = '#4a4a5a';
  ctx.fillRect(425, 293, 30, 4);

  // Door to Comunicações
  ctx.fillStyle = '#0c0c10';
  ctx.fillRect(785, 200, 70, 200);
  ctx.strokeStyle = state.get('chaveColetada') ? '#4caf50' : '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.strokeRect(785, 200, 70, 200);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '9px Courier New';
  ctx.fillText('COMM \u2192', 798, 305);

  // Heating pipe
  ctx.fillStyle = '#2a2a30';
  ctx.fillRect(870, 50, 12, 400);

  // Vignette
  const vig = ctx.createRadialGradient(450, 300, 130, 450, 300, 530);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(0.7, 'rgba(5, 5, 8, 0.25)');
  vig.addColorStop(1, 'rgba(5, 5, 8, 0.6)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ SALA DE COMUNICAÇÕES ============

function renderComunicacoes(ctx, state) {
  const t = Date.now();
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#080810');
  grad.addColorStop(0.5, '#0c0c14');
  grad.addColorStop(1, '#08080c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);

  // Metal panel walls
  ctx.fillStyle = '#10101a';
  ctx.fillRect(0, 0, 900, 470);
  ctx.strokeStyle = '#2a2a3a';
  for (let i = 0; i < 5; i++) ctx.strokeRect(i * 180 + 10, 10, 170, 455);
  // Floor
  ctx.fillStyle = '#0c0c10';
  ctx.fillRect(0, 470, 900, 130);
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(900, 470); ctx.stroke();
  ctx.lineWidth = 1;

  // Fluorescent lights
  for (const l of COMM_LIGHTS) {
    ctx.fillStyle = 'rgba(180, 200, 220, 0.12)';
    ctx.fillRect(l.x - 40, l.y, 80, 4);
    const glow = ctx.createRadialGradient(l.x, l.y, 5, l.x, l.y, 200);
    glow.addColorStop(0, 'rgba(180, 200, 220, 0.04)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(l.x - 200, 0, 400, 300);
  }
  // Third lamp flicker
  const fl3 = Math.sin(t / 100) > 0.8 ? 0.08 : 0;
  ctx.fillStyle = `rgba(180, 200, 220, ${fl3})`;
  ctx.fillRect(650, 0, 200, 100);

  // Radio equipment with dials
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(105, 105, 240, 180);
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.strokeRect(105, 105, 240, 180);
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = '#1a1a20';
    ctx.beginPath(); ctx.arc(160 + i * 60, 180, 20, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4a4a5a';
    ctx.beginPath(); ctx.arc(160 + i * 60, 180, 20, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#c62828';
    const angle = -0.8 + Math.sin(t / 1500 + i) * 0.3;
    ctx.beginPath();
    ctx.moveTo(160 + i * 60, 180);
    ctx.lineTo(160 + i * 60 + Math.cos(angle) * 14, 180 + Math.sin(angle) * 14);
    ctx.stroke();
  }
  // Frequency display
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(130, 225, 180, 30);
  ctx.fillStyle = '#4caf50';
  ctx.font = '11px Courier New';
  ctx.fillText('FREQ: ___._ MHz', 140, 245);

  // VU meters (sin-based)
  const vu = Math.sin(t / 300) * 0.3 + 0.5;
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(130, 260, 180 * vu, 8);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(130, 260, 180, 8);

  // Vacuum tubes glowing orange (sin-based)
  for (let i = 0; i < 4; i++) {
    const tx = 130 + i * 55;
    const glow = 0.3 + Math.sin(t / 800 + i * 1.2) * 0.15;
    ctx.fillStyle = '#1a1a10';
    ctx.fillRect(tx, 100, 18, 40);
    ctx.fillStyle = `rgba(255, 140, 40, ${glow})`;
    ctx.beginPath(); ctx.ellipse(tx + 9, 115, 6, 14, 0, 0, Math.PI * 2); ctx.fill();
  }

  // Enigma-style machine
  ctx.fillStyle = '#141418';
  ctx.fillRect(455, 155, 190, 150);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(455, 155, 190, 150);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(480, 180, 140, 80);
  ctx.strokeStyle = '#4a4a5a';
  ctx.strokeRect(480, 180, 140, 80);
  // Rotors
  ctx.fillStyle = '#3a3a40';
  ctx.beginPath(); ctx.arc(520, 215, 12, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(555, 215, 12, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(590, 215, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#c8c8d0';
  ctx.font = '8px Courier New';
  ctx.fillText('A', 517, 218); ctx.fillText('M', 552, 218); ctx.fillText('X', 587, 218);
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '9px Courier New';
  ctx.fillText('CIFRA M4', 510, 285);

  // DEFCON clock
  ctx.fillStyle = '#0a0a10';
  ctx.fillRect(400, 30, 100, 40);
  ctx.strokeStyle = '#c62828';
  ctx.strokeRect(400, 30, 100, 40);
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 14px Courier New';
  ctx.fillText('23:57', 418, 57);
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '7px Courier New';
  ctx.fillText('DOOMSDAY CLOCK', 410, 42);

  // Red alert panel
  const alertPulse = Math.sin(t / 700) * 0.5 + 0.5;
  ctx.fillStyle = '#0a0a10';
  ctx.fillRect(355, 370, 190, 80);
  ctx.strokeStyle = `rgba(198, 40, 40, ${0.4 + alertPulse * 0.4})`;
  ctx.lineWidth = 2;
  ctx.strokeRect(355, 370, 190, 80);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 11px Courier New';
  ctx.fillText('\u26A0 DEFCON 2', 400, 400);
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '9px Courier New';
  ctx.fillText('Status: ELEVADO', 385, 430);

  // "5 LETRAS" hint on wall
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(680, 100, 130, 50);
  ctx.strokeStyle = '#4a4a5a';
  ctx.strokeRect(680, 100, 130, 50);
  ctx.fillStyle = '#c8c8d0';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText('C\u00D3DIGO DE FUGA:', 690, 118);
  ctx.fillText('5 LETRAS', 710, 138);

  // Door to Arquivos
  ctx.fillStyle = '#0c0c10';
  ctx.fillRect(785, 300, 70, 150);
  ctx.strokeStyle = state.get('cadeadoAberto') ? '#4caf50' : '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.strokeRect(785, 300, 70, 150);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '8px Courier New';
  ctx.fillText('ARQUIVOS \u2192', 790, 380);

  // Back to Escritório
  ctx.fillStyle = '#10101a';
  ctx.fillRect(35, 525, 130, 45);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(35, 525, 130, 45);
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '10px Courier New';
  ctx.fillText('\u2190 Escrit\u00F3rio', 42, 552);

  // Vignette
  const vig2 = ctx.createRadialGradient(450, 300, 120, 450, 300, 530);
  vig2.addColorStop(0, 'transparent');
  vig2.addColorStop(0.7, 'rgba(5, 5, 10, 0.25)');
  vig2.addColorStop(1, 'rgba(5, 5, 10, 0.6)');
  ctx.fillStyle = vig2;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ SALA DE ARQUIVOS ============

function renderArquivos(ctx, state) {
  const t = Date.now();
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a0a0e');
  grad.addColorStop(0.5, '#0e0e14');
  grad.addColorStop(1, '#08080c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);

  // Metal filing cabinet walls
  ctx.fillStyle = '#12121a';
  ctx.fillRect(0, 0, 900, 470);
  // Floor
  ctx.fillStyle = '#0c0c10';
  ctx.fillRect(0, 470, 900, 130);
  ctx.strokeStyle = '#2a2a3a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(900, 470); ctx.stroke();
  ctx.lineWidth = 1;

  // Filing cabinets left & right
  ctx.fillStyle = '#1a1a24';
  ctx.fillRect(30, 50, 180, 410);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(30, 50, 180, 410);
  ctx.fillStyle = '#1a1a24';
  ctx.fillRect(690, 50, 180, 410);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(690, 50, 180, 410);
  // Shelves
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = '#2a2a30';
    ctx.fillRect(35, 80 + i * 80, 170, 3);
    ctx.fillRect(695, 80 + i * 80, 170, 3);
  }
  // Archive boxes
  const boxColors = ['#2a2020', '#20202a', '#202a20', '#2a2a20', '#2a202a'];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.fillStyle = boxColors[(i + j) % 5];
      ctx.fillRect(40 + j * 55, 55 + i * 80, 50, 22);
      ctx.fillRect(700 + j * 55, 55 + i * 80, 50, 22);
    }
  }

  // Cold neon light
  ctx.fillStyle = 'rgba(150, 180, 220, 0.1)';
  ctx.fillRect(350, 10, 200, 4);
  const glow = ctx.createRadialGradient(450, 10, 10, 450, 10, 250);
  glow.addColorStop(0, 'rgba(150, 180, 220, 0.04)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(200, 0, 500, 350);

  // Microfilm reader
  ctx.fillStyle = '#141418';
  ctx.fillRect(280, 120, 150, 110);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(280, 120, 150, 110);
  ctx.strokeStyle = '#4a4a5a';
  ctx.beginPath(); ctx.arc(330, 170, 15, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(390, 170, 15, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#2a2a3a';
  ctx.beginPath(); ctx.moveTo(345, 170); ctx.lineTo(375, 170); ctx.stroke();
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '8px Courier New';
  ctx.fillText('MICROFILME', 310, 215);

  // Classified folders
  ctx.fillStyle = '#1a1a24';
  ctx.fillRect(500, 120, 160, 120);
  ctx.strokeStyle = '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(500, 120, 160, 120);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 9px Courier New';
  ctx.fillText('DOSSI\u00CA "CANAL ALFA"', 510, 145);
  // Folder tabs
  ctx.fillStyle = '#2a2a30';
  ctx.fillRect(510, 160, 50, 60);
  ctx.fillRect(575, 160, 50, 60);
  ctx.fillStyle = '#c8c8d0';
  ctx.font = '7px Courier New';
  ctx.fillText('FREQ', 520, 195);
  ctx.fillText('ROTAS', 585, 195);

  // Self-destruct panel (cosmetic)
  ctx.fillStyle = '#1a0a0a';
  ctx.fillRect(555, 350, 170, 90);
  ctx.strokeStyle = '#c62828';
  ctx.lineWidth = 2;
  ctx.strokeRect(555, 350, 170, 90);
  ctx.lineWidth = 1;
  ctx.fillStyle = '#c62828';
  ctx.beginPath(); ctx.arc(640, 395, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ff4444';
  ctx.beginPath(); ctx.arc(640, 395, 12, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#ffcc00';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(620, 380); ctx.lineTo(620, 373); ctx.lineTo(660, 373); ctx.lineTo(660, 380);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = '#c62828';
  ctx.font = 'bold 7px Courier New';
  ctx.fillText('AUTODESTRUI\u00C7\u00C3O', 585, 435);

  // Back to Comunicações
  ctx.fillStyle = '#10101a';
  ctx.fillRect(35, 525, 140, 45);
  ctx.strokeStyle = '#2a2a3a';
  ctx.strokeRect(35, 525, 140, 45);
  ctx.fillStyle = '#8a8a9a';
  ctx.font = '10px Courier New';
  ctx.fillText('\u2190 Comunic.', 50, 552);

  // Terminal glow
  ctx.fillStyle = 'rgba(76, 175, 80, 0.015)';
  ctx.fillRect(280, 120, 150, 110);
  // Self-destruct glow
  const pulse = Math.sin(t / 1000) * 0.01 + 0.01;
  ctx.fillStyle = `rgba(198, 40, 40, ${pulse})`;
  ctx.fillRect(555, 350, 170, 90);

  // Vignette
  const vig3 = ctx.createRadialGradient(450, 300, 100, 450, 300, 500);
  vig3.addColorStop(0, 'transparent');
  vig3.addColorStop(0.7, 'rgba(5, 5, 10, 0.3)');
  vig3.addColorStop(1, 'rgba(5, 5, 10, 0.65)');
  ctx.fillStyle = vig3;
  ctx.fillRect(0, 0, 900, 600);
}

// ============ TABELA DE POSIÇÕES ============
// Ambiente ESCRITÓRIO:
//   gaveta:         (375, 270, 130, 50)
//   calendario:     (675, 55, 90, 100)
//   documento:      (275, 265, 90, 60)
//   cofre:          (50, 175, 120, 140)
//   poster:         (45, 15, 110, 80)
//   portaComm:      (780, 195, 80, 210)
//
// Ambiente COMUNICAÇÕES:
//   radio:          (100, 100, 250, 180)
//   parede5letras:  (675, 95, 140, 60)
//   enigma:         (450, 150, 200, 160)
//   painelAlerta:   (350, 365, 200, 90)
//   portaArquivos:  (780, 295, 80, 160)
//   voltarEsc:      (30, 520, 140, 50)
//
// Ambiente ARQUIVOS:
//   microfilme:     (275, 115, 160, 120)
//   dossie:         (495, 115, 170, 130)
//   painelDestru:   (550, 345, 180, 100)
//   voltarComm:     (30, 520, 145, 50)
