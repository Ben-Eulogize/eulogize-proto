import { combineReducers } from 'redux'
// Create the root saga to run multiple sagas
import { AdminReducer } from './AdminState/reducer'
import { AssetReducer } from './AssetState/reducer'
import { AuthReducer } from './AuthState/reducer'
import { BackgroundImageReducer } from './BackgroundImageState/reducer'
import { BookletReducer } from './BookletState/reducer'
import { BookmarkReducer } from './BookmarkState/reducer'
import { ClientReducer } from './ClientState/reducer'
import { ConnectionReducer } from './ConnectionState/reducer'
import { CaseReducer } from './CaseState/reducer'
import { CustomerInfoReducer } from './CustomerInfoState/reducer'
import { InviteReducer } from './InviteState/reducer'
import { InvoiceReducer } from './InvoiceState/reducer'
import { DrawerReducer } from './DrawerState/reducer'
import { ModalReducer } from './ModalState/reducer'
import { MobileMenuReducer } from './MobileMenuState/reducer'
import { ShareReducer } from './ShareState/reducer'
import { SidedCardReducer } from './SidedCardState/reducer'
import { SlideshowReducer } from './SlideshowState/reducer'
import { SlideshowTitleSlideReducer } from './SlideshowTitleSlideState/reducer'
import { ThankYouCardReducer } from './ThankYouCardState/reducer'
import { TvWelcomeScreenReducer } from './TvWelcomeScreenState/reducer'
import { GuideWalkThroughReducer } from './GuideWalkThroughState/reducer'
import { CheckoutsReducer } from './CheckoutsState/reducer'
import { ThemeReducer } from './ThemeState/reducer'
import { SiderMenuReducer } from './SiderMenuState/reducer'
import { UserSettingsReducer } from './UserSettingsState/reducer'
import { PhotobookReducer } from './PhotobookState/reducer'
import { GlobalReducer } from './GlobalState/redux'
import { GenericCardProductReducer } from './GenericCardProductState/reducer'
import { GenericCardProductTypeReducer } from './GenericCardProductTypeState/reducer'

export const EulogiseRootReducer = combineReducers({
  assets: AssetReducer,
  admin: AdminReducer,
  auth: AuthReducer,
  backgroundImages: BackgroundImageReducer,
  booklets: BookletReducer,
  bookmarks: BookmarkReducer,
  client: ClientReducer,
  connections: ConnectionReducer,
  global: GlobalReducer,
  cases: CaseReducer,
  customerInfo: CustomerInfoReducer,
  invites: InviteReducer,
  invoices: InvoiceReducer,
  drawers: DrawerReducer,
  modals: ModalReducer,
  mobileMenu: MobileMenuReducer,
  genericCardProducts: GenericCardProductReducer,
  genericCardProductTypes: GenericCardProductTypeReducer,
  shares: ShareReducer,
  sidedCards: SidedCardReducer,
  slideshows: SlideshowReducer,
  slideshowTitleSlides: SlideshowTitleSlideReducer,
  thankYouCards: ThankYouCardReducer,
  tvWelcomeScreens: TvWelcomeScreenReducer,
  photobooks: PhotobookReducer,
  guideWalkThrough: GuideWalkThroughReducer,
  checkouts: CheckoutsReducer,
  themes: ThemeReducer,
  siderMenu: SiderMenuReducer,
  userSettings: UserSettingsReducer,
})
