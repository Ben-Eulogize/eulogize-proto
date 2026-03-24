import { MOCK_THANK_YOU_CARD_FIND_REQUEST_RESPONSES } from './thankYouCards.mock.data'
import { AbstractEulogiseResourceMock } from '../AbstractEulogiseResourceMock'

export class ThankYouCardsMock extends AbstractEulogiseResourceMock {
  constructor(mock: any) {
    super(mock, MOCK_THANK_YOU_CARD_FIND_REQUEST_RESPONSES)
  }
}
