import React, { useState } from 'react'
import { Form } from 'antd'
import styled from 'styled-components'
import { ISignUpRequestBody } from '@eulogise/core'
import {
  StyledCheckBoxSmallText,
  StyledLeftFloatDiv,
} from '../SignUpForm/SignUpForm.style'
import {
  Button,
  ButtonType,
  ProfileIcon,
  MailIcon,
  LockIcon,
  Input,
  Notification,
  Checkbox,
} from '@eulogise/client-components'
import { useAuthState, useEulogiseDispatch } from '../../../../store/hooks'
import { updatePersonalDetailById } from '../../../../store/AuthState/actions'
import { hideModalAction } from '../../../../store/ModalState/actions'
import { ModalId } from '@eulogise/core'

const StyledFinalisedSignUpForm = styled(Form)``

const onPolicyConfirmChange = (e: any) => {
  console.log(`checked = ${e.target.checked}`)
}

const FinalisedSignUpForm = () => {
  const { account } = useAuthState()
  const dispatch = useEulogiseDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const userId = account?.id

  if (!userId) {
    console.log('userId is not defined')
    return null
  }

  const onFinish = (values: ISignUpRequestBody) => {
    console.log('Received values of form: ', values)
    setIsSubmitting(true)
    dispatch(
      updatePersonalDetailById({
        userId,
        personalDetailsFields: {
          fullName: account?.fullName,
          password: values.password,
          acceptTerms: values.acceptTerms,
          acceptMarketing: values.acceptMarketing,
        },
        success: () => {
          Notification.success('Password is updated')
          setIsSubmitting(false)
          dispatch(hideModalAction(ModalId.FINALISE_SIGNUP))
        },
        failed: () => {
          setIsSubmitting(false)
        },
      }),
    )
  }

  return (
    <StyledFinalisedSignUpForm
      initialValues={{ fullName: account.fullName, email: account.email }}
      onFinish={onFinish}
    >
      <Form.Item
        name="fullName"
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input
          disabled
          placeholder="Full name"
          prefix={<ProfileIcon />}
          bordered={false}
        />
      </Form.Item>

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
        <Input
          disabled
          placeholder="Email Address"
          prefix={<MailIcon />}
          bordered={false}
          autoCapitalize="none"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input
          prefix={<LockIcon className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          bordered={false}
        />
      </Form.Item>
      <Form.Item
        name="acceptTerms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error('Please accept the terms and conditions'),
                  ),
          },
        ]}
      >
        <StyledLeftFloatDiv>
          <Checkbox className="confirm-sign-up-checkbox">
            <StyledCheckBoxSmallText>
              I have read the{' '}
              <a
                className="checkbox-link"
                href="https://www.eulogizememorials.com/privacy-policy"
                target="_blank"
              >
                Personal Information Collection Statement
              </a>
            </StyledCheckBoxSmallText>
          </Checkbox>
        </StyledLeftFloatDiv>
      </Form.Item>

      <Form.Item valuePropName="checked" name="acceptMarketing">
        <StyledLeftFloatDiv>
          <Checkbox onChange={onPolicyConfirmChange}>
            <StyledCheckBoxSmallText>
              I would like to receive occasional information about other
              services from Eulogize.
            </StyledCheckBoxSmallText>
          </Checkbox>
        </StyledLeftFloatDiv>
      </Form.Item>

      <Form.Item>
        <StyledLeftFloatDiv>
          <Button
            buttonType={ButtonType.PRIMARY}
            htmlType="submit"
            className="signup-form-button"
            loading={isSubmitting}
            noMarginLeft
          >
            Submit
          </Button>
        </StyledLeftFloatDiv>
      </Form.Item>
    </StyledFinalisedSignUpForm>
  )
}

export default FinalisedSignUpForm
