import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import {
  Button,
  ButtonSize,
  ButtonType,
  HeaderTextMD,
  Row,
  Col,
  Search,
  Tag,
  Space,
  Text,
  TextSize,
} from '@eulogise/client-components'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Layout from '../../ui/components/Layout/Layout'
import { useEulogiseDispatch } from '../../ui/store/hooks'
import {
  IGenericCardProductTypeData,
  EulogisePage,
  IGenericCardProductTypeDimension,
} from '@eulogise/core'
import { Table, ConfirmModal } from '@eulogise/client-components'
import {
  fetchGenericCardProductTypes,
  deleteGenericCardProductType,
} from '../../ui/store/GenericCardProductTypeState'
import { LoadingMessage } from '../../ui/components/LoadingMessage/LoadingMessage'
import { NavigationHelper } from '@eulogise/helpers'
import { useSelector } from 'react-redux'
import { COLOR, STYLE } from '@eulogise/client-core'

const StyledAdminGenericCardProductTypesPage = styled(Layout)``

const StyledSearch = styled(Search)`
  margin: ${STYLE.GUTTER} 0;
`

const AdminGenericCardProductTypesPage: React.FunctionComponent<PageProps> = ({
  location,
}) => {
  const dispatch = useEulogiseDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteProductType, setDeleteProductType] =
    useState<IGenericCardProductTypeData | null>(null)

  const {
    items: genericCardProductTypes,
    isFetching,
    isDeleting,
  } = useSelector((state: any) => state.genericCardProductTypes)

  const handleCreate = () => {
    NavigationHelper.navigate(
      EulogisePage.EULOGIZE_ADMIN_CREATE_GENERIC_CARD_PRODUCT_TYPE,
    )
  }

  const handleEdit = (id: string) => {
    NavigationHelper.navigate(
      EulogisePage.EULOGIZE_ADMIN_EDIT_GENERIC_CARD_PRODUCT_TYPE,
      {
        genericCardProductTypeId: id,
      },
    )
  }

  const columns = [
    {
      title: 'Image',
      key: 'productImage',
      width: 80,
      render: (_: any, record: IGenericCardProductTypeData) =>
        record.productImage ? (
          <img
            src={`https://${process.env.GATSBY_AWS_S3_BUCKET}/productTypes/${record.productImage}`}
            alt={record.name}
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              borderRadius: 4,
            }}
          />
        ) : (
          <div
            style={{
              width: 60,
              height: 60,
              backgroundColor: COLOR.LIGHT_GREY,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text $size={TextSize.EXTRA_EXTRA_SMALL} $color={COLOR.DOVE_GREY}>
              No image
            </Text>
          </div>
        ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (
        a: IGenericCardProductTypeData,
        b: IGenericCardProductTypeData,
      ) => a.name.localeCompare(b.name),
      render: (name: string, record: IGenericCardProductTypeData) => (
        <div>
          <Text $block $size={TextSize.EXTRA_SMALL}>
            {name}
          </Text>
          <Text $size={TextSize.EXTRA_EXTRA_SMALL} $color={COLOR.DOVE_GREY}>
            {record.slug}
          </Text>
        </div>
      ),
    },
    {
      title: 'Dimensions',
      key: 'dimensions',
      render: (_: any, record: IGenericCardProductTypeData) => (
        <div>
          {record.dimensions.map(
            (dim: IGenericCardProductTypeDimension, index: number) => (
              <Text key={index} $size={TextSize.EXTRA_SMALL} $block>
                <strong>{dim.name}:</strong> {dim.width} × {dim.height} mm
                {dim.pageMarginsX !== undefined &&
                  dim.pageMarginsY !== undefined && (
                    <Text
                      $size={TextSize.EXTRA_EXTRA_SMALL}
                      $color={COLOR.DOVE_GREY}
                    >
                      {' '}
                      | Margins: {dim.pageMarginsX}×{dim.pageMarginsY} mm
                    </Text>
                  )}
                {dim.overlayMarginX !== undefined &&
                  dim.overlayMarginY !== undefined && (
                    <Text
                      $size={TextSize.EXTRA_EXTRA_SMALL}
                      $color={COLOR.DOVE_GREY}
                    >
                      {' '}
                      | Border/Overlay: {dim.overlayMarginX}×
                      {dim.overlayMarginY}%
                    </Text>
                  )}
              </Text>
            ),
          )}
        </div>
      ),
    },
    {
      title: 'Pages',
      key: 'pages',
      render: (_: any, record: IGenericCardProductTypeData) => {
        const min = record.minPages ?? '-'
        const max = record.maxPages ?? '-'
        const defaultVal = record.defaultPages ?? '-'
        return (
          <Text $size={TextSize.EXTRA_SMALL}>
            {min} - {max} (default: {defaultVal})
          </Text>
        )
      },
    },
    {
      title: 'Fold Type',
      dataIndex: 'foldType',
      key: 'foldType',
      render: (foldType: string) => <Tag>{foldType}</Tag>,
    },
    {
      title: 'Formats',
      key: 'formats',
      render: (_: any, record: IGenericCardProductTypeData) => (
        <div>
          <Tag key="format">{record.outputFormat}</Tag>
        </div>
      ),
    },
    {
      title: 'Availability',
      key: 'availability',
      render: (_: any, record: IGenericCardProductTypeData) => {
        const directAvailable =
          record.availability?.directUsers?.available ?? false
        const funeralAvailable =
          record.availability?.funeralHomes?.available ?? false
        const funeralDefault =
          record.availability?.funeralHomes?.default ?? false
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <Text
                $size={TextSize.EXTRA_EXTRA_SMALL}
                $block
                $color={COLOR.DOVE_GREY}
              >
                Direct Users
              </Text>
              {directAvailable ? (
                <Tag color="green">Available</Tag>
              ) : (
                <Tag>Unavailable</Tag>
              )}
            </div>
            <div>
              <Text
                $size={TextSize.EXTRA_EXTRA_SMALL}
                $block
                $color={COLOR.DOVE_GREY}
              >
                Funeral Homes
              </Text>
              {funeralAvailable ? (
                <Tag color="green">Available</Tag>
              ) : (
                <Tag>Unavailable</Tag>
              )}
              {funeralDefault && <Tag color="blue">Default</Tag>}
            </div>
          </div>
        )
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IGenericCardProductTypeData) => (
        <Space size="small">
          <Button
            buttonType={ButtonType.TRANSPARENT}
            buttonSize={ButtonSize.XS}
            icon={<EditOutlined />}
            noMarginRight
            noMarginLeft
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </Button>
          <Button
            buttonType={ButtonType.DANGER}
            buttonSize={ButtonSize.XS}
            icon={<DeleteOutlined />}
            noMarginRight
            noMarginLeft
            onClick={() => setDeleteProductType(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const filteredData = genericCardProductTypes.filter(
    (item: IGenericCardProductTypeData) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        item.name.toLowerCase().includes(query) ||
        item.slug.toLowerCase().includes(query)
      )
    },
  )

  return (
    <StyledAdminGenericCardProductTypesPage
      title="Generic Card Product Types Management"
      location={location}
    >
      <Row justify="space-between" style={{ margin: `${STYLE.GUTTER} 0` }}>
        <Col>
          <HeaderTextMD>Generic Card Product Types</HeaderTextMD>
        </Col>
        <Col>
          <Button icon={<PlusOutlined />} onClick={handleCreate}>
            Create New Card Product
          </Button>
        </Col>
      </Row>

      <StyledSearch
        placeholder="Search by name or slug"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        allowClear
      />

      {isFetching && genericCardProductTypes.length === 0 ? (
        <LoadingMessage />
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 20 }}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteProductType}
        onClose={() => setDeleteProductType(null)}
        onConfirm={() => {
          if (deleteProductType) {
            dispatch(
              deleteGenericCardProductType({
                genericCardProductTypeId: deleteProductType.id,
                onSuccess: () => {
                  setDeleteProductType(null)
                },
                onFailed: () => {
                  setDeleteProductType(null)
                },
              }),
            )
          }
        }}
        title="Are you sure you want to delete this product type?"
        text={`This will permanently delete "${deleteProductType?.name}". This action cannot be undone.`}
        isConfirming={isDeleting}
      />
    </StyledAdminGenericCardProductTypesPage>
  )
}

export default AdminGenericCardProductTypesPage
