import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './common/Index.jsx';

import { Globals, Button, Segmented, Willow, WillowDark } from '@svar-ui/react-core';
import { WillowIcon, WillowDarkIcon } from './assets/icons/index';
import '@svar-ui/react-core/style.css';

const skins = [
  { id: 'willow', label: 'Willow', Component: Willow, icon: WillowIcon },
  { id: 'willow-dark', label: 'Dark', Component: WillowDark, icon: WillowDarkIcon },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      publicName="Tasklist"
      skins={skins}
      productTag="tasklist"
      productLink="core"
      Globals={Globals}
      Button={Button}
      Segmented={Segmented}
    />
  </React.StrictMode>,
);
