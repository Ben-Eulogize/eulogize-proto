import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../../webtoken'
import { accessControlAllowOrigin } from '../../../middleware'
import { AccountController } from '../../../controller'
import { IInviteModel } from '../../../../database/types/InviteModel.types'
import { IUserModel } from '../../../../database/types/UserModel.types'
import { IServiceModel } from '../../../../database/types/ServiceModel.types'

export const accountSignInHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  console.log('accountSignInHandler', {
    email: (query as any).email,
    type: query.type,
  })
  let webtoken: string

  switch (query.type) {
    case 'invite':
      webtoken = await signInInvite(query)
      break
    case 'user':
      webtoken = await signInUser(query)
      break
    case 'service':
      webtoken = await signInService(query)
      break
    case 'shadow':
      webtoken = await signInShadow(query)
      break
    default:
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: 'Invalid `type` param.',
      })
  }

  const parsedWebtoken = Webtoken.decode(webtoken)

  let accountObj:
    | IUserModel.PublicSchema
    | IInviteModel.PublicSchema
    | IServiceModel.PublicSchema

  switch (query.type) {
    case 'invite': {
      if (parsedWebtoken.type === 'user') {
        accountObj = (await AccountController.signCheckUser(
          parsedWebtoken.ref,
        ))!
      } else {
        accountObj = (await AccountController.signCheckInvite(
          parsedWebtoken.ref,
        ))!
      }
      break
    }
    case 'user':
      accountObj = (await AccountController.signCheckUser(parsedWebtoken.ref))!
      break
    case 'service':
      accountObj = (await AccountController.signCheckService(
        parsedWebtoken.ref,
      ))!
      break
    case 'shadow':
      accountObj = (await AccountController.signCheckUser(parsedWebtoken.ref))!
      break
  }

  return {
    statusCode: 200,
    body: {
      webtoken,
      account: {
        ...accountObj,
        type: query.type,
      },
    },
    headers: {
      'Set-Cookie': Webtoken.cookiefy(webtoken),
    },
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(accountSignInHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface QueryUser {
    type: 'user'
    email: string
    password: string
  }
  export interface QueryInvite {
    type: 'invite'
    token: string
  }
  export interface QueryService {
    type: 'service'
    accessKey: string
    secretKey: string
  }
  export interface QueryShadow {
    type: 'shadow'
    token: string
  }
  export interface Request extends Lambdur.Handler.Request {
    body:
      | handler.QueryUser
      | handler.QueryInvite
      | handler.QueryService
      | handler.QueryShadow
  }
  export interface Response extends Lambdur.Handler.Response {
    body: {
      webtoken: string
    }
    headers: {
      'Set-Cookie': string
    }
  }
}

const signInInvite = async (query: handler.QueryInvite): Promise<string> => {
  if (!query.token) {
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: 'Missing `token`.',
    })
  }

  return await AccountController.signInInvite(query.token)
}

const signInUser = async (query: handler.QueryUser): Promise<string> => {
  if (!query.email || !query.password) {
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: 'Missing `email` or `password` param.',
    })
  }

  return await AccountController.signInUser(query.email, query.password)
}

const signInService = async (query: handler.QueryService): Promise<string> => {
  if (!query.accessKey || !query.secretKey) {
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: 'Missing `accessKey` or `secretKey` param.',
    })
  }

  return await AccountController.signInService(query.accessKey, query.secretKey)
}

const signInShadow = async (query: handler.QueryShadow): Promise<string> => {
  if (!query.token) {
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: 'Missing `token`.',
    })
  }

  return await AccountController.signInShadow(query.token)
}
