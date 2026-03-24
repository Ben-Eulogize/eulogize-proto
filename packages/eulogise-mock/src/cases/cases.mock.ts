import { AbstractEulogiseResourceMock } from '../AbstractEulogiseResourceMock'
import { MOCK_CASE_FIND_REQUEST_RESPONSES } from './cases.mock.data'

export class CasesMock extends AbstractEulogiseResourceMock {
  constructor(mock: any) {
    super(mock, MOCK_CASE_FIND_REQUEST_RESPONSES)
  }
}
