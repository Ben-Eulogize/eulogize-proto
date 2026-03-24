import { Form } from 'antd'
import styled from 'styled-components'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import {
  StyledCheckBoxSmallText,
  StyledLeftFloatDiv,
  StyledSignUpForm,
} from './SignUpForm.style'
import {
  Button,
  ButtonSize,
  Checkbox,
  EulogiseInitialErrorIcon,
  EulogiseInitialIcon,
  GlobalEarthIcon,
  Input,
  Popover,
  QuickGuideIcon,
  Select,
} from '@eulogise/client-components'
import { useAuthState, useEulogiseDispatch } from '../../../../store/hooks'
import { resetAuthState, signUp } from '../../../../store/AuthState/actions'
import {
  EulogiseCountry,
  EulogisePage,
  EulogiseRegion,
  EulogiseUserRole,
  IAuthState,
  IClientHandleRouteResponse,
  ISignUpRequestBody,
} from '@eulogise/core'
import { CaseHelper, DateTimeHelper } from '@eulogise/helpers'
import { COLOR, STYLE, useIsMobile } from '@eulogise/client-core'
import { EULOGISE_COUNTRIES_REGIONS_OPTIONS } from '../../../../components/CountryGlobalIcon/CountryGlobalIcon'
import { WhyDoYouNeedThisPopoverContent } from '../../../../components/WhyDoYouNeedThisPopoverContent/WhyDoYouNeedThisPopoverContent'
import { Link } from '../../../../components/Link'

const StyledCheckbox = styled(Checkbox)`
  margin-top: 0px;
`

const StyledButtonContainer = styled.div`
  margin: 10px 0;
  text-align: center;
  position: relative;
`

const StyledSignUpButton = styled(Button)`
  width: 95%;
`

const StyledInput = styled(Input)`
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const StyledSelect = styled(Select)`
  display: inline-block;
  padding: 4px 11px 4px 6px;
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
  width: inherit;
`

const SelectCountryWrapper = styled.div`
  display: flex;
  padding: 0 0 0 8px;
  position: relative;
  border-bottom: 1px solid;
  width: 100%;
  justify-content: space-between;

  && .ant-select .ant-select-selector {
    padding-left: calc(2rem - 12px);
  }
`

const StyledSelectGlobalIconWrapper = styled.div<{
  $shouldGlobalIconTurnsRed: boolean
}>`
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 20px;
  height: 40px;
  margin-left: 2px;
  ${({ $shouldGlobalIconTurnsRed }) =>
    $shouldGlobalIconTurnsRed
      ? `
    color: ${COLOR.ANTD_INPUT_ERROR_RED_COLOR};
`
      : `
color: ${COLOR.DARK_BLUE}`}
`

const StyledGlobalEarthIcon = styled(GlobalEarthIcon)``

const StyledWhyDoYouNeedThisIconButton = styled(QuickGuideIcon)`
  float: right;
  font-size: 25px;
  margin: 6px 10px 0 0;
  color: ${COLOR.DARK_BLUE};
`

const StyledCountryReminderButtonContainer = styled.div``

const StyledCompoundRow = styled.div`
  width: 100%;
`

const StyledAlreadyHaveAccountLinkContainer = styled.div`
  margin-left: 8px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
`

const StyledAlreadyHaveAccountText = styled.div`
  font-size: ${STYLE.TEXT_FONT_SIZE_EXTRA_SMALL};
  color: ${COLOR.BLACK};
  margin-right: 8px;
`

const StyledAlreadyHaveAccountLink = styled(Link)`
  text-decoration: underline;
  color: ${COLOR.DARK_BLUE};
  font-size: ${STYLE.TEXT_FONT_SIZE_EXTRA_SMALL};
  position: relative;
`

interface ISignUpForm {
  client?: IClientHandleRouteResponse
  viaClientHandle?: string
}

const SignUpForm = ({ client, viaClientHandle }: ISignUpForm) => {
  const dispatch = useEulogiseDispatch()
  const [isWhyYouNeedThisPopoverOpened, setIsWhyYouNeedThisPopoverOpened] =
    useState<boolean>(false)

  const [form] = Form.useForm()
  const [shouldGlobalIconTurnsRed, setShouldCountryIconTurnsRed] =
    useState<boolean>(false)
  const [shouldLovedOnesNameIconTurnsRed, setShouldLovedOnesNameIconTurnsRed] =
    useState<boolean>(false)

  const isMobileScreenSize: boolean = useIsMobile()

  const { isSigningUp }: IAuthState = useAuthState()

  const signUpButtonTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const editorPaymentConfig = client?.editorPaymentConfig ?? null

  const onFinish = (values: ISignUpRequestBody) => {
    const deceasedDate = values?.deceasedDate ?? null
    const country: EulogiseCountry = (client?.country ??
      values?.country) as EulogiseCountry
    const deceasedName = values?.deceasedName
    const newRegion: EulogiseRegion = CaseHelper.getRegionByCountry({ country })

    dispatch(
      signUp({
        ...values,
        region: newRegion,
        deceasedDate: DateTimeHelper.formatISODate(deceasedDate),
        clientId: client?.id,
        viaClientHandle,
        country,
        enabledProducts: client?.defaultProducts,
        type: client
          ? client.clientSignUpDefaultUserRole ?? EulogiseUserRole.COEDITOR
          : values.type
          ? values.type
          : EulogiseUserRole.CUSTOMER,
        deceasedName,
        editorPaymentConfig,
        complete: () => null,
      }),
    )
  }

  const onCountryChange = (value: string) => {
    if (!value) {
      return
    }
    form.setFieldsValue({ country: value })
  }

  useEffect(() => {
    if (signUpButtonTimeoutRef.current) {
      clearTimeout(signUpButtonTimeoutRef.current)
    }

    if (isSigningUp) {
      signUpButtonTimeoutRef.current = setTimeout(() => {
        dispatch(
          resetAuthState({
            success: () => null,
          }),
        )
      }, 5000)
    }

    return () => {
      if (signUpButtonTimeoutRef.current) {
        clearTimeout(signUpButtonTimeoutRef.current)
      }
    }
  }, [isSigningUp])

  return (
    <StyledSignUpForm
      name="signup"
      className="signup-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
    >
      <StyledCompoundRow>
        <Form.Item
          name="deceasedName"
          rules={[
            { required: true, message: 'Please enter your deceased name' },
          ]}
          style={{ width: 'inherit' }}
        >
          <StyledInput
            placeholder="Loved One's Name"
            prefix={
              shouldLovedOnesNameIconTurnsRed ? (
                <EulogiseInitialErrorIcon />
              ) : (
                <EulogiseInitialIcon />
              )
            }
            bordered={false}
            margin={'8px 0 0 0'}
            onChange={(ev: any) => {
              if (ev.target.value && shouldLovedOnesNameIconTurnsRed) {
                setShouldLovedOnesNameIconTurnsRed(false)
              } else if (!ev.target.value) {
                setShouldLovedOnesNameIconTurnsRed(true)
              }
            }}
          />
        </Form.Item>
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: 'Please enter your full name' }]}
          style={{ width: 'inherit' }}
        >
          <StyledInput
            placeholder="Your Name"
            prefix={<UserOutlined />}
            bordered={false}
            margin={'0px'}
          />
        </Form.Item>

        <Form.Item
          name="email"
          style={{ width: 'inherit' }}
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
            autoCapitalize="none"
            prefix={<MailOutlined color="yellow" />}
            bordered={false}
            margin={'0px'}
          />
        </Form.Item>
      </StyledCompoundRow>

      <StyledCompoundRow>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
          style={{ width: 'inherit' }}
        >
          <StyledInput
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            bordered={false}
            margin={'0px'}
          />
        </Form.Item>
      </StyledCompoundRow>

      {!client && (
        <StyledCompoundRow>
          <Form.Item
            name="country"
            rules={[
              { required: true, message: 'Please select a country or region' },
            ]}
            style={{ width: 'inherit' }}
          >
            <SelectCountryWrapper>
              <StyledSelectGlobalIconWrapper
                $shouldGlobalIconTurnsRed={shouldGlobalIconTurnsRed}
              >
                {<StyledGlobalEarthIcon />}
              </StyledSelectGlobalIconWrapper>
              <StyledSelect
                bordered={false}
                placeholder="Country / Region"
                onChange={(value: EulogiseCountry) => {
                  onCountryChange(value)
                  setShouldCountryIconTurnsRed(false)
                }}
                options={EULOGISE_COUNTRIES_REGIONS_OPTIONS}
              />
              <StyledCountryReminderButtonContainer>
                <Popover
                  overlayClassName="sign-up-country-reminder-popover"
                  placement="top"
                  open={isWhyYouNeedThisPopoverOpened}
                  content={
                    <>
                      <WhyDoYouNeedThisPopoverContent
                        onClose={() => setIsWhyYouNeedThisPopoverOpened(false)}
                      />
                    </>
                  }
                  trigger="click"
                >
                  <StyledWhyDoYouNeedThisIconButton
                    onClick={() => setIsWhyYouNeedThisPopoverOpened(true)}
                  />
                </Popover>
              </StyledCountryReminderButtonContainer>
            </SelectCountryWrapper>
          </Form.Item>
        </StyledCompoundRow>
      )}

      <Form.Item
        name="acceptTerms"
        valuePropName="checked"
        style={{ margin: '0' }}
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
          <StyledCheckbox className="confirm-sign-up-checkbox">
            <StyledCheckBoxSmallText>
              <span>I have read the </span>
              <a
                className="checkbox-link"
                href="https://www.eulogizememorials.com/privacy-policy"
                target="_blank"
              >
                Personal Information Collection Statement
              </a>
            </StyledCheckBoxSmallText>
          </StyledCheckbox>
        </StyledLeftFloatDiv>
      </Form.Item>

      <Form.Item style={{ marginBottom: '0px', marginTop: '4px' }}>
        <StyledButtonContainer>
          <StyledSignUpButton
            htmlType="submit"
            className="signup-form-sign-up-button"
            loading={isSigningUp}
            noMarginLeft
            buttonSize={ButtonSize.LG}
            onClick={() => {
              if (!!!form.getFieldValue('country')) {
                setShouldCountryIconTurnsRed(true)
              } else {
                setShouldCountryIconTurnsRed(false)
              }
              if (!!!form.getFieldValue('deceasedName')) {
                setShouldLovedOnesNameIconTurnsRed(true)
              } else {
                setShouldLovedOnesNameIconTurnsRed(false)
              }
            }}
          >
            Continue
          </StyledSignUpButton>
        </StyledButtonContainer>
      </Form.Item>

      {!isMobileScreenSize && (
        <StyledAlreadyHaveAccountLinkContainer>
          <StyledAlreadyHaveAccountText>
            Already have an account?
          </StyledAlreadyHaveAccountText>
          <StyledAlreadyHaveAccountLink
            to={EulogisePage.SIGN_IN}
            className={'sign-in-link'}
          >
            Log in here.
          </StyledAlreadyHaveAccountLink>
        </StyledAlreadyHaveAccountLinkContainer>
      )}
      {client && (
        <StyledAlreadyHaveAccountLinkContainer>
          <StyledAlreadyHaveAccountText>
            Not a {client?.title} customer
          </StyledAlreadyHaveAccountText>
          <StyledAlreadyHaveAccountLink
            to={EulogisePage.SIGN_UP}
            className={'sign-in-link'}
          >
            Create account here.
          </StyledAlreadyHaveAccountLink>
        </StyledAlreadyHaveAccountLinkContainer>
      )}
    </StyledSignUpForm>
  )
}

export default SignUpForm
