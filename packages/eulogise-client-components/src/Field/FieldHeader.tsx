import React from 'react'
import styled from 'styled-components'
import { HintText, LabelText } from '../Text'
import { FieldValidationMessage } from './FieldValidationMessage'
import { useContext } from 'react'
import { FormContext } from '../context'

interface IFieldHeaderProps {
  required: boolean
  labelText?: string
  labelTextColor?: string
  isDirty: boolean
  validationMessage?: string
  hintText?: string
}

const StyledFieldHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const MessageContainer = styled.div``

export const FieldHeader: React.FunctionComponent<IFieldHeaderProps> = ({
  required,
  validationMessage,
  labelText,
  labelTextColor,
  isDirty,
  hintText,
}) => {
  const { isFormDirty } = useContext(FormContext)
  return (
    <StyledFieldHeader>
      {labelText && (
        <LabelText textColor={labelTextColor} required={required}>
          {labelText}
        </LabelText>
      )}
      <MessageContainer>
        {(isDirty || isFormDirty) && validationMessage && (
          <FieldValidationMessage>{validationMessage}</FieldValidationMessage>
        )}
        {hintText && <HintText>{hintText}</HintText>}
      </MessageContainer>
    </StyledFieldHeader>
  )
}
