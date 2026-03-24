import React, { useEffect } from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../../ui/components/Layout/Layout'
import {
  Button,
  ButtonSize,
  ButtonType,
  CheckoutTributeDownloadIcon,
} from '@eulogise/client-components'
import { YourTribtuesAreBeingPrepared } from '../../../ui/components/Checkoutv2/YourTribtuesAreBeingPrepared'
import { NavigationHelper, CheckoutHelper } from '@eulogise/helpers'
import { useCheckoutsState } from '../../../ui/store/hooks'
import {
  EulogisePage,
  ICheckoutsState,
  CHECKOUTS_SHIPPING_METHOD,
  EULOGIZE_CHECKOUT_PACKAGE_OPTION,
  EulogisePackageOptions,
} from '@eulogise/core'
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

const StyledThankYouPage = styled(Layout)`
  margin: ${PAGE_MARGIN_MOBILE};

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    margin: ${PAGE_MARGIN_MD};
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    margin: ${PAGE_MARGIN_LG};
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
  flex: 1;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${LEFT_COLUMN_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${LEFT_COLUMN_WIDTH_XL}px;
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

const StyledDownloadYourTributesButton = styled(Button)`
  margin: 40px 0 24px 0;
  padding: 0 40px;
  align-self: flex-start;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    align-self: flex-end;
  }
`

const getTributsForDownloadTrumbnails = ({
  packageOption,
}: {
  packageOption: EulogisePackageOptions | null
}) => {
  switch (packageOption) {
    case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/package-thumbnails/bundle.jpg`
    case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/package-thumbnails/video-screen.jpg`
    case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/package-thumbnails/printable-tributes.jpg`
    case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/package-thumbnails/print-delivery.jpg`
    case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/package-thumbnails/video-screen.jpg`
    case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
    case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/package-thumbnails/upgrade-printable.jpg`
    case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
    case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/thank-you/memorial-tribute-video-thumbnail-1.png`
    case EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/package-thumbnails/photo-books.jpg`
    default:
      return `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/package-thumbnails/bundle.jpg`
  }
}

const ThankYouPage: React.FC<PageProps> = ({ location }) => {
  const {
    packageOption,
    keepsakesDetails: {
      leatherVideoTributeBook: leatherVideoTributeBookMetaData,
      photoBook: photoBookMetaData,
    },
    billingAddressDetails: { formattedAddress: formattedBillingAddress },
    printingDetails,
  }: ICheckoutsState = useCheckoutsState()

  const formattedKeepsakesShippingAddress =
    leatherVideoTributeBookMetaData?.shippingAddressDetails?.formattedAddress

  const printingShippingMethod =
    printingDetails.printingShippingMethod ??
    CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING

  const formattedPrintingShippingAddress =
    printingDetails.printingAddressDetails.formattedAddress

  const tributesForDeliveryPrintingProductsInformation =
    CheckoutHelper.getTributesForDeliveryPrintingProductsInformation({
      printingDetails,
    })

  const renderDownloadTribtuesButton = () => {
    return (
      <StyledDownloadYourTributesButton
        buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
        buttonSize={ButtonSize.XMD}
        onClick={() =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_DOWNLOAD)
        }
        disabled={false}
        noMarginLeft={true}
      >
        <CheckoutTributeDownloadIcon />
        Download your tributes
      </StyledDownloadYourTributesButton>
    )
  }

  useEffect(() => {
    if (!packageOption) {
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
    }
  }, [])

  const tributesForDownloadProducts =
    EULOGIZE_CHECKOUT_PACKAGE_OPTION.find((po) => po.value === packageOption)
      ?.packageProducts ?? []

  return (
    <StyledThankYouPage title="Thank you" location={location} noPadding={true}>
      <StyledContentWrapper>
        <StyledContentContainer>
          <StyledLeftContentContainer>
            <YourTribtuesAreBeingPrepared
              packageOption={packageOption}
              tributesForDownloadProducts={tributesForDownloadProducts}
              tributesForDeliveryPrintingProductsInformation={
                tributesForDeliveryPrintingProductsInformation
              }
              leatherVideoTributeBookData={leatherVideoTributeBookMetaData}
              photoBookMetaData={photoBookMetaData}
              formattedKeepsakesShippingAddress={
                formattedKeepsakesShippingAddress
              }
              formattedPrintingShippingAddress={
                formattedPrintingShippingAddress
              }
              formattedBillingAddress={formattedBillingAddress}
              printableShippingMethod={printingShippingMethod}
              tributesForDownloadThumbnailSrc={getTributsForDownloadTrumbnails({
                packageOption,
              })}
            />
          </StyledLeftContentContainer>

          <StyledRightContentContainer>
            {renderDownloadTribtuesButton()}
          </StyledRightContentContainer>
        </StyledContentContainer>
      </StyledContentWrapper>
    </StyledThankYouPage>
  )
}

export default ThankYouPage
