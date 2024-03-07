import type { SVGProps, FC } from "react";

const SvgCaretUp: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_109_17690)">
      <path
        d="M12 10.828L7.04999 15.778L5.63599 14.364L12 8L18.364 14.364L16.95 15.778L12 10.828Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_109_17690">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCaretUp;
