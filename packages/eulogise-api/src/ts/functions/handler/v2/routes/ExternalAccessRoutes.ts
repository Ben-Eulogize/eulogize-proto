import { RouteMiddleware } from '../middleware/RouteMiddleware'

import { syncCase, createCase } from './externalRoutes/case'
import { updateCase } from './externalRoutes/updateCase'
import { createClient } from './externalRoutes/client'
import { funeralDirector } from './externalRoutes/funeralDirector'

export default {
  // Will be deprecating soon
  '/external/createCase': {
    POST: RouteMiddleware.authApiKeyMiddleware(createCase),
  },
  '/external/case': {
    POST: RouteMiddleware.authApiKeyMiddleware(createCase),
  },
  '/external/cases/:caseId': {
    PUT: RouteMiddleware.authApiKeyMiddleware(updateCase),
  },
  '/external/client': {
    POST: RouteMiddleware.authApiKeyMiddleware(createClient),
  },
  '/external/funeralDirector': {
    POST: RouteMiddleware.authApiKeyMiddleware(funeralDirector),
  },
  '/external/sync': {
    GET: syncCase,
  },
}
