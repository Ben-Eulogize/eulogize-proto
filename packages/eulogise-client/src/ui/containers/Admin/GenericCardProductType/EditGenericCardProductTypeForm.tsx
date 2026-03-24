import React, { useEffect, useState } from 'react'
import { Notification } from '@eulogise/client-components'
import { useEulogiseDispatch } from '../../../store/hooks'
import { EulogisePage } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'
import {
  GenericCardProductTypeForm,
  IGenericCardProductTypeFormValues,
} from './GenericCardProductTypeForm'
import {
  fetchGenericCardProductTypeById,
  updateGenericCardProductType,
} from '../../../store/GenericCardProductTypeState'
import { LoadingMessage } from '../../../components/LoadingMessage/LoadingMessage'
import { useSelector } from 'react-redux'
import { getProductTypeAssetUploadResponse } from '../../../helpers/AdminHelper'

interface IEditGenericCardProductTypeFormProps {
  genericCardProductTypeId: string
}

const EditGenericCardProductTypeForm: React.FC<
  IEditGenericCardProductTypeFormProps
> = ({ genericCardProductTypeId }) => {
  const dispatch = useEulogiseDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { activeItem: activeGenericCardProductType } = useSelector(
    (state: any) => state.genericCardProductTypes,
  )

  useEffect(() => {
    if (genericCardProductTypeId) {
      dispatch(
        fetchGenericCardProductTypeById({
          genericCardProductTypeId,
          onSuccess: () => {
            setIsLoading(false)
          },
          onFailed: (error) => {
            Notification.error(`Failed to load: ${error}`)
            setIsLoading(false)
            NavigationHelper.navigate(
              EulogisePage.EULOGIZE_ADMIN_GENERIC_CARD_PRODUCT_TYPES,
            )
          },
        }),
      )
    }
  }, [genericCardProductTypeId, dispatch])

  const handleSubmit = async (values: IGenericCardProductTypeFormValues) => {
    setIsSubmitting(true)

    try {
      const minPages = values.minPages
      const maxPages = values.maxPages

      // Upload product image if a new one was selected
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

      const updateData = {
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
        updateGenericCardProductType({
          genericCardProductTypeId,
          data: updateData,
          onSuccess: () => {
            setIsSubmitting(false)
            NavigationHelper.navigate(
              EulogisePage.EULOGIZE_ADMIN_GENERIC_CARD_PRODUCT_TYPES,
            )
          },
          onFailed: (error) => {
            Notification.error(`Failed to update: ${error}`)
            setIsSubmitting(false)
          },
        }),
      )
    } catch (error: any) {
      Notification.error(`Failed to update: ${error?.message || error}`)
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    NavigationHelper.navigate(
      EulogisePage.EULOGIZE_ADMIN_GENERIC_CARD_PRODUCT_TYPES,
    )
  }

  if (isLoading) {
    return <LoadingMessage />
  }

  if (!activeGenericCardProductType) {
    return <div>Generic card product type not found</div>
  }

  return (
    <GenericCardProductTypeForm
      currentProductType={activeGenericCardProductType}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitButtonText="Update Print Product Type"
      isSubmitting={isSubmitting}
    />
  )
}

export default EditGenericCardProductTypeForm
