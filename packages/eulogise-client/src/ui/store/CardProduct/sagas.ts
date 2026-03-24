import {
  actionChannel,
  call,
  put,
  select,
  take,
  takeEvery,
  takeLeading,
} from 'redux-saga/effects'
import { Channel } from 'redux-saga'
import {
  AssetActionTypes,
  CardProductActionTypes,
  CardProductBackgroundImageName,
  CardProductContentItemType,
  CardProductPageSize,
  CardProductViewDisplayMode,
  CaseResourcesSearchResponse,
  EulogiseExportProductName,
  EulogiseProduct,
  EulogiseRegion,
  EulogiseResource,
  ICardPopulatedTextDataPrimaryImage,
  ICardProductActionPayload,
  ICardProductBackground,
  ICardProductColumnsRow,
  ICardProductContent,
  ICardProductData,
  ICardProductDataResponse,
  ICardProductFrameImageContent,
  ICardProductFrameLayout,
  ICardProductFrameRow,
  ICardProductFrameRowData,
  ICardProductImageRow,
  ICardProductImageRowData,
  ICardProductImageType,
  ICardProductOverlayUpdateOptions,
  ICardProductPage,
  ICardProductRow,
  ICardProductState,
  ICardProductTextRow,
  ICardProductTextRowData,
  ICardProductTheme,
  ICaseState,
  IEulogiseState,
  IGenericCardProductContent,
  IGenericCardProductData,
  IGenericCardProductsState,
  IGenericCardProductTypeData,
  IImageAsset,
  IImageAssetContent,
  ITheme,
  MemorialVisualStatus,
  PHOTOBOOK_DEFAULT_THEME,
  UpdateBackgroundImageMode,
} from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import {
  AssetHelper,
  CardProductFrameHelper,
  CaseHelper,
  NavigationHelper,
  PhotobookHelper,
  SlideshowHelper,
  ThemeHelper,
  UndoHelper,
  UtilHelper,
} from '@eulogise/helpers'
import { CardProductHelper } from '../../../../../eulogise-helpers/src/CardProductHelper'
import {
  AddCardProductPageRowAction,
  AddCardProductPagesAction,
  ApplyThemeToAllProductsAction,
  applyThemeToProduct,
  ApplyThemeToProductAction,
  ChangeFrameByRowIdAction,
  ChangeToFrameLayoutFromPageLayoutAction,
  CleanCardProductPageByIndexAction,
  CleanupCardProductEmptyRowsAction,
  ClearPagesContentByPageIndexesAction,
  createCardProductByCaseId,
  CreateCardProductByCaseIdAction,
  DeleteCardProductRowAction,
  downloadCardProductByCaseId,
  DownloadCardProductByCaseIdAction,
  DuplicateCardProductRowAction,
  FetchAllProductsByCaseIdAction,
  FetchCardProductsByCaseIdAction,
  GenerateCardProductAction,
  MoveCardProductContentToPageAction,
  ReorderCardProductPageRowsAction,
  ReplaceCardProductPageRowsAction,
  RepopulatePrimaryImageAction,
  saveCardProduct,
  SaveCardProductAction,
  ToggleTextCardProductRowAction,
  UpdateCardProductBackgroundPagesImageAction,
  updateCardProductContent,
  UpdateCardProductContentAction,
  UpdateCardProductContentByContentItemAction,
  UpdateCardProductImageAction,
  UpdateCardProductImageByIdAction,
  updateContentSuccess,
  UpdateContentSuccessAction,
  UpdatePageBackgroundOverlayAction,
  upsertCardProductByCaseId,
  UpsertCardProductByCaseIdAction,
} from './actions'
import { StateHelper } from '../../helpers/StateHelper'
import { Notification } from '@eulogise/client-components'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { DownloadHelper } from '../../helpers/DownloadHelper'
import {
  fetchSlideshowsByCaseId,
  upsertSlideshowByCaseId,
} from '../SlideshowState/actions'
import { handleFetchThemes } from '../ThemeState/sagas'
import { updateCaseById } from '../CaseState/actions'

export const cardProductAction = ({
  type,
  payload = {},
  product,
  slug,
}: {
  type: string
  payload?: ICardProductActionPayload
  product: EulogiseProduct
  slug?: string
}) => ({
  type,
  payload: {
    ...payload,
    productType: product,
    slug,
  },
})

export function* setFirstImageAsPrimaryImageNotSetSaga() {
  const caseState: ICaseState = yield select(
    (state: IEulogiseState) => state.cases,
  )
  const imageAssetsFromLibrary: Array<IImageAsset> = yield select(
    (state: IEulogiseState) => {
      const images = state.assets.images ?? []
      const customisedImagesOrderIds =
        state.cases.activeItem?.customisedImagesOrderIds ?? []
      return AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
        images,
        customisedImagesOrderIds!,
      )
    },
  )
  const { activeItem: activeCase } = caseState
  if (!activeCase) {
    console.warn('No active case found to set primary image')
    return
  }
  const imageAssetContent = imageAssetsFromLibrary?.[0]?.content
  const primaryImage = CaseHelper.getPrimaryImage({ activeCase: activeCase! })
  // return primaryImage if it is set
  if (primaryImage) {
    return primaryImage
  }
  // if no primary image is set, we can use the first image from the assets
  if (!primaryImage && imageAssetContent) {
    // set the first image as primary image
    yield put(
      updateCaseById({
        caseId: activeCase?.id!,
        caseFields: {
          primaryImage: imageAssetContent,
        },
      }),
    )
  }
  return imageAssetContent
}

function* handleFetchCardProductsByCaseId(
  action: FetchCardProductsByCaseIdAction,
) {
  const { payload } = action
  const { product, caseId, region, success, genericProductType, slug } = payload
  const {
    data: { items: products },
  } = yield RequestHelper.findResourceRequest({
    resource: CardProductHelper.getResourceByProduct(product),
    caseId,
  })
  if (!products || products.length === 0) {
    console.log('fetchCardProductsByCaseId products: no products in', product)
    yield put(
      cardProductAction({
        type: CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID_SUCCESS,
        product,
      }),
    )
    return
  }

  const activeCardProduct = (products as Array<ICardProductData>)?.[0]
  const activeThemeId = activeCardProduct?.content.theme
  const { data } = yield RequestHelper.fetchThemeById(activeThemeId)

  success && success(products)
  if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
    for (const p of products) {
      const activeProductTheme = ThemeHelper.getProductThemeByProductType({
        theme: data.theme,
        genericProductType,
        product,
        region,
        genericProductMetadata: (p as IGenericCardProductData)?.content
          ?.metadata,
      }) as ICardProductTheme
      yield put(
        cardProductAction({
          type: CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID_SUCCESS,
          payload: {
            products: [p],
            activeProductTheme,
          },
          product,
        }),
      )
    }
  } else {
    const activeProductTheme = ThemeHelper.getProductThemeByProductType({
      theme: data.theme,
      genericProductType,
      product,
      region,
    }) as ICardProductTheme
    yield put(
      cardProductAction({
        type: CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID_SUCCESS,
        payload: {
          products,
          activeProductTheme,
        },
        product,
      }),
    )
  }
  /*if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
    const { themes } = yield select((s: IEulogiseState) => s.themes)
    const { items: genericProductTypes } = yield select(
      (s: IEulogiseState) => s.genericCardProductTypes,
    )
    for (const activeCardProduct of products) {
      console.log('iiiiiiiactiveCardProduct', {
        activeCardProduct,
        themes,
        product,
        resourceName: EulogiseResource.GENERIC_CARD_PRODUCT,
        region,
        genericProductTypes,
      })
      yield setActiveCardProduct({
        activeCardProduct,
        themes,
        product,
        resourceName: EulogiseResource.GENERIC_CARD_PRODUCT,
        region,
        genericProductTypes,
      })
    }
    /!*
    yield setActiveCardProduct({
      activeCardProduct,
      themes,
      product,
      resourceName,
      region,
      genericProductTypes,
    })
*!/
  }*/
}

function* handleUpdateCardProductImageById(
  action: UpdateCardProductImageByIdAction,
) {
  try {
    const state: IEulogiseState = yield select((s) => s)
    const {
      payload: { product, imageContent, contentId, slug },
    } = action

    const cardProductState = StateHelper.getProductStateByProduct({
      state,
      product,
      slug,
    }) as ICardProductState
    const cardProduct = cardProductState.activeItem

    const newProductData = CardProductHelper.updateFrameImageByContentId({
      cardProduct: cardProduct?.content!,
      frameContentId: contentId,
      imageContent,
    })
    console.log('new ProductData', newProductData)
    yield put(
      updateContentSuccess({ product, slug, pages: newProductData.pages }),
    )
  } catch (ex) {
    console.error(ex)
    throw new Error('Error on handleUpdateCardProductImageById')
  }
}

function* handleSaveCardProduct(action: SaveCardProductAction) {
  const {
    payload: {
      product,
      slug,
      cardProduct,
      cardProductTheme,
      saveFromClickComplete,
      onSuccess,
      isShowNotification = true,
      isUpdateActiveItemOnSuccess = false,
    },
  } = action
  const { activeItem: activeCase } = yield select((state) => state.cases)
  const { region } = activeCase

  const productName: string = CardProductHelper.getProductName({
    product,
    genericProductMetadata: (cardProduct as IGenericCardProductData)?.content
      ?.metadata,
    region,
  })

  const pages = cardProduct.content.pages
  const updatedCardProduct: ICardProductData = {
    ...cardProduct,
    content: yield CardProductHelper.preCardProductSaveUpdate({
      ...cardProduct.content,
      pages,
    }),
  }

  try {
    let status = updatedCardProduct.status
    if (
      (NavigationHelper.hasProductBeenChanged || saveFromClickComplete) &&
      CardProductHelper.isHigherProductStatusPriority(
        MemorialVisualStatus.EDITED,
        status,
      )
    ) {
      status = MemorialVisualStatus.EDITED
    }
    // @ts-ignore
    const { data }: ICardProductDataResponse =
      yield RequestHelper.saveResourceRequest(
        CardProductHelper.getResourceByProduct(product),
        { ...updatedCardProduct, status },
      )
    yield put(
      cardProductAction({
        type: CardProductActionTypes.SAVE_CARD_PRODUCT_SUCCESS,
        payload: {
          product: data?.item,
          cardProductTheme,
          isUpdateActiveItemOnSuccess,
        },
        product,
        slug,
      }),
    )
    if (onSuccess) {
      onSuccess(data.item.id!)
    } else {
      if (isShowNotification) {
        Notification.success(`${productName} saved.`)
      }
    }
    NavigationHelper.removeUnsavedListener()
  } catch (ex) {
    Notification.error(`Failed to save ${productName}.`)
    yield put(
      cardProductAction({
        type: CardProductActionTypes.SAVE_CARD_PRODUCT_FAIL,
        product,
      }),
    )
  }
}

function* handleUpsertCardProductByCaseId(
  action: UpsertCardProductByCaseIdAction,
) {
  const {
    payload: {
      caseId,
      cardProduct,
      genericProductType,
      product,
      slug,
      onSuccess,
      region,
      themeId,
      isPopulatingData,
      populatedData,
      isUpdateActiveItemOnSuccess,
      pageSize,
    },
  } = action

  const {
    data: { theme },
  } = yield RequestHelper.fetchThemeById(themeId)
  const cardProductTheme = ThemeHelper.getProductThemeByProductType({
    product,
    genericProductType,
    genericProductMetadata: (cardProduct as IGenericCardProductData)?.content
      ?.metadata,
    theme,
    region,
  }) as ICardProductTheme

  if (!cardProductTheme) {
    console.log(
      `No cardProductTheme (${product}) theme available for the current theme`,
      theme,
    )
    return
  }
  if (cardProduct) {
    const themeContent = CardProductHelper.createCardProductContentByThemeId({
      product,
      themeId,
      theme,
      isPopulatingData,
      populatedData: populatedData!,
      existingCardProduct: cardProduct,
      genericProductType,
      region,
      pageSize,
    })
    if (product === EulogiseProduct.BOOKLET) {
      const themePages = themeContent.pages
      const themeNoOfPages = themePages.length
      const currentPages = cardProduct.content.pages
      const currentNoOfPages = currentPages.length
      const addedPages = currentPages.slice(
        themeNoOfPages - 1,
        currentNoOfPages - 1,
      )
      const secondPage = themePages[1]
      const thirdPage = themePages[2]
      const pages = [
        ...themePages.slice(0, themeNoOfPages - 1),
        ...addedPages.map((p: ICardProductPage, index: number) => {
          const { background, border, ...pageContent } = p
          if (index % 2 === 0) {
            return {
              ...secondPage,
              ...pageContent,
            }
          }
          return {
            ...thirdPage,
            ...pageContent,
          }
        }),
        themePages[themeNoOfPages - 1],
      ]
      yield put(
        saveCardProduct({
          product,
          slug,
          cardProductTheme,
          cardProduct: {
            ...cardProduct,
            content: { ...themeContent, pages },
            case: caseId,
          },
          onSuccess,
          isShowNotification: false,
          isUpdateActiveItemOnSuccess,
        }),
      )
    } else {
      const newCardProduct = {
        ...cardProduct,
        content: themeContent,
        case: caseId,
        // Add slug for generic card products
        ...(product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
          genericProductType && {
            slug: genericProductType.slug,
          }),
      }
      yield put(
        saveCardProduct({
          product,
          slug,
          cardProductTheme,
          cardProduct: newCardProduct,
          onSuccess,
          isShowNotification: false,
          isUpdateActiveItemOnSuccess,
        }),
      )
    }
    return
  }
  yield put(
    createCardProductByCaseId({
      product,
      genericProductType,
      cardProductTheme,
      caseId,
      themeId: themeId.toLowerCase(),
      theme,
      isPopulatingData,
      populatedData: populatedData!,
      region,
      onSuccess,
    }),
  )
}

function* handleDownloadCardProductByCaseId(
  action: DownloadCardProductByCaseIdAction,
) {
  const {
    payload: {
      product,
      slug,
      caseId,
      productName,
      isBleed,
      // There is a delay on the file made available in S3 after the status is updated to GENERATED
      // That's why we need so many retries
      retries = 20,
      deceasedName,
      complete,
      pageMode,
      pageSize,
    },
  } = action
  try {
    const fileType =
      product === EulogiseProduct.TV_WELCOME_SCREEN ? 'jpg' : 'pdf'
    const url = CardProductHelper.getCardProductS3FileUrl({
      caseId,
      productName:
        productName === EulogiseExportProductName.BOOKLET_US
          ? EulogiseExportProductName.BOOKLET
          : productName,
      slug,
      bleed: !!isBleed,
      fileType,
      pageMode,
    })
    /*
    const url = `${
      EulogiseClientConfig.AWS_S3_URL_WITHOUT_CDN
    }/cases/${caseId}/${
      productName === EulogiseExportProductName.BOOKLET_US
        ? EulogiseExportProductName.BOOKLET
        : productName
    }${pageMode === CardProductPageMode.SINGLE_PAGE ? '-singlePage' : ''}${
      isBleed ? '-bleed' : ''
    }.${fileType}`
*/
    yield RequestHelper.updateResourceRequest(
      CardProductHelper.getResourceByProduct(product),
      {
        case: caseId,
        status: MemorialVisualStatus.DOWNLOAD,
      },
    )
    const downloadProductName = CardProductHelper.getDownloadProductExportName({
      product,
      productName,
      pageSize,
      isBleed,
      pageMode,
    })
    yield DownloadHelper.downloadAs(
      `${url}?time=${new Date().getTime()}`,
      `${deceasedName}'s ${downloadProductName}.${fileType}`,
    )
  } catch (ex) {
    console.log('failed to download')
    if (!!retries) {
      const ms = 1000
      console.log(`retry in ${ms}ms`)
      yield UtilHelper.sleep(ms)
      yield put(
        downloadCardProductByCaseId({
          product,
          productName,
          caseId,
          deceasedName,
          pageSize,
          pageMode,
          isBleed,
          retries: retries - 1,
        }),
      )
    }
  }
  if (complete) {
    complete()
  }
}

function* handleCreateCardProductByCaseId(
  action: CreateCardProductByCaseIdAction,
) {
  const {
    payload: {
      product,
      caseId,
      genericProductType,
      isPopulatingData,
      populatedData,
      onSuccess,
      cardProductTheme,
      region,
      theme,
      themeId,
      onSaving,
      pageSize,
    },
  } = action

  try {
    const productContent = CardProductHelper.createCardProductContentByThemeId({
      product,
      genericProductType,
      themeId,
      theme,
      isPopulatingData,
      populatedData,
      region,
      pageSize,
    })
    const productPages = productContent.pages
    const cardProduct: ICardProductData | IGenericCardProductContent = {
      status: MemorialVisualStatus.THEME_SELECTED,
      case: caseId,
      content: yield CardProductHelper.preCardProductSaveUpdate({
        ...productContent,
        pages: productPages,
      }),
      // Add slug for generic card products
      ...(product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
        genericProductType && {
          slug: genericProductType.slug,
        }),
    }
    if (onSaving) {
      onSaving()
    }

    const { data } = yield RequestHelper.saveResourceRequest(
      CardProductHelper.getResourceByProduct(product),
      cardProduct,
    )

    let successPayload = {
      product: data.item,
      cardProductTheme,
    }
    yield put(
      cardProductAction({
        type: CardProductActionTypes.CREATE_CARD_PRODUCT_BY_CASE_ID_SUCCESS,
        payload: successPayload,
        product,
        // Include slug for generic card products
        ...(product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
        genericProductType
          ? {
              slug: genericProductType.slug,
            }
          : {}),
      }),
    )
    if (onSuccess) {
      onSuccess(data.item.id)
    }
    NavigationHelper.removeUnsavedListener()
  } catch (ex: any) {
    console.log('ex', ex)
    yield put(
      cardProductAction({
        type: CardProductActionTypes.CREATE_CARD_PRODUCT_BY_CASE_ID_FAILED,
        payload: {
          ex,
        },
        product,
      }),
    )
  }
}

function* handleUpdateCardProductBackgroundPagesImage(
  action: UpdateCardProductBackgroundPagesImageAction,
) {
  const {
    payload: { product, cardProduct, updateMode, backgroundImageSet, noSave },
  } = action
  const slug = (cardProduct as IGenericCardProductData)?.content?.metadata?.slug

  if (updateMode === UpdateBackgroundImageMode.NOT_APPLICABLE) {
    return
  }

  const cardProductNewBackgroundImages =
    backgroundImageSet?.cardProducts?.[
      product === EulogiseProduct.GENERIC_CARD_PRODUCT
        ? EulogiseProduct.BOOKLET
        : product
    ]!

  const currentPages: Array<ICardProductPage> = cardProduct?.content?.pages

  const updatedPageSize: CardProductPageSize = cardProduct?.content?.pageSize

  const numberOfPages: number = currentPages?.length

  const updatedPages: Array<ICardProductPage> = currentPages.map(
    (page: ICardProductPage, index: number) => {
      // clean the middle pages background images content
      if (
        updateMode === UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY &&
        index > 0 &&
        index < numberOfPages - 1 &&
        !(
          product === EulogiseProduct.THANK_YOU_CARD ||
          product === EulogiseProduct.TV_WELCOME_SCREEN ||
          product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE
        )
      ) {
        const removedBackgroundImagePage: ICardProductPage = page
        delete removedBackgroundImagePage?.background
        return removedBackgroundImagePage
      }

      let newBackgroundImageUrl
      const pageBackgroundImageData: ICardProductBackground = page?.background!

      // Sided card - 2 pages
      if (
        updateMode === UpdateBackgroundImageMode.UPDATE_FRONT_PAGE_ONLY &&
        product === EulogiseProduct.SIDED_CARD
      ) {
        if (index === 0) {
          newBackgroundImageUrl =
            cardProductNewBackgroundImages[CardProductBackgroundImageName.FRONT]
        } else {
          const removedBackgroundImagePage: ICardProductPage = page
          delete removedBackgroundImagePage?.background
          return removedBackgroundImagePage
        }
      }

      // Bookmark - 2 pages
      if (product === EulogiseProduct.BOOKMARK) {
        if (index === 0) {
          newBackgroundImageUrl =
            cardProductNewBackgroundImages[CardProductBackgroundImageName.FRONT]
        } else if (
          index === numberOfPages - 1 &&
          updateMode === UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY
        ) {
          newBackgroundImageUrl =
            cardProductNewBackgroundImages[CardProductBackgroundImageName.BACK]
        } else {
          const removedBackgroundImagePage: ICardProductPage = page
          delete removedBackgroundImagePage?.background
          return removedBackgroundImagePage
        }
      }

      // Thank you card and TV screen: Edge cases - 2 col layouts:
      if (
        (product === EulogiseProduct.THANK_YOU_CARD &&
          updatedPageSize === CardProductPageSize.THANKYOUCARD_2_COLS) ||
        (product === EulogiseProduct.TV_WELCOME_SCREEN &&
          updatedPageSize === CardProductPageSize.TV_WELCOME_SCREEN_2_COLS) ||
        (product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE &&
          updatedPageSize === CardProductPageSize.TV_WELCOME_SCREEN_2_COLS)
      ) {
        if (index === 0) {
          newBackgroundImageUrl =
            cardProductNewBackgroundImages[CardProductBackgroundImageName.LEFT]
        } else if (index === 1) {
          newBackgroundImageUrl =
            cardProductNewBackgroundImages[CardProductBackgroundImageName.RIGHT]
        }
      } else {
        // Normal card product layout --- 1 col layout page:
        if (index === 0) {
          // update the front page
          newBackgroundImageUrl =
            cardProductNewBackgroundImages[CardProductBackgroundImageName.FRONT]
        } else if (index === numberOfPages - 1) {
          // update the back page
          newBackgroundImageUrl =
            cardProductNewBackgroundImages[CardProductBackgroundImageName.BACK]
        } else if (index % 2 === 1) {
          // update the left page
          newBackgroundImageUrl =
            cardProductNewBackgroundImages[CardProductBackgroundImageName.LEFT]
        } else if (index % 2 === 0) {
          // update the right page
          newBackgroundImageUrl =
            cardProductNewBackgroundImages[CardProductBackgroundImageName.RIGHT]
        }
      }

      // clean and do not update when no url from background image set
      if (!newBackgroundImageUrl) {
        const removedBackgroundImagePage: ICardProductPage = page
        delete removedBackgroundImagePage?.background
        return removedBackgroundImagePage
      }

      const updatedPageBackgroundImageData: ICardProductBackground = {
        ...pageBackgroundImageData,
        image: {
          ...pageBackgroundImageData?.image,
          filepath: newBackgroundImageUrl,
        },
      }

      const newPage: ICardProductPage = {
        ...page,
        background: updatedPageBackgroundImageData,
      }

      return newPage
    },
  )

  const updatedCardProduct: ICardProductData = {
    ...cardProduct,
    content: {
      ...cardProduct?.content,
      pages: updatedPages,
      pageSize: updatedPageSize,
    },
  }

  yield put(updateContentSuccess({ product, slug, pages: updatedPages }))
  if (noSave) {
    return
  }
  yield put(saveCardProduct({ product, cardProduct: updatedCardProduct }))
}

function* handleUpdatePageBackgroundOverlay(
  action: UpdatePageBackgroundOverlayAction,
) {
  const {
    payload: {
      product,
      cardProduct,
      updatedPageIndex,
      cardProductOverlayOptions,
    },
  } = action
  const slug = (cardProduct as IGenericCardProductData)?.content?.metadata?.slug
  const currentPages: Array<ICardProductPage> = cardProduct?.content?.pages
  if (updatedPageIndex === undefined || isNaN(updatedPageIndex)) {
    return
  }
  const {
    overlayColor,
    overlayMargin,
    overlayOpacity,
  }: ICardProductOverlayUpdateOptions = cardProductOverlayOptions

  const updatedPages = currentPages.map(
    (page: ICardProductPage, index: number) => {
      if (index !== updatedPageIndex) {
        return page
      }

      const pageBackgroundImageData: ICardProductBackground = page?.background!
      // Toggle off overlay data for current page's background
      if (
        pageBackgroundImageData &&
        pageBackgroundImageData?.overlayColor &&
        pageBackgroundImageData?.overlayMargin &&
        pageBackgroundImageData?.overlayOpacity
      ) {
        const removedPage: ICardProductPage = page
        const removedBackgroundImageData = removedPage?.background

        const {
          overlayColor,
          overlayMargin,
          overlayOpacity,
          ...newBackgroundPageData
        } = removedBackgroundImageData
        const newBackgroundPage = {
          ...removedPage,
          background: newBackgroundPageData,
        }

        return newBackgroundPage
      }

      const updatedPageBackgroundImageData: ICardProductBackground = {
        ...pageBackgroundImageData,
        overlayColor,
        overlayMargin,
        overlayOpacity,
      }
      const newPage: ICardProductPage = {
        ...page,
        background: updatedPageBackgroundImageData,
      }
      return newPage
    },
  )
  yield put(updateContentSuccess({ product, slug, pages: updatedPages }))
}

function* handleGenerateCardProduct(action: GenerateCardProductAction) {
  const {
    payload: { product, cardProductId, caseId, slug },
  } = action
  const { activeItem: activeCase } = yield select((state) => state.cases)
  const { account } = yield select((state) => state.auth)
  const region = activeCase?.region

  try {
    const { status } = yield RequestHelper.generateResourceRequest({
      product,
      productId: cardProductId,
      data: {
        generateUserId: account?.id,
        region,
        slug,
      },
    })
    console.log('card product resp', status)
    yield put(
      cardProductAction({
        type: CardProductActionTypes.GENERATE_CARD_PRODUCT_SUCCESS,
        product,
        slug,
      }),
    )
  } catch (ex) {
    console.log('Exception', ex)
    /* hide notification since the process is asynchronous
    Notification.error(
      `Failed to generate ${CardProductHelper.getProductShortName({
        product,
        region,
      })}`,
    )*/
    /*
    // Do not trigger GENERATE_CARD_PRODUCT_FAILED, once this event triggerd and file status
    // is set to FAILED, it will not be retried
    yield put(
      cardProductAction({
        type: CardProductActionTypes.GENERATE_CARD_PRODUCT_FAILED,
        product,
      }),
    )
*/
  }
}

function* handleAddCardProductPages(action: AddCardProductPagesAction) {
  const {
    payload: { onSuccess },
  } = action
  Notification.success('Pages added')
  if (onSuccess) {
    onSuccess()
  }
}

function* handleRemoveCardProductPages() {
  Notification.success('Pages removed')
}

function* handleAddCardProductPageRow(action: AddCardProductPageRowAction) {
  const {
    payload: {
      product,
      slug,
      genericProductMetadata,
      pageIndex,
      success,
      type,
      productTheme,
      options: { content, region, ...restOptions } = {},
    },
  } = action

  // @ts-ignore
  const newRow: ICardProductRow = {
    id: UtilHelper.generateID(8),
    type,
    data: CardProductHelper.createRowData({
      product,
      genericProductMetadata,
      type,
      productTheme,
      options: {
        content,
        region,
        ...restOptions,
      },
    }),
  }

  yield put(
    cardProductAction({
      type: CardProductActionTypes.ADD_CARD_PRODUCT_PAGE_ROW_SUCCESS,
      payload: {
        pageIndex,
        type,
        row: newRow,
      },
      product,
      slug,
    }),
  )
  success && success(newRow)
}

function* handleToggleTextCardProductRow(
  action: ToggleTextCardProductRowAction,
) {
  const {
    payload: { product, pageIndex, rowId, slug, genericProductMetadata },
  } = action
  const { activeItem: cardProduct } = yield select((state) =>
    StateHelper.getProductStateByProduct({ state, product, slug }),
  )
  const page = cardProduct.content.pages[pageIndex]
  const rowIndex = page.rows.findIndex(
    (row: ICardProductRow) => row.id === rowId,
  )
  const type = CardProductContentItemType.TEXT
  const childRowId = UtilHelper.generateID(8)

  const frameRow = page.rows[rowIndex]

  let updatedRows = []

  // const existingHeight = frameRow.data.height
  // remove row
  if (frameRow.childRowIds && frameRow.childRowIds.length > 0) {
    const childRowId = frameRow.childRowIds[0]
    // const rowHeight = existingHeight + DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT
    const newFrameRow: ICardProductFrameRow = {
      ...frameRow,
      /*
      data: {
        ...frameRow.data,
        content: {
          ...frameRow.data.content,
          height: rowHeight,
        },
        height: rowHeight,
      },
*/
      childRowIds: undefined,
    }
    updatedRows = page.rows
      .filter((r: ICardProductRow) => r.id !== childRowId)
      .map((row: ICardProductRow) => {
        // update to newFrameRow
        if (row.id === rowId) {
          return newFrameRow
        }
        return row
      })
  }
  // add row
  else {
    /*
    const rowHeight = existingHeight
      ? existingHeight - DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT
      : 0
*/
    const newFrameRow: ICardProductFrameRow = {
      ...frameRow,
      /*data: {
        ...frameRow.data,
        content: {
          ...frameRow.data.content,
          height: rowHeight,
        },
        height: rowHeight,
      },*/
      childRowIds: [childRowId],
    }
    const captionRowHeight = PhotobookHelper.calculateCaptionRowHeight({
      frameRowHeight: newFrameRow.data.height,
      pageSize: cardProduct?.content?.pageSize,
    })
    const tmpTextRow: ICardProductTextRow = {
      id: childRowId,
      type,
      data: CardProductHelper.createRowData({
        product,
        type,
        productTheme: PHOTOBOOK_DEFAULT_THEME,
        options: {
          height: captionRowHeight,
          width: CardProductHelper.getDefaultPageContentWidthAndHeight({
            product,
            genericProductMetadata,
            pageSize: cardProduct?.content.pageSize,
          }).width,
        },
        genericProductMetadata,
      }) as ICardProductTextRowData,
      // height: captionRowHeight,
    }
    /*
    const textRow = PhotobookHelper.scaleTitlePageRowToPageSize({
      row: tmpTextRow,
      pageSize: cardProduct?.content?.pageSize,
    })
*/

    // insert the row below the row (rowIndex) that was clicked
    const rowsWithNewTextRow = UtilHelper.insertAll(
      rowIndex + 1,
      [tmpTextRow],
      page.rows,
    )

    updatedRows = rowsWithNewTextRow.map((row: ICardProductRow) => {
      // update to newFrameRow
      if (row.id === rowId) {
        return newFrameRow
      }
      return row
    })
  }

  const pages = CardProductHelper.updateCardProductPages({
    page,
    updatedRows,
    cardProduct,
    pageIndex,
  })
  yield put(updateContentSuccess({ product, slug, pages }))
}

function* handleCleanupCardProductEmptyRows(
  action: CleanupCardProductEmptyRowsAction,
) {
  const {
    payload: { product, cardProduct, pageIndex },
  } = action
  const slug = (cardProduct as IGenericCardProductData)?.content?.metadata?.slug
  const page = cardProduct.content.pages[pageIndex]
  const updatedRows = page.rows.filter((row: ICardProductRow) => {
    if (row.type === CardProductContentItemType.IMAGE) {
      if (row.data.filename === '') {
        return false
      }
    } else if (row.type === CardProductContentItemType.COLUMNS) {
      const isAllEmpty: boolean = row.data.items.reduce(
        (curr: boolean, i: ICardProductImageRow) => {
          if (!curr) {
            return curr
          }
          return i.data.filename === ''
        },
        true,
      )!
      return !isAllEmpty
    }
    /* DON'T clean up empty spaces
    else if (row.type === CardProductContentItemType.SPACE) {
      if (!row.data.divider) {
        return false
      }
    }*/
    return true
  })

  const pages = CardProductHelper.updateCardProductPages({
    page,
    updatedRows,
    cardProduct,
    pageIndex,
  })

  yield put(updateContentSuccess({ product, slug, pages }))
}

function* handleDeleteCardProductRow(action: DeleteCardProductRowAction) {
  const {
    payload: { product, cardProduct, id, pageIndex },
  } = action
  const slug = (cardProduct as IGenericCardProductData)?.content?.metadata?.slug
  const page = cardProduct.content.pages[pageIndex]
  const updatedRows = page.rows.filter((row: ICardProductRow) => row.id !== id)

  const pages = CardProductHelper.updateCardProductPages({
    page,
    updatedRows,
    cardProduct,
    pageIndex,
  })
  yield put(updateContentSuccess({ product, slug, pages }))
}

function* handleDuplicateCardProductRow(action: DuplicateCardProductRowAction) {
  const {
    payload: { product, cardProduct, pageIndex, id },
  } = action
  const slug = (cardProduct as IGenericCardProductData)?.content?.metadata?.slug
  const page = cardProduct.content.pages[pageIndex]!

  const pageRows = page?.rows

  const originalRow: ICardProductRow = page.rows.find(
    (row: ICardProductRow) => row.id === id,
  )!
  if (!originalRow) {
    return
  }
  const newRow: ICardProductRow = {
    ...originalRow,
    id: UtilHelper.generateID(8),
  }

  const originalRowIndex: number = page.rows.indexOf(originalRow)

  const updatedRows: Array<ICardProductRow> = CardProductHelper.insertRowInPage(
    {
      originalPageRows: pageRows,
      insertRowIndex: originalRowIndex,
      insertNewRow: newRow,
    },
  )

  const pages = CardProductHelper.updateCardProductPages({
    page,
    updatedRows,
    cardProduct,
    pageIndex,
  })

  yield put(updateContentSuccess({ product, slug, pages }))
}

function* handleMoveCardProductContentToPage(
  action: MoveCardProductContentToPageAction,
) {
  const {
    payload: { product, source, cardProductContent, destination },
  } = action

  const { pages } = cardProductContent
  const slug = (cardProductContent as IGenericCardProductContent)?.metadata
    ?.slug
  const sourceIndex = CardProductHelper.getIndexFromId(source.droppableId)
  const destinationIndex = CardProductHelper.getIndexFromId(
    destination.droppableId,
  )
  const sourceList = pages[sourceIndex].rows
  const destinationList = pages[destinationIndex].rows

  const result = CardProductHelper.moveContent(
    sourceList,
    destinationList,
    source,
    destination,
  )
  const canFitOptions = {
    pageSize: cardProductContent.pageSize,
    pageMargins: cardProductContent.pageMargins,
    pageOrientation: cardProductContent.pageOrientation,
  }
  if (
    !CardProductHelper.contentCanFit({
      maxPageContentHeight:
        CardProductHelper.getMaxGenericProductPageContentHeight({
          metadata: (cardProductContent as IGenericCardProductContent)
            ?.metadata,
        }),
      rows: result[destination.droppableId],
      options:
        product === EulogiseProduct.GENERIC_CARD_PRODUCT
          ? {
              ...canFitOptions,
              pageHeight: (
                cardProductContent as unknown as IGenericCardProductContent
              ).metadata.selectedDimension?.height,
            }
          : canFitOptions,
      product,
    })
  ) {
    return // TODO: show error message to user that content doesn't fit on the destination page
  } else {
    /*
      dispatch(cardProductAction({
        type: BookletActionTypes.CONTENT_IS_NOT_FULL,
        payload: { pageIndex: destinationIndex },
        product
      }))
*/
  }

  const newPages = pages.map((page: ICardProductPage, index: number) => {
    if (index === sourceIndex) {
      return { ...page, rows: result[source.droppableId] }
    }

    if (index === destinationIndex) {
      return { ...page, rows: result[destination.droppableId] }
    }

    return page
  })

  yield put(updateContentSuccess({ product, slug, pages: newPages }))
}

function* handleReorderCardProductPageRows(
  action: ReorderCardProductPageRowsAction,
) {
  const {
    payload: { product, cardProductContent, source, destination },
  } = action
  const slug = (cardProductContent as IGenericCardProductContent)?.metadata
    ?.slug
  const sourceIndex = CardProductHelper.getIndexFromId(source.droppableId)
  const reorderedRows = CardProductHelper.reorder(
    cardProductContent.pages[sourceIndex].rows,
    source.index,
    destination.index,
  )
  const pages = cardProductContent.pages.map(
    (page: ICardProductPage, index: number) => {
      if (index === sourceIndex) {
        return { ...page, rows: reorderedRows }
      }

      return page
    },
  )
  yield put(updateContentSuccess({ product, slug, pages }))
}

function* handleResetAllCardProductState() {
  yield put(
    cardProductAction({
      type: CardProductActionTypes.RESET_CARD_PRODUCT_STATE,
      product: EulogiseProduct.BOOKLET,
    }),
  )
  yield put(
    cardProductAction({
      type: CardProductActionTypes.RESET_CARD_PRODUCT_STATE,
      product: EulogiseProduct.BOOKMARK,
    }),
  )
  yield put(
    cardProductAction({
      type: CardProductActionTypes.RESET_CARD_PRODUCT_STATE,
      product: EulogiseProduct.SIDED_CARD,
    }),
  )
  yield put(
    cardProductAction({
      type: CardProductActionTypes.RESET_CARD_PRODUCT_STATE,
      product: EulogiseProduct.THANK_YOU_CARD,
    }),
  )
  yield put(
    cardProductAction({
      type: CardProductActionTypes.RESET_CARD_PRODUCT_STATE,
      product: EulogiseProduct.TV_WELCOME_SCREEN,
    }),
  )
  yield put(
    cardProductAction({
      type: CardProductActionTypes.RESET_CARD_PRODUCT_STATE,
      product: EulogiseProduct.GENERIC_CARD_PRODUCT,
    }),
  )
}

function* handleApplyThemeToProduct(action: ApplyThemeToProductAction) {
  const {
    payload: {
      product,
      slug,
      themeId,
      cardProduct,
      genericProductType,
      onSuccess,
      populatedData,
      isPopulatingData,
      activeCase,
      slideshow,
    },
  } = action
  const caseId: string = activeCase?.id
  const region: EulogiseRegion = activeCase?.region ?? EulogiseRegion.AU
  if (product === EulogiseProduct.SLIDESHOW) {
    yield put(
      upsertSlideshowByCaseId({
        caseId,
        slideshow,
        themeId,
        deceasedFullName: activeCase.deceased.fullName,
        deceasedLifeString: `${populatedData?.dateOfBirth} - ${populatedData?.dateOfDeath}`,
        onSuccess,
      }),
    )
  } else {
    const primaryImage: ICardPopulatedTextDataPrimaryImage =
      yield setFirstImageAsPrimaryImageNotSetSaga()

    yield put(
      upsertCardProductByCaseId({
        product,
        slug,
        caseId,
        cardProduct,
        genericProductType,
        region,
        themeId,
        isPopulatingData,
        populatedData: {
          ...populatedData,
          primaryImage,
        },
        onSuccess,
        // update active card product after theme applied
        isUpdateActiveItemOnSuccess: true,
        // keep existing pageSize for photobook only
        pageSize:
          product === EulogiseProduct.PHOTOBOOK
            ? cardProduct?.content?.pageSize
            : undefined,
      }),
    )
  }
}

function* handleApplyThemeToAllProducts(action: ApplyThemeToAllProductsAction) {
  const {
    payload: {
      themeId,
      isPopulatingData,
      activeCase,
      onSuccess,
      populatedData,
      cardProducts,
      slideshow,
    },
  } = action
  const isSlideshowEnabled = CaseHelper.isCaseProductEnabled({
    activeCase,
    productOrSlug: EulogiseProduct.SLIDESHOW,
  })
  if (
    isSlideshowEnabled &&
    SlideshowHelper.isSlideshowThemeChangable(slideshow!)
  ) {
    yield put(
      applyThemeToProduct({
        product: EulogiseProduct.SLIDESHOW,
        activeCase,
        slideshow,
        themeId,
        isPopulatingData,
        populatedData,
        onSuccess: (productId: string) => {
          if (onSuccess) {
            onSuccess(EulogiseProduct.SLIDESHOW, productId)
          }
        },
      }),
    )
  }
  for (let [product, cardProduct] of Object.entries(cardProducts!)) {
    // do not apply theme for Photobook
    if (product === EulogiseProduct.PHOTOBOOK) {
      continue
    }
    if (CardProductHelper.isCardProductThemeChangable(cardProduct)) {
      yield put(
        applyThemeToProduct({
          product,
          activeCase,
          themeId,
          cardProduct,
          isPopulatingData,
          populatedData,
          onSuccess: (productId: string) => {
            if (onSuccess) {
              onSuccess(product as EulogiseProduct, productId)
            }
          },
        }),
      )
    }
  }
}

function* handleUpdateCardProductSpaceAssetByRowId() {}

function* handleUpdateCardProductImage(action: UpdateCardProductImageAction) {
  const {
    payload: {
      product,
      cardProduct,
      image,
      frameContentItemId,
      pageIndex,
      // columnIndex,
      rowId,
    },
  } = action
  // only trigger save on single image as it is potentially primary image
  if (cardProduct) {
    // use "yield call" instead of "yield put" so no spinning icon on the Save button
    const updateBookletRowState = CardProductHelper.getUpdateBookletRowState({
      // @ts-ignore
      cardProductState: UndoHelper.recordUndoContentList({
        activeItem: cardProduct,
      }),
      frameContentItemId,
      pageIndex,
      rowId,
      rowData: image,
    })
    yield call(handleSaveCardProduct, {
      payload: {
        isShowNotification: false,
        product,
        cardProduct: updateBookletRowState.activeItem,
      },
    })
  }
}

function* handleRepopulatePrimaryImage(action: RepopulatePrimaryImageAction) {
  const {
    payload: {
      product,
      primaryImage,
      cardProduct,
      region,
      defaultThemeLayoutColumns,
      cardProductViewDisplayMode,
    },
  } = action
  if (cardProductViewDisplayMode !== CardProductViewDisplayMode.EDIT) {
    return
  }
  let hasPopulatePrimaryImage = false
  const genericProductMetadata = (cardProduct as IGenericCardProductData)
    ?.content?.metadata
  const newCardProductData: ICardProductData = {
    ...cardProduct,
    content: {
      ...cardProduct?.content!,
      pages: cardProduct?.content.pages.map((p: ICardProductPage) => {
        return {
          ...p,
          rows: p.rows.map((r: ICardProductRow) => {
            if (r.type === CardProductContentItemType.IMAGE) {
              if (
                r.data.imageType === ICardProductImageType.DEFAULT_THEME_IMAGE
              ) {
                hasPopulatePrimaryImage = true
                const {
                  height: adjustedImageHeight,
                  width: adjustedImageWidth,
                } = CardProductHelper.getImageSizeWithPresetHeight({
                  defaultPrimaryImageHeight: r.data.height,
                  genericProductMetadata,
                  defaultThemeLayoutColumns,
                  primaryImageHeight: primaryImage.height,
                  primaryImageWidth: primaryImage.width,
                  product,
                  region,
                })
                return {
                  ...r,
                  data: {
                    ...r.data,
                    filename: primaryImage.filename,
                    filepath: primaryImage.filepath,
                    filestackHandle: primaryImage.filestackHandle,
                    height: adjustedImageHeight,
                    width: adjustedImageWidth,
                    imageType: ICardProductImageType.PRIMARY_IMAGE, // set it to Current Image to ensure only populate once
                  },
                }
              }
            } else if (r.type === CardProductContentItemType.FRAME) {
              hasPopulatePrimaryImage = true
              const defaultContent =
                CardProductHelper.getDefaultDeceasedContentByThemeId({
                  product,
                  themeId: cardProduct.content.theme,
                  region,
                })!

              const newFrameContent =
                CardProductHelper.createPrimaryImageTemplateObject({
                  defaultPrimaryImage: defaultContent.primaryImage!,
                  product,
                  primaryImage,
                  defaultThemeLayoutColumns,
                  genericProductMetadata,
                  region,
                })
              console.log('newFrameContent', newFrameContent)
              return {
                ...r,
                data: {
                  ...r.data,
                  content: newFrameContent.content,
                  /*
                  content: CardProductFrameHelper.updateFrameItemPrimaryImage(
                    {
                      frameItem: r.data.content,
                      primaryImage,
                    },
                  ),
*/
                } as ICardProductFrameRowData,
              }
            }
            return r
          }),
        }
      })!,
    },
  }
  if (hasPopulatePrimaryImage) {
    yield put(saveCardProduct({ product, cardProduct: newCardProductData }))
  }
}

function* handleUpdateCardProductContentByContentItemId(
  action: UpdateCardProductContentByContentItemAction,
) {
  const {
    payload: {
      product,
      isAddToUndoList,
      contentItem,
      pageIndex,
      rowId,
      onSuccess,
      slug,
    },
  } = action
  try {
    const { activeItem: cardProduct } = yield select((s) =>
      StateHelper.getProductStateByProduct({ state: s, product, slug }),
    )
    const row = CardProductHelper.getRowByPagesAndRowId({
      pages: cardProduct.content.pages,
      rowId,
    }) as ICardProductFrameRow
    const newLayout = CardProductFrameHelper.getUpdatedLayoutFromNewContentItem(
      row?.data.content as ICardProductFrameLayout,
      contentItem,
    )
    yield put(
      updateCardProductContent({
        product,
        slug,
        pageIndex,
        rowId,
        isAddToUndoList,
        data: {
          ...cardProduct,
          content: newLayout,
        },
        onSuccess,
      }),
    )
  } catch (ex) {
    console.log('Exception', ex)
  }
}

function* handleUpdateCardProductContent(
  action: UpdateCardProductContentAction,
) {
  const {
    payload: {
      product,
      slug,
      pageIndex,
      data,
      newRows,
      type,
      rowId,
      isAddToUndoList,
      onSuccess,
      shouldUpdatePhotobookRowsAlignment,
      layoutId,
      isTitlePageLayout,
    },
  } = action
  try {
    if (
      product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
      slug === 'preview'
    ) {
      return
    }
    const { activeItem: cardProduct } = yield select((s) =>
      StateHelper.getProductStateByProduct({ state: s, product, slug }),
    )

    if (!cardProduct) {
      console.warn(
        'handleUpdateCardProductContent: No active card product found for',
        { product, slug },
      )
      return
    }

    const page = {
      ...cardProduct?.content.pages[pageIndex],
      ...(isTitlePageLayout !== undefined ? { isTitlePageLayout } : {}),
    }

    const updatedRows = newRows
      ? // only update rows
        newRows
      : page.rows
          .map((row: ICardProductRow) => {
            if (row.id === rowId) {
              if (!data) {
                return false
              }
              if (row.type === CardProductContentItemType.COLUMNS) {
                // @ts-ignore
                const dataItems = data.items
                return {
                  ...row,
                  data: {
                    items: (row as ICardProductColumnsRow).data.items.map(
                      (rowItem: ICardProductImageRow, rowItemIndex: number) => {
                        return {
                          data: {
                            ...rowItem.data,
                            ...dataItems[rowItemIndex].data,
                          },
                        }
                      },
                    ),
                  },
                }
              }
              return UtilHelper.mergeDeepRight(row, {
                data,
                type: type ?? row.type,
              })
            }

            return row
          })
          .filter(Boolean)

    const updatedPhotobookRows = shouldUpdatePhotobookRowsAlignment
      ? PhotobookHelper.getUpdatedPhotobookRows({
          rows: updatedRows,
          pageSize: cardProduct.content.pageSize,
        })
      : updatedRows
    const pages = CardProductHelper.updateCardProductPages({
      page,
      updatedRows: updatedPhotobookRows,
      cardProduct,
      pageIndex,
      layoutId,
    })

    console.log('fire update content success', { product, pages })
    yield put(
      updateContentSuccess({
        product,
        slug,
        pages,
        options: { pageIndex, isAddToUndoList },
        onSuccess,
      }),
    )
  } catch (ex) {
    console.error('Failed to update card product content', ex)
  }
}

function* handleUpdateCardProductContentSuccess(
  action: UpdateContentSuccessAction,
) {
  const {
    payload: { product, slug, pages, options, onSuccess },
  } = action
  const pageIndex = options?.pageIndex
  const isAddToUndoList = options?.isAddToUndoList ?? true
  yield put(
    cardProductAction({
      type: CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT_SUCCESS_COMPLETE,
      payload: pageIndex
        ? { pages, pageIndex, isAddToUndoList }
        : { pages, isAddToUndoList },
      product,
      slug,
    }),
  )
  const { activeItem: cardProduct } = yield select((s) =>
    CardProductHelper.getProductState({ currentState: s, product, slug }),
  )
  if (onSuccess) {
    onSuccess(cardProduct)
  }
}

function* setActiveCardProduct({
  activeCardProduct,
  themes,
  product,
  resourceName,
  region,
  genericProductTypes,
}: {
  activeCardProduct: ICardProductData
  themes: Array<ITheme>
  product: EulogiseProduct
  resourceName: string
  region: EulogiseRegion
  genericProductTypes: Array<IGenericCardProductTypeData>
}) {
  const themeId = activeCardProduct.content.theme
  const theme = ThemeHelper.getThemeById({ themes, themeId })
  if (product !== EulogiseProduct.PHOTOBOOK && !theme) {
    console.log('no theme found', resourceName, activeCardProduct.content.theme)
    return
  }

  const slug = (activeCardProduct as IGenericCardProductData)?.content?.metadata
    ?.slug

  const genericProductType = CardProductHelper.getGenericProductTypeBySlug({
    slug,
    genericProductTypes,
  })
  if (
    product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
    genericProductType === undefined
  ) {
    console.error('no generic product type', slug)
    return
  }
  const activeProductTheme =
    product === EulogiseProduct.PHOTOBOOK
      ? PHOTOBOOK_DEFAULT_THEME
      : (ThemeHelper.getProductThemeByProductType({
          theme,
          product,
          genericProductType,
          region,
        }) as ICardProductTheme)

  yield put({
    type: CardProductActionTypes.SET_ACTIVE_PRODUCT_THEME,
    payload: {
      productType: product,
      slug,
      region,
      activeProductTheme,
    },
  })
}

function* handleFetchAllProductsByCaseId(
  action: FetchAllProductsByCaseIdAction,
) {
  const {
    payload: { caseId, region, isShareFlow, complete, onFetchProductComplete },
  } = action
  /*
  const {
    data: { themes },
  } = yield RequestHelper.requestWithToken('/v2/themes')
*/
  try {
    const { themes: existingThemes } = yield select(
      (state: IEulogiseState) => state.themes,
    )
    const themes =
      !existingThemes || existingThemes?.length === 0
        ? // @ts-ignore
          (yield call(handleFetchThemes, {
            payload: {
              isShareFlow,
              caseId,
            },
          })).filter(Boolean)
        : existingThemes
    const { data } = yield RequestHelper[
      isShareFlow ? 'request' : 'requestWithToken'
    ](
      (isShareFlow
        ? EulogiseEndpoint.ALL_SHARE_RESOURCES
        : EulogiseEndpoint.ALL_RESOURCES
      ).replace(/\{caseId\}/, caseId),
      {
        method: 'POST',
        data: {
          resources: [
            EulogiseResource.BOOKLET,
            EulogiseResource.BOOKMARK,
            EulogiseResource.SIDED_CARD,
            EulogiseResource.THANK_YOU_CARD,
            EulogiseResource.TV_WELCOME_SCREEN,
            EulogiseResource.SLIDESHOW_TITLE_SLIDE,
            EulogiseResource.PHOTOBOOK,
            EulogiseResource.GENERIC_CARD_PRODUCT,
          ],
        },
      },
    )
    // delay the selecting of the genericProductTypes so that we have enough time for the request the return
    const { items: genericProductTypes } = yield select(
      (state: IEulogiseState) => state.genericCardProductTypes,
    )
    const resources: CaseResourcesSearchResponse = data

    yield put({
      type: CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID_SUCCESS,
      payload: {
        resources,
      },
    })

    for (const [resourceName, cardProducts] of Object.entries(resources)) {
      const product = CardProductHelper.getProductByResourceName(
        resourceName as EulogiseResource,
      )
      if (!product) {
        console.log(
          `product (resourceName: ${resourceName}}: ${product} not found`,
        )
        continue
      } else {
        console.log(
          `found product (${product}) by resource name (${resourceName})`,
        )
      }
      if (!cardProducts || cardProducts.length === 0) {
        console.log('no card products', resourceName)
        continue
      }
      if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
        for (const activeCardProduct of cardProducts) {
          yield setActiveCardProduct({
            activeCardProduct,
            themes,
            product,
            resourceName,
            region,
            genericProductTypes,
          })
        }
      } else {
        yield setActiveCardProduct({
          activeCardProduct: cardProducts[0],
          themes,
          product,
          resourceName,
          region,
          genericProductTypes,
        })
      }
    }
    yield put(fetchSlideshowsByCaseId({ caseId, isShareFlow }))

    if (onFetchProductComplete) {
      onFetchProductComplete()
    }
  } catch (ex) {
    console.error(`Error handleFetchAllProductsByCaseId`, caseId, ex)
    yield put({
      type: CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID_FAILED,
      payload: {},
    })
  }
  if (complete) {
    complete()
  }
}

function* handleClearPagesContentByPageIndexes(
  action: ClearPagesContentByPageIndexesAction,
) {
  const {
    payload: { product, newRowsData, cardProduct, blankPagesIndexes },
  } = action
  const slug = (cardProduct as IGenericCardProductData)?.content?.metadata?.slug
  const updatedPages = cardProduct.content.pages?.map(
    (page: ICardProductPage, index: number) => {
      if (blankPagesIndexes.includes(index)) {
        if (product === EulogiseProduct.PHOTOBOOK) {
          return CardProductHelper.clearPhotobookPage({
            page,
            product,
          })
        } else {
          return CardProductHelper.clearCardProductPage({
            page,
            newRowsData: newRowsData!,
          })
        }
      }
      return page
    },
  )
  yield put(updateContentSuccess({ product, slug, pages: updatedPages }))
}

function* handleChangeFrameByRowId(action: ChangeFrameByRowIdAction) {
  const {
    payload: {
      rowId,
      cardProduct,
      slug,
      framePageIndex,
      newLayoutData,
      product,
      pageContentWidth,
      shouldUpdatePhotobookRowsAlignment,
    },
  } = action
  const focusedRowContent = CardProductHelper.getCardProductRowByRowId(
    (cardProduct.content as ICardProductContent).pages,
    rowId,
  )
  const contentType = focusedRowContent?.type!
  const existingFrameRowData =
    focusedRowContent?.data as ICardProductFrameRowData
  const hasCaption = PhotobookHelper.hasCaptionRow(
    focusedRowContent as ICardProductFrameRow,
  )
  const oldLayout:
    | ICardProductFrameLayout
    | ICardProductImageRowData
    | undefined =
    contentType === CardProductContentItemType.FRAME
      ? {
          ...(existingFrameRowData.content as ICardProductFrameLayout),
          ...(product === EulogiseProduct.PHOTOBOOK
            ? {
                height: PhotobookHelper.getPhotobookContentSize({
                  pageSize: cardProduct.content?.pageSize,
                }).height,
              }
            : {}),
        }
      : contentType === CardProductContentItemType.IMAGE
      ? focusedRowContent?.data
      : undefined

  let newLayout = newLayoutData
  if (contentType === CardProductContentItemType.FRAME && oldLayout) {
    newLayout = CardProductFrameHelper.applyLayoutAssetsToNewLayout(
      oldLayout as ICardProductFrameLayout,
      newLayoutData,
    ) as ICardProductFrameLayout
  } else if (contentType === CardProductContentItemType.IMAGE) {
    const focusedRowContentContent =
      focusedRowContent?.data as ICardProductImageRowData
    const imageAsset: ICardProductFrameImageContent = {
      type: 'image',
      filename: focusedRowContentContent?.filename!,
      filepath: focusedRowContentContent?.filepath!,
      filestackHandle: focusedRowContentContent?.filestackHandle!,
    }

    newLayout = CardProductFrameHelper.assignImageAssetsToLayout(
      newLayoutData,
      [imageAsset],
    ) as ICardProductFrameLayout
  }
  const noOfPageCols =
    CardProductHelper.getNoOfDisplayPagesByCardProduct(cardProduct)

  const { newContentWidth, newContentHeight } =
    CardProductFrameHelper.calculateNewContentSizeOnAddingFrame({
      product,
      oldLayout,
      newLayout,
      pageContentWidth: pageContentWidth,
      hasCaption,
      noOfPageCols,
      pageSize: cardProduct.content?.pageSize,
    })

  yield put(
    updateCardProductContent({
      product,
      slug,
      pageIndex: framePageIndex!,
      rowId,
      data: {
        isFullWidth: newLayout.graphicFrame
          ? false
          : existingFrameRowData.isFullWidth,
        enableBorder: newLayout.graphicFrame
          ? // if new layout is a graphicFrame, remove the border
            false
          : existingFrameRowData.enableBorder,
        height: newContentHeight,
        content: {
          ...newLayout,
          lockAspectRatio: !!newLayout.lockAspectRatio,
          width: newContentWidth,
          height: newContentHeight,
          graphicFrame: newLayout.graphicFrame
            ? {
                // RESETGRAPHIC: reset graphic frame
                width: undefined,
                height: undefined,
                imageContainerHeight: undefined,
                imageContainerWidth: undefined,
                imageContainerTransform: undefined,
                ...newLayout.graphicFrame,
              }
            : undefined,
        },
      },
      type: CardProductContentItemType.FRAME,
      shouldUpdatePhotobookRowsAlignment,
    }),
  )
}

function* handleReplaceCardProductPageRows(
  action: ReplaceCardProductPageRowsAction,
) {
  const {
    payload: { rows, pageIndex, product, layoutId, slug, isTitlePageLayout },
  } = action
  const { activeItem: cardProduct } = yield select((s) =>
    StateHelper.getProductStateByProduct({ state: s, product, slug }),
  )

  const imageAssets = CardProductHelper.getImageAssetsByPage(
    cardProduct.content.pages[pageIndex],
  )
  yield put(
    updateCardProductContent({
      product,
      slug,
      layoutId,
      newRows: rows.map((r: ICardProductRow) => {
        // assign current frame image to the page layout frame image
        if (r.type === CardProductContentItemType.FRAME) {
          return {
            ...r,
            data: {
              ...r.data,
              content: CardProductFrameHelper.assignImageAssetsToLayout(
                r.data.content,
                imageAssets,
              ),
            },
          }
        }
        return r
      }) as Array<ICardProductRow>,
      pageIndex,
      isTitlePageLayout,
    }),
  )
}

function* handleCleanCardProductPageByIndex(
  action: CleanCardProductPageByIndexAction,
) {
  const {
    payload: { pageIndex, product, slug },
  } = action
  yield put(
    updateCardProductContent({
      product,
      slug,
      newRows: [],
      pageIndex,
    }),
  )
}

function* handleChangeToFrameLayoutFromPageLayout(
  action: ChangeToFrameLayoutFromPageLayoutAction,
) {
  const {
    payload: { pageIndex, product, frameContent, slug },
  } = action

  const { activeItem: cardProduct } = yield select((state) =>
    StateHelper.getProductStateByProduct({ state, product, slug }),
  )
  const imageAssets = CardProductHelper.getImageAssetsByPage(
    cardProduct.content.pages[pageIndex],
  )

  yield put(
    updateCardProductContent({
      product,
      slug,
      isTitlePageLayout: false,
      newRows: [
        PhotobookHelper.createPhotobookSingleFrameRow({
          frameContent: CardProductFrameHelper.assignImageAssetsToLayout(
            frameContent,
            imageAssets,
          ),
          pageSize: cardProduct?.content?.pageSize,
        }),
      ],
      pageIndex,
    }),
  )
}

const CARD_PRODUCT_STATE_KEYS: Array<{
  product: EulogiseProduct
  stateKey: keyof IEulogiseState
}> = [
  { product: EulogiseProduct.BOOKLET, stateKey: 'booklets' },
  { product: EulogiseProduct.BOOKMARK, stateKey: 'bookmarks' },
  { product: EulogiseProduct.SIDED_CARD, stateKey: 'sidedCards' },
  { product: EulogiseProduct.THANK_YOU_CARD, stateKey: 'thankYouCards' },
  { product: EulogiseProduct.TV_WELCOME_SCREEN, stateKey: 'tvWelcomeScreens' },
  { product: EulogiseProduct.PHOTOBOOK, stateKey: 'photobooks' },
  {
    product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
    stateKey: 'slideshowTitleSlides',
  },
]

function getActiveCardProducts(state: IEulogiseState): Array<{
  product: EulogiseProduct
  slug?: string
  cardProduct: ICardProductData
}> {
  const results: Array<{
    product: EulogiseProduct
    slug?: string
    cardProduct: ICardProductData
  }> = []

  for (const { product, stateKey } of CARD_PRODUCT_STATE_KEYS) {
    const productState = state[stateKey] as ICardProductState
    const cardProduct = productState?.activeItem as ICardProductData | undefined
    if (cardProduct?.content?.pages) {
      results.push({ product, cardProduct })
    }
  }

  const genericCardProductsState =
    state.genericCardProducts as IGenericCardProductsState
  if (genericCardProductsState?.productsState) {
    for (const [slug, productState] of Object.entries(
      genericCardProductsState.productsState,
    )) {
      const cardProduct = productState?.activeItem as
        | ICardProductData
        | undefined
      if (cardProduct?.content?.pages) {
        results.push({
          product: EulogiseProduct.GENERIC_CARD_PRODUCT,
          slug,
          cardProduct,
        })
      }
    }
  }

  return results
}

function* handleSaveAssetSuccess(action: {
  type: string
  payload: {
    type?: string
    image?: IImageAsset
    oldFilestackHandle?: string
  }
}) {
  const { image, oldFilestackHandle } = action.payload
  if (!image?.content) {
    return
  }
  const filestackHandle = oldFilestackHandle ?? image.content.filestackHandle
  if (!filestackHandle) {
    return
  }

  const updatedContent: IImageAssetContent = image.content

  const state: IEulogiseState = yield select((s: IEulogiseState) => s)
  const activeCardProducts = getActiveCardProducts(state)

  for (const { product, slug, cardProduct } of activeCardProducts) {
    const updatedPages = CardProductHelper.replaceImageContentInPages({
      pages: cardProduct.content.pages,
      oldFilestackHandle,
      newImageContent: updatedContent,
    })
    for (const updatedPage of updatedPages) {
      yield put(
        updateCardProductContent({
          product,
          slug,
          pageIndex: updatedPage.pageIndex,
          newRows: updatedPage.rows,
        }),
      )
    }
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(
    CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID,
    handleFetchCardProductsByCaseId,
  )
  yield takeEvery(
    CardProductActionTypes.UPDATE_CARD_PRODUCT_BY_IMAGE_ID,
    handleUpdateCardProductImageById,
  )
  yield takeEvery(
    CardProductActionTypes.SAVE_CARD_PRODUCT,
    handleSaveCardProduct,
  )
  yield takeEvery(
    CardProductActionTypes.UPSERT_CARD_PRODUCT_BY_CASE_ID,
    handleUpsertCardProductByCaseId,
  )
  yield takeEvery(
    CardProductActionTypes.DOWNLOAD_CARD_PRODUCT_BY_CASE_ID,
    handleDownloadCardProductByCaseId,
  )
  yield takeEvery(
    CardProductActionTypes.CREATE_CARD_PRODUCT_BY_CASE_ID,
    handleCreateCardProductByCaseId,
  )
  yield takeEvery(
    CardProductActionTypes.UPDATE_CARD_PRODUCT_BACKGROUND_PAGES_IMAGE,
    handleUpdateCardProductBackgroundPagesImage,
  )
  yield takeEvery(
    CardProductActionTypes.UPDATE_PAGE_BACKGROUND_OVERLAY,
    handleUpdatePageBackgroundOverlay,
  )
  yield takeEvery(
    CardProductActionTypes.GENERATE_CARD_PRODUCT,
    handleGenerateCardProduct,
  )
  yield takeEvery(
    CardProductActionTypes.ADD_CARD_PRODUCT_PAGES,
    handleAddCardProductPages,
  )
  yield takeEvery(
    CardProductActionTypes.REMOVE_CARD_PRODUCT_PAGES,
    handleRemoveCardProductPages,
  )
  yield takeEvery(
    CardProductActionTypes.ADD_CARD_PRODUCT_PAGE_ROW,
    handleAddCardProductPageRow,
  )
  yield takeLeading(
    CardProductActionTypes.TOGGLE_TEXT_CARD_PRODUCT_ROW,
    handleToggleTextCardProductRow,
  )
  yield takeEvery(
    CardProductActionTypes.CLEANUP_CARD_PRODUCT_EMPTY_ROWS,
    handleCleanupCardProductEmptyRows,
  )
  yield takeEvery(
    CardProductActionTypes.DELETE_CARD_PRODUCT_ROW,
    handleDeleteCardProductRow,
  )
  yield takeEvery(
    CardProductActionTypes.DUPLICATE_CARD_PRODUCT_ROW,
    handleDuplicateCardProductRow,
  )
  yield takeEvery(
    CardProductActionTypes.MOVE_CARD_PRODUCT_CONTENT_TO_PAGE,
    handleMoveCardProductContentToPage,
  )
  yield takeEvery(
    CardProductActionTypes.REORDER_CARD_PRODUCT_PAGE_ROWS,
    handleReorderCardProductPageRows,
  )
  yield takeEvery(
    CardProductActionTypes.RESET_ALL_CARD_PRODUCT_STATE,
    handleResetAllCardProductState,
  )
  yield takeEvery(
    CardProductActionTypes.APPLY_THEME_TO_PRODUCT,
    handleApplyThemeToProduct,
  )
  yield takeEvery(
    CardProductActionTypes.APPLY_THEME_TO_ALL_PRODUCTS,
    handleApplyThemeToAllProducts,
  )
  yield takeEvery(
    CardProductActionTypes.UPDATE_CARD_PRODUCT_SPACE_ASSET_BY_ROW_ID,
    handleUpdateCardProductSpaceAssetByRowId,
  )
  yield takeEvery(
    CardProductActionTypes.UPDATE_CARD_PRODUCT_IMAGE,
    handleUpdateCardProductImage,
  )
  yield takeEvery(
    CardProductActionTypes.REPOPULATE_PRIMARY_IMAGE,
    handleRepopulatePrimaryImage,
  )
  yield takeEvery(
    CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT,
    handleUpdateCardProductContent,
  )
  yield takeEvery(
    CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT_SUCCESS,
    handleUpdateCardProductContentSuccess,
  )
  yield takeEvery(
    CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID,
    handleFetchAllProductsByCaseId,
  )
  yield takeLeading(
    CardProductActionTypes.CLEAR_PAGES_CONTENT_BY_PAGE_INDEXES,
    handleClearPagesContentByPageIndexes,
  )
  yield takeEvery(
    CardProductActionTypes.CHANGE_FRAME_BY_ROW_ID,
    handleChangeFrameByRowId,
  )
  yield takeEvery(
    CardProductActionTypes.REPLACE_CARD_PRODUCT_PAGE_ROWS,
    handleReplaceCardProductPageRows,
  )
  yield takeEvery(
    CardProductActionTypes.CLEAN_CARD_PRODUCT_PAGE_BY_INDEX,
    handleCleanCardProductPageByIndex,
  )
  yield takeEvery(
    CardProductActionTypes.CHANGE_TO_FRAME_LAYOUT_FROM_PAGE_LAYOUT,
    handleChangeToFrameLayoutFromPageLayout,
  )
  yield takeEvery(AssetActionTypes.SAVE_ASSET_SUCCESS, handleSaveAssetSuccess)
  yield takeEvery(
    AssetActionTypes.SAVE_ASSET_SUCCESS_WITH_INSERT_INDEX,
    handleSaveAssetSuccess,
  )
}

function* updateContentWatcher() {
  // Create a channel to queue actions
  const requestChannel: Channel<UpdateCardProductContentAction> =
    yield actionChannel(
      CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT_BY_CONTENT_ITEM,
    )

  while (true) {
    // Wait for the next action from the channel
    const action: UpdateCardProductContentAction = yield take(requestChannel)

    // Process the action (serially)
    yield call(handleUpdateCardProductContentByContentItemId, action)
  }
}

export const CardProductSagas = [watchers(), updateContentWatcher()]
