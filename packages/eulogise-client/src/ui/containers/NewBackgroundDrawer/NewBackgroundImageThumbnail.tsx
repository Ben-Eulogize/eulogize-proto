import React from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  Text,
  BookletBackgroundThumbnail,
  SlideshowBackgroundThumbnail,
  ThankYouCardBackgroundThumbnail,
  TvWelcomeScreenBackgroundThumbnail,
  BookmarkBackgroundThumbnail,
} from '@eulogise/client-components'
import { EulogiseProduct } from '@eulogise/core'
import { STYLE } from '@eulogise/client-core'
import {
  useBackgroundImageState,
  useCaseState,
  useEulogiseDispatch,
} from '../../store/hooks'
import {
  NavigationHelper,
  CardProductHelper,
  UrlHelper,
} from '@eulogise/helpers'
import { closeDrawerAction } from '../../store/DrawerState/actions'

const StyledNewBackgroundImageThumbnail = styled.div`
  text-align: center;
  margin-right: ${STYLE.GUTTER};
`

const EditButton = styled(Button)`
  width: 17rem;
  margin: calc(${STYLE.GUTTER} / 2) 0 ${STYLE.GUTTER} 0;
`

type INewBackgroundImageThumbnailProps = {
  product: EulogiseProduct
  backgroundImageId: string
  loadingMessage: string
  isEditable: boolean
}

export const NewBackgroundImageThumbnail = ({
  product,
  backgroundImageId,
  loadingMessage,
  isEditable,
}: INewBackgroundImageThumbnailProps) => {
  const dispatch = useEulogiseDispatch()
  const { fromProductId, fromProduct } = UrlHelper.getQueryParams(
    window.location.search,
  )
  const { isRegenerating, regenerateProduct } = useBackgroundImageState()
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region!
  const title: string = CardProductHelper.getProductName({ product, region })
  if (!backgroundImageId) {
    return null
  }
  return (
    <StyledNewBackgroundImageThumbnail>
      {product === EulogiseProduct.BOOKLET && (
        <BookletBackgroundThumbnail
          isRegenerating={
            regenerateProduct === EulogiseProduct.BOOKLET && isRegenerating
          }
          backgroundId={backgroundImageId}
          loadingMessage={loadingMessage}
        />
      )}
      {product === EulogiseProduct.SIDED_CARD && (
        <BookletBackgroundThumbnail
          isRegenerating={
            // use Booklet as it is using booklet background image
            regenerateProduct === EulogiseProduct.BOOKLET && isRegenerating
          }
          backgroundId={backgroundImageId}
          loadingMessage={loadingMessage}
        />
      )}
      {product === EulogiseProduct.SLIDESHOW && (
        <SlideshowBackgroundThumbnail
          isRegenerating={
            regenerateProduct === EulogiseProduct.SLIDESHOW && isRegenerating
          }
          backgroundId={backgroundImageId}
          loadingMessage={loadingMessage}
        />
      )}
      {product === EulogiseProduct.THANK_YOU_CARD && (
        <ThankYouCardBackgroundThumbnail
          isRegenerating={
            regenerateProduct === EulogiseProduct.THANK_YOU_CARD &&
            isRegenerating
          }
          backgroundId={backgroundImageId}
          loadingMessage={loadingMessage}
        />
      )}
      {product === EulogiseProduct.BOOKMARK && (
        <BookmarkBackgroundThumbnail
          isRegenerating={
            regenerateProduct === EulogiseProduct.BOOKMARK && isRegenerating
          }
          backgroundId={backgroundImageId}
          loadingMessage={loadingMessage}
        />
      )}
      {product === EulogiseProduct.TV_WELCOME_SCREEN && (
        <TvWelcomeScreenBackgroundThumbnail
          isRegenerating={
            regenerateProduct === EulogiseProduct.TV_WELCOME_SCREEN &&
            isRegenerating
          }
          backgroundId={backgroundImageId}
          loadingMessage={loadingMessage}
        />
      )}

      {isEditable &&
      (product === EulogiseProduct.BOOKLET ||
        product === EulogiseProduct.SIDED_CARD) ? (
        <EditButton
          buttonType={ButtonType.TRANSPARENT}
          onClick={() => {
            NavigationHelper.navigateToBackground({
              // navigate to booklet edit page for both sided card and booklet
              product: EulogiseProduct.BOOKLET,
              backgroundImageId,
              fromProduct,
              fromProductId,
            })
            dispatch(closeDrawerAction())
          }}
        >
          Edit {title}
        </EditButton>
      ) : (
        <Text>{title}</Text>
      )}
    </StyledNewBackgroundImageThumbnail>
  )
}
