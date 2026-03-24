import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { COLOR, STYLE } from '@eulogise/client-core'
import { LeftChevronIcon, RightChevronIcon } from '@eulogise/client-components'

/*
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  // @ts-ignore
  import.meta.url,
).toString()
*/
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
`

const PaginationContent = styled.div`
  padding: ${STYLE.HALF_GUTTER};
`

const StyledPage = styled(Page)`
  max-width: fit-content;
`

const PrevButton = styled(LeftChevronIcon)<{
  $isVisible: boolean
}>`
  ${({ $isVisible }) =>
    $isVisible
      ? `
          cursor: pointer;
          opacity: 1;
          &:hover {
          color: ${COLOR.CORE_PURPLE};
        }
      `
      : `opacity: 0.3;`}
`
const NextButton = styled(RightChevronIcon)<{
  $isVisible: boolean
}>`
  ${({ $isVisible }) =>
    $isVisible
      ? `
          cursor: pointer;
          opacity: 1;
          &:hover {
          color: ${COLOR.CORE_PURPLE};
        }
      `
      : `opacity: 0.3;`}
`

const StyledPdfViewer = styled.div``

type IPdfViewerProps = {
  src: string
  height?: number
  width?: number
  className?: string
}

export const PdfViewer = ({
  className,
  src,
  height,
  width,
}: IPdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }
  return (
    <StyledPdfViewer className={className}>
      <Document file={src} onLoadSuccess={onDocumentLoadSuccess}>
        <StyledPage pageNumber={pageNumber} width={width} height={height}>
          <Pagination className={`page-control`}>
            <PrevButton
              title="Previous Page"
              $isVisible={pageNumber > 1}
              onClick={() => {
                if (pageNumber > 1) {
                  setPageNumber(pageNumber - 1)
                }
              }}
            />
            <PaginationContent>
              Page {pageNumber} of {numPages}
            </PaginationContent>
            <NextButton
              title="Next Page"
              $isVisible={pageNumber < numPages!}
              onClick={() => {
                if (pageNumber < numPages!) {
                  setPageNumber(pageNumber + 1)
                }
              }}
            />
          </Pagination>
        </StyledPage>
      </Document>
    </StyledPdfViewer>
  )
}
