import React from 'react'
import { CopyToClipBoardByText } from './CopyToClipBoardByText'

export default {
  title: 'CopyToClipBoardByText/CopyToClipBoardByText',
  component: CopyToClipBoardByText,
  argTypes: {},
}

export const CopyToClipBoardByTextDemo = () => {
  return (
    <CopyToClipBoardByText
      text={
        'This is the copy clipboard by text demo, click the icon to copy text'
      }
    />
  )
}
