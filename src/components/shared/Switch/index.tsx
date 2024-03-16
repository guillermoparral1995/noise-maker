import { switchValues } from '@constants/switchValues';
import { ActionTypes, Switchs } from '@types';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import React from 'react';
import styles from './index.module.scss';

const Switch = ({
  id,
  value,
  dispatch,
}: {
  id: Switchs;
  value: boolean;
  dispatch: React.Dispatch<ActionTypes>;
}) => {
  const handleToggle = (e: InputSwitchChangeEvent) => {
    dispatch(switchValues[id].action(e.value));
  };

  return (
    <div data-testid={id}>
      <label className={styles.label} htmlFor={id}>
        {switchValues[id].label}
      </label>
      <InputSwitch
        pt={{
          hiddenInput: {
            id,
          },
        }}
        checked={value}
        onChange={handleToggle}
      />
    </div>
  );
};

export default Switch;
