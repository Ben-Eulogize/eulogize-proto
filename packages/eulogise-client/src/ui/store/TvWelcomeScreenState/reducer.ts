import {
  baseCardProductInitialState,
  BaseCardProductReducer,
} from '../CardProduct/baseCardProductReducer'
import { EulogiseProduct } from '@eulogise/core'

export const TvWelcomeScreenReducer = BaseCardProductReducer(
  EulogiseProduct.TV_WELCOME_SCREEN,
)

export const TvWelcomeScreenInitialState = baseCardProductInitialState
