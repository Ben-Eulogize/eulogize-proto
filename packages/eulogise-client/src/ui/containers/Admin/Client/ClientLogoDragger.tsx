import { Upload, UploadFile } from 'antd'
import React from 'react'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { InboxOutlined } from '@ant-design/icons'

// `Client Logo` is used in the Eulogize platform, not used in the email sent via Sendgrid
export const ClientLogoDragger: React.FunctionComponent<any> = ({
  clientId,
  clientLogo,
  onChange,
}: {
  clientId: string
  clientLogo: string
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
      {clientId && clientLogo ? (
        <img
          src={`https://${process.env.GATSBY_AWS_S3_BUCKET}/clients/logos/${clientLogo}`}
          width="auto"
          height="90"
          alt="Logo"
        />
      ) : (
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
      )}
      <p className="ant-upload-text">
        Click or drag file to this area to upload a logo
      </p>
    </Upload.Dragger>
  )
}
