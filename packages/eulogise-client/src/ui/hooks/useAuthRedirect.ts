import { WindowLocation } from '@reach/router'
import { useAuthState } from '../store/hooks'
import { AuthHelper } from '../helpers/AuthHelper'
import { EulogisePage } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'

export const useAuthRedirect = (location: WindowLocation) => {
  const auth = useAuthState()
  const { pathname } = location
  const isTokenExpired = AuthHelper.isTokenExpired(auth.webtoken)
  if (/^\/(admin|eulogizeAdmin)\//.test(pathname)) {
    if (isTokenExpired) {
      NavigationHelper.navigate(EulogisePage.SIGN_IN)
      return
    }
  } else {
    if (!isTokenExpired) {
      const { role } = auth?.account!
      AuthHelper.navigatePageByEulogiseRole(role)
      return
    }
  }
}
