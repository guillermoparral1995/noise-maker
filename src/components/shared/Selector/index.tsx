import { DropdownOption, selectorValues } from '@constants/selectorsValues';
import { ActionTypes, Selectors } from '@types';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import React from 'react';

interface SelectorProps<T> {
  id: Selectors;
  value: T;
  dispatch: React.Dispatch<ActionTypes>;
  options?: DropdownOption[];
  hideLabel?: boolean;
}

const Selector = <T extends string>({
  id,
  value,
  dispatch,
  options,
  hideLabel,
}: SelectorProps<T>) => {
  const handleSelect = (e: DropdownChangeEvent) => {
    dispatch(selectorValues[id].action(e.target.value));
  };

  return (
    <span className="p-float-label" data-testid={id}>
      <Dropdown
        inputId={`dropdown_input_${id}`}
        onChange={handleSelect}
        value={value}
        options={options ?? selectorValues[id].options}
        disabled={
          options ? !options.length : !selectorValues[id].options.length
        }
        pt={{
          select: {
            id,
          },
        }}
      ></Dropdown>
      {!hideLabel && <label htmlFor={id}>{selectorValues[id].label}</label>}
    </span>
  );
};

export default Selector;
