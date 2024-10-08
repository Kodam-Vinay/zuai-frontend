const HomeIcon = (props) => (
  <svg
    width={props?.width ? props?.width : 16}
    height={props?.height ? props?.height : 18}
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_255_2)">
      <path
        d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z"
        fill="#3D404B"
        {...props}
      />
    </g>
    <defs>
      <clipPath id="clip0_255_2">
        <rect width={16} height={18} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default HomeIcon;
