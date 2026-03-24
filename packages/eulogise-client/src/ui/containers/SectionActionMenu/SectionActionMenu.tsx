import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

export const SectionActionMenu = styled.div<{
  isShow: boolean
}>`
  position: absolute;
  z-index: 30;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR}dd;
  color: ${COLOR.DARK_BLUE};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.3s all;
  transform: translateY(100%)
    ${({ isShow }: { isShow: boolean }) =>
      isShow &&
      `
    transform: translateY(0);
  `};
`
