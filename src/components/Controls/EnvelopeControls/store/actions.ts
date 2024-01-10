import { Actions, Waveform } from '../../../../types';

export type ActionTypes =
  | WaveformAction
  | DetuneAction
  | AttackAction
  | DecayAction
  | SustainAction
  | ReleaseAction
  | PitchbendAction;

interface WaveformAction {
  type: Actions.UPDATE_WAVEFORM;
  payload: Waveform;
}

export const updateWaveform: (waveform: Waveform) => WaveformAction = (
  waveform,
) => ({
  type: Actions.UPDATE_WAVEFORM,
  payload: waveform,
});

interface DetuneAction {
  type: Actions.UPDATE_DETUNE;
  payload: number;
}

export const updateDetune: (detune: number) => DetuneAction = (detune) => ({
  type: Actions.UPDATE_DETUNE,
  payload: detune,
});

interface AttackAction {
  type: Actions.UPDATE_ATTACK;
  payload: number;
}

export const updateAttack: (attack: number) => AttackAction = (attack) => ({
  type: Actions.UPDATE_ATTACK,
  payload: attack,
});

interface DecayAction {
  type: Actions.UPDATE_DECAY;
  payload: number;
}

export const updateDecay: (decay: number) => DecayAction = (decay) => ({
  type: Actions.UPDATE_DECAY,
  payload: decay,
});

interface SustainAction {
  type: Actions.UPDATE_SUSTAIN;
  payload: number;
}

export const updateSustain: (sustain: number) => SustainAction = (sustain) => ({
  type: Actions.UPDATE_SUSTAIN,
  payload: sustain,
});

interface ReleaseAction {
  type: Actions.UPDATE_RELEASE;
  payload: number;
}

export const updateRelease: (release: number) => ReleaseAction = (release) => ({
  type: Actions.UPDATE_RELEASE,
  payload: release,
});

interface PitchbendAction {
  type: Actions.UPDATE_PITCHBEND;
  payload: number;
}

export const updatePitchbend: (pitchbend: number) => PitchbendAction = (
  pitchbend,
) => ({
  type: Actions.UPDATE_PITCHBEND,
  payload: pitchbend,
});
