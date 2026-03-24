import React, { useEffect } from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../../ui/components/Layout/Layout'
import {
  ForeverMemorialKeepsakes,
  StillEditingTributes,
} from '@eulogise/client-components'
import {
  NavigationHelper,
  CheckoutHelper,
  AccountHelper,
  CardProductHelper,
} from '@eulogise/helpers'
import {
  CaseStatus,
  DrawerId,
  EulogiseCardProducts,
  EulogiseCountry,
  EulogiseEditorPaymentConfig,
  EulogiseLeatherVideoTributeBookOptions,
  EulogisePackageOptions,
  EulogisePackageOptionTypes,
  EulogisePage,
  EulogiseProduct,
  EulogiseUserRole,
  EULOGIZE_CHECKOUT_PACKAGE_OPTION,
  EulogizeShippingAvailableCountries,
  IAllowPurchasingOption,
  ICase,
  ICaseState,
  IInvoiceState,
  KEEPSAKE_PRODUCTS,
  ModalId,
  PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES,
} from '@eulogise/core'
import {
  useAllGenericCardProductTypes,
  useAllProductsState,
  useAuthState,
  useCaseState,
  useClientState,
  useEulogiseDispatch,
  useInvoiceState,
  usePhotobookState,
} from '../../../ui/store/hooks'
import { STYLE } from '@eulogise/client-core'
import { DownloadTributeProduct } from '../../../ui/components/Checkoutv2/DownloadTributeProduct'
import { DownloadCardProductRowContainer } from '../../../ui/containers/Checkoutv2/DownloadCardProductRowContainer'
import { fetchAllProductsByCaseId } from '../../../ui/store/CardProduct/actions'
import {
  restoreCheckoutsState,
  updateIsComingFromPaymentPage,
  updateLeatherVideoTributeBookOrderSelection,
  updatePaymentOption,
  updatePendingKeepsakesDrawerProduct,
} from '../../../ui/store/CheckoutsState/action'
import {
  markHasAccessedDownloadPageTrue,
  updateCaseById,
} from '../../../ui/store/CaseState/actions'
import { reeditProductAction } from '../../../ui/store/AdminState/actions'
import { fetchInvoices } from '../../../ui/store/InvoiceState/actions'
import { showModalAction } from '../../../ui/store/ModalState/actions'
import { useElementSize } from 'usehooks-ts'
import { openDrawerAction } from '../../../ui/store/DrawerState/actions'
import { StateHelper } from '../../../ui/helpers/StateHelper'
import {
  DOWNLOAD_PAGE_LEFT_CONTAINER_WIDTH,
  DOWNLOAD_PAGE_RIGHT_CONTAINER_WIDTH,
  DownloadPageContainer,
  DownloadPageLeftContentContainer,
  DownloadPageRightContentContainer,
  DownloadPageThankYouHeader,
} from '../../../ui/styles/DownloadPage.styles'
import { fetchGenericCardProductTypes } from '../../../ui/store/GenericCardProductTypeState'

const StyledDownloadPage = styled(Layout)``

const StyledDownloadTributesHeader = styled.div`
  margin: 30px 0px 8px 0;
  ${STYLE.HEADING_MEDIUM};
`

const StyledSubTitle = styled.div`
  margin: 0px 0px 8px 0;
`

const StyledPlaceHolderSpace = styled.div`
  height: 16px;
`

const StyledGenerateAndDownloadContainer = styled.div`
  > div {
    border-bottom: 1px solid #eaeaee;
    &:last-child {
      border-bottom: none;
    }
  }
`

const DownloadPage: React.FC<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem }: ICaseState = useCaseState()
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const caseId = activeItem?.id!
  const region = activeItem?.region!
  const country: EulogiseCountry = activeItem?.country!
  const deceased = activeItem?.deceased!
  const { activeItem: activeClient } = useClientState()
  const allowPurchasing: IAllowPurchasingOption | undefined =
    activeClient?.allowPurchasing
  const deceasedName = deceased?.fullName
  const { items: invoices = [] }: IInvoiceState = useInvoiceState()
  const allProductsState = useAllProductsState()
  const { account } = useAuthState()
  const role = account?.role!
  const isAllowingFuneralHomePurchase =
    role === EulogiseUserRole.CLIENT &&
    CheckoutHelper.getHasFuneralHomeCanOrder({ allowPurchasing })

  const isAllowingEditorPurchase =
    role === EulogiseUserRole.EDITOR &&
    CheckoutHelper.getHasFamilyCanOrder({ allowPurchasing })

  const shouldShowForeverKeepsakes =
    role === EulogiseUserRole.CUSTOMER ||
    isAllowingFuneralHomePurchase ||
    isAllowingEditorPurchase

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const { activeItem: activePhotobook } = usePhotobookState()
  const isClientCase: boolean = !!activeCase?.client
  const isAdmin = role === EulogiseUserRole.ADMIN
  const isPaid: boolean = activeCase?.status === CaseStatus.PAID
  const isEditor = role === EulogiseUserRole.EDITOR
  const editorPaymentConfig = activeCase?.editorPaymentConfig
  const shouldByPassInvoicesCheck =
    isAdmin ||
    ((isEditor || isClientCase) &&
      editorPaymentConfig !== EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY)

  const hasAccessedDownloadPage: boolean =
    activeCase?.hasAccessedDownloadPage ?? false

  const cardProductsAvailableForDownload = shouldByPassInvoicesCheck
    ? AccountHelper.getAvailableCardProducts({
        activeCase: activeCase!,
        genericProductTypes,
      })
    : CheckoutHelper.getAvailableCardProductsForDownloadProductsByInvoices(
        invoices,
      )

  const otherTributesAvailableToCreatePurchase = shouldByPassInvoicesCheck
    ? []
    : CheckoutHelper.getOtherTributesAvailableToPurchaseCardProductsByInvoices(
        invoices,
      )

  const shouldShowOtherTributesAvailableToCreateAndPurchaseSection =
    otherTributesAvailableToCreatePurchase?.length > 0

  const isSlideshowGeneratable = shouldByPassInvoicesCheck
    ? true
    : CheckoutHelper.isSlideshowGeneratable(invoices)

  const baseForeverMemorialsKeepsakes =
    CheckoutHelper.getEulogizeForeverMemorialsKeepsakes({
      onViewProductVideoBook: () => {
        dispatch(restoreCheckoutsState())
        dispatch(
          updatePaymentOption(EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK),
        )
        dispatch(
          updateLeatherVideoTributeBookOrderSelection(
            EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK,
          ),
        )
        dispatch(
          updatePendingKeepsakesDrawerProduct(KEEPSAKE_PRODUCTS.VIDEO_BOOKS),
        )
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      },
      onViewProductPhotoBook: () => {
        dispatch(restoreCheckoutsState())
        dispatch(
          updatePaymentOption(EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK),
        )
        dispatch(
          updatePendingKeepsakesDrawerProduct(KEEPSAKE_PRODUCTS.PHOTO_BOOKS),
        )
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      },
      onViewProductPremiumPrinting: () => {
        dispatch(restoreCheckoutsState())
        dispatch(
          updatePaymentOption(EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING),
        )
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      },
      country,
    })

  const [containerRef, { width: containerWidth }] = useElementSize()

  const shouldStackContainers: boolean =
    containerWidth <
    DOWNLOAD_PAGE_LEFT_CONTAINER_WIDTH + DOWNLOAD_PAGE_RIGHT_CONTAINER_WIDTH

  const isAnyProductsStillFetching =
    StateHelper.getIsAnyProductStillFetching(allProductsState)

  const isAnyProductGenerating =
    StateHelper.getIsAnyProductStillGenerating(allProductsState)

  const shouldNotAccessDownloadPage: boolean =
    (role === EulogiseUserRole.CUSTOMER && !isPaid) || !caseId || !region

  const onKeepEditing = ({
    product,
    productId,
    slug,
  }: {
    product: EulogiseProduct
    productId: string | undefined
    slug?: string
  }) => {
    if (!product || !productId) {
      return
    }
    dispatch(
      reeditProductAction({
        product,
        productId,
        region,
        slug,
      }),
    )
  }

  const onPurchase = ({
    purchaseProduct,
  }: {
    purchaseProduct: EulogiseProduct
  }) => {
    if (
      [
        EulogiseProduct.BOOKLET,
        EulogiseProduct.BOOKMARK,
        EulogiseProduct.SIDED_CARD,
        EulogiseProduct.THANK_YOU_CARD,
      ].includes(purchaseProduct)
    ) {
      dispatch(
        updatePaymentOption(EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY),
      )
    } else if (
      [EulogiseProduct.SLIDESHOW, EulogiseProduct.TV_WELCOME_SCREEN].includes(
        purchaseProduct,
      )
    ) {
      dispatch(
        updatePaymentOption(EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES),
      )
    } else if (purchaseProduct === EulogiseProduct.PHOTOBOOK) {
      dispatch(
        updatePaymentOption(EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK),
      )
    }
    NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
  }

  const onStartCreating = ({
    product,
    slug,
  }: {
    product: EulogiseProduct
    slug?: string
  }) => {
    if (product === EulogiseProduct.PHOTOBOOK) {
      // NavigationHelper.navigate(EulogisePage.DASHBOARD)
      // dispatch(showModalAction(ModalId.SELECT_PHOTOBOOK_DESIGN, {}))
      dispatch(openDrawerAction(DrawerId.PHOTOBOOK_DRAWER))
    } else {
      const genericProductType = slug
        ? CardProductHelper.getGenericProductTypeBySlug({
            slug,
            genericProductTypes,
          })
        : undefined

      dispatch(
        openDrawerAction(DrawerId.THEME_SELECTION_DRAWER, {
          genericProductType,
          productType:
            CardProductHelper.convertProductTypeToGenericIfNotFound(product),
          isNavigateToProductWhenApplyTheme: true,
        }),
      )
    }
  }

  const firstTimePurchsedPackages = EULOGIZE_CHECKOUT_PACKAGE_OPTION.filter(
    (p) => p.type === EulogisePackageOptionTypes.FIRST_TIME_CHECKOUT_PACKAGE,
  ).map((p) => p.value)

  const purchasedPackages = invoices?.map((i) => i.details.packageOption)

  const shouldShowAddAllOtherTribtuesForUpgradePrice =
    firstTimePurchsedPackages.some((item) => purchasedPackages.includes(item))

  const isPhotoBookAvailableToOrder = CheckoutHelper.getIsPhotoBookReadyToOrder(
    { activePhotoBookData: activePhotobook!, country },
  )

  const filteredForeverMemorialsKeepsakes =
    CheckoutHelper.getEulogizeForeverMemorialsKeepsakesByRole({
      allowPurchasing,
      keepsakesDefinitions: baseForeverMemorialsKeepsakes,
      role,
      isPhotoBookAvailableToOrder,
    })

  const isPhotobookShippable = country
    ? PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country)
    : false

  const getShouldDisabledPurchaseButton = ({
    product,
    role,
    allowPurchasing,
    activeCase,
    isPhotoBookAvailableToOrder,
  }: {
    product: EulogiseProduct
    role: EulogiseUserRole
    allowPurchasing: IAllowPurchasingOption | undefined
    activeCase: ICase | null | undefined
    isPhotoBookAvailableToOrder: boolean
  }) => {
    if (
      ![
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.EDITOR,
        EulogiseUserRole.ADMIN,
        EulogiseUserRole.CUSTOMER,
      ].includes(role) ||
      !activeCase
    ) {
      return true
    }
    switch (product) {
      case EulogiseProduct.PHOTOBOOK:
        if (!isPhotoBookAvailableToOrder) {
          return true
        }
        const isHasToPayEditorOrClient =
          CheckoutHelper.getIsHasToPayPrintingForEditorOrFuneralHome({
            role,
            activeCase,
            allowPurchasing,
          })

        if (!isHasToPayEditorOrClient) {
          return false
        }

        const roleConfigKey =
          CheckoutHelper.getHasToPayRoleConfigKeyForEditorOrFuneralHome({
            role,
            allowPurchasing,
          })

        if (!roleConfigKey) {
          return false
        }

        const isPhotoBookPurchasbleForHasToPayRole: boolean =
          allowPurchasing?.photoBooks?.[roleConfigKey] ?? true
        return !isPhotoBookPurchasbleForHasToPayRole

      default:
        return false
    }
  }

  useEffect(() => {
    if (
      role &&
      [
        EulogiseUserRole.CUSTOMER,
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.EDITOR,
        EulogiseUserRole.ADMIN,
      ].includes(account?.role) &&
      caseId
    ) {
      dispatch(fetchInvoices({ caseId }))
    }
  }, [caseId])

  useEffect(() => {
    if (
      role === EulogiseUserRole.CUSTOMER &&
      caseId &&
      activeCase &&
      !hasAccessedDownloadPage
    ) {
      dispatch(markHasAccessedDownloadPageTrue())
      const updatedCaseFields = {
        hasAccessedDownloadPage: true,
      }
      dispatch(updateCaseById({ caseId, caseFields: updatedCaseFields }))
    }

    return () => {
      if (role === EulogiseUserRole.CUSTOMER) {
        dispatch(updateIsComingFromPaymentPage(false))
      }
    }
  }, [])

  useEffect(() => {
    if (caseId && region) {
      dispatch(fetchAllProductsByCaseId({ caseId, region }))
    }
  }, [])

  return (
    <StyledDownloadPage title="Complete Your Order" location={location}>
      <DownloadPageContainer
        ref={containerRef}
        $shouldStackContainers={shouldStackContainers}
      >
        <DownloadPageLeftContentContainer>
          <DownloadPageThankYouHeader>
            Download your digital tributes
          </DownloadPageThankYouHeader>
          <StyledSubTitle>
            {!shouldNotAccessDownloadPage
              ? `The platform will generate a high resolution file that is ready to
              print or play. This can take a few minutes depending on the length
              and size of your file. You do not need to stay on this page. You
              will receive an email when your files are ready to download.
              `
              : `You don't have access to this page, please contact to Eulogize admin.`}
          </StyledSubTitle>

          {!shouldNotAccessDownloadPage && (
            <StyledDownloadTributesHeader>
              {!isAnyProductGenerating && isAnyProductsStillFetching
                ? 'Loading your download tributes data, please wait...'
                : 'Your tributes available for download'}
            </StyledDownloadTributesHeader>
          )}

          {!shouldNotAccessDownloadPage &&
            (!isAnyProductsStillFetching || isAnyProductGenerating) && (
              <StyledGenerateAndDownloadContainer>
                {isSlideshowGeneratable && (
                  <DownloadTributeProduct
                    product={EulogiseProduct.SLIDESHOW}
                    caseId={caseId}
                    hasGeneratePermission={true}
                    onStartCreating={() =>
                      onStartCreating({
                        product: EulogiseProduct.SLIDESHOW,
                      })
                    }
                    onShareClick={() => {
                      dispatch(openDrawerAction(DrawerId.SHARE_TRIBUTE_DRAWER))
                    }}
                    onKeepEditing={({ product, productId }) =>
                      onKeepEditing({ product, productId })
                    }
                    onPurchase={(purchaseProduct: EulogiseProduct) =>
                      onPurchase({ purchaseProduct })
                    }
                    onViewClick={() => {
                      dispatch(
                        showModalAction(ModalId.CARD_PRODUCT_PREVIEW, {
                          product: EulogiseProduct.SLIDESHOW,
                        }),
                      )
                    }}
                  />
                )}

                {cardProductsAvailableForDownload.map(
                  (productOrSlug, index: number) => {
                    if (
                      productOrSlug === EulogiseCardProducts.PHOTOBOOK &&
                      !isPhotobookShippable
                    ) {
                      return null
                    }
                    const isCardProduct = CardProductHelper.isCardProduct(
                      productOrSlug as EulogiseProduct,
                    )
                    const newProduct =
                      CardProductHelper.convertProductTypeToGenericIfNotFound(
                        productOrSlug,
                      )
                    const slug = isCardProduct ? undefined : productOrSlug
                    return (
                      <DownloadCardProductRowContainer
                        key={productOrSlug}
                        slug={slug}
                        product={CardProductHelper.convertProductTypeToGenericIfNotFound(
                          productOrSlug,
                        )}
                        caseId={caseId}
                        deceasedName={deceasedName}
                        region={region}
                        hasGeneratePermission={true}
                        shouldDisableButton={
                          (productOrSlug as unknown as EulogiseProduct) ===
                          EulogiseProduct.PHOTOBOOK
                            ? getShouldDisabledPurchaseButton({
                                product: EulogiseProduct.PHOTOBOOK,
                                role,
                                allowPurchasing,
                                activeCase,
                                isPhotoBookAvailableToOrder,
                              })
                            : false
                        }
                        onStartCreating={() =>
                          onStartCreating({
                            product: newProduct,
                            slug,
                          })
                        }
                        onKeepEditing={({ product, productId, slug }) =>
                          onKeepEditing({ product, productId, slug })
                        }
                        onPurchase={(purchaseProduct: EulogiseProduct) =>
                          onPurchase({ purchaseProduct })
                        }
                        onViewClick={() => {
                          const genericProductType =
                            CardProductHelper.getGenericProductTypeBySlug({
                              slug: productOrSlug as string,
                              genericProductTypes,
                            })
                          dispatch(
                            showModalAction(ModalId.CARD_PRODUCT_PREVIEW, {
                              product: productOrSlug as EulogiseProduct,
                              genericProductType,
                            }),
                          )
                        }}
                      />
                    )
                  },
                )}
              </StyledGenerateAndDownloadContainer>
            )}

          {!shouldNotAccessDownloadPage &&
            shouldShowOtherTributesAvailableToCreateAndPurchaseSection &&
            !isAnyProductsStillFetching && (
              <>
                <StyledDownloadTributesHeader>
                  Other tributes available to create & purchase
                </StyledDownloadTributesHeader>

                {shouldShowAddAllOtherTribtuesForUpgradePrice && (
                  <StyledSubTitle>
                    Add all other Eulogize tributes for just $30
                  </StyledSubTitle>
                )}

                {!isSlideshowGeneratable && (
                  <DownloadTributeProduct
                    product={EulogiseProduct.SLIDESHOW}
                    caseId={caseId}
                    hasGeneratePermission={false}
                    onStartCreating={() =>
                      onStartCreating({
                        product: EulogiseProduct.SLIDESHOW,
                      })
                    }
                    onKeepEditing={({ product, productId }) =>
                      onKeepEditing({ product, productId })
                    }
                    onPurchase={(purchaseProduct: EulogiseProduct) =>
                      onPurchase({ purchaseProduct })
                    }
                  />
                )}

                {otherTributesAvailableToCreatePurchase.map(
                  (product: EulogiseCardProducts, index: number) => {
                    if (
                      product === EulogiseCardProducts.PHOTOBOOK &&
                      !isPhotobookShippable
                    ) {
                      return null
                    }
                    return (
                      <DownloadCardProductRowContainer
                        product={product as unknown as EulogiseProduct}
                        caseId={caseId}
                        deceasedName={deceasedName}
                        region={region}
                        shouldDisableButton={
                          (product as unknown as EulogiseProduct) ===
                          EulogiseProduct.PHOTOBOOK
                            ? getShouldDisabledPurchaseButton({
                                product: EulogiseProduct.PHOTOBOOK,
                                role,
                                allowPurchasing,
                                activeCase,
                                isPhotoBookAvailableToOrder,
                              })
                            : false
                        }
                        hasGeneratePermission={false}
                        onStartCreating={() =>
                          onStartCreating({
                            product: product as unknown as EulogiseProduct,
                          })
                        }
                        onKeepEditing={({ product, productId }) =>
                          onKeepEditing({ product, productId })
                        }
                        onPurchase={(purchaseProduct: EulogiseProduct) =>
                          onPurchase({ purchaseProduct })
                        }
                      />
                    )
                  },
                )}
              </>
            )}
        </DownloadPageLeftContentContainer>

        {!isAnyProductsStillFetching && !shouldNotAccessDownloadPage && (
          <DownloadPageRightContentContainer>
            {EulogizeShippingAvailableCountries.includes(country) &&
              shouldShowForeverKeepsakes && (
                <>
                  <ForeverMemorialKeepsakes
                    keepSakes={filteredForeverMemorialsKeepsakes}
                  />
                  <StyledPlaceHolderSpace />
                </>
              )}
            <StillEditingTributes
              onRedirectToDashboard={() =>
                NavigationHelper.navigate(EulogisePage.DASHBOARD)
              }
            />
          </DownloadPageRightContentContainer>
        )}
      </DownloadPageContainer>
    </StyledDownloadPage>
  )
}

export default DownloadPage
