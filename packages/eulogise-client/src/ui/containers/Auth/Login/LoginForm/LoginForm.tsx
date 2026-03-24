import { Form } from 'antd'
import LockOutlined from '@ant-design/icons/LockOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import {
  Button,
  ButtonType,
  Input,
  Text,
  TextSize,
} from '@eulogise/client-components'
import { EulogisePage, ILoginRequestBody } from '@eulogise/core'
import React, { useState } from 'react'
import { StyledLoginForm, StyledLeftFloatDiv } from './LoginForm.style'
import { login } from '../../../../store/AuthState/actions'
import { useEulogiseDispatch } from '../../../../store/hooks'
import { Link } from '../../../../components/Link'
import styled from 'styled-components'
import { SCREEN_SIZE, STYLE } from '@eulogise/client-core'

interface ILoginFormProps {}

const StyledLink = styled(Link)`
  ${SCREEN_SIZE.TABLET} {
    font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};
  }
`

const StyledForgotPasswordButton = styled(Button)`
  margin: 10px 0 15px 0;
  ${SCREEN_SIZE.TABLET} {
    min-width: 180px;
  }
  min-width: 200px;
`

const StyledSignUpButton = styled(Button)``

const StyledInput = styled(Input)`
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const StyledTextContainer = styled.div`
  margin: 10px 0 20px 0;
  ${SCREEN_SIZE.TABLET} {
    margin: 5px 20px 0px 0;
  }
`

const StyledText = styled(Text)`
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const StyledTextAndButtonContainer = styled.div`
  width: 100%;
  display: inline-block;
  justify-content: space-between;
  ${SCREEN_SIZE.TABLET} {
    display: flex;
    justify-content: normal;
  }
`

const LoginForm: React.FunctionComponent<ILoginFormProps> = () => {
  const dispatch = useEulogiseDispatch()
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)
  const onFinish = ({ email, password }: ILoginRequestBody) => {
    setIsLoggingIn(true)
    dispatch(
      login({
        body: { email, password },
        callback: () => {
          setIsLoggingIn(false)
        },
      }),
    )
  }
  return (
    <StyledLoginForm
      name="login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <StyledInput
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          bordered={false}
        />
      </Form.Item>
      <Form.Item>
        <StyledForgotPasswordButton
          className="signup-form-forgot-pass-button"
          buttonType={ButtonType.TRANSPARENT}
          noMarginLeft
        >
          <StyledLink
            to={EulogisePage.FORGOT_PASSWORD}
            className="signup-form-forgot-link"
          >
            Forgot password?
          </StyledLink>
        </StyledForgotPasswordButton>
      </Form.Item>

      <Form.Item>
        <StyledLeftFloatDiv>
          <Button
            htmlType="submit"
            className="login-form-button"
            noMarginLeft
            loading={isLoggingIn}
          >
            Sign In
          </Button>
        </StyledLeftFloatDiv>
      </Form.Item>

      <Form.Item>
        <StyledLeftFloatDiv>
          <StyledTextAndButtonContainer>
            <StyledTextContainer>
              <StyledText size={TextSize.SMALL}>
                Don’t have an account?&nbsp;
              </StyledText>
            </StyledTextContainer>

            <StyledSignUpButton
              className="signup-form-sign-up-button"
              buttonType={ButtonType.TRANSPARENT}
              noMarginLeft
            >
              <StyledLink
                to={EulogisePage.SIGN_UP}
                className={'register-here-link'}
              >
                Register Here
              </StyledLink>
            </StyledSignUpButton>
          </StyledTextAndButtonContainer>
        </StyledLeftFloatDiv>
      </Form.Item>
    </StyledLoginForm>
  )
}

export default LoginForm
