import styled from 'styled-components'
import { default as AntDatePicker } from 'antd/lib/date-picker'
import { COLOR } from '@eulogise/client-core'

// @ts-ignore
export const DatePicker = styled(AntDatePicker)`
  margin-top: 15px;
  border: none;
  border-bottom: 1px solid;
  box-shadow: none;
  color: ${COLOR.BLACK};
`
