import React, { useState } from 'react'
import { BorderSettingsForm } from './BorderSettingsForm'
import {
  CardProductBorderThicknessType,
  CardProductBorderType,
  CardProductPageSize,
  EulogiseProduct,
  EulogiseRegion,
  IBorderSettingFormFields,
  ICardProductTheme,
} from '@eulogise/core'
import { MOCK_THEMES } from '@eulogise/mock'

export default {
  title: 'CardProduct/BorderSettingsForm',
  component: BorderSettingsForm,
  argTypes: {},
}

export const Default = () => {
  const [fields, setFields] = useState<IBorderSettingFormFields>({
    color: 'black',
    thickness: CardProductBorderThicknessType.MEDIUM,
    borderStyle: CardProductBorderType.SINGLE_SOLID,
  })
  return (
    <BorderSettingsForm
      region={EulogiseRegion.USA}
      title="Border Settings"
      product={EulogiseProduct.BOOKLET}
      productTheme={MOCK_THEMES[0].products.booklet as ICardProductTheme}
      fields={fields}
      onFieldChange={(newFields) => {
        setFields(newFields)
      }}
      recentColors={['black', 'white', 'red', 'blue']}
      pageSize={CardProductPageSize.A5}
    />
  )
}
