import React from 'react'
import { DropdownMenu, DropdownMenuItem } from '@eulogise/client-components'
import { openDrawerAction } from '../../../../store/DrawerState/actions'
import {
  CaseStatus,
  DrawerId,
  EulogiseEditorPaymentConfig,
  EulogisePage,
  EulogiseProduct,
  EulogiseUserRole,
  IAuthState,
  ICardProductPage,
  ICardProductState,
  ICaseState,
  ICheckoutEntrySource,
  ICheckoutsState,
  IGenericCardProductTypeData,
  IInvoiceState,
  ISlideshowState,
  MemorialVisualStatus,
  ModalId,
  ResourceFileStatus,
} from '@eulogise/core'
import {
  useAuthState,
  useProductState,
  useCaseState,
  useCheckoutsState,
  useEulogiseDispatch,
  useSlideshowState,
  useInvoiceState,
} from '../../../../store/hooks'
import {
  CardProductHelper,
  CheckoutHelper,
  NavigationHelper,
} from '@eulogise/helpers'
import {
  showDownloadModal,
  showModalAction,
} from '../../../../store/ModalState/actions'
import { CardProductDropdownItemType } from './types'
import { reeditProductAction } from '../../../../store/AdminState/actions'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

const StyledDropdownMenuItem = styled(DropdownMenuItem)<{
  $shouldCompleteSelectOptionHighlighted: boolean
}>`
  ${({ $shouldCompleteSelectOptionHighlighted }) =>
    $shouldCompleteSelectOptionHighlighted &&
    `
    background-color: ${COLOR.CORE_PURPLE};
    color: ${COLOR.WHITE};
  `}
`

interface ICardProductDropdownMenuProps {
  product: EulogiseProduct
  onTriggered: () => void
  isFetching?: boolean
  genericProductType?: IGenericCardProductTypeData
}

const {
  SELECT_THEME,
  CHANGE_THEME,
  EDIT_CARD_PRODUCT,
  CONTINUE_EDITING,
  SHARE_CARD_PRODUCT,
  PREVIEW,
  CHECKOUT,
  DOWNLOAD,
  CHECKOUTS_V2_PACKAGE,
} = CardProductDropdownItemType

const CardProductDropdownMenu: React.FunctionComponent<
  ICardProductDropdownMenuProps
> = ({ product, genericProductType, onTriggered, isFetching }) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const { account }: IAuthState = useAuthState()
  const slug = genericProductType?.slug
  const cardProductState: ICardProductState | ISlideshowState = useProductState(
    { product, slug },
  )

  const caseStatus: CaseStatus = activeCase?.status ?? CaseStatus.UNPAID
  const region = activeCase?.region!
  const userRole: EulogiseUserRole = account?.role!

  const { activeItem: activeCardProduct } = cardProductState
  const theme: string = activeCardProduct?.content?.theme!

  const { items: invoices = [] }: IInvoiceState = useInvoiceState()

  const isPhotobook = product === EulogiseProduct.PHOTOBOOK
  const hasTheme: boolean = !!theme
  const isEdited =
    activeCardProduct?.status !== MemorialVisualStatus.THEME_SELECTED ||
    isPhotobook

  const isProcessing: boolean =
    activeCardProduct?.fileStatus === ResourceFileStatus.PROCESSING
  const isComplete: boolean =
    activeCardProduct?.status === MemorialVisualStatus.COMPLETE ||
    // for slideshow only
    // @ts-ignore
    activeCardProduct?.fileStatus === ResourceFileStatus.GENERATED

  // @ts-ignore
  const isPreview: boolean =
    activeCardProduct?.content?.pages?.reduce(
      (hasContent: boolean, page: ICardProductPage) =>
        page.rows.length > 0 ? true : hasContent,
      false,
    ) || false

  const isPaid: boolean = activeCase?.status === CaseStatus.PAID
  const isClient: boolean = userRole === EulogiseUserRole.CLIENT
  const isAdmin: boolean = userRole === EulogiseUserRole.ADMIN
  const isCustomer: boolean = userRole === EulogiseUserRole.CUSTOMER
  const isCoEditor: boolean = userRole === EulogiseUserRole.COEDITOR
  const isEditor: boolean = userRole === EulogiseUserRole.EDITOR

  const editorPaymentConfig = activeCase?.editorPaymentConfig

  const { activeItem: activeSlideshow } = useSlideshowState()
  const { isSlideshowGenerating }: ICheckoutsState = useCheckoutsState()
  const shouldDisableWhenGeneratingSlideshowProducts: Array<EulogiseProduct> = [
    EulogiseProduct.SLIDESHOW,
    EulogiseProduct.TV_WELCOME_SCREEN,
  ]
  const isProcessingSlideshow =
    activeSlideshow?.fileStatus === ResourceFileStatus.PROCESSING

  const shouldDisableWhenGeneratingSlideshow: boolean =
    (isProcessingSlideshow || isSlideshowGenerating) &&
    shouldDisableWhenGeneratingSlideshowProducts.includes(product)

  const shouldCompleteSelectOptionHighlighted: boolean =
    !shouldDisableWhenGeneratingSlideshow && isEdited

  const getHasPhotoBookPurchased =
    CheckoutHelper.getIsPhotoBookPurchasedByInvoices({ invoices })

  const changeTheme = () => {
    if (product === EulogiseProduct.PHOTOBOOK) {
      // dispatch(showModalAction(ModalId.SELECT_PHOTOBOOK_DESIGN, {}))
      dispatch(openDrawerAction(DrawerId.PHOTOBOOK_DRAWER))
    } else {
      dispatch(
        openDrawerAction(DrawerId.THEME_SELECTION_DRAWER, {
          genericProductType,
          productType: product,
          isNavigateToProductWhenApplyTheme: true,
        }),
      )
    }
    onTriggered()
  }

  const canSkipPackageStep =
    isAdmin ||
    isPaid ||
    ((isClient || isEditor) &&
      editorPaymentConfig !== EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY)

  const handleCompleteClick = () => {
    if (!canSkipPackageStep || isPhotobook) {
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE, null, {
        source: ICheckoutEntrySource?.[product],
      })
    } else {
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_DOWNLOAD)
    }
    onTriggered()
    return
  }

  return (
    <DropdownMenu id="product-dropdown-menu" onClick={() => {}}>
      {!hasTheme && (
        <DropdownMenuItem
          key={SELECT_THEME}
          data-testid={SELECT_THEME}
          onClick={changeTheme}
          disabled={shouldDisableWhenGeneratingSlideshow || isFetching}
        >
          {product === EulogiseProduct.PHOTOBOOK
            ? 'Create Photobook'
            : 'Select Theme'}
        </DropdownMenuItem>
      )}
      {hasTheme && product !== EulogiseProduct.PHOTOBOOK && (
        <DropdownMenuItem
          key={CHANGE_THEME}
          disabled={isComplete || shouldDisableWhenGeneratingSlideshow}
          data-testid={CHANGE_THEME}
          onClick={changeTheme}
        >
          Change Theme
        </DropdownMenuItem>
      )}
      <DropdownMenuItem
        key={EDIT_CARD_PRODUCT}
        data-testid={EDIT_CARD_PRODUCT}
        disabled={
          !hasTheme ||
          isComplete ||
          isProcessing ||
          shouldDisableWhenGeneratingSlideshow ||
          getHasPhotoBookPurchased
        }
        onClick={() => {
          NavigationHelper.navigateToProduct({
            product,
            id: activeCardProduct?.id,
            slug: genericProductType?.slug,
          })
          onTriggered()
        }}
      >
        Edit{' '}
        {genericProductType?.name ??
          CardProductHelper.getProductShortName({ product, region })}
      </DropdownMenuItem>
      {(isClient || isAdmin) && isComplete && (
        <DropdownMenuItem
          key={CONTINUE_EDITING}
          data-testid={CONTINUE_EDITING}
          disabled={shouldDisableWhenGeneratingSlideshow}
          onClick={() => {
            dispatch(
              reeditProductAction({
                product,
                productId: activeCardProduct?.id!,
                slug,
                region,
              }),
            )
          }}
        >
          Continue Editing
        </DropdownMenuItem>
      )}
      {hasTheme && (
        <DropdownMenuItem
          key={PREVIEW}
          data-testid={PREVIEW}
          disabled={!isEdited}
          href={``}
          onClick={() => {
            if (product === EulogiseProduct.SLIDESHOW) {
              window.location.replace(
                `${process.env.GATSBY_APP_ENDPOINT}${EulogisePage.PREVIEW_SLIDESHOW_IN_PAGE}`,
              )
            } else {
              dispatch(
                showModalAction(
                  CardProductHelper.getPreviewModalIdByProduct(product)!,
                  { product, genericProductType },
                ),
              )
            }
            onTriggered()
          }}
        >
          Preview
        </DropdownMenuItem>
      )}
      {hasTheme && (
        <DropdownMenuItem
          key={SHARE_CARD_PRODUCT}
          data-testid={SHARE_CARD_PRODUCT}
          disabled={!isEdited}
          onClick={() => {
            dispatch(
              showModalAction(ModalId.SHARE_CARD_PRODUCT, {
                product,
                slug,
              }),
            )
            onTriggered()
          }}
        >
          Share Preview
        </DropdownMenuItem>
      )}
      {!isCoEditor && hasTheme && !isComplete && (
        <StyledDropdownMenuItem
          $shouldCompleteSelectOptionHighlighted={
            shouldCompleteSelectOptionHighlighted
          }
          key={CHECKOUTS_V2_PACKAGE}
          data-testid={CHECKOUTS_V2_PACKAGE}
          disabled={
            !isEdited ||
            shouldDisableWhenGeneratingSlideshow ||
            getHasPhotoBookPurchased
          }
          onClick={handleCompleteClick}
        >
          {shouldDisableWhenGeneratingSlideshow ? `Generating` : `Complete`}
        </StyledDropdownMenuItem>
      )}
      {isPreview &&
        !isComplete &&
        !isClient &&
        !isCustomer &&
        !isCoEditor &&
        !isEditor && (
          <DropdownMenuItem
            key={CHECKOUT}
            data-testid={CHECKOUT}
            onClick={() => {
              dispatch(
                showDownloadModal({ product, caseStatus, genericProductType }),
              )
              onTriggered()
            }}
          >
            Checkout
          </DropdownMenuItem>
        )}
      {hasTheme &&
        isComplete &&
        ((isPaid && (isCustomer || isEditor)) || isClient) && (
          <DropdownMenuItem
            key={DOWNLOAD}
            data-testid={DOWNLOAD}
            onClick={() => {
              NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_DOWNLOAD)
              onTriggered()
            }}
          >
            Download
          </DropdownMenuItem>
        )}
    </DropdownMenu>
  )
}

export default CardProductDropdownMenu
