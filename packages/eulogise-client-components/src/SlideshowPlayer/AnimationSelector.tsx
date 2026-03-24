import React from 'react'

import { Animations } from './utils/animations'
import { ImageAnimationType } from '@eulogise/core'

interface IAnimationSelector {
  type: ImageAnimationType
  duration: number
  progress?: number
  delay?: number
  highRes?: boolean
}

const AnimationSelector: React.FunctionComponent<IAnimationSelector> = ({
  type = 'none',
  delay = 0,
  ...rest
}) => {
  const Component = Animations[type]
  // @ts-ignore
  return <Component {...rest} delay={delay} />
}

export default AnimationSelector
