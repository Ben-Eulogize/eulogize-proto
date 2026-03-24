import { LambdurRequest } from 'lambdur/dist/lambdur/request'
import { LambdurError } from 'lambdur/dist/lambdur/error'

export class EulogizeLambdur {
  public static Error = LambdurError

  public static stringify(
    handler: EulogizeLambdur.Handler,
  ): EulogizeLambdur.Handler {
    return async (request, context) => {
      const response = (await handler(
        request,
        context,
        null as any,
      )) as EulogizeLambdur.Handler.Response
      return {
        ...response,
        body: JSON.stringify(response.body),
      }
    }
  }

  public static chain(
    ...handlers: EulogizeLambdur.Handler[]
  ): EulogizeLambdur.Handler {
    return async (request, context) => {
      // Ensure headers exist to prevent parseRequest from failing
      if (!request.headers) {
        request.headers = {}
      }

      const lambdaRequest = new LambdurRequest(request)

      // @ts-ignore
      let response: EulogizeLambdur.Handler.Response = null

      const parsedRequest = lambdaRequest.parseRequest()
      for (const handler of handlers) {
        try {
          response = <EulogizeLambdur.Handler.Response>(
            await handler(parsedRequest, context, response)
          )
          // console.log('response', response)
          // @ts-ignore
          if (response?.isNonJSON) {
            return response
          }
        } catch (error) {
          console.log('Error', error)
          if (error.lambdurError === true) {
            response = {
              statusCode: error.options.statusCode,
              body: JSON.stringify({
                error: {
                  id: error.options.id,
                  message: error.options.message,
                },
                ref: lambdaRequest.reference,
              }),
            }
          } else {
            response = {
              statusCode: 500,
            }
            if (process.env.NODE_ENV === 'development') {
              response.body = JSON.stringify({
                error: {
                  id: '0',
                  message: error.message,
                  details: error,
                },
                ref: lambdaRequest.reference,
              })
            } else {
              response.body = JSON.stringify({
                error: {
                  id: '0',
                  message: 'Internal error occurred.',
                },
                ref: lambdaRequest.reference,
              })
            }
          }

          return response
        }
      }

      if (typeof response?.body === 'string') {
        response.body = {
          message: response.body,
        }
      }

      if (response?.body) {
        response.body = JSON.stringify({
          ...(response?.body ? response.body : {}),
          ref: lambdaRequest.reference,
        })
      }

      if (response && !response?.statusCode) {
        response.statusCode = 200
      }

      return response
    }
  }
}

export namespace EulogizeLambdur {
  export namespace Handler {
    export interface Request {
      ref: string
      body: any
      query: {
        [key: string]: any
      }
      method: string
      headers: {
        [key: string]: string
      }
    }
    export interface Context {}
    export interface Response {
      statusCode: number
      body?: any
    }
    export type Callback<ResponseType> = (
      error: boolean,
      response: ResponseType,
    ) => void
  }
  export type Handler<
    RequestType = EulogizeLambdur.Handler.Request,
    ResponseType = EulogizeLambdur.Handler.Response,
    ContextType = EulogizeLambdur.Handler.Context,
  > = (
    request: RequestType,
    context: ContextType,
    response: ResponseType,
  ) => Promise<ResponseType | void>
}
