import React from 'react'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'
import { LabelText } from '../Text'

type IRadioGroupProps = React.PropsWithChildren & {
  labelText?: string
  required?: boolean
  className?: string
}

const StyledRadioGroup = styled.div`
  margin: ${STYLE.FIELD_MARGIN};
`

export const RadioGroup = ({
  labelText,
  required,
  children,
  className,
}: IRadioGroupProps) => (
  <StyledRadioGroup className={className}>
    <LabelText required={required}>{labelText}</LabelText>
    {children}
  </StyledRadioGroup>
)
