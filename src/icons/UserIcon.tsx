import { SVGProps } from "react";

export default function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="20"
      viewBox="0 0 16 20"
      {...props}
    >
      <g id="user" transform="translate(-4 -2)">
        <path
          id="Path_6"
          data-name="Path 6"
          d="M19,21V19a4,4,0,0,0-4-4H9a4,4,0,0,0-4,4v2"
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <circle
          id="Ellipse_2"
          data-name="Ellipse 2"
          cx="4"
          cy="4"
          r="4"
          transform="translate(8 3)"
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
