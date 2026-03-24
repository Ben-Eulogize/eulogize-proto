import React from 'react'
import Icon from '@ant-design/icons'

const UploadImageIconSvg = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1003_6321)">
      <path
        d="M12.7999 12.8L9.5999 9.6L6.3999 12.8"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6001 9.6V16.8"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.3119 14.712C17.0922 14.2866 17.7086 13.6135 18.0638 12.7989C18.4191 11.9843 18.4929 11.0746 18.2737 10.2133C18.0545 9.35212 17.5547 8.58841 16.8533 8.04275C16.1518 7.4971 15.2886 7.20058 14.3999 7.2H13.3919C13.1498 6.26339 12.6984 5.39386 12.0719 4.65679C11.4453 3.91972 10.6598 3.33428 9.7744 2.94448C8.889 2.55469 7.92676 2.37068 6.96001 2.4063C5.99327 2.44192 5.04717 2.69624 4.19286 3.15013C3.33855 3.60402 2.59825 4.24568 2.02762 5.02686C1.45699 5.80804 1.07087 6.70843 0.898303 7.66031C0.725735 8.6122 0.771204 9.59082 1.03129 10.5226C1.29138 11.4544 1.75931 12.3151 2.39992 13.04"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7999 12.8L9.5999 9.6L6.3999 12.8"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1003_6321">
        <rect width="19.2" height="19.2" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const UploadImageIcon = (props: any) => (
  <Icon component={UploadImageIconSvg} {...props} />
)
