import { SVGProps } from "react";

export default function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20.414"
      height="20.414"
      viewBox="0 0 20.414 20.414"
      {...props}
    >
      <g id="search" transform="translate(-2 -2)">
        <path
          id="Path_3"
          data-name="Path 3"
          d="M21,21l-4.34-4.34"
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <circle
          id="Ellipse_1"
          data-name="Ellipse 1"
          cx="8"
          cy="8"
          r="8"
          transform="translate(3 3)"
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </g>
    </svg>
  );
}
