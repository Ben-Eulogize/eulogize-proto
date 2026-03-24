import React, { useEffect, useState } from 'react'
import copyToClipboard from 'copy-to-clipboard'
import { hideModalAction } from '../../../store/ModalState/actions'
import {
  EulogiseProduct,
  ICaseState,
  IEulogiseClient,
  IInviteState,
  IModalState,
  IShareCardProductModalOption,
  ModalId,
  ResourceFileStatus,
} from '@eulogise/core'
import {
  useCaseState,
  useClientState,
  useEulogiseDispatch,
  useInviteState,
  useModalState,
  useProductState,
} from '../../../store/hooks'
import { Notification } from '@eulogise/client-components'
import BaseShareModal from '../BaseShareModal/BaseShareModal'
import { generateProductShareLink } from '../../../store/InviteState/actions'
import { CardProductHelper, SlideshowHelper } from '@eulogise/helpers'
import { fetchClientByClientId } from '../../../store/AdminState/actions'

interface IShareBookletModalProps {}

const ShareCardProductModal: React.FC<IShareBookletModalProps> = () => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  // for client admin
  const { activeItem: activeClient } = useClientState()
  // for admin
  const [client, setClient] = useState<IEulogiseClient | undefined>(
    activeClient,
  )
  const showWhiteBottomBar = !!client?.embeddedIframes?.showWhiteBottomBar
  const modalState: IModalState = useModalState()
  const shareOptions = modalState.options as IShareCardProductModalOption
  const product: EulogiseProduct = shareOptions.product
  const slug = shareOptions.slug
  const { activeItem } = useProductState({ product, slug })
  const { isGenerating }: IInviteState = useInviteState()
  const isGenerated = activeItem?.fileStatus === ResourceFileStatus.GENERATED

  useEffect(() => {
    if (activeCase?.client) {
      dispatch(
        fetchClientByClientId({
          clientId: activeCase?.client!,
          onSuccess: (c) => {
            setClient(c)
          },
        }),
      )
    }
  }, [activeCase?.client])

  return (
    <BaseShareModal
      caseId={activeCase?.id}
      product={product}
      onClose={() => dispatch(hideModalAction(ModalId.SHARE_CARD_PRODUCT))}
      isGenerating={isGenerating}
      isGenerated={isGenerated}
      onCopyShareLink={() => {
        dispatch(
          generateProductShareLink(
            product,
            activeCase?.id!,
            (shareLink: string) => {
              copyToClipboard(shareLink)
              Notification.success('Link copied to clipboard')
            },
          ),
        )
      }}
      onCopyEmbeddedCode={() => {
        const caseId = activeCase?.id
        if (caseId) {
          if (product === EulogiseProduct.SLIDESHOW) {
            const code = SlideshowHelper.getSlideshowEmbeddedCode({
              caseId,
              showWhiteBottomBar,
            })
            copyToClipboard(code)
          } else if (
            product === EulogiseProduct.BOOKLET ||
            product === EulogiseProduct.PHOTOBOOK
          ) {
            const code = CardProductHelper.getCardProductEmbeddedCode({
              caseId,
              product,
            })
            copyToClipboard(code)
          }
          Notification.success('Embedded code copied to clipboard')
        }
      }}
    />
  )
}

export default ShareCardProductModal
