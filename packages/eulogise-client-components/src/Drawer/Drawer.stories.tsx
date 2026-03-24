import React, { useState } from 'react'
import { Drawer, DrawerPlacement } from './Drawer'
import { Button } from '../Button'

export default {
  title: 'Feedback/Drawer',
  component: Drawer,
  argTypes: {},
}

const DemoDrawer = ({
  placement = DrawerPlacement.LEFT,
}: {
  placement?: DrawerPlacement
}) => {
  const [isShowDrawer, setShowDrawer] = useState<boolean>(false)
  return (
    <>
      <Button onClick={() => setShowDrawer(true)}>Open</Button>
      <Drawer
        title="Basic Drawer"
        placement={placement}
        onClose={() => setShowDrawer(false)}
        isOpen={isShowDrawer}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

export const Default = () => <DemoDrawer />
export const RightPlacement = () => (
  <DemoDrawer placement={DrawerPlacement.RIGHT} />
)
export const BottomPlacement = () => (
  <DemoDrawer placement={DrawerPlacement.BOTTOM} />
)
export const TopPlacement = () => <DemoDrawer placement={DrawerPlacement.TOP} />
