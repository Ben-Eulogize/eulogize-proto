import React, { useEffect, useState } from 'react'
import { SettingDrawer } from '../../../../../eulogise-client-components/src/Drawer/SettingDrawer/SettingDrawer'
import {
  useAuthState,
  useClientState,
  useEulogiseDispatch,
} from '../../store/hooks'
import { setActiveCaseByCaseId } from '../../store/CaseState/actions'
import {
  CardProductHelper,
  CaseHelper,
  NavigationHelper,
} from '@eulogise/helpers'
import {
  AssetType,
  DrawerId,
  EulogisePage,
  EulogiseProduct,
  EulogiseUserRole,
  IAuthState,
  IEulogiseUser,
  IGenericCardProductTypeData,
  IPortalCase,
  MemorialVisualStatus,
  ModalId,
  ResourceFileStatus,
} from '@eulogise/core'
import { showModalAction } from '../../store/ModalState/actions'
import {
  openDrawerAction,
  openThemeDrawer,
} from '../../store/DrawerState/actions'
import {
  assignArranger,
  fetchCaseSummaryByCaseId,
  fetchCasesWithFullDetails,
  fetchFuneralDirectorsByCaseId,
  fetchUserByUserId,
  reeditProductAction,
  unlockProductByIdAction,
  updateAdminCaseById,
  updateProductByIdAction,
  updateUserRole,
} from '../../store/AdminState/actions'
import { updateIsFSOverlayPickerOpen } from '../../store/AssetState/actions'

type IClientPortalSettingDrawerProps = {
  caseId: string
  iCase: IPortalCase
  genericProductType?: IGenericCardProductTypeData
  isOpen: boolean
  onClose: () => void
}

export const ClientPortalSettingDrawer = ({
  caseId,
  iCase,
  genericProductType,
  onClose,
  isOpen,
}: IClientPortalSettingDrawerProps) => {
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()
  const { activeItem: activeClient } = useClientState()
  const [isFetchingCaseSummary, setIsFetchingCaseSummary] =
    useState<boolean>(false)
  const [isFetchingFuneralDirectors, setIsFetchingFuneralDirectors] =
    useState<boolean>(false)
  const [isFetchingUserRole, setIsFetchingUserRole] = useState<boolean>(false)
  const [userRole, setUserRole] = useState<EulogiseUserRole>()
  const [summaryData, setSummaryData] = useState<{
    noOfInvites: number
    noOfImages: number
  }>({
    noOfInvites: 0,
    noOfImages: 0,
  })
  /*
  const { portalCasesPageState } = useAdminState()
  console.log('portalCasesPageState.cases', portalCasesPageState.cases)
*/
  const arrangerId = iCase?.funeralDirector
  const region = iCase?.region!
  const enabledProducts = iCase?.enabledProducts
  const availableProducts = activeClient?.availableProducts
  const isAdmin = account?.role === EulogiseUserRole.ADMIN
  const customerId = iCase?.customer!
  const [funeralDirectors, setFuneralDirectors] = useState<
    Array<IEulogiseUser>
  >([])

  useEffect(() => {
    setIsFetchingCaseSummary(true)
    dispatch(
      fetchCaseSummaryByCaseId({
        caseId,
        onSuccess: (d) => {
          setSummaryData(d)
        },
        onComplete: () => {
          setIsFetchingCaseSummary(false)
        },
      }),
    )
    if (caseId) {
      setIsFetchingFuneralDirectors(true)
      dispatch(
        fetchFuneralDirectorsByCaseId({
          caseId,
          success: (fd) => {
            setFuneralDirectors(fd)
          },
          onComplete: () => {
            setIsFetchingFuneralDirectors(false)
          },
        }),
      )
    } else {
      setFuneralDirectors([])
    }
  }, [caseId])

  useEffect(() => {
    if (customerId) {
      setIsFetchingUserRole(true)
      dispatch(
        fetchUserByUserId({
          userId: customerId,
          success: (user) => {
            setUserRole(user.role)
          },
          onComplete: () => {
            setIsFetchingUserRole(false)
          },
        }),
      )
    }
    setUserRole(undefined)
  }, [customerId])

  const unlockProduct = (product: EulogiseProduct, productId: string) => {
    dispatch(
      unlockProductByIdAction({
        product,
        productId,
        onSuccess: () => {
          dispatch(fetchCasesWithFullDetails())
        },
      }),
    )
  }

  const onPreviewClick = ({
    product,
    status,
  }: {
    product: EulogiseProduct
    status: MemorialVisualStatus
  }) => {
    const isPreviewable =
      status === MemorialVisualStatus.COMPLETE ||
      status === MemorialVisualStatus.THEME_SELECTED ||
      status === MemorialVisualStatus.DOWNLOAD ||
      status === MemorialVisualStatus.EDITED

    if (isPreviewable) {
      dispatch(
        setActiveCaseByCaseId({
          caseId,
          success: () => {
            if (product === EulogiseProduct.SLIDESHOW) {
              return dispatch(
                showModalAction(ModalId.SLIDESHOW_PREVIEW, {
                  showDownloadButton: true,
                  showKeepEditingButton: true,
                }),
              )
            } else {
              return dispatch(
                showModalAction(
                  CardProductHelper.getPreviewModalIdByProduct(product)!,
                  {
                    product,
                    genericProductType,
                    showDownloadButton: true,
                    showKeepEditingButton: true,
                  },
                ),
              )
            }
          },
        }),
      )
    }
  }

  const onEditClick = (params: {
    productId?: string | null
    page: EulogisePage
    productIdKey: string
    product: EulogiseProduct
  }) => {
    const { productId, page, productIdKey, product } = params
    dispatch(
      setActiveCaseByCaseId({
        caseId,
        success: () => {
          setTimeout(() => {
            if (productId) {
              NavigationHelper.navigate(page, {
                [productIdKey]: productId,
              })
            } else {
              if (product === EulogiseProduct.PHOTOBOOK) {
                dispatch(openDrawerAction(DrawerId.PHOTOBOOK_DRAWER))
              } else {
                dispatch(openThemeDrawer(product, true))
              }
            }
          }, 100)
        },
      }),
    )
  }

  const iSlideshow = iCase?.slideshow
  const iSidedCard = iCase?.sidedCard
  const iBookmark = iCase?.bookmark
  const iBooklet = iCase?.booklet
  const iThankyouCard = iCase?.thankyouCard
  const iPhotobook = iCase?.photobook
  const iTvWelcomeScreen = iCase?.tvWelcomeScreen
  const isRetainOnCleanup = iCase?.retainOnCleanup
  const handleReeditBookmark = () => {
    dispatch(
      reeditProductAction({
        product: EulogiseProduct.BOOKMARK,
        productId: iBookmark?.activeId!,
        region,
      }),
    )
  }
  const handleBookletReedit = () => {
    dispatch(
      reeditProductAction({
        product: EulogiseProduct.BOOKLET,
        productId: iBooklet?.activeId!,
        region,
      }),
    )
  }
  const handleSidedCardReedit = () => {
    dispatch(
      reeditProductAction({
        product: EulogiseProduct.SIDED_CARD,
        productId: iSidedCard?.activeId!,
        region,
      }),
    )
  }
  const handleSlideshowReedit = () => {
    dispatch(
      reeditProductAction({
        product: EulogiseProduct.SLIDESHOW,
        productId: iSlideshow?.activeId!,
        region,
      }),
    )
  }
  const handleThankyouCardReedit = () => {
    dispatch(
      reeditProductAction({
        product: EulogiseProduct.THANK_YOU_CARD,
        productId: iThankyouCard?.activeId!,
        region,
      }),
    )
  }
  const handlePhotobookReedit = () => {
    dispatch(
      reeditProductAction({
        product: EulogiseProduct.PHOTOBOOK,
        productId: iPhotobook?.activeId!,
        region,
      }),
    )
  }
  const handleTvWelcomeScreenReedit = () => {
    dispatch(
      reeditProductAction({
        product: EulogiseProduct.TV_WELCOME_SCREEN,
        productId: iTvWelcomeScreen?.activeId!,
        region,
      }),
    )
  }
  return (
    <SettingDrawer
      allowReset={account?.role === EulogiseUserRole.ADMIN}
      header={iCase?.deceased?.fullName}
      region={iCase?.region!}
      funeralDirectors={funeralDirectors}
      caseId={iCase?.id!}
      allowUnlock={
        account?.role === EulogiseUserRole.ADMIN ||
        account?.role === EulogiseUserRole.CLIENT
      }
      isOpen={isOpen}
      onClose={onClose}
      isAdmin={isAdmin}
      country={iCase?.country!}
      isFetchingCaseSummary={isFetchingCaseSummary}
      isFetchingFuneralDirectors={isFetchingFuneralDirectors}
      isFetchingUserRole={isFetchingUserRole}
      noOfInvites={summaryData.noOfInvites!}
      noOfImages={summaryData.noOfImages!}
      bookletId={iBooklet?.activeId!}
      bookletFileStatus={iBooklet?.fileStatus!}
      bookletStatus={iBooklet?.status!}
      enabledProducts={enabledProducts}
      availableProducts={availableProducts}
      userRole={userRole}
      onFamilyCanDownloadClick={(enabled) => {
        const newUserRole = enabled
          ? EulogiseUserRole.EDITOR
          : EulogiseUserRole.COEDITOR
        dispatch(
          updateUserRole({ userId: iCase?.customer!, role: newUserRole }),
        )
        setUserRole(newUserRole)
      }}
      isRetainOnCleanup={isRetainOnCleanup}
      onToggleRetentionClick={() => {
        const newIsRetainOnCleanup = !isRetainOnCleanup
        dispatch(
          updateAdminCaseById({
            caseId,
            caseData: {
              retainOnCleanup: newIsRetainOnCleanup,
            },
          }),
        )
      }}
      onResetClick={(ev) => {
        dispatch(
          updateProductByIdAction({
            product: ev.product,
            productId: ev.id,
            caseId: ev.caseId,
            productData: {
              fileStatus: ResourceFileStatus.NOT_STARTED,
              status: MemorialVisualStatus.EDITED,
            },
          }),
        )
      }}
      onBookletClick={() => {
        onPreviewClick({
          product: EulogiseProduct.BOOKLET,
          status: iBooklet?.status!,
        })
      }}
      onBookletEditClick={() => {
        const bookletId = iBooklet?.activeId
        onEditClick({
          page: EulogisePage.EDIT_BOOKLET,
          product: EulogiseProduct.BOOKLET,
          productIdKey: 'bookletId',
          productId: bookletId,
        })
      }}
      onBookletUnlockClick={handleBookletReedit}
      onBookletReEditClick={handleBookletReedit}
      bookmarkId={iBookmark?.activeId!}
      bookmarkStatus={iBookmark?.status!}
      bookmarkFileStatus={iBookmark?.fileStatus!}
      onBookmarkClick={() => {
        const product = iBookmark
        onPreviewClick({
          product: EulogiseProduct.BOOKMARK,
          status: product?.status!,
        })
      }}
      onBookmarkEditClick={() => {
        const bookmarkId = iBookmark?.activeId
        onEditClick({
          page: EulogisePage.EDIT_BOOKMARK,
          product: EulogiseProduct.BOOKMARK,
          productIdKey: 'bookmarkId',
          productId: bookmarkId,
        })
      }}
      onBookmarkUnlockClick={handleReeditBookmark}
      onBookmarkReEditClick={handleReeditBookmark}
      sidedCardId={iSidedCard?.activeId!}
      sidedCardStatus={iSidedCard?.status!}
      sidedCardFileStatus={iSidedCard?.fileStatus!}
      onSidedCardClick={() => {
        onPreviewClick({
          product: EulogiseProduct.SIDED_CARD,
          status: iSidedCard?.status!,
        })
      }}
      onSidedCardEditClick={() => {
        const sidedCardId = iSidedCard?.activeId
        onEditClick({
          page: EulogisePage.EDIT_SIDED_CARD,
          product: EulogiseProduct.SIDED_CARD,
          productIdKey: 'sidedCardId',
          productId: sidedCardId,
        })
      }}
      onSidedCardUnlockClick={handleSidedCardReedit}
      onSidedCardReEditClick={handleSidedCardReedit}
      slideshowId={iSlideshow?.activeId!}
      slideshowStatus={iSlideshow?.status!}
      slideshowFileStatus={iSlideshow?.fileStatus!}
      onSlideshowClick={() => {
        onPreviewClick({
          product: EulogiseProduct.SLIDESHOW,
          status: iSlideshow?.status!,
        })
      }}
      onSlideshowEditClick={() => {
        const slideshowId = iSlideshow?.activeId
        onEditClick({
          page: EulogisePage.EDIT_SLIDESHOW,
          product: EulogiseProduct.SLIDESHOW,
          productIdKey: 'slideshowId',
          productId: slideshowId,
        })
      }}
      onSlideshowUnlockClick={handleSlideshowReedit}
      onSlideshowReEditClick={handleSlideshowReedit}
      thankyouCardId={iThankyouCard?.activeId!}
      thankyouCardStatus={iThankyouCard?.status!}
      thankyouCardFileStatus={iThankyouCard?.fileStatus!}
      onThankyouCardClick={() => {
        onPreviewClick({
          product: EulogiseProduct.THANK_YOU_CARD,
          status: iThankyouCard?.status!,
        })
      }}
      onThankyouCardEditClick={() => {
        const thankyouCardId = iThankyouCard?.activeId
        onEditClick({
          page: EulogisePage.EDIT_THANK_YOU_CARD,
          product: EulogiseProduct.THANK_YOU_CARD,
          productIdKey: 'thankyouCardId',
          productId: thankyouCardId,
        })
      }}
      onThankyouCardUnlockClick={handleThankyouCardReedit}
      onThankyouCardReEditClick={handleThankyouCardReedit}
      photobookId={iPhotobook?.activeId!}
      photobookStatus={iPhotobook?.status!}
      photobookFileStatus={iPhotobook?.fileStatus!}
      onPhotobookClick={() => {
        onPreviewClick({
          product: EulogiseProduct.PHOTOBOOK,
          status: iPhotobook?.status!,
        })
      }}
      onPhotobookEditClick={() => {
        const photobookId = iPhotobook?.activeId
        onEditClick({
          page: EulogisePage.EDIT_PHOTOBOOK,
          product: EulogiseProduct.PHOTOBOOK,
          productIdKey: 'photobookId',
          productId: photobookId,
        })
      }}
      onPhotobookUnlockClick={handlePhotobookReedit}
      onPhotobookReEditClick={handlePhotobookReedit}
      tvWelcomeScreenId={iTvWelcomeScreen?.activeId!}
      tvWelcomeScreenStatus={iTvWelcomeScreen?.status!}
      tvWelcomeScreenFileStatus={iTvWelcomeScreen?.fileStatus!}
      onTvWelcomeScreenClick={() => {
        onPreviewClick({
          product: EulogiseProduct.TV_WELCOME_SCREEN,
          status: iTvWelcomeScreen?.status!,
        })
      }}
      onTvWelcomeScreenEditClick={() => {
        const tvWelcomeScreenId = iTvWelcomeScreen?.activeId
        onEditClick({
          page: EulogisePage.EDIT_TV_WELCOME_SCREEN,
          product: EulogiseProduct.TV_WELCOME_SCREEN,
          productIdKey: 'tvWelcomeScreenId',
          productId: tvWelcomeScreenId,
        })
      }}
      onTvWelcomeScreenUnlockClick={handleTvWelcomeScreenReedit}
      onTvWelcomeScreenReEditClick={handleTvWelcomeScreenReedit}
      onToggleFeature={(enabledProducts) => {
        const existingEnabledProducts = CaseHelper.getEnabledProducts({
          activeCase: iCase!,
        })
        dispatch(
          updateAdminCaseById({
            caseId: iCase?.id!,
            caseData: {
              enabledProducts: {
                ...existingEnabledProducts,
                ...enabledProducts,
              },
            },
          }),
        )
      }}
      onViewMemorialClick={() => {
        dispatch(
          setActiveCaseByCaseId({
            caseId,
            success: () => {
              NavigationHelper.navigate(EulogisePage.DASHBOARD)
            },
          }),
        )
      }}
      onAccountSettingsClick={() => {
        dispatch(
          setActiveCaseByCaseId({
            caseId,
            success: () => {
              NavigationHelper.navigate(EulogisePage.ACCOUNT_SETTINGS)
            },
          }),
        )
      }}
      onInviteContributorClick={() => {
        dispatch(showModalAction(ModalId.INVITE, { caseId }))
      }}
      onUploadPictureClick={() => {
        dispatch(
          updateIsFSOverlayPickerOpen({
            isFilestackOverlayPickerOpen: true,
            filestackOverlayPickerUploadAssetType: AssetType.IMAGE,
          }),
          // TODO: Below needs to be fixed as using the new image uploader, so cannot get the callback paras
          // dispatch(
          //   addNoOfImagesToAdminByCaseId({
          //     caseId,
          //     noOfImages: filesUploaded.length,
          //   }),
          // )
        )
      }}
      arrangerId={arrangerId}
      onArrangerChange={(arrangerId: string, item) => {
        dispatch(
          assignArranger({ caseId, arrangerId, arrangerName: item.label }),
        )
      }}
      onViewPhotosInPhotoLibrary={() => {
        dispatch(
          setActiveCaseByCaseId({
            caseId,
            success: () => {
              NavigationHelper.navigate(EulogisePage.PHOTO_LIBRARY)
            },
          }),
        )
      }}
    />
  )
}
