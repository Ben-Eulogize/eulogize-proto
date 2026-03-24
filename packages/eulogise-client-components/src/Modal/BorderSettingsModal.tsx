import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal } from './Modal'
import { Button } from '../Button'
import { BorderSettingsForm } from '../Form/BorderSettingsForm'
import {
  CardProductBorderPageType,
  CardProductPageSize,
  EulogiseProduct,
  EulogiseRegion,
  IBorderSettingsModalFormFields,
  ICardProductTheme,
  IGenericCardProductMetadata,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'

export type IBorderSettingsModalProps = {
  fields: IBorderSettingsModalFormFields
  product?: EulogiseProduct
  genericProductMetadata?: IGenericCardProductMetadata
  region?: EulogiseRegion
  pageSize?: CardProductPageSize
  productTheme: ICardProductTheme
  isOpen?: boolean
  title?: string
  text?: React.ReactNode
  onClose: () => void
  onApply: (formFields: IBorderSettingsModalFormFields) => void
  onColorChange?: (color: string) => void
  recentColors?: Array<string>
}

// @ts-ignore
const StyledBorderSettingsModal = styled(Modal)``

const BorderSettingsFormContainer = styled.div`
  display: flex;
  justify-content: center;
  & > div {
    padding-right: 2rem;
  }
  & > div:last-of-type {
    padding-right: 0;
  }
`

export const BorderSettingsModal = ({
  isOpen = true,
  fields,
  onClose,
  onApply,
  product = EulogiseProduct.BOOKLET,
  region = EulogiseRegion.USA,
  pageSize = CardProductPageSize.A5,
  productTheme,
  genericProductMetadata,
  onColorChange,
  recentColors,
}: IBorderSettingsModalProps) => {
  const [borderSettingsModalFormFields, setBorderSettingsModalFormFields] =
    useState<IBorderSettingsModalFormFields>(fields)
  const hasMiddlePages = CardProductHelper.hasMiddlePages({
    product,
    genericProductMetadata,
  })
  const hasBackPage = CardProductHelper.hasBackPage({
    product,
    genericProductMetadata,
  })

  return (
    <StyledBorderSettingsModal
      isOpen={isOpen}
      width={hasMiddlePages ? 950 : 700}
      onCloseClick={onClose}
      title="Border Settings"
      footer={
        <>
          <Button key="close" noMarginRight onClick={onClose}>
            Cancel
          </Button>
          <Button
            key="apply"
            noMarginRight
            onClick={() => onApply(borderSettingsModalFormFields)}
          >
            Apply
          </Button>
        </>
      }
    >
      <BorderSettingsFormContainer>
        <BorderSettingsForm
          title="Front Page"
          genericProductMetadata={genericProductMetadata}
          region={region}
          pageSize={pageSize}
          product={product}
          productTheme={productTheme}
          fields={
            borderSettingsModalFormFields[CardProductBorderPageType.FRONT_PAGE]
          }
          onFieldChange={(newFields) =>
            setBorderSettingsModalFormFields({
              ...borderSettingsModalFormFields,
              [CardProductBorderPageType.FRONT_PAGE]: newFields,
            })
          }
          onColorChange={onColorChange}
          recentColors={recentColors}
        />
        {hasMiddlePages && (
          <BorderSettingsForm
            title="Middle Pages"
            genericProductMetadata={genericProductMetadata}
            region={region}
            pageSize={pageSize}
            product={product}
            productTheme={productTheme}
            isDoublePreview
            fields={
              borderSettingsModalFormFields[
                CardProductBorderPageType.MIDDLE_PAGES
              ]
            }
            onFieldChange={(newFields) => {
              setBorderSettingsModalFormFields({
                ...borderSettingsModalFormFields,
                [CardProductBorderPageType.MIDDLE_PAGES]: newFields,
              })
            }}
            onColorChange={onColorChange}
            recentColors={recentColors}
          />
        )}
        {hasBackPage && (
          <BorderSettingsForm
            title="Back Page"
            genericProductMetadata={genericProductMetadata}
            region={region}
            pageSize={pageSize}
            productTheme={productTheme}
            fields={
              borderSettingsModalFormFields[CardProductBorderPageType.BACK_PAGE]
            }
            product={product}
            onFieldChange={(newFields) => {
              setBorderSettingsModalFormFields({
                ...borderSettingsModalFormFields,
                [CardProductBorderPageType.BACK_PAGE]: newFields,
              })
            }}
            onColorChange={onColorChange}
            recentColors={recentColors}
          />
        )}
      </BorderSettingsFormContainer>
    </StyledBorderSettingsModal>
  )
}
