import expect from 'expect'
import moment = require('moment')
import { CaseMockService } from '../../mock/CaseMockService'
import { caseModel, clientModel, userModel } from '../../../src/ts/database'
import { EulogiseCountry, EulogiseUserRole } from '@eulogise/core'

describe('CaseModel - Integration', () => {
  let clientResults: any
  let caseResults: any
  const userResults: any = {}
  let cm: any
  let results: any
  const caseMockService = new CaseMockService()

  beforeEach(async () => {
    cm = await clientModel.create({
      title: 'Flamingo Case Integration',
      primaryAddress: ['primary-address-line-1'],
      additionalAddress: [['additional-address-line-1']],
      country: EulogiseCountry.AUSTRALIA,
      createCaseFamilyInviteOptions: ['editor'],
      directors: [],
    })
  })

  const noOfCases = 1

  beforeEach(async () => {
    await caseMockService.createMockItems(noOfCases)
  })

  afterEach(async () => {
    await caseMockService.restore()
  })

  /* Not needed
  describe('create()', () => {
    const deceasedName = 'Deceased Name'
    describe('Deceased fields', () => {
      describe('Without dob & dod', () => {
        beforeEach(async () => {
          results = await caseModel.create({
            status: 'paid',
            deceased: {
              fullName: deceasedName,
            },
          })
        })

        it('case should be created without dod and dod', async () => {
          const case1 = await caseModel.findById(results.id)
          expect(case1.deceased).toEqual({
            fullName: deceasedName,
          })
        })
      })

      describe('With dob & dod', () => {
        const dateOfBirthDisplay = '2025-04-23'
        const dateOfDeathDisplay = '2025-04-24'
        const dateOfBirth = moment(dateOfBirthDisplay).toDate().getTime()
        const dateOfDeath = moment(dateOfDeathDisplay).toDate().getTime()

        beforeEach(async () => {
          results = await caseModel.create({
            status: 'paid',
            deceased: {
              fullName: deceasedName,
              dateOfBirth,
              dateOfDeath,
            },
          })
        })

        it('case should be created with dod and dod and also display values', async () => {
          const case1 = await caseModel.findById(results.id)
          expect(case1.deceased).toEqual({
            fullName: deceasedName,
            dateOfBirth,
            dateOfDeath,
            dateOfBirthDisplay,
            dateOfDeathDisplay,
          })
        })
      })
    })

    describe('Service', () => {
      const location = 'somewhere'
      describe('without timeStart', () => {
        beforeEach(async () => {
          results = await caseModel.create({
            status: 'paid',
            service: {
              location,
            },
          })
        })

        it('case should be created without timeStart', async () => {
          const case1 = await caseModel.findById(results.id)
          expect(case1.service).toEqual({
            location,
          })
        })
      })

      describe('with timeStart', () => {
        const timeStart = '2025-04-23'
        beforeEach(async () => {
          results = await caseModel.create({
            status: 'paid',
            service: {
              location,
              timeStart: moment(timeStart).toDate().getTime(),
            },
          })
        })

        it('case should be created with timeStart and timeStartDisplay', async () => {
          const case1 = await caseModel.findById(results.id)
          expect(case1.service).toEqual({
            location,
            timeStart: moment(timeStart).toDate().getTime(),
            timeStartDisplay: timeStart,
          })
        })
      })
    })
  })

  describe('update()', () => {
    const deceasedName = 'Deceased Name'
    beforeEach(async () => {
      results = await caseModel.create({
        status: 'paid',
        deceased: {
          fullName: deceasedName,
        },
      })
    })

    describe('Deceased fields', () => {
      describe('without dob & dod', () => {
        beforeEach(async () => {
          results = await caseModel.update(
            // @ts-ignore
            {
              id: results.id,
              deceased: {
                fullName: deceasedName,
              },
            },
          )
        })

        it('case should be updated without dod and dod', async () => {
          const case1 = await caseModel.findById(results.id)
          expect(case1.deceased).toEqual({
            fullName: deceasedName,
          })
        })
      })

      describe('with dod & dob', () => {
        const dateOfBirthDisplay = '2025-04-23'
        const dateOfDeathDisplay = '2025-04-24'
        const dateOfBirth = moment(dateOfBirthDisplay).toDate().getTime()
        const dateOfDeath = moment(dateOfDeathDisplay).toDate().getTime()

        beforeEach(async () => {
          results = await caseModel.update(
            // @ts-ignore
            {
              id: results.id,
              deceased: {
                fullName: deceasedName,
                dateOfBirth,
                dateOfDeath,
              },
            },
          )
        })

        it('case should be updated with dod and dod and also display values', async () => {
          const case1 = await caseModel.findById(results.id)
          expect(case1.deceased).toEqual({
            fullName: deceasedName,
            dateOfBirth,
            dateOfDeath,
            dateOfBirthDisplay,
            dateOfDeathDisplay,
          })
        })
      })
    })

    describe('Service fields', () => {
      const location = 'somewhere'
      describe('without timeStart', () => {
        beforeEach(async () => {
          results = await caseModel.update(
            // @ts-ignore
            {
              id: results.id,
              service: {
                location,
              },
            },
          )
        })

        it('case should be updated without timeStart', async () => {
          const case1 = await caseModel.findById(results.id)
          expect(case1.service).toEqual({
            location,
          })
        })
      })

      describe('with timeStart', () => {
        const timeStart = '2025-04-23'
        beforeEach(async () => {
          results = await caseModel.update(
            // @ts-ignore
            {
              id: results.id,
              service: {
                location,
                timeStart: moment(timeStart).toDate().getTime(),
              },
            },
          )
        })

        it('case should be updated with timeStart and timeStartDisplay', async () => {
          const case1 = await caseModel.findById(results.id)
          expect(case1.service).toEqual({
            location,
            timeStart: moment(timeStart).toDate().getTime(),
            timeStartDisplay: timeStart,
          })
        })
      })
    })
  })
*/

  describe('findByDateRange()', () => {
    beforeEach(async () => {
      const from = moment().subtract(1, 'months').toDate()
      const to = moment().toDate()
      results = await caseModel.findByDateRange({
        from,
        to,
      })
    })

    it('should return a user', () => {
      expect(results.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('markHasImageById', () => {
    it('should return hasImage to true', async () => {
      const [case1] = caseMockService.getMockItems()

      // should be false by default
      expect(case1.hasImages).toEqual(false)

      await caseModel.markHasImageById(case1.id!)
      results = await caseModel.findById(case1.id!)

      // should be updated to true
      expect(results.hasImages).toEqual(true)
    })
  })

  describe('findOneByExternalCaseId', () => {
    beforeEach(async () => {
      const [case1] = caseMockService.getMockItems()
      results = await caseModel.findOneByExternalCaseId(case1.externalCaseId)
    })

    it('should return a user', () => {
      console.log('results', results)
      expect(results.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('findByCustomerId', () => {
    beforeEach(async () => {
      const [case1] = caseMockService.getMockItems()
      results = await caseModel.findByCustomerId(case1.customer)
    })

    it('should return a user', () => {
      expect(results.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('findOneByCustomerId', () => {
    let expectedCaseId: string
    beforeEach(async () => {
      const [case1] = caseMockService.getMockItems()
      expectedCaseId = case1.id!
      results = await caseModel.findOneByCustomerId(case1.customer)
    })

    it('should return a user', () => {
      expect(results.id).toEqual(expectedCaseId)
    })
  })

  describe('getAll()', () => {
    beforeEach(async () => {
      results = await caseModel.getAll()
    })

    it('should return all cases', () => {
      expect(results.length).toBeGreaterThanOrEqual(noOfCases)
    })
  })

  describe('getAllCasesByClientId()', () => {
    beforeEach(async () => {
      const clientId = caseMockService.getMockItems()[0].client!
      console.log('getAllCasesByClientId', clientId)
      results = await caseModel.getAllCasesByClientId(clientId)
    })

    it('should return cases for client id', () => {
      console.log('JSON', JSON.stringify(results))
      expect(results.length).toEqual(1)
    })
  })

  describe('case query', () => {
    const email1 = 'test1@wildpalms.com.au'
    const email2 = 'test2@wildpalms.com.au'
    beforeEach(async () => {
      const user = await userModel.create({
        email: email1,
        fullName: email1,
        role: EulogiseUserRole.CUSTOMER,
        verified: true,
      })
      await userModel.create({
        email: email2,
        fullName: email2,
        role: EulogiseUserRole.CUSTOMER,
        verified: true,
      })
      await clientModel.getModel().update(
        { id: cm.id },
        {
          // @ts-ignore
          $SET: {
            users: new Set([user.id]),
          },
        },
      )
    })

    beforeEach(async () => {
      clientResults = await clientModel.query('')
      const users = await userModel.query('')
      users.forEach((ur) => {
        userResults[ur.email] = ur
      })
    })

    it('should return correct client and user results', () => {
      const { users, createdAt, updatedAt, id, ...expected } = clientResults[0]
      expect(expected).toEqual({
        primaryAddress: ['some where'],
        additionalAddress: [''],
        directors: [],
        title: 'Flamingo Case Integration',
      })
      expect(id).toBeDefined()
      expect(users[0]).toBeDefined()
    })

    describe('case creation', () => {
      beforeEach(async () => {
        const { id: clientId, users } = clientResults[0]
        const { id, fullName } = userResults[email1]
        const { id: id2, fullName: fullName2 } = userResults[email2]
        await caseModel.create({
          inviteEmail: {
            content: '',
            greeting: '',
            image: {
              filestackHandle: '',
              filepath: '',
              url: '',
            },
          },
          status: 'paid',
          client: clientId,
          customer: id,
          funeralDirector: users[0],
          deceased: {
            fullName,
          },
          service: {
            timeStart: Number(moment().format('x')),
            serviceStartTime: moment().format(),
          },
        })
        await caseModel.create({
          inviteEmail: {
            content: '',
            greeting: '',
            image: {
              filestackHandle: '',
              filepath: '',
              url: '',
            },
          },
          status: 'paid',
          client: clientId,
          customer: id2,
          funeralDirector: users[0],
          deceased: {
            fullName: fullName2,
          },
          service: {
            timeStart: Number(moment().format('x')),
            serviceStartTime: moment().format(),
          },
        })
        await caseModel.create({
          inviteEmail: {
            content: '',
            greeting: '',
            image: {
              filestackHandle: '',
              filepath: '',
              url: '',
            },
          },
          status: 'paid',
          client: clientId,
          customer: id2,
          funeralDirector: users[0],
          deceased: {
            fullName: fullName2,
          },
          service: {
            timeStart: Number(moment().format('x')),
            serviceStartTime: moment().format(),
          },
        })
      })

      describe('Case findAllWithPopulatedCustomer', () => {
        beforeEach(async () => {
          caseResults = await caseModel.findAllWithPopulatedCustomer({
            customer: userResults[email1].id,
          })
        })

        it('should return correct case results', () => {
          const {
            id,
            editors,
            customer,
            funeralDirector,
            createdAt,
            updatedAt,
            service,
            ...expected
          } = caseResults[0]
          const { fullName: UserFullName } = userResults[email1]
          const { id: clientId } = clientResults[0]
          const { id: customerId, ...customerInfo } = caseResults[0].customer
          expect(customerId).toBeDefined()
          expect(customerInfo).toEqual({
            city: undefined,
            email: email1,
            firstStreetAddress: undefined,
            fullName: email1,
            phone: undefined,
            postcode: undefined,
            secondStreetAddress: undefined,
            state: undefined,
          })
          expect(caseResults.length).toEqual(1)
          expect(id).toBeDefined()
          expect(customer).toBeDefined()
          expect(funeralDirector).toBeDefined()
          expect(createdAt).toBeDefined()
          expect(updatedAt).toBeDefined()
          expect(service).toBeDefined()
          expect(expected).toEqual({
            inviteEmail: {
              content: '',
              greeting: '',
              image: {
                filestackHandle: '',
                filepath: '',
                url: '',
              },
            },
            status: 'paid',
            client: clientId,
            deceased: {
              fullName: UserFullName,
            },
          })
        })
      })
    })
  })
})
