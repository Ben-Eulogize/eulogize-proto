import React from 'react'
import styled from 'styled-components'
import { CHECKOUT_BREAKPOINT, COLOR } from '@eulogise/client-core'
import { EulogisePackageOptions, EulogisePage } from '@eulogise/core'
import { RightIcon } from '../icons'

export enum CHECKOUT_V2_URL_STEPS_MAPS {
  PACKAGE = 'package',
  PRINTING_DETAILS = 'printing-details',
  PRINTING_OPTIONS = 'printing-options',
  KEEPSAKES = 'keepsakes',
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
}

const StyledHeaderContainer = styled.div`
  width: 100%;
`

const StyledSingleRowDesktop = styled.div`
  margin: 0;
  display: flex;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: none;
  }
`

const StyledSingleRowMobile = styled.div<{ $forceHidden: boolean }>`
  margin: 0;
  display: none;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: ${({ $forceHidden }) => ($forceHidden ? 'none' : 'flex')};
    flex-wrap: wrap;
  }
`

const StyledTwoRowMobile = styled.div<{ $forceTwoRow: boolean }>`
  display: none;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  ${({ $forceTwoRow }) =>
    $forceTwoRow &&
    `
      @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
        display: flex;
      }
    `}
`

const StyledRow = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${({ $columns }) => Math.max($columns, 1)},
    max-content
  );
  justify-content: flex-start;
  gap: 0;
  width: max-content;
`

const StyledRowItem = styled.div<{ $isPlaceholder?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 20px;
  visibility: ${({ $isPlaceholder }) =>
    $isPlaceholder ? 'hidden' : 'visible'};
  gap: 0;
`

const StyledStepTitle = styled.div<{
  ishighlighted: boolean
  isClickable: boolean
}>`
  font-size: 14px;
  ${({ isClickable }) =>
    isClickable &&
    `
    pointer-events: none;
    &:hover {
      cursor: pointer;
    };
  `}
  ${({ ishighlighted }) => ishighlighted && `color: ${COLOR.CORE_PURPLE};`}
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
`

const StyledNextSignContainer = styled.div`
  display: flex;
  align-items: center;
`

// @ts-ignore
const StyledNextSign = styled(RightIcon)<{ ishighlighted: boolean }>`
  margin: 0 8px 0 4px;
  font-size: 14px;
  ${({ ishighlighted }) => ishighlighted && `color: ${COLOR.CORE_PURPLE};`}
`

interface IBreadCrumbsProps {
  url: CHECKOUT_V2_URL_STEPS_MAPS
  packageOption: EulogisePackageOptions | null
  shouldShowPrintingDetails: boolean
  shouldShowPrintingOptions: boolean
  shouldShowKeepsakes: boolean
  shouldShowShipping: boolean
  onRedirect: (pageUrl: EulogisePage) => void
  onPackageClick: () => void
}

export const BreadCrumbs: React.FC<IBreadCrumbsProps> = ({
  url,
  packageOption,
  onRedirect,
  onPackageClick,
  shouldShowPrintingDetails = false,
  shouldShowPrintingOptions = false,
  shouldShowKeepsakes = false,
  shouldShowShipping = false,
}: IBreadCrumbsProps) => {
  interface StepItem {
    label: string
    isHighlighted: boolean
    isClickable: boolean
    onClick?: () => void
    isVisible: boolean
  }

  // Highlighted
  const packagesHightlightedUrls = [
    CHECKOUT_V2_URL_STEPS_MAPS.PACKAGE,
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_DETAILS,
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_OPTIONS,
    CHECKOUT_V2_URL_STEPS_MAPS.KEEPSAKES,
    CHECKOUT_V2_URL_STEPS_MAPS.SHIPPING,
    CHECKOUT_V2_URL_STEPS_MAPS.PAYMENT,
  ]
  const printDetailsHighlightedUrls = [
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_DETAILS,
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_OPTIONS,
    CHECKOUT_V2_URL_STEPS_MAPS.KEEPSAKES,
    CHECKOUT_V2_URL_STEPS_MAPS.SHIPPING,
    CHECKOUT_V2_URL_STEPS_MAPS.PAYMENT,
  ]
  const printOptionsHighlightedUrls = [
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_OPTIONS,
    CHECKOUT_V2_URL_STEPS_MAPS.KEEPSAKES,
    CHECKOUT_V2_URL_STEPS_MAPS.SHIPPING,
    CHECKOUT_V2_URL_STEPS_MAPS.PAYMENT,
  ]
  const keepsakesHighlightedUrls = [
    CHECKOUT_V2_URL_STEPS_MAPS.KEEPSAKES,
    CHECKOUT_V2_URL_STEPS_MAPS.SHIPPING,
    CHECKOUT_V2_URL_STEPS_MAPS.PAYMENT,
  ]
  const shippingHighlightedUrls = [
    CHECKOUT_V2_URL_STEPS_MAPS.SHIPPING,
    CHECKOUT_V2_URL_STEPS_MAPS.PAYMENT,
  ]
  const paymentHighlightedUrls = [CHECKOUT_V2_URL_STEPS_MAPS.PAYMENT]

  // Clickable
  const printDetailsPageClickableUrls = [CHECKOUT_V2_URL_STEPS_MAPS.PACKAGE]

  const optionsClickableUrls = [
    CHECKOUT_V2_URL_STEPS_MAPS.PACKAGE,
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_DETAILS,
  ]

  const keepsakesClickableUrls = [
    CHECKOUT_V2_URL_STEPS_MAPS.PACKAGE,
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_DETAILS,
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_OPTIONS,
  ]

  const shippingPageClickableUrls = [
    CHECKOUT_V2_URL_STEPS_MAPS.PACKAGE,
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_DETAILS,
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_OPTIONS,
    CHECKOUT_V2_URL_STEPS_MAPS.KEEPSAKES,
  ]
  const paymentClickableUrls = [
    CHECKOUT_V2_URL_STEPS_MAPS.PACKAGE,
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_DETAILS,
    CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_OPTIONS,
    CHECKOUT_V2_URL_STEPS_MAPS.KEEPSAKES,
    CHECKOUT_V2_URL_STEPS_MAPS.SHIPPING,
  ]

  const showPrintDetailsOptions = [
    EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
    EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
    EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
    EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
    EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
    EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
  ]
  const shouldShowPrintDetailsOptionByPackage = packageOption
    ? showPrintDetailsOptions.includes(packageOption)
    : false

  const shouldOnlyShowPackage = !!!packageOption

  const steps: StepItem[] = [
    {
      label: 'Package',
      isHighlighted: packagesHightlightedUrls.includes(url),
      isClickable: false,
      onClick: onPackageClick,
      isVisible: true,
    },
    {
      label: 'Print Details',
      isHighlighted: printDetailsHighlightedUrls.includes(url),
      isClickable: printDetailsPageClickableUrls.includes(url),
      onClick: () => onRedirect(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS),
      isVisible:
        !shouldOnlyShowPackage &&
        shouldShowPrintingDetails &&
        shouldShowPrintDetailsOptionByPackage,
    },
    {
      label: 'Printing Options',
      isHighlighted: printOptionsHighlightedUrls.includes(url),
      isClickable: optionsClickableUrls.includes(url),
      onClick: () => onRedirect(EulogisePage.CHECKOUTS_V2_PRINTING_OPTIONS),
      isVisible:
        !shouldOnlyShowPackage &&
        shouldShowPrintingOptions &&
        shouldShowPrintDetailsOptionByPackage,
    },
    {
      label: 'Keepsakes',
      isHighlighted: keepsakesHighlightedUrls.includes(url),
      isClickable: keepsakesClickableUrls.includes(url),
      onClick: () => onRedirect(EulogisePage.CHECKOUTS_V2_KEEPSAKES),
      isVisible: !shouldOnlyShowPackage && shouldShowKeepsakes,
    },
    {
      label: 'Shipping',
      isHighlighted: shippingHighlightedUrls.includes(url),
      isClickable: shippingPageClickableUrls.includes(url),
      onClick: () => onRedirect(EulogisePage.CHECKOUTS_V2_SHIPPING),
      isVisible: !shouldOnlyShowPackage && shouldShowShipping,
    },
    {
      label: 'Payment',
      isHighlighted: paymentHighlightedUrls.includes(url),
      isClickable: paymentClickableUrls.includes(url),
      onClick: () => onRedirect(EulogisePage.CHECKOUTS_V2_PAYMENT),
      isVisible: !shouldOnlyShowPackage,
    },
  ]

  const visibleSteps = steps.filter((step) => step.isVisible)

  if (visibleSteps.length === 0) {
    return null
  }

  const renderSequence = (sequence: StepItem[]) =>
    sequence.map((step, index) => {
      const nextStep = sequence[index + 1]
      return (
        <React.Fragment key={`${step.label}-${index}`}>
          <StyledStepTitle
            onClick={step.onClick}
            ishighlighted={step.isHighlighted}
            isClickable={step.isClickable}
          >
            {step.label}
          </StyledStepTitle>
          {nextStep && (
            <StyledNextSignContainer>
              <StyledNextSign ishighlighted={nextStep.isHighlighted} />
            </StyledNextSignContainer>
          )}
        </React.Fragment>
      )
    })

  const shouldRenderTwoRowMobile = visibleSteps.length > 4
  const stepsPerRow = Math.ceil(visibleSteps.length / 2)

  const firstRowSteps = visibleSteps.slice(0, stepsPerRow)
  const secondRowSteps = visibleSteps.slice(stepsPerRow)
  const paddedSecondRowSteps: Array<StepItem | null> = [...secondRowSteps]
  while (paddedSecondRowSteps.length < stepsPerRow) {
    paddedSecondRowSteps.push(null)
  }

  const renderRow = (
    rowSteps: Array<StepItem | null>,
    rowStartIndex: number,
  ) => {
    let actualIndexOffset = 0
    return rowSteps.map((step, index) => {
      if (!step) {
        return (
          <StyledRowItem
            key={`placeholder-${rowStartIndex}-${index}`}
            $isPlaceholder
          />
        )
      }

      const globalIndex = rowStartIndex + actualIndexOffset
      actualIndexOffset += 1
      const nextStep = visibleSteps[globalIndex + 1]

      return (
        <StyledRowItem key={`${step.label}-${globalIndex}`}>
          <StyledStepTitle
            onClick={step.onClick}
            ishighlighted={step.isHighlighted}
            isClickable={step.isClickable}
          >
            {step.label}
          </StyledStepTitle>
          {nextStep && (
            <StyledNextSignContainer>
              <StyledNextSign ishighlighted={nextStep.isHighlighted} />
            </StyledNextSignContainer>
          )}
        </StyledRowItem>
      )
    })
  }

  return (
    <StyledHeaderContainer>
      <StyledSingleRowDesktop>
        {renderSequence(visibleSteps)}
      </StyledSingleRowDesktop>

      <StyledTwoRowMobile $forceTwoRow={shouldRenderTwoRowMobile}>
        <StyledRow $columns={stepsPerRow}>
          {renderRow(firstRowSteps, 0)}
        </StyledRow>
        <StyledRow $columns={stepsPerRow}>
          {renderRow(paddedSecondRowSteps, firstRowSteps.length)}
        </StyledRow>
      </StyledTwoRowMobile>

      <StyledSingleRowMobile $forceHidden={shouldRenderTwoRowMobile}>
        {renderSequence(visibleSteps)}
      </StyledSingleRowMobile>
    </StyledHeaderContainer>
  )
}
