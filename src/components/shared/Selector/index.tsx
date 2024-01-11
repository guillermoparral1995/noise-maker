import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import React from 'react';
import {
  DropdownOption,
  selectorValues,
} from '../../../constants/selectorsValues';
import { ActionTypes, Selectors } from '../../../types';

interface SelectorProps<T> {
  id: Selectors;
  value: T;
  dispatch: React.Dispatch<ActionTypes>;
  options?: DropdownOption[];
  disabled?: boolean;
}

const Selector = <T extends string>({
  id,
  value,
  dispatch,
  options,
  disabled,
}: SelectorProps<T>) => {
  const handleSelect = (e: DropdownChangeEvent) => {
    dispatch(selectorValues[id].action(e.target.value));
  };

  return (
    <span className="p-float-label" data-testid={id}>
      <Dropdown
        inputId={id}
        name={id}
        onChange={handleSelect}
        value={value}
        options={options ?? selectorValues[id].options}
        disabled={disabled}
      ></Dropdown>
      <label htmlFor={id}>{selectorValues[id].label}</label>
    </span>
  );
};

export default Selector;
