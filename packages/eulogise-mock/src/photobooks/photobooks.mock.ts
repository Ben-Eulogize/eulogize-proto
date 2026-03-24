import { AbstractEulogiseResourceMock } from '../AbstractEulogiseResourceMock'
import { MOCK_PHOTOBOOK_FIND_REQUEST_RESPONSES } from './photobooks.mock.data'

export class PhotobooksMock extends AbstractEulogiseResourceMock {
  constructor(mock: any) {
    super(mock, MOCK_PHOTOBOOK_FIND_REQUEST_RESPONSES)
  }
}
