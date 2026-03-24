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

type IBrandsSliderProps = React.PropsWithChildren & {
  noOfBrands: number
}

export const ViewClientBrandsSlick = ({
  noOfBrands,
  children,
}: IBrandsSliderProps) => (
  <>
    <Slider
      slidesToShow={Math.min(2, noOfBrands)}
      slidesToScroll={1}
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
      infinite={false}
      arrows={noOfBrands > 2}
      draggable={noOfBrands > 2}
    >
      {children}
    </Slider>
  </>
)
