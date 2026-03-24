import React from 'react'
import styled from 'styled-components'
import { Spin } from '@eulogise/client-components'
import { STYLE } from '@eulogise/client-core'

const StyledLoadingMessage = styled.div`
  display: flex;
  align-items: center;
`

type ILoadingMessageProps = {
  text?: string
}

const StyledText = styled.div`
  margin-left: ${STYLE.GUTTER};
`

export const LoadingMessage = ({ text = 'Loading' }: ILoadingMessageProps) => (
  <StyledLoadingMessage>
    <Spin />
    <StyledText>{text}</StyledText>
  </StyledLoadingMessage>
)
