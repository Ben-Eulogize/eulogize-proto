import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {
  COLOR,
  EulogizePrintingProductsPaperTypeDefinition,
} from '@eulogise/client-core'
import {
  EulogiseCardProducts,
  EulogiseCountry,
  EulogiseProduct,
  ICardProductState,
  ICheckoutsState,
  EulogizePrintingProductsPaperTypes,
  IPrintingDetails,
  IPrintingPerUnitPriceByCopies,
  ICardProductData,
  ValidPhotobookCheckoutSize,
  IGenericCardProductTypeData,
} from '@eulogise/core'

import { Drawer, Radio } from 'antd'

import {
  Button,
  ButtonSize,
  ButtonType,
  EditIcon,
} from '@eulogise/client-components'
import {
  useCaseState,
  useCheckoutsState,
  useEulogiseDispatch,
  usePhotobookState,
  useProductState,
} from '../../store/hooks'
import {
  updateIsPrintingOptionDrawerOpen,
  updateIsReviewDesignDrawerOpened,
  updatePrintingDetails,
  saveTemporaryCheckoutState,
  updateIsKeepsakesDrawerOpened,
} from '../../store/CheckoutsState/action'
import { CardProductFlipBookPreviewWithPagination } from '../CardProductFlipBookPreviewWithPagination/CardProductFlipBookPreviewWithPagination'
import {
  CardProductHelper,
  NavigationHelper,
  PhotobookHelper,
} from '@eulogise/helpers'
import { useElementSize } from 'usehooks-ts'

interface ReviewDesignDrawerProps {
  open: boolean
  product: EulogiseCardProducts | undefined | null
  genericProductType?: IGenericCardProductTypeData
  country: EulogiseCountry
}

const REVIEW_DESIGN_REMINDER_TEXT_RESPONSIVE_WIDTH_BREAKPOINT = 1350
const ENABLE_FULL_SCREEN_SIZE_FEATURE = false
const UPDATE_PRINTING_DETAILS_PRODUCTS = [
  EulogiseCardProducts.BOOKLET,
  EulogiseCardProducts.BOOKMARK,
  EulogiseCardProducts.SIDED_CARD,
  EulogiseCardProducts.THANK_YOU_CARD,
]

const StyledHeaderContainer = styled.div`
  width: 100%;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

const StyledHeaderButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* left side buttons hug the left */
  width: 350px;
`

const StyledHeaderText = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  text-align: center;
  flex: 1;
`

const StyledCancelButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 350px;
  gap: 8px;
`

const StyledCancelButton = styled(Button)``

const StyledFullScreenButton = styled(Button)``

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 40px;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`

const StyledReviewContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`

const StyledReviewActionContainer = styled.div`
  padding: 20px 52px 0 52px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid #e8e8e8;
  margin-top: auto;
  background: white;
  position: sticky;
  bottom: 0;
`

const StyledApproveReviewRadioContainer = styled.div<{
  $isDesignApproved: boolean
  $shouldDisplayInDifferentLines: boolean
}>`
  display: flex;
  padding: 10px 16px;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  border: ${({ $isDesignApproved }) =>
    $isDesignApproved
      ? '1px solid var(--Primary-Primary-100, #9E21BD)'
      : `1px solid var(--Border, ${COLOR.LIGHT_GREY})`};
  background: var(--Beige-BG, #f6f4f1);

  ${({ $shouldDisplayInDifferentLines }) =>
    $shouldDisplayInDifferentLines &&
    `
      .ant-radio-wrapper {
        display: flex;
        align-items: center;
      }
      .ant-radio {
        align-self: center;
      }
    `}
`

const StyledOrderInfoContainer = styled.div`
  display: block;
  text-align: left;
  padding-right: 16px;
`

const StyledApproveTextRow = styled.div<{
  $shouldDisplayInDifferentLines: boolean
}>`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  ${({ $shouldDisplayInDifferentLines }) =>
    $shouldDisplayInDifferentLines
      ? `display: block;
        padding-left: 8px;
    `
      : `display: flex;`}
`

const StyledApproveText = styled.div<{
  $isBoldText: boolean
  $shouldDisplayInDifferentLines: boolean
}>`
  font-size: 18px;
  font-style: normal;
  line-height: 26px;
  ${({ $isBoldText }) =>
    $isBoldText
      ? `font-weight: 700;
      `
      : `font-weight: 500;`}
  ${({ $shouldDisplayInDifferentLines }) =>
    $shouldDisplayInDifferentLines
      ? `padding: 2px 0;
   `
      : ``}
`

const StyledTotalCopiesPriceTextContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledTotalCopiesTotalText = styled.div<{ $letterSpacing?: string }>`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  padding-right: 4px;
  ${({ $letterSpacing }) =>
    $letterSpacing
      ? `letter-spacing: ${$letterSpacing};
    `
      : ``}
`

const StyledTotalCopiesUnitPriceText = styled.div<{ $letterSpacing?: string }>`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  color: ${COLOR.DOVE_GREY};
  ${({ $letterSpacing }) =>
    $letterSpacing
      ? `letter-spacing: ${$letterSpacing};
    `
      : ``}
`

const StyledConfirmButtonContainer = styled.div`
  width: 240px;
  height: 48px;
`

const StyledConfirmButton = styled(Button)`
  width: 240px;
  border-radius: 4px;
  height: 42px;
`

const StyledDrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const StyledGoToEditorButton = styled(Button)`
  display: flex;
  padding: 9px 24px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 4px;
`

const StyledRightSideContentContainer = styled.div`
  display: flex;
`

const StyledEditIcon = styled(EditIcon)``

const ReviewDesignDrawer = ({
  open,
  product,
  genericProductType,
  country,
}: ReviewDesignDrawerProps): JSX.Element | null => {
  if (!product) {
    return null
  }

  const dispatch = useEulogiseDispatch()
  const [pageCursor, setPageCursor] = useState<number>(0)
  const [isDesignApproved, setIsDesignApproved] = useState<boolean>(false)
  const [isFullScreenPreview, setIsFullScreenPreview] = useState(false)
  const [containerRef, { width: containerWidth }] = useElementSize()

  const checkoutsState: ICheckoutsState = useCheckoutsState()
  const { printingDetails, keepsakesDetails } = checkoutsState

  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region!
  const productState = useProductState({
    product: product as unknown as EulogiseProduct,
  })
  const cardProduct = productState?.activeItem as ICardProductData
  const { activeItem: activeCardProduct, activeProductTheme: productTheme } =
    productState as ICardProductState

  const { activeItem: activePhotobook } = usePhotobookState()

  const pageSize = activePhotobook?.content
    ?.pageSize as ValidPhotobookCheckoutSize
  const coverType = activePhotobook
    ? PhotobookHelper.getCoverType(activePhotobook)
    : undefined

  const getDisplayedPricingInforByProduct = ({
    product,
  }: {
    product: EulogiseCardProducts
  }): {
    copiesAmount: number
    productPricing: number
    unitString: string
  } => {
    if (!product) {
      return {
        copiesAmount: 0,
        productPricing: 0,
        unitString: 'N/A',
      }
    }
    switch (product) {
      case EulogiseCardProducts.BOOKLET:
      case EulogiseCardProducts.BOOKMARK:
      case EulogiseCardProducts.SIDED_CARD:
      case EulogiseCardProducts.THANK_YOU_CARD:
      case EulogiseCardProducts.TV_WELCOME_SCREEN:
        const copiesAmount = productDetails?.copiesAmount ?? 0
        return {
          copiesAmount,
          productPricing: paperType
            ? EulogizePrintingProductsPaperTypeDefinition?.[paperType]
                .perPaperUnitPrice?.[product]?.[country]?.[
                copiesAmount as keyof IPrintingPerUnitPriceByCopies
              ]
            : 0,
          unitString: 'print',
        }
      case EulogiseCardProducts.PHOTOBOOK:
        if (!activePhotobook || !coverType) {
          return {
            copiesAmount: 0,
            productPricing: 0,
            unitString: 'print',
          }
        }
        const noOfPages = (activePhotobook?.content?.pages?.length ?? 0) - 2
        return {
          copiesAmount: keepsakesDetails.photoBook.metaData.copyAmount,
          productPricing: PhotobookHelper.calculatePhotobookPrice({
            noOfPages,
            coverType,
            pageSize: pageSize,
            country,
          }),
          unitString: 'book',
        }

      default:
        return {
          copiesAmount: 0,
          productPricing: 0,
          unitString: 'print',
        }
    }
  }

  const productDetails =
    product && printingDetails?.orderedProductsDetails?.[product]
  const paperType =
    productDetails?.paperType as EulogizePrintingProductsPaperTypes

  const { copiesAmount, productPricing, unitString } =
    getDisplayedPricingInforByProduct({
      product,
    })

  useEffect(() => {
    setIsDesignApproved(false)
    return () => {
      setIsDesignApproved(false)
    }
  }, [])

  const onClose = ({ product }: { product: EulogiseCardProducts | null }) => {
    if (!product) {
      return null
    }
    dispatch(
      updateIsReviewDesignDrawerOpened({
        isReviewDesignDrawerOpened: false,
        reviewDesignDrawerActiveProduct: null,
      }),
    )
    setIsDesignApproved(false)
    return
  }

  const shouldDisplayInDifferentLines =
    containerWidth <= REVIEW_DESIGN_REMINDER_TEXT_RESPONSIVE_WIDTH_BREAKPOINT

  const onCloseOriginalProductDrawer = ({
    product,
  }: {
    product: EulogiseCardProducts
  }) => {
    if (!product) {
      return null
    }
    switch (product) {
      case EulogiseCardProducts.BOOKLET:
      case EulogiseCardProducts.BOOKMARK:
      case EulogiseCardProducts.SIDED_CARD:
      case EulogiseCardProducts.THANK_YOU_CARD:
      case EulogiseCardProducts.TV_WELCOME_SCREEN:
        dispatch(
          updateIsPrintingOptionDrawerOpen({
            isPrintingOptionDrawerOpened: false,
            printingOptionDrawerActiveProduct: null,
          }),
        )
      case EulogiseCardProducts.PHOTOBOOK:
        dispatch(
          updateIsKeepsakesDrawerOpened({
            isKeepsakesDrawerOpened: false,
            keepsakesDrawerActiveProduct: null,
          }),
        )
      default:
        break
    }
    return
  }

  const onAddToOrder = ({ product }: { product: EulogiseCardProducts }) => {
    if (!isDesignApproved) {
      return
    }

    if (UPDATE_PRINTING_DETAILS_PRODUCTS.includes(product)) {
      const updatedPrintingDetails: IPrintingDetails = {
        ...printingDetails,
        orderedProductsDetails: {
          ...printingDetails.orderedProductsDetails,
          [product]: {
            ...printingDetails.orderedProductsDetails[product],
            isProductOrderedForPrinting: true,
          },
        },
      }
      dispatch(updatePrintingDetails(updatedPrintingDetails))
    }

    dispatch(
      updateIsReviewDesignDrawerOpened({
        isReviewDesignDrawerOpened: false,
        reviewDesignDrawerActiveProduct: null,
      }),
    )
    onCloseOriginalProductDrawer({ product })
    setIsDesignApproved(false)
  }

  const renderReviewContent = () => {
    return (
      <StyledReviewContentContainer ref={containerRef}>
        <CardProductFlipBookPreviewWithPagination
          product={product as unknown as EulogiseProduct}
          cardProduct={cardProduct}
          genericProductType={genericProductType}
          region={region}
          pageCursor={pageCursor}
          onPageChange={(pc: number) => setPageCursor(pc)}
          onPreviewModalWidthChange={() => null}
          productTheme={productTheme}
        />
      </StyledReviewContentContainer>
    )
  }

  const renderReviewAction = () => {
    return (
      <StyledReviewActionContainer>
        <StyledApproveReviewRadioContainer
          $isDesignApproved={isDesignApproved}
          $shouldDisplayInDifferentLines={shouldDisplayInDifferentLines}
        >
          <Radio
            checked={isDesignApproved}
            onClick={() => {
              if (isDesignApproved) {
                setIsDesignApproved(false)
              }
            }}
            onChange={(e) => setIsDesignApproved(e.target.checked)}
          >
            <StyledApproveTextRow
              $shouldDisplayInDifferentLines={shouldDisplayInDifferentLines}
            >
              <StyledApproveText
                $isBoldText={true}
                $shouldDisplayInDifferentLines={shouldDisplayInDifferentLines}
              >
                I approve this design.
              </StyledApproveText>
              <StyledApproveText
                $isBoldText={false}
                $shouldDisplayInDifferentLines={shouldDisplayInDifferentLines}
              >
                Further editing of this design will not be possible.
              </StyledApproveText>
            </StyledApproveTextRow>
          </Radio>
        </StyledApproveReviewRadioContainer>
        <StyledRightSideContentContainer>
          <StyledOrderInfoContainer>
            <StyledTotalCopiesTotalText>
              Order total:
            </StyledTotalCopiesTotalText>
            <StyledTotalCopiesPriceTextContainer>
              <StyledTotalCopiesTotalText $letterSpacing="-1px">
                {copiesAmount}
              </StyledTotalCopiesTotalText>
              <StyledTotalCopiesTotalText>
                {copiesAmount === 1 ? 'copy' : 'copies'},
              </StyledTotalCopiesTotalText>
              <StyledTotalCopiesTotalText $letterSpacing="-1px">
                ${Number(productPricing * copiesAmount).toFixed(2)}
              </StyledTotalCopiesTotalText>
              <StyledTotalCopiesUnitPriceText>
                ($
              </StyledTotalCopiesUnitPriceText>
              <StyledTotalCopiesUnitPriceText $letterSpacing="-1px">
                {productPricing.toFixed(2)}
              </StyledTotalCopiesUnitPriceText>
              <StyledTotalCopiesUnitPriceText>
                /{unitString})
              </StyledTotalCopiesUnitPriceText>
            </StyledTotalCopiesPriceTextContainer>
          </StyledOrderInfoContainer>
          <StyledConfirmButtonContainer>
            <StyledConfirmButton
              buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
              buttonSize={ButtonSize.XMD}
              onClick={() => onAddToOrder({ product })}
              disabled={!isDesignApproved}
              noMarginLeft
              noMarginRight
            >
              Add to order
            </StyledConfirmButton>
          </StyledConfirmButtonContainer>
        </StyledRightSideContentContainer>
      </StyledReviewActionContainer>
    )
  }

  const onReturnToEditorToMakeChange = ({
    product,
  }: {
    product: EulogiseCardProducts
  }) => {
    if (!product) {
      return
    }

    // Save the current checkout state before navigating to editor
    const currentCheckoutState = {
      packageOption: checkoutsState.packageOption,
      printingDetails: checkoutsState.printingDetails,
      isPrintingOptionDrawerOpened: checkoutsState.isPrintingOptionDrawerOpened,
      printingOptionDrawerActiveProduct:
        checkoutsState.printingOptionDrawerActiveProduct,
      isReviewDesignDrawerOpened: true,
      reviewDesignDrawerActiveProduct: product,
      billingAddressDetails: checkoutsState.billingAddressDetails,
      paymentDetails: checkoutsState.paymentDetails,
      keepsakesDetails: checkoutsState.keepsakesDetails,
    }

    dispatch(saveTemporaryCheckoutState(currentCheckoutState))

    dispatch(
      updateIsReviewDesignDrawerOpened({
        isReviewDesignDrawerOpened: false,
        reviewDesignDrawerActiveProduct: null,
      }),
    )

    dispatch(
      updateIsPrintingOptionDrawerOpen({
        isPrintingOptionDrawerOpened: false,
        printingOptionDrawerActiveProduct: null,
      }),
    )

    dispatch(
      updateIsKeepsakesDrawerOpened({
        isKeepsakesDrawerOpened: false,
        keepsakesDrawerActiveProduct: null,
      }),
    )

    const navigatePage = CardProductHelper.getEditPageByProduct({
      product: product as unknown as EulogiseProduct,
    })
    const productId = CardProductHelper.getProductIdKey({
      product: product as unknown as EulogiseProduct,
    })

    if (navigatePage && productId) {
      NavigationHelper.navigate(navigatePage, {
        [productId]: activeCardProduct?.id,
      })
    }
  }

  if (!open) {
    return null
  }

  return (
    <StyledDrawer
      placement={'left'}
      open={open}
      closable={false}
      key={`Printing Options Drawer - ${product}`}
      maskClosable={false}
      width={'100%'}
    >
      <StyledDrawerContent>
        <StyledHeaderContainer>
          {!isFullScreenPreview && (
            <StyledHeaderButtonContainer>
              <StyledGoToEditorButton
                buttonType={ButtonType.CHECKOUT_CTA_BUTTON_SECONDARY}
                onClick={() => onReturnToEditorToMakeChange({ product })}
                disabled={false}
                noMarginLeft
                noMarginRight
                icon={<StyledEditIcon />}
              >
                Return to editor to make change
              </StyledGoToEditorButton>
            </StyledHeaderButtonContainer>
          )}
          {!isFullScreenPreview && (
            <StyledHeaderText>Review design</StyledHeaderText>
          )}

          <StyledCancelButtonContainer>
            {ENABLE_FULL_SCREEN_SIZE_FEATURE && (
              <StyledFullScreenButton
                buttonType={ButtonType.TRANSPARENT}
                buttonSize={ButtonSize.SM}
                onClick={() => setIsFullScreenPreview(!isFullScreenPreview)}
                disabled={false}
                noMarginLeft
              >
                {isFullScreenPreview ? 'Exit Full Screen' : 'Full Screen'}
              </StyledFullScreenButton>
            )}

            {!isFullScreenPreview && (
              <StyledCancelButton
                buttonType={ButtonType.TRANSPARENT}
                buttonSize={ButtonSize.SM}
                onClick={() => onClose({ product })}
                disabled={false}
                noMarginLeft
                noMarginRight
              >
                Cancel
              </StyledCancelButton>
            )}
          </StyledCancelButtonContainer>
        </StyledHeaderContainer>
        {renderReviewContent()}
        {!isFullScreenPreview && renderReviewAction()}
      </StyledDrawerContent>
    </StyledDrawer>
  )
}

export default ReviewDesignDrawer
