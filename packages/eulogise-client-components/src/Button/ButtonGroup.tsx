import styled from 'styled-components'

export const ButtonGroup = styled.div<{ isAlignRight?: boolean }>`
  display: flex;
  ${({ isAlignRight }) => isAlignRight && `justify-content: flex-end;`}
`
