import React from 'react'
import { Button } from '../Button'
import {
  EulogiseProduct,
  ICardProductData,
  ICardProductOverlayUpdateOptions,
  ICardProductTheme,
} from '@eulogise/core'
import { Modal } from './Modal'
import { useState } from 'react'
import { OverlaySettingsForm } from '../Form/OverlaySettingsForm'
import { CardProductHelper, UtilHelper } from '@eulogise/helpers'

type IOverlaySettingsModalProps = {
  isOpen: boolean
  product: EulogiseProduct
  productTheme: ICardProductTheme
  cardProduct: ICardProductData
  onClose: () => void
  onApply: (fields: ICardProductOverlayUpdateOptions) => void
  fields: ICardProductOverlayUpdateOptions
  onColorChange?: (color: string) => void
  recentColors?: Array<string>
}

export const OverlaySettingsModal = ({
  fields,
  product,
  productTheme,
  cardProduct,
  isOpen,
  onClose,
  onApply,
  onColorChange,
  recentColors,
}: IOverlaySettingsModalProps) => {
  const [overlaySettingsModalFormFields, setOverlaySettingsModalFormFields] =
    useState<ICardProductOverlayUpdateOptions>(
      UtilHelper.mergeDeepRight(
        {},
        fields,
        CardProductHelper.getDefaultOverlayByProduct(product),
      ),
    )
  return (
    <Modal
      isOpen={isOpen}
      width={800}
      onCloseClick={onClose}
      title="Overlay Settings"
      footer={
        <Button
          key="apply"
          noMarginRight
          onClick={() => onApply(overlaySettingsModalFormFields)}
        >
          Apply
        </Button>
      }
    >
      <OverlaySettingsForm
        fields={overlaySettingsModalFormFields}
        product={product}
        productTheme={productTheme}
        cardProduct={cardProduct}
        onFieldChange={(f) => {
          setOverlaySettingsModalFormFields(f)
        }}
        onColorChange={onColorChange}
        recentColors={recentColors}
      />
    </Modal>
  )
}
