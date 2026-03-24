import React from 'react'
import styled from 'styled-components'
import {
  AbstractBackgroundEditor,
  AbstractBackgroundEditorProps,
} from './AbstractBackgroundEditor'
import { BackgroundImageHelper } from '@eulogise/helpers'
import { BLEED, EulogiseProduct, EulogiseRegion } from '@eulogise/core'
import { COLOR } from '@eulogise/client-core'

// @ts-ignore
const StyledBookletBackgroundEditor = styled(AbstractBackgroundEditor)<{
  $isPreview: boolean
}>`
  ${({ $isPreview }) =>
    !$isPreview
      ? `
    &:after {
      pointer-events: none;
      content: '';
      position: absolute;
      top: ${BLEED}px;
      left: ${BLEED}px;
      right: ${BLEED}px;
      bottom: ${BLEED}px;
      border: 1px dashed red;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc(50% - 0.5px);
      border-right: 1px solid ${COLOR.WHITE};
      z-index: 10;
    }
`
      : ''}
`

export type BookletBackgroundEditorProps = Omit<
  AbstractBackgroundEditorProps,
  'width' | 'height'
> & {
  region: EulogiseRegion
}

export const BookletBackgroundEditor = (
  props: BookletBackgroundEditorProps,
) => {
  const { region, ...abstractProps } = props
  const { width, height } =
    BackgroundImageHelper.getEditedBackgroundWidthAndHeightByProduct({
      product: EulogiseProduct.BOOKLET,
      region,
    })

  return (
    <StyledBookletBackgroundEditor
      {...abstractProps}
      $isPreview={!!props.isPreview}
      width={width}
      height={height}
    />
  )
}
