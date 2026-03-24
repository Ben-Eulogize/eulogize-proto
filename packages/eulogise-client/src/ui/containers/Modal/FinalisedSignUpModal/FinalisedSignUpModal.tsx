import React from 'react'
import { Modal, Button, ButtonType } from '@eulogise/client-components'
import FinalisedSignUpForm from '../../Auth/SignUp/FinalisedSignUpForm/FinalisedSignUpForm'

const FinalisedSignUpModal = () => (
  <Modal
    isOpen
    title="Finish setting up your account"
    footer={null}
    closeIcon={
      <Button
        key="close"
        buttonType={ButtonType.TRANSPARENT}
        noMarginRight
        onClick={close}
      >
        Cancel
      </Button>
    }
  >
    <FinalisedSignUpForm />
  </Modal>
)

export default FinalisedSignUpModal
