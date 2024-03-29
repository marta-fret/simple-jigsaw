import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import shuffle from 'lodash.shuffle';
import Piece from '../Piece/Piece.jsx';
import PieceTarget from '../PieceTarget/PieceTarget.jsx';
import Score from '../Score/Score.jsx';
import SoughtPiece from '../SoughtPiece/SoughtPiece.jsx';
import { EventBus } from '../../common/EventBus/EventBus';
import { EventTypes } from '../../common/EventBus/EventTypes';
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

  const isPieceWrong = piece =>
    piece !== soughtPiece && piecesUnrevealed.indexOf(piece) !== -1;

  const onWrongPieceReleased = () => {
    EventBus.emit(EventTypes.WrongPieceReleased);
    document.body.removeEventListener('mouseup', onWrongPieceReleased);
  };

  const onPieceTouched = piece => {
    if (!gameStarted) {
      EventBus.emit(EventTypes.GameStart);
      setGameStarted(true);
    }
    if (isPieceWrong(piece)) {
      EventBus.emit(EventTypes.WrongPieceTouched);
      document.body.addEventListener('mouseup', onWrongPieceReleased);
    }
  };

  const onSoughtPieceChanged = useCallback(piece => {
    setSoughtPiece(piece);
  }, []);

  const handleGameOver = () => {
    EventBus.emit(EventTypes.GameOver);
    setTimeout(() => {
      EventBus.emit(EventTypes.AppRestart);
    }, 10000);
  };

  const onDrop = useCallback(
    (pieceIndex, targetIndex, targetCoordinates) => {
      const isMatched = shuffledToOrdered[pieceIndex] === targetIndex;

      if (isMatched) {
        if (piecesMatched.indexOf(pieceIndex) !== -1) return;
        if (piecesMatched.length === piecesShuffled.length - 1) {
          handleGameOver();
        }
        setPiecesMatched(prevPiecesMatched => [
          ...prevPiecesMatched,
          piecesShuffled[pieceIndex],
        ]);
      } else {
        setPiecesMatched(prevPiecesMatched =>
          prevPiecesMatched.filter(item => item !== piecesShuffled[pieceIndex]),
        );
      }

      const newPiecesUnrevealed = piecesUnrevealed.filter(
        item => item !== piecesShuffled[pieceIndex],
      );
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

  const checkIfCanDrop = useCallback(
    piece => {
      const dropBlocked =
        piecesUnrevealed.length === 1 &&
        piecesMatched.length !== piecesShuffled.length - 1 &&
        piecesShuffled[piece.index] === piecesUnrevealed[0];

      return !dropBlocked;
    },
    [piecesMatched, piecesUnrevealed],
  );

  return (
    <div className="app">
      <div className="gameArea">
        <div className="gameArea__pieces">
          {piecesShuffled.map((piece, index) => (
            <div key={index}>
              <Piece
                imageUrl={piece}
                index={index}
                onMouseDown={() => onPieceTouched(piece)}
                canDrag={soughtPiece === piece || !!piecesTargetCoords[index]}
                targetCoords={piecesTargetCoords[index]}
              />
            </div>
          ))}
        </div>
        <div className="gameArea__targets">
          {piecesShuffled.map((piece, index) => (
            <PieceTarget
              onDrop={onDrop}
              checkIfCanDrop={checkIfCanDrop}
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
