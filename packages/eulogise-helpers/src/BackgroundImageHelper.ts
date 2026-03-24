import {
  BACKGROUND_IMAGE_CATEGORIES,
  BACKGROUND_IMAGES_BASE_PATH,
  BackgroundImageTypesMap,
  CardProductBackgroundImageName,
  EulogiseProduct,
  EulogiseRegion,
  EulogiseUserRole,
  ICardProductBackgroundImage,
  ICardProductBackgroundImageBase,
  IGenericCardProductMetadata,
} from '@eulogise/core'
import { CardProductHelper } from './CardProductHelper'
import { CacheBusterHelper } from './CacheBusterHelper'

export class BackgroundImageHelper {
  public static getEditedBackgroundFileName({
    product,
    region,
  }: {
    product: EulogiseProduct
    region: EulogiseRegion
  }) {
    return `edited_${product}_${region}.jpg`
  }

  public static getEditedBackgroundUrlPath(props: {
    backgroundImageId: string
    product: EulogiseProduct
    region: EulogiseRegion
  }) {
    const { backgroundImageId, ...fileNameProps } = props
    return `${BACKGROUND_IMAGES_BASE_PATH}/${backgroundImageId}/${this.getEditedBackgroundFileName(
      fileNameProps,
    )}`
  }

  public static getBackgroundImageAssetKey(
    type: string,
    id: string,
    region: EulogiseRegion,
    ignoreSuffix?: boolean,
  ): string {
    const fileSuffix = region === EulogiseRegion.USA ? '_USA' : ''
    const cardProductPrefix = `${BACKGROUND_IMAGES_BASE_PATH}/${id}/${region}/${id}`
    return `${cardProductPrefix}_${type}${
      ignoreSuffix ? fileSuffix : ''
    }.jpg?cacheBuster=${CacheBusterHelper.getCacheBuster()}`
  }

  public static getBackgroundImageAssetKeys(
    nameOrId: string,
    region: EulogiseRegion,
  ): Array<string> {
    const formattedName = nameOrId.replace(/\s/g, '_')
    const ignoreAsset = region === EulogiseRegion.USA
    const thumbnailImageAssetKey = this.getBackgroundImageAssetKey(
      'THUMBNAIL',
      formattedName,
      region,
    )
    const bookletFrontImageAssetKey = this.getBackgroundImageAssetKey(
      'BOOKLET_FRONT',
      formattedName,
      region,
    )
    const bookletBackImageAssetKey = this.getBackgroundImageAssetKey(
      'BOOKLET_BACK',
      formattedName,
      region,
    )
    const bookletLeftImageAssetKey = this.getBackgroundImageAssetKey(
      'BOOKLET_LEFT',
      formattedName,
      region,
    )
    const bookletRightImageAssetKey = this.getBackgroundImageAssetKey(
      'BOOKLET_RIGHT',
      formattedName,
      region,
    )
    const bookmarkFrontImageAssetKey = !ignoreAsset
      ? this.getBackgroundImageAssetKey(
          'BOOKMARK_FRONT',
          formattedName,
          region,
          true,
        )
      : undefined
    const bookmarkBackImageAssetKey = !ignoreAsset
      ? this.getBackgroundImageAssetKey(
          'BOOKMARK_BACK',
          formattedName,
          region,
          true,
        )
      : undefined
    const sidedCardFrontImageAssetKey = this.getBackgroundImageAssetKey(
      'BOOKLET_FRONT_BOTH_SIDE',
      formattedName,
      region,
    )
    const sidedCardBackImageAssetKey = this.getBackgroundImageAssetKey(
      'BOOKLET_BACK_BOTH_SIDE',
      formattedName,
      region,
    )
    const thankyouCardFrontImageAssetKey = !ignoreAsset
      ? this.getBackgroundImageAssetKey(
          'THANK_YOU_CARD',
          formattedName,
          region,
          true,
        )
      : undefined
    const thankyouCardTwoColumnLeftImageAssetKey = !ignoreAsset
      ? this.getBackgroundImageAssetKey(
          'THANK_YOU_CARD_2_COL_LEFT',
          formattedName,
          region,
          true,
        )
      : undefined
    const thankyouCardTwoColumnRightImageAssetKey = !ignoreAsset
      ? this.getBackgroundImageAssetKey(
          'THANK_YOU_CARD_2_COL_RIGHT',
          formattedName,
          region,
          true,
        )
      : undefined
    const tvWelcomeScreenFrontAssetKey = !ignoreAsset
      ? this.getBackgroundImageAssetKey(
          'THANK_YOU_CARD',
          formattedName,
          region,
          true,
        )
      : undefined
    const tvWelcomeScreenLeftAssetKey = !ignoreAsset
      ? this.getBackgroundImageAssetKey(
          'TV_WELCOME_SCREEN_LEFT',
          formattedName,
          region,
          true,
        )
      : undefined
    const tvWelcomeScreenRightAssetKey = !ignoreAsset
      ? this.getBackgroundImageAssetKey(
          'TV_WELCOME_SCREEN_RIGHT',
          formattedName,
          region,
          true,
        )
      : undefined
    const slideshowAssetKey = this.getBackgroundImageAssetKey(
      'SLIDESHOW',
      formattedName,
      region,
    )
    return [
      thumbnailImageAssetKey,
      bookletFrontImageAssetKey,
      bookletBackImageAssetKey,
      bookletLeftImageAssetKey,
      bookletRightImageAssetKey,
      bookmarkFrontImageAssetKey,
      bookmarkBackImageAssetKey,
      sidedCardFrontImageAssetKey,
      sidedCardBackImageAssetKey,
      thankyouCardFrontImageAssetKey,
      thankyouCardTwoColumnLeftImageAssetKey,
      thankyouCardTwoColumnRightImageAssetKey,
      tvWelcomeScreenFrontAssetKey,
      tvWelcomeScreenLeftAssetKey,
      tvWelcomeScreenRightAssetKey,
      slideshowAssetKey,
    ].filter((a) => a !== undefined) as Array<string>
  }

  public static createBackgroundImage = ({
    id,
    name,
    region,
    categoryIds,
  }: {
    id: string
    name: string
    region: EulogiseRegion
    categoryIds?: Array<string>
  }): ICardProductBackgroundImage => {
    const fileSuffix = region === EulogiseRegion.USA ? '_USA' : ''
    const cardProductPrefix = `${BACKGROUND_IMAGES_BASE_PATH}/${id}/${region}/${id}`
    const cardProductPrefixWithoutRegion = `${BACKGROUND_IMAGES_BASE_PATH}/${id}/AU/${id}`
    return {
      id,
      name,
      categoryIds,
      thumbnail: `${BACKGROUND_IMAGES_BASE_PATH}/${id}/${region}/${id}_THUMBNAIL${fileSuffix}.jpg`,
      cardProducts: {
        [EulogiseProduct.BOOKLET]: {
          [CardProductBackgroundImageName.FRONT]: `${cardProductPrefix}_BOOKLET_FRONT${fileSuffix}.jpg`,
          [CardProductBackgroundImageName.BACK]: `${cardProductPrefix}_BOOKLET_BACK${fileSuffix}.jpg`,
          [CardProductBackgroundImageName.LEFT]: `${cardProductPrefix}_BOOKLET_LEFT${fileSuffix}.jpg`,
          [CardProductBackgroundImageName.RIGHT]: `${cardProductPrefix}_BOOKLET_RIGHT${fileSuffix}.jpg`,
        },
        [EulogiseProduct.BOOKMARK]: {
          [CardProductBackgroundImageName.FRONT]: `${cardProductPrefixWithoutRegion}_BOOKMARK_FRONT.jpg`,
          [CardProductBackgroundImageName.BACK]: `${cardProductPrefixWithoutRegion}_BOOKMARK_BACK.jpg`,
          [CardProductBackgroundImageName.LEFT]: ``,
          [CardProductBackgroundImageName.RIGHT]: ``,
        },
        [EulogiseProduct.SIDED_CARD]: {
          [CardProductBackgroundImageName.FRONT]: `${cardProductPrefix}_BOOKLET_FRONT_BOTH_SIDE${fileSuffix}.jpg`,
          [CardProductBackgroundImageName.BACK]: `${cardProductPrefix}_BOOKLET_BACK_BOTH_SIDE${fileSuffix}.jpg`,
          [CardProductBackgroundImageName.LEFT]: ``,
          [CardProductBackgroundImageName.RIGHT]: ``,
        },
        [EulogiseProduct.THANK_YOU_CARD]: {
          [CardProductBackgroundImageName.FRONT]: `${cardProductPrefixWithoutRegion}_THANK_YOU_CARD.jpg`,
          [CardProductBackgroundImageName.BACK]: ``,
          [CardProductBackgroundImageName.LEFT]: `${cardProductPrefixWithoutRegion}_THANK_YOU_CARD_2_COL_LEFT.jpg`,
          [CardProductBackgroundImageName.RIGHT]: `${cardProductPrefixWithoutRegion}_THANK_YOU_CARD_2_COL_RIGHT.jpg`,
        },
        [EulogiseProduct.TV_WELCOME_SCREEN]: {
          [CardProductBackgroundImageName.FRONT]: `${cardProductPrefixWithoutRegion}_THANK_YOU_CARD.jpg`,
          [CardProductBackgroundImageName.BACK]: ``,
          [CardProductBackgroundImageName.LEFT]: `${cardProductPrefixWithoutRegion}_TV_WELCOME_SCREEN_LEFT.jpg`,
          [CardProductBackgroundImageName.RIGHT]: `${cardProductPrefixWithoutRegion}_TV_WELCOME_SCREEN_RIGHT.jpg`,
        },
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: {
          [CardProductBackgroundImageName.FRONT]: `${cardProductPrefixWithoutRegion}_THANK_YOU_CARD.jpg`,
          [CardProductBackgroundImageName.BACK]: ``,
          [CardProductBackgroundImageName.LEFT]: `${cardProductPrefixWithoutRegion}_TV_WELCOME_SCREEN_LEFT.jpg`,
          [CardProductBackgroundImageName.RIGHT]: `${cardProductPrefixWithoutRegion}_TV_WELCOME_SCREEN_RIGHT.jpg`,
        },
      },
      slideshow: {
        slideBackgroundImageUrl: `${cardProductPrefix}_SLIDESHOW${fileSuffix}.jpg`,
      },
    }
  }

  public static createBackgroundImages = ({
    baseBackgroundImages,
    region = EulogiseRegion.AU,
  }: {
    baseBackgroundImages: Array<ICardProductBackgroundImageBase>
    region: EulogiseRegion
  }): Array<ICardProductBackgroundImage> => {
    return baseBackgroundImages
      .filter((image) => {
        const { name } = image
        return !!name
      })
      .map(({ id, name, categoryIds, ...rest }) => ({
        ...rest,
        ...this.createBackgroundImage({
          id,
          name,
          region,
          categoryIds,
        }),
      }))
  }

  public static getBackgroundImagesPath(backgroundImageId: string) {
    return `${BACKGROUND_IMAGES_BASE_PATH}/${backgroundImageId}`
  }

  public static isBackgroundEditable(
    role: EulogiseUserRole,
    backgroundImage: ICardProductBackgroundImageBase,
  ): boolean {
    const { clientId, customerId } = backgroundImage
    switch (role) {
      case EulogiseUserRole.ADMIN:
        return true
      case EulogiseUserRole.CLIENT:
        return !!clientId
      case EulogiseUserRole.CUSTOMER:
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR:
        return !!customerId
      default:
        return false
    }
  }

  public static isBackgroundDeletable(
    role: EulogiseUserRole,
    backgroundImage: ICardProductBackgroundImageBase,
  ): boolean {
    const { clientId } = backgroundImage
    switch (role) {
      case EulogiseUserRole.ADMIN:
        return true
      case EulogiseUserRole.CLIENT:
        return !!clientId
      default:
        return false
    }
  }
  public static getBlankBackgroundImages = ({
    region = EulogiseRegion.AU,
  }: {
    region: EulogiseRegion
  }): ICardProductBackgroundImage => {
    return this.createBackgroundImage({ id: 'Blank', name: 'Blank', region })
  }

  public static getBackgroundImageCategories = () => {
    return BACKGROUND_IMAGE_CATEGORIES
  }

  public static getBackgroundImagePropertyKeysByProduct = (
    product: EulogiseProduct,
  ): Array<string> => {
    return Object.keys(BackgroundImageTypesMap).filter((key) =>
      new RegExp(product).test(key),
    )
  }

  public static getEditedBackgroundWidthAndHeightByProduct = ({
    product,
    genericProductMetadata,
    region,
  }: {
    product: EulogiseProduct
    genericProductMetadata?: IGenericCardProductMetadata
    region: EulogiseRegion
  }): { width: number; height: number } => {
    const { pageHeight, pageWidth } =
      CardProductHelper.getPageWidthAndHeightByProduct({
        product,
        genericProductMetadata,
        region,
      })

    if (
      product === EulogiseProduct.BOOKLET ||
      product === EulogiseProduct.SIDED_CARD
    ) {
      return {
        width: pageWidth * 2,
        height: pageHeight,
      }
    }
    throw new Error(`product (${product}) not supported`)
  }

  public static getOriginalBackgroundImagePath = (
    backgroundImageId: string,
  ) => {
    return `${BACKGROUND_IMAGES_BASE_PATH}/${backgroundImageId}/original.jpg`
  }

  /*
  public static getEditorDisplayImageDefaultPosition = ({
    containerSize: { width: containerWidth, height: containerHeight },
    actualImageSize: { width: imageWidth, height: imageHeight },
  }: {
    containerSize: IImageSize
    actualImageSize: IImageSize
  }): IImageSizeAndPosition => {
    const displaySizeAndPosition: IImageSizeAndPosition = {
      width: 0,
      height: 0,
      top: undefined,
      left: undefined,
      right: undefined,
    }
    if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) {
      return displaySizeAndPosition
    }
    const horizontalRatio = containerWidth / imageWidth
    const verticalRatio = containerHeight / imageHeight

    const maxRatio = Math.max(horizontalRatio, verticalRatio)
    displaySizeAndPosition.width = imageWidth * maxRatio
    displaySizeAndPosition.height = imageHeight * maxRatio
    // if (horizontalRatio > verticalRatio) {
    displaySizeAndPosition.top =
      (containerHeight - displaySizeAndPosition.height) / 2
    return displaySizeAndPosition
  }
*/
}
