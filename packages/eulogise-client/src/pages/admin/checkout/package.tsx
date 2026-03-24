import React, { useEffect, useCallback, useRef, useState } from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import Layout from '../../../ui/components/Layout/Layout'
import {
  useAnyActiveCardProductIsFetching,
  useAuthState,
  useCaseState,
  useCheckoutsState,
  useClientState,
  useEulogiseDispatch,
  useInvoiceState,
  useSiderMenuState,
} from '../../../ui/store/hooks'
import {
  EulogisePackageOptions,
  ICaseState,
  EulogiseCountry,
  ISiderMenuState,
  EulogizeShippingAvailableCountries,
  EULOGIZE_CHECKOUT_PACKAGE_OPTION,
  IInvoiceState,
  IInvoice,
  EulogisePackageOptionTypes,
  EulogiseUserRole,
  EulogiseProduct,
  ICheckoutEntrySource,
  PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES,
  IAuthState,
  IAllowPurchasingOption,
  EulogiseEditorPaymentConfig,
  IEulogiseProductAvailabilityStatus,
} from '@eulogise/core'

import { COLOR } from '@eulogise/client-core'
import { useElementSize } from 'usehooks-ts'
import { PackageCardContainer } from '../../../ui/containers/Checkoutv2/PackageCardContainer'
import { collapseSiderMenu } from '../../../ui/store/SiderMenuState/action'
import { saveTemporaryCheckoutState } from '../../../ui/store/CheckoutsState/action'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { fetchInvoices } from '../../../ui/store/InvoiceState/actions'
import { CheckoutHelper, CaseHelper } from '@eulogise/helpers'
import { fetchAllProductsByCaseId } from '../../../ui/store/CardProduct/actions'

const DEFAULT_DISPLAYED_PACKAGES = [
  EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
  EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
  EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
  EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
]

const PAGE_PADDING = 40
const SIDE_MENU_WIDTH = 80
const SCROLL_THRESHOLD = 1
const SECTION_GUTTER: [number, number] = [0, 44]

const StyledPackagePage = styled(Layout)`
  padding: ${PAGE_PADDING}px ${PAGE_PADDING}px 0;
`

const StyledPackageContent = styled(Row)`
  width: 100%;
  margin: ${PAGE_PADDING}px 0 0 0;
`

const StyledPackagesWrapper = styled.div`
  position: relative;
`

const StyledRightFade = styled.div<{ $visible: boolean }>`
  position: absolute;
  right: 0;
  bottom: -1px;
  top: 0;
  width: 120px;
  opacity: ${({ $visible }) => ($visible ? 0.9 : 0)};
  background: linear-gradient(270deg, #fff 24.04%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 5;
`

const StyledPackagesContainer = styled.div<{ $isOverflowing: boolean }>`
  display: flex;
  justify-content: ${({ $isOverflowing }) =>
    $isOverflowing ? 'flex-start' : 'center'};
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;

  margin: 0 ${PAGE_PADDING}px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${4 * 316 + 2 * PAGE_PADDING + SIDE_MENU_WIDTH}px) {
    justify-content: flex-start;
  }
`

const StyledArrowButton = styled.button<{
  $position: 'left' | 'right'
  $visible: boolean
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) =>
    $position === 'left'
      ? `left: ${PAGE_PADDING}px;`
      : `right: ${PAGE_PADDING}px;`}
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;

  border-radius: 50%;
  border: 2px solid ${COLOR.LIGHT_GREY};
  background: ${COLOR.WHITE};
  box-shadow: 7px 17.5px 24.7px -0.7px rgba(187, 187, 187, 0.21),
    4.8px 12px 17px -0.5px rgba(187, 187, 187, 0.19),
    3.2px 7.9px 11.2px -0.4px rgba(187, 187, 187, 0.16),
    1.8px 4.5px 6.4px -0.2px rgba(187, 187, 187, 0.13),
    0.3px 0.8px 1.1px 0 rgba(187, 187, 187, 0.11);

  &:hover {
    background: ${COLOR.LIGHT_GRAY};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  svg {
    font-size: 20px;
    color: ${COLOR.LIGHT_GREY};
  }
`

const StyledPackageHeader = styled.div`
  color: ${COLOR.BLACK};
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  margin: 0;
`

const insertAfter = <T,>(arr: T[], target: T, item: T): T[] => {
  const idx = arr.indexOf(target)
  if (idx === -1) return arr
  return [...arr.slice(0, idx + 1), item, ...arr.slice(idx + 1)]
}

// Reorder packages based on source
const getOrderedFirstPurchasedPackages = ({
  source,
  country,
}: {
  source: string | null
  country: EulogiseCountry
}) => {
  if (!country) return []

  const isShippingAvailableCountry =
    EulogizeShippingAvailableCountries.includes(country)

  const getBaseOrders = ({ source }: { source: string | null }) => {
    if (!source) return DEFAULT_DISPLAYED_PACKAGES

    const SourceToProduct = Object.fromEntries(
      Object.entries(ICheckoutEntrySource).map(([key, value]) => [value, key]),
    ) as Record<string, EulogiseProduct>

    const product = SourceToProduct[source]

    switch (product) {
      case EulogiseProduct.BOOKLET:
      case EulogiseProduct.BOOKMARK:
      case EulogiseProduct.SIDED_CARD:
      case EulogiseProduct.THANK_YOU_CARD:
      case EulogiseProduct.TV_WELCOME_SCREEN:
        return [
          EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
          EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
          EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
          EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
        ]
      case EulogiseProduct.SLIDESHOW:
        return [
          EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
          EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
          EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
          EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
        ]
      case EulogiseProduct.PHOTOBOOK:
        return [
          EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
          EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
          EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
          EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
        ]
      default:
        return [
          EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
          EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
          EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
          EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
        ]
    }
  }

  const order = getBaseOrders({ source })
  if (!order) return DEFAULT_DISPLAYED_PACKAGES

  return isShippingAvailableCountry
    ? insertAfter(
        order,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
      )
    : order
}

const getPostPurchasedCustomerUserPackages = ({
  country,
  purchasedPackages,
  invoices,
}: {
  country: EulogiseCountry
  purchasedPackages: Array<EulogisePackageOptions>
  invoices: Array<IInvoice>
}): EulogisePackageOptions[] => {
  if (!country || !purchasedPackages) {
    return []
  }

  const keepsakesPackages = EULOGIZE_CHECKOUT_PACKAGE_OPTION.filter(
    (p) => p.isKeepsake,
  )

  const displayedKeepsakesPackages = keepsakesPackages
    .filter((p) => p.displayInPackagePage)
    .map((p) => p.value)

  const {
    isBundlePurchased,
    isPrintingDeliveryPackagePurchased,
    isVideoScreenAndSlideshowPackagePurchased,
  } = CheckoutHelper.getPurchasedPackagesDetailsBasedOnInvoices({ invoices })

  if (isBundlePurchased) {
    return displayedKeepsakesPackages
  } else if (
    isPrintingDeliveryPackagePurchased &&
    isVideoScreenAndSlideshowPackagePurchased
  ) {
    return [
      EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
      EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
    ]
  } else if (isPrintingDeliveryPackagePurchased) {
    return [
      EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
      EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
      EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
    ]
  } else if (isVideoScreenAndSlideshowPackagePurchased) {
    return [
      EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
      EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
    ]
  }
  return displayedKeepsakesPackages
}

const getShouldShowPostPurchsedPackage = ({
  purchasedPackages,
}: {
  purchasedPackages: EulogisePackageOptions[]
}) => {
  if (!purchasedPackages || purchasedPackages.length === 0) {
    return false
  }
  const firstTimePurchsedPackages = EULOGIZE_CHECKOUT_PACKAGE_OPTION.filter(
    (p) => p.type === EulogisePackageOptionTypes.FIRST_TIME_CHECKOUT_PACKAGE,
  ).map((p) => p.value)

  return firstTimePurchsedPackages.some((item) =>
    purchasedPackages.includes(item),
  )
}

const PackagePage: React.FC<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const country: EulogiseCountry = activeCase?.country!
  const { account }: IAuthState = useAuthState()
  const checkoutsState = useCheckoutsState()

  const { activeItem: activeClient } = useClientState()
  const allowPurchasing: IAllowPurchasingOption | undefined =
    activeClient?.allowPurchasing

  const caseId = activeCase?.id!
  const region = activeCase?.region!

  const isAnyFetching = useAnyActiveCardProductIsFetching()

  const role = account?.role
  const editorPaymentConfig = activeCase?.editorPaymentConfig ?? null

  const { items: invoices = [] }: IInvoiceState = useInvoiceState()

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  // Get the source from query parameters
  const queryParams = new URLSearchParams(location.search)
  const source = queryParams.get('source')

  const purchasedPackages = invoices
    ?.filter((i) => i.status === 'complete')
    ?.map((invoice) => invoice?.details?.packageOption)

  const shouldShowPostPurchsedPackages = getShouldShowPostPurchsedPackage({
    purchasedPackages,
  })

  const enabledProducts = activeCase
    ? CaseHelper.getEnabledProducts({ activeCase })
    : {}

  const getDisplayedPackages = ({
    role,
    shouldShowPostPurchsedPackages,
    country,
    purchasedPackages,
    invoices,
    source,
    allowPurchasing,
    editorPaymentConfig,
    enabledProducts,
  }: {
    role: EulogiseUserRole
    shouldShowPostPurchsedPackages: boolean
    country: EulogiseCountry
    purchasedPackages: EulogisePackageOptions[]
    invoices: IInvoice[]
    source: string | null
    allowPurchasing: IAllowPurchasingOption | undefined
    editorPaymentConfig: string | null
    enabledProducts: IEulogiseProductAvailabilityStatus
  }) => {
    const getFirstTimePackages = () =>
      getOrderedFirstPurchasedPackages({ source, country })

    const getPostPurchasePackages = () =>
      getPostPurchasedCustomerUserPackages({
        country,
        purchasedPackages,
        invoices,
      })

    const getFlowPackages = () =>
      shouldShowPostPurchsedPackages
        ? getPostPurchasePackages()
        : getFirstTimePackages()

    const isClientOrEditor =
      role === EulogiseUserRole.CLIENT || role === EulogiseUserRole.EDITOR

    if (role === EulogiseUserRole.CUSTOMER) {
      return getFlowPackages()
    }

    if (isClientOrEditor) {
      const editorDoesNotNeedToPay =
        editorPaymentConfig ===
        EulogiseEditorPaymentConfig.EDITOR_DOES_NOT_NEED_TO_PAY

      if (editorDoesNotNeedToPay) {
        return CheckoutHelper.getPaidCaseFuneralHomeOrEditorDisplayedKeepsakesPackages(
          {
            role,
            country,
            allowPurchasing,
            enabledProducts,
          },
        )
      } else {
        if (!shouldShowPostPurchsedPackages) {
          return CheckoutHelper.getHasToPayCaseFuneralHomeOrEditorDisplayedFirstTimePurchasePackages(
            {
              role,
              country,
              allowPurchasing,
              preDisplayedPackages: getFlowPackages(),
              enabledProducts,
            },
          )
        }
        return CheckoutHelper.getHasToPayCaseFuneralHomeOrEditorDisplayedPostPurchasePackages(
          {
            role,
            country,
            allowPurchasing,
            postPurchasedPackages: getFlowPackages(),
            enabledProducts,
          },
        )
      }
    }

    return []
  }

  const displayedPackages = getDisplayedPackages({
    role: account?.role!,
    shouldShowPostPurchsedPackages,
    country,
    purchasedPackages,
    invoices,
    source,
    allowPurchasing,
    editorPaymentConfig,
    enabledProducts,
  })

  const getSourceOrderedDisplayedPackages = ({
    displayedPackages,
    source,
  }: {
    displayedPackages: EulogisePackageOptions[]
    source: string | null
  }) => {
    const isPhotobookSource =
      source === ICheckoutEntrySource[EulogiseProduct.PHOTOBOOK]
    const hasPhotobookPackage = displayedPackages.includes(
      EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
    )

    if (!isPhotobookSource || !hasPhotobookPackage) {
      return displayedPackages
    }

    return [
      EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
      ...displayedPackages.filter(
        (p) => p !== EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
      ),
    ]
  }

  const sourceOrderedDisplayedPackages = getSourceOrderedDisplayedPackages({
    displayedPackages,
    source,
  })

  const noPhotoBookDisplayedPackages = sourceOrderedDisplayedPackages?.filter(
    (p: EulogisePackageOptions) =>
      p !== EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
  )

  const filteredDisplayedPackages =
    !PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country)
      ? noPhotoBookDisplayedPackages ?? []
      : sourceOrderedDisplayedPackages ?? []

  const { isCollapsed }: ISiderMenuState = useSiderMenuState()

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current
      const maxScrollLeft = Math.max(scrollWidth - clientWidth, 0)

      setIsOverflowing(maxScrollLeft > SCROLL_THRESHOLD)
      setShowLeftArrow(scrollLeft > SCROLL_THRESHOLD)
      setShowRightArrow(maxScrollLeft - scrollLeft > SCROLL_THRESHOLD)
    }
  }, [scrollContainerRef.current?.scrollWidth])

  const scrollToDirection = useCallback(
    (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current
        const maxScrollLeft = Math.max(scrollWidth - clientWidth, 0)
        const targetScroll = direction === 'left' ? 0 : maxScrollLeft

        setShowLeftArrow(targetScroll > SCROLL_THRESHOLD)
        setShowRightArrow(maxScrollLeft - targetScroll > SCROLL_THRESHOLD)

        scrollContainerRef.current.scrollTo({
          left: targetScroll,
          behavior: 'smooth',
        })

        if (typeof requestAnimationFrame === 'function') {
          requestAnimationFrame(() => {
            checkScrollButtons()
          })
        } else {
          checkScrollButtons()
        }
      }
    },
    [checkScrollButtons],
  )

  useEffect(() => {
    if (!isCollapsed) {
      dispatch(collapseSiderMenu())
    }
    // Clear temporary checkout state when entering the package page
    if (checkoutsState.temporaryCheckoutState) {
      dispatch(saveTemporaryCheckoutState(null))
    }
    if (caseId && region) {
      dispatch(fetchAllProductsByCaseId({ caseId, region }))
    }
    // reset()
  }, [])

  useEffect(() => {
    if (
      role &&
      [
        EulogiseUserRole.CUSTOMER,
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.EDITOR,
        EulogiseUserRole.ADMIN,
      ].includes(account?.role)
    ) {
      dispatch(fetchInvoices({ caseId }))
    }
  }, [caseId])

  useEffect(() => {
    checkScrollButtons()

    const handleScroll = () => {
      checkScrollButtons()
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      // Check on resize as well
      window.addEventListener('resize', checkScrollButtons)

      return () => {
        container.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', checkScrollButtons)
      }
    } else {
      return () => null
    }
  }, [checkScrollButtons])

  useEffect(() => {
    checkScrollButtons()
  }, [filteredDisplayedPackages.length, checkScrollButtons])

  const [containerRef] = useElementSize()

  if (!activeCase) {
    return (
      <StyledPackagePage title="Choose your package" location={location}>
        <StyledPackageContent gutter={SECTION_GUTTER}>
          <Col span={24}>
            <StyledPackageHeader>Loading case...</StyledPackageHeader>
          </Col>
        </StyledPackageContent>
      </StyledPackagePage>
    )
  }

  return (
    <StyledPackagePage title="Choose your package" location={location}>
      <StyledPackageContent ref={containerRef} gutter={SECTION_GUTTER}>
        <Col span={24}>
          <StyledPackageHeader>
            {isAnyFetching
              ? 'Loading your tributes data, please wait...'
              : 'Select your tribute package'}
          </StyledPackageHeader>
        </Col>
        {!isAnyFetching && (
          <Col span={24}>
            <StyledPackagesWrapper>
              <StyledArrowButton
                $position="left"
                $visible={showLeftArrow}
                onClick={() => scrollToDirection('left')}
                aria-label="Scroll left"
              >
                <LeftOutlined />
              </StyledArrowButton>
              <StyledPackagesContainer
                ref={scrollContainerRef}
                $isOverflowing={isOverflowing}
              >
                {filteredDisplayedPackages.map(
                  (displayedPackage: EulogisePackageOptions) => (
                    <PackageCardContainer
                      key={displayedPackage}
                      country={country}
                      packageOption={displayedPackage}
                    />
                  ),
                )}
              </StyledPackagesContainer>
              <StyledRightFade $visible={showRightArrow} />
              <StyledArrowButton
                $position="right"
                $visible={showRightArrow}
                onClick={() => scrollToDirection('right')}
                aria-label="Scroll right"
              >
                <RightOutlined />
              </StyledArrowButton>
            </StyledPackagesWrapper>
          </Col>
        )}
      </StyledPackageContent>
    </StyledPackagePage>
  )
}

export default PackagePage
