import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useConnectionState } from '../../store/hooks'
import { ConnectionListItem } from './ConnectionListItem'

const StyledConnectionList = styled.div`
  display: flex;
`

export const ConnectionList = () => {
  const { items } = useConnectionState()

  const filteredItems = useMemo(() => items.filter(Boolean), [items])

  return (
    <StyledConnectionList>
      {filteredItems.map((c) => (
        <ConnectionListItem key={c.id} connection={c} />
      ))}
    </StyledConnectionList>
  )
}
