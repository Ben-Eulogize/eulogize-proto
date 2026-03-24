import React, { useRef } from 'react'
import styled from 'styled-components'
import { Col, Row } from 'antd'
import {
  CARD_PRODUCT_OVERLAY_CORNER_OPTIONS,
  ColorPickerAlignmentType,
  EulogiseProduct,
  ICardProductData,
  ICardProductOverlayUpdateOptions,
  ICardProductTheme,
} from '@eulogise/core'
import { OverlayFormPreview } from './OverlayFormPreview'
import { COLOR, STYLE } from '@eulogise/client-core'
import { Slider } from '../Slider'
import { ColorPickerFieldWithInlinePreset } from '../ColorPickerField/ColorPickerFieldWithInlinePreset'
import { Select } from '../Select'
import { CardProductOverlayHelper } from '@eulogise/helpers'

const StyledOverlaySettingsForm = styled.div``

type IOverlaySettingsFormProps = {
  product: EulogiseProduct
  cardProduct: ICardProductData
  productTheme: ICardProductTheme
  fields: ICardProductOverlayUpdateOptions
  onFieldChange: (fields: ICardProductOverlayUpdateOptions) => void
  containerEl?: React.RefObject<HTMLDivElement>
  onColorChange?: (color: string) => void
  recentColors?: Array<string>
}

const OverlayInlineFormField = styled.div`
  border: 1px solid ${COLOR.BLACK};
  padding: 0.5rem;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${STYLE.GUTTER};
  border-radius: ${STYLE.BORDER_RADIUS};
  display: flex;
`

const StyledSlider = styled(Slider)`
  height: 210px;
  margin-top: 13px;
`

const FieldLabelText = styled.div`
  width: 55px;
`

export const OverlaySettingsForm = ({
  cardProduct,
  product,
  productTheme,
  fields,
  onFieldChange,
  onColorChange,
  recentColors,
}: IOverlaySettingsFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const displayMarks = {
    0: 'Opacity',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%',
  }

  const overlayEndPositionFieldValue =
    CardProductOverlayHelper.transformOverlayPositionToFieldValues(
      fields.overlayEndPosition!,
    )
  const overlayFadePositionFieldValue =
    CardProductOverlayHelper.transformOverlayPositionToFieldValues(
      fields.overlayFadePosition!,
    )

  const opacityValue =
    fields.overlayOpacity !== undefined ? fields.overlayOpacity * 100 : 0.85
  return (
    <StyledOverlaySettingsForm ref={containerRef}>
      <Row
        gutter={16}
        style={{ paddingBottom: STYLE.GUTTER }}
        justify="space-evenly"
      >
        <Col>
          <OverlayFormPreview
            cardProduct={cardProduct}
            product={product}
            productTheme={productTheme}
            fields={fields}
            pageSize={cardProduct?.content?.pageSize!}
          />
        </Col>
        <Col>
          <Row style={{ textAlign: 'center', marginTop: '-16px' }}>
            <Col>
              End
              <StyledSlider
                step={1}
                vertical
                reverse
                value={overlayEndPositionFieldValue}
                range
                onChange={(values: [number, number]) => {
                  onFieldChange({
                    ...fields,
                    overlayEndPosition:
                      CardProductOverlayHelper.transformFieldValuesToOverlayPosition(
                        values,
                      ),
                  })
                }}
              />
            </Col>
            <Col>
              Fade
              <StyledSlider
                step={1}
                vertical
                reverse
                value={overlayFadePositionFieldValue}
                range
                onChange={(values: [number, number]) => {
                  onFieldChange({
                    ...fields,
                    overlayFadePosition:
                      CardProductOverlayHelper.transformFieldValuesToOverlayPosition(
                        values,
                      ),
                  })
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <OverlayInlineFormField>
            <FieldLabelText>Color:</FieldLabelText>
            <ColorPickerFieldWithInlinePreset
              popupAlignment={ColorPickerAlignmentType.BOTTOM}
              color={fields.overlayColor ?? '#fff'}
              onColorSelected={(c, opacity) => {
                onFieldChange({
                  ...fields,
                  overlayColor: c,
                  overlayOpacity: opacity ? opacity : fields.overlayOpacity,
                })
                if (onColorChange) {
                  onColorChange(c)
                }
              }}
              recentColors={recentColors}
            />
          </OverlayInlineFormField>
          <OverlayInlineFormField>
            <FieldLabelText>Corners:&nbsp;</FieldLabelText>
            <Select
              value={fields.borderRadius ?? '0'}
              onChange={(v) => {
                onFieldChange({
                  ...fields,
                  borderRadius: v,
                })
              }}
              options={CARD_PRODUCT_OVERLAY_CORNER_OPTIONS}
            />
          </OverlayInlineFormField>
        </Col>
      </Row>
      <Slider
        step={1}
        defaultValue={50}
        marks={displayMarks}
        value={opacityValue}
        tooltipVisible={false}
        onChange={(v: number) => {
          onFieldChange({
            ...fields,
            overlayOpacity: v > 0 ? v / 100 : 0,
          })
        }}
        trackStyle={{
          backgroundColor: COLOR.CORE_PURPLE,
        }}
      />
    </StyledOverlaySettingsForm>
  )
}
