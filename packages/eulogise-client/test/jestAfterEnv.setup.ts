import sinon from 'sinon'
import '@testing-library/jest-dom/extend-expect'

global.sandbox = null

beforeEach(() => (global.sandbox = sinon.createSandbox()))
afterEach(() => global.sandbox.restore())
