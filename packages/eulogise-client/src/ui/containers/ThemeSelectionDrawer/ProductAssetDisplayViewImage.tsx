import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Spin } from '@eulogise/client-components'
import { ImageHelper } from '@eulogise/helpers'
import {
  EulogiseProduct,
  PRODUCT_THUMBNAIL_SIZE,
  SLIDESHOW_THUMBNAIL_SIZE,
} from '@eulogise/core'

const CarouselImageContainer = styled.div`
  width: 100%;
  height: 100%;
`

const DEFAULT_THUMBNAIL_WIDTH = PRODUCT_THUMBNAIL_SIZE[0] / 2
const DEFAULT_THUMBNAIL_HEIGHT = PRODUCT_THUMBNAIL_SIZE[1] / 2
const ProductImage = styled.img<{ width: number; height: number }>`
  max-width: 100%;
  ${({ width, height }) => `
    width: ${width ? width : DEFAULT_THUMBNAIL_WIDTH}px;
    height: ${height ? height : DEFAULT_THUMBNAIL_HEIGHT}px;
  `}
`

const SpinContainer = styled.div<{ width: number; height: number }>`
  ${({ width, height }) => `
    width: ${width ? width : DEFAULT_THUMBNAIL_WIDTH}px;
    height: ${height ? height : DEFAULT_THUMBNAIL_HEIGHT}px;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
`

// Cache to track loaded image URLs across component remounts
const loadedImageCache = new Set<string>()

export const ProductAssetDisplayViewImage = ({
  imageUrl,
  product,
}: {
  imageUrl: string
  product: EulogiseProduct
}) => {
  // Check if this image was already loaded before
  const isAlreadyLoaded = loadedImageCache.has(imageUrl)
  const [isLoading, setIsLoading] = useState<boolean>(!isAlreadyLoaded)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const { width, height } =
    product === EulogiseProduct.SLIDESHOW ||
    product === EulogiseProduct.TV_WELCOME_SCREEN ||
    product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE
      ? {
          width: SLIDESHOW_THUMBNAIL_SIZE[0] / 2,
          height: SLIDESHOW_THUMBNAIL_SIZE[1] / 2,
        }
      : {
          width: PRODUCT_THUMBNAIL_SIZE[0] / 2,
          height: PRODUCT_THUMBNAIL_SIZE[1] / 2,
        }

  useEffect(() => {
    // If already loaded from cache, no need to check again
    if (loadedImageCache.has(imageUrl)) {
      setIsLoading(false)
      return
    }

    // Only set loading if not already in cache
    if (imageUrl) {
      setIsLoading(true)
    }

    intervalRef.current = setInterval(() => {
      ImageHelper.checkImageAvailability(imageUrl)
        .then(() => {
          loadedImageCache.add(imageUrl) // Add to cache
          setIsLoading(false)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        })
        .catch(() => {
          console.log('Image is not available')
        })
    }, 1000)

    // Cleanup interval on unmount or imageUrl change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [imageUrl])

  const imageUrlWithParams = `${imageUrl}`
  return (
    <CarouselImageContainer key={imageUrl}>
      {isLoading ? (
        <SpinContainer width={width} height={height}>
          <Spin />
        </SpinContainer>
      ) : (
        <ProductImage
          width={width}
          height={height}
          src={imageUrlWithParams}
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      )}
    </CarouselImageContainer>
  )
}
