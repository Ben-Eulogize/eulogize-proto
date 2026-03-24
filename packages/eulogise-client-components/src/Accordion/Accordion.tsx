import React from 'react'
import Collapse from 'antd/lib/collapse'
import styled from 'styled-components'

// @ts-ignore
const StyledCollapse = styled(Collapse)``

export const Accordion = ({ children }: React.PropsWithChildren) => (
  <StyledCollapse accordion>{children}</StyledCollapse>
)

Accordion.Panel = Collapse.Panel
