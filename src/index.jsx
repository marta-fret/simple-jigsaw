import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './components/AppContainer.jsx';
import 'normalize.css/normalize.css';
import './styles/general.less';

const pieces = [
  'assets/zoovu-logo/1.png',
  'assets/zoovu-logo/2.png',
  'assets/zoovu-logo/3.png',
  'assets/zoovu-logo/4.png',
  'assets/zoovu-logo/5.png',
];

ReactDOM.render(
  <AppContainer pieces={pieces} />,
  document.getElementById('app'),
);
