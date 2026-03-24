import React, { useState } from 'react'
import { Button } from '../../Button'
import { CardProductFrameDrawer } from './CardProductFrameDrawer'
import {
  EulogisePhotobookCoverType,
  EulogiseProduct,
  ICardProductData,
  ICase,
} from '@eulogise/core'

export default {
  title: 'Feedback/CardProductFrameDrawer',
  component: CardProductFrameDrawer,
  argTypes: {},
}

const activeCase = {
  deceased: {
    fullName: 'test',
  },
} as ICase

const cardProduct = {
  content: {
    pages: [
      {
        id: '1',
        coverType: EulogisePhotobookCoverType.BLUSH_LINEN,
        layoutId: 'layout-1',
        items: [],
      },
      {
        id: '2',
        layoutId: 'layout-2',
        items: [],
      },
    ],
  },
} as unknown as ICardProductData

export const Default = () => {
  const [isShowDrawer, setShowDrawer] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowDrawer(true)}>Open</Button>
      <CardProductFrameDrawer
        cardProduct={cardProduct}
        activeCase={activeCase}
        pageIndex={0}
        product={EulogiseProduct.BOOKLET}
        onClose={() => setShowDrawer(false)}
        onItemClick={(type, item) => console.log('frame', { type, item })}
        isOpen={isShowDrawer}
      />
    </>
  )
}

export const PhotobookCoverPage = () => {
  const [isShowDrawer, setShowDrawer] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowDrawer(true)}>Open</Button>
      <CardProductFrameDrawer
        cardProduct={cardProduct}
        activeCase={activeCase}
        pageIndex={0}
        isShowTitlePageLayouts
        product={EulogiseProduct.PHOTOBOOK}
        onClose={() => setShowDrawer(false)}
        onItemClick={(type, item) => console.log('frame', { type, item })}
        isOpen={isShowDrawer}
      />
    </>
  )
}

export const Photobook = () => {
  const [isShowDrawer, setShowDrawer] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowDrawer(true)}>Open</Button>
      <CardProductFrameDrawer
        cardProduct={cardProduct}
        activeCase={activeCase}
        pageIndex={1}
        isShowTitlePageLayouts
        product={EulogiseProduct.PHOTOBOOK}
        onClose={() => setShowDrawer(false)}
        onItemClick={(type, item) => console.log('frame', { type, item })}
        isOpen={isShowDrawer}
      />
    </>
  )
}
