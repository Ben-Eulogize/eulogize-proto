import {
  baseCardProductInitialState,
  BaseCardProductReducer,
} from '../CardProduct/baseCardProductReducer'
import { EulogiseProduct } from '@eulogise/core'

export const PhotobookReducer = BaseCardProductReducer(
  EulogiseProduct.PHOTOBOOK,
)

export const PhotobookInitialState = baseCardProductInitialState
