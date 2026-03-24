import React, { useState } from 'react'
import { BorderSettingsModal } from './BorderSettingsModal'
import {
  CardProductBorderPageType,
  CardProductBorderThicknessType,
  CardProductBorderType,
  CardProductPageSize,
  EulogiseProduct,
  IBorderSettingsModalFormFields,
  ICardProductTheme,
} from '@eulogise/core'
import { MOCK_THEMES } from '@eulogise/mock'

export default {
  title: 'Modal/BorderSettingsModal',
  component: BorderSettingsModal,
  argTypes: {},
}

const MockBorderSettingsModal = ({
  product,
}: {
  product?: EulogiseProduct
}) => {
  const [fields, setFields] = useState<IBorderSettingsModalFormFields>({
    [CardProductBorderPageType.FRONT_PAGE]: {
      color: 'black',
      thickness: CardProductBorderThicknessType.THIN,
      borderStyle: CardProductBorderType.SINGLE_SOLID,
    },
    [CardProductBorderPageType.MIDDLE_PAGES]: {
      color: 'black',
      thickness: CardProductBorderThicknessType.THIN,
      borderStyle: CardProductBorderType.SINGLE_SOLID,
    },
    [CardProductBorderPageType.BACK_PAGE]: {
      color: 'black',
      thickness: CardProductBorderThicknessType.THIN,
      borderStyle: CardProductBorderType.SINGLE_SOLID,
    },
  })

  return (
    <BorderSettingsModal
      product={product}
      pageSize={CardProductPageSize.A5}
      fields={fields}
      productTheme={MOCK_THEMES[0].products.booklet as ICardProductTheme}
      onApply={(newFields) => setFields({ ...fields, ...newFields })}
      isOpen
      onClose={() => console.log('close')}
    />
  )
}

export const Default = () => <MockBorderSettingsModal />

export const Booklet = () => (
  <MockBorderSettingsModal product={EulogiseProduct.BOOKLET} />
)

export const Bookmark = () => (
  <MockBorderSettingsModal product={EulogiseProduct.BOOKMARK} />
)

export const ThankyouCard = () => (
  <MockBorderSettingsModal product={EulogiseProduct.THANK_YOU_CARD} />
)

export const TvWelcomeScreen = () => (
  <MockBorderSettingsModal product={EulogiseProduct.TV_WELCOME_SCREEN} />
)
