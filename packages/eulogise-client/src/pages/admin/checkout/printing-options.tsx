import React, { useEffect, useMemo, useCallback } from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../../ui/components/Layout/Layout'
import { CheckoutHelper, NavigationHelper } from '@eulogise/helpers'
import {
  useAllActiveCardProducts,
  useAnyActiveCardProductIsFetching,
  useAuthState,
  useAvailableEulogiseCardProducts,
  useCaseState,
  useCheckoutsState,
  useClientState,
  useEulogiseDispatch,
  useProductState,
  useSiderMenuState,
  useSlideshowState,
} from '../../../ui/store/hooks'
import {
  EulogisePackageOptions,
  ICaseState,
  EulogiseCountry,
  ICheckoutsState,
  EulogiseUserRole,
  IAuthState,
  EulogisePage,
  CHECKOUTS_SHIPPING_METHOD,
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  CHECKOUTS_SHIPPING_PRODUCTS,
  EulogiseCardProducts,
  EulogiseProduct,
  ICardProductData,
  ISlideshowState,
  EulogizePrintingProductDisplayNames,
  ISiderMenuState,
  ICardProductState,
  EulogiseEditorPaymentConfig,
} from '@eulogise/core'

import {
  CHECKOUT_BREAKPOINT,
  COLOR,
  EulogiseClientConfig,
  STYLE,
} from '@eulogise/client-core'
import Header from '../../../ui/components/Checkoutv2/Header'
import {
  BreadCrumbs,
  CHECKOUT_V2_URL_STEPS_MAPS,
  PrintingOptionCard,
} from '@eulogise/client-components'
import {
  Button,
  ButtonSize,
  ButtonType,
  Spin,
} from '@eulogise/client-components'
import { OrderSummaryContainer } from '../../../ui/containers/Checkoutv2/OrderSummaryContainer'
import { fetchInvoices } from '../../../ui/store/InvoiceState/actions'
import {
  restoreCheckoutsState,
  updateIsPrintingOptionDrawerOpen,
  updateIsReviewDesignDrawerOpened,
  updatePrintingDetails,
} from '../../../ui/store/CheckoutsState/action'
import PrintingOptionDrawer from '../../../ui/components/Checkoutv2/PrintingOptionDrawer'
import { collapseSiderMenu } from '../../../ui/store/SiderMenuState/action'

const AVAILABLE_PRINTING_TRIBTUE_PRODUCTS = [
  EulogiseCardProducts.BOOKLET,
  EulogiseCardProducts.SIDED_CARD,
]

const PRINTING_OPTIONS_CARD_DETAILS = [
  {
    product: EulogiseCardProducts.BOOKLET,
    displayName:
      EulogizePrintingProductDisplayNames?.[EulogiseCardProducts.BOOKLET],
    previewThumbnailImgSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/folded-programs/folded-program-4.avif`,
  },
  {
    product: EulogiseCardProducts.SIDED_CARD,
    displayName:
      EulogizePrintingProductDisplayNames?.[EulogiseCardProducts.SIDED_CARD],
    previewThumbnailImgSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/service-cards/service-cards-1.avif`,
  },
  {
    product: EulogiseCardProducts.THANK_YOU_CARD,
    displayName:
      EulogizePrintingProductDisplayNames?.[
        EulogiseCardProducts.THANK_YOU_CARD
      ],
    previewThumbnailImgSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/thank-you-cards/thank-you-cards-2.avif`,
  },
  {
    product: EulogiseCardProducts.BOOKMARK,
    displayName:
      EulogizePrintingProductDisplayNames?.[EulogiseCardProducts.BOOKMARK],
    previewThumbnailImgSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/bookmark/bookmark-1.avif`,
  },
]

const TAB_WIDTH = 270

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

const StyledPrintingOptions = styled(Layout)`
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

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

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

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${RIGHT_COLUMN_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${RIGHT_COLUMN_WIDTH_XL}px;
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

const StyledTabHeaderContainer = styled.div`
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(
    to right,
    ${COLOR.CORE_PURPLE} ${TAB_WIDTH}px,
    ${COLOR.LITE_GREY} ${TAB_WIDTH}px
  );
  border-image-slice: 1;
`

const StyledTabHeaderText = styled.div`
  font-size: 20px;

  line-height: 24px;
  width: ${TAB_WIDTH}px;
  padding-bottom: 8px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    ${STYLE.HEADING_MEDIUM};
  }
`

const StyledTabText = styled.div`
  ${STYLE.SMALL};
  width: 360px;
  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    width: 100%;
  }
`

const StyledNoAvailableTabText = styled.div`
  ${STYLE.SMALL};
  margin: 24px 0;
  color: ${COLOR.RED};
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

const StyledNextButton = styled(Button)`
  flex: 1;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    max-width: 269px;
  }
`

const StyledPrintingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 16px;
  justify-content: flex-start;
`

const StyledPrintingOptionCardContainer = styled.div``

const PrintingOptions: React.FC<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()
  const {
    packageOption,
    printingDetails,
    keepsakesDetails,
    isPrintingOptionDrawerOpened,
    printingOptionDrawerActiveProduct,
  }: ICheckoutsState = useCheckoutsState()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId = activeCase?.id!
  const country: EulogiseCountry = activeCase?.country!
  const { isCollapsed }: ISiderMenuState = useSiderMenuState()
  const role = account?.role ?? null
  const shouldEditorOrFuneralHomeNeedToPay =
    activeCase?.editorPaymentConfig ===
    EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY

  const { activeItem: activeSlideshow }: ISlideshowState = useSlideshowState()
  const { activeItem: activeClient } = useClientState()

  const isHasToPayEditorOrClient =
    role &&
    [EulogiseUserRole.EDITOR, EulogiseUserRole.CLIENT].includes(role) &&
    shouldEditorOrFuneralHomeNeedToPay

  const { printingMethod, orderedProductsDetails, printingShippingMethod } =
    printingDetails
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

  const availableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()

  const allActiveCardProducts = useAllActiveCardProducts(
    availableCardProducts,
  ) as Record<EulogiseCardProducts, ICardProductData>

  const tributesMetaData = CheckoutHelper.getTributeMetaData({
    allActiveCardProducts,
    slideshowData: activeSlideshow,
  })

  const readyToOrderPrintingProducts =
    CheckoutHelper.getReadyToOrderPrintingProducts({
      tributesMetaData,
    })

  const hasAnyPrintingProductSelected = useMemo(
    () =>
      CheckoutHelper.getIsAnyPrintingProductSelected({
        orderedProductsDetails,
      }),
    [orderedProductsDetails],
  )

  const isAnyProductFetching = useAnyActiveCardProductIsFetching()

  const bookletProductState = useProductState({
    product: EulogiseProduct.BOOKLET,
  }) as ICardProductState
  const bookletPageAmount =
    bookletProductState?.activeItem?.content?.pages?.length ?? 0

  const bookletOverFourPages = bookletPageAmount > 4

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

  const shouldShowKeepsakes = isHasToPayEditorOrClient
    ? CheckoutHelper.getIfAnyItemsAvaialbleInKeepsakesForHasToPayFuneralHomeOrEditorBasedOnAllowPurchasing(
        {
          roleConfigKey:
            CheckoutHelper.getHasToPayRoleConfigKeyForEditorOrFuneralHome({
              role,
              allowPurchasing: activeClient?.allowPurchasing,
            }),
          role,
          allowPurchasing: activeClient?.allowPurchasing,
        },
      )
    : true

  useEffect(() => {
    // dispatch(fetchAllProductsByCaseId({ caseId, region }))
    if (
      account?.role &&
      [
        EulogiseUserRole.CUSTOMER,
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.EDITOR,
        EulogiseUserRole.ADMIN,
      ].includes(account?.role)
    ) {
      dispatch(fetchInvoices({ caseId }))
    }
    if (!packageOption) {
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
    }
    if (!isCollapsed) {
      dispatch(collapseSiderMenu())
    }
  }, [])

  const onBack = useCallback(() => {
    NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
  }, [])

  const renderBreadCrumbs = () => {
    return (
      <BreadCrumbs
        url={CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_OPTIONS}
        packageOption={packageOption}
        shouldShowPrintingDetails={CheckoutHelper.getShouldShowPrintingDetailsBreadcrumbs(
          {
            packageOption,
            country,
            role: account?.role ?? null,
            allowPurchasing: activeClient?.allowPurchasing,
          },
        )}
        shouldShowPrintingOptions={true}
        shouldShowKeepsakes={shouldShowKeepsakes}
        shouldShowShipping={true}
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

  const renderActionButtons = () => {
    const getNextButtonText = () => {
      if (isHasToPayEditorOrClient && !shouldShowKeepsakes) {
        return 'Continue to shipping'
      }
      return 'Continue to keepsakes'
    }

    return (
      <StyledActionButtonGroups>
        <StyledBackToEditing onClick={onBack}>Back</StyledBackToEditing>
        <StyledNextButton
          buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
          buttonSize={ButtonSize.XMD}
          onClick={() => {
            if (!packageOption || !printingMethod) {
              return
            } else if (
              [
                EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
                EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
                EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
                EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
              ].includes(packageOption) &&
              printingMethod ===
                CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED
            ) {
              if (isHasToPayEditorOrClient && !shouldShowKeepsakes) {
                NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_SHIPPING)
                return
              }
              NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
            } else {
              NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
            }
          }}
          disabled={!hasAnyPrintingProductSelected}
        >
          {getNextButtonText()}
        </StyledNextButton>
      </StyledActionButtonGroups>
    )
  }

  const renderOrderSummary = () => {
    return (
      <OrderSummaryContainer
        showPrintingFee={printingFee > 0}
        showShippingFee={showShippingFee}
        showShippingCalculatedNext={true}
        showPrintPriceCalculatedNext={false}
        printingFee={printingFee}
        shippingFee={printingShippingFee}
        digitalProductFee={digitalPriceFee}
        countryCurrencySymbol={countryCurrencySymbol}
        packageOption={packageOption}
        showLeatherVideoTributeBookFee={false}
        showPhotoBookFee={false}
        leatherVideoTributeBookFee={0}
        leatherVideoTributeBookAmount={0}
        leatherVideoTributeBookColour={null}
        leatherVideoTributeBookMaterial={null}
        shouldShowTotal={false}
        shippingProductDetailsSummary={shippingProductsOrderSummaryByDetails}
        printingProductDetailsSummary={printingProductDetailsSummary}
        country={country}
        photoBookFee={0}
        pathname={location?.pathname ?? null}
      />
    )
  }

  const renderTabHeader = () => {
    return (
      <StyledTabHeaderContainer>
        <StyledTabHeaderText>Printing & Delivery Options</StyledTabHeaderText>
      </StyledTabHeaderContainer>
    )
  }

  const renderDescriptionText = () => {
    return (
      <>
        <StyledTabText>
          Choose from our range of high quality of paper options for your
          printed keepsakes.
        </StyledTabText>
        {readyToOrderPrintingProducts?.length === 0 && (
          <StyledNoAvailableTabText>
            No available product? Please edit and save at least one product in
            tribute editors.
          </StyledNoAvailableTabText>
        )}
      </>
    )
  }

  const renderPrintingOptions = () => {
    return (
      <StyledPrintingContainer>
        {PRINTING_OPTIONS_CARD_DETAILS.map((optionDetails) => {
          const { product, displayName, previewThumbnailImgSrc } = optionDetails
          const displayedSize =
            CheckoutHelper.getPrintingTributesDisplayedSizeByCountry({
              country,
            })?.[product]
          const stringPrice =
            CheckoutHelper.getPrintingProductStartingPriceByProduct({
              product,
              country,
            })

          const isProductSelected =
            orderedProductsDetails?.[product]?.isProductOrderedForPrinting ??
            false

          const isProductAvailableToPrint =
            readyToOrderPrintingProducts.includes(
              product as unknown as EulogiseProduct,
            )

          const shouldShowNotAvailableInYourArea =
            product === EulogiseCardProducts.BOOKLET
              ? bookletOverFourPages
              : !AVAILABLE_PRINTING_TRIBTUE_PRODUCTS.includes(product)

          return (
            <StyledPrintingOptionCardContainer key={product}>
              <PrintingOptionCard
                product={product}
                displayName={displayName}
                displayedSize={displayedSize}
                stringPrice={stringPrice}
                previewThumbnailImgSrc={previewThumbnailImgSrc}
                isSelected={isProductSelected}
                isProductAvailableToPrint={isProductAvailableToPrint}
                shouldShowNotAvailableInYourArea={
                  shouldShowNotAvailableInYourArea
                }
                onViewOptions={({
                  product,
                }: {
                  product: EulogiseCardProducts
                }) => {
                  dispatch(
                    updateIsPrintingOptionDrawerOpen({
                      isPrintingOptionDrawerOpened: true,
                      printingOptionDrawerActiveProduct: product,
                    }),
                  )
                }}
              />
            </StyledPrintingOptionCardContainer>
          )
        })}
      </StyledPrintingContainer>
    )
  }

  if (!activeCase) {
    return null
  }

  return (
    <StyledPrintingOptions
      title="Select your printing options"
      location={location}
      noPadding={true}
    >
      {isAnyProductFetching ? (
        <Spin />
      ) : (
        <>
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
                {renderPrintingOptions()}
              </StyledLeftContentContainer>
              <StyledRightContentContainer>
                <StyledActionButtonsMobile>
                  {renderActionButtons()}
                </StyledActionButtonsMobile>
                {renderOrderSummary()}
              </StyledRightContentContainer>
            </StyledContentContainer>
          </StyledContentWrapper>
          <PrintingOptionDrawer
            open={isPrintingOptionDrawerOpened}
            country={country}
            product={printingOptionDrawerActiveProduct}
          />
        </>
      )}
    </StyledPrintingOptions>
  )
}

export default PrintingOptions
