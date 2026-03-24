import React from 'react'
import { PageProps } from 'gatsby'
import { BookletBackgroundEditor } from '../../../../eulogise-client-components/src/BackgroundEditor'
import { EulogiseProduct } from '@eulogise/core'
import { BackgroundEditorLayout } from '../../ui/components/Layout/BackgroundEditorLayout'

const BookletBackgroundImagePage = ({ location }: PageProps) => {
  return (
    <BackgroundEditorLayout
      location={location}
      product={EulogiseProduct.BOOKLET}
    >
      {/* @ts-ignore */}
      <BookletBackgroundEditor />
    </BackgroundEditorLayout>
  )
}

export default BookletBackgroundImagePage
