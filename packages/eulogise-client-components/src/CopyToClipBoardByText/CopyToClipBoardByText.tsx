import React from 'react'
import styled from 'styled-components'
import { Tooltip } from '../Tooltip'
import { CopyAssetIcon } from '../icons'
import { Notification } from '../Notification'
import { COLOR } from '@eulogise/client-core'

interface ICopyToClipBoardByText {
  text: string | undefined | null
}

const StyledCopyAssetIcon = styled(CopyAssetIcon)`
  padding-left: 8px;
  color: ${COLOR.LIGHT_GREY};
`

const CopyToClipboard = ({
  text = '',
}: {
  text: string | undefined | null
}) => {
  try {
    navigator.clipboard.writeText(text ?? '')
    Notification.success(`Details copied to clipboard.`)
  } catch (error) {
    Notification.error('Details copied to clipboard failed.')
  }
}

export const CopyToClipBoardByText: React.FC<ICopyToClipBoardByText> = ({
  text = '',
}) => {
  return (
    <Tooltip title={'Copy'}>
      <StyledCopyAssetIcon
        onClick={() => {
          CopyToClipboard({
            text,
          })
        }}
      />
    </Tooltip>
  )
}
