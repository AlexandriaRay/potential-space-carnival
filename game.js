const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const nextLevelButton = document.getElementById('next-level');

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
    platforms: [
      { x: 0, y: H - 18, width: W, height: 18 },
      { x: 70, y: 430, width: 160, height: 16 },
      { x: 280, y: 350, width: 140, height: 16 },
      { x: 480, y: 420, width: 150, height: 16 },
      { x: 650, y: 330, width: 160, height: 16 },
      { x: 810, y: 260, width: 110, height: 16 }
    ],
    goal: { x: 880, y: 188, width: 34, height: 72 },
    spikes: [
      { x: 305, y: 330, width: 32, height: 20 },
      { x: 715, y: 310, width: 32, height: 20 }
    ],
    coins: [
      { x: 95, y: 405 },
      { x: 350, y: 325 },
      { x: 530, y: 395 },
      { x: 680, y: 305 },
      { x: 860, y: 235 }
    ]
  },
  {
    platforms: [
      { x: 0, y: H - 18, width: W, height: 18 },
      { x: 55, y: 440, width: 150, height: 16 },
      { x: 215, y: 375, width: 110, height: 16 },
      { x: 330, y: 310, width: 170, height: 16 },
      { x: 540, y: 430, width: 140, height: 16 },
      { x: 680, y: 350, width: 120, height: 16 },
      { x: 760, y: 275, width: 120, height: 16, moving: { axis: 'x', min: 760, max: 900, speed: 1.3, dir: 1, deltaX: 0 } }
    ],
    goal: { x: 905, y: 203, width: 34, height: 72 },
    spikes: [
      { x: 245, y: 357, width: 38, height: 18 },
      { x: 705, y: 332, width: 50, height: 18 }
    ],
    coins: [
      { x: 110, y: 415 },
      { x: 390, y: 285 },
      { x: 605, y: 405 },
      { x: 875, y: 250 }
    ]
  }
];

let levelIndex = 0;
let platforms = levels[levelIndex].platforms;
let goal = levels[levelIndex].goal;
let spikes = levels[levelIndex].spikes;
let coins = levels[levelIndex].coins.map((coin) => ({ ...coin, collected: false }));
let hasWon = false;

const players = [
  { x: 120, y: 200, size: 70, vy: 0, onGround: false, standingPlatform: null, color: '#e8d4b8', controls: keys.arrows },
  { x: 120, y: 200, size: 70, vy: 0, onGround: false, standingPlatform: null, color: '#f29e4c', controls: keys.wasd }
];

function loadLevel(index) {
  levelIndex = index;
  platforms = levels[index].platforms.map((platform) => ({
    ...platform,
    moving: platform.moving ? { ...platform.moving, deltaX: 0 } : undefined
  }));
  goal = levels[index].goal;
  spikes = levels[index].spikes;
  coins = levels[index].coins.map((coin) => ({ ...coin, collected: false }));
  hasWon = false;
  nextLevelButton.hidden = true;

  players.forEach((player) => {
    player.x = 120;
    player.y = 200;
    player.vy = 0;
    player.onGround = false;
    player.standingPlatform = null;
  });
}

nextLevelButton.addEventListener('click', () => loadLevel(Math.min(levelIndex + 1, levels.length - 1)));

function drawFace(player) {
  const { x, y, size, color } = player;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);

  const eyeY = y + size * 0.38;
  const eyeRadius = size * 0.08;

  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(x + size * 0.3, eyeY, eyeRadius, 0, Math.PI * 2);
  ctx.arc(x + size * 0.7, eyeY, eyeRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size * 0.68, size * 0.24, 0.2, Math.PI - 0.2);
  ctx.stroke();
}

function drawSpike(spike) {
  ctx.fillStyle = '#d44c46';
  ctx.beginPath();
  ctx.moveTo(spike.x, spike.y + spike.height);
  ctx.lineTo(spike.x + spike.width / 2, spike.y);
  ctx.lineTo(spike.x + spike.width, spike.y + spike.height);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#6d2a2a';
  ctx.stroke();
}

function drawScene() {
  ctx.fillStyle = '#9ed8f5';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#ffd45c';
  ctx.beginPath();
  ctx.arc(100, 90, 42, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#6f9e55';
  for (const platform of platforms) {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  }

  for (const spike of spikes) {
    drawSpike(spike);
  }

  ctx.fillStyle = '#554332';
  ctx.fillRect(goal.x, goal.y, 5, goal.height);
  ctx.fillStyle = '#e64b3c';
  ctx.beginPath();
  ctx.moveTo(goal.x + 5, goal.y);
  ctx.lineTo(goal.x + goal.width, goal.y + 13);
  ctx.lineTo(goal.x + 5, goal.y + 26);
  ctx.closePath();
  ctx.fill();

  for (const coin of coins) {
    if (coin.collected) continue;

    ctx.fillStyle = '#f4d13b';
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#d7a600';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, 10, 0, Math.PI * 2);
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

function collectCoin(player) {
  for (const coin of coins) {
    const touching = player.x + player.size > coin.x - 14 &&
      player.x < coin.x + 14 &&
      player.y + player.size > coin.y - 14 &&
      player.y < coin.y + 14;

    if (touching) coin.collected = true;
  }
}

function touchesSpike(player) {
  return spikes.some((spike) => player.x < spike.x + spike.width &&
    player.x + player.size > spike.x &&
    player.y < spike.y + spike.height &&
    player.y + player.size > spike.y);
}

function checkGoal(player) {
  const touching = player.x < goal.x + goal.width &&
    player.x + player.size > goal.x &&
    player.y < goal.y + goal.height &&
    player.y + player.size > goal.y;

  if (touching && !hasWon) {
    hasWon = true;
    nextLevelButton.hidden = levelIndex >= levels.length - 1;
  }
}

function updatePlayer(player) {
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

  if (touchesSpike(player)) {
    loadLevel(levelIndex);
    return;
  }

  collectCoin(player);
  checkGoal(player);

  if (player.x < 0) player.x = 0;
  if (player.x + player.size > W) player.x = W - player.size;
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  updateMovingPlatforms();
  drawScene();

  for (const player of players) {
    if (!hasWon) updatePlayer(player);
    drawFace(player);
  }

  if (hasWon) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 64px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('You win!', W / 2, H / 2);
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
