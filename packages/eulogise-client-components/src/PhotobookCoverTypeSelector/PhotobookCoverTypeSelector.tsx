import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { PhotobookCoverTypeSelectorItem } from './PhotobookCoverTypeSelectorItem'
import {
  CardProductPageSize,
  EulogiseCountry,
  EulogisePhotobookCoverType,
  IPhotobookCoverTypeOption,
} from '@eulogise/core'
import { PhotobookHelper } from '@eulogise/helpers'
import { DownOutlined } from '@ant-design/icons'
import { COLOR, STYLE } from '@eulogise/client-core'

const StyledFabricSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div {
    margin: 0.5rem;
  }
`

type IFabricSelectorProps = {
  className?: string
  value: EulogisePhotobookCoverType
  country: EulogiseCountry
  onChange: (v: EulogisePhotobookCoverType) => void
  isShowLabel?: boolean
  pageSize?: CardProductPageSize
}

const StyledPhotobookCoverTypeSelector = styled.div`
  border: 1px solid #d9d9d9;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: ${STYLE.BORDER_RADIUS};
  line-height: 1.5715;
  user-select: none;
  overflow: hidden;
  &:hover {
    border-color: ${COLOR.CORE_PURPLE};
  }
`

const SelectorContent = styled.div<{ $height?: number; $isExpanded: boolean }>`
  transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0 0.75rem;
  ${({ $isExpanded, $height }) =>
    $height !== undefined && $isExpanded
      ? `height: ${$height}px;`
      : 'height: 0; overflow: hidden;'}
`

export const PhotobookCoverTypeSelector = ({
  className,
  value,
  onChange,
  pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
  country,
}: IFabricSelectorProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState()
  const [isExpanded, setIsExpanded] = useState(false)

  const displayLabel = PhotobookHelper.getPhotobookCoverDisplayText({
    coverType: value,
    pageSize,
    country,
  })
  const allCovers = PhotobookHelper.getPhotobookCoverTypeOptions({
    pageSize,
  })
  const linenFabrics = allCovers.filter((c) => !c.extraCost)
  const premiumVeganLeather = allCovers.filter((c) => c.extraCost)
  useEffect(() => {
    if (contentRef.current) {
      // @ts-ignore
      setHeight(PhotobookHelper.isPremiumPhotobook(pageSize) ? 332 : 166)
    }
  }, [pageSize])

  const changeHandler = (value: EulogisePhotobookCoverType) => {
    onChange(value)
    setIsExpanded(false)
  }

  return (
    <StyledPhotobookCoverTypeSelector>
      <Row
        justify="space-between"
        align="middle"
        style={{ padding: '0.25rem .75rem', cursor: 'pointer' }}
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
      >
        <Col>{displayLabel}</Col>
        <Col>
          <DownOutlined />
        </Col>
      </Row>
      <SelectorContent
        ref={contentRef}
        $height={height}
        $isExpanded={!!isExpanded}
      >
        <Row>
          <Col>Linen Fabrics</Col>
        </Row>
        <StyledFabricSelector className={className}>
          {linenFabrics.map((item: IPhotobookCoverTypeOption) => (
            <PhotobookCoverTypeSelectorItem
              key={item.value}
              coverType={item.value}
              selected={item.value === value}
              onClick={() => changeHandler(item.value)}
            />
          ))}
        </StyledFabricSelector>
        {premiumVeganLeather.length > 0 && (
          <Row>
            <Col>
              Premium Vegan Leather{' '}
              {PhotobookHelper.getPhotobookCoverExtraCostText({
                pageSize,
                country,
              })}
            </Col>
          </Row>
        )}
        <StyledFabricSelector className={className}>
          {premiumVeganLeather.map((item) => (
            <PhotobookCoverTypeSelectorItem
              key={item.value}
              coverType={item.value}
              selected={item.value === value}
              onClick={() => changeHandler(item.value)}
            />
          ))}
        </StyledFabricSelector>
      </SelectorContent>
    </StyledPhotobookCoverTypeSelector>
  )
}
