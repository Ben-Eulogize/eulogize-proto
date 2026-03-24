import React from 'react'

import { Animation } from './Animation'

interface IZoomOutProps {
  maxZoom: number
}

export const ZoomOut: React.FunctionComponent<IZoomOutProps> = ({
  maxZoom = 1.2,
  ...rest
}) => (
  <Animation
    from={maxZoom}
    to={1}
    formatCSS={(value: any) => `transform: scale(${value});`}
    {...rest}
  />
)
