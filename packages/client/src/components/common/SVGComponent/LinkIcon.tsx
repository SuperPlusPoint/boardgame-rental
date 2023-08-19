import * as React from 'react';

export interface LinkProps {
  width: number;
  height: number;
  color: string;
}

const LinkIcon = ({ width, height, color }: LinkProps) => (
  <>
    <g clipPath="url(#clip0_84_970)">
      <path
        d="M19.8603 23.9268L17.2827 25.8746C16.1434 26.7356 14.7086 27.1087 13.2942 26.9118C11.8797 26.7149 10.6014 25.9643 9.74043 24.8249C8.87946 23.6855 8.50637 22.2508 8.70323 20.8363C8.90009 19.4219 9.65078 18.1436 10.7901 17.2826L13.3678 15.3348C13.5956 15.1626 13.8826 15.088 14.1655 15.1274C14.4484 15.1667 14.704 15.3169 14.8762 15.5448C15.0484 15.7726 15.123 16.0596 15.0837 16.3425C15.0443 16.6254 14.8941 16.881 14.6663 17.0532L12.0887 19.001C11.405 19.5176 10.9546 20.2846 10.8365 21.1332C10.7184 21.9819 10.9423 22.8427 11.4588 23.5264C11.9754 24.21 12.7424 24.6604 13.5911 24.7785C14.4398 24.8966 15.3006 24.6728 15.9842 24.1562L18.5618 22.2084C18.7897 22.0362 19.0766 21.9616 19.3595 22.001C19.6424 22.0404 19.8981 22.1905 20.0703 22.4184C20.2425 22.6462 20.3171 22.9332 20.2777 23.2161C20.2383 23.499 20.0882 23.7546 19.8603 23.9268ZM25.8747 19.382L23.2971 21.3298C23.0693 21.502 22.7823 21.5766 22.4994 21.5372C22.2165 21.4979 21.9609 21.3477 21.7887 21.1198C21.6165 20.892 21.5419 20.605 21.5812 20.3221C21.6206 20.0392 21.7707 19.7836 21.9986 19.6114L24.5762 17.6636C25.2599 17.147 25.7103 16.38 25.8284 15.5314C25.9465 14.6827 25.7226 13.8219 25.2061 13.1382C24.6895 12.4546 23.9225 12.0042 23.0738 11.8861C22.2251 11.768 21.3643 11.9918 20.6807 12.5084L18.1031 14.4562C17.8752 14.6284 17.5883 14.703 17.3054 14.6636C17.0225 14.6242 16.7668 14.4741 16.5946 14.2462C16.4224 14.0184 16.3478 13.7314 16.3872 13.4485C16.4265 13.1656 16.5767 12.91 16.8046 12.7378L19.3822 10.79C20.5215 9.92903 21.9563 9.55594 23.3707 9.7528C24.7852 9.94966 26.0635 10.7003 26.9245 11.8397C27.7854 12.9791 28.1585 14.4138 27.9617 15.8283C27.7648 17.2427 27.0141 18.5211 25.8747 19.382Z"
        fill={color}
      />
      <path
        d="M21.5593 17.2437L16.4041 21.1393C16.1762 21.3115 15.8892 21.3861 15.6063 21.3467C15.3235 21.3073 15.0678 21.1572 14.8956 20.9293C14.7234 20.7015 14.6488 20.4145 14.6882 20.1316C14.7275 19.8487 14.8777 19.5931 15.1055 19.4209L20.2607 15.5253C20.4886 15.3531 20.7756 15.2785 21.0585 15.3179C21.3414 15.3573 21.597 15.5074 21.7692 15.7353C21.9414 15.9631 22.016 16.2501 21.9766 16.533C21.9373 16.8159 21.7871 17.0715 21.5593 17.2437Z"
        fill="#5A5A5A"
      />
    </g>
    <defs>
      <clipPath id="clip0_84_970">
        <rect
          width={width}
          height={height}
          fill="white"
          transform="translate(0.230957 15.813) rotate(-37.0766)"
        />
      </clipPath>
    </defs>
  </>
);

export default LinkIcon;