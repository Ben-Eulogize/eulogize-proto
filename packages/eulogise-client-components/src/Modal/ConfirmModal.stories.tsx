import React from 'react'
import { ConfirmModal, ConfirmModalStatus } from './ConfirmModal'

export default {
  title: 'Modal/ConfirmModal',
  component: ConfirmModal,
  argTypes: {},
}

export const Default = () => (
  <ConfirmModal
    isOpen
    onClose={() => console.log('close')}
    title="Are you sure?"
    text="Would you like to remove this case?"
  />
)

export const Success = () => (
  <ConfirmModal
    isOpen
    onClose={() => console.log('close')}
    status={ConfirmModalStatus.SUCCESS}
    title="Are you sure?"
    text="Would you like to remove this case?"
  />
)

export const Warning = () => (
  <ConfirmModal
    isOpen
    onClose={() => console.log('close')}
    status={ConfirmModalStatus.WARNING}
    title="Are you sure?"
    text="Would you like to remove this case?"
  />
)
