import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Piece from '../Piece/Piece';
import PieceTarget from '../PieceTarget/PieceTarget';
import Score from '../Score/Score';
import SoughtPiece from '../SoughtPiece/SoughtPiece';
import { EventBus } from './../../common/EventBus/EventBus';
import { EventTypes } from './../../common/EventBus/EventTypes';
import './app.less';

export const App = () => {
  const pieces = [
    'assets/zoovu-logo/1.png',
    'assets/zoovu-logo/2.png',
    'assets/zoovu-logo/3.png',
    'assets/zoovu-logo/4.png',
    'assets/zoovu-logo/5.png',
  ];

  const [piecesUnrevealed, setPiecesUnrevealed] = useState([...pieces]);
  const [piecesMatched, setPiecesMatched] = useState([]);
  const [soughtPiece, setSoughtPiece] = useState();
  const [gameStarted, setGameStarted] = useState(false);

  const onPieceTouched = (url) => {
    if (!gameStarted) {
      EventBus.emit(EventTypes.GameStart);
      setGameStarted(true);
    }
    if (url !== soughtPiece) {
      EventBus.emit(EventTypes.WrongPiece);
    }
  };

  const onSoughtPieceChanged = (piece) => {
    setSoughtPiece(piece);
  };

  const checkIfMatchedCorrectly = (index, name) => {
    console.log('checkIfMatchedCorrectly', index, name);
    return true;
  };

  const handleDrop = useCallback(
    (index, piece, rest) => {
      console.log('handleDrop', index, piece, rest);
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
      <div className="appContainer">
        <div className="gameArea">
          <div className="gameArea__pieces">
            {pieces.map((url, index) => (
              <Piece
                imageUrl={url}
                onMouseDown={() => onPieceTouched(url)}
                canDrag={soughtPiece === url}
                key={index}
              />
            ))}
          </div>
          <div className="gameArea__targets">
            {pieces.map((url, index) => (
              <PieceTarget
                onDrop={(item, ...rest) => handleDrop(index, item, rest)}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="infoArea">
          <Score />
          <SoughtPiece 
            sougthPieces={piecesUnrevealed}
            onChange={onSoughtPieceChanged}
          />
        </div>
      </div>
    </DndProvider>
  );
};
