import React from 'react'
import { Provider } from 'react-redux'
import { eulogiseStore } from '../store/redux'

const withReduxProvider = (Component: any) => {
  return <Provider store={eulogiseStore}>{Component}</Provider>
}

export { withReduxProvider }
