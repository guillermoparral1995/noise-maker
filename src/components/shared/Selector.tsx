import React, { BaseSyntheticEvent } from 'react';
import { ActionBuilder, ActionTypes } from '../../types';

interface SelectorProps<T> {
  label: string;
  options: Array<T>;
  value: T;
  dispatch: React.Dispatch<ActionTypes>;
  action: ActionBuilder<T>;
}

const Selector = <T extends string>({
  label,
  options,
  value,
  dispatch,
  action,
}: SelectorProps<T>) => {
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
