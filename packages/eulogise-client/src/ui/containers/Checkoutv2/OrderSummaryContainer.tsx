import React, { useMemo, useCallback } from 'react'
import { EulogiseEndpoint } from '@eulogise/client-core'
import {
  ADDRESS_INPUT_MODE,
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  CHECKOUTS_SHIPPING_METHOD,
  CHECKOUTS_SHIPPING_PRODUCTS,
  EulogiseCardProducts,
  EulogiseCountry,
  EulogiseLeatherVideoTributeBookOptions,
  EulogisePackageOptions,
  EulogisePage,
  EulogisePhotoBookCheckoutOptions,
  KEEPSAKE_PRODUCTS,
  OrderSummaryPrintingProductDetailsSummary,
  OrderSummaryShippingProductDetailsSummary,
  IAddressDetails,
  IPrintingDetails,
  IPhotoBookMetaData,
  PhotobookCoverTypeLabelMap,
  ValidPhotobookCheckoutSize,
} from '@eulogise/core'
import {
  CheckoutHelper,
  DashboardHelper,
  PhotobookHelper,
} from '@eulogise/helpers'
import { OrderSummary as OrderSummaryView } from '@eulogise/client-components'
import {
  useCheckoutsState,
  useEulogiseDispatch,
  usePhotobookState,
} from '../../store/hooks'
import {
  updateIsPrintingOptionDrawerOpen,
  updateIsKeepsakesDrawerOpened,
  updatePrintingDetails,
  updateLeatherVideoTributeBookShippingMethod,
  updateLeatherVideoTributeBookOrderSelection,
  updateKeepsakesShippingAddressDetails,
  updatePhotoBookOrderSelection,
  updatePhotoBookShippingAddressDetails,
  updatePhotoBookDetails,
} from '../../store/CheckoutsState/action'

interface OrderSummaryContainerProps {
  packageOption: EulogisePackageOptions | null
  showPrintingFee: boolean
  showShippingFee: boolean
  showShippingCalculatedNext: boolean
  showPrintPriceCalculatedNext: boolean
  showLeatherVideoTributeBookFee: boolean
  showPhotoBookFee: boolean
  photoBookFee: number
  leatherVideoTributeBookFee: number
  leatherVideoTributeBookAmount: number
  leatherVideoTributeBookColour: string | null
  leatherVideoTributeBookMaterial: string | null
  printingFee: number
  shippingFee: number
  digitalProductFee: number
  countryCurrencySymbol: string
  shouldShowTotal: boolean
  shippingProductDetailsSummary: Array<OrderSummaryShippingProductDetailsSummary>
  printingProductDetailsSummary: Array<OrderSummaryPrintingProductDetailsSummary>
  country: EulogiseCountry
  pathname: string | null
}

export const OrderSummaryContainer: React.FC<OrderSummaryContainerProps> = ({
  packageOption,
  showPrintingFee,
  showShippingFee,
  showShippingCalculatedNext,
  showPrintPriceCalculatedNext,
  showLeatherVideoTributeBookFee,
  showPhotoBookFee,
  photoBookFee,
  leatherVideoTributeBookFee,
  leatherVideoTributeBookAmount,
  leatherVideoTributeBookColour,
  leatherVideoTributeBookMaterial,
  printingFee,
  shippingFee,
  digitalProductFee,
  countryCurrencySymbol,
  shouldShowTotal,
  shippingProductDetailsSummary,
  printingProductDetailsSummary,
  country,
  pathname,
}) => {
  const dispatch = useEulogiseDispatch()
  const { printingDetails, keepsakesDetails } = useCheckoutsState()
  const { activeItem: activePhotobook } = usePhotobookState()

  const {
    leatherVideoTributeBook: {
      shippingAddressDetails: leatherVideoTribtueBookShippingAddressDetails,
    },
    photoBook,
  } = keepsakesDetails

  const photoBookShippingAddressDetails = photoBook?.shippingAddressDetails
  const photoBookMetaData = photoBook?.metaData as IPhotoBookMetaData | null

  const coverType = activePhotobook
    ? PhotobookHelper.getCoverType(activePhotobook)
    : undefined

  const photoBookSize =
    (photoBookMetaData?.bookStyle?.size as ValidPhotobookCheckoutSize | null) ??
    null
  const photoBookNumberOfPages =
    photoBookMetaData?.bookStyle?.numberOfPages ?? 0
  const photoBookAmount = photoBookMetaData?.copyAmount ?? 0

  const photoBookDescription = useMemo(() => {
    const sizeText = photoBookSize
      ? CheckoutHelper.getPhotoBookCheckoutDisplayedSizeText({
          photoBookSize,
        })
      : ''
    const coverLabel = coverType
      ? PhotobookCoverTypeLabelMap?.[coverType] ?? coverType
      : ''

    const parts = [
      coverLabel,
      sizeText,
      `${photoBookNumberOfPages} Pages`,
    ].filter(Boolean)

    return parts.join(' | ')
  }, [coverType, photoBookNumberOfPages, photoBookSize])

  const isAtPaymentPage = pathname === EulogisePage.CHECKOUTS_V2_PAYMENT
  const isAtShippingPage = pathname === EulogisePage.CHECKOUTS_V2_SHIPPING
  const showActions = !(isAtPaymentPage || isAtShippingPage)

  const shouldExpandByDefault = DashboardHelper.isPathnameMatchedPageEndpoint({
    pathname: pathname ?? '',
    pageEndPoint: EulogiseEndpoint.EULOGIZE_PRINTING_DETAILS_PAGE,
  })

  const handleRemovePrintingProduct = useCallback(
    (product: EulogiseCardProducts) => {
      const printingShippingDetails = shippingProductDetailsSummary?.find(
        (details) =>
          details.shippingProduct ===
          CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES,
      )
      const isPrintingShippingSelected =
        printingShippingDetails?.shippingMethod !==
        CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING

      const updatedDetails: IPrintingDetails = {
        ...printingDetails,
        orderedProductsDetails: {
          ...printingDetails.orderedProductsDetails,
          [product]: {
            ...printingDetails.orderedProductsDetails[product],
            isProductOrderedForPrinting: false,
            paperType: null,
            copiesAmount: 0,
          },
        },
      }

      if (
        printingProductDetailsSummary?.length === 1 &&
        isPrintingShippingSelected
      ) {
        updatedDetails.printingShippingMethod =
          CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING
      }

      dispatch(updatePrintingDetails(updatedDetails))
    },
    [
      dispatch,
      printingDetails,
      printingProductDetailsSummary,
      shippingProductDetailsSummary,
    ],
  )

  const handleEditPrintingProduct = useCallback(
    (product: EulogiseCardProducts) => {
      dispatch(
        updateIsPrintingOptionDrawerOpen({
          isPrintingOptionDrawerOpened: true,
          printingOptionDrawerActiveProduct: product,
        }),
      )
    },
    [dispatch],
  )

  const handleRemoveKeepsake = useCallback(
    (product: KEEPSAKE_PRODUCTS) => {
      if (product === KEEPSAKE_PRODUCTS.VIDEO_BOOKS) {
        dispatch(
          updateLeatherVideoTributeBookShippingMethod(
            CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
          ),
        )
        dispatch(
          updateLeatherVideoTributeBookOrderSelection(
            EulogiseLeatherVideoTributeBookOptions.SKIP_LEATHER_VIDEO_TRIBUTE_BOOK,
          ),
        )
        const updatedKeepsakesShippingAddressDetails: IAddressDetails = {
          ...leatherVideoTribtueBookShippingAddressDetails,
          formattedAddress: null,
          isValidAddress: false,
          portalAddressMetaData: null,
          addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
        }
        dispatch(
          updateKeepsakesShippingAddressDetails(
            updatedKeepsakesShippingAddressDetails,
          ),
        )
      } else if (product === KEEPSAKE_PRODUCTS.PHOTO_BOOKS) {
        dispatch(
          updatePhotoBookOrderSelection(
            EulogisePhotoBookCheckoutOptions.SKIP_PHOTO_BOOK,
          ),
        )
        const updatedPhotoBookShippingAddressDetails: IAddressDetails = {
          ...photoBookShippingAddressDetails,
          formattedAddress: null,
          isValidAddress: false,
          portalAddressMetaData: null,
          addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
        }
        dispatch(
          updatePhotoBookShippingAddressDetails(
            updatedPhotoBookShippingAddressDetails,
          ),
        )

        if (photoBookMetaData) {
          const updatedPhotoBookDetails: IPhotoBookMetaData = {
            ...photoBookMetaData,
            bookStyle: {
              style: null,
              size: null,
              numberOfPages: 0,
            },
            coverStyle: {
              design: null,
              coverMaterial: null,
            },
            copyAmount: 0,
          }
          dispatch(updatePhotoBookDetails(updatedPhotoBookDetails))
        }
      }
    },
    [
      dispatch,
      leatherVideoTribtueBookShippingAddressDetails,
      photoBookMetaData,
      photoBookShippingAddressDetails,
    ],
  )

  const handleEditKeepsake = useCallback(
    (product: KEEPSAKE_PRODUCTS) => {
      dispatch(
        updateIsKeepsakesDrawerOpened({
          isKeepsakesDrawerOpened: true,
          keepsakesDrawerActiveProduct: product,
        }),
      )
    },
    [dispatch],
  )

  return (
    <OrderSummaryView
      packageOption={packageOption}
      showPrintingFee={showPrintingFee}
      showShippingFee={showShippingFee}
      showShippingCalculatedNext={showShippingCalculatedNext}
      showPrintPriceCalculatedNext={showPrintPriceCalculatedNext}
      showLeatherVideoTributeBookFee={showLeatherVideoTributeBookFee}
      showPhotoBookFee={showPhotoBookFee}
      photoBookFee={photoBookFee}
      leatherVideoTributeBookFee={leatherVideoTributeBookFee}
      leatherVideoTributeBookAmount={leatherVideoTributeBookAmount}
      leatherVideoTributeBookColour={leatherVideoTributeBookColour}
      leatherVideoTributeBookMaterial={leatherVideoTributeBookMaterial}
      printingFee={printingFee}
      shippingFee={shippingFee}
      digitalProductFee={digitalProductFee}
      countryCurrencySymbol={countryCurrencySymbol}
      shouldShowTotal={shouldShowTotal}
      shippingProductDetailsSummary={shippingProductDetailsSummary}
      printingProductDetailsSummary={printingProductDetailsSummary}
      country={country}
      shouldShowPrintingActions={showActions}
      shouldShowKeepsakeActions={showActions}
      shouldExpandByDefault={shouldExpandByDefault}
      onRemovePrintingProduct={handleRemovePrintingProduct}
      onEditPrintingProduct={handleEditPrintingProduct}
      onRemoveKeepsake={handleRemoveKeepsake}
      onEditKeepsake={handleEditKeepsake}
      photoBookDescription={photoBookDescription}
      photoBookAmount={photoBookAmount}
    />
  )
}
