import React from 'react'
import styled from 'styled-components'
import {
  MemorialVisualStatus,
  MemorialVisualStatusProps,
  ResourceFileStatus,
} from '@eulogise/core'
import { MemorialStatus } from '../../Table'
import { CloseIcon, EditIcon, LockIcon } from '../../icons'
import { Tooltip } from '../../Tooltip'
import { CardProductHelper } from '@eulogise/helpers'
import { COLOR, STYLE } from '@eulogise/client-core'

type IDrawerMemorialStatusProps = {
  status: MemorialVisualStatus
  fileStatus: ResourceFileStatus
  isShowResetIcon?: boolean
  isShowUnlockIcon?: boolean
  onReEditClick: () => void
  onUnlockClick: () => void
  onEditClick: () => void
  onResetClick: () => void
  disabled?: boolean
  disabledText?: string
}

const StyledDrawerMemorialStatus = styled.div<{ $isUnlockable?: boolean }>`
  display: flex;
  align-items: center;
  ${({ $isUnlockable }) => $isUnlockable && `cursor: pointer;`}
`

const StatusText = styled.div`
  margin-right: 0.5rem;
`

const lockSize = '1.4rem'
const IconStyle = `
  font-size: ${lockSize};
  margin-right: 0.5rem;
`
// @ts-ignore
const StyledLockIcon = styled(LockIcon)`
  ${IconStyle};
  cursor: pointer;
`
// @ts-ignore
const StyledEditIcon = styled(EditIcon)`
  ${IconStyle};
  cursor: pointer;
`

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  margin: 0 ${STYLE.HALF_GUTTER};
`

const StyledTooltip = styled(Tooltip)<{ $disabled?: boolean }>`
  ${({ $disabled }) =>
    $disabled ? `color: ${COLOR.TEXT_DISABLED_COLOR};` : ''};
`

export const DrawerMemorialStatus = ({
  isShowUnlockIcon,
  isShowResetIcon,
  disabled,
  disabledText,
  fileStatus,
  status,
  onReEditClick,
  onUnlockClick,
  onEditClick,
  onResetClick,
}: IDrawerMemorialStatusProps) => {
  const { label } = MemorialVisualStatusProps[status]
  const isProcessing = CardProductHelper.isProcessing(fileStatus)
  const isLocked =
    status === MemorialVisualStatus.COMPLETE ||
    status === MemorialVisualStatus.DOWNLOAD
  return (
    <StyledDrawerMemorialStatus
      $isUnlockable={isShowUnlockIcon && isLocked}
      onClick={() => {
        if (isProcessing) {
          return
        }
        if (isLocked) {
          onReEditClick()
        } else {
          onEditClick()
        }
      }}
    >
      {disabled ? (
        <StyledTooltip $disabled={isProcessing} title={disabledText ?? ''}>
          {disabledText}&nbsp;
        </StyledTooltip>
      ) : (
        <StatusText>{label}</StatusText>
      )}
      {!disabled &&
        (isLocked ? (
          <Tooltip title="Keep editing">
            <StyledEditIcon />
          </Tooltip>
        ) : (
          <Tooltip title="Click to edit">
            <StyledEditIcon />
          </Tooltip>
        ))}
      {isShowResetIcon && isProcessing && (
        <Tooltip title={`Reset File Status`}>
          <StyledCloseIcon onClick={onResetClick} />
        </Tooltip>
      )}
      {!disabled &&
        (isShowUnlockIcon ? (
          isLocked ? (
            <Tooltip title="Click to unlock">
              <StyledLockIcon
                onClick={(ev) => {
                  ev.stopPropagation()
                  onUnlockClick()
                }}
              />
            </Tooltip>
          ) : null /*<StyledUnlockIcon />*/
        ) : null)}
      <MemorialStatus status={status} />
    </StyledDrawerMemorialStatus>
  )
}
