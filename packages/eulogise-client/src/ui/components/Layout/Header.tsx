import React, { useEffect, useRef } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import {
  COLOR,
  DEVICES,
  EulogiseEndpoint,
  SCREEN_SIZE,
  STYLE,
  useBreakpoint,
} from '@eulogise/client-core'
import MobileMenuButton from './MobileMenuButton'
import HeaderProfileDropdown from './HeaderProfileDropdown'
import {
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useGenericCardProductTypeByPathname,
  useSlideshowState,
  useSlideshowTitleSlideState,
} from '../../store/hooks'
import { fetchClients } from '../../store/ClientState/actions'
import { ClientLogo } from '../icons/ClientLogo'
import EditorHeaderButtonGroupSlideshow from './EditorHeaderButtonGroupSlideshow'
import EditorHeaderButtonGroupCardProducts from './EditorHeaderButtonGroupCardProducts'
import NonEditorHeaderButtonGroups from './NonEditorHeaderButtonGroups'
import {
  CheckoutHelper,
  DashboardHelper,
  NavigationHelper,
  UrlHelper,
} from '@eulogise/helpers'
import { CardProductHelper } from '@eulogise/helpers'
import CardProductEditorHeader from '../CardProduct/CardProductEditorHeader'
import TimelineHeader from '../../containers/Dashboard/TimelineHeader'
import { showModalAction } from '../../store/ModalState/actions'
import {
  CardProductContentItemType,
  CardProductViewDisplayMode,
  EulogiseCountry,
  EulogisePage,
  EulogiseProduct,
  EulogiseUserRole,
  IAuthState,
  ICardProductRow,
  ICardProductTheme,
  ICardProductViewType,
  ICaseState,
  ISlide,
  ISlideshowData,
  ISlideshowState,
  ModalId,
  SlideType,
} from '@eulogise/core'
import {
  enableTitleSlideAndSaveSlideShow,
  saveSlidesToSlideshowByCaseId,
} from '../../store/SlideshowState/actions'
import { applyThemeToProduct } from '../../store/CardProduct/actions'
import { useDataPullPopulatedData } from '../../hooks/useDataPullPopulatedData'
import { Alert, Button, ButtonType } from '@eulogise/client-components'
import { Link } from '../Link'
import EditorHeaderButtonGroupPhotoLibrary from './EditorHeaderButtonGroupPhotoLibrary'
import DesktopEditorSubHeaderButtonGroupPhotoLibrary from './DesktopEditorSubHeaderButtonGroupPhotoLibrary'
import MobileEditorSubHeaderButtonGroupPhotoLibrary from './MobileEditorSubHeaderButtonGroupPhotoLibrary'
import AdminCreateEditClientHeader from './AdminCreateEditClientHeader'
import PreviewSlideshowHeader from './PreviewSlideshowHeader'
import { ResourceFileStatus } from '@eulogise/core'
import { useIsDebug } from '../../hooks/useIsDebug'
import { updateHeaderHeight } from '../../store/GlobalState/actions'
import CheckoutPackageHeaderButtonGroups from './CheckoutPackageHeaderButtonGroups'
import { EULOGIZE_COUNTRIES_ICON_MAPS } from '../CountryGlobalIcon/CountryGlobalIcon'

const StyledSignUpPageHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`

const StyledEulogiseHeader = styled(Layout.Header)`
  background-color: ${COLOR.PANEL_BACKGROUND_COLOR};
  padding: 0 ${STYLE.GUTTER};
  border-bottom: 1px solid ${COLOR.CORE_PURPLE};
  display: flex;
  align-items: center;
  z-index: 4;
  width: 100%;
`

const LogoIconContainer = styled.div`
  flex: 1;
  text-align: center;
  ${SCREEN_SIZE.TABLET} {
    text-align: left;
  }
`

const StyledHeaderTitleContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  ${SCREEN_SIZE.TABLET} {
    justify-content: normal;
  }
`

const StyledHeader = styled.div<{
  $isMobileScreenSize: boolean
  $isAtPhotoLibrary: boolean
}>`
  ${({ $isMobileScreenSize, $isAtPhotoLibrary }) =>
    $isMobileScreenSize &&
    $isAtPhotoLibrary &&
    `
      height: ${92 + 64 + 12}px;
      position: sticky;
      z-index: 1000;
      top: 0;
`};
`

const StyledSignInButton = styled(Button)`
  margin-top: 3px;
  margin-left: auto;
  ${SCREEN_SIZE.DESKTOP} {
    display: flex;
    margin-left: 20px;
  }
`

const StyledLink = styled(Link)`
  font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};
  position: relative;
  top: -2px;
  ${SCREEN_SIZE.TABLET} {
    top: -1px;
  }
`

const StyledAlert = styled(Alert)`
  margin-bottom: 0;
  margin-top: 0;
`

const StyledMobilePhotoLibraryHeaderContainer = styled.div``

const StyledMobilePhotoLibraryHeaderTextContainer = styled.div`
  text-align: center;
  padding: 8px 0;
`

const StyledMobilePhotoLibraryHeaderText = styled.div`
  padding: 2px 0;
`

const StyledDesktopPhotoLibraryHeaderTextContainer = styled.div`
  margin-bottom: ${STYLE.HALF_GUTTER};
`

const StyledAdminTitle = styled.div`
  margin-left: 12px;
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const StyledPhotoLibaryTitle = styled.div<{
  $isMobile: boolean
}>`
  ${({ $isMobile }) =>
    $isMobile
      ? `margin-left: 16px;
      font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};`
      : `
      margin-left: 32px;
      font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
  `};
`

const StyledEditorHeader = styled.div``

const StyledDashboardHeader = styled(Alert)``

const StyledCheckoutCurrencyContainer = styled.div`
  display: flex;
  padding-right: 8px;
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const StyledCountryIconContainer = styled.div`
  padding-right: 8px;
`

const StyledCountryIcon = styled.img`
  margin-top: -5px;
  height: 20px;
  width: 20px;
`

interface IHeaderProps {
  location: Location
  selectedRow?: ICardProductRow
  pageCursor?: number
  setPageCursor?: (pc: number) => void
  onOverlayOptionClick?: () => void
  setIsShowBorderSettingModal?: (isShowBorderSettingModal: boolean) => void
  setIsShowRemoveCardProductPagesModal?: (
    isShowRemoveCardProductPagesModal: boolean,
  ) => void
  onAddIconAssetClick?: (pageIndex: number) => void
  onAddDividerAssetClick?: (pageIndex: number) => void
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
  viewType?: ICardProductViewType
  onViewTypeChange?: (viewType: ICardProductViewType) => void
}

const Header = ({
  location,
  pageCursor = 0,
  selectedRow,
  setPageCursor,
  setIsShowBorderSettingModal,
  setIsShowRemoveCardProductPagesModal,
  onAddRowClick,
  onOverlayOptionClick,
  onAddIconAssetClick,
  onAddDividerAssetClick,
  setIsShowSpaceAssetModal,
  setUpdateSpacePageIndex,
  setFocusedRowId,
  bookletMagnifierSliderValue,
  onBookletMagnifierSliderChange,
  isLoading,
  viewType,
  onViewTypeChange,
}: IHeaderProps) => {
  const layoutHeaderRef = useRef(null)
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()
  const accountRole: EulogiseUserRole = account?.role!

  const { isDev, applyThemeTo } = UrlHelper.getQueryParams(location.search)
  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE

  const isDebug = useIsDebug()

  const isShowTooSmallScreen = !isDebug && isMobileScreenSize

  const { activeItem: activeSlideshowTitleSlide } =
    useSlideshowTitleSlideState()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId: string = activeCase?.id!
  const deceasedFullName: string = activeCase?.deceased?.fullName!
  const country: EulogiseCountry =
    activeCase?.country || EulogiseCountry.UNITED_STATES

  const slideshowState: ISlideshowState = useSlideshowState()
  const slideshowData: ISlideshowData = slideshowState?.activeItem!
  const slides: Array<ISlide> = slideshowData?.content?.slides

  const populatedData = useDataPullPopulatedData()

  const product = CardProductHelper.getAtWhichProductEditorPage({ location })

  const isAtCardProductEditor = CardProductHelper.getIsAtCardProductEditor({
    location,
  })
  const { genericProductType } = useGenericCardProductTypeByPathname(
    location.pathname,
  )

  const isAtSlideshowTimelineEditor: boolean =
    product === EulogiseProduct.SLIDESHOW

  const pathname = location?.pathname
  const isAtDashboard: boolean = DashboardHelper.isPathnameMatchedPageEndpoint({
    pathname,
    pageEndPoint: EulogiseEndpoint.DASHBOARD,
  })
  const isAtClientDashboard: boolean =
    DashboardHelper.isPathnameMatchedPageEndpoint({
      pathname,
      pageEndPoint: EulogiseEndpoint.CLIENT_DASHBOARD,
    })

  const isAtPhotoLibrary: boolean =
    DashboardHelper.isPathnameMatchedPageEndpoint({
      pathname,
      pageEndPoint: EulogiseEndpoint.PHOTO_LIBRARY,
    })

  const isAtBackgroundImageLibrary: boolean =
    DashboardHelper.isPathnameMatchedPageEndpoint({
      pathname,
      pageEndPoint: EulogiseEndpoint.BACKGROUND_IMAGE_LIBRARY,
    })

  const isAtSlideshowPreviewPage: boolean =
    DashboardHelper.isPathnameMatchedPageEndpoint({
      pathname,
      pageEndPoint: EulogiseEndpoint.EULOGIZE_SLIDESHOW_PREVIEW_PAGE,
    })

  const isShowInviteButton = isAtPhotoLibrary
  const isShowUploadPhotoButton = true
  const isShowSortButton = isAtPhotoLibrary

  const isAtCreateClientPage: boolean =
    DashboardHelper.isPathnameMatchedPageEndpoint({
      pathname,
      pageEndPoint: EulogiseEndpoint.EULOGIZE_ADMIN_CREATE_EDIT_NEW_CLIENT,
    })

  const isContributor = account?.role === EulogiseUserRole.CONTRIBUTOR

  const isAtSignUpPage: boolean = location?.pathname === EulogisePage.SIGN_UP

  const isAtCheckoutPackage: boolean =
    location?.pathname === EulogisePage.CHECKOUTS_V2_PACKAGE

  const shouldShowCurrency: boolean = [
    EulogisePage.CHECKOUTS_V2_PACKAGE,
    EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS,
    EulogisePage.CHECKOUTS_V2_PRINTING_OPTIONS,
    EulogisePage.CHECKOUTS_V2_SHIPPING,
    EulogisePage.CHECKOUTS_V2_PAYMENT,
    EulogisePage.CHECKOUTS_V2_KEEPSAKES,
  ].includes(location?.pathname as EulogisePage)

  const isAdmin = account?.role === EulogiseUserRole.ADMIN

  const isSlideshowGenerated =
    slideshowData?.fileStatus === ResourceFileStatus?.GENERATED

  const saveSlideshow = (onSuccess?: () => void) => {
    dispatch(
      saveSlidesToSlideshowByCaseId({
        caseId,
        slideshowData,
        slides,
        onSuccess,
      }),
    )
  }

  const onTitleSlideButtonClick = (
    type: SlideType.TITLE_SLIDE | SlideType.END_TITLE_SLIDE,
  ) => {
    saveSlideshow(() => {
      const isStartTitleSlideEnabled =
        type === SlideType.TITLE_SLIDE ? true : undefined
      const isEndTitleSlideEnabled =
        type === SlideType.END_TITLE_SLIDE ? true : undefined
      if (activeSlideshowTitleSlide) {
        dispatch(
          enableTitleSlideAndSaveSlideShow({
            slideshowData,
            isStartTitleSlideEnabled,
            isEndTitleSlideEnabled,
            caseId,
            onSuccess: () => {
              NavigationHelper.navigateToProduct({
                product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
                id: activeSlideshowTitleSlide.id!,
                query: { applyThemeTo },
              })
            },
          }),
        )
        return
      }
      dispatch(
        applyThemeToProduct({
          product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
          activeCase: activeCase!,
          themeId: slideshowData.content.theme,
          isPopulatingData: true,
          populatedData,
          onSuccess: (id: string) => {
            dispatch(
              enableTitleSlideAndSaveSlideShow({
                slideshowData,
                isStartTitleSlideEnabled,
                isEndTitleSlideEnabled,
                caseId,
                onSuccess: () => {
                  NavigationHelper.navigateToProduct({
                    product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
                    id,
                  })
                },
              }),
            )
          },
        }),
      )
    })
  }

  const renderCheckoutCurrency = ({
    country,
  }: {
    country: EulogiseCountry
  }) => {
    if (!country) {
      return null
    }

    const countryISOCode = CheckoutHelper.getCurrencyISOCodeByCountry({
      country,
    })

    const countryIcon = EULOGIZE_COUNTRIES_ICON_MAPS?.[country]

    return (
      <StyledCheckoutCurrencyContainer>
        <StyledCountryIconContainer>
          {countryIcon && <StyledCountryIcon src={countryIcon} />}
        </StyledCountryIconContainer>
        ${countryISOCode}
      </StyledCheckoutCurrencyContainer>
    )
  }

  useEffect(() => {
    if (
      account?.role === EulogiseUserRole.CLIENT ||
      account?.role === EulogiseUserRole.COEDITOR ||
      account?.role === EulogiseUserRole.EDITOR
    ) {
      dispatch(fetchClients())
    }
    if (layoutHeaderRef) {
      dispatch(
        updateHeaderHeight({ height: layoutHeaderRef.current?.clientHeight }),
      )
    }
  }, [])

  const renderEditorButtonGroup = () => {
    return (
      <StyledEditorHeader>
        <CardProductEditorHeader
          location={location}
          pageCursor={pageCursor}
          displayMode={CardProductViewDisplayMode.EDIT}
          onAddIconAssetClick={onAddIconAssetClick}
          onAddDividerAssetClick={onAddDividerAssetClick}
          onOverlayOptionClick={onOverlayOptionClick}
          selectedRow={selectedRow}
          setPageCursor={setPageCursor}
          setIsShowBorderSettingModal={setIsShowBorderSettingModal}
          setIsShowRemoveCardProductPagesModal={
            setIsShowRemoveCardProductPagesModal
          }
          onAddRowClick={onAddRowClick}
          setIsShowSpaceAssetModal={setIsShowSpaceAssetModal}
          setUpdateSpacePageIndex={setUpdateSpacePageIndex}
          setFocusedRowId={setFocusedRowId}
          onBookletMagnifierSliderChange={onBookletMagnifierSliderChange}
          bookletMagnifierSliderValue={bookletMagnifierSliderValue}
          viewType={viewType}
          onViewTypeChange={onViewTypeChange}
        />
      </StyledEditorHeader>
    )
  }

  const renderTimelineButtonGroup = () => {
    return (
      <StyledEditorHeader>
        <TimelineHeader
          isDev={isDev}
          onMusicSettingsClick={() =>
            dispatch(showModalAction(ModalId.AUDIO_SETTINGS))
          }
          onOpenStartEditTitleSlideClick={() => {
            onTitleSlideButtonClick(SlideType.TITLE_SLIDE)
          }}
        />
      </StyledEditorHeader>
    )
  }

  const renderDashboardEditingHeader = () => {
    if (accountRole !== EulogiseUserRole.CONTRIBUTOR) {
      return (
        <StyledDashboardHeader
          noBorderRightRadius
          noMargin
          lineHeight={'2.2rem'}
        >
          {`Create, edit and manage your memorials for ${deceasedFullName} here`}
        </StyledDashboardHeader>
      )
    }
    return null
  }

  const renderPhotoLibraryHeader = ({
    text,
    suffixText,
  }: {
    text: string | null
    suffixText?: string | null
  }) => {
    if (isMobileScreenSize) {
      return (
        <StyledMobilePhotoLibraryHeaderContainer>
          {text && suffixText && (
            <StyledMobilePhotoLibraryHeaderTextContainer>
              <StyledMobilePhotoLibraryHeaderText>
                {text}
              </StyledMobilePhotoLibraryHeaderText>
              {suffixText && (
                <StyledMobilePhotoLibraryHeaderText>
                  {suffixText}
                </StyledMobilePhotoLibraryHeaderText>
              )}
            </StyledMobilePhotoLibraryHeaderTextContainer>
          )}

          <MobileEditorSubHeaderButtonGroupPhotoLibrary
            location={location}
            isShowInviteButton={isShowInviteButton}
            isShowSortButton={isShowSortButton}
            isShowUploadPhotoButton={isShowUploadPhotoButton}
          />
        </StyledMobilePhotoLibraryHeaderContainer>
      )
    }

    return (
      <>
        {suffixText && text && (
          <StyledAlert
            justifyContent="space-between"
            flex
            noBorderRightRadius
            lineHeight={'2.2rem'}
            padding={'10px 32px 0 32px'}
          >
            <StyledDesktopPhotoLibraryHeaderTextContainer>
              {suffixText ? `${text} ${suffixText}` : text}
            </StyledDesktopPhotoLibraryHeaderTextContainer>
          </StyledAlert>
        )}

        <DesktopEditorSubHeaderButtonGroupPhotoLibrary
          location={location}
          isShowInviteButton={isShowInviteButton}
          isShowSortButton={isShowSortButton}
          isShowUploadPhotoButton={isShowUploadPhotoButton}
        />
      </>
    )
  }

  const renderEulogiseHeader = () => {
    return (
      <StyledEulogiseHeader>
        {!isContributor && <MobileMenuButton />}

        <LogoIconContainer>
          <StyledHeaderTitleContainer>
            {!isMobileScreenSize && <ClientLogo noMarginLeft={false} />}
            {isAdmin && <StyledAdminTitle>Admin WildPalms</StyledAdminTitle>}
            {isAtPhotoLibrary && (
              <StyledPhotoLibaryTitle $isMobile={isMobileScreenSize}>
                {deceasedFullName} {isMobileScreenSize ? `` : 'Photo Library'}
              </StyledPhotoLibaryTitle>
            )}
            {isAtSignUpPage && (
              <StyledSignUpPageHeaderContainer>
                <StyledSignInButton
                  className="signup-form-sign-in-button"
                  buttonType={ButtonType.PRIMARY}
                  noMarginRight
                >
                  <StyledLink
                    to={EulogisePage.SIGN_IN}
                    className={'sign-in-link'}
                  >
                    Sign in here
                  </StyledLink>
                </StyledSignInButton>
              </StyledSignUpPageHeaderContainer>
            )}
          </StyledHeaderTitleContainer>
        </LogoIconContainer>

        {isAtPhotoLibrary && (
          <EditorHeaderButtonGroupPhotoLibrary location={location} />
        )}

        {isAtCardProductEditor && (
          <EditorHeaderButtonGroupCardProducts
            location={location}
            pageCursor={pageCursor}
            genericProductType={genericProductType}
            displayMode={CardProductViewDisplayMode.EDIT}
            editorViewType={viewType}
          />
        )}

        {isAtSlideshowPreviewPage && (
          <PreviewSlideshowHeader
            onClose={() => NavigationHelper.navigate(EulogisePage.DASHBOARD)}
            isSlideshowGenerated={isSlideshowGenerated}
            slideshowId={slideshowData?.id}
          />
        )}

        {!isContributor && isAtSlideshowTimelineEditor && (
          <EditorHeaderButtonGroupSlideshow location={location} />
        )}

        {isAtCheckoutPackage && (
          <CheckoutPackageHeaderButtonGroups location={location} />
        )}

        {!isContributor && (isAtDashboard || isAtClientDashboard) && (
          <NonEditorHeaderButtonGroups location={location} />
        )}
        {isAdmin && isAtCreateClientPage && (
          <AdminCreateEditClientHeader location={location} />
        )}
        {shouldShowCurrency && renderCheckoutCurrency({ country })}
        {!isMobileScreenSize &&
          account &&
          !isContributor &&
          !isAtSlideshowPreviewPage && (
            <HeaderProfileDropdown location={location} />
          )}
      </StyledEulogiseHeader>
    )
  }

  return (
    <StyledHeader
      id="layout-header"
      ref={layoutHeaderRef}
      $isMobileScreenSize={isMobileScreenSize}
      isAtPhotoLibrary={isAtPhotoLibrary}
    >
      {renderEulogiseHeader()}
      {!isLoading && isAtCardProductEditor && renderEditorButtonGroup()}
      {!isLoading &&
        !isContributor &&
        isAtSlideshowTimelineEditor &&
        !isShowTooSmallScreen &&
        renderTimelineButtonGroup()}
      {!isLoading && isAtDashboard && renderDashboardEditingHeader()}
      {!isLoading &&
        isAtPhotoLibrary &&
        renderPhotoLibraryHeader({
          text: null,
          suffixText: null,
        })}
      {!isLoading &&
        isAtBackgroundImageLibrary &&
        renderPhotoLibraryHeader({
          text: 'Select or upload image for background',
        })}
    </StyledHeader>
  )
}

export default Header
