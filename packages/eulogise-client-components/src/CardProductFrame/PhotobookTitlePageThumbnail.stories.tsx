import React from 'react'
import { PhotobookTitlePageThumbnail } from './PhotobookTitlePageThumbnail'
import {
  ICardProductPage,
  PHOTOBOOK_TITLE_PAGE_LAYOUT_1,
  PHOTOBOOK_TITLE_PAGE_LAYOUT_2,
  PHOTOBOOK_TITLE_PAGE_LAYOUT_3,
} from '@eulogise/core'

export default {
  title: 'CardProduct/PhotobookTitlePageThumbnail',
  component: PhotobookTitlePageThumbnail,
  argTypes: {},
}

export const Layout1 = () => (
  <PhotobookTitlePageThumbnail
    page={PHOTOBOOK_TITLE_PAGE_LAYOUT_1}
    onClick={(page) => console.log('page', page)}
  />
)

export const Layout2 = () => (
  <PhotobookTitlePageThumbnail
    page={PHOTOBOOK_TITLE_PAGE_LAYOUT_2}
    onClick={(page) => console.log('page', page)}
  />
)

export const Layout3 = () => (
  <PhotobookTitlePageThumbnail
    page={PHOTOBOOK_TITLE_PAGE_LAYOUT_3}
    onClick={(page) => console.log('page', page)}
  />
)
