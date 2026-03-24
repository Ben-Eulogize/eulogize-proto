import React from 'react'
import styled from 'styled-components'
import { Switch } from 'antd'
import { Drawer, DrawerPlacement } from '../Drawer'
import { Button, ButtonType } from '../../Button'
import { HeaderTextSM, Text } from '../../Text'
import { COLOR, STYLE } from '@eulogise/client-core'
import {
  EditIcon,
  ExpandWidthIcon,
  FadeImageSettingsIcon,
  ImageLayoutIcon,
  MagicWandIcon,
  RemoveBackgroundImageIcon,
} from '../../icons'
import { Slider } from '../../Slider'
import { InputNumber } from '../../InputNumber'

export interface IPhotoFrameEffectsDrawerProps {
  isOpen: boolean
  onClose: () => void
  // Existing callbacks (wired)
  onEditImage: () => void
  onEnhance: () => void
  isEnhanced: boolean
  onBgRemover: () => void
  onChangeLayout: () => void
  onToggleFadeImage: () => void
  isFadeImageEnabled: boolean
  onFullWidthClick: () => void
  isFullWidth: boolean
  onToggleBorder: () => void
  isBorderEnabled: boolean
  hasSelectedImage: boolean
  hasGraphicFrame: boolean
  disableFadeEdge: boolean
  isDisabledFrameEffect?: boolean
  // Placeholder callbacks (for future)
  onRotateLeft?: () => void
  onRotateRight?: () => void
  onFlipHorizontal?: () => void
  onFlipVertical?: () => void
  onTransparencyChange?: (value: number) => void
  transparency?: number
  onBorderColorChange?: (color: string) => void
  borderColor?: string
  onBorderThicknessChange?: (value: number) => void
  borderThickness?: number
}

/*
const StyledButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`
*/

const StyledButton = styled(Button)`
  margin-bottom: 0.5rem;
  position: relative;

  > span.anticon,
  > svg {
    position: absolute;
    left: 1rem;
  }
`

const StyledSliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`

/*
const StyledColorCircle = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  border: 2px solid #d9d9d9;
  cursor: pointer;
`
*/

const StyledSwitchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

/*const StyledButton = styled(Button)`
const StyledSubSection = styled.div`
  padding-left: 16px;
  margin-bottom: 8px;
`
*/

const StyledDivider = styled.hr`
  border: none;
  border-top: 1px solid #e8e8e8;
  margin: 16px 0;
`

const StyledPhotoFrameEffectsDrawer = styled(Drawer)`
  position: absolute;
  .ant-drawer-content-wrapper {
    margin-top: 1px;
    box-shadow: 0 0 0.25rem ${COLOR.CORE_PURPLE};
  }
  .ant-drawer-header {
    background-color: ${COLOR.CORE_PURPLE_10} !important;
    padding: 0.5rem 24px;

    button {
      margin-right: 0;
    }
  }
  .ant-drawer-body {
    padding-top: 0.25rem;
  }
`

const StyledLabel = styled(Text).attrs({
  $block: true,
})`
  ${STYLE.TEXT_SMALL};
  margin-bottom: 0.25rem;
`

const StyledHeaderText = styled(HeaderTextSM)`
  color: ${COLOR.CORE_PURPLE};
  margin-bottom: 0.25rem;
`

const DrawerContent = styled.div``

export const PhotoFrameEffectsDrawer: React.FC<
  IPhotoFrameEffectsDrawerProps
> = ({
  isOpen,
  onClose,
  onEditImage,
  onEnhance,
  isEnhanced,
  onBgRemover,
  onChangeLayout,
  onToggleFadeImage,
  isFadeImageEnabled,
  onFullWidthClick,
  isFullWidth,
  onToggleBorder,
  isBorderEnabled,
  hasSelectedImage,
  hasGraphicFrame,
  disableFadeEdge,
  isDisabledFrameEffect = false,
  onRotateLeft,
  onRotateRight,
  onFlipHorizontal,
  onFlipVertical,
  onTransparencyChange,
  transparency = 100,
  onBorderColorChange,
  borderColor = '#000000',
  onBorderThicknessChange,
  borderThickness = 1,
}) => {
  return (
    <StyledPhotoFrameEffectsDrawer
      placement={DrawerPlacement.LEFT}
      isOpen={isOpen}
      closeIcon={
        <Button
          block
          noMarginRight
          buttonType={ButtonType.TRANSPARENT}
          onClick={onClose}
        >
          Close
        </Button>
      }
      title={<StyledHeaderText>Image Effects</StyledHeaderText>}
      width="22rem"
      mask={false}
      getContainer="#photo-frame-effects-drawer-target"
    >
      <DrawerContent
        onClick={(ev) => {
          ev.stopPropagation()
          ev.preventDefault()
        }}
      >
        {/* Photo Effects Section */}
        <StyledHeaderText>Photo Effects</StyledHeaderText>

        {/*<StyledLabel>Rotate</StyledLabel>
        <StyledButtonGroup>
          <StyledButton
            onClick={onRotateLeft}
            disabled={!onRotateLeft}
            buttonType={ButtonType.TRANSPARENT}
            block
            noMarginRight
            noMarginLeft
          >
            Left
          </StyledButton>
          <StyledButton
            onClick={onRotateRight}
            disabled={!onRotateRight}
            buttonType={ButtonType.TRANSPARENT}
            block
            noMarginRight
            noMarginLeft
          >
            Right
          </StyledButton>
        </StyledButtonGroup>

        <StyledLabel>Flip</StyledLabel>
        <StyledButtonGroup>
          <StyledButton
            onClick={onFlipHorizontal}
            disabled={!onFlipHorizontal}
            buttonType={ButtonType.TRANSPARENT}
            block
            noMarginRight
            noMarginLeft
          >
            Horizontal
          </StyledButton>
          <StyledButton
            onClick={onFlipVertical}
            disabled={!onFlipVertical}
            buttonType={ButtonType.TRANSPARENT}
            block
            noMarginRight
            noMarginLeft
          >
            Vertical
          </StyledButton>
        </StyledButtonGroup>
*/}
        <StyledButton
          onClick={onEditImage}
          disabled={!hasSelectedImage}
          icon={<EditIcon />}
          buttonType={ButtonType.TRANSPARENT}
          block
          noMarginRight
          noMarginLeft
        >
          Edit Photo
        </StyledButton>

        <StyledButton
          onClick={onEnhance}
          disabled={!hasSelectedImage}
          buttonType={isEnhanced ? ButtonType.PRIMARY : ButtonType.TRANSPARENT}
          icon={<MagicWandIcon />}
          block
          noMarginRight
          noMarginLeft
        >
          Enhance Photo
        </StyledButton>

        <StyledButton
          onClick={onBgRemover}
          disabled={!hasSelectedImage}
          buttonType={ButtonType.TRANSPARENT}
          block
          noMarginRight
          noMarginLeft
          icon={<RemoveBackgroundImageIcon />}
        >
          Remove Background
        </StyledButton>

        <StyledDivider />

        {/* Frame Effects Section */}
        <StyledHeaderText>Frame Effects</StyledHeaderText>

        <StyledButton
          onClick={onChangeLayout}
          buttonType={ButtonType.TRANSPARENT}
          icon={<ImageLayoutIcon />}
          block
          noMarginRight
          noMarginLeft
        >
          Change Frame Layout
        </StyledButton>

        <StyledLabel>Transparency</StyledLabel>
        <StyledSliderRow>
          <Slider
            min={0}
            max={100}
            value={transparency}
            onChange={(value: number) => onTransparencyChange?.(value)}
            style={{ flex: 1 }}
            disabled={!onTransparencyChange}
          />
          <InputNumber
            min={0}
            max={100}
            value={transparency}
            onChange={(value) =>
              onTransparencyChange?.((value as number) ?? 100)
            }
            size="small"
            style={{ width: 60 }}
            disabled={!onTransparencyChange}
          />
        </StyledSliderRow>

        <StyledButton
          onClick={onToggleFadeImage}
          disabled={disableFadeEdge || isDisabledFrameEffect}
          icon={<FadeImageSettingsIcon />}
          buttonType={
            !disableFadeEdge && isFadeImageEnabled
              ? ButtonType.HIGHLIGHTED_BUTTON
              : ButtonType.TRANSPARENT
          }
          block
          noMarginRight
          noMarginLeft
        >
          Blur Edges
        </StyledButton>

        <StyledButton
          onClick={onFullWidthClick}
          disabled={hasGraphicFrame || isDisabledFrameEffect}
          icon={<ExpandWidthIcon />}
          buttonType={
            isFullWidth ? ButtonType.HIGHLIGHTED_BUTTON : ButtonType.TRANSPARENT
          }
          block
          noMarginRight
          noMarginLeft
        >
          Full Width Photo
        </StyledButton>

        <StyledSwitchRow>
          <StyledLabel>Add Photo Border</StyledLabel>
          <Switch
            checked={isBorderEnabled}
            onChange={onToggleBorder}
            disabled={hasGraphicFrame || isDisabledFrameEffect}
          />
        </StyledSwitchRow>
        {/*
        {isBorderEnabled && (
          <StyledSubSection>
            <StyledLabel>Color</StyledLabel>
            <StyledColorCircle
              $color={borderColor}
              onClick={() => onBorderColorChange?.(borderColor)}
            />

            <StyledLabel>Border thickness</StyledLabel>
            <StyledSliderRow>
              <Slider
                min={1}
                max={20}
                value={borderThickness}
                onChange={(value: number) => onBorderThicknessChange?.(value)}
                style={{ flex: 1 }}
                disabled={!onBorderThicknessChange}
              />
              <InputNumber
                min={1}
                max={20}
                value={borderThickness}
                onChange={(value) => onBorderThicknessChange?.(value ?? 1)}
                size="small"
                style={{ width: 60 }}
                disabled={!onBorderThicknessChange}
              />
            </StyledSliderRow>
          </StyledSubSection>
        )}*/}
      </DrawerContent>
    </StyledPhotoFrameEffectsDrawer>
  )
}
