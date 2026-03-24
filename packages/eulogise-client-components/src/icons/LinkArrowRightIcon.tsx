import React from 'react'
import Icon from '@ant-design/icons'

const LinkArrowRightSvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 4.3125L15.1875 8.99999L10.5 13.6875M14.625 8.99999H2.8125"
      stroke="#272930"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const LinkArrowRightIcon = (props: any) => (
  <Icon component={LinkArrowRightSvg} {...props} />
)
