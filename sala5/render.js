/**
 * @module Sala5Render
 * @version 2.0.0
 * @description Renderização cinematográfica da Sala 5 — O Submarino Afundado
 * Padrão: 8 camadas (bg, arquitetura, iluminação, detalhes, decoração, objetos, atmosfera, overlay)
 * Estilo: Submarino militar afundado, metal enferrujado, bioluminescência, pressão
 */

// ============ PRÉ-CÁLCULOS ============
const SUB_RIVETS_PROA = [
  [45,90],[120,88],[200,92],[280,87],[360,91],[440,89],[520,93],[600,88],[680,91],[760,90],
  [85,430],[165,432],[245,428],[325,431],[405,429],[485,433],[565,430],[645,428],[725,431],[805,430]
];
const SUB_RIVETS_MAQ = [
  [60,95],[140,92],[220,97],[300,93],[380,96],[460,94],[540,98],[620,93],[700,96],[780,95],
  [75,425],[155,427],[235,423],[315,426],[395,424],[475,428],[555,425],[635,423],[715,426],[795,424]
];
const SUB_RUST_PROA = [
  {x:120,y:150,w:35,h:18},{x:450,y:200,w:28,h:22},{x:680,y:320,w:40,h:15},
  {x:250,y:380,w:32,h:20},{x:780,y:140,w:25,h:16},{x:55,y:290,w:30,h:14}
];
const SUB_RUST_MAQ = [
  {x:100,y:180,w:38,h:20},{x:350,y:250,w:30,h:18},{x:600,y:150,w:42,h:16},
  {x:200,y:400,w:28,h:22},{x:720,y:300,w:35,h:14},{x:500,y:380,w:33,h:19}
];
const SUB_CONDENSATION = [
  {x:80,y:120,len:45},{x:220,y:95,len:60},{x:400,y:110,len:38},{x:560,y:130,len:52},
  {x:700,y:105,len:42},{x:150,y:200,len:35},{x:340,y:180,len:48},{x:620,y:190,len:40},
  {x:800,y:170,len:55},{x:50,y:250,len:30}
];
const SUB_SCRATCHES = [
  {x1:160,y1:300,x2:190,y2:315},{x1:400,y1:350,x2:425,y2:340},{x1:650,y1:280,x2:680,y2:295},
  {x1:300,y1:420,x2:330,y2:430},{x1:550,y1:370,x2:570,y2:385},{x1:100,y1:360,x2:135,y2:370}
];
const SUB_GRATING_GAPS = [22,67,112,157,202,247,292,337,382,427,472,517,562,607,652,697,742,787,832,877];

// ============ PROA (Ambiente 1) ============

function renderProa(ctx, state) {
  renderProa_Background(ctx);
  renderProa_Arquitetura(ctx);
  renderProa_Iluminacao(ctx, state);
  renderProa_Detalhes(ctx);
  renderProa_Decoracao(ctx);
  renderProa_Objetos(ctx, state);
  renderProa_Atmosfera(ctx);
  renderProa_Overlay(ctx);
}

// Camada 1: Background — gradiente oceânico profundo (4+ stops)
function renderProa_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#050d18');
  grad.addColorStop(0.25, '#0a1628');
  grad.addColorStop(0.55, '#0c1a30');
  grad.addColorStop(0.8, '#081422');
  grad.addColorStop(1, '#040a14');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — casco curvo com rebites, painéis metálicos, piso de grade
function renderProa_Arquitetura(ctx) {
  // Casco curvo superior
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.quadraticCurveTo(450, 50, 900, 100);
  ctx.lineTo(900, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fillStyle = '#0e1e35';
  ctx.fill();
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.quadraticCurveTo(450, 50, 900, 100);
  ctx.stroke();

  // Casco curvo inferior
  ctx.beginPath();
  ctx.moveTo(0, 440);
  ctx.quadraticCurveTo(450, 470, 900, 440);
  ctx.lineTo(900, 600);
  ctx.lineTo(0, 600);
  ctx.closePath();
  ctx.fillStyle = '#0b1520';
  ctx.fill();
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 440);
  ctx.quadraticCurveTo(450, 470, 900, 440);
  ctx.stroke();

  // Painéis metálicos verticais (divisórias internas)
  ctx.strokeStyle = '#142a42';
  ctx.lineWidth = 1.5;
  for (let i = 1; i < 6; i++) {
    const x = i * 150;
    ctx.beginPath();
    ctx.moveTo(x, 100);
    ctx.lineTo(x, 440);
    ctx.stroke();
  }

  // Piso de grade metálica com profundidade
  const grateGrad = ctx.createLinearGradient(0, 440, 0, 480);
  grateGrad.addColorStop(0, '#0e1a28');
  grateGrad.addColorStop(1, '#060e18');
  ctx.fillStyle = grateGrad;
  ctx.fillRect(0, 440, 900, 40);
  // Linhas da grade
  ctx.strokeStyle = '#1a3048';
  ctx.lineWidth = 1;
  for (const gx of SUB_GRATING_GAPS) {
    ctx.beginPath();
    ctx.moveTo(gx, 440);
    ctx.lineTo(gx, 480);
    ctx.stroke();
  }
  // Grade horizontal
  ctx.beginPath();
  ctx.moveTo(0, 455);
  ctx.lineTo(900, 455);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 468);
  ctx.lineTo(900, 468);
  ctx.stroke();

  // Rebites no casco
  ctx.fillStyle = '#2a4a6a';
  for (const [rx, ry] of SUB_RIVETS_PROA) {
    ctx.beginPath();
    ctx.arc(rx, ry, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Camada 3: Iluminação — lâmpada de emergência, bioluminescência, reflexos da água
function renderProa_Iluminacao(ctx, state) {
  // Lâmpada de emergência amarela (teto, centro-esquerda)
  const lampX = 250, lampY = 108;
  const lampGlow = ctx.createRadialGradient(lampX, lampY, 3, lampX, lampY, 180);
  lampGlow.addColorStop(0, 'rgba(255, 200, 50, 0.15)');
  lampGlow.addColorStop(0.3, 'rgba(255, 180, 30, 0.06)');
  lampGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = lampGlow;
  ctx.fillRect(lampX - 180, lampY - 50, 360, 300);

  // Corpo da lâmpada
  ctx.fillStyle = '#b89030';
  ctx.fillRect(lampX - 8, lampY - 12, 16, 10);
  ctx.fillStyle = '#ffe066';
  ctx.beginPath();
  ctx.arc(lampX, lampY + 2, 6, 0, Math.PI * 2);
  ctx.fill();

  // Bioluminescência vinda de fora (vigia lateral direita)
  const bioX = 780, bioY = 220;
  const bioGlow = ctx.createRadialGradient(bioX, bioY, 5, bioX, bioY, 120);
  bioGlow.addColorStop(0, 'rgba(79, 195, 247, 0.12)');
  bioGlow.addColorStop(0.5, 'rgba(40, 150, 200, 0.05)');
  bioGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = bioGlow;
  ctx.fillRect(bioX - 120, bioY - 120, 240, 240);

  // Reflexos ondulantes da água (sin-based)
  const t = Date.now() * 0.001;
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    for (let x = 0; x < 900; x += 10) {
      const y = 200 + i * 60 + Math.sin(x * 0.008 + t + i) * 12;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

// Camada 4: Detalhes — ferrugem, condensação, trilhas de água, arranhões
function renderProa_Detalhes(ctx) {
  // Manchas de ferrugem
  for (const r of SUB_RUST_PROA) {
    ctx.fillStyle = 'rgba(120, 60, 20, 0.25)';
    ctx.beginPath();
    ctx.ellipse(r.x + r.w / 2, r.y + r.h / 2, r.w / 2, r.h / 2, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(90, 40, 10, 0.15)';
    ctx.beginPath();
    ctx.ellipse(r.x + r.w / 2 + 3, r.y + r.h / 2 + 2, r.w / 3, r.h / 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Gotas de condensação e trilhas de água
  ctx.strokeStyle = 'rgba(79, 195, 247, 0.15)';
  ctx.lineWidth = 1;
  for (const c of SUB_CONDENSATION) {
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(c.x + 2, c.y + c.len);
    ctx.stroke();
    // Gota na ponta
    ctx.fillStyle = 'rgba(79, 195, 247, 0.2)';
    ctx.beginPath();
    ctx.arc(c.x + 2, c.y + c.len, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Arranhões no metal
  ctx.strokeStyle = 'rgba(100, 140, 180, 0.12)';
  ctx.lineWidth = 0.5;
  for (const s of SUB_SCRATCHES) {
    ctx.beginPath();
    ctx.moveTo(s.x1, s.y1);
    ctx.lineTo(s.x2, s.y2);
    ctx.stroke();
  }
}

// Camada 5: Decoração — radar, cabos, medidores, placas, tubulações
function renderProa_Decoracao(ctx) {
  // Tubulação superior (corre ao longo do teto)
  ctx.strokeStyle = '#1e3a55';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, 115);
  ctx.quadraticCurveTo(450, 85, 900, 115);
  ctx.stroke();
  ctx.strokeStyle = '#2a4a6a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 112);
  ctx.quadraticCurveTo(450, 82, 900, 112);
  ctx.stroke();

  // Tubulação vertical esquerda
  ctx.strokeStyle = '#1e3a55';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(30, 115);
  ctx.lineTo(30, 440);
  ctx.stroke();
  // Junções
  ctx.fillStyle = '#2a4a6a';
  ctx.beginPath(); ctx.arc(30, 200, 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(30, 320, 6, 0, Math.PI * 2); ctx.fill();

  // Cabos elétricos (direita)
  ctx.strokeStyle = '#1a2a3a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(850, 115); ctx.bezierCurveTo(855, 200, 845, 300, 850, 400); ctx.stroke();
  ctx.strokeStyle = '#2a1a1a';
  ctx.beginPath(); ctx.moveTo(860, 115); ctx.bezierCurveTo(865, 220, 855, 310, 860, 410); ctx.stroke();

  // Placa de identificação: "PROA — SEÇÃO B2"
  ctx.fillStyle = '#0c1a2a';
  ctx.fillRect(380, 105, 140, 24);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 1;
  ctx.strokeRect(380, 105, 140, 24);
  ctx.fillStyle = '#4fc3f7';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText('PROA — SEÇÃO B2', 392, 121);

  // Medidor de pressão decorativo (não interativo, parede esquerda)
  ctx.fillStyle = '#0c1820';
  ctx.beginPath(); ctx.arc(70, 260, 22, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#2a4a6a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(70, 260, 22, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(70, 260); ctx.lineTo(82, 248); ctx.stroke();
  ctx.fillStyle = '#3a6a8a';
  ctx.font = '7px Courier New';
  ctx.fillText('ATM', 58, 278);

  // Tela de radar (decorativa, canto superior direito)
  ctx.fillStyle = '#040c14';
  ctx.fillRect(750, 105, 80, 70);
  ctx.strokeStyle = '#1a3a5a';
  ctx.strokeRect(750, 105, 80, 70);
  // Varredura do radar
  ctx.strokeStyle = 'rgba(79, 195, 247, 0.3)';
  ctx.beginPath(); ctx.arc(790, 140, 25, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(790, 140, 15, 0, Math.PI * 2); ctx.stroke();
  const radarAngle = (Date.now() * 0.002) % (Math.PI * 2);
  ctx.strokeStyle = 'rgba(79, 195, 247, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(790, 140);
  ctx.lineTo(790 + Math.cos(radarAngle) * 25, 140 + Math.sin(radarAngle) * 25);
  ctx.stroke();
  ctx.lineWidth = 1;
}

// Camada 6: Objetos — brilhantes e distintos do fundo
function renderProa_Objetos(ctx, state) {
  // --- ARMÁRIO DE SUPRIMENTOS (contém a chave) ---
  const armX = 100, armY = 180, armW = 110, armH = 200;
  const armGrad = ctx.createLinearGradient(armX, armY, armX + armW, armY);
  armGrad.addColorStop(0, '#1a3048');
  armGrad.addColorStop(0.4, '#243d58');
  armGrad.addColorStop(1, '#1a3048');
  ctx.fillStyle = armGrad;
  ctx.fillRect(armX, armY, armW, armH);
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(armX, armY, armW, armH);
  // Portas do armário
  ctx.strokeStyle = '#2a5070';
  ctx.strokeRect(armX + 5, armY + 5, armW / 2 - 7, armH - 10);
  ctx.strokeRect(armX + armW / 2 + 2, armY + 5, armW / 2 - 7, armH - 10);
  // Puxadores
  ctx.fillStyle = '#6ab7e0';
  ctx.fillRect(armX + armW / 2 - 10, armY + armH / 2 - 3, 6, 6);
  ctx.fillRect(armX + armW / 2 + 4, armY + armH / 2 - 3, 6, 6);
  // Placa
  ctx.fillStyle = '#0c1a2a';
  ctx.fillRect(armX + 15, armY + armH - 30, armW - 30, 18);
  ctx.fillStyle = '#4fc3f7';
  ctx.font = '8px Courier New';
  ctx.fillText('SUPRIMENTOS', armX + 20, armY + armH - 16);
  // Estado: se chave já pega, porta entreaberta
  if (state.get('chaveObtida')) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(armX + 5, armY + 5, armW / 2 - 7, armH - 10);
  }

  // --- VIGIA (janela circular para o oceano) ---
  const vigX = 780, vigY = 220, vigR = 40;
  // Moldura metálica
  ctx.strokeStyle = '#3a6080';
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(vigX, vigY, vigR, 0, Math.PI * 2); ctx.stroke();
  // Vidro com gradiente oceânico
  const vigGrad = ctx.createRadialGradient(vigX, vigY, 0, vigX, vigY, vigR - 4);
  vigGrad.addColorStop(0, '#1a5a80');
  vigGrad.addColorStop(0.6, '#0a3050');
  vigGrad.addColorStop(1, '#051a30');
  ctx.fillStyle = vigGrad;
  ctx.beginPath(); ctx.arc(vigX, vigY, vigR - 4, 0, Math.PI * 2); ctx.fill();
  // Parafusos da vigia
  ctx.fillStyle = '#5a8aaa';
  const vigBolts = [[0,-1],[1,0],[0,1],[-1,0],[0.7,-0.7],[0.7,0.7],[-0.7,0.7],[-0.7,-0.7]];
  for (const [dx, dy] of vigBolts) {
    ctx.beginPath(); ctx.arc(vigX + dx * (vigR + 1), vigY + dy * (vigR + 1), 3, 0, Math.PI * 2); ctx.fill();
  }
  // Bioluminescência animada dentro da vigia
  const t = Date.now() * 0.001;
  ctx.fillStyle = `rgba(79, 195, 247, ${0.15 + Math.sin(t * 1.5) * 0.08})`;
  ctx.beginPath(); ctx.arc(vigX + Math.sin(t) * 10, vigY + Math.cos(t * 0.7) * 8, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = `rgba(100, 220, 255, ${0.1 + Math.sin(t * 2.2) * 0.05})`;
  ctx.beginPath(); ctx.arc(vigX - 12 + Math.sin(t * 1.3) * 6, vigY + 10 + Math.cos(t) * 5, 3, 0, Math.PI * 2); ctx.fill();

  // --- MANUAL DE OPERAÇÕES ---
  const manX = 420, manY = 340, manW = 100, manH = 70;
  const manGrad = ctx.createLinearGradient(manX, manY, manX, manY + manH);
  manGrad.addColorStop(0, '#2a4a3a');
  manGrad.addColorStop(0.5, '#1a3a2a');
  manGrad.addColorStop(1, '#0a2a1a');
  ctx.fillStyle = manGrad;
  ctx.fillRect(manX, manY, manW, manH);
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 1;
  ctx.strokeRect(manX, manY, manW, manH);
  // Páginas visíveis (lombada)
  ctx.fillStyle = '#d4e8d0';
  ctx.fillRect(manX + 2, manY + 5, 3, manH - 10);
  // Título na capa
  ctx.fillStyle = '#80c0a0';
  ctx.font = 'bold 9px Courier New';
  ctx.fillText('MANUAL', manX + 25, manY + 25);
  ctx.fillText('OPERAÇÕES', manX + 18, manY + 38);
  ctx.fillStyle = '#60a080';
  ctx.font = '7px Courier New';
  ctx.fillText('SUB-CLASSE IV', manX + 20, manY + 55);

  // --- PAINEL DE COMUNICAÇÃO (rádio quebrado) ---
  const radX = 580, radY = 150, radW = 130, radH = 100;
  const radGrad = ctx.createLinearGradient(radX, radY, radX + radW, radY + radH);
  radGrad.addColorStop(0, '#1a2a3a');
  radGrad.addColorStop(0.5, '#223848');
  radGrad.addColorStop(1, '#1a2a3a');
  ctx.fillStyle = radGrad;
  ctx.fillRect(radX, radY, radW, radH);
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(radX, radY, radW, radH);
  // Tela do rádio (estática)
  ctx.fillStyle = '#040a10';
  ctx.fillRect(radX + 10, radY + 10, radW - 20, 40);
  ctx.fillStyle = '#1a4a2a';
  ctx.font = '8px Courier New';
  ctx.fillText('SEM SINAL', radX + 30, radY + 35);
  // Botões
  ctx.fillStyle = '#3a5a7a';
  ctx.beginPath(); ctx.arc(radX + 30, radY + 75, 8, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(radX + 65, radY + 75, 8, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(radX + 100, radY + 75, 8, 0, Math.PI * 2); ctx.fill();
  // LED apagado
  ctx.fillStyle = '#4a1a1a';
  ctx.beginPath(); ctx.arc(radX + radW - 15, radY + 15, 4, 0, Math.PI * 2); ctx.fill();

  // --- ESCOTILHA (portão para Máquinas) ---
  const escX = 820, escY = 300, escW = 60, escH = 130;
  const escGrad = ctx.createLinearGradient(escX, escY, escX + escW, escY);
  escGrad.addColorStop(0, '#1a2a3a');
  escGrad.addColorStop(0.5, '#253d50');
  escGrad.addColorStop(1, '#1a2a3a');
  ctx.fillStyle = escGrad;
  ctx.fillRect(escX, escY, escW, escH);
  ctx.strokeStyle = state.get('chaveObtida') ? '#4fc3f7' : '#3a5a7a';
  ctx.lineWidth = 3;
  ctx.strokeRect(escX, escY, escW, escH);
  // Roda de travamento
  ctx.strokeStyle = state.get('chaveObtida') ? '#4fc3f7' : '#2a4a6a';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(escX + escW / 2, escY + escH / 2, 20, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(escX + escW / 2, escY + escH / 2 - 15); ctx.lineTo(escX + escW / 2, escY + escH / 2 + 15); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(escX + escW / 2 - 15, escY + escH / 2); ctx.lineTo(escX + escW / 2 + 15, escY + escH / 2); ctx.stroke();
  // Placa
  ctx.fillStyle = '#0c1a2a';
  ctx.fillRect(escX + 5, escY + escH - 25, escW - 10, 16);
  ctx.fillStyle = '#4fc3f7';
  ctx.font = '7px Courier New';
  ctx.fillText('MÁQUINAS', escX + 10, escY + escH - 13);
  // Fechadura
  ctx.fillStyle = state.get('chaveObtida') ? '#00ff88' : '#ff6644';
  ctx.beginPath(); ctx.arc(escX + escW / 2, escY + 20, 5, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 1;
}

// Camada 7: Atmosfera — nível de água subindo (sin-based, cosmético)
function renderProa_Atmosfera(ctx) {
  const t = Date.now() * 0.001;
  // Água no fundo (nível subindo lentamente — cosmético)
  const waterBase = 500 + Math.sin(t * 0.3) * 8;
  ctx.save();
  ctx.globalAlpha = 0.25;
  const waterGrad = ctx.createLinearGradient(0, waterBase, 0, 600);
  waterGrad.addColorStop(0, 'rgba(20, 80, 120, 0.0)');
  waterGrad.addColorStop(0.3, 'rgba(30, 100, 150, 0.3)');
  waterGrad.addColorStop(1, 'rgba(10, 50, 80, 0.5)');
  ctx.fillStyle = waterGrad;
  ctx.beginPath();
  ctx.moveTo(0, waterBase);
  for (let x = 0; x <= 900; x += 20) {
    const y = waterBase + Math.sin(x * 0.01 + t * 1.5) * 4 + Math.sin(x * 0.025 + t * 0.8) * 2;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(900, 600);
  ctx.lineTo(0, 600);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Reflexos de luz na superfície da água
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    for (let x = 0; x <= 900; x += 15) {
      const y = waterBase + 2 + Math.sin(x * 0.015 + t * 2 + i * 2) * 3;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

// Camada 8: Overlay — vinheta apertada + tonalidade azul
function renderProa_Overlay(ctx) {
  // Vinheta apertada
  const vignette = ctx.createRadialGradient(450, 300, 100, 450, 300, 480);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.6, 'rgba(0, 5, 20, 0.2)');
  vignette.addColorStop(1, 'rgba(0, 5, 20, 0.6)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);

  // Tom azul global
  ctx.fillStyle = 'rgba(10, 30, 60, 0.06)';
  ctx.fillRect(0, 0, 900, 600);
}

// ============ MÁQUINAS (Ambiente 2) ============

function renderMaquinas(ctx, state) {
  renderMaq_Background(ctx);
  renderMaq_Arquitetura(ctx);
  renderMaq_Iluminacao(ctx);
  renderMaq_Detalhes(ctx);
  renderMaq_Decoracao(ctx);
  renderMaq_Objetos(ctx, state);
  renderMaq_Atmosfera(ctx);
  renderMaq_Overlay(ctx);
}

// Camada 1: Background — gradiente industrial quente/frio
function renderMaq_Background(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 900, 600);
  grad.addColorStop(0, '#0a0e18');
  grad.addColorStop(0.3, '#0e1420');
  grad.addColorStop(0.6, '#12181e');
  grad.addColorStop(0.85, '#0c1018');
  grad.addColorStop(1, '#060a10');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 900, 600);
}

// Camada 2: Arquitetura — sala de máquinas com tubulações densas
function renderMaq_Arquitetura(ctx) {
  // Teto industrial (mais baixo, opressor)
  ctx.fillStyle = '#0b1520';
  ctx.fillRect(0, 0, 900, 90);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 90); ctx.lineTo(900, 90); ctx.stroke();

  // Piso de metal com grade
  const floorGrad = ctx.createLinearGradient(0, 450, 0, 600);
  floorGrad.addColorStop(0, '#101820');
  floorGrad.addColorStop(0.5, '#0a1018');
  floorGrad.addColorStop(1, '#050a10');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 450, 900, 150);
  ctx.strokeStyle = '#1a2a3a';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, 450); ctx.lineTo(900, 450); ctx.stroke();

  // Grade no piso
  ctx.strokeStyle = '#152535';
  ctx.lineWidth = 1;
  for (const gx of SUB_GRATING_GAPS) {
    ctx.beginPath(); ctx.moveTo(gx, 450); ctx.lineTo(gx, 490); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(0, 465); ctx.lineTo(900, 465); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 480); ctx.lineTo(900, 480); ctx.stroke();

  // Divisórias verticais (seções de maquinário)
  ctx.strokeStyle = '#1a3048';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(300, 90); ctx.lineTo(300, 450); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(600, 90); ctx.lineTo(600, 450); ctx.stroke();

  // Rebites
  ctx.fillStyle = '#2a4a6a';
  for (const [rx, ry] of SUB_RIVETS_MAQ) {
    ctx.beginPath(); ctx.arc(rx, ry, 3, 0, Math.PI * 2); ctx.fill();
  }
}

// Camada 3: Iluminação — luzes vermelhas de emergência
function renderMaq_Iluminacao(ctx) {
  const t = Date.now() * 0.001;
  // Luz vermelha pulsante (alarme)
  const pulseAlpha = 0.05 + Math.sin(t * 2) * 0.03;
  ctx.fillStyle = `rgba(255, 50, 30, ${pulseAlpha})`;
  ctx.fillRect(0, 0, 900, 600);

  // Lâmpada vermelha no teto (esquerda)
  const redGlow = ctx.createRadialGradient(150, 85, 3, 150, 85, 120);
  redGlow.addColorStop(0, `rgba(255, 60, 40, ${0.12 + Math.sin(t * 2) * 0.05})`);
  redGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = redGlow;
  ctx.fillRect(30, 0, 240, 250);

  // Lâmpada amarela (centro)
  const yelGlow = ctx.createRadialGradient(450, 85, 3, 450, 85, 150);
  yelGlow.addColorStop(0, 'rgba(255, 200, 50, 0.1)');
  yelGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = yelGlow;
  ctx.fillRect(300, 0, 300, 300);

  // Corpo das lâmpadas
  ctx.fillStyle = '#aa3020';
  ctx.fillRect(145, 78, 10, 8);
  ctx.fillStyle = '#b89030';
  ctx.fillRect(445, 78, 10, 8);
}

// Camada 4: Detalhes — ferrugem, condensação, desgaste industrial
function renderMaq_Detalhes(ctx) {
  // Ferrugem
  for (const r of SUB_RUST_MAQ) {
    ctx.fillStyle = 'rgba(140, 70, 20, 0.2)';
    ctx.beginPath();
    ctx.ellipse(r.x + r.w / 2, r.y + r.h / 2, r.w / 2, r.h / 2, 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Manchas de óleo no piso
  ctx.fillStyle = 'rgba(20, 15, 10, 0.3)';
  ctx.beginPath(); ctx.ellipse(200, 470, 30, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(500, 475, 25, 10, 0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(750, 468, 35, 14, -0.2, 0, Math.PI * 2); ctx.fill();

  // Condensação e gotejamento
  ctx.strokeStyle = 'rgba(79, 195, 247, 0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    const cx = 80 + i * 150;
    ctx.beginPath(); ctx.moveTo(cx, 90); ctx.lineTo(cx + 1, 90 + 30 + i * 5); ctx.stroke();
    ctx.fillStyle = 'rgba(79, 195, 247, 0.15)';
    ctx.beginPath(); ctx.arc(cx + 1, 90 + 30 + i * 5, 2, 0, Math.PI * 2); ctx.fill();
  }
}

// Camada 5: Decoração — tubulações densas, motor principal
function renderMaq_Decoracao(ctx) {
  // Tubulações horizontais superiores (3 níveis)
  const pipeColors = ['#1e3a55', '#2a2018', '#1a3040'];
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = pipeColors[i];
    ctx.lineWidth = 8 - i * 2;
    const py = 100 + i * 18;
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(900, py); ctx.stroke();
    // Highlight
    ctx.strokeStyle = 'rgba(79, 195, 247, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, py - 2); ctx.lineTo(900, py - 2); ctx.stroke();
  }

  // Motor principal (centro-fundo, decorativo)
  ctx.fillStyle = '#0c1820';
  ctx.fillRect(350, 350, 200, 95);
  ctx.strokeStyle = '#1a3a5a';
  ctx.lineWidth = 2;
  ctx.strokeRect(350, 350, 200, 95);
  // Cilindros do motor
  ctx.fillStyle = '#152535';
  ctx.fillRect(370, 360, 40, 75);
  ctx.fillRect(420, 360, 40, 75);
  ctx.fillRect(470, 360, 40, 75);
  ctx.strokeStyle = '#2a4a6a';
  ctx.lineWidth = 1;
  ctx.strokeRect(370, 360, 40, 75);
  ctx.strokeRect(420, 360, 40, 75);
  ctx.strokeRect(470, 360, 40, 75);
  // Placa do motor
  ctx.fillStyle = '#0c1a2a';
  ctx.fillRect(395, 430, 110, 14);
  ctx.fillStyle = '#3a6a8a';
  ctx.font = '8px Courier New';
  ctx.fillText('DIESEL-E MK.IV', 405, 441);

  // Painel elétrico (direita)
  ctx.fillStyle = '#101820';
  ctx.fillRect(700, 150, 120, 200);
  ctx.strokeStyle = '#1a3a5a';
  ctx.strokeRect(700, 150, 120, 200);
  // Disjuntores
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      ctx.fillStyle = '#1a2a3a';
      ctx.fillRect(715 + j * 25, 170 + i * 50, 18, 30);
      ctx.fillStyle = (i + j) % 3 === 0 ? '#00aa44' : '#aa2020';
      ctx.beginPath(); ctx.arc(724 + j * 25, 210 + i * 50, 3, 0, Math.PI * 2); ctx.fill();
    }
  }
}

// Camada 6: Objetos interativos — válvulas e controles
function renderMaq_Objetos(ctx, state) {
  const valvulaAtivadas = state.get('valvulasAtivadas') || [];

  // --- VÁLVULA AZUL (12 PSI) — esquerda ---
  const vbX = 80, vbY = 200, vbW = 130, vbH = 140;
  drawValvula(ctx, vbX, vbY, vbW, vbH, '#1565c0', '#2196f3', '#0d47a1', 'AZUL', '12', valvulaAtivadas.includes('azul'));

  // --- VÁLVULA VERMELHA (45 PSI) — centro ---
  const vrX = 380, vrY = 180, vrW = 130, vrH = 140;
  drawValvula(ctx, vrX, vrY, vrW, vrH, '#b71c1c', '#e53935', '#7f0000', 'VERMELHA', '45', valvulaAtivadas.includes('vermelha'));

  // --- VÁLVULA AMARELA (78 PSI) — direita ---
  const vaX = 540, vaY = 210, vaW = 130, vaH = 140;
  drawValvula(ctx, vaX, vaY, vaW, vaH, '#f9a825', '#fdd835', '#c17900', 'AMARELA', '78', valvulaAtivadas.includes('amarela'));

  // --- PAINEL DE DIAGNÓSTICO (resultado do puzzle) ---
  const pdX = 80, pdY = 380, pdW = 180, pdH = 60;
  const pdGrad = ctx.createLinearGradient(pdX, pdY, pdX + pdW, pdY);
  pdGrad.addColorStop(0, '#0c1820');
  pdGrad.addColorStop(0.5, '#142028');
  pdGrad.addColorStop(1, '#0c1820');
  ctx.fillStyle = pdGrad;
  ctx.fillRect(pdX, pdY, pdW, pdH);
  ctx.strokeStyle = '#4fc3f7';
  ctx.lineWidth = 1;
  ctx.strokeRect(pdX, pdY, pdW, pdH);
  ctx.fillStyle = '#4fc3f7';
  ctx.font = '9px Courier New';
  ctx.fillText('STATUS PRESSÃO:', pdX + 10, pdY + 20);
  if (state.get('puzzleResolvido')) {
    ctx.fillStyle = '#00ff88';
    ctx.fillText('SISTEMA ESTÁVEL', pdX + 10, pdY + 40);
  } else {
    ctx.fillStyle = '#ff6644';
    ctx.fillText(`${valvulaAtivadas.length}/3 VÁLVULAS`, pdX + 10, pdY + 40);
  }
}

// Helper: desenha uma válvula com manômetro
function drawValvula(ctx, x, y, w, h, colorDark, colorLight, colorDeep, label, psi, ativada) {
  // Corpo da válvula
  const vGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  vGrad.addColorStop(0, colorDark);
  vGrad.addColorStop(0.4, colorLight);
  vGrad.addColorStop(1, colorDark);
  ctx.fillStyle = vGrad;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = ativada ? '#00ff88' : '#4fc3f7';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  // Roda da válvula (topo)
  const wheelX = x + w / 2, wheelY = y + 30;
  ctx.strokeStyle = ativada ? '#00ff88' : colorLight;
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(wheelX, wheelY, 18, 0, Math.PI * 2); ctx.stroke();
  // Raios da roda
  ctx.lineWidth = 2;
  for (let a = 0; a < 4; a++) {
    const angle = a * Math.PI / 2 + (ativada ? 0.4 : 0);
    ctx.beginPath();
    ctx.moveTo(wheelX + Math.cos(angle) * 8, wheelY + Math.sin(angle) * 8);
    ctx.lineTo(wheelX + Math.cos(angle) * 18, wheelY + Math.sin(angle) * 18);
    ctx.stroke();
  }
  // Centro da roda
  ctx.fillStyle = colorDeep;
  ctx.beginPath(); ctx.arc(wheelX, wheelY, 6, 0, Math.PI * 2); ctx.fill();

  // Manômetro (mostrador circular com PSI)
  const gaugeX = x + w / 2, gaugeY = y + h - 35;
  ctx.fillStyle = '#050a10';
  ctx.beginPath(); ctx.arc(gaugeX, gaugeY, 20, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#3a6a8a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(gaugeX, gaugeY, 20, 0, Math.PI * 2); ctx.stroke();
  // Agulha
  const needleAngle = -Math.PI / 2 + (parseInt(psi) / 100) * Math.PI;
  ctx.strokeStyle = '#ff4444';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(gaugeX, gaugeY);
  ctx.lineTo(gaugeX + Math.cos(needleAngle) * 14, gaugeY + Math.sin(needleAngle) * 14);
  ctx.stroke();
  // Valor PSI
  ctx.fillStyle = '#4fc3f7';
  ctx.font = 'bold 9px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText(psi + ' PSI', gaugeX, gaugeY + 32);
  ctx.textAlign = 'left';

  // Label da cor
  ctx.fillStyle = colorLight;
  ctx.font = 'bold 10px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText(label, x + w / 2, y + h + 14);
  ctx.textAlign = 'left';

  // Indicador de estado
  if (ativada) {
    ctx.fillStyle = '#00ff88';
    ctx.beginPath(); ctx.arc(x + w - 12, y + 12, 5, 0, Math.PI * 2); ctx.fill();
  }
}

// Camada 7: Atmosfera — vapor, calor das máquinas
function renderMaq_Atmosfera(ctx) {
  const t = Date.now() * 0.001;

  // Vapor subindo dos tubos
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = '#8ab8d0';
  for (let i = 0; i < 4; i++) {
    const sx = 150 + i * 200;
    const sy = 140 - Math.sin(t + i) * 20;
    ctx.beginPath();
    ctx.ellipse(sx, sy, 15 + Math.sin(t * 0.5 + i) * 5, 25, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Água no fundo (nível mais alto que na proa)
  const waterBase = 480 + Math.sin(t * 0.4) * 6;
  ctx.save();
  ctx.globalAlpha = 0.3;
  const waterGrad = ctx.createLinearGradient(0, waterBase, 0, 600);
  waterGrad.addColorStop(0, 'rgba(15, 60, 100, 0.0)');
  waterGrad.addColorStop(0.4, 'rgba(25, 80, 130, 0.3)');
  waterGrad.addColorStop(1, 'rgba(8, 40, 70, 0.6)');
  ctx.fillStyle = waterGrad;
  ctx.beginPath();
  ctx.moveTo(0, waterBase);
  for (let x = 0; x <= 900; x += 15) {
    const y = waterBase + Math.sin(x * 0.012 + t * 1.8) * 3 + Math.sin(x * 0.03 + t) * 2;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(900, 600);
  ctx.lineTo(0, 600);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Camada 8: Overlay — vinheta + tonalidade industrial
function renderMaq_Overlay(ctx) {
  // Vinheta mais apertada (claustrofobia)
  const vignette = ctx.createRadialGradient(450, 300, 80, 450, 300, 450);
  vignette.addColorStop(0, 'transparent');
  vignette.addColorStop(0.5, 'rgba(0, 5, 15, 0.15)');
  vignette.addColorStop(1, 'rgba(0, 5, 15, 0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 900, 600);

  // Tom industrial escuro
  ctx.fillStyle = 'rgba(5, 10, 20, 0.08)';
  ctx.fillRect(0, 0, 900, 600);
}

/*
 * ============ TABELA DE POSIÇÕES ============
 *
 * PROA:
 * | ID              | x    | y    | w    | h    | Descrição                        |
 * |-----------------|------|------|------|------|----------------------------------|
 * | armario         | 100  | 180  | 110  | 200  | Armário de suprimentos (chave)   |
 * | vigia           | 740  | 180  | 80   | 80   | Vigia para o oceano              |
 * | manual          | 420  | 340  | 100  | 70   | Manual de operações              |
 * | radio           | 580  | 150  | 130  | 100  | Painel de comunicação            |
 * | escotilha       | 820  | 300  | 60   | 130  | Escotilha para Máquinas          |
 *
 * MÁQUINAS:
 * | ID              | x    | y    | w    | h    | Descrição                        |
 * |-----------------|------|------|------|------|----------------------------------|
 * | valvulaAzul     | 80   | 200  | 130  | 140  | Válvula azul (12 PSI)            |
 * | valvulaVermelha | 380  | 180  | 130  | 140  | Válvula vermelha (45 PSI)        |
 * | valvulaAmarela  | 540  | 210  | 130  | 140  | Válvula amarela (78 PSI)         |
 * | diagnostico     | 80   | 380  | 180  | 60   | Painel de diagnóstico            |
 * | voltar          | 735  | 500  | 130  | 55   | Voltar à Proa                    |
 */
