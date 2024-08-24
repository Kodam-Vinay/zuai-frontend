const Icon4 = (props) => (
  <svg
    width={props?.width ? props?.width : 20}
    height={props?.height ? props?.height : 20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_257_14)">
      <path
        d="M5.5 19.5V5.48475H19.5V14.7885L14.7885 19.5H5.5ZM7 18H14V14H18V7H7V18ZM2.65575 16.4403L0.213501 2.65575L13.998 0.213501L14.55 3.30775H13.0193L12.777 1.952L1.952 3.877L3.30775 11.5175V16.325L2.65575 16.4403Z"
        fill="#3D404B"
        {...props}
      />
    </g>
    <defs>
      <clipPath id="clip0_257_14">
        <rect width={20} height={20} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default Icon4;
