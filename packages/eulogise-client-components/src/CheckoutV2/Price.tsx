import React from 'react'
import styled from 'styled-components'

const StyledPrice = styled.div<{
  $letterSpacing?: string
  $padding?: string
  $color?: string
}>`
  font-size: 14px;
  display: inline-flex;
  align-items: baseline;

  ${({ $padding }) => $padding && `padding: ${$padding}`};
  ${({ $color }) => $color && `color: ${$color}`};

  .dollar-sign {
    ${({ $letterSpacing }) =>
      $letterSpacing && `letter-spacing: ${$letterSpacing}`};
  }

  .number-part {
    ${({ $letterSpacing }) =>
      $letterSpacing && `letter-spacing: ${$letterSpacing}`};
  }

  .decimal-point {
    letter-spacing: normal;
    padding: 0 0.5px;
  }
`

const Price = ({
  priceNumber = 0,
  withDollarSign = false,
  $letterSpacing,
  $padding,
  $color,
}: {
  priceNumber: number
  withDollarSign?: boolean
  $letterSpacing?: string
  $padding?: string
  $color?: string
}): JSX.Element | null => {
  if (isNaN(priceNumber)) {
    return null
  }

  const priceNumberString =
    priceNumber === 0 ? priceNumber.toFixed(0) : priceNumber.toFixed(2)

  const [integerPart, fractionalPart] = priceNumberString.split('.')

  return (
    <StyledPrice
      $letterSpacing={$letterSpacing}
      $padding={$padding}
      $color={$color}
    >
      {withDollarSign && <span className="dollar-sign">$</span>}

      <span className="number-part">{integerPart}</span>

      {fractionalPart !== undefined && (
        <>
          <span className="decimal-point">.</span>
          <span className="number-part">{fractionalPart}</span>
        </>
      )}
    </StyledPrice>
  )
}

export default Price
