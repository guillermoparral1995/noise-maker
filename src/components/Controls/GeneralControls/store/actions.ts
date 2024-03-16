import { Actions } from '@types';

export type ActionTypes = VolumeAction | PanAction;

interface VolumeAction {
  type: Actions.UPDATE_VOLUME;
  payload: number;
}

export const updateVolume: (volume: number) => VolumeAction = (volume) => ({
  type: Actions.UPDATE_VOLUME,
  payload: volume,
});

interface PanAction {
  type: Actions.UPDATE_PAN;
  payload: number;
}

export const updatePan: (pan: number) => PanAction = (pan) => ({
  type: Actions.UPDATE_PAN,
  payload: pan,
});
