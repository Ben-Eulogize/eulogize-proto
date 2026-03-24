import React from 'react'
import styled from 'styled-components'
import { Text } from '@eulogise/client-components'
import { COLOR } from '@eulogise/client-core'
import { useCaseState, useEulogiseDispatch } from '../../../store/hooks'
import { ICaseState, AssetType } from '@eulogise/core'
import { updateIsFSOverlayPickerOpen } from '../../../store/AssetState/actions'

const StyledUploadPhotoSupportIconListItem = styled.div`
  display: flex;
  width: 8rem;
  padding: 1rem 0 1rem 0;
  align-items: normal;
  background-color: ${COLOR.WHITE};
  flex-direction: column;
  text-align: center;
  cursor: pointer;
`

const IconContainer = styled.div`
  text-align: center;
`

const Icon = styled.div`
  background-color: ${COLOR.LITE_GREY};
  padding: 0.75rem;
  display: inline-block;
  border-radius: 5rem;
`

const StyledText = styled(Text)`
  white-space: nowrap;
  font-size: 1rem;
  padding: 1rem;
`

const UploadPhotoSupportIconListItem = ({ text, icon }) => {
  const dispatch = useEulogiseDispatch()
  return (
    <StyledUploadPhotoSupportIconListItem
      onClick={() => {
        dispatch(
          updateIsFSOverlayPickerOpen({
            isFilestackOverlayPickerOpen: true,
            filestackOverlayPickerUploadAssetType: AssetType.IMAGE,
          }),
        )
      }}
    >
      <IconContainer>
        <Icon>{icon}</Icon>
      </IconContainer>
      <StyledText>{text}</StyledText>
    </StyledUploadPhotoSupportIconListItem>
  )
}

export default UploadPhotoSupportIconListItem
