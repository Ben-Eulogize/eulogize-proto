import React, { useState } from 'react'
import {
  Button,
  ButtonGroup,
  ButtonType,
  Input,
  Modal,
  Notification,
} from '@eulogise/client-components'
import { Form } from 'antd'
import {
  EulogiseResource,
  EulogiseUserRole,
  IClientData,
  IEulogiseUser,
} from '@eulogise/core'
import RequestHelper from '../../../helpers/RequestHelper'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { LoadingMessage } from '../../../components/LoadingMessage/LoadingMessage'

export const CreateFuneralDirectorModal = ({
  clientId,
  isOpen,
  onCreated,
  onClose,
}: {
  clientId: string
  isOpen: boolean
  onCreated: (user: IEulogiseUser) => void
  onClose: () => void
}) => {
  const [isCreating, setIsCreating] = useState<boolean>(false)

  const onFormSubmit = async (fields: any) => {
    try {
      setIsCreating(true)
      const { data: funeralDirector }: { data: IClientData } =
        await RequestHelper.request(
          EulogiseEndpoint.ACCOUNT_SIGN_UP_FUNERAL_DIRECTOR_AS_ADMIN,
          {
            method: 'POST',
            data: fields,
          },
        )

      await RequestHelper.saveResourceRequest(EulogiseResource.INVITE, {
        role: EulogiseUserRole.CLIENT,
        client: clientId,
        ...fields,
        status: 'sent',
      })

      Notification.success(
        `Funeral director ${fields.fullName} registered successfully!`,
      )
      setIsCreating(false)
      console.log('funeral director created', funeralDirector)
      onCreated(funeralDirector as any)
    } catch (ex) {
      setIsCreating(false)
      throw ex
    }
  }

  return (
    <Modal
      title="Add Funeral Director"
      footer={null}
      isOpen={isOpen}
      onCloseClick={onClose}
    >
      {isCreating ? (
        <LoadingMessage text="Submitting" />
      ) : (
        <Form
          name="create-funeral-director-form"
          className="create-funeral-director-form"
          onFinish={onFormSubmit}
        >
          <Form.Item
            name="fullName"
            fieldKey="fullName"
            rules={[
              {
                required: true,
                message: 'Missing funeral director full name',
              },
            ]}
          >
            <Input
              width={'400px'}
              placeholder="Invite funeral director full name"
              bordered={false}
            />
          </Form.Item>
          <Form.Item
            name="email"
            fieldKey="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter a valid email address',
              },
            ]}
          >
            <Input
              placeholder="Invite funeral director email"
              bordered={false}
            />
          </Form.Item>
          <ButtonGroup isAlignRight>
            <Button
              buttonType={ButtonType.TRANSPARENT}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button htmlType="submit">Add</Button>
          </ButtonGroup>
        </Form>
      )}
    </Modal>
  )
}
