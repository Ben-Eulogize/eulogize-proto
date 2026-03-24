import React, { useRef, useState } from 'react'
import ClientCreateCaseForm from '../../ClientAdmin/ClientCreateCaseForm'
import { Button, ButtonType } from '@eulogise/client-components'
import { EulogiseModal } from '../../../components/Modal/EulogiseModal'

interface CreateCaseModalProps {
  onClose: () => void
  onCreated?: () => void
}

const CreateCaseModal: React.FC<CreateCaseModalProps> = ({
  onClose,
  onCreated,
}) => {
  const formRef = useRef()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isFormValid, setIsFormValid] = useState<boolean>(false)

  const close = () => {
    onClose()
  }

  return (
    <EulogiseModal
      className={`create-case-modal`}
      isOpen
      onCloseClick={close}
      title="Create a New Memorial"
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
      footer={
        <>
          <Button
            key="cancel"
            buttonType={ButtonType.TRANSPARENT}
            noMarginRight
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            key="create"
            noMarginRight
            loading={isCreating}
            onClick={() => {
              // @ts-ignore
              formRef.current.dispatchEvent(
                new Event('submit', { bubbles: true, cancelable: true }),
              )
            }}
            buttonType={ButtonType.PRIMARY}
            disabled={!isFormValid}
          >
            Create
          </Button>
        </>
      }
    >
      <ClientCreateCaseForm
        formRef={formRef}
        onCreating={() => setIsCreating(true)}
        onCreated={() => {
          setIsCreating(false)
          onClose()
          if (onCreated) {
            onCreated()
          }
        }}
        onFailed={() => setIsCreating(false)}
        setIsFormValid={setIsFormValid}
      />
    </EulogiseModal>
  )
}

export default CreateCaseModal
