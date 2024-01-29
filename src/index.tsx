import { PrimeReactProvider } from 'primereact/api';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import App from './App';
import { AudioContextProvider } from './providers/AudioContextProvider';
import { MIDIProvider } from './providers/MIDIProvider';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-dark-purple/theme.css';
import 'primereact/resources/themes/lara-light-purple/theme.css';

if (
  'serviceWorker' in navigator &&
  !window.location.href.includes('localhost')
) {
  navigator.serviceWorker.register('./service-worker.js').then(
    (registration) => {
      console.log('Service worker registration succeeded:', registration);
    },
    (error) => {
      console.error(`Service worker registration failed: ${error}`);
    },
  );
} else {
  console.error('Service workers are not supported.');
}

navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(() => {
    const appContainer = document.createElement('div');
    appContainer.id = 'root';
    document.querySelector('body').appendChild(appContainer);
    const root = createRoot(appContainer);

    root.render(
      <>
        <Helmet>
          <link
            id="theme-link"
            rel="stylesheet"
            href={'themes/lara-light-purple/theme.css'}
          />
        </Helmet>
        <PrimeReactProvider>
          <AudioContextProvider>
            <MIDIProvider>
              <App />
            </MIDIProvider>
          </AudioContextProvider>
        </PrimeReactProvider>
      </>,
    );
  })
  .catch((error) => console.error('Audio devices are not supported: ', error));
