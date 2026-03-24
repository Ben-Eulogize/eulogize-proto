import React, { useState } from 'react'
import styled from 'styled-components'
import { DrawerMemorialStatus } from '../DrawerMemrialStatus/DrawerMemorialStatus'
import { MemorialVisualStatus, ResourceFileStatus } from '@eulogise/core'
import { DrawerListRow } from './DrawerListRow'
import { DrawerListRowItem } from './DrawerListRowItem'
import { ConfirmModal } from '../../Modal'
import { SwitchButton } from '../../Switch'
import { COLOR, STYLE } from '@eulogise/client-core'
import { GlassIcon } from '../../icons'
import { DrawerLabel } from './DrawerLabel'

type IDrawerLabelRowStatusItemProps = {
  id?: string
  label: string
  status: MemorialVisualStatus
  fileStatus: ResourceFileStatus
  productName: string
  onClick: () => void
  onEditClick: () => void
  onUnlockClick: () => void
  onReEditClick: () => void
  onResetClick: () => void
  allowUnlock?: boolean
  allowReset?: boolean
  disabled?: boolean
  disabledText?: string
  isFeatureToggleEnabled?: boolean
  onToggleFeature: (enabled: boolean) => void
}

// @ts-ignore
const StyledProductDrawerListRowItem = styled(DrawerListRowItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// @ts-ignore
const StyledSwitchButton = styled(SwitchButton)`
  margin-bottom: 0;
  margin-left: ${STYLE.GUTTER};
`

// @ts-ignore
const ProductDrawerLabel = styled(DrawerLabel)`
  color: ${COLOR.TEXT_COLOR};
`

export const DrawerLabelRowStatusItem = ({
  id,
  label,
  status,
  fileStatus,
  onClick,
  onEditClick,
  onUnlockClick,
  onReEditClick,
  onResetClick,
  productName,
  allowUnlock,
  allowReset,
  disabled = false,
  disabledText = '',
  isFeatureToggleEnabled,
  onToggleFeature,
}: IDrawerLabelRowStatusItemProps) => {
  const [isShowUnlockConfirmModal, setIsShowUnlockConfirmModal] =
    useState<boolean>(false)
  const isCompleted =
    status === MemorialVisualStatus.COMPLETE ||
    status === MemorialVisualStatus.DOWNLOAD
  const isPreviewable =
    status === MemorialVisualStatus.COMPLETE ||
    status === MemorialVisualStatus.THEME_SELECTED ||
    status === MemorialVisualStatus.DOWNLOAD ||
    status === MemorialVisualStatus.EDITED
  return (
    <DrawerListRow>
      <StyledProductDrawerListRowItem isClickable={false}>
        <ProductDrawerLabel
          isClickable={isPreviewable}
          isEnabledIcon={isPreviewable}
          icon={<GlassIcon />}
          label={label}
          tooltip={isPreviewable ? 'Click to preview' : undefined}
          onClick={() => {
            if (disabled) {
              return
            }
            onClick()
          }}
        />
        <StyledSwitchButton
          onClick={(checked: boolean, ev: React.MouseEvent) => {
            ev.stopPropagation()
            ev.preventDefault()
            onToggleFeature(checked)
          }}
          checked={isFeatureToggleEnabled}
          checkedChildren={'On'}
          unCheckedChildren={'Off'}
        />
      </StyledProductDrawerListRowItem>
      <DrawerListRowItem isClickable={!disabled} textRightAlign>
        <DrawerMemorialStatus
          fileStatus={fileStatus}
          isShowResetIcon={allowReset}
          isShowUnlockIcon={allowUnlock}
          disabled={disabled}
          disabledText={disabledText}
          status={status}
          onEditClick={() => {
            onEditClick()
          }}
          onReEditClick={() => {
            onReEditClick()
          }}
          onResetClick={onResetClick}
          onUnlockClick={() => {
            if (allowUnlock && isCompleted) {
              setIsShowUnlockConfirmModal(true)
            }
          }}
        />
      </DrawerListRowItem>

      {allowUnlock && isShowUnlockConfirmModal && (
        <ConfirmModal
          title="Are you sure?"
          text={<>Would you like to unlock this {productName}?</>}
          isConfirming={false}
          onClose={() => setIsShowUnlockConfirmModal(false)}
          onConfirm={() => {
            onUnlockClick()
            setIsShowUnlockConfirmModal(false)
          }}
        />
      )}
    </DrawerListRow>
  )
}
