import {
  Button,
  ButtonType,
  Checkbox,
  Select,
} from '@eulogise/client-components'
import { STYLE } from '@eulogise/client-core'
import {
  AVAILABLE_DATE_FORMATS,
  BOOKLET_FONTS,
  EulogiseRegion,
  EulogiseUserRole,
  IEulogiseCategory,
  IThemeCommon,
  TemplateDesignDetailsFormFields,
  THEME_CATEGORIES,
} from '@eulogise/core'
import { AutoComplete, Typography } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import styled from 'styled-components'
import { WarningOutlined } from '@ant-design/icons'
import { useAuthState, useThemeState } from '../../store/hooks'

const themeCategories = THEME_CATEGORIES.map((theme: IEulogiseCategory) => ({
  label: theme.name,
  value: theme.id,
}))

const StyledTitle = styled.div`
  font-size: ${STYLE.HEADING_FONT_SIZE_MEDIUM};
`

const StyledDesignForm = styled.div`
  margin-top: 1rem;
`

const StyledDesignFormField = styled.div`
  margin-bottom: 1rem;
  width: 200px;
`

const StyledDesignFormFieldLabel = styled.div``
const StyledDesignFormFieldInput = styled.div`
  width: 100%;
`
const StyledDesignFormFieldSubText = styled.div`
  color: lightgrey;
`

interface IAntSelectOption {
  label: string
  value: string
}

const availableFonts: IAntSelectOption[] = BOOKLET_FONTS.map((font) => ({
  label: font.name,
  value: font.id,
}))

interface ITemplateDesignDetailsProps {
  title: string
  isCreating: boolean
  isUpdating: boolean
  fields: TemplateDesignDetailsFormFields
  onFieldsChange: (fields: TemplateDesignDetailsFormFields) => void
  onSaveClick: () => void
  region: EulogiseRegion
}

const TemplateDesignDetails: React.FunctionComponent<
  ITemplateDesignDetailsProps
> = ({
  title,
  isCreating,
  isUpdating,
  fields,
  onFieldsChange,
  onSaveClick,
  region,
}) => {
  const { themes } = useThemeState()
  const [themeFilterValue, setThemeFilterValue] = useState('')
  const { account } = useAuthState()
  const role = account?.role!

  const matchedThemes = themes.filter((t) => {
    const isGlobalTheme = t.clientId === undefined
    // only Admin user can see global themes in the Theme Name dropdown
    if (isGlobalTheme) {
      return (
        role === EulogiseUserRole.ADMIN &&
        new RegExp(themeFilterValue ?? '', 'i').test(t.name)
      )
    }
    // client themes
    return new RegExp(themeFilterValue ?? '', 'i').test(t.name)
  })

  const isUpdatingExistingTheme = !!fields.id

  const updateFields = (
    newFields: Partial<IThemeCommon & { overwriteThumbnail: boolean }>,
  ) => {
    onFieldsChange({
      ...fields,
      ...newFields,
    })
  }

  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      <StyledDesignForm>
        <StyledDesignFormField>
          <StyledDesignFormFieldLabel>Theme Name</StyledDesignFormFieldLabel>
          <StyledDesignFormFieldInput>
            <AutoComplete
              placeholder="Theme Name"
              style={{ width: '100%' }}
              dropdownStyle={{ zIndex: 9999 }}
              allowClear
              options={matchedThemes.map((t) => ({
                label: t.name,
                value: t.name,
                key: t.id,
              }))}
              onChange={(name) => {
                const theme = themes.find((t) => {
                  const isGlobalTheme = t.clientId === undefined
                  // if it is global theme, only Admin user can update it
                  if (isGlobalTheme) {
                    return role === EulogiseUserRole.ADMIN && t.name === name
                  }
                  // if it is client themes, only client or admin user can update it
                  return (
                    (role === EulogiseUserRole.CLIENT ||
                      role === EulogiseUserRole.ADMIN) &&
                    t.name === name
                  )
                })
                // updating existing theme
                if (theme) {
                  updateFields({ ...theme })
                }
                // new theme name
                else {
                  // set id to undefined since we are creating a new theme
                  updateFields({ name, id: undefined })
                }
              }}
              onSearch={(value) => setThemeFilterValue(value)}
              value={fields.name}
            />
          </StyledDesignFormFieldInput>
        </StyledDesignFormField>
        {role === EulogiseUserRole.ADMIN && (
          <StyledDesignFormField>
            <StyledDesignFormFieldLabel>
              Theme Categories
            </StyledDesignFormFieldLabel>
            <StyledDesignFormFieldInput>
              <Select
                mode="multiple"
                placeholder="Select Theme Categories"
                options={themeCategories}
                style={{ width: '100%' }}
                allowClear
                value={fields.categories}
                onChange={(_, selectedItems) => {
                  updateFields({
                    categories: (selectedItems as Array<any>).map(
                      (i) => i.value,
                    ),
                  })
                }}
              />
            </StyledDesignFormFieldInput>
          </StyledDesignFormField>
        )}
        <StyledDesignFormField>
          <StyledDesignFormFieldLabel>Base Font</StyledDesignFormFieldLabel>
          <StyledDesignFormFieldInput>
            <Select
              placeholder="Default Font for Text"
              options={availableFonts}
              dropdownStyle={{ zIndex: 9999 }}
              style={{ width: '100%' }}
              value={fields.baseFont}
              onChange={(value) => updateFields({ baseFont: value })}
            />
          </StyledDesignFormFieldInput>
        </StyledDesignFormField>
        {region === EulogiseRegion.USA ? (
          <StyledDesignFormField id="date-format-usa">
            <StyledDesignFormFieldLabel>Date Format</StyledDesignFormFieldLabel>
            <StyledDesignFormFieldInput>
              <Select
                placeholder="Choose a Date Format"
                style={{ width: '100%' }}
                dropdownStyle={{ zIndex: 9999 }}
                options={AVAILABLE_DATE_FORMATS}
                value={fields.dateFormatUS}
                onChange={(value) => {
                  updateFields({ dateFormatUS: value })
                }}
              />
            </StyledDesignFormFieldInput>
            {fields.dateFormatUS && (
              <StyledDesignFormFieldSubText>
                e.g. {moment().format(fields.dateFormatUS)}
              </StyledDesignFormFieldSubText>
            )}
          </StyledDesignFormField>
        ) : (
          <StyledDesignFormField id="date-format-au">
            <StyledDesignFormFieldLabel>Date Format</StyledDesignFormFieldLabel>
            <StyledDesignFormFieldInput>
              <Select
                placeholder="Choose a Date Format"
                style={{ width: '100%' }}
                dropdownStyle={{ zIndex: 9999 }}
                options={AVAILABLE_DATE_FORMATS}
                value={fields.dateFormat}
                onChange={(value) => {
                  updateFields({ dateFormat: value })
                }}
              />
            </StyledDesignFormFieldInput>
            {fields.dateFormat && (
              <StyledDesignFormFieldSubText>
                e.g. {moment().format(fields.dateFormat)}
              </StyledDesignFormFieldSubText>
            )}
          </StyledDesignFormField>
        )}
        {!isUpdatingExistingTheme ? (
          <Button
            buttonType={ButtonType.PRIMARY}
            loading={isCreating || isUpdating}
            tooltip="Save Layout to New Theme"
            noMarginLeft={true}
            disabled={!fields.name}
            onClick={() => onSaveClick()}
          >
            Save Layout to New Theme
          </Button>
        ) : (
          <>
            <Button
              buttonType={ButtonType.PRIMARY}
              loading={isCreating || isUpdating}
              disabled={!fields.name}
              tooltip="Update Layout in Existing Theme"
              noMarginLeft={true}
              onClick={() => onSaveClick()}
            >
              Update Layout in Existing Theme
            </Button>
            <br />
            <br />
            <StyledDesignFormField>
              <Checkbox
                checked={fields.overwriteThumbnail}
                onChange={(ev: any) =>
                  updateFields({ overwriteThumbnail: ev.target.checked })
                }
              >
                Overwrite Thumbnail?
              </Checkbox>
            </StyledDesignFormField>
            {fields.overwriteThumbnail && (
              <Typography.Text type="danger">
                <WarningOutlined /> This will overwrite existing layout!
              </Typography.Text>
            )}
          </>
        )}
      </StyledDesignForm>
    </>
  )
}

export default TemplateDesignDetails
