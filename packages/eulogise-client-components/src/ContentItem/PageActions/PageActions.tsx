import React, { SetStateAction, useEffect, useState } from 'react'
import { Button, ButtonGroup, ButtonType } from '../../Button'
import {
  FontSizeIcon,
  HynmsAndPrayersIcon,
  IconAssetIcon,
  ImageLayoutIcon,
  ImageLibraryIcon,
} from '../../icons'
import { Modal } from '../../Modal'
import { ColumnHeightOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { COLOR, useDetectClickOutside } from '@eulogise/client-core'
import { CardProductContentItemType } from '@eulogise/core'

interface IPageActionsProps {
  onSelect: (type: CardProductContentItemType, options: object) => void
  onOpenCopyLibraryDrawer: () => void
  onOutsideClick?: () => void
}

type ActionBarItemType = {
  content: React.ReactNode | string
  value: CardProductContentItemType
  subTypes?: any
}

const ACTION_BAR_ITEM_TYPES: Array<ActionBarItemType> = [
  {
    content: <FontSizeIcon />,
    value: CardProductContentItemType.TEXT,
  },
  {
    content: <ImageLibraryIcon />,
    value: CardProductContentItemType.IMAGE,
  },
  {
    content: <ImageLayoutIcon style={{ display: 'block' }} />,
    value: CardProductContentItemType.FRAME,
  },
  {
    content: <ColumnHeightOutlined />,
    value: CardProductContentItemType.SPACE,
  },
  {
    content: <IconAssetIcon />,
    value: CardProductContentItemType.ICON,
  },
]

const StyledPageActionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  transition: opacity 100ms;
  width: 100%;
  opacity: 1;
`

// @ts-ignore
const StyledModal = styled(Modal)``

// @ts-ignore
const StyledActionButtonGroup = styled(ButtonGroup)`
  & > * {
    background-color: white;
    border: 1px solid ${COLOR.GREY};
    border-radius: 0;
  }
`

export const PageActions = ({
  onSelect,
  onOpenCopyLibraryDrawer,
  onOutsideClick,
}: IPageActionsProps) => {
  const [selectedType, setSelectedType] = useState(null)
  const [contentSelectorOpen, setContentSelectorOpen] = useState<boolean>(false)
  const [contentSelectorType, setContentSelectorType] = useState<string>('new')
  const [contentSelected, setContentSelected] = useState(null)

  const ref = onOutsideClick
    ? useDetectClickOutside({
        onTriggered: onOutsideClick,
      })
    : null

  const onTypeSelect = (value: SetStateAction<any>) => {
    const { subTypes } = ACTION_BAR_ITEM_TYPES.find(
      (type) => type.value === value,
    )!

    if (subTypes) {
      setSelectedType(value)
    } else {
      onSelect(value, {})
    }
  }

  const onSubTypeSelect = (value: CardProductContentItemType) => {
    onSelect(selectedType!, { subType: value })
    setSelectedType(null)
  }

  const onAddHymnsAndPrayersButtonClick = () => {
    // this will add a TEXT item
    onSelect(CardProductContentItemType.TEXT, {})

    onOpenCopyLibraryDrawer()
  }

  useEffect(() => {
    setSelectedType(null)
    return () => {
      setSelectedType(null)
    }
  }, [])

  const options = selectedType
    ? ACTION_BAR_ITEM_TYPES?.find((type) => type.value === selectedType)
        ?.subTypes
    : ACTION_BAR_ITEM_TYPES

  return (
    <StyledPageActionContainer>
      <StyledActionButtonGroup ref={ref}>
        {options?.map(
          ({ value, content }: ActionBarItemType, index: number) => (
            <Button
              title={`Add ${typeof content === 'string' ? content : value}`}
              key={index}
              noMarginLeft
              noMarginRight
              buttonType={ButtonType.WHITE}
              onClick={() => {
                selectedType
                  ? onSubTypeSelect(value as CardProductContentItemType)
                  : onTypeSelect(value)
              }}
            >
              {content}
            </Button>
          ),
        )}
        <Button
          noMarginLeft
          noMarginRight
          onMouseDown={(event) => event.preventDefault()}
          onClick={onAddHymnsAndPrayersButtonClick}
          title="Hymns & Prayers"
          tooltip="A library of popular funeral readings"
          buttonType={ButtonType.WHITE}
        >
          <HynmsAndPrayersIcon />
        </Button>
      </StyledActionButtonGroup>
      <StyledModal
        title={`Select ${contentSelectorType || 'content'}`}
        isOpen={contentSelectorOpen}
        onOkClick={() => {
          onSelect(selectedType!, {
            subType: contentSelectorType,
            content: (contentSelected as any).content,
            alignment: 'center',
          })

          setSelectedType(null)
          setContentSelectorOpen(false)
          setContentSelectorType('new')
          setContentSelected(null)
        }}
        onCloseClick={() => {
          setSelectedType(null)
          setContentSelectorOpen(false)
          setContentSelectorType('new')
          setContentSelected(null)
        }}
      />
    </StyledPageActionContainer>
  )
}
