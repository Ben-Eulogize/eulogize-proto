import rp from 'request-promise-native'
import { Lambdur } from 'lambdur'
import { caseModel, clientModel, themeModel } from '../../../../database'
import { IThemeModel } from '../../../../database/types/ThemeModel.types'
import { CONFIG } from '../../../../config/Config'
import * as Errors from '../../../error'
import {
  EulogiseProduct,
  EulogiseProductThemeMap,
  EulogiseUserRole,
  ICardProductData,
  ITheme,
} from '@eulogise/core'
import { CardProductHelper, ThemeHelper, UtilHelper } from '@eulogise/helpers'
import * as uuid from 'uuid'
import {
  V2RouteContext,
  V2RouteGetRequestEvent,
  V2RoutePostRequestEvent,
  V2RoutePutRequestEvent,
} from '../../../../types/routes.types'
import { RouteMiddleware } from '../middleware/RouteMiddleware'
import { ThemeController } from '../../../controller/ThemeController'

const generateThumbnail = async ({
  theme,
  cardProduct,
  product,
  fileName,
  s3Path,
}: {
  theme: ITheme
  cardProduct: ICardProductData
  product: EulogiseProduct
  fileName: string
  s3Path: string
}) => {
  try {
    const url = `${CONFIG.GENERATOR_API_URL}/generator/productThumbnail`
    const body = {
      themeId: theme.id,
      cardProduct,
      product,
      fileName,
      s3Path,
      productTheme:
        theme.products[
          ThemeHelper.getEulogiseProductThemeMapValueByProductAndPageSize({
            product,
            pageSize: cardProduct.content.pageSize,
          })
        ],
    }
    console.log('generateThumbnail', {
      url,
      body,
    })
    await rp({
      method: 'POST',
      uri: url,
      body,
      json: true,
    })
    console.log(`Product Thumbnail "${product}" is generated`)
  } catch (ex) {
    console.log(`Product Thumbnail "${product}" generate error`, ex)
    throw new Lambdur.Error(
      // @ts-ignore
      Errors.resource[
        CardProductHelper.getResourceByProduct(product)
      ].generate.externalIssue(),
    )
  }
}

const createTheme = async (
  ev: V2RoutePostRequestEvent<{
    theme: ITheme
    cardProduct: ICardProductData
    product: EulogiseProduct
  }>,
  context: V2RouteContext,
): Promise<any> => {
  const { theme: themeData, cardProduct, product } = ev.body
  console.log('createTheme event', ev.webtoken)
  console.log('createTheme request received', ev.body)

  const account = ev.webtoken
  let clientId = undefined
  if (account.role === 'client') {
    const userId = account.ref
    const client = await clientModel.findOneByUserId(userId)
    clientId = client.id
  }

  const themeId = uuid.v4()
  const newThemeData: ITheme = {
    ...themeData,
    ...(clientId ? { clientId } : undefined),
    id: themeId,
  }
  const productThemeKey = ThemeHelper.getProductThemeKey(
    themeData,
  ) as EulogiseProductThemeMap

  const { s3Path, fileName, s3AbsolutePath } =
    ThemeHelper.getS3ThumbnailAbsoluteFilePath({
      themeId: themeData.id ?? themeData.name.replace(/\s/g, '-').toLowerCase(),
      productThemeKey,
      baseUrl: `https://${CONFIG.AWS_S3_BUCKET}`,
    })

  const newTheme = ThemeHelper.attachThumbnailToTheme({
    productThemeKey,
    themeData: newThemeData,
    s3AbsolutePath,
  })
  const theme = await themeModel.create(newTheme)
  console.log('createTheme request', theme.products.booklet?.thumbnail.images)
  await generateThumbnail({
    cardProduct,
    product,
    theme: newThemeData,
    fileName,
    s3Path,
  })
  await themeModel.createRedisIndexRecord(theme)

  return {
    theme,
  }
}

const updateThemeById = async (
  ev: V2RoutePutRequestEvent<{
    theme: ITheme
    cardProduct: ICardProductData
    product: EulogiseProduct
    overwriteThumbnail?: boolean
  }>,
  context: V2RouteContext,
  pathParams: { themeId: string },
): Promise<any> => {
  const {
    theme: themeFormData,
    cardProduct,
    product,
    overwriteThumbnail,
  } = ev.body
  console.log('updateThemeById request received', {
    theme: themeFormData,
    cardProduct,
    product,
  })
  const themeId = pathParams.themeId

  console.log('themeId', themeId)
  const productThemeKey = ThemeHelper.getProductThemeKey(
    themeFormData,
  ) as EulogiseProductThemeMap
  console.log('productThemeKey', productThemeKey)

  const { s3Path, fileName, s3AbsolutePath } =
    ThemeHelper.getS3ThumbnailAbsoluteFilePath({
      themeId:
        themeFormData.id ??
        themeFormData.name.replace(/\s/g, '-').toLowerCase(),
      productThemeKey,
      baseUrl: `https://${CONFIG.AWS_S3_BUCKET}`,
    })

  const existingTheme = await themeModel.findById(themeId)
  const thumbnailImagesSize = UtilHelper.getPath(
    ['products', productThemeKey, 'thumbnail', 'images', 'length'],
    existingTheme,
  )
  // either no thumbnail or overwriteThumbnail is true
  const shouldUpdateThumbnail =
    overwriteThumbnail ||
    thumbnailImagesSize === 0 ||
    thumbnailImagesSize === undefined

  console.log('shouldUpdateThumbnail', shouldUpdateThumbnail, {
    overwriteThumbnail,
    thumbnailImagesSize,
  })
  let theme: IThemeModel.Model
  if (shouldUpdateThumbnail) {
    const newUpdateTheme = ThemeHelper.attachThumbnailToTheme({
      themeData: themeFormData,
      productThemeKey,
      s3AbsolutePath: s3AbsolutePath,
    })
    theme = await themeModel.updateById(themeId, newUpdateTheme)
    await generateThumbnail({
      cardProduct,
      product,
      theme: themeFormData,
      fileName,
      s3Path,
    })
  } else {
    const existingThemeThumbnailS3Path =
      existingTheme.products?.[productThemeKey]?.thumbnail?.images?.[0]!
    const newUpdateTheme = ThemeHelper.attachThumbnailToTheme({
      themeData: themeFormData,
      productThemeKey,
      s3AbsolutePath: existingThemeThumbnailS3Path,
    })
    theme = await themeModel.updateById(themeId, newUpdateTheme)
  }
  await themeModel.updateRedisIndexRecordById(theme.id!, theme)
  console.log('updateThemeById response', theme)
  return {
    theme,
  }
}

const getAllThemeSummary = async (
  ev: V2RouteGetRequestEvent,
  context: V2RouteContext,
): Promise<{
  themes: Array<IThemeModel.Schema>
  noOfThemes: number
}> => {
  console.log('getThemes request received')
  let themes: IThemeModel.Model[] = await ThemeController.getAvailableThemes()

  const role = ev.webtoken.role
  switch (role) {
    case EulogiseUserRole.ADMIN:
      // return all the themes (all clients and global)
      break
    case EulogiseUserRole.CLIENT: {
      const userId = ev.webtoken.ref
      const client = await clientModel.findOneByUserId(userId)
      console.log('getAllThemeSummary client id', client.id)
      themes = themes.filter((theme) => {
        return (
          // clientId matching the current user's client model
          theme.clientId === client.id ||
          // global themes
          !theme.clientId
        )
      })
      break
    }
    case EulogiseUserRole.CUSTOMER: {
      const userId = ev.webtoken.ref
      const cases = await caseModel.findByCustomerId(userId)
      if (cases.length === 0) {
        console.log('User does not have any cases', cases)
        throw new Error('User does not have any cases')
      }
      const firstCase = cases[0]
      const { client: clientId } = firstCase
      // if clients customer
      if (clientId) {
        themes = themes.filter((theme) => {
          return (
            // clientId matching the current user's client model
            theme.clientId === clientId ||
            // global themes
            !theme.clientId
          )
        })
      }
      // walk in customers, return only global themes
      else {
        themes = themes.filter((theme) => !theme.clientId)
      }
      break
    }
    case EulogiseUserRole.EDITOR:
    case EulogiseUserRole.COEDITOR: {
      const userId = ev.webtoken.ref
      const { client: clientId } = await caseModel.findByEditorOrCoEditorId(
        userId,
      )
      // if clients customer
      if (clientId) {
        themes = themes.filter((theme) => {
          return (
            // clientId matching the current user's client model
            theme.clientId === clientId ||
            // global themes
            !theme.clientId
          )
        })
      }
      // walk in customers, return only global themes
      else {
        themes = themes.filter((theme) => !theme.clientId)
      }
      break
    }
    default: {
      // only return global themes
      themes = themes.filter((theme) => !theme.clientId)
      break
    }
  }

  /*
  const returnThemes = themes.map((theme) => ({
    ...theme,
    products: Object.keys(theme.products).reduce((acc, productName) => {
      const product = (theme.products as any)?.[productName]
      return {
        ...acc,
        [productName]: {
          thumbnail: product?.thumbnail,
        },
      }
    }, {}),
  }))
*/

  return {
    themes,
    noOfThemes: themes.length,
  }
}

const getThemeById = async (
  ev: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { themeId: string },
): Promise<any> => {
  console.log('getThemeById request received')
  const themeId = pathParams.themeId

  const theme = await themeModel.findById(themeId)
  console.log('getThemeById response', theme)
  return {
    theme,
  }
}

const deleteThemeById = async (
  ev: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { themeId: string },
): Promise<any> => {
  console.log('deleteThemeById request received')
  const themeId = pathParams.themeId

  const theme = await themeModel.updateById(themeId, {
    deleted: true,
  })
  console.log('deleteThemeById response', theme)
  await themeModel.updateRedisIndexRecordById(theme.id!, theme)
  return {
    theme,
  }
}

export default {
  '/themes': {
    GET: getAllThemeSummary,
    POST: RouteMiddleware.authMiddleware(
      [
        EulogiseUserRole.ADMIN,
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.EDITOR,
      ],
      createTheme,
    ),
  },
  '/themes/:themeId': {
    PUT: RouteMiddleware.authMiddleware(
      [
        EulogiseUserRole.ADMIN,
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.EDITOR,
      ],
      updateThemeById,
    ),
    GET: getThemeById,
    DELETE: deleteThemeById,
  },
}
