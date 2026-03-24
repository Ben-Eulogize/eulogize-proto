import React from 'react'

import { Animation } from './Animation'

export const FadeOut = (props: any) => (
  <Animation
    from={1}
    to={0}
    formatCSS={(value) => `opacity: ${value};`}
    {...props}
  />
)
