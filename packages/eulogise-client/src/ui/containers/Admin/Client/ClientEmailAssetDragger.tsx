import { Upload, UploadFile } from 'antd'
import React from 'react'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { InboxOutlined } from '@ant-design/icons'

// `ClientEmailAsset` is used in the emails that sent via Sendgrid, it should not be used in anywhere else in Eulogize platform.
export const ClientEmailAssetDragger: React.FunctionComponent<any> = ({
  clientId,
  clientEmailAsset,
  onChange,
}: {
  clientId: string
  clientEmailAsset: string
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
      {clientId && clientEmailAsset ? (
        <img
          src={`https://${process.env.GATSBY_AWS_S3_BUCKET}/clients/emailAssets/${clientEmailAsset}`}
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
        Click or drag file to this area to upload a client email asset
      </p>
    </Upload.Dragger>
  )
}
