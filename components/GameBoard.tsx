import React from 'react';
import { NUM_COLS, NUM_ROWS } from './types';
import { View, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Board dimensions (e.g. max ~65% height, 90% width)
const BOARD_WIDTH = windowWidth * 0.95;
const BOARD_HEIGHT = windowHeight * 0.79;

// Cell dimensions based on board size and number of rows/cols
const CELL_WIDTH = BOARD_WIDTH / NUM_COLS;
const CELL_HEIGHT = BOARD_HEIGHT / NUM_ROWS;

type GameBoardProps = {
  board: (string | null)[][];
};

export default function GameBoard({ board }: GameBoardProps) {
  return (
    <View style={[styles.board]}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View
              key={colIndex}
              style={[
                styles.cell,
                {
                  backgroundColor: cell ? cell : '#eee',
                  width: CELL_WIDTH,
                  height: CELL_HEIGHT,
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: BOARD_HEIGHT,
    width: BOARD_WIDTH,
    backgroundColor: '#ddd', // Optional: for visibility
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 0.5,
    borderColor: '#ecf0f1',
  },
});
