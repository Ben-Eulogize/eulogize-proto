import React from 'react'
import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'

const StyledBorderFormField = styled.div`
  border: 1px solid ${COLOR.BLACK};
  display: flex;
  padding: 0.5rem;
  align-items: center;
  margin-bottom: ${STYLE.GUTTER};
`

const BorderFieldContent = styled.div``

const BorderFieldContentLabel = styled(BorderFieldContent)`
  width: 3.9rem;
`

type IBorderFormFieldProps = React.PropsWithChildren & { label: string }

export const BorderFormField = ({ label, children }: IBorderFormFieldProps) => (
  <StyledBorderFormField>
    <BorderFieldContentLabel style={{ padding: '5px 5px 5px 0' }}>
      {label}
    </BorderFieldContentLabel>
    <BorderFieldContent>{children}</BorderFieldContent>
  </StyledBorderFormField>
)
