import React, { useEffect, useState } from 'react'
import copyToClipboard from 'copy-to-clipboard'
import { hideModalAction } from '../../../store/ModalState/actions'
import {
  useCaseState,
  useClientState,
  useEulogiseDispatch,
  useInviteState,
  useSlideshowState,
} from '../../../store/hooks'
import { Notification } from '@eulogise/client-components'
import BaseShareModal from '../BaseShareModal/BaseShareModal'
import { generateProductShareLink } from '../../../store/InviteState/actions'
import {
  EulogiseProduct,
  ICaseState,
  IEulogiseClient,
  IInviteState,
  ModalId,
  ResourceFileStatus,
} from '@eulogise/core'
import { SlideshowHelper } from '@eulogise/helpers'
import { fetchClientByClientId } from '../../../store/AdminState/actions'

interface IShareSlideshowModalProps {}

const ShareSlideshowModal: React.FC<IShareSlideshowModalProps> = () => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  // for client admin
  const { activeItem: activeClient } = useClientState()
  // for admin
  const [client, setClient] = useState<IEulogiseClient | undefined>(
    activeClient,
  )
  const showWhiteBottomBar = !!client?.embeddedIframes?.showWhiteBottomBar
  const { isGenerating }: IInviteState = useInviteState()
  const { activeItem } = useSlideshowState()
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
      product={EulogiseProduct.SLIDESHOW}
      onClose={() => dispatch(hideModalAction(ModalId.SHARE_SLIDESHOW))}
      isGenerating={isGenerating}
      onCopyShareLink={() => {
        dispatch(
          generateProductShareLink(
            EulogiseProduct.SLIDESHOW,
            activeCase?.id!,
            (shareLink: string) => {
              copyToClipboard(shareLink)
              Notification.success('Link copied to clipboard')
            },
          ),
        )
      }}
      isGenerated={isGenerated}
      caseId={activeCase?.id}
      onCopyEmbeddedCode={() => {
        const caseId = activeCase?.id
        if (caseId) {
          const code = SlideshowHelper.getSlideshowEmbeddedCode({
            caseId,
            showWhiteBottomBar,
          })
          copyToClipboard(code)
        }
      }}
    />
  )
}

export default ShareSlideshowModal
