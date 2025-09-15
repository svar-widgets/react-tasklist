import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './common/Index.jsx';

import {
  Globals,
  Button,
  Segmented,
  Willow,
  WillowDark,
} from '@svar-ui/react-core';

import '@svar-ui/react-core/style.css';

const skins = [
  { id: 'willow', label: 'Willow', Component: Willow },
  { id: 'willow-dark', label: 'Dark', Component: WillowDark },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App publicName="Toolbar" skins={skins} productTag="toolbar" Globals={Globals} Button={Button} Segmented={Segmented} />
  </React.StrictMode>,
);
