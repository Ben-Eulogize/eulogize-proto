import React from 'react'
import styled from 'styled-components'
import { QRCodeSVG } from 'qrcode.react'
import { COLOR, EulogiseClientConfig } from '@eulogise/client-core'
import LogoSrc from '../../../../assets/logo.png'

interface IMobileUploadQRCodeProps {
  qRCodeLink: string
  color?: string
  className?: string
}

const StyledMobileUploadQRCode = styled.div`
  display: flex;
  justify-content: center;
`

const MobileUploadQRCodeContainer = styled.div<{
  $size: number
  $padding: string
}>`
  position: relative;
  ${({ $size, $padding }) => `
    padding: ${$padding};
    width: calc(${$size}px + 2rem);
    height: calc(${$size}px + 2rem);
  `};
`

const StyledImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`

const MobileUploadQRCode = React.forwardRef(
  (
    {
      qRCodeLink,
      className,
      color = COLOR.DARK_BLUE,
    }: IMobileUploadQRCodeProps,
    ref: any,
  ) => {
    const size = 128
    const imageSize = 24
    const padding = '1rem'
    return (
      <StyledMobileUploadQRCode className={className}>
        <MobileUploadQRCodeContainer $size={size} $padding={padding} ref={ref}>
          <QRCodeSVG
            value={qRCodeLink}
            size={size}
            bgColor={'#ffffff'}
            fgColor={color}
            level={'L'}
            includeMargin={false}
            imageSettings={{
              src: LogoSrc,
              x: undefined,
              y: undefined,
              height: imageSize,
              width: imageSize,
              excavate: true,
            }}
          />
          <StyledImage
            src={LogoSrc}
            style={{ width: imageSize, height: imageSize }}
          />
        </MobileUploadQRCodeContainer>
      </StyledMobileUploadQRCode>
    )
  },
)
export default MobileUploadQRCode
