import { Form } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import { IForgotPasswordRequestBody, EulogisePage } from '@eulogise/core'
import { Button, Input } from '@eulogise/client-components'
import {
  StyledForgotPasswordForm,
  StyledLeftFloatDiv,
} from './FotgotPasswordForm.style'
import { useEulogiseDispatch } from '../../../../store/hooks'
import { forgotPassword } from '../../../../store/AuthState/actions'
import { COLOR, STYLE, SCREEN_SIZE } from '@eulogise/client-core'
import { Link } from '../../../../components/Link'

interface ILoginForm {}

const SuccessMessage = styled.div`
  color: ${COLOR.TEXT_COLOR};
  margin-top: 4rem;
  text-align: center;
  ${STYLE.TEXT_MEDIUM};
`

const StyledUnderLineLink = styled(Link)`
  margin-left: 10px;
  text-decoration: underline;
  text-underline-offset: 3px;
  ${STYLE.TEXT_MEDIUM};
`

const StyledRequestPasswordButton = styled(Button)`
  min-width: 220px;
`

const StyledUnderLineLinkContainer = styled.div`
  ${SCREEN_SIZE.TABLET} {
    margin-top: 3px;
  }
  margin-top: 20px;
`

const StyledInput = styled(Input)`
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const ForgotPasswordForm: React.FunctionComponent<ILoginForm> = () => {
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] =
    useState<boolean>(false)
  const dispatch = useEulogiseDispatch()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const onFinish = (values: IForgotPasswordRequestBody) => {
    console.log('Received values of form: ', values)

    setIsSubmitting(false)
    dispatch(
      forgotPassword({
        requestBody: values,
        success: () => setIsSubmittedSuccessfully(true),
      }),
    )
  }
  if (isSubmittedSuccessfully) {
    return (
      <SuccessMessage>Follow the link in the email to continue</SuccessMessage>
    )
  }
  return (
    <StyledForgotPasswordForm
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
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please enter a valid email address',
          },
        ]}
      >
        <StyledInput
          placeholder="Email Address"
          prefix={<UserOutlined />}
          bordered={false}
          autoCapitalize="none"
        />
      </Form.Item>

      <Form.Item>
        <StyledLeftFloatDiv>
          <StyledRequestPasswordButton
            loading={isSubmitting}
            htmlType="submit"
            className="forgot-password-form-button"
            noMarginLeft
          >
            Request new password
          </StyledRequestPasswordButton>
          <StyledUnderLineLinkContainer>
            <StyledUnderLineLink
              to={EulogisePage.SIGN_IN}
              className={'cancel-link'}
            >
              Cancel
            </StyledUnderLineLink>
          </StyledUnderLineLinkContainer>
        </StyledLeftFloatDiv>
      </Form.Item>
    </StyledForgotPasswordForm>
  )
}

export default ForgotPasswordForm
