import { AssetHelper } from '@eulogise/helpers'
import { useAssetState, useCaseState } from '../store/hooks'
import { IImageAsset } from '@eulogise/core'

export const useCustomisedImageOrder = () => {
  const { images } = useAssetState()
  const { activeItem: activeCase } = useCaseState()
  const customisedImagesOrderIds = activeCase?.customisedImagesOrderIds ?? []
  const orderedImages = AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
    images ?? [],
    customisedImagesOrderIds!,
  ) as Array<IImageAsset>
  return { orderedImages }
}
