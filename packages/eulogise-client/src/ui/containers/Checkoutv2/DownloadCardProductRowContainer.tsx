import React, { useMemo, useState } from 'react'
import copyToClipboard from 'copy-to-clipboard'
import { ButtonSize, Notification } from '@eulogise/client-components'
import {
  CardProductPageMode,
  EulogiseExportProductName,
  EulogisePackageOptions,
  EulogisePage,
  EulogiseProduct,
  EulogiseRegion,
  EulogiseUserRole,
  ICardProductContent,
  ICardProductData,
  IGenericCardProductData,
  IShareCardProductModalOption,
  ModalId,
  ResourceFileStatus,
  DrawerId,
  IInvoiceState,
} from '@eulogise/core'
import {
  CardProductHelper,
  CheckoutHelper,
  NavigationHelper,
} from '@eulogise/helpers'
import { DownloadCardProductRow } from '../../../../../eulogise-client-components/src/CheckoutV2/DownloadCardProductRow'
import { GeneratingButton } from '../Button/GeneratingButton'
import {
  downloadCardProductByCaseId,
  generateCardProduct,
} from '../../store/CardProduct/actions'
import {
  useAllGenericCardProductTypes,
  useAuthState,
  useEulogiseDispatch,
  useInvoiceState,
  useProductState,
} from '../../store/hooks'
import { showModalAction } from '../../store/ModalState/actions'
import {
  restoreCheckoutsState,
  updatePaymentOption,
} from '../../store/CheckoutsState/action'
import { openDrawerAction } from '../../store/DrawerState/actions'

export interface IDownloadCardProductRowContainerProps {
  product: EulogiseProduct
  slug?: string
  caseId: string
  deceasedName: string
  region: EulogiseRegion
  hasGeneratePermission: boolean
  isShowOnlyGenerated?: boolean
  isShowShareButton?: boolean
  isShowProViewButton?: boolean
  isShowHomeViewButton?: boolean
  isShowDownloadButton?: boolean
  isShowPurchaseButton?: boolean
  shouldDisableButton: boolean
  onStartCreating: (args: { product: EulogiseProduct }) => void
  onKeepEditing: (args: {
    product: EulogiseProduct
    productId?: string
    slug?: string
  }) => void
  onPurchase: (product: EulogiseProduct) => void
  onViewClick?: ({ isBleed }: { isBleed: boolean }) => void
}

export const DownloadCardProductRowContainer = ({
  product,
  slug,
  caseId,
  deceasedName,
  region,
  hasGeneratePermission,
  shouldDisableButton,
  isShowOnlyGenerated,
  isShowShareButton,
  isShowProViewButton,
  isShowHomeViewButton,
  isShowDownloadButton,
  isShowPurchaseButton,
  onStartCreating,
  onKeepEditing,
  onPurchase,
  onViewClick,
}: IDownloadCardProductRowContainerProps) => {
  const dispatch = useEulogiseDispatch()
  const { account } = useAuthState()
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const isAdmin = account?.role === EulogiseUserRole.ADMIN
  const { activeItem: cardProduct } = useProductState({ product, slug })

  // Get the genericProductType for generic card products
  const genericProductType = useMemo(() => {
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT && slug) {
      return genericProductTypes?.find((type) => type.slug === slug)
    }
    return undefined
  }, [product, slug, genericProductTypes])
  const cardProductFileStatus =
    cardProduct?.fileStatus ?? ResourceFileStatus.NOT_STARTED
  const pageSize = useMemo(
    () => (cardProduct?.content as ICardProductContent | undefined)?.pageSize,
    [cardProduct],
  )
  const { items: invoices = [] }: IInvoiceState = useInvoiceState()
  const productExportName: EulogiseExportProductName | string = useMemo(
    () =>
      CardProductHelper.getProductExportName({
        product,
        genericProductMetadata: (cardProduct as IGenericCardProductData)
          ?.content?.metadata,
        region,
      }),
    [product, region],
  )
  const [isDownloadingBleed, setIsDownloadingBleed] = useState(false)
  const [isDownloadingStandard, setIsDownloadingStandard] = useState(false)
  const [isDownloadingPhotobookInternals, setIsDownloadingPhotobookInternals] =
    useState(false)
  const [isDownloadingPhotobookCover, setIsDownloadingPhotobookCover] =
    useState(false)

  if (isShowOnlyGenerated) {
    if (cardProductFileStatus !== ResourceFileStatus.GENERATED) {
      return null
    }
  }

  const handleDownload = ({
    isBleed,
    pageMode,
    onComplete,
  }: {
    isBleed: boolean
    pageMode?: CardProductPageMode
    onComplete: () => void
  }) => {
    dispatch(
      downloadCardProductByCaseId({
        product,
        productName: productExportName,
        slug: (cardProduct as IGenericCardProductData)?.content?.metadata?.slug,
        pageSize,
        caseId,
        deceasedName,
        isBleed,
        pageMode,
        complete: onComplete,
      }),
    )
  }

  const handleDownloadBleed = () => {
    setIsDownloadingBleed(true)
    handleDownload({
      isBleed: true,
      onComplete: () => setIsDownloadingBleed(false),
    })
  }

  const handleDownloadStandard = () => {
    setIsDownloadingStandard(true)
    handleDownload({
      isBleed: false,
      onComplete: () => setIsDownloadingStandard(false),
    })
  }

  const handleDownloadPhotobookInternals = () => {
    setIsDownloadingPhotobookInternals(true)
    handleDownload({
      isBleed: true,
      pageMode: CardProductPageMode.SINGLE_PAGE,
      onComplete: () => setIsDownloadingPhotobookInternals(false),
    })
  }

  const handleDownloadPhotobookCover = () => {
    setIsDownloadingPhotobookCover(true)
    handleDownload({
      isBleed: true,
      pageMode: CardProductPageMode.COVER_PAGE,
      onComplete: () => setIsDownloadingPhotobookCover(false),
    })
  }

  const handleSharePhotobook = () => {
    dispatch(
      showModalAction(ModalId.SHARE_CARD_PRODUCT, {
        product,
      }),
    )
  }

  const handleShareDrawer = () => {
    dispatch(openDrawerAction(DrawerId.SHARE_TRIBUTE_DRAWER))
  }

  const handlePurchasePhotobook = () => {
    dispatch(restoreCheckoutsState())
    dispatch(
      updatePaymentOption(EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK),
    )
    NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
  }

  const notifyCopy = (message: string) => {
    Notification.success(message)
  }

  const handleCopyLink = ({
    pageMode,
    label,
  }: {
    pageMode: CardProductPageMode
    label: string
  }) => {
    const url = CardProductHelper.getCardProductS3FileUrl({
      caseId,
      productName: productExportName,
      slug,
      bleed: true,
      fileType: 'pdf',
      pageMode,
    })
    copyToClipboard(url)
    notifyCopy(label)
  }

  const handleShare = () => {
    dispatch(
      showModalAction(ModalId.SHARE_CARD_PRODUCT, {
        product,
        slug,
      } as IShareCardProductModalOption),
    )
  }

  const handleConfirmGenerate = ({
    product: confirmedProduct,
    cardProductId,
    slug,
  }: {
    product: EulogiseProduct
    cardProductId?: string
    slug?: string
  }) => {
    const resolvedCardProductId = cardProductId ?? cardProduct?.id
    if (!resolvedCardProductId) {
      return
    }
    dispatch(
      generateCardProduct({
        product: confirmedProduct,
        caseId,
        cardProductId: resolvedCardProductId,
        slug,
      }),
    )
  }

  const processingContent = (
    <GeneratingButton
      isDownloadPageButton
      buttonSize={ButtonSize.SM}
      product={product}
      caseId={caseId}
      noMarginLeft
      noMarginRight
    />
  )

  const isAnyPageFull =
    !!cardProduct &&
    product !== EulogiseProduct.TV_WELCOME_SCREEN &&
    CardProductHelper.isAnyPageFull(cardProduct as ICardProductData, product)

  const hasPhotoBookPurchased =
    CheckoutHelper.getIsPhotoBookPurchasedByInvoices({ invoices })
  const shouldHideKeepEditingButton =
    product === EulogiseProduct.PHOTOBOOK && hasPhotoBookPurchased

  return (
    <DownloadCardProductRow
      product={product}
      genericProductType={genericProductType}
      isShowShareButton={isShowShareButton}
      isShowHomeViewButton={isShowHomeViewButton}
      isShowProViewButton={isShowProViewButton}
      isShowDownloadButton={isShowDownloadButton}
      isShowPurchaseButton={isShowPurchaseButton}
      onViewClick={onViewClick}
      hasCardProduct={!!cardProduct}
      cardProductId={cardProduct?.id ?? undefined}
      cardProductFileStatus={cardProductFileStatus}
      hasGeneratePermission={hasGeneratePermission}
      isAdmin={isAdmin}
      isAnyPageFull={isAnyPageFull}
      processingContent={processingContent}
      isBleedDownloadLoading={isDownloadingBleed}
      isStandardDownloadLoading={isDownloadingStandard}
      isPhotobookInternalsDownloadLoading={isDownloadingPhotobookInternals}
      isPhotobookCoverDownloadLoading={isDownloadingPhotobookCover}
      shouldDisableButton={shouldDisableButton}
      shouldHideKeepEditingButton={shouldHideKeepEditingButton}
      onStartCreating={onStartCreating}
      onKeepEditing={({ product, productId }) => {
        onKeepEditing({ product, productId, slug })
      }}
      onPurchase={onPurchase}
      onConfirmGenerate={({ product, cardProductId }) => {
        handleConfirmGenerate({
          product,
          cardProductId,
          slug,
        })
      }}
      onShare={handleShare}
      onDownloadBleed={handleDownloadBleed}
      onDownloadStandard={handleDownloadStandard}
      onSharePhotobook={handleSharePhotobook}
      onShareDrawerClick={handleShareDrawer}
      onPurchasePhotobook={handlePurchasePhotobook}
      onDownloadPhotobookInternals={handleDownloadPhotobookInternals}
      onDownloadPhotobookCover={handleDownloadPhotobookCover}
      onCopyPhotobookInternalsLink={() =>
        handleCopyLink({
          pageMode: CardProductPageMode.SINGLE_PAGE,
          label: 'Photobook link copied to clipboard',
        })
      }
      onCopyPhotobookCoverLink={() =>
        handleCopyLink({
          pageMode: CardProductPageMode.COVER_PAGE,
          label: 'Cover link copied to clipboard',
        })
      }
    />
  )
}
