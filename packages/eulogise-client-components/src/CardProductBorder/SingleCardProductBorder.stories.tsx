import React, { useState } from 'react'
import styled from 'styled-components'
import { SingleCardProductBorder } from './SingleCardProductBorder'
import {
  EulogiseProduct,
  ICardProductSingleBorder,
  ICardProductBorderStyle,
  PAGE_SIZES,
} from '@eulogise/core'
import { Select } from '../Select'
import { TextField } from '../TextField'
import { HeaderTextSM, LabelText } from '../Text'
import { Button } from '../Button'

export default {
  title: 'CardProduct/SingleCardProductBorder',
  component: SingleCardProductBorder,
  argTypes: {},
}

const MockBookletContainer = styled.div<{ product: EulogiseProduct }>`
  ${({ product }) =>
    product === EulogiseProduct.BOOKLET
      ? `
      width: ${PAGE_SIZES.A5[0]}px;
      height: ${PAGE_SIZES.A5[1]}px;
    `
      : product === EulogiseProduct.THANK_YOU_CARD
      ? `
      width: ${PAGE_SIZES.THANKYOUCARD[0]}px;
      height: ${PAGE_SIZES.THANKYOUCARD[1]}px;
`
      : `
      width: ${PAGE_SIZES[product][0]}px;
      height: ${PAGE_SIZES[product][1]}px;
`}
  box-shadow: #9197a3 0 0 2px;
  position: relative;
`

const BorderSettingsContainer = styled.div`
  padding-right: 2rem;
`

const BORDER_STYLE_OPTIONS: Array<{
  label: string
  value: ICardProductBorderStyle
}> = [
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dotted', value: 'dotted' },
  { label: 'Solid', value: 'solid' },
  { label: 'Double', value: 'double' },
  { label: 'None', value: 'none' },
]

const ALIGNMENT_OPTIONS: Array<{
  label: string
  value: 'left' | 'right' | 'center'
}> = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Center', value: 'center' },
]

const PRODUCT_OPTIONS: Array<{ label: string; value: EulogiseProduct }> = [
  { label: 'Booklet', value: EulogiseProduct.BOOKLET },
  { label: 'Bookmark', value: EulogiseProduct.BOOKMARK },
  { label: 'Thankyou Card', value: EulogiseProduct.THANK_YOU_CARD },
  { label: 'TV Welcome Screen', value: EulogiseProduct.TV_WELCOME_SCREEN },
]

const StyledBorderSettings = styled.div``

const BorderSettings = ({
  borderNo,
  border,
  onBorderChange,
}: {
  borderNo: string
  border: ICardProductSingleBorder
  onBorderChange: (border: ICardProductSingleBorder) => void
}) => (
  <StyledBorderSettings>
    <HeaderTextSM style={{ marginTop: '.5rem' }}>
      Border {borderNo}
    </HeaderTextSM>
    <LabelText>Border Style</LabelText>
    <Select
      defaultValue={border.borderStyle}
      style={{ width: '100%' }}
      onChange={(value: ICardProductBorderStyle) => {
        onBorderChange({
          ...border,
          borderStyle: value,
        })
      }}
      options={BORDER_STYLE_OPTIONS}
    />
    <LabelText>Alignment</LabelText>
    <Select
      defaultValue={border.alignTo}
      style={{ width: '100%' }}
      onChange={(value: string) => {
        onBorderChange({
          ...border,
          alignTo: value as any,
        })
      }}
      options={ALIGNMENT_OPTIONS}
    />
    <LabelText>Border Width (percentage)</LabelText>
    <TextField
      type="number"
      value={border.size?.width!}
      onChange={(ev, value) =>
        onBorderChange({
          ...border,
          size: {
            ...border.size,
            width: value,
          },
        })
      }
    />
    <LabelText>Border Height (percentage)</LabelText>
    <TextField
      type="number"
      value={border.size?.height!}
      onChange={(ev, value) => {
        console.log('height', value)
        onBorderChange({
          ...border,
          size: {
            ...border.size,
            height: value,
          },
        })
      }}
    />
    <LabelText>Border Thickness</LabelText>
    <TextField
      value={border.thickness!}
      onChange={(ev, value) => {
        onBorderChange({
          ...border,
          thickness: value,
        })
      }}
    />
    <LabelText>Border Padding</LabelText>
    <TextField
      value={border.padding!}
      onChange={(ev, value) => {
        onBorderChange({
          ...border,
          padding: value,
        })
      }}
    />
    <LabelText>Border Color (color name or hex)</LabelText>
    <TextField
      value={border.color}
      onChange={(ev, value) => {
        onBorderChange({
          ...border,
          color: value,
        })
      }}
    />
  </StyledBorderSettings>
)

const DEFAULT_BORDER: ICardProductSingleBorder = {
  borderStyle: 'solid',
  size: {
    width: 89,
    height: 92,
  },
  color: 'black',
  thickness: '1px 1px 1px 1px',
  padding: '0px 0px 0px 0px',
  alignTo: 'center',
}

const BorderStoryContainer = styled.div`
  display: flex;
  width: 100%;
  > div {
    flex: 1;
  }
`

const BorderPreview = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const TopContainer = styled.div`
  width: 100%;
`

const BottomContainer = styled.div``

const MasterContainer = styled.div``

const CodeContainer = styled.div`
  padding: 1rem;
  background-color: #bdc1c9;
`

const Code = styled.code``

export const Default = () => {
  const [product, setProduct] = useState<EulogiseProduct>(
    EulogiseProduct.BOOKLET,
  )
  const [borders, setBorders] = useState<Array<ICardProductSingleBorder>>([
    DEFAULT_BORDER,
  ])
  return (
    <MasterContainer>
      <TopContainer>
        <LabelText>Product</LabelText>
        <Select
          value={product}
          style={{ width: '100%', marginBottom: '1rem' }}
          onChange={(value: EulogiseProduct) => {
            setProduct(value)
          }}
          options={PRODUCT_OPTIONS}
        />
        <BorderStoryContainer>
          <BorderSettingsContainer>
            {borders.map((border, index) => (
              <BorderSettings
                key={index}
                borderNo={`${index + 1}`}
                border={border}
                onBorderChange={(newBorder) => {
                  setBorders([
                    ...borders.filter((border, bi) => bi < index),
                    newBorder,
                    ...borders.filter((border, bi) => bi > index),
                  ])
                }}
              />
            ))}
            <Button
              style={{ marginTop: '1rem' }}
              onClick={() => setBorders([...borders, DEFAULT_BORDER])}
            >
              Add More Border
            </Button>
          </BorderSettingsContainer>
          <BorderPreview>
            <MockBookletContainer product={product}>
              {borders.map((border, index) => (
                <SingleCardProductBorder
                  key={index}
                  borderStyle={border.borderStyle}
                  size={{
                    width: `${border.size?.width}%`,
                    height: `${border.size?.height}%`,
                  }}
                  thickness={border.thickness}
                  padding={border.padding}
                  alignTo={border.alignTo}
                  color={border.color}
                />
              ))}
            </MockBookletContainer>
          </BorderPreview>
        </BorderStoryContainer>
      </TopContainer>
      <BottomContainer>
        <HeaderTextSM style={{ marginBottom: '2rem' }}>Code</HeaderTextSM>
        <CodeContainer>
          <Code>{JSON.stringify(borders)}</Code>
        </CodeContainer>
      </BottomContainer>
    </MasterContainer>
  )
}
