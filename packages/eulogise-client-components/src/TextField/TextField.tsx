import React, { ReactNode } from 'react'
import { useState } from 'react'
import { Input, InputProps, InputNumberProps } from 'antd'
import styled from 'styled-components'
import { FormHelper } from '../Form'
import {
  IFieldProps,
  IFieldValidationRule,
  FieldRules,
  FieldHeader,
} from '../Field'
import { StringHelper } from '@eulogise/helpers'
import { COLOR } from '@eulogise/client-core'
import { InputNumber } from '../InputNumber'

interface ITextFieldProps extends IFieldProps {
  paddingLeft?: number | string
  marginBottom?: number | string
  fontSize?: string
  maxLength?: number
  inputType?: 'text' | 'password' | 'number'
  autoCapitalize?: 'none' | 'off' | 'on' | 'sentences' | 'words' | 'characters'
  suffix?: ReactNode
  labelTextColor?: string
  min?: number
  max?: number
}

const StyledTextField = styled.div<{
  $paddingLeft: number | string
  $marginBottom: number | string
  $fontSize: string
}>`
  ${({ $paddingLeft, $marginBottom, $fontSize }) =>
    `
    ${$marginBottom && `margin-bottom: calc(${$marginBottom} * 2rem);`}
    ${$paddingLeft && `padding-left: calc(${$paddingLeft} * 2rem);`}
    ${$fontSize && `font-size: ${$fontSize};`}
  `}
`

export const TextField = ({
  className,
  paddingLeft,
  marginBottom,
  placeholder,
  fontSize,
  labelText,
  type,
  inputType = 'text',
  min,
  max,
  disabled,
  maxLength,
  rules = [],
  onChange,
  value,
  autoCapitalize,
  suffix,
  labelTextColor = COLOR.BLACK,
}: ITextFieldProps) => {
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const invalidRule: IFieldValidationRule = FormHelper.validate(
    rules.filter((a) => a),
    value,
  )!

  const rulesMessages = rules.map((r) => r?.message)

  const handleInputChange = (ev: any) => {
    setIsDirty(true)
    if (onChange) {
      const v = inputType === 'number' ? ev : ev.target.value
      const value =
        inputType !== 'number' ? StringHelper.onlyAcceptAsciiCharacters(v) : v
      onChange(
        {
          ...ev,
          target: {
            ...(ev?.target ? ev.target : {}),
            value,
          },
        },
        value,
        invalidRule,
      )
    }
  }

  const inputProps: InputProps | InputNumberProps = {
    role: 'textbox',
    placeholder,
    maxLength,
    disabled,
    type,
    suffix,
    onChange: handleInputChange,
    value,
    autoCapitalize,
    min,
    max,
  }
  return (
    <StyledTextField
      className={className}
      $paddingLeft={paddingLeft!}
      $marginBottom={marginBottom!}
      $fontSize={fontSize!}
    >
      <FieldHeader
        isDirty={isDirty}
        required={rulesMessages.includes(FieldRules?.required?.message)}
        validationMessage={invalidRule?.message}
        labelText={labelText}
        labelTextColor={labelTextColor}
      />
      {inputType === 'text' || inputType === 'password' ? (
        <Input {...(inputProps as InputProps)} />
      ) : (
        <InputNumber {...(inputProps as InputNumberProps)} />
      )}
    </StyledTextField>
  )
}
