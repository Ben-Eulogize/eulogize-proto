import React, { useState } from 'react'
import styled from 'styled-components'
import {
  EulogiseUserRole,
  EulogiseProduct,
  ICaseState,
  IInviteState,
} from '@eulogise/core'
import {
  Button,
  TextField,
  ShareViaEmailFormRules,
  FormContext,
  FormHelper,
  IShareViaEmailFields,
} from '@eulogise/client-components'
import {
  useCaseState,
  useEulogiseDispatch,
  useInviteState,
} from '../../../store/hooks'
import { shareWithContact } from '../../../store/InviteState/actions'
import { CardProductHelper } from '@eulogise/helpers'
import { STYLE } from '@eulogise/client-core'

interface IShareViaEmailFormProps {
  product: EulogiseProduct
}

const StyledShareViaEmailForm = styled.form``

const ShareViaEmailForm: React.FC<IShareViaEmailFormProps> = ({ product }) => {
  const dispatch = useEulogiseDispatch()
  const {
    activeItem: { id: caseId },
  }: ICaseState = useCaseState()
  const { isSharing }: IInviteState = useInviteState()
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false)
  const initialFieldValues = {
    name: '',
    email: '',
  }
  const [fields, setFields] = useState<IShareViaEmailFields>(initialFieldValues)
  const shareToUserRole: EulogiseUserRole =
    CardProductHelper.getShareLinkUserRole(product)

  const updateFields = (newFields: any) => {
    setFields({ ...fields, ...newFields })
  }
  return (
    <FormContext.Provider value={{ isFormDirty }}>
      <StyledShareViaEmailForm
        onSubmit={(ev) => {
          ev.preventDefault()
          setIsFormDirty(true)
          const { isValid } = FormHelper.validateShareViaEmailForm(fields)

          if (isValid) {
            dispatch(
              shareWithContact({
                caseId,
                inviteRole: shareToUserRole,
                userData: {
                  email: fields.email,
                  fullName: fields.name,
                },
                success: () => {
                  setIsFormDirty(false)
                  setFields(initialFieldValues)
                },
              }),
            )
          }
        }}
      >
        <TextField
          labelText="Name"
          placeholder="Name"
          rules={ShareViaEmailFormRules.name}
          value={fields.name}
          onChange={(ev, value: string) => updateFields({ name: value })}
          marginBottom={STYLE.FIELD_MARGIN_BOTTOM}
        />
        <TextField
          labelText="Email"
          placeholder="Email"
          autoCapitalize="none"
          rules={ShareViaEmailFormRules.email}
          value={fields.email}
          onChange={(ev, value: string) => updateFields({ email: value })}
          marginBottom={STYLE.FIELD_MARGIN_BOTTOM}
        />
        <Button noMarginLeft htmlType="submit" loading={isSharing}>
          Send
        </Button>
      </StyledShareViaEmailForm>
    </FormContext.Provider>
  )
}

export default ShareViaEmailForm
