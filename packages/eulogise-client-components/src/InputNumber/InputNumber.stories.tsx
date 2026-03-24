import React from 'react'
import { InputNumber } from './InputNumber'
import { SecondsInputNumber } from './SecondsInputNumber'
import { MinutesInputNumber } from './MinutesInputNumber'

export default {
  title: 'Input/InputNumber',
  component: InputNumber,
  argTypes: {},
}

export const Default = () => <InputNumber />

export const Seconds = () => <SecondsInputNumber />

export const Minutes = () => <MinutesInputNumber />
