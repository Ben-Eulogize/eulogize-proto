import { APIGatewayEvent } from 'aws-lambda'
import {
  BackgroundImageTypesMap,
  CardProductPageMode,
  EulogiseProduct,
  EulogiseResource,
  GetImageObject,
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductData,
  IGenericCardProductTypeData,
  ISlideshowData,
  ISlideshowTheme,
  ResourceFileStatus,
} from '@eulogise/core'
import BluebirdPromise from 'bluebird'
import { LambdaHelper } from '../helpers/LambdaHelper'
import {
  BackgroundImageProcessPayload,
  EditedBackgroundImageProcessPayload,
  GeneratorProcessJobTypes,
  ProductThumbnailGeneratorJobPayload,
} from '../types/GeneratorProcessJob.types'
import { GeneratorApiRequestHelper } from '../helpers/GeneratorApiRequestHelper'
import {
  BackgroundImageHelper,
  CardProductHelper,
  ImageHelper,
  PhotobookHelper,
} from '@eulogise/helpers'
import { S3Helper } from '../core/S3Helper'
import { GENERATOR_CONFIG } from '../config'
import { CloudfrontHelper } from '../helpers/CloudfrontHelper'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'

export const test = async () => {
  return successResponse
}

const successResponse = {
  status: 200,
  body: {
    ok: true,
  },
}

export const generateEditedBackgroundImage = async ({
  body: payload,
}: {
  body: EditedBackgroundImageProcessPayload
}) => {
  const { backgroundImageId, product, region } = payload
  try {
    console.log('received a generate edited background request', payload)
    await LambdaHelper.invokeJob(
      GeneratorProcessJobTypes.GENERATE_EDITED_BACKGROUND_IMAGE,
      payload,
      false,
    )
    const newEditedBackgroundImageUrlPath =
      BackgroundImageHelper.getEditedBackgroundUrlPath({
        backgroundImageId,
        product,
        region,
      })

    await BluebirdPromise.map(
      BackgroundImageHelper.getBackgroundImagePropertyKeysByProduct(product),
      (type: string) => {
        const payload = {
          backgroundImageId,
          image: {
            url: `${GENERATOR_CONFIG.AWS_S3_URL_WITHOUT_CDN}/${newEditedBackgroundImageUrlPath}`,
          },
          type,
        } as BackgroundImageProcessPayload
        console.log('invoking background job payload', payload)
        return LambdaHelper.invokeJob(
          GeneratorProcessJobTypes.GENERATE_BACKGROUND_IMAGE,
          payload,
          true,
        )
      },
      { concurrency: 20 },
    )

    // invalidate Cloudfront cache
    await CloudfrontHelper.createInvalidation({
      path: `/${BackgroundImageHelper.getBackgroundImagesPath(
        backgroundImageId,
      )}/*`,
    })

    return successResponse
  } catch (ex) {
    console.log('Error response data', ex?.response?.data)
    throw new Error(
      `Failed to create edited background image: ${backgroundImageId}`,
    )
  }
}

export const generateBackgroundImages = async ({
  body,
}: {
  body: {
    backgroundImageId: string
    image: GetImageObject
  }
}) => {
  console.log('received a generate background request', body)
  const { backgroundImageId, image } = body
  if (!backgroundImageId) {
    throw new Error('backgroundImageId is required')
  }
  if (!image) {
    throw new Error('image is required')
  }

  console.log('invoking background generator to generate all background', body)

  try {
    // upload original image to S3
    const imageUrl = ImageHelper.getImageUrl(image)
    // get file name from imageUrl
    const fileName = imageUrl.split('/').pop()
    const hasFileExtension = fileName.split('.').length > 1
    const fileExtension = hasFileExtension ? fileName.split('.').pop() : 'jpg'
    const newFileName = `original.${fileExtension}`
    // upload original image to s3
    console.log('uploading original image to s3', imageUrl)
    await S3Helper.uploadFromUrlToS3({
      imageUrl,
      fileName: newFileName,
      s3Path: `backgroundImages/${backgroundImageId}/${newFileName}`,
      isCheck: true,
    })
    // upload all background image types to s3
    console.log('uploading all background image types to s3')
    await BluebirdPromise.map(
      Object.keys(BackgroundImageTypesMap),
      (type: string) => {
        const payload = { ...body, type }
        console.log('invoking background job payload', payload)
        return LambdaHelper.invokeJob(
          GeneratorProcessJobTypes.GENERATE_BACKGROUND_IMAGE,
          payload,
          true,
        )
      },
      { concurrency: 20 },
    )
    console.log('invoked background generator')
    return successResponse
  } catch (ex) {
    console.log('Error response data', ex?.response?.data)
    throw new Error(`Failed to create background images: ${backgroundImageId}`)
  }
}

export const generateSlideshow = async ({
  body,
}: {
  body: {
    isVideoBier: boolean
    slideshow: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideshowTitleSlide: ICardProductData
    slideshowTitleSlideTheme: ICardProductTheme
  }
}) => {
  const {
    slideshow,
    slideshowTheme,
    slideshowTitleSlide,
    slideshowTitleSlideTheme,
    isVideoBier,
  } = body
  console.log('received a generate slideshow request', {
    slideshow,
    isVideoBier,
  })
  await LambdaHelper.invokeJob(
    GeneratorProcessJobTypes.GENERATE_SLIDESHOW_MASTER,
    {
      slideshow,
      slideshowTheme,
      slideshowTitleSlide,
      slideshowTitleSlideTheme,
      isVideoBier,
    },
    true,
  )
  console.log('invoked slideshow job')
  return successResponse
}

const generateCardProduct = async ({
  cardProduct,
  productTheme,
  product,
}: {
  cardProduct: ICardProductData
  productTheme: ICardProductTheme
  product: EulogiseProduct
}): Promise<{ status: number; body: { ok: boolean } }> => {
  const startTime = Date.now()
  const resource = CardProductHelper.getResourceByProduct(product)

  try {
    const caseId = cardProduct.case
    const cardProductToGenerate: ICardProductData = {
      ...cardProduct,
      // clear the file statuses before generating
      // @ts-ignore
      fileStatuses: {},
    }
    // clean up S3 generated jpg filepath for embedded card products
    if (
      product === EulogiseProduct.BOOKLET ||
      product === EulogiseProduct.PHOTOBOOK
    ) {
      const generatedProductS3BasePath =
        CardProductHelper.getGeneratedProductS3BasePath({
          product,
          caseId,
        })
      await SlackWebhookHelper.sendToSlack({
        text: `Cleaning up S3 path for generated ${product}: ${caseId}: ${generatedProductS3BasePath}`,
      })
      await S3Helper.cleanUpS3Path({
        prefix: generatedProductS3BasePath,
      })
    }

    if (product === EulogiseProduct.TV_WELCOME_SCREEN) {
      // only need to generate jpg file for TV Welcome Screen
      await LambdaHelper.invokeJob(
        GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT,
        {
          cardProduct: cardProductToGenerate,
          productTheme,
          product,
          bleed: false,
        },
        true,
      )
    } else if (product === EulogiseProduct.PHOTOBOOK) {
      const photobookProps = {
        cardProduct: cardProductToGenerate,
        productTheme,
        product,
        bleed: true,
      }
      const photobookWithBackPages = PhotobookHelper.attachBackPages({
        cardProduct: cardProductToGenerate,
      })
      console.log(
        'photobookWithBackPages',
        JSON.stringify(photobookWithBackPages),
      )
      console.log(
        'photobookWithBackPages.length',
        photobookWithBackPages.length,
      )
      await Promise.all([
        LambdaHelper.invokeJob(
          GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT,
          {
            ...photobookProps,
          },
          true,
        ),
        LambdaHelper.invokeJob(
          GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT,
          {
            ...photobookProps,
            pageMode: CardProductPageMode.SINGLE_PAGE,
          },
          true,
        ),
        LambdaHelper.invokeJob(
          GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT,
          {
            ...photobookProps,
            pageMode: CardProductPageMode.COVER_PAGE,
          },
          true,
        ),
        ...photobookWithBackPages.map((page, pageIndex) => {
          console.log('photobookWithBackPages page', JSON.stringify(page))
          console.log('photobookWithBackPages pageIndex', pageIndex)
          return LambdaHelper.invokeJob(
            GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT_SINGLE_SCREENSHOT,
            {
              // make sure the single page screenshot use the photobook with back pages
              cardProduct: {
                ...cardProductToGenerate,
                content: {
                  ...cardProductToGenerate.content,
                  pages: photobookWithBackPages,
                },
              },
              productTheme,
              product,
              pageIndex,
            },
            false,
          )
        }),
      ])
    } else {
      await Promise.all([
        LambdaHelper.invokeJob(
          GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT,
          {
            cardProduct: cardProductToGenerate,
            productTheme,
            product,
            bleed: false,
          },
          true,
        ),
        LambdaHelper.invokeJob(
          GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT,
          {
            cardProduct: cardProductToGenerate,
            productTheme,
            product,
            bleed: true,
          },
          true,
          // delay 10 seconds so that the pdf does not generate at the same time
          10000,
        ),
        // ONLY FOR BOOKLET
        ...(product === EulogiseProduct.BOOKLET
          ? cardProduct.content.pages.map((_, pageIndex) =>
              LambdaHelper.invokeJob(
                GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT_SINGLE_SCREENSHOT,
                {
                  cardProduct: cardProductToGenerate,
                  productTheme,
                  product,
                  pageIndex,
                },
                false,
              ),
            )
          : []),
      ])
    }

    const duration = Date.now() - startTime
    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-PDF-END (${cardProduct.case}). Completed ${product} generation in ${duration}ms`,
    })

    return successResponse
  } catch (ex) {
    console.log(`🚨`, ex)
    console.log('Error response data', ex?.response?.data)

    // Update the card product file status to failed when an error happens
    await GeneratorApiRequestHelper.saveResource(resource, {
      ...cardProduct,
      fileStatus: ResourceFileStatus.FAILED,
    })

    throw new Error(`Failed to create ${product} pdf: ${cardProduct.id}`)
  }
}

export const generateBooklet = async ({
  body,
}: {
  body: { booklet: ICardProductData; productTheme: ICardProductTheme }
}) => {
  const { booklet, productTheme } = body
  console.log('received a generate booklet request', { booklet, productTheme })
  return await generateCardProduct({
    product: EulogiseProduct.BOOKLET,
    productTheme,
    cardProduct: booklet,
  })
}

export const generateBookmark = async ({
  body,
}: {
  body: { bookmark: ICardProductData; productTheme: ICardProductTheme }
}) => {
  const { bookmark, productTheme } = body
  console.log('received a generate bookmark request', {
    bookmark,
    productTheme,
  })
  return await generateCardProduct({
    product: EulogiseProduct.BOOKMARK,
    productTheme,
    cardProduct: bookmark,
  })
}

export const generateSidedCard = async ({
  body,
}: {
  body: { sidedCard: ICardProductData; productTheme: ICardProductTheme }
}) => {
  const { sidedCard, productTheme } = body
  console.log('received a generate sidedCard request', {
    sidedCard,
    productTheme,
  })
  return await generateCardProduct({
    product: EulogiseProduct.SIDED_CARD,
    productTheme,
    cardProduct: sidedCard,
  })
}

export const generateThankyouCard = async ({
  body,
}: {
  body: { thankyouCard: ICardProductData; productTheme: ICardProductTheme }
}) => {
  const { thankyouCard, productTheme } = body
  console.log('received a generate thankyouCard request', thankyouCard)
  return await generateCardProduct({
    product: EulogiseProduct.THANK_YOU_CARD,
    productTheme,
    cardProduct: thankyouCard,
  })
}

export const generatePhotobook = async ({
  body,
}: {
  body: { photobook: ICardProductData; productTheme: ICardProductTheme }
}) => {
  const { photobook, productTheme } = body
  console.log('received a generate photobook request', photobook)
  return await generateCardProduct({
    product: EulogiseProduct.PHOTOBOOK,
    productTheme,
    cardProduct: photobook,
  })
}

export const generateTvWelcomeScreen = async ({
  body,
}: {
  body: { tvWelcomeScreen: ICardProductData; productTheme: ICardProductTheme }
}) => {
  const { tvWelcomeScreen, productTheme } = body
  console.log('received a generate tvWelcomeScreen request', tvWelcomeScreen)
  return await generateCardProduct({
    product: EulogiseProduct.TV_WELCOME_SCREEN,
    productTheme,
    cardProduct: tvWelcomeScreen,
  })
}

export const generateGenericCardProduct = async ({
  body,
}: {
  body: {
    genericCardProduct: IGenericCardProductData
    productTheme: ICardProductTheme
  }
}) => {
  console.log('received a generate genericCardProduct request', {
    body,
  })
  const { genericCardProduct, productTheme } = body

  const startTime = Date.now()

  try {
    const caseId = genericCardProduct.case
    const cardProductToGenerate: ICardProductData = {
      ...genericCardProduct,
      // clear the file statuses before generating
      // @ts-ignore
      fileStatuses: {},
    }

    await Promise.all([
      LambdaHelper.invokeJob(
        GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT,
        {
          cardProduct: cardProductToGenerate,
          productTheme,
          product: EulogiseProduct.GENERIC_CARD_PRODUCT,
          bleed: false,
        },
        true,
      ),
      LambdaHelper.invokeJob(
        GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT,
        {
          cardProduct: cardProductToGenerate,
          productTheme,
          product: EulogiseProduct.GENERIC_CARD_PRODUCT,
          bleed: true,
        },
        true,
        // delay 10 seconds so that the pdf does not generate at the same time
        10000,
      ),
    ])

    const duration = Date.now() - startTime
    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-PDF-END (${caseId}). Completed ${genericCardProduct?.content?.metadata?.slug} generation in ${duration}ms`,
    })

    return successResponse
  } catch (ex) {
    console.log(`🚨`, ex)
    console.log('Error response data', ex?.response?.data)

    // Update the card product file status to failed when an error happens
    await GeneratorApiRequestHelper.saveResource(
      EulogiseResource.GENERIC_CARD_PRODUCT,
      {
        ...genericCardProduct,
        fileStatus: ResourceFileStatus.FAILED,
      },
    )

    throw new Error(
      `Failed to create ${genericCardProduct?.content?.metadata?.slug} pdf: ${genericCardProduct.id}`,
    )
  }
}

export const generateProductThumbnail = async (
  ev: APIGatewayEvent & {
    body: ProductThumbnailGeneratorJobPayload
  },
) => {
  const {
    body: { themeId, productTheme, cardProduct, product, fileName, s3Path },
  } = ev
  console.log('received a generate thumbnail request', {
    themeId,
    productTheme,
    product,
  })

  await LambdaHelper.invokeJob(
    GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT_THUMBNAIL,
    {
      themeId,
      productTheme,
      cardProduct,
      product,
      fileName,
      s3Path,
    },
    true, // async true
  )
  console.log('invoked Generate Card Product Thumbnail job')
  return {}
}

export const GeneratorRoutes = {
  '/generator/backgroundImages': {
    POST: generateBackgroundImages,
  },
  '/generator/editedBackgroundImage': {
    POST: generateEditedBackgroundImage,
  },
  '/generator/slideshow': {
    POST: generateSlideshow,
    GET: test,
  },
  '/generator/booklet': {
    POST: generateBooklet,
    GET: test,
  },
  '/generator/bookmark': {
    POST: generateBookmark,
    GET: test,
  },
  '/generator/sidedCard': {
    POST: generateSidedCard,
    GET: test,
  },
  '/generator/thankyouCard': {
    POST: generateThankyouCard,
    GET: test,
  },
  '/generator/photobook': {
    POST: generatePhotobook,
    GET: test,
  },
  '/generator/tvWelcomeScreen': {
    POST: generateTvWelcomeScreen,
    GET: test,
  },
  '/generator/genericCardProduct': {
    POST: generateGenericCardProduct,
    GET: test,
  },
  '/generator/productThumbnail': {
    POST: generateProductThumbnail,
  },
}
