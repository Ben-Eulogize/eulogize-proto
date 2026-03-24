import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  CHECKOUT_BREAKPOINT,
  COLOR,
  EulogizePrintingProductsPaperTypeDefinition,
} from '@eulogise/client-core'
import { CardProductHelper, CheckoutHelper } from '@eulogise/helpers'
import {
  CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES,
  EulogiseCountry,
  EulogisePackageOptions,
  EulogiseProduct,
  EulogisePurchaseInformationShippingMethodName,
  EULOGIZE_CHECKOUT_PACKAGE_OPTION,
  IPrintingPerUnitPriceByCopies,
  LeatherVideoTributeMaterialColor,
  OrderSummaryPrintingProductDetailsSummary,
  OrderSummaryShippingProductDetailsSummary,
  EulogisePurchaseInformationPackageName,
  LeatherVideoTributeMaterial,
  EulogiseCardProducts,
  KEEPSAKE_PRODUCTS,
} from '@eulogise/core'
import { DeleteIcon, EditIcon, ChevronDownIcon } from '../icons'

const StyledContainer = styled.div`
  width: 327px;
  padding: 16px;
  background-color: ${COLOR.PANEL_BACKGROUND_COLOR};
  border-radius: 10px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: 283px;
    padding: 24px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: 411px;
    padding: 24px;
  }
`

const StyledSummaryTitle = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  color: var(--Primary-Dark, #1a343b);
  padding-bottom: 24px;
`

const StyledBundleContainer = styled.div``

const StyledTributesContainer = styled.div<{ $padding?: string }>`
  display: block;
  padding-bottom: 8px;
  ${({ $padding }) => $padding && `padding: ${$padding}`};
`

const StyledTribute = styled.div`
  padding: 0 0 0 10px;
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`

const StyledBorder = styled.div`
  position: relative;
  width: 100%;
  margin: 10px auto 10px auto;
  border-bottom: 1px solid #c2c2c2;
`

const StyledNoPackageSelected = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`

const StyledDigitalDownloadRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
`

const StyledItemText = styled.div<{
  $padding?: string
  $color?: string
  $fontSize?: string
}>`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  ${({ $color }) => $color && `color: ${$color}`};
  ${({ $padding }) => $padding && `color: ${$padding}`};
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize}`};
`

const StyledItemPriceText = styled.div`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.1rem;
`

const StyledSubTotalRowContainer = styled.div<{ $padding?: string }>`
  ${({ $padding }) => $padding && `padding: ${$padding}`};
`

const StyledSubTotalRow = styled.div<{ $padding?: string }>`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  ${({ $padding }) => $padding && `padding: ${$padding}`};
`

const StyledSubtotalText = styled.div`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
`

const StyledPriceContainer = styled.div`
  display: flex;
`

const StyledTextContainer = styled.div<{ $display?: string }>`
  width: 100%;
  padding: 0 0 4px 10px;
  ${({ $display }) => ($display ? `display: ${$display}` : `display: flex`)};
`

const StyledChevronIcon = styled(ChevronDownIcon)<{ $isCollapsed: boolean }>`
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
  align-self: flex-start;
  transform: ${({ $isCollapsed }) =>
    $isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'};
`

const StyledIconsContainer = styled.div`
  display: block;
  width: 16px;
  padding-top: 1px;
`

const StyledDeleteIcon = styled(DeleteIcon)`
  margin-top: 4px;
  align-self: flex-start;
  color: ${COLOR.DOVE_GREY};

  &:hover {
    color: ${COLOR.BLACK};
  }
`

const StyledEditIcon = styled(EditIcon)`
  margin-top: 4px;
  align-self: flex-start;
  color: ${COLOR.DOVE_GREY};

  &:hover {
    color: ${COLOR.BLACK};
  }
`

const StyledTributesInfoBlock = styled.div`
  display: inline-block;
`

interface IOrderSummaryProps {
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
  leatherVideoTributeBookColour: LeatherVideoTributeMaterialColor | null
  leatherVideoTributeBookMaterial: LeatherVideoTributeMaterial | null
  printingFee: number
  shippingFee: number
  digitalProductFee: number
  countryCurrencySymbol: string
  shouldShowTotal: boolean
  shippingProductDetailsSummary: Array<OrderSummaryShippingProductDetailsSummary>
  printingProductDetailsSummary: Array<OrderSummaryPrintingProductDetailsSummary>
  country: EulogiseCountry
  shouldShowPrintingActions: boolean
  shouldShowKeepsakeActions: boolean
  shouldExpandByDefault: boolean
  onRemovePrintingProduct?: (product: EulogiseCardProducts) => void
  onRemoveKeepsake?: (product: KEEPSAKE_PRODUCTS) => void
  onEditPrintingProduct?: (product: EulogiseCardProducts) => void
  onEditKeepsake?: (product: KEEPSAKE_PRODUCTS) => void
  photoBookDescription: string
  photoBookAmount: number
}

export const OrderSummary: React.FC<IOrderSummaryProps> = ({
  packageOption = null,
  showPrintingFee = false,
  showShippingFee = false,
  showShippingCalculatedNext = false,
  showPrintPriceCalculatedNext = false,
  showLeatherVideoTributeBookFee = false,
  showPhotoBookFee = false,
  photoBookFee = 0,
  leatherVideoTributeBookAmount = 0,
  leatherVideoTributeBookColour = null,
  leatherVideoTributeBookFee = 0,
  leatherVideoTributeBookMaterial,
  printingFee = 0,
  shippingFee = 0,
  digitalProductFee = 0,
  countryCurrencySymbol,
  shouldShowTotal = false,
  shippingProductDetailsSummary = [],
  printingProductDetailsSummary = [],
  country,
  shouldShowPrintingActions = true,
  shouldShowKeepsakeActions = true,
  shouldExpandByDefault = false,
  onRemovePrintingProduct,
  onRemoveKeepsake,
  onEditPrintingProduct,
  onEditKeepsake,
  photoBookDescription = '',
  photoBookAmount = 0,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  useEffect(() => {
    if (shouldExpandByDefault) {
      setIsCollapsed(false)
    }
  }, [packageOption, shouldExpandByDefault])

  const subTotal = CheckoutHelper.getTotalPrice({
    packageFee: digitalProductFee,
    printingFee,
    shippingFee,
    leatherVideoTributeBookFee,
    photoBookFee,
  })

  const packageTitle = packageOption
    ? EulogisePurchaseInformationPackageName?.[packageOption]
    : 'No package selected'

  const packageDetails = EULOGIZE_CHECKOUT_PACKAGE_OPTION.find(
    (p) => p.value === packageOption,
  )

  const packageProducts = packageDetails?.packageProducts ?? []

  const shouldShowDigitalDownloadRow = !!!packageOption
    ? false
    : ![
        EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
        EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
        EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
      ].includes(packageOption)

  const shouldShowPackageTitleRow = !!!packageOption
    ? false
    : ![
        EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
        EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
        EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
      ].includes(packageOption)

  const shouldRenderPackageProducts =
    packageProducts?.length > 0 && !isCollapsed

  const shouldRenderBundleContainer =
    shouldShowDigitalDownloadRow || shouldShowPackageTitleRow

  const renderPackageTitle = () => {
    return (
      <StyledSubTotalRowContainer
        $padding={shouldShowDigitalDownloadRow ? '0 0 4px 10px' : '0'}
      >
        <StyledNoPackageSelected>
          <StyledItemText>{packageTitle}</StyledItemText>
          <StyledChevronIcon
            $isCollapsed={isCollapsed}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />

          {digitalProductFee > 0 && (
            <StyledPriceContainer>
              <StyledItemText>{countryCurrencySymbol}</StyledItemText>

              <StyledItemPriceText>
                {CheckoutHelper.formatPriceDecimals({
                  price: digitalProductFee,
                })}
              </StyledItemPriceText>
            </StyledPriceContainer>
          )}
        </StyledNoPackageSelected>
      </StyledSubTotalRowContainer>
    )
  }

  const renderPackageProducts = () => {
    return (
      <StyledTributesContainer $padding={'0 0 0 20px'}>
        {packageProducts.map((p) => {
          return (
            <StyledTribute>
              {CardProductHelper.getDownloadProductName({
                product: p,
              })}
            </StyledTribute>
          )
        })}
      </StyledTributesContainer>
    )
  }

  const renderDigitalDownloadRow = () => {
    if (!packageOption) {
      return <></>
    }

    return (
      <StyledDigitalDownloadRow>
        <StyledItemText>Digital Download</StyledItemText>
      </StyledDigitalDownloadRow>
    )
  }

  const renderKeepsakes = () => {
    if (showLeatherVideoTributeBookFee && leatherVideoTributeBookAmount > 0) {
      return (
        <StyledSubTotalRowContainer>
          <StyledSubTotalRow>
            <StyledItemText>Keepsakes</StyledItemText>
          </StyledSubTotalRow>
          <StyledSubTotalRow $padding={'4px 0;'}>
            {shouldShowKeepsakeActions && (
              <StyledIconsContainer>
                <StyledDeleteIcon
                  onClick={() =>
                    onRemoveKeepsake?.(KEEPSAKE_PRODUCTS.VIDEO_BOOKS)
                  }
                />
                <StyledEditIcon
                  onClick={() =>
                    onEditKeepsake?.(KEEPSAKE_PRODUCTS.VIDEO_BOOKS)
                  }
                />
              </StyledIconsContainer>
            )}
            <StyledTextContainer $display="block">
              <StyledItemText>{`Video Book`}</StyledItemText>

              <StyledSubTotalRow $padding={'0px'}>
                <StyledTributesInfoBlock>
                  <StyledItemText
                    $color={COLOR.DOVE_GREY}
                    $fontSize={'14px'}
                  >{`${leatherVideoTributeBookColour} | ${leatherVideoTributeBookMaterial}`}</StyledItemText>
                  <StyledItemText
                    $color={COLOR.DOVE_GREY}
                    $fontSize={'14px'}
                  >{`Qty: ${leatherVideoTributeBookAmount}`}</StyledItemText>
                </StyledTributesInfoBlock>

                <StyledItemPriceText>
                  {`$${CheckoutHelper.formatPriceDecimals({
                    price: leatherVideoTributeBookFee,
                  })}`}
                </StyledItemPriceText>
              </StyledSubTotalRow>
            </StyledTextContainer>
          </StyledSubTotalRow>
          <StyledBorder />
        </StyledSubTotalRowContainer>
      )
    }
    return null
  }

  const renderPrinting = () => {
    return (
      <StyledSubTotalRowContainer>
        <StyledSubTotalRow>
          <StyledItemText>Printing</StyledItemText>
        </StyledSubTotalRow>
        {printingProductDetailsSummary?.map(
          (
            printingProductDetails: OrderSummaryPrintingProductDetailsSummary,
          ) => {
            const {
              printingProduct,
              isProductOrderedForPrinting,
              paperType,
              copiesAmount,
            } = printingProductDetails
            const displayPrintingProductName =
              CardProductHelper.getDownloadProductName({
                product: printingProduct as unknown as EulogiseProduct,
              })

            const paperPricing = paperType
              ? EulogizePrintingProductsPaperTypeDefinition[paperType]
                  .perPaperUnitPrice?.[printingProduct]?.[country]?.[
                  copiesAmount as keyof IPrintingPerUnitPriceByCopies
                ]
              : 0

            const productPrintingPrice = CheckoutHelper.formatPriceDecimals({
              price: copiesAmount * paperPricing,
            })

            if (!isProductOrderedForPrinting) {
              return null
            }
            return (
              <StyledSubTotalRow $padding={'4px 0;'}>
                {shouldShowPrintingActions && (
                  <StyledIconsContainer>
                    <StyledDeleteIcon
                      onClick={() => onRemovePrintingProduct?.(printingProduct)}
                    />
                    <StyledEditIcon
                      onClick={() => onEditPrintingProduct?.(printingProduct)}
                    />
                  </StyledIconsContainer>
                )}

                <StyledTextContainer $display="block">
                  <StyledItemText>{displayPrintingProductName}</StyledItemText>

                  <StyledSubTotalRow $padding={'0px'}>
                    <StyledTributesInfoBlock>
                      <StyledItemText
                        $color={COLOR.DOVE_GREY}
                        $fontSize={'14px'}
                      >{`${paperType} | ${
                        CheckoutHelper.getPrintingProductOrderSummaryDisplaySizesByCountry(
                          { country },
                        )?.[printingProduct]
                      }`}</StyledItemText>
                      <StyledItemText
                        $color={COLOR.DOVE_GREY}
                        $fontSize={'14px'}
                      >{`Qty: ${copiesAmount}`}</StyledItemText>
                    </StyledTributesInfoBlock>

                    <StyledItemPriceText>
                      {`$${productPrintingPrice}`}{' '}
                    </StyledItemPriceText>
                  </StyledSubTotalRow>
                </StyledTextContainer>
              </StyledSubTotalRow>
            )
          },
        )}
        <StyledBorder />
      </StyledSubTotalRowContainer>
    )
  }

  const renderShowShippingCalculatedNext = () => {
    return (
      <StyledSubTotalRowContainer>
        <StyledSubTotalRow>
          <StyledItemText>Shipping calculated before checkout</StyledItemText>
        </StyledSubTotalRow>
      </StyledSubTotalRowContainer>
    )
  }

  const renderShowPrintingCalculatedNext = () => {
    return (
      <StyledSubTotalRowContainer>
        <StyledSubTotalRow>
          <StyledItemText>Print price calculated at next step</StyledItemText>
        </StyledSubTotalRow>
      </StyledSubTotalRowContainer>
    )
  }

  const renderPhotoBook = () => {
    if (showPhotoBookFee && photoBookAmount > 0 && photoBookFee > 0) {
      return (
        <StyledSubTotalRowContainer>
          <StyledSubTotalRow>
            <StyledItemText>Photo Book</StyledItemText>
          </StyledSubTotalRow>
          <StyledSubTotalRow $padding={'4px 0;'}>
            {shouldShowKeepsakeActions && (
              <StyledIconsContainer>
                <StyledDeleteIcon
                  onClick={() =>
                    onRemoveKeepsake?.(KEEPSAKE_PRODUCTS.PHOTO_BOOKS)
                  }
                />
                <StyledEditIcon
                  onClick={() =>
                    onEditKeepsake?.(KEEPSAKE_PRODUCTS.PHOTO_BOOKS)
                  }
                />
              </StyledIconsContainer>
            )}
            <StyledTextContainer $display="block">
              <StyledItemText>{`Photobook`}</StyledItemText>

              <StyledSubTotalRow $padding={'0px'}>
                <StyledTributesInfoBlock>
                  <StyledItemText $color={COLOR.DOVE_GREY} $fontSize={'14px'}>
                    {photoBookDescription}
                  </StyledItemText>
                  <StyledItemText
                    $color={COLOR.DOVE_GREY}
                    $fontSize={'14px'}
                  >{`Qty: ${photoBookAmount}`}</StyledItemText>
                </StyledTributesInfoBlock>

                <StyledItemPriceText>{`$${CheckoutHelper.formatPriceDecimals({
                  price: photoBookFee,
                })}`}</StyledItemPriceText>
              </StyledSubTotalRow>
            </StyledTextContainer>
          </StyledSubTotalRow>
          <StyledBorder />
        </StyledSubTotalRowContainer>
      )
    }
    return null
  }

  const renderShipping = () => {
    return (
      <StyledSubTotalRowContainer>
        <StyledSubTotalRow>
          <StyledItemText>Shipping</StyledItemText>
        </StyledSubTotalRow>
        {shippingProductDetailsSummary?.map(
          (
            shippingProductDetail: OrderSummaryShippingProductDetailsSummary,
          ) => {
            const { shippingProduct, shippingFee, shippingMethod } =
              shippingProductDetail
            const displayShippingProductName =
              CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES?.[shippingProduct]
            const displayShippingMethodName =
              EulogisePurchaseInformationShippingMethodName?.[shippingMethod]

            return (
              <StyledSubTotalRow $padding={'0px;'}>
                <StyledTextContainer>
                  <StyledItemText>{displayShippingProductName}</StyledItemText>
                  <StyledItemText>:&nbsp;</StyledItemText>
                  <StyledItemText>{displayShippingMethodName}</StyledItemText>
                </StyledTextContainer>
                <StyledItemPriceText>${shippingFee}</StyledItemPriceText>
              </StyledSubTotalRow>
            )
          },
        )}
        <StyledBorder />
      </StyledSubTotalRowContainer>
    )
  }

  const renderSubtotal = () => {
    return (
      <StyledSubTotalRowContainer>
        <StyledSubTotalRow>
          <StyledSubtotalText>
            {shouldShowTotal ? 'Total' : 'Subtotal'}
          </StyledSubtotalText>

          <StyledPriceContainer>
            <StyledItemText>{countryCurrencySymbol}</StyledItemText>
            <StyledItemPriceText>
              {CheckoutHelper.formatPriceDecimals({ price: subTotal })}
              &nbsp;
            </StyledItemPriceText>
          </StyledPriceContainer>
        </StyledSubTotalRow>
      </StyledSubTotalRowContainer>
    )
  }

  return (
    <StyledContainer>
      <StyledSummaryTitle>Order Summary</StyledSummaryTitle>
      {shouldRenderBundleContainer && (
        <>
          <StyledBundleContainer>
            {shouldShowDigitalDownloadRow && renderDigitalDownloadRow()}

            {shouldShowPackageTitleRow && renderPackageTitle()}

            {shouldRenderPackageProducts && renderPackageProducts()}
          </StyledBundleContainer>
          <StyledBorder />
        </>
      )}

      {showPrintingFee &&
        printingProductDetailsSummary?.length > 0 &&
        renderPrinting()}

      {renderKeepsakes()}

      {renderPhotoBook()}

      {showShippingCalculatedNext && renderShowShippingCalculatedNext()}
      {showPrintPriceCalculatedNext && renderShowPrintingCalculatedNext()}
      {showShippingFee &&
        shippingProductDetailsSummary?.length > 0 &&
        renderShipping()}

      {renderSubtotal()}
    </StyledContainer>
  )
}
