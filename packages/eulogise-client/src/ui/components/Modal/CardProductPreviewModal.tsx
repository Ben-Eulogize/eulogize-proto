import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonType, Modal } from '@eulogise/client-components'
import styled from 'styled-components'
import CardProductWithPagination from '../CardProduct/CardProductWithPagination'
import {
  useCaseState,
  useEulogiseDispatch,
  useModalState,
  useProductState,
} from '../../store/hooks'
import {
  hideModalAction,
  showModalAction,
} from '../../store/ModalState/actions'
import {
  CardProductViewDisplayMode,
  EULOGISE_EDITOR_MIN_WIDTH,
  EulogiseProduct,
  GetImageObject,
  ICardProductData,
  ICardProductState,
  IGenericCardProductData,
  IModalState,
  IPreviewModalOption,
  IShareCardProductModalOption,
  ModalId,
} from '@eulogise/core'
import {
  downloadCardProductByCaseId,
  fetchCardProductsByCaseId,
} from '../../store/CardProduct/actions'
import { CardProductHelper, FontHelper, ImageHelper } from '@eulogise/helpers'
import { reeditProductAction } from '../../store/AdminState/actions'
import { PreviewModalHeader } from '../../containers/Modal/PreviewModalHeader'
import { useResize } from '../../hooks/useResize'
import { useIsNotDesktop } from '@eulogise/client-core'
import { useDisabledModalScrollbar } from '../../hooks/useDisabledModalScrollbar'
import { CardProductFlipBookPreviewWithPagination } from '../CardProductFlipBookPreviewWithPagination/CardProductFlipBookPreviewWithPagination'
import { DownloadProgressBar } from '@eulogise/client-components/src'
import { DEFAULT_CARD_PRODUCT_IMAGE_OPTIONS } from '@eulogise/helpers/dist/cardProduct.constants'

interface ICardProductPreviewModalProps {}

const ButtonsContainer = styled.div`
  display: flex;
`

const StyledModal = styled(Modal)<{ $isLoadingImages: boolean }>`
  ${({ $isLoadingImages }) =>
    $isLoadingImages
      ? ``
      : `.ant-modal-body {
          padding: 1rem 0;
        }`}
`

const StyledPreviewModalHeader = styled(PreviewModalHeader)`
  padding: 0 1rem;
`

export const CardProductPreviewModal: React.FC<
  ICardProductPreviewModalProps
> = () => {
  const dispatch = useEulogiseDispatch()
  const buttonContainerRef = useRef(null)
  const [playerZoom, setPlayerZoom] = useState(1)
  const modalState: IModalState = useModalState()
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [isDownloadingBleed, setIsDownloadingBleed] = useState<boolean>(false)
  const [pageCursor, setPageCursor] = useState<number>(0)
  const options = modalState.options as IPreviewModalOption
  const product: EulogiseProduct = options.product!
  const genericProductType = options?.genericProductType
  const [bookletMagnifierSliderValue, setBookletMagnifierSliderValue] =
    useState<number>(0)
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region!
  const caseId: string = activeCase?.id!
  const slug = genericProductType?.slug
  const productState = useProductState({
    product,
    slug,
  }) as ICardProductState
  const cardProduct = productState?.activeItem as ICardProductData
  const isFetching = productState?.isFetching
  const isMobile = useIsNotDesktop()
  const productTheme = productState.activeProductTheme

  const editorWidth = cardProduct
    ? CardProductHelper.getEditorWidth({
        cardProduct,
        isMobile,
        minWidth: EULOGISE_EDITOR_MIN_WIDTH[product],
      })
    : undefined

  const [previewModalWidth, setPreviewModalWidth] = useState<number>(0)

  useDisabledModalScrollbar()
  useEffect(() => {
    // should not fetch the product if it's already in the state
    // this is to avoid product being reset when opening the preview modal on the Booklet Editor
    // Reference: https://trello.com/c/p1OaZmsz
    if (!cardProduct) {
      dispatch(
        fetchCardProductsByCaseId({
          product,
          genericProductType,
          caseId,
          region,
        }),
      )
    }
  }, [])

  useResize(() => {
    const width = buttonContainerRef.current?.clientWidth
    const pz = width / editorWidth!
    const newZoom = pz > 1 ? 1 : pz
    setPlayerZoom(newZoom)
  }, [editorWidth])

  useEffect(() => {
    if (!cardProduct) {
      return
    }
    // Must load google font before rendering the card product
    // refer to: https://trello.com/c/DbhJZxkO/1432-booklet-preview-does-not-match-editor-or-download
    FontHelper.loadCardProductFonts()

    const filestackHandles: Array<string> =
      CardProductHelper.getCardProductImageFilestackHandles(cardProduct)
    if (filestackHandles.length === 0) {
      return
    }
    setIsLoadingImages(true)
    ImageHelper.preloadImages({
      imageAssets: filestackHandles.map(
        (handle: string) =>
          ({
            filestackHandle: handle,
          } as GetImageObject),
      ),
      progress: (p: number) => {
        console.log(`Loading images: ${p}%`)
        setProgress(p)
      },
      loaded: () => {
        setIsLoadingImages(false)
      },
      imageOptions: DEFAULT_CARD_PRODUCT_IMAGE_OPTIONS,
    })
  }, [])

  if (!cardProduct) {
    return null
  }

  const onBookletMagnifierSliderChange = (value: number) => {
    if (isNaN(value) || value < 0 || value > 100) {
      return
    }
    setBookletMagnifierSliderValue(value)
  }

  const close = () => {
    dispatch(hideModalAction(ModalId.CARD_PRODUCT_PREVIEW))
  }

  if (!productTheme) {
    console.log('productTheme is null')
    return null
  }

  const isPhotobook = product === EulogiseProduct.PHOTOBOOK
  const pageSize = cardProduct.content.pageSize
  return (
    <StyledModal
      isOpen
      isShowCloseIcon={false}
      $isLoadingImages={!!isLoadingImages}
      title={isLoadingImages ? 'Loading...' : undefined}
      footer={null}
      width={previewModalWidth}
      style={product === EulogiseProduct.BOOKLET ? {} : { minWidth: '60vw' }}
    >
      {isLoadingImages ? (
        <DownloadProgressBar percent={progress} />
      ) : (
        <>
          <StyledPreviewModalHeader
            onCloseClick={close}
            left={
              options?.showKeepEditingButton && (
                <Button
                  buttonType={ButtonType.SECONDARY}
                  noMarginLeft
                  onClick={() => {
                    const productId = cardProduct?.id!
                    dispatch(
                      reeditProductAction({
                        product,
                        productId,
                        region,
                        slug,
                      }),
                    )
                  }}
                >
                  Keep editing
                </Button>
              )
            }
            right={
              options.showDownloadButton &&
              CardProductHelper.isReadyForDownload(cardProduct.fileStatus!) && (
                <>
                  <Button
                    noMarginRight
                    onClick={() => {
                      dispatch(
                        showModalAction(ModalId.SHARE_CARD_PRODUCT, {
                          // needs to pass in all the Preview Modal options
                          // since the preview modal is appeared behind
                          // the Share Card Product modal
                          ...options,
                          slug: genericProductType?.slug,
                        } as IShareCardProductModalOption),
                      )
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    loading={isDownloading}
                    noMarginRight
                    onClick={async () => {
                      setIsDownloading(true)
                      const genericProductMetadata = (
                        cardProduct as IGenericCardProductData
                      )?.content?.metadata
                      dispatch(
                        downloadCardProductByCaseId({
                          product,
                          productName: CardProductHelper.getProductExportName({
                            product,
                            genericProductMetadata,
                            region,
                          }),
                          slug: genericProductMetadata?.slug,
                          pageSize,
                          caseId,
                          deceasedName: activeCase?.deceased?.fullName,
                          complete: () => {
                            setIsDownloading(false)
                          },
                        }),
                      )
                    }}
                    tooltip="For printing at home"
                  >
                    Download
                  </Button>
                  {product !== EulogiseProduct.TV_WELCOME_SCREEN && (
                    <Button
                      noMarginRight
                      loading={isDownloadingBleed}
                      onClick={() => {
                        setIsDownloadingBleed(true)
                        const genericProductMetadata = (
                          cardProduct as IGenericCardProductData
                        )?.content?.metadata
                        dispatch(
                          downloadCardProductByCaseId({
                            product,
                            productName: CardProductHelper.getProductExportName(
                              {
                                product,
                                region,
                                genericProductMetadata,
                              },
                            ),
                            slug: genericProductMetadata?.slug,
                            pageSize,
                            caseId,
                            deceasedName: activeCase?.deceased?.fullName,
                            isBleed: true,
                            complete: () => {
                              setIsDownloadingBleed(false)
                            },
                          }),
                        )
                      }}
                      tooltip="For professional printing"
                    >
                      Download (Bleed)
                    </Button>
                  )}
                </>
              )
            }
          />
          <ButtonsContainer ref={buttonContainerRef} />

          {product === EulogiseProduct.BOOKLET ||
          isPhotobook ||
          product === EulogiseProduct.SIDED_CARD ? (
            <CardProductFlipBookPreviewWithPagination
              product={product}
              cardProduct={cardProduct}
              region={region}
              pageCursor={pageCursor}
              onPageChange={(pc: number) => setPageCursor(pc)}
              onPreviewModalWidthChange={(w) => setPreviewModalWidth(w)}
              productTheme={productTheme}
            />
          ) : (
            <CardProductWithPagination
              genericProductType={genericProductType}
              zoom={playerZoom}
              displayMode={CardProductViewDisplayMode.PREVIEW}
              isFetching={isFetching}
              cardProduct={cardProduct as ICardProductData}
              product={product}
              slug={slug}
              pageCursor={pageCursor}
              isEnabledScrolling={false}
              onPageChange={(pc) => setPageCursor(pc)}
              // below functions are not being used
              isShowBorderSettingModal={false}
              setIsShowBorderSettingModal={() => null}
              isShowRemoveCardProductPagesModal={false}
              setIsShowRemoveCardProductPagesModal={() => null}
              isShowImageLibrary={false}
              onIsShowImageLibrary={() => null}
              currentPageIndex={0}
              selectedFrameContentItemId={''}
              onUpdatingImageDetails={() => null}
              onSelectedFrameContentItemId={() => null}
              setFocusedRowId={() => null}
              onChangeImageClick={() => null}
              dispatchAddRow={() => null}
              focusedRowId={''}
              bookletMagnifierSliderValue={bookletMagnifierSliderValue}
              onBookletMagnifierSliderChange={onBookletMagnifierSliderChange}
              onPreviewModalWidthChange={(w) => setPreviewModalWidth(w)}
            />
          )}
        </>
      )}
    </StyledModal>
  )
}
