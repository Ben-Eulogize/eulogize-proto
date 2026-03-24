import React from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  ImageLayoutIcon,
  LeftIcon,
  Text,
} from '@eulogise/client-components'
import { Col, Row } from 'antd'
import { COLOR, STYLE } from '@eulogise/client-core'
import { useAssetState, useProductState } from '../../../store/hooks'
import UploadImageButton from '../../Button/UploadImageButton'
import {
  EulogiseImageLibrarySortingBy,
  EulogiseProduct,
  IAssetState,
  ICardProductData,
  ISlideshowData,
} from '@eulogise/core'
import { ButtonSize } from '@eulogise/client-components/src/Button'
import { ClockIcon } from '@eulogise/client-components/src/icons'
import { CardProductHelper } from '@eulogise/helpers'
import { SlideshowHelper } from '../../../../../../eulogise-helpers/src/SlideshowHelper'
import { Badge } from '../../../components/Badge/Badge'

interface IUploadPicturesPanelHeaderProps {
  product: EulogiseProduct
  slug?: string
  onToggleClick: () => void
  isCollapsed: boolean
  imageLibrarySortBy: EulogiseImageLibrarySortingBy
  onAddAllPicturesClick?: () => void
  onImageLayoutButtonClick?: () => void
  onToggleImageSortBy?: () => void
  isShowUnusedImages?: boolean
  onShowUnusedImagesClick?: () => void
  isShowUnusedImagesButton: boolean
}

const StyledUploadPicturesPanelHeader = styled.div`
  padding: 16px 0 0 0;
`

const AddPictureButton = styled(Button).attrs({
  children: 'Add All to Slideshow',
})`
  width: 100%;
  display: block;
  margin-right: 0;
  margin-left: 0;
  font-size: 16px;
`

const NoImagesText = styled(Text)`
  color: ${COLOR.PRIMARY};
  margin-bottom: ${STYLE.GUTTER};
  display: block;
  max-width: 260px;
  margin-left: 16px;
  ${STYLE.HEADING_SMALL}
`

const StyledBadge = styled(Badge)`
  margin-left: 0.25rem;
  margin-top: 0.05rem;
`

const ButtonStyle = `
  display: block;
  width: calc(100% - 16px);
  margin: 0 8px 0.5rem 8px;
`

const StyledUploadImageButton = styled(UploadImageButton)`
  ${ButtonStyle}
`

const UnusedPhotosButton = styled(Button)`
  ${ButtonStyle}
`

const StyledImageLayoutButton = styled(Button)`
  width: 100%;
  display: block;
  margin-left: 8px;
  margin-bottom: 0.5rem;
`

const StyledIconButtonsContainer = styled.div`
  display: flex;
  margin-bottom: 0.25rem;
  width: 100%;
`

const StyledLeftIcon = styled(LeftIcon)``

const StyledButton = styled(Button)`
  width: 40px;
`

const StyledImgButton = styled.img`
  cursor: pointer;
  width: 24px;
`

const StyledClockIcon = styled(ClockIcon)``

const StyledOpenImageDrawerIcon = styled.img`
  width: 24px;
`

const FILE_STACK_IMAGE_SORT_A_TO_Z_SVG_URL = `https://${process.env.GATSBY_AWS_S3_BUCKET}/icons/image-sort-icon-a-to-z.svg`
const OPEN_IMAGE_DRAWER_SVG_URL = `https://${process.env.GATSBY_AWS_S3_BUCKET}/icons/image-drawer-open.svg`

const CUSTOMISED_IMAGE_SORT_ICON_URL = `https://${process.env.GATSBY_AWS_S3_BUCKET}/icons/image-sort-icon-custom.svg`

const UploadPicturesPanelHeader = ({
  product,
  slug,
  onToggleClick,
  isCollapsed,
  imageLibrarySortBy,
  onAddAllPicturesClick,
  onImageLayoutButtonClick,
  onToggleImageSortBy,
  isShowUnusedImagesButton,
  isShowUnusedImages,
  onShowUnusedImagesClick,
}: IUploadPicturesPanelHeaderProps) => {
  const { images, isUploadingEditedImage }: IAssetState = useAssetState()
  const productState = product ? useProductState({ product, slug }) : null
  const activeProduct = productState?.activeItem

  const totalImages = images?.length || 0
  const isNoUploadedImages: boolean = totalImages === 0
  const unusedImages =
    product === EulogiseProduct.SLIDESHOW
      ? SlideshowHelper.getUnusedImages({
          images,
          slideshow: activeProduct as ISlideshowData,
        })
      : CardProductHelper.getUnusedImages({
          images,
          cardProduct: activeProduct as ICardProductData,
        })
  const noOfUnusedImages = unusedImages?.length || 0

  const isAtCardProductEditor = CardProductHelper.getIsAtCardProductEditor({
    location,
  })

  const renderFilestackImageSortButton = () => {
    let tooltip
    let iconComponent
    if (imageLibrarySortBy === EulogiseImageLibrarySortingBy.UPLOAD_TIME) {
      tooltip = 'Sort images by upload order'
      iconComponent = (
        <StyledImgButton src={FILE_STACK_IMAGE_SORT_A_TO_Z_SVG_URL} />
      )
    } else if (imageLibrarySortBy === EulogiseImageLibrarySortingBy.FILE_NAME) {
      tooltip = 'Sort images by filename'
      iconComponent = <StyledClockIcon />
    } else if (
      imageLibrarySortBy === EulogiseImageLibrarySortingBy.CUSTOMISED
    ) {
      tooltip = 'Sort images by custom order'
      iconComponent = <StyledImgButton src={CUSTOMISED_IMAGE_SORT_ICON_URL} />
    }

    return (
      <StyledButton
        buttonType={ButtonType.WHITE}
        onClick={onToggleImageSortBy}
        icon={iconComponent}
        tooltip={tooltip}
      ></StyledButton>
    )
  }

  const renderButtonNextToUploadImage = () => {
    if (isAtCardProductEditor) {
      return renderFilestackImageSortButton()
    }
    return (
      <StyledButton
        buttonType={ButtonType.WHITE}
        onClick={onToggleClick}
        icon={<StyledLeftIcon />}
        tooltip={'Collapse Image Drawer'}
      ></StyledButton>
    )
  }

  return (
    <StyledUploadPicturesPanelHeader>
      {isCollapsed && (
        <StyledButton
          buttonType={ButtonType.WHITE}
          icon={
            <StyledOpenImageDrawerIcon
              src={OPEN_IMAGE_DRAWER_SVG_URL}
              onClick={() => onToggleClick()}
            />
          }
          tooltip={'Open image drawer'}
        ></StyledButton>
      )}
      {!isCollapsed && (
        <>
          <StyledIconButtonsContainer>
            {renderButtonNextToUploadImage()}
            {!!onImageLayoutButtonClick && (
              <StyledImageLayoutButton
                buttonSize={ButtonSize.SM}
                buttonType={ButtonType.HIGHLIGHTED_BUTTON}
                onClick={onImageLayoutButtonClick}
              >
                <ImageLayoutIcon /> Image Layout
              </StyledImageLayoutButton>
            )}
            {!isNoUploadedImages && onAddAllPicturesClick && (
              <StyledIconButtonsContainer>
                <AddPictureButton
                  buttonSize={ButtonSize.SM}
                  buttonType={ButtonType.HIGHLIGHTED_BUTTON}
                  onClick={() => {
                    onAddAllPicturesClick()
                    onToggleClick()
                  }}
                  disabled={isUploadingEditedImage}
                />
                {renderFilestackImageSortButton()}
              </StyledIconButtonsContainer>
            )}
          </StyledIconButtonsContainer>

          <StyledUploadImageButton buttonSize={ButtonSize.SM} />
          {isShowUnusedImagesButton && (
            <UnusedPhotosButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.HIGHLIGHTED_BUTTON}
              onClick={onShowUnusedImagesClick}
            >
              {isShowUnusedImages ? (
                <Row justify="center">
                  <Col>Show All Photos</Col>
                  <Col>
                    <StyledBadge>{totalImages}</StyledBadge>
                  </Col>
                </Row>
              ) : (
                <Row justify="center">
                  <Col>Show Unused Photos</Col>
                  <Col>
                    <StyledBadge>{noOfUnusedImages}</StyledBadge>
                  </Col>
                </Row>
              )}
            </UnusedPhotosButton>
          )}

          {isNoUploadedImages && (
            <NoImagesText>
              You don't have any pictures in your image library.
            </NoImagesText>
          )}
        </>
      )}
    </StyledUploadPicturesPanelHeader>
  )
}

export default UploadPicturesPanelHeader
