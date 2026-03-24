import React from 'react'
import Icon from '@ant-design/icons'

const AddOverlaySvg = () => (
  <svg
    width="18"
    height="23"
    viewBox="0 0 18 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_6177_4418)">
      <g clipPath="url(#clip1_6177_4418)">
        <g clipPath="url(#clip2_6177_4418)">
          <path
            d="M8.02362 17.9325H9.3366H12.5375V14.2351V12.9106V5.78609L9.3366 5.68416H8.02362H4.8107V12.9106V14.2351V17.9325H8.02362ZM1.67007 22.1799C1.21626 22.1799 0.824628 22.0137 0.495167 21.6814C0.165706 21.3491 0.000976562 20.954 0.000976562 20.4962V1.68372C0.000976562 1.22594 0.165706 0.830875 0.495167 0.498525C0.824628 0.166175 1.21626 0 1.67007 0H17.3592V5.68416V20.4962C17.3592 20.954 17.1945 21.3491 16.865 21.6814C16.5356 22.0137 16.144 22.1799 15.6901 22.1799H1.67007ZM16.0463 1.32449H11.7245H1.67007C1.58104 1.32449 1.49943 1.36191 1.42522 1.43674C1.35104 1.51159 1.31396 1.59391 1.31396 1.68372V20.4962C1.31396 20.586 1.35104 20.6684 1.42522 20.7432C1.49943 20.8181 1.58104 20.8555 1.67007 20.8555H15.6901C15.7791 20.8555 15.8608 20.8181 15.935 20.7432C16.0091 20.6684 16.0463 20.586 16.0463 20.4962V6.28129V1.32449Z"
            fill="black"
          />
          <path
            d="M8.10959 15.166V12.4662H5.29248V11.3622H8.10959V8.6792H9.2616V11.3622H12.0612V12.4662H9.2616V15.166H8.10959Z"
            fill="white"
          />
        </g>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_6177_4418">
        <rect width="17.36" height="22.18" fill="white" />
      </clipPath>
      <clipPath id="clip1_6177_4418">
        <rect width="17.36" height="22.18" fill="white" />
      </clipPath>
      <clipPath id="clip2_6177_4418">
        <rect
          width="17.3583"
          height="22.18"
          fill="white"
          transform="translate(0.000976562)"
        />
      </clipPath>
    </defs>
  </svg>
)

export const AddOverlayIcon = (props: any) => (
  <Icon component={AddOverlaySvg} {...props} />
)
