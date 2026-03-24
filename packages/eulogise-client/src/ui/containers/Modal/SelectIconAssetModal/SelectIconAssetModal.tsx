import React, { useState } from 'react'
import { Row, Col } from 'antd'
import {
  ICardProductIcon,
  ISelectIconAssetModalOption,
  ModalId,
} from '@eulogise/core'
import { COLOR, EULOGISE_CARD_PRODUCT_ICONS } from '@eulogise/client-core'
import {
  useEulogiseDispatch,
  useModalState,
  useUserSettingsState,
} from '../../../store/hooks'
import { hideModalAction } from '../../../store/ModalState/actions'
import { Button, ButtonType, Modal } from '@eulogise/client-components'
import { AssetSelector } from '@eulogise/client-components'
import { ColorPickerFieldWithInlinePreset } from '@eulogise/client-components/dist/ColorPickerField/ColorPickerFieldWithInlinePreset'
import { selectUserSettingsColorAction } from '../../../store/UserSettingsState/actions'

/*
type ISelectIconAssetModalProps = {
  selectedIconPath?: string
  onCancel: () => void
  onConfirm: (selectedDivider: ICardProductDivider) => void
}
*/

export const SelectIconAssetModal = () => {
  const dispatch = useEulogiseDispatch()
  const { options } = useModalState()
  const { selectedColors: recentColors } = useUserSettingsState()
  const {
    iconName: selectedIconId,
    color: existingColor,
    onConfirm,
  } = options as ISelectIconAssetModalOption
  const [selectedColor, setSelectedColor] = useState<string>(existingColor!)
  const dataSource = EULOGISE_CARD_PRODUCT_ICONS
  const [selectedIcon, setSelectedIcon] = useState<ICardProductIcon>(
    dataSource.find((d: ICardProductIcon) => d.id === selectedIconId)!,
  )

  const closeModal = () => {
    dispatch(hideModalAction(ModalId.ICON_ASSET))
  }

  return (
    <Modal
      title={'Select an icon'}
      isOpen
      onCloseClick={closeModal}
      footer={
        <Row>
          <Col flex="auto">
            <Row align="middle">
              <Col>Color:&nbsp;</Col>
              <Col>
                <ColorPickerFieldWithInlinePreset
                  color={selectedColor}
                  onColorSelected={(color) => {
                    setSelectedColor(color)
                    dispatch(selectUserSettingsColorAction({ color }))
                  }}
                  recentColors={recentColors}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              noMarginRight
              buttonType={ButtonType.TRANSPARENT}
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              noMarginRight
              buttonType={ButtonType.PRIMARY}
              disabled={!selectedIcon}
              onClick={() => {
                onConfirm({
                  icon: selectedIcon,
                  color: selectedColor,
                })
                closeModal()
              }}
            >
              Confirm
            </Button>
          </Col>
        </Row>
      }
      bodyStyle={{
        maxHeight: '70vh',
        overflowY: 'scroll',
        backgroundColor: COLOR.BEIGE_GREY,
      }}
    >
      <AssetSelector
        isIcon
        color={selectedColor}
        dataSource={dataSource}
        onSelect={(icon: ICardProductIcon) => {
          setSelectedIcon(icon)
        }}
        selectedItem={selectedIcon}
      />
    </Modal>
  )
}
