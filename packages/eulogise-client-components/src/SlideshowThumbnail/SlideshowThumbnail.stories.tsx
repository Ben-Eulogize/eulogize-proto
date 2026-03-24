import React from 'react'
import { SlideshowThumbnail } from './SlideshowThumbnail'

export default {
  title: 'SlideshowThumbnail/SlideshowThumbnail',
  component: SlideshowThumbnail,
  argTypes: {},
}

export const SlideshowThumbnailStory = () => {
  return (
    <SlideshowThumbnail
      backgroundImage={{
        url: 'https://media.eulogisememorials.com/backgroundImages/Fall_Flowers/AU/Fall_Flowers_THUMBNAIL.jpg',
      }}
      image={{
        url: 'https://media.eulogisememorials.com/primaryImages/srTL5xBtQvKmQ0fLYcUK.jpeg',
      }}
    />
  )
}
