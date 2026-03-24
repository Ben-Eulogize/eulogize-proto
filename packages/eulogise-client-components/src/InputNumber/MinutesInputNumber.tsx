import styled from 'styled-components'
import { InputNumber } from './InputNumber'
import { TIME_INPUT_WIDTH } from './InputNumber.types'

export const MinutesInputNumber = styled(InputNumber).attrs({
  max: 60,
  min: 0,
  placeholder: 'mm',
})`
  width: ${TIME_INPUT_WIDTH}px;
`
