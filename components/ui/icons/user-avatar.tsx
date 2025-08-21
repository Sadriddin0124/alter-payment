import React from "react";

const UserAvatar = () => {
  return (
    <svg
      width="126"
      height="126"
      viewBox="0 0 126 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dd_10635_1210)">
        <rect x="15" y="3" width="96" height="96" rx="48" fill="#F3F7FB" />
        <rect
          x="13.8"
          y="1.8"
          width="98.4"
          height="98.4"
          rx="49.2"
          stroke="white"
          stroke-width="2.4"
        />
        <path
          d="M79 69V65C79 62.8783 78.1571 60.8434 76.6569 59.3431C75.1566 57.8429 73.1217 57 71 57H55C52.8783 57 50.8434 57.8429 49.3431 59.3431C47.8429 60.8434 47 62.8783 47 65V69M71 41C71 45.4183 67.4183 49 63 49C58.5817 49 55 45.4183 55 41C55 36.5817 58.5817 33 63 33C67.4183 33 71 36.5817 71 41Z"
          stroke="#5B72B5"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_10635_1210"
          x="0.600098"
          y="0.600098"
          width="124.8"
          height="124.8"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_10635_1210"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.03 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10635_1210"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="4"
            operator="erode"
            in="SourceAlpha"
            result="effect2_dropShadow_10635_1210"
          />
          <feOffset dy="12" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_10635_1210"
            result="effect2_dropShadow_10635_1210"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_10635_1210"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default UserAvatar;
