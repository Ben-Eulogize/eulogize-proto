import { Upload, UploadFile } from 'antd'
import React from 'react'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { InboxOutlined } from '@ant-design/icons'

interface IProductImageDraggerProps {
  productTypeId?: string
  productImage?: string
  onChange: (fileList: Array<UploadFile<any>>) => void
}

export const ProductImageDragger: React.FC<IProductImageDraggerProps> = ({
  productTypeId,
  productImage,
  onChange,
}) => {
  return (
    <Upload.Dragger
      name="files"
      accept={'image/*'}
      listType={'picture'}
      onChange={(options: { file: File; fileList: Array<UploadFile<any>> }) => {
        onChange(options.fileList.slice(-1))
      }}
      customRequest={(options: UploadRequestOption) => {
        const { onSuccess } = options
        if (onSuccess) {
          onSuccess('ok')
        }
      }}
      maxCount={1}
    >
      {productTypeId && productImage ? (
        <img
          src={`https://${process.env.GATSBY_AWS_S3_BUCKET}/productTypes/${productImage}`}
          width="auto"
          height="90"
          alt="Product Type"
        />
      ) : (
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
      )}
      <p className="ant-upload-text">
        Click or drag file to this area to upload a product image
      </p>
    </Upload.Dragger>
  )
}
