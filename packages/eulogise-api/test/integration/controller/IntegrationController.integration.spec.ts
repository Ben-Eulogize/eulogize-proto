import expect from 'expect'
import * as uuid from 'uuid'
import { faker } from '@faker-js/faker'
import { IntegrationController } from '../../../src/ts/functions/controller/IntegrationController'
import { MOCK_PASSARE_CASES } from '@eulogise/helpers/dist/Passare.mock'
import {
  EulogiseCountry,
  EulogiseUserRole,
  EulogizeIntegrationCase,
  IImageAssetContent,
  NO_REPLY_EULOGISE_EMAIL,
} from '@eulogise/core'
import { caseModel, clientModel, userModel } from '../../../src/ts/database'

const data: EulogizeIntegrationCase = {
  externalCaseId: 'external-new-case-id',
  deceased: {
    dateOfBirth: -989971200000,
    dateOfDeath: 1595635200000,
    fullName: 'Barbara Stearns',
    gender: 'Female',
    primaryImage: {
      url: 'https://cap.passare.com/stored_file_file/47476001.jpg',
    } as IImageAssetContent,
  },
  service: {
    location: '123 Rose Ave, Chicago, IL',
    serviceStartTime: '13:00:00',
    timeStart: 1724853600000,
  },
  user: { email: undefined, fullName: 'Big G' },
}

describe('IntegrationController', () => {
  const passareCaseId = MOCK_PASSARE_CASES[0].case_uuid
  let clientId: string

  before(async () => {
    const client = await clientModel.create({
      title: 'New Client',
      primaryAddress: ['primary address'],
      additionalAddress: [['additional address']],
      createCaseFamilyInviteOptions: [],
      country: EulogiseCountry.UNITED_STATES,
    })
    clientId = client.id!
  })

  describe('syncByCaseId()', () => {
    it('should fetch case info by case id', async () => {
      await IntegrationController.syncByCaseId({
        externalCaseId: passareCaseId,
        clientId,
      })
    })
  })

  describe('getCreateUserEmail()', () => {
    describe('email is undefined', () => {
      it('should return noreply email', async () => {
        const email = await IntegrationController.getCreateUserEmail(undefined)
        expect(email).toEqual(NO_REPLY_EULOGISE_EMAIL)
      })
    })

    describe('email is defined', () => {
      describe('email already exists in db', () => {
        const existingEmail = 'existing@email.com'
        it('should return noreply email', async () => {
          await userModel.create({
            email: existingEmail,
            verified: true,
            fullName: 'Existing User',
            role: EulogiseUserRole.COEDITOR,
          })
          const email = await IntegrationController.getCreateUserEmail(
            existingEmail,
          )
          expect(email).toEqual(NO_REPLY_EULOGISE_EMAIL)
        })
      })

      describe('email does not exist in db', () => {
        it('should return the passed in email', async () => {
          const fakeEmail = faker.internet.email()
          const email = await IntegrationController.getCreateUserEmail(
            fakeEmail,
          )
          expect(email).toEqual(fakeEmail)
        })
      })
    })
  })

  describe('createCaseByExternalId()', () => {
    describe('client id does not exist', () => {
      const clientId = 'non-exist-client'
      it('should throw an error', async () => {
        await expect(
          IntegrationController.createCaseByExternalId(clientId, data),
        ).rejects.toThrow('Client not found')
      })
    })

    describe('email address has not exist', () => {
      beforeEach(async () => {
        await IntegrationController.createCaseByExternalId(clientId, data)
      })

      it('should create case by external id', async () => {
        const dbCase = await caseModel.findOneByExternalCaseId(
          data.externalCaseId,
        )
        expect(dbCase).toBeDefined()
      })
    })

    describe('email already exists', () => {
      let email: string
      let newCase: any

      beforeEach(async () => {
        email = faker.internet.email()
        await userModel.create({
          email,
          verified: true,
          fullName: 'Existing User',
          role: EulogiseUserRole.COEDITOR,
        })
        newCase = await IntegrationController.createCaseByExternalId(clientId, {
          ...data,
          user: {
            ...data.user,
            email,
          },
        })
      })

      it('should create the case, but using noreply email', async () => {
        const dbUser = await userModel.findById(newCase.customer)
        expect(dbUser.email).toEqual(NO_REPLY_EULOGISE_EMAIL)
      })
    })
  })

  describe('updateCaseByExternalId()', () => {
    const updateDeceasedName = 'Updated Deceased Name'
    const updatedUsername = 'Updated User Name'

    beforeEach(async () => {
      await IntegrationController.createCaseByExternalId(clientId, data)
    })

    beforeEach(async () => {
      await IntegrationController.updateCaseByExternalId({
        ...data,
        user: {
          fullName: updatedUsername,
        },
        deceased: {
          ...data.deceased,
          fullName: updateDeceasedName,
        },
      })
    })

    it('should update the case deceased name and other fields should remain', async () => {
      const dbCase = await caseModel.findOneByExternalCaseId(
        data.externalCaseId,
      )
      expect(dbCase.deceased).toEqual({
        ...data.deceased,
        fullName: updateDeceasedName,
      })

      // user full name should be updated as well
      const dbUser = await userModel.findById(dbCase.customer)
      expect(dbUser.fullName).toEqual(updatedUsername)
    })
  })

  describe('upsertCaseByExternalId()', () => {
    let externalCaseId: string
    beforeEach(async () => {
      externalCaseId = uuid.v4()
      await IntegrationController.upsertCaseByExternalId(clientId, {
        ...data,
        externalCaseId,
      })
    })

    it('should create case by external id', async () => {
      const dbCase = await caseModel.findOneByExternalCaseId(
        data.externalCaseId,
      )
      expect(dbCase).toBeDefined()
    })

    describe('Call again', () => {
      const updateDeceasedName = 'Updated Deceased Name'
      const updatedUsername = 'Updated User Name'

      beforeEach(async () => {
        await IntegrationController.upsertCaseByExternalId(clientId, {
          externalCaseId,
          user: {
            fullName: updatedUsername,
          },
          deceased: {
            fullName: updateDeceasedName,
          },
        } as EulogizeIntegrationCase)
      })

      it('should update the case deceased name and other fields should remain', async () => {
        const dbCase = await caseModel.findOneByExternalCaseId(
          data.externalCaseId,
        )

        // case should be updated
        expect(dbCase.service).toEqual(data.service)
        expect(dbCase.deceased).toEqual({
          ...data.deceased,
          fullName: updateDeceasedName,
        })

        // user full name should be updated as well
        const dbUser = await userModel.findById(dbCase.customer)
        expect(dbUser.fullName).toEqual(updatedUsername)
      })
    })
  })
})
