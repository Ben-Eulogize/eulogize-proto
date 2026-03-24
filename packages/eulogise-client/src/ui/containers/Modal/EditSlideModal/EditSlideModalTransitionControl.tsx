import React from 'react'
import styled from 'styled-components'

const StyledTransitionControl = styled.div``
const TransitionControlTitle = styled.div`
  margin-top: 0.25rem;
`

export const EditSlideModalTransitionControl = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <StyledTransitionControl>
    <TransitionControlTitle>{label}</TransitionControlTitle>
    {children}
  </StyledTransitionControl>
)
