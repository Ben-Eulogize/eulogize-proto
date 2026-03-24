import { Upload, UploadFile } from 'antd'
import React from 'react'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { InboxOutlined } from '@ant-design/icons'

export const ClientBrandDragger: React.FunctionComponent<any> = ({
  clientId,
  clientBrandAsset,
  onChange,
}: {
  clientId: string
  clientBrandAsset: string
  onChange: (fileList: Array<UploadFile<any>>) => void
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
      {clientId && clientBrandAsset ? (
        <img
          src={`https://${process.env.GATSBY_AWS_S3_BUCKET}/clients/brands/${clientId}/${clientBrandAsset}`}
          width="90"
          height="90"
          alt="Asset"
        />
      ) : (
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
      )}
      <p className="ant-upload-text">
        Click or drag file to this area to upload a client brand asset
      </p>
    </Upload.Dragger>
  )
}
