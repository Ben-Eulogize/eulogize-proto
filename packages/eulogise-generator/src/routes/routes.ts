import { GeneratorRoutes } from './GeneratorRoutes'

const routes = {
  ...GeneratorRoutes,
}

export const getRoute = (path, method) => routes[path]?.[method]
