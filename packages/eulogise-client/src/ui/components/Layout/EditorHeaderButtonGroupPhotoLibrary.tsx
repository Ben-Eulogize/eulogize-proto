import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  ButtonType,
  Button,
  Notification,
  ButtonSize,
} from '@eulogise/client-components'
import {
  useAssetState,
  useAuthState,
  useProductState,
  useCaseState,
  useEulogiseDispatch,
} from '../../store/hooks'
import { EulogiseProduct, IAuthState, ICaseState } from '@eulogise/core'
import { fetchSlideshowsByCaseId } from '../../store/SlideshowState/actions'
import { CardProductHelper, AssetHelper } from '@eulogise/helpers'
import { IAssetState } from '@eulogise/core'
import { EulogiseImageLibrarySortingBy } from '@eulogise/core'
import { updateCaseById } from '../../store/CaseState/actions'
import { NavigationHelper } from '@eulogise/helpers'
import { DEVICES, useBreakpoint } from '@eulogise/client-core'

const StyledEditorButtonGroupContainer = styled.div<{ $isMobileSize: boolean }>`
  display: flex;
  ${({ $isMobileSize }) =>
    $isMobileSize
      ? `padding-right: 4px;`
      : `
        padding-right: 16px;
  `};
`

interface IEditorHeaderButtonGroupSlideshow {
  location: Location
}

const EditorHeaderButtonGroupPhotoLibrary = ({
  location,
}: IEditorHeaderButtonGroupSlideshow) => {
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId: string = activeCase?.id!

  const product = CardProductHelper.getAtWhichProductEditorPage({ location })

  const slug = CardProductHelper.getGenericCardProductSlugByLocation({
    location,
    product,
  })
  const { isUpdating } = useProductState({ product, slug })

  const {
    images,
    sortBy: imagesSortedBy,
    isUploadingEditedImage,
  }: IAssetState = useAssetState()

  const isImagesCustomSorted =
    imagesSortedBy === EulogiseImageLibrarySortingBy.CUSTOMISED

  const isImagesRandomSorted =
    imagesSortedBy === EulogiseImageLibrarySortingBy.RANDOM

  const allowUserSaveToUpdateImagesOrderIds =
    isImagesRandomSorted || isImagesCustomSorted

  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE

  useEffect(() => {
    if (product === EulogiseProduct.TV_WELCOME_SCREEN) {
      dispatch(fetchSlideshowsByCaseId({ caseId /*, slideshowData*/ }))
    }
  }, [product])

  if (!account) {
    return null
  }
  return (
    <StyledEditorButtonGroupContainer $isMobileSize={isMobileScreenSize}>
      <Button
        disabled={
          isUploadingEditedImage || !allowUserSaveToUpdateImagesOrderIds
        }
        noMarginRight
        buttonType={ButtonType.TRANSPARENT}
        buttonSize={isMobileScreenSize ? ButtonSize.SM : ButtonSize.MD}
        onClick={() => {
          if ((isImagesCustomSorted || isImagesRandomSorted) && images) {
            const customisedImagesOrderIds: Array<string> =
              AssetHelper.getCustomisedImagesOrderIdsByImages(images)
            const updatedCaseFields = {
              customisedImagesOrderIds,
            }
            dispatch(
              updateCaseById({
                caseId,
                caseFields: updatedCaseFields,
                success: () => Notification.success('New Image Order saved.'),
              }),
            )
            NavigationHelper.removeUnsavedListener()
          } else {
          }
        }}
        loading={isUpdating}
      >
        Save
      </Button>
    </StyledEditorButtonGroupContainer>
  )
}

export default EditorHeaderButtonGroupPhotoLibrary
