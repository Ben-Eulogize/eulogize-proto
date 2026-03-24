import React from 'react'

const TestingLibraryHelper = {
  shouldExistsAndEnabled: (el: React.ReactNode) => {
    expect(el).toBeTruthy()
    expect(el).not.toHaveAttribute('aria-disabled', 'true')
  },
  shouldExistsAndDisabled: (el: React.ReactNode) => {
    expect(el).toBeTruthy()
    expect(el).toHaveAttribute('aria-disabled', 'true')
  },
  shouldNotExist: (el: React.ReactNode) => {
    expect(el).toBeFalsy()
  },
}

export default TestingLibraryHelper
