import React from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonSize,
  ButtonType,
  ClickableIcon,
  UploadIcon,
} from '@eulogise/client-components'
import { useAssetState, useEulogiseDispatch } from '../../store/hooks'
import { GUIDE_SHOW_UP_PAGE, IAssetState, AssetType } from '@eulogise/core'
import { GuidePopover } from '../../components/GuidePopover/GuidePopover'
import { updateIsFSOverlayPickerOpen } from '../../store/AssetState/actions'

interface IUploadImageButtonProps {
  className?: string
  isImageOnly?: boolean
  onClick?: () => void
  buttonSize?: ButtonSize
}

const StyledUploadImageButtonContainer = styled.div``

const StyledUploadImageButton = styled(Button)`
  width: 100%;
  margin-left: 0;
  margin-right: 0;
`

const StyledUploadIcon = styled(UploadIcon)`
  font-size: 1.4rem;
`

const UploadImageButton: React.FC<IUploadImageButtonProps> = ({
  className,
  isImageOnly,
  onClick,
  buttonSize,
}) => {
  const dispatch = useEulogiseDispatch()

  const { isUploadingEditedImage }: IAssetState = useAssetState()

  const openUploadDrawer = () => {
    if (onClick) {
      onClick()
    }
    dispatch(
      updateIsFSOverlayPickerOpen({
        isFilestackOverlayPickerOpen: true,
        filestackOverlayPickerUploadAssetType: AssetType.IMAGE,
      }),
    )
  }

  if (isImageOnly) {
    return (
      <ClickableIcon onClick={openUploadDrawer} tooltip="Upload Images">
        <StyledUploadIcon />
      </ClickableIcon>
    )
  }

  return (
    <StyledUploadImageButtonContainer>
      <StyledUploadImageButton
        icon={<UploadIcon />}
        className={className}
        onClick={openUploadDrawer}
        buttonSize={buttonSize}
        buttonType={ButtonType.PRIMARY}
        disabled={isUploadingEditedImage}
      >
        Upload Images
      </StyledUploadImageButton>
      <GuidePopover
        placedPage={GUIDE_SHOW_UP_PAGE.SLIDESHOW}
        showUpStepIndex={0}
        width={430}
      />
    </StyledUploadImageButtonContainer>
  )
}

export default UploadImageButton
