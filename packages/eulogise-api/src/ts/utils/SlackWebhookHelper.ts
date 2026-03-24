import axios from 'axios'
import { CONFIG } from '../config/Config'

export class SlackWebhookHelper {
  public static async sendToSlack({
    text,
    notifyChannel = false,
  }: {
    text: string
    notifyChannel?: boolean
  }): Promise<any> {
    const url = CONFIG.SLACK_WEBHOOK_URL
    if (!url) {
      console.log(
        'SLACK_WEBHOOK_URL is not configured, skipping Slack notification',
      )
      return
    }
    try {
      console.log('Sending to slack', text)
      const { data } = await axios({
        url,
        method: 'POST',
        data: {
          text: notifyChannel ? `<!channel> ${text}` : text,
          username: 'api-bot',
        },
      })

      return data
    } catch (ex) {
      console.log('SlackWebhookHelper error', ex)
    }
  }
}
