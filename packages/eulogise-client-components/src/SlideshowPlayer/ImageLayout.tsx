import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ImageFilterType, ISlideshowBorderSettings } from '@eulogise/core'
import { ImageHelper } from '@eulogise/helpers'
import { SLIDESHOW_FILTERS } from '@eulogise/client-core'
import { Spin } from '../Spin'

interface IImageLayoutProps {
  filter?: ImageFilterType
  blurred?: boolean | [boolean]
  src: string
  isShowLoading: boolean
  isVideoBier?: boolean
  isBackground?: boolean
  borderScaledFactor?: number
  borderSettings?: ISlideshowBorderSettings
}

const DEFAULT_BORDER_WIDTH = 12

const StyledImage = styled.img<{
  filterCss: any
  borderSettings: ISlideshowBorderSettings
  borderScaledFactor: number
  $isVideoBier?: boolean
  $isBackground?: boolean
}>`
  ${({ filterCss, borderSettings, borderScaledFactor, $isVideoBier }) => `
    ${filterCss}
    object-fit: fill;
    width: auto;
    ${
      $isVideoBier
        ? `
      position: absolute;
      right: 10px;
      top: 10px;
      height: 55%;
    `
        : ``
    }
    ${
      borderSettings.enabled === true
        ? `
      border: ${borderScaledFactor * DEFAULT_BORDER_WIDTH}px white solid;
      border-radius: 1%;
    `
        : `
      border: none;
      border-radius: 0%;
    `
    }
  `}
  display: block;
  max-width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;

  box-shadow: ${({ borderSettings }) => {
    if (borderSettings.enabled) {
      return '0 5px 20px 0 rgba(0, 0, 0, 0.3)'
    }
    return 'none'
  }};
  transform: ${({ borderSettings, $isVideoBier, $isBackground }) => {
    if ($isVideoBier) {
      return ``
    }
    if (borderSettings.enabled) {
      return `translateY(0) scale(0.75)`
    }
    return $isBackground ? 'scale(0.9)' : 'scale(0.8)'
  }};
`

const ImageLayout: React.FunctionComponent<IImageLayoutProps> = ({
  src,
  filter,
  isShowLoading = true,
  isVideoBier = false,
  isBackground = false,
  borderScaledFactor = 1,
  borderSettings = { enabled: false },
}) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  useEffect(() => {
    ImageHelper.preloadImage(src, () => setLoaded(true))
  }, [])

  if (isShowLoading && !loaded) {
    return <Spin />
  }
  if (!filter) {
    throw Error('"filter" is undefined')
  }

  return (
    <StyledImage
      $isVideoBier={isVideoBier}
      $isBackground={isBackground}
      borderScaledFactor={borderScaledFactor}
      borderSettings={borderSettings}
      src={src}
      filterCss={SLIDESHOW_FILTERS[filter]}
      className={`image-layout-img`}
    />
  )
}

export default ImageLayout
