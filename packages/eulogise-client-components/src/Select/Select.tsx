import React, { useState } from 'react'
import {
  default as AntSelect,
  DefaultOptionType,
  SelectProps,
} from 'antd/lib/select'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'
import { FieldHeader, FieldRules, IFieldValidationRule } from '../Field'
import { FormHelper } from '../Form'

export type SelectOptionType = DefaultOptionType

const StyledSelectContainer = styled.div``

// @ts-ignore
const StyledSelect = styled(AntSelect)`
  width: 100%;
  && > .ant-select-selector {
    border-radius: ${STYLE.BORDER_RADIUS};
  }
`

type SelectOption = {
  label: string
  value: string
}

type ISelectProps = SelectProps & {
  width?: string
  labelText?: string
  labelTextColor?: string
  rules?: Array<any>
  onChange: (value: string, selectedItem: SelectOption) => void
}

export const Select = (
  props: ISelectProps & {
    className?: string
  },
) => {
  const {
    rules = [],
    value,
    labelText,
    labelTextColor,
    onChange,
    className,
    ...commonSelectProps
  } = props
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const invalidRule: IFieldValidationRule = FormHelper.validate(
    rules.filter((a) => a),
    value,
  )!
  const width = props.width ?? '100%'
  return (
    <StyledSelectContainer className={className} style={{ width }}>
      {labelText && (
        <FieldHeader
          isDirty={isDirty}
          required={rules.includes(FieldRules.required)}
          validationMessage={invalidRule?.message}
          labelText={labelText}
          labelTextColor={labelTextColor}
        />
      )}
      <StyledSelect
        {...commonSelectProps}
        dropdownStyle={{ zIndex: 10000 }}
        value={value}
        onChange={(value: string, selectedItem: SelectOption) => {
          setIsDirty(true)
          if (onChange) {
            onChange(value, selectedItem)
          }
        }}
      />
    </StyledSelectContainer>
  )
}
