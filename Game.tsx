import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable
} from 'react-native';
import GameBoard from './components/GameBoard';
import { getRandomTetromino,randomColor } from './components/types';
import { styled } from './components/Styles';

const createEmptyBoard = () => {
  return Array.from({ length: 30 }, () => Array(10).fill(null));
};

const POINT_MULTIPLIER = 10;

export default function Game() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [piece, setPiece] = useState(getRandomTetromino());
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [score, setScore] = useState(0);
  const [intervalDelay, setIntervalDelay] = useState(1000);

  const checkCollision = (shape, pos, board) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newY = pos.y + y;
          const newX = pos.x + x;

          if (newY >= 20 || newX < 0 || newX >= 10) return true;
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
      if (!isGameOver && isGameStarted) {
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
  }, [piece, board, isGameOver, isGameStarted]);

  const getDisplayBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
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
      Array(10).fill(null)
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

  const longMoveDown =()=>{

    const newPos = { x: position.x, y: position.y + 2 };
    if (!checkCollision(piece.shape, newPos, board)) {
      setPosition(newPos);
    }
  }

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
        {isGameStarted ? (
          <>
            <TouchableOpacity onPress={startGame} style={styles.buttonStyles}>
              <Text style={{ color: 'white' }}>Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={moveLeft} style={styles.buttonStyles}>
              <Text style={{ color: 'white' }}>Left</Text>
            </TouchableOpacity>

            <View style={styles.buttonMid}>
              <TouchableOpacity onPress={rotate} style={styles.buttonStyles}>
                <Text style={{ color: 'white' }}>Rotate</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={moveDown} style={styles.buttonStyles} >
                <Text style={{ color: 'white' }}>Down</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={moveRight} style={styles.buttonStyles}>
              <Text style={{ color: 'white' }}>Right</Text>
            </TouchableOpacity>

            {isGamePaused && (
              <TouchableOpacity onPress={startGame} style={styles.buttonStyles}>
                <Text style={{ color: 'white' }}>Pause</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TouchableOpacity onPress={startGame} style={styles.buttonStyles}>
            <Text style={{ color: 'white' }}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const startGame = () => {
    setIsGameOver(false);
    setIsGameStarted(true);
    setBoard(createEmptyBoard());
    setScore(0);
    setPiece(getRandomTetromino());
    setPosition({ x: 3, y: 0 });
  };
/**
        <Text style={styles.title}>Pastel Tetris</Text>*/
  return (
    <SafeAreaView style={styled.container}>
      <View style={styles.titleSection}>
        <Text style={styles.scoreTitle}>Score: {score}</Text>
      </View>

      <View
        style={{
          width: '100%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <GameBoard board={getDisplayBoard()} />
      </View>

      <ButtonSector />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonStyles: {
    width: 50,
    height: 25,
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'monospace',
    marginBottom: 5,
    color:'#0d3b66',
  },
  scoreTitle: { fontSize: 15, fontFamily: 'monospace' },
  buttonBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '10%',
  },
  buttonMid: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
