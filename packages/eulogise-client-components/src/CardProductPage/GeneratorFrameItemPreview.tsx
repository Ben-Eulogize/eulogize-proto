import React from 'react'
import styled from 'styled-components'
import {
  AlignmentType,
  CardProductViewDisplayMode,
  ICardProductFrameRow,
  PageActionPosition,
} from '@eulogise/core'
import { FrameItem } from '../ContentItem'

type IGeneratorFrameItemPreviewProps = {
  row: ICardProductFrameRow
}

const StyledGeneratorFrameItemPreview = styled.div``

export const GeneratorFrameItemPreview = (
  frameItemPreviewProps: IGeneratorFrameItemPreviewProps,
) => {
  const { row } = frameItemPreviewProps
  return (
    <StyledGeneratorFrameItemPreview>
      <FrameItem
        isEnablePhotobookEdit={false}
        isPhotobookTitlePageLayout={false}
        data={row.data}
        displayMode={CardProductViewDisplayMode.PRINT}
        onFocus={() => {}}
        isAnyRowFocused={false}
        onChange={() => {}}
        onDelete={() => {}}
        onChangeLayoutClick={() => {}}
        onChangeFrameBackgroundClick={() => {}}
        onFullWidthClick={() => {}}
        actionsPosition={PageActionPosition.LEFT}
        onContentItemClick={() => {}}
        onContentItemChange={() => {}}
        onDuplicate={() => {}}
        containerRef={undefined}
        alignment={AlignmentType.LEFT}
        onChangeAlignment={() => {}}
      />
    </StyledGeneratorFrameItemPreview>
  )
}
