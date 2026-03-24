import React, { useState } from 'react'
import { Notification } from '@eulogise/client-components'
import { useEulogiseDispatch } from '../../../store/hooks'
import { EulogisePage } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'
import {
  GenericCardProductTypeForm,
  IGenericCardProductTypeFormValues,
} from './GenericCardProductTypeForm'
import { createGenericCardProductType } from '../../../store/GenericCardProductTypeState'
import { getProductTypeAssetUploadResponse } from '../../../helpers/AdminHelper'

const CreateGenericCardProductTypeForm: React.FC = () => {
  const dispatch = useEulogiseDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: IGenericCardProductTypeFormValues) => {
    setIsSubmitting(true)

    try {
      const minPages = values.minPages
      const maxPages = values.maxPages

      // Upload product image if one was selected
      const { filename: newProductImageFilename } =
        await getProductTypeAssetUploadResponse(
          values.productImageDragger || [],
        )

      // Upload hero images for each dimension
      const dimensions = await Promise.all(
        values.dimensions.map(async (dim) => {
          const { heroImageDragger, ...dimensionData } = dim
          if (heroImageDragger && heroImageDragger.length > 0) {
            const { filename: heroFilename } =
              await getProductTypeAssetUploadResponse(heroImageDragger)
            if (heroFilename) {
              return { ...dimensionData, heroImage: heroFilename }
            }
          }
          return dimensionData
        }),
      )

      const createData = {
        name: values.name,
        slug: values.slug!,
        dimensions,
        foldType: values.foldType,
        outputFormat: values.outputFormat,
        minPages,
        maxPages,
        defaultPages: values.defaultPages,
        availability: values.availability,
        ...(newProductImageFilename
          ? { productImage: newProductImageFilename }
          : {}),
      }

      dispatch(
        createGenericCardProductType({
          data: createData,
          onSuccess: (genericCardProductType) => {
            Notification.success(
              'Generic card product type created successfully!',
            )
            NavigationHelper.navigate(
              EulogisePage.EULOGIZE_ADMIN_EDIT_GENERIC_CARD_PRODUCT_TYPE,
              {
                genericCardProductTypeId: genericCardProductType.id,
              },
            )
          },
          onFailed: (error) => {
            Notification.error(`Failed to create: ${error}`)
            setIsSubmitting(false)
          },
        }),
      )
    } catch (error: any) {
      Notification.error(`Failed to create: ${error?.message || error}`)
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    NavigationHelper.navigate(
      EulogisePage.EULOGIZE_ADMIN_GENERIC_CARD_PRODUCT_TYPES,
    )
  }

  return (
    <GenericCardProductTypeForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitButtonText="Create Print Product Type"
      isSubmitting={isSubmitting}
    />
  )
}

export default CreateGenericCardProductTypeForm
