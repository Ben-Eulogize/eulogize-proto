import {
  baseCardProductInitialState,
  BaseCardProductReducer,
} from '../CardProduct/baseCardProductReducer'
import { EulogiseProduct } from '@eulogise/core'

export const BookmarkReducer = BaseCardProductReducer(EulogiseProduct.BOOKMARK)

export const BookmarkInitialState = baseCardProductInitialState
