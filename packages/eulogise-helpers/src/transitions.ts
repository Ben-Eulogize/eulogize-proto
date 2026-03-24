import { ITransitionInOut } from '@eulogise/core'

export const transitions: { [key: string]: ITransitionInOut } = {
  crossFade: {
    in: { type: 'fadeIn' },
    out: { type: 'fadeOut' },
  },
  crossBlur: {
    in: { type: 'blurIn' },
    out: { type: 'fadeOut' },
  },
  crossFlash: {
    in: { type: 'flashIn', duration: 0.6, delay: 0.2 },
    out: { type: 'flashOut', duration: 0.6 },
  },
  crossFadeZoomOut: {
    in: { type: 'fadeIn', duration: 0.4, delay: 0.6 },
    out: { type: 'fadeOut' },
  },
  slideUp: {
    in: { type: 'slideUpIn', duration: 0.8, delay: 0.2 },
    out: { type: 'slideUpOut', duration: 0.8 },
  },
  slideDown: {
    in: { type: 'slideDownIn', duration: 0.8, delay: 0.2 },
    out: { type: 'slideDownOut', duration: 0.8 },
  },
  slideRight: {
    in: { type: 'slideRightIn', duration: 0.6, delay: 0.4 },
    out: { type: 'slideRightOut', duration: 0.6 },
  },
  slideLeft: {
    in: { type: 'slideLeftIn', duration: 0.6, delay: 0.4 },
    out: { type: 'slideLeftOut', duration: 0.6 },
  },
  warpRight: {
    in: { type: 'warpRightIn', duration: 0.7, delay: 0.3 },
    out: { type: 'warpRightOut', duration: 0.7 },
  },
  blurOutToBgFadeIn: {
    in: { type: 'fadeIn', duration: 0.5, delay: 0.5 },
    out: { type: 'fadeOut' },
  },
  blurOutToBgSlideUp: {
    in: { type: 'slideUpIn', duration: 0.5, delay: 0.5 },
    out: { type: 'fadeOut' },
  },
  blurOutToBgSlideRight: {
    in: { type: 'slideRightIn', duration: 0.9, delay: 0.1 },
    out: { type: 'fadeOut' },
  },
  wipeLeft: {
    in: { type: 'wipeLeftIn' },
    out: { type: 'none' },
  },
  wipeLeftFadeIn: {
    in: { type: 'fadeIn', duration: 0.5, delay: 0.5 },
    out: { type: 'wipeLeftOut' },
  },
  none: {
    in: { type: 'none' },
    out: { type: 'none' },
  },
}
