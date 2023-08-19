import * as React from 'react';

export interface CategoryProps {
  stroke: number;
  color: string;
}

const CategoryIcon = ({ stroke, color }: CategoryProps) => (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.9997 2.33331H22.8107C24.3875 2.33331 25.6666 3.62353 25.6666 5.21519V9.0581C25.6666 10.6486 24.3875 11.94 22.8107 11.94H18.9997C17.4217 11.94 16.1426 10.6486 16.1426 9.0581V5.21519C16.1426 3.62353 17.4217 2.33331 18.9997 2.33331Z"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.19033 2.33331H9.00016C10.5781 2.33331 11.8572 3.62353 11.8572 5.21519V9.0581C11.8572 10.6486 10.5781 11.94 9.00016 11.94H5.19033C3.61236 11.94 2.33325 10.6486 2.33325 9.0581V5.21519C2.33325 3.62353 3.61236 2.33331 5.19033 2.33331Z"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.19033 16.06H9.00016C10.5781 16.06 11.8572 17.3502 11.8572 18.9431V22.7848C11.8572 24.3765 10.5781 25.6667 9.00016 25.6667H5.19033C3.61236 25.6667 2.33325 24.3765 2.33325 22.7848V18.9431C2.33325 17.3502 3.61236 16.06 5.19033 16.06Z"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.9997 16.06H22.8107C24.3875 16.06 25.6666 17.3502 25.6666 18.9431V22.7848C25.6666 24.3765 24.3875 25.6667 22.8107 25.6667H18.9997C17.4217 25.6667 16.1426 24.3765 16.1426 22.7848V18.9431C16.1426 17.3502 17.4217 16.06 18.9997 16.06Z"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
);

export default CategoryIcon;
