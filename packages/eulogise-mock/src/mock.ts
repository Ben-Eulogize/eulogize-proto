import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { AssetsMock } from './assets'
import { BookletsMock } from './booklets/booklets.mock'
import { CasesMock } from './cases'
import { SlideshowsMock } from './slideshows'
import { SidedCardsMock } from './sidedCards'
import { BookmarksMock } from './bookmarks'
import { ThankYouCardsMock } from './thankYouCards'
import { LoginMock } from './auth'
import { SignUpMock } from './auth'
import { AccountCheckMock } from './auth'
import { ForgotPasswordMock } from './auth'

const mock = new MockAdapter(axios)

new AccountCheckMock(mock)
new LoginMock(mock)
new SignUpMock(mock)
new ForgotPasswordMock(mock)
new AssetsMock(mock)
new BookletsMock(mock)
new BookmarksMock(mock)
new CasesMock(mock)
new SlideshowsMock(mock)
new SidedCardsMock(mock)
new ThankYouCardsMock(mock)
