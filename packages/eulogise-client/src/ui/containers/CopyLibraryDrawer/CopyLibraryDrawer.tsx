import React from 'react'
import styled from 'styled-components'
import { Drawer, ButtonType, Title, Button } from '@eulogise/client-components'
import {
  DrawerId,
  ICopyCatogries,
  HYMNS_COPIES,
  PRYAERS_COPIES,
  POEMS_COPIES,
  FUNERAL_READINGS_COPIES,
  BIBLE_VERSES_PSALMS_COPIES,
  DEDICATED_LINES_COPIES,
} from '@eulogise/core'
import { useEulogiseDispatch, useIsOpenDrawer } from '../../store/hooks'
import { closeDrawerAction } from '../../store/DrawerState/actions'
import CopyLibraryCategoryGroup from './CopyLibraryCategoryGroup'

const StyledCopyLibraryDrawer = styled(Drawer)`
  .ant-drawer-header,
  .ant-drawer-content {
    background-color: rgb(243, 245, 247);
  }
  .ant-card {
    background-color: transparent;
  }
`

const StyledDrawerContentContainer = styled.div`
  margin: 10px;
`

const StyledDrawerHeader = styled(Title)`
  text-align: left;
`

const StyledDrawerSubHeading = styled.div`
  margin: 10px;
`

const COPY_LIBRARY_CATEGORIES: Array<ICopyCatogries> = [
  {
    name: 'Dedication Lines',
    copies: DEDICATED_LINES_COPIES,
  },
  {
    name: 'Hymns',
    copies: HYMNS_COPIES,
  },
  {
    name: 'Prayers',
    copies: PRYAERS_COPIES,
  },
  {
    name: 'Readings',
    copies: FUNERAL_READINGS_COPIES,
  },
  {
    name: 'Bible Verses',
    copies: BIBLE_VERSES_PSALMS_COPIES,
  },
  {
    name: 'Poems',
    copies: POEMS_COPIES,
  },
]

type ICopyLibraryDrawerProps = {
  onReplaceText: (replaceText: string) => void
}

const CopyLibraryDrawer = ({ onReplaceText }: ICopyLibraryDrawerProps) => {
  const dispatch = useEulogiseDispatch()
  const isOpenDrawer: boolean = useIsOpenDrawer(DrawerId.HYMNS_PRAYERS_DRAWER)

  const onClose = () => {
    dispatch(closeDrawerAction())
  }

  return (
    <StyledCopyLibraryDrawer
      closeIcon={
        <Button
          key="close"
          buttonType={ButtonType.TRANSPARENT}
          noMarginRight
          onClick={onClose}
        >
          Cancel
        </Button>
      }
      isOpen={isOpenDrawer}
      onClose={onClose}
    >
      <StyledDrawerContentContainer>
        <StyledDrawerSubHeading>
          All verses must be attributed to the author if known.
        </StyledDrawerSubHeading>
        <StyledDrawerHeader>
          Hymns, Prayers, Readings, Poems, Verses Library
        </StyledDrawerHeader>

        <CopyLibraryCategoryGroup
          categories={COPY_LIBRARY_CATEGORIES}
          onClose={onClose}
          onReplaceText={onReplaceText}
        />
      </StyledDrawerContentContainer>
    </StyledCopyLibraryDrawer>
  )
}

export default CopyLibraryDrawer
