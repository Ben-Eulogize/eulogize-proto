import { useSelector } from 'react-redux'
import { IEulogiseState, IGlobalState } from '@eulogise/core'
import { GlobalInitialState } from '../store/GlobalState/redux'

export const useGlobal = (): IGlobalState => {
  return useSelector(
    (state: IEulogiseState) => state.global ?? GlobalInitialState,
  )
}

export const useHeaderHeight = () => {
  const global = useGlobal()
  return global.headerHeight
}
