import React from 'react'
import styled from 'styled-components'
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from './ReactSortableHoc'

const ReactSortableHocComponent = () => {
  return null
}

export default {
  title: 'General/ReactSortableHoc',
  component: ReactSortableHocComponent,
  argTypes: {},
}

const Container = styled.div``
const DraggableContainer = SortableContainer(Container)

const Item = styled.div<{
  $bgColor: string
}>`
  width: 100px;
  height: 100px;
  ${({ $bgColor }) => `
    background-color: ${$bgColor};
  `}
`
const DraggableItem = SortableElement(Item)

export const Default = () => {
  const [items, setItems] = React.useState([
    { text: 'a', bgColor: 'red' },
    { text: 'b', bgColor: 'blue' },
    { text: 'c', bgColor: 'green' },
  ])
  return (
    // @ts-ignore
    <DraggableContainer
      onSortEnd={({ oldIndex, newIndex }: any) => {
        setItems(arrayMove(items, oldIndex, newIndex))
      }}
    >
      {items.map((i, index) => (
        <div key={`item-${i}`}>
          {/* @ts-ignore */}
          <DraggableItem key={index} index={index} $bgColor={i.bgColor}>
            {i.text}
          </DraggableItem>
        </div>
      ))}
    </DraggableContainer>
  )
}
