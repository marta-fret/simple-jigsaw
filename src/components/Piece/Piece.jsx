import React from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import { ItemTypes } from '../../common/ItemTypes';
import './piece.less';

const Piece = ({ imageUrl }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PIECE },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={classNames('piece', {
        'piece--isDragging': isDragging,
      })}
    >
      <img src={imageUrl} alt="piece"/>
    </div>
  );
};

export default Piece;
