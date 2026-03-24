import { EulogiseEndpoint } from '@eulogise/client-core'

export class DashboardHelper {
  public static isPathnameMatchedPageEndpoint = ({
    pathname,
    pageEndPoint,
  }: {
    pathname: string
    pageEndPoint: EulogiseEndpoint
  }): boolean => {
    return new RegExp(pageEndPoint).test(pathname)
  }
}
