import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { COLOR } from '@eulogise/client-core'

const ArrowStyle = `
  display: block;
  color: ${COLOR.BLACK};
  font-size: 1.2rem;
  :hover, :focus {
    color: ${COLOR.BLACK};
    font-size: 1.3rem;
  }
`

const PrevArrow = styled(LeftOutlined)`
  ${ArrowStyle}
`

const NextArrow = styled(RightOutlined)`
  ${ArrowStyle}
`

type IPaperTypeSliderProps = React.PropsWithChildren & {
  noOfPaperTypes: number
}

export const PaperTypePreviewSlider = ({
  noOfPaperTypes,
  children,
}: IPaperTypeSliderProps) => (
  <>
    <Slider
      slidesToShow={Math.min(3, noOfPaperTypes)}
      slidesToScroll={1}
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
      infinite={false}
      arrows={noOfPaperTypes > 3}
      draggable={noOfPaperTypes > 3}
    >
      {children}
    </Slider>
  </>
)
