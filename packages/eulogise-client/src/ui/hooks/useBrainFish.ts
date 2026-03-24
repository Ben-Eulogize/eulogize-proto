import React from 'react'
import Brainfish from '@brainfish-ai/web-widget'
import { useAuthState } from '../store/hooks'
import { EulogiseClientConfig } from '@eulogise/client-core'

export const useBrainFish = () => {
  const { account, webtokenPayload } = useAuthState()
  const email = account?.email
  const userId = account?.id
  const role = account?.role
  const type = account?.type
  const userFullName = account?.fullName
  const clientId = webtokenPayload?.clientId

  React.useEffect(() => {
    if (!EulogiseClientConfig.BRAINFISH_WIDGET_KEY) {
      return
    }
    if (role === 'admin') {
      console.log('Not initializing BrainFish', {
        role,
      })
      return
    }
    console.log('Initializing BrainFish', email)

    try {
      // @ts-ignore
      Brainfish.Widgets.init({
        widgetKey: EulogiseClientConfig.BRAINFISH_WIDGET_KEY!,
      })

      // Optional: Identify the user this will allow you to track events and metrics for the user
      const identify = {
        userId,
        email,

        // Optional: Add properties to the user
        properties: {
          teamId: clientId,
          subscription: role,
          isAdmin: !!clientId,
        },
      }
      console.log('brainFish identify', identify)
      window.BrainfishAnalytics('identify', identify)
    } catch (error) {
      console.log('useBrainFish error', error)
    }
  }, [email, userId, role, type, userFullName, clientId])
}
