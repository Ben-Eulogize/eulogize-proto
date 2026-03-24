import React, { useEffect } from 'react'
import styled from 'styled-components'
import { WindowLocation } from '@reach/router'
import { Helmet } from 'react-helmet'
import { Layout as AntLayout } from 'antd'
import 'antd/dist/antd.less'
import './layout.css'
import './layout.less'
import 'draft-js/dist/Draft.css'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import Sider from './Sider/Sider'
import {
  EulogiseClientConfig,
  EulogiseFilestackEndpoint,
} from '@eulogise/client-core'
import useDevelopment from '../../hooks/useDevelopment'
import MobileSider from './Sider/MobileSider'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'
import ThemeSelectionDrawer from '../../containers/ThemeSelectionDrawer/ThemeSelectionDrawer'
import GlobalModalManager from '../../containers/GlobalModalManager/GlobalModalManager'
import ChangeBackgroundDrawer from '../../containers/ChangeBackgroundDrawer/ChangeBackgroundDrawer'
import {
  useAssetState,
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useCheckoutsState,
  useIsOpenDrawer,
} from '../../store/hooks'
import {
  CardProductContentItemType,
  EulogiseProduct,
  EulogiseUserRole,
  ICardProductRow,
  ICardProductTheme,
  ICardProductViewType,
  ICaseState,
  ModalId,
  ICheckoutsState,
  EulogiseCardProducts,
  IPrintingDetails,
  EulogiseCountry,
  EulogisePage,
  DrawerId,
} from '@eulogise/core'
import { showModalAction } from '../../store/ModalState/actions'
import {
  updateIsPrintingOptionDrawerOpen,
  updateIsReviewDesignDrawerOpened,
  updatePrintingDetails,
  updateIsKeepsakesDrawerOpened,
} from '../../store/CheckoutsState/action'
import { NewBackgroundDrawer } from '../../containers/NewBackgroundDrawer/NewBackgroundDrawer'
import { DeleteBackgroundDrawer } from '../../containers/DeleteBackgroundDrawer/DeleteBackgroundDrawer'
import { ThemeProvider } from '../providers/ThemeProvider'
import { useBrainFish } from '../../hooks/useBrainFish'
import { usePendo } from '../../hooks/usePendo'
import FSPickerImageOverlay from '../FSPickerImageOverlay/FSPickerImageOverlay'
import { useRedirectNoPermissionPageByRole } from '../../hooks/useRedirectNoPermissionPageByRole'
import PrintingOptionDrawer from '../Checkoutv2/PrintingOptionDrawer'
import VideoBookDrawer from '../Checkoutv2/VideoBookDrawer'
import PhotobookDrawer from '../Checkoutv2/PhotobookDrawer'
import { NavigationHelper, UrlHelper } from '@eulogise/helpers'
import { setActiveCaseByCaseId } from '../../store/CaseState/actions'
import { useWebSocket } from '../providers/WebsocketProvider'
import { ShareTributeDrawer } from '../Drawer/ShareTributeDrawer'
import { fetchInvitesByCaseId } from '../../store/InviteState/actions'
import { fetchSharesByCaseId } from '../../store/ShareState/actions'
import { fetchCustomerInfo } from '../../store/CustomerInfoState'

interface ILayoutProps {
  children: React.ReactNode
  title: string
  selectedRow?: ICardProductRow
  showSider?: boolean
  className?: string
  location: WindowLocation
  noRedirect?: boolean
  noPadding?: boolean
  isClientAdminSider?: boolean
  pageCursor?: number
  onOverlayOptionClick?: () => void
  onAddIconAssetClick?: (pageIndex: number) => void
  onAddDividerAssetClick?: (pageIndex: number) => void
  setPageCursor?: (pc: number) => void
  setIsShowBorderSettingModal?: (isShowBorderSettingModal: boolean) => void
  setIsShowRemoveCardProductPagesModal?: (
    isShowRemoveCardProductPagesModal: boolean,
  ) => void
  onAddRowClick?: ({
    product,
    slug,
    type,
    productTheme,
    options,
    pageIndex,
  }: {
    product: EulogiseProduct
    slug?: string
    type: CardProductContentItemType
    productTheme: ICardProductTheme
    options: any
    pageIndex: number
  }) => void
  setIsShowSpaceAssetModal?: (isShowSpaceAssetModal: boolean) => void
  setUpdateSpacePageIndex?: (updateSpacePageIndex: number | null) => void
  setFocusedRowId?: (
    rowId: string | undefined,
    autoSelectFirstContentId?: boolean,
    pageIndex?: number,
  ) => void
  bookletMagnifierSliderValue?: number
  onBookletMagnifierSliderChange?: (value: number) => void
  isLoading?: boolean
  shouldHideFooter?: boolean
  shouldHideHeader?: boolean
  viewType?: ICardProductViewType
  onViewTypeChange?: (viewType: ICardProductViewType) => void
}

// @ts-ignore
const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`

// @ts-ignore
// const MainContent = styled(AntLayout)`
//   margin-top: ${STYLE.HEADER_HEIGHT};
// `

const MainContentContainer = styled(AntLayout)`
  margin-top: 0;
`

const MainContent = styled.div`
  display: flex;
  width: 100%;
`

const Layout = ({
  children,
  title,
  selectedRow,
  showSider = true,
  className,
  isClientAdminSider,
  location,
  noRedirect = false,
  noPadding = false,
  pageCursor = 0,
  onOverlayOptionClick,
  onAddIconAssetClick,
  onAddDividerAssetClick,
  setPageCursor = (...arg) =>
    console.log('setPageCursor is undefined, with parameter', ...arg),
  setIsShowBorderSettingModal = (isShowBorderSettingModal) =>
    console.log('setIsShowBorderSettingModal', isShowBorderSettingModal),
  setIsShowRemoveCardProductPagesModal = (isShowRemoveCardProductPagesModal) =>
    console.log(
      'isShowRemoveCardProductPagesModal',
      isShowRemoveCardProductPagesModal,
    ),
  onAddRowClick,
  setIsShowSpaceAssetModal,
  setUpdateSpacePageIndex,
  setFocusedRowId,
  bookletMagnifierSliderValue,
  onBookletMagnifierSliderChange,
  isLoading,
  shouldHideFooter = false,
  shouldHideHeader = false,
  viewType,
  onViewTypeChange,
}: ILayoutProps) => {
  useDevelopment()
  useBrainFish()
  usePendo()

  const { account } = useAuthState()
  const userRole = account?.role

  useRedirectNoPermissionPageByRole({
    role: userRole,
    pathname: location.pathname,
  })

  const { images } = useAssetState()
  const { activeItem }: ICaseState = useCaseState()
  const isOpenPhotobookDrawer: boolean = useIsOpenDrawer(
    DrawerId.PHOTOBOOK_DRAWER,
  )
  const caseId = activeItem?.id
  const country: EulogiseCountry = activeItem?.country!
  const dispatch = useEulogiseDispatch()
  const { connectionStatus } = useWebSocket()
  const isOpenShareTributeDrawer: boolean = useIsOpenDrawer(
    DrawerId.SHARE_TRIBUTE_DRAWER,
  )
  console.log('Layout connectionStatus:', connectionStatus)

  const {
    isPrintingOptionDrawerOpened,
    printingOptionDrawerActiveProduct,
    printingDetails,
    isKeepsakesDrawerOpened,
  }: ICheckoutsState = useCheckoutsState()
  if (!noRedirect) {
    useAuthRedirect(location)
  }

  useEffect(() => {
    const showProductDownload =
      UrlHelper.getQueryParam('showProductDownload', location.search) ||
      window.localStorage.getItem('showProductDownload')

    if (showProductDownload && showProductDownload?.length! > 0) {
      dispatch(
        setActiveCaseByCaseId({
          caseId: showProductDownload,
          success: () => {
            NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_DOWNLOAD)
          },
        }),
      )
      window.localStorage.removeItem('showProductDownload')
    }
  }, [])

  useEffect(() => {
    if (
      userRole === EulogiseUserRole.CLIENT ||
      userRole === EulogiseUserRole.EDITOR ||
      userRole === EulogiseUserRole.COEDITOR
    ) {
      if (!account?.acceptTerms) {
        dispatch(showModalAction(ModalId.FINALISE_SIGNUP))
      }
    }
  }, [userRole])

  useEffect(() => {
    if (!noRedirect && caseId) {
      const customerId = activeItem.customer
      if (typeof customerId === 'string') {
        dispatch(fetchCustomerInfo({ userId: customerId }))
      }
      dispatch(fetchInvitesByCaseId({ caseId }))
      dispatch(fetchSharesByCaseId({ caseId }))
    }
  }, [caseId, noRedirect])

  useEffect(() => {
    if (
      localStorage.getItem('system-upgrade-notification-dismissed') === 'true'
    )
      return

    if (!images || images.length === 0) return

    const CUTOFF_DATE = new Date('2026-01-16T00:00:00Z')
    const hasOldImages = images.some((img) => {
      if (!img.createdAt) return false
      return new Date(img.createdAt) < CUTOFF_DATE
    })

    if (hasOldImages) {
      dispatch(showModalAction(ModalId.SYSTEM_UPGRADE_NOTIFICATION))
    }
  }, [images])

  const appName = EulogiseClientConfig.APP_NAME

  return (
    <ThemeProvider>
      <StyledLayout>
        <Helmet>
          <title>{title ? `${title} - ${appName}` : appName}</title>
          <link
            href={EulogiseFilestackEndpoint.FILESTACK_UMD_URL}
            rel="stylesheet"
          />
        </Helmet>
        {!shouldHideHeader && (
          <Header
            location={location}
            pageCursor={pageCursor}
            onAddIconAssetClick={onAddIconAssetClick}
            onAddDividerAssetClick={onAddDividerAssetClick}
            onOverlayOptionClick={onOverlayOptionClick}
            setPageCursor={(pc) => setPageCursor(pc)}
            setIsShowBorderSettingModal={(isShowBorderSettingModal) =>
              setIsShowBorderSettingModal(isShowBorderSettingModal)
            }
            setIsShowRemoveCardProductPagesModal={(
              isShowRemoveCardProductPagesModal,
            ) =>
              setIsShowRemoveCardProductPagesModal(
                isShowRemoveCardProductPagesModal,
              )
            }
            onAddRowClick={onAddRowClick}
            setIsShowSpaceAssetModal={setIsShowSpaceAssetModal}
            setUpdateSpacePageIndex={setUpdateSpacePageIndex}
            setFocusedRowId={setFocusedRowId}
            onBookletMagnifierSliderChange={onBookletMagnifierSliderChange}
            bookletMagnifierSliderValue={bookletMagnifierSliderValue}
            isLoading={isLoading}
            viewType={viewType}
            onViewTypeChange={onViewTypeChange}
            selectedRow={selectedRow}
          />
        )}
        <MainContentContainer>
          <ThemeSelectionDrawer />
          <NewBackgroundDrawer />
          <DeleteBackgroundDrawer />
          {isOpenShareTributeDrawer && <ShareTributeDrawer />}
          <ChangeBackgroundDrawer location={location} />
          <PrintingOptionDrawer
            open={isPrintingOptionDrawerOpened}
            onClose={({ product }: { product: EulogiseCardProducts }) => {
              const updatedPrintingDetails: IPrintingDetails = {
                ...printingDetails,
                orderedProductsDetails: {
                  ...printingDetails.orderedProductsDetails,
                  [product]: {
                    ...printingDetails.orderedProductsDetails[product],
                    isProductOrderedForPrinting: false,
                    paperType: null,
                    copiesAmount: 0,
                  },
                },
              }
              dispatch(updatePrintingDetails(updatedPrintingDetails))
              dispatch(
                updateIsPrintingOptionDrawerOpen({
                  isPrintingOptionDrawerOpened: false,
                  printingOptionDrawerActiveProduct: null,
                }),
              )
              dispatch(
                updateIsReviewDesignDrawerOpened({
                  isReviewDesignDrawerOpened: false,
                  reviewDesignDrawerActiveProduct: null,
                }),
              )
            }}
            country={country}
            product={printingOptionDrawerActiveProduct}
          />
          <VideoBookDrawer
            open={isKeepsakesDrawerOpened}
            onDrawerClose={() => {
              dispatch(
                updateIsKeepsakesDrawerOpened({
                  isKeepsakesDrawerOpened: false,
                  keepsakesDrawerActiveProduct: null,
                }),
              )
            }}
            country={country}
          />
          {isOpenPhotobookDrawer && <PhotobookDrawer country={country} />}
          <MainContent id="main-content">
            {showSider && (
              <Sider
                id="main-sider"
                location={location}
                isClientAdminSider={isClientAdminSider}
              />
            )}
            {showSider && (
              <MobileSider
                location={location}
                isClientAdminSider={isClientAdminSider}
              />
            )}
            <Content noPadding={noPadding} className={className}>
              {children}
            </Content>
          </MainContent>
        </MainContentContainer>
        {!shouldHideFooter && <Footer />}
        <GlobalModalManager />
      </StyledLayout>
      <FSPickerImageOverlay
        caseId={caseId}
        locationPathname={location.pathname}
      />
    </ThemeProvider>
  )
}

export default Layout
