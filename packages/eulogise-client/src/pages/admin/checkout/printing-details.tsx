import React, { useEffect, useMemo, useCallback } from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../../ui/components/Layout/Layout'
import { ButtonType, Button, ButtonSize } from '@eulogise/client-components'
import { OrderSummaryContainer } from '../../../ui/containers/Checkoutv2/OrderSummaryContainer'
import { NavigationHelper, CheckoutHelper } from '@eulogise/helpers'
import {
  useAuthState,
  useCaseState,
  useCheckoutsState,
  useClientState,
  useEulogiseDispatch,
  useSiderMenuState,
} from '../../../ui/store/hooks'
import {
  restoreCheckoutsState,
  updatePaymentOption,
  updatePrintingDetails,
} from '../../../ui/store/CheckoutsState/action'
import {
  EulogisePackageOptions,
  ICaseState,
  EulogiseCountry,
  EulogisePage,
  ICheckoutsState,
  EulogiseUserRole,
  IAuthState,
  ADDRESS_INPUT_MODE,
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  IPrintingDetails,
  EulogizePrintingDetailsOrderedProductsDetailsInitialState,
  CHECKOUTS_SHIPPING_PRODUCTS,
  ISiderMenuState,
  EulogiseEditorPaymentConfig,
} from '@eulogise/core'
import { fetchInvoices } from '../../../ui/store/InvoiceState/actions'
import { fetchAllProductsByCaseId } from '../../../ui/store/CardProduct/actions'
import Header from '../../../ui/components/Checkoutv2/Header'
import { PrintingOptionsContainer } from '../../../ui/containers/Checkoutv2/PrintingOptionsContainer'
import {
  BreadCrumbs,
  CHECKOUT_V2_URL_STEPS_MAPS,
} from '@eulogise/client-components'
import { collapseSiderMenu } from '../../../ui/store/SiderMenuState/action'
import { CHECKOUT_BREAKPOINT } from '@eulogise/client-core'

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

const CHECKOUT_V2_PRINTING_OPTIONS_DETAILS = [
  {
    id: 'add-printing-and-delivery',
    method: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED,
    headerText: 'Add printing and delivery',
    description: [
      'Enter your address below to check if print and delivery is available in your area:',
    ],
    showAddressInput: true,
    thumbnailSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/printing-options/printing-and-deliver-option-thumbnail.png`,
    appliedPackages: [
      EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
      EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
      EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
      EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
    ],
  },
  {
    id: 'no-printing-ordered',
    method: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.NO_PRINTING_ORDERED,
    headerText: `No, I don't want printing & delivery`,
    description: [
      `You can return to purchase printing at a later date, if you change your mind.`,
    ],
    showAddressInput: false,
    thumbnailSrc: null,
    appliedPackages: [
      EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
      EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
      EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
      EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
    ],
  },
]

const StyledPackagePage = styled(Layout)`
  margin: ${PAGE_MARGIN_MOBILE};

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    margin: ${PAGE_MARGIN_MD};
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    margin: ${PAGE_MARGIN_LG};
  }
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
    gap: 24px;
  }
`

const StyledHeaderLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  flex: 1;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${LEFT_COLUMN_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${LEFT_COLUMN_WIDTH_XL}px;
  }
`

const StyledHeaderRightContainer = styled.div`
  display: none;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    display: flex;
    width: ${RIGHT_COLUMN_WIDTH_MD_TO_LG}px;
    justify-content: flex-end;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    display: flex;
    width: ${RIGHT_COLUMN_WIDTH_XL}px;
    justify-content: flex-end;
  }
`

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;

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
  justify-content: flex-start;
  flex: 1;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${LEFT_COLUMN_WIDTH_MD_TO_LG}px;
    align-items: flex-end;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${LEFT_COLUMN_WIDTH_XL}px;
    align-items: flex-end;
  }
`

const StyledRightContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  flex-shrink: 0;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${RIGHT_COLUMN_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${RIGHT_COLUMN_WIDTH_XL}px;
  }
`

const StyledPrintingOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: flex-start;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    align-items: flex-end;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    align-items: flex-end;
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
  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    display: none;
  }
`

const StyledBackToEditing = styled.div`
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

const PrintingDetailsPage: React.FC<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()
  const { packageOption, printingDetails, keepsakesDetails }: ICheckoutsState =
    useCheckoutsState()

  const { isCollapsed }: ISiderMenuState = useSiderMenuState()
  const {
    printingMethod,
    orderedProductsDetails,
    printingShippingMethod,
    printingAddressDetails,
  } = printingDetails
  const { isValidAddress } = printingAddressDetails
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const { activeItem: activeClient } = useClientState()
  const caseId = activeCase?.id!
  const region = activeCase?.region!
  const country: EulogiseCountry = activeCase?.country!
  const role = account?.role ?? null
  const shouldEditorOrFuneralHomeNeedToPay =
    activeCase?.editorPaymentConfig ===
    EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY
  const isHasToPayEditorOrClient =
    role &&
    [EulogiseUserRole.EDITOR, EulogiseUserRole.CLIENT].includes(role) &&
    shouldEditorOrFuneralHomeNeedToPay

  const digitalPriceFee: number = useMemo(
    () =>
      CheckoutHelper.getPackagePriceByCountry({
        country,
        packageOption,
      }),
    [country, packageOption],
  )

  const countryCurrencySymbol = useMemo(
    () => CheckoutHelper.getCurrencySymbolByCountry({ country }),
    [country],
  )

  const printingProductDetailsSummary = useMemo(
    () =>
      CheckoutHelper.getPrintingProductOrderSummaryByOrderedProductsDetails({
        orderedProductsDetails: printingDetails.orderedProductsDetails,
      }),
    [printingDetails.orderedProductsDetails],
  )

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

  useEffect(() => {
    dispatch(fetchAllProductsByCaseId({ caseId, region }))
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

  useEffect(() => {
    if (!printingMethod) {
      const updatedPrintingDetails = {
        ...printingDetails,
        printingMethod:
          CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED,
        orderedProductsDetails:
          EulogizePrintingDetailsOrderedProductsDetailsInitialState,
      }
      dispatch(updatePrintingDetails(updatedPrintingDetails))
    }
  }, [])

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

  const showPrintPriceCalculatedNext =
    printingMethod ===
    CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED

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

  const getCustomerFlowNextCTAText = () => {
    if (
      printingMethod ===
      CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.NO_PRINTING_ORDERED
    ) {
      return 'Continue to keepsakes'
    }
    return 'Continue to print options'
  }

  const getHasToPayEditorOrFuneralHomeNextCTAText = () => {
    if (
      printingMethod ===
      CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.NO_PRINTING_ORDERED
    ) {
      if (shouldShowKeepsakes) {
        return 'Continue to keepsakes'
      }
      return 'Continue to payment'
    }
    return 'Continue to print options'
  }

  const onUpdatePrintingDeliveryMethod = useCallback(
    ({
      selectedPrintingDeliveryMethod,
    }: {
      selectedPrintingDeliveryMethod: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD
    }) => {
      if (!selectedPrintingDeliveryMethod) {
        return
      }
      if (
        selectedPrintingDeliveryMethod ===
        CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED
      ) {
        if (
          packageOption ===
          EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY
        ) {
          dispatch(
            updatePaymentOption(
              EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
            ),
          )
        } else if (
          packageOption === EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY
        ) {
          dispatch(
            updatePaymentOption(
              EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
            ),
          )
        }
      } else if (
        selectedPrintingDeliveryMethod ===
        CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.NO_PRINTING_ORDERED
      ) {
        if (
          packageOption ===
          EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY
        ) {
          dispatch(
            updatePaymentOption(
              EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
            ),
          )
        } else if (
          packageOption ===
          EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY
        ) {
          dispatch(
            updatePaymentOption(
              EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
            ),
          )
        }
      }
      const updatedPrintingDetails = {
        ...printingDetails,
        printingMethod: selectedPrintingDeliveryMethod,
        printingAddressDetails: {
          ...printingDetails.printingAddressDetails,
          formattedAddress: null,
          isValidAddress: false,
          portalAddressMetaData: null,
          addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
        },
        orderedProductsDetails:
          EulogizePrintingDetailsOrderedProductsDetailsInitialState,
      }
      dispatch(updatePrintingDetails(updatedPrintingDetails))
    },
    [printingDetails, dispatch],
  )

  const onBack = useCallback(() => {
    NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
    const updatedPrintingDetails: IPrintingDetails = {
      ...printingDetails,
      printingMethod: null,
      printingAddressDetails: {
        ...printingDetails.printingAddressDetails,
        formattedAddress: null,
        isValidAddress: false,
        portalAddressMetaData: null,
        addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
      },
      orderedProductsDetails:
        EulogizePrintingDetailsOrderedProductsDetailsInitialState,
    }
    dispatch(updatePrintingDetails(updatedPrintingDetails))
    dispatch(updatePaymentOption(null))
    NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
  }, [packageOption, printingMethod, printingDetails, dispatch])

  const renderPrintingOptions = useCallback(
    () => (
      <StyledPrintingOptionsContainer>
        {CHECKOUT_V2_PRINTING_OPTIONS_DETAILS.filter((option) =>
          option.appliedPackages.includes(packageOption!),
        ).map((option) => {
          const {
            id,
            method,
            headerText,
            description,
            showAddressInput,
            thumbnailSrc,
          } = option
          return (
            <PrintingOptionsContainer
              key={id}
              selectedPrintingDeliveryMethod={printingMethod}
              onChange={onUpdatePrintingDeliveryMethod}
              id={id}
              method={method}
              headerText={headerText}
              description={description}
              showAddressInput={showAddressInput}
              thumbnailSrc={thumbnailSrc}
            />
          )
        })}
      </StyledPrintingOptionsContainer>
    ),
    [printingMethod, onUpdatePrintingDeliveryMethod],
  )

  const isContinueToPrintOptionDisabled = useMemo(
    () =>
      (printingMethod ===
        CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED &&
        !isValidAddress) ||
      !printingShippingMethod,
    [printingMethod, isValidAddress, printingShippingMethod],
  )

  const nextCTAText = isHasToPayEditorOrClient
    ? getHasToPayEditorOrFuneralHomeNextCTAText()
    : getCustomerFlowNextCTAText()

  const handleNextClick = useCallback(() => {
    if (!packageOption || !printingMethod) {
      return
    }

    if (
      [
        EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
        EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
        EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
      ].includes(packageOption) &&
      printingMethod ===
        CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED
    ) {
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_OPTIONS)
    } else {
      if (isHasToPayEditorOrClient && !shouldShowKeepsakes) {
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
        return
      }
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
    }
  }, [packageOption, printingMethod])

  const renderActionButtons = useCallback(
    () => (
      <StyledActionButtonGroups>
        <StyledBackToEditing onClick={onBack}>Back</StyledBackToEditing>
        <StyledNextButton
          buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
          buttonSize={ButtonSize.XMD}
          onClick={handleNextClick}
          disabled={isContinueToPrintOptionDisabled}
        >
          {nextCTAText}
        </StyledNextButton>
      </StyledActionButtonGroups>
    ),
    [onBack, handleNextClick, isContinueToPrintOptionDisabled],
  )

  const renderOrderSummary = useCallback(
    () => (
      <OrderSummaryContainer
        showPrintingFee={printingFee > 0}
        showShippingFee={showShippingFee}
        showShippingCalculatedNext={false}
        showPrintPriceCalculatedNext={showPrintPriceCalculatedNext}
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
    ),
    [
      printingFee,
      printingShippingMethod,
      printingShippingFee,
      digitalPriceFee,
      countryCurrencySymbol,
      packageOption,
      shippingProductsOrderSummaryByDetails,
      printingProductDetailsSummary,
      country,
    ],
  )

  const handleBreadcrumbRedirect = useCallback(
    (pageUrl: EulogisePage) => NavigationHelper.navigate(pageUrl),
    [],
  )

  const renderBreadCrumbs = useCallback(() => {
    const shouldShowPrintingOptions =
      printingMethod ===
      CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED
    return (
      <BreadCrumbs
        url={CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_DETAILS}
        packageOption={packageOption}
        shouldShowPrintingDetails={CheckoutHelper.getShouldShowPrintingDetailsBreadcrumbs(
          {
            packageOption,
            country,
            role: account?.role ?? null,
            allowPurchasing: activeClient?.allowPurchasing,
          },
        )}
        shouldShowPrintingOptions={shouldShowPrintingOptions}
        shouldShowKeepsakes={shouldShowKeepsakes}
        shouldShowShipping={
          isHasToPayEditorOrClient &&
          !shouldShowKeepsakes &&
          printingMethod ===
            CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.NO_PRINTING_ORDERED
            ? false
            : true
        }
        onRedirect={handleBreadcrumbRedirect}
        onPackageClick={() => {
          dispatch(restoreCheckoutsState())
          handleBreadcrumbRedirect(EulogisePage.CHECKOUTS_V2_PACKAGE)
        }}
      />
    )
  }, [printingMethod, packageOption, handleBreadcrumbRedirect, dispatch])

  if (!activeCase) {
    return null
  }

  return (
    <StyledPackagePage
      title="Fill Your Printing Details"
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
    </StyledPackagePage>
  )
}

export default PrintingDetailsPage
