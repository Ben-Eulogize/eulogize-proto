import React from 'react'

import { Animation, FadeIn, FadeOut, ZoomIn, ZoomOut } from '../animations'
import { IAnimationEasing } from '@eulogise/core'
import styled from 'styled-components'

// For Slide animations
const BASE_HORIZONTAL_DISTANCE = 100
const BASE_VERTICAL_DISTANCE = 50

const BASE_VERTICAL_OFFSET = 1300
const BASE_HORIZONTAL_OFFSET = 1300

const FLASH_MAX = 5

const WARP_PERSPECTIVE = '400px'
const WARP_OFFSET = 1000
const WARP_ROTATION = 25

const StyledAlignTopRight = styled.div``

// TODO: align export format of animations, filters and transitions
export class Animations {
  // Zoom animations
  public static zoomIn = ({ highRes, ...props }: any) => <ZoomIn {...props} />
  public static zoomOut = ({ highRes, ...props }: any) => <ZoomOut {...props} />

  // Fade animations
  public static fadeIn = ({ highRes, ...props }: any) => <FadeIn {...props} />
  public static fadeInBlack = ({ highRes, ...props }: any) => (
    <FadeIn {...props} style={{ backgroundColor: 'black', ...props.style }} />
  )

  public static fadeOut = ({ highRes, ...props }: any) => <FadeOut {...props} />

  public static fadeOutBlack = ({ highRes, ...props }: any) => (
    <FadeOut {...props} style={{ backgroundColor: 'black', ...props.style }} />
  )

  public static fadeOutZoomIn = ({ highRes, ...props }: any) => (
    <ZoomIn
      duration={props.duration}
      progress={props.progress}
      delay={props.delay}
      easing={IAnimationEasing.EASE_IN_QUART}
      maxZoom={3}
    >
      <FadeOut
        duration={props.duration * 0.4}
        progress={props.progress && props.progress - props.duration * 0.6}
        delay={props.delay + props.duration * 0.6}
      >
        {props.children}
      </FadeOut>
    </ZoomIn>
  )

  // Slide animations
  public static slideDown({ highRes, ...props }: any) {
    const verticalDistance = highRes
      ? BASE_VERTICAL_DISTANCE
      : BASE_VERTICAL_DISTANCE / 2
    return (
      <Animation
        from={-verticalDistance}
        to={verticalDistance}
        formatCSS={(value) => `transform: translate3d(0, ${value}px, 0);`}
        {...props}
      />
    )
  }

  public static slideUp({ highRes, ...props }: any) {
    const verticalDistance = highRes
      ? BASE_VERTICAL_DISTANCE
      : BASE_VERTICAL_DISTANCE / 2
    return (
      <Animation
        from={verticalDistance}
        to={-verticalDistance}
        formatCSS={(value) => `transform: translate3d(0, ${value}px, 0);`}
        {...props}
      />
    )
  }

  public static slideRight({ highRes, ...props }: any) {
    const horizontalDistance = highRes
      ? BASE_HORIZONTAL_DISTANCE
      : BASE_HORIZONTAL_DISTANCE / 2
    return (
      <Animation
        from={-horizontalDistance}
        to={horizontalDistance}
        formatCSS={(value) => `transform: translate3d(${value}px, 0, 0);`}
        {...props}
      />
    )
  }

  public static slideLeft({ highRes, ...props }: any) {
    const horizontalDistance = highRes
      ? BASE_HORIZONTAL_DISTANCE
      : BASE_HORIZONTAL_DISTANCE / 2
    return (
      <Animation
        from={horizontalDistance}
        to={-horizontalDistance}
        formatCSS={(value) => `transform: translate3d(${value}px, 0, 0);`}
        {...props}
      />
    )
  }

  public static slideDownIn({ highRes, ...props }: any) {
    const verticalOffset = highRes
      ? BASE_VERTICAL_OFFSET * 2
      : BASE_VERTICAL_OFFSET
    return (
      <Animation
        from={-verticalOffset}
        to={0}
        formatCSS={(value) => `transform: translate3d(0, ${value}px, 0);`}
        easing={IAnimationEasing.EASE_OUT_QUART}
        {...props}
      />
    )
  }

  public static slideDownOut({ highRes, ...props }: any) {
    const verticalOffset = highRes
      ? BASE_VERTICAL_OFFSET * 2
      : BASE_VERTICAL_OFFSET
    return (
      <Animation
        from={0}
        to={verticalOffset}
        formatCSS={(value) => `transform: translate3d(0, ${value}px, 0);`}
        easing={IAnimationEasing.EASE_IN_QUAD}
        {...props}
      />
    )
  }

  public static slideUpIn({ highRes, ...props }: any) {
    const verticalOffset = highRes
      ? BASE_VERTICAL_OFFSET * 2
      : BASE_VERTICAL_OFFSET
    return (
      <Animation
        from={verticalOffset}
        to={0}
        formatCSS={(value) => `transform: translate3d(0, ${value}px, 0);`}
        easing={IAnimationEasing.EASE_OUT_QUART}
        {...props}
      />
    )
  }

  public static slideUpOut({ highRes, ...props }: any) {
    const verticalOffset = highRes
      ? BASE_VERTICAL_OFFSET * 2
      : BASE_VERTICAL_OFFSET
    return (
      <Animation
        from={0}
        to={-verticalOffset}
        formatCSS={(value) => `transform: translate3d(0, ${value}px, 0);`}
        easing={IAnimationEasing.EASE_IN_QUAD}
        {...props}
      />
    )
  }

  public static slideRightIn({ highRes, ...props }: any) {
    const horizontalOffset = highRes
      ? BASE_HORIZONTAL_OFFSET * 2
      : BASE_HORIZONTAL_OFFSET
    return (
      <Animation
        from={-horizontalOffset}
        to={0}
        formatCSS={(value) => `transform: translate3d(${value}px, 0, 0);`}
        easing={IAnimationEasing.EASE_OUT_QUART}
        {...props}
      />
    )
  }

  public static slideRightOut({ highRes, ...props }: any) {
    const horizontalOffset = highRes
      ? BASE_HORIZONTAL_OFFSET * 2
      : BASE_HORIZONTAL_OFFSET
    return (
      <Animation
        from={0}
        to={horizontalOffset}
        formatCSS={(value) => `transform: translate3d(${value}px, 0, 0);`}
        easing={IAnimationEasing.EASE_IN_QUART}
        {...props}
      />
    )
  }

  public static slideLeftIn({ highRes, ...props }: any) {
    const horizontalOffset = highRes
      ? BASE_HORIZONTAL_OFFSET * 2
      : BASE_HORIZONTAL_OFFSET
    return (
      <Animation
        from={horizontalOffset}
        to={0}
        formatCSS={(value) => `transform: translate3d(${value}px, 0, 0);`}
        easing={IAnimationEasing.EASE_OUT_QUART}
        {...props}
      />
    )
  }

  public static slideLeftOut({ highRes, ...props }: any) {
    const horizontalOffset = highRes
      ? BASE_HORIZONTAL_OFFSET * 2
      : BASE_HORIZONTAL_OFFSET
    return (
      <Animation
        from={0}
        to={-horizontalOffset}
        formatCSS={(value) => `transform: translate3d(${value}px, 0, 0);`}
        easing={IAnimationEasing.EASE_IN_QUART}
        {...props}
      />
    )
  }

  // Blur animations
  public static blurIn({ highRes, ...props }: any) {
    return (
      <Animation
        from={{ blur: 20, scale3d: `3, 3, 3` }}
        to={{ blur: 0, scale3d: `1, 1, 1` }}
        formatCSS={({ blur, scale3d }: any) =>
          `filter: blur(${blur}px); 
        transform: scale3d(${scale3d});
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
        backface-visibility: hidden;
        will-change: transform;
        rotate(0.05deg);`
        }
        easing={IAnimationEasing.EASE_OUT_QUART}
        duration={props.duration}
        progress={props.progress}
        delay={props.delay}
      >
        <FadeIn
          duration={props.duration * 0.4}
          progress={props.progress}
          delay={props.delay}
        >
          {props.children}
        </FadeIn>
      </Animation>
    )
  }

  public static blurOut({ highRes, ...props }: any) {
    return (
      <Animation
        from={{ blur: 0, scale3d: `1, 1, 1` }}
        to={{ blur: 20, scale3d: `3, 3, 3` }}
        formatCSS={({ blur, scale3d }: any) =>
          `filter: blur(${blur}px);
         transform: scale3d(${scale3d});
         -webkit-backface-visibility: hidden;
         -webkit-perspective: 1000;
         backface-visibility: hidden;
         will-change: transform;
         rotate(0.05deg);`
        }
        easing={IAnimationEasing.EASE_IN_QUART}
        duration={props.duration}
        progress={props.progress}
        delay={props.delay}
      >
        <FadeOut
          duration={props.duration * 0.4}
          progress={props.progress && props.progress - props.duration * 0.6}
          delay={props.delay + props.duration * 0.6}
        >
          {props.children}
        </FadeOut>
      </Animation>
    )
  }

  // Flash animations
  public static flashIn({ highRes, ...props }: any) {
    return (
      <Animation
        from={FLASH_MAX}
        to={1}
        formatCSS={(value) => `filter: brightness(${value});`}
        easing={IAnimationEasing.EASE_OUT_QUART}
        duration={props.duration}
        progress={props.progress}
        delay={props.delay}
      >
        <FadeIn
          duration={props.duration * 0.4}
          progress={props.progress}
          delay={props.delay}
        >
          {props.children}
        </FadeIn>
      </Animation>
    )
  }

  public static flashOut({ highRes, ...props }: any) {
    return (
      <Animation
        from={1}
        to={FLASH_MAX}
        formatCSS={(value) => `filter: brightness(${value});`}
        easing={IAnimationEasing.EASE_OUT_QUART}
        duration={props.duration}
        progress={props.progress}
        delay={props.delay}
      >
        <FadeOut
          duration={props.duration * 0.4}
          progress={props.progress && props.progress - props.duration * 0.6}
          delay={props.delay + props.duration * 0.6}
        >
          {props.children}
        </FadeOut>
      </Animation>
    )
  }

  // Warp animations
  public static warpRightIn({ highRes, ...props }: any) {
    return (
      <Animation
        from={{ rotation: -WARP_ROTATION, offset: -WARP_OFFSET }}
        to={{ rotation: 0, offset: 0 }}
        formatCSS={({ rotation, offset }: any) =>
          `transform: perspective(${WARP_PERSPECTIVE}) rotateY(${rotation}deg) translate3d(${offset}px, 0, 0);`
        }
        easing={IAnimationEasing.EASE_OUT_QUART}
        duration={props.duration}
        progress={props.progress}
        delay={props.delay}
      >
        <FadeIn
          duration={props.duration * 0.4}
          progress={props.progress}
          delay={props.delay}
        >
          {props.children}
        </FadeIn>
      </Animation>
    )
  }

  public static warpRightOut({ highRes, ...props }: any) {
    return (
      <Animation
        from={{ rotation: 0, offset: 0 }}
        to={{ rotation: WARP_ROTATION, offset: WARP_OFFSET }}
        formatCSS={({ rotation, offset }: any) =>
          `transform: perspective(${WARP_PERSPECTIVE}) rotateY(${rotation}deg) translate3d(${offset}px, 0, 0);`
        }
        easing={IAnimationEasing.EASE_IN_QUART}
        duration={props.duration}
        progress={props.progress}
        delay={props.delay}
      >
        <FadeOut
          duration={props.duration * 0.4}
          progress={props.progress && props.progress - props.duration * 0.6}
          delay={props.delay + props.duration * 0.6}
        >
          {props.children}
        </FadeOut>
      </Animation>
    )
  }

  // Wipe animations
  public static wipeLeftIn({ highRes, ...props }: any) {
    return (
      <Animation
        from={100}
        to={0}
        formatCSS={(value) => `clip-path: inset(0 ${value}% 0 0);`}
        easing={IAnimationEasing.EASE_IN_OUT_QUAD}
        duration={props.duration}
        progress={props.progress}
        delay={props.delay}
      >
        <Animation
          from={{ blur: 20, scale: 1.1 }}
          to={{ blur: 0, scale: 1 }}
          formatCSS={({ blur, scale }: any) =>
            `filter: blur(${blur}px); transform: scale(${scale});`
          }
          easing={IAnimationEasing.EASE_IN_OUT_QUAD}
          duration={props.duration * 0.6}
          progress={props.progress && props.progress - props.duration * 0.2}
          delay={props.delay + props.duration * 0.2}
        >
          {props.children}
        </Animation>
      </Animation>
    )
  }

  public static wipeLeftOut({ highRes, ...props }: any) {
    return (
      <Animation
        from={0}
        to={100}
        formatCSS={(value) => `clip-path: inset(0 0 0 ${value}%);`}
        easing={IAnimationEasing.EASE_IN_OUT_QUAD}
        {...props}
      />
    )
  }

  // Other animations
  public static blurOutToBg({ highRes, ...props }: any) {
    return (
      <Animation
        from={{ blur: 0, scale: 1 }}
        to={{ blur: 10, scale: 2.5 }}
        formatCSS={({ blur, scale }: any) => {
          return `transform: scale(${scale}); filter: blur(${blur}px);`
        }}
        easing={IAnimationEasing.EASE_IN_OUT_QUART}
        duration={props.duration}
        progress={props.progress}
        delay={props.delay}
      >
        <FadeOut
          duration={props.duration * 0.8}
          progress={props.progress && props.progress - props.duration * 0.2}
          delay={props.delay + props.duration * 0.2}
        >
          {props.children}
        </FadeOut>
      </Animation>
    )
  }

  public static none({ highRes, ...props }: any) {
    return <div {...props} />
  }

  public static alignTopRight({ highRes, ...props }: any) {
    console.log('alignTopRight props', props)
    return <StyledAlignTopRight {...props} />
  }

  public static noneIn = ({ highRes, ...props }: any) => (
    <Animation
      from={0}
      to={1}
      formatCSS={(value) => `opacity: ${value === 0 ? 0 : 1};`}
      {...props}
    />
  )

  public static noneOut = ({ highRes, ...props }: any) => (
    <Animation
      from={0}
      to={1}
      formatCSS={(value) => `opacity: ${value === 0 ? 1 : 0};`}
      {...props}
    />
  )
}
