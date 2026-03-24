import React from 'react'
import styled from 'styled-components'
import { CopyToClipBoardByText } from '@eulogise/client-components'
import { STYLE, SCREEN_SIZE } from '@eulogise/client-core'
import {
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  EulogiseCountry,
  EulogiseLeatherVideoTributeBookOptions,
  EulogisePhotoBookCheckoutOptions,
  EulogiseProduct,
  EulogisePurchaseInformationPackageName,
  EulogizePrintingProductDisplayNames,
  IDisplayedInvoiceShippingDetails,
  IInvoice,
  IPrintingDetails,
  PhotobookCoverTypeLabelMap,
} from '@eulogise/core'
import {
  CheckoutHelper,
  InvoiceHelper,
  CaseHelper,
  PhotobookHelper,
} from '@eulogise/helpers'
import {
  DisplayedPhotoBookStyle,
  DisplayedPhotoBookSizeText,
} from '../Checkoutv2/PhotobookCheckoutDrawer'

export const InvoiceRow = styled.div`
  width: 100%;
  ${SCREEN_SIZE.TABLET} {
    display: flex;
  }
`

export const LabelCell = styled.div<{ $color?: string }>`
  min-width: 24rem;
  font-weight: ${STYLE.FONT_WEIGHT_SEMI_BOLD};
  font-size: ${STYLE.FONT_SIZE_SM};

  ${({ $color }) =>
    $color &&
    `
  color: ${$color};
`}
`

export const ValueCell = styled.div<{ $color?: string }>`
  font-size: ${STYLE.FONT_SIZE_SM};
  margin-bottom: calc(${STYLE.GUTTER} / 2);
  ${SCREEN_SIZE.TABLET} {
    margin-bottom: 0;
  }

  ${({ $color }) =>
    $color &&
    `
    color: ${$color};
  `}
`

export const StyledCopiedTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

interface InvoiceDetailsContentProps {
  invoice: IInvoice
  fallbackCountry: EulogiseCountry
}

const renderPrintingProduct = (
  printingDetails: IPrintingDetails | undefined,
) => {
  if (!printingDetails) {
    return null
  }

  const orderedProductsDetails = printingDetails?.orderedProductsDetails

  return (
    <>
      {Object.entries(orderedProductsDetails).map(
        ([product, productPrintingDetails]) => {
          if (
            productPrintingDetails.isProductOrderedForPrinting &&
            productPrintingDetails.copiesAmount > 0
          ) {
            const displayedPrintingProductName =
              EulogizePrintingProductDisplayNames[product as EulogiseProduct] ??
              'N/A'
            const paperType = productPrintingDetails.paperType
            const copiesAmount = productPrintingDetails.copiesAmount
            return (
              <InvoiceRow key={`${product}-printing`}>
                <LabelCell>{`Printing (${displayedPrintingProductName}):`}</LabelCell>
                <ValueCell>{`${paperType} | ${copiesAmount} prints`}</ValueCell>
              </InvoiceRow>
            )
          }
          return null
        },
      )}
    </>
  )
}

const renderDeliveryAddresses = (
  shippingDetails: Array<IDisplayedInvoiceShippingDetails>,
) => {
  if (!shippingDetails || shippingDetails.length === 0) {
    return null
  }

  return (
    <>
      {shippingDetails.map(
        ({ product, address }: { product: string; address: string }) => {
          return (
            <InvoiceRow key={`delivery-address-${product}`}>
              <LabelCell>{`Delivery Address ${
                shippingDetails?.length <= 1 ? '' : `(${product}):`
              } `}</LabelCell>
              <StyledCopiedTextContainer>
                <ValueCell>{address}</ValueCell>
                <CopyToClipBoardByText text={address} />
              </StyledCopiedTextContainer>
            </InvoiceRow>
          )
        },
      )}
    </>
  )
}

const renderDeliveryShippingType = (
  shippingDetails: Array<IDisplayedInvoiceShippingDetails>,
) => {
  if (!shippingDetails || shippingDetails.length === 0) {
    return null
  }

  return (
    <>
      {shippingDetails.map(({ product, shippingMethod }) => {
        return (
          <InvoiceRow key={`delivery-shipping-${product}`}>
            <LabelCell>{`Shipping Type ${
              shippingDetails?.length <= 1 ? '' : `(${product}):`
            } `}</LabelCell>
            <ValueCell>
              {CheckoutHelper.getPurchaseShippingNameByShippingMethod({
                shippingMethod,
              })}
            </ValueCell>
          </InvoiceRow>
        )
      })}
    </>
  )
}

export const InvoiceDetailsContent: React.FC<InvoiceDetailsContentProps> = ({
  invoice,
  fallbackCountry,
}) => {
  const purchasePackageName: EulogisePurchaseInformationPackageName =
    CheckoutHelper.getPurchasePackageNameByPackageOption({
      packageOption: invoice.details.packageOption,
    })

  const shouldDisplayVideoTributeBookSection =
    invoice?.details?.keepsakesDetails?.leatherVideoTributeBook?.option ===
      EulogiseLeatherVideoTributeBookOptions?.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK &&
    (invoice?.details?.keepsakesDetails?.leatherVideoTributeBook?.metaData
      ?.copyAmount ?? 0) > 0

  const {
    color,
    copyAmount = 0,
    material,
  } = invoice?.details?.keepsakesDetails?.leatherVideoTributeBook?.metaData ??
  {}

  const shouldDisplayPhotoBookSection =
    invoice?.details?.keepsakesDetails?.photoBook?.option ===
      EulogisePhotoBookCheckoutOptions?.ORDER_PHOTO_BOOK &&
    (invoice?.details?.keepsakesDetails?.photoBook?.metaData?.copyAmount ?? 0) >
      0

  const invoiceCountry =
    (invoice?.details?.country as EulogiseCountry) ?? fallbackCountry
  const photoBookRegion = CaseHelper.getRegionByCountry({
    country: invoiceCountry,
  })
  const photoBookSizesByRegion = PhotobookHelper.getPhotobookSizeByRegion({
    region: photoBookRegion,
  })
  const photoBookMetaData =
    invoice?.details?.keepsakesDetails?.photoBook?.metaData
  const photoBookStyleKey = photoBookMetaData?.bookStyle?.style ?? null
  const photoBookSizeKey = photoBookMetaData?.bookStyle?.size ?? null
  const photoBookPageCount = photoBookMetaData?.bookStyle?.numberOfPages ?? 0
  const photoBookCoverKey = photoBookMetaData?.coverStyle?.coverMaterial ?? null

  const displayedPhotoBookStyle =
    photoBookStyleKey && DisplayedPhotoBookStyle?.[photoBookStyleKey]
  const sizeLabel =
    photoBookSizeKey && DisplayedPhotoBookSizeText?.[photoBookSizeKey]
  const sizeMeasurement =
    photoBookSizeKey && photoBookSizesByRegion?.[photoBookSizeKey]

  let displayedPhotoBookSize: string | null = null
  const sizeSegments = [sizeLabel, sizeMeasurement]
    .filter((segment): segment is string => !!segment && segment.length)
    .join(' ')
    .trim()
  if (sizeSegments) {
    if (photoBookPageCount && photoBookPageCount > 0) {
      displayedPhotoBookSize = `${sizeSegments} | ${photoBookPageCount} Pages`
    } else {
      displayedPhotoBookSize = sizeSegments
    }
  } else if (photoBookPageCount && photoBookPageCount > 0) {
    displayedPhotoBookSize = `${photoBookPageCount} Pages`
  }

  const displayedPhotoBookCover =
    photoBookCoverKey && PhotobookCoverTypeLabelMap?.[photoBookCoverKey]
      ? `${PhotobookCoverTypeLabelMap[photoBookCoverKey]} Cover`
      : null

  const photoBookStyleText = `${displayedPhotoBookStyle ?? 'N/A'} x ${
    photoBookMetaData?.copyAmount ?? 0
  }`
  const photoBookPageDetailsText = displayedPhotoBookSize ?? 'N/A'
  const photoBookCoverText = displayedPhotoBookCover ?? 'N/A'

  const invoicePrintingDetails = invoice?.details?.printingDetails

  const shouldDisplayPrintingSection =
    invoicePrintingDetails?.printingMethod ===
    CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED

  const shippingDetails = InvoiceHelper.getDisplayedShippingDetailsByInvoice({
    invoice,
  })

  const billingAddress =
    invoice?.details?.billingAddressDetails?.formattedAddress

  return (
    <>
      <InvoiceRow>
        <LabelCell>Digital Package:</LabelCell>
        <ValueCell>{purchasePackageName}</ValueCell>
      </InvoiceRow>
      {shouldDisplayVideoTributeBookSection && (
        <InvoiceRow>
          <LabelCell>Video Book:</LabelCell>
          <ValueCell>{`${color} ${material} x ${copyAmount}`}</ValueCell>
        </InvoiceRow>
      )}
      {shouldDisplayPhotoBookSection && (
        <>
          <InvoiceRow>
            <LabelCell>Photo Book - Style:</LabelCell>
            <ValueCell>{photoBookStyleText}</ValueCell>
          </InvoiceRow>
          <InvoiceRow>
            <LabelCell>Photo Book - Page details:</LabelCell>
            <ValueCell>{photoBookPageDetailsText}</ValueCell>
          </InvoiceRow>
          <InvoiceRow>
            <LabelCell>Photo Book - Cover:</LabelCell>
            <ValueCell>{photoBookCoverText}</ValueCell>
          </InvoiceRow>
        </>
      )}
      {shouldDisplayPrintingSection &&
        renderPrintingProduct(invoicePrintingDetails)}
      {shippingDetails?.length > 0 && renderDeliveryAddresses(shippingDetails)}
      {billingAddress && (
        <InvoiceRow>
          <LabelCell>Billing Address:</LabelCell>
          <StyledCopiedTextContainer>
            <ValueCell>{billingAddress}</ValueCell>
            <CopyToClipBoardByText text={billingAddress} />
          </StyledCopiedTextContainer>
        </InvoiceRow>
      )}
      {shippingDetails?.length > 0 &&
        renderDeliveryShippingType(shippingDetails)}
    </>
  )
}
