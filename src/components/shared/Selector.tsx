import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import React from 'react';
import { selectorValues } from '../../constants/selectorsValues';
import { ActionTypes, Selectors } from '../../types';

interface SelectorProps<T> {
  id: Selectors;
  value: T;
  dispatch: React.Dispatch<ActionTypes>;
}

const Selector = <T extends string>({
  id,
  value,
  dispatch,
}: SelectorProps<T>) => {
  const handleSelect = (e: DropdownChangeEvent) => {
    dispatch(selectorValues[id].action(e.target.value));
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
