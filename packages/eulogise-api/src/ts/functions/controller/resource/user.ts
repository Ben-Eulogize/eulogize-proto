import { Lambdur } from 'lambdur'
import * as uuid from 'uuid'

import * as Errors from '../../error'
import moment from 'moment'
import { Webtoken } from '../../../webtoken'
import { clientCaseOwnerOnly } from '../../../utils/accessControl'
import { CaseResourceController } from './case'
import { IUserModel } from '../../../database/types/UserModel.types'
import { userModel } from '../../../database'
import {
  EulogiseCountry,
  EulogiseUserRole,
  NO_REPLY_EULOGISE_EMAIL,
} from '@eulogise/core'
import { UpsertNewCasePayload } from '../../handler/v2/routes/externalRoutes/case'
import { CaseHelper } from '@eulogise/helpers'
import { InviteResourceController } from './invite'
import { IInviteModel } from '../../../database/types/InviteModel.types'
import { isDefined } from '../../../utils/typeGuards'

export class UserResourceController {
  public static async findByUserIds(
    userIds: Array<string>,
  ): Promise<IUserModel.Model[]> {
    return await userModel.batchGetByIds(userIds)
  }

  public static async findByUserId(userId: string): Promise<IUserModel.Model> {
    return await userModel.findById(userId)
  }

  public static async find({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    console.log('find user', { accountObj, search })
    switch (accountObj.role) {
      case EulogiseUserRole.CLIENT:
        if (search.email) {
          return UserResourceController.findAsClient({ accountObj, search })
        }
        return clientCaseOwnerOnly(
          UserResourceController.findAsClient,
          'users',
        )({ accountObj, search })
      case EulogiseUserRole.ADMIN:
        return UserResourceController.findAsAdmin({ accountObj, search })
      default:
        throw new Lambdur.Error(Errors.resource.find.notAllowed('user'))
    }
  }

  public static async findAsClient({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const findQuery = {
      ...search,
    }

    const userObjArr = await userModel.query(findQuery)

    return (Array.isArray(userObjArr) ? userObjArr : [userObjArr]).map(
      (userObj) => userModel.scope('public', userObj),
    )
  }

  public static async findAsAdmin({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const userObjArr = await userModel.getAll({ cache: true })

    return (Array.isArray(userObjArr) ? userObjArr : [userObjArr]).map(
      (userObj) => userModel.scope('public', userObj),
    )
  }

  public static async save({
    accountObj,
    userObj,
  }: {
    accountObj: Webtoken.Payload.Account
    userObj: IUserModel.Schema
  }): Promise<any> {
    console.log('save user', accountObj, userObj)
    switch (accountObj.role) {
      case 'admin':
        return UserResourceController.saveAsAdmin({ accountObj, userObj })
      case 'client':
        return UserResourceController.saveAsClient({ accountObj, userObj })
      default:
        throw new Lambdur.Error(Errors.resource.save.notAllowed('user'))
    }
  }

  public static async saveAsAdmin({
    accountObj,
    userObj,
  }: {
    accountObj: Webtoken.Payload.Account
    userObj: IUserModel.Schema
  }): Promise<any> {
    const saveQuery: IUserModel.Schema = {
      ...userObj,
    }

    return userModel.save(saveQuery)
  }

  // TODO: need to update
  public static async saveAsClient({
    accountObj,
    userObj,
  }: {
    accountObj: Webtoken.Payload.Account
    userObj: IUserModel.Schema
  }): Promise<any> {
    const saveQuery: IUserModel.Schema = {
      ...userObj,
    }

    return userModel.save(saveQuery)
  }

  public static async remove({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    switch (accountObj.role) {
      case 'admin':
        return UserResourceController.removeAsAdmin({ accountObj, search })
      default:
        throw new Lambdur.Error(Errors.resource.remove.notAllowed('user'))
    }
  }

  public static async removeAsAdmin({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const removeQuery = {
      ...search,
    }

    return userModel.remove(removeQuery)
  }

  public static async shadowToken(userId: string): Promise<string> {
    const userObj = await userModel.findById(userId)

    if (!userObj?.shadowToken) {
      const updatedUserObj = await userModel.save({
        ...userObj,
        shadowToken: uuid.v4(),
      })

      return updatedUserObj.shadowToken!
    }
    return userObj?.shadowToken
  }

  public static async checkClientAdminId(client: any, adminId: string) {
    const { users = [] } = client
    const clientAdminId = Array.from(users).filter(
      (userId: string) => userId === adminId,
    )[0]
    if (!clientAdminId) {
      throw new Error('No client Admin in found client!')
    }
  }

  // API designed for external integration use
  public static async createUserAndCaseByClientArrangerId(
    apiKey: string,
    client: any,
    arrangerId: string,
    requestData: UpsertNewCasePayload,
  ): Promise<{
    token: string
    caseId: string
    userId: string
  } | null> {
    const {
      familyFirstAndLastName,
      email,
      deceasedName,
      dateOfBirth,
      dateOfDeath,
      title,
      suffix,
      nickName,
      education,
      occupation,
      militaryServiceBranch,
      militaryServiceRank,
      militaryServiceDateEntered,
      militaryServiceDateDischarged,
      militaryServiceNotes,
      spouseName,
      childrenNames,
      fathersName,
      mothersName,
      obituary,
      serviceDate,
      serviceAddress,
      serviceLocation,
      viewingLocation,
      viewingAddress,
      viewingDate,
      viewingTime,
      wakeLocation,
      wakeAddrfess,
      wakeDate,
      wakeTime,
      serviceConductedBy,
      serviceNotes,
      pallbearers,
      placeOfDisposition,
      serviceStartTime,
      enabledProducts,
      status,
      newUserRole,
      newInviteRole,
    } = requestData

    if (!email || !familyFirstAndLastName) {
      throw new Lambdur.Error(
        Errors.externalAPIErrors.create.invalidParameter(),
      )
    }

    if (!arrangerId) {
      throw new Lambdur.Error(
        Errors.externalAPIErrors.create.arrangerIdMissing(),
      )
    }

    const { id: ClientId } = client

    let user

    try {
      if (email === NO_REPLY_EULOGISE_EMAIL) {
        user = await userModel.findOne({ email: NO_REPLY_EULOGISE_EMAIL })
      } else {
        user = await userModel.create({
          fullName: familyFirstAndLastName,
          password: await userModel.hashPassword(uuid.v4()), // auto gen password and make it very hard to break
          email,
          verified: true,
          role: newUserRole,
        })
      }

      if (!user?.id) {
        throw new Lambdur.Error(
          Errors.externalAPIErrors.create.failedToCreateNewUser(),
        )
      }

      const militaryService = {
        ...(isDefined(militaryServiceBranch) && {
          branch: militaryServiceBranch,
        }),
        ...(isDefined(militaryServiceRank) && {
          rank: militaryServiceRank,
        }),
        ...(isDefined(militaryServiceDateEntered) && {
          dateEntered: militaryServiceDateEntered,
        }),
        ...(militaryServiceDateEntered && {
          dateEnteredDisplay: moment(
            militaryServiceDateEntered,
            'YYYY-MM-DD',
          ).valueOf(),
        }),
        ...(isDefined(militaryServiceDateDischarged) && {
          dateDischarged: militaryServiceDateDischarged,
        }),
        ...(militaryServiceDateDischarged && {
          dateDischargedDisplay: moment(
            militaryServiceDateDischarged,
            'YYYY-MM-DD',
          ).valueOf(),
        }),
        ...(isDefined(militaryServiceNotes) && {
          notes: militaryServiceNotes,
        }),
      }

      const familyDetails = {
        ...(isDefined(spouseName) && { spouseName }),
        ...(isDefined(childrenNames) && {
          childrenNames,
        }),
        ...(isDefined(fathersName) && { fathersName }),
        ...(isDefined(mothersName) && { mothersName }),
      }

      const service = {
        ...(isDefined(serviceAddress) && { serviceAddress }),
        ...(isDefined(serviceLocation) && { serviceLocation }),
        ...(isDefined(viewingLocation) && {
          viewingLocation,
        }),
        ...(isDefined(viewingAddress) && {
          viewingAddress,
        }),
        ...(isDefined(viewingDate) && { viewingDate }),
        ...(viewingDate && {
          viewingDateDisplay: moment(viewingDate, 'YYYY-MM-DD').valueOf(),
        }),
        ...(isDefined(viewingTime) && {
          viewingTime,
        }),
        ...(isDefined(wakeLocation) && { wakeLocation }),
        ...(isDefined(wakeAddrfess) && {
          wakeAddrfess,
        }),
        ...(isDefined(wakeDate) && { wakeDate }),
        ...(wakeDate && {
          wakeDateDisplay: moment(wakeDate, 'YYYY-MM-DD').valueOf(),
        }),
        ...(isDefined(wakeTime) && { wakeTime }),
        ...(isDefined(serviceConductedBy) && {
          serviceConductedBy,
        }),
        ...(isDefined(serviceNotes) && { serviceNotes }),
        ...(isDefined(pallbearers) && { pallbearers }),
        ...(isDefined(placeOfDisposition) && {
          placeOfDisposition,
        }),
        ...(serviceStartTime && { serviceStartTime }),
        ...(serviceDate && {
          timeStart: moment(serviceDate, 'YYYY-MM-DD').valueOf(),
          timeStartDisplay: serviceDate,
        }),
      }

      const newCase = await CaseResourceController.createClientCase({
        client: ClientId,
        funeralDirector: arrangerId,
        customer: user.id,
        deceased: {
          fullName: deceasedName,
          ...(isDefined(title) && { title }),
          ...(isDefined(suffix) && { suffix }),
          ...(isDefined(nickName) && { nickName }),
          ...(isDefined(education) && { education }),
          ...(isDefined(occupation) && {
            occupation,
          }),
          ...(Object.keys(militaryService).length > 0 && {
            militaryService,
          }),
          ...(dateOfBirth && {
            dateOfBirth: moment(dateOfBirth, 'YYYY-MM-DD').valueOf(),
          }),
          dateOfBirthDisplay: dateOfBirth,
          ...(dateOfDeath && {
            dateOfDeath: moment(dateOfDeath, 'YYYY-MM-DD').valueOf(),
          }),
          dateOfDeathDisplay: dateOfDeath,
        },
        ...(Object.keys(familyDetails).length > 0 && { familyDetails }),
        ...(isDefined(obituary) && { obituary }),
        service,
        country: client?.country ?? EulogiseCountry.AUSTRALIA,
        region: CaseHelper.getRegionByCountry({ country: client?.country }),
        enabledProducts,
        createdByAPIKey: apiKey,
        status,
      })

      const inviteObj = {
        client: ClientId,
        case: newCase?.id,
        fullName: familyFirstAndLastName,
        email,
        status: email === NO_REPLY_EULOGISE_EMAIL ? 'sent' : 'pending',
        role: newInviteRole,
      } as IInviteModel.Schema

      let inviteRecordResult

      if (email === NO_REPLY_EULOGISE_EMAIL) {
        return null
      } else {
        inviteRecordResult =
          await InviteResourceController.saveInviteAsExternalAPI({
            invitorUserId: arrangerId,
            inviteObj,
            isShouldSendEmail: true,
          })
      }

      let token = ''
      if (newInviteRole === EulogiseUserRole.CONTRIBUTOR) {
        if (inviteRecordResult?.token) {
          // token = AccountController.formatClientCustomerContributorMagicLink(token)
          token = inviteRecordResult?.token
        } else {
          throw new Lambdur.Error(
            Errors.externalAPIErrors.create.invalidInviteToken(),
          )
        }
      } else {
        token = await UserResourceController.shadowToken(user.id!)
      }

      return {
        token,
        caseId: newCase.id!,
        userId: user.id!,
      }
    } catch (error) {
      console.log('createUserAndCaseByClientArrangerId error', {
        client,
        arrangerId,
        requestData,
        error,
      })
      throw new Lambdur.Error(Errors.externalAPIErrors.create.internalError())
    }
  }
}
