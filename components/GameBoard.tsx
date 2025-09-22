import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const NUM_ROWS = 40;
const NUM_COLS = 10;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Board dimensions (max ~80% height, 90% width)
const BOARD_WIDTH = windowWidth * 0.9;
const BOARD_HEIGHT = windowHeight * 0.65; // Adjust as needed

// Cell dimensions
const CELL_WIDTH = BOARD_WIDTH / NUM_COLS;
const CELL_HEIGHT = BOARD_HEIGHT / NUM_ROWS;

type GameBoardProps = {
  board: (string | null)[][];
}

export default function GameBoard({ board }: GameBoardProps) {
  console.log(CELL_HEIGHT,CELL_WIDTH,BOARD_HEIGHT,BOARD_WIDTH)
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
    height:'100%',
    width:'100%',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    height:20,
    width:20,
    borderWidth: 0.5,
    borderColor: 'black',
  },
});
