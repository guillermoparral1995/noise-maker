import noteTable, { Notes, NoteValue } from '@constants/noteTable';
import { useBreakpoints } from '@hooks/useBreakpoints';
import React from 'react';
import KeyboardControls from '../Controls/KeyboardControls';
import styles from './index.module.scss';
import Key from './Key';

const Keyboard = () => {
  const { isDesktop } = useBreakpoints();

  const notes = isDesktop
    ? Object.entries(noteTable)
    : Object.entries(noteTable).slice(0, 13);
  return (
    <>
      <KeyboardControls></KeyboardControls>
      <div id={styles.keyboard_container}>
        {notes.map(([note, noteValue]: [Notes, NoteValue]) => (
          <Key key={note} identifier={note} value={noteValue}></Key>
        ))}
      </div>
    </>
  );
};

export default Keyboard;
