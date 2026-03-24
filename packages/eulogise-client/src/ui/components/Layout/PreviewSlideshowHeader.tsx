import React from 'react'
import styled from 'styled-components'
import { Button, ButtonType } from '@eulogise/client-components'
import { NavigationHelper } from '@eulogise/helpers'
import { EulogiseProduct } from '@eulogise/core'

const StyledPreviewSlideshowHeader = styled.div`
  display: flex;
  padding-right: 16px;
`

interface IPreviewSlideshowHeader {
  slideshowId: string
  isSlideshowGenerated: boolean
  onClose: () => void
}

const PreviewSlideshowHeader = ({
  slideshowId,
  isSlideshowGenerated,
  onClose,
}: IPreviewSlideshowHeader) => {
  return (
    <StyledPreviewSlideshowHeader>
      <Button
        buttonType={ButtonType.TRANSPARENT}
        noMarginRight
        onClick={() => {
          if (isSlideshowGenerated) {
            onClose()
          } else {
            NavigationHelper.navigateToProduct({
              product: EulogiseProduct.SLIDESHOW,
              id: slideshowId,
            })
          }
        }}
      >
        {isSlideshowGenerated ? 'Close' : 'Back to Slideshow'}
      </Button>
    </StyledPreviewSlideshowHeader>
  )
}

export default PreviewSlideshowHeader
