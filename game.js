const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const nextLevelButton = document.getElementById('next-level');
const startGameButton = document.getElementById('start-game');
const developerToolsButton = document.getElementById('developer-tools');
const developerLevelMenu = document.getElementById('developer-level-menu');

const W = canvas.width;
const H = canvas.height;

const keys = {
  arrows: { left: false, right: false, up: false },
  wasd: { left: false, right: false, up: false }
};

const keyMap = {
  arrowleft: ['arrows', 'left'],
  arrowright: ['arrows', 'right'],
  arrowup: ['arrows', 'up'],
  a: ['wasd', 'left'],
  d: ['wasd', 'right'],
  w: ['wasd', 'up']
};

const levels = [
  {
    platforms: [
      { x: 0, y: H - 18, width: W, height: 18 },
      { x: 80, y: 400, width: 130, height: 16 },
      { x: 270, y: 440, width: 180, height: 16 },
      { x: 470, y: 300, width: 120, height: 16 },
      { x: 610, y: 365, width: 170, height: 16 },
      { x: 810, y: 290, width: 110, height: 16 }
    ],
    goal: { x: 880, y: 218, width: 34, height: 72 },
    spikes: [],
    coins: [
      { x: 145, y: 375 },
      { x: 350, y: 415 },
      { x: 530, y: 275 },
      { x: 700, y: 340 },
      { x: 860, y: 265 }
    ]
  },
  {
    worldWidth: 1200,
    platforms: [
      { x: 0, y: H - 18, width: 1200, height: 18 },
      { x: 70, y: 430, width: 160, height: 16 },
      { x: 280, y: 350, width: 140, height: 16 },
      { x: 480, y: 420, width: 150, height: 16 },
      { x: 650, y: 330, width: 160, height: 16 },
      { x: 900, y: 270, width: 150, height: 16 },
      { x: 1130, y: 225, width: 70, height: 16 }
    ],
    goal: { x: 1155, y: 153, width: 34, height: 72 },
    spikes: [
      { x: 320, y: 330, width: 32, height: 20 },
      { x: 715, y: 310, width: 32, height: 20 },
      { x: 950, y: 250, width: 32, height: 20 },
    ],
    coins: [
      { x: 95, y: 405 },
      { x: 390, y: 325 },
      { x: 530, y: 395 },
      { x: 680, y: 305 },
      { x: 860, y: 235 },
    ]
  },
  {
    worldWidth: 1400,
    platforms: [
      { x: 55, y: 440, width: 150, height: 16 },
      { x: 215, y: 375, width: 110, height: 16 },
      { x: 330, y: 310, width: 170, height: 16, moving: { axis: 'x', min: 300, max: 620, speed: 1.8, dir: 1, deltaX: 0 } },
      { x: 720, y: 350, width: 120, height: 16 },
      { x: 810, y: 275, width: 120, height: 16 },
      { x: 970, y: 400, width: 130, height: 16 },
      { x: 1110, y: 320, width: 140, height: 16, moving: { axis: 'x', min: 1080, max: 1300, speed: 1.5, dir: 1, deltaX: 0 } },
      { x: 1280, y: 260, width: 120, height: 16 }
    ],
    goal: { x: 1350, y: 188, width: 34, height: 72 },
    spikes: [
      { x: 245, y: 355, width: 32, height: 20 },
      { x: 730, y: 330, width: 32, height: 20 }
    ],
    coins: [
      { x: 110, y: 415 },
      { x: 390, y: 285 },
      { x: 875, y: 250 },
      { x: 1020, y: 375 },
      { x: 1170, y: 295 },
      { x: 1340, y: 235 }
    ]
  },
  {
    worldWidth: 2000,
    playerSize: 36,
    playerStarts: [
      { x: 90, y: 280 },
      { x: 90, y: 280 }
    ],
    platforms: [
      { x: 0, y: H - 18, width: 2000, height: 18 },
      { x: 90, y: 440, width: 145, height: 16 },
      { x: 275, y: 365, width: 145, height: 16 },
      { x: 465, y: 430, width: 145, height: 16 },
      { x: 650, y: 350, width: 155, height: 16 },
      { x: 855, y: 425, width: 145, height: 16 },
      { x: 1045, y: 345, width: 155, height: 16 },
      { x: 1255, y: 420, width: 150, height: 16 },
      { x: 1455, y: 340, width: 160, height: 16 },
      { x: 1665, y: 410, width: 145, height: 16 },
      { x: 1835, y: 330, width: 165, height: 16 }
    ],
    goal: { x: 1950, y: 267, width: 34, height: 72 },
    spikes: [],
    lava: [
      { x: 190, y: 432, width: 38, height: 24 },
      { x: 360, y: 357, width: 38, height: 24 },
      { x: 500, y: 422, width: 38, height: 24 },
      { x: 740, y: 342, width: 38, height: 24 },
      { x: 915, y: 417, width: 38, height: 24 },
      { x: 1135, y: 337, width: 38, height: 24 },
      { x: 1320, y: 412, width: 38, height: 24 },
      { x: 1525, y: 332, width: 38, height: 24 },
      { x: 1715, y: 402, width: 38, height: 24 },
      { x: 0, y: H - 24, width: 2000, height: 24 }
    ],
    coins: [
      { x: 155, y: 410 },
      { x: 345, y: 335 },
      { x: 535, y: 400 },
      { x: 710, y: 320 },
      { x: 920, y: 395 },
      { x: 1100, y: 315 },
      { x: 1325, y: 390 },
      { x: 1510, y: 310 },
      { x: 1735, y: 380 },
      { x: 1900, y: 240 }
    ]
  },
  {
    worldWidth: 4000,
    playerSize: 36,
    playerStarts: [
      { x: 140, y: 370 },
      { x: 140, y: 370 }
    ],
    platforms: [
      { x: 140, y: 430, width: 120, height: 16 },
      { x: 400, y: 360, width: 130, height: 16 },
      { x: 690, y: 420, width: 140, height: 16 },
      { x: 800, y: 335, width: 130, height: 16, moving: { axis: 'x', min: 770, max: 1030, speed: 1.5, dir: 1, deltaX: 0 } },
      { x: 1050, y: 405, width: 140, height: 16 },
      { x: 1300, y: 330, width: 150, height: 16 },
      { x: 1560, y: 410, width: 140, height: 16 },
      { x: 1770, y: 340, width: 140, height: 16, moving: { axis: 'x', min: 1720, max: 1970, speed: 1.5, dir: 1, deltaX: 0 } },
      { x: 2000, y: 420, width: 130, height: 16 },
      { x: 2240, y: 350, width: 150, height: 16 },
      { x: 2470, y: 410, width: 145, height: 16 },
      { x: 2670, y: 320, width: 130, height: 16, moving: { axis: 'x', min: 2640, max: 2890, speed: 1.5, dir: 1, deltaX: 0 } },
      { x: 2930, y: 400, width: 150, height: 16 },
      { x: 3170, y: 330, width: 150, height: 16 },
      { x: 3410, y: 420, width: 140, height: 16 },
      { x: 3610, y: 340, width: 140, height: 16, moving: { axis: 'x', min: 3570, max: 3830, speed: 1.5, dir: 1, deltaX: 0 } },
      { x: 3850, y: 430, width: 130, height: 16 }
    ],
    goal: { x: 3930, y: H - 170, width: 34, height: 72 },
    spikes:[
      { x: 450, y: 340, width: 34, height: 20 },
      { x: 1080, y: 385, width: 34, height: 20 },
      { x: 1600, y: 390, width: 34, height: 20 },
      { x: 2290, y: 330, width: 34, height: 20 },
      { x: 3210, y: 310, width: 34, height: 20 },

      ...Array.from({ length: 80 }, (_, i) => {
        const width = 50;
        const height = 20 + ((i * 13) % 17);
        return {
          x: i * width,
          y: H - height,
          width,
          height
        };
      })
    ],
    lava: [
      { x: 740, y: 412, width: 46, height: 24 },
      { x: 1350, y: 322, width: 50, height: 24 },
      { x: 2040, y: 412, width: 44, height: 24 },
      { x: 2520, y: 402, width: 48, height: 24 },
      { x: 3450, y: 412, width: 46, height: 24 },
    ],
    coins: [
      { x: 200, y: 400 },
      { x: 425, y: 330 },
      { x: 740, y: 390 },
      { x: 850, y: 305 },
      { x: 1140, y: 375 },
      { x: 1370, y: 300 },
      { x: 1670, y: 380 },
      { x: 1835, y: 310 },
      { x: 2070, y: 390 },
      { x: 2340, y: 320 },
      { x: 2540, y: 380 },
      { x: 2730, y: 290 },
      { x: 3020, y: 370 },
      { x: 3270, y: 300 },
      { x: 3480, y: 390 },
      { x: 3660, y: 310 },
    ]
  }
];

let levelIndex = 0;
let platforms = levels[levelIndex].platforms;
let goal = levels[levelIndex].goal;
let spikes = levels[levelIndex].spikes;
let lava = levels[levelIndex].lava ?? [];
let coins = levels[levelIndex].coins.map((coin) => ({ ...coin, collected: false }));
let gameStarted = false;
let hasWon = false;
let waitingForOtherPlayer = false;
let goalMessageSeconds = 0;
let goalMessage = '';
let playerWasAtGoal = [false, false];
let winAnimationTime = 0;
let lastFrameTime = 0;
let cameraOffset = 0;
let audioContext;

const players = [
  { x: 120, y: 200, size: 70, vy: 0, onGround: false, standingPlatform: null, color: '#e8d4b8', label: 'A', controls: keys.arrows, health: 10, maxHealth: 10, lavaTime: 0 },
  { x: 120, y: 200, size: 70, vy: 0, onGround: false, standingPlatform: null, color: '#f29e4c', label: 'Q', controls: keys.wasd, health: 10, maxHealth: 10, lavaTime: 0 }
];

function loadLevel(index) {
  levelIndex = index;
  const level = levels[levelIndex];
  platforms = level.platforms.map((platform) => ({
    ...platform,
    moving: platform.moving ? { ...platform.moving, deltaX: 0 } : undefined
  }));
  goal = level.goal;
  spikes = level.spikes;
  lava = level.lava ?? [];
  coins = level.coins.map((coin) => ({ ...coin, collected: false }));
  goalMessageSeconds = 0;
  goalMessage = '';
  playerWasAtGoal = [false, false];
  hasWon = false;
  waitingForOtherPlayer = false;
  winAnimationTime = 0;
  nextLevelButton.hidden = true;

  players.forEach((player, index) => {
    player.x = level.playerStarts?.[index]?.x ?? 120;
    player.y = level.playerStarts?.[index]?.y ?? 200;
    player.size = level.playerSize ?? 70;
    player.vy = 0;
    player.onGround = false;
    player.standingPlatform = null;
    player.health = player.maxHealth;
    player.lavaTime = 0;
  });
  cameraOffset = 0;
}

developerToolsButton.addEventListener('click', () => {
  const code = prompt('Enter developer code:');

  if (code !== '5683') {
    if (code !== null) alert('Incorrect code.');
    return;
  }

  developerLevelMenu.replaceChildren();

  levels.forEach((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `Level ${index + 1}`;

    button.addEventListener('click', () => {
      gameStarted = true;
      startGameButton.hidden = true;
      loadLevel(index);
      developerLevelMenu.hidden = true;
    });

    developerLevelMenu.append(button);
  });

  developerLevelMenu.hidden = false;
});

nextLevelButton.addEventListener('click', () => loadLevel(Math.min(levelIndex + 1, levels.length - 1)));
startGameButton.addEventListener('click', () => {
  audioContext = new AudioContext();
  gameStarted = true;
  startGameButton.hidden = true;
});

function drawFace(player) {
  const { x, y, size, color, label } = player;
  const screenX = x - cameraOffset;

  ctx.fillStyle = color;
  ctx.fillRect(screenX, y, size, size);

  ctx.fillStyle = '#111';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, screenX + size / 2, y - 14);

  const eyeY = y + size * 0.38;
  const eyeRadius = size * 0.08;

  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(screenX + size * 0.3, eyeY, eyeRadius, 0, Math.PI * 2);
  ctx.arc(screenX + size * 0.7, eyeY, eyeRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(screenX + size / 2, y + size * 0.68, size * 0.24, 0.2, Math.PI - 0.2);
  ctx.stroke();
}

function drawCelebrationCharacter(x, y, player) {
  const size = 60;

  ctx.fillStyle = player.color;
  ctx.fillRect(x, y, size, size);

  ctx.fillStyle = '#111';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(player.label, x + size / 2, y - 10);

  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(x + size * 0.3, y + size * 0.38, size * 0.08, 0, Math.PI * 2);
  ctx.arc(x + size * 0.7, y + size * 0.38, size * 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size * 0.68, size * 0.24, 0.2, Math.PI - 0.2);
  ctx.stroke();
}

function drawHighFiveCelebration() {
  const size = 60;
  const bodyY = H / 2 - 5;
  const leftX = W / 2 - 115;
  const rightX = W / 2 + 55;
  const reach = Math.min(winAnimationTime / 0.7, 1);
  const handBob = reach === 1 ? Math.sin(winAnimationTime * 8) * 2 : 0;
  const handY = bodyY + 18 + handBob;
  const leftShoulderX = leftX + size - 4;
  const rightShoulderX = rightX + 4;
  const leftHandX = leftShoulderX + (W / 2 - leftShoulderX) * reach;
  const rightHandX = rightShoulderX + (W / 2 - rightShoulderX) * reach;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Level Complete!', W / 2, H / 2 - 105);

  drawCelebrationCharacter(leftX, bodyY, players[0]);
  drawCelebrationCharacter(rightX, bodyY, players[1]);

  for (const [handX, color] of [[leftHandX, players[0].color], [rightHandX, players[1].color]]) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(handX, handY, 9, 0, Math.PI * 2);
    ctx.fill();
  }

  if (reach === 1) {
    ctx.strokeStyle = '#ffd45c';
    ctx.lineWidth = 3;
    for (let ray = 0; ray < 8; ray += 1) {
      const angle = ray * Math.PI / 4;
      ctx.beginPath();
      ctx.moveTo(W / 2 + Math.cos(angle) * 15, handY + Math.sin(angle) * 15);
      ctx.lineTo(W / 2 + Math.cos(angle) * 23, handY + Math.sin(angle) * 23);
      ctx.stroke();
    }
  }
}

function drawGameOverScreen() {
  ctx.fillStyle = '#9ed8f5';
  ctx.fillRect(0, 0, W, H);

ctx.fillStyle = '#ffd45c';
ctx.beginPath();
ctx.arc(W - 70, 70, 34, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = '#83c96b';
ctx.fillRect(0, H * 0.72, W, H * 0.28)

drawCelebrationCharacter(W / 2 - 70, H * 0.53, players[1]);
drawCelebrationCharacter(W / 2 + 10, H * 0.53, players[0]);

ctx.textAlign = 'center';
ctx.textBaseLine = 'middle';

ctx.fillStyle = '#284b35';
ctx.font = 'bold 48px sans-serif';
ctx.fillText('Congratulations, you beat the game!', W / 2, H * 0.2);
}

function drawSpike(spike) {
  ctx.fillStyle = levelIndex === 4 ? '#4b4b4f' : '#d44c46';
  ctx.beginPath();
  ctx.moveTo(spike.x, spike.y + spike.height);
  ctx.lineTo(spike.x + spike.width / 2, spike.y);
  ctx.lineTo(spike.x + spike.width, spike.y + spike.height);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = levelIndex === 4 ? '#252529' : '#6d2a2a';
  ctx.stroke();
}

function drawHealthBars() {
  for (const [index, player] of players.entries()) {
    const x = index === 0 ? 20 : W - 220;
    const y = 20;
    const width = 200;
    const height = 18;
    const gap = 3;
    const tickWidth = (width - gap * (player.maxHealth - 1)) / player.maxHealth;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(x - 5, y - 5, width + 10, height + 10);
    for (let tick = 0; tick < player.maxHealth; tick += 1) {
      const tickX = x + tick * (tickWidth + gap);
      ctx.fillStyle = '#333';
      ctx.fillRect(tickX, y, tickWidth, height);
      if (tick < player.health) {
        ctx.fillStyle = player.health <= 3 ? '#e64b3c' : '#54b85a';
        ctx.fillRect(tickX, y, tickWidth, height);
      }
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.strokeRect(tickX, y, tickWidth, height);
    }

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = index === 0 ? 'left' : 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`${player.label}: ${player.health}/${player.maxHealth}`, index === 0 ? x : x + width, y - 3);
  }
}

function drawScene() {
  ctx.fillStyle = levelIndex === 4 ? '#21191d' : levelIndex === 3 ? '#222120' : levelIndex === 1 ? '#24452b' : '#9ed8f5';
  ctx.fillRect(0, 0, W, H);

  if (levelIndex === 4) {
    const time = performance.now() / 1000;

    for (let peak = -1; peak < 8; peak += 1) {
      const x = peak * 520 - cameraOffset * 0.22;
      const peakY = 190 + (peak % 3) * 35;

      ctx.fillStyle = '#38272b';
      ctx.beginPath();
      ctx.moveTo(x - 210, H);
      ctx.lineTo(x, peakY);
      ctx.lineTo(x + 210, H);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#713329';
      ctx.beginPath();
      ctx.moveTo(x - 42, peakY + 56);
      ctx.lineTo(x - 19, peakY + 10);
      ctx.lineTo(x + 19, peakY + 10);
      ctx.lineTo(x + 42, peakY + 56);
      ctx.closePath();
      ctx.fill();
    }

    for (let ember = 0; ember < 28; ember += 1) {
      const x =(ember * 173 + Math.sin(time + ember) * 20 - cameraOffset * 0.35 + W * 2) % W;
      const y = H - ((ember * 89 + time * 28) % (H + 20));

      ctx.fillStyle = `rgba(255, ${100 + ember % 80}, 35, 0.8)`;
      ctx.beginPath();
      ctx.arc(x, y, 2 + (ember % 3), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (levelIndex === 3) {
    const time = performance.now() / 1000;

    for (let i = 0; i < 24; i += 1) {
      const x = (i * 137 + Math.sin(time + i) * 18 + W) % W;
      const y = H - ((i * 97 + time * 32) % (H + 20));
      const size = 2 + (i % 3);
      const alpha = 0.45 + (Math.sin(time * 2 + i) + 1) * 0.2;

      ctx.fillStyle = `rgba(255, 150, 50, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (levelIndex === 1) {
    let treeIndex = 0;
    for (let x = -60; x < W + 120; x += 180, treeIndex++) {
      const treeTop = treeIndex % 2 === 0 ? 125 : 165;

      ctx.fillStyle = '#1b3824';
      ctx.fillRect(x + 67, treeTop, 22, H - treeTop);

      ctx.fillStyle = '#1b3c27';
      ctx.beginPath();
      ctx.arc(x + 55, treeTop + 25, 48, 0, Math.PI * 2);
      ctx.arc(x + 85, treeTop + 10, 55, 0, Math.PI * 2);
      ctx.arc(x + 112, treeTop + 30, 44, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#315c32';
      ctx.lineWidth = 5;

      for (let vineX = 40; vineX < W; vineX += 240) {
        ctx.beginPath();
        ctx.moveTo(vineX, 0);



       ctx.bezierCurveTo(vineX + 18, 175, vineX - 16, 230, vineX + 8, 295);
        ctx.stroke();

        ctx.fillStyle = '#4f8a3b';
        for (let leafY = 165; leafY < 280; leafY += 35) {
          ctx.beginPath();
          ctx.ellipse(vineX - 5, leafY, 9, 4, 0.5, 0, Math.PI * 2);
          ctx.ellipse(vineX + 7, leafY + 12, 9, 4, 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
  if (levelIndex === 0) {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(250, 130, 35, 18, 0, 0, Math.PI * 2);
    ctx.ellipse(280, 120, 28, 23, 0, 0, Math.PI * 2);
    ctx.ellipse(310, 130, 35, 18, 0, 0, Math.PI *2)
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(610, 85, 35, 18, 0, 0, Math.PI * 2);
    ctx.ellipse(640, 75, 28, 23, 0, 0, Math.PI * 2);
    ctx.ellipse(670, 85, 35, 18, 0, 0, Math.PI * 2);
    ctx.fill();
  }

 if (levelIndex !== 1 && levelIndex !== 3 && levelIndex !== 4) {
  ctx.fillStyle = '#ffd45c';
  ctx.beginPath();
  ctx.arc(100, 90, 42, 0, Math.PI * 2);
  ctx.fill();
 }

 if (levelIndex === 2) {
  ctx.fillStyle = '#789bb8';
  ctx.beginPath();
  ctx.moveTo(0, 390);
  ctx.lineTo(150, 210);
  ctx.lineTo(300, 390);
  ctx.lineTo(470, 185);
  ctx.lineTo(650, 390);
  ctx.lineTo(800, 230);
  ctx.lineTo(W, 390);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#95bfe2';
  ctx.beginPath();
  ctx.moveTo(0, 445);
  ctx.lineTo(190, 285);
  ctx.lineTo(360, 445);
  ctx.lineTo(570, 260);
  ctx.lineTo(740, 445);
  ctx.lineTo(830,310);
  ctx.lineTo(W, 420);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

    // Snow on the far mountain peaks
  ctx.fillStyle = '#f5fbff';
  ctx.beginPath();
  ctx.moveTo(105, 264);
  ctx.lineTo(150, 210);
  ctx.lineTo(195, 264);
  ctx.lineTo(168, 248);
  ctx.lineTo(150, 258);
  ctx.lineTo(132, 246);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(425, 239);
  ctx.lineTo(470, 185);
  ctx.lineTo(515, 234);
  ctx.lineTo(488, 224);
  ctx.lineTo(470, 235);
  ctx.lineTo(452, 222);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(747, 284);
  ctx.lineTo(800, 230);
  ctx.lineTo(845, 275);
  ctx.lineTo(818, 269);
  ctx.lineTo(800, 280);
  ctx.lineTo(782, 267);
  ctx.closePath();
  ctx.fill();

  // Snow on the closer mountain peaks
  ctx.fillStyle = '#eaf6ff';
  ctx.beginPath();
  ctx.moveTo(145, 323);
  ctx.lineTo(190, 285);
  ctx.lineTo(235, 327);
  ctx.lineTo(208, 312);
  ctx.lineTo(190, 319);
  ctx.lineTo(172, 309);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(525, 299);
  ctx.lineTo(570, 260);
  ctx.lineTo(615, 309);
  ctx.lineTo(588, 290);
  ctx.lineTo(570, 297);
  ctx.lineTo(552, 290);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(805, 348);
  ctx.lineTo(830, 310);
  ctx.lineTo(860, 336);
  ctx.lineTo(845, 332);
  ctx.lineTo(835, 343);
  ctx.lineTo(823, 333);
  ctx.closePath();
  ctx.fill();
 }
  for (const platform of platforms) {
    const screenX = platform.x - cameraOffset;

    if (levelIndex === 1 && platform.y !== H - 18) {
      ctx.fillStyle = '#102b1b';
      ctx.fillRect(screenX, platform.y, platform.width, platform.height);

      for (let leafX = screenX - 8; leafX < screenX + platform.width + 8; leafX += 18) {
        const shade = Math.floor((leafX - screenX + 8) / 18) % 3;
        ctx.fillStyle = shade === 0 ? '#1b4828' : shade === 1 ? '#245a31' : '#2c6638';

        ctx.beginPath();
        ctx.ellipse(leafX, platform.y + 1, 12, 6, -0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(leafX + 6, platform.y + platform.height - 1, 12, 6, 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(leafX + 3, platform.y + platform.height / 2, 9, 5, -0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#1b4828';
      for (let leafY = platform.y + 5; leafY < platform.y + platform.height - 2; leafY += 8) {
        ctx.beginPath();
        ctx.ellipse(screenX + 1, leafY, 7, 5, 0, 0, Math.PI * 2);
        ctx.ellipse(screenX + platform.width - 1, leafY, 7, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (levelIndex === 2) {
      ctx.fillStyle = '#f5fbff';
      ctx.fillRect(screenX + 12, platform.y + 7, platform.width - 24, platform.height - 7);
      for (let puffX = screenX + 15; puffX < screenX + platform.width - 10; puffX += 28) {
        ctx.beginPath();
        ctx.ellipse(puffX, platform.y + 7, 18, 9, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (levelIndex === 3) {
      ctx.fillStyle = '#777777';
      ctx.beginPath();
      ctx.moveTo(screenX, platform.y + platform.height);

      for (let offset = 0; offset <= platform.width; offset += 16) {
        const jaggedTop = platform.y + 3 + (Math.sin((platform.x + offset) * 0.13) + 1) * 2.5;
        ctx.lineTo(screenX + offset, jaggedTop);
      }

      ctx.lineTo(screenX + platform.width, platform.y + platform.height);
      ctx.closePath();
      ctx.fill();

      const glowY = platform.y + platform.height - 8;
      const glow = ctx.createLinearGradient(
        screenX,
        glowY,
        screenX,
        platform.y + platform.height + 12
      );

      ctx.fillStyle = glow;
      ctx.fillRect(screenX, glowY, platform.width, 18);

      ctx.fillStyle = 'rgba(255, 200, 110, 0.9)';
      ctx.fillRect(screenX, platform.y + platform.height - 2, platform.width, 2);

    } else if (levelIndex === 4) {
      ctx.fillStyle = platform.moving ? '#55443c' : '#393238';
      ctx.fillRect(screenX, platform.y, platform.width, platform.height);

      ctx.fillStyle = platform.moving ? '#a87542' : '#685159';
      ctx.fillRect(screenX, platform.y, platform.width, 5);

      ctx.fillStyle = '#21191d';
      for (let boltX = screenX + 10; boltX < screenX + platform.width; boltX += 28) {
        ctx.fillRect(boltX, platform.y + 7, 4, 4);
      }

      if (platform.moving) {
        ctx.strokeStyle = '#8b6043';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(screenX + 8, platform.y + platform.height);
        ctx.lineTo(screenX + 8, platform.y + platform.height + 9);
        ctx.moveTo(screenX + platform.width - 8, platform.y + platform.height);
        ctx.lineTo(screenX + platform.width - 8, platform.y + platform.height + 9);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = '#6f9e55';
      ctx.fillRect(screenX, platform.y, platform.width, platform.height);
    }
  }
  if (levelIndex === 0) {
    ctx.strokeStyle = '#3f7d32';
    ctx.lineWidth = 2;
    for (let x = 0; x < W; x += 10) {
      const height = 5 + (Math.floor(x / 10) % 3) * 3;

      ctx.beginPath();
      ctx.moveTo(x, H - 18);
      ctx.lineTo(x - 3, H - 18 - height);
      ctx.moveTo(x, H - 18);
      ctx.lineTo(x + 3, H - 18 - height);
      ctx.stroke();
    }
  }
  if (levelIndex === 0) {
  for (let x = 45; x < W; x += 120) {
    const flowerY = H - 38

    ctx.strokeStyle = '#3f7d32';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, H - 18);
    ctx.lineTo(x, flowerY + 4);
    ctx.stroke();

    ctx.fillStyle = '#ff8fc4';
    for (let petal = 0; petal < 5; petal += 1) {
      const angle = (petal * Math.PI * 2) / 5;
      ctx.beginPath();
      ctx.arc(
        x + Math.cos(angle) * 6,
        flowerY + Math.sin(angle) * 6,
        4,
        0,
        Math.PI * 2
      );
      ctx.fill();
  }

  ctx.fillStyle = '#ffdc4c';
  ctx.beginPath();
  ctx.arc(x, flowerY, 3, 0, Math.PI * 2);
  ctx.fill();
}
}
  for (const pool of lava) {
    ctx.fillStyle = '#d94b2b';
    ctx.fillRect(pool.x - cameraOffset, pool.y, pool.width, pool.height);
    ctx.fillStyle = '#ff9b32';
    ctx.fillRect(pool.x - cameraOffset, pool.y, pool.width, 7);
    ctx.fillStyle = '#ffd45c';
    ctx.fillRect(pool.x - cameraOffset, pool.y, pool.width, 2);
  }

  for (const spike of spikes) {
    drawSpike({ ...spike, x: spike.x - cameraOffset });
  }

  ctx.fillStyle = '#554332';
  ctx.fillRect(goal.x - cameraOffset, goal.y, 5, goal.height);
  ctx.fillStyle = '#e64b3c';
  ctx.beginPath();
  ctx.moveTo(goal.x - cameraOffset + 5, goal.y);
  ctx.lineTo(goal.x - cameraOffset + goal.width, goal.y + 13);
  ctx.lineTo(goal.x - cameraOffset + 5, goal.y + 26);
  ctx.closePath();
  ctx.fill();

  for (const coin of coins) {
    if (coin.collected) continue;

    ctx.fillStyle = '#f4d13b';
    ctx.beginPath();
    ctx.arc(coin.x - cameraOffset, coin.y, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#d7a600';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(coin.x - cameraOffset, coin.y, 10, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function updateMovingPlatforms() {
  for (const platform of platforms) {
    if (!platform.moving) continue;

    const { axis, min, max, speed, dir } = platform.moving;
    if (axis !== 'x') continue;

    const moveAmount = dir * speed;
    platform.x += moveAmount;
    platform.moving.deltaX = moveAmount;

    if (platform.x <= min || platform.x + platform.width >= max) {
      platform.moving.dir *= -1;
      platform.x = Math.min(Math.max(platform.x, min), max - platform.width);
    }
  }
}

function landOnPlatforms(player, previousBottom) {
  if (player.vy < 0) return;

  for (const platform of platforms) {
    const overlaps = player.x < platform.x + platform.width &&
      player.x + player.size > platform.x;
    const crossedTop = previousBottom <= platform.y && player.y + player.size >= platform.y;

    if (overlaps && crossedTop) {
      player.y = platform.y - player.size;
      player.vy = 0;
      player.onGround = true;
      player.standingPlatform = platform;
      return;
    }
  }

  player.standingPlatform = null;
}

function playCoinSound() {
  if (!audioContext) return;

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, now);
  oscillator.frequency.setValueAtTime(1320, now + 0.08);

  volume.gain.setValueAtTime(0.2, now);
  volume.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  oscillator.connect(volume);
  volume.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.18);
}

function collectCoin(player) {
  for (const coin of coins) {
    const touching = player.x + player.size > coin.x - 14 &&
      player.x < coin.x + 14 &&
      player.y + player.size > coin.y - 14 &&
      player.y < coin.y + 14;

    if (touching && !coin.collected) {
      coin.collected = true;
      playCoinSound();
    }
  }
}

function touchesSpike(player) {
  return spikes.some((spike) => player.x < spike.x + spike.width &&
    player.x + player.size > spike.x &&
    player.y < spike.y + spike.height &&
    player.y + player.size > spike.y);
}

function touchesLava(player) {
  return lava.some((pool) => player.x < pool.x + pool.width &&
    player.x + player.size > pool.x &&
    player.y < pool.y + pool.height &&
    player.y + player.size > pool.y);
}

function getCoinsLeft() {
  return coins.filter((coin) => !coin.collected).length;
}

function checkGoal() {
  if (hasWon) return;

  const touching = players.map((player) =>
    player.x < goal.x + goal.width &&
    player.x + player.size > goal.x &&
    player.y < goal.y + goal.height &&
    player.y + player.size > goal.y
  );

  const enteredGoal = touching.some((atGoal, index) => atGoal && !playerWasAtGoal[index]);
  playerWasAtGoal = touching;

  if (!touching.some(Boolean)) {
    waitingForOtherPlayer = false;
    goalMessage = '';
    goalMessageSeconds = 0;
    return;
  }

  const coinsLeft = getCoinsLeft();
  if (coinsLeft > 0) {
    waitingForOtherPlayer = true;
    if (enteredGoal) {
      goalMessage = `You have ${coinsLeft} coin${coinsLeft === 1 ? '' : 's'} left!`;
      goalMessageSeconds = 2;
    }
    return;
  }

  waitingForOtherPlayer = !touching.every(Boolean);
  if (waitingForOtherPlayer) {
    if (enteredGoal) {
      goalMessage = 'Need the other player!';
      goalMessageSeconds = 2;
    }
    return;
  }

  goalMessage = '';
  goalMessageSeconds = 0;

  hasWon = true;
  winAnimationTime = 0;
  nextLevelButton.hidden = levelIndex >= levels.length - 1;
}

function updatePlayer(player, deltaSeconds) {
  const { controls } = player;
  const dir = (controls.right ? 1 : 0) - (controls.left ? 1 : 0);

  if (player.standingPlatform && player.standingPlatform.moving) {
    player.x += player.standingPlatform.moving.deltaX;
  }

  if (controls.up && player.onGround) {
    player.vy = -13;
    player.onGround = false;
    player.standingPlatform = null;
  }

  const previousBottom = player.y + player.size;
  player.vy += 0.7;
  player.x += dir * 5;
  player.y += player.vy;

  player.onGround = false;
  player.standingPlatform = null;
  landOnPlatforms(player, previousBottom);
if (player.y > H) {
  loadLevel(levelIndex);
  return;
}
  if (touchesSpike(player)) {
    loadLevel(levelIndex);
    return;
  }

  if (touchesLava(player)) {
    player.lavaTime += deltaSeconds;
    const damageTicks = Math.floor(player.lavaTime / 0.2);
if (damageTicks > 0) {
  player.health = Math.max(0, player.health - damageTicks);
  player.lavaTime -= damageTicks * 0.2;
}
    if (player.health === 0) {
      loadLevel(levelIndex);
      return;
    }
  } else {
    player.lavaTime = 0;
  }

  collectCoin(player);
  checkGoal();

  if (player.x < 0) player.x = 0;
  const worldWidth = levels[levelIndex].worldWidth ?? W;
  if (player.x + player.size > worldWidth) player.x = worldWidth - player.size;
}

function draw(timestamp = 0) {
  const deltaSeconds = lastFrameTime === 0 ? 0 : Math.min((timestamp - lastFrameTime) / 1000, 0.1);
  lastFrameTime = timestamp;
  goalMessageSeconds = Math.max(0, goalMessageSeconds - deltaSeconds);
  const worldWidth = levels[levelIndex].worldWidth ?? W;
  const playersCenter = players.reduce((sum, player) => sum + player.x + player.size / 2, 0) / players.length;
  cameraOffset = Math.max(0, Math.min(playersCenter - W / 2, worldWidth - W));

  ctx.clearRect(0, 0, W, H);
if (!gameStarted) {
  drawScene();

  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 64px sans-serif';
  ctx.fillText('Press Start to Begin', W / 2, H / 2 - 100);

  ctx.font = '22px sans-serif';
  ctx.fillText('A: Arrow keys to move and jump', W / 2, H / 2 - 35);
  ctx.fillText('Q: WAD keys to move and jump', W / 2, H / 2 + 5);

  requestAnimationFrame(draw);
  return;
}

updateMovingPlatforms();
drawScene();

  drawHealthBars();

  for (const player of players) {
    if (!hasWon) updatePlayer(player, deltaSeconds);
    drawFace(player);
  }

  if (waitingForOtherPlayer && goalMessageSeconds > 0 && !hasWon) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(goalMessage, W / 2, H / 2);
  }

  if (hasWon) {
    winAnimationTime += deltaSeconds;

    const isFinalLevel = levelIndex === levels.length - 1;

    if (isFinalLevel && winAnimationTime >= 3.2) {
      drawGameOverScreen();
    } else {
      drawHighFiveCelebration();

      if (isFinalLevel && winAnimationTime > 2.2) {
        const fade = Math.min((winAnimationTime - 2.2) / 1, 1);
        ctx.fillStyle = 'rgba(255, 255, 255, ${fade})';
        ctx.fillRect(0, 0, W, H);
      }
    }
  }

  requestAnimationFrame(draw);
}

function setKey(event, pressed) {
  const key = event.key.toLowerCase();
  const mapping = keyMap[key];

  if (mapping) {
    const [keySet, action] = mapping;
    keys[keySet][action] = pressed;
    if (action === 'up') event.preventDefault();
  }
}

window.addEventListener('keydown', (event) => setKey(event, true));
window.addEventListener('keyup', (event) => setKey(event, false));

loadLevel(0);
draw();