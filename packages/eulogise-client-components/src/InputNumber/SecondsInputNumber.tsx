import styled from 'styled-components'
import { InputNumber } from './InputNumber'
import { TIME_INPUT_WIDTH } from './InputNumber.types'

export const SecondsInputNumber = styled(InputNumber).attrs({
  max: 60,
  min: -1, // so that in the situation (for No Audio modal), to have -1 second to change from 1 min to 59 seconds
  placeholder: 'ss',
})`
  width: ${TIME_INPUT_WIDTH}px;
`
