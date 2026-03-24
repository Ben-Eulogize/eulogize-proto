import React, { useEffect, useRef, useState } from 'react'
import { PageProps } from 'gatsby'
import draftToHtml from 'draftjs-to-html'
import { CardProductHelper, UrlHelper } from '@eulogise/helpers'
import {
  EulogisePage,
  EulogiseProduct,
  IEulogiseUser,
  ModalId,
} from '@eulogise/core'
import Layout from '../ui/components/Layout/Layout'
import { DownloadPageThankYouHeader } from '../ui/styles/DownloadPage.styles'
import {
  useAllGeneratedProducts,
  useAllGenericCardProductTypes,
  useCaseState,
  useEulogiseDispatch,
  useShareState,
} from '../ui/store/hooks'
import { fetchCaseById } from '../ui/store/CaseState/actions'
import { fetchSharesByCaseId } from '../ui/store/ShareState/actions'
import { InfoPanel } from '../ui/components/Panel/InfoPanel'
import { ContentPanel } from '../ui/components/Panel/ContentPanel'
import { DownloadCardProductRowContainer } from '../ui/containers/Checkoutv2/DownloadCardProductRowContainer'
import { fetchAllProductsByCaseId } from '../ui/store/CardProduct/actions'
import { DownloadProgressBar } from '@eulogise/client-components'
import { fetchThemesAction } from '../ui/store/ThemeState/actions'
import { DownloadTributeProduct } from '../ui/components/Checkoutv2/DownloadTributeProduct'
import { showModalAction } from '../ui/store/ModalState/actions'
import { EulogizeMemorialCard } from '../ui/components/Card'
import { TwoColumnsPageLayout } from '../ui/components/Layout/TwoColumnsPageLayout'

export const ShareDownload = ({ location }: PageProps) => {
  const dispatch = useEulogiseDispatch()
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const generatedProducts = useAllGeneratedProducts()
  const { share } = useShareState()
  const [percent, setPercent] = useState<number>(0)
  const { caseId } = UrlHelper.getParams(
    EulogisePage.SHARE_DOWNLOAD_TRIBUTES,
    location,
  )
  const percentRef = useRef<number>(0)
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region!

  const increasePercent = (p: number) => {
    percentRef.current = percentRef.current + p
    setPercent(percentRef.current)
  }
  useEffect(() => {
    if (caseId) {
      dispatch(
        fetchThemesAction({
          isShareFlow: true,
          caseId,
          onSuccess: () => {
            dispatch(
              fetchAllProductsByCaseId({
                caseId,
                region,
                isShareFlow: true,
                onFetchProductComplete: () => {
                  increasePercent(100)
                },
              }),
            )
          },
        }),
      )
      dispatch(
        fetchCaseById({
          caseId,
          isShareFlow: true,
          onComplete: () => {
            increasePercent(30)
          },
        }),
      )
      dispatch(
        fetchSharesByCaseId({
          caseId,
          complete: () => {
            increasePercent(30)
          },
        }),
      )
    }
  }, [caseId, region])

  const handleView = ({ product }: { product: EulogiseProduct }) => {
    if (product === EulogiseProduct.SLIDESHOW) {
      dispatch(
        showModalAction(ModalId.SLIDESHOW_PREVIEW, {
          isShareFlow: true,
        }),
      )
    } else {
      const isCardProduct = CardProductHelper.isCardProduct(
        product as EulogiseProduct,
      )
      const slug = isCardProduct ? undefined : (product as string)
      const genericProductType = CardProductHelper.getGenericProductTypeBySlug({
        slug: slug!,
        genericProductTypes,
      })
      dispatch(
        showModalAction(ModalId.CARD_PRODUCT_PREVIEW, {
          product: product as EulogiseProduct,
          genericProductType,
        }),
      )
    }
  }

  const invitorName = (share?.createdBy as unknown as IEulogiseUser)?.fullName
  const deceasedName = activeCase?.deceased.fullName!
  const availableForDownload = share?.tributeIds ?? []
  const invitationMessage = share?.invitationMessage
    ? draftToHtml(share?.invitationMessage)
    : `Hi, these are the tributes we discussed that I need you to download and save on a thumb drive.`

  const hasGenerated = availableForDownload.some((item) =>
    generatedProducts.includes(item as EulogiseProduct),
  )
  return (
    <Layout title={''} location={location} noRedirect showSider={false}>
      <TwoColumnsPageLayout
        headerLeft={null}
        headerRight={null}
        contentLeft={
          <ContentPanel $hasBorder>
            <DownloadPageThankYouHeader>
              View your tributes for {deceasedName}
            </DownloadPageThankYouHeader>
            {percent >= 100 && (
              <InfoPanel>
                {!hasGenerated ? (
                  <div>
                    <b>Tributes temporarily unavailable</b>
                    <p>
                      The person who shared these tributes has reopened them for
                      editing. To download again, ask them to re-generate and
                      re-share the updated version.
                    </p>
                  </div>
                ) : (
                  <>
                    <b>{invitorName}'s message</b>
                    <div
                      dangerouslySetInnerHTML={{ __html: invitationMessage }}
                    />
                  </>
                )}
              </InfoPanel>
            )}
            {percent < 100 ? (
              <DownloadProgressBar percent={percent} />
            ) : (
              <>
                {availableForDownload.includes(EulogiseProduct.SLIDESHOW) ? (
                  <DownloadTributeProduct
                    key={EulogiseProduct.SLIDESHOW}
                    product={EulogiseProduct.SLIDESHOW}
                    caseId={caseId}
                    isShowOnlyGenerated={true}
                    isShowShareButton={false}
                    isShowViewButton
                    isShowStartCreatingButton={false}
                    isShowGenerateButton={false}
                    isShowDownloadButton={share?.allowDownload}
                    onViewClick={() => {
                      handleView({ product: EulogiseProduct.SLIDESHOW })
                    }}
                    hasGeneratePermission={false}
                    onKeepEditing={() => {}}
                    onStartCreating={() => {}}
                    onPurchase={() => {}}
                  />
                ) : null}
                {availableForDownload
                  .filter((p) => EulogiseProduct.SLIDESHOW !== p)
                  .map((productOrSlug) => {
                    const isCardProduct = CardProductHelper.isCardProduct(
                      productOrSlug as EulogiseProduct,
                    )
                    const slug = isCardProduct ? undefined : productOrSlug
                    return (
                      <DownloadCardProductRowContainer
                        key={productOrSlug}
                        slug={slug}
                        isShowOnlyGenerated={true}
                        isShowProViewButton={true}
                        isShowHomeViewButton={
                          productOrSlug === EulogiseProduct.TV_WELCOME_SCREEN
                        }
                        isShowShareButton={false}
                        isShowDownloadButton={share?.allowDownload}
                        isShowPurchaseButton={false}
                        product={CardProductHelper.convertProductTypeToGenericIfNotFound(
                          productOrSlug,
                        )}
                        caseId={caseId}
                        hasGeneratePermission={false}
                        shouldDisableButton={false}
                        deceasedName={deceasedName}
                        region={region}
                        onStartCreating={() => {}}
                        onKeepEditing={() => {}}
                        onPurchase={() => {}}
                        onViewClick={() => {
                          handleView({
                            product: productOrSlug as EulogiseProduct,
                          })
                        }}
                      />
                    )
                  })}
              </>
            )}
          </ContentPanel>
        }
        contentRight={
          <ContentPanel $noPaddingOnMobile>
            <EulogizeMemorialCard
              onArrowRightClick={() => {
                window.open(`https://www.eulogizememorials.com`, '_blank')
              }}
            />
          </ContentPanel>
        }
      />
    </Layout>
  )
}

export default ShareDownload
