import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

// ...
import { EulogiseRootReducer } from './reducers'
import { EulogiseRootSaga } from './sagas'
import { UtilHelper } from '@eulogise/helpers'
import { PersistentStorageHelper } from '../helpers/PersistentStorageHelper'
import { IEulogiseState } from '@eulogise/core'

// Create the Redux Saga middleware
const sagaMiddleware = createSagaMiddleware()
const restoreState = PersistentStorageHelper.restore()

const store = configureStore({
  reducer: EulogiseRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  preloadedState: restoreState as IEulogiseState,
})
sagaMiddleware.run(EulogiseRootSaga)
store.subscribe(
  UtilHelper.debounce(() => {
    const updatedState = store.getState() as IEulogiseState
    PersistentStorageHelper.saveState(updatedState)
  }, 300),
)

export const eulogiseStore = store
