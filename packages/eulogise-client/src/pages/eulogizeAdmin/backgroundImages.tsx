import React from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../ui/components/Layout/Layout'
import { Table } from '@eulogise/client-components'
import {
  CardProductBackgroundImageName,
  EulogiseProduct,
  EulogiseRegion,
  ICardProductBackgroundImage,
  ICardProductBackgroundImageBase,
  ISlideshowBackgroundImage,
} from '@eulogise/core'
import { ImageInsight } from '../../ui/components/ImageInsight/ImageInsight'
import { BackgroundImageHelper } from '@eulogise/helpers/dist/BackgroundImageHelper'
import { useBackgroundImageState } from '../../ui/store/hooks'

const StyledAdminBackgroundImagesPage = styled(Layout)``

const StyledProductSubTable = styled(Table)`
  .ant-table {
    margin: 0 0 0 -16px !important;
  }
`

const ProductSubColumnCellRender = (
  obj: { key: string; bleed: boolean },
  cardProduct: Record<CardProductBackgroundImageName, string>,
) => {
  const { key, bleed } = obj
  const imagePath = cardProduct[key]
  return (
    <ImageInsight
      src={bleed ? imagePath.replace(/\.jpg$/, '_BLEED.jpg') : imagePath}
    />
  )
}

const getAdminPortalProductColumns = ({
  productMap,
  bleed = false,
}: {
  productMap?: Record<CardProductBackgroundImageName, string>
  bleed: boolean
}) => {
  const columns = [
    {
      title: 'Front',
      name: 'front',
      key: 'front',
      render: ProductSubColumnCellRender.bind(null, { key: 'front', bleed }),
    },
    {
      title: 'Left',
      name: 'left',
      key: 'left',
      render: ProductSubColumnCellRender.bind(null, { key: 'left', bleed }),
    },
    {
      title: 'Right',
      name: 'right',
      key: 'right',
      render: ProductSubColumnCellRender.bind(null, { key: 'right', bleed }),
    },
    {
      title: 'Back',
      name: 'back',
      key: 'back',
      render: ProductSubColumnCellRender.bind(null, { key: 'back', bleed }),
    },
  ]

  return columns.filter((c) => {
    return productMap[c.name]?.length > 0
  })
}

const ProductSubTable = ({
  productMap,
  bleed = false,
}: {
  productMap?: Record<CardProductBackgroundImageName, string>
  bleed?: boolean
}) => {
  if (!productMap) {
    return null
  }
  return (
    <StyledProductSubTable
      dataSource={[productMap]}
      columns={getAdminPortalProductColumns({ productMap, bleed: !!bleed })}
      pagination={false}
    />
  )
}

const CardProductSubTableRender = (
  product: EulogiseProduct,
  cardProducts: Record<
    Exclude<
      EulogiseProduct,
      | EulogiseProduct.ALL
      | EulogiseProduct.SLIDESHOW
      | EulogiseProduct.PHOTOBOOK
    >,
    Record<CardProductBackgroundImageName, string>
  >,
) => {
  return (
    <>
      <h2 style={{ fontWeight: 'bold' }}>{product}</h2>
      <ProductSubTable productMap={cardProducts[product]} />
      <br />
      <h2 style={{ fontWeight: 'bold' }}>Bleed</h2>
      <ProductSubTable productMap={cardProducts[product]} bleed />
    </>
  )
}

const ADMIN_PORTAL_BACKGROUND_IMAGES_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
  },
  {
    title: 'Categories',
    dataIndex: 'categoryIds',
    key: 'categoryIds',
  },
  {
    title: 'Thumbnail',
    dataIndex: 'thumbnail',
    key: 'thumbnail',
    render: (thumbnail: string) => <ImageInsight src={thumbnail} />,
  },
  {
    title: 'Booklet',
    dataIndex: 'cardProducts',
    key: 'booklet',
    render: CardProductSubTableRender.bind(null, EulogiseProduct.BOOKLET),
  },
  {
    title: 'Card',
    dataIndex: 'cardProducts',
    key: 'card',
    render: CardProductSubTableRender.bind(null, EulogiseProduct.SIDED_CARD),
  },
  {
    title: 'Thankyou Card',
    dataIndex: 'cardProducts',
    key: 'thankyouCard',
    render: CardProductSubTableRender.bind(
      null,
      EulogiseProduct.THANK_YOU_CARD,
    ),
  },
  {
    title: 'Bookmark',
    dataIndex: 'cardProducts',
    key: 'bookmark',
    render: CardProductSubTableRender.bind(null, EulogiseProduct.BOOKMARK),
  },
  {
    title: 'TV Welcome Screen',
    dataIndex: 'cardProducts',
    key: 'tvWelcomeScreen',
    render: CardProductSubTableRender.bind(
      null,
      EulogiseProduct.TV_WELCOME_SCREEN,
    ),
  },
  {
    title: 'Slideshow',
    dataIndex: 'slideshow',
    key: 'slideshow',
    render: (slideshow: ISlideshowBackgroundImage) => {
      return <ImageInsight src={slideshow.slideBackgroundImageUrl} />
    },
  },
]

const ascNameSort = (
  a: ICardProductBackgroundImage,
  b: ICardProductBackgroundImage,
) => (a.name > b.name ? 1 : -1)

const attachRegion = (
  region: EulogiseRegion,
  imageSet: ICardProductBackgroundImage,
) => ({
  ...imageSet,
  name: `${imageSet.name} - ${region}`,
})

const AdminBackgroundImagesPage: React.FunctionComponent<PageProps> = ({
  location,
}) => {
  const backgroundImageState = useBackgroundImageState()
  const baseBackgroundImages: Array<ICardProductBackgroundImageBase> =
    backgroundImageState?.backgroundImages ?? []

  const usBackgroundImages = BackgroundImageHelper.createBackgroundImages({
    baseBackgroundImages,
    region: EulogiseRegion.USA,
  }).map(attachRegion.bind(this, EulogiseRegion.USA))
  const auBackgroundImages = BackgroundImageHelper.createBackgroundImages({
    baseBackgroundImages,
    region: EulogiseRegion.AU,
  }).map(attachRegion.bind(this, EulogiseRegion.AU))

  const backgroundImages = [...usBackgroundImages, ...auBackgroundImages].sort(
    ascNameSort,
  )

  return (
    <StyledAdminBackgroundImagesPage
      title="Admin Background Images Management"
      location={location}
    >
      <Table
        dataSource={backgroundImages}
        columns={ADMIN_PORTAL_BACKGROUND_IMAGES_COLUMNS}
        pagination={false}
      />
    </StyledAdminBackgroundImagesPage>
  )
}

export default AdminBackgroundImagesPage
