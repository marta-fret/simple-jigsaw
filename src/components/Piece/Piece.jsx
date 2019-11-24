import React from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import { ItemTypes } from '../../common/ItemTypes';
import './piece.less';

const Piece = ({ imageUrl, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.Piece },
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
      onClick={onClick}
    >
      <img src={imageUrl} alt="piece"/>
    </div>
  );
};

export default Piece;
