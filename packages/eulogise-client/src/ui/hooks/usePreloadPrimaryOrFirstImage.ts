import { useEffect, useState } from 'react'
import { ImageHelper } from '@eulogise/helpers'
import {
  useAssetState,
  useCaseState,
  useEulogiseDispatch,
} from '../store/hooks'
import { MAX_CARD_PRODUCT_PHOTO_SIZE } from '@eulogise/helpers/dist/cardProduct.constants'
import { detectAssetFaces } from '../store/AssetState/actions'

export const usePreloadPrimaryOrFirstImage = () => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase } = useCaseState()
  const { images } = useAssetState()
  const [hasFaceDetected, setHasFaceDetected] = useState<boolean>(false)

  const primaryImage = activeCase?.deceased?.primaryImage
  const firstImage = images?.[0]?.content

  // Prioritize primary image, fallback to first image
  const imageToPreload = primaryImage || firstImage

  // Detect faces first (similar to PhotobookDrawer)
  useEffect(() => {
    if (!imageToPreload) {
      setHasFaceDetected(true)
      return
    }

    if (imageToPreload.faceDetection) {
      setHasFaceDetected(true)
    } else {
      const asset = images?.find(
        (i) => i.content.filestackHandle === imageToPreload.filestackHandle,
      )
      if (asset && !asset.content.faceDetection) {
        // Detect face
        dispatch(
          detectAssetFaces({
            assetId: asset.id,
            onSuccess: () => {
              setHasFaceDetected(true)
            },
          }),
        )
      } else {
        setHasFaceDetected(true)
      }
    }
  }, [imageToPreload, images, dispatch])

  // Preload image after face detection
  useEffect(() => {
    if (!hasFaceDetected || !imageToPreload) {
      return
    }

    const imageUrl = ImageHelper.getImageUrl(imageToPreload, {
      ...MAX_CARD_PRODUCT_PHOTO_SIZE,
      isFormatToJpg: true,
    })

    if (imageUrl) {
      ImageHelper.preloadImage(imageUrl, () => {
        // Image preloaded successfully
        console.log('Image preloaded:', imageUrl)
      })
    }
  }, [hasFaceDetected, imageToPreload])
}
