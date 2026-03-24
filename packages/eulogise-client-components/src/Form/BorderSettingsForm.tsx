import React from 'react'
import styled from 'styled-components'
import { BorderFormField } from './BorderFormField'
import { Select } from '../Select'
import {
  CardProductBorderCategory,
  CardProductBorderThicknessOptions,
  CardProductBorderThicknessType,
  CardProductPageSize,
  EulogiseProduct,
  EulogiseRegion,
  // getCardProductBorderCategoryOptions,
  getCardProductBorderOptions,
  IBorderSettingFormFields,
  ICardProductTheme,
  IGenericCardProductMetadata,
} from '@eulogise/core'
import { STYLE } from '@eulogise/client-core'
import { HeaderTextSM } from '../Text'
import { BorderFormPreview } from './BorderFormPreview'
import { ColorPickerFieldWithInlinePreset } from '../ColorPickerField/ColorPickerFieldWithInlinePreset'

const StyledBorderSettingsForm = styled.div``

export type IBorderSettingsFormProps = {
  title: string
  fields: IBorderSettingFormFields
  onFieldChange: (fields: IBorderSettingFormFields) => void
  product: EulogiseProduct
  genericProductMetadata?: IGenericCardProductMetadata
  productTheme: ICardProductTheme
  isDoublePreview?: boolean
  onColorChange?: (color: string) => void
  recentColors?: Array<string>
  region: EulogiseRegion
  pageSize: CardProductPageSize
}

const StyledSelect = styled(Select)`
  width: 180px;
`

const BorderSettingFormTitle = styled(HeaderTextSM)`
  text-align: center;
  color: ${STYLE.PRIMARY};
  margin-bottom: ${STYLE.GUTTER};
`

const BorderPreviewsContainer = styled.div`
  display: flex;
  justify-content: center;
`

const BorderPreviewContainer = styled.div`
  display: flex;
`

export const BorderSettingsForm = ({
  title,
  fields,
  onFieldChange,
  product,
  genericProductMetadata,
  productTheme,
  isDoublePreview,
  onColorChange,
  recentColors,
  region,
  pageSize,
}: IBorderSettingsFormProps) => {
  const classicBorderStyleOptions = getCardProductBorderOptions({
    product,
    borderCategory: CardProductBorderCategory.CLASSIC,
  })
  const graphicBorderStyleOptions = getCardProductBorderOptions({
    product,
    borderCategory: CardProductBorderCategory.GRAPHIC,
  })

  const handleFieldChange = (
    fieldName:
      | 'borderCategory'
      | 'borderStyle'
      | 'color'
      | 'thickness'
      | 'pages',
    value: any,
  ) => {
    onFieldChange({
      ...fields,
      [fieldName]: value,
    })
  }

  return (
    <StyledBorderSettingsForm>
      <BorderSettingFormTitle>{title}</BorderSettingFormTitle>
      <BorderPreviewsContainer>
        <BorderPreviewContainer>
          <BorderFormPreview
            product={product}
            genericProductMetadata={genericProductMetadata}
            productTheme={productTheme}
            fields={fields}
            region={region}
            pageSize={pageSize}
          />
          {isDoublePreview && (
            <BorderFormPreview
              product={product}
              genericProductMetadata={genericProductMetadata}
              productTheme={productTheme}
              fields={fields}
              region={region}
              pageSize={pageSize}
            />
          )}
        </BorderPreviewContainer>
      </BorderPreviewsContainer>
      {/*<BorderFormField label="Category">
        <StyledSelect
          value={fields.borderCategory}
          onChange={(newBorderCategory: CardProductBorderCategory) => {
            const newBorderStyle =
              newBorderCategory === CardProductBorderCategory.CLASSIC
                ? classicBorderStyleOptions[1].value
                : graphicBorderStyleOptions[0].value
            onFieldChange({
              ...fields,
              borderCategory: newBorderCategory,
              borderStyle: newBorderStyle,
            })
          }}
          options={getCardProductBorderCategoryOptions()}
        />
      </BorderFormField>*/}
      <BorderFormField label="Style">
        <StyledSelect
          value={fields.borderStyle}
          onChange={(value: string) => {
            handleFieldChange('borderStyle', value)
          }}
          options={
            fields.borderCategory === CardProductBorderCategory.CLASSIC
              ? classicBorderStyleOptions
              : graphicBorderStyleOptions
          }
        />
      </BorderFormField>
      <BorderFormField label="Thickness">
        <StyledSelect
          value={fields.thickness || CardProductBorderThicknessType.THIN}
          onChange={(value: string) => {
            handleFieldChange('thickness', value)
          }}
          options={CardProductBorderThicknessOptions}
        />
      </BorderFormField>
      <BorderFormField label="Color">
        <ColorPickerFieldWithInlinePreset
          color={fields.color!}
          onColorSelected={(newColor: string) => {
            handleFieldChange('color', newColor)
            if (onColorChange) {
              onColorChange(newColor)
            }
          }}
          recentColors={recentColors}
        />
      </BorderFormField>
    </StyledBorderSettingsForm>
  )
}
