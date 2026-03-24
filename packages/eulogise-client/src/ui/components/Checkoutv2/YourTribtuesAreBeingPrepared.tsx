import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import {
  EULOGISE_TRIBUTES_FOR_DOWNLOAD_TEXT,
  EulogisePackageOptions,
  EulogiseProduct,
  ITributesForDeliveryProductsMetaData,
  CHECKOUTS_SHIPPING_METHOD,
  EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS,
  EulogiseLeatherVideoTributeBookOptions,
  ILeatherVideoTributeBookData,
  CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES,
  CHECKOUTS_SHIPPING_PRODUCTS,
  EULOGIZE_PRINTING_SHIPPING_METHODS_DETAILS,
  KEEPSAKE_PRODUCTS,
  IPhotoBookCheckoutData,
  EulogisePhotoBookCheckoutOptions,
  PhotobookCoverTypeLabelMap,
} from '@eulogise/core'
import {
  CardProductHelper,
  CheckoutHelper,
  PhotobookHelper,
} from '@eulogise/helpers'
import { usePhotobookState } from '../../store/hooks'

const VIDEO_BOOKS_THUMBNAIL_URL = `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/keepsakes/video_motion_books.avif`
const PHOTO_BOOKS_THUMBNAIL_URL = `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/photo-books/photo-books-3.avif`

const StyledBorder = styled.div`
  width: 90%;
  border-bottom: 1px solid #eaeaee;
  margin: 8px 0 24px 0;
`

const StyledContainer = styled.div``

const StyledSummarySection = styled.div``

const StyledTitleSection = styled.div``

const StyledThankYouTitle = styled.div`
  margin: 0px 0px 16px 0px;
  font-family: 'Greycliff';
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
`

const StyledPaymentReceivedSubTitle = styled.div`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  padding-bottom: 48px;
`

const StyledSummaryDetailSection = styled.div``

const StyledSummaryDetailTitle = styled.div`
  font-family: 'Greycliff';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  padding-bottom: 24px;
`

const StyledSummaryDetailSectionTextRowContainer = styled.div``

const StyledSummaryDetailSectionTextRow = styled.div`
  display: flex;
  padding-bottom: 8px;
  height: 32px;
`

const StyledSummaryDetailSectionText = styled.div`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  padding-bottom: 8px;
`

const StyledCopiesText = styled.div`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  padding-bottom: 8px;
  letter-spacing: -1px;
  padding-right: 4px;
`

const StyledVerticalSeparator = styled.div`
  margin-right: 15px;
  padding-right: 15px;
  border-right: 1px solid ${COLOR.BLACK};
  height: 24px;
`

const StyledSummaryDetailSectionDisplayProductName = styled.div`
  width: 200px;
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`

const StyledSummaryDetailSectionShippingMethodUnordedList = styled.div`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  padding-bottom: 8px;
`

const StyledSummaryDetailSectionShippingMethodListItem = styled.div`
  color: ${COLOR.BLACK};
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  display: flex;
`

const StyledBlackCircleContainer = styled.div`
  padding: 12px;
`

const StyledBlackCirclePoint = styled.div`
  content: '';
  margin: auto;
  display: table;
  width: 4px;
  height: 4px;
  background: ${COLOR.BLACK};
  border-radius: 50%;
`

const StyledSummaryShippingAddressContainer = styled.div`
  padding: 16px 0 0 0;
`

const StyledProductContainer = styled.div`
  display: flex;
`

const StyledTributesForDownloadThumbnailImage = styled.img`
  width: 157px;
  height: 80px;
  margin: 0 16px 16px 0;
  border-radius: 8px;
  object-fit: cover;
`

const StyledPrintingTributesForDeliveryThumbnailImage = styled.img`
  width: 157px;
  height: 105px;
  margin: 0 16px 16px 0;
  border-radius: 8px;
  object-fit: cover;
`

const StyledProductTextContainer = styled.div`
  display: block;
`

const StyledTextRow = styled.div`
  display: flex;
  color: ${COLOR.DOVE_GREY};
`

export interface IYourTribtuesAreBeingPreparedProps {
  packageOption: EulogisePackageOptions | null
  tributesForDownloadProducts: Array<EulogiseProduct>
  tributesForDeliveryPrintingProductsInformation: Array<ITributesForDeliveryProductsMetaData>
  leatherVideoTributeBookData: ILeatherVideoTributeBookData
  photoBookMetaData: IPhotoBookCheckoutData
  formattedKeepsakesShippingAddress: string | null
  formattedPrintingShippingAddress: string | null
  formattedBillingAddress: string | null
  printableShippingMethod: CHECKOUTS_SHIPPING_METHOD
  tributesForDownloadThumbnailSrc: string
}

const getPrintingProductThumbnailSrc = ({
  product,
}: {
  product: EulogiseProduct
}) => {
  if (!product) {
    return undefined
  }
  switch (product) {
    case EulogiseProduct.BOOKLET:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/folded-programs/folded-program-4.avif`
    case EulogiseProduct.SIDED_CARD:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/service-cards/service-cards-1.avif`

    default:
      return undefined
  }
}

export const YourTribtuesAreBeingPrepared: React.FC<
  IYourTribtuesAreBeingPreparedProps
> = ({
  packageOption,
  tributesForDownloadProducts,
  tributesForDeliveryPrintingProductsInformation,
  leatherVideoTributeBookData,
  formattedKeepsakesShippingAddress,
  formattedPrintingShippingAddress,
  formattedBillingAddress,
  photoBookMetaData,
  printableShippingMethod = CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
  tributesForDownloadThumbnailSrc,
}) => {
  const {
    option,
    metaData: { color: leatherColor, copyAmount: leatherCopiesAmount },
  } = leatherVideoTributeBookData ?? {}

  const { activeItem: activePhotobook } = usePhotobookState()

  // Leather Video Book
  const leatherVideoTributeBookShippingMethod =
    leatherVideoTributeBookData?.shippingMethod
  const leatherVideoTributeBookShippingMethodDetails =
    EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS?.[
      KEEPSAKE_PRODUCTS?.VIDEO_BOOKS
    ].find((sm) => sm.value === leatherVideoTributeBookShippingMethod)
  const {
    transitTimeText: videoBookTransitTimeText,
    displayName: videoBookDisplayName,
    isShipping: isVideoTributeBookShipping,
  } = leatherVideoTributeBookShippingMethodDetails ?? {}

  // Printable Tributes
  const printableShippingMethodDetails =
    EULOGIZE_PRINTING_SHIPPING_METHODS_DETAILS.find(
      (sm) => sm.value === printableShippingMethod,
    )
  const {
    transitTimeText: printableTransitTimeText,
    displayName: printableDisplayName,
    isShipping: isPrintableShipping,
  } = printableShippingMethodDetails ?? {}

  const isAnyShippingAddressAvailable =
    formattedKeepsakesShippingAddress || formattedPrintingShippingAddress

  const isNonPrintablePackage =
    packageOption !==
    EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY

  const isLeatherTributeEnabled =
    option ===
    EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK

  // PhotoBooks
  const isPhotoBookAdded =
    photoBookMetaData.option ===
      EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK &&
    photoBookMetaData.metaData.copyAmount > 0

  const photoBookShippingMethod = photoBookMetaData?.shippingMethod

  const photoBookShippingMethodDetails =
    EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS.PHOTO_BOOKS.find(
      (sm) => sm.value === photoBookShippingMethod,
    )
  const {
    transitTimeText: photoBookTransitTimeText,
    displayName: photoBookDisplayName,
    isShipping: isPhotoBookShipping,
  } = photoBookShippingMethodDetails ?? {}

  const photoBookCopiesAmount = photoBookMetaData?.metaData?.copyAmount
  const photoBookSize = photoBookMetaData?.metaData?.bookStyle?.size
  const photoBookNumberOfPages =
    photoBookMetaData?.metaData?.bookStyle?.numberOfPages
  const formattePhotoBookShippingAddress =
    photoBookMetaData?.shippingAddressDetails?.formattedAddress

  const coverType = activePhotobook
    ? PhotobookHelper.getCoverType(activePhotobook)
    : undefined

  const displayedCoverText = coverType
    ? `${PhotobookCoverTypeLabelMap?.[coverType]}`
    : ''

  const shouldDelivery =
    isVideoTributeBookShipping || isPrintableShipping || isPhotoBookShipping

  const renderDeliveryTributes = () => {
    if (!shouldDelivery) {
      return
    }
    return (
      <StyledSummaryDetailSection>
        <StyledSummaryDetailTitle>
          Tributes for delivery:
        </StyledSummaryDetailTitle>

        {isLeatherTributeEnabled && (
          <StyledProductContainer>
            <StyledPrintingTributesForDeliveryThumbnailImage
              src={VIDEO_BOOKS_THUMBNAIL_URL}
            />
            <StyledSummaryDetailSectionTextRowContainer>
              <StyledSummaryDetailSectionTextRow>
                <StyledSummaryDetailSectionDisplayProductName>
                  Leather Video Book
                </StyledSummaryDetailSectionDisplayProductName>
              </StyledSummaryDetailSectionTextRow>

              <StyledSummaryDetailSectionTextRow>
                <StyledTextRow>
                  <StyledSummaryDetailSectionText>{` ${leatherColor}`}</StyledSummaryDetailSectionText>
                  <StyledVerticalSeparator />
                  <StyledSummaryDetailSectionText>{`${leatherCopiesAmount} ${
                    leatherCopiesAmount >= 2 ? 'copies' : 'copy'
                  }`}</StyledSummaryDetailSectionText>
                </StyledTextRow>
              </StyledSummaryDetailSectionTextRow>

              <StyledSummaryDetailSectionTextRow>
                <StyledSummaryDetailSectionShippingMethodUnordedList>
                  <StyledSummaryDetailSectionShippingMethodListItem>
                    <StyledBlackCircleContainer>
                      <StyledBlackCirclePoint />
                    </StyledBlackCircleContainer>
                    {`${videoBookDisplayName}, ${videoBookTransitTimeText}`}
                  </StyledSummaryDetailSectionShippingMethodListItem>
                </StyledSummaryDetailSectionShippingMethodUnordedList>
              </StyledSummaryDetailSectionTextRow>
            </StyledSummaryDetailSectionTextRowContainer>
          </StyledProductContainer>
        )}

        {isNonPrintablePackage &&
          tributesForDeliveryPrintingProductsInformation.map(
            ({ product, metaData }) => {
              const productDisplayName =
                CardProductHelper.getDownloadProductName({
                  product,
                })
              const { isProductOrderedForPrinting, paperType, copiesAmount } =
                metaData

              if (!isProductOrderedForPrinting) {
                return null
              }

              return (
                <StyledProductContainer>
                  <StyledPrintingTributesForDeliveryThumbnailImage
                    src={getPrintingProductThumbnailSrc({ product })}
                  />
                  <StyledSummaryDetailSectionTextRowContainer>
                    <StyledSummaryDetailSectionTextRow>
                      <StyledSummaryDetailSectionDisplayProductName>
                        {productDisplayName}
                      </StyledSummaryDetailSectionDisplayProductName>
                    </StyledSummaryDetailSectionTextRow>

                    <StyledSummaryDetailSectionTextRow>
                      <StyledTextRow>
                        <StyledSummaryDetailSectionText>{` ${paperType}`}</StyledSummaryDetailSectionText>
                        <StyledVerticalSeparator />
                        <StyledCopiesText>{copiesAmount}</StyledCopiesText>
                        <StyledSummaryDetailSectionText>{`${
                          copiesAmount >= 2 ? 'Prints' : 'Print'
                        }`}</StyledSummaryDetailSectionText>
                      </StyledTextRow>
                    </StyledSummaryDetailSectionTextRow>

                    <StyledSummaryDetailSectionShippingMethodUnordedList>
                      <StyledSummaryDetailSectionShippingMethodListItem>
                        <StyledBlackCircleContainer>
                          <StyledBlackCirclePoint />
                        </StyledBlackCircleContainer>
                        {`${printableDisplayName}, ${printableTransitTimeText}`}
                      </StyledSummaryDetailSectionShippingMethodListItem>
                    </StyledSummaryDetailSectionShippingMethodUnordedList>
                  </StyledSummaryDetailSectionTextRowContainer>
                </StyledProductContainer>
              )
            },
          )}

        {isPhotoBookAdded && (
          <StyledProductContainer>
            <StyledPrintingTributesForDeliveryThumbnailImage
              src={PHOTO_BOOKS_THUMBNAIL_URL}
            />
            <StyledSummaryDetailSectionTextRowContainer>
              <StyledSummaryDetailSectionTextRow>
                <StyledSummaryDetailSectionDisplayProductName>
                  Photo Books
                </StyledSummaryDetailSectionDisplayProductName>
              </StyledSummaryDetailSectionTextRow>

              <StyledSummaryDetailSectionTextRow>
                <StyledTextRow>
                  <StyledSummaryDetailSectionText>{`${photoBookCopiesAmount} x ${displayedCoverText}`}</StyledSummaryDetailSectionText>
                  <StyledVerticalSeparator />
                  {photoBookSize && (
                    <StyledSummaryDetailSectionText>{`${
                      PhotobookHelper.isPremiumPhotobook(photoBookSize)
                        ? 'Premium'
                        : 'Classic'
                    } ${CheckoutHelper.getPhotoBookCheckoutDisplayedSizeText({
                      photoBookSize,
                    })}`}</StyledSummaryDetailSectionText>
                  )}
                  <StyledVerticalSeparator />
                  <StyledSummaryDetailSectionText>{`${photoBookNumberOfPages} pages`}</StyledSummaryDetailSectionText>
                </StyledTextRow>
              </StyledSummaryDetailSectionTextRow>

              <StyledSummaryDetailSectionTextRow>
                <StyledSummaryDetailSectionShippingMethodUnordedList>
                  <StyledSummaryDetailSectionShippingMethodListItem>
                    <StyledBlackCircleContainer>
                      <StyledBlackCirclePoint />
                    </StyledBlackCircleContainer>
                    {`${photoBookDisplayName}, ${photoBookTransitTimeText}`}
                  </StyledSummaryDetailSectionShippingMethodListItem>
                </StyledSummaryDetailSectionShippingMethodUnordedList>
              </StyledSummaryDetailSectionTextRow>
            </StyledSummaryDetailSectionTextRowContainer>
          </StyledProductContainer>
        )}

        <StyledBorder />
      </StyledSummaryDetailSection>
    )
  }

  const renderShippingAddress = () => {
    if (!shouldDelivery || !isAnyShippingAddressAvailable) {
      return
    }
    const formattedKeepsakesAddressLines =
      formattedKeepsakesShippingAddress?.split(',') ?? []
    const formattedPrintingShippingAddressLines =
      formattedPrintingShippingAddress?.split(',') ?? []

    const formattedPhotoBookAddressLines =
      formattePhotoBookShippingAddress?.split(',') ?? []
    return (
      <StyledSummaryDetailSection>
        <StyledSummaryDetailTitle>Shipping address:</StyledSummaryDetailTitle>
        {isVideoTributeBookShipping &&
          formattedKeepsakesShippingAddress &&
          renderShippingAddressByProduct({
            shippingProduct:
              CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES[
                CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.VIDEO_BOOKS]
              ],
            formattedAddressLines: formattedKeepsakesAddressLines,
          })}
        {isPrintableShipping &&
          formattedPrintingShippingAddress &&
          renderShippingAddressByProduct({
            shippingProduct:
              CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES[
                CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES
              ],
            formattedAddressLines: formattedPrintingShippingAddressLines,
          })}
        {isPhotoBookShipping &&
          formattedKeepsakesShippingAddress &&
          renderShippingAddressByProduct({
            shippingProduct:
              CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES[
                CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.PHOTO_BOOKS]
              ],
            formattedAddressLines: formattedPhotoBookAddressLines,
          })}
        <StyledBorder />
      </StyledSummaryDetailSection>
    )
  }

  const renderShippingAddressByProduct = ({
    shippingProduct,
    formattedAddressLines,
  }: {
    shippingProduct: string
    formattedAddressLines: Array<string>
  }) => {
    if (
      !formattedAddressLines ||
      !shippingProduct ||
      formattedAddressLines?.length <= 0
    ) {
      return null
    }

    return (
      <StyledSummaryShippingAddressContainer>
        <StyledSummaryDetailSectionText>
          {shippingProduct}:
        </StyledSummaryDetailSectionText>
        {formattedAddressLines.map((addressLine: string) => {
          return (
            <StyledSummaryDetailSectionText>
              {addressLine}
            </StyledSummaryDetailSectionText>
          )
        })}
      </StyledSummaryShippingAddressContainer>
    )
  }

  const renderBillingDetailsAddress = () => {
    if (!formattedBillingAddress) {
      return
    }
    const formattedAddressLines = formattedBillingAddress.split(',')
    return (
      <StyledSummaryDetailSection>
        <StyledSummaryDetailTitle>Billing address:</StyledSummaryDetailTitle>
        {formattedAddressLines.map((addressLine: string) => {
          return (
            <StyledSummaryDetailSectionText>
              {addressLine}
            </StyledSummaryDetailSectionText>
          )
        })}
        <StyledBorder />
      </StyledSummaryDetailSection>
    )
  }

  return (
    <StyledContainer>
      <StyledTitleSection>
        <StyledThankYouTitle>Thank you!</StyledThankYouTitle>
        <StyledPaymentReceivedSubTitle>
          Your payment has been recieved!
        </StyledPaymentReceivedSubTitle>
      </StyledTitleSection>
      <StyledSummarySection>
        <StyledSummaryDetailSection>
          {tributesForDownloadProducts?.length > 0 && (
            <>
              <StyledSummaryDetailTitle>
                Tributes for download:
              </StyledSummaryDetailTitle>
              <StyledProductContainer>
                <StyledTributesForDownloadThumbnailImage
                  src={tributesForDownloadThumbnailSrc}
                />
                <StyledProductTextContainer>
                  {tributesForDownloadProducts.map((p: EulogiseProduct) => {
                    return (
                      <StyledSummaryDetailSectionText>
                        {EULOGISE_TRIBUTES_FOR_DOWNLOAD_TEXT[p]}
                      </StyledSummaryDetailSectionText>
                    )
                  })}
                </StyledProductTextContainer>
              </StyledProductContainer>
              <StyledBorder />
            </>
          )}
        </StyledSummaryDetailSection>

        {renderDeliveryTributes()}

        {renderShippingAddress()}

        {renderBillingDetailsAddress()}
      </StyledSummarySection>
    </StyledContainer>
  )
}
