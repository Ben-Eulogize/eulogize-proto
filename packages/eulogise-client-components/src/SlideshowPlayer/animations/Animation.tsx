import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import BezierEasing from 'bezier-easing'
import { IAnimationEasing } from '@eulogise/core'

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(min, value), max)

const easingValues = {
  linear: [0, 0, 1, 1],
  easeInSine: [0.47, 0, 0.745, 0.715],
  easeOutSine: [0.39, 0.575, 0.565, 1],
  easeInQuad: [0.55, 0.085, 0.68, 0.5],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeInOutQuad: [0.455, 0.03, 0.515, 0.95],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInBack: [0.6, -0.28, 0.735, 0.04],
}

export interface IAnimationProps {
  from?: number | object
  to?: number | object
  formatCSS?: (css: number | object) => any
  duration?: number
  delay?: number
  easing?: IAnimationEasing
  progress?: number
  className?: string
  children?: React.ReactNode
}

const getKeyFrames = ({
  formatCSS,
  from,
  to,
}: {
  formatCSS: any
  from: number | object
  to: number | object
}) => {
  return keyframes`
    from {
      ${formatCSS(from)}
    }
    to {
      ${formatCSS(to)}
    }
  }`
}

const Animated = styled.div<{ animationRule: any; delay: number }>`
  ${({ animationRule, delay }) => css`
    animation: ${animationRule};
    animation-delay: ${delay}ms;
  `}
  animation-fill-mode: both;
`

const Fixed = styled.div`
  ${({ cssStyle }: { cssStyle: string }) => `${cssStyle}`}
`

export const Animation: React.FunctionComponent<IAnimationProps> = ({
  from,
  to,
  formatCSS,
  duration,
  delay = 0,
  easing = 'linear',
  progress,
  className,
  children,
}: any) => {
  const animated: boolean = typeof progress !== 'number'
  const progressPercent: any = animated
    ? null
    : clamp(progress, 0, duration) / duration

  const props = {
    progress: progressPercent,
    duration,
    delay,
    className,
    style: { width: '100%', height: '100%' },
    children,
  }

  if (animated) {
    const keyframes = getKeyFrames({
      from,
      to,
      formatCSS,
    })
    // @ts-ignore
    const value = easingValues[easing].join(', ')
    const animationRule = css`
      ${keyframes} ${duration}ms cubic-bezier(${value});
    `
    // @ts-ignore
    return <Animated {...props} animationRule={animationRule} delay={delay} />
  }

  // @ts-ignore
  const ease = BezierEasing(...easingValues[easing])
  let cssStyle: string
  if (typeof from === 'number') {
    cssStyle = formatCSS(from + ease(props.progress) * (Number(to) - from))
  } else {
    cssStyle = formatCSS(
      Object.keys(from).reduce((acc, key) => {
        const result = from[key] + ease(props.progress) * (to[key] - from[key])

        return {
          ...acc,
          [key]: result,
        }
      }, {}),
    )
  }
  // @ts-ignore
  return <Fixed {...props} cssStyle={cssStyle} />
}
