import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import GameBoard from './components/GameBoard';
import { getRandomTetromino, randomColor } from './components/types';
import { styled } from './components/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NUM_COLS, NUM_ROWS } from './components/types';

const createEmptyBoard = () => {
  return Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(null));
};

const POINT_MULTIPLIER = 10;

export default function Game() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [piece, setPiece] = useState(getRandomTetromino());
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(true);
  const [score, setScore] = useState(0);
  const [intervalDelay, setIntervalDelay] = useState(1000);

  const checkCollision = (shape, pos, board) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newY = pos.y + y;
          const newX = pos.x + x;

          if (newY >= NUM_ROWS || newX < 0 || newX >= NUM_COLS) return true;
          if (newY >= 0 && board[newY][newX]) return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    if (score >= 100) setIntervalDelay(800);
    if (score >= 200) setIntervalDelay(500);
    if (score >= 300) setIntervalDelay(300);
    if (score >= 400) setIntervalDelay(100);
  }, [score]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver && isGameStarted && !isGamePaused) {
        setPosition((prev) => {
          const newPos = { x: prev.x, y: prev.y + 1 };

          if (!checkCollision(piece.shape, newPos, board)) {
            return newPos;
          } else if (prev.y === 0) {
            console.log('🟥 Game Over');
            setIsGameOver(true);
            setIsGameStarted(false);
            return prev;
          } else {
            const newBoard = board.map((row) => [...row]);

            piece.shape.forEach((row, y) => {
              row.forEach((value, x) => {
                if (value) {
                  const boardY = prev.y + y;
                  const boardX = prev.x + x;
                  if (
                    boardY >= 0 &&
                    boardY < newBoard.length &&
                    boardX >= 0 &&
                    boardX < newBoard[0].length
                  ) {
                    newBoard[boardY][boardX] = piece.color;
                  }
                }
              });
            });

            const boardAfterClear = clearUpBoard(newBoard);
            setBoard(boardAfterClear);

            setPiece(getRandomTetromino());
            return { x: 3, y: 0 };
          }
        });
      }
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [piece, board, isGameOver, isGameStarted, isGamePaused]);

  const getDisplayBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (
            boardY >= 0 &&
            boardY < NUM_ROWS &&
            boardX >= 0 &&
            boardX < NUM_COLS
          ) {
            displayBoard[boardY][boardX] = piece.color;
          }
        }
      });
    });

    return displayBoard;
  };

  function clearUpBoard(board: (string | null)[][]): (string | null)[][] {
    const newBoard = board.filter((row) => row.some((cell) => cell === null));
    const rowsCleared = board.length - newBoard.length;
    setScore((prev) => prev + POINT_MULTIPLIER * rowsCleared);
    const emptyRows = Array.from({ length: rowsCleared }, () =>
      Array(NUM_COLS).fill(null)
    );
    return [...emptyRows, ...newBoard];
  }

  const moveLeft = () => {
    const newPos = { x: position.x - 1, y: position.y };
    if (!checkCollision(piece.shape, newPos, board)) {
      setPosition(newPos);
    }
  };

  const moveRight = () => {
    const newPos = { x: position.x + 1, y: position.y };
    if (!checkCollision(piece.shape, newPos, board)) {
      setPosition(newPos);
    }
  };

  const moveDown = () => {
    const newPos = { x: position.x, y: position.y + 1 };
    if (!checkCollision(piece.shape, newPos, board)) {
      setPosition(newPos);
    }
  };

  const longMoveDown = () => {
    const newPos = { x: position.x, y: position.y + 2 };
    if (!checkCollision(piece.shape, newPos, board)) {
      setPosition(newPos);
    }
  };

  const rotate = () => {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map((row) => row[i]).reverse()
    );
    if (!checkCollision(rotated, position, board)) {
      setPiece({ ...piece, shape: rotated });
    }
  };

  const ButtonSector: React.FC = () => {
    return (
      <View style={styles.buttonBar}>
        {isGameStarted && !isGamePaused && (
          <>
            {/*
            // <TouchableOpacity onPress={startGame} style={styles.buttonStyles}>
            //   <Text style={{ color: 'white' }}>Refresh</Text>
            // </TouchableOpacity> */}

            <TouchableOpacity onPress={rotate} style={styles.buttonStyles}>
              <Ionicons name="refresh-outline" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={moveLeft} style={styles.buttonStyles}>
              <Ionicons name="arrow-back-outline" size={20} color="white" />
            </TouchableOpacity>

            <View style={styles.buttonMid}>
              <TouchableOpacity onPress={moveDown} style={styles.buttonStyles}>
                <Ionicons name="arrow-down-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={moveRight} style={styles.buttonStyles}>
              <Ionicons name="arrow-forward-outline" size={20} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  const startGame = () => {
    if (!isGamePaused) {
      setIsGameOver(false);
      setIsGameStarted(true);
      setBoard(createEmptyBoard());
      setScore(0);
      //setPiece(getRandomTetromino());
      setPosition({ x: 3, y: 0 });
    } else { 
      setIsGamePaused(false);
      if(!isGameStarted){
        setIsGameOver(false);
        setIsGameStarted(true);
        setBoard(createEmptyBoard());
        setScore(0);
        //setPiece(getRandomTetromino());
        setPosition({ x: 3, y: 0 });

      }
    }
  };

  const pauseGame = () => {
    setIsGamePaused(true);
  };
  /**
        <Text style={styles.title}>Pastel Tetris</Text>*/
  return (
    <SafeAreaView style={styled.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Pastel Tetris</Text>

        {!isGamePaused ? (
          <>
            <Text style={styles.title}>{score}</Text>
            <TouchableOpacity onPress={pauseGame} style={styles.buttonStyles}>
              <Ionicons name="pause-outline" size={20} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={startGame} style={styles.buttonStyles}>
              <Ionicons name="play-outline" size={20} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.gameContainer}>
        <GameBoard board={getDisplayBoard()} />
      </View>

      <ButtonSector />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyles: {
    width: 50,
    height: 40,
    backgroundColor: '#0d3b66',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  titleSection: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontFamily: 'monospace',
    marginBottom: 5,
    color: '#0d3b66',
  },
  scoreTitle: { fontSize: 15, fontFamily: 'monospace', marginBottom: 5 },
  buttonBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '10%',
  },
  buttonMid: {
    justifyContent: 'space-around',
  },
});
