import {
  baseCardProductInitialState,
  BaseCardProductReducer,
} from '../CardProduct/baseCardProductReducer'
import { EulogiseProduct } from '@eulogise/core'

export const SidedCardReducer = BaseCardProductReducer(
  EulogiseProduct.SIDED_CARD,
)

export const SidedCardInitialState = baseCardProductInitialState
