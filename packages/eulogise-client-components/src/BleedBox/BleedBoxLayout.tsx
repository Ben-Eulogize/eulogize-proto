import React from 'react'
import styled from 'styled-components'
import { BleedBox, BleedBoxType } from './BleedBox'
import {
  BLEED_IN_MM_72_DPI,
  CardProductPageMode,
  EulogiseProduct,
} from '@eulogise/core'

const BLEED_BOX_SIZE_IN_MM = BLEED_IN_MM_72_DPI

const StyledBleedBoxLayout = styled.div<{ $disabled: boolean }>`
  ${({ $disabled }) =>
    !$disabled &&
    `
    position: relative;
    margin: ${BLEED_BOX_SIZE_IN_MM}mm;
  `}
`

// @ts-ignore
const TopLeftBleedBox = styled(BleedBox).attrs({
  type: BleedBoxType.TOP_LEFT,
})`
  position: absolute;
  left: -${BLEED_BOX_SIZE_IN_MM}mm;
  top: -${BLEED_BOX_SIZE_IN_MM}mm;
`

// @ts-ignore
const TopRightBleedBox = styled(BleedBox).attrs({
  type: BleedBoxType.TOP_RIGHT,
})`
  position: absolute;
  right: -${BLEED_BOX_SIZE_IN_MM}mm;
  top: -${BLEED_BOX_SIZE_IN_MM}mm;
`

// @ts-ignore
const BottomLeftBleedBox = styled(BleedBox).attrs({
  type: BleedBoxType.BOTTOM_LEFT,
})`
  position: absolute;
  left: -${BLEED_BOX_SIZE_IN_MM}mm;
  bottom: -${BLEED_BOX_SIZE_IN_MM}mm;
`

// @ts-ignore
const BottomRightBleedBox = styled(BleedBox).attrs({
  type: BleedBoxType.BOTTOM_RIGHT,
})`
  position: absolute;
  right: -${BLEED_BOX_SIZE_IN_MM}mm;
  bottom: -${BLEED_BOX_SIZE_IN_MM}mm;
`

const BleedContentContainer = styled.div<{
  $disabled?: boolean
}>`
  ${({ $disabled }) => ($disabled ? '' : 'overflow: hidden;')}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

type IBleedBoxLayoutProps = React.PropsWithChildren & {
  disabled?: boolean
  bleed?: boolean
  product: EulogiseProduct
  contentHeight?: number
  className?: string
  pageMode?: CardProductPageMode
}

export const BleedBoxLayout = ({
  children,
  bleed = false,
  disabled = false,
  product,
  contentHeight,
  className,
  pageMode,
}: IBleedBoxLayoutProps) => {
  if (disabled) {
    return (
      <div
        className={`${className} bleed-box-layout-disabled`}
        style={{ height: contentHeight ? `${contentHeight}px` : 'auto' }}
      >
        {children}
      </div>
    )
  }

  const isShowTrimMark =
    !disabled && bleed && pageMode !== CardProductPageMode.SINGLE_PAGE
  return (
    <StyledBleedBoxLayout
      className={`${className} bleed-box-layout`}
      $disabled={!isShowTrimMark}
    >
      {isShowTrimMark && (
        <>
          <TopLeftBleedBox />
          <TopRightBleedBox />
          <BottomLeftBleedBox />
          <BottomRightBleedBox />
        </>
      )}
      <BleedContentContainer
        className={`bleed-content-container`}
        $disabled={disabled}
      >
        {children}
      </BleedContentContainer>
    </StyledBleedBoxLayout>
  )
}
