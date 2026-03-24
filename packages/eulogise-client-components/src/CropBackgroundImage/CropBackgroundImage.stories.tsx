import React from 'react'
import styled from 'styled-components'
import { CropBackgroundImage } from './CropBackgroundImage'
import {
  BackgroundImageProperties,
  BackgroundImageType,
  BackgroundImageTypesMap,
  DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
  GetImageObject,
} from '@eulogise/core'
import { useGetImageSize } from '../hooks/useGetImageSize'

export default {
  title: 'General/CropBackgroundImage',
  component: CropBackgroundImage,
  argTypes: {},
}

const PORTRAIT_IMAGE_FILESTACK_HANDLE = 'tMwKrE7oTvyau8Wj23Vs'
const LANDSCAPE_IMAGE_FILESTACK_HANDLE = 'H3qxks24SV2p4pDNsA02'

const Template = ({ image }: { image: GetImageObject }) => {
  const actualImageSize = useGetImageSize({
    image,
  })
  const flattenBackgroundImageTypes: Array<
    {
      type: string
    } & BackgroundImageProperties
  > = []

  for (const type in BackgroundImageTypesMap) {
    const props = BackgroundImageTypesMap[type]
    flattenBackgroundImageTypes.push({
      type,
      ...props,
    })
  }
  return (
    <div>
      {flattenBackgroundImageTypes.map((props) => (
        <CropBackgroundImage
          {...props}
          key={props.type}
          image={image}
          imageSize={actualImageSize}
          isDebug
        />
      ))}
    </div>
  )
}

export const PortraitImages = () => (
  <Template
    image={{
      filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
    }}
  />
)

export const LandscapeImages = () => (
  <Template
    image={{
      filestackHandle: LANDSCAPE_IMAGE_FILESTACK_HANDLE,
    }}
  />
)

export const Thumbnail = () => (
  <Template
    image={{
      url: 'https://media.eulogisememorials.com/backgroundImages/Beach/AU/Beach_THUMBNAIL.jpg',
    }}
  />
)

export const Beach = () => (
  <Template
    image={{
      url: 'https://media.eulogisememorials.com/backgroundImages/Beach/AU/Beach_THUMBNAIL.jpg',
    }}
  />
)

const CombinedPages = styled.div`
  display: flex;
  position: absolute;
`

const CombinedBleedAndNonBleed = ({
  bleed,
  nonBleed,
}: {
  bleed: React.ReactNode
  nonBleed: React.ReactNode
}) => {
  return (
    <>
      <CombinedPages
        style={{
          left: 0,
          top: 0,
        }}
      >
        {bleed}
      </CombinedPages>
      <CombinedPages
        style={{
          left: `${DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE}px`,
          top: `${DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE}px`,
          opacity: '0.7',
        }}
      >
        {nonBleed}
      </CombinedPages>
    </>
  )
}

const getBackgroundImageProps = (type: BackgroundImageType) => ({
  type,
  ...BackgroundImageTypesMap[type],
})

const CombinedLeftAndRight = ({
  image = { filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE },
  leftType,
  rightType,
  leftBleedType,
  rightBleedType,
}: {
  image: GetImageObject
  leftType: BackgroundImageType
  rightType: BackgroundImageType
  leftBleedType: BackgroundImageType
  rightBleedType: BackgroundImageType
}) => {
  const actualImageSize = useGetImageSize({ image })
  const leftProps = getBackgroundImageProps(leftType)
  const rightProps = getBackgroundImageProps(rightType)
  const leftBleedProps = getBackgroundImageProps(leftBleedType)
  const rightBleedProps = getBackgroundImageProps(rightBleedType)
  return (
    <CombinedBleedAndNonBleed
      bleed={[
        <CropBackgroundImage
          {...leftBleedProps}
          key={leftBleedProps.type}
          image={image}
          imageSize={actualImageSize}
        />,
        <CropBackgroundImage
          {...rightBleedProps}
          key={rightBleedProps.type}
          image={image}
          imageSize={actualImageSize}
        />,
      ]}
      nonBleed={[
        <CropBackgroundImage
          {...leftProps}
          key={leftProps.type}
          image={image}
          imageSize={actualImageSize}
        />,
        <CropBackgroundImage
          {...rightProps}
          key={rightProps.type}
          image={image}
          imageSize={actualImageSize}
        />,
      ]}
    />
  )
}

const CombinedBooklet = ({ image }: { image: { filestackHandle: string } }) => (
  <CombinedLeftAndRight
    image={image}
    leftType="BOOKLET_LEFT"
    leftBleedType="BOOKLET_LEFT_BLEED"
    rightType="BOOKLET_RIGHT"
    rightBleedType="BOOKLET_RIGHT_BLEED"
  />
)

export const CombinedBookletPortrait = () => {
  const image = { filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE }
  return <CombinedBooklet image={image} />
}

export const CombinedBookletLandscape = () => {
  const image = {
    filestackHandle: LANDSCAPE_IMAGE_FILESTACK_HANDLE,
  }
  return <CombinedBooklet image={image} />
}

const CombinedThankYouCardFull = ({ image }: { image: GetImageObject }) => {
  const actualImageSize = useGetImageSize({ image })
  const props = getBackgroundImageProps('THANK_YOU_CARD')
  const bleedProps = getBackgroundImageProps('THANK_YOU_CARD_BLEED')

  return (
    <CombinedBleedAndNonBleed
      bleed={
        <CropBackgroundImage
          {...bleedProps}
          key={bleedProps.type}
          image={image}
          imageSize={actualImageSize}
        />
      }
      nonBleed={
        <CropBackgroundImage
          {...props}
          key={props.type}
          image={image}
          imageSize={actualImageSize}
        />
      }
    />
  )
}

export const ThankYouCardFullPortrait = () => {
  const image = {
    filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
  }
  return <CombinedThankYouCardFull image={image} />
}

export const ThankYouCardFullLandscape = () => {
  const image = {
    filestackHandle: LANDSCAPE_IMAGE_FILESTACK_HANDLE,
  }
  return <CombinedThankYouCardFull image={image} />
}

const CombinedBookmark = ({
  image,
  type,
}: {
  image: GetImageObject
  type: 'FRONT' | 'BACK'
}) => {
  const actualImageSize = useGetImageSize({ image })
  const props = getBackgroundImageProps(`BOOKMARK_${type}`)
  const bleedProps = getBackgroundImageProps(`BOOKMARK_${type}_BLEED`)

  return (
    <CombinedBleedAndNonBleed
      bleed={
        <CropBackgroundImage
          {...bleedProps}
          key={bleedProps.type}
          image={image}
          imageSize={actualImageSize}
        />
      }
      nonBleed={
        <CropBackgroundImage
          {...props}
          key={props.type}
          image={image}
          imageSize={actualImageSize}
        />
      }
    />
  )
}

export const BookmarkFrontPortrait = () => {
  const image = {
    filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
  }
  return <CombinedBookmark image={image} type="FRONT" />
}

export const BookmarkFrontLandscape = () => {
  const image = {
    filestackHandle: LANDSCAPE_IMAGE_FILESTACK_HANDLE,
  }
  return <CombinedBookmark image={image} type="FRONT" />
}

export const BookmarkBackPortrait = () => {
  const image = {
    filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
  }
  return <CombinedBookmark image={image} type="BACK" />
}

export const BookmarkBackLandscape = () => {
  const image = {
    filestackHandle: LANDSCAPE_IMAGE_FILESTACK_HANDLE,
  }
  return <CombinedBookmark image={image} type="BACK" />
}

const CombinedTvWelcomeScreen = ({ image }: { image: GetImageObject }) => {
  const actualImageSize = useGetImageSize({ image })
  const leftProps = getBackgroundImageProps('TV_WELCOME_SCREEN_LEFT')
  const rightProps = getBackgroundImageProps('TV_WELCOME_SCREEN_RIGHT')
  return (
    <CombinedPages>
      <CropBackgroundImage
        {...leftProps}
        key={leftProps.type}
        image={image}
        imageSize={actualImageSize}
      />
      <CropBackgroundImage
        {...rightProps}
        key={rightProps.type}
        image={image}
        imageSize={actualImageSize}
      />
    </CombinedPages>
  )
}

export const TvWelcomeScreenPortrait = () => {
  const image = {
    filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
  }
  return <CombinedTvWelcomeScreen image={image} />
}

export const TvWelcomeScreenLandscape = () => {
  const image = {
    filestackHandle: LANDSCAPE_IMAGE_FILESTACK_HANDLE,
  }
  return <CombinedTvWelcomeScreen image={image} />
}

export const SlideshowPortrait = () => {
  const image = {
    filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
  }
  const actualImageSize = useGetImageSize({ image })
  const props = getBackgroundImageProps('SLIDESHOW')
  return (
    <CropBackgroundImage
      {...props}
      key={props.type}
      image={image}
      imageSize={actualImageSize}
    />
  )
}

export const SlideshowLandscape = () => {
  const image = {
    filestackHandle: LANDSCAPE_IMAGE_FILESTACK_HANDLE,
  }
  const actualImageSize = useGetImageSize({ image })
  const props = getBackgroundImageProps('SLIDESHOW')
  return (
    <CropBackgroundImage
      {...props}
      key={props.type}
      image={image}
      imageSize={actualImageSize}
    />
  )
}

export const TvWelcomeScreenAndSlideshowLandscape = () => {
  const image = {
    filestackHandle: LANDSCAPE_IMAGE_FILESTACK_HANDLE,
  }
  const actualImageSize = useGetImageSize({ image })
  const props = getBackgroundImageProps('SLIDESHOW')

  return (
    <>
      <CombinedTvWelcomeScreen image={image} />
      <CropBackgroundImage
        {...props}
        key={props.type}
        image={image}
        imageSize={actualImageSize}
      />
    </>
  )
}

export const TvWelcomeScreenAndSlideshowPortrait = () => {
  const image = {
    filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
  }
  const actualImageSize = useGetImageSize({ image })
  const props = getBackgroundImageProps('SLIDESHOW')

  return (
    <>
      <CombinedTvWelcomeScreen image={image} />
      <CropBackgroundImage
        {...props}
        key={props.type}
        image={image}
        imageSize={actualImageSize}
      />
    </>
  )
}
