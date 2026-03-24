import {
  CARD_PRODUCT_FRAME_LAYOUTS,
  CARD_PRODUCT_PHOTOBOOK_FRAME_LAYOUTS,
  CardProductContentItemType,
  CardProductPageSize,
  COVER_PAGE_LAYOUTS,
  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
  DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT,
  EulogiseImageSize,
  EulogiseProduct,
  ICardProductFrameAvailability,
  ICardProductFrameContentItem,
  ICardProductFrameImageContent,
  ICardProductFrameItem,
  ICardProductFrameLayout,
  ICardProductFrameRow,
  ICardProductFrameRowData,
  ICardProductRow,
  IImageAssetContent,
  IPhotobookFrameSize,
  IPhotobookPageLayout,
  PHOTO_FRAME_RATIO,
} from '@eulogise/core'
import { UtilHelper } from './UtilHelper'
import { ImageHelper } from './ImageHelper'
import { STYLE } from '@eulogise/client-core'
import { PhotobookHelper } from './PhotobookHelper'
import { CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD } from './cardProduct.constants'

const ID_LENGTH = 8

export class CardProductFrameHelper {
  public static centeringFrameItemImages({
    frameItem,
    containerSize,
  }: {
    frameItem: ICardProductFrameItem
    containerSize: {
      width: number
      height: number
    }
  }): ICardProductFrameItem {
    if (frameItem.type === 'columns' || frameItem.type === 'rows') {
      return {
        ...frameItem,
        items: frameItem.items.map((item: ICardProductFrameItem) => {
          const flexPercent = this.getFrameFlexPercent({
            frameItem,
            itemFlex: item.flex as number,
          })
          return this.centeringFrameItemImages({
            frameItem: item,
            containerSize: {
              width:
                frameItem.type === 'rows'
                  ? containerSize.width
                  : containerSize.width * flexPercent,
              height:
                frameItem.type === 'rows'
                  ? containerSize.height * flexPercent
                  : containerSize.height,
            },
          })
        }),
      }
    }
    // for 'content' type
    return this.centeringFrameItemImage({
      frameItem: frameItem as ICardProductFrameContentItem,
      imageAssetContent: (frameItem as ICardProductFrameContentItem)
        .content as ICardProductFrameImageContent,
      containerSize,
    })
  }

  public static centeringFrameRowImages({
    frameRow,
  }: {
    frameRow: ICardProductFrameRow
  }): ICardProductFrameRow {
    return {
      ...frameRow,
      data: {
        ...frameRow.data,
        content: this.centeringFrameItemImages({
          frameItem: frameRow.data.content as ICardProductFrameItem,
          containerSize: {
            width: frameRow.data.content.width!,
            height: frameRow.data.content.height!,
          },
        }),
      },
    }
  }

  public static centeringRowsImages({
    rows,
  }: {
    rows: Array<ICardProductRow>
  }): Array<ICardProductRow> {
    return rows.map((row: ICardProductRow) => {
      if (row.type === CardProductContentItemType.FRAME) {
        return this.centeringFrameRowImages({
          frameRow: row,
        })
      }
      return row
    })
  }

  public static getFrameItemTotalFlex(frameItem: ICardProductFrameItem) {
    if (frameItem.type === 'content') {
      return 1
    }
    return frameItem.items.reduce(
      (acc, i) => acc + ((i.flex as number) ?? 1),
      0,
    )
  }

  public static getFrameFlexPercent({
    frameItem,
    itemFlex = 1,
  }: {
    frameItem: ICardProductFrameItem
    itemFlex: number
  }): number {
    const totalFlex = this.getFrameItemTotalFlex(frameItem)
    return itemFlex / totalFlex
  }

  public static adjustToDefaultImagePosition({
    imageAssetContent,
    containerSize,
  }: {
    imageAssetContent?: IImageAssetContent
    containerSize: {
      width: number
      height: number
    }
  }): Partial<ICardProductFrameImageContent> {
    if (!imageAssetContent) {
      console.log(
        'adjustToDefaultImagePosition called with undefined imageAssetContent',
      )
      return {}
    }
    const {
      width: imageWidth,
      height: imageHeight,
      faceDetection,
    } = imageAssetContent
    const { width: containerWidth, height: containerHeight } = containerSize

    if (!imageWidth || !imageHeight) {
      return {
        ...imageAssetContent,
        renderImageWidth:
          containerWidth + CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD,
        renderImageHeight:
          containerHeight + CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD,
        transformX:
          -(containerWidth + CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD) / 2,
        transformY:
          -(containerHeight + CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD) / 2,
      }
    }

    // Calculate scale to fit image in container while preserving aspect ratio
    // Using Math.max to ensure image covers the container
    const scale = Math.max(
      containerWidth / imageWidth,
      containerHeight / imageHeight,
    )

    // Add threshold to render dimensions to ensure proper coverage
    const renderImageWidth =
      imageWidth * scale + CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
    const renderImageHeight =
      imageHeight * scale + CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD

    // Default: center the image geometrically in the container
    // With CSS `left: 50%; top: 50%`, translate(-width/2, -height/2) centers the image
    let transformX = -renderImageWidth / 2
    let transformY = -renderImageHeight / 2

    // If there are faces, try to center them as much as possible
    if (faceDetection?.faces && faceDetection.faces.length > 0) {
      // Calculate face bounding box in original image coordinates
      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity

      const faceDetectionWidth = faceDetection?.imageWidth
      const faceDetectionSizeToRenderImageSizeScale =
        renderImageWidth / faceDetectionWidth
      faceDetection.faces.forEach((face) => {
        minX = Math.min(
          minX,
          face.topLeftX * faceDetectionSizeToRenderImageSizeScale,
        )
        minY = Math.min(
          minY,
          face.topLeftY * faceDetectionSizeToRenderImageSizeScale,
        )
        maxX = Math.max(
          maxX,
          (face.topLeftX + face.width) *
            faceDetectionSizeToRenderImageSizeScale,
        )
        maxY = Math.max(
          maxY,
          (face.topLeftY + face.height) *
            faceDetectionSizeToRenderImageSizeScale,
        )
      })

      // Convert face bounds to rendered image coordinates
      const faceCenterX = (minX + maxX) / 2
      const faceCenterY = (minY + maxY) / 2

      // Calculate the ideal transform to center the faces in the container
      // The face center should align with the container center
      const idealTransformX = transformX - (faceCenterX - renderImageWidth / 2)
      const idealTransformY = transformY - (faceCenterY - renderImageHeight / 2)

      // Boundary constraints (image must cover container)
      // minTransform = leftmost/topmost position (image edge at container edge)
      // maxTransform = rightmost/bottommost position (image edge at container edge)
      const minTransformX =
        -renderImageWidth +
        containerWidth / 2 +
        CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD / 2
      const maxTransformX =
        -containerWidth / 2 - CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD / 2
      const minTransformY =
        -renderImageHeight +
        containerHeight / 2 +
        CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD / 2
      const maxTransformY =
        -containerHeight / 2 - CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD / 2

      // Clamp BOTH axes to center on faces while ensuring image covers container
      transformX = Math.max(
        minTransformX,
        Math.min(maxTransformX, idealTransformX),
      )
      transformY = Math.max(
        minTransformY,
        Math.min(maxTransformY, idealTransformY),
      )
    }

    return {
      ...imageAssetContent,
      renderImageWidth,
      renderImageHeight,
      transformX,
      transformY,
    }
  }

  public static attachImageToFrameRow({
    frameRow,
    imageAssetContent,
  }: {
    frameRow: ICardProductFrameRow
    imageAssetContent: IImageAssetContent
  }): ICardProductFrameRow {
    return {
      ...frameRow,
      data: {
        ...frameRow.data,
        content: this.centeringFrameItemImage({
          frameItem: frameRow.data.content as ICardProductFrameItem,
          imageAssetContent,
          containerSize: {
            width: frameRow.data.width!,
            height: frameRow.data.height!,
          },
        }),
      },
    }
  }

  public static getFrameLayoutImageFilestackHandles(
    frameLayout: ICardProductFrameLayout,
  ) {
    const filestackHandles: Array<string> = []
    if (frameLayout.type === 'columns' || frameLayout.type === 'rows') {
      frameLayout.items.forEach((item: ICardProductFrameItem) => {
        if (item.type === 'content' && item.content?.type === 'image') {
          const content = item.content as ICardProductFrameImageContent
          if (content.filestackHandle) {
            filestackHandles.push(content.filestackHandle)
          }
        } else if (
          item.type === 'columns' ||
          item.type === 'rows' ||
          item.type === 'content'
        ) {
          filestackHandles.push(
            ...this.getFrameLayoutImageFilestackHandles(
              item as ICardProductFrameLayout,
            ),
          )
        }
      })
    }
    return filestackHandles
  }

  public static getFrameSizeByRatio(ratio: number): IPhotobookFrameSize {
    if (ratio <= PHOTO_FRAME_RATIO.SMALL) {
      return IPhotobookFrameSize.SM
    } else if (ratio <= PHOTO_FRAME_RATIO.MEDIUM) {
      return IPhotobookFrameSize.MD
    }
    return IPhotobookFrameSize.LG
  }

  public static getFrameSizeByWidthAndHeight({
    width,
    height,
  }: EulogiseImageSize): IPhotobookFrameSize | undefined {
    const isPortrait = width < height
    const isLandscape = width > height
    const isSquare = width === height

    if (isLandscape) {
      const ratio = height / width
      return this.getFrameSizeByRatio(ratio)
    } else if (isPortrait) {
      const ratio = width / height
      return this.getFrameSizeByRatio(ratio)
    } else if (isSquare) {
      return undefined
    }
    throw new Error('Invalid frame size')
  }

  private static clearFrameContentImages(
    frameLayout: ICardProductFrameLayout,
  ): ICardProductFrameLayout {
    if (frameLayout.type === 'columns' || frameLayout.type === 'rows') {
      return {
        ...frameLayout,
        items: frameLayout.items.map((item) =>
          this.clearFrameContentImages(item),
        ),
      }
    } else if (frameLayout.type === 'content') {
      return {
        ...frameLayout,
        content: this.createDummyFrameImageContent(),
      }
    }
    throw new Error('Invalid frame layout type')
  }

  public static clearFrameRowData(
    frameRowData: ICardProductFrameRowData,
  ): ICardProductFrameRowData {
    return {
      ...frameRowData,
      content: this.clearFrameContentImages(frameRowData.content),
    }
  }

  public static calculateNewContentSizeOnAddingFrame({
    product,
    oldLayout,
    newLayout,
    pageContentWidth,
    noOfPageCols = 1,
    hasCaption = false,
    pageSize,
  }: {
    product: EulogiseProduct
    oldLayout?: ICardProductFrameLayout
    newLayout: ICardProductFrameLayout
    pageContentWidth: number
    hasCaption?: boolean
    noOfPageCols?: number
    pageSize: CardProductPageSize
  }): {
    newContentWidth: number
    newContentHeight: number
  } {
    let newContentWidth = oldLayout?.width!
    let newContentHeight = oldLayout?.height!
    const captionFieldHeight = hasCaption
      ? DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT
      : 0
    if (
      product === EulogiseProduct.PHOTOBOOK &&
      !newLayout.isAddAsRatio &&
      !newLayout.lockAspectRatio
    ) {
      const { width, height } = PhotobookHelper.getPhotobookContentSize({
        pageSize,
      })
      return {
        newContentHeight: height - captionFieldHeight,
        newContentWidth: width - captionFieldHeight,
      }
    }

    const maxContentWidth =
      noOfPageCols > 1
        ? // ? pageContentWidth / noOfPageCols - 16 // 16px is the margin between columns
          pageContentWidth - 16 // 16px is the margin between columns
        : pageContentWidth

    if (newLayout.isAddAsRatio) {
      const newLayoutSizeRatio = newLayout.width! / newLayout.height!
      const maxHeight = oldLayout?.height ?? newLayout.height
      newContentHeight = maxHeight!
      newContentWidth = newLayoutSizeRatio * newContentHeight
      if (newContentWidth > maxContentWidth) {
        const maxWidth = maxContentWidth
        const newLayoutRatioBaseHeight = newLayout.height! / newLayout.width!
        newContentWidth = maxWidth
        newContentHeight = newLayoutRatioBaseHeight * newContentWidth
      }
    } else {
      if (newLayout.lockAspectRatio) {
        // need to compare newContentHeight against available content width
        if (newContentHeight >= maxContentWidth) {
          newContentHeight = newContentWidth
        } else {
          newContentWidth = newContentHeight
        }
      }
    }
    return {
      newContentHeight:
        newContentHeight -
        // originally added CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD for https://trello.com/c/zXSRXNzW/1433-image-jumps-in-frame-after-repositioning
        // but it caused frame progressively increasing in size in https://trello.com/c/b5kbqJGb/1577-image-frames-get-progessively-larger-when-you-change-the-layout-eventually-casuing-items-to-go-off-the-page
        /*+ CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD * 2*/ captionFieldHeight,
      newContentWidth:
        newContentWidth /*+ CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD * 2*/,
    }
  }

  public static calculateDefaultFrameImageSizeAndPosition({
    imageWidth,
    imageHeight,
    containerSize,
    isBorderShowed = false,
  }: {
    imageWidth: number
    imageHeight: number
    containerSize: {
      width: number
      height: number
    }
    isBorderShowed?: boolean
  }): {
    renderWidth: number
    renderHeight: number
    transformX: number
    transformY: number
  } {
    const imageRatio = imageWidth / imageHeight
    const clientWidth = containerSize.width
    const clientHeight = containerSize.height
    const frameWidth =
      clientWidth +
      (isBorderShowed ? (STYLE.CARD_PRODUCT_BORDER_SIZE as number) * 2 : 0)
    const frameHeight =
      clientHeight +
      (isBorderShowed ? (STYLE.CARD_PRODUCT_BORDER_SIZE as number) * 2 : 0)
    const frameRatio = frameWidth / frameHeight
    let renderWidth: number = frameWidth
    let renderHeight: number = frameHeight

    if (imageRatio > frameRatio) {
      const renderRatio = frameHeight / imageHeight
      renderWidth = imageWidth * renderRatio
      renderHeight = imageHeight * renderRatio
    } else if (imageRatio <= frameRatio) {
      const renderRatio = frameWidth / imageWidth
      renderWidth = imageWidth * renderRatio
      renderHeight = imageHeight * renderRatio
    }
    const transformX = -renderWidth / 2
    const transformY = -renderHeight / 2

    return {
      renderWidth: renderWidth + CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD,
      renderHeight: renderHeight + CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD,
      transformX: transformX - CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD,
      transformY: transformY - CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD,
    }
  }

  public static async calculateDefaultFrameImageSizeAndPositionPromise({
    imageUrl,
    imageWidth,
    imageHeight,
    containerSize,
    isBorderShowed = false,
  }: {
    imageUrl?: string
    imageWidth?: number
    imageHeight?: number
    containerSize: {
      width: number
      height: number
    }
    isBorderShowed?: boolean
  }): Promise<{
    renderWidth: number
    renderHeight: number
    transformX: number
    transformY: number
  }> {
    let foundImageWidth = imageWidth
    let foundImageHeight = imageHeight
    if (foundImageWidth === undefined || foundImageHeight === undefined) {
      if (!imageUrl) {
        throw new Error(
          'Image URL is required if image width or height is not provided',
        )
      }
      const imageSize = await ImageHelper.getImageSizeByUrl(imageUrl)
      foundImageWidth = imageSize.width
      foundImageHeight = imageSize.height
    }
    return this.calculateDefaultFrameImageSizeAndPosition({
      imageWidth: foundImageWidth,
      imageHeight: foundImageHeight,
      containerSize,
      isBorderShowed,
    })
  }

  public static isFirstContentIdByRow(
    row: ICardProductRow,
    frameItemId?: string,
  ): boolean {
    if (!frameItemId) {
      return false
    }
    if (row.type === CardProductContentItemType.FRAME) {
      const frameRow = row as ICardProductFrameRow
      const frameItem = frameRow.data.content
      return this.getFirstContentId(frameItem) === frameItemId
    }
    return false
  }

  public static getFirstContentId(
    frameItem: ICardProductFrameItem,
  ): string | undefined {
    if (frameItem.type === 'rows' || frameItem.type === 'columns') {
      for (const item of frameItem.items) {
        const foundContentId = this.getFirstContentId(item)
        if (foundContentId) {
          return foundContentId
        }
      }
    } else if (frameItem.type === 'content') {
      return frameItem.id
    }
    return
  }

  public static getFirstContentFileHandle(
    frameItem: ICardProductFrameItem,
  ): string | undefined {
    if (frameItem.type === 'rows' || frameItem.type === 'columns') {
      for (const item of frameItem.items) {
        const foundFileHandle = this.getFirstContentFileHandle(item)
        if (foundFileHandle) {
          return foundFileHandle
        }
      }
    } else if (frameItem.type === 'content') {
      return (
        (frameItem as ICardProductFrameContentItem)
          .content as ICardProductFrameImageContent
      )?.filestackHandle
    }
    return
  }

  public static getFirstImageContent(
    frameItem: ICardProductFrameItem,
  ): ICardProductFrameContentItem | undefined {
    if (frameItem.type === 'rows' || frameItem.type === 'columns') {
      for (const item of frameItem.items) {
        const foundImageContentItem = this.getFirstImageContent(item)
        if (foundImageContentItem) {
          return foundImageContentItem
        }
      }
    } else if (
      // frameItem.type === 'content' &&
      // frameItem.content?.type === 'image'
      frameItem.type === 'content'
    ) {
      return frameItem as ICardProductFrameContentItem
    }
    return
  }

  public static getFrameContentById(
    frameItem: ICardProductFrameItem,
    contentItemId: string,
  ): ICardProductFrameContentItem | undefined {
    if (frameItem.type === 'rows' || frameItem.type === 'columns') {
      for (const item of frameItem.items) {
        const foundContent = this.getFrameContentById(item, contentItemId)
        if (foundContent) {
          return foundContent
        }
      }
    } else if (frameItem.type === 'content') {
      if (frameItem.id === contentItemId) {
        return frameItem
      }
    }
    return
  }

  public static getFilestackHandleByContentId(
    frameLayout: ICardProductFrameLayout,
    contentItemId: string,
  ): string | undefined {
    const contentItem = this.getFrameContentById(frameLayout, contentItemId)
    return (contentItem?.content as ICardProductFrameImageContent)
      ?.filestackHandle
  }

  public static replaceFilestackHandleInFrameItem(
    frameItem: ICardProductFrameItem,
    oldFilestackHandle: string,
    newImageContent: IImageAssetContent,
  ): ICardProductFrameItem {
    if (frameItem.type === 'rows' || frameItem.type === 'columns') {
      return {
        ...frameItem,
        items: frameItem.items.map((item) =>
          this.replaceFilestackHandleInFrameItem(
            item,
            oldFilestackHandle,
            newImageContent,
          ),
        ),
      } as ICardProductFrameItem
    } else if (frameItem.type === 'content') {
      const imageContent = frameItem.content as ICardProductFrameImageContent
      if (imageContent?.filestackHandle === oldFilestackHandle) {
        return {
          ...frameItem,
          content: {
            ...imageContent,
            ...newImageContent,
          },
        } as ICardProductFrameItem
      }
    }
    return frameItem
  }

  // TODO:FRAME we need this function when we convert all theme images to frame
  public static createFrameTemplateData({
    width,
    height,
    filePath,
  }: {
    width: number
    height: number
    filePath: string
  }) {
    return {
      width,
      height,
      content: {
        type: 'rows',
        items: [
          {
            borderRadius: '200px',
            width: '100%',
            height: '100%',
            id: 'lsx8vp0i',
            type: 'content',
            content: {
              type: 'image',
              filepath: filePath,
            },
          },
        ],
        id: 'w58ut2pd',
      },
    }
  }

  public static applyLayoutAssetsToNewLayout(
    oldLayout: ICardProductFrameLayout,
    newLayout: ICardProductFrameLayout,
  ) {
    const imageAssets = this.getFrameLayoutImageAssets(oldLayout)
    return this.assignImageAssetsToLayout(newLayout, imageAssets)
  }

  public static createDummyFrameImageContent() {
    return {
      filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
      type: 'image',
    } as unknown as ICardProductFrameImageContent
  }

  public static assignImageAssetsToLayout(
    layout: ICardProductFrameLayout | ICardProductFrameItem,
    imageAssets: Array<ICardProductFrameImageContent>,
  ): ICardProductFrameLayout | ICardProductFrameItem {
    let newLayout: ICardProductFrameLayout | ICardProductFrameItem = layout
    if (layout.type === 'columns' || layout.type === 'rows') {
      const items: Array<ICardProductFrameItem> = layout.items.map(
        (item: ICardProductFrameItem) => {
          // @ts-ignore
          if (
            item.type === 'content' &&
            (item.content?.type === undefined ||
              // @ts-ignore
              item.content?.filestackHandle ===
                DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE)
          ) {
            const imageAsset = imageAssets.shift()
            return {
              ...item,
              content: imageAsset
                ? UtilHelper.clone(imageAsset)
                : this.createDummyFrameImageContent(),

              id: item.id ?? UtilHelper.generateID(ID_LENGTH),
            }
          }
          return this.assignImageAssetsToLayout(
            item,
            imageAssets,
          ) as ICardProductFrameItem
        },
      )
      return {
        ...newLayout,
        items,
      } as ICardProductFrameLayout
    }
    return newLayout
  }

  public static getFrameLayoutImageAssets(
    layout: ICardProductFrameLayout,
  ): Array<ICardProductFrameImageContent> {
    const imageAssets: Array<ICardProductFrameImageContent> = []
    if (layout.type === 'columns' || layout.type === 'rows') {
      layout.items.forEach((l: ICardProductFrameItem) => {
        if (l.type === 'content' && l.content?.type === 'image') {
          const frameContent: ICardProductFrameImageContent =
            l.content as ICardProductFrameImageContent
          imageAssets.push({
            filename: frameContent.filename,
            type: 'image',
            width: frameContent.width,
            height: frameContent.height,
            isRemovedBackgroundImage: frameContent.isRemovedBackgroundImage,
            filepath: frameContent.filepath,
            filestackHandle: frameContent.filestackHandle,
            faceDetection: frameContent.faceDetection,
          } as ICardProductFrameImageContent)
        } else if (l.type === 'columns' || l.type === 'rows') {
          imageAssets.push(...this.getFrameLayoutImageAssets(l))
        }
      })
    }
    return imageAssets
  }

  public static getCardFrameLayouts(noOfPhotos: number | null) {
    const cardFrameLayouts = CARD_PRODUCT_FRAME_LAYOUTS.filter(
      (f) =>
        f.frameAvailability === ICardProductFrameAvailability.ALL ||
        f.frameAvailability === ICardProductFrameAvailability.CARD,
    )
    if (!noOfPhotos) {
      return cardFrameLayouts
    }
    return cardFrameLayouts.filter((l) => {
      const photos = this.getNoOfPhotosInFrameLayout(l)
      return photos === noOfPhotos
    })
  }

  public static getFrameLayouts(
    noOfPhotos: null | number,
    product?: EulogiseProduct,
  ): Array<ICardProductFrameLayout> {
    if (product === EulogiseProduct.PHOTOBOOK) {
      return this.getPhotobookFrameLayouts(noOfPhotos)
    }
    return this.getCardFrameLayouts(noOfPhotos)
  }

  public static getPhotobookFrameLayouts(noOfPhotos: number | null) {
    const photobookFrameLayouts = CARD_PRODUCT_PHOTOBOOK_FRAME_LAYOUTS.filter(
      (f) =>
        f.frameAvailability === ICardProductFrameAvailability.ALL ||
        f.frameAvailability === ICardProductFrameAvailability.PHOTOBOOK,
    )
    if (!noOfPhotos) {
      return photobookFrameLayouts
    }
    return photobookFrameLayouts.filter((l) => {
      const photos = this.getNoOfPhotosInFrameLayout(l)
      return photos === noOfPhotos
    })
  }

  public static getRandomPhotobookFrameLayoutByNoOfPhotos(
    noOfPhotos: number,
  ): ICardProductFrameLayout {
    const layouts = this.getPhotobookFrameLayouts(noOfPhotos)
    const randomIndex = Math.floor(Math.random() * layouts.length)
    return layouts[randomIndex]
  }

  public static getCoverPageLayoutById(layoutId: string): IPhotobookPageLayout {
    const layout = COVER_PAGE_LAYOUTS.find(
      (layout) => layout.layoutId === layoutId,
    )
    if (!layout) {
      throw new Error(`Cover page layout with id ${layoutId} not found`)
    }
    return layout
  }

  public static getNoOfPhotosInFrameLayout(
    layout: ICardProductFrameLayout,
  ): number {
    let counter = 0
    if (layout.type === 'columns' || layout.type === 'rows') {
      let count: number = 0
      layout.items.forEach((l) => {
        if (l.type === 'content') {
          count++
        } else {
          count = count + this.getNoOfPhotosInFrameLayout(l)
        }
      })
      return count
    }
    return counter
  }

  public static getUpdatedLayoutFromNewContentItem(
    layout: ICardProductFrameLayout,
    newContentItem: ICardProductFrameContentItem,
  ): ICardProductFrameLayout {
    if (layout.type === 'content') {
      return layout
    }
    return {
      ...layout,
      items: layout.items.map((ci: ICardProductFrameItem) => {
        if (ci.type === 'rows' || ci.type === 'columns') {
          return this.getUpdatedLayoutFromNewContentItem(ci, newContentItem)
        }
        if (ci.type === 'content' && ci.id === newContentItem.id) {
          return newContentItem
        }
        return ci
      }),
    } as ICardProductFrameLayout
  }

  public static generateIdForLayout(
    layout: ICardProductFrameLayout | ICardProductFrameItem,
  ): ICardProductFrameLayout {
    const newLayout = layout as any
    if (newLayout.items) {
      return {
        ...newLayout,
        items: newLayout.items.map((item: ICardProductFrameItem) =>
          this.generateIdForLayout(item),
        ),
        id: UtilHelper.generateID(ID_LENGTH),
      }
    }
    return {
      ...newLayout,
      id: UtilHelper.generateID(ID_LENGTH),
    }
  }

  public static getFirstContentItem(
    content: ICardProductFrameItem,
  ): ICardProductFrameContentItem | null {
    if (content.type === 'content') {
      return content
    }
    if (content.items.length === 0) {
      return null
    }

    return this.getFirstContentItem(content.items[0])
  }

  // if frameContentItemId is not provided, it will center all images in the frame item
  // if frameContentItemId is provided, it will center only the image with that id
  public static centeringFrameItemImage({
    frameItem,
    imageAssetContent,
    containerSize,
    frameContentItemId,
  }: {
    frameItem: ICardProductFrameItem
    imageAssetContent: Partial<ICardProductFrameImageContent>
    containerSize: {
      width: number
      height: number
    }
    frameContentItemId?: string
  }): ICardProductFrameItem {
    if (frameItem.type === 'content') {
      if (frameContentItemId === frameItem.id || !frameContentItemId) {
        const centeredFacesImage = this.adjustToDefaultImagePosition({
          imageAssetContent: imageAssetContent as IImageAssetContent,
          containerSize,
        })
        return {
          ...frameItem,
          content: {
            ...frameItem.content,
            ...imageAssetContent,
            ...centeredFacesImage,
          } as ICardProductFrameImageContent,
        }
      }
      return frameItem
    }

    return {
      ...frameItem,
      items: frameItem.items.map((item) => {
        const flexPercent = this.getFrameFlexPercent({
          frameItem,
          itemFlex: item.flex as number,
        })
        const newContainerSize = {
          width:
            frameItem.type === 'rows'
              ? containerSize.width
              : containerSize.width * flexPercent,
          height:
            frameItem.type === 'rows'
              ? containerSize.height * flexPercent
              : containerSize.height,
        }
        return this.centeringFrameItemImage({
          frameItem: item,
          imageAssetContent,
          containerSize: newContainerSize,
          frameContentItemId,
        })
      }),
    }
  }

  public static updateFrameItemContentImage(params: {
    frameItem: ICardProductFrameItem
    imageUrl: string
  }): ICardProductFrameItem {
    const { frameItem, imageUrl } = params
    if (frameItem.type === 'rows' || frameItem.type === 'columns') {
      return {
        ...frameItem,
        items: frameItem.items.map((item) =>
          this.updateFrameItemContentImage({
            frameItem: item,
            imageUrl,
          }),
        ),
      }
    } else if (frameItem.type === 'content') {
      return {
        ...frameItem,
        // @ts-ignore
        content: {
          ...frameItem.content,
          url: imageUrl,
          // remove filestack path
          filestackHandle: '',
          renderImageWidth: '100%',
          renderImageHeight: '100%',
          transformX: 0,
          transformY: 0,
          isImagePositionFixed: true,
        } as ICardProductFrameImageContent,
      }
    }
    throw new Error('Invalid frame item type')
  }

  public static updateFrameRowByFadedEdgesImage({
    row,
    imageUrl,
  }: {
    row: ICardProductFrameRow
    imageUrl: string
  }): ICardProductFrameRow {
    const frameItem = row.data.content
    return {
      ...row,
      data: {
        ...row.data,
        // turn it off
        enableFadeImage: false,
        content: this.updateFrameItemContentImage({
          frameItem,
          imageUrl,
        }),
      },
    }
  }
}
