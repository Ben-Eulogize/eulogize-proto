import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

export const DrawerListRow = styled.div`
  display: flex;
  border-bottom: 1px solid ${COLOR.SHALLOW_GREY};
  & > div:not(:first-child) {
    position: relative;
    &:before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 1px;
      height: 1.6em;
      background-color: ${COLOR.SHALLOW_GREY};
      transform: translateY(-50%);
      transition: background-color 0.3s;
      content: '';
    }
  }
`
