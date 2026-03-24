import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { CHECKOUT_BREAKPOINT, STYLE } from '@eulogise/client-core'
import { KEEPSAKE_PRODUCTS } from '@eulogise/core'
import { ButtonType, ButtonSize, Button } from '@eulogise/client-components'
import { CheckCircleFilled } from '@ant-design/icons'

export const DESKTOP_THUMBNAIL_WIDTH = 244
export const DESKTOP_THUMBNAIL_HEIGHT = 163
export const MOBILE_THUMBNAIL_WIDTH = 155
export const MOBILE_THUMBNAIL_HEIGHT = 103

const StyledKeepsakeCardContainer = styled.div`
  ${STYLE.HEADING_MEDIUM};
  display: flex;
  flex-direction: column;
  width: ${MOBILE_THUMBNAIL_WIDTH}px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    width: ${DESKTOP_THUMBNAIL_WIDTH}px;
  }
`

const StyledSelectButton = styled(Button)`
  margin: 0 0 16px 0;
  width: 100%;
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

const StyledDisplayName = styled.div`
  margin: 8px 0;
  font-size: 14px;
  line-height: 18px;
  width: 100%;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    ${STYLE.TEXT_SMALL};
  }
`

const StyledContentContainer = styled.div`
  width: ${MOBILE_THUMBNAIL_WIDTH}px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    width: ${DESKTOP_THUMBNAIL_WIDTH}px;
  }
`

interface KeepsakeCardProps {
  thumbnailSrc: string
  keepsakeProduct: KEEPSAKE_PRODUCTS
  displayName: string
  isSelected: boolean
  isAvaialble: boolean
  onViewOptions: ({
    keepsakeProduct,
  }: {
    keepsakeProduct: KEEPSAKE_PRODUCTS
  }) => void
}

const getCorrectButtonText = ({
  isAvaialble,
  isSelected,
  shouldShowComingSoon,
  shouldShowNotAvailableInYourArea,
}: {
  isAvaialble: boolean
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
  if (!isAvaialble) {
    return 'Edit to see options'
  }
  if (isSelected) {
    return 'Edit Selection'
  }
  return 'View Options'
}

const KeepsakeCard = ({
  thumbnailSrc,
  keepsakeProduct,
  displayName,
  isSelected,
  isAvaialble,
  onViewOptions,
}: KeepsakeCardProps): JSX.Element | null => {
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

  const renderSelectButton = ({ isSelected }: { isSelected: boolean }) => {
    return (
      <StyledSelectButton
        buttonType={
          isSelected
            ? ButtonType.CHECKOUT_HIGHLIGHTED_BUTTON
            : ButtonType.HIGHLIGHTED_BUTTON
        }
        buttonSize={isDesktop ? ButtonSize.SM : ButtonSize.XXS}
        onClick={() => onViewOptions({ keepsakeProduct })}
        disabled={!isAvaialble}
        noMarginLeft
        noMarginRight
        icon={isSelected && <StyledSelectedIcon />}
      >
        {getCorrectButtonText({
          isAvaialble,
          isSelected,
          shouldShowComingSoon: false,
          shouldShowNotAvailableInYourArea: false,
        })}
      </StyledSelectButton>
    )
  }

  const renderDisplayName = ({ displayName }: { displayName: string }) => {
    return <StyledDisplayName>{displayName}</StyledDisplayName>
  }

  return (
    <StyledKeepsakeCardContainer>
      <StyledPreviewThumbnail src={thumbnailSrc} alt={keepsakeProduct} />
      <StyledContentContainer>
        <StyledSelectButtonContainer>
          {renderDisplayName({ displayName })}
          {renderSelectButton({ isSelected })}
        </StyledSelectButtonContainer>
      </StyledContentContainer>
    </StyledKeepsakeCardContainer>
  )
}

export default KeepsakeCard
