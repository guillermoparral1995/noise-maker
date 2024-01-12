import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import React from 'react';
import {
  DropdownOption,
  selectorValues,
} from '../../../constants/selectorsValues';
import { ActionTypes, Selectors } from '../../../types';
import styles from './index.module.scss';

interface SelectorProps<T> {
  id: Selectors;
  value: T;
  dispatch: React.Dispatch<ActionTypes>;
  options?: DropdownOption[];
}

const Selector = <T extends string>({
  id,
  value,
  dispatch,
  options,
}: SelectorProps<T>) => {
  const handleSelect = (e: DropdownChangeEvent) => {
    dispatch(selectorValues[id].action(e.target.value));
  };

  return (
    <span className={`p-float-label ${styles.selector}`} data-testid={id}>
      <Dropdown
        inputId={id}
        name={id}
        onChange={handleSelect}
        value={value}
        options={options ?? selectorValues[id].options}
        disabled={
          options ? !options.length : !selectorValues[id].options.length
        }
      ></Dropdown>
      <label htmlFor={id}>{selectorValues[id].label}</label>
    </span>
  );
};

export default Selector;
