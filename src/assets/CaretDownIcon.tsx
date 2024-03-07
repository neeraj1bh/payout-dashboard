import type { SVGProps, FC } from "react";

const SvgCaretDown: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#clip0_60_24919)">
      <path
        d="M12.0002 13.172L16.9502 8.22198L18.3642 9.63598L12.0002 16L5.63623 9.63598L7.05023 8.22198L12.0002 13.172Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_60_24919">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCaretDown;
