import React, { useEffect, useState } from 'react'
import {
  ICreatCaseFormFields,
  FormContext,
  Select,
} from '@eulogise/client-components'
import {
  useAuthState,
  useClientState,
  useEulogiseDispatch,
} from '../../store/hooks'
import { createNewCaseFromCreateCaseForm } from '../../store/AuthState/actions'
import {
  IAuthState,
  IClientState,
  EulogiseUserRole,
  INITIAL_DEFAULT_PRODUCTS,
} from '@eulogise/core'
import { EulogiseCountry } from '@eulogise/core'
import { CreateCaseForm } from '../CreateCaseForm/CreateCaseForm'
import { IClientFamilyInviteOptions } from '@eulogise/core'
import { joinClientAddressLines } from '../../helpers/AdminHelper'
import { FormHelper } from '@eulogise/client-components'
import { CaseHelper } from '@eulogise/helpers'

interface IClientCreateCaseFormProps {
  formRef?: any
  onCreated: () => void
  onCreating: () => void
  onFailed: () => void
  setIsFormValid: (isValid: boolean) => void
}

const ClientCreateCaseForm = ({
  formRef,
  onCreated,
  onCreating,
  onFailed,
  setIsFormValid,
}: IClientCreateCaseFormProps) => {
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false)
  const { activeItem: activeClient }: IClientState = useClientState()
  const clientUser: string = account?.fullName!
  const funeralHome: string = activeClient?.title!
  const clientCountry: EulogiseCountry = activeClient?.country!
  const primaryAddressArray: Array<string> = activeClient?.primaryAddress ?? []
  const additionalAddressArrays: Array<Array<string>> =
    activeClient?.additionalAddress ?? []
  const createCaseFamilyInviteOptions =
    activeClient?.createCaseFamilyInviteOptions ?? [
      IClientFamilyInviteOptions.EDITOR,
    ]
  const [fields, setFields] = useState<ICreatCaseFormFields>({
    name: '',
    email: '',
    deceasedName: '',
    dateOfService: '',
    dateOfBirth: '',
    dateOfDeath: '',
    location: '',
    serviceStartTime: '',
    country: clientCountry,
    enabledProducts: {
      ...(activeClient?.defaultProducts ?? INITIAL_DEFAULT_PRODUCTS),
      // DISABLED PHOTOBOOK
      // PHOTOBOOK: false,
    },
  })

  const getPrefilledClientAddressListOptions = ({
    primaryAddressArray,
    additionalAddressArray,
  }: {
    primaryAddressArray: Array<string>
    additionalAddressArray: Array<Array<string>>
  }): Select.Options => {
    let prefilledClientAddressListOptions = []
    if (primaryAddressArray?.length > 0) {
      const primaryAddressLineOne = primaryAddressArray?.[0] ?? ''
      prefilledClientAddressListOptions.push({
        value: primaryAddressLineOne,
        label: primaryAddressLineOne,
      })
    }
    if (additionalAddressArray?.length > 0) {
      additionalAddressArray?.forEach((additionalAddressArray) => {
        const additionalAddressLineOne = additionalAddressArray?.[0] ?? ''
        prefilledClientAddressListOptions.push({
          value: additionalAddressLineOne,
          label: additionalAddressLineOne,
        })
      })
    }
    return prefilledClientAddressListOptions
  }

  const getDynamicLoadedAddressesObj = ({
    primaryAddressArray = [],
    additionalAddressArrays = [],
  }: {
    primaryAddressArray: Array<string>
    additionalAddressArrays: Array<Array<string>>
  }): Record<string, string> => {
    let addressObj = {}
    if (primaryAddressArray?.length > 0) {
      const fullPrimaryAddress = joinClientAddressLines(
        primaryAddressArray,
        ' ',
      )
      const key: string = primaryAddressArray?.[0]!
      Object.assign(addressObj, { [key]: fullPrimaryAddress })
    }
    if (additionalAddressArrays?.length > 0) {
      additionalAddressArrays.forEach(
        (additionalAddressArray: Array<string>) => {
          const fullAdditionalAddress = joinClientAddressLines(
            additionalAddressArray,
            ' ',
          )
          const key: string = additionalAddressArray?.[0]!
          Object.assign(addressObj, { [key]: fullAdditionalAddress })
        },
      )
    }
    return addressObj
  }

  const prefilledClientAddressListOptions =
    getPrefilledClientAddressListOptions({
      primaryAddressArray,
      additionalAddressArray: additionalAddressArrays,
    })

  const { isValid } = FormHelper.validateCreateNewCase(fields)

  return (
    <FormContext.Provider value={{ isFormDirty }}>
      <CreateCaseForm
        region={CaseHelper.getRegionByCountry({ country: clientCountry })}
        formRef={formRef}
        fields={fields}
        country={clientCountry}
        onChange={(fds: ICreatCaseFormFields) => {
          const { isValid } = FormHelper.validateCreateNewCase(fds)
          setFields(fds)
          setIsFormValid(isValid)
        }}
        onSubmit={(ev: any) => {
          ev.preventDefault()
          setIsFormDirty(true)
          dispatch(
            createNewCaseFromCreateCaseForm({
              fields,
              clientUser,
              funeralHome,
              onCreating,
              onCreated,
              onFailed,
            }),
          )
        }}
        prefilledClientAddressListOptions={prefilledClientAddressListOptions}
        createCaseFamilyInviteOptions={createCaseFamilyInviteOptions}
        dynamicLoadedAddressObj={getDynamicLoadedAddressesObj({
          primaryAddressArray,
          additionalAddressArrays,
        })}
        formValid={isValid}
      />
    </FormContext.Provider>
  )
}

export default ClientCreateCaseForm
