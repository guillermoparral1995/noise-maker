import React from 'react';
import Keyboard from './components/Keyboard';
import GeneralControls from './components/Controls/GeneralControls';
import EnvelopeFilterControls from './components/Controls/EnvelopeControls';
import FilterControls from './components/Controls/FilterControls';
import LFOControls from './components/Controls/LFOControls';
import { LFOStateProvider } from './components/Controls/LFOControls/LFOStateProvider';
import { FilterStateProvider } from './components/Controls/FilterControls/FilterStateProvider';
import { GeneralControlsStateProvider } from './components/Controls/GeneralControls/GeneralControlsStateProvider';
import { EnvelopeStateProvider } from './components/Controls/EnvelopeControls/EnvelopeStateProvider';

const App = () => {
  return (
    <>
      <GeneralControlsStateProvider>
        <GeneralControls></GeneralControls>
      </GeneralControlsStateProvider>
      <FilterStateProvider>
        <FilterControls></FilterControls>
      </FilterStateProvider>
      <LFOStateProvider>
        <LFOControls></LFOControls>
      </LFOStateProvider>
      <EnvelopeStateProvider>
        <EnvelopeFilterControls></EnvelopeFilterControls>
        <Keyboard />
      </EnvelopeStateProvider>
    </>
  );
};

export default App;
