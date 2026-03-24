import React from 'react'
import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input/TextArea'

const { TextArea: AntTextArea } = Input

type ITextAreaProps = TextAreaProps

export const TextArea = (props: ITextAreaProps) => {
  return <AntTextArea {...props} />
}
