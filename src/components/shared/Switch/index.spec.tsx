import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { Actions, Switchs } from '@types';
import Switch from '.';

describe('Switch', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render with switch label', async () => {
    const { findByRole } = render(
      <Switch id={Switchs.DELAY} value={false} dispatch={jest.fn()}></Switch>,
    );

    const delaySwitch = await findByRole('checkbox');
    expect(screen.getByText('Delay')).toBeVisible();
    expect(delaySwitch).toMatchSnapshot();
  });

  it('should call dispatch when clicking', async () => {
    const mockDispatch = jest.fn();
    const { findByRole } = render(
      <Switch
        id={Switchs.DELAY}
        value={false}
        dispatch={mockDispatch}
      ></Switch>,
    );

    const delaySwitch = await findByRole('checkbox');
    fireEvent.click(delaySwitch);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: true,
      type: Actions.SWITCH_DELAY,
    });
  });
});
