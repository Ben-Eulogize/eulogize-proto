import {
  DrawerId,
  EulogiseProduct,
  EulogiseUserRole,
  IAdminState,
  IAllActiveCardProducts,
  IAllActiveCardProductStates,
  IAllProductStates,
  IAuthState,
  IBackgroundImageState,
  ICardProductState,
  ICaseState,
  ICheckoutsState,
  IClientState,
  IConnection,
  IConnectionState,
  IDrawerState,
  IEulogiseState,
  IGenericCardProductTypeData,
  IGenericCardProductTypeState,
  IGuideWalkThroughState,
  IInvite,
  IInviteState,
  IInvoiceState,
  IMobileMenuState,
  IModalState,
  IShareState,
  ISiderMenuState,
  ISlideshowState,
  ITheme,
  IThemeState,
  IUserSettingsState,
  NO_REPLY_EULOGISE_EMAIL,
  ResourceFileStatus,
} from '@eulogise/core'
import { MobileMenuInitialState } from './MobileMenuState/reducer'
import { SidedCardInitialState } from './SidedCardState/reducer'
import { ModalInitialState } from './ModalState/reducer'
import { DrawerInitialState } from './DrawerState/reducer'
import { CaseInitialState } from './CaseState/reducer'
import { CustomerInfoInitialState } from './CustomerInfoState/reducer'
import { BookmarkInitialState } from './BookmarkState/reducer'
import { BookletInitialState } from './BookletState/reducer'
import { AuthInitialState } from './AuthState/reducer'
import { AssetInitialState } from './AssetState/reducer'
import { ThankYouCardInitialState } from './ThankYouCardState/reducer'
import { AdminInitialState } from './AdminState/reducer'
import { InviteInitialState } from './InviteState/reducer'
import { ClientInitialState } from './ClientState/reducer'
import { ConnectionInitialState } from './ConnectionState/reducer'
import { InvoiceInitialState } from './InvoiceState/reducer'
import { ShareInitialState } from './ShareState/reducer'
import { AccountHelper } from '@eulogise/helpers'
import { SlideshowInitialState } from './SlideshowState/initialState'
import { GuideWalkThroughInitialState } from './GuideWalkThroughState/reducer'
import { TvWelcomeScreenInitialState } from './TvWelcomeScreenState/reducer'
import { CheckoutsInitialState } from './CheckoutsState/reducer'
import { ThemeInitialState } from './ThemeState/reducer'
import { SiderMenuInitialState } from './SiderMenuState/reducer'
import { BackgroundImageInitialState } from './BackgroundImageState/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { PhotobookInitialState } from './PhotobookState/reducer'
import { CardProductHelper } from '@eulogise/helpers'
import { baseCardProductInitialState } from './CardProduct/baseCardProductReducer'
import { GenericCardProductTypeInitialState } from './GenericCardProductTypeState'
import { useEffect, useMemo } from 'react'
import { fetchThemesAction } from './ThemeState/actions'
import { fetchGenericCardProductTypes } from './GenericCardProductTypeState/actions'

export const useEulogiseDispatch = useDispatch

export const useAssetState = () =>
  useSelector((state: IEulogiseState) => state.assets || AssetInitialState)

export const useAuthState: () => IAuthState = () =>
  useSelector((state: IEulogiseState) => state.auth || AuthInitialState)

export const useUserSettingsState: () => IUserSettingsState = () =>
  useSelector((state: IEulogiseState) => state.userSettings)

export const useUserRole: () => EulogiseUserRole | null = () => {
  const { account }: IAuthState = useAuthState()
  const userRole: EulogiseUserRole = account?.role!
  if (!account) {
    return null
  }
  return userRole
}

export const useClientState: () => IClientState = () =>
  useSelector((state: IEulogiseState) => state.client || ClientInitialState)

export const useConnectionState: () => IConnectionState = () =>
  useSelector(
    (state: IEulogiseState) => state.connections || ConnectionInitialState,
  )

export const useGetAllConnections: () => Array<IConnection> = () => {
  const { items } = useConnectionState()

  return items.filter(Boolean)
}

export const useGetNonAdminConnections: () => Array<IConnection> = () => {
  const connections = useGetAllConnections()

  return connections.filter((c) => c.user?.role !== EulogiseUserRole.ADMIN)
}

export const useBookletState: () => ICardProductState = () =>
  useSelector((state: IEulogiseState) => state.booklets || BookletInitialState)

export const useAllActiveCardProductsState: () => IAllActiveCardProductStates =
  (): IAllActiveCardProductStates => {
    const eulogiseState = useSelector((root: IEulogiseState) => root)
    return {
      [EulogiseProduct.BOOKLET]: eulogiseState.booklets,
      [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]:
        eulogiseState.slideshowTitleSlides,
      [EulogiseProduct.SIDED_CARD]: eulogiseState.sidedCards,
      [EulogiseProduct.THANK_YOU_CARD]: eulogiseState.thankYouCards,
      [EulogiseProduct.BOOKMARK]: eulogiseState.bookmarks,
      [EulogiseProduct.TV_WELCOME_SCREEN]: eulogiseState.tvWelcomeScreens,
      [EulogiseProduct.PHOTOBOOK]: eulogiseState.photobooks,
      ...(eulogiseState.genericCardProducts?.productsState ?? {}),
    }
  }

export const useAllActiveCardProducts: (
  products: Array<EulogiseProduct | string>,
) => IAllActiveCardProducts = (products: Array<EulogiseProduct | string>) => {
  // Use a single selector to avoid calling hooks in a loop (which violates React rules of hooks)
  const allProductsState = useAllProductsState()

  const results: IAllActiveCardProducts = {}
  products.forEach((productOrSlug: EulogiseProduct | string) => {
    // @ts-ignore
    results[productOrSlug] = allProductsState[productOrSlug]?.activeItem ?? null
  })
  return results
}

export const useAllProductsState = (): IAllProductStates => {
  // Use a single selector to avoid calling hooks in a loop (which violates React rules of hooks)
  return useSelector((state: IEulogiseState) => {
    const results: IAllProductStates = {
      [EulogiseProduct.BOOKLET]: state.booklets || BookletInitialState,
      [EulogiseProduct.SLIDESHOW]: state.slideshows || SlideshowInitialState,
      [EulogiseProduct.SIDED_CARD]: state.sidedCards || SidedCardInitialState,
      [EulogiseProduct.BOOKMARK]: state.bookmarks || BookmarkInitialState,
      [EulogiseProduct.THANK_YOU_CARD]:
        state.thankYouCards || ThankYouCardInitialState,
      [EulogiseProduct.TV_WELCOME_SCREEN]:
        state.tvWelcomeScreens || TvWelcomeScreenInitialState,
      [EulogiseProduct.PHOTOBOOK]: state.photobooks || PhotobookInitialState,
      [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]:
        state.slideshowTitleSlides || TvWelcomeScreenInitialState,
    }

    // Add generic card products from productsState
    const genericProductsState = state.genericCardProducts?.productsState ?? {}
    for (const [slug, productState] of Object.entries(genericProductsState)) {
      results[slug] = productState || baseCardProductInitialState
    }

    return results
  })
}

export const useAllGeneratedProducts = () => {
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const results = useAllProductsState()
  return AccountHelper.getAllProducts({
    genericProductTypes,
  }).filter((productOrSlug: EulogiseProduct | string) => {
    // @ts-ignore
    const activeItem = results[productOrSlug]?.activeItem
    if (!activeItem) {
      return false
    }
    return activeItem.fileStatus === ResourceFileStatus.GENERATED
  })
}

export const useAnyActiveCardProductIsFetching = () => {
  const allActiveCardProducts = useAllActiveCardProductsState()
  return Object.values(allActiveCardProducts).some(
    (product) => product?.isFetching || product === null,
  )
}

export const useGenericCardProductTypeBySlug = (
  slug: string | undefined,
): IGenericCardProductTypeData | undefined => {
  const genericCardProductTypesState = useAllGenericCardProductTypes()
  return useSelector((state: IEulogiseState) =>
    genericCardProductTypesState?.items?.find((item) => item.slug === slug),
  )
}

export const useGenericCardProductTypeByPathname = (
  pathname: string,
): {
  genericProductType: IGenericCardProductTypeData | undefined
  slug?: string
} => {
  const slug = CardProductHelper.getGenericCardProductSlugByPathname({
    pathname,
  })
  const genericProductType = useGenericCardProductTypeBySlug(slug)
  return { genericProductType, slug }
}

export const useProductState: ({
  product,
  slug,
}: {
  product: EulogiseProduct
  slug?: string
}) => ICardProductState | ISlideshowState = ({
  product,
  slug,
}: {
  product: EulogiseProduct
  slug?: string
}) => {
  switch (product) {
    case EulogiseProduct.BOOKLET: {
      return useBookletState()
    }
    case EulogiseProduct.SIDED_CARD: {
      return useSidedCardState()
    }
    case EulogiseProduct.BOOKMARK: {
      return useBookmarkState()
    }
    case EulogiseProduct.THANK_YOU_CARD: {
      return useThankYouCardState()
    }
    case EulogiseProduct.SLIDESHOW: {
      return useSlideshowState()
    }
    case EulogiseProduct.TV_WELCOME_SCREEN: {
      return useTvWelcomeScreenState()
    }
    case EulogiseProduct.SLIDESHOW_TITLE_SLIDE: {
      return useSlideshowTitleSlideState()
    }
    case EulogiseProduct.PHOTOBOOK: {
      return usePhotobookState()
    }
    case EulogiseProduct.GENERIC_CARD_PRODUCT: {
      if (!slug) {
        throw new Error(
          `useProductState: Generic Card Product - slug not found`,
        )
      }
      return useGenericCardProductState({ slug })
    }
    default: {
      return useBookletState()
    }
  }
}

export const useBookmarkState: () => ICardProductState = () =>
  useSelector(
    (state: IEulogiseState) => state.bookmarks || BookmarkInitialState,
  )

export const useCaseState: () => ICaseState = () =>
  useSelector((state: IEulogiseState) => state.cases || CaseInitialState)

export const useCustomerInfoState = () =>
  useSelector(
    (state: IEulogiseState) => state.customerInfo || CustomerInfoInitialState,
  )

export const useAvailableEulogiseProducts: () => Array<EulogiseProduct> =
  () => {
    const { activeItem: activeCase } = useCaseState()
    const { items: genericProductTypes } = useAllGenericCardProductTypes()
    return AccountHelper.getAllAvailableProducts({
      activeCase: activeCase!,
      genericProductTypes,
    }) as Array<EulogiseProduct>
  }

export const useAvailableEulogiseProductsByTheme: (
  theme: ITheme,
) => Array<EulogiseProduct> = (theme: ITheme) => {
  const { activeItem: activeCase } = useCaseState()
  return AccountHelper.getAllAvailableProductsByTheme({
    activeCase: activeCase!,
    theme,
  })
}

export const useAvailableEulogiseCardProducts = (): Array<EulogiseProduct> => {
  const { activeItem: activeCase } = useCaseState()
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  return AccountHelper.getAvailableCardProducts({
    activeCase: activeCase!,
    genericProductTypes,
  }) as Array<EulogiseProduct>
}

export const useAllGenericCardProductTypes =
  (): IGenericCardProductTypeState => {
    const dispatch = useDispatch()
    const state = useSelector(
      (state: IEulogiseState) =>
        state.genericCardProductTypes ?? GenericCardProductTypeInitialState,
    )
    const { activeItem: activeCase } = useCaseState()
    const isDirectUserCase = activeCase && !activeCase.client

    useEffect(() => {
      if (!state.isFetched && !state.isFetching) {
        dispatch(fetchGenericCardProductTypes())
      }
    }, [state.isFetched, state.isFetching, dispatch])

    // FEAT_GENERIC_PRODUCT_TYPE
    const filteredItems: any[] = [] /*useMemo(() => {
      if (!isDirectUserCase) return state.items
      return state.items.filter(
        (type) => type.availability?.directUsers?.available === true,
      )
    }, [state.items, isDirectUserCase])*/

    return {
      ...state,
      items: filteredItems,
    }
  }

export const useAvailableEulogiseCardProductsByTheme: (
  theme: ITheme,
) => Array<EulogiseProduct | string> = (theme: ITheme) => {
  const { activeItem: activeCase } = useCaseState()
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  return [
    ...AccountHelper.getAvailableCardProductsByTheme({
      theme,
      activeCase: activeCase!,
    }),
    ...(genericProductTypes?.map((type) => type.slug) ?? []),
  ]
}

export const useInviteState: () => IInviteState = () =>
  useSelector((state: IEulogiseState) => state.invites || InviteInitialState)

export const useShareState: () => IShareState = () =>
  useSelector((state: IEulogiseState) => state.shares || ShareInitialState)

export const useGetCollaborators: () => Array<IInvite> = () => {
  const { items: collaborators }: IInviteState = useInviteState()
  return collaborators.filter((i) => i.email !== NO_REPLY_EULOGISE_EMAIL)
}

export const useInvoiceState: () => IInvoiceState = () =>
  useSelector((state: IEulogiseState) => state.invoices || InvoiceInitialState)

export const useDrawerState: () => IDrawerState = () =>
  useSelector((state: IEulogiseState) => state.drawers || DrawerInitialState)

export const useModalState: () => IModalState = () =>
  useSelector((state: IEulogiseState) => state.modals || ModalInitialState)

export const useIsOpenDrawer: (drawerId: DrawerId) => boolean = (
  drawerId: DrawerId,
) => {
  const drawerState = useDrawerState()
  return drawerState?.openDrawerId === drawerId
}

export const useMobileMenuState: () => IMobileMenuState = () =>
  useSelector(
    (state: IEulogiseState) => state.mobileMenu || MobileMenuInitialState,
  )

export const useSidedCardState: () => ICardProductState = () =>
  useSelector(
    (state: IEulogiseState) => state.sidedCards || SidedCardInitialState,
  )

export const useSlideshowState: () => ISlideshowState = () =>
  useSelector(
    (state: IEulogiseState) => state.slideshows || SlideshowInitialState,
  )

export const useThankYouCardState: () => ICardProductState = () =>
  useSelector(
    (state: IEulogiseState) => state.thankYouCards || ThankYouCardInitialState,
  )

export const usePhotobookState: () => ICardProductState = () =>
  useSelector(
    (state: IEulogiseState) => state.photobooks || PhotobookInitialState,
  )

export const useGenericCardProductState: (options: {
  slug: string
}) => ICardProductState = (options: { slug: string }) => {
  return useSelector((state: IEulogiseState) => {
    const iCardProductState =
      state.genericCardProducts?.productsState?.[options.slug] ??
      baseCardProductInitialState
    return iCardProductState
  })
}

export const useTvWelcomeScreenState: () => ICardProductState = () =>
  useSelector(
    (state: IEulogiseState) =>
      state.tvWelcomeScreens || TvWelcomeScreenInitialState,
  )

export const useSlideshowTitleSlideState: () => ICardProductState = () =>
  useSelector(
    (state: IEulogiseState) =>
      state.slideshowTitleSlides || TvWelcomeScreenInitialState,
  )

export const useAdminState: () => IAdminState = () =>
  useSelector((state: IEulogiseState) => state.admin || AdminInitialState)

export const useGuideWalkThroughState: () => IGuideWalkThroughState = () =>
  useSelector(
    (state: IEulogiseState) =>
      state.guideWalkThrough || GuideWalkThroughInitialState,
  )

export const useCheckoutsState: () => ICheckoutsState = () =>
  useSelector(
    (state: IEulogiseState) => state.checkouts || CheckoutsInitialState,
  )

export const useThemeState: () => IThemeState = () => {
  //const dispatch = useDispatch()
  const themeState = useSelector((state: IEulogiseState) => {
    return state.themes ?? ThemeInitialState
  })
  /*
  const { themes } = themeState

  useEffect(() => {
    if (themes === undefined || themes.length === 0) {
      dispatch(fetchThemesAction())
    }
  }, [themes])*/
  return themeState
}

export const useBackgroundImageState: () => IBackgroundImageState = () =>
  useSelector(
    (state: IEulogiseState) =>
      state.backgroundImages || BackgroundImageInitialState,
  )

export const useSiderMenuState: () => ISiderMenuState = () =>
  useSelector(
    (state: IEulogiseState) => state.siderMenu || SiderMenuInitialState,
  )
