import React from 'react'
import { CardProductFrameThumbnailList } from './CardProductFrameThumbnailList'
import { CardProductPageSize } from '@eulogise/core'

export default {
  title: 'CardProduct/CardProductFrameThumbnailList',
  component: CardProductFrameThumbnailList,
  argTypes: {},
}

export const Default = () => (
  <CardProductFrameThumbnailList
    pageSize={CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM}
    onItemClick={(item) => console.log('selected layout', item)}
    isShowFrameLayouts
  />
)
