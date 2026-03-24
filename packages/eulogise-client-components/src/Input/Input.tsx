import styled from 'styled-components'
import { Input as AntdInput } from 'antd'
import { COLOR } from '@eulogise/client-core'
import { InputProps } from 'antd/lib/input/Input'

interface IInputProps extends InputProps {
  margin?: string
}

// @ts-ignore
export const Input: any = styled(AntdInput)<IInputProps>`
  ${({ margin }) => (margin ? `margin: ${margin};` : `margin: 15px 0;`)}
  box-shadow: none;
  color: ${COLOR.BLACK};
  border: none;
  border-bottom: 1px solid black;
  &:hover,
  &:focus {
    border-bottom: 1px solid black;
  }
  border-radius: 0;
  ${({ disabled }) => disabled && `opacity: .6`}
`
