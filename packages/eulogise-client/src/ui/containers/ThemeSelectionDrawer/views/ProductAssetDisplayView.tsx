import React from 'react'
import styled from 'styled-components'
import { EulogiseProduct, ISlideshowThemeProductAssets } from '@eulogise/core'
import {
  LeftChevronIcon,
  RightChevronIcon,
  Carousel,
} from '@eulogise/client-components'
import { STYLE } from '@eulogise/client-core'
import { ProductAssetDisplayViewImage } from '../ProductAssetDisplayViewImage'

type ProductAssetDisplayViewProps = {
  assets: ISlideshowThemeProductAssets
  isShowAction?: boolean
  product: EulogiseProduct
}

const ProductVideo = styled.video`
  max-width: 100%;
  display: block;
  object-fit: cover;
`

const ActionIconsContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 10;
  width: 100%;
  justify-content: center;
  top: 9rem;
`

const actionIconStyles = `
  margin: ${STYLE.GUTTER};
  font-size: 20px;
  color: #FFFFFFAA;
  &:hover {
    color: #FFFFFF;
  }
`

const StyledLeftChevronIcon = styled(LeftChevronIcon)`
  ${actionIconStyles}
`

const StyledRightChevronIcon = styled(RightChevronIcon)`
  ${actionIconStyles}
`

const StyledProductAssetDisplayView = styled.div`
  position: relative;
`

const ProductAssetDisplayView = ({
  assets: { images, video },
  isShowAction = true,
  product,
}: ProductAssetDisplayViewProps) => {
  const carousel = React.createRef()

  return (
    <StyledProductAssetDisplayView>
      {images && (
        <>
          {isShowAction && images.length > 1 && (
            <ActionIconsContainer>
              <StyledLeftChevronIcon
                onClick={() => {
                  // @ts-ignore
                  carousel.current.prev()
                }}
              />
              <StyledRightChevronIcon
                onClick={() => {
                  // @ts-ignore
                  carousel.current.next()
                }}
              />
            </ActionIconsContainer>
          )}
          {/* @ts-ignore */}
          <Carousel ref={carousel} autoplay dots={false}>
            {images.map((img: string) => {
              return (
                <ProductAssetDisplayViewImage
                  key={img}
                  imageUrl={img}
                  product={product}
                />
              )
            })}
          </Carousel>
        </>
      )}
      {video && (
        <ProductVideo muted autoPlay className="content" loop>
          <source src={video} />
        </ProductVideo>
      )}
    </StyledProductAssetDisplayView>
  )
}

export default ProductAssetDisplayView
