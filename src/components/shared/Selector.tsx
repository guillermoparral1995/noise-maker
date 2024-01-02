import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import React from 'react';
import { ActionBuilder, ActionTypes, Selectors } from '../../types';
import { selectorValues } from '../../constants/selectorsValues';

interface SelectorProps<T> {
  id: Selectors;
  value: T;
  dispatch: React.Dispatch<ActionTypes>;
  action: ActionBuilder<T>;
}

const Selector = <T extends string>({
  id,
  value,
  dispatch,
  action,
}: SelectorProps<T>) => {
  const handleSelect = (e: DropdownChangeEvent) => {
    dispatch(action(e.target.value));
  };

  return (
    <>
      <label htmlFor={id}>{selectorValues[id].label}</label>
      <div>
        <Dropdown
          id={id}
          name={id}
          onChange={handleSelect}
          value={value}
          options={selectorValues[id].options}
        ></Dropdown>
      </div>
    </>
  );
};

export default Selector;
