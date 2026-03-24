import { Menu } from 'antd'
import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'

export const SiderMenuItem = styled(Menu.Item)<{
  $isSelected?: boolean
  $isHighlighted?: boolean
  $isFlashHighlighted?: boolean
}>`
  .ant-menu-inline-collapsed & .ant-menu-title-content {
    opacity: 0 !important;
  }
  &&& {
    background-color: transparent;
    display: flex;
    align-items: center;
    font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};
    color: ${COLOR.TEXT_COLOR};
    border-radius: 0 ${STYLE.SIDER_ITEM_BORDER_RADIUS}
      ${STYLE.SIDER_ITEM_BORDER_RADIUS} 0;
    overflow: hidden;
    padding-left: ${STYLE.SIDER_ITEM_PADDING_LEFT};
    width: initial;
    & > span.ant-menu-item-icon {
      margin-top: 2px;
    }
    &:hover {
      background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR};
    }

    @-webkit-keyframes highlightBg {
      0% {
        background: ${COLOR.WHITE};
        clip-path: inset(0 0 98% 0);
      }
      50% {
        background: ${COLOR.DARK_BLUE};
      }
      to {
        background: ${COLOR.WHITE};
      }
    }

    @keyframes highlightBg {
      0% {
        background: ${COLOR.WHITE};
      }
      50% {
        background: ${COLOR.DARK_BLUE};
      }
      to {
        background: ${COLOR.WHITE};
      }
    }

    ${({ $isSelected }) =>
      $isSelected ? `background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR};` : ''}
    ${({ $isHighlighted }) =>
      $isHighlighted
        ? `
          background-color: ${COLOR.DARK_BLUE};
          color: ${COLOR.WHITE};
          &:hover {
            background-color: ${COLOR.DARK_BLUE};
          }
        `
        : ''}

    ${({ $isFlashHighlighted }) =>
      $isFlashHighlighted
        ? `
            -webkit-animation: highlightBg 1s linear;
            -o-animation: highlightBg 1s linear;
            animation: highlightBg 1s linear;
            -webkit-animation-iteration-count: 3;
            -o-animation-iteration-count: 3;
            animation-iteration-count: 3
          `
        : ''}
  }
`
