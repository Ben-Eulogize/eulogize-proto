import React from 'react'
import { Moment } from 'moment'
import styled from 'styled-components'
import { TimePicker as AntTimePicker } from 'antd'
import { PickerTimeProps } from 'antd/lib/date-picker/generatePicker'
import { LabelText } from '../Text'
import { COLOR } from '@eulogise/client-core'

interface ITimePickerProps extends PickerTimeProps<any> {
  getPopupContainer?: (trigger: HTMLElement) => HTMLElement
  format?: string
  onChange: (time: Moment, timeString: string) => void
  labelText: string
  value: Moment
  defaultValue: Moment
  bordered: boolean
  showNow: boolean
  labelTextColor?: string
}

// @ts-ignore
const StyledTimePicker = styled(AntTimePicker)`
  display: block;
`

const StyledTimePickerField = styled.div``

export const TimePicker: React.FC<ITimePickerProps> = ({
  getPopupContainer,
  format,
  onChange,
  labelText,
  labelTextColor = COLOR.BLACK,
  value,
  defaultValue,
  bordered = true,
  showNow = true,
}) => {
  return (
    <StyledTimePickerField>
      {labelText && (
        <LabelText textColor={labelTextColor}>{labelText}</LabelText>
      )}
      <StyledTimePicker
        onChange={onChange}
        getPopupContainer={getPopupContainer}
        format={format}
        value={value}
        defaultValue={defaultValue}
        bordered={bordered}
        showNow={showNow}
      />
    </StyledTimePickerField>
  )
}
