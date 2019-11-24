import React, { useState, useEffect } from 'react';
import { EventBus } from '../../common/EventBus/EventBus';
import { EventTypes } from '../../common/EventBus/EventTypes';
import './score.less';

const Score = () => {
  let timer;
  const [score, setScore] = useState(0);

  const startCounting = () => {
    if (timer) return;
    timer = setInterval(
      () => { setScore(prevScore => prevScore + 1); },
      1000,
    );
  };

  const onWrongPiece = () => {
    setScore(prevScore => prevScore + 10);
  };

  const stopCounting = () => {
    if (timer) return;
    clearInterval(timer);
    timer = undefined;
  };

  EventBus.subscribe(EventTypes.GameStart, startCounting);
  EventBus.subscribe(EventTypes.WrongPiece, onWrongPiece);
  EventBus.subscribe(EventTypes.GameOver, stopCounting);

  useEffect(() => () => {
    EventBus.unsubscribe(EventTypes.GameStart, startCounting);
    EventBus.unsubscribe(EventTypes.WrongPiece, onWrongPiece);
    EventBus.unsubscribe(EventTypes.GameOver, stopCounting);
  });

  return (
    <>
      <h1 className="score__header">Score:</h1>
      <p className="score__value">
        {score} <span className="score__unit">sec.</span>  
      </p>
    </>
  );
};

export default Score;
