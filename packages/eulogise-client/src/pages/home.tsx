import React, { useEffect, useState } from 'react'
import { PageProps } from 'gatsby'
import { NavigationHelper, UrlHelper } from '@eulogise/helpers'
import { EulogisePage, IClientHandleRouteResponse } from '@eulogise/core'
import { ResponsiveSignUpPage } from '../ui/containers/Auth/SignUp/ResponsiveSignUpPage'
import { useEulogiseDispatch } from '../ui/store/hooks'
import { fetchClientByHandle } from '../ui/store/ClientState/actions'
import { LoadingMessage } from '../ui/components/LoadingMessage/LoadingMessage'

const FuneralHomePage: React.FunctionComponent<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [client, setClient] = useState<IClientHandleRouteResponse>()
  const params = UrlHelper.getParams(EulogisePage.FUNERAL_HOME_LOGIN, {
    pathname: location.pathname,
  })
  const handle = params.clientHandle

  useEffect(() => {
    dispatch(
      fetchClientByHandle({
        handle,
        onSuccess: (client) => {
          console.log('client fetched', client)
          setIsLoading(false)
          setClient(client)
        },
        onFailed: () => {
          console.log('client fetch failed')
          NavigationHelper.navigate(EulogisePage.SIGN_IN)
        },
      }),
    )
  }, [])

  if (isLoading) {
    return <LoadingMessage />
  }

  return (
    <ResponsiveSignUpPage
      location={location}
      client={client}
      viaClientHandle={handle}
    />
  )
}

export default FuneralHomePage
