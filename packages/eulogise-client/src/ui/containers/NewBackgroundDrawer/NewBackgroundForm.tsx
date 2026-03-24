import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import {
  FormContext,
  Select,
  TextField,
  FormHelper,
  Button,
  Radio,
  RadioGroup,
  ButtonType,
} from '@eulogise/client-components'
import {
  BACKGROUND_IMAGE_CATEGORIES,
  BackgroundRestrictions,
  EulogiseUserRole,
  INewBackgroundFormFields,
} from '@eulogise/core'
import { STYLE } from '@eulogise/client-core'
import { NewBackgroundFormRules } from '@eulogise/client-components/dist/Form/types/NewBackgroundForm.types'
import { useAuthState, useCaseState, useClientState } from '../../store/hooks'

const StyledNewBackgroundForm = styled.form``

const StyledTitle = styled.div`
  font-size: ${STYLE.HEADING_FONT_SIZE_MEDIUM};
  text-align: center;
  margin: ${STYLE.GUTTER} 0;
`

const StyledRadioGroup = styled(RadioGroup)`
  margin: 0.5rem 0 2rem;
`

type INewBackgroundFormProps = {
  isDeletable?: boolean
  onDelete?: () => void
  isEditing?: boolean
  isUpdating?: boolean
  fields: INewBackgroundFormFields
  onFieldsChange: (fields: INewBackgroundFormFields) => void
  onSave: () => void
  onSaveAndApply: () => void
}

export const NewBackgroundForm = ({
  isEditing,
  fields,
  isDeletable,
  isUpdating,
  onDelete,
  onFieldsChange,
  onSave,
  onSaveAndApply,
}: INewBackgroundFormProps) => {
  const { account } = useAuthState()
  const { activeItem: activeCase } = useCaseState()
  const { activeItem: activeClient } = useClientState()
  const deceasedName = activeCase?.deceased?.fullName
  const clientName = activeClient?.title
  const role = account?.role!
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false)
  const updateFields = (newFields: Partial<INewBackgroundFormFields>) => {
    onFieldsChange({
      ...fields,
      ...newFields,
    })
  }

  const validateForm = (onValid: () => void) => {
    const { isValid } = FormHelper.validateNewBackgroundForm(fields)
    setIsFormDirty(true)
    if (isValid) {
      onValid()
      // dispatch create background event
      setIsFormDirty(false)
    }
  }

  const save = () => {
    validateForm(() => onSave())
  }

  const saveAndApply = () => {
    validateForm(() => onSaveAndApply())
  }

  return (
    <FormContext.Provider value={{ isFormDirty }}>
      <StyledNewBackgroundForm>
        <StyledTitle>Background Details</StyledTitle>
        <TextField
          labelText="Background Name"
          value={fields.name}
          rules={NewBackgroundFormRules.name}
          required
          onChange={(_: any, value: string) => {
            updateFields({ name: value })
          }}
        />
        {role === EulogiseUserRole.ADMIN && (
          <Select
            mode="multiple"
            labelText="Categories"
            options={BACKGROUND_IMAGE_CATEGORIES.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
            style={{ width: '100%' }}
            value={fields.categoryIds}
            onChange={(_: any, selectedItems: Array<any>) => {
              updateFields({
                categoryIds: selectedItems.map((i) => i.value),
              })
            }}
          />
        )}
        {role === EulogiseUserRole.CLIENT && (
          <StyledRadioGroup labelText="Allow background to be used by">
            <Radio
              checked={
                fields.restrictions === BackgroundRestrictions.CLIENT_BASE
              }
              onClick={() =>
                updateFields({
                  restrictions: BackgroundRestrictions.CLIENT_BASE,
                })
              }
            >
              All {clientName} users
            </Radio>
            <Radio
              checked={
                fields.restrictions === BackgroundRestrictions.CUSTOMER_BASE
              }
              onClick={() =>
                updateFields({
                  restrictions: BackgroundRestrictions.CUSTOMER_BASE,
                })
              }
            >
              {deceasedName} case only
            </Radio>
          </StyledRadioGroup>
        )}
        <Row justify="space-between">
          <Col>
            {isEditing && isDeletable ? (
              <Button
                noMarginLeft
                loading={isUpdating}
                buttonType={ButtonType.DANGER}
                onClick={onDelete}
              >
                Delete Background
              </Button>
            ) : null}
          </Col>
          <Col>
            <Button
              buttonType={ButtonType.TRANSPARENT}
              disabled={!fields.name || fields.name?.trim().length === 0}
              onClick={save}
              loading={isUpdating}
              noMarginLeft
              noMarginRight
            >
              {isEditing ? 'Save' : 'Create'}
            </Button>
            <Button
              disabled={!fields.name || fields.name?.trim().length === 0}
              noMarginRight
              loading={isUpdating}
              onClick={saveAndApply}
            >
              {isEditing ? 'Save & Apply' : 'Create & Apply'}
            </Button>
          </Col>
        </Row>
      </StyledNewBackgroundForm>
    </FormContext.Provider>
  )
}
