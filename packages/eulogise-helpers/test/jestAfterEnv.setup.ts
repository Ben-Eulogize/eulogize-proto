import sinon from 'sinon'
import '@testing-library/jest-dom/extend-expect'

// @ts-ignore
global.sandbox = null

// @ts-ignore
beforeEach(() => (global.sandbox = sinon.createSandbox()))
// @ts-ignore
afterEach(() => global.sandbox.restore())
