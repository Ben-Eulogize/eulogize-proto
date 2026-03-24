import React, { useState } from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import { SketchPicker } from 'react-color'
import {
  COLOR,
  SLIDESHOW_COLORS,
  useDetectClickOutside,
} from '@eulogise/client-core'
import { ColorPickerMultiColorButton } from './ColorPickerMultiColorButton'
import { ColorPickerButton } from './ColorPickerButton'
import { ColorPickerAlignmentType } from '@eulogise/core'

const StyledColorPickerFieldWithInlinePreset = styled.div`
  margin: 0.15rem 0;
`

const SketchPickerPopup = styled.div<{ $alignment: ColorPickerAlignmentType }>`
  position: absolute;
  width: auto;
  height: auto;
  z-index: 11;
  ${({ $alignment }) =>
    $alignment === ColorPickerAlignmentType.TOP
      ? // move the popup above the Select Color text
        `
    transform: translateY(
      calc(-100% - 1.5rem)
    );
`
      : ``}
`

const Color = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  ${({ color }) =>
    color
      ? `
    background-color: ${color};
  `
      : ''}
`

type IColorPickerFieldWithInlinePresetProps = {
  color: string
  onColorSelected?: (color: string, opacity?: number) => void
  inlinePresetColors?: Array<string>
  recentColors?: Array<string>
  popupAlignment?: ColorPickerAlignmentType
}

export const ColorPickerFieldWithInlinePreset = ({
  color,
  onColorSelected,
  inlinePresetColors = [
    COLOR.BLACK,
    COLOR.WHITE,
    COLOR.MAGENTA,
    COLOR.REGAL_BLUE,
  ],
  recentColors = [],
  popupAlignment = ColorPickerAlignmentType.TOP,
}: IColorPickerFieldWithInlinePresetProps) => {
  const [isShowColorPopup, setIsShowColorPopup] = useState<boolean>()
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setIsShowColorPopup(false)
    },
  })
  const recentColor = recentColors?.[0]
  return (
    <StyledColorPickerFieldWithInlinePreset ref={ref}>
      <Row gutter={4} align={'middle'}>
        <Col>
          <ColorPickerMultiColorButton
            onClick={() => {
              setIsShowColorPopup(true)
            }}
          />
        </Col>
        {inlinePresetColors.map((presetColor: string) => (
          <Col>
            <ColorPickerButton
              onClick={() => {
                if (onColorSelected) {
                  onColorSelected(presetColor)
                }
              }}
            >
              <Color color={presetColor} />
            </ColorPickerButton>
          </Col>
        ))}
        {recentColor && (
          <Col>
            <ColorPickerButton
              onClick={() => {
                if (onColorSelected) {
                  onColorSelected(recentColor)
                }
              }}
            >
              <Color color={recentColor} />
            </ColorPickerButton>
          </Col>
        )}
      </Row>
      {isShowColorPopup && (
        <SketchPickerPopup $alignment={popupAlignment}>
          <SketchPicker
            color={color}
            onChangeComplete={(color) => {
              if (onColorSelected) {
                const opacity = color.rgb.a !== 1 ? color.rgb.a : undefined
                onColorSelected(color.hex, opacity!)
                setIsShowColorPopup(false)
              }
            }}
            presetColors={SLIDESHOW_COLORS.map((c) => c.color).concat(
              recentColors,
            )}
          />
        </SketchPickerPopup>
      )}
    </StyledColorPickerFieldWithInlinePreset>
  )
}
