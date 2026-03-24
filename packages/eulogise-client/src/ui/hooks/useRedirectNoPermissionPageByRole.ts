import { EulogiseEndpoint } from '@eulogise/client-core'
import { EulogisePage, EulogiseUserRole } from '@eulogise/core'
import { DashboardHelper, NavigationHelper } from '@eulogise/helpers'
import { useEffect } from 'react'

interface UseRedirectNoPermissionPageByRole {
  role: EulogiseUserRole | undefined
  pathname: string
}

export const useRedirectNoPermissionPageByRole = ({
  role,
  pathname,
}: UseRedirectNoPermissionPageByRole): void => {
  useEffect(() => {
    if (role) {
      switch (role) {
        case EulogiseUserRole.CONTRIBUTOR:
          const isAtPhotoLibraryPage: boolean =
            DashboardHelper.isPathnameMatchedPageEndpoint({
              pathname,
              pageEndPoint: EulogiseEndpoint.PHOTO_LIBRARY,
            })
          if (!isAtPhotoLibraryPage) {
            console.log(
              `useRedirectNoPermissionPageByRole, redirecting to ${EulogisePage.PHOTO_LIBRARY}`,
            )
            NavigationHelper.navigate(EulogisePage.PHOTO_LIBRARY)
          }
        default:
          break
      }
    }
  }, [role])
}
