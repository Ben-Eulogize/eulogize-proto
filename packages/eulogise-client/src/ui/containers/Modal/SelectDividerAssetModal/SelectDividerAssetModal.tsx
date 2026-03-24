import React, { useState } from 'react'
import { Row, Col } from 'antd'
import {
  ICardProductDivider,
  ISelectDividerAssetModalOption,
  ModalId,
} from '@eulogise/core'
import { COLOR, EULOGISE_CARD_PRODUCT_DIVIDERS } from '@eulogise/client-core'
import {
  AssetSelector,
  Button,
  ButtonType,
  Modal,
  ColorPickerFieldWithInlinePreset,
} from '@eulogise/client-components'
import { selectUserSettingsColorAction } from '../../../store/UserSettingsState/actions'
import { hideModalAction } from '../../../store/ModalState/actions'
import {
  useEulogiseDispatch,
  useModalState,
  useUserSettingsState,
} from '../../../store/hooks'

export const SelectDividerAssetModal = () => {
  const dispatch = useEulogiseDispatch()
  const { options } = useModalState()
  const { selectedColors: recentColors } = useUserSettingsState()
  const {
    dividerName = null,
    onConfirm,
    color: existingColor,
  } = options as ISelectDividerAssetModalOption
  const dataSource = EULOGISE_CARD_PRODUCT_DIVIDERS
  const [selectedColor, setSelectedColor] = useState<string>(existingColor!)
  const [selectedDivider, setSelectedDivider] = useState<ICardProductDivider>(
    dataSource.find((d: ICardProductDivider) => d.id === dividerName)!,
  )

  const closeModal = () => {
    dispatch(hideModalAction(ModalId.DIVIDER_ASSET))
  }

  return (
    <Modal
      title="Select a divider graphic"
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
              onClick={() => {
                onConfirm({
                  divider: selectedDivider,
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
        color={selectedColor}
        dataSource={dataSource}
        onSelect={(divider: ICardProductDivider) => {
          setSelectedDivider(divider)
        }}
        selectedItem={selectedDivider}
      />
    </Modal>
  )
}
