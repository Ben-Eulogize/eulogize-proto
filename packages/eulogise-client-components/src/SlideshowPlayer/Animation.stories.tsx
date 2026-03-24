import React from 'react'
import styled from 'styled-components'
import MatrixSrc from './assets/matrix-1.jpg'
import { Animations as Animation } from './utils/animations'

export default {
  title: 'Animation',
  component: Animation,
  argTypes: {},
}

const ExampleImage = styled.img.attrs({
  src: MatrixSrc,
})``

export const fadeIn = () => (
  <Animation.fadeIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.fadeIn>
)

export const fadeInBlack = () => (
  <Animation.fadeInBlack duration={2000} delay={0}>
    <ExampleImage />
  </Animation.fadeInBlack>
)

export const fadeOut = () => (
  <Animation.fadeOut duration={2000} delay={0}>
    <ExampleImage />
  </Animation.fadeOut>
)

export const fadeOutBlack = () => (
  <Animation.fadeOutBlack duration={2000} delay={0}>
    <ExampleImage />
  </Animation.fadeOutBlack>
)

export const zoomIn = () => (
  <Animation.zoomIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.zoomIn>
)

export const zoomOut = () => (
  <Animation.zoomOut duration={2000} delay={0}>
    <ExampleImage />
  </Animation.zoomOut>
)

export const fadeOutZoomIn = () => (
  <Animation.fadeOutZoomIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.fadeOutZoomIn>
)

export const slideRight = () => (
  <Animation.slideRight duration={2000} delay={0}>
    <ExampleImage />
  </Animation.slideRight>
)

export const slideLeft = () => (
  <Animation.slideLeft duration={2000} delay={0}>
    <ExampleImage />
  </Animation.slideLeft>
)

export const slideDownIn = () => (
  <Animation.slideDownIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.slideDownIn>
)

export const slideDownOut = () => (
  <Animation.slideDownOut duration={2000} delay={0}>
    <ExampleImage />
  </Animation.slideDownOut>
)

export const slideUpIn = () => (
  <Animation.slideUpIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.slideUpIn>
)

export const slideUpOut = () => (
  <Animation.slideUpOut duration={2000} delay={0}>
    <ExampleImage />
  </Animation.slideUpOut>
)

export const slideRightIn = () => (
  <Animation.slideRightIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.slideRightIn>
)

export const slideRightOut = () => (
  <Animation.slideRightOut duration={2000} delay={0}>
    <ExampleImage />
  </Animation.slideRightOut>
)

export const slideLeftIn = () => (
  <Animation.slideLeftIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.slideLeftIn>
)
export const slideLeftOut = () => (
  <Animation.slideLeftOut duration={2000} delay={0}>
    <ExampleImage />
  </Animation.slideLeftOut>
)

export const blurIn = () => (
  <Animation.blurIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.blurIn>
)

export const blurOut = () => (
  <Animation.blurOut duration={2000} delay={0}>
    <ExampleImage />
  </Animation.blurOut>
)

export const flashIn = () => (
  <Animation.flashIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.flashIn>
)

export const flashOut = () => (
  <Animation.flashOut duration={2000} delay={0}>
    <ExampleImage />
  </Animation.flashOut>
)

export const warpRightIn = () => (
  <Animation.warpRightIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.warpRightIn>
)

export const warpRightOut = () => (
  <Animation.warpRightOut duration={2000} delay={0}>
    <ExampleImage />
  </Animation.warpRightOut>
)

export const wipeLeftIn = () => (
  <Animation.wipeLeftIn duration={2000} delay={0}>
    <ExampleImage />
  </Animation.wipeLeftIn>
)

export const wipeLeftOut = () => (
  <Animation.wipeLeftOut duration={2000} delay={0}>
    <ExampleImage />
  </Animation.wipeLeftOut>
)

export const blurOutToBg = () => (
  <Animation.blurOutToBg duration={2000} delay={0}>
    <ExampleImage />
  </Animation.blurOutToBg>
)
