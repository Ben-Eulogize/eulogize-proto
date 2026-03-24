import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../../webtoken'
import { accessControlAllowOrigin } from '../../../middleware'
import { AccountController } from '../../../controller'
import { EulogiseUserRole } from '@eulogise/core'
import { WebPurifyHelper } from '../../../../utils/WebPurifyHelper'
import { BLACKLIST_EMAILS } from './blacklistEmails'
import * as Errors from '../../../error'

// @ts-ignore
export const accountSignUpHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const body = request.body

  try {
    if (
      !body.fullName ||
      !body.email ||
      !body.password ||
      !body.type ||
      !body.deceasedName
    ) {
      throw new Lambdur.Error(Errors.account.sign.up.user.missingParameters())
    }

    if (BLACKLIST_EMAILS.includes(body.email)) {
      throw new Lambdur.Error(Errors.account.sign.up.user.blockedEmail())
    }

    const [
      deceasedNameProfanityCheck,
      fullNameProfanityCheck,
      emailProfanityCheck,
    ] = await Promise.all([
      WebPurifyHelper.checkHasProfanityWords({ text: body.deceasedName }),
      WebPurifyHelper.checkHasProfanityWords({ text: body.fullName }),
      WebPurifyHelper.checkHasProfanityWords({ text: body.email }),
    ])

    if (
      [
        deceasedNameProfanityCheck,
        fullNameProfanityCheck,
        emailProfanityCheck,
      ].some((hasProfanityWords) => hasProfanityWords === true)
    ) {
      throw new Lambdur.Error(
        Errors.account.sign.up.user.profanityWordsDetected(),
      )
    }

    let webtoken: string
    console.log('signing up', body)
    webtoken = await AccountController.signUp({
      fullName: body.fullName,
      email: body.email,
      password: body.password,
      role: body.type,
      deceasedName: body.deceasedName,
      invite: body.invite,
      acceptTerms: true,
      acceptMarketing: true,
    })

    return {
      statusCode: 200,
      body: {
        webtoken: webtoken,
      },
      headers: {
        'Set-Cookie': Webtoken.cookiefy(webtoken),
      },
    }
  } catch (error) {
    if (error.lambdurError) {
      throw error
    }
    console.log('error', error)
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: `Sign up failed`,
    })
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(accountSignUpHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Lambdur.Handler.Request {
    body: {
      fullName: string
      deceasedName: string
      email: string
      password: string
      type: EulogiseUserRole.CUSTOMER | EulogiseUserRole.CLIENT
      invite?: string
    }
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
