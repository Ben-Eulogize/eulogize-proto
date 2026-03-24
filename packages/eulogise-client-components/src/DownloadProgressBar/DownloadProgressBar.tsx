import React from 'react'
import styled from 'styled-components'
import { Progress } from 'antd'
import { ProgressSize } from 'antd/lib/progress/progress'
import { COLOR } from '@eulogise/client-core'

interface DownloadProgressBarProps {
  percent: number
  width?: number
  status?: 'normal' | 'exception' | 'active' | 'success'
  strokeColor?: any
  size?: ProgressSize
  padding?: string
  className?: string
}

const StyledDownloadProgressBar = styled.div``

export const DownloadProgressBar = ({
  percent,
  width,
  status = 'normal',
  strokeColor = {
    '0%': COLOR.CORE_PURPLE_10,
    '100%': COLOR.CORE_PURPLE,
  },
  size = 'default',
  padding = 'auto',
  className,
}: DownloadProgressBarProps): JSX.Element => {
  return (
    <StyledDownloadProgressBar className={className} style={{ width, padding }}>
      <Progress
        percent={percent}
        size={size}
        status={status}
        strokeColor={strokeColor}
      />
    </StyledDownloadProgressBar>
  )
}
