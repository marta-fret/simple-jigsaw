import React, { useState, useEffect } from 'react';
import './soughtPiece.less';

const SoughtPiece = ({ sougthPieces }) => {
  const [soughtPiece, setSoughtPiece] = useState();

  const getRandomPiece = () => {
    const index = Math.ceil(Math.random() * sougthPieces.length) - 1;
    return sougthPieces[index];
  };

  useEffect(() => {
    setSoughtPiece(getRandomPiece());
  }, [sougthPieces]);

  return (
    <>
      <h2 className="soughtPiece__label">Find this card:</h2>
      <div className="soughtPiece__piece">
        <img src={soughtPiece} alt="sougth piece"/>
      </div>
    </>
  );
};

export default SoughtPiece;
