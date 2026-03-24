import React from 'react'
import { NavigationHelper } from '@eulogise/helpers'
import { withReduxProvider } from './src/ui/hoc/withReduxProvider'
import Bugsnag from './bugsnag'
import ReactDOM from 'react-dom/client'
import { withWebsocketProvider } from './src/ui/hoc/withWebsocketProvider'

const BugsnagErrorBoundary =
  Bugsnag?.getPlugin('react')?.createErrorBoundary(React)

export const wrapRootElement = ({ element }: { element: any }) => {
  const wrappedWithRedux = withReduxProvider(withWebsocketProvider(element))

  if (!BugsnagErrorBoundary) {
    return withReduxProvider(element)
  }
  return <BugsnagErrorBoundary>{wrappedWithRedux}</BugsnagErrorBoundary>
}

export const onRouteUpdate = () => {
  NavigationHelper.removeUnsavedListener()
}

export const replaceHydrateFunction = () => {
  return (element: any, container: any) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}
