import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import {
  Accordion,
  AccordionItem,
  Button,
  ButtonType,
  CopyEmbeddedCodeIcon,
  CopySharableLinkIcon,
  EyeIcon,
  EyeInvisibleIcon,
  Modal,
  QRCodeIcon,
} from '@eulogise/client-components'
import ShareViaEmailForm from '../../Forms/ShareViaEmailForm/ShareViaEmailForm'
import { STYLE } from '@eulogise/client-core'
import { EulogiseProduct, IEulogiseClient } from '@eulogise/core'
import InviteList from '../InviteModal/InviteList'
import {
  useCaseState,
  useClientState,
  useEulogiseDispatch,
} from '../../../store/hooks'
import { CardProductHelper, SlideshowHelper } from '@eulogise/helpers'
import { SyntaxHighlighter } from '../../../components/SyntaxHighlighter/SyntaxHighlighter'
import { IconButton } from '@eulogise/client-components/dist/Button/IconButton'
import { GlobalHotKeys } from 'react-hotkeys'
import { fetchClientByClientId } from '../../../store/AdminState/actions'
import { QRCodeModal } from '../QRCodeModal/QRCodeModal'

interface IBaseShareModalProps {
  product: EulogiseProduct
  onClose: () => void
  onCopyShareLink: () => void
  isGenerating: boolean
  isGenerated?: boolean
  onCopyEmbeddedCode?: () => void
  caseId?: string
}

const CopyShareLinkButton = styled(Button).attrs({
  block: true,
})`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ShareLabel = styled.div`
  margin: 0.5rem 0;
`

const SELECT_TEXT_HOTKEY_MAP = {
  SELECT_TEXT: 'ctrl+a', // Windows/Linux
  SELECT_TEXT_MAC: 'meta+a', // macOS
}

const BaseShareModal = ({
  product,
  onClose,
  isGenerating,
  isGenerated,
  onCopyShareLink,
  onCopyEmbeddedCode,
  caseId,
}: IBaseShareModalProps) => {
  const preRef = useRef<HTMLElement>(null)
  const dispatch = useEulogiseDispatch()
  // for client admin
  const { activeItem: activeClient } = useClientState()
  // for admin
  const [client, setClient] = useState<IEulogiseClient | undefined>(
    activeClient,
  )
  const [isShowQRCodeModal, setIsShowQRCodeModal] = useState<boolean>(false)
  const showWhiteBottomBar = client?.embeddedIframes?.showWhiteBottomBar
  const [isCopyingEmbeddedCode, setIsCopyingEmbeddedCode] = useState(false)
  const [isEmbeddedCodeVisible, setIsEmbeddedCodeVisible] = useState(false)
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region!

  useEffect(() => {
    if (activeCase?.client) {
      dispatch(
        fetchClientByClientId({
          clientId: activeCase?.client,
          onSuccess: (c) => {
            setClient(c)
          },
        }),
      )
    }
  }, [activeCase?.client])

  const selectText = (event: KeyboardEvent) => {
    event.preventDefault() // Prevent default select-all behavior

    if (preRef.current) {
      const range = document.createRange()
      range.selectNodeContents(preRef.current)

      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  const selectTextKeyHandlers = {
    SELECT_TEXT: selectText,
    SELECT_TEXT_MAC: selectText,
  }

  const productShortName = `${CardProductHelper.getProductShortName({
    product,
    region,
  })}`

  return (
    <Modal
      width={800}
      isOpen
      onCloseClick={onClose}
      title={`Share ${CardProductHelper.getProductShortName({
        product,
        region,
      })}`}
      footer={null}
      closeIcon={
        <Button
          key="close"
          buttonType={ButtonType.TRANSPARENT}
          noMarginRight
          onClick={close}
        >
          Cancel
        </Button>
      }
    >
      <Accordion>
        <AccordionItem key="contributor" header="Send to a Contributor">
          <InviteList
            caseId={activeCase?.id!}
            ownerId={activeCase?.customer as unknown as string}
            isShowConfirmModal={false}
            product={product}
          />
        </AccordionItem>
        <AccordionItem key="new-contact" header="Add a new Contact">
          <ShareViaEmailForm product={product} />
        </AccordionItem>
      </Accordion>
      <Row gutter={8} style={{ marginTop: STYLE.GUTTER }}>
        <Col flex="50%">
          <ShareLabel>To share via email</ShareLabel>
          <CopyShareLinkButton
            noMarginLeft
            noMarginRight
            buttonType={ButtonType.TRANSPARENT}
            loading={isGenerating}
            onClick={onCopyShareLink}
            icon={<CopySharableLinkIcon />}
          >
            Copy Sharable Link
          </CopyShareLinkButton>
        </Col>

        {(product === EulogiseProduct.SLIDESHOW ||
          product === EulogiseProduct.BOOKLET ||
          product === EulogiseProduct.PHOTOBOOK) &&
          isGenerated && (
            <Col flex="50%">
              <Row>
                <Col flex={1}>
                  <ShareLabel>To add to website or obits</ShareLabel>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col flex={1}>
                  <CopyShareLinkButton
                    noMarginLeft
                    noMarginRight
                    loading={isCopyingEmbeddedCode}
                    buttonType={ButtonType.TRANSPARENT}
                    onClick={() => {
                      setIsCopyingEmbeddedCode(true)
                      setTimeout(() => {
                        if (onCopyEmbeddedCode) {
                          onCopyEmbeddedCode()
                        }
                        setIsCopyingEmbeddedCode(false)
                      }, 500)
                    }}
                    icon={<CopyEmbeddedCodeIcon />}
                  >
                    Copy Embedded Code
                  </CopyShareLinkButton>
                </Col>
                <Col>
                  <IconButton
                    tooltip={
                      isEmbeddedCodeVisible ? 'Hide' : 'Show Embedded Code'
                    }
                    buttonType={ButtonType.TRANSPARENT}
                    noMarginLeft
                    onClick={() => {
                      setIsEmbeddedCodeVisible(!isEmbeddedCodeVisible)
                    }}
                    icon={
                      isEmbeddedCodeVisible ? <EyeInvisibleIcon /> : <EyeIcon />
                    }
                  />
                </Col>
              </Row>
            </Col>
          )}
      </Row>
      {caseId && isEmbeddedCodeVisible && (
        <Row>
          <Col
            /* @ts-ignore */
            ref={preRef}
          >
            <GlobalHotKeys
              keyMap={SELECT_TEXT_HOTKEY_MAP}
              handlers={selectTextKeyHandlers as unknown as Record<string, any>}
            >
              <SyntaxHighlighter
                language="html"
                codeString={
                  product === EulogiseProduct.SLIDESHOW
                    ? SlideshowHelper.getSlideshowEmbeddedCode({
                        caseId,
                        showWhiteBottomBar,
                      })
                    : CardProductHelper.getCardProductEmbeddedCode({
                        caseId,
                        product,
                      })
                }
              />
            </GlobalHotKeys>
          </Col>
        </Row>
      )}
      {(product === EulogiseProduct.SLIDESHOW ||
        product === EulogiseProduct.BOOKLET) &&
        isGenerated && (
          <Row gutter={8} style={{ marginTop: STYLE.GUTTER }}>
            <Col flex="50%">
              <ShareLabel>Create direct QR link to video</ShareLabel>
              <CopyShareLinkButton
                icon={<QRCodeIcon />}
                buttonType={ButtonType.TRANSPARENT}
                onClick={() => {
                  setIsShowQRCodeModal(true)
                }}
                noMarginLeft
                noMarginRight
              >
                Create QR Code
              </CopyShareLinkButton>
            </Col>
            <Col flex="50%"></Col>
          </Row>
        )}
      {isShowQRCodeModal && caseId && (
        <QRCodeModal
          title={`QR Code to the ${productShortName}`}
          qrcodeTitle={`Directly link to the ${productShortName}`}
          content={
            product === EulogiseProduct.SLIDESHOW
              ? SlideshowHelper.getEmbeddedSlideshowUrl({ caseId })
              : CardProductHelper.getEmbeddedCardProductUrl({ caseId, product })
          }
          onCloseClick={() => {
            setIsShowQRCodeModal(false)
          }}
        />
      )}
    </Modal>
  )
}

export default BaseShareModal
