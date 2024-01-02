import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import EnvelopeFilterControls from './components/Controls/EnvelopeControls';
import { EnvelopeStateProvider } from './components/Controls/EnvelopeControls/EnvelopeStateProvider';
import FilterControls from './components/Controls/FilterControls';
import GeneralControls from './components/Controls/GeneralControls';
import LFOControls from './components/Controls/LFOControls';
import Keyboard from './components/Keyboard';
import Oscilloscope from './components/Oscilloscope';
import 'primereact/resources/themes/lara-dark-purple/theme.css';
import './index.scss';

const App = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <main>
      <section id="controls">
        <div className="column">
          <GeneralControls></GeneralControls>
        </div>
        <div className="column">
          <FilterControls></FilterControls>
        </div>
        <div className="column">
          <LFOControls></LFOControls>
        </div>
        <div className="column">
          <EnvelopeStateProvider>
            <EnvelopeFilterControls></EnvelopeFilterControls>
            {isMounted &&
              createPortal(<Keyboard />, document.getElementById('keyboard'))}
          </EnvelopeStateProvider>
        </div>
        <div className="column">
          <Oscilloscope></Oscilloscope>
        </div>
      </section>
      <section id="keyboard"></section>
    </main>
  );
};

export default App;
