import React from 'react'

import { Dropdown } from './Dropdown'

export default {
  title: 'General/Dropdown',
  component: Dropdown,
  argTypes: {},
}

const items = [
  { label: 'item 1', key: 'item-1' }, // remember to pass the key prop
  { label: 'disabled item', key: 'item-2', disabled: true },
  { label: 'danger item', key: 'item-2', danger: true },
]

export const Default = () => (
  <Dropdown menu={{ items }}>
    <a>Hover me</a>
  </Dropdown>
)

export const Click = () => (
  <Dropdown menu={{ items }} trigger={['click']}>
    <a>Click me</a>
  </Dropdown>
)

export const ContextMenu = () => (
  <Dropdown menu={{ items }} trigger={['contextMenu']}>
    <div
      className="site-dropdown-context-menu"
      style={{
        textAlign: 'center',
        height: 200,
        lineHeight: '200px',
        backgroundColor: '#ccc',
      }}
    >
      Right Click on here
    </div>
  </Dropdown>
)
