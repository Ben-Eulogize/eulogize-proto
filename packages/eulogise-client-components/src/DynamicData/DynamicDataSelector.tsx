import {
  CARD_PRODUCT_DYNAMIC_DATA_FIELDS,
  CardProductContentItemType,
} from '@eulogise/core'
import { Select } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

// @ts-ignore
const StyledSelect = styled(Select)`
  && > .ant-select-selector:hover {
    border: 1px solid white;
  }
`
interface IDynamicDataSelector {
  width?: number
  type:
    | CardProductContentItemType.TEXT
    | CardProductContentItemType.IMAGE
    | CardProductContentItemType.FRAME
  onSelect: (value: string) => void
  isRowHovered: boolean
  value?: string
}

const DynamicDataSelector: React.FunctionComponent<IDynamicDataSelector> = ({
  width,
  type,
  onSelect,
  isRowHovered,
  value,
}) => {
  return (
    <StyledSelect
      style={{
        width,
        border: `1px solid ${isRowHovered ? COLOR.CORNFLOWER_BLUE : 'white'}`,
      }}
      dropdownStyle={{ zIndex: 9999 }}
      placeholder="Assign Dynamic Data"
      allowClear
      options={CARD_PRODUCT_DYNAMIC_DATA_FIELDS[type]}
      onSelect={onSelect}
      onClear={() => onSelect('')}
      value={value}
    />
  )
}

export default DynamicDataSelector
