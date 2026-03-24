import React from 'react'

import { Card } from './Card'

export default {
  title: 'DataDisplay/Card',
  component: Card,
}

export const Default = () => (
  <Card
    title="Default size card"
    extra={<a href="#">More</a>}
    style={{ width: 300 }}
  >
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
)
