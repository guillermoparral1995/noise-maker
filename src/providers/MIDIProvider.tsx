import React, { PropsWithChildren, useEffect, useState } from 'react';
import { WebMidi } from 'webmidi';

export const midiContext = React.createContext(undefined);

export const MIDIProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const enableMidi = async () => {
    try {
      await WebMidi.enable();
      setLoading(false);
    } catch (e) {
      console.error('Could not start Web MIDI', e);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    enableMidi();
  }, []);

  if (loading) return;
  if (!loading && !error)
    return (
      <midiContext.Provider
        value={WebMidi.getInputByName('Arturia MiniLab mkII')}
      >
        {children}
      </midiContext.Provider>
    );
  return children;
};
