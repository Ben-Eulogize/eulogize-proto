import { AbstractEulogiseResourceMock } from '../AbstractEulogiseResourceMock'
import { MOCK_BOOKLET_FIND_REQUEST_RESPONSES } from './booklets.mock.data'

export class BookletsMock extends AbstractEulogiseResourceMock {
  constructor(mock: any) {
    super(mock, MOCK_BOOKLET_FIND_REQUEST_RESPONSES)
  }
}
