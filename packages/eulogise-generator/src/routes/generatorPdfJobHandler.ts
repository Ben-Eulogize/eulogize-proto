import { Context, APIGatewayEvent } from 'aws-lambda'
import { PdfGeneratorJobPayload } from '../types/GeneratorProcessJob.types'
import { BookletController } from '../booklet'
import { BookmarkController } from '../bookmark'
import { SidedCardController } from '../sidedCard'
import { ThankyouCardController } from '../thankyouCards'
import {
  EulogiseProduct,
  EulogiseResource,
  ResourceFileStatus,
  ResourceFileStatusKey,
  CardProductPageMode,
  IGenericCardProductData,
} from '@eulogise/core'
import { TvWelcomeScreenCardController } from '../tvWelcomeScreen'
import { LambdaHelper } from '../helpers/LambdaHelper'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'
import { PhotobookController } from '../photobooks'
import { GeneratorApiRequestHelper } from '../helpers/GeneratorApiRequestHelper'
import { CardProductHelper } from '@eulogise/helpers'
import { SlideshowTitleSlideController } from '../slideshowTitleSlide'
import { GenericCardProductController } from '../genericCardProduct'

export const generatorPdfJobHandle = async (
  event: APIGatewayEvent & { compressedPayload: string },
  context: Context,
) => {
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as PdfGeneratorJobPayload
  console.log('new generator pdf job received')
  const { product, cardProduct, productTheme, bleed, pageMode } = payload
  await SlackWebhookHelper.sendToSlack({
    text: `GENERATOR-PDF-START (${cardProduct.case}). ${product} ${
      bleed ? 'BLEED' : ''
    } pageMode: ${pageMode}`,
  })
  const resource = CardProductHelper.getResourceByProduct(product)
  console.log('payload', {
    product,
    cardProduct,
    productTheme,
    bleed,
    pageMode,
  })
  const slug = (cardProduct as IGenericCardProductData)?.content?.metadata?.slug
  try {
    switch (product) {
      case EulogiseProduct.BOOKLET:
        await BookletController.generateBooklet(
          cardProduct,
          productTheme,
          bleed,
        )
        break
      case EulogiseProduct.BOOKMARK:
        await BookmarkController.generateBookmark(
          cardProduct,
          productTheme,
          bleed,
        )
        break
      case EulogiseProduct.SIDED_CARD:
        await SidedCardController.generateSidedCard(
          cardProduct,
          productTheme,
          bleed,
        )
        break
      case EulogiseProduct.THANK_YOU_CARD:
        await ThankyouCardController.generateThankyouCard(
          cardProduct,
          productTheme,
          bleed,
        )
        break
      case EulogiseProduct.PHOTOBOOK:
        await PhotobookController.generatePhotobook(
          cardProduct,
          productTheme,
          bleed,
          pageMode,
        )
        break
      case EulogiseProduct.TV_WELCOME_SCREEN:
        await TvWelcomeScreenCardController.generateTvWelcomeScreenCard(
          cardProduct,
          productTheme,
        )
        break
      case EulogiseProduct.SLIDESHOW_TITLE_SLIDE:
        await SlideshowTitleSlideController.generateSlideshowTitleSlide(
          cardProduct,
          productTheme,
        )
        break
      case EulogiseProduct.GENERIC_CARD_PRODUCT:
        await GenericCardProductController.generateGenericCardProduct(
          cardProduct,
          productTheme,
          bleed,
        )
        break
      default: {
        await SlackWebhookHelper.sendToSlack({
          text: `GENERATOR-PDF-ERROR (${
            cardProduct.case
          }). No such product. ${product} ${slug ? `slug(${slug})` : ''} ${
            bleed ? 'BLEED' : ''
          }`,
          notifyChannel: true,
        })
        throw new Error(`No such Product Type: ${product}`)
      }
    }
    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-PDF-END (${
        cardProduct.case
      }). Completed Generating PDF. ${product} ${slug ? `slug(${slug})` : ''} ${
        bleed ? 'BLEED' : ''
      }`,
    })

    let fileStatusKey: ResourceFileStatusKey
    switch (product) {
      case EulogiseProduct.BOOKLET:
      case EulogiseProduct.BOOKMARK:
      case EulogiseProduct.SIDED_CARD:
      case EulogiseProduct.THANK_YOU_CARD:
      case EulogiseProduct.TV_WELCOME_SCREEN:
      case EulogiseProduct.SLIDESHOW_TITLE_SLIDE:
      case EulogiseProduct.GENERIC_CARD_PRODUCT:
        if (bleed) {
          fileStatusKey = ResourceFileStatusKey.BLEED
        } else {
          fileStatusKey = ResourceFileStatusKey.NON_BLEED
        }
        break
      case EulogiseProduct.PHOTOBOOK: {
        if (pageMode === CardProductPageMode.SINGLE_PAGE) {
          fileStatusKey = ResourceFileStatusKey.SINGLE_PAGE_BLEED
        } else {
          fileStatusKey = ResourceFileStatusKey.BLEED
        }
        break
      }
      default: {
        throw new Error(
          `No such Product Type: ${product} ${slug ? `slug(${slug})` : ''}`,
        )
      }
    }
    await GeneratorApiRequestHelper.updateFileStatuses({
      caseId: cardProduct.case,
      product,
      productId: cardProduct.id,
      fileStatusKey,
      fileStatus: ResourceFileStatus.GENERATED,
      slug,
    })
    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-PDF-END (${
        cardProduct.case
      }). Completed Generating PDF and sent email. ${product} ${
        slug ? `slug(${slug})` : ''
      }`,
    })
  } catch (error) {
    console.log('GENERATOR-PDF-ERROR', error)
    // Update the card product file status to failed when an error happens
    await GeneratorApiRequestHelper.saveResource(resource, {
      ...cardProduct,
      fileStatus: ResourceFileStatus.FAILED,
    })

    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-PDF-ERROR (${
        cardProduct.case
      }). Error Generating Pdf. ${product} ${slug ? `slug(${slug})` : ''} ${
        bleed ? 'BLEED' : ''
      }. ${error.message}`,
      notifyChannel: true,
    })
  }
}
