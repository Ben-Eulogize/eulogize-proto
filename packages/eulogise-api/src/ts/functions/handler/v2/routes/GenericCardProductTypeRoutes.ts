import { GenericCardProductTypeResourceController } from '../../../controller'
import { RouteMiddleware } from '../middleware/RouteMiddleware'
import {
  EulogiseUserRole,
  IGenericCardProductTypeCreateRequest,
  IGenericCardProductTypeListResponse,
  IGenericCardProductTypeResponse,
  IGenericCardProductTypeUpdateRequest,
} from '@eulogise/core'
import {
  V2RouteContext,
  V2RouteGetRequestEvent,
  V2RoutePostRequestEvent,
  V2RoutePutRequestEvent,
  V2RouteDeleteRequestEvent,
} from '../../../../types/routes.types'

/**
 * List all generic card product types with optional filtering
 * GET /v2/admin/generic-card-product-types?category=CARD&searchQuery=booklet
 */
const listGenericCardProductTypes = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
): Promise<IGenericCardProductTypeListResponse> => {
  const { webtoken } = request
  const { searchQuery } = request.queryStringParameters || {}

  console.log('listGenericCardProductTypes', {
    searchQuery,
  })

  const genericCardProductTypes =
    await GenericCardProductTypeResourceController.list(webtoken!)

  return {
    genericCardProductTypes,
    total: genericCardProductTypes.length,
  }
}

/**
 * Get a single generic card product type by ID
 * GET /v2/admin/generic-card-product-types/:genericCardProductTypeId
 */
const getGenericCardProductTypeById = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { genericCardProductTypeId: string },
): Promise<IGenericCardProductTypeResponse> => {
  const { webtoken } = request
  const { genericCardProductTypeId } = pathParams

  console.log('getGenericCardProductTypeById', genericCardProductTypeId)

  const genericCardProductType =
    await GenericCardProductTypeResourceController.getById(
      webtoken!,
      genericCardProductTypeId,
    )

  return { genericCardProductType }
}

/**
 * Get a single generic card product type by slug
 * GET /v2/admin/generic-card-product-types/slug/:slug
 */
const getGenericCardProductTypeBySlug = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { slug: string },
): Promise<IGenericCardProductTypeResponse> => {
  const { webtoken } = request
  const { slug } = pathParams

  console.log('getGenericCardProductTypeBySlug', slug)

  const genericCardProductType =
    await GenericCardProductTypeResourceController.getBySlug(webtoken!, slug)

  if (!genericCardProductType) {
    throw new Error(`GenericCardProductType with slug "${slug}" not found`)
  }

  return { genericCardProductType }
}

/**
 * Create a new generic card product type
 * POST /v2/admin/generic-card-product-types
 */
const createGenericCardProductType = async (
  request: V2RoutePostRequestEvent<IGenericCardProductTypeCreateRequest>,
  context: V2RouteContext,
): Promise<IGenericCardProductTypeResponse> => {
  const { webtoken, body } = request

  console.log('createGenericCardProductType', body)

  const genericCardProductType =
    await GenericCardProductTypeResourceController.create(
      webtoken!,
      body as IGenericCardProductTypeCreateRequest,
    )

  return { genericCardProductType }
}

/**
 * Update an existing generic card product type
 * PUT /v2/admin/generic-card-product-types/:genericCardProductTypeId
 */
const updateGenericCardProductType = async (
  request: V2RoutePutRequestEvent<IGenericCardProductTypeUpdateRequest>,
  context: V2RouteContext,
  pathParams: { genericCardProductTypeId: string },
): Promise<IGenericCardProductTypeResponse> => {
  const { webtoken, body } = request
  const { genericCardProductTypeId } = pathParams

  console.log('updateGenericCardProductType', genericCardProductTypeId, body)

  const genericCardProductType =
    await GenericCardProductTypeResourceController.update(
      webtoken!,
      genericCardProductTypeId,
      body as IGenericCardProductTypeUpdateRequest,
    )

  return { genericCardProductType }
}

/**
 * Duplicate a generic card product type
 * POST /v2/admin/generic-card-product-types/:genericCardProductTypeId/duplicate
 */
const duplicateGenericCardProductType = async (
  request: V2RoutePostRequestEvent<{ name: string }>,
  context: V2RouteContext,
  pathParams: { genericCardProductTypeId: string },
): Promise<IGenericCardProductTypeResponse> => {
  const { webtoken, body } = request
  const { genericCardProductTypeId } = pathParams

  console.log('duplicateGenericCardProductType', genericCardProductTypeId, body)

  if (!body || !body.name) {
    throw new Error('Name is required for duplication')
  }

  const genericCardProductType =
    await GenericCardProductTypeResourceController.duplicate(
      webtoken!,
      genericCardProductTypeId,
      body.name,
    )

  return { genericCardProductType }
}

/**
 * Delete a generic card product type
 * DELETE /v2/admin/generic-card-product-types/:genericCardProductTypeId
 */
const deleteGenericCardProductType = async (
  request: V2RouteDeleteRequestEvent,
  context: V2RouteContext,
  pathParams: { genericCardProductTypeId: string },
): Promise<{ ok: boolean }> => {
  const { webtoken } = request
  const { genericCardProductTypeId } = pathParams

  console.log('deleteGenericCardProductType', genericCardProductTypeId)

  await GenericCardProductTypeResourceController.delete(
    webtoken!,
    genericCardProductTypeId,
  )

  return { ok: true }
}

/**
 * Reindex Redis cache for all generic card product types
 * POST /v2/admin/generic-card-product-types/cache/reindex
 */
const reindexGenericCardProductTypeCache = async (
  request: V2RoutePostRequestEvent<{}>,
  context: V2RouteContext,
): Promise<{ ok: boolean; message: string }> => {
  const { webtoken } = request

  console.log('reindexGenericCardProductTypeCache')

  await GenericCardProductTypeResourceController.reindexCache(webtoken!)

  return {
    ok: true,
    message: 'GenericCardProductType cache reindexed successfully',
  }
}

// Route definitions
export default {
  // Admin routes (require ADMIN role)
  '/admin/generic-card-product-types': {
    GET: RouteMiddleware.authMiddleware(
      [
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.CUSTOMER,
        EulogiseUserRole.CONTRIBUTOR,
        EulogiseUserRole.ADMIN,
        EulogiseUserRole.COEDITOR,
        EulogiseUserRole.EDITOR,
        EulogiseUserRole.VISITOR,
      ],
      listGenericCardProductTypes,
    ),
    POST: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      createGenericCardProductType,
    ),
  },
  '/admin/generic-card-product-types/:genericCardProductTypeId': {
    GET: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      getGenericCardProductTypeById,
    ),
    PUT: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      updateGenericCardProductType,
    ),
    DELETE: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      deleteGenericCardProductType,
    ),
  },
  '/admin/generic-card-product-types/slug/:slug': {
    GET: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      getGenericCardProductTypeBySlug,
    ),
  },
  '/admin/generic-card-product-types/:genericCardProductTypeId/duplicate': {
    POST: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      duplicateGenericCardProductType,
    ),
  },
  '/admin/generic-card-product-types/cache/reindex': {
    POST: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      reindexGenericCardProductTypeCache,
    ),
  },
}
