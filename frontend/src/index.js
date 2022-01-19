import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EmbeddedAppSDK from './EmbeddedAppSDK';

const embeddedAppSDK = new EmbeddedAppSDK();

embeddedAppSDK.onReady().then(() => {
  console.log("My app is running 🎉")
  ReactDOM.render(
    <React.StrictMode>
      <App embeddedAppSDK={embeddedAppSDK}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
})
