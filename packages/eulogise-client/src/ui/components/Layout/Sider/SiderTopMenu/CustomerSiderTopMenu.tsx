import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { WindowLocation } from '@reach/router'
import {
  AddContributorIcon,
  LogOutIcon,
  ImageLibraryIcon,
  UploadPicturesIcon,
  Tooltip,
  CreateNewCaseIcon,
  DownloadTributeIcon,
  KeepsakesStoreIcon,
  OrderPrintingIcon,
} from '@eulogise/client-components'
import { SiderMenuItem } from '../SiderMenu/SiderMenuItem'
import {
  EulogiseUserRole,
  ICaseState,
  IAuthState,
  DrawerId,
  EulogisePage,
  ModalId,
  GUIDE_SHOW_UP_PAGE,
  IGuideWalkThroughState,
  IUserGuideHelperConfig,
  AssetType,
  CaseStatus,
  IAllowPurchasingOption,
  AllowPurchasingProductOptionKey,
  KEEPSAKES_ALLOWING_PURCHASE_KEY,
  EulogisePackageOptions,
} from '@eulogise/core'
import {
  useAuthState,
  useProductState,
  useCaseState,
  useEulogiseDispatch,
  useGuideWalkThroughState,
  useClientState,
  useAnyActiveCardProductIsFetching,
  usePhotobookState,
} from '../../../../store/hooks'
import {
  showModalAction,
  showUnsavedChangesConfirmModal,
} from '../../../../store/ModalState/actions'
import { useBreakpoint, DEVICES, COLOR } from '@eulogise/client-core'
import CreateCaseModal from '../../../../containers/Modal/CreateCaseModal/CreateCaseModal'
import { fetchCasesWithFullDetails } from '../../../../store/AdminState/actions'
import {
  restoreGuideState,
  showGuide,
} from '../../../../store/GuideWalkThroughState/action'
import { BaseSiderMenu } from './BaseSiderMenu'
import { ChangeThemeSiderMenuItem } from '../SiderMenuItem/ChangeThemeSiderMenuItem'
import { MemorialHomeSiderMenuItem } from '../SiderMenuItem/MemorialHomeSiderMenuItem'
import { CardProductHelper, CheckoutHelper } from '@eulogise/helpers'
import { NavigationHelper } from '@eulogise/helpers'
import { GuidePopover } from '../../../GuidePopover/GuidePopover'
import { logout } from '../../../../store/AuthState/actions'
import { updateIsFSOverlayPickerOpen } from '../../../../store/AssetState/actions'
import {
  restoreCheckoutsState,
  updatePaymentOption,
} from '../../../../store/CheckoutsState/action'

const getShouldShowKeepsakeStoreButton = ({
  role,
  allowPurchasing,
  isPaid,
  isPhotoBookAvailableToOrder,
}: {
  role: EulogiseUserRole
  allowPurchasing: IAllowPurchasingOption | undefined
  isPaid: boolean
  isPhotoBookAvailableToOrder: boolean
}): boolean => {
  if (role === EulogiseUserRole.ADMIN) {
    return true
  }
  if (
    ![
      EulogiseUserRole.CLIENT,
      EulogiseUserRole.CUSTOMER,
      EulogiseUserRole.EDITOR,
    ].includes(role)
  ) {
    return false
  }
  if (!isPaid) {
    return false
  }
  if (role === EulogiseUserRole.CUSTOMER) {
    return true
  }
  if (role === EulogiseUserRole.CLIENT) {
    if (
      isPhotoBookAvailableToOrder &&
      allowPurchasing?.[KEEPSAKES_ALLOWING_PURCHASE_KEY.PHOTO_BOOKS]?.[
        AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
      ]
    ) {
      return true
    }
    if (
      allowPurchasing?.[KEEPSAKES_ALLOWING_PURCHASE_KEY.VIDEO_BOOKS]?.[
        AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
      ]
    ) {
      return true
    }
    return false
  }
  if (role === EulogiseUserRole.EDITOR) {
    if (
      isPhotoBookAvailableToOrder &&
      allowPurchasing?.[KEEPSAKES_ALLOWING_PURCHASE_KEY.PHOTO_BOOKS]?.[
        AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER
      ]
    ) {
      return true
    }
    if (
      allowPurchasing?.[KEEPSAKES_ALLOWING_PURCHASE_KEY.VIDEO_BOOKS]?.[
        AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER
      ]
    ) {
      return true
    }
    return false
  }
  return false
}

const getShouldShowOrderPrintingButton = ({
  role,
  allowPurchasing,
  isPaid,
}: {
  role: EulogiseUserRole
  allowPurchasing: IAllowPurchasingOption | undefined
  isPaid: boolean
}): boolean => {
  if (role === EulogiseUserRole.ADMIN) {
    return true
  }
  if (
    ![
      EulogiseUserRole.CLIENT,
      EulogiseUserRole.CUSTOMER,
      EulogiseUserRole.EDITOR,
    ].includes(role)
  ) {
    return false
  }
  if (!isPaid) {
    return false
  }
  if (role === EulogiseUserRole.CLIENT) {
    return (
      allowPurchasing?.[KEEPSAKES_ALLOWING_PURCHASE_KEY.PRINTING]?.[
        AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
      ] ?? false
    )
  }
  if (role === EulogiseUserRole.EDITOR) {
    return (
      allowPurchasing?.[KEEPSAKES_ALLOWING_PURCHASE_KEY.PRINTING]?.[
        AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER
      ] ?? false
    )
  }
  if (role === EulogiseUserRole.CUSTOMER) {
    return true
  }
  return false
}

const StyledTooltipContainer = styled.div``

const StyledHighlightedCreateNewTributeMenuItem = styled(SiderMenuItem)<{
  $isHighlighted?: boolean
}>`
  ${({ $isHighlighted }) =>
    $isHighlighted ? `background-color: ${COLOR.DARK_BLUE};` : ''}
`

export const CustomerSiderTopMenu = ({
  isClientAdminSider,
  location,
  onChangeThemeClick,
  onViewAllMemorialsClick,
}: {
  isClientAdminSider?: boolean
  location?: WindowLocation
  onChangeThemeClick: () => void
  onViewAllMemorialsClick: () => void
}) => {
  const dispatch = useEulogiseDispatch()
  const screenSize = useBreakpoint()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const { account }: IAuthState = useAuthState()
  const role: EulogiseUserRole = account?.role!
  const [isShowCreateCaseModal, setIsShowCreateCaseModal] =
    useState<boolean>(false)
  const isPhotobookEditorPage = NavigationHelper.isPhotobookPage(
    location?.pathname!,
  )

  const isClientAdmin: boolean = account?.role === EulogiseUserRole.CLIENT
  const isCoEditor: boolean = account?.role === EulogiseUserRole.COEDITOR
  const caseId: string = activeCase?.id!
  const country = activeCase?.country!
  const region = activeCase?.region!
  const isPaid: boolean = activeCase?.status === CaseStatus.PAID

  const isMobile = screenSize === DEVICES.MOBILE

  const { activeItem: activePhotobook } = usePhotobookState()

  const guideWalkThroughContext: IGuideWalkThroughState =
    useGuideWalkThroughState()
  const { guideShowAt, currentStep, shouldCreateNewCaseFlashHighlighted } =
    guideWalkThroughContext

  const userGuideHelperConfig: IUserGuideHelperConfig | undefined =
    account?.userGuideHelperConfig
  const hasViewedClientDashboardPartTwo: boolean =
    userGuideHelperConfig?.hasViewedClientDashboardPartTwo!

  const isAnyProductFetching = useAnyActiveCardProductIsFetching()
  const product = CardProductHelper.getAtWhichProductEditorPage({
    location: location!,
  })
  const slug = CardProductHelper.getGenericCardProductSlugByLocation({
    product,
    location: location!,
  })

  const { activeItem: activeProductItem } = useProductState({ product, slug })
  const { activeItem: activeClient } = useClientState()

  const allowPurchasing: IAllowPurchasingOption | undefined =
    activeClient?.allowPurchasing

  const shouldShowDownloadsButton =
    (!isCoEditor && isPaid) ||
    [EulogiseUserRole.ADMIN, EulogiseUserRole.CLIENT].includes(role)

  const isPhotoBookAvailableToOrder = CheckoutHelper.getIsPhotoBookReadyToOrder(
    { activePhotoBookData: activePhotobook!, country },
  )

  const shouldShowKeepsakesStoreButton = getShouldShowKeepsakeStoreButton({
    role,
    allowPurchasing,
    isPaid,
    isPhotoBookAvailableToOrder,
  })
  const shouldShowOrderPrintingButton = getShouldShowOrderPrintingButton({
    role,
    allowPurchasing,
    isPaid,
  })

  useEffect(() => {
    if (shouldCreateNewCaseFlashHighlighted) {
      setTimeout(() => {
        dispatch(restoreGuideState())
      }, 3000)
    }
  }, [shouldCreateNewCaseFlashHighlighted])

  return (
    <BaseSiderMenu $minHeight={isMobile ? '20%' : '40%'}>
      {isClientAdmin && !isMobile && (
        <>
          {isClientAdminSider && (
            <StyledTooltipContainer key="client-action-tooltip">
              <StyledHighlightedCreateNewTributeMenuItem
                $isSelected={
                  location?.pathname === EulogisePage.CLIENT_ADMIN_CASES
                }
                $isHighlighted={
                  guideShowAt ===
                    GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE &&
                  currentStep === 0
                }
                key="client-create-cases"
                $isFlashHighlighted={shouldCreateNewCaseFlashHighlighted}
                icon={<CreateNewCaseIcon />}
                onClick={() => {
                  setIsShowCreateCaseModal(true)
                }}
              >
                Create New Tribute
              </StyledHighlightedCreateNewTributeMenuItem>
            </StyledTooltipContainer>
          )}
          {isShowCreateCaseModal && (
            <CreateCaseModal
              key="create-case-modal"
              onClose={() => {
                setIsShowCreateCaseModal(false)
                dispatch(fetchCasesWithFullDetails())
              }}
              onCreated={() => {
                if (
                  role === EulogiseUserRole.CLIENT &&
                  !hasViewedClientDashboardPartTwo
                ) {
                  dispatch(
                    showGuide(
                      GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_TWO,
                      0,
                      false,
                    ),
                  )
                }
              }}
            />
          )}
        </>
      )}
      {!isClientAdminSider && (
        <>
          {/* {
            !isMobile && isAtSlideshowTimelineEditor && (
              <Tooltip key="dashboard" placement="right" title="Dashboard">
                <SiderMenuItem
                  key="collapse"
                  icon={<RightIcon />}
                  $isSelected={
                    false
                  }
                  onClick={() => {

                  }}
                >
                  Collapse Menu
                </SiderMenuItem>
              </Tooltip>
            )
          } */}
          {!isMobile && (
            <MemorialHomeSiderMenuItem
              key="memorial-home-sider-menu-item"
              onViewAllMemorialsClick={onViewAllMemorialsClick}
            />
          )}
          <GuidePopover
            key="dashboard-guide-popover"
            placedPage={GUIDE_SHOW_UP_PAGE.DASHBOARD}
            showUpStepIndex={2}
            width={430}
          />
          {!isMobile && !isPhotobookEditorPage && (
            <ChangeThemeSiderMenuItem
              key="change-theme"
              onChangeThemeClick={onChangeThemeClick}
              isHighlighted={
                guideShowAt === GUIDE_SHOW_UP_PAGE.DASHBOARD &&
                currentStep === 2
              }
            />
          )}
          <GuidePopover
            key="dashboard-guide-popover-2"
            placedPage={GUIDE_SHOW_UP_PAGE.DASHBOARD}
            showUpStepIndex={0}
            width={430}
          />
          <Tooltip
            key="add-image-tooltip"
            placement="right"
            title="Upload Pictures"
          >
            <SiderMenuItem
              $isHighlighted={
                guideShowAt === GUIDE_SHOW_UP_PAGE.DASHBOARD &&
                currentStep === 0
              }
              key="upload-pictures"
              icon={<UploadPicturesIcon />}
              onClick={() => {
                dispatch(
                  updateIsFSOverlayPickerOpen({
                    isFilestackOverlayPickerOpen: true,
                    filestackOverlayPickerUploadAssetType: AssetType.IMAGE,
                  }),
                )
              }}
            >
              Upload Pictures
            </SiderMenuItem>
          </Tooltip>
          <Tooltip
            key="view-photos-tooltip"
            placement="right"
            title="Photo Library"
          >
            <SiderMenuItem
              $isHighlighted={
                guideShowAt === GUIDE_SHOW_UP_PAGE.DASHBOARD &&
                currentStep === 0
              }
              $isSelected={new RegExp(EulogisePage.PHOTO_LIBRARY).test(
                location?.pathname,
              )}
              onClick={() => {
                if (product) {
                  dispatch(
                    showUnsavedChangesConfirmModal({
                      editingProduct: product,
                      unsavedProductState: activeProductItem!,
                      page: EulogisePage.PHOTO_LIBRARY,
                      region,
                    }),
                  )
                } else {
                  NavigationHelper.navigate(EulogisePage.PHOTO_LIBRARY)
                }
              }}
              key="photo-library"
              icon={<ImageLibraryIcon />}
            >
              Photo Library
            </SiderMenuItem>
          </Tooltip>
          {!isMobile && (
            <StyledTooltipContainer key="dashboard-tooltip-container-add-contributor">
              <GuidePopover
                key="dashboard-guide-popover-3"
                placedPage={GUIDE_SHOW_UP_PAGE.DASHBOARD}
                showUpStepIndex={1}
                width={430}
              />
              <Tooltip
                placement="right"
                key="invite-contributors-tooltip"
                title="Add Contributors"
              >
                <SiderMenuItem
                  $isHighlighted={
                    guideShowAt === GUIDE_SHOW_UP_PAGE.DASHBOARD &&
                    currentStep === 1
                  }
                  key="invite-family-member"
                  onClick={() =>
                    dispatch(showModalAction(ModalId.INVITE, { caseId }))
                  }
                  icon={<AddContributorIcon />}
                >
                  Add Contributors
                </SiderMenuItem>
              </Tooltip>
            </StyledTooltipContainer>
          )}
          {!isMobile &&
            shouldShowKeepsakesStoreButton &&
            !isAnyProductFetching && (
              <StyledTooltipContainer key="dashboard-tooltip-container--keepsake-store">
                <Tooltip
                  placement="right"
                  key="keepsake-store-tooltips"
                  title="Keepsake Store"
                >
                  <SiderMenuItem
                    key="keepsake-store"
                    onClick={() => {
                      dispatch(restoreCheckoutsState())
                      dispatch(
                        updatePaymentOption(
                          EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
                        ),
                      )
                      NavigationHelper.navigate(
                        EulogisePage.CHECKOUTS_V2_KEEPSAKES,
                      )
                    }}
                    icon={<KeepsakesStoreIcon />}
                    $isSelected={
                      location?.pathname === EulogisePage.CHECKOUTS_V2_KEEPSAKES
                    }
                  >
                    Keepsake Store
                  </SiderMenuItem>
                </Tooltip>
              </StyledTooltipContainer>
            )}
          {!isMobile &&
            shouldShowOrderPrintingButton &&
            !isAnyProductFetching && (
              <StyledTooltipContainer key="dashboard-tooltip-container-order-printing">
                <Tooltip
                  placement="right"
                  key="order-printing-tooltips"
                  title="Order Printing"
                >
                  <SiderMenuItem
                    key="order-printing"
                    onClick={() => {
                      dispatch(restoreCheckoutsState())
                      dispatch(
                        updatePaymentOption(
                          EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
                        ),
                      )
                      NavigationHelper.navigate(
                        EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS,
                      )
                    }}
                    icon={<OrderPrintingIcon />}
                    $isSelected={
                      location?.pathname ===
                      EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS
                    }
                  >
                    Order Printing
                  </SiderMenuItem>
                </Tooltip>
              </StyledTooltipContainer>
            )}
          {!isMobile &&
            shouldShowDownloadsButton &&
            !isAnyProductFetching &&
            isPaid && (
              <StyledTooltipContainer key="dashboard-tooltip-container-download">
                <Tooltip
                  placement="right"
                  key="downloads-tooltips"
                  title="Download Tributes"
                >
                  <SiderMenuItem
                    key="downloads"
                    onClick={() => {
                      if (
                        location?.pathname !==
                        EulogisePage.CHECKOUTS_V2_DOWNLOAD
                      ) {
                        NavigationHelper.navigate(
                          EulogisePage.CHECKOUTS_V2_DOWNLOAD,
                        )
                      }
                    }}
                    icon={<DownloadTributeIcon />}
                    $isSelected={
                      location?.pathname === EulogisePage.CHECKOUTS_V2_DOWNLOAD
                    }
                  >
                    Downloads
                  </SiderMenuItem>
                </Tooltip>
              </StyledTooltipContainer>
            )}
          {isMobile && (
            <StyledTooltipContainer key="dashboard-tooltip-container-logout">
              <Tooltip placement="right" key="logout" title="Logout">
                <SiderMenuItem
                  $isHighlighted={false}
                  key="logout"
                  onClick={() => {
                    dispatch(
                      logout({
                        success: () =>
                          NavigationHelper.navigate(EulogisePage.SIGN_IN),
                      }),
                    )
                  }}
                  icon={<LogOutIcon />}
                >
                  Log Out
                </SiderMenuItem>
              </Tooltip>
            </StyledTooltipContainer>
          )}
        </>
      )}
    </BaseSiderMenu>
  )
}
