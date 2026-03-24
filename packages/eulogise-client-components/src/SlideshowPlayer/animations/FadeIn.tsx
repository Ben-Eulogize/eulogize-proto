import React from 'react'

import { Animation } from './Animation'

export const FadeIn = (props: any) => (
  // @ts-ignore
  <Animation
    from={0}
    to={1}
    formatCSS={(value) => `opacity: ${value};`}
    {...props}
  />
)
