import * as React from 'react';

export interface AddProps {
  stroke: number;
  color: string;
}

const AddIcon = ({ stroke, color }: AddProps) => (
  <>
    <path
      d="M14 9.71515V18.2626"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.2778 13.9889H9.72229"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.4667 2.33331H8.53337C4.72226 2.33331 2.33337 5.03074 2.33337 8.84933V19.1506C2.33337 22.9692 4.71115 25.6666 8.53337 25.6666H19.4667C23.2889 25.6666 25.6667 22.9692 25.6667 19.1506V8.84933C25.6667 5.03074 23.2889 2.33331 19.4667 2.33331Z"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
);

export default AddIcon;
