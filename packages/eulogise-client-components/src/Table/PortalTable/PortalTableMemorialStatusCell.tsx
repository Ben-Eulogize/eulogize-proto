import React from 'react'
import styled from 'styled-components'
import {
  EulogiseProduct,
  MemorialVisualStatus,
  MemorialVisualStatusProps,
  ResourceFileStatus,
} from '@eulogise/core'
import { MemorialStatus } from './MemorialStatus'
import { Tooltip } from '../../Tooltip'
import { COLOR } from '@eulogise/client-core'
import { CardProductHelper } from '@eulogise/helpers'
import { CheckedIcon, CloseIcon } from '../../icons'

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const MemorialStatusText = styled.div`
  white-space: nowrap;
  margin-left: 1rem;
`

const StyledCheckedIconContainer = styled.div``

// @ts-ignore
const StyledCheckedIcon = styled(CheckedIcon)`
  cursor: pointer;
  margin-left: 10px;
  margin-top: 8px;
`

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  margin-top: 8px;
`

const StyledPortalTableMemorialStatusCell = styled.div<{
  $isClickable?: boolean
}>`
  display: flex;
  align-items: center;
  width: 200px;
  ${({ $isClickable }) =>
    $isClickable
      ? `
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  `
      : `
    cursor: not-allowed;
    color: ${COLOR.DOVE_GREY};
  `}
`

type IPortalTableMemorialStatusCellProps = {
  product: EulogiseProduct
  status: MemorialVisualStatus
  fileStatus: ResourceFileStatus
  onClick: () => void
  isShowResetButton: boolean
  onResetClick: ({ product }: { product: EulogiseProduct }) => void
  id: string
  MemorialStatusPopoverComponent?: JSX.Element | null
  hasGeneratedBefore: boolean
}

export const PortalTableMemorialStatusCell = ({
  product,
  status,
  fileStatus,
  onClick,
  onResetClick,
  isShowResetButton,
  id,
  MemorialStatusPopoverComponent,
  hasGeneratedBefore = false,
}: IPortalTableMemorialStatusCellProps) => {
  const prop = MemorialVisualStatusProps[status]
  const tooltip =
    status === MemorialVisualStatus.COMPLETE ||
    status === MemorialVisualStatus.DOWNLOAD
      ? 'Click to preview'
      : id
      ? 'Click to edit'
      : 'Select a theme'

  const isProcessing = CardProductHelper.isProcessing(fileStatus)
  return (
    <StyledContainer>
      <Tooltip title={tooltip}>
        {MemorialStatusPopoverComponent}
        <StyledPortalTableMemorialStatusCell
          $isClickable={!isProcessing}
          onClick={() => {
            if (isProcessing) {
              return
            }
            onClick()
          }}
        >
          <MemorialStatus status={status} />
          <MemorialStatusText>
            {isProcessing ? 'Generating...' : prop.label}
          </MemorialStatusText>
        </StyledPortalTableMemorialStatusCell>
      </Tooltip>
      {isShowResetButton && isProcessing && (
        <Tooltip title={'Reset File Status'}>
          <StyledCheckedIconContainer onClick={() => onResetClick({ product })}>
            <StyledCloseIcon />
          </StyledCheckedIconContainer>
        </Tooltip>
      )}
      {hasGeneratedBefore && (
        <Tooltip title={'This product has been generated before'}>
          <StyledCheckedIconContainer>
            <StyledCheckedIcon />
          </StyledCheckedIconContainer>
        </Tooltip>
      )}
    </StyledContainer>
  )
}
