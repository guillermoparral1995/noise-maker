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
import MIDIInputSelector from './components/Config/MIDIInputSelector';

const App = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <main>
      <section id="config-section">
        <MIDIInputSelector></MIDIInputSelector>
      </section>
      <section id="controls-section">
        <div className="column" id="general-controls-column">
          <GeneralControls></GeneralControls>
        </div>
        <div className="column" id="filter-controls-column">
          <FilterControls></FilterControls>
        </div>
        <div className="column" id="lfo-controls-column">
          <LFOControls></LFOControls>
        </div>
        <div className="column" id="envelope-controls-column">
          <EnvelopeStateProvider>
            <EnvelopeFilterControls></EnvelopeFilterControls>
            {isMounted &&
              createPortal(
                <Keyboard />,
                document.getElementById('keyboard-section'),
              )}
          </EnvelopeStateProvider>
        </div>
        <div className="column" id="oscilloscope-column">
          <Oscilloscope></Oscilloscope>
        </div>
      </section>
      <section id="keyboard-section"></section>
    </main>
  );
};

export default App;
