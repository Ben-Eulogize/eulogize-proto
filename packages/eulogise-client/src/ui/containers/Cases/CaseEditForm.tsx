import React, { useState } from 'react'
import { Moment } from 'moment'
import styled from 'styled-components'
import {
  FormHelper,
  Button,
  TextField,
  CaseEditFormRules,
  DateField,
  TimePicker,
  DISABLED_DATE_BEFORE_TODAY,
} from '@eulogise/client-components'
import { useCaseState, useEulogiseDispatch } from '../../store/hooks'
import { updateCaseById } from '../../store/CaseState/actions'
import {
  ICase,
  ICaseEditFields,
  ICaseState,
  SERVICE_START_TIME_PICKER_FORMAT,
  SERVICE_START_TIME_PICKER_LABEL_TEXT,
} from '@eulogise/core'
import moment from 'moment'
import { CaseHelper } from '@eulogise/helpers'
interface ICaseEditFormProps {
  currentCase: ICase
}

const StyledCaseEditForm = styled.form``

const StyledUpdateCaseButton = styled(Button)`
  margin: 20px;
`

const CaseEditForm: React.FC<ICaseEditFormProps> = ({ currentCase }) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase, isUpdating }: ICaseState = useCaseState()
  const caseId: string = activeCase?.id!
  const dateOfBirthDisplayInTime = CaseHelper.getDateOfBirthDisplayInTime(
    activeCase!,
  )
  const dateOfDeathDisplayInTime = CaseHelper.getDateOfDeathDisplayInTime(
    activeCase!,
  )
  const dateOfServiceDisplayInTime = CaseHelper.getDateOfServiceDisplayInTime(
    activeCase!,
  )

  const [fields, setFields] = useState<ICaseEditFields>({
    deceasedFullName: currentCase?.deceased?.fullName,
    dateOfBirth: dateOfBirthDisplayInTime || '',
    dateOfDeath: dateOfDeathDisplayInTime || '',
    dateOfService: dateOfServiceDisplayInTime || '',
    location: currentCase?.service?.location,
    serviceStartTime: currentCase?.service?.serviceStartTime,
  })

  const { isValid } = FormHelper.validateCaseEditForm(fields)

  return (
    <StyledCaseEditForm
      onSubmit={(ev) => {
        ev.preventDefault()
        if (isValid) {
          const { dateOfBirth, dateOfDeath, dateOfService } = fields
          const service = currentCase?.service

          const updatedCaseFields = {
            ...fields,
            dateOfBirth,
            dateOfDeath,
            dateOfService,
            service: {
              ...service,
              location: service?.location,
              serviceStartTime: service?.serviceStartTime,
            },
          }
          dispatch(updateCaseById({ caseId, caseFields: updatedCaseFields }))
        }
      }}
    >
      <TextField
        labelText="Deceased Name"
        placeholder="Deceased Name"
        rules={CaseEditFormRules.deceasedFullName}
        value={fields.deceasedFullName!}
        onChange={(ev: any) =>
          setFields({ ...fields, deceasedFullName: ev.target.value })
        }
      />
      <DateField
        disabledDate={DISABLED_DATE_BEFORE_TODAY}
        labelText="Date of Service"
        value={fields.dateOfService}
        rules={CaseEditFormRules.dateOfService}
        onChange={(dateOfService: string | null) => {
          setFields({ ...fields, dateOfService })
        }}
      />
      <DateField
        labelText="Date of Birth"
        defaultPickerValue={moment('19000101')}
        value={fields.dateOfBirth}
        type="dob"
        rules={CaseEditFormRules.dateOfBirth}
        onChange={(dateOfBirth: string | null) => {
          setFields({ ...fields, dateOfBirth })
        }}
        required
      />
      <DateField
        labelText="Date of Death"
        value={fields.dateOfDeath}
        rules={CaseEditFormRules.dateOfDeath}
        onChange={(dateOfDeath: string | null) => {
          setFields({ ...fields, dateOfDeath })
        }}
        required
      />
      <TextField
        labelText="Service Address/Location"
        placeholder="Service Address/Location"
        value={fields.location!}
        rules={CaseEditFormRules.location}
        onChange={(ev) => setFields({ ...fields, location: ev.target.value })}
        required
      />
      <TimePicker
        format={SERVICE_START_TIME_PICKER_FORMAT}
        onChange={(_time: Moment, timeString: string) => {
          setFields({ ...fields, serviceStartTime: timeString })
        }}
        labelText={SERVICE_START_TIME_PICKER_LABEL_TEXT}
        value={
          fields.serviceStartTime
            ? moment(fields.serviceStartTime, SERVICE_START_TIME_PICKER_FORMAT)
            : null
        }
      />
      <StyledUpdateCaseButton
        disabled={!isValid}
        loading={isUpdating}
        htmlType="submit"
        noMarginLeft
      >
        Update Case Details
      </StyledUpdateCaseButton>
    </StyledCaseEditForm>
  )
}

export default CaseEditForm
