import React from 'react'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'
import { LabelText } from '../Text'
import type {
  CheckboxOptionType,
  CheckboxValueType,
} from 'antd/lib/checkbox/Group'
import { Checkbox } from '../Checkbox'

type ICheckboxGroupProps = {
  labelText?: string
  className?: string
  options: Array<CheckboxOptionType | string | number>
  value?: Array<CheckboxValueType>
  onChange?: (checkedValue: Array<CheckboxValueType>) => void
  isCollapsible?: boolean
  isCollapsed?: boolean
  onCollapsedChange: (isCollapsed: boolean) => void
}

const StyledCheckboxGroup = styled.div`
  margin: ${STYLE.FIELD_MARGIN};
`

export const CheckboxGroup = ({
  labelText,
  options,
  className,
  value,
  onChange,
  isCollapsible,
  isCollapsed,
  onCollapsedChange,
}: ICheckboxGroupProps) => {
  return (
    <StyledCheckboxGroup className={className}>
      <LabelText
        isCollapsible={isCollapsible}
        isCollapsed={isCollapsed}
        onChange={onCollapsedChange}
      >
        {labelText}
      </LabelText>
      {!isCollapsed && (
        <Checkbox.Group options={options} value={value} onChange={onChange} />
      )}
    </StyledCheckboxGroup>
  )
}
