import React, { useEffect, useMemo, useCallback } from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../../ui/components/Layout/Layout'
import { CaseHelper, CheckoutHelper, NavigationHelper } from '@eulogise/helpers'
import {
  useAuthState,
  useCaseState,
  useCheckoutsState,
  useClientState,
  useEulogiseDispatch,
  usePhotobookState,
  useSiderMenuState,
} from '../../../ui/store/hooks'
import {
  ICaseState,
  EulogiseCountry,
  ICheckoutsState,
  EulogisePage,
  KEEPSAKE_PRODUCTS,
  IKeepsakesMementosDetails,
  ISiderMenuState,
  EulogiseLeatherVideoTributeBookOptions,
  CHECKOUTS_SHIPPING_PRODUCTS,
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  ADDRESS_INPUT_MODE,
  IAddressDetails,
  ILeatherVideoTributeBookMetaData,
  EulogisePackageOptions,
  EulogisePhotoBookCheckoutOptions,
  PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES,
  EulogiseUserRole,
  IAuthState,
  IAllowPurchasingOption,
  KEEPSAKES_PRODUCTS_DETAILS,
} from '@eulogise/core'

import {
  CHECKOUT_BREAKPOINT,
  COLOR,
  EulogiseClientConfig,
  STYLE,
} from '@eulogise/client-core'
import Header from '../../../ui/components/Checkoutv2/Header'
import { OrderSummaryContainer } from '../../../ui/containers/Checkoutv2/OrderSummaryContainer'
import { Button, ButtonSize, ButtonType } from '@eulogise/client-components'
import {
  restoreCheckoutsState,
  updateIsKeepsakesDrawerOpened,
  updateKeepsakesShippingAddressDetails,
  updateLeatherVideoTributeBookDetails,
  updateLeatherVideoTributeBookOrderSelection,
  updatePaymentOption,
  updatePendingKeepsakesDrawerProduct,
} from '../../../ui/store/CheckoutsState/action'
import {
  BreadCrumbs,
  CHECKOUT_V2_URL_STEPS_MAPS,
} from '@eulogise/client-components'
import KeepsakeCard from '../../../ui/components/Checkoutv2/KeepsakeCard'
import { collapseSiderMenu } from '../../../ui/store/SiderMenuState/action'
import VideoBookDrawer from '../../../ui/components/Checkoutv2/VideoBookDrawer'
import PhotobookCheckoutDrawer from '../../../ui/components/Checkoutv2/PhotobookCheckoutDrawer'

const TAB_WIDTH = 290
const RIGHT_COLUMN_WIDTH_MD_TO_LG = 283
const RIGHT_COLUMN_WIDTH_XL = 411
const LEFT_COLUMN_WIDTH_MD_TO_LG = 589
const LEFT_COLUMN_WIDTH_XL = 765
const MID_LAYOUT_WIDTH =
  LEFT_COLUMN_WIDTH_MD_TO_LG + RIGHT_COLUMN_WIDTH_MD_TO_LG + 24
const LARGE_LAYOUT_WIDTH = LEFT_COLUMN_WIDTH_XL + RIGHT_COLUMN_WIDTH_XL + 24
const PAGE_MARGIN_MOBILE = '24px 16px'
const PAGE_MARGIN_MD = '40px 24px'
const PAGE_MARGIN_LG = '40px'

const StyledKeepsakesPage = styled(Layout)`
  margin: ${PAGE_MARGIN_MOBILE};
  width: calc(100% - 32px);

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    margin: ${PAGE_MARGIN_MD};
    width: calc(100% - 48px);
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    margin: ${PAGE_MARGIN_LG};
    width: calc(100% - 80px);
  }
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const StyledHeaderWrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    max-width: ${MID_LAYOUT_WIDTH}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    max-width: ${LARGE_LAYOUT_WIDTH}px;
  }
`

const StyledContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    max-width: ${MID_LAYOUT_WIDTH}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    max-width: ${LARGE_LAYOUT_WIDTH}px;
  }
`

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const StyledHeaderLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  flex: 1;
  align-items: flex-start;
  text-align: left;
`

const StyledHeaderRightContainer = styled.div`
  display: none;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    display: flex;
    width: ${RIGHT_COLUMN_WIDTH_MD_TO_LG}px;
    justify-content: flex-end;
    align-self: flex-end;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    display: flex;
    width: ${RIGHT_COLUMN_WIDTH_XL}px;
    justify-content: flex-end;
    align-self: flex-end;
  }
`

const StyledPlaceholder = styled.div<{
  $height: number
}>`
  height: ${({ $height }) => ($height ? `${$height}px` : '20px')};

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    display: none;
  }
`

const StyledNextButton = styled(Button)`
  flex: 1;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    max-width: 269px;
  }
`

const StyledActionButtonGroups = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  gap: 16px;
`

const StyledActionButtonsDesktop = styled.div`
  width: ${RIGHT_COLUMN_WIDTH_MD_TO_LG}px;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: none;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${RIGHT_COLUMN_WIDTH_XL}px;
  }
`

const StyledActionButtonsMobile = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    display: none;
  }
`

const StyledBackToEditing = styled.div`
  margin-right: 16px;
  font-weight: 300;
  font-size: 16px;
  text-decoration: underline;
  text-underline-offset: 1px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
  }
`

const StyledLeftContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: flex-start;
  flex: 1;
  text-align: left;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${LEFT_COLUMN_WIDTH_MD_TO_LG}px;
    padding-top: 24px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${LEFT_COLUMN_WIDTH_XL}px;
    padding-top: 24px;
  }
`

const StyledRightContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: stretch;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${RIGHT_COLUMN_WIDTH_MD_TO_LG}px;
    align-items: stretch;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${RIGHT_COLUMN_WIDTH_XL}px;
    align-items: stretch;
  }
`

const StyledTabHeaderContainer = styled.div`
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(
    to right,
    ${COLOR.CORE_PURPLE} ${TAB_WIDTH}px,
    ${COLOR.LITE_GREY} ${TAB_WIDTH}px
  );
  border-image-slice: 1;
  align-self: flex-start;
`

const StyledTabHeaderText = styled.div`
  font-size: 20px;
  line-height: 24px;
  width: ${TAB_WIDTH}px;
  padding-bottom: 8px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    ${STYLE.HEADING_MEDIUM};
    width: ${TAB_WIDTH}px;
    font-weight: 300;
  }
`

const StyledTabTextContainer = styled.div`
  text-align: left;
`

const StyledTabText = styled.div`
  ${STYLE.SMALL};
  width: 360px;
  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    width: 100%;
  }
`

const StyledKeepsakesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 16px;
  justify-content: flex-start;
  width: 100%;
`

const KeepsakesPage: React.FC<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()
  const {
    packageOption,
    printingDetails,
    keepsakesDetails,
    isKeepsakesDrawerOpened,
    keepsakesDrawerActiveProduct,
    pendingKeepsakesDrawerProduct,
  }: ICheckoutsState = useCheckoutsState()

  const { printingMethod, orderedProductsDetails, printingShippingMethod } =
    printingDetails
  const { account }: IAuthState = useAuthState()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const { activeItem: activePhotobook } = usePhotobookState()
  const country: EulogiseCountry = activeCase?.country!
  const role = account?.role
  const isClient: boolean = role === EulogiseUserRole.CLIENT
  const isEditor: boolean = role === EulogiseUserRole.EDITOR

  const { isCollapsed }: ISiderMenuState = useSiderMenuState()

  const { activeItem: activeClient } = useClientState()
  const allowPurchasing: IAllowPurchasingOption | undefined =
    activeClient?.allowPurchasing

  const useDiscountPrice = EulogiseClientConfig?.CHECKOUT_USE_DISCOUNT_PRICE

  const digitalPriceFee: number = useMemo(
    () =>
      useDiscountPrice
        ? CheckoutHelper.getDiscountPackagePriceByCountry({
            country,
            packageOption,
          })
        : CheckoutHelper.getPackagePriceByCountry({
            country,
            packageOption,
          }),
    [useDiscountPrice, country, packageOption],
  )

  const countryCurrencySymbol = useMemo(
    () => CheckoutHelper.getCurrencySymbolByCountry({ country }),
    [country],
  )

  const printingFee = useMemo(
    () =>
      CheckoutHelper.getPrintingFeeByOrdedProductsDetails({
        country,
        orderedProductsDetails,
      }),
    [country, orderedProductsDetails],
  )

  const printingShippingFee = useMemo(
    () =>
      CheckoutHelper.getShippingFeeByShippingProducts({
        shippingMethod: printingShippingMethod,
        country,
        shippingProduct: CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES,
      }),
    [printingShippingMethod, country],
  )

  const shippingProductsOrderSummaryByDetails = useMemo(
    () =>
      CheckoutHelper.getShippingProductsOrderSummaryByDetails({
        country,
        keepsakesDetails,
        printingDetails,
      }),
    [country, keepsakesDetails, printingDetails],
  )

  const printingProductDetailsSummary = useMemo(
    () =>
      CheckoutHelper.getPrintingProductOrderSummaryByOrderedProductsDetails({
        orderedProductsDetails: printingDetails.orderedProductsDetails,
      }),
    [printingDetails.orderedProductsDetails],
  )

  const leatherVideoTributeBookOption =
    keepsakesDetails.leatherVideoTributeBook.option

  const isLeatherVideoTributeBookAdded =
    leatherVideoTributeBookOption ===
    EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK

  const leatherVideoTributeBookSinglePrice =
    CheckoutHelper.getLeatherVideoTributeBookFeeByCountry({
      isLeatherVideoTributeBookAdded,
      country,
    })

  const leatherVideoTributeBookMetaData =
    keepsakesDetails.leatherVideoTributeBook.metaData

  const leatherCopiesAmount: number =
    leatherVideoTributeBookMetaData?.copyAmount

  const leatherVideoTributeBookFee: number =
    leatherVideoTributeBookSinglePrice * leatherCopiesAmount

  const leatherVideoTributeBookColour = leatherVideoTributeBookMetaData?.color
  const leatherVideoTributeBookMaterial =
    leatherVideoTributeBookMetaData?.material

  const leatherVideoTribtueBookShippingAddressDetails =
    keepsakesDetails?.leatherVideoTributeBook.shippingAddressDetails

  const getShouldSkipShippingPage = () => {
    if (
      !isAnyKeepsakeProductAdded &&
      printingMethod !==
        CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED &&
      !isPhotoBookAdded
    ) {
      return true
    }
    if (isPhotoBookAdded) {
      return false
    }
    return false
  }

  const isAnyKeepsakeProductAdded = CheckoutHelper.getIsAnyKeepsakeProductAdded(
    {
      isVideoBookAdded: isLeatherVideoTributeBookAdded,
    },
  )

  const isPhotoBookAdded =
    keepsakesDetails.photoBook.option ===
      EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK &&
    keepsakesDetails.photoBook.metaData.copyAmount > 0

  const shouldContinueToPaymentButtonDisabled =
    !!packageOption &&
    [EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK].includes(
      packageOption,
    ) &&
    !isAnyKeepsakeProductAdded &&
    !isPhotoBookAdded

  const isPrintingDeliveryOrdered =
    printingMethod ===
    CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED

  const isPhotoBookAvailableToOrder = CheckoutHelper.getIsPhotoBookReadyToOrder(
    { activePhotoBookData: activePhotobook!, country },
  )

  const shouldContinueToPaymentButtonDisabledPhotoBookPackage =
    packageOption === EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK &&
    !isPhotoBookAdded

  const photoBookFee = CheckoutHelper.getPhotoBookTotalPrice({
    keepsakesDetails,
    activePhotoBookData: activePhotobook,
    country,
  })

  const leatherVideoTributeBookShippingMethod =
    keepsakesDetails.leatherVideoTributeBook.shippingMethod

  const photoBookShippingMethod = keepsakesDetails.photoBook.shippingMethod

  const showShippingFee = CheckoutHelper.getShouldShowShippingFeeInOrderSummary(
    {
      printingShippingMethod,
      leatherVideoTributeBookShippingMethod,
      photoBookShippingMethod,
    },
  )

  const enabledProducts = activeCase
    ? CaseHelper.getEnabledProducts({ activeCase })
    : {}

  useEffect(() => {
    if (pendingKeepsakesDrawerProduct && !isKeepsakesDrawerOpened) {
      dispatch(
        updateIsKeepsakesDrawerOpened({
          isKeepsakesDrawerOpened: true,
          keepsakesDrawerActiveProduct: pendingKeepsakesDrawerProduct,
        }),
      )
      dispatch(updatePendingKeepsakesDrawerProduct(null))
    }
  }, [dispatch, pendingKeepsakesDrawerProduct, isKeepsakesDrawerOpened])

  useEffect(() => {
    if (!isCollapsed) {
      dispatch(collapseSiderMenu())
    }
    if (!packageOption) {
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
    }
    return () => {
      dispatch(updatePendingKeepsakesDrawerProduct(null))
      dispatch(
        updateIsKeepsakesDrawerOpened({
          isKeepsakesDrawerOpened: false,
          keepsakesDrawerActiveProduct: null,
        }),
      )
    }
  }, [])

  const renderBreadCrumbs = () => {
    return (
      <BreadCrumbs
        url={CHECKOUT_V2_URL_STEPS_MAPS.KEEPSAKES}
        packageOption={packageOption}
        shouldShowPrintingDetails={CheckoutHelper.getShouldShowPrintingDetailsBreadcrumbs(
          {
            packageOption,
            country,
            role: account?.role ?? null,
            allowPurchasing: activeClient?.allowPurchasing,
          },
        )}
        shouldShowPrintingOptions={isPrintingDeliveryOrdered}
        shouldShowKeepsakes={true}
        shouldShowShipping={CheckoutHelper.getShouldShowShippingBreadcrumbs({
          isAnyKeepsakeProductAdded,
          isPrintingDeliveryOrdered,
          isPhotoBookAdded,
          country,
          packageOption,
        })}
        onRedirect={(pageUrl: EulogisePage) =>
          NavigationHelper.navigate(pageUrl)
        }
        onPackageClick={() => {
          dispatch(restoreCheckoutsState())
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
        }}
      />
    )
  }

  const onBack = () => {
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
    const updatedLeatherVideoTributeBookDetails: ILeatherVideoTributeBookMetaData =
      {
        ...leatherVideoTributeBookMetaData,
        material: null,
        color: null,
        copyAmount: 0,
      }
    dispatch(
      updateLeatherVideoTributeBookDetails(
        updatedLeatherVideoTributeBookDetails,
      ),
    )
    if (
      packageOption &&
      [
        EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
      ].includes(packageOption)
    ) {
      if (
        printingMethod ===
        CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED
      ) {
        return NavigationHelper.navigate(
          EulogisePage.CHECKOUTS_V2_PRINTING_OPTIONS,
        )
      } else {
        return NavigationHelper.navigate(
          EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS,
        )
      }
    } else {
      return NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
    }
  }

  const onOverWritePackageOptions = () => {
    if (
      packageOption !== EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK &&
      isPhotoBookAdded &&
      packageOption === EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK
    ) {
      dispatch(
        updatePaymentOption(EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK),
      )
      return
    }
    if (
      packageOption !== EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK &&
      isLeatherVideoTributeBookAdded &&
      packageOption === EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK
    ) {
      dispatch(
        updatePaymentOption(EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK),
      )
      return
    }
  }

  const onContine = () => {
    const shouldSkipShipping = getShouldSkipShippingPage()
    if (shouldSkipShipping) {
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
      return
    }
    NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_SHIPPING)
    onOverWritePackageOptions()
    return
  }

  const renderActionButtons = () => {
    return (
      <StyledActionButtonGroups>
        <StyledBackToEditing onClick={onBack}>Back</StyledBackToEditing>
        <StyledNextButton
          buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
          buttonSize={ButtonSize.XMD}
          onClick={onContine}
          disabled={
            shouldContinueToPaymentButtonDisabled ||
            shouldContinueToPaymentButtonDisabledPhotoBookPackage
          }
        >
          {getShouldSkipShippingPage()
            ? `Continue to payment`
            : `Continue to shipping`}
        </StyledNextButton>
      </StyledActionButtonGroups>
    )
  }

  const renderTabHeader = () => {
    return (
      <StyledTabHeaderContainer>
        <StyledTabHeaderText>Keepsakes & Mementos</StyledTabHeaderText>
      </StyledTabHeaderContainer>
    )
  }

  const renderDescriptionText = () => {
    return (
      <StyledTabTextContainer>
        <StyledTabText>
          Choose from our range of beautifully crafted keepsakes to keep the
          memory of your loved ones alive forever.
        </StyledTabText>
        <StyledTabText>Customize your options on the next step.</StyledTabText>
      </StyledTabTextContainer>
    )
  }

  const onViewOptions = useCallback(
    ({ keepsakeProduct }: { keepsakeProduct: KEEPSAKE_PRODUCTS }) => {
      if (!keepsakeProduct) {
        return
      }

      // Initialize video book order when viewing Video Books
      if (keepsakeProduct === KEEPSAKE_PRODUCTS.VIDEO_BOOKS) {
        dispatch(
          updateLeatherVideoTributeBookOrderSelection(
            EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK,
          ),
        )
      }

      dispatch(
        updateIsKeepsakesDrawerOpened({
          isKeepsakesDrawerOpened: true,
          keepsakesDrawerActiveProduct: keepsakeProduct,
        }),
      )
    },
    [dispatch],
  )

  const getIsSelected = useCallback(
    ({ product }: { product: KEEPSAKE_PRODUCTS }) => {
      if (!product) {
        return false
      }
      switch (product) {
        case KEEPSAKE_PRODUCTS.VIDEO_BOOKS:
          return (
            keepsakesDetails.leatherVideoTributeBook.option ===
            EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK
          )

        case KEEPSAKE_PRODUCTS.PHOTO_BOOKS:
          return (
            keepsakesDetails.photoBook.option ===
            EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK
          )

        default:
          return false
      }
    },
    [
      keepsakesDetails.leatherVideoTributeBook.option,
      keepsakesDetails.photoBook.option,
    ],
  )

  const getIsProductAvailable = ({
    product,
  }: {
    product: KEEPSAKE_PRODUCTS
  }) => {
    const isProductDefaultAvaialble =
      KEEPSAKES_PRODUCTS_DETAILS?.find((p) => p.product)?.isAvailable ?? false
    if (!isProductDefaultAvaialble) {
      return false
    }
    switch (product) {
      case KEEPSAKE_PRODUCTS.VIDEO_BOOKS:
        return true
      case KEEPSAKE_PRODUCTS.PHOTO_BOOKS:
        return isPhotoBookAvailableToOrder
      default:
        return false
    }
  }

  const renderKeepsakes = () => {
    const keepsakesProductsDetailsWithOutPhotoBook =
      KEEPSAKES_PRODUCTS_DETAILS?.filter(
        (p) => p.product !== KEEPSAKE_PRODUCTS.PHOTO_BOOKS,
      )
    const keepsakesProductsDetailsWithPhotoBook =
      KEEPSAKES_PRODUCTS_DETAILS?.filter(
        (p) => p.product === KEEPSAKE_PRODUCTS.PHOTO_BOOKS,
      )
    // PhotoBook comes first
    const photoBookPackageKeepsakes = [
      ...keepsakesProductsDetailsWithPhotoBook,
      ...keepsakesProductsDetailsWithOutPhotoBook,
    ]
    const keepsakesProductDetails: IKeepsakesMementosDetails[] =
      isClient || isEditor
        ? CheckoutHelper.getFuneralHomeOrEditorKeepsakes({
            role,
            country,
            allowPurchasing,
            enabledProducts,
          })
        : packageOption === EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK
        ? photoBookPackageKeepsakes
        : PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country)
        ? KEEPSAKES_PRODUCTS_DETAILS
        : keepsakesProductsDetailsWithOutPhotoBook

    console.log({
      isClientOrEditor: isClient || isEditor,
      keepsakesProductDetails,
      country,
    })

    return (
      <StyledKeepsakesContainer>
        {keepsakesProductDetails
          .filter((p) => p.shouldShowInKeepsakesStore)
          .map((keepsakes: IKeepsakesMementosDetails, index: number) => {
            const { thumbnailSrc, product, displayName } = keepsakes
            return (
              <KeepsakeCard
                key={`keepsake-${keepsakes.product}-${index}`}
                thumbnailSrc={thumbnailSrc}
                keepsakeProduct={product}
                displayName={displayName}
                isSelected={getIsSelected({ product })}
                isAvaialble={getIsProductAvailable({ product })}
                onViewOptions={({ keepsakeProduct }) =>
                  onViewOptions({ keepsakeProduct })
                }
              />
            )
          })}
      </StyledKeepsakesContainer>
    )
  }

  const renderOrderSummary = () => {
    return (
      <OrderSummaryContainer
        showPrintingFee={printingFee > 0}
        showShippingFee={showShippingFee}
        showShippingCalculatedNext={
          isAnyKeepsakeProductAdded || isPrintingDeliveryOrdered
        }
        showPrintPriceCalculatedNext={false}
        printingFee={printingFee}
        shippingFee={printingShippingFee}
        digitalProductFee={digitalPriceFee}
        countryCurrencySymbol={countryCurrencySymbol}
        packageOption={packageOption}
        showLeatherVideoTributeBookFee={isLeatherVideoTributeBookAdded}
        showPhotoBookFee={isPhotoBookAdded}
        photoBookFee={photoBookFee}
        leatherVideoTributeBookFee={leatherVideoTributeBookFee}
        leatherVideoTributeBookAmount={leatherCopiesAmount}
        leatherVideoTributeBookColour={leatherVideoTributeBookColour}
        leatherVideoTributeBookMaterial={leatherVideoTributeBookMaterial}
        shouldShowTotal={false}
        shippingProductDetailsSummary={shippingProductsOrderSummaryByDetails}
        printingProductDetailsSummary={printingProductDetailsSummary}
        country={country}
        pathname={location?.pathname ?? null}
      />
    )
  }

  const onDrawerClose = useCallback(() => {
    dispatch(
      updateIsKeepsakesDrawerOpened({
        isKeepsakesDrawerOpened: false,
        keepsakesDrawerActiveProduct: null,
      }),
    )
  }, [dispatch])

  const renderKeepsakeDrawer = ({
    product,
  }: {
    product: KEEPSAKE_PRODUCTS | null | undefined
  }) => {
    switch (product) {
      case KEEPSAKE_PRODUCTS.VIDEO_BOOKS:
        return (
          <VideoBookDrawer
            open={
              isKeepsakesDrawerOpened &&
              keepsakesDrawerActiveProduct === KEEPSAKE_PRODUCTS.VIDEO_BOOKS
            }
            onDrawerClose={onDrawerClose}
            country={country}
          />
        )
      case KEEPSAKE_PRODUCTS.PHOTO_BOOKS:
        return (
          <PhotobookCheckoutDrawer
            open={
              isKeepsakesDrawerOpened &&
              keepsakesDrawerActiveProduct === KEEPSAKE_PRODUCTS.PHOTO_BOOKS
            }
            onDrawerClose={onDrawerClose}
            country={country}
          />
        )

      default:
        return null
    }
  }

  if (!activeCase) {
    return null
  }

  return (
    <StyledKeepsakesPage
      title="Add your keepsakes"
      location={location}
      noPadding={true}
    >
      <StyledHeaderWrapper>
        <StyledHeaderContainer>
          <StyledHeaderLeftContainer>
            <Header text={'Checkout'} />
            {renderBreadCrumbs()}
          </StyledHeaderLeftContainer>
          <StyledHeaderRightContainer>
            <StyledActionButtonsDesktop>
              {renderActionButtons()}
            </StyledActionButtonsDesktop>
          </StyledHeaderRightContainer>
        </StyledHeaderContainer>
      </StyledHeaderWrapper>
      <StyledContentWrapper>
        <StyledContentContainer>
          <StyledLeftContentContainer>
            <StyledPlaceholder $height={20} />
            {renderTabHeader()}
            {renderDescriptionText()}
            {renderKeepsakes()}
          </StyledLeftContentContainer>
          <StyledRightContentContainer>
            <StyledActionButtonsMobile>
              {renderActionButtons()}
            </StyledActionButtonsMobile>
            {renderOrderSummary()}
          </StyledRightContentContainer>
        </StyledContentContainer>
      </StyledContentWrapper>

      {isKeepsakesDrawerOpened &&
        renderKeepsakeDrawer({ product: keepsakesDrawerActiveProduct })}
    </StyledKeepsakesPage>
  )
}

export default KeepsakesPage
