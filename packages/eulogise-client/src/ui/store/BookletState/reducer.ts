import {
  baseCardProductInitialState,
  BaseCardProductReducer,
} from '../CardProduct/baseCardProductReducer'
import { EulogiseProduct } from '@eulogise/core'

export const BookletReducer = BaseCardProductReducer(EulogiseProduct.BOOKLET)

export const BookletInitialState = baseCardProductInitialState
