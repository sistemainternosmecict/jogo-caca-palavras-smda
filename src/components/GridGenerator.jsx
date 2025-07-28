const GRID_WIDTH = 16;
const GRID_HEIGHT = 16;

// Somente horizontal e vertical (incluindo reversas)
const DIRECTIONS = [
  [1, 0], // → horizontal
  [0, 1], // ↓ vertical
];

function createEmptyGrid(width, height) {
  return Array.from({ length: height }, () => Array(width).fill(null));
}

function getRandomDirection() {
  return DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
}

function getRandomPosition(width, height) {
  return [
    Math.floor(Math.random() * height),
    Math.floor(Math.random() * width),
  ];
}

function canPlaceWord(grid, word, row, col, dx, dy) {
  for (let i = 0; i < word.length; i++) {
    const x = col + dx * i;
    const y = row + dy * i;
    if (
      x < 0 ||
      x >= GRID_WIDTH ||
      y < 0 ||
      y >= GRID_HEIGHT ||
      (grid[y][x] && grid[y][x] !== word[i])
    ) {
      return false;
    }
  }
  return true;
}

function placeWord(grid, word) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const [dx, dy] = getRandomDirection();
    const [row, col] = getRandomPosition(GRID_WIDTH, GRID_HEIGHT);
    if (canPlaceWord(grid, word, row, col, dx, dy)) {
      for (let i = 0; i < word.length; i++) {
        const x = col + dx * i;
        const y = row + dy * i;
        grid[y][x] = word[i];
      }
      return true;
    }
  }
  return false;
}

function fillGrid(grid) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÃÕÇ";
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (!grid[y][x]) {
        grid[y][x] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }
}

export function generateWordSearch(words) {
  const grid = createEmptyGrid(GRID_WIDTH, GRID_HEIGHT);
  words.forEach((word) => {
    if (!placeWord(grid, word)) {
      console.warn(`Não foi possível posicionar: ${word}`);
    }
  });
  fillGrid(grid);
  return grid;
}
