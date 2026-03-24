import { EulogiseImageSize, GetImageObject } from '@eulogise/core'
import { ImageHelper } from '@eulogise/helpers'
import { useEffect, useState } from 'react'

export const useGetImageSize = ({
  image,
}: {
  image: GetImageObject
}): EulogiseImageSize | undefined => {
  const [actualImageSize, setActualImageSize] = useState<EulogiseImageSize>()
  useEffect(() => {
    const calculateImageSize = async () => {
      const { width: actualWidth, height: actualHeight } =
        await ImageHelper.getImageSize(image)
      setActualImageSize({ width: actualWidth, height: actualHeight })
    }
    calculateImageSize()
  }, [image])
  return actualImageSize
}
