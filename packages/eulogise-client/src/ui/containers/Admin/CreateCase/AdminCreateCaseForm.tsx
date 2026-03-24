import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  FormHelper,
  ICreatCaseFormFields,
  FormContext,
} from '@eulogise/client-components'
import { useEulogiseDispatch } from '../../../store/hooks'
import { CreateCaseForm } from '../../CreateCaseForm/CreateCaseForm'
import { STYLE } from '@eulogise/client-core'
import { createNewCaseFromCreateCaseForm } from '../../../store/AuthState/actions'
import { NavigationHelper } from '@eulogise/helpers'
import {
  EulogiseCountry,
  EulogisePage,
  INITIAL_DEFAULT_PRODUCTS,
} from '@eulogise/core'
import { IClientFamilyInviteOptions } from '@eulogise/core'
import { EulogiseUserRole } from '@eulogise/core'

interface ICreateClientForm {
  initialData: any
  caseId: string
}

const ButtonContainer = styled.div`
  margin: ${STYLE.GUTTER} 0;
`

const DEFAULT_ADMIN_CREATE_FAMILY_INVITE_OPTIONS = [
  IClientFamilyInviteOptions.EDITOR,
  IClientFamilyInviteOptions.CONTRIBUTOR,
  IClientFamilyInviteOptions.COEDITOR,
  IClientFamilyInviteOptions.DO_NOT_SEND_EMAIL,
]

const AdminCreateCaseForm: React.FunctionComponent<ICreateClientForm> = () => {
  const dispatch = useEulogiseDispatch()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false)

  const [fields, setFields] = useState<ICreatCaseFormFields>({
    name: '',
    email: '',
    deceasedName: '',
    dateOfService: '',
    dateOfBirth: '',
    dateOfDeath: '',
    location: '',
    serviceStartTime: '',
    role: EulogiseUserRole.EDITOR,
    enabledProducts: INITIAL_DEFAULT_PRODUCTS,
  })

  const submit = () => {
    setIsFormDirty(true)
    dispatch(
      createNewCaseFromCreateCaseForm({
        fields,
        onCreating: () => {
          setIsCreating(true)
        },
        onCreated: () => {
          setIsCreating(false)
          NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_CASES)
        },
        onFailed: () => {
          setIsCreating(false)
        },
      }),
    )
  }

  return (
    <FormContext.Provider value={{ isFormDirty }}>
      <CreateCaseForm
        isAdminForm
        fields={fields}
        onChange={(fds) => setFields(fds)}
        onSubmit={(ev) => {
          ev.preventDefault()
          submit()
        }}
        createCaseFamilyInviteOptions={
          DEFAULT_ADMIN_CREATE_FAMILY_INVITE_OPTIONS
        }
      />
      <ButtonContainer>
        <Button
          disabled={isCreating || !FormHelper.validateCreateNewCase(fields)}
          noMarginLeft
          buttonType={ButtonType.PRIMARY}
          onClick={() => {
            submit()
          }}
        >
          Create
        </Button>
      </ButtonContainer>
    </FormContext.Provider>
  )
}

export default AdminCreateCaseForm
