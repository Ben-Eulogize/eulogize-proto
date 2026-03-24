import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

interface IServiceCardDisabledTextProps {
  children: React.ReactNode
}

const ServiceCardDisabledContentText = styled.div``

const StyledServiceCardDisabledText = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const EnquiryLink = styled.a.attrs({
  children: 'Enquiry',
  target: '_blank',
})`
  position: absolute;
  z-index: 100;
  right: 0;
  color: ${COLOR.PRIMARY};
`

const ServiceCardDisabledText: React.FunctionComponent<
  IServiceCardDisabledTextProps
> = ({ children }) => (
  <StyledServiceCardDisabledText>
    <ServiceCardDisabledContentText>{children}</ServiceCardDisabledContentText>
    <EnquiryLink href="mailto:info@eulogizememorials.com?bcc=&subject=Eulogize%20Pro%20enquiry" />
  </StyledServiceCardDisabledText>
)

export default ServiceCardDisabledText
