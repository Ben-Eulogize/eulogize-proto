import { match as urlMatch } from 'path-to-regexp'
import ExternalAccessRoutes from './ExternalAccessRoutes'
import CasesRoutes from './CasesRoutes'
import ProductRoutes from './ProductRoutes'
import ClientRoutes from './ClientRoutes'
import UserRoutes from './UserRoutes'
import ThemeRoutes from './ThemeRoutes'
import InviteRoutes from './InviteRoutes'
import ReportRoutes from './ReportRoutes'
import AssetRoutes from './AssetRoutes'
import {
  V2RouteBaseRequestEvent,
  V2RouteContext,
} from '../../../../types/routes.types'
import BackgroundImageRoutes from './BackgroundImageRoutes'
import HealthCheckRoutes from './HealthCheckRoutes'
import OldRoutes from './OldRoutes'
import WebSocketRoutes from './WebSocketRoutes'
import ConnectionRoutes from './ConnectionRoutes'
import ShareRoutes from './ShareRoutes'
import GenericCardProductTypeRoutes from './GenericCardProductTypeRoutes'

const routes: any = {
  ...OldRoutes,
  ...ExternalAccessRoutes,
  ...CasesRoutes,
  ...ProductRoutes,
  ...GenericCardProductTypeRoutes,
  ...ClientRoutes,
  ...UserRoutes,
  ...ThemeRoutes,
  ...BackgroundImageRoutes,
  ...HealthCheckRoutes,
  ...InviteRoutes,
  ...ReportRoutes,
  ...AssetRoutes,
  ...ConnectionRoutes,
  ...ShareRoutes,
}

export const getRoute = ({
  path,
  method,
  routeKey,
}: {
  path?: string
  method?: string
  routeKey?: string
}): {
  fn: (
    event: V2RouteBaseRequestEvent,
    context: V2RouteContext,
    pathParams: object,
  ) => Promise<any>
  params: object
} => {
  if (routeKey) {
    switch (routeKey) {
      case '$connect': {
        return { fn: WebSocketRoutes.$connect, params: {} }
      }
      case '$disconnect': {
        return { fn: WebSocketRoutes.$disconnect, params: {} }
      }
      case '$default': {
        return { fn: WebSocketRoutes.$default, params: {} }
      }
      case 'message': {
        return { fn: WebSocketRoutes.message, params: {} }
      }
      default: {
        throw new Error(`getRoute: unknown routeKey "${routeKey}"`)
      }
    }
  }
  if (!path || !method) {
    throw new Error(
      `getRoute: path and method are required (path: "${path}", method: "${method}")`,
    )
  }
  const regExPaths = Object.keys(routes).sort((a, b) => (a > b ? -1 : 1))
  console.log('getRoute: route key', regExPaths)
  for (let regExPath of regExPaths) {
    const matchDetails = urlMatch(regExPath)(path)
    console.log('getRoute: regExPath', {
      regExPath,
      path,
      matchDetails,
      method,
    })
    if (matchDetails) {
      console.log('getRoute: found route match', { regExPath, method, path })
      console.log('getRoute: found route match details', matchDetails)
      return { fn: routes[regExPath]?.[method], params: matchDetails.params }
    }
  }
  throw new Error(
    `getRoute: route not found (path: "${path}", method: "${method}")`,
  )
}
