import { MOCK_SIDED_CARD_FIND_REQUEST_RESPONSES } from './sidedCards.mock.data'
import { AbstractEulogiseResourceMock } from '../AbstractEulogiseResourceMock'

export class SidedCardsMock extends AbstractEulogiseResourceMock {
  constructor(mock: any) {
    super(mock, MOCK_SIDED_CARD_FIND_REQUEST_RESPONSES)
  }
}
