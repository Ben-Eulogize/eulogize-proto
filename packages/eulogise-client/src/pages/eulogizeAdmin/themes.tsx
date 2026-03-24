import React, { useEffect } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../ui/components/Layout/Layout'
import { useEulogiseDispatch, useThemeState } from '../../ui/store/hooks'
import { EulogiseProductThemeMap, ITheme } from '@eulogise/core'
import { Table } from '@eulogise/client-components'
import { fetchThemesAction } from '../../ui/store/ThemeState/actions'
import { LoadingMessage } from '../../ui/components/LoadingMessage/LoadingMessage'
import { ImageInsight } from '../../ui/components/ImageInsight/ImageInsight'

const StyledAdminThemesPage = styled(Layout)``

const productThumbnailRenderer =
  (productKey: EulogiseProductThemeMap) => (theme: ITheme) => {
    const product = theme.products[productKey]
    const thumbnailImages = product?.thumbnail.images
    return thumbnailImages ? <ImageInsight src={thumbnailImages?.[0]} /> : null
  }

export const ADMIN_PORTAL_THEMES_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
  },
  {
    title: 'Core data',
    render: (data: any, theme: any) => (
      <>
        <div>
          <b>Categories:</b>
          <br />
          {theme.categories.join(', ')}
        </div>
        <div>
          <b>Base Font:</b>
          <br />
          {theme.baseFont}
        </div>
        <div>
          <b>Date Format:</b>
          <br />
          {theme.dateFormat}
        </div>
        <div>
          <b>Date Format US:</b>
          <br />
          {theme.dateFormatUS}
        </div>
      </>
    ),
  },
  {
    title: 'Booklet',
    render: productThumbnailRenderer(EulogiseProductThemeMap.BOOKLET),
  },
  {
    title: 'Card',
    render: productThumbnailRenderer(EulogiseProductThemeMap.SIDED_CARD),
  },
  {
    title: 'Thankyou Card',
    render: productThumbnailRenderer(EulogiseProductThemeMap.THANK_YOU_CARD),
  },
  {
    title: 'Bookmark',
    render: productThumbnailRenderer(EulogiseProductThemeMap.BOOKMARK),
  },
  {
    title: 'TV Welcome Screen',
    render: productThumbnailRenderer(EulogiseProductThemeMap.TV_WELCOME_SCREEN),
  },
  {
    title: 'Slideshow',
    render: productThumbnailRenderer(EulogiseProductThemeMap.SLIDESHOW),
  },
]

const AdminThemesPage: React.FunctionComponent<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()
  const { themes, isFetching } = useThemeState()

  useEffect(() => {
    dispatch(fetchThemesAction())
  }, [])

  return (
    <StyledAdminThemesPage title="Admin Themes Management" location={location}>
      {isFetching && themes.length === 0 ? (
        <LoadingMessage />
      ) : (
        <Table
          dataSource={themes}
          columns={ADMIN_PORTAL_THEMES_COLUMNS}
          pagination={{ pageSize: 100 }}
        />
      )}
    </StyledAdminThemesPage>
  )
}

export default AdminThemesPage
