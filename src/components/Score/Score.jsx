import React, { useState, useEffect } from 'react';
import { EventBus } from '../../common/EventBus/EventBus';
import { EventTypes } from '../../common/EventBus/EventTypes';
import './score.less';

const Score = () => {
  let timer;
  const [score, setScore] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  const startCounting = () => {
    if (timer) return;
    timer = setInterval(
      () => { setScore(prevScore => prevScore + 1); },
      1000,
    );
  };

  const onWrongPieceTouched = () => {
    setScore(prevScore => prevScore + 10);
  };

  const stopCounting = () => {
    if (!timer) return;
    clearInterval(timer);
    timer = undefined;
    setShowCongrats(true);
  };

  useEffect(() => {
    EventBus.subscribe(EventTypes.GameStart, startCounting);
    EventBus.subscribe(EventTypes.WrongPieceTouched, onWrongPieceTouched);
    EventBus.subscribe(EventTypes.GameOver, stopCounting);

    return () => {
      EventBus.unsubscribe(EventTypes.GameStart, startCounting);
      EventBus.unsubscribe(EventTypes.WrongPieceTouched, onWrongPieceTouched);
      EventBus.unsubscribe(EventTypes.GameOver, stopCounting);
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <h1 className="score__header">Score:</h1>
      <p className="score__value">
        {score} <span className="score__unit">sec.</span>  
      </p>
      {showCongrats && (
        <p className="score__congrats">Congratulations :-)</p>
      )}
    </>
  );
};

export default Score;
