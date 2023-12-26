import React, { BaseSyntheticEvent, useContext } from 'react';
import { stateContext } from '../../providers/StateProvider';
import { ActionBuilder } from '../../types';

interface SelectorProps<T> {
  label: string;
  options: Array<T>;
  value: T;
  action: ActionBuilder<T>;
}

const Selector = <T extends string>({
  label,
  options,
  value,
  action,
}: SelectorProps<T>) => {
  const { dispatch } = useContext(stateContext);

  const handleSelect = (e: BaseSyntheticEvent) => {
    dispatch(action(e.target.value));
  };

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <select id={label} name={label} onChange={handleSelect} value={value}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Selector;
