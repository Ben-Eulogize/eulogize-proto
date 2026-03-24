import React from 'react'
import Icon from '@ant-design/icons'

const SlideshowPlaySvg = () => (
  <svg
    width="50"
    height="51"
    viewBox="0 0 50 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25 0.5C11.1942 0.5 0 11.6942 0 25.5C0 39.3058 11.1942 50.5 25 50.5C38.8058 50.5 50 39.3058 50 25.5C50 11.6942 38.8058 0.5 25 0.5Z"
      fill="white"
      fill-opacity="0.5"
    />
    <path
      d="M36.5735 24.7803L20.05 12.7825C19.9175 12.6854 19.7606 12.6269 19.5968 12.6137C19.433 12.6005 19.2688 12.633 19.1224 12.7077C18.976 12.7823 18.8533 12.8961 18.7678 13.0364C18.6823 13.1768 18.6374 13.3381 18.6382 13.5024V37.4979C18.6382 38.2289 19.4641 38.6419 20.05 38.2178L36.5735 26.22C36.6875 26.1378 36.7805 26.0297 36.8445 25.9045C36.9086 25.7794 36.942 25.6408 36.942 25.5001C36.942 25.3595 36.9086 25.2209 36.8445 25.0958C36.7805 24.9706 36.6875 24.8625 36.5735 24.7803ZM22.1985 32.258V18.7423L31.5009 25.5001L22.1985 32.258Z"
      fill="url(#paint0_linear_6548_19070)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_6548_19070"
        x1="27.7901"
        y1="12.6108"
        x2="27.7901"
        y2="38.3886"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#C176D3" />
        <stop offset="1" stop-color="#9E21BD" />
      </linearGradient>
    </defs>
  </svg>
)

export const SlideshowPlayIcon = (props: any) => (
  <Icon component={SlideshowPlaySvg} {...props} />
)
