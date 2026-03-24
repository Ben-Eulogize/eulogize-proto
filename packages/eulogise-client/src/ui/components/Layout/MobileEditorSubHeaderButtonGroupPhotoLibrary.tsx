import React from 'react'
import styled from 'styled-components'
import {
  ButtonType,
  Button,
  AddContributorIcon,
  UploadPicturesIcon,
  MagnifierPlusIcon,
  CheckCircleIcon,
  ViewGalleryIcon,
  DeleteIcon,
} from '@eulogise/client-components'
import {
  useAuthState,
  useProductState,
  useCaseState,
  useEulogiseDispatch,
  useSlideshowState,
  useAssetState,
} from '../../store/hooks'
import {
  AssetType,
  IAssetState,
  IAuthState,
  ICaseState,
  ISlideshowState,
  ModalId,
} from '@eulogise/core'
import { showModalAction } from '../../store/ModalState/actions'
import { updateTimelineThumbnailsDisplayedAmount } from '../../store/SlideshowState/actions'
import { CardProductHelper } from '@eulogise/helpers'
import { useDetectClickOutside } from '@eulogise/client-core'
import { useDropdownHoverClick } from '../../hooks/useDropdownHoverClick'
import { openDrawerAction } from '../../store/DrawerState/actions'
import { DrawerId } from '@eulogise/core'
import PhotoLibrarySortDropdown from '../../containers/Dashboard/PhotoLibrary/PhotoLibrarySortDropdown'
import {
  updateIsFSOverlayPickerOpen,
  updateIsSelectingPhotos,
  updateSelectedPhotos,
} from '../../store/AssetState/actions'

const DesktopTextButton = styled(Button)`
  display: flex;
  align-items: center;
  button.ant-btn[disabled] {
    & > * {
      pointer-events: auto;
      cursor: not-allowed;
    }
  }
`

const StyledEditorButtonGroupContainer = styled.div`
  padding-top: 16px;
`

const StyledEditorButtonGroupContainerRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 12px;
`

const StyledMagnifierDropdownContainer = styled.div`
  margin-left: 8px;
`

const StyledMagnifierButton = styled(DesktopTextButton)`
  display: flex;
  margin-left: auto;
`

const StyledMagnifierPlusIcon = styled(MagnifierPlusIcon)`
  margin-left: 6px;
  margin-top: 3px;
  cursor: pointer;
  font-size: 20px;
`

const UploadPhotosButtonContainer = styled.div`
  min-width: 288px;
`

const StyledButton = styled(Button)<{ $width: string }>`
  ${({ $width }: { $width: string }) => ($width ? `width: ${$width};` : ``)}
`

interface IEditorHeaderButtonGroupSlideshow {
  location: Location
  isShowUploadPhotoButton: boolean
  isShowInviteButton: boolean
  isShowSortButton: boolean
}

const MobileEditorSubHeaderButtonGroupPhotoLibrary = ({
  location,
  isShowUploadPhotoButton,
  isShowInviteButton,
  isShowSortButton,
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
    images = [],
    isSelectingPhoto,
    selectedPhotos = [],
  }: IAssetState = useAssetState()

  const { timelineThumbnailsDisplayedAmount }: ISlideshowState =
    useSlideshowState()

  const hasSelectedAllPhotos: boolean = images.every((img) =>
    selectedPhotos?.includes(img),
  )

  const {
    onMouseEnter: onMagnifierMouseEnter,
    onMouseLeave: onMagnifierMouseLeave,
    onReset: onMagnifierMouseReset,
  } = useDropdownHoverClick({
    onDoubleClickedAction: () => {
      if (timelineThumbnailsDisplayedAmount! < 1) {
        dispatch(updateTimelineThumbnailsDisplayedAmount(1))
      }
    },
  })

  const magnifierRef = useDetectClickOutside({
    onTriggered: () => onMagnifierMouseReset(),
  })

  const onMobileMagnifierTouchStart = () => {
    if (timelineThumbnailsDisplayedAmount === 1) {
      dispatch(updateTimelineThumbnailsDisplayedAmount(3))
      return
    } else if (timelineThumbnailsDisplayedAmount === 3) {
      dispatch(updateTimelineThumbnailsDisplayedAmount(1))
      return
    }
  }

  const renderNonSelectingPhotosModeButtons = () => {
    return (
      <StyledEditorButtonGroupContainerRow>
        <UploadPhotosButtonContainer>
          <Button
            style={{ width: '100%' }}
            noMarginRight
            noMarginLeft
            buttonType={ButtonType.PRIMARY}
            onClick={() => {
              dispatch(
                updateIsFSOverlayPickerOpen({
                  isFilestackOverlayPickerOpen: true,
                  filestackOverlayPickerUploadAssetType: AssetType.IMAGE,
                }),
              )
            }}
            loading={isUpdating}
            icon={<UploadPicturesIcon />}
          >
            Upload Photos
          </Button>
        </UploadPhotosButtonContainer>
        <StyledMagnifierDropdownContainer
          ref={magnifierRef}
          onMouseEnter={onMagnifierMouseEnter}
          onMouseLeave={onMagnifierMouseLeave}
        >
          <StyledMagnifierButton
            id="magnifier-button"
            buttonType={ButtonType.WHITE}
            disabled={false}
            noMarginRight
            onTouchStartCapture={() => onMobileMagnifierTouchStart()}
            icon={<StyledMagnifierPlusIcon />}
          />
        </StyledMagnifierDropdownContainer>
      </StyledEditorButtonGroupContainerRow>
    )
  }

  const renderSelectingPhotosModeButtons = () => {
    return (
      <StyledEditorButtonGroupContainerRow>
        <Button
          noMarginRight
          buttonType={ButtonType.WHITE}
          onClick={() => {
            if (isSelectingPhoto) {
              if (!hasSelectedAllPhotos) {
                dispatch(updateSelectedPhotos({ selectedPhotos: images }))
              } else {
                dispatch(updateSelectedPhotos({ selectedPhotos: [] }))
              }
            }
          }}
          loading={false}
          disabled={images?.length === 0}
          icon={<ViewGalleryIcon />}
        >
          {hasSelectedAllPhotos ? 'Deselect' : 'Select All'}
        </Button>
        <Button
          buttonType={ButtonType.DANGER}
          onClick={() => {
            dispatch(showModalAction(ModalId.DELETE_SELECTED_PHOTOS))
          }}
          loading={false}
          disabled={images?.length === 0 || selectedPhotos?.length === 0}
          icon={<DeleteIcon />}
        >
          Delete Selected
        </Button>
      </StyledEditorButtonGroupContainerRow>
    )
  }

  if (!account) {
    return null
  }

  return (
    <StyledEditorButtonGroupContainer>
      {isSelectingPhoto &&
        isShowUploadPhotoButton &&
        renderSelectingPhotosModeButtons()}
      {!isSelectingPhoto && renderNonSelectingPhotosModeButtons()}
      <StyledEditorButtonGroupContainerRow>
        {isShowInviteButton && (
          <StyledButton
            $width={'110px'}
            noMarginRight
            noMarginLeft
            buttonType={ButtonType.WHITE}
            onClick={() =>
              dispatch(showModalAction(ModalId.INVITE, { caseId }))
            }
            disabled={isSelectingPhoto}
            loading={isUpdating}
            icon={<AddContributorIcon />}
          >
            Invite
          </StyledButton>
        )}
        <Button
          buttonType={isSelectingPhoto ? ButtonType.PRIMARY : ButtonType.WHITE}
          noMarginRight
          onClick={() => {
            dispatch(
              updateIsSelectingPhotos({
                isSelectingPhoto: !isSelectingPhoto,
              }),
            )
          }}
          loading={false}
          disabled={images?.length === 0}
          icon={<CheckCircleIcon />}
        >
          Select Photos
        </Button>
        {isShowSortButton && (
          <PhotoLibrarySortDropdown
            isDisabled={images?.length === 0 || isSelectingPhoto}
            disableText={true}
          />
        )}
      </StyledEditorButtonGroupContainerRow>
    </StyledEditorButtonGroupContainer>
  )
}

export default MobileEditorSubHeaderButtonGroupPhotoLibrary
