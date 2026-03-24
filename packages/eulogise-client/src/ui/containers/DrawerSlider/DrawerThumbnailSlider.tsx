import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { COLOR, STYLE } from '@eulogise/client-core'

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

const CategoryName = styled.div`
  margin-left: 1.4rem;
  font-size: ${STYLE.FONT_SIZE_LG};
`

type IDrawerSliderProps = React.PropsWithChildren & {
  noOfThumbnails: number
  categoryName: string
}

export const DrawerThumbnailSlider = ({
  categoryName,
  noOfThumbnails,
  children,
}: IDrawerSliderProps) => (
  <>
    <CategoryName>{categoryName}</CategoryName>
    <Slider
      variableWidth={true}
      slidesToShow={Math.min(3, noOfThumbnails)}
      slidesToScroll={1}
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
      infinite={noOfThumbnails > 3}
      arrows={noOfThumbnails > 3}
      draggable={noOfThumbnails > 3}
      responsive={[
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: Math.min(2, noOfThumbnails),
            infinite: noOfThumbnails > 2,
            arrows: noOfThumbnails > 2,
            draggable: noOfThumbnails > 2,
          },
        },
        {
          breakpoint: 950,
          settings: {
            slidesToShow: Math.min(1, noOfThumbnails),
            infinite: noOfThumbnails > 1,
            arrows: noOfThumbnails > 1,
            draggable: noOfThumbnails > 1,
          },
        },
      ]}
    >
      {children}
    </Slider>
  </>
)
