// This section is for the actual game mechanics. All of the "const" lines declare an element of the game, and will be useful later.
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
  { // This is the code for level one
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
  { // This is the ode for level two
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
  { // This is the code for level three
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
  { // This is the code for level four
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
  { // Lastly, this is the code for level five
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
    goal: { x: 3930, y: H - 180, width: 34, height: 72 },
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
let introActive = false;
let introTime = 0;
let hasWon = false;
let waitingForOtherPlayer = false;
let goalMessageSeconds = 0;
let goalMessage = '';
let playerWasAtGoal = [false, false];
let winAnimationTime = 0;
let lastFrameTime = 0;
let cameraOffset = 0;
let audioContext;
// This is the code for all of the level music
const levelMusic = [
  new Audio('Q n A music 1.mp3'), 
  new Audio('Q n A music 2.mp3'),
  new Audio('Q n A music 3.mp3'),
  new Audio('Q n A music 4.mp3'),
  new Audio('Q n A music 5.mp3')  
];

levelMusic.forEach(music => {
  music.loop = true;
  music.volume = 1.0;
});

const players = [
  { x: 120, y: 200, size: 70, vy: 0, onGround: false, standingPlatform: null, color: '#e8d4b8', label: 'A', controls: keys.arrows, health: 10, maxHealth: 10, lavaTime: 0 },
  { x: 120, y: 200, size: 70, vy: 0, onGround: false, standingPlatform: null, color: '#f29e4c', label: 'Q', controls: keys.wasd, health: 10, maxHealth: 10, lavaTime: 0 }
];

function loadLevel(index) {
  levelIndex = index;

levelMusic.forEach(music => {
  music.pause();
  music.currentTime = 0;
  music.volume = 1.0;
});

if (levelMusic[index]) {
  levelMusic[index].play().catch(() => {});
}

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
// Below is the code for the developer button
developerToolsButton.addEventListener('click', () => {
  const code = prompt('Enter developer code:');

  if (code !== '5683') {
    if (code !== null) alert('Incorrect code.');
    return;
  }

  developerLevelMenu.replaceChildren();
  // Here's the code for the dropdown developer menu
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

  const endScreenButton = document.createElement('button');
  endScreenButton.type = 'button';
  endScreenButton.textContent = 'End Screen';
  endScreenButton.addEventListener('click', () => {
    gameStarted = true;
    startGameButton.hidden = true;
    loadLevel(levels.length - 1);
    hasWon = true;
    winAnimationTime = 3.2;
    developerLevelMenu.hidden = true;
  });
  developerLevelMenu.append(endScreenButton);

  developerLevelMenu.hidden = false;
});
// This is the code for the start game and next level buttons
nextLevelButton.addEventListener('click', () => loadLevel(Math.min(levelIndex + 1, levels.length - 1)));
startGameButton.addEventListener('click', () => {
  audioContext = new AudioContext();
  developerLevelMenu.hidden = false;
});

nextLevelButton.addEventListener('click', () => loadLevel(Math.min(levelIndex + 1, levels.length - 1)));
startGameButton.addEventListener('click', () => {
  audioContext = new AudioContext();
  gameStarted = true;
  startGameButton.hidden = true;
});

levelMusic[0].play().then(() => {
  levelMusic[0].pause();
  levelMusic[0].currentTime = 0;
}).catch(error => console.log(error));

  gameStarted = true;
  introActive = true;
  startGameButton.hidden = true;
});
// This code draws the faces of the players
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
// This code draws the characters that apper in the beginning cut scene and the end screen

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
// This is the code for the intro sequence
function drawIntroScene(time) {
  ctx.fillStyle = '#9ed8f5';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#83c96b';
  ctx.fillRect(0, 390, W, H - 390);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#284b35'
  ctx.font = 'bold 38px sans-serif';

  if (time < 2.5) {
    ctx.fillText('One day, brothers Q and A found some coins.', W / 2, 90);

    drawCelebrationCharacter(250, 330, players[0]);
    drawCelebrationCharacter(650, 330, players[1]);

    const rows = [4, 3, 2, 1,];

    rows.forEach((coinCount, row) => {
      for (let coin = 0; coin < coinCount; coin += 1) {
        const x = W / 2 + (coin - (coinCount - 1) / 2) * 24;
        const y = 376 - row * 20;

        ctx.fillStyle = '#f4d13b';
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#d7a600';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    return;
  }
if (time < 5) {
  ctx.fillText('But then, a tornado came soon after!', W / 2, 90);

  drawCelebrationCharacter(100, 330, players[0]);
  drawCelebrationCharacter(800, 330, players[1]);

  const progress = (time - 2.5) / 2.5;
  const tornadoX = 120 + progress * (W - 240);
  const tornadoY = 350;

  ctx.strokeStyle = '#8a8a8a';
  ctx.lineWidth = 5;

  for (let ring = 0; ring < 5; ring += 1) {
    const width = 18 + (4 - ring) * 9;
    const y = tornadoY - 38 + ring * 18;

    ctx.beginPath();
    ctx.ellipse(tornadoX, y, width, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (let coin = 0; coin < 6; coin += 1) {
    const angle = time * 7 + coin * (Math.PI * 2 / 6);
    const x = tornadoX + Math.cos(angle) * 45;
    const y = tornadoY + Math.sin(angle) * 28;

    ctx.fillStyle = '#ffd45c'
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  return;
}

ctx.fillText('The coins were blown all over the place!', W / 2, 90);

const tileWidth = 145;
const gap = 25;
const firstTileX = (W - (5 * tileWidth + 4 * gap)) / 2
const mapY = 250;

ctx.strokeStyle = '#6e9a61';
ctx.lineWidth = 6;
ctx.beginPath();
ctx.moveTo(firstTileX + tileWidth / 2, mapY + 45);

for (let level = 1; level < 5; level += 1) {
  const markerX = firstTileX + level * (tileWidth + gap) + tileWidth / 2;
  ctx.lineTo(markerX, mapY + 45);
}

ctx.stroke();

for (let level = 0; level < 5; level += 1) {
  const x = firstTileX + level * (tileWidth + gap);

  ctx.fillStyle = ['#d8edff', '#d5efcc', '#f7e3bd', '#e4d7f5', '#f2d1d1'][level];
  ctx.fillRect(x, mapY, tileWidth, 90);

  ctx.fillStyle = '#ffd45c';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText(`Level ${level + 1}`, x + tileWidth / 2, mapY + 28);

  if (time > 5 + level * 0.5) {
    ctx.fillStyle = '#284b35';
    ctx.beginPath();
    ctx.arc(x + tileWidth / 2, mapY + 62, 12, 0, Math.PI * 2);
    ctx.fill();
  }
}

ctx.font = '22px sans-serif';
ctx.fillText('Now, they are going to get them back!', W / 2, 410);
}
// This code is for the handshake animation they do once you beat a level
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
// This code is for the end screen animations
function drawGameOverScreen() {
  const endingTime = Math.max(0, winAnimationTime - 3.2);

  ctx.fillStyle = '#9ed8f5';
  ctx.fillRect(0, 0, W, H);

  const sunY = H * 0.42 - Math.min(endingTime / 1.5, 1) * (H * 0.32);
  ctx.fillStyle = '#ffd45c';
  ctx.beginPath();
  ctx.arc(W - 90, sunY, 38, 0, Math.PI * 2);
  ctx.fill();

  for (let cloud = 0; cloud < 3; cloud += 1) {
    const cloudX = ((cloud * 350 + endingTime * (18 + cloud * 5)) % (W + 180)) - 90;
    const cloudY = 75 + cloud * 48;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(cloudX, cloudY, 22, 0, Math.PI * 2);
    ctx.arc(cloudX + 25, cloudY - 10, 28, 0, Math.PI * 2);
    ctx.arc(cloudX + 52, cloudY, 21, 0, Math.PI * 2);
    ctx.fill();
  }

const groundY = H * 0.72;
ctx.fillStyle = '#83c96b';
ctx.fillRect(0, groundY, W, H - groundY);

for (let flower = 0; flower < 9; flower += 1) {
  const flowerX = 45 + flower * 110;
  const bloom = Math.min(Math.max((endingTime - flower * 0.12) / 0.35, 0), 1);
  if (bloom === 0) continue;

  ctx.save();
  ctx.translate(flowerX, groundY + 28);
  ctx.scale(bloom, bloom);
  ctx.strokeStyle = '#3f8a43';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -22);
  ctx.stroke();
  
  ctx.fillStyle = flower % 2 === 0 ? '#ff78a8' : '#fff2a6';
  for (let petal = 0; petal < 5; petal += 1) {
    const angle = petal * Math.PI * 2 / 5;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * 7, -22 + Math.sin(angle) * 7, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = ' #ffd45c';
  ctx.beginPath();
  ctx.arc(0, -22, 3, 0, Math.PI *2);
  ctx.fill();
  ctx.restore();
}
const bounce = Math.abs(Math.sin(endingTime * 5)) * 14
const characterY = groundY - 40 - bounce;
drawCelebrationCharacter(W / 2 - 70, characterY, players[1]);
drawCelebrationCharacter(W / 2 + 10, characterY, players[0]);

const confettiColors = ['#f15b5b', '#ffd45c', '#4f9de8', '#a66be0', '#46b978'];
for (let piece = 0; piece < 60; piece += 1) {
  const  x = (piece * 97 + Math.sin(piece * 12.3) * 35 + W) % W;
  const speed = 70 + (piece * 17) % 90;
  const y = ((endingTime * speed + piece * 47) % (H + 50)) - 2;

  ctx.save();
  ctx.translate(x + Math.sin(endingTime * 3 + piece) * 12, y);
  ctx.rotate(endingTime * 2 + piece);
  ctx.fillStyle = confettiColors[piece % confettiColors.length];
  ctx.fillRect(-3, -5, 6, 10);
  ctx.restore();
}

const titleScale = 0.6 + 0.4 * Math.min(endingTime / 0.45, 1);
ctx.save();
ctx.translate(W / 2, H * 0.2);
ctx.scale(titleScale, titleScale);
ctx.fillStyle = '#284b35';
ctx.font = 'bold 58px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('The End! Thanks for playing!', 0, 0);
ctx.restore();
}
// This draws the spikes

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
// This draws the health bars
function drawHealthBars() {
  for (const [index, player] of players.entries()) {
    const x = index === 0 ? 20 : W - 220;
    const y = 20;
    const width = 200;
    const height = 18;
    const gap = 3;
    const tickWidth = (width - gap * (player.maxHealth - 1)) / player.maxHealth;

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
// Below is the code for the background element and effects for each level

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
// this is the code for the mountains in level two
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
// This is the code for the moving platforms
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
// This allows players to land on the platforms
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
// This is for the coin collect sound
function playCoinSound() {
  if (!audioContext) return;

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();

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
// This allows the players to actually collet the coins

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
// This identifies if a player is touching a spike
function touchesSpike(player) {
  return spikes.some((spike) => player.x < spike.x + spike.width &&
    player.x + player.size > spike.x &&
    player.y < spike.y + spike.height &&
    player.y + player.size > spike.y);
}
// This identifies if a player is touching lava
function touchesLava(player) {
  return lava.some((pool) => player.x < pool.x + pool.width &&
    player.x + player.size > pool.x &&
    player.y < pool.y + pool.height &&
    player.y + player.size > pool.y);
}

function getCoinsLeft() {
  return coins.filter((coin) => !coin.collected).length;
}
// This determines if a player is touching the goal
function checkGoal() {
  if (hasWon) return;

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
// This part checks if all coins have been collected, and if both players are at the goal before beating the level (You gotta work together!)
  const enteredGoal = touching.some((atGoal, index) => atGoal && !playerWasAtGoal[index]);
  playerWasAtGoal = touching;

  if (!touching.some(Boolean)) {
    waitingForOtherPlayer = false;
    goalMessage = '';
    goalMessageSeconds = 0;
    return;
  }


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
  // This kills the player if touching a spike
if (touchesSpike(player)) {
  if (touchesSpike(player)) {
    loadLevel(levelIndex);
    return;
  }
// This is the code for the lava damage
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

  if (introActive) {
    introTime += deltaSeconds;
    drawIntroScene(introTime);

    if (introTime >= 10) {
      introActive = false;
      loadLevel(0);
    }

    requestAnimationFrame(draw);
    return;
  }
// This is for the beginning screen
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

        levelMusic[levelIndex].volume = Math.max(
          0, 
          levelMusic[levelIndex].volume - deltaSeconds
        );

        if (levelMusic[levelIndex].volume === 0) {
          levelMusic[levelIndex].pause();
        }

        const fade = Math.min((winAnimationTime - 2.2) / 1, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
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

// And that brings us to the end of the JavaScript portion of the code! If you're reading this, thanks for looking at the code <3
// I hope you have a great rest of your day/night! 
// Also, for anyone wondering, you an use this code, just remember to give credit please!
// I'll leave a few fun facts for you, since you came all the way here.
// The inspiration for the names "Q" and "A" come from my dad and his brother, A for Antonio, and Q for Quinten.
// This is my first game, hopefully the first of many!
// I'm 16 years old at the time of writing this.
// There MIGHT (very strong might) be a part two of this game.
// Note to self, open terminal and paste "python3 -m http.server 8000" and click enter to open game.
draw();
