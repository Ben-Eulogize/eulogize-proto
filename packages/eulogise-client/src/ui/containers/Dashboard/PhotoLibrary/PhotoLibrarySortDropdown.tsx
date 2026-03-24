import React from 'react'
import styled from 'styled-components'

import { Button, ButtonType } from '@eulogise/client-components'
import { useCaseState, useEulogiseDispatch } from '../../../store/hooks'
import { IAssetState } from '@eulogise/core'
import { useDetectClickOutside } from '@eulogise/client-core'
import { useDropdownHoverClick } from '../../../hooks/useDropdownHoverClick'
import { useBreakpoint } from '@eulogise/client-core'
import { DEVICES } from '@eulogise/client-core'
import { useAssetState } from '../../../store/hooks'
import { EulogiseImageLibrarySortingBy, ICaseState } from '@eulogise/core'
import { AssetHelper } from '@eulogise/helpers'
import {
  updateImagesOrders,
  updateImagesSortBy,
} from '../../../store/AssetState/actions'

interface IPhotoLibrarySortDropdownProps {
  isDisabled: boolean
  disableText: boolean
}

const DesktopTextButton = styled(Button)<{
  $shouldShowSlideshowDropdown: boolean
}>`
  ${({
    $shouldShowSlideshowDropdown,
  }: {
    $shouldShowSlideshowDropdown: boolean
  }) => ($shouldShowSlideshowDropdown ? `width: 100%;` : ``)}
  display: flex;
  align-items: center;
  button.ant-btn[disabled] {
    & > * {
      pointer-events: auto;
      cursor: not-allowed;
    }
  }
`

const StyledSortDropdownContainer = styled.div<{
  $isMobileScreenSize: boolean
}>`
  ${({ $isMobileScreenSize }: { $isMobileScreenSize: boolean }) =>
    $isMobileScreenSize ? `margin-left: 8px;` : ``}
`

const StyledSortButton = styled(DesktopTextButton)<{
  $isMobileScreenSize: boolean
}>`
  display: flex;
  margin-left: auto;
  ${({ $isMobileScreenSize }: { $isMobileScreenSize: boolean }) =>
    $isMobileScreenSize ? `width: 32px;` : `width: 180px;`}
  z-index: 999;
`

const StyledSelectedSortButton = styled(DesktopTextButton)<{
  $isMobileScreenSize: boolean
}>`
  display: flex;
  margin-left: auto;
  ${({ $isMobileScreenSize }: { $isMobileScreenSize: boolean }) =>
    $isMobileScreenSize ? `width: 32px;` : `width: 180px;`}
`

const StyledSortDropdownButtonContainer = styled.div<{
  $isMobileScreenSize: boolean
}>`
  position: absolute;
  z-index: 999;
  ${({ $isMobileScreenSize }: { $isMobileScreenSize: boolean }) =>
    $isMobileScreenSize ? `width: 32px;` : `width: 180px;`}
`

const StyledImgButton = styled.img<{
  $isMobileScreenSize: boolean
}>`
  cursor: pointer;
  width: 22px;
  top: 1px;
  position: relative;
  margin: 0 3px;
  ${({ $isMobileScreenSize }: { $isMobileScreenSize: boolean }) =>
    $isMobileScreenSize ? `left: 1px;` : `right: 6px;`}
`

const StyledImgButtonWhite = styled.img<{
  $isMobileScreenSize: boolean
}>`
  cursor: pointer;
  width: 22px;
  top: 1px;
  position: relative;
  margin: 0 3px;
  color: white;
  ${({ $isMobileScreenSize }: { $isMobileScreenSize: boolean }) =>
    $isMobileScreenSize ? `left: 1px;` : `right: 6px;`}
`

const IMAGE_SORT_ICON_A_TO_Z_SVG_URL = `https://${process.env.GATSBY_AWS_S3_BUCKET}/icons/image-sort-icon-a-to-z.svg`

const IMAGE_SORT_CLOCK_ICON_SVG_URL = `https://${process.env.GATSBY_AWS_S3_BUCKET}/icons/image-sort-icon-clock.svg`

const IMAGE_SORT_CUSTOM_ICON_SVG = `https://${process.env.GATSBY_AWS_S3_BUCKET}/icons/image-sort-icon-custom.svg`

const IMAGE_SORT_RANDOM_ICON_SVG = `https://${process.env.GATSBY_AWS_S3_BUCKET}/icons/image-sort-icon-random.svg`

const SORT_BY_NAME_MAPS: Record<EulogiseImageLibrarySortingBy, string> = {
  [EulogiseImageLibrarySortingBy.UPLOAD_TIME]: 'Upload Order',
  [EulogiseImageLibrarySortingBy.FILE_NAME]: 'Alpha Order',
  [EulogiseImageLibrarySortingBy.CUSTOMISED]: 'Custom Order',
  [EulogiseImageLibrarySortingBy.RANDOM]: 'Random Order',
}

const getSortIconByImageSortBy = (
  imagesSortedBy: EulogiseImageLibrarySortingBy,
) => {
  if (imagesSortedBy === EulogiseImageLibrarySortingBy.CUSTOMISED) {
    return IMAGE_SORT_CUSTOM_ICON_SVG
  } else if (imagesSortedBy === EulogiseImageLibrarySortingBy.FILE_NAME) {
    return IMAGE_SORT_ICON_A_TO_Z_SVG_URL
  } else if (imagesSortedBy === EulogiseImageLibrarySortingBy.UPLOAD_TIME) {
    return IMAGE_SORT_CLOCK_ICON_SVG_URL
  } else if (imagesSortedBy === EulogiseImageLibrarySortingBy.RANDOM) {
    return IMAGE_SORT_RANDOM_ICON_SVG
  }
  return ''
}

const PhotoLibrarySortDropdown: React.FC<IPhotoLibrarySortDropdownProps> = ({
  isDisabled = false,
  disableText = false,
}: {
  isDisabled: boolean
  disableText: boolean
}) => {
  const dispatch = useEulogiseDispatch()
  const caseState: ICaseState = useCaseState()
  const { images = [], sortBy: imagesSortedBy }: IAssetState = useAssetState()

  const screenSize = useBreakpoint()
  const customisedImagesOrderIds: Array<string> =
    caseState?.activeItem?.customisedImagesOrderIds ?? []

  const isMobileScreenSize = screenSize === DEVICES.MOBILE

  const {
    hovered: sortHoverClicked,
    clicked: sortClicked,
    onMouseClick: onSortClick,
    onMouseEnter: onSortEnter,
    onMouseLeave: onSortLeave,
    onReset: onSortReset,
  } = useDropdownHoverClick({})

  const sortRef = useDetectClickOutside({
    onTriggered: () => onSortReset(),
  })

  const shouldSortDropdownOpened =
    (sortHoverClicked || sortClicked) && !isDisabled

  const shouldShowSortCustomButton: boolean =
    images?.length > 0 && customisedImagesOrderIds?.length > 0

  const getSortImages = (newSortBy: EulogiseImageLibrarySortingBy) => {
    if (!newSortBy) {
      return
    } else if (newSortBy === EulogiseImageLibrarySortingBy.UPLOAD_TIME) {
      dispatch(
        updateImagesOrders({
          newOrderImages: AssetHelper.sortImagesByUpdatedAt(images!),
          complete: () => {
            dispatch(
              updateImagesSortBy({
                sortBy: EulogiseImageLibrarySortingBy.UPLOAD_TIME,
              }),
            )
          },
        }),
      )
      return
    } else if (newSortBy === EulogiseImageLibrarySortingBy.FILE_NAME) {
      dispatch(
        updateImagesOrders({
          newOrderImages: AssetHelper.sortImagesByFileName(images!),
          complete: () => {
            dispatch(
              updateImagesSortBy({
                sortBy: EulogiseImageLibrarySortingBy.FILE_NAME,
              }),
            )
          },
        }),
      )

      return
    } else if (newSortBy === EulogiseImageLibrarySortingBy.CUSTOMISED) {
      const customisedOrderImages =
        AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images!,
          customisedImagesOrderIds,
        )
      dispatch(
        updateImagesOrders({
          newOrderImages: customisedOrderImages,
          complete: () => {
            dispatch(
              updateImagesSortBy({
                sortBy: EulogiseImageLibrarySortingBy.CUSTOMISED,
              }),
            )
          },
        }),
      )
      return
    } else if (newSortBy === EulogiseImageLibrarySortingBy.RANDOM) {
      const newShuffedImagesOrderImages = AssetHelper.sortImagesByRandom(
        images!,
      )
      dispatch(
        updateImagesOrders({
          newOrderImages: newShuffedImagesOrderImages,
          complete: () => {
            dispatch(
              updateImagesSortBy({
                sortBy: EulogiseImageLibrarySortingBy.RANDOM,
              }),
            )
          },
        }),
      )
      return
    }
  }

  return (
    <StyledSortDropdownContainer
      $isMobileScreenSize={isMobileScreenSize}
      ref={sortRef}
      onMouseEnter={onSortEnter}
      onMouseLeave={onSortLeave}
    >
      <StyledSelectedSortButton
        $isMobileScreenSize={isMobileScreenSize}
        id="current-sort-button"
        buttonType={ButtonType.WHITE}
        disabled={isDisabled}
        noMarginLeft
        noMarginRight
        onClick={() => {
          if (!isMobileScreenSize) {
            onSortClick()
          }
        }}
        onTouchStart={() => {
          if (isMobileScreenSize) {
            onSortClick()
          }
        }}
        icon={
          <StyledImgButtonWhite
            $isMobileScreenSize={isMobileScreenSize}
            src={getSortIconByImageSortBy(imagesSortedBy)}
          />
        }
      >
        {disableText ? '' : SORT_BY_NAME_MAPS[imagesSortedBy]}
      </StyledSelectedSortButton>
      {shouldSortDropdownOpened && (
        <StyledSortDropdownButtonContainer
          $isMobileScreenSize={isMobileScreenSize}
        >
          {imagesSortedBy !== EulogiseImageLibrarySortingBy.UPLOAD_TIME && (
            <StyledSortButton
              $isMobileScreenSize={isMobileScreenSize}
              id="sort-by-upload"
              buttonType={ButtonType.WHITE}
              disabled={false}
              noMarginLeft
              noMarginRight
              onClick={() => {
                if (!isMobileScreenSize) {
                  getSortImages(EulogiseImageLibrarySortingBy.UPLOAD_TIME)
                  onSortClick()
                }
              }}
              onTouchStart={() => {
                if (isMobileScreenSize) {
                  getSortImages(EulogiseImageLibrarySortingBy.UPLOAD_TIME)
                  onSortClick()
                }
              }}
              icon={
                <StyledImgButton
                  $isMobileScreenSize={isMobileScreenSize}
                  src={IMAGE_SORT_CLOCK_ICON_SVG_URL}
                />
              }
            >
              {disableText ? '' : 'Upload Order'}
            </StyledSortButton>
          )}
          {imagesSortedBy !== EulogiseImageLibrarySortingBy.FILE_NAME && (
            <StyledSortButton
              $isMobileScreenSize={isMobileScreenSize}
              id="sort-by-alphabetical"
              buttonType={ButtonType.WHITE}
              disabled={false}
              noMarginLeft
              noMarginRight
              onClick={() => {
                if (!isMobileScreenSize) {
                  getSortImages(EulogiseImageLibrarySortingBy.FILE_NAME)
                  onSortClick()
                }
              }}
              onTouchStart={() => {
                if (isMobileScreenSize) {
                  getSortImages(EulogiseImageLibrarySortingBy.FILE_NAME)
                  onSortClick()
                }
              }}
              icon={
                <StyledImgButton
                  $isMobileScreenSize={isMobileScreenSize}
                  src={IMAGE_SORT_ICON_A_TO_Z_SVG_URL}
                />
              }
            >
              {disableText ? '' : 'Alpha Order'}
            </StyledSortButton>
          )}
          {
            <StyledSortButton
              $isMobileScreenSize={isMobileScreenSize}
              id="sort-by-random"
              buttonType={ButtonType.WHITE}
              disabled={false}
              noMarginLeft
              noMarginRight
              onClick={() => {
                if (!isMobileScreenSize) {
                  getSortImages(EulogiseImageLibrarySortingBy.RANDOM)
                  onSortClick()
                }
              }}
              onTouchStart={() => {
                if (isMobileScreenSize) {
                  getSortImages(EulogiseImageLibrarySortingBy.RANDOM)
                  onSortClick()
                }
              }}
              icon={
                <StyledImgButton
                  $isMobileScreenSize={isMobileScreenSize}
                  src={IMAGE_SORT_RANDOM_ICON_SVG}
                />
              }
            >
              {disableText
                ? ''
                : imagesSortedBy === EulogiseImageLibrarySortingBy.RANDOM
                ? 'Shuffle Again'
                : 'Random Order'}
            </StyledSortButton>
          }
          {shouldShowSortCustomButton &&
            imagesSortedBy !== EulogiseImageLibrarySortingBy.CUSTOMISED && (
              <StyledSortButton
                $isMobileScreenSize={isMobileScreenSize}
                id="sort-button-customised"
                buttonType={ButtonType.WHITE}
                disabled={
                  !customisedImagesOrderIds ||
                  customisedImagesOrderIds?.length === 0
                }
                noMarginLeft
                noMarginRight
                onClick={() => {
                  if (!isMobileScreenSize) {
                    getSortImages(EulogiseImageLibrarySortingBy.CUSTOMISED)
                    onSortClick()
                  }
                }}
                onTouchStart={() => {
                  if (isMobileScreenSize) {
                    getSortImages(EulogiseImageLibrarySortingBy.CUSTOMISED)
                    onSortClick()
                  }
                }}
                icon={
                  <StyledImgButton
                    $isMobileScreenSize={isMobileScreenSize}
                    src={IMAGE_SORT_CUSTOM_ICON_SVG}
                  />
                }
              >
                {disableText ? '' : 'Custom Order'}
              </StyledSortButton>
            )}
        </StyledSortDropdownButtonContainer>
      )}
    </StyledSortDropdownContainer>
  )
}

export default PhotoLibrarySortDropdown
