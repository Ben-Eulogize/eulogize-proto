import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import {
  BackgroundImageType,
  BackgroundImageTypesMap,
  CardProductPageColMode,
  CardProductPageMode,
  CardProductPageSize,
  CardProductViewDisplayMode,
  EulogiseImageSize,
  EulogiseProduct,
  EulogiseRegion,
  GetImageObject,
  ICardProductData,
  ICardProductFrameRow,
  ICardProductPage,
  ICardProductTheme,
  IGenericCardProductData,
  IGenericCardProductTypeData,
  IImageSizeAndPosition,
  PRODUCT_THUMBNAIL_SIZE,
  SLIDESHOW_THUMBNAIL_SIZE,
} from '@eulogise/core'
import { PuppeteerHelper } from './PuppeteerHelper'
import {
  BookletBackgroundEditor,
  BookletBackgroundEditorProps,
  CardProductPageWithDroppableContext,
  CropBackgroundImage,
  GeneratorCardProductPreview,
  GeneratorFrameItemPreview,
  ICropBackgroundImageProps,
} from '@eulogise/client-components'
import { renderToString } from 'react-dom/server'
import {
  CardProductHelper,
  BackgroundImageHelper,
  CaseHelper,
  CardProductFrameHelper,
} from '@eulogise/helpers'
import { FontHelper } from '@eulogise/helpers'
import { DRAFT_CSS } from './draftcss'
import { ANT_CSS } from './antd.css'
import { CardProductPageThumbnail } from '@eulogise/client-components'
import {
  BackgroundImageProcessPayload,
  CardProductSingleScreenshotGeneratorJobPayload,
  EditedBackgroundImageProcessPayload,
  ProductThumbnailGeneratorJobPayload,
} from '../types/GeneratorProcessJob.types'
import { GeneratorImageHelper } from '../helpers/GeneratorImageHelper'
import { GENERATOR_CONFIG } from '../config'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'
import { S3Helper } from './S3Helper'
import { GeneratorPhotobookCoverPage } from '@eulogise/client-components/dist/GeneratorPhotobookCoverPage'

type ScreenshotType = 'jpg' | 'pdf'

const MAX_SINGLE_SCREENSHOT_RETRIES = 3

export class PuppeteerCardProductHelper extends PuppeteerHelper {
  private static renderEditedBackgroundImage({
    originalImage,
    imageSizeAndPosition,
    product,
    region,
  }: {
    originalImage: GetImageObject
    imageSizeAndPosition: IImageSizeAndPosition
    product: EulogiseProduct
    region: EulogiseRegion
  }) {
    const sheet = new ServerStyleSheet()

    const editor =
      product === EulogiseProduct.BOOKLET ||
      product === EulogiseProduct.SIDED_CARD
        ? BookletBackgroundEditor
        : null
    if (!editor) {
      throw new Error(`No editor found for product (${product} ${region})`)
    }
    const markup = React.createElement(editor, {
      originalImage,
      imageSizeAndPosition,
      region,
      isPreview: true,
    } as BookletBackgroundEditorProps)
    console.log('markup', markup)
    const html = renderToString(sheet.collectStyles(markup))
    const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
    const globalStyleTags = `<style>html, body {margin: 0; padding: 0;} * { box-sizing: border-box; }</style>`
    return {
      html,
      styleTags,
      globalStyleTags,
    }
  }

  private static renderBackgroundImage({
    type,
    image,
    imageSize,
  }: {
    type: BackgroundImageType
    image: GetImageObject
    imageSize: EulogiseImageSize
  }): { html: string; styleTags: string; globalStyleTags: string } {
    const sheet = new ServerStyleSheet()

    const backgroundImageProps = BackgroundImageTypesMap[type]
    const props: ICropBackgroundImageProps = {
      ...backgroundImageProps,
      type: type as string,
      image,
      imageSize,
    }
    console.log('props', props)
    const markup = React.createElement(CropBackgroundImage, props)
    const html = renderToString(sheet.collectStyles(markup))
    const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
    const globalStyleTags = `<style>html, body {margin: 0; padding: 0;} * { box-sizing: border-box; }</style>`
    return {
      html,
      styleTags,
      globalStyleTags,
    }
  }

  private static renderCardProductThumbnail({
    cardProduct,
    productTheme,
    product,
  }: {
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    product: EulogiseProduct
  }): {
    html: string
    styleTags: string
    globalStyleTags: string
  } {
    try {
      const sheet = new ServerStyleSheet()
      console.log(
        'renderCardProductThumbnail cardProduct',
        JSON.stringify(cardProduct),
      )
      console.log(
        'renderCardProductThumbnail productTheme',
        JSON.stringify(productTheme),
      )
      console.log('renderCardProductThumbnail product', product)
      const markup = React.createElement(CardProductPageThumbnail, {
        cardProduct,
        productTheme,
        product,
      })
      const fontTag = FontHelper.createCardProductFontTag()
      const html = renderToString(sheet.collectStyles(markup))
      const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
      const globalStyleTags = `${fontTag}<style>html, body {margin: 0; padding: 0;} * { box-sizing: border-box; }${DRAFT_CSS}${ANT_CSS}</style>`
      return {
        html,
        styleTags,
        globalStyleTags,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  private static renderCardProductPage({
    cardProduct,
    productTheme,
    product,
    pageIndex,
  }: {
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    product: EulogiseProduct
    pageIndex: number
  }) {
    try {
      const sheet = new ServerStyleSheet()
      // @ts-ignore
      const markup = React.createElement(CardProductPageWithDroppableContext, {
        cardProduct,
        productTheme,
        product,
        displayMode: CardProductViewDisplayMode.PRINT,
        pageIndex,
        bleed: false,
        hasSkippedOrFilledMemorialDataPullForm: false,
        colMode: CardProductPageColMode.ONE_COL,
        editorScaledFactor: 1,
        containerRef: 0,
        isNoReordering: true,
      })
      const fontTag = FontHelper.createCardProductFontTag()
      const html = renderToString(sheet.collectStyles(markup))
      const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
      const globalStyleTags = `${fontTag}<style>html, body {margin: 0; padding: 0;} * { box-sizing: border-box; }${DRAFT_CSS}${ANT_CSS}</style>`
      return {
        html,
        styleTags,
        globalStyleTags,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  private static renderPhotobookCoverPage({
    cardProduct,
    pageSize,
  }: {
    cardProduct: ICardProductData
    pageSize: CardProductPageSize
  }): {
    html: string
    styleTags: string
    globalStyleTags: string
  } {
    try {
      const sheet = new ServerStyleSheet()
      const markup = React.createElement(GeneratorPhotobookCoverPage, {
        cardProduct,
        pageSize,
      })
      const fontTag = FontHelper.createCardProductFontTag()
      const html = renderToString(sheet.collectStyles(markup))
      const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
      const globalStyleTags = `${fontTag}<style>html, body {margin: 0; padding: 0;} * { box-sizing: border-box; }${DRAFT_CSS}${ANT_CSS}</style>`
      return {
        html,
        styleTags,
        globalStyleTags,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  private static renderCardProduct({
    cardProduct,
    productTheme,
    product,
    bleed,
    pageMode,
  }: {
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    product: EulogiseProduct
    bleed?: boolean
    pageMode?: CardProductPageMode
  }): {
    html: string
    styleTags: string
    globalStyleTags: string
  } {
    try {
      const sheet = new ServerStyleSheet()
      const markup = React.createElement(GeneratorCardProductPreview, {
        cardProduct,
        productTheme,
        product,
        displayMode: CardProductViewDisplayMode.PRINT,
        bleed,
        pageMode,
      })
      const fontTag = FontHelper.createCardProductFontTag()
      const html = renderToString(sheet.collectStyles(markup))
      const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
      const globalStyleTags = `${fontTag}<style>html, body {margin: 0; padding: 0;} * { box-sizing: border-box; }${DRAFT_CSS}${ANT_CSS}</style>`
      return {
        html,
        styleTags,
        globalStyleTags,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  private static renderFrameItem({
    frameItemRow,
  }: {
    frameItemRow: ICardProductFrameRow
  }): {
    html: string
    styleTags: string
    globalStyleTags: string
  } {
    try {
      const sheet = new ServerStyleSheet()
      const markup = React.createElement(GeneratorFrameItemPreview, {
        row: frameItemRow,
      })
      const fontTag = FontHelper.createCardProductFontTag()
      const html = renderToString(sheet.collectStyles(markup))
      const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
      const globalStyleTags = `${fontTag}<style>html, body {margin: 0; padding: 0;background: transparent;} * { box-sizing: border-box; }${DRAFT_CSS}${ANT_CSS}</style>`
      return {
        html,
        styleTags,
        globalStyleTags,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  public static async generateBackgroundImages({
    backgroundImageId,
    image,
  }: {
    backgroundImageId: string
    image: GetImageObject
  }) {
    for (const type of Object.keys(BackgroundImageTypesMap)) {
      await this.generateBackgroundImage({
        backgroundImageId,
        type,
        image,
      })
    }
  }

  public static async generateEditedBackgroundImage(
    payload: EditedBackgroundImageProcessPayload,
  ): Promise<{ filePath: string; fileName: string; htmlFilePath: string }> {
    const {
      backgroundImageId,
      product,
      region,
      imageSizeAndPosition,
      genericProductMetadata,
    } = payload
    if (!imageSizeAndPosition) {
      throw new Error(
        `imageSizeAndPosition is required: backgroundImageId (${backgroundImageId})`,
      )
    }
    const { height: pageHeight, width: pageWidth } =
      BackgroundImageHelper.getEditedBackgroundWidthAndHeightByProduct({
        product,
        genericProductMetadata,
        region,
      })

    const originalImageUrl = `${
      GENERATOR_CONFIG.AWS_S3_URL
    }/${BackgroundImageHelper.getOriginalBackgroundImagePath(
      backgroundImageId,
    )}`

    const { html, styleTags, globalStyleTags } =
      this.renderEditedBackgroundImage({
        originalImage: {
          url: originalImageUrl,
        },
        region,
        product,
        imageSizeAndPosition,
      })

    const fileName = BackgroundImageHelper.getEditedBackgroundFileName({
      product,
      region,
    })
    const viewport = {
      width: pageWidth,
      height: pageHeight,
    }
    console.log('viewport', viewport)
    const { filePath, htmlFilePath } = await this.generateScreenshot({
      caseId: backgroundImageId,
      type: 'jpg',
      viewport,
      fileName,
      style: `${styleTags}${globalStyleTags}`,
      html,
      deviceScaleFactor: 3,
    })
    console.log(`filePath`, filePath)
    return { filePath, fileName, htmlFilePath }
  }

  public static async generateBackgroundImage({
    backgroundImageId,
    type,
    image,
  }: BackgroundImageProcessPayload): Promise<{
    filePath: string
    fileName: string
    htmlFilePath: string
  }> {
    console.log(`generateBackgroundImage ${type}`)
    const { width, height } = BackgroundImageTypesMap[type]
    const actualImageSize = await GeneratorImageHelper.getImageDimensions(image)

    const { html, styleTags, globalStyleTags } = this.renderBackgroundImage({
      type,
      image,
      imageSize: actualImageSize!,
    })
    const fileName = `${backgroundImageId}_${type}.jpg`
    const { filePath, htmlFilePath } = await this.generateScreenshot({
      caseId: backgroundImageId,
      type: 'jpg',
      viewport: { width, height },
      fileName: fileName,
      style: `${styleTags}${globalStyleTags}`,
      html,
    })
    console.log(`filePath`, filePath)
    return { filePath, fileName, htmlFilePath }
  }

  public static async generateCardProductThumbnail({
    themeId,
    fileName,
    cardProduct,
    productTheme,
    product,
  }: ProductThumbnailGeneratorJobPayload): Promise<{
    filePath: string
    fileName: string
    htmlFilePath: string
  }> {
    const { html, styleTags, globalStyleTags } =
      this.renderCardProductThumbnail({
        cardProduct,
        productTheme,
        product,
      })
    const [width, height] =
      product === EulogiseProduct.SLIDESHOW ||
      product === EulogiseProduct.TV_WELCOME_SCREEN
        ? SLIDESHOW_THUMBNAIL_SIZE
        : PRODUCT_THUMBNAIL_SIZE
    const type = 'jpg'
    const { filePath, htmlFilePath } = await this.generateScreenshot({
      caseId: themeId,
      type,
      viewport: { width, height },
      fileName,
      style: `${styleTags}${globalStyleTags}`,
      html,
    })

    console.log(`generated filePath ${filePath}`)
    return { filePath, fileName, htmlFilePath }
  }

  // Generate individual card product page in jpg for preview
  public static async generateCardProductJpgByPageIndex(
    payload: CardProductSingleScreenshotGeneratorJobPayload & {
      retries?: number
    },
  ): Promise<{
    filePath: string
    fileName: string
    htmlFilePath: string
  }> {
    const {
      cardProduct,
      productTheme,
      product,
      pageIndex,
      retries = 0,
    } = payload
    try {
      console.log(
        `📺 Start job to generate single page card product (pageIndex: ${pageIndex})`,
      )
      await SlackWebhookHelper.sendToSlack({
        text: `GENERATOR-PDF-SINGLE-PAGE-SCREENSHOT (${cardProduct.case}: pageIndex: ${pageIndex}): Start`,
      })
      const type = 'jpg'
      const { html, styleTags, globalStyleTags } = this.renderCardProductPage({
        cardProduct,
        productTheme,
        product,
        pageIndex,
      })
      console.log('rendered html for single page screenshot')

      const scaledViewport = this.getPdfScaledViewport({
        cardProduct,
        product,
        type,
      })

      const fileName = `${product.toString()}-${pageIndex}.${type}`
      const caseId: string = cardProduct.case
      const { filePath, htmlFilePath } = await this.generateScreenshot({
        caseId,
        type,
        viewport: {
          width: scaledViewport.width / 2, // divided by 2 because of 2 pages in booklet
          height: scaledViewport.height,
        },
        fileName,
        style: `${styleTags}${globalStyleTags}`,
        html,
        deviceScaleFactor: 4,
      })

      await SlackWebhookHelper.sendToSlack({
        text: `GENERATOR-PDF-SINGLE-PAGE-SCREENSHOT (${cardProduct.case}: pageIndex: ${pageIndex}): Screenshot taken`,
      })

      return { filePath, fileName, htmlFilePath }
    } catch (ex) {
      const isRetry = retries < MAX_SINGLE_SCREENSHOT_RETRIES
      console.log(`Error in generating single page screenshot: ${ex}`)
      if (isRetry) {
        await SlackWebhookHelper.sendToSlack({
          text: `GENERATOR-PDF-SINGLE-PAGE-SCREENSHOT-ERROR (${cardProduct.case}, pageIndex: ${pageIndex}). Retrying...`,
        })
        return await this.generateCardProductJpgByPageIndex({
          ...payload,
          retries: retries + 1,
        })
      } else {
        await SlackWebhookHelper.sendToSlack({
          text: `GENERATOR-PDF-SINGLE-PAGE-SCREENSHOT (${cardProduct.case}, pageIndex: ${pageIndex}. No more retires.`,
          notifyChannel: true,
        })
      }
      throw new Error(`Error in generating single page screenshot: ${ex}`)
    }
  }

  public static getPdfScaledViewport({
    type,
    cardProduct,
    product,
    bleed = false,
    scale = 1,
    pageMode,
  }: {
    type: ScreenshotType
    cardProduct: ICardProductData
    product: EulogiseProduct
    bleed?: boolean
    scale?: number
    pageMode?: CardProductPageMode
  }): { width: number; height: number } {
    const unit = type === 'pdf' ? 'MM' : 'PX'
    const pageSize = cardProduct.content.pageSize

    const viewport = CardProductHelper.getPdfPageViewport({
      product,
      pageSize,
      bleed,
      type: unit,
      pageMode,
      genericProductMetadata: (cardProduct as IGenericCardProductData)?.content
        ?.metadata,
    })

    const isTvWelcomeScreen = product === EulogiseProduct.TV_WELCOME_SCREEN
    const isSlideshowTitleSlide =
      product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE
    const viewportWidth = parseInt(viewport.width, 10)
    const viewportHeight = parseInt(viewport.height, 10)
    let scaledViewport
    if (isTvWelcomeScreen || isSlideshowTitleSlide || unit === 'MM') {
      scaledViewport = {
        width: viewportWidth,
        height: viewportHeight,
      }
    } else {
      scaledViewport = {
        width: viewportWidth * scale,
        height: viewportHeight * scale,
      }
    }
    console.log('scaledViewport', scaledViewport)
    return scaledViewport
  }

  public static async generateFrameItemImage({
    frameRow,
    type = 'png',
  }: {
    frameRow: ICardProductFrameRow
    type?: 'jpg' | 'png'
  }): Promise<{ filePath: string; fileName: string; htmlFilePath: string }> {
    const { html, styleTags, globalStyleTags } = this.renderFrameItem({
      frameItemRow: frameRow,
    })

    const frameRowContent = frameRow.data.content
    const viewport: { width: number; height: number } = {
      width: frameRowContent.width!,
      height: frameRowContent.height!,
    }
    const frameRowContentId = frameRowContent.id
    const fileName: string = `frameItem_${frameRowContentId}.${type}`
    const deviceScaleFactor = 2
    const { filePath, htmlFilePath } = await this.generateScreenshot({
      caseId: `frame-edge-effect-${frameRowContentId}`,
      type,
      viewport,
      fileName,
      style: `${styleTags}${globalStyleTags}`,
      html,
      deviceScaleFactor,
    })

    console.log(`generated filePath ${filePath}`)
    return { filePath, fileName, htmlFilePath }
  }

  // generate frame images for card product with faded edges
  // update card product with frame image URLs
  public static async generateFrameImagesFromCardProduct({
    cardProduct,
    type = 'png',
  }: {
    cardProduct: ICardProductData
    type?: 'jpg' | 'png'
  }): Promise<ICardProductData> {
    let newCardProduct = { ...cardProduct }
    // Step 1: extract frame, which has fadedEdge enabled, from card product
    const frameRows: Array<ICardProductFrameRow> =
      CardProductHelper.getFadedEdgesFrameRows({
        cardProductContent: cardProduct.content,
      })

    // Step 2: generate png images for each frame
    for (const frameRow of frameRows) {
      const frameImage = await this.generateFrameItemImage({ frameRow, type })

      // Step 3: upload frame images to S3
      const frameFadedEdgesS3Path = CaseHelper.getFrameFadedEdgesS3Path({
        caseId: cardProduct.case,
        fileName: frameImage.fileName,
      })
      await S3Helper.uploadToS3({
        filePath: frameImage.filePath,
        s3Path: frameFadedEdgesS3Path,
        isCheck: true,
      })
      const imageUrl: string = `${GENERATOR_CONFIG.AWS_S3_URL_WITHOUT_CDN}/${frameFadedEdgesS3Path}`

      const updatedRow = CardProductFrameHelper.updateFrameRowByFadedEdgesImage(
        {
          row: frameRow,
          imageUrl,
        },
      )

      newCardProduct = CardProductHelper.updateRowById({
        rowId: frameRow.id,
        cardProduct: newCardProduct,
        updatedRow,
      })
      // results.push({ frameFadedEdgesS3Path, rowId: frameRow.id })
    }

    // Step 4: update card product with fadedEdge frame image URLs
    return newCardProduct
  }

  public static async generatePhotobookCoverPage({
    cardProduct,
  }: {
    cardProduct: ICardProductData
  }): Promise<{ filePath: string; fileName: string; htmlFilePath: string }> {
    console.log('generatePhotobookCoverPage', cardProduct.case)
    const newCardProduct = await this.generateFrameImagesFromCardProduct({
      cardProduct,
    })
    const product = EulogiseProduct.PHOTOBOOK
    const pageMode = CardProductPageMode.COVER_PAGE
    const pageSize = newCardProduct.content.pageSize
    const coverPageSize = CardProductHelper.getCoverPageSize(pageSize)
    const { html, styleTags, globalStyleTags } = this.renderPhotobookCoverPage({
      cardProduct: newCardProduct,
      pageSize: coverPageSize,
    })
    const caseId: string = cardProduct.case
    const type: ScreenshotType = 'pdf'
    const printScale = 2
    const scaledViewport = this.getPdfScaledViewport({
      cardProduct,
      product,
      bleed: true,
      type,
      scale: printScale,
      pageMode,
    })

    const fileName = `${product.toString()}_cover.${type}`
    const { filePath, htmlFilePath } = await this.generateScreenshot({
      caseId,
      type,
      viewport: scaledViewport,
      fileName,
      // set the width and height of the body to ensure we only generate 1 page of pdf for the cover page
      style: `<style>body { transform: scale(${printScale}); transform-origin: top left; width: ${scaledViewport.width}mm; height: ${scaledViewport.height}mm; } * { -webkit-font-smoothing: antialiased !important; }</style> ${styleTags}${globalStyleTags}`,
      html,
    })

    console.log(`generated filePath ${filePath}`)
    return { filePath, fileName, htmlFilePath }
  }

  public static async generateCardProduct({
    cardProduct,
    product,
    productTheme,
    type = 'jpg',
    bleed = false,
    scale = 2,
    deviceScaleFactor, // image - jpg/png only
    pageMode,
  }: {
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    product: EulogiseProduct
    type?: ScreenshotType
    bleed?: boolean
    scale?: number
    deviceScaleFactor?: number
    pageMode?: CardProductPageMode
  }): Promise<{ filePath: string; fileName: string; htmlFilePath: string }> {
    // this is mainly for edge faded images since fade effect does not work in pdf
    // faded image has to be generated in jpg/png format before generating pdf
    const newCardProduct = await this.generateFrameImagesFromCardProduct({
      cardProduct,
    })
    const genericProductMetadata = (cardProduct as IGenericCardProductData)
      ?.content?.metadata
    const { html, styleTags, globalStyleTags } = this.renderCardProduct({
      cardProduct: newCardProduct,
      productTheme,
      product,
      bleed,
      pageMode,
    })
    const caseId: string = cardProduct.case
    const scaledViewport = this.getPdfScaledViewport({
      cardProduct,
      product,
      bleed,
      type,
      scale,
      pageMode,
    })

    const fileName = `${product.toString()}${bleed ? '_bleed' : ''}.${type}`
    const displayMode = CardProductViewDisplayMode.PRINT
    const pages: Array<ICardProductPage> = CardProductHelper.getPagesOrder({
      product,
      foldType: genericProductMetadata?.foldType,
      displayMode,
      pages: cardProduct.content.pages,
    })
    const totalPageCursors = CardProductHelper.getTotalPageCursors({
      product,
      totalPages: pages.length,
      pageMode,
      foldType: genericProductMetadata?.foldType,
      displayMode,
    })
    const { filePath, htmlFilePath } = await this.generateScreenshot({
      caseId,
      type,
      viewport: scaledViewport,
      fileName,
      noOfPages: totalPageCursors,
      style:
        scale > 1
          ? `<style>body { transform: scale(${scale}); transform-origin: top left; } * { -webkit-font-smoothing: antialiased !important; }</style> ${styleTags}${globalStyleTags}`
          : `${styleTags}${globalStyleTags}`,
      html,
      deviceScaleFactor,
    })

    console.log(`generated filePath ${filePath}`)
    return { filePath, fileName, htmlFilePath }
  }
}
