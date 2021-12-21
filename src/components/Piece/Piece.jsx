import React, { useState, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import { ItemTypes } from '../../common/ItemTypes';
import './piece.less';

const Piece = ({ imageUrl, onMouseDown, canDrag, index, targetCoords }) => {
  const [style, setStyle] = useState({ top: 0, left: 0 });

  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.Piece, index },
    canDrag,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref);

  useEffect(() => {
    if (targetCoords && ref.current) {
      const pieceCoords = ref.current.getBoundingClientRect();
      const newTop = style.top + (targetCoords.top - pieceCoords.top);
      const newLeft = style.left + (targetCoords.left - pieceCoords.left);
      setStyle({ top: newTop, left: newLeft });
    }
  }, [targetCoords]);

  return (
    <div
      ref={ref}
      style={style}
      className={classNames('piece', {
        'piece--isDragging': isDragging,
        'piece--isWrong': !canDrag,
        'piece--isCorrect': canDrag && !isDragging,
        'piece--isRevealed': style.top !== 0,
      })}
      onMouseDown={onMouseDown}
    >
      <img src={imageUrl} alt="piece" />
    </div>
  );
};

export default Piece;
