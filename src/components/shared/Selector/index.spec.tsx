import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Selector from '.';
import { Actions, Selectors, Waveform } from '../../../types';
import '@testing-library/jest-dom';

describe('Selector', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render with options based on selector id', async () => {
    const { findByTestId } = render(
      <Selector
        id={Selectors.WAVEFORM}
        value={Waveform.SINE}
        dispatch={jest.fn()}
      ></Selector>,
    );

    const dropdown = await findByTestId(Selectors.WAVEFORM);
    const [option] = await screen.findAllByText('Sine');
    expect(option).toBeVisible();
    expect(dropdown).toMatchSnapshot();
  });

  it('should render with options passed as props', async () => {
    const { findByTestId } = render(
      <Selector
        id={Selectors.WAVEFORM}
        value={'random label'}
        dispatch={jest.fn()}
        options={[{ label: 'Random label!', value: 'random label' }]}
      ></Selector>,
    );

    const dropdown = await findByTestId(Selectors.WAVEFORM);
    const [option] = await screen.findAllByText('Random label!');
    expect(option).toBeVisible();
    expect(dropdown).toMatchSnapshot();
  });

  it('should render disabled if no options', async () => {
    const { findByTestId } = render(
      <Selector
        id={Selectors.WAVEFORM}
        options={[]}
        value={Waveform.SINE}
        dispatch={jest.fn()}
      ></Selector>,
    );
    const dropdown = await findByTestId(Selectors.WAVEFORM);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Sine')).not.toBeInTheDocument();
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
