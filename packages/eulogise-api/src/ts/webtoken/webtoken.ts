import { Lambdur } from 'lambdur'
import jsonwebtoken from 'jsonwebtoken'
import cookie from 'cookie'
import { IEulogizeAccountType, IEulogizeAuthTokenPayload } from '@eulogise/core'

export class Webtoken {
  private static secret = process.env.WEBTOKEN_SECRET

  public static encode(payload: Webtoken.Payload): string {
    return jsonwebtoken.sign(payload, Webtoken.secret!)
  }

  public static decode<PayloadType = Webtoken.Payload>(
    webtoken: string,
  ): PayloadType {
    let decoded: PayloadType
    try {
      decoded = jsonwebtoken.verify(webtoken, Webtoken.secret!) as any
    } catch (error) {
      throw error
    }

    return decoded
  }

  public static cookiefy(webtoken: string): string {
    const timestamp = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

    return cookie.serialize('webtoken', webtoken, {
      path: '/',
      httpOnly: true,
      expires: timestamp,
    })
  }
}

export namespace Webtoken {
  export namespace Account {
    export type Type = IEulogizeAccountType
  }
  export namespace Payload {
    export type Account = IEulogizeAuthTokenPayload
  }
  export type Payload = Webtoken.Payload.Account
  export interface Request<PayloadType = Webtoken.Payload>
    extends Lambdur.Handler.Request {
    webtoken: PayloadType
  }
}
