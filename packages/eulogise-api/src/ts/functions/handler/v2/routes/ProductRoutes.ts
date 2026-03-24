import {
  EulogiseProduct,
  EulogiseRegion,
  MemorialVisualStatus,
  ResourceFileStatus,
  ResourceFileStatusKey,
  WebSocketMessageEventType,
  WebSocketProductDataUpdatedPayload,
} from '@eulogise/core'
import { BaseProductResourceController } from '../../../controller/resource/BaseProductResourceController'
import { RouteMiddleware } from '../middleware/RouteMiddleware'
import { CaseResourceController } from '../../../controller'
import {
  V2RouteContext,
  V2RoutePostRequestEvent,
  V2RoutePutRequestEvent,
} from '../../../../types/routes.types'
import { RedisClient } from '../../../../utils/RedisClient'
import { CardProductHelper } from '@eulogise/helpers'
import { ConnectionController } from '../../../controller/ConnectionController'
import { IMemorialProductModel } from '../../../../database/types/MemorialProductModel.types'

const sendGeneratedEmailByCaseId = async ({
  caseId,
  product,
  productController,
  slug,
}: {
  caseId: string
  product: EulogiseProduct
  productController: BaseProductResourceController
  slug?: string
}) => {
  console.log('sendGeneratedEmailByCaseId', { caseId, product, slug })

  const model = CaseResourceController.getProductModelByProduct(product)
  const data = await model.findByCaseId(caseId)
  await productController.sendProductGeneratedEmailByCaseId(
    caseId,
    data?.generateUserId,
  )
  console.log('sendGeneratedEmailByCaseId Done', caseId)
}

const unlockProductById = async (
  req: V2RoutePostRequestEvent<{
    slug?: string
  }>,
  context: V2RouteContext,
  pathParams: { productId: string },
  productController: BaseProductResourceController,
  eulogiseProduct: EulogiseProduct,
): Promise<any> => {
  const { slug } = req.body
  console.log(
    `unlocking product "${eulogiseProduct}" productId: "${pathParams.productId}" slug: "${slug}"`,
  )
  return await productController.unlockProductByIdAndSlug({
    productId: pathParams.productId,
    slug,
  })
}

const updateProductById = async (
  req: V2RoutePostRequestEvent<{
    data: Partial<IMemorialProductModel.Schema>
  }>,
  context: V2RouteContext,
  pathParams: { productId: string },
  productController: BaseProductResourceController,
  eulogiseProduct: EulogiseProduct,
): Promise<any> => {
  const productId = pathParams.productId
  console.log(`update product "${eulogiseProduct}" productId: "${productId}"`)
  if (!productId) {
    throw new Error(`Product id not found: ${eulogiseProduct}`)
  }
  const data = req.body.data
  if (!data) {
    throw new Error(
      `Product body data not found: ${eulogiseProduct}: ${productId}`,
    )
  }
  return await productController.updateProductById(productId, data)
}

const updateFileStatuses = async (
  req: V2RoutePutRequestEvent<{
    fileStatusKey: ResourceFileStatusKey
    fileStatus: ResourceFileStatus
    slug?: string
  }>,
  context: V2RouteContext,
  pathParams: { caseId: string; productId: string; product: EulogiseProduct },
  productController: BaseProductResourceController,
  eulogiseProduct: EulogiseProduct,
): Promise<any> => {
  console.log(
    `updateFileStatuses for product "${eulogiseProduct}" productId: "${pathParams.productId}"`,
    pathParams,
  )
  const { fileStatusKey, fileStatus, slug } = req.body
  if (!fileStatusKey) {
    throw new Error('fileStatusKey is required')
  }
  if (!fileStatus) {
    throw new Error('fileStatus is required')
  }
  const { caseId, productId, product } = pathParams
  const redisKey = RedisClient.getProductFileStatusRedisKey({
    product,
    productId,
    fileStatusKey,
    slug,
  })

  const redisClient = RedisClient.getInstance()

  // Ensure Redis connection is ready (handles reconnecting state)
  const isConnected = await redisClient.ensureConnected()
  if (!isConnected) {
    console.error(
      'Failed to establish Redis connection, proceeding without Redis',
    )
  }

  // Step 1: update redis key to latest fileStatuses
  console.log('Step 1: updating redis key', {
    redisKey,
    fileStatus,
    product,
    productId,
    fileStatusKey,
    slug,
  })
  await redisClient.set(redisKey, fileStatus)

  // Step 2: get all fileStatuses from redis
  console.log('Step 2: fetching all fileStatuses from redis')
  const fileStatuses: Partial<
    Record<ResourceFileStatusKey, ResourceFileStatus>
  > = {}
  for (const key of Object.values(ResourceFileStatusKey)) {
    const currentRedisKey = RedisClient.getProductFileStatusRedisKey({
      product,
      productId,
      fileStatusKey: key,
      slug,
    })
    fileStatuses[key] = (await redisClient.get(
      currentRedisKey,
    )) as ResourceFileStatus
    console.log('fetched redis key', currentRedisKey, fileStatuses[key])
  }

  // Step 3: Check if all fileStatuses are completed
  console.log('Step 3: Checking if all fileStatuses are complete', {
    product,
    fileStatusKey,
    fileStatuses,
  })
  const isComplete = CardProductHelper.isCardProductComplete({
    product,
    fileStatuses: fileStatuses as Record<
      ResourceFileStatusKey,
      ResourceFileStatus
    >,
  })
  console.log('isComplete', { product, slug, fileStatuses, isComplete })

  // Step 4: if it is complete, update the product record
  if (isComplete) {
    console.log('Step 4: Product is complete, updating product record', {
      product,
      slug,
    })
    const productData = {
      fileStatus: ResourceFileStatus.GENERATED,
      status: MemorialVisualStatus.COMPLETE,
      hasGeneratedBefore: true,
    }
    // Update the card product file status to generated
    await productController.updateFileStatusById({
      productId,
      ...productData,
    })
    const connectionController = new ConnectionController()
    await connectionController.sendMessagesToCase(caseId, {
      type: WebSocketMessageEventType.PRODUCT_DATA_UPDATED,
      data: {
        caseId,
        product,
        productId,
        productData,
        slug,
      } as WebSocketProductDataUpdatedPayload,
    })

    console.log('Step 5: Product is complete, sending generated email', {
      product,
      slug,
    })
    // send email to notify the user after pdf is generated
    await sendGeneratedEmailByCaseId({
      caseId,
      product,
      slug,
      productController,
    })

    console.log('Step 6: Deleting all redis keys for product', {
      product,
      slug,
      productId,
    })
    for (const key of Object.values(ResourceFileStatusKey)) {
      const currentRedisKey = RedisClient.getProductFileStatusRedisKey({
        product,
        productId,
        fileStatusKey: key,
        slug,
      })
      // delete the redis key
      console.log('Step 6: Deleting redis key', currentRedisKey)
      await redisClient.del(currentRedisKey) // delete the redis key
    }
  }
  return { ok: true }
}

const sendGeneratedEmailByCaseIdHandler = async (
  req: V2RoutePostRequestEvent<{}>,
  context: V2RouteContext,
  pathParams: { caseId: string; product: string },
  productController: BaseProductResourceController,
): Promise<any> => {
  const caseId = pathParams.caseId
  console.log('sendGeneratedEmailByCaseId', caseId)

  const model = CaseResourceController.getProductModelByProduct(
    pathParams.product as EulogiseProduct,
  )
  const data = await model.findByCaseId(caseId)
  await productController.sendProductGeneratedEmailByCaseId(
    caseId,
    data?.generateUserId,
  )
  return { ok: true }
}

const generateProduct = async (
  req: V2RoutePostRequestEvent<{
    generateUserId: string
    isVideoBier: boolean
    region: EulogiseRegion
    slug?: string
  }>,
  context: V2RouteContext,
  pathParams: {
    product: EulogiseProduct
    productId: string
  },
  productController: BaseProductResourceController,
) => {
  const body = req.body

  try {
    console.log('Generating', {
      productId: pathParams.productId,
      product: pathParams.product,
      slug: body.slug,
      region: body.region,
      generateUserId: body.generateUserId,
      isVideoBier: body.isVideoBier,
    })
    await productController.generate({
      memorialProductId: pathParams.productId,
      product: pathParams.product,
      region: body.region,
      slug: body.slug,
      generateUserId: body.generateUserId,
      additionalPayload: {
        isVideoBier: body.isVideoBier, // used by slideshow only
      },
    })
  } catch (error) {
    console.log(`Error when generating ${pathParams.product}`, error)
    if (error.lambdurError) {
      throw error
    }
    throw new Error(error)
  }

  return {
    ok: true,
  }
}

export default {
  '/admin/cases/:caseId/:product/:productId/fileStatuses': {
    PUT: RouteMiddleware.productMiddleware(updateFileStatuses),
  },
  '/admin/products/:product/:productId': {
    PUT: RouteMiddleware.productMiddleware(updateProductById),
  },
  '/admin/products/:product/:productId/unlock': {
    POST: RouteMiddleware.productMiddleware(unlockProductById),
  },
  '/admin/cases/:caseId/:product/sendGeneratedEmailByCaseId': {
    POST: RouteMiddleware.productMiddleware(sendGeneratedEmailByCaseIdHandler),
  },
  '/products/:product/:productId/generate': {
    POST: RouteMiddleware.productMiddleware(generateProduct),
  },
}
