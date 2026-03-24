import { EulogizePassareIntegration } from '@eulogise/helpers/dist/EulogizePassareIntegration'
import { caseModel, clientModel, userModel } from '../../database'
import * as uuid from 'uuid'
import {
  EulogiseUserRole,
  EulogizeIntegrationCase,
  NO_REPLY_EULOGISE_EMAIL,
} from '@eulogise/core'
import { ICaseModel } from '../../database/types/CaseModel.types'
import { IClientModel } from '../../database/types/ClientModel.types'
import { CaseHelper } from '@eulogise/helpers'

export class IntegrationController {
  public static async syncByCaseId({
    externalCaseId,
    clientId,
  }: {
    externalCaseId: string
    clientId: string
  }) {
    const data = await EulogizePassareIntegration.fetchCaseInfoByCaseId(
      externalCaseId,
    )

    await this.upsertCaseByExternalId(clientId, data)
  }

  public static async upsertCaseByExternalId(
    clientId: string,
    data: EulogizeIntegrationCase,
  ): Promise<ICaseModel.Schema> {
    const eulogizeCase = await caseModel.findOneByExternalCaseId(
      data.externalCaseId,
    )
    // update if case exists
    if (eulogizeCase) {
      return await this.updateCaseByExternalId(data)
    }
    // create case if not exists
    return await this.createCaseByExternalId(clientId, data)
  }

  public static async updateCaseByExternalId(
    data: EulogizeIntegrationCase,
  ): Promise<ICaseModel.Schema> {
    const eulogizeCase = await caseModel.findOneByExternalCaseId(
      data.externalCaseId,
    )
    if (!eulogizeCase) {
      throw new Error('Case not found')
    }
    const updatedCase = await caseModel.update({
      id: eulogizeCase.id,
      deceased: data.deceased,
      service: data.service,
    } as ICaseModel.Schema)

    // update user
    const { user: userData } = data
    await userModel.updateById(updatedCase.customer, {
      fullName: userData.fullName!,
      // ...(userData.email ? { email: userData.email } : {}),
    })
    return updatedCase
  }

  // check if email already exists, if it is use noreply email
  public static async getCreateUserEmail(email?: string) {
    if (email) {
      const user = await userModel.findByEmail(email)
      if (user.length > 0) {
        return NO_REPLY_EULOGISE_EMAIL
      }
      return email
    }
    return NO_REPLY_EULOGISE_EMAIL
  }

  public static async checkClientExists(
    clientId: string,
  ): Promise<IClientModel.Schema> {
    const findClient = await clientModel.findById(clientId)
    if (!findClient) {
      throw new Error('Client not found')
    }
    return findClient
  }

  public static async createCaseByExternalId(
    clientId: string,
    {
      externalCaseId,
      user: userData,
      deceased,
      service,
    }: EulogizeIntegrationCase,
  ): Promise<ICaseModel.Schema> {
    const foundClient = await this.checkClientExists(clientId)

    // check if email already exists, if it is use noreply email
    const email = await this.getCreateUserEmail(userData.email)
    const user = await userModel.create({
      fullName: userData.fullName!,
      email,
      password: await userModel.hashPassword(uuid.v4()),
      verified: true,
      role: EulogiseUserRole.COEDITOR,
    })
    const country = foundClient.country
    const newCase = await caseModel.create({
      country,
      region: CaseHelper.getRegionByCountry({ country }),
      enabledProducts: foundClient.defaultProducts,
      client: clientId,
      customer: user.id,
      deceased,
      service,
      externalCaseId,
    } as ICaseModel.Schema)
    return newCase
  }
}
