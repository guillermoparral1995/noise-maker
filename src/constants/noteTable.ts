type NoteTable = Record<Notes, number>;

enum Notes {
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
}

const noteTable: NoteTable = {
  [Notes.C3]: 130.81,
  [Notes.CSharp3]: 138.59,
  [Notes.D3]: 146.83,
  [Notes.DSharp3]: 155.56,
  [Notes.E3]: 164.81,
  [Notes.F3]: 174.61,
  [Notes.FSharp3]: 185,
  [Notes.G3]: 196,
  [Notes.GSharp3]: 207.65,
  [Notes.A3]: 220,
  [Notes.ASharp3]: 233.08,
  [Notes.B3]: 246.94,
  [Notes.C4]: 261.63,
};

export default noteTable;
