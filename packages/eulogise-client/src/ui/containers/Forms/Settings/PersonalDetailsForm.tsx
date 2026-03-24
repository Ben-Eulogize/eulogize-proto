import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  HeaderTextLG,
  TextField,
  FieldRules,
  Notification,
  FormHelper,
  CopyAssetIcon,
  Tooltip,
} from '@eulogise/client-components'
import { useCaseState, useEulogiseDispatch } from '../../../store/hooks'
import {
  checkAccount,
  updatePersonalDetailById,
} from '../../../store/AuthState/actions'
import { fetchCaseById } from '../../../store/CaseState/actions'
import {
  IPersonalDetailFields,
  NO_REPLY_EULOGISE_EMAIL,
  ICaseState,
  EulogiseCountry,
} from '@eulogise/core'

import { STYLE } from '@eulogise/client-core'
interface IPersonalDetailsFormProps {
  account: { id: string; fullName: string; email: string }
  isUpdateCase: boolean
}

const StyledPersonalDetailsForm = styled.form``

const PersonalDetailsForm: React.FC<IPersonalDetailsFormProps> = ({
  account,
  isUpdateCase = false,
}) => {
  const dispatch = useEulogiseDispatch()
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId = activeCase?.id
  const [copied, setCopied] = useState(false)

  const [fields, setFields] = useState<IPersonalDetailFields>({
    fullName: account?.fullName,
    email: account?.email,
  })
  const userId: string = account?.id

  const updateFields = (newFields: any) => {
    setFields({ ...fields, ...newFields })
  }
  const { isValid } = FormHelper.validatePersonalDetailsForm(fields)

  const country = activeCase?.country ?? EulogiseCountry.AUSTRALIA

  return (
    <StyledPersonalDetailsForm
      onSubmit={(ev) => {
        ev.preventDefault()
        setIsUpdating(true)
        if (isValid) {
          dispatch(
            updatePersonalDetailById({
              userId,
              personalDetailsFields: fields,
              success: () => {
                Notification.success('Personal details is updated')
                setIsUpdating(false)

                // if updated by the account owner
                dispatch(checkAccount())
                if (isUpdateCase) {
                  // if updated by client admin
                  dispatch(
                    fetchCaseById({
                      caseId,
                    }),
                  )
                }
              },
              failed: () => {
                setIsUpdating(false)
              },
            }),
          )
        }
      }}
    >
      <HeaderTextLG>Personal Details</HeaderTextLG>
      <TextField
        labelText="Customer Name"
        placeholder="Full name"
        value={fields.fullName}
        rules={[FieldRules.required]}
        onChange={(ev) => {
          updateFields({ fullName: ev.target.value })
        }}
        marginBottom={STYLE.FIELD_MARGIN_BOTTOM}
      />
      <TextField
        labelText="Email"
        disabled
        value={fields.email === NO_REPLY_EULOGISE_EMAIL ? '' : fields.email}
        autoCapitalize="none"
        marginBottom={STYLE.FIELD_MARGIN_BOTTOM}
      />
      <TextField
        labelText="Country"
        disabled
        value={country}
        autoCapitalize="none"
        marginBottom={STYLE.FIELD_MARGIN_BOTTOM}
      />
      {caseId && (
        <TextField
          labelText="Case Id"
          disabled
          value={caseId}
          marginBottom={STYLE.FIELD_MARGIN_BOTTOM}
          suffix={
            <Tooltip title={copied ? 'Copied' : 'Copy'}>
              <CopyAssetIcon
                onClick={() => {
                  navigator.clipboard.writeText(caseId)
                  setCopied(true)
                }}
              />
            </Tooltip>
          }
        />
      )}
      <Button
        noMarginLeft
        loading={isUpdating}
        disabled={!fields?.fullName?.trim()}
        htmlType="submit"
      >
        Save
      </Button>
    </StyledPersonalDetailsForm>
  )
}

export default PersonalDetailsForm
