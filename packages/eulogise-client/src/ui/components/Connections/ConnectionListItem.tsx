import React from 'react'
import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import { IConnection } from '@eulogise/core'
import { UtilHelper } from '@eulogise/helpers'

const StyledConnectionListItem = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${COLOR.CORE_PURPLE};
  border-radius: 1rem;
  color: ${COLOR.WHITE};
  font-size: ${STYLE.FONT_SIZE_XS};
  text-align: center;
  margin: 0 calc(${STYLE.HALF_GUTTER} / 2);
`

type ConnectionListItemProps = {
  connection: IConnection
}

export const ConnectionListItem = React.memo(
  ({ connection }: ConnectionListItemProps) => {
    const names = connection.user.fullName?.split(' ')
    return (
      <StyledConnectionListItem>
        {UtilHelper.take(2, names)
          .map((n) => n.charAt(0).toUpperCase())
          .join('')}
      </StyledConnectionListItem>
    )
  },
)
