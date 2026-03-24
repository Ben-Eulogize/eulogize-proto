import React from 'react'
import styled from 'styled-components'
import { NewBackgroundImageThumbnail } from './NewBackgroundImageThumbnail'
import { EulogiseProduct } from '@eulogise/core'
import { STYLE } from '@eulogise/client-core'

const StyledNewBackgroundImageThumbnailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 68rem;
  justify-content: space-evenly;
  margin: ${STYLE.GUTTER} auto 2rem;
`

type INewBackgroundImageThumbnailListProps = {
  backgroundImageId: string
  loadingMessage: string
  isEditable: boolean
}

export const NewBackgroundImageThumbnailList = ({
  isEditable,
  backgroundImageId,
  loadingMessage,
}: INewBackgroundImageThumbnailListProps) => (
  <StyledNewBackgroundImageThumbnailList>
    <NewBackgroundImageThumbnail
      isEditable={isEditable}
      product={EulogiseProduct.BOOKLET}
      backgroundImageId={backgroundImageId}
      loadingMessage={loadingMessage}
    />
    <NewBackgroundImageThumbnail
      isEditable={isEditable}
      product={EulogiseProduct.SLIDESHOW}
      backgroundImageId={backgroundImageId}
      loadingMessage={loadingMessage}
    />
    <NewBackgroundImageThumbnail
      isEditable={isEditable}
      product={EulogiseProduct.SIDED_CARD}
      backgroundImageId={backgroundImageId}
      loadingMessage={loadingMessage}
    />
    <NewBackgroundImageThumbnail
      isEditable={isEditable}
      product={EulogiseProduct.THANK_YOU_CARD}
      backgroundImageId={backgroundImageId}
      loadingMessage={loadingMessage}
    />
    <NewBackgroundImageThumbnail
      isEditable={isEditable}
      product={EulogiseProduct.BOOKMARK}
      backgroundImageId={backgroundImageId}
      loadingMessage={loadingMessage}
    />
    <NewBackgroundImageThumbnail
      isEditable={isEditable}
      product={EulogiseProduct.TV_WELCOME_SCREEN}
      backgroundImageId={backgroundImageId}
      loadingMessage={loadingMessage}
    />
  </StyledNewBackgroundImageThumbnailList>
)
