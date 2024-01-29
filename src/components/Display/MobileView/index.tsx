import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ThemeSelector from '../../Config/ThemeSelector';
import CompressorControls from '../../Controls/CompressorControls';
import DelayControls from '../../Controls/DelayControls';
import EnvelopeFilterControls from '../../Controls/EnvelopeControls';
import { EnvelopeStateProvider } from '../../Controls/EnvelopeControls/EnvelopeStateProvider';
import FilterControls from '../../Controls/FilterControls';
import GeneralControls from '../../Controls/GeneralControls';
import LFOControls from '../../Controls/LFOControls';
import Keyboard from '../../Keyboard';
import Oscilloscope from '../../Oscilloscope';
import Title from '../../shared/Title';
import styles from './index.module.scss';

const MobileView = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [showConfig, setShowConfig] = useState<boolean>(false);

  const handleConfigClick = () => {
    setShowConfig(!showConfig);
  };

  return (
    <main id={styles.mobile_view}>
      <nav id={styles.menu}>
        <div onClick={handleConfigClick}>
          <i className="pi pi-cog" style={{ fontSize: '2rem' }}></i>
        </div>
        <div>
          <ThemeSelector></ThemeSelector>
        </div>
      </nav>
      <Title></Title>
      <section
        id="controls_section"
        className={showConfig ? '' : styles.hidden}
      >
        <div>
          <GeneralControls></GeneralControls>
        </div>
        <div>
          <FilterControls></FilterControls>
        </div>
        <div>
          <LFOControls></LFOControls>
        </div>
        <div>
          <EnvelopeStateProvider>
            <EnvelopeFilterControls></EnvelopeFilterControls>
            {isMounted &&
              createPortal(
                <Keyboard />,
                document.getElementById(styles.keyboard_section),
              )}
          </EnvelopeStateProvider>
        </div>
        <div>
          <CompressorControls></CompressorControls>
        </div>
        <div>
          <DelayControls></DelayControls>
        </div>
      </section>
      <section
        id={styles.keyboard_section}
        className={showConfig ? styles.hidden : ''}
      >
        <Oscilloscope></Oscilloscope>
      </section>
    </main>
  );
};

export default MobileView;
