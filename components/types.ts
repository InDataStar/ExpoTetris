

export const NUM_ROWS = 20;
export const NUM_COLS = 10;

export const randomColor =()=>{
  return colors[Math.floor(Math.random()*colors.length)]
}
export const colors:string[] = [
  "#AEC6CF", // Pastel Blue
  "#FFD1DC", // Pastel Pink
  "#77DD77", // Pastel Green
  "#FDFD96", // Pastel Yellow
  "#CBAACB", // Pastel Purple
  "#FFB347", // Pastel Orange
  "#B39EB5", // Pastel Lavender
  "#FF6961", // Pastel Red
  "#CB99C9", // Pastel Violet
  "#77AADD", // Light Pastel Blue
  "#FFDAC1", // Pastel Peach
  "#E0BBE4", // Pastel Mauve
  "#C1E1C1", // Mint Pastel Green
  "#FFFACD", // Lemon Chiffon (Pastel Yellow)
  "#D3C4E3", // Pastel Lilac

  // Pastel Neutrals
  "#F5F5DC", // Beige
  "#E8E4D9", // Light Grayish Beige
  "#D6CFC7", // Pastel Taupe
  "#F0EAD6", // Ivory
  "#DAD7CD", // Pastel Gray

  // Pastel Metallics (soft muted metallic hues)
  "#D1C4B2", // Pastel Bronze
  "#C7B9B0", // Rose Gold Pastel
  "#BFC0C0", // Pastel Silver
  "#D6A77A", // Soft Pastel Copper
  "#E3D7C6"  // Pastel Champagne
];
export const TETROMINOES = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: randomColor(),
  },
  O: {
    shape:[
    [1, 1],
    [1, 1],
  ],
    color: randomColor(),
  },
  T: {
    shape:[
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
    color: randomColor(),
  },
  L: {
    shape:[
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
    color: randomColor(),
  },
  J:{
    shape: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
    color: randomColor(),
  },
  S:{
    shape: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
    color: randomColor(),
  },
  Z:{
    shape: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
    color: randomColor(),
  },
};
export type Cell = {
  filled: boolean;
  color: string | null;
  isGhost?: boolean;
  isCurrentPiece?: boolean;
};


export const getRandomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const rand = keys[Math.floor(Math.random() * keys.length)];
  const tetromino = TETROMINOES[rand];
  return {
    shape: tetromino.shape,
    color: randomColor(),
  };
};
