import React from 'react'
import styled from 'styled-components'
import { EditorState, convertFromRaw } from 'draft-js'

import { EditorToolbar } from './EditorToolbar'
import { AlignmentType } from '@eulogise/core'
import { BOOKLET_THEMES } from '@eulogise/core'
import { MOCK_BOOKLET_1 } from '@eulogise/mock'

export default {
  title: 'CardProduct/EditorToolbar',
  component: EditorToolbar,
  argTypes: {},
}

const BottomEditorToolbar = styled(EditorToolbar)`
  margin-top: 500px;
`

const Container = styled.div`
  position: relative;
  margin-top: 3rem;
`

export const Default = () => (
  <Container>
    <EditorToolbar
      editorState={EditorState.createWithContent(
        // @ts-ignore
        convertFromRaw(MOCK_BOOKLET_1.content.pages[0].rows[0].data?.content),
      )}
      productTheme={BOOKLET_THEMES.find((t) => t.id === 'aura')}
      activeAlignmentType={AlignmentType.LEFT}
      onChange={() => {}}
      rowStyle={{}}
      onOpenCopyLibraryDrawer={() => console.log('onOpenCopyLibraryDrawer')}
      editing
    />
    <BottomEditorToolbar
      editorState={EditorState.createWithContent(
        // @ts-ignore
        convertFromRaw(MOCK_BOOKLET_1.content.pages[0].rows[0].data?.content),
      )}
      productTheme={BOOKLET_THEMES.find((t) => t.id === 'aura')}
      activeAlignmentType={AlignmentType.LEFT}
      onChange={() => {}}
      rowStyle={{}}
      editing
    />
  </Container>
)
