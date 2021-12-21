import React, { useState, useEffect } from 'react';
import { EventBus } from '../../common/EventBus/EventBus';
import { EventTypes } from './../../common/EventBus/EventTypes';
import './soughtPiece.less';

const SoughtPiece = ({ sougthPieces, onChange }) => {
  const [soughtPiece, setSoughtPiece] = useState();

  const getRandomPiece = prevSoughtPiece => {
    const pieces =
      sougthPieces.length > 1
        ? sougthPieces.filter(piece => piece !== prevSoughtPiece)
        : [...sougthPieces];
    const index = Math.ceil(Math.random() * pieces.length) - 1;
    return pieces[index];
  };

  const changeSoughtPiece = () =>
    setSoughtPiece(prevSoughtPiece => {
      const newPiece = getRandomPiece(prevSoughtPiece);
      onChange(newPiece);
      return newPiece;
    });

  useEffect(() => {
    changeSoughtPiece();
    EventBus.subscribe(EventTypes.WrongPieceReleased, changeSoughtPiece);
    return () => {
      EventBus.unsubscribe(EventTypes.WrongPieceReleased, changeSoughtPiece);
    };
  }, [sougthPieces]);

  return (
    <>
      {soughtPiece && (
        <>
          <h2 className="soughtPiece__label">Find this card:</h2>
          <div className="soughtPiece__piece">
            <img src={soughtPiece} alt="sougth piece" />
          </div>
        </>
      )}
    </>
  );
};

export default SoughtPiece;
