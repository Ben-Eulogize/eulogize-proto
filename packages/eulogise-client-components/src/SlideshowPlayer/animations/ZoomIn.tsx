import React from 'react'

import { Animation, IAnimationProps } from './Animation'

interface IZoomInProps extends IAnimationProps {
  maxZoom: number
}

export const ZoomIn: React.FunctionComponent<IZoomInProps> = ({
  maxZoom = 1.2,
  ...rest
}) => (
  <Animation
    from={1}
    to={maxZoom}
    formatCSS={(value) => `transform: scale(${value});`}
    {...rest}
  />
)
