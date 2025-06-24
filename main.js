const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 40;
const cols = 10;
const rows = 10;

let player = {
  x: 0, y: 0, hp: 10, food: 3, char: "Captain"
};

const bgm = new Audio('assets/audio/bgm.mp3');
const sfxHit = new Audio('assets/audio/attack.wav');
const sfxLoot = new Audio('assets/audio/loot.wav');
bgm.loop = true;
let soundEnabled = true;

function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    bgm.play();
  } else {
    bgm.pause();
  }
}

function saveGame() {
  localStorage.setItem('ww-save', JSON.stringify(player));
}

function loadGame() {
  const data = localStorage.getItem('ww-save');
  if (data) {
    player = JSON.parse(data);
  }
}

function drawGrid() {
  ctx.fillStyle = '#b39259';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.strokeStyle = '#6e4c18';
      ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }

  ctx.fillStyle = '#0f0';
  ctx.fillRect(player.x * gridSize + 5, player.y * gridSize + 5, gridSize - 10, gridSize - 10);

  ctx.fillStyle = '#fff';
  ctx.font = '16px monospace';
  ctx.fillText(`${player.char} | HP: ${player.hp} | Vorräte: ${player.food}`, 10, canvas.height - 10);
}

function movePlayer(dx, dy) {
  const nx = player.x + dx;
  const ny = player.y + dy;
  if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
    player.x = nx;
    player.y = ny;

    if (Math.random() < 0.3) {
      if (Math.random() < 0.5) {
        player.hp--;
        if (soundEnabled) sfxHit.play();
        alert('Mutant greift an! -1 HP');
      } else {
        player.food++;
        if (soundEnabled) sfxLoot.play();
        alert('Du findest Vorräte! +1');
      }
    }
  }
  saveGame();
  drawGrid();
}

function startGame() {
  const charSelect = document.getElementById('characterSelect');
  player.char = charSelect.value;
  document.getElementById('menu').style.display = 'none';
  document.getElementById('gameCanvas').style.display = 'block';
  document.getElementById('controls').style.display = 'block';
  document.getElementById('soundToggle').style.display = 'block';
  drawGrid();
  saveGame();
  if (soundEnabled) bgm.play();
}

loadGame();
if (localStorage.getItem('ww-save')) {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('gameCanvas').style.display = 'block';
  document.getElementById('controls').style.display = 'block';
  document.getElementById('soundToggle').style.display = 'block';
  drawGrid();
  if (soundEnabled) bgm.play();
}
