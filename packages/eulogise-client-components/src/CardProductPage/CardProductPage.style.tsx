import styled from 'styled-components'
import { PageActionPosition } from '@eulogise/core'
import { COLOR } from '@eulogise/client-core'

export const CardProductPageAddActionContainer = styled.div`
  ${({
    actionsPosition,
    pageAddContainerHeight,
  }: {
    actionsPosition: PageActionPosition
    pageAddContainerHeight: number
  }) =>
    actionsPosition === PageActionPosition.RIGHT
      ? `
    flex-direction: row-reverse;
    position: relative;
    left: 30px;
    height: ${pageAddContainerHeight}px;
  `
      : `
    position: relative;
    right: 30px;
    height: ${pageAddContainerHeight}px;
  `};

  min-height: 30px;
  min-width: 100%;
  display: flex;
  z-index: 2;

  .pageActionComponent {
    min-height: 30px;
    border-radius: 4px;
    height: inherit;
    max-width: 30px;
    padding: 0 7.5px;

    &.preview {
      pointer-events: none;
      opacity: 0;
    }

    &.active {
      background-color: ${COLOR.LITE_GREY};
      border-color: ${COLOR.LITE_GREY};
    }

    &.default {
      background-color: #3dc4d0;
    }

    &.default:hover {
      background-color: #64d8de;
    }

    &.defaultHover {
      background-color: #64d8de;
    }
  }
`
