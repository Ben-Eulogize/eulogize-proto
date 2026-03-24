import { all } from 'redux-saga/effects'
import { AdminSagas } from './AdminState/sagas'
import { AssetSagas } from './AssetState/sagas'
import { AuthSagas } from './AuthState/sagas'
import { BackgroundImageSagas } from './BackgroundImageState/sagas'
import { CardProductSagas } from './CardProduct/sagas'
import { CaseSagas } from './CaseState/sagas'
import { CustomerInfoSagas } from './CustomerInfoState/sagas'
import { ClientSagas } from './ClientState/sagas'
import { ConnectionSagas } from './ConnectionState/sagas'
import { InviteSagas } from './InviteState/sagas'
import { InvoiceSagas } from './InvoiceState/sagas'
import { ModalSagas } from './ModalState/sagas'
import { GenericCardProductSagas } from './GenericCardProductState/sagas'
import { GenericCardProductTypeSagas } from './GenericCardProductTypeState/sagas'
import { ShareSagas } from './ShareState/sagas'
import { SlideshowSagas } from './SlideshowState/sagas'
import { ThemeSagas } from './ThemeState/sagas'
import { PhotobookSagas } from './PhotobookState/sagas'

// Create the root saga to run multiple sagas
export function* EulogiseRootSaga() {
  yield all([
    ...AdminSagas,
    ...AssetSagas,
    ...AuthSagas,
    ...BackgroundImageSagas,
    ...PhotobookSagas,
    ...CardProductSagas,
    ...CaseSagas,
    ...CustomerInfoSagas,
    ...ClientSagas,
    ...ConnectionSagas,
    ...InviteSagas,
    ...InvoiceSagas,
    ...ModalSagas,
    ...GenericCardProductSagas,
    ...GenericCardProductTypeSagas,
    ...ShareSagas,
    ...SlideshowSagas,
    ...ThemeSagas,
  ])
}
