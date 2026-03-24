import {
  baseCardProductInitialState,
  BaseCardProductReducer,
} from '../CardProduct/baseCardProductReducer'
import { EulogiseProduct } from '@eulogise/core'

export const ThankYouCardReducer = BaseCardProductReducer(
  EulogiseProduct.THANK_YOU_CARD,
)

export const ThankYouCardInitialState = baseCardProductInitialState
