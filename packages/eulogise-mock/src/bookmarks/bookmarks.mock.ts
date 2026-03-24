import { AbstractEulogiseResourceMock } from '../AbstractEulogiseResourceMock'
import { MOCK_BOOKMARK_FIND_REQUEST_RESPONSES } from './bookmarks.mock.data'

export class BookmarksMock extends AbstractEulogiseResourceMock {
  constructor(mock: any) {
    super(mock, MOCK_BOOKMARK_FIND_REQUEST_RESPONSES)
  }
}
