import React from 'react'
import styled from 'styled-components'

import { BleedBoxLayout } from './BleedBoxLayout'
import { EulogiseProduct } from '@eulogise/core'

export default {
  title: 'General/BleedBoxLayout',
  component: BleedBoxLayout,
  argTypes: {},
}

const ContentBackground = styled.div`
  background: red;
  width: 100%;
  height: 100%;
`

export const Default = () => (
  <BleedBoxLayout product={EulogiseProduct.BOOKLET}>
    <ContentBackground />
  </BleedBoxLayout>
)

export const Disabled = () => (
  <BleedBoxLayout product={EulogiseProduct.BOOKLET} disabled>
    Test
  </BleedBoxLayout>
)
