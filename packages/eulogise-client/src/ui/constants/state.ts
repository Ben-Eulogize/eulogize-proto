import { IEulogiseState } from '@eulogise/core'
import { AssetInitialState } from '../store/AssetState/reducer'
import { AuthInitialState } from '../store/AuthState/reducer'
import { BookletInitialState } from '../store/BookletState/reducer'
import { BookmarkInitialState } from '../store/BookmarkState/reducer'
import { CaseInitialState } from '../store/CaseState/reducer'
import { MobileMenuInitialState } from '../store/MobileMenuState/reducer'
import { SidedCardInitialState } from '../store/SidedCardState/reducer'
import { ThankYouCardInitialState } from '../store/ThankYouCardState/reducer'
import { DrawerInitialState } from '../store/DrawerState/reducer'
import { AdminInitialState } from '../store/AdminState/reducer'
import { ModalInitialState } from '../store/ModalState/reducer'
import { ClientInitialState } from '../store/ClientState/reducer'
import { InviteInitialState } from '../store/InviteState/reducer'
import { InvoiceInitialState } from '../store/InvoiceState/reducer'
import { SlideshowInitialState } from '../store/SlideshowState/initialState'
import { GuideWalkThroughInitialState } from '../store/GuideWalkThroughState/reducer'
import { ThemeInitialState } from '../store/ThemeState/reducer'
import { CheckoutsInitialState } from '../store/CheckoutsState/reducer'
import { TvWelcomeScreenInitialState } from '../store/TvWelcomeScreenState/reducer'
import { SiderMenuInitialState } from '../store/SiderMenuState/reducer'
import { BackgroundImageInitialState } from '../store/BackgroundImageState/reducer'

export const EulogiseInitialState: IEulogiseState = {
  assets: AssetInitialState,
  auth: AuthInitialState,
  backgroundImages: BackgroundImageInitialState,
  booklets: BookletInitialState,
  bookmarks: BookmarkInitialState,
  cases: CaseInitialState,
  drawers: DrawerInitialState,
  client: ClientInitialState,
  invites: InviteInitialState,
  invoices: InvoiceInitialState,
  modals: ModalInitialState,
  mobileMenu: MobileMenuInitialState,
  sidedCards: SidedCardInitialState,
  slideshows: SlideshowInitialState,
  thankYouCards: ThankYouCardInitialState,
  themes: ThemeInitialState,
  checkouts: CheckoutsInitialState,
  tvWelcomeScreens: TvWelcomeScreenInitialState,
  siderMenu: SiderMenuInitialState,
  admin: AdminInitialState,
  guideWalkThrough: GuideWalkThroughInitialState,
}

export const SLIDESHOW_EDITOR_KEY_MAP = {
  UNDO: 'cmd+z',
  UNDO_CTRL: 'ctrl+z',
  REDO: 'cmd+y',
}
