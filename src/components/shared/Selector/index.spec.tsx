import { render } from '@testing-library/react';
import React from 'react';
import Selector from '.';
import { Selectors, Waveform } from '../../../types';

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
});
