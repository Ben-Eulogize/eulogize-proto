import React from 'react'
import moment, { Moment } from 'moment'
import styled from 'styled-components'
import { DatePicker as AntDatePicker } from 'antd'
import { useState } from 'react'
import {
  FieldHeader,
  FieldRules,
  IFieldProps,
  IFieldValidationRule,
} from '../Field'
import { FormHelper } from '../Form'
import { RangePickerProps } from 'antd/lib/date-picker'
import { DISPLAY_DATE_FORMAT } from '@eulogise/core'
import { COLOR } from '@eulogise/client-core'

export interface IDateFieldProps extends IFieldProps {
  getPopupContainer?: (trigger: HTMLElement) => HTMLElement
  onChange: (value: string | null) => void
  type?: 'normal' | 'dob'
  disabledDate?: (currentDate: Moment) => boolean
  defaultPickerValue?: Moment
  labelTextColor?: string
}

// @ts-ignore
const StyledDatePicker = styled(AntDatePicker)`
  display: block;
`

const StyledDateField = styled.div``

export const DISABLED_DATE_BEFORE_TODAY: RangePickerProps['disabledDate'] = (
  current,
) => {
  return current && current < moment().startOf('day')
}

export type DateFieldMode = 'decade' | 'year' | 'month' | 'date'

export const DateField = ({
  labelText,
  disabled,
  rules = [],
  onChange,
  getPopupContainer,
  value,
  defaultPickerValue,
  type = 'normal',
  disabledDate,
  labelTextColor = COLOR.BLACK,
}: IDateFieldProps) => {
  const defaultMode = type === 'dob' ? 'decade' : 'date'
  const [mode, setMode] = useState<DateFieldMode>(defaultMode)
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const invalidRule: IFieldValidationRule = FormHelper.validate(
    rules.filter((a) => a),
    value?.toString() || '',
  )!
  const onFieldChange = (v: Moment | null) => {
    setIsDirty(true)
    if (v === null) {
      return onChange(null)
    }
    return onChange(v!.format('YYYY-MM-DD'))
  }

  const reset = () => {
    setTimeout(() => {
      setMode(defaultMode)
    }, 500)
  }

  return (
    <StyledDateField>
      <FieldHeader
        isDirty={isDirty}
        required={rules.includes(FieldRules.required)}
        validationMessage={invalidRule?.message}
        labelText={labelText}
        labelTextColor={labelTextColor}
      />
      <StyledDatePicker
        disabled={disabled}
        disabledDate={disabledDate}
        onChange={onFieldChange}
        onOpenChange={(isOpen: boolean) => {
          // on closing date picker, reset the date picker
          if (!isOpen) {
            reset()
          }
        }}
        getPopupContainer={getPopupContainer}
        mode={mode}
        format={DISPLAY_DATE_FORMAT}
        onPanelChange={(value: any, mode: DateFieldMode) => {
          setMode(mode)
          onFieldChange(value)
        }}
        value={value ? moment(value) : undefined}
        defaultPickerValue={defaultPickerValue}
      />
    </StyledDateField>
  )
}
