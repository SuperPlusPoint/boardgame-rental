import * as React from 'react';

export interface MenuProps {
  color: string;
}

const MenuIcon = ({ color }: MenuProps) => (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.1875 5.625C2.1875 4.76206 2.88706 4.0625 3.75 4.0625H14.5794C15.4423 4.0625 16.1419 4.76206 16.1419 5.625C16.1419 6.48794 15.4423 7.1875 14.5794 7.1875H3.75C2.88706 7.1875 2.1875 6.48794 2.1875 5.625Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.1875 15.124C2.1875 14.2611 2.88706 13.5615 3.75 13.5615H25C25.8629 13.5615 26.5625 14.2611 26.5625 15.124C26.5625 15.987 25.8629 16.6865 25 16.6865H3.75C2.88706 16.6865 2.1875 15.987 2.1875 15.124Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.1875 24.6844C2.1875 23.8215 2.88706 23.1219 3.75 23.1219H14.5794C15.4423 23.1219 16.1419 23.8215 16.1419 24.6844C16.1419 25.5473 15.4423 26.2469 14.5794 26.2469H3.75C2.88706 26.2469 2.1875 25.5473 2.1875 24.6844Z"
      fill={color}
    />
  </>
);

export default MenuIcon;
