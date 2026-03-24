import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

interface IContentProps {
  children: React.ReactNode
  className?: string
  noPadding?: boolean
  padding?: string
}

const StyledContent = styled(Layout.Content)<{
  $noPadding?: boolean
  $padding?: string
}>`
  min-height: 50vh;
  background-color: ${COLOR.WHITE};
  overflow: auto; // this overflow is to prevent the Editor (Photobook) keep on resizing when changing an image from the frame
  && {
    ${({ $noPadding }) =>
      $noPadding
        ? ` padding: 0 0 0 0;`
        : `
    padding: 0.75rem 0.75rem 3rem 0.75rem;`}

    ${({ $padding }) => $padding && `padding: ${$padding};`}
  }
`

const Content: React.FunctionComponent<IContentProps> = ({
  children,
  className,
  noPadding,
  padding,
}) => (
  <StyledContent
    $noPadding={noPadding}
    $padding={padding}
    className={className}
  >
    {children}
  </StyledContent>
)

export default Content
