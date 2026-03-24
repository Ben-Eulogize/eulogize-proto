import React from 'react'
import styled from 'styled-components'
import { CardProductPage } from '../../CardProductPage'
import {
  CardProductPageColMode,
  CardProductViewDisplayMode,
} from '@eulogise/core'
import { CheckoutProductPreviewSingleAndPairProps } from './CheckoutProductPreview.types'

const StyledCardProductPage = styled(CardProductPage)`
  position: absolute;
`

export const CheckoutCardProductPreviewPage = (
  props: CheckoutProductPreviewSingleAndPairProps & {
    pageIndex: number
    className?: string
  },
) => {
  return (
    <StyledCardProductPage
      {...props}
      displayMode={CardProductViewDisplayMode.PREVIEW}
      colMode={CardProductPageColMode.ONE_COL}
      editorScaledFactor={1}
      containerRef={0}
      isDisabledDnd={true}
    />
  )
}
