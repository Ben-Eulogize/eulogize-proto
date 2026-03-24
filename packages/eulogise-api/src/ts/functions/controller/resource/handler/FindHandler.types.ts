import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../../webtoken'

export namespace FindHandler {
  export interface Query {
    resource: string
    search: { caseId: string; type?: 'image' | 'audio' }
  }
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: FindHandler.Query
  }
  export interface Response extends Lambdur.Handler.Response {
    body: {
      items: any[]
      count: number
    }
  }
}
