import {
  IAuthState,
  IEulogisePersistentState,
  IEulogiseState,
} from '@eulogise/core'
import { UtilHelper } from '@eulogise/helpers'
import { EulogiseInitialState } from '../constants/state'

const EULOGISE_PERSISTENT_KEY: string = 'eulogise-state'

export const PERSIST_STATE_KEYS: Array<string> = ['auth', 'cases']

export const PersistentStorageHelper = {
  save: (data: object) => {
    const win = UtilHelper.getWindow()
    if (!win) {
      return
    }
    ;(win as any).localStorage.setItem(
      EULOGISE_PERSISTENT_KEY,
      JSON.stringify(data),
    )
  },

  restore: (): IEulogisePersistentState => {
    const win = UtilHelper.getWindow()
    if (!win) {
      // @ts-ignore
      return {}
    }
    const restoreJSON =
      JSON.parse((win as any).localStorage.getItem(EULOGISE_PERSISTENT_KEY)) ??
      {}
    const returnState = Object.entries(restoreJSON).reduce(
      (acc, [stateKey, stateObj]: [string, any]) => ({
        ...acc,
        [stateKey]: stateObj.isFetching
          ? { ...stateObj, isFetching: false }
          : stateObj,
      }),
      {},
    )
    return (returnState as IEulogisePersistentState) ?? {}
  },

  saveState: (data: IEulogiseState) => {
    const newPersistState = PERSIST_STATE_KEYS.reduce(
      // @ts-ignore
      (acc, key: string) => ({ ...acc, [key]: data[key] }),
      {},
    ) as IEulogisePersistentState
    PersistentStorageHelper.save({
      ...EulogiseInitialState,
      ...newPersistState,
    })
  },

  restoreState: (): IEulogisePersistentState => {
    return PersistentStorageHelper.restore() || EulogiseInitialState
  },

  getState: (): IEulogisePersistentState => {
    return PersistentStorageHelper.restore()
  },

  getAuthState: (): IAuthState => {
    const state = PersistentStorageHelper.getState()
    if (!state?.auth) {
      return {}
    }
    return state?.auth
  },

  clear: () => {
    console.log('clear state')
    PersistentStorageHelper.saveState(EulogiseInitialState)
  },
}
