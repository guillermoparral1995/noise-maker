import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Selector from '.';
import { Actions, Selectors, Waveform } from '../../../types';

describe('Selector', () => {
  it('should render correctly', async () => {
    const { findByTestId } = render(
      <Selector
        id={Selectors.WAVEFORM}
        value={Waveform.SINE}
        dispatch={jest.fn()}
      ></Selector>,
    );

    const dropdown = await findByTestId(Selectors.WAVEFORM);
    expect(dropdown).toMatchSnapshot();
  });

  it('should call dispatch when selecting value', async () => {
    const mockDispatch = jest.fn();
    render(
      <Selector
        id={Selectors.WAVEFORM}
        value={Waveform.SINE}
        dispatch={mockDispatch}
      ></Selector>,
    );

    await userEvent.click(screen.getByRole('button'));
    await screen.findByText('Sawtooth');
    await userEvent.click(screen.getByText('Sawtooth'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: Waveform.SAWTOOTH,
      type: Actions.UPDATE_WAVEFORM,
    });
  });
});
