import React, { useState } from 'react'
import styled from 'styled-components'
import { EulogiseProduct, EulogiseRegion } from '@eulogise/core'
import BackgroundImageSelectionActionMenu from './BackgroundImageSelectionActionMenu'
import { COLOR, EulogiseClientConfig } from '@eulogise/client-core'

interface IBackgroundImageSelectionThumbnailPreviewProps {
  backgroundImageThumbnail: string
  productType: EulogiseProduct
  slug?: string
  onApply: () => void
  // onDelete: () => void
  onApplyAll: () => void
  onEdit: () => void
  isEditable: boolean
  // isDeletable: boolean
  region: EulogiseRegion
}

const StyledBackgroundImageSelectionThumbnailPreview = styled.div`
  position: relative;
  overflow: hidden;
  border: 0.5rem solid ${COLOR.WHITE};
`

const ThumbnailImage = styled.img`
  width: 268px;
  min-height: 176px;
`

const BackgroundImageSelectionThumbnailPreview: React.FC<
  IBackgroundImageSelectionThumbnailPreviewProps
> = ({
  backgroundImageThumbnail,
  productType,
  slug,
  onApply,
  onApplyAll,
  onEdit,
  isEditable,
  region,
}) => {
  const [isShowActionMenu, setIsShowActionMenu] = useState<boolean>(false)

  return (
    <StyledBackgroundImageSelectionThumbnailPreview
      onMouseEnter={() => setIsShowActionMenu(true)}
      onMouseLeave={() => setIsShowActionMenu(false)}
    >
      {ThumbnailImage && (
        <ThumbnailImage
          src={`${EulogiseClientConfig.AWS_S3_URL}/${backgroundImageThumbnail}`}
        />
      )}
      <BackgroundImageSelectionActionMenu
        productType={productType}
        slug={slug}
        isShow={isShowActionMenu}
        isEditable={isEditable}
        onApply={onApply}
        onApplyAll={onApplyAll}
        region={region}
        onEdit={onEdit}
      />
    </StyledBackgroundImageSelectionThumbnailPreview>
  )
}

export default BackgroundImageSelectionThumbnailPreview
