import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ImageHelper } from '@eulogise/helpers'
import { Spin } from '@eulogise/client-components'

interface IContributorImageLayoutProps {
  src: string
  isAlwaysShowingSpin?: boolean
  isRemovingImageBackground?: boolean
}

const StyledImage = styled.div<{ $src: string }>`
  display: block;
  width: 80%;
  height: 80%;
  background-image: url('${({ $src }) => $src}');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

const PhotoLibraryImageLayout = ({
  src,
  isAlwaysShowingSpin = false,
  isRemovingImageBackground = false,
}: IContributorImageLayoutProps) => {
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    setLoaded(false)
    ImageHelper.preloadImage(src, () => setLoaded(true))
  }, [src])

  if (!loaded || isAlwaysShowingSpin || isRemovingImageBackground) {
    return <Spin />
  }

  return <StyledImage $src={src} />
}

export default PhotoLibraryImageLayout
