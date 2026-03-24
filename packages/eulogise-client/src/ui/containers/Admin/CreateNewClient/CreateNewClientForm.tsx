import React from 'react'
import { Notification } from '@eulogise/client-components'
import { useEulogiseDispatch } from '../../../store/hooks'
import {
  AllowPurchasingProductOptionKey,
  EulogisePage,
  EulogiseProduct,
  EulogizeShippingAvailableCountries,
  PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES,
} from '@eulogise/core'
import { restoreInitialStateWhenChangePage } from '../../../store/AdminState/actions'
import { clientRequestBodyBuilderNew } from '../../../helpers/AdminHelper'
import RequestHelper from '../../../helpers/RequestHelper'
import { EulogiseResource } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'
import { CreateOrEditClientFormNew } from '../Client/CreateOrEditClientFormNew'
import { IClientFormSubmitValuesNew } from '../Client/ClientForm.types'
import { getClientAssetUploadResponse } from '../../../helpers/AdminHelper'
import { saveBrandFromFilestack } from '../../../store/AssetState/actions'
import { PickerFileMetadata } from 'filestack-js'

interface ICreateEditClientFormProps {}

const CreateNewClientForm: React.FunctionComponent<
  ICreateEditClientFormProps
> = () => {
  const dispatch = useEulogiseDispatch()

  const onFormSubmit = async (values: IClientFormSubmitValuesNew) => {
    const {
      title,
      handle,
      primaryAddress,
      additionalAddress,
      country,
      createCaseFamilyInviteOptions = [],
      clientLogoDragger,
      clientEmailAssetDragger,
      clientBrandsDragger,
      defaultProducts,
      availableProducts,
      allowPurchasing,
    } = values

    let newClientBrandHandle
    let newClientBrandUploadedRes

    try {
      const countryLabel = country ?? 'the selected country'
      const isPrintingShippable = Boolean(
        country && EulogizeShippingAvailableCountries.includes(country),
      )
      const isPrintingPurchasingEnabled =
        Boolean(
          allowPurchasing?.printing?.[
            AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
          ],
        ) ||
        Boolean(
          allowPurchasing?.printing?.[
            AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER
          ],
        )
      if (!isPrintingShippable && isPrintingPurchasingEnabled) {
        Notification.error(
          `Printing is not shippable in ${countryLabel}. Please untick Printing availability in allowing purchase section`,
        )
        return
      }

      const isPhotobookShippable = Boolean(
        country && PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country),
      )
      const isPhotobookPurchasingEnabled =
        Boolean(
          allowPurchasing?.photoBooks?.[
            AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
          ],
        ) ||
        Boolean(
          allowPurchasing?.photoBooks?.[
            AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER
          ],
        )
      const isPhotobookAvailable = Boolean(
        availableProducts?.[EulogiseProduct.PHOTOBOOK],
      )
      const isPhotobookDefault = Boolean(
        defaultProducts?.[EulogiseProduct.PHOTOBOOK],
      )
      if (
        !isPhotobookShippable &&
        (isPhotobookAvailable ||
          isPhotobookDefault ||
          isPhotobookPurchasingEnabled)
      ) {
        Notification.error(
          `Photobooks are not shippable in ${countryLabel}. Please untick Photobook avaibility in both allowing purchase and tributes sections`,
        )
        return
      }

      const { filename: newLogoFilename } = await getClientAssetUploadResponse(
        clientLogoDragger,
        `logos`,
      )
      const { filename: newEmailAssetFilename } =
        await getClientAssetUploadResponse(
          clientEmailAssetDragger,
          `emailAssets`,
        )

      if (clientBrandsDragger) {
        const { filestackHandle: newClientBrandFilestackHandle, uploadedRes } =
          await getClientAssetUploadResponse(clientBrandsDragger, `brands`)
        newClientBrandHandle = newClientBrandFilestackHandle
        newClientBrandUploadedRes = uploadedRes
      }

      const clientRequestBody = clientRequestBodyBuilderNew({
        title,
        handle,
        primaryAddress,
        additionalAddress,
        country: country!,
        createCaseFamilyInviteOptions,
        clientBrandHandles: newClientBrandHandle ? [newClientBrandHandle] : [],
        invitedFuneralDirectorIds: [],
        signUpNewFuneralDirectorIDs: [''],
        originalLogoFilename: '',
        originalEmailAssetFilename: '',
        newLogoFilename,
        newEmailAssetFilename,
        defaultProducts,
        availableProducts,
      })

      // create client
      const { data } = await RequestHelper.saveResourceRequest(
        EulogiseResource.CLIENT,
        clientRequestBody,
      )

      const clientId = data.item.id

      if (newClientBrandHandle && newClientBrandUploadedRes) {
        dispatch(
          saveBrandFromFilestack({
            client: clientId,
            file: newClientBrandUploadedRes as PickerFileMetadata,
          }),
        )
      }

      dispatch(restoreInitialStateWhenChangePage())
      Notification.success('Client created successfully!')
      NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_EDIT_CLIENT, {
        clientId,
      })
    } catch (error) {
      console.log(`Client created failed!, error ->`, error)
      Notification.error('Client created failed!')
      return
    }
  }

  return (
    <CreateOrEditClientFormNew
      onFormSubmit={onFormSubmit}
      isCountryDisabled={false}
    />
  )
}

export default CreateNewClientForm
