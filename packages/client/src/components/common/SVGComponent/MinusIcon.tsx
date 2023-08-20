import * as React from 'react';

export interface MinusProps {
  color: string;
  bgColor: string;
}

const MinusIcon = ({ color, bgColor }: MinusProps) => (
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6857 0H5.31429C2.04762 0 0 2.31208 0 5.58516V14.4148C0 17.6879 2.0381 20 5.31429 20H14.6857C17.9619 20 20 17.6879 20 14.4148V5.58516C20 2.31208 17.9619 0 14.6857 0Z"
      fill={bgColor}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.58337 9.99048C5.58337 9.57626 5.91916 9.24048 6.33337 9.24048H13.6667C14.0809 9.24048 14.4167 9.57626 14.4167 9.99048C14.4167 10.4047 14.0809 10.7405 13.6667 10.7405H6.33337C5.91916 10.7405 5.58337 10.4047 5.58337 9.99048Z"
      fill={color}
    />
  </>
);

export default MinusIcon;
