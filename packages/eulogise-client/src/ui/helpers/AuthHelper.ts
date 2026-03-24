import { EulogiseUserRole, EulogisePage } from '@eulogise/core'
import { UrlHelper } from '@eulogise/helpers'
import { NavigationHelper } from '@eulogise/helpers'

export const AuthHelper = {
  isTokenExpired: (jwtToken?: string) => !jwtToken,
  navigatePageByEulogiseRole: (role: EulogiseUserRole) => {
    const redirectTo: string = UrlHelper.getQueryParam(
      'redirectTo',
      location.search,
    )
    if (!redirectTo) {
      switch (role) {
        case EulogiseUserRole.CUSTOMER:
          return NavigationHelper.navigate(EulogisePage.DASHBOARD)
        case EulogiseUserRole.ADMIN:
          return NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_CLIENTS)
        case EulogiseUserRole.CLIENT:
          return NavigationHelper.navigate(EulogisePage.CLIENT_ADMIN_CASES)
        case EulogiseUserRole.VISITOR_SLIDESHOW:
        case EulogiseUserRole.VISITOR_BOOKLET:
        case EulogiseUserRole.VISITOR_BOOKMARK:
        case EulogiseUserRole.VISITOR_THANKYOUCARD:
        case EulogiseUserRole.VISITOR_SIDED_CARD:
          return NavigationHelper.navigate(EulogisePage.INVITE)
        default:
          return NavigationHelper.navigate(EulogisePage.DASHBOARD)
      }
    }
  },
}
