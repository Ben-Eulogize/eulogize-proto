import React from 'react'
import { MOCK_BOOKLET_1 } from '@eulogise/mock'
import { CardProductHelper } from '@eulogise/helpers'
import { GeneratorFrameItemPreview } from './GeneratorFrameItemPreview'
import { ICardProductFrameRow } from '@eulogise/core'

export default {
  title: 'CardProductPage/GeneratorFrameItemPreview',
  component: GeneratorFrameItemPreview,
  argTypes: {},
}

export const Default = () => {
  const frameRows: Array<ICardProductFrameRow> =
    CardProductHelper.getFadedEdgesFrameRows({
      cardProductContent: MOCK_BOOKLET_1.content,
    })
  const [row] = frameRows
  return <GeneratorFrameItemPreview row={row} />
}
