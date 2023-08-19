import * as React from 'react';

export interface SelectArrowProps {
  color: string;
}

const SelectArrowIcon = ({ color }: SelectArrowProps) => (
  <path
    d="M1 0.5L3 2L5 0.5"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

export default SelectArrowIcon;
