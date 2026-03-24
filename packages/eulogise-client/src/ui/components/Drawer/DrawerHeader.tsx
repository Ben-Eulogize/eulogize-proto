import React from 'react'
import styled from 'styled-components'
import { Button, ButtonSize, ButtonType } from '@eulogise/client-components'
import { DrawerTitle } from './DrawerContentContainer'

const StyledHeaderContainer = styled.div`
  width: 100%;
  padding-bottom: 50px;
  position: relative;
`

const StyledHeaderText = styled(DrawerTitle)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const StyledCancelButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

const StyledCancelButton = styled(Button)``

type IDrawerHeaderProps = {
  title?: string
  onCloseClick: () => void
}

export const DrawerHeader = ({ title, onCloseClick }: IDrawerHeaderProps) => {
  return (
    <StyledHeaderContainer>
      {title && <StyledHeaderText>{title}</StyledHeaderText>}
      <StyledCancelButtonContainer>
        <StyledCancelButton
          buttonType={ButtonType.TRANSPARENT}
          buttonSize={ButtonSize.SM}
          onClick={onCloseClick}
          disabled={false}
          noMarginLeft
          noMarginRight
        >
          Cancel
        </StyledCancelButton>
      </StyledCancelButtonContainer>
    </StyledHeaderContainer>
  )
}
