import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import { ItemTypes } from '../../common/ItemTypes';
import './pieceTarget.less';

const PieceTarget = ({
  onDrop,
  checkIfCanDrop,
  index,
}) => {
  const ref = useRef(null);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.Piece,
    canDrop: checkIfCanDrop,
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
  const isBlocked = isOver && !canDrop;

  return (
    <div
      ref={ref}
      className={classNames('pieceTarget', {
        'pieceTarget--isActive': isActive,
        'pieceTarget--isBlocked': isBlocked,
      })}
    >
      {isBlocked && (
        <p className="pieceTarget__blockedInfo">
          Correct the order of the pieces
        </p>
      )}
    </div>
  );
};

export default PieceTarget;
