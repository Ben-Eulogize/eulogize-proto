import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  CreateCaseFormRules,
  DateField,
  DISABLED_DATE_BEFORE_TODAY,
  FieldRules,
  ICreatCaseFormFields,
  Radio,
  RadioGroup,
  Select,
  TimePicker,
  Tooltip,
  AutoComplete,
  TextField,
  CheckboxGroup,
} from '@eulogise/client-components'
import {
  EulogiseCountry,
  EulogiseUserRole,
  SERVICE_START_TIME_PICKER_FORMAT,
  SERVICE_START_TIME_PICKER_LABEL_TEXT,
  IClientFamilyInviteOptions,
  EulogiseRegion,
  EulogiseEditorPaymentConfig,
  EulogiseProduct,
  IEulogiseProductAvailabilityStatus,
} from '@eulogise/core'
import moment, { Moment } from 'moment'
import { AccountHelper } from '@eulogise/helpers'
import { CollapseBox } from '@eulogise/client-components'
import {
  useAllGenericCardProductTypes,
  useClientState,
} from '../../store/hooks'
import { COLOR } from '@eulogise/client-core'

const StyledCreateCaseForm = styled.form``

type ICreateCaseFormProps = {
  region?: EulogiseRegion
  formRef?: any
  isAdminForm?: boolean
  fields: ICreatCaseFormFields
  country?: EulogiseCountry
  onChange: (fields: ICreatCaseFormFields) => void
  onSubmit: (event: any, role: EulogiseUserRole) => void
  prefilledClientAddressListOptions?: Select.Options
  createCaseFamilyInviteOptions?: Array<IClientFamilyInviteOptions>
  dynamicLoadedAddressObj?: Record<string, string>
  formValid?: boolean
}

const StyledRadioGroup = styled(RadioGroup)`
  margin: 0.5rem 0;
`

const StyledCheckboxGroup = styled(CheckboxGroup)`
  margin-bottom: 0.5rem;
`

export const CreateCaseForm = (props: ICreateCaseFormProps) => {
  const {
    region = EulogiseRegion.USA,
    formRef,
    fields,
    onChange,
    onSubmit,
    isAdminForm,
    prefilledClientAddressListOptions = [],
    createCaseFamilyInviteOptions = [],
    dynamicLoadedAddressObj = {},
    country,
  } = props
  const { activeItem: activeClient } = useClientState()
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [hasManuallySelectedRole, setHasManuallySelectedRole] =
    useState<boolean>(false)
  const hadFamilyMemberEmailInputRef = useRef<boolean>(false)
  const email = fields?.email
  const familyMemberEmailRules = [FieldRules.email]
  const updateFields = (newFields: Partial<ICreatCaseFormFields>) => {
    let updatedNewFields = newFields
    if ('location' in newFields) {
      const locationMatchedRecord =
        dynamicLoadedAddressObj?.[newFields?.location] ?? newFields?.location
      updatedNewFields = {
        ...newFields,
        location: locationMatchedRecord,
      }
    }
    onChange({ ...fields, ...updatedNewFields })
  }

  const hasValidEmail = fields.email && FieldRules.email.validate(fields.email)
  const showContributorInviteOption = createCaseFamilyInviteOptions?.includes(
    IClientFamilyInviteOptions.CONTRIBUTOR,
  )
  const showEditorInviteOption = createCaseFamilyInviteOptions?.includes(
    IClientFamilyInviteOptions.EDITOR,
  )

  const showEditorHasToPayInviteOption =
    createCaseFamilyInviteOptions?.includes(
      IClientFamilyInviteOptions.EDITOR_HAS_TO_PAY,
    )
  const showCoEditorInviteOption = createCaseFamilyInviteOptions?.includes(
    IClientFamilyInviteOptions.COEDITOR,
  )
  const showDoNotSendEmailInviteOption =
    createCaseFamilyInviteOptions?.includes(
      IClientFamilyInviteOptions.DO_NOT_SEND_EMAIL,
    )
  const enabledProducts = fields.enabledProducts
  const clientAvailableProducts = activeClient?.availableProducts

  const filterOptionsByAvailability = (
    options: Array<{ value: string; label: string }>,
  ) => {
    if (!clientAvailableProducts) {
      return options
    }

    return options.filter(
      ({ value }) => clientAvailableProducts?.[value as EulogiseProduct],
    )
  }

  const cardProductOptions = filterOptionsByAvailability(
    AccountHelper.getCardProductOptions({
      region,
      genericProductTypes,
      country,
    }),
  )
  const videoProductOptions = filterOptionsByAvailability(
    AccountHelper.getVideoProductOptions({ region }),
  )
  const availableDefaultProductValues =
    AccountHelper.convertProductAvailabilityStatusToArray(enabledProducts)

  const hasTributeOptions =
    cardProductOptions.length > 0 || videoProductOptions.length > 0

  const showFamilyInviteOptionTitle =
    showContributorInviteOption ||
    showEditorInviteOption ||
    showCoEditorInviteOption ||
    showDoNotSendEmailInviteOption ||
    showEditorHasToPayInviteOption

  useEffect(() => {
    const hasFamilyMemberEmailInput = Boolean(email?.trim())

    if (!hasFamilyMemberEmailInput) {
      if (
        fields.role !== undefined ||
        fields.editorPaymentConfig !== undefined
      ) {
        updateFields({ role: undefined, editorPaymentConfig: undefined })
      }

      if (hadFamilyMemberEmailInputRef.current) {
        setHasManuallySelectedRole(true)
      }
      hadFamilyMemberEmailInputRef.current = false
      return
    }

    hadFamilyMemberEmailInputRef.current = true
  }, [email, fields.role, fields.editorPaymentConfig])

  useEffect(() => {
    if (
      !showFamilyInviteOptionTitle ||
      !hasValidEmail ||
      fields.role ||
      hasManuallySelectedRole
    ) {
      return
    }

    if (showEditorInviteOption) {
      updateFields({
        role: EulogiseUserRole.EDITOR,
        editorPaymentConfig:
          EulogiseEditorPaymentConfig.EDITOR_DOES_NOT_NEED_TO_PAY,
      })
      return
    }
    if (showEditorHasToPayInviteOption) {
      updateFields({
        role: EulogiseUserRole.EDITOR,
        editorPaymentConfig: EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY,
      })
      return
    }
    if (showContributorInviteOption) {
      updateFields({ role: EulogiseUserRole.CONTRIBUTOR })
      return
    }
    if (showCoEditorInviteOption) {
      updateFields({ role: EulogiseUserRole.COEDITOR })
      return
    }
    if (showDoNotSendEmailInviteOption) {
      updateFields({ role: undefined })
    }
  }, [
    showFamilyInviteOptionTitle,
    hasValidEmail,
    fields.role,
    showEditorInviteOption,
    showEditorHasToPayInviteOption,
    showContributorInviteOption,
    showCoEditorInviteOption,
    showDoNotSendEmailInviteOption,
    hasManuallySelectedRole,
  ])

  const renderFamilyInviteOption = () => {
    if (!hasValidEmail || !showFamilyInviteOptionTitle) {
      return <></>
    }
    return (
      <StyledRadioGroup labelText="Invite family as" required>
        {showEditorInviteOption && (
          <Tooltip
            title="Invited user is able to edit and generate memorials"
            getPopupContainer={formRef ? () => formRef.current : undefined}
          >
            <Radio
              checked={
                fields.role === EulogiseUserRole.EDITOR &&
                fields.editorPaymentConfig ===
                  EulogiseEditorPaymentConfig.EDITOR_DOES_NOT_NEED_TO_PAY
              }
              onClick={() => {
                updateFields({
                  role: EulogiseUserRole.EDITOR,
                  editorPaymentConfig:
                    EulogiseEditorPaymentConfig.EDITOR_DOES_NOT_NEED_TO_PAY,
                })
                setHasManuallySelectedRole(true)
              }}
            >
              Editor
            </Radio>
          </Tooltip>
        )}

        {showEditorHasToPayInviteOption && (
          <Tooltip
            title="Invited user is able to edit and generate memorials, but has to pay for products"
            getPopupContainer={formRef ? () => formRef.current : undefined}
          >
            <Radio
              checked={
                fields.role === EulogiseUserRole.EDITOR &&
                fields.editorPaymentConfig ===
                  EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY
              }
              onClick={() => {
                updateFields({
                  role: EulogiseUserRole.EDITOR,
                  editorPaymentConfig:
                    EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY,
                })
                setHasManuallySelectedRole(true)
              }}
            >
              Has to purchase
            </Radio>
          </Tooltip>
        )}
        {showContributorInviteOption && (
          <Tooltip
            title="Invited user can only upload photos"
            getPopupContainer={formRef ? () => formRef.current : undefined}
          >
            <Radio
              checked={fields.role === EulogiseUserRole.CONTRIBUTOR}
              onClick={() => {
                updateFields({ role: EulogiseUserRole.CONTRIBUTOR })
                setHasManuallySelectedRole(true)
              }}
            >
              Contributor
            </Radio>
          </Tooltip>
        )}
        {showCoEditorInviteOption && (
          <Tooltip
            title="Invited user is able to edit memorials"
            getPopupContainer={formRef ? () => formRef.current : undefined}
          >
            <Radio
              checked={fields.role === EulogiseUserRole.COEDITOR}
              onClick={() => {
                updateFields({ role: EulogiseUserRole.COEDITOR })
                setHasManuallySelectedRole(true)
              }}
            >
              Coeditor
            </Radio>
          </Tooltip>
        )}
        {showDoNotSendEmailInviteOption && (
          <Tooltip
            title="Will not send email to family"
            getPopupContainer={formRef ? () => formRef.current : undefined}
          >
            <Radio
              checked={fields.role === undefined}
              onClick={() => {
                updateFields({ role: undefined })
                setHasManuallySelectedRole(true)
              }}
            >
              Don't Send Email
            </Radio>
          </Tooltip>
        )}
      </StyledRadioGroup>
    )
  }

  return (
    <StyledCreateCaseForm
      ref={formRef}
      onSubmit={(ev) => onSubmit(ev, fields.role as EulogiseUserRole)}
    >
      {isAdminForm && (
        <>
          <Select
            style={{ width: '100%' }}
            labelText="Country"
            labelTextColor={COLOR.CORE_PURPLE}
            placeholder="Country"
            options={Object.entries(EulogiseCountry).map(([key, value]) => ({
              label: value,
              value: value,
            }))}
            onChange={(value: string) => {
              updateFields({ country: value as EulogiseCountry })
            }}
          ></Select>
        </>
      )}
      <TextField
        labelText="Deceased Name"
        placeholder="Deceased Name"
        value={fields.deceasedName}
        rules={CreateCaseFormRules.deceasedName}
        onChange={(ev: any) => {
          updateFields({ deceasedName: ev.target.value })
        }}
        labelTextColor={COLOR.CORE_PURPLE}
        required
      />
      <DateField
        disabledDate={DISABLED_DATE_BEFORE_TODAY}
        labelText="Date of Service"
        value={fields.dateOfService!}
        getPopupContainer={formRef ? () => formRef.current : undefined}
        onChange={(dateOfService: string | null) => {
          updateFields({ dateOfService })
        }}
        labelTextColor={COLOR.CORE_PURPLE}
      />
      <TextField
        labelText="Family Member First and Last name"
        placeholder="John Smith"
        value={fields.name}
        rules={CreateCaseFormRules.name}
        onChange={(ev: any) => {
          updateFields({ name: ev.target.value })
        }}
        labelTextColor={COLOR.CORE_PURPLE}
        required
      />
      <TextField
        labelText="Family Member Email Address"
        placeholder="example@eulogisememorials.com"
        autoCapitalize="none"
        value={fields.email}
        rules={familyMemberEmailRules}
        labelTextColor={COLOR.CORE_PURPLE}
        onChange={(ev: any) => {
          updateFields({ email: ev.target.value })
        }}
      />
      {renderFamilyInviteOption()}
      <DateField
        labelText="Date of Birth"
        defaultPickerValue={moment('19000101')}
        value={fields.dateOfBirth}
        type="dob"
        rules={CreateCaseFormRules.dateOfBirth}
        getPopupContainer={formRef ? () => formRef.current : undefined}
        onChange={(dateOfBirth: string | null) => {
          updateFields({ dateOfBirth })
        }}
        required
        labelTextColor={COLOR.CORE_PURPLE}
      />
      <DateField
        labelText="Date of Death"
        value={fields.dateOfDeath}
        rules={CreateCaseFormRules.dateOfDeath}
        getPopupContainer={formRef ? () => formRef.current : undefined}
        onChange={(dateOfDeath: string | null) => {
          updateFields({ dateOfDeath })
        }}
        required
        labelTextColor={COLOR.CORE_PURPLE}
      />
      {!isAdminForm && prefilledClientAddressListOptions?.length > 0 ? (
        <AutoComplete
          style={{ width: '100%' }}
          labelText="Service Address/Location"
          placeholder="Service Address/Location"
          labelTextColor={COLOR.CORE_PURPLE}
          options={prefilledClientAddressListOptions}
          onSelect={(selectedAddress: string) => {
            updateFields({ location: selectedAddress })
          }}
          dropdownStyle={{ zIndex: 9999 }}
          rules={CreateCaseFormRules.location}
          value={fields.location}
          onChange={(value: string) => {
            updateFields({ location: value })
          }}
        />
      ) : (
        <TextField
          labelText="Service Address/Location"
          placeholder="Service Address/Location"
          value={fields.location}
          rules={CreateCaseFormRules.location}
          onChange={(ev: { target: { value: any } }) => {
            updateFields({ location: ev.target.value })
          }}
          labelTextColor={COLOR.CORE_PURPLE}
          required
        />
      )}
      <TimePicker
        getPopupContainer={formRef ? () => formRef.current : undefined}
        format={SERVICE_START_TIME_PICKER_FORMAT}
        onChange={(_time: Moment, timeString: string) => {
          updateFields({ serviceStartTime: timeString })
        }}
        labelText={SERVICE_START_TIME_PICKER_LABEL_TEXT}
        labelTextColor={COLOR.CORE_PURPLE}
      />
      {hasTributeOptions && (
        <CollapseBox
          title="Available Tributes"
          isCollapsed={isCollapsed}
          onCollapsedChange={setIsCollapsed}
          textColor={COLOR.CORE_PURPLE}
        >
          {cardProductOptions.length > 0 && (
            <StyledCheckboxGroup
              options={cardProductOptions}
              onChange={(ep: Array<string>) => {
                const { SLIDESHOW, TV_WELCOME_SCREEN, ...newData } =
                  AccountHelper.convertArrayToProductAvailabilityStatus(ep)
                updateFields({
                  enabledProducts: {
                    ...newData,
                    SLIDESHOW: enabledProducts?.SLIDESHOW,
                    TV_WELCOME_SCREEN: enabledProducts?.TV_WELCOME_SCREEN,
                  },
                })
              }}
              value={availableDefaultProductValues}
            />
          )}
          {videoProductOptions.length > 0 && (
            <CheckboxGroup
              options={videoProductOptions}
              onChange={(ep: Array<string>) => {
                const {
                  SLIDESHOW: newSlideshow,
                  TV_WELCOME_SCREEN: newTvWelcome,
                } = AccountHelper.convertArrayToProductAvailabilityStatus(ep)
                updateFields({
                  enabledProducts: {
                    SLIDESHOW: newSlideshow,
                    TV_WELCOME_SCREEN: newTvWelcome,
                    BOOKLET: enabledProducts?.BOOKLET,
                    SIDED_CARD: enabledProducts?.SIDED_CARD,
                    BOOKMARK: enabledProducts?.BOOKMARK,
                    THANK_YOU_CARD: enabledProducts?.THANK_YOU_CARD,
                    PHOTOBOOK: enabledProducts?.PHOTOBOOK,
                  },
                })
              }}
              value={AccountHelper.convertProductAvailabilityStatusToArray(
                enabledProducts,
              )}
            />
          )}
        </CollapseBox>
      )}
    </StyledCreateCaseForm>
  )
}
