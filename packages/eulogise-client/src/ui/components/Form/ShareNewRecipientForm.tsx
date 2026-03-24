import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  TextField,
  NewRecipientFormRules,
  ValidationMessage,
} from '@eulogise/client-components'
import { STYLE } from '@eulogise/client-core'
import { IShareRecipient } from '@eulogise/core'

const StyledShareNewRecipientForm = styled.form`
  padding: 0 ${STYLE.GUTTER} ${STYLE.GUTTER};
`

type NewRecipientForm = {
  fullName: string
  email: string
}

const StyledButton = styled(Button)`
  margin: ${STYLE.HALF_GUTTER} 0;
`

const StyledTextField = styled(TextField)`
  margin: ${STYLE.HALF_GUTTER} 0;
`

type IShareNewRecipientFormProps = {
  recipients: Array<IShareRecipient>
  onSubmit: (data: NewRecipientForm) => void
}

export const ShareNewRecipientForm = ({
  recipients,
  onSubmit,
}: IShareNewRecipientFormProps) => {
  const [validationMessage, setValidationMessage] = useState<string>()
  const [fields, setFields] = useState<NewRecipientForm>({
    fullName: '',
    email: '',
  })
  const updateFields = (f: Partial<NewRecipientForm>) => {
    setFields({
      ...fields,
      ...f,
    })
  }
  return (
    <StyledShareNewRecipientForm
      onSubmit={(ev) => {
        ev.preventDefault()
        const isExists = recipients.find((r) => r.email === fields.email)
        if (isExists) {
          setValidationMessage('Recipient already exists')
          return
        }
        onSubmit(fields)
      }}
    >
      {validationMessage && (
        <ValidationMessage>{validationMessage}</ValidationMessage>
      )}
      <TextField
        labelText="Name"
        placeholder="Name"
        value={fields.fullName}
        rules={NewRecipientFormRules.fullName}
        onChange={(ev: any) => {
          updateFields({ fullName: ev.target.value })
        }}
        required
      />
      <StyledTextField
        labelText="Email"
        placeholder="Email"
        value={fields.email}
        rules={NewRecipientFormRules.email}
        onChange={(ev: any) => {
          updateFields({ email: ev.target.value })
        }}
        required
      />
      <StyledButton noMarginLeft htmlType="submit">
        Save to sending list
      </StyledButton>
    </StyledShareNewRecipientForm>
  )
}
