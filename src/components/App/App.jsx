import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import shuffle from 'lodash.shuffle';
import Piece from '../Piece/Piece';
import PieceTarget from '../PieceTarget/PieceTarget';
import Score from '../Score/Score';
import SoughtPiece from '../SoughtPiece/SoughtPiece';
import { EventBus } from './../../common/EventBus/EventBus';
import { EventTypes } from './../../common/EventBus/EventTypes';
import { mapIndexes } from '../../common/arrayUtils';
import './app.less';

export const App = ({ pieces }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [piecesShuffled] = useState(shuffle(pieces));
  const [shuffledToOrdered] = useState(mapIndexes(piecesShuffled, pieces));

  const [piecesUnrevealed, setPiecesUnrevealed] = useState([...piecesShuffled]);
  const [piecesMatched, setPiecesMatched] = useState([]); 
  const [piecesTargetCoords, setPiecesTargetCoords] = useState([]);
  const [soughtPiece, setSoughtPiece] = useState();

  const onPieceTouched = (url) => {
    if (!gameStarted) {
      EventBus.emit(EventTypes.GameStart);
      setGameStarted(true);
    }
    if (url !== soughtPiece && piecesUnrevealed.indexOf(url) !== -1) {
      EventBus.emit(EventTypes.WrongPiece);
    }
  };

  const onSoughtPieceChanged = useCallback(
    (piece) => {
      setSoughtPiece(piece);
    }, [],
  );
    
  const handleGameOver = () => {
    EventBus.emit(EventTypes.GameOver);
    setTimeout(() => {
      EventBus.emit(EventTypes.AppRestart);
    }, 3000);
  };

  const onDrop = useCallback(
    (pieceIndex, targetIndex, targetCoordinates) => {
      const isMatched = shuffledToOrdered[pieceIndex] === targetIndex;

      if (isMatched) {
        if (piecesMatched.indexOf(pieceIndex) !== -1) return;
        if (piecesMatched.length === piecesShuffled.length - 1) {
          handleGameOver();
        }
        setPiecesMatched([...piecesMatched, piecesShuffled[pieceIndex]]);
      } else {
        setPiecesMatched(piecesMatched.filter(item => item !== piecesShuffled[pieceIndex]));
      }

      const newPiecesUnrevealed = piecesUnrevealed.filter(item => item !== piecesShuffled[pieceIndex]);
      if (newPiecesUnrevealed.length !== piecesUnrevealed.length) {
        setPiecesUnrevealed(newPiecesUnrevealed);
      }

      setPiecesTargetCoords(
        update(piecesTargetCoords, {
          [pieceIndex]: {
            $set: targetCoordinates,
          },
        }),
      );
    },
    [piecesMatched, piecesUnrevealed, piecesTargetCoords],
  );

  return (
    <div className="appContainer">
      <div className="gameArea">
        <div className="gameArea__pieces">
          {piecesShuffled.map((url, index) => (
            <div key={index}>
              <Piece
                imageUrl={url}
                index={index}                  
                onMouseDown={() => onPieceTouched(url)}
                canDrag={soughtPiece === url || !!piecesTargetCoords[index]}
                targetCoords={piecesTargetCoords[index]}
              />
            </div>
          ))}
        </div>
        <div className="gameArea__targets">
          {piecesShuffled.map((url, index) => (
            <PieceTarget
              onDrop={onDrop}
              index={index}
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
  );
};
