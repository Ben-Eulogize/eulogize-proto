import React, { useEffect, useState } from 'react'
import { PageProps } from 'gatsby'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import Layout from './Layout'
import { EulogiseClientConfig, STYLE } from '@eulogise/client-core'
import {
  DrawerId,
  EulogisePage,
  EulogiseProduct,
  EulogiseProductThemeMap,
  ICardProductBackgroundImageBase,
  IGenericCardProductData,
  IGenericCardProductMetadata,
  IImageSizeAndPosition,
} from '@eulogise/core'
import {
  useBackgroundImageState,
  useCaseState,
  useEulogiseDispatch,
  useGenericCardProductTypeByPathname,
  useProductState,
} from '../../store/hooks'
import {
  BackgroundImageHelper,
  ThemeHelper,
  UrlHelper,
} from '@eulogise/helpers'
import { Button, ButtonType, Text } from '@eulogise/client-components'
import {
  fetchBackgroundImageByIdAction,
  updateBackgroundImageByIdAction,
} from '../../store/BackgroundImageState/actions'
import { openDrawerAction } from '../../store/DrawerState/actions'

type BackgroundEditorLayoutProps = PageProps & {
  product: EulogiseProduct
  children: any
}

const EditorPanel = styled.div`
  flex: 1;
  overflow-y: auto;
`

const StyledEditorContainer = styled.div`
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: center;
  margin: ${STYLE.GUTTER} 0;
`

const LayoutContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

const BackgroundEditorButtons = styled.div`
  text-align: right;
  margin: 2rem auto;
`

const BackgroundEditorHeader = styled.div`
  margin: 2rem auto ${STYLE.GUTTER} auto;
`

export const BackgroundEditorLayout = ({
  location,
  product,
  children,
}: BackgroundEditorLayoutProps) => {
  const dispatch = useEulogiseDispatch()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { activeItem: activeCase } = useCaseState()
  const slug = useGenericCardProductTypeByPathname(location.pathname)
  const { activeItem: activeCardProduct } = useProductState({ product, slug })
  const { isUpdating: isUpdatingBackground } = useBackgroundImageState()
  const region = activeCase?.region!

  const [imageSizeAndPosition, setImageSizeAndPosition] =
    useState<IImageSizeAndPosition>()
  const [activeBackgroundImage, setActiveBackgroundImage] =
    useState<ICardProductBackgroundImageBase>()
  const { width } =
    BackgroundImageHelper.getEditedBackgroundWidthAndHeightByProduct({
      product,
      genericProductMetadata: (activeCardProduct as IGenericCardProductData)
        ?.content?.metadata,
      region,
    })
  const { backgroundImageId } = UrlHelper.getParams(
    EulogisePage.EDIT_BOOKLET_BACKGROUND_IMAGE,
    {
      pathname: location.pathname,
    },
  )
  const backgroundImageUrl = `${
    EulogiseClientConfig.AWS_S3_URL
  }/${BackgroundImageHelper.getOriginalBackgroundImagePath(backgroundImageId)}`
  const backgroundProductKey: EulogiseProductThemeMap =
    ThemeHelper.getEulogiseProductThemeMapValueByProduct({
      product,
      region,
    })

  useEffect(() => {
    dispatch(
      fetchBackgroundImageByIdAction({
        backgroundImageId,
        onSuccess: (backgroundImage) => {
          setActiveBackgroundImage(backgroundImage)
          setImageSizeAndPosition(
            backgroundImage.productProperties?.[backgroundProductKey],
          )
        },
      }),
    )
  }, [])

  return (
    <Layout
      location={location}
      title={`Edit ${product} Background Image`}
      noPadding={true}
      shouldHideFooter={true}
    >
      <LayoutContent>
        <EditorPanel ref={containerRef}>
          <BackgroundEditorHeader style={{ width }}>
            <Row justify="center" style={{ marginBottom: '1rem' }}>
              <Col>
                <Text>Drag image to set position</Text>
              </Col>
            </Row>
            <Row justify="space-around">
              <Col>
                <Text>Back Page</Text>
              </Col>
              <Col>
                <Text>Front Page</Text>
              </Col>
            </Row>
          </BackgroundEditorHeader>
          <StyledEditorContainer>
            {React.cloneElement(children, {
              region,
              originalImage: {
                url: backgroundImageUrl,
              },
              imageSizeAndPosition,
              onImageSizeAndPositionChange: (
                sizeAndPosition: IImageSizeAndPosition,
              ) => {
                setImageSizeAndPosition(sizeAndPosition)
              },
              containerRef,
            })}
          </StyledEditorContainer>
          <BackgroundEditorButtons style={{ width }}>
            <Button
              buttonType={ButtonType.TRANSPARENT}
              onClick={() => {
                dispatch(
                  openDrawerAction(DrawerId.EDIT_BACKGROUND_DRAWER, {
                    backgroundImage: activeBackgroundImage!,
                    isEditing: true,
                    genericProductType,
                  }),
                )
              }}
            >
              Cancel
            </Button>
            <Button
              buttonType={ButtonType.PRIMARY}
              loading={isUpdatingBackground}
              noMarginRight
              onClick={() => {
                dispatch(
                  updateBackgroundImageByIdAction({
                    backgroundImageId,
                    backgroundImage: {
                      productProperties: {
                        ...activeBackgroundImage?.productProperties,
                        [backgroundProductKey]: imageSizeAndPosition,
                      },
                    },
                    regenerateProduct: product,
                    regenerateProductRegion: region,
                    genericProductType,
                  }),
                )
                dispatch(
                  openDrawerAction(DrawerId.EDIT_BACKGROUND_DRAWER, {
                    backgroundImage: activeBackgroundImage!,
                    isEditing: true,
                    genericProductType,
                  }),
                )
              }}
            >
              {isUpdatingBackground
                ? 'Updating Background...'
                : 'Update Background'}
            </Button>
          </BackgroundEditorButtons>
        </EditorPanel>
      </LayoutContent>
    </Layout>
  )
}
