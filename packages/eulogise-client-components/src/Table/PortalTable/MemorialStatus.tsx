import React from 'react'
import styled from 'styled-components'
import { MemorialVisualStatus, MemorialVisualStatusProps } from '@eulogise/core'

type IMemorialStatusProps = {
  status: MemorialVisualStatus
}

const StyledMemorialStatus = styled.div<{ color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: ${({ color }) => color};
`

export const MemorialStatus = ({ status }: IMemorialStatusProps) => {
  const color = MemorialVisualStatusProps[status].color
  return <StyledMemorialStatus color={color} />
}
