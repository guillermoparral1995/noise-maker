export interface NoteValue {
  frequency: number;
  mapping: string;
}

type NoteTable = Record<Notes, NoteValue>;

export enum Notes {
  C3 = 'C3',
  CSharp3 = 'C#3',
  D3 = 'D3',
  DSharp3 = 'D#3',
  E3 = 'E3',
  F3 = 'F3',
  FSharp3 = 'F#3',
  G3 = 'G3',
  GSharp3 = 'G#3',
  A3 = 'A3',
  ASharp3 = 'A#3',
  B3 = 'B3',
  C4 = 'C4',
  CSharp4 = 'C#4',
  D4 = 'D4',
  DSharp4 = 'D#4',
  E4 = 'E4',
  F4 = 'F4',
  FSharp4 = 'F#4',
  G4 = 'G4',
  GSharp4 = 'G#4',
  A4 = 'A4',
  ASharp4 = 'A#4',
  B4 = 'B4',
  C5 = 'C5',
}

const noteTable: NoteTable = {
  [Notes.C3]: {
    frequency: 130.81,
    mapping: 'q',
  },
  [Notes.CSharp3]: {
    frequency: 138.59,
    mapping: '2',
  },
  [Notes.D3]: {
    frequency: 146.83,
    mapping: 'w',
  },
  [Notes.DSharp3]: {
    frequency: 155.56,
    mapping: '3',
  },
  [Notes.E3]: {
    frequency: 164.81,
    mapping: 'e',
  },
  [Notes.F3]: {
    frequency: 174.61,
    mapping: 'r',
  },
  [Notes.FSharp3]: {
    frequency: 185,
    mapping: '5',
  },
  [Notes.G3]: {
    frequency: 196,
    mapping: 't',
  },
  [Notes.GSharp3]: {
    frequency: 207.65,
    mapping: '6',
  },
  [Notes.A3]: {
    frequency: 220,
    mapping: 'y',
  },
  [Notes.ASharp3]: {
    frequency: 233.08,
    mapping: '7',
  },
  [Notes.B3]: {
    frequency: 246.94,
    mapping: 'u',
  },
  [Notes.C4]: {
    frequency: 261.63,
    mapping: 'z',
  },
  [Notes.CSharp4]: {
    frequency: 277.18,
    mapping: 's',
  },
  [Notes.D4]: {
    frequency: 293.66,
    mapping: 'x',
  },
  [Notes.DSharp4]: {
    frequency: 311.13,
    mapping: 'd',
  },
  [Notes.E4]: {
    frequency: 329.63,
    mapping: 'c',
  },
  [Notes.F4]: {
    frequency: 349.23,
    mapping: 'v',
  },
  [Notes.FSharp4]: {
    frequency: 369.99,
    mapping: 'g',
  },
  [Notes.G4]: {
    frequency: 392,
    mapping: 'b',
  },
  [Notes.GSharp4]: {
    frequency: 415.3,
    mapping: 'h',
  },
  [Notes.A4]: {
    frequency: 440,
    mapping: 'n',
  },
  [Notes.ASharp4]: {
    frequency: 466.16,
    mapping: 'j',
  },
  [Notes.B4]: {
    frequency: 493.88,
    mapping: 'm',
  },
  [Notes.C5]: {
    frequency: 523.25,
    mapping: ',',
  },
};

export default noteTable;
