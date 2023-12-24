import React from 'react';
import Key from './Key';
import Selector from './Selector';

const Keyboard = () => {
  return (
    <>
      <Selector></Selector>
      <Key text="C" frequency={65.41}></Key>
      <Key text="D" frequency={73.42}></Key>
      <Key text="E" frequency={82.41}></Key>
      <Key text="F" frequency={87.31}></Key>
      <Key text="G" frequency={98}></Key>
      <Key text="A" frequency={110}></Key>
      <Key text="B" frequency={123.47}></Key>
      <Key text="C" frequency={130.81}></Key>
    </>
  );
};

export default Keyboard;
