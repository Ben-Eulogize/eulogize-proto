import { Lambdur } from 'lambdur'
import * as uuid from 'uuid'
import {
  caseModel,
  assetModel,
  bookletModel,
  bookmarkModel,
  clientModel,
  inviteModel,
  sidedCardModel,
  slideshowModel,
  slideshowTitleSlideModel,
  photobookModel,
  serviceModel,
  thankyouCardModel,
  tvWelcomeScreenModel,
  userModel,
} from '../../database'
import { Webtoken } from '../../webtoken'
import { CaseResourceController, ClientResourceController } from './resource'

import * as Errors from '../error'
import { SendGridHelper } from '../../utils/SendGridHelper'
import { DbCleanUpHelper } from '../../utils/DbCleanUpHelper'
import { IUserModel } from '../../database/types/UserModel.types'
import { IInviteModel } from '../../database/types/InviteModel.types'
import { IServiceModel } from '../../database/types/ServiceModel.types'
import {
  EulogiseProductName,
  EulogiseUserRole,
  NO_REPLY_EULOGISE_EMAIL,
} from '@eulogise/core'
import { ApiLambdaHelper, ApiLambdaJobTypes } from '../../utils/ApiLambdaHelper'

const reindexRedisDb = async () => {
  await ApiLambdaHelper.invokeJob(
    ApiLambdaJobTypes.REINDEX_REDIS_DB,
    {
      redisIndexes: ['users'],
    },
    true,
  )
}

const DELETE_ACCOUNT_FAILED_MESSAGE =
  "Something went wrong and we couldn't delete your account yet. Your account is still active. Please try again in a few minutes or contact support@eulogizememorials.com."
const DELETE_ACCOUNT_NOT_ALLOWED_MESSAGE =
  'Account deletion is only available for direct user accounts.'

type TributeProductModel = {
  getProductsByCaseId: (caseId: string) => Promise<Array<object>>
  removeByCaseId: (caseId: string) => Promise<void>
}

const DIRECT_CUSTOMER_TRIBUTE_MODELS: Array<{
  name: EulogiseProductName
  model: TributeProductModel
}> = [
  {
    name: EulogiseProductName.BOOKLET,
    model: bookletModel,
  },
  {
    name: EulogiseProductName.BOOKMARK,
    model: bookmarkModel,
  },
  {
    name: EulogiseProductName.PHOTOBOOK,
    model: photobookModel,
  },
  {
    name: EulogiseProductName.SIDED_CARD,
    model: sidedCardModel,
  },
  {
    name: EulogiseProductName.SLIDESHOW,
    model: slideshowModel,
  },
  {
    name: EulogiseProductName.SLIDESHOW_TITLE_SLIDE,
    model: slideshowTitleSlideModel,
  },
  {
    name: EulogiseProductName.THANK_YOU_CARD,
    model: thankyouCardModel,
  },
  {
    name: EulogiseProductName.TV_WELCOME_SCREEN,
    model: tvWelcomeScreenModel,
  },
]

export class AccountController {
  public static async signCheckUser(
    ref: string,
  ): Promise<IUserModel.PublicSchema | undefined> {
    const userObj = await userModel.findById(ref)

    return userModel.scope('public', userObj)
  }

  public static async signCheckInvite(
    ref: string,
  ): Promise<IInviteModel.PublicSchema | undefined> {
    const inviteObj = await inviteModel.findById(ref)

    return inviteModel.scope('public', inviteObj)
  }

  public static async signCheckService(
    ref: string,
  ): Promise<IServiceModel.PublicSchema | undefined> {
    const serviceObj = await serviceModel.findById(ref)

    return serviceModel.scope('public', serviceObj)
  }

  public static async signInUser(
    email: string,
    password: string,
  ): Promise<string> {
    const userObj = await userModel.findOneByEmail(email)

    if (!userObj) {
      throw new Lambdur.Error(Errors.account.sign.in.user.invalidEmail())
    }

    if (!userObj.password) {
      throw new Lambdur.Error({
        id: 'b5f81e0',
        statusCode: 400,
        message: 'Your password is not set. Please reset it below.',
      })
    }
    const passwordMatch = await userModel.checkPassword(
      userObj.password,
      password,
    )

    if (!passwordMatch) {
      throw new Lambdur.Error(Errors.account.sign.in.user.invalidPassword())
    }

    const tokenPayload: Webtoken.Payload = {
      ref: userObj.id!,
      role: userObj.role,
      type: 'user',
    }

    if (userObj.id) {
      const clients = await clientModel.findByUserId(userObj.id)
      console.log('found client', clients)
      if (clients.length > 0) {
        const [client] = clients
        return Webtoken.encode({
          ...tokenPayload,
          clientId: client.id,
          clientTitle: client.title,
          features: client.features ?? {},
        })
      }
    }
    return Webtoken.encode(tokenPayload)
  }

  public static async signInInvite(token: string): Promise<string> {
    const inviteObj = await inviteModel.findOneByToken(token)
    if (!inviteObj) {
      throw new Lambdur.Error(Errors.account.sign.in.invite.invalidToken())
    }

    if (
      inviteObj.role === EulogiseUserRole.CLIENT ||
      inviteObj.role === EulogiseUserRole.COEDITOR ||
      inviteObj.role === EulogiseUserRole.EDITOR
    ) {
      const user = await userModel.findOne({ email: inviteObj.email })
      return Webtoken.encode({
        ref: user?.id!,
        role: inviteObj.role,
        type: 'user',
      })
    }

    return Webtoken.encode({
      ref: inviteObj.id!,
      role: inviteObj.role,
      type: 'invite',
    })
  }

  public static async signInService(
    accessKey: string,
    secretKey: string,
  ): Promise<string> {
    const serviceObj = (await serviceModel.query({ accessKey, secretKey }))[0]

    if (!serviceObj) {
      throw new Lambdur.Error(Errors.account.sign.in.service.invalidKey())
    }

    return Webtoken.encode({
      ref: serviceObj.id!,
      role: EulogiseUserRole.INTERNAL,
      type: 'service',
    })
  }

  public static async signInShadow(token: string): Promise<string> {
    if (!token) {
      throw new Lambdur.Error(Errors.account.sign.in.shadow.invalidToken())
    }

    const userObj = (await userModel.query({ shadowToken: token }))[0]

    if (!userObj) {
      throw new Lambdur.Error(Errors.account.sign.in.shadow.invalidToken())
    }

    return Webtoken.encode({
      ref: userObj.id!,
      role: userObj.role,
      type: 'user',
    })
  }

  public static async signUp({
    fullName,
    email,
    password,
    role,
    deceasedName,
    invite,
    acceptTerms,
    acceptMarketing,
  }: {
    fullName: string
    email: string
    password: string
    role: EulogiseUserRole
    deceasedName: string
    invite?: string
    acceptTerms?: boolean
    acceptMarketing?: boolean
  }): Promise<string> {
    const emailTaken = await userModel.isExists({ email })
    if (emailTaken) {
      throw new Lambdur.Error(Errors.account.sign.up.user.invalidEmail())
    }

    const saveQuery: IUserModel.Schema = {
      fullName,
      email,
      phone: '',
      firstStreetAddress: '',
      secondStreetAddress: '',
      city: '',
      state: '',
      postcode: '',
      password: await userModel.hashPassword(password),
      token: uuid.v4(),
      shadowToken: undefined,
      verified: false,
      role,
      showOnBoardingHelperEveryTime: true,
      acceptTerms,
      acceptMarketing,
    }
    let userObj: IUserModel.Schema

    userObj = await userModel.save(saveQuery)
    await reindexRedisDb()

    if (invite) {
      const inviteObj = await inviteModel.findById(invite)
      switch (inviteObj.role) {
        case EulogiseUserRole.CUSTOMER:
          await CaseResourceController.assignCustomer(
            userObj?.id!,
            inviteObj.id!,
          )
          break
        case EulogiseUserRole.CLIENT:
          await ClientResourceController.assignUser(userObj?.id!, inviteObj.id!)
          break
      }
    }

    // Only send the welcome email to the public user
    if (role === EulogiseUserRole.CUSTOMER) {
      await AccountController.sendSignUpEmail(userObj, deceasedName)
    }

    return Webtoken.encode({
      ref: userObj.id!,
      role: userObj.role,
      type: 'user',
    })
  }

  public static async signUpCoEditor(
    fullName: string,
    email: string,
    role: EulogiseUserRole,
  ): Promise<object> {
    const emailTaken = await userModel.findOneByEmail(email)

    if (emailTaken) {
      throw new Lambdur.Error(Errors.account.sign.up.user.invalidEmail())
    }

    const saveQuery: IUserModel.Schema = {
      fullName,
      email,
      phone: '',
      firstStreetAddress: '',
      secondStreetAddress: '',
      city: '',
      state: '',
      postcode: '',
      // create a random password
      password: await userModel.hashPassword(uuid.v4()),
      token: uuid.v4(),
      shadowToken: undefined,
      verified: false,
      role,
      showOnBoardingHelperEveryTime: true,
    }

    let userObj: IUserModel.Schema
    userObj = await userModel.save(saveQuery)
    await reindexRedisDb()
    return userModel.scope('public', userObj)!
  }

  public static async signUpCustomerAsClient(
    fullName: string,
    password: string,
    role: EulogiseUserRole,
    email?: string,
    invite?: string,
  ): Promise<object> {
    if (email) {
      const emailTaken = await userModel.findOneByEmail(email)
      console.log('signUpCustomerAsClient email taken', email)
      if (emailTaken) {
        throw new Lambdur.Error(Errors.account.sign.up.user.invalidEmail())
      }
    }

    const saveQuery: IUserModel.Schema = {
      fullName,
      email: email || NO_REPLY_EULOGISE_EMAIL,
      phone: '',
      firstStreetAddress: '',
      secondStreetAddress: '',
      city: '',
      state: '',
      postcode: '',
      password: await userModel.hashPassword(password),
      token: uuid.v4(),
      shadowToken: undefined,
      verified: false,
      role,
      showOnBoardingHelperEveryTime: true,
    }
    console.log('saveQuery', saveQuery)
    let userObj: IUserModel.Schema

    userObj = await userModel.save(saveQuery)
    await reindexRedisDb()

    return userModel.scope('public', userObj)!
  }

  public static async signUpClientAsAdmin(
    fullName: string,
    email: string,
    password: string,
    role: EulogiseUserRole,
  ): Promise<object> {
    const emailTaken = await userModel.findOneByEmail(email)

    if (emailTaken) {
      throw new Lambdur.Error(Errors.account.sign.up.user.invalidEmail())
    }

    const saveQuery: IUserModel.Schema = {
      fullName,
      email,
      phone: '',
      firstStreetAddress: '',
      secondStreetAddress: '',
      city: '',
      state: '',
      postcode: '',
      password: await userModel.hashPassword(password),
      token: uuid.v4(),
      shadowToken: undefined,
      verified: false,
      role,
      showOnBoardingHelperEveryTime: false,
    }

    let userObj: IUserModel.Schema

    userObj = await userModel.save(saveQuery)
    await reindexRedisDb()

    return userModel.scope('public', userObj)!
  }

  public static async save(
    accountObj: Webtoken.Payload.Account,
    userChanges: Partial<IUserModel.PublicSchema>,
  ): Promise<void> {
    console.log('userChanges', userChanges)
    const userObj = await userModel.findById(userChanges.id!)

    if (!userObj) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 500,
        message: 'Invalid `userObj`.',
      })
    }

    const saveQuery: IUserModel.Schema = {
      ...userObj,
      password: userChanges.password
        ? await userModel.hashPassword(userChanges.password)
        : undefined,
      fullName: userChanges.fullName ?? userObj.fullName,
      phone: userChanges.phone!,
      firstStreetAddress: userChanges.firstStreetAddress!,
      secondStreetAddress: userChanges.secondStreetAddress,
      city: userChanges.city!,
      state: userChanges.state!,
      postcode: userChanges.postcode!,
      showOnBoardingHelperEveryTime: userChanges.showOnBoardingHelperEveryTime!,
      acceptTerms: userChanges.acceptTerms ?? userObj.acceptTerms,
      acceptMarketing: userChanges.acceptMarketing ?? userObj.acceptMarketing,
      userGuideHelperConfig:
        userChanges.userGuideHelperConfig ?? userObj.userGuideHelperConfig,
    }
    if (!saveQuery.password) {
      delete saveQuery.password
    }
    await userModel.update(saveQuery)
  }

  public static async deleteDirectCustomerAccount(
    accountId: string,
  ): Promise<void> {
    const userObj = await userModel.findById(accountId)
    if (!userObj) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 404,
        message: 'Account not found.',
      })
    }

    if (userObj.role !== EulogiseUserRole.CUSTOMER) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 403,
        message: DELETE_ACCOUNT_NOT_ALLOWED_MESSAGE,
      })
    }

    const customerCase = await caseModel.findOneByCustomerId(accountId)
    if (customerCase?.client) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 403,
        message: DELETE_ACCOUNT_NOT_ALLOWED_MESSAGE,
      })
    }

    let uploadedPhotoCount = 0
    let uploadedAudioCount = 0
    let removedTributeNames: Array<string> = []

    try {
      if (customerCase?.id) {
        const caseId = customerCase.id
        uploadedPhotoCount = await assetModel.getImageCountByCaseId(caseId)
        uploadedAudioCount = await assetModel.getAudioCountByCaseId(caseId)
        const tributeCountByType = await Promise.all(
          DIRECT_CUSTOMER_TRIBUTE_MODELS.map(async ({ model, name }) => {
            const products = await model.getProductsByCaseId(caseId)
            return {
              name,
              count: products.length,
            }
          }),
        )
        removedTributeNames = tributeCountByType
          .filter(({ count }) => count > 0)
          .map(({ name }) => name)

        if (uploadedPhotoCount > 0 || uploadedAudioCount > 0) {
          await assetModel.removeByCaseId({ caseId })
        }

        await Promise.all(
          DIRECT_CUSTOMER_TRIBUTE_MODELS.map(async ({ model, name }) => {
            if (removedTributeNames.includes(name)) {
              await model.removeByCaseId(caseId)
            }
          }),
        )

        await DbCleanUpHelper.deleteCaseById(caseId)
      }

      const userStillExists = await userModel.findById(accountId)
      if (userStillExists) {
        await userModel.remove({ id: accountId })
      }
      await reindexRedisDb()
    } catch (error) {
      console.error('deleteDirectCustomerAccount failed', {
        accountId,
        error,
      })
      throw new Lambdur.Error({
        id: '',
        statusCode: 500,
        message: DELETE_ACCOUNT_FAILED_MESSAGE,
      })
    }

    try {
      await SendGridHelper.sendAccountDeletionConfirmation({
        fullName: userObj.fullName,
        email: userObj.email,
        uploadedPhotoCount,
        uploadedAudioCount,
        removedTributeNames,
      })
    } catch (error) {
      console.error('deleteDirectCustomerAccount confirmation email failed', {
        accountId,
        email: userObj.email,
        error,
      })
    }
  }

  public static async signUpFuneralDirectorAsAdmin(
    fullName: string,
    email: string,
  ): Promise<object> {
    const emailTaken = await userModel.findOneByEmail(email)

    if (emailTaken) {
      throw new Lambdur.Error(Errors.account.sign.up.user.invalidEmail())
    }
    const randomPass: string = uuid.v4()

    const saveQuery: IUserModel.Schema = {
      fullName,
      email,
      phone: '',
      firstStreetAddress: '',
      secondStreetAddress: '',
      city: '',
      state: '',
      postcode: '',
      password: await userModel.hashPassword(randomPass),
      token: uuid.v4(),
      shadowToken: undefined,
      verified: false,
      role: EulogiseUserRole.CLIENT,
      showOnBoardingHelperEveryTime: false,
    }

    let userObj: IUserModel.Schema

    userObj = await userModel.save(saveQuery)
    await reindexRedisDb()

    return userModel.scope('public', userObj)!
  }

  public static async resetPasswordByEmail(
    email: string,
    password: string,
  ): Promise<void> {
    if (!email) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: 'Missing Email as a para when resetting password by email.',
      })
    }

    const userObj = await userModel.findOneByEmail(email)

    if (!userObj) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 500,
        message: 'Invalid `email`, reset password without token failed.',
      })
    }

    const saveQuery = {
      ...userObj,
      password: await userModel.hashPassword(password),
    }

    await userModel.save(saveQuery)
  }

  public static async verifyEmail(token: string): Promise<string> {
    const userObj = await userModel.findOneByToken(token)

    if (!userObj) {
      throw new Lambdur.Error(Errors.account.invalidToken())
    }

    const saveQuery = {
      ...userObj,
      verified: true,
    }

    await userModel.save(saveQuery)

    return Webtoken.encode({
      ref: userObj.id!,
      role: userObj.role,
      type: 'user',
    })
  }

  public static async forgotPassword(email: string): Promise<void> {
    const userObj = await userModel.findOneByEmail(email)

    if (!userObj) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 500,
        message: 'Invalid `email`.',
      })
    }

    const saveQuery = {
      ...userObj,
      token: uuid.v4(),
    }

    await userModel.save(saveQuery)

    await AccountController.sendForgotPasswordEmail(saveQuery)
  }

  public static async resetPassword(
    token: string,
    password: string,
  ): Promise<void> {
    const userObj = await userModel.findOneByToken(token)

    if (!userObj) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 500,
        message: 'Invalid `token`.',
      })
    }

    const saveQuery = {
      ...userObj,
      token: uuid.v4(),
      password: await userModel.hashPassword(password),
    }

    await userModel.save(saveQuery)
  }

  public static async sendSignUpEmail(
    userObj: IUserModel.Schema,
    deceasedName: string,
  ): Promise<{}> {
    return await SendGridHelper.sendAccountSignUp(
      userObj,
      deceasedName,
      this.formatConfirmEmailLink(userObj.token),
    )
  }

  public static async sendForgotPasswordEmail(
    userObj: IUserModel.Schema,
  ): Promise<{}> {
    return await SendGridHelper.sendForgotEmail(
      userObj,
      this.formatPasswordResetLink(userObj.token),
    )
  }

  public static formatConfirmEmailLink(token: string) {
    return `https://${process.env.EULOGISE_APP_DOMAIN}/register/confirm/?token=${token}`
  }

  public static formatClientCustomerContributorMagicLink(token: string) {
    return `https://${process.env.EULOGISE_APP_DOMAIN}/invite/?token=${token}`
  }

  public static formatPasswordResetLink(token: string) {
    return `https://${process.env.EULOGISE_APP_DOMAIN}/reset-password/?token=${token}`
  }
}
