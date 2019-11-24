import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Piece from '../Piece/Piece';
import PieceTarget from '../PieceTarget/PieceTarget';
import './app.less';

export const App = () => {
  const pieces = [
    'assets/zoovu-logo/1.png',
    'assets/zoovu-logo/2.png',
    'assets/zoovu-logo/3.png',
    'assets/zoovu-logo/4.png',
    'assets/zoovu-logo/5.png',
  ];

  const [piecesMatched, setPiecesMatched] = useState([]);

  const checkIfMatchedCorrectly = (index, name) => {
    console.log('checkIfMatchedCorrectly', index, name);
    return true;
  };

  const handleDrop = useCallback(
    (index, piece) => {
      const { name } = piece;
      setPiecesMatched(
        update(piecesMatched, {
          [index]: {
            $set: [checkIfMatchedCorrectly(index, name)],
          },
        }),
      );
    },
    [piecesMatched],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <div>
          {pieces.map((url, index) => (
            <Piece
              imageUrl={url}
              key={index}
            />
          ))}
        </div>
        <div>
          {pieces.map((url, index) => (
            <PieceTarget
              onDrop={item => handleDrop(index, item)}
              key={index}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};
