import React from 'react';
import Keyboard from './components/Keyboard/Keyboard';
import GeneralControls from './components/Controls/GeneralControls';
import EnvelopeFilterControls from './components/Controls/EnvelopeControls';

const App = () => {
  return (
    <>
      <GeneralControls></GeneralControls>
      <EnvelopeFilterControls></EnvelopeFilterControls>
      <Keyboard />
    </>
  );
};

export default App;
