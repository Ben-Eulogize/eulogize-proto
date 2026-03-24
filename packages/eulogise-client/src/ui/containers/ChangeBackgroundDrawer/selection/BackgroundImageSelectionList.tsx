import React, { useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  useBackgroundImageState,
  useCaseState,
  useDrawerState,
  useEulogiseDispatch,
} from '../../../store/hooks'
import {
  EulogiseProduct,
  IDrawerState,
  ICaseState,
  EulogiseRegion,
  IEulogiseCategory,
  ICardProductBackgroundImageBase,
  ChangeBackgroundImageDrawerOptions,
  ICardProductBackgroundImage,
} from '@eulogise/core'
import { BackgroundImageHelper } from '@eulogise/helpers'
import { fetchBackgroundImagesAction } from '../../../store/BackgroundImageState/actions'
import { Spin } from '@eulogise/client-components'
import { BackgroundImageSelectionRow } from './BackgroundImageSelectionRow'

interface IBackgroundImageSelectionListProps {
  onApply: (
    product: EulogiseProduct,
    selectedBackgroundImage: ICardProductBackgroundImage,
  ) => void
  onEdit: (backgroundImage: ICardProductBackgroundImageBase) => void
}

const BackgroundImageSelectionList = ({
  onApply,
  onEdit,
}: IBackgroundImageSelectionListProps) => {
  const dispatch = useEulogiseDispatch()
  const { backgroundImages, isFetching } = useBackgroundImageState()
  const { drawerOptions }: IDrawerState = useDrawerState()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const region: EulogiseRegion = activeCase?.region ?? EulogiseRegion.AU

  useEffect(() => {
    dispatch(fetchBackgroundImagesAction())
  }, [])

  if (isFetching) {
    return <Spin />
  }

  // Step 1. Get the list of background image categories
  const categories: Array<IEulogiseCategory> =
    BackgroundImageHelper.getBackgroundImageCategories()
  // get published images
  const publishedBackgroundImages: Array<ICardProductBackgroundImageBase> =
    backgroundImages.filter(({ status }) => status === 'published')

  const changeBackgroundDrawerOptions =
    drawerOptions as ChangeBackgroundImageDrawerOptions
  const productType: EulogiseProduct =
    changeBackgroundDrawerOptions?.productType
  const slug = changeBackgroundDrawerOptions?.slug

  return categories.map((category) => (
    <BackgroundImageSelectionRow
      key={category.id}
      category={category}
      productType={productType}
      slug={slug}
      images={BackgroundImageHelper.createBackgroundImages({
        baseBackgroundImages: publishedBackgroundImages,
        region,
      })}
      onApply={onApply}
      onEdit={onEdit}
      region={region}
    />
  ))
}

export default BackgroundImageSelectionList
