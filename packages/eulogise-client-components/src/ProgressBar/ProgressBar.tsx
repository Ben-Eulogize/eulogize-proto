import React from 'react'
import styled from 'styled-components'

const StyledProgressBar = styled.div`
  @keyframes progressAnimation {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  height: 2px;
  animation-name: progressAnimation;
  animation-fill-mode: both;
  animation-timing-function: linear;
  background-color: rgba(0, 0, 0, 0.65);
`

interface IProgressBarProps {
  duration: number
  className?: string
}

export const ProgressBar = ({ duration, className }: IProgressBarProps) => (
  <StyledProgressBar
    className={className}
    style={{
      animationDuration: `${duration}ms`,
    }}
  />
)
