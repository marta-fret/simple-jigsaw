
import React, { useState } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { App } from './App/App.jsx';
import { EventBus } from '../common/EventBus/EventBus';
import { EventTypes } from '../common/EventBus/EventTypes';

export const AppContainer = ({ pieces }) => {
  const [appKey, setAppKey] = useState(1);
  EventBus.subscribe(EventTypes.AppRestart, () => {
    setAppKey(prevAppKey => prevAppKey + 1);
  });
  
  return (
    <DndProvider backend={HTML5Backend}>
      <App pieces={pieces} key={appKey}/>;
    </DndProvider>
  );
};
