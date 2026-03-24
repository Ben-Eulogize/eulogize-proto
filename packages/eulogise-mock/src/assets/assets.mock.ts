import { AbstractEulogiseResourceMock } from '../AbstractEulogiseResourceMock'
import { MOCK_ASSET_FIND_REQUEST_RESPONSES } from './assets.mock.data'

export class AssetsMock extends AbstractEulogiseResourceMock {
  constructor(mock: any) {
    super(mock, MOCK_ASSET_FIND_REQUEST_RESPONSES)
  }
}
