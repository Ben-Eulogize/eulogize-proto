import expect from 'expect'
import { SlackWebhookHelper } from './SlackWebhookHelper'

describe('SlackWebhookHelper', () => {
  let results: any
  describe('sendToSlack()', () => {
    describe('with notifyChannel', () => {
      beforeEach(async () => {
        results = await SlackWebhookHelper.sendToSlack({
          text: 'Test 2',
          notifyChannel: true,
        })
      })

      it('should send a message to Slack', () => {
        expect(results).toEqual('ok')
      })
    })

    describe('without notifyChannel', () => {
      beforeEach(async () => {
        results = await SlackWebhookHelper.sendToSlack({
          text: 'Test 2',
        })
      })

      it('should send a message to Slack', () => {
        expect(results).toEqual('ok')
      })
    })
  })
})
