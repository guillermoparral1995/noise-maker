import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import React from 'react';
import Knob from '.';
import '@testing-library/jest-dom';
import { Actions, Knobs } from '@types';

jest.mock('@hooks/useBreakpoints', () => ({
  useBreakpoints: () => ({
    isMobile: false,
  }),
}));

describe('Knob', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render with knob value', async () => {
    const { findByTestId } = render(
      <Knob id={Knobs.VOLUME} value={0.5} dispatch={jest.fn()}></Knob>,
    );

    const knob = await findByTestId(Knobs.VOLUME);
    expect(screen.getByText('0.5')).toBeVisible();
    expect(knob).toMatchSnapshot();
  });

  /**
   * Testing this component on click events is extremely hard due to
   * internal PrimeReact implementation.
   * Keyboard interaction was added for accessibility and easier testing
   */
  it('should call dispatch when changing value - arrow up', async () => {
    const mockDispatch = jest.fn();
    render(<Knob id={Knobs.VOLUME} value={0.5} dispatch={mockDispatch}></Knob>);

    const knob = screen.getByTestId(Knobs.VOLUME);
    act(() => {
      knob.focus();
    });
    fireEvent.keyDown(knob, { key: 'ArrowUp', code: 'ArrowUp' });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 0.51,
      type: Actions.UPDATE_VOLUME,
    });
  });

  it('should call dispatch when changing value - arrow down', async () => {
    const mockDispatch = jest.fn();
    render(<Knob id={Knobs.VOLUME} value={0.5} dispatch={mockDispatch}></Knob>);

    const knob = screen.getByTestId(Knobs.VOLUME);
    act(() => {
      knob.focus();
    });
    fireEvent.keyDown(knob, { key: 'ArrowDown', code: 'ArrowDown' });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 0.49,
      type: Actions.UPDATE_VOLUME,
    });
  });
});
