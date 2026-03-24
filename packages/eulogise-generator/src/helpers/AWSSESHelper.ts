import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import MailComposer from 'nodemailer/lib/mail-composer'

const client = new SESClient()

/*
type FirstAppointmentVariables = {
  firstName: string
  bookingLink: string
}
*/

//type EmailVariables = FirstAppointmentVariables
type MailAttachment = {
  filename?: string
  content?: string
  path?: string
  href?: string
  httpHeaders?: any
  contentType?: string
  contentDisposition?: string
  cid?: string
  encoding?: string
  headers?: any
  raw?: string
}

export class AWSSESHelper {
  public static async sendWithAttachments({
    from = 'support@eulogizememorials.com',
    to = 'kakchan@gmail.com',
    subject,
    body,
    attachmentPaths,
  }: {
    from?: string
    to?: string
    subject: string
    body: string
    attachmentPaths: Array<string>
  }) {
    console.log('AWSSESHelper.sendWithAttachments', { from, to, subject })
    return Promise.resolve().then(() => {
      let sendRawEmailPromise: any

      const attachments: Array<MailAttachment> = attachmentPaths.map(
        (attachmentPath) => ({
          path: attachmentPath,
          contentType: 'text/html',
        }),
      )
      console.log('attachments', attachments)
      const mail = new MailComposer({
        from: from,
        to: to,
        subject: subject,
        text: body,
        attachments: attachments as Array<any>,
      })

      return new Promise((resolve, reject) => {
        mail.compile().build(async (err, message) => {
          if (err) {
            reject(`Error sending raw email: ${err}`)
          }
          const input = {
            // SendRawEmailRequest
            /*
            Source: 'STRING_VALUE',
            Destinations: [
              // AddressList
              'STRING_VALUE',
            ],
*/
            RawMessage: {
              // RawMessage
              Data: message, // e.g. Buffer.from("") or new TextEncoder().encode("")     // required
            },
          }
          const command = new SendRawEmailCommand(input)
          sendRawEmailPromise = await client.send(command)
        })

        resolve(sendRawEmailPromise)
      })
    })
  }
}
