import React from 'react'
import {
  CheckoutProductPreview,
  ICheckoutProductPreviewProps,
} from './CheckoutProductPreview'

export const CheckoutProductPreviewTemplate = (
  previewProps: ICheckoutProductPreviewProps,
) => {
  return (
    <>
      <b>Width: 600px (base width)</b>
      <br />
      <CheckoutProductPreview {...previewProps} />
      <b>Width: 300px</b>
      <br />
      <CheckoutProductPreview {...previewProps} width={300} />
      <b>Width: 200px</b>
      <br />
      <CheckoutProductPreview {...previewProps} width={200} />
    </>
  )
}
