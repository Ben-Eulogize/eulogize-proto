import React, { useEffect, useState } from 'react'
import { WindowLocation } from '@reach/router'
import Layout from './Layout'
import {
  AssetHelper,
  CardProductFrameHelper,
  ImageHelper,
  UrlHelper,
  UtilHelper,
} from '@eulogise/helpers'
import { PhotobookHelper } from '../../../../../eulogise-helpers/src/PhotobookHelper'
import { CardProductHelper } from '../../../../../eulogise-helpers/src/CardProductHelper'
import { SortableCardProductWithPagination } from '../CardProduct/CardProductWithPagination'
import {
  CardProductContentItemType,
  CardProductViewDisplayMode,
  EulogiseProduct,
  EulogiseRegion,
  EulogiseUserRole,
  GetImageObject,
  GUIDE_SHOW_UP_PAGE,
  IAssetState,
  IAuthState,
  ICardProductContent,
  ICardProductData,
  ICardProductDividerName,
  ICardProductFrameContentItem,
  ICardProductFrameImageContent,
  ICardProductFrameRowData,
  ICardProductIconName,
  ICardProductImageRowData,
  ICardProductRow,
  ICardProductRowData,
  ICardProductState,
  ICardProductTheme,
  ICardProductViewType,
  IClientState,
  IGenericCardProductData,
  IGenericCardProductTypeData,
  IImageAsset,
  IImageAssetContent,
  IModalState,
  ISelectDividerAssetModalOption,
  ISelectIconAssetModalOption,
  IUserGuideHelperConfig,
  ModalId,
  OnSortEndType,
} from '@eulogise/core'
import {
  useAssetState,
  useAuthState,
  useProductState,
  useCaseState,
  useClientState,
  useEulogiseDispatch,
  useModalState,
} from '../../store/hooks'
import {
  addCardProductPageRow,
  cleanupCardProductUndoHistory,
  fetchCardProductsByCaseId,
  updateCardProductContent,
  updateCardProductDividerAssetByRowIdAction,
  updateCardProductPages,
  updateCardProductIconAssetByRowIdAction,
  updateCardProductImage,
  updateCardProductImageById,
} from '../../store/CardProduct/actions'
import {
  showMemorialDataPullFormModal,
  showModalAction,
} from '../../store/ModalState/actions'
import { showGuide } from '../../store/GuideWalkThroughState/action'
import { IChangeImageEvent } from '@eulogise/client-components'
import { collapseSiderMenu } from '../../store/SiderMenuState/action'
import {
  fetchSlideshowsByCaseId,
  updateTimelineUploadImagePanelCollapsed,
} from '../../store/SlideshowState/actions'
import {
  fetchBrandAssetsByClientId,
  saveImage,
} from '../../store/AssetState/actions'
import { SortableCardProductSpreadView } from '../CardProduct/CardProductSpreadView'
import { DEFAULT_CARD_PRODUCT_IMAGE_OPTIONS } from '@eulogise/helpers/dist/cardProduct.constants'

interface ICardProductPageLayoutProps {
  location: WindowLocation
  product: EulogiseProduct
  slug?: string
  genericProductType?: IGenericCardProductTypeData
}

const CardProductPageLayout: React.FunctionComponent<
  ICardProductPageLayoutProps
> = ({ location, product, slug, genericProductType }) => {
  const [pageCursor, setPageCursor] = useState<number>(
    product === EulogiseProduct.PHOTOBOOK ? 1 : 0,
  )
  const [isShowBorderSettingModal, setIsShowBorderSettingModal] =
    useState<boolean>(false)
  const [isShowOverlaySettingModal, setIsShowOverlaySettingModal] =
    useState<boolean>(false)
  const [
    isShowRemoveCardProductPagesModal,
    setIsShowRemoveCardProductPagesModal,
  ] = useState<boolean>(false)
  const [viewType, setViewType] = useState<ICardProductViewType>(
    ICardProductViewType.EDITOR_VIEW,
  )

  const [updateSpacePageIndex, setUpdateSpacePageIndex] = useState<
    number | null
  >(null)

  const [bookletMagnifierSliderValue, setBookletMagnifierSliderValue] =
    useState<number>(0)

  const dispatch = useEulogiseDispatch()
  const [isDraggingImageLibraryItem, setIsDraggingImageLibraryItem] =
    useState<boolean>(false)
  const { applyThemeTo } = UrlHelper.getQueryParams(location.search)
  const { activeItem: activeCase } = useCaseState()
  const caseId: string = activeCase?.id!
  const region: EulogiseRegion = activeCase?.region ?? EulogiseRegion.AU
  const {
    activeItem: activeCardProduct,
    activeProductTheme,
    isFetching,
  } = useProductState({ product, slug }) as ICardProductState
  const { activeItem: activeClient }: IClientState = useClientState()
  const clientId = activeClient?.id
  const productName = CardProductHelper.getProductName({
    genericProductType,
    product,
    region,
  })
  const displayCardProduct = activeCardProduct
    ? product === EulogiseProduct.PHOTOBOOK
      ? PhotobookHelper.getPreviewPhotobookData(
          activeCardProduct as ICardProductData,
        )
      : (activeCardProduct as ICardProductData)
    : null

  const hasSkippedOrFilledMemorialDataPullForm =
    activeCase?.deceased?.hasSkippedOrFilledMemorialDataPullForm

  const cardProductId: string = displayCardProduct?.id!

  const { images }: IAssetState = useAssetState()

  const modalState: IModalState = useModalState()
  const { openModalIds } = modalState
  const isDynamicDataPullingFormOpening: boolean =
    openModalIds?.includes(ModalId.MEMORIAL_DATA_PULL) ?? false

  const [isShowImageLibrary, setIsShowImageLibrary] = useState<boolean>(false)
  const [currentPageIndex, setCurrentPageIndex] = useState<number>()
  const [selectedFrameContentItemId, setOriginalSelectedFrameContentItemId] =
    useState<string>()
  const [focusedRowId, setFocusedRowIdOriginal] = useState<string | undefined>(
    undefined,
  )
  const [updatingImageDetails, setUpdatingImageDetails] =
    useState<IChangeImageEvent>()
  const [framePageIndex, setFramePageIndex] = useState<number>()
  const [selectedRow, setSelectedRow] = useState<ICardProductRow | undefined>(
    undefined,
  )

  const [isShowSpaceAssetModal, setIsShowSpaceAssetModal] =
    useState<boolean>(false)

  const { account }: IAuthState = useAuthState()
  const role = account?.role
  const userGuideHelperConfig: IUserGuideHelperConfig | undefined =
    account?.userGuideHelperConfig

  const isEditorOrCoEditorRole: boolean =
    role === EulogiseUserRole.COEDITOR || role === EulogiseUserRole.EDITOR
  const hasViewedBookletGuide = userGuideHelperConfig?.hasViewedBooklet ?? false

  const isInsertBrandModalOpened: boolean =
    openModalIds?.includes(ModalId.INSERT_BRAND) ?? false

  const onBookletMagnifierSliderChange = (value: number) => {
    if (isNaN(value) || value < 0 || value > 100) {
      return
    }
    setBookletMagnifierSliderValue(value)
  }

  const setSelectedFrameContentItemId = (
    contentItemId: string | undefined,
    rowId?: string,
    filestackHandle?: string,
    pageIndex?: number,
    openImageLibrary: boolean = true,
  ) => {
    setFocusedRowId(rowId)
    setOriginalSelectedFrameContentItemId(contentItemId)
    if (contentItemId /*&& openImageLibrary*/) {
      onChangeImageClick({
        frameContentItemId: contentItemId,
        product,
        pageIndex,
        rowId,
        filestackHandle,
      })
    }
  }

  const setFocusedRowId = (
    rowId: string | undefined,
    autoSelectFirstContentId: boolean = false,
    pageIndex?: number,
  ) => {
    setCurrentPageIndex(pageIndex)
    setFocusedRowIdOriginal(rowId)
    if (!rowId) {
      return
    }
    const cardProductRow = CardProductHelper.getCardProductRowByRowId(
      (displayCardProduct?.content as ICardProductContent).pages,
      rowId,
    )

    setSelectedRow(cardProductRow)
    // auto select the first content of the frame
    if (
      autoSelectFirstContentId &&
      cardProductRow?.type === CardProductContentItemType.FRAME
    ) {
      const firstContentItemId =
        CardProductHelper.getFirstFrameContentIdByRowId(
          displayCardProduct!,
          rowId,
        )
      let firstContentItem: ICardProductFrameContentItem | undefined = undefined
      if (firstContentItemId) {
        firstContentItem = CardProductFrameHelper.getFrameContentById(
          cardProductRow.data.content,
          firstContentItemId,
        )
      }
      setSelectedFrameContentItemId(
        firstContentItemId,
        rowId,
        (firstContentItem?.content as ICardProductFrameImageContent)
          ?.filestackHandle,
        pageIndex,
        false,
      )
    }
  }

  const handleUpdateRowEvent = (
    event: IChangeImageEvent,
    { getNewRowData }: { getNewRowData: (rowData: ICardProductRowData) => any },
  ) => {
    const { product, pageIndex, rowId } = event
    if (!rowId) {
      console.error(
        'CardProductPageLayout > handleUpdateRowEvent - missing rowId',
      )
      return
    }
    const cardProductRow = CardProductHelper.getCardProductRowByRowId(
      (displayCardProduct?.content as ICardProductContent).pages,
      rowId,
    )
    if (
      !cardProductRow ||
      (cardProductRow.type !== CardProductContentItemType.IMAGE &&
        cardProductRow.type !== CardProductContentItemType.FRAME)
    ) {
      return
    }

    const rowData = cardProductRow.data as ICardProductImageRowData
    const updatedData = {
      ...rowData,
      ...getNewRowData(rowData),
    }

    dispatch(
      updateCardProductContent({
        product: product!,
        pageIndex: pageIndex!,
        rowId,
        data: updatedData,
        type: cardProductRow.type as CardProductContentItemType,
        isAddToUndoList: true,
        slug,
      }),
    )
  }

  const onToggleImageBorderClick = (ev: IChangeImageEvent) => {
    handleUpdateRowEvent(ev, {
      getNewRowData: (rowData: ICardProductRowData) => ({
        enableBorder: !Boolean(
          (rowData as ICardProductImageRowData).enableBorder,
        ),
      }),
    })
  }

  const onToggleFadeImageClick = (ev: IChangeImageEvent) => {
    handleUpdateRowEvent(ev, {
      getNewRowData: (rowData: ICardProductRowData) => ({
        enableFadeImage: !Boolean(
          (rowData as ICardProductImageRowData).enableFadeImage,
        ),
      }),
    })
  }

  const onTransparencyChange = (
    ev: IChangeImageEvent & { opacity: number },
  ) => {
    handleUpdateRowEvent(ev, {
      getNewRowData: () => ({
        opacity: ev.opacity,
      }),
    })
  }

  const onEnhanceImageClick = ({ filestackHandle }: IChangeImageEvent) => {
    if (!filestackHandle) return
    const image = images?.find(
      (i: IImageAsset) => i?.content?.filestackHandle === filestackHandle,
    )
    if (!image) return
    const updatedImage = AssetHelper.toggleEnhanceImagePreset(image)
    dispatch(
      saveImage({
        file: updatedImage,
      }),
    )
  }

  const onBgRemoverClick = ({ filestackHandle }: IChangeImageEvent) => {
    if (!filestackHandle) return
    const image = images?.find(
      (i: IImageAsset) => i?.content?.filestackHandle === filestackHandle,
    )
    if (!image) return
    const originPhotoIndex = images?.findIndex(
      (i: IImageAsset) => i?.content?.filestackHandle === filestackHandle,
    )
    dispatch(
      showModalAction(ModalId.REMOVE_IMAGE_BACKGROUND, {
        assetId: image.id,
        assetFilestackHandle: filestackHandle,
        removingImageBackgroundImageIndex: originPhotoIndex,
      }),
    )
  }

  const onChangeImageClick = ({
    columnIndex,
    slug,
    frameContentItemId,
    product,
    pageIndex,
    rowId,
    filestackHandle,
  }: IChangeImageEvent) => {
    setIsShowImageLibrary(true)
    setCurrentPageIndex(pageIndex)
    setUpdatingImageDetails({
      columnIndex,
      frameContentItemId,
      product,
      slug,
      pageIndex,
      rowId,
      filestackHandle,
    })
    dispatch(updateTimelineUploadImagePanelCollapsed(false))
  }

  const dispatchAddRow = ({
    product,
    type,
    productTheme,
    options,
    pageIndex,
  }: {
    product: EulogiseProduct
    type: CardProductContentItemType
    productTheme: ICardProductTheme
    options: any
    pageIndex: number
  }) => {
    dispatch(
      addCardProductPageRow({
        product,
        slug,
        genericProductMetadata: (activeCardProduct as IGenericCardProductData)
          ?.content?.metadata,
        type,
        productTheme,
        options,
        pageIndex,
        success: (row: ICardProductRow) => {
          if (type === CardProductContentItemType.FRAME) {
            // wait for the row added to displayCardProduct variable, otherwise, won't be able to find the first content id
            setFocusedRowId(row.id)
            const contentItemId = CardProductFrameHelper.getFirstContentId(
              (row.data as ICardProductFrameRowData).content,
            )
            setSelectedFrameContentItemId(
              contentItemId,
              row.id,
              undefined,
              pageIndex,
            )
          } else if (
            type === CardProductContentItemType.IMAGE ||
            type === CardProductContentItemType.COLUMNS
          ) {
            setFocusedRowId(row.id)
            const maxImages: number = options?.subType || 1
            if (type === CardProductContentItemType.COLUMNS) {
              onChangeImageClick({
                product,
                pageIndex,
                rowId: row.id,
                columnIndex: 0,
                maxImages,
              })
            } else if (type === CardProductContentItemType.IMAGE) {
              // insert brand
              if (options?.content && maxImages === 1) {
                const imageContent = {
                  ...options?.content,
                  filename: options?.content?.filename,
                  filepath: options?.content?.filepath,
                  filestackHandle: options?.content?.filestackHandle,
                  isClientBrandImage: options?.content?.isClientBrandImage,
                }
                dispatch(
                  updateCardProductImage({
                    product,
                    slug,
                    pageIndex,
                    rowId: row.id!,
                    columnIndex: undefined!,
                    image: imageContent,
                  }),
                )
                return
              } else {
                onChangeImageClick({
                  product,
                  slug,
                  pageIndex,
                  rowId: row.id,
                  maxImages,
                })
                setTimeout(() => {
                  const pageContentWidth =
                    CardProductHelper.getPageWidthByCardProduct({
                      cardProduct: displayCardProduct!,
                    })
                  const dummyImage = CardProductHelper.getDummyImage(
                    pageContentWidth,
                    maxImages,
                  )
                  UtilHelper.times((index: number) => {
                    dispatch(
                      updateCardProductImage({
                        product,
                        slug,
                        pageIndex,
                        rowId: row.id!,
                        columnIndex: (maxImages === 1 ? undefined : index)!,
                        //images?.[index].content, //mFMLqO1RSYylJwRWp5Rx
                        image: dummyImage as IImageAssetContent,
                      }),
                    )
                  }, maxImages)
                }, 100)
                return
              }
            }
          } else if (type === CardProductContentItemType.TEXT) {
            setFocusedRowId(row.id)
          }
        },
      }),
    )
  }

  const onAddRowClick = ({
    product,
    type,
    productTheme,
    options,
    pageIndex,
  }: {
    product: EulogiseProduct
    type: CardProductContentItemType
    productTheme: ICardProductTheme
    options: any
    pageIndex: number
  }) => {
    if (type === CardProductContentItemType.FRAME) {
      setFramePageIndex(pageIndex)
      return
    }
    dispatchAddRow({
      product,
      type,
      productTheme,
      options: {
        ...options,
        region,
      },
      pageIndex,
    })
  }

  useEffect(() => {
    if (!displayCardProduct) {
      dispatch(
        fetchCardProductsByCaseId({
          product,
          genericProductType,
          caseId,
          region,
        }),
      )
      // for CardProductEditorHeader - Tribute QR Code button
      dispatch(fetchSlideshowsByCaseId({ caseId }))
    }
  }, [displayCardProduct])

  useEffect(() => {
    if (
      product !== EulogiseProduct.PHOTOBOOK &&
      displayCardProduct &&
      !hasSkippedOrFilledMemorialDataPullForm &&
      cardProductId &&
      !isDynamicDataPullingFormOpening
    ) {
      dispatch(
        showMemorialDataPullFormModal({
          product: (applyThemeTo as EulogiseProduct) || product,
          slug,
          id: cardProductId,
        }),
      )
    }
  }, [hasSkippedOrFilledMemorialDataPullForm, displayCardProduct])

  useEffect(() => {
    return () => {
      dispatch(cleanupCardProductUndoHistory({ product, slug }))
      dispatch(collapseSiderMenu())
    }
  }, [])

  useEffect(() => {
    ImageHelper.preloadImages({
      imageAssets: images
        ?.map((image: IImageAsset) => {
          if (!image.content?.filestackHandle) {
            return null
          }
          return {
            filestackHandle: image.content.filestackHandle,
          } as GetImageObject
        })
        .filter(Boolean) as Array<GetImageObject>,
      progress: () => {},
      loaded: () => {},
      imageOptions: DEFAULT_CARD_PRODUCT_IMAGE_OPTIONS,
    })
  }, [images])

  useEffect(() => {
    if (
      !hasViewedBookletGuide &&
      product === EulogiseProduct.BOOKLET &&
      isEditorOrCoEditorRole &&
      hasSkippedOrFilledMemorialDataPullForm
    ) {
      dispatch(showGuide(GUIDE_SHOW_UP_PAGE.BOOKLET, 0, false))
    }
  }, [])

  useEffect(() => {
    if (clientId) {
      dispatch(fetchBrandAssetsByClientId({ clientId }))
    }
  }, [clientId])

  if (!displayCardProduct) {
    return null
  }

  const onChangeDividerClick = (params: {
    pageIndex: number
    rowId: string
    dividerName: ICardProductDividerName
    color: string
  }) => {
    const { pageIndex, rowId, color, dividerName } = params
    dispatch(
      showModalAction(ModalId.DIVIDER_ASSET, {
        pageIndex,
        rowId,
        dividerName,
        color,
        onConfirm: ({ divider, color }) => {
          dispatch(
            updateCardProductDividerAssetByRowIdAction({
              product,
              slug,
              rowId,
              pageIndex,
              divider: divider.id as ICardProductDividerName,
              color,
            }),
          )
          setFocusedRowId(rowId)
        },
      } as ISelectDividerAssetModalOption),
    )
  }

  const onChangeIconClick = (params: {
    pageIndex: number
    rowId: string
    iconName: ICardProductIconName
    color: string
  }) => {
    const { pageIndex, rowId, color, iconName } = params
    dispatch(
      showModalAction(ModalId.ICON_ASSET, {
        pageIndex,
        rowId,
        iconName,
        color,
        onConfirm: ({ icon, color }) => {
          dispatch(
            updateCardProductIconAssetByRowIdAction({
              product,
              slug,
              rowId,
              pageIndex,
              icon: icon.id,
              color,
            }),
          )
          setFocusedRowId(rowId)
        },
      } as ISelectIconAssetModalOption),
    )
  }

  const onAddIconAssetClick = (pageIndex: number) => {
    dispatch(
      showModalAction(ModalId.ICON_ASSET, {
        pageIndex,
        onConfirm: ({ icon, color }) => {
          dispatch(
            addCardProductPageRow({
              product,
              slug,
              genericProductMetadata: (
                activeCardProduct as IGenericCardProductData
              )?.content?.metadata,
              type: CardProductContentItemType.ICON,
              productTheme: activeProductTheme!,
              options: { region, content: undefined },
              pageIndex,
              success: (row: ICardProductRow) => {
                if (!row) {
                  return
                }
                dispatch(
                  updateCardProductIconAssetByRowIdAction({
                    product,
                    slug,
                    rowId: row.id!,
                    pageIndex,
                    icon: icon.id,
                    color,
                  }),
                )
                setFocusedRowId(row.id)
              },
            }),
          )
        },
      } as ISelectIconAssetModalOption),
    )
  }

  const onAddDividerAssetClick = (pageIndex: number) => {
    dispatch(
      showModalAction(ModalId.DIVIDER_ASSET, {
        pageIndex,
        onConfirm: ({ divider, color }: any) => {
          dispatch(
            addCardProductPageRow({
              product,
              slug,
              genericProductMetadata: (
                activeCardProduct as IGenericCardProductData
              )?.content?.metadata,
              type: CardProductContentItemType.SPACE,
              productTheme: activeProductTheme!,
              options: { region, content: undefined },
              pageIndex,
              success: (row: ICardProductRow) => {
                if (!row) {
                  return
                }
                dispatch(
                  updateCardProductDividerAssetByRowIdAction({
                    product,
                    slug,
                    rowId: row.id!,
                    pageIndex,
                    divider: divider.id,
                    color,
                  }),
                )
                setFocusedRowId(row.id)
              },
            }),
          )
        },
      } as ISelectIconAssetModalOption),
    )
  }

  return (
    <Layout
      noPadding
      selectedRow={selectedRow!}
      title={productName}
      location={location}
      pageCursor={pageCursor}
      setPageCursor={setPageCursor}
      setIsShowBorderSettingModal={setIsShowBorderSettingModal}
      setIsShowRemoveCardProductPagesModal={
        setIsShowRemoveCardProductPagesModal
      }
      onAddIconAssetClick={onAddIconAssetClick}
      onAddDividerAssetClick={onAddDividerAssetClick}
      onOverlayOptionClick={() => setIsShowOverlaySettingModal(true)}
      onAddRowClick={onAddRowClick}
      setIsShowSpaceAssetModal={setIsShowSpaceAssetModal}
      setUpdateSpacePageIndex={setUpdateSpacePageIndex}
      setFocusedRowId={setFocusedRowId}
      bookletMagnifierSliderValue={bookletMagnifierSliderValue}
      onBookletMagnifierSliderChange={onBookletMagnifierSliderChange}
      viewType={viewType}
      onViewTypeChange={(vt) => {
        setViewType(vt)
      }}
    >
      {viewType === ICardProductViewType.EDITOR_VIEW ? (
        <SortableCardProductWithPagination
          product={product as EulogiseProduct}
          slug={slug}
          genericProductType={genericProductType}
          useDragHandle
          onAddIconAssetClick={onAddIconAssetClick}
          onAddDividerAssetClick={onAddDividerAssetClick}
          cardProduct={displayCardProduct as ICardProductData}
          isDraggingImageLibraryItem={isDraggingImageLibraryItem}
          isDraggableImageLibraryItem={false}
          onSortStart={(ev: any) => {}}
          onSortEnd={({ oldIndex }: OnSortEndType, ev: any) => {
            const imageIndex: number = oldIndex - 1
            const image: IImageAsset = images?.[imageIndex]!
            if (image) {
              const contentId = ev.target.id
              if (updatingImageDetails?.frameContentItemId === contentId) {
                setUpdatingImageDetails({
                  ...updatingImageDetails,
                  product,
                  filestackHandle: image.content.filestackHandle,
                })
              }
              dispatch(
                updateCardProductImageById({
                  contentId,
                  product,
                  imageContent: image.content,
                  slug,
                }),
              )
            } else {
              console.log('image not found', images, imageIndex)
            }
          }}
          onSortMove={(ev: any) => {
            setIsDraggingImageLibraryItem(true)
          }}
          displayMode={CardProductViewDisplayMode.EDIT}
          isFetching={isFetching}
          hasSkippedOrFilledMemorialDataPullForm={
            hasSkippedOrFilledMemorialDataPullForm
          }
          onChangeIconClick={onChangeIconClick}
          onChangeDividerClick={onChangeDividerClick}
          pageCursor={pageCursor}
          onPageChange={(pc: number) => setPageCursor(pc)}
          isShowBorderSettingModal={isShowBorderSettingModal}
          setIsShowBorderSettingModal={setIsShowBorderSettingModal}
          isShowOverlaySettingModal={isShowOverlaySettingModal}
          onIsShowOverlaySettingModalChange={(isShow: boolean) =>
            setIsShowOverlaySettingModal(isShow)
          }
          isShowRemoveCardProductPagesModal={isShowRemoveCardProductPagesModal}
          setIsShowRemoveCardProductPagesModal={
            setIsShowRemoveCardProductPagesModal
          }
          isShowImageLibrary={isShowImageLibrary}
          onIsShowImageLibrary={setIsShowImageLibrary}
          currentPageIndex={currentPageIndex}
          selectedFrameContentItemId={selectedFrameContentItemId}
          updatingImageDetails={updatingImageDetails}
          onUpdatingImageDetails={setUpdatingImageDetails}
          onSelectedFrameContentItemId={setSelectedFrameContentItemId}
          setFocusedRowId={setFocusedRowId}
          onEnhanceImageClick={onEnhanceImageClick}
          onBgRemoverClick={onBgRemoverClick}
          onToggleImageBorderClick={onToggleImageBorderClick}
          onToggleFadeImageClick={onToggleFadeImageClick}
          onTransparencyChange={onTransparencyChange}
          onChangeImageClick={onChangeImageClick}
          dispatchAddRow={dispatchAddRow}
          focusedRowId={focusedRowId}
          framePageIndex={framePageIndex}
          setFramePageIndex={setFramePageIndex}
          onAddRowClick={onAddRowClick}
          isShowSpaceAssetModal={isShowSpaceAssetModal}
          setIsShowSpaceAssetModal={setIsShowSpaceAssetModal}
          setUpdateSpacePageIndex={setUpdateSpacePageIndex}
          updateSpacePageIndex={updateSpacePageIndex}
          bookletMagnifierSliderValue={bookletMagnifierSliderValue}
          onBookletMagnifierSliderChange={onBookletMagnifierSliderChange}
          isInsertBrandModalOpened={isInsertBrandModalOpened}
        />
      ) : (
        <SortableCardProductSpreadView
          product={product as EulogiseProduct}
          cardProduct={displayCardProduct}
          axis="xy"
          magnifierSliderValue={bookletMagnifierSliderValue}
          isShowRemoveCardProductPagesModal={isShowRemoveCardProductPagesModal}
          setIsShowRemoveCardProductPagesModal={
            setIsShowRemoveCardProductPagesModal
          }
          onItemDoubleClick={(pageCursor: number) => {
            setPageCursor(pageCursor)
            setViewType(ICardProductViewType.EDITOR_VIEW)
          }}
          onSortEnd={({
            oldIndex: oldSpreadPageIndex,
            newIndex: newSpreadPageIndex,
          }: OnSortEndType) => {
            const oldPageIndex = oldSpreadPageIndex * 2 - 1
            const newPageIndex = newSpreadPageIndex * 2 - 1
            const pages = UtilHelper.arrayMoveMultiple(
              activeCardProduct?.content?.pages!,
              oldPageIndex,
              newPageIndex,
              2, // 2 pages per spread view
            )
            dispatch(
              updateCardProductPages({
                product,
                pages,
              }),
            )
          }}
        />
      )}
    </Layout>
  )
}

export default CardProductPageLayout
