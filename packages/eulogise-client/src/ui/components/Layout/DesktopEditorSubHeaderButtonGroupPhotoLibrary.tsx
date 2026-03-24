import React from 'react'
import styled from 'styled-components'
import {
  AddContributorIcon,
  AlertRight,
  Button,
  ButtonType,
  CheckCircleIcon,
  DeleteIcon,
  MagnifierPlusIcon,
  QRCodeIcon,
  UploadPicturesIcon,
  ViewGalleryIcon,
} from '@eulogise/client-components'
import {
  useAssetState,
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useProductState,
  useSlideshowState,
} from '../../store/hooks'
import {
  AssetType,
  EulogisePage,
  EulogiseProduct,
  IAssetState,
  IAuthState,
  ICaseState,
  ISlideshowState,
  ModalId,
} from '@eulogise/core'
import { showModalAction } from '../../store/ModalState/actions'
import {
  CardProductHelper,
  SlideshowHelper,
  UrlHelper,
} from '@eulogise/helpers'
import { updateTimelineThumbnailsDisplayedAmount } from '../../store/SlideshowState/actions'
import { useDetectClickOutside } from '@eulogise/client-core'
import { useDropdownHoverClick } from '../../hooks/useDropdownHoverClick'
import TimelineMagnifierSlider from '../../containers/SlideshowTimeline/TimelineMagnifierSlider'
import PhotoLibrarySortDropdown from '../../containers/Dashboard/PhotoLibrary/PhotoLibrarySortDropdown'
import {
  Alert,
  AlertFull,
  AlertLeft,
} from '@eulogise/client-components/src/Alert'
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

const StyledMagnifierDropdownContainer = styled.div`
  float: right;
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

const StyledMagnifierDropdownButtonContainer = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
`

const StyledTimelineMagnifierSlider = styled(TimelineMagnifierSlider)``

interface IEditorHeaderButtonGroupSlideshow {
  location: Location
  isShowSortButton: boolean
  isShowInviteButton: boolean
  isShowUploadPhotoButton: boolean
  isShowMobileUploadButton?: boolean
}

const StyledAlert = styled(Alert)<{ $isFilestackOverlayPickerOpen: boolean }>`
  margin-bottom: 0;
  margin-top: 0;
`

const StyledAlertFull = styled(AlertFull)`
  display: flex;
  padding: 0 16px;
`

const DesktopEditorSubHeaderButtonGroupPhotoLibrary = ({
  location,
  isShowSortButton,
  isShowInviteButton,
  isShowUploadPhotoButton,
  isShowMobileUploadButton = true,
}: IEditorHeaderButtonGroupSlideshow) => {
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId: string = activeCase?.id!

  const product = CardProductHelper.getAtWhichProductEditorPage({ location })
  const slug = CardProductHelper.getGenericCardProductSlugByLocation({
    product,
    location,
  })

  const { isUpdating } = useProductState({ product, slug })

  const {
    images = [],
    isSelectingPhoto,
    selectedPhotos = [],
  }: IAssetState = useAssetState()

  const { timelineThumbnailsDisplayedAmount = 0 }: ISlideshowState =
    useSlideshowState()

  const hasSelectedAllPhotos: boolean = images.every((img) =>
    selectedPhotos?.includes(img),
  )

  const {
    hovered: magnifierHovered,
    clicked: magnifierClicked,
    onMouseClick: onMagnifierMouseClick,
    onMouseEnter: onMagnifierMouseEnter,
    onMouseLeave: onMagnifierMouseLeave,
    onReset: onMagnifierMouseReset,
  } = useDropdownHoverClick({
    onDoubleClickedAction: () => {
      if (timelineThumbnailsDisplayedAmount! < 8) {
        const updatedThumbnailsAmount = timelineThumbnailsDisplayedAmount! + 2
        dispatch(
          updateTimelineThumbnailsDisplayedAmount(updatedThumbnailsAmount),
        )
      }
    },
  })

  const magnifierRef = useDetectClickOutside({
    onTriggered: () => onMagnifierMouseReset(),
  })

  const onMagnifierSliderChange = (thumbnailSliderPercentage: number) => {
    const updatedThumbnailsAmount =
      SlideshowHelper.getTimelineDisplayedThumbnailsAmountByMagnifierPercentage(
        thumbnailSliderPercentage,
        false,
      )
    dispatch(updateTimelineThumbnailsDisplayedAmount(updatedThumbnailsAmount))
  }

  const shouldMagnifierDropdownOpened = magnifierHovered || magnifierClicked

  if (!account) {
    return null
  }

  return (
    <StyledAlert flex noBorderRightRadius padding={'16px'}>
      <StyledAlertFull>
        <AlertLeft>
          {!isSelectingPhoto && isShowUploadPhotoButton && (
            <Button
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
          )}
          {!isSelectingPhoto && isShowMobileUploadButton && (
            <Button
              noMarginLeft
              buttonType={ButtonType.WHITE}
              onClick={() =>
                dispatch(showModalAction(ModalId.MOBILE_UPLOAD_QR_CODE))
              }
              loading={isUpdating}
              icon={<QRCodeIcon />}
            >
              Mobile Upload
            </Button>
          )}
          {!isSelectingPhoto && isShowInviteButton && (
            <Button
              noMarginLeft
              buttonType={ButtonType.WHITE}
              onClick={() =>
                dispatch(showModalAction(ModalId.INVITE, { caseId }))
              }
              loading={isUpdating}
              icon={<AddContributorIcon />}
            >
              Invite others to Add Photos
            </Button>
          )}
          {!isSelectingPhoto && isShowSortButton && (
            <PhotoLibrarySortDropdown
              isDisabled={images?.length === 0 || isSelectingPhoto}
              disableText={false}
            />
          )}
          <Button
            buttonType={
              isSelectingPhoto ? ButtonType.PRIMARY : ButtonType.WHITE
            }
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
        </AlertLeft>
        <AlertRight>
          {isSelectingPhoto && (
            <>
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
            </>
          )}

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
              onClick={() => onMagnifierMouseClick()}
              icon={<StyledMagnifierPlusIcon />}
            >
              Zoom
            </StyledMagnifierButton>
            {shouldMagnifierDropdownOpened && (
              <StyledMagnifierDropdownButtonContainer>
                <StyledTimelineMagnifierSlider
                  isMobileScreenSize={false}
                  onChange={onMagnifierSliderChange}
                  value={SlideshowHelper.getTimelineMagnifierPercentageByDisplayedThumbnailsAmount(
                    timelineThumbnailsDisplayedAmount,
                    false,
                  )}
                />
              </StyledMagnifierDropdownButtonContainer>
            )}
          </StyledMagnifierDropdownContainer>
        </AlertRight>
      </StyledAlertFull>
    </StyledAlert>
  )
}

export default DesktopEditorSubHeaderButtonGroupPhotoLibrary
