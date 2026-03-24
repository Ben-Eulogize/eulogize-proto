import { CHECKOUT_BREAKPOINT, COLOR } from '@eulogise/client-core'
import { EulogiseCardProducts } from '@eulogise/core'
import { CheckCircleFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Button, ButtonSize, ButtonType } from '../Button'
import Price from './Price'

const MOBILE_THUMBNAIL_WIDTH = 155
const MOBILE_THUMBNAIL_HEIGHT = 103
const DESKTOP_THUMBNAIL_WIDTH = 244
const DESKTOP_THUMBNAIL_HEIGHT = 163

interface PrintingOptionCardProps {
  product: EulogiseCardProducts
  displayName: string
  displayedSize: string
  stringPrice: number
  previewThumbnailImgSrc: string
  isSelected: boolean
  isProductAvailableToPrint: boolean
  shouldShowNotAvailableInYourArea: boolean
  onViewOptions: ({ product }: { product: EulogiseCardProducts }) => void
}

const StyledPrintingOptionCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${MOBILE_THUMBNAIL_WIDTH}px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    width: ${DESKTOP_THUMBNAIL_WIDTH}px;
  }
`

const StyledPreviewThumbnail = styled.img`
  border-radius: 12px;
  width: ${MOBILE_THUMBNAIL_WIDTH}px;
  height: ${MOBILE_THUMBNAIL_HEIGHT}px;
  object-fit: cover;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    width: ${DESKTOP_THUMBNAIL_WIDTH}px;
    height: ${DESKTOP_THUMBNAIL_HEIGHT}px;
  }
`

const StyledContentContainer = styled.div`
  width: ${MOBILE_THUMBNAIL_WIDTH}px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    width: ${DESKTOP_THUMBNAIL_WIDTH}px;
  }
`

const StyledOptionText = styled.div`
  margin: 8px 0;
  text-align: left;
  font-size: 14px;
  height: 18px;
  width: 100%;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    font-size: 16px;
  }
`

const StyledOptionSizeText = styled.div<{ $noPaddingBottom: boolean }>`
  text-align: left;
  font-size: 12px;
  height: 20px;
  color: ${COLOR.NEUTRAL_GREY};
  width: 100%;
  ${({ $noPaddingBottom }) => ($noPaddingBottom ? `` : `margin-bottom: 8px;`)}

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    font-size: 16px;
  }
`

const StyledPrice = styled.div<{ $isPriceText: boolean }>`
  font-size: 12px;
  height: 20px;
  text-align: left;
  width: auto;
  ${({ $isPriceText }) => ($isPriceText ? `letter-spacing: -1px` : ``)}

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    font-size: 14px;
  }
`

const StyledPriceContainer = styled.div`
  display: flex;
  text-align: left;
  justify-content: left;
`

const StyledSelectButton = styled(Button)`
  margin: 8px 0 16px 0;
  width: 100%;
  border-radius: 4px;
`

const StyledSelectButtonContainer = styled.div`
  margin: 0;
  width: ${MOBILE_THUMBNAIL_WIDTH}px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    width: ${DESKTOP_THUMBNAIL_WIDTH}px;
  }
`

const StyledSelectedIcon = styled(CheckCircleFilled)`
  && img {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  && svg {
    width: 16px;
    height: 16px;
  }
`

const StyledPlaceholder = styled.div<{
  $height: number
}>`
  height: 20px;
  ${({ $height }) => $height && `height: ${$height}px`}
`

const getOptionCardAction = ({
  isProductAvailableToPrint,
  isSelected,
  shouldShowComingSoon,
  shouldShowNotAvailableInYourArea,
}: {
  isProductAvailableToPrint: boolean
  isSelected: boolean
  shouldShowComingSoon: boolean
  shouldShowNotAvailableInYourArea: boolean
}) => {
  if (shouldShowComingSoon) {
    return 'Coming Soon'
  }
  if (shouldShowNotAvailableInYourArea) {
    return 'Currently Unavailable'
  }
  if (!isProductAvailableToPrint) {
    return 'Edit to see options'
  }
  if (isSelected) {
    return 'Edit Selection'
  }
  return 'View Options'
}

const getIsOptionCardActionButtonDisabled = ({
  isProductAvailableToPrint,
  shouldShowNotAvailableInYourArea,
}: {
  isProductAvailableToPrint: boolean
  shouldShowNotAvailableInYourArea: boolean
}) => {
  if (!isProductAvailableToPrint || shouldShowNotAvailableInYourArea) {
    return true
  }
  return false
}

const PrintingOptionCard = ({
  product,
  displayName,
  displayedSize,
  stringPrice,
  previewThumbnailImgSrc,
  isSelected,
  isProductAvailableToPrint,
  shouldShowNotAvailableInYourArea,
  onViewOptions,
}: PrintingOptionCardProps): JSX.Element | null => {
  if (!product || !displayName || !displayedSize || !stringPrice) {
    return null
  }

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true
    }
    return window.innerWidth >= CHECKOUT_BREAKPOINT.MD
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= CHECKOUT_BREAKPOINT.MD)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderPrice = ({
    product,
    stringPrice,
    shouldShowNotAvailableInYourArea,
  }: {
    product: EulogiseCardProducts
    stringPrice: number
    shouldShowNotAvailableInYourArea: boolean
  }) => {
    if (!stringPrice) {
      return null
    }
    if (shouldShowNotAvailableInYourArea) {
      if (product === EulogiseCardProducts.BOOKLET) {
        return <StyledPlaceholder $height={32} />
      }
      return null
    }
    return (
      <StyledPriceContainer>
        <StyledPrice $isPriceText={false}>from</StyledPrice>
        <Price
          priceNumber={stringPrice}
          $letterSpacing="-0.1rem"
          withDollarSign={true}
          $padding={'0 4px;'}
        />
        <StyledPrice $isPriceText={false}>per print</StyledPrice>
      </StyledPriceContainer>
    )
  }

  const renderSelectButton = ({ isSelected }: { isSelected: boolean }) => {
    const buttonText = getOptionCardAction({
      isProductAvailableToPrint,
      isSelected,
      shouldShowComingSoon: false,
      shouldShowNotAvailableInYourArea,
    })
    return (
      <StyledSelectButton
        buttonType={
          isSelected
            ? ButtonType.CHECKOUT_HIGHLIGHTED_BUTTON
            : ButtonType.HIGHLIGHTED_BUTTON
        }
        buttonSize={isDesktop ? ButtonSize.SM : ButtonSize.XXS}
        onClick={() => onViewOptions({ product })}
        disabled={getIsOptionCardActionButtonDisabled({
          isProductAvailableToPrint,
          shouldShowNotAvailableInYourArea,
        })}
        noMarginLeft
        noMarginRight
        icon={isSelected && <StyledSelectedIcon />}
      >
        {buttonText}
      </StyledSelectButton>
    )
  }

  return (
    <StyledPrintingOptionCardContainer>
      <StyledPreviewThumbnail src={previewThumbnailImgSrc} alt={displayName} />
      <StyledContentContainer>
        <StyledOptionText>{displayName}</StyledOptionText>
        <StyledOptionSizeText
          $noPaddingBottom={shouldShowNotAvailableInYourArea}
        >
          {displayedSize}
        </StyledOptionSizeText>
        {renderPrice({
          product,
          stringPrice,
          shouldShowNotAvailableInYourArea,
        })}
        <StyledSelectButtonContainer>
          {renderSelectButton({ isSelected })}
        </StyledSelectButtonContainer>
      </StyledContentContainer>
    </StyledPrintingOptionCardContainer>
  )
}

export default PrintingOptionCard
