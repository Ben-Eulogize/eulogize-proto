import { Card } from '@eulogise/client-components'
import {
  EulogiseCardProducts,
  EulogiseCountry,
  IPrintingPaperDefinition,
  IPrintingPerUnitPriceByCopies,
} from '@eulogise/core'
import React from 'react'
import styled from 'styled-components'

const IMAGE_SIZE = 260

interface IPaperTypeCardProps {
  index: number
  paperTypeDefinition: IPrintingPaperDefinition
  country: EulogiseCountry
  product: EulogiseCardProducts
}

const StyledPaperType = styled(Card)`
  .ant-card-body {
    padding: 0 32px;
  }
`

const StyledPaperTypeRowTextContainer = styled.div<{ $width?: string }>`
  ${({ $width }) =>
    $width
      ? `
      width: ${$width};
        `
      : `width: ${IMAGE_SIZE}px;`}
`

const StyledPaperTypeComposedRowTextContainer = styled.div`
  width: ${IMAGE_SIZE}px;
  display: flex;
`

const StyledPaperTypeImg = styled.img`
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
`

const StyledDesciptionContainer = styled.div`
  width: ${IMAGE_SIZE}px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`

const StyledPaperTypeText = styled.div<{
  $textAlign?: string
  $margin?: string
  $fontWeight?: string
  $width?: string
  $fontSize?: string
}>`
  ${({ $textAlign }) =>
    $textAlign
      ? `
      text-align: ${$textAlign};
    `
      : 'text-align: center;'}
  ${({ $margin }) =>
    $margin
      ? `
        margin: ${$margin};
      `
      : 'margin: 8px 0;'}

  ${({ $fontWeight }) =>
    $fontWeight
      ? `
          font-weight: ${$fontWeight};
        `
      : ''}

  ${({ $fontSize }) =>
    $fontSize
      ? `
          font-size: ${$fontSize};
        `
      : 'font-size: 16px;'}
  ${({ $width }) =>
    $width
      ? `
        width: ${$width};
          `
      : ''}
`

export const PaperTypeCard = ({
  index,
  paperTypeDefinition,
  country,
  product,
}: IPaperTypeCardProps) => {
  if (index === null || index === undefined || !paperTypeDefinition) {
    return null
  }

  const {
    description,
    displayName,
    imageUrl,
    key,
    perPaperUnitPrice,
    thickness,
    weight,
    weightUnit,
  } = paperTypeDefinition

  const perPaperUnitPriceSet = perPaperUnitPrice?.[product]?.[country]

  const minStartingPriceArray = Object.values(perPaperUnitPriceSet).filter(
    (num) => num !== 0,
  )

  const minStartingPricePerCopy = Math.min(...minStartingPriceArray) ?? 999

  return (
    <StyledPaperType key={key} bordered={false}>
      <StyledPaperTypeRowTextContainer $width="100%">
        <StyledPaperTypeText $fontWeight="bold" $width="100%" $fontSize="20px">
          {displayName}
        </StyledPaperTypeText>
      </StyledPaperTypeRowTextContainer>
      <StyledPaperTypeImg
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        alt={displayName}
        src={imageUrl}
      />

      <StyledDesciptionContainer>
        <StyledPaperTypeRowTextContainer>
          <StyledPaperTypeText $textAlign="left">
            {description}
          </StyledPaperTypeText>
        </StyledPaperTypeRowTextContainer>

        <StyledPaperTypeComposedRowTextContainer>
          <StyledPaperTypeText $width="100px" $textAlign="left" $margin="4px 0">
            {`Weight:`}
          </StyledPaperTypeText>
          <StyledPaperTypeText $textAlign="left" $margin="4px 0">
            {weight}
            {weightUnit}
          </StyledPaperTypeText>
        </StyledPaperTypeComposedRowTextContainer>

        <StyledPaperTypeComposedRowTextContainer>
          <StyledPaperTypeText $width="100px" $textAlign="left" $margin="4px 0">
            {`Thickness:`}
          </StyledPaperTypeText>
          <StyledPaperTypeText $textAlign="left" $margin="4px 0">
            {thickness}
          </StyledPaperTypeText>
        </StyledPaperTypeComposedRowTextContainer>

        <StyledPaperTypeComposedRowTextContainer>
          <StyledPaperTypeText $width="100px" $textAlign="left" $margin="4px 0">
            {`Starting at:`}
          </StyledPaperTypeText>
          <StyledPaperTypeText $textAlign="left" $margin="4px 0">
            {`$${minStartingPricePerCopy.toFixed(2)} per copy`}
          </StyledPaperTypeText>
        </StyledPaperTypeComposedRowTextContainer>
      </StyledDesciptionContainer>
    </StyledPaperType>
  )
}
