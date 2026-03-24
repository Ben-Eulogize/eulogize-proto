import { Lambdur } from 'lambdur'

export const accessControlAllowOrigin: Lambdur.Handler<
  accessControlAllowOrigin.Request,
  accessControlAllowOrigin.Response
> = async (request, context, response) => {
  return {
    ...response,
    body: response?.body ? JSON.parse(response.body) : {},
    headers: {
      ...(response?.headers ?? {}),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  }
}

export namespace accessControlAllowOrigin {
  export interface Request extends Lambdur.Handler.Request {}
  export interface Response extends Lambdur.Handler.Response {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
