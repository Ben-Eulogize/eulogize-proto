import React from 'react'
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export const DummyDroppable = ({
  draggableId,
  children,
  index,
}: {
  draggableId: string
  index: number
  children: (provided: any) => React.ReactNode
}) => children({ innerRef: () => {}, droppableProps: {}, placeholder: null })

export const DummyDraggable = ({
  draggableId,
  index,
  children,
}: {
  draggableId: string
  index: string
  children: (provided: any, snapshot: any) => React.ReactNode
}) => {
  const snapshot = {}
  return children(
    { innerRef: () => {}, draggableProps: {}, dragHandleProps: {} },
    snapshot,
  )
}

export { DragDropContext, Droppable, Draggable }
