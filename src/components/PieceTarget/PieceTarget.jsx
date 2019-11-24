import React from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import { ItemTypes } from '../../common/ItemTypes';
import './pieceTarget.less';

const PieceTarget = ({
  onDrop,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PIECE,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={classNames('pieceTarget', {
        'pieceTarget--isActive': isActive,
      })}
    >
    </div>
  );
};

export default PieceTarget;
