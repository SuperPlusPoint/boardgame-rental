import * as React from 'react';

export interface TitleProps {
  width: number;
}

const TitleIcon = ({ width }: TitleProps) => (
  <>
    <rect width={width} height={96} fill="none" />
    <path
      d={`M26.6224 69.6605
      L24.679 25.213
      L${width - 27.611} 24.6515
      L${width - 24.692} 71.3448
      L26.6224 69.6605Z`}
      fill="white"
      stroke="black"
      strokeWidth={1.3}
    />
    <path
      d={`M${width - 4.8} 24.7344L${width - 12.891} 25.3283`}
      stroke="#202020"
      strokeWidth={3.94545}
      strokeLinecap="round"
    />
    <path
      d={`M${width - 30.454} 6.17565L${width - 31.215} 14.2525`}
      stroke="#202020"
      strokeWidth={3.94545}
      strokeLinecap="round"
    />
    <path
      d={`M${width - 12.341} 5.92538L${width - 21.702} 18.5694`}
      stroke="#202020"
      strokeWidth={3.94545}
      strokeLinecap="round"
    />
    <path
      d="M24 89.2305C24 89.2305 43.2397 97.8847 72.2566 93.5576C101.273 89.2305 102.502 70.068 92.0077 79.6492C81.5132 89.2305 128 89.2305 128 89.2305"
      stroke="#202020"
      strokeWidth={2}
    />
  </>
);

export default TitleIcon;
