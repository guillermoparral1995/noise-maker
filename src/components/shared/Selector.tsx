import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import React from 'react';
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
  const handleSelect = (e: DropdownChangeEvent) => {
    dispatch(action(e.target.value));
  };

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <div>
        <Dropdown
          id={label}
          name={label}
          onChange={handleSelect}
          value={value}
          options={options}
        ></Dropdown>
      </div>
    </>
  );
};

export default Selector;
