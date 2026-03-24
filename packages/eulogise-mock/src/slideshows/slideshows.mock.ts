import { MOCK_SIDESHOW_FIND_REQUEST_RESPONSES } from './slideshows.mock.data'
import { AbstractEulogiseResourceMock } from '../AbstractEulogiseResourceMock'

export class SlideshowsMock extends AbstractEulogiseResourceMock {
  constructor(mock: any) {
    super(mock, MOCK_SIDESHOW_FIND_REQUEST_RESPONSES)
  }
}
