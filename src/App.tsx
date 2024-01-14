import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MIDIInputSelector from './components/Config/MIDIInputSelector';
import CompressorControls from './components/Controls/CompressorControls';
import EnvelopeFilterControls from './components/Controls/EnvelopeControls';
import { EnvelopeStateProvider } from './components/Controls/EnvelopeControls/EnvelopeStateProvider';
import FilterControls from './components/Controls/FilterControls';
import GeneralControls from './components/Controls/GeneralControls';
import LFOControls from './components/Controls/LFOControls';
import Keyboard from './components/Keyboard';
import Oscilloscope from './components/Oscilloscope';
import styles from './index.module.scss';
import 'primereact/resources/themes/lara-dark-purple/theme.css';
import DelayControls from './components/Controls/DelayControls';

const App = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <main>
      <section id="config-section">
        <div className={styles.column}>
          <MIDIInputSelector></MIDIInputSelector>
        </div>
      </section>
      <section id={styles.controls_section}>
        <div className={styles.column}>
          <GeneralControls></GeneralControls>
        </div>
        <div className={styles.column}>
          <FilterControls></FilterControls>
        </div>
        <div className={styles.column} id={styles.lfo_controls_column}>
          <LFOControls></LFOControls>
        </div>
        <div className={styles.column}>
          <EnvelopeStateProvider>
            <EnvelopeFilterControls></EnvelopeFilterControls>
            {isMounted &&
              createPortal(
                <Keyboard />,
                document.getElementById(styles.keyboard_section),
              )}
          </EnvelopeStateProvider>
        </div>
        <div className={styles.column} id={styles.compressor_controls_column}>
          <CompressorControls></CompressorControls>
        </div>
        <div className={styles.column}>
          <DelayControls></DelayControls>
        </div>
        <div className={styles.column}>
          <Oscilloscope></Oscilloscope>
        </div>
      </section>
      <section id={styles.keyboard_section}></section>
    </main>
  );
};

export default App;
