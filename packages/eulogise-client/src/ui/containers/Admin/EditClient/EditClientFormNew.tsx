import React, { useEffect, useRef, useState } from 'react'
import { CreateOrEditClientFormNew } from '../Client/CreateOrEditClientFormNew'
import {
  IEulogiseClient,
  IEulogiseUser,
  EulogiseCountry,
  EulogiseUserRole,
} from '@eulogise/core'
import { useEulogiseDispatch } from '../../../store/hooks'
import { IClientFormSubmitValuesNew } from '../Client/ClientForm.types'
import {
  fetchClientByClientId,
  fetchUsersByClientId,
  updateClientById,
} from '../../../store/AdminState/actions'
import { Notification, Spin } from '@eulogise/client-components'
import { getClientAssetUploadResponse } from '../../../helpers/AdminHelper'
import { IClientFamilyInviteOptions } from '@eulogise/core'
import { IClientData } from '@eulogise/core'
import {
  fetchBrandAssetsByClientId,
  saveBrandFromFilestack,
} from '../../../store/AssetState/actions'
import { PickerFileMetadata } from 'filestack-js'

type EditClientFormProps = {
  clientId: string
}

export const EditClientFormNew = ({ clientId }: EditClientFormProps) => {
  const dispatch = useEulogiseDispatch()
  const formRef = useRef()
  const [client, setClient] = useState<IEulogiseClient>()
  const [funeralDirectors, setFuneralDirectors] = useState<
    Array<IEulogiseUser>
  >([])
  const [isLoadingFuneralDirectors, setIsLoadingFuneralDirectors] =
    useState<boolean>(false)

  useEffect(() => {
    if (!clientId) {
      throw new Error('clientId is not defined')
    }
    dispatch(
      fetchClientByClientId({
        clientId,
        onSuccess: (c) => {
          setClient(c)
        },
      }),
    )
    setIsLoadingFuneralDirectors(true)
    dispatch(
      fetchUsersByClientId({
        clientId,
        onSuccess: (users) => {
          setIsLoadingFuneralDirectors(false)
          setFuneralDirectors(users)
        },
      }),
    )
    dispatch(fetchBrandAssetsByClientId({ clientId }))
  }, [clientId])

  if (!client) {
    return <Spin />
  }

  const onFormSubmit = async (values: IClientFormSubmitValuesNew) => {
    const { clientLogoDragger, clientEmailAssetDragger, clientBrandsDragger } =
      values

    let newClientBrandHandle: any = null
    let newClientBrandUploadedRes: PickerFileMetadata

    const { filename: newLogoFilename } = await getClientAssetUploadResponse(
      clientLogoDragger,
      `logos`,
    )
    const { filename: newEmailAssetFilename } =
      await getClientAssetUploadResponse(clientEmailAssetDragger, `emailAssets`)

    if (clientBrandsDragger) {
      const { filestackHandle: newClientBrandFilestackHandle, uploadedRes } =
        await getClientAssetUploadResponse(clientBrandsDragger, `brands`)
      newClientBrandHandle = newClientBrandFilestackHandle
      newClientBrandUploadedRes = uploadedRes as PickerFileMetadata
    }

    const clientData = {
      ...values,
      ...(funeralDirectors.length > 0
        ? { users: funeralDirectors.map((fd) => fd.id) }
        : {}),
      funeralDirectors,
      clientBrandHandles: newClientBrandHandle
        ? [...(client?.clientBrandHandles ?? []), newClientBrandHandle]
        : [...(client?.clientBrandHandles ?? [])],
      ...(newLogoFilename ? { logo: newLogoFilename } : {}),
      ...(newEmailAssetFilename
        ? { clientEmailAsset: newEmailAssetFilename }
        : {}),
    }

    delete clientData?.clientBrandsDragger
    dispatch(
      updateClientById({
        clientId,
        clientData,
        onSuccess: () => {
          if (newClientBrandHandle && newClientBrandUploadedRes) {
            dispatch(
              saveBrandFromFilestack({
                client: clientId,
                file: newClientBrandUploadedRes,
              }),
            )
          }
          dispatch(
            fetchClientByClientId({
              clientId,
              onSuccess: (c) => {
                dispatch(fetchBrandAssetsByClientId({ clientId }))
                setClient(c)
              },
            }),
          )
          Notification.success('Client updated successfully')
        },
      }),
    )
  }

  const decodePrimaryAddressArray = (primaryAddress: Array<string>) => {
    if (!primaryAddress) {
      return {}
    }
    return {
      primaryAddressLine1: primaryAddress[0],
      primaryAddressLine2: primaryAddress[1],
      primaryAddressLine3: primaryAddress[2],
    }
  }

  const decodeAdditionalAddressArrays = (
    additionalAddress: Array<Array<string>>,
  ) => {
    if (!additionalAddress) {
      return {}
    }
    const additionalAddressAmount = additionalAddress?.length ?? 0
    let decodedAdditionalAddress: any = {}
    for (let index = 0; index < additionalAddressAmount; index++) {
      for (let lineIndex = 0; lineIndex < 3; lineIndex++) {
        let lineKey = `additionalAddress${index + 1}Line${lineIndex + 1}`
        decodedAdditionalAddress[lineKey] =
          additionalAddress?.[index]?.[lineIndex]
      }
    }
    return decodedAdditionalAddress
  }

  return (
    <CreateOrEditClientFormNew
      initialValues={{
        title: client.title,
        additionalAddress: client.additionalAddress,
        country: client.country ?? EulogiseCountry.AUSTRALIA,
        createCaseFamilyInviteOptions: client.createCaseFamilyInviteOptions ?? [
          IClientFamilyInviteOptions.EDITOR,
        ],
        defaultClientSignUpText: client.defaultClientSignUpText,
        clientSignUpDefaultUserRole:
          client.clientSignUpDefaultUserRole ?? EulogiseUserRole.COEDITOR,
        clientBrandHandles: client.clientBrandHandles ?? [],
        ...decodePrimaryAddressArray(client.primaryAddress!),
        ...decodeAdditionalAddressArrays(client.additionalAddress),
        defaultProducts: client.defaultProducts,
        availableProducts: client.availableProducts,
        embeddedIframes: client.embeddedIframes,
        features: client.features,
        handle: client.handle,
        allowPurchasing: client.allowPurchasing,
        editorPaymentConfig: client.editorPaymentConfig,
      }}
      initialAdditionalAddressAmount={client.additionalAddress?.length ?? 0}
      formRef={formRef}
      clientId={clientId}
      funeralDirectors={funeralDirectors}
      isLoadingFuneralDirectors={isLoadingFuneralDirectors}
      clientLogo={client.logo}
      clientEmailAsset={client?.clientEmailAsset}
      onFormSubmit={async (values) => {
        await onFormSubmit(values)
      }}
      onRemoveFuneralDirector={(user: IEulogiseUser) => {
        setFuneralDirectors(funeralDirectors.filter((fd) => fd.id !== user.id))
      }}
      onChangeFuneralDirector={(user: IEulogiseUser) => {
        setFuneralDirectors(
          funeralDirectors.map((fd) => (fd.id === user.id ? user : fd)),
        )
      }}
      onCreatedFuneralDirector={(user: IEulogiseUser) => {
        setFuneralDirectors([user, ...funeralDirectors])
        console.log('form ref', formRef)
        setTimeout(() => {
          formRef.current?.submit()
        }, 500)
      }}
      submitText="Save"
      isCountryDisabled={true}
      client={client}
      onSetClient={(c: IClientData) => setClient(c)}
    />
  )
}
