import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AudioContextProvider } from './providers/AudioContextProvider';
import { MIDIProvider } from './providers/MIDIProvider';

navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
  const appContainer = document.createElement('div');
  document.querySelector('body').appendChild(appContainer);
  const root = createRoot(appContainer);

  root.render(
    <AudioContextProvider>
      <MIDIProvider>
        <App />
      </MIDIProvider>
    </AudioContextProvider>,
  );
});
