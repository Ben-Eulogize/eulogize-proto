import React, { useState } from 'react'
import styled from 'styled-components'
import {
  HeaderTextLG,
  TextField,
  Button,
  FormHelper,
  Notification,
  UpdatePasswordFormRules,
} from '@eulogise/client-components'
import { updatePersonalDetailById } from '../../../store/AuthState/actions'
import { useEulogiseDispatch } from '../../../store/hooks'
import { IUpdatePasswordFields } from '@eulogise/core'

import { STYLE } from '@eulogise/client-core'
interface IUpdatePasswordFormProps {
  account: { id: string; fullName: string; email: string }
  onUpdated: () => void
}

const StyledUpdatePasswordForm = styled.form`
  margin: 2rem 0;
`

const UpdatePasswordForm: React.FC<IUpdatePasswordFormProps> = ({
  account,
  onUpdated,
}) => {
  const dispatch = useEulogiseDispatch()
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const userId: string = account?.id

  const [fields, setFields] = useState<IUpdatePasswordFields>({
    password: '',
  })

  const updateFields = (newFields: any) => {
    setFields({ ...fields, ...newFields })
  }
  const { isValid } = FormHelper.validateUpdatePasswordForm(fields)

  if (!userId) {
    console.log('userId is not defined')
    return null
  }

  return (
    <StyledUpdatePasswordForm
      onSubmit={(ev) => {
        ev.preventDefault()
        setIsUpdating(true)
        if (isValid) {
          dispatch(
            updatePersonalDetailById({
              userId,
              personalDetailsFields: {
                ...fields,
                email: account?.email,
                fullName: account?.fullName,
              },
              success: () => {
                Notification.success('Password is updated')
                onUpdated()
                setIsUpdating(false)
              },
              failed: () => {
                setIsUpdating(false)
              },
            }),
          )
        }
      }}
    >
      <HeaderTextLG>Update Password</HeaderTextLG>
      <TextField
        labelText="Password"
        placeholder="password"
        rules={UpdatePasswordFormRules.password}
        type="password"
        value={fields.password}
        onChange={(ev) => {
          updateFields({
            password: ev.target.value,
          })
        }}
        marginBottom={STYLE.FIELD_MARGIN_BOTTOM}
      />
      <Button
        loading={isUpdating}
        disabled={!isValid}
        noMarginLeft
        htmlType="submit"
      >
        Update password
      </Button>
    </StyledUpdatePasswordForm>
  )
}

export default UpdatePasswordForm
