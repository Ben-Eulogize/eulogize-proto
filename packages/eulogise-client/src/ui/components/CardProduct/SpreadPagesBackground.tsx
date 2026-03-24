import React from 'react'
import styled from 'styled-components'

const StyledSpreadPagesBackground = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
`

export const BookSpreadBackground = styled.div`
  position: absolute;
  width: calc(100% * 2);
  height: 100%;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 21, 41, 0.25);
`

type ISpreadPagesBackgroundProps = {
  pageSize: { width: number; height: number }
  noOfSpreadPages: number
  className?: string
  style?: React.CSSProperties
  spreadMargin?: string
}

export const SpreadPagesBackground = ({
  pageSize,
  noOfSpreadPages,
  className,
  style,
  spreadMargin,
}: ISpreadPagesBackgroundProps) => (
  <StyledSpreadPagesBackground className={className} style={style}>
    {/*
    {UtilHelper.times(
      (cursor: number) => (
        <BookSpreadBackground
          key={cursor}
          $width={pageSize.width}
          $height={pageSize.height}
          $margin={spreadMargin}
        />
      ),
      noOfSpreadPages,
    )}
*/}
  </StyledSpreadPagesBackground>
)
