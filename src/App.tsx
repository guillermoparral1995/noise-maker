import React from 'react';
import Keyboard from './components/Keyboard/Keyboard';
import GeneralControls from './components/Controls/GeneralControls';
import EnvelopeFilterControls from './components/Controls/EnvelopeControls';
import FilterControls from './components/Controls/FilterControls';
import LFOControls from './components/Controls/LFOControls';

const App = () => {
  return (
    <>
      <GeneralControls></GeneralControls>
      <EnvelopeFilterControls></EnvelopeFilterControls>
      <FilterControls></FilterControls>
      <LFOControls></LFOControls>
      <Keyboard />
    </>
  );
};

export default App;
