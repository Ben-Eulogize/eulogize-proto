import React, { useState } from 'react'
import styled from 'styled-components'
import {
  IGenericCardProductTypeData,
  IGenericCardProductTypeAvailability,
  GenericCardProductTypeOutputFormat,
  GenericCardProductTypeFoldType,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { Row, Col, UploadFile } from 'antd'
import {
  SubTitle,
  Button,
  ButtonType,
  Divider,
  Select,
  SelectOption,
  ButtonSize,
  TextField,
  LockIcon,
  UnlockIcon,
  SwitchButton,
} from '@eulogise/client-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import { ProductImageDragger } from './ProductImageDragger'
import { GenericCardProductTypePreview } from './GenericCardProductTypePreview'

const StyledForm = styled.form``

const StyledImageContainer = styled.div`
  margin-bottom: ${STYLE.GUTTER};
`

const StyledAspectRatioLabel = styled.div`
  color: ${COLOR.DOVE_GREY};
  font-size: 12px;
  white-space: nowrap;
  text-align: right;
`

const StyledPxHint = styled.div`
  color: ${COLOR.DOVE_GREY};
  font-size: 11px;
  margin-top: -4px;
`

const StyledDimensionsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${STYLE.HALF_GUTTER};
  margin-top: ${STYLE.GUTTER};
`

const StyledLockButton = styled.button<{ $locked: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border: 1px solid
    ${({ $locked }) => ($locked ? COLOR.CORE_PURPLE : COLOR.DOVE_GREY)};
  border-radius: 4px;
  background: ${({ $locked }) => ($locked ? COLOR.CORE_PURPLE : 'transparent')};
  color: ${({ $locked }) => ($locked ? '#fff' : COLOR.DOVE_GREY)};
  font-size: 12px;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    opacity: 0.8;
  }
`

// Calculate and format aspect ratio
const getAspectRatio = (width: number, height: number): string | null => {
  if (width <= 0 || height <= 0) return null

  // Find GCD using Euclidean algorithm
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const divisor = gcd(width, height)

  const ratioWidth = width / divisor
  const ratioHeight = height / divisor

  // If the simplified ratio has small numbers, show as whole numbers (e.g., 3:4)
  if (ratioWidth <= 20 && ratioHeight <= 20) {
    return `${ratioWidth}:${ratioHeight}`
  }

  // Otherwise show as decimal ratio normalized to 1 (e.g., 1:1.41)
  const decimalRatio = height / width
  return `1:${decimalRatio.toFixed(2)}`
}

const StyledImageTitle = styled.div`
  color: ${COLOR.CORE_PURPLE};
  margin-top: ${STYLE.HALF_GUTTER};
`

const StyledAvailabilityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 8px 24px;
  align-items: center;
`

const StyledAvailabilityHeader = styled.div`
  font-weight: 600;
  color: ${COLOR.CORE_PURPLE};
  font-size: 12px;
  text-align: center;
`

const StyledAvailabilityLabel = styled.div``

const DEFAULT_AVAILABILITY: IGenericCardProductTypeAvailability = {
  directUsers: { available: false, default: false },
  funeralHomes: { available: false, default: false },
}

export interface IGenericCardProductTypeFormValues {
  name: string
  slug?: string
  dimensions: Array<{
    name: string
    width: number
    height: number
    pageMarginsX: number
    pageMarginsY: number
    overlayMarginX: number
    overlayMarginY: number
    heroImage?: string
    heroImageDragger?: Array<UploadFile<any>>
  }>
  foldType: GenericCardProductTypeFoldType
  outputFormat: GenericCardProductTypeOutputFormat
  minPages: number
  maxPages: number
  defaultPages: number
  availability?: IGenericCardProductTypeAvailability
  productImage?: string
  productImageDragger?: Array<UploadFile<any>>
}

const StyledSelect = styled(Select)`
  display: inline-block;
  width: 5rem;
`

interface IGenericCardProductTypeFormProps {
  currentProductType?: IGenericCardProductTypeData
  submitButtonText: string
  isSubmitting?: boolean
  onSubmit: (values: IGenericCardProductTypeFormValues) => void
  onCancel?: () => void
}

export const GenericCardProductTypeForm = ({
  currentProductType,
  submitButtonText,
  onCancel,
  isSubmitting,
  onSubmit,
}: IGenericCardProductTypeFormProps) => {
  const [previewDimensionIndex, setPreviewDimensionIndex] = useState(0)
  const [isAspectRatioLocked, setIsAspectRatioLocked] = useState(true)
  const [dimensionUnit, setDimensionUnit] = useState<'mm' | 'px'>('mm')

  const mmToPx = CardProductHelper.mmToPx
  const pxToMm = CardProductHelper.pxToMm

  const [fields, setFields] = useState<IGenericCardProductTypeFormValues>(
    currentProductType
      ? {
          ...(currentProductType as unknown as IGenericCardProductTypeFormValues),
          availability: currentProductType.availability || DEFAULT_AVAILABILITY,
          productImageDragger: [],
          // DB values are in pixels — convert to mm for default form display
          dimensions: currentProductType.dimensions.map((d) => ({
            ...d,
            width: pxToMm(d.width),
            height: pxToMm(d.height),
            pageMarginsX: pxToMm(d.pageMarginsX),
            pageMarginsY: pxToMm(d.pageMarginsY),
          })),
        }
      : {
          name: '',
          slug: '',
          dimensions: [
            {
              name: '',
              width: 0,
              height: 0,
              pageMarginsX: 10,
              pageMarginsY: 10,
              overlayMarginX: 0,
              overlayMarginY: 0,
            },
          ],
          foldType: GenericCardProductTypeFoldType.SINGLE_SIDE,
          outputFormat: GenericCardProductTypeOutputFormat.PDF,
          minPages: 1,
          maxPages: 4,
          defaultPages: 4,
          availability: DEFAULT_AVAILABILITY,
          productImage: undefined,
          productImageDragger: [],
        },
  )

  const isFixedPageCount =
    fields.foldType === GenericCardProductTypeFoldType.SINGLE_SIDE ||
    fields.foldType === GenericCardProductTypeFoldType.DOUBLE_SIDED

  const isValid =
    fields.name &&
    fields.slug &&
    fields.dimensions.length > 0 &&
    fields.dimensions.every(
      (d) =>
        d.name.trim() &&
        d.width > 0 &&
        d.height > 0 &&
        d.pageMarginsX !== undefined &&
        d.pageMarginsY !== undefined &&
        d.overlayMarginX !== undefined &&
        d.overlayMarginY !== undefined,
    ) &&
    fields.outputFormat &&
    (isFixedPageCount || fields.defaultPages > 0)

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    setFields({
      ...fields,
      name,
      slug,
    })
  }

  const handleAddDimension = () => {
    const firstDimension = fields.dimensions[0]
    setFields({
      ...fields,
      dimensions: [
        ...fields.dimensions,
        {
          name: '',
          width: isAspectRatioLocked ? firstDimension.width : 0,
          height: isAspectRatioLocked ? firstDimension.height : 0,
          pageMarginsX: 10,
          pageMarginsY: 10,
          overlayMarginX: 0,
          overlayMarginY: 0,
          heroImageDragger: [],
        },
      ],
    })
  }

  const handleRemoveDimension = (index: number) => {
    if (fields.dimensions.length <= 1) {
      // Don't allow removing the last dimension
      return
    }
    // Reset preview index if the removed dimension is at or after the current preview index
    if (
      previewDimensionIndex >= fields.dimensions.length - 1 ||
      index <= previewDimensionIndex
    ) {
      setPreviewDimensionIndex(0)
    }
    setFields({
      ...fields,
      dimensions: fields.dimensions.filter((_, i) => i !== index),
    })
  }

  const handleDimensionChange = (
    index: number,
    field:
      | 'name'
      | 'width'
      | 'height'
      | 'pageMarginsX'
      | 'pageMarginsY'
      | 'overlayMarginX'
      | 'overlayMarginY',
    value: string | number,
  ) => {
    const newDimensions = [...fields.dimensions]
    newDimensions[index] = {
      ...newDimensions[index],
      [field]: field === 'name' ? value : Number(value),
    }

    // Enforce same aspect ratio across all dimensions (only when locked)
    if (isAspectRatioLocked && (field === 'width' || field === 'height')) {
      const numValue = Number(value)

      if (index === 0) {
        // First dimension changed — mirror the same field on all other dimensions
        const firstWidth = field === 'width' ? numValue : newDimensions[0].width
        const firstHeight =
          field === 'height' ? numValue : newDimensions[0].height

        if (firstWidth > 0 && firstHeight > 0) {
          const aspectRatio = firstHeight / firstWidth
          for (let i = 1; i < newDimensions.length; i++) {
            if (field === 'width') {
              // Width changed — adjust other dimensions' widths, keep their heights
              newDimensions[i] = {
                ...newDimensions[i],
                width: Math.round(newDimensions[i].height / aspectRatio),
              }
            } else {
              // Height changed — adjust other dimensions' heights, keep their widths
              newDimensions[i] = {
                ...newDimensions[i],
                height: Math.round(newDimensions[i].width * aspectRatio),
              }
            }
          }
        }
      } else {
        // Non-first dimension changed — auto-adjust the other dimension
        const firstWidth = newDimensions[0].width
        const firstHeight = newDimensions[0].height

        if (firstWidth > 0 && firstHeight > 0) {
          const aspectRatio = firstHeight / firstWidth

          if (field === 'width' && numValue > 0) {
            newDimensions[index] = {
              ...newDimensions[index],
              height: Math.round(numValue * aspectRatio),
            }
          } else if (field === 'height' && numValue > 0) {
            newDimensions[index] = {
              ...newDimensions[index],
              width: Math.round(numValue / aspectRatio),
            }
          }
        }
      }
    }

    setFields({
      ...fields,
      dimensions: newDimensions,
    })
  }
  return (
    <StyledForm
      onSubmit={(ev) => {
        ev.preventDefault()
        if (isValid) {
          // Always submit in pixels — convert if currently in mm
          const convertedFields =
            dimensionUnit === 'mm'
              ? {
                  ...fields,
                  dimensions: fields.dimensions.map((d) => ({
                    ...d,
                    width: mmToPx(d.width),
                    height: mmToPx(d.height),
                    pageMarginsX: mmToPx(d.pageMarginsX),
                    pageMarginsY: mmToPx(d.pageMarginsY),
                  })),
                }
              : fields
          onSubmit(convertedFields)
        }
      }}
    >
      <Row gutter={24}>
        <Col span={14}>
          <TextField
            labelText="Product Name"
            placeholder="e.g., A4 Booklet, DL Card, 4x6 Photo"
            required
            value={fields.name}
            onChange={handleNameChange}
            labelTextColor={COLOR.CORE_PURPLE}
          />
          <TextField
            labelText="Slug"
            placeholder="Slug"
            // Auto-generated from name. Used in URLs and API calls.
            required
            value={fields.slug as string}
            onChange={(ev) => {
              setFields({ ...fields, slug: ev.target.value })
            }}
            labelTextColor={COLOR.CORE_PURPLE}
          />
          <StyledImageContainer>
            <StyledImageTitle>Image</StyledImageTitle>
            <ProductImageDragger
              productTypeId={currentProductType?.id}
              productImage={currentProductType?.productImage}
              onChange={(fileList) => {
                setFields({ ...fields, productImageDragger: fileList })
              }}
            />
          </StyledImageContainer>
          <Divider />
          <SubTitle>Output Configuration</SubTitle>
          <Select
            labelText="Output Formats"
            placeholder="Select supported output formats"
            value={fields.outputFormat}
            onChange={(val) => {
              setFields({ ...fields, outputFormat: val })
            }}
            labelTextColor={COLOR.CORE_PURPLE}
          >
            <SelectOption value={GenericCardProductTypeOutputFormat.PDF}>
              PDF
            </SelectOption>
            <SelectOption value={GenericCardProductTypeOutputFormat.JPEG}>
              JPEG
            </SelectOption>
          </Select>

          <Select
            labelText="Fold Type"
            placeholder="Select fold type"
            value={fields.foldType}
            onChange={(val) => {
              const updates: Partial<IGenericCardProductTypeFormValues> = {
                foldType: val,
              }
              // Set fixed page counts for fold types that don't need configuration
              if (val === GenericCardProductTypeFoldType.SINGLE_SIDE) {
                updates.minPages = 1
                updates.maxPages = 1
                updates.defaultPages = 1
              } else if (val === GenericCardProductTypeFoldType.DOUBLE_SIDED) {
                updates.minPages = 2
                updates.maxPages = 2
                updates.defaultPages = 2
              }
              setFields({ ...fields, ...updates })
            }}
            labelTextColor={COLOR.CORE_PURPLE}
          >
            <SelectOption value={GenericCardProductTypeFoldType.SINGLE_SIDE}>
              Single Sided
            </SelectOption>
            <SelectOption value={GenericCardProductTypeFoldType.DOUBLE_SIDED}>
              Double Sided (Front & Back)
            </SelectOption>
            <SelectOption value={GenericCardProductTypeFoldType.BIFOLD}>
              Bifold (2 Panels)
            </SelectOption>
            <SelectOption value={GenericCardProductTypeFoldType.TRIFOLD}>
              Trifold (3 Panels)
            </SelectOption>
          </Select>

          {fields.foldType !== GenericCardProductTypeFoldType.SINGLE_SIDE &&
            fields.foldType !== GenericCardProductTypeFoldType.DOUBLE_SIDED && (
              <>
                <Divider />
                <SubTitle>Page Configuration</SubTitle>
                <Row gutter={16}>
                  <Col span={4}>
                    <TextField
                      labelText="Minimum Pages"
                      value={fields.minPages || ''}
                      onChange={(ev) =>
                        setFields({
                          ...fields,
                          minPages: Number(ev.target.value),
                        })
                      }
                      placeholder="e.g., 1"
                      inputType="number"
                      min={1}
                      max={100}
                      labelTextColor={COLOR.CORE_PURPLE}
                    />
                  </Col>
                  <Col span={4}>
                    <TextField
                      labelText="Maximum Pages"
                      value={fields.maxPages || ''}
                      onChange={(ev) =>
                        setFields({
                          ...fields,
                          maxPages: Number(ev.target.value),
                        })
                      }
                      placeholder="e.g., 100"
                      inputType="number"
                      min={1}
                      max={1000}
                      labelTextColor={COLOR.CORE_PURPLE}
                    />
                  </Col>
                  <Col span={4}>
                    <TextField
                      labelText="Default # of Pages"
                      value={fields.defaultPages || ''}
                      onChange={(ev) =>
                        setFields({
                          ...fields,
                          defaultPages: Number(ev.target.value),
                        })
                      }
                      placeholder="e.g., 4"
                      inputType="number"
                      min={1}
                      max={1000}
                      required
                      labelTextColor={COLOR.CORE_PURPLE}
                    />
                  </Col>
                </Row>
              </>
            )}

          <StyledDimensionsHeader>
            <SubTitle style={{ flex: 'none' }}>Dimensions</SubTitle>
            <StyledSelect
              value={dimensionUnit}
              onChange={(val: 'mm' | 'px') => {
                const prev = dimensionUnit
                setDimensionUnit(val)
                if (prev !== val) {
                  const convert = val === 'px' ? mmToPx : pxToMm
                  setFields((f) => ({
                    ...f,
                    dimensions: f.dimensions.map((d) => ({
                      ...d,
                      width: convert(d.width),
                      height: convert(d.height),
                      pageMarginsX: convert(d.pageMarginsX),
                      pageMarginsY: convert(d.pageMarginsY),
                    })),
                  }))
                }
              }}
              width={'100px'}
            >
              <SelectOption value="mm">mm</SelectOption>
              <SelectOption value="px">px</SelectOption>
            </StyledSelect>
            {fields.dimensions.length > 1 && (
              <StyledLockButton
                type="button"
                $locked={isAspectRatioLocked}
                onClick={() => {
                  const newLocked = !isAspectRatioLocked
                  setIsAspectRatioLocked(newLocked)

                  // When locking, adjust all dimensions to match the first dimension's aspect ratio
                  if (newLocked) {
                    const first = fields.dimensions[0]
                    if (first.width > 0 && first.height > 0) {
                      const aspectRatio = first.height / first.width
                      const updatedDimensions = fields.dimensions.map(
                        (dim, i) => {
                          if (i === 0) return dim
                          return {
                            ...dim,
                            height: Math.round(dim.width * aspectRatio),
                          }
                        },
                      )
                      setFields({ ...fields, dimensions: updatedDimensions })
                    }
                  }
                }}
                title={
                  isAspectRatioLocked
                    ? 'Aspect ratio locked — all dimensions share the same ratio'
                    : 'Aspect ratio unlocked — each dimension can have its own ratio'
                }
              >
                {isAspectRatioLocked ? <LockIcon /> : <UnlockIcon />}
                {isAspectRatioLocked ? 'Ratio Locked' : 'Ratio Unlocked'}
              </StyledLockButton>
            )}
          </StyledDimensionsHeader>

          {fields.dimensions.map((dimension, index) => (
            <div key={`dimension-${index}`}>
              <Row gutter={16}>
                <Col span={8}>
                  <TextField
                    labelText={`Name`}
                    value={dimension.name}
                    onChange={(ev) =>
                      handleDimensionChange(index, 'name', ev.target.value)
                    }
                    required
                    placeholder="e.g., Small, Medium, Large"
                    labelTextColor={COLOR.CORE_PURPLE}
                  />
                  {getAspectRatio(dimension.width, dimension.height) && (
                    <StyledAspectRatioLabel>
                      Ratio: {getAspectRatio(dimension.width, dimension.height)}
                    </StyledAspectRatioLabel>
                  )}
                </Col>
                <Col>
                  <TextField
                    labelText={`Width (${dimensionUnit})`}
                    value={dimension.width}
                    onChange={(ev) =>
                      handleDimensionChange(index, 'width', ev.target.value)
                    }
                    required
                    placeholder="e.g., 210"
                    inputType="number"
                    min={10}
                    max={10000}
                    labelTextColor={COLOR.CORE_PURPLE}
                  />
                  {dimensionUnit === 'mm' && dimension.width > 0 && (
                    <StyledPxHint>
                      {Math.round(mmToPx(dimension.width))}px
                    </StyledPxHint>
                  )}
                </Col>
                <Col>
                  <TextField
                    labelText={`Height (${dimensionUnit})`}
                    value={dimension.height}
                    onChange={(ev) =>
                      handleDimensionChange(index, 'height', ev.target.value)
                    }
                    required
                    placeholder="e.g., 297"
                    inputType="number"
                    min={10}
                    max={10000}
                    labelTextColor={COLOR.CORE_PURPLE}
                  />
                  {dimensionUnit === 'mm' && dimension.height > 0 && (
                    <StyledPxHint>
                      {Math.round(mmToPx(dimension.height))}px
                    </StyledPxHint>
                  )}
                </Col>
                <Col
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '4px',
                  }}
                >
                  <Button
                    buttonType={ButtonType.SECONDARY}
                    buttonSize={ButtonSize.XS}
                    onClick={() => {
                      const duplicated = {
                        ...dimension,
                        name: dimension.name ? `${dimension.name} (copy)` : '',
                      }
                      const newDimensions = [...fields.dimensions]
                      newDimensions.splice(index + 1, 0, duplicated)
                      setFields({ ...fields, dimensions: newDimensions })
                    }}
                    noMarginLeft
                  >
                    Duplicate
                  </Button>
                  <Button
                    buttonType={ButtonType.DANGER}
                    buttonSize={ButtonSize.XS}
                    disabled={fields.dimensions.length <= 1}
                    onClick={() => handleRemoveDimension(index)}
                    noMarginLeft
                  >
                    Remove
                  </Button>
                  <Button
                    buttonType={
                      index === previewDimensionIndex
                        ? ButtonType.PRIMARY
                        : ButtonType.SECONDARY
                    }
                    buttonSize={ButtonSize.XS}
                    onClick={() => setPreviewDimensionIndex(index)}
                    noMarginLeft
                    noMarginRight
                  >
                    Preview
                  </Button>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: STYLE.GUTTER }}>
                <Col>
                  <TextField
                    labelText={`Page Margin X (${dimensionUnit})`}
                    value={dimension.pageMarginsX ?? ''}
                    onChange={(ev) =>
                      handleDimensionChange(
                        index,
                        'pageMarginsX',
                        ev.target.value,
                      )
                    }
                    placeholder="e.g., 3"
                    inputType="number"
                    min={0}
                    max={100}
                    required
                    labelTextColor={COLOR.CORE_PURPLE}
                  />
                  {dimensionUnit === 'mm' && dimension.pageMarginsX > 0 && (
                    <StyledPxHint>
                      {Math.round(mmToPx(dimension.pageMarginsX))}px
                    </StyledPxHint>
                  )}
                </Col>
                <Col>
                  <TextField
                    labelText={`Page Margin Y (${dimensionUnit})`}
                    value={dimension.pageMarginsY ?? ''}
                    onChange={(ev) =>
                      handleDimensionChange(
                        index,
                        'pageMarginsY',
                        ev.target.value,
                      )
                    }
                    placeholder="e.g., 3"
                    inputType="number"
                    min={0}
                    max={100}
                    required
                    labelTextColor={COLOR.CORE_PURPLE}
                  />
                  {dimensionUnit === 'mm' && dimension.pageMarginsY > 0 && (
                    <StyledPxHint>
                      {Math.round(mmToPx(dimension.pageMarginsY))}px
                    </StyledPxHint>
                  )}
                </Col>
                <Col>
                  <TextField
                    labelText="Border/Overlay Margin X (%)"
                    value={dimension.overlayMarginX ?? ''}
                    onChange={(ev) =>
                      handleDimensionChange(
                        index,
                        'overlayMarginX',
                        ev.target.value,
                      )
                    }
                    placeholder="e.g., 11"
                    inputType="number"
                    min={0}
                    max={100}
                    required
                    labelTextColor={COLOR.CORE_PURPLE}
                  />
                </Col>
                <Col>
                  <TextField
                    labelText="Border/Overlay Margin Y (%)"
                    value={dimension.overlayMarginY ?? ''}
                    onChange={(ev) =>
                      handleDimensionChange(
                        index,
                        'overlayMarginY',
                        ev.target.value,
                      )
                    }
                    placeholder="e.g., 8"
                    inputType="number"
                    min={0}
                    max={100}
                    required
                    labelTextColor={COLOR.CORE_PURPLE}
                  />
                </Col>
              </Row>
              <StyledImageContainer>
                <StyledImageTitle>Hero Image</StyledImageTitle>
                <ProductImageDragger
                  productTypeId={currentProductType?.id}
                  productImage={dimension.heroImage}
                  onChange={(fileList) => {
                    const newDimensions = [...fields.dimensions]
                    newDimensions[index] = {
                      ...newDimensions[index],
                      heroImageDragger: fileList,
                    }
                    setFields({ ...fields, dimensions: newDimensions })
                  }}
                />
              </StyledImageContainer>
              {index < fields.dimensions.length - 1 && <Divider />}
            </div>
          ))}

          <Row style={{ marginTop: STYLE.GUTTER }}>
            <Button
              buttonType={ButtonType.SECONDARY}
              onClick={handleAddDimension}
              noMarginLeft
              buttonSize={ButtonSize.XXS}
            >
              Add Dimension
            </Button>
          </Row>

          <Divider />
          <SubTitle>Availability</SubTitle>
          <StyledAvailabilityGrid>
            <div />
            <StyledAvailabilityHeader>Available</StyledAvailabilityHeader>
            <StyledAvailabilityHeader>Default</StyledAvailabilityHeader>

            <StyledAvailabilityLabel>Direct Users</StyledAvailabilityLabel>
            <SwitchButton
              checked={fields.availability?.directUsers.available}
              onClick={(checked) => {
                setFields({
                  ...fields,
                  availability: {
                    ...fields.availability!,
                    directUsers: {
                      available: checked,
                      default: checked
                        ? fields.availability!.directUsers.default
                        : false,
                    },
                  },
                })
              }}
              noMarginBottom
            />
            <div />

            <StyledAvailabilityLabel>Funeral Homes</StyledAvailabilityLabel>
            <SwitchButton
              checked={fields.availability?.funeralHomes.available}
              onClick={(checked) => {
                setFields({
                  ...fields,
                  availability: {
                    ...fields.availability!,
                    funeralHomes: {
                      available: checked,
                      default: checked
                        ? fields.availability!.funeralHomes.default
                        : false,
                    },
                  },
                })
              }}
              noMarginBottom
            />
            <SwitchButton
              checked={fields.availability?.funeralHomes.default}
              onClick={(checked) => {
                setFields({
                  ...fields,
                  availability: {
                    ...fields.availability!,
                    funeralHomes: {
                      available: checked
                        ? true
                        : fields.availability!.funeralHomes.available,
                      default: checked,
                    },
                  },
                })
              }}
              noMarginBottom
            />
          </StyledAvailabilityGrid>

          <Divider />
          <Button
            buttonSize={ButtonSize.SM}
            disabled={!isValid}
            loading={isSubmitting}
            htmlType="submit"
            noMarginLeft
          >
            {submitButtonText}
          </Button>
          <Button
            buttonSize={ButtonSize.SM}
            noMarginLeft
            buttonType={ButtonType.TRANSPARENT}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Col>
        <Col span={10}>
          <SubTitle>Preview</SubTitle>
          <GenericCardProductTypePreview
            dimensions={fields.dimensions}
            foldType={fields.foldType}
            defaultPages={fields.defaultPages}
            selectedDimensionIndex={previewDimensionIndex}
            dimensionUnit={dimensionUnit}
          />
        </Col>
      </Row>
    </StyledForm>
  )
}
