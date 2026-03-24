import React from 'react'
import { render } from '@testing-library/react'
import { Alert } from './Alert'

describe('Alert', () => {
  let results: any
  const message: string = 'Test Message'

  beforeEach(() => {
    results = render(<Alert>{message}</Alert>)
  })

  it('should render', () => {
    expect(results.getByText(message).innerHTML).toEqual(message)
  })
})
