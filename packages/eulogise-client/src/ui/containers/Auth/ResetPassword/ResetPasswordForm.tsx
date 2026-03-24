import { Form } from 'antd'
import LockOutlined from '@ant-design/icons/LockOutlined'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Input } from '@eulogise/client-components'
import { useEulogiseDispatch } from '../../../store/hooks'
import { resetPassword } from '../../../store/AuthState/actions'
import { EulogisePage } from '@eulogise/core'
import { UrlHelper } from '@eulogise/helpers'
import { Link } from '../../../components/Link'

interface IResetPasswordForm {}

export interface IResetPasswordRequestBody {
  password: string
}

const StyledResetPasswordForm = styled(Form)`
  max-width: 80vw;
  margin: 30px auto;
`

const ResetPasswordForm: React.FunctionComponent<IResetPasswordForm> = () => {
  const dispatch = useEulogiseDispatch()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const onFinish = (values: IResetPasswordRequestBody) => {
    const token: string = UrlHelper.getQueryParam('token', location.search)

    setIsSubmitting(false)
    dispatch(
      resetPassword({
        ...values,
        token,
        complete: () => {},
      }),
    )
  }
  return (
    <StyledResetPasswordForm
      name="forgot-password"
      onSubmitCapture={() => {
        setIsSubmitting(true)
      }}
      className="forgot-password-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={() => setIsSubmitting(false)}
    >
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          bordered={false}
        />
      </Form.Item>

      <Form.Item>
        <Button
          loading={isSubmitting}
          htmlType="submit"
          className="forgot-password-form-button"
          noMarginLeft
        >
          Change Password
        </Button>
        <Link to={EulogisePage.SIGN_IN} className={'cancel-link'}>
          Cancel
        </Link>
      </Form.Item>
    </StyledResetPasswordForm>
  )
}

export default ResetPasswordForm
