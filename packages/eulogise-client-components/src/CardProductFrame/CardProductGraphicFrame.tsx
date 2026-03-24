import React from 'react'
import { GraphicFrameHelper } from '@eulogise/helpers'
import styled from 'styled-components'
import { GraphicFrameDetailsField, GraphicFrameField } from '@eulogise/core'

const StyledCardProductGraphicFrame = styled.div<GraphicFrameDetailsField>`
  position: absolute;
  pointer-events: none;
  ${({ backgroundUrl, width, height, top, left }) =>
    backgroundUrl
      ? `
    background-image: url(${backgroundUrl});
    top: calc(50% + ${top ?? '0px'});
    left: calc(50% + ${left ?? '0px'});
    width: ${width ?? '100%'};
    height: ${height ?? '100%'};
  `
      : ``};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate3d(-50%, -50%, 0);
  z-index: 1;
`

export const CardProductGraphicFrame = ({
  graphicFrame,
}: {
  graphicFrame: GraphicFrameField
}) => {
  const graphicFrameDetails =
    GraphicFrameHelper.getGraphicFrameDetailsByName(graphicFrame)

  return <StyledCardProductGraphicFrame {...graphicFrameDetails} />
}
