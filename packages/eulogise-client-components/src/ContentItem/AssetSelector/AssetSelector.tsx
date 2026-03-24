import React from 'react'
import { EULOGISE_CARD_PRODUCT_DIVIDERS } from '@eulogise/client-core'
import styled from 'styled-components'
import { List } from '../../List'
import { Radio } from '../../Radio'
import { COLOR } from '@eulogise/client-core'
import { ICardProductDivider, ICardProductIcon } from '@eulogise/core'
import { IconAsset } from '../../IconAsset/IconAsset'
import { DividerAsset } from '../../DividerAsset/DividerAsset'

interface IAssetSelectorProps {
  isIcon?: boolean
  color?: string
  selectedItem: ICardProductDivider | ICardProductIcon
  // @ts-ignore
  onSelect: (...args) => any
  dataSource?: Array<ICardProductDivider | ICardProductIcon>
}

const StyledAssetItemContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid transparent;

  &:hover,
  &.selected {
    background-color: whitesmoke;
    border: 1px solid ${COLOR.SHALLOW_GREY};
  }
`

const StyledAssetContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0.2rem 16px 0.2rem 0;
`

const StyledIconAsset = styled(IconAsset)`
  width: 50px;
  height: 50px;
`

const StyledDividerAsset = styled(DividerAsset)`
  height: 50px;
  width: 100%;
`

export const AssetSelector = ({
  isIcon = false,
  color = COLOR.BLACK,
  onSelect,
  selectedItem,
  dataSource = EULOGISE_CARD_PRODUCT_DIVIDERS,
}: IAssetSelectorProps) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      // @ts-ignore
      renderItem={(asset: ICardProductDivider) => {
        const isSelected = (selectedItem?.id || null) === asset.id
        return (
          <StyledAssetItemContainer
            // selected={selected}
            onClick={() => onSelect(asset)}
          >
            <StyledAssetContainer>
              {isIcon ? (
                <StyledIconAsset
                  name={asset.id}
                  style={{ fill: color, stroke: color }}
                />
              ) : asset.id ? (
                <StyledDividerAsset
                  name={asset.id}
                  style={{ fill: color, stroke: color }}
                />
              ) : (
                'Clear Divider'
              )}
            </StyledAssetContainer>

            <div>
              <Radio checked={isSelected} />
            </div>
          </StyledAssetItemContainer>
        )
      }}
    />
  )
}
