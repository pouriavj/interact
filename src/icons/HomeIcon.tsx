import { SVGProps } from "react";

export default function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21.109"
      viewBox="0 0 20 21.109"
      {...props}
    >
      <g id="house" transform="translate(-2 -0.891)">
        <path
          id="Path_1"
          data-name="Path 1"
          d="M15,21V13a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v8"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_2"
          data-name="Path 2"
          d="M3,10a2,2,0,0,1,.709-1.528l7-6a2,2,0,0,1,2.582,0l7,6A2,2,0,0,1,21,10v9a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2Z"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
