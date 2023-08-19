import * as React from 'react';

export interface SearchProps {
  color: string;
}

const SearchIcon = ({ color }: SearchProps) => (
  <>
    <path
      d="M8.40625 4.94716C8.40625 6.57402 7.08491 7.89433 5.45312 7.89433C3.82134 7.89433 2.5 6.57402 2.5 4.94716C2.5 3.3203 3.82134 2 5.45312 2C7.08491 2 8.40625 3.3203 8.40625 4.94716Z"
      stroke={color}
    />
    <path
      d="M7.20403 7.54149L9.83518 8.34129L7.45754 10.2196L7.20403 7.54149Z"
      fill={color}
    />
  </>
);

export default SearchIcon;
