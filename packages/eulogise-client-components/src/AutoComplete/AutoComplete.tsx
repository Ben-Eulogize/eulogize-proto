import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoComplete as AntAutoComplete, AutoCompleteProps } from 'antd'
import { IFieldValidationRule, FieldRules, FieldHeader } from '../Field'
import { FormHelper } from '../Form'
import { COLOR } from '@eulogise/client-core'

interface IAntAutoCompleteProps extends AutoCompleteProps {
  labelText: string
  rules: IFieldValidationRule[]
  disableFieldHeader?: boolean
  labelTextColor?: string
}

// @ts-ignore
const StyledAntAutoComplete = styled(AntAutoComplete)``

const StyledAutoComplete = styled.div``

export const AutoComplete: React.FC<IAntAutoCompleteProps> = ({
  style,
  onSearch,
  placeholder,
  options,
  onSelect,
  dropdownStyle,
  labelText,
  labelTextColor = COLOR.BLACK,
  onChange,
  value,
  rules = [],
  disableFieldHeader = false,
}) => {
  const [isDirty] = useState<boolean>(false)
  const invalidRule: IFieldValidationRule = FormHelper.validate(
    rules.filter((a: any) => a),
    value,
  )!
  return (
    <StyledAutoComplete>
      {!disableFieldHeader && (
        <FieldHeader
          isDirty={isDirty}
          required={rules.includes(FieldRules.required)}
          validationMessage={invalidRule?.message}
          labelText={labelText}
          labelTextColor={labelTextColor}
        />
      )}
      <StyledAntAutoComplete
        style={style}
        placeholder={placeholder}
        options={options}
        dropdownStyle={dropdownStyle}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
      />
    </StyledAutoComplete>
  )
}
