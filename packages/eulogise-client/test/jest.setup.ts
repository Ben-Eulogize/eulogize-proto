import dotenv from 'dotenv'
dotenv.config()
dotenv.config({
  path: `.env.test.local`,
})

global.___loader = {
  enqueue: jest.fn(),
}
