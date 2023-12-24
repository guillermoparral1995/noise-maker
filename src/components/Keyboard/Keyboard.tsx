import React from 'react';
import Key from './Key';
import Selector from './Selector';
import noteTable from './noteTable';

const Keyboard = () => {
  return (
    <>
      <Selector></Selector>
      {Object.entries(noteTable).map(([note, frequency]) => (
        <Key key={note} identifier={note} frequency={frequency}></Key>
      ))}
    </>
  );
};

export default Keyboard;
