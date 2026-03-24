import React from 'react'
import styled from 'styled-components'
import { useGetNonAdminConnections } from '../../store/hooks'
import { COLOR } from '@eulogise/client-core'

const StyledConnectionCounter = styled.div`
  font-size: 0.65rem;
  line-height: 1.2rem;
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  background-color: ${COLOR.CORE_PURPLE_10};
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
  right: -0.6rem;
  transform: translateY(0.6rem);
`

export const ConnectionCounter = () => {
  const connections = useGetNonAdminConnections()

  if (!connections || connections.length <= 1) {
    return null
  }

  return <StyledConnectionCounter>{connections.length}</StyledConnectionCounter>
}
