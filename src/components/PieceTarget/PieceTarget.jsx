import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import { ItemTypes } from '../../common/ItemTypes';
import './pieceTarget.less';

const PieceTarget = ({
  onDrop,
  index,
}) => {
  const ref = useRef(null);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.Piece,
    drop(piece) {
      if (!ref.current) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      onDrop(piece.index, index, hoverBoundingRect);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  drop(ref);

  const isActive = isOver && canDrop;

  return (
    <div
      ref={ref}
      className={classNames('pieceTarget', {
        'pieceTarget--isActive': isActive,
      })}
    >
    </div>
  );
};

export default PieceTarget;
