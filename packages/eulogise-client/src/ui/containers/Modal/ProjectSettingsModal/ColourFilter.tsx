import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'antd'

import {
  Accordion,
  AccordionItem,
  SwitchButton,
} from '@eulogise/client-components'
import imageFiltersExample from '../../../assets/image-filters-example.jpg'
import { SLIDESHOW_FILTERS, STYLE } from '@eulogise/client-core'

const ColourFilterIntro = styled.p`
  margin-bottom: 2rem;
`

const FilterImgWrapper = styled(Col)`
  text-align: center;
  width: 25%;
  display: flex;
  flex-direction: row;
`

const FilterImg = styled.img`
  width: 100%;
`

const ImageFilterImageContainer = styled.div`
  &:active {
    font-size: ${STYLE.FONT_WEIGHT_BOLD};
    border: 2px #3dc4d0 solid;
  }
`

const Filter = styled.figure`
  ${({ cssClass }: { cssClass: any }) => cssClass}
`

const ColourFilter = () => {
  return (
    <Accordion>
      <AccordionItem
        header="Colour Filter"
        key="3"
        extra={<SwitchButton onClick={() => {}} />}
      >
        <ColourFilterIntro>
          Apply a colour filter across all pictures in the slideshow.
        </ColourFilterIntro>
        <Row gutter={8}>
          {Object.keys(SLIDESHOW_FILTERS)
            .filter((filterKey: string) => filterKey !== 'none')
            .map((filterKey: string) => {
              return (
                <FilterImgWrapper key={filterKey} span={6} onClick={() => {}}>
                  <ImageFilterImageContainer>
                    <Filter cssClass={SLIDESHOW_FILTERS[filterKey]}>
                      <FilterImg
                        src={imageFiltersExample}
                        alt={filterKey}
                        onChange={() => {}}
                        onClick={(imageFilter) => {
                          console.log('imageFilter', imageFilter)
                        }}
                      />
                    </Filter>
                    {filterKey}
                  </ImageFilterImageContainer>
                </FilterImgWrapper>
              )
            })}
        </Row>
      </AccordionItem>
    </Accordion>
  )
}

export default ColourFilter
