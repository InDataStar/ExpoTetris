
export const randomColor =()=>{
  return colors[Math.floor(Math.random()*colors.length)]
}
export const colors =['#EE6055','#60D394','#AAF683','#FFD97D','#FF9B85','#FFAC81','#FF928B','#FEC3A6','#EFE9AE','#CDEAC0']
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
