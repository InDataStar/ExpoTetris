import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getRandomTetromino,randomColor } from './components/types';

const CELL_SIZE = 25;
const TETRIS_SHAPES = [
  // I
  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
  // O
  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
  // L
  [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}],
  // J
  [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 2}],
  // T
  [{x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}],
  // S
  [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
  // Z
  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}],
];

const Splash = () => {
  const navigation = useNavigation();
  const [randoCOlor,setRandoColor] = useState('')
  const [currentShape, setCurrentShape] = useState(TETRIS_SHAPES[0]);

  const goToMain = useCallback(() => {
    navigation.navigate('Game');
  }, [navigation]);

  useEffect(() => {
    const shapeTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * TETRIS_SHAPES.length);
      setRandoColor(randomColor());
      setCurrentShape(TETRIS_SHAPES[randomIndex]);
    }, 500); // change shape every 400ms

    const navTimer = setTimeout(() => {
      goToMain();
    }, 4000); // ⏱ 3 seconds

    return () => {
      clearInterval(shapeTimer);
      clearTimeout(navTimer);
    };
  }, [goToMain]);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {currentShape.map((cell, index) => (
          <View
            key={index}
            style={[
              styles.cell,
              {
                backgroundColor:randoCOlor,
                position: 'absolute',
                top: cell.y * CELL_SIZE,
                left: cell.x * CELL_SIZE,
              },
            ]}
          />
        ))}
      </View>
      <Text style={styles.title}>Pastel Tetris</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf0ca',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    width: CELL_SIZE * 4,
    height: CELL_SIZE * 4,
    marginBottom: 5,
    position: 'relative',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#AAF683',
    borderWidth: 0.5,
    borderColor: '#faf0ca',
  },
  title: {
    fontSize: 20,
    fontFamily: 'monospace',
    marginBottom: 5,
    color: '#0d3b66',
  },
});

export default Splash;
