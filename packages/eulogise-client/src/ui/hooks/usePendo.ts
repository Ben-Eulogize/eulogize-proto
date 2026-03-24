import { useEffect } from 'react'
import { useAuthState } from '../store/hooks'
import { EulogiseClientConfig } from '@eulogise/client-core'

export const usePendo = () => {
  const { account, webtokenPayload } = useAuthState()
  const email = account?.email
  const userId = account?.id
  const role = account?.role
  const type = account?.type
  const userFullName = account?.fullName
  const clientId = webtokenPayload?.clientId
  const clientTitle = webtokenPayload?.clientTitle

  useEffect(() => {
    // console.log(
    //   'EulogiseClientConfig.PENDO_API_KEY',
    //   EulogiseClientConfig.PENDO_API_KEY,
    // )
    if (!EulogiseClientConfig.PENDO_API_KEY) {
      console.log('Pendo API key not set')
      return
    }
    if (
      email === undefined ||
      userId === undefined ||
      role === undefined ||
      type === undefined ||
      userFullName === undefined ||
      role === 'admin'
    ) {
      console.log('Not initializing Pendo', {
        email,
        userId,
        role,
        type,
        userFullName,
      })
      return
    }
    console.log('Initializing Pendo', email)

    // @ts-ignore
    pendo.initialize({
      visitor: {
        id: userId, // Required if user is logged in
        email: email, // Recommended if using Pendo Feedback, or NPS Email
        full_name: userFullName, // Recommended if using Pendo Feedback
        role, // Optional
        type,
        // You can add any additional visitor level key-values here,
        // as long as it's not one of the above reserved names.
      },

      account: {
        id: clientId, // Highly recommended, required if using Pendo Feedback
        name: clientTitle, // Optional
        // is_paying:    // Recommended if using Pendo Feedback
        // monthly_value:// Recommended if using Pendo Feedback
        // planLevel:    // Optional
        // planPrice:    // Optional
        // creationDate: // Optional

        // You can add any additional account level key-values here,
        // as long as it's not one of the above reserved names.
      },
    })
  }, [email, userId, role, type, userFullName, clientId])
}
