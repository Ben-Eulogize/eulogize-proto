import React, { useState } from 'react'
import ColorSelectorDropdownMenu from './ColorSelectorDropdownMenu'
import { useDetectClickOutside } from '@eulogise/client-core'
import { Dropdown } from './Dropdown'
import { DropdownPlacement } from './Dropdown.interface'

interface IColorSelectorDropdownProps {
  children: React.ReactNode
  onColorSelect: (color: string) => void
}

const ColorSelectorDropdown: React.FC<IColorSelectorDropdownProps> = ({
  children,
  onColorSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useDetectClickOutside({ onTriggered: () => setIsOpen(false) })
  return (
    <div ref={ref}>
      <Dropdown
        visible={isOpen}
        placement={DropdownPlacement.BOTTOM_LEFT}
        overlayStyle={{
          zIndex: 10000,
        }}
        overlay={
          <ColorSelectorDropdownMenu
            onColorSelect={(color: string) => {
              onColorSelect(color)
              setIsOpen(false)
            }}
          />
        }
      >
        <div onClick={() => setIsOpen(true)}>{children}</div>
      </Dropdown>
    </div>
  )
}

export default ColorSelectorDropdown
