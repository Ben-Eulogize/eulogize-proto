import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { PageProps } from 'gatsby'
import { loadStripe, PaymentMethod } from '@stripe/stripe-js'
import styled from 'styled-components'
import Layout from '../../../ui/components/Layout/Layout'
import {
  BreadCrumbs,
  Button,
  ButtonSize,
  ButtonType,
  CHECKOUT_V2_URL_STEPS_MAPS,
  Notification,
} from '@eulogise/client-components'
import {
  CHECKOUT_BREAKPOINT,
  EulogiseClientConfig,
} from '@eulogise/client-core'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutsForm from '../../../ui/containers/Forms/Checkouts/CheckoutsForm'
import {
  createPayment,
  fetchCaseById,
} from '../../../ui/store/CaseState/actions'
import {
  useAllActiveCardProducts,
  useAuthState,
  useAvailableEulogiseCardProducts,
  useCaseState,
  useCheckoutsState,
  useClientState,
  useEulogiseDispatch,
  usePhotobookState,
  useSiderMenuState,
} from '../../../ui/store/hooks'
import { OrderSummaryContainer } from '../../../ui/containers/Checkoutv2/OrderSummaryContainer'
import Header from '../../../ui/components/Checkoutv2/Header'
import {
  CHECKOUT_PAYMENT_METHODS,
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  CHECKOUTS_SHIPPING_PRODUCTS,
  EULOGISE_PRINTING_AVAILABLE_PRODUCTS,
  EulogiseCardProducts,
  EulogiseCountry,
  EulogiseLeatherVideoTributeBookOptions,
  EulogisePackageOptions,
  EulogisePage,
  EulogisePhotoBookCheckoutOptions,
  EulogiseProduct,
  EulogizeShippingAvailableCountries,
  ICaseState,
  ICheckoutsState,
  IOrderDetails,
  IOrderSummaryDetails,
  ISiderMenuState,
  KEEPSAKE_PRODUCTS,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'
import {
  CardProductHelper,
  CheckoutHelper,
  NavigationHelper,
} from '@eulogise/helpers'
import {
  restoreCheckoutsState,
  updateIsComingFromPaymentPage,
} from '../../../ui/store/CheckoutsState/action'
import {
  fetchAllProductsByCaseId,
  generateCardProduct,
} from '../../../ui/store/CardProduct/actions'
import { collapseSiderMenu } from '../../../ui/store/SiderMenuState/action'
import {
  TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_MD_TO_LG,
  TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_XL,
  TwoColumnsPageLayout,
} from '../../../ui/components/Layout/TwoColumnsPageLayout'

const PAGE_MARGIN_MOBILE = '24px 16px'
const PAGE_MARGIN_MD = '40px 24px'
const PAGE_MARGIN_LG = '40px'

const StyledPaymentPage = styled(Layout)`
  margin: ${PAGE_MARGIN_MOBILE};

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    margin: ${PAGE_MARGIN_MD};
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    margin: ${PAGE_MARGIN_LG};
  }
`

const StyledActionButtonGroups = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 16px;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const StyledActionButtonsDesktop = styled.div`
  width: ${TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_MD_TO_LG}px;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: none;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_XL}px;
  }
`

const StyledActionButtonsMobile = styled.div`
  width: 100%;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    display: none;
  }
`

const StyledBackToEditing = styled.div<{ $disabled?: boolean }>`
  margin-right: 16px;
  font-weight: 300;
  font-size: 16px;
  text-decoration: underline;
  text-underline-offset: 1px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: ${({ $disabled }) => ($disabled ? '#9AA4B2' : 'inherit')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  text-decoration: underline;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    margin-right: 0;
  }
`

const StyledNextButton = styled(Button)`
  flex: 0 0 auto;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    width: 326px;
    flex: initial;
  }
`

const PaymentPage: React.FC<PageProps> = ({ location }) => {
  const stripePromise = loadStripe(EulogiseClientConfig.STRIPE_API_KEY!)
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false)
  const [submitForm, setSubmitForm] = useState<(() => void) | null>(null)
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId = activeCase?.id
  const region = activeCase?.region!
  const country: EulogiseCountry =
    activeCase?.country ?? EulogiseCountry.AUSTRALIA

  const { isCollapsed }: ISiderMenuState = useSiderMenuState()

  const {
    packageOption,
    keepsakesDetails,
    billingAddressDetails,
    paymentDetails,
    printingDetails,
  }: ICheckoutsState = useCheckoutsState()

  const { leatherVideoTributeBook, photoBook } = keepsakesDetails

  const { activeItem: activePhotobook } = usePhotobookState()
  const { activeItem: activeClient } = useClientState()
  const { account } = useAuthState()
  const role = account?.role

  const {
    metaData: leatherVideoTributeBookMetaData,
    option: leatherVideoTributeBookOption,
    shippingMethod: leatherVideoTributeBookShippingMethod,
  } = leatherVideoTributeBook

  const { printingShippingMethod, orderedProductsDetails } = printingDetails

  const useDiscountPrice =
    EulogiseClientConfig?.CHECKOUT_USE_DISCOUNT_PRICE ?? false

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

  const isLeatherVideoTributeBookAdded =
    leatherVideoTributeBookOption ===
    EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK

  const leatherVideoTributeBookSinglePrice =
    CheckoutHelper.getLeatherVideoTributeBookFeeByCountry({
      isLeatherVideoTributeBookAdded,
      country,
    })

  const leatherCopiesAmount: number =
    leatherVideoTributeBookMetaData?.copyAmount

  const leatherVideoTributeBookFee: number =
    leatherVideoTributeBookSinglePrice * leatherCopiesAmount

  const leatherVideoTributeBookColour = leatherVideoTributeBookMetaData?.color

  const leatherVideoTributeBookMaterial =
    leatherVideoTributeBookMetaData?.material

  const photoBookShippingMethod = keepsakesDetails?.photoBook?.shippingMethod

  const keepSakesShippingFee = CheckoutHelper.getShippingFeeByShippingProducts({
    shippingMethod: leatherVideoTributeBookShippingMethod,
    country,
    shippingProduct: CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.VIDEO_BOOKS],
  })

  const printingShippingFee = CheckoutHelper.getShippingFeeByShippingProducts({
    shippingMethod: printingShippingMethod,
    country,
    shippingProduct: CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES,
  })

  const photoBookShippingFee = CheckoutHelper.getShippingFeeByShippingProducts({
    shippingMethod: photoBookShippingMethod,
    country,
    shippingProduct:
      CHECKOUTS_SHIPPING_PRODUCTS?.[KEEPSAKE_PRODUCTS.PHOTO_BOOKS],
  })

  const totalShippingFee =
    printingShippingFee + keepSakesShippingFee + photoBookShippingFee

  const isAnyKeepsakeProductAdded = CheckoutHelper.getIsAnyKeepsakeProductAdded(
    {
      isVideoBookAdded: isLeatherVideoTributeBookAdded,
    },
  )

  const isPrintingDeliveryOrdered =
    printingDetails.printingMethod ===
    CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED

  const isShippingAvailableCountry =
    EulogizeShippingAvailableCountries.includes(country)

  const isShippingEnabled =
    isShippingAvailableCountry &&
    (isAnyKeepsakeProductAdded || isPrintingDeliveryOrdered)

  const printingFee: number = useMemo(
    () =>
      CheckoutHelper.getPrintingFeeByOrdedProductsDetails({
        country,
        orderedProductsDetails,
      }),
    [country, orderedProductsDetails],
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

  const selectedOrderPrintingProducts =
    CheckoutHelper.getOrderedPrintingProducts({
      orderedProductsDetails: printingDetails.orderedProductsDetails,
    })

  const allAvailableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()
  const allActiveCardProducts = useAllActiveCardProducts(
    allAvailableCardProducts,
  )

  const isPhotoBookAdded =
    keepsakesDetails.photoBook.option ===
      EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK &&
    keepsakesDetails.photoBook.metaData.copyAmount > 0

  const photoBookFee = CheckoutHelper.getPhotoBookTotalPrice({
    keepsakesDetails,
    activePhotoBookData: activePhotobook,
    country,
  })

  const shippingFee =
    printingShippingFee + keepSakesShippingFee + photoBookShippingFee

  const showShippingFee = CheckoutHelper.getShouldShowShippingFeeInOrderSummary(
    {
      printingShippingMethod,
      leatherVideoTributeBookShippingMethod,
      photoBookShippingMethod,
    },
  )

  const generateSelectedPrintingTributeByProduct = ({
    selectedOrderPrintingProducts,
  }: {
    selectedOrderPrintingProducts: EulogiseProduct[]
  }) => {
    if (
      !selectedOrderPrintingProducts ||
      selectedOrderPrintingProducts?.length === 0
    ) {
      return
    }

    if (
      packageOption &&
      ![
        EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
        EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
        EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
        EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
        EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
      ].includes(packageOption)
    ) {
      return
    }

    const validSelectedOrderProducts: EulogiseProduct[] =
      selectedOrderPrintingProducts.filter((product: EulogiseProduct) =>
        EULOGISE_PRINTING_AVAILABLE_PRODUCTS?.includes(
          product as unknown as EulogiseCardProducts,
        ),
      )
    if (caseId && validSelectedOrderProducts) {
      validSelectedOrderProducts.map((product) => {
        const activeCardProduct =
          allActiveCardProducts?.[product as unknown as EulogiseCardProducts]
        const cardProductId = activeCardProduct?.id
        const isProductReadyToGenerate = [
          MemorialVisualStatus.EDITED,
          MemorialVisualStatus.COMPLETE,
        ].includes(
          activeCardProduct?.status ?? MemorialVisualStatus.NOT_STARTED,
        )
        const hasProductGenerated =
          activeCardProduct?.fileStatus === ResourceFileStatus.GENERATED
        if (cardProductId && isProductReadyToGenerate && !hasProductGenerated) {
          const productName: string = CardProductHelper.getProductName({
            product,
            region,
          })
          dispatch(
            generateCardProduct({
              product: product as unknown as EulogiseProduct,
              caseId,
              cardProductId,
            }),
          )
          Notification.success(`${productName} is being generated.`)
        }
      })
    }
  }

  useEffect(() => {
    if (!packageOption) {
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
    }
    if (caseId && region) {
      dispatch(fetchAllProductsByCaseId({ caseId, region }))
    }
    if (!isCollapsed) {
      dispatch(collapseSiderMenu())
    }
  }, [])

  if (!activeCase) {
    return null
  }

  const onPurchase = useCallback(
    (stripePaymentMethod: PaymentMethod) => {
      if (!packageOption || !caseId) {
        return
      }
      const currency: string = CheckoutHelper.getStripeCurrencyCodeByCountry({
        country,
      })
      const orderSummary: IOrderSummaryDetails = {
        digitalDownloadFee: digitalPriceFee,
        leatherVideoTributeBookFee,
        photoBookTributeFee: photoBookFee,
        shippingFee: totalShippingFee,
        printingFee: printingFee,
        subtotalFee: CheckoutHelper.getTotalPrice({
          packageFee: digitalPriceFee,
          photoBookFee: photoBookFee,
          leatherVideoTributeBookFee,
          shippingFee: totalShippingFee,
          printingFee: printingFee,
        }),
      }
      const orderDetails: IOrderDetails = {
        packageOption,
        country,
        orderSummary,
        paymentDetails,
        keepsakesDetails: {
          leatherVideoTributeBook,
          photoBook,
        },
        billingAddressDetails,
        currency,
        printingDetails: {
          printingMethod: printingDetails?.printingMethod,
          orderedProductsDetails: printingDetails?.orderedProductsDetails,
          printingAddressDetails: printingDetails?.printingAddressDetails,
          printingShippingMethod: printingDetails?.printingShippingMethod,
        },
      }
      setIsPurchasing(true)
      dispatch(
        createPayment({
          paymentMethod: stripePaymentMethod,
          orderDetails,
          caseId: caseId!,
          success: () => {
            setIsPurchasing(false)
            if (selectedOrderPrintingProducts || isPhotoBookAdded) {
              generateSelectedPrintingTributeByProduct({
                selectedOrderPrintingProducts:
                  selectedOrderPrintingProducts?.concat(
                    isPhotoBookAdded ? [EulogiseProduct.PHOTOBOOK] : [],
                  ),
              })
            }
            dispatch(
              fetchCaseById({
                caseId,
                success: () =>
                  NavigationHelper.navigate(
                    EulogisePage.CHECKOUTS_V2_THANK_YOU,
                  ),
              }),
            )
          },
          failed: () => {
            setIsPurchasing(false)
          },
        }),
      )
    },
    [
      packageOption,
      caseId,
      country,
      digitalPriceFee,
      photoBookFee,
      leatherVideoTributeBookFee,
      totalShippingFee,
      printingFee,
      paymentDetails,
      leatherVideoTributeBook,
      billingAddressDetails,
      printingDetails,
      selectedOrderPrintingProducts,
      dispatch,
      setIsPurchasing,
    ],
  )

  const renderPaymentDetailForm = () => {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutsForm
          onSubmit={onPurchase}
          isPurchasing={isPurchasing}
          onUpdateIsComingFromPaymentPage={(isComingFromPaymentPage: any) =>
            dispatch(updateIsComingFromPaymentPage(isComingFromPaymentPage))
          }
          onFormReady={(submitFn: () => void) => setSubmitForm(() => submitFn)}
        />
      </Elements>
    )
  }

  const renderActionButtons = () => {
    const handleBack = () => {
      if (isShippingEnabled) {
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_SHIPPING)
      } else if (isAnyKeepsakeProductAdded) {
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      } else if (isPrintingDeliveryOrdered) {
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      } else {
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
      }
    }

    return (
      <StyledActionButtonGroups>
        <StyledBackToEditing
          onClick={!isPurchasing ? handleBack : undefined}
          aria-disabled={isPurchasing}
          $disabled={isPurchasing}
        >
          Back
        </StyledBackToEditing>
        <StyledNextButton
          loading={isPurchasing}
          buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
          buttonSize={ButtonSize.XMD}
          noMarginLeft
          noMarginRight
          disabled={
            isPurchasing ||
            paymentDetails?.method === CHECKOUT_PAYMENT_METHODS.PAYPAL
          }
          onClick={() => {
            if (submitForm) {
              submitForm()
            }
          }}
        >
          {isPurchasing ? `Payment Processing` : `Pay and complete purchase`}
        </StyledNextButton>
      </StyledActionButtonGroups>
    )
  }

  const renderBreadCrumbs = () => {
    return (
      <BreadCrumbs
        url={CHECKOUT_V2_URL_STEPS_MAPS.PAYMENT}
        packageOption={packageOption}
        shouldShowPrintingDetails={CheckoutHelper.getShouldShowPrintingDetailsBreadcrumbs(
          {
            packageOption,
            country,
            role: role ?? null,
            allowPurchasing: activeClient?.allowPurchasing,
          },
        )}
        shouldShowPrintingOptions={isPrintingDeliveryOrdered}
        shouldShowKeepsakes={isAnyKeepsakeProductAdded || isPhotoBookAdded}
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

  const renderOrderSummary = () => {
    return (
      <OrderSummaryContainer
        showPrintingFee={printingFee > 0}
        showShippingFee={showShippingFee}
        showShippingCalculatedNext={false}
        showPrintPriceCalculatedNext={false}
        printingFee={printingFee}
        shippingFee={shippingFee}
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

  return (
    <StyledPaymentPage title="Payment" location={location} noPadding={true}>
      <TwoColumnsPageLayout
        headerLeft={
          <>
            <Header text={'Checkout'} />
            {renderBreadCrumbs()}
          </>
        }
        headerRight={
          <StyledActionButtonsDesktop>
            {renderActionButtons()}
          </StyledActionButtonsDesktop>
        }
        contentLeft={renderPaymentDetailForm()}
        contentRight={
          <>
            <StyledActionButtonsMobile>
              {renderActionButtons()}
            </StyledActionButtonsMobile>
            {renderOrderSummary()}
          </>
        }
      />
    </StyledPaymentPage>
  )
}

export default PaymentPage
