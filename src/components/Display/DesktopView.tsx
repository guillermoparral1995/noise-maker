import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MIDIInputSelector from '../Config/MIDIInputSelector';
import ThemeSelector from '../Config/ThemeSelector';
import CompressorControls from '../Controls/CompressorControls';
import DelayControls from '../Controls/DelayControls';
import EnvelopeFilterControls from '../Controls/EnvelopeControls';
import { EnvelopeStateProvider } from '../Controls/EnvelopeControls/EnvelopeStateProvider';
import FilterControls from '../Controls/FilterControls';
import GeneralControls from '../Controls/GeneralControls';
import LFOControls from '../Controls/LFOControls';
import Keyboard from '../Keyboard';
import Oscilloscope from '../Oscilloscope';
import styles from './index.module.scss';

const DesktopView = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <main>
      <section id={styles.config_section}>
        <MIDIInputSelector></MIDIInputSelector>

        <ThemeSelector></ThemeSelector>
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
        <div className={styles.column}>
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

export default DesktopView;
