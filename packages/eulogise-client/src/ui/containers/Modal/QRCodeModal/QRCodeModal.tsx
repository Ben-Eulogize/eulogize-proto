import React from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import html2canvas from 'html2canvas'
import {
  Button,
  ColorPickerFieldWithInlinePreset,
  IModalProps,
  Modal,
  Text,
} from '@eulogise/client-components'
import MobileUploadQRCode from '../../Dashboard/PhotoLibrary/MobileUploadQRCode/MobileUploadQRCode'
import { useUserSettingsState } from '../../../store/hooks'
import { STYLE } from '@eulogise/client-core'

type IQRCodeModalProps = IModalProps & {
  content: string
  qrcodeTitle: string
}

const StyledMobileUploadQRCode = styled(MobileUploadQRCode)`
  margin-top: ${STYLE.GUTTER};
`

const QRCodeModal = (props: IQRCodeModalProps) => {
  const printRef = React.useRef()
  const { selectedColors: recentColors } = useUserSettingsState()
  const [selectedColor, setSelectedColor] = React.useState<string>('')
  const { qrcodeTitle = "Directly link to client's log in" } = props

  const handleDownloadImage = async () => {
    if (!printRef.current) {
      return
    }
    const element = printRef.current as HTMLElement
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 3,
    })

    const data = canvas.toDataURL('image/png')
    const link = document.createElement('a')

    link.href = data
    link.download = 'qrcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <Modal
      {...props}
      footer={
        <Row>
          <Col flex="auto">
            <Row align="middle">
              <Col>Color:&nbsp;</Col>
              <Col>
                <ColorPickerFieldWithInlinePreset
                  color={selectedColor}
                  onColorSelected={(color) => {
                    setSelectedColor(color)
                    // dispatch(selectUserSettingsColorAction({ color }))
                  }}
                  recentColors={recentColors}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              onClick={() => {
                handleDownloadImage()
              }}
            >
              Download
            </Button>
          </Col>
        </Row>
      }
    >
      <Row justify="center">
        <Col>
          <Text>{qrcodeTitle}</Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <StyledMobileUploadQRCode
            qRCodeLink={props.content}
            color={selectedColor}
            ref={printRef}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export { QRCodeModal }
