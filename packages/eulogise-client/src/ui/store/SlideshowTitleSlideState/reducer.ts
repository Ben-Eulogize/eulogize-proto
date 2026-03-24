import {
  baseCardProductInitialState,
  BaseCardProductReducer,
} from '../CardProduct/baseCardProductReducer'
import { EulogiseProduct } from '@eulogise/core'

export const SlideshowTitleSlideReducer = BaseCardProductReducer(
  EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
)

export const SlideshowTitleSlideInitialState = baseCardProductInitialState
