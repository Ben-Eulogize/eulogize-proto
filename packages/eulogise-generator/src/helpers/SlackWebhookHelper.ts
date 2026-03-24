import axios from 'axios'
import { GENERATOR_CONFIG } from '../config'

export class SlackWebhookHelper {
  public static async sendToSlack({
    text,
    notifyChannel = false,
  }: {
    text: string
    notifyChannel?: boolean
  }): Promise<any> {
    const url = GENERATOR_CONFIG.SLACK_WEBHOOK_URL
    try {
      console.log('Sending to slack', text)
      const { data } = await axios({
        url,
        method: 'POST',
        data: {
          text: notifyChannel ? `<!channel> ${text}` : text,
          username: 'generator-bot',
        },
      })

      return data
    } catch (ex) {
      console.log('ex', ex)
    }
  }
}
