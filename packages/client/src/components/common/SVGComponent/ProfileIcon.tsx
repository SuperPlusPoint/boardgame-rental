import * as React from 'react';

export interface ProfileProps {
  stroke: number;
  color: string;
}

const ProfileIcon = ({ stroke, color }: ProfileProps) => (
  <>
    <circle
      cx={13.5089}
      cy={8.49106}
      r={5.57437}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.66677 21.8183C4.66527 21.4264 4.75291 21.0393 4.92306 20.6863C5.457 19.6184 6.96272 19.0525 8.21215 18.7962C9.11324 18.6039 10.0268 18.4754 10.9459 18.4117C12.6477 18.2622 14.3593 18.2622 16.0611 18.4117C16.9802 18.4762 17.8937 18.6046 18.7949 18.7962C20.0443 19.0525 21.5501 19.5651 22.084 20.6863C22.4262 21.4059 22.4262 22.2413 22.084 22.9609C21.5501 24.0822 20.0443 24.5948 18.7949 24.8404C17.8949 25.0407 16.981 25.1728 16.0611 25.2355C14.676 25.353 13.2844 25.3744 11.8964 25.2996C11.576 25.2996 11.2663 25.2996 10.9459 25.2355C10.0295 25.1735 9.11912 25.0414 8.22283 24.8404C6.96272 24.5948 5.46768 24.0822 4.92306 22.9609C4.75378 22.6038 4.66623 22.2135 4.66677 21.8183Z"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
);

export default ProfileIcon;
