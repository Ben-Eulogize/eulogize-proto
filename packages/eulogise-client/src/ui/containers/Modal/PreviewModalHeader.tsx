import React from 'react'
import styled from 'styled-components'
import { ClientLogo } from '../../components/icons/ClientLogo'
import { Button, ButtonType } from '@eulogise/client-components'
import { STYLE } from '@eulogise/client-core'

const StyledPreviewModalHeader = styled.div`
  padding-bottom: 1rem;
  position: relative;
  z-index: 11;
  display: flex;
  justify-content: space-between;
`

type IPreviewModalHeaderProps = React.PropsWithChildren & {
  onCloseClick: () => void
  left?: React.ReactNode
  right?: React.ReactNode
  className?: string
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const StyledClientLogo = styled(ClientLogo)`
  margin-right: ${STYLE.GUTTER};
`

export const PreviewModalHeader = ({
  className,
  left,
  right,
  children,
  onCloseClick,
}: IPreviewModalHeaderProps) => (
  <StyledPreviewModalHeader className={className}>
    <StyledClientLogo noMarginLeft={true} />
    <ButtonContainer>
      <div>{left}</div>
      <div>{children}</div>
      <div>
        {right}
        <Button
          noMarginRight
          buttonType={ButtonType.TRANSPARENT}
          onClick={onCloseClick}
        >
          Close
        </Button>
      </div>
    </ButtonContainer>
  </StyledPreviewModalHeader>
)
