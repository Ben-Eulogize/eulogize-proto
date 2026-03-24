import React from 'react'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'
import { Button, ButtonType, Title } from '@eulogise/client-components'
import { ITheme } from '@eulogise/core'

const StyledTitle = styled(Title)`
  text-align: left;
  margin-left: 0;
`

const StyledDeleteThemeConfirmation = styled.div`
  max-width: 100%;
  width: 30rem;
  ${STYLE.TEXT_MEDIUM}
`

const SentenceText = styled.div`
  margin-bottom: ${STYLE.GUTTER};
`
const ActionButtonsContainer = styled.div`
  display: flex;
  margin-top: calc(${STYLE.GUTTER} * 2);
`

type IDeleteThemeConfirmationProps = {
  theme: ITheme
  onClose: () => void
  onDeleteClick: () => void
  isDeleting?: boolean
}

export const DeleteThemeConfirmation = ({
  theme,
  onClose,
  onDeleteClick,
  isDeleting = false,
}: IDeleteThemeConfirmationProps) => {
  const close = () => {
    onClose()
  }

  return (
    <StyledDeleteThemeConfirmation>
      <StyledTitle>Are you sure?</StyledTitle>
      <SentenceText>
        You are about to delete the <b>{theme.name}</b> theme. This action
        cannot be undone.
      </SentenceText>
      <ActionButtonsContainer>
        <Button
          key="cancel"
          buttonType={ButtonType.TRANSPARENT}
          noMarginLeft
          noMarginRight
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          key="apply"
          buttonType={ButtonType.DANGER}
          noMarginRight
          loading={isDeleting}
          onClick={onDeleteClick}
        >
          Delete Theme
        </Button>
      </ActionButtonsContainer>
    </StyledDeleteThemeConfirmation>
  )
}
