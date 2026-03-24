import expect from 'expect'
import { bookletModel, caseModel, userModel } from '../../../src/ts/database'
import { CaseResourceController } from '../../../src/ts/functions/controller'
import { CaseMockService } from '../../mock/CaseMockService'
import { MemorialProductMockService } from '../../mock/MemorialProductMockService'
import {
  EulogiseCountry,
  EulogiseProduct,
  EulogiseUserRole,
  MemorialVisualStatus,
} from '@eulogise/core'
import { ICaseModel } from '../../../src/ts/database/types/CaseModel.types'
import { Lambdur } from 'lambdur'

describe('CaseResourceController - Unit Tests', () => {
  describe('validateCountry()', () => {
    it('should not throw an error for valid countries', () => {
      expect(() => {
        CaseResourceController.validateCountry(EulogiseCountry.AUSTRALIA)
      }).not.toThrow()

      expect(() => {
        CaseResourceController.validateCountry(EulogiseCountry.UNITED_STATES)
      }).not.toThrow()

      expect(() => {
        CaseResourceController.validateCountry(EulogiseCountry.CANADA)
      }).not.toThrow()

      expect(() => {
        CaseResourceController.validateCountry(EulogiseCountry.UNITED_KINGDOM)
      }).not.toThrow()

      expect(() => {
        CaseResourceController.validateCountry(EulogiseCountry.NEW_ZEALAND)
      }).not.toThrow()
    })

    it('should not throw an error when country is undefined', () => {
      expect(() => {
        CaseResourceController.validateCountry(undefined)
      }).not.toThrow()
    })

    it('should not throw an error when country is empty string', () => {
      expect(() => {
        CaseResourceController.validateCountry('')
      }).not.toThrow()
    })

    it('should throw Lambdur.Error for invalid countries', () => {
      expect(() => {
        CaseResourceController.validateCountry('Invalid Country')
      }).toThrow(Lambdur.Error)

      expect(() => {
        CaseResourceController.validateCountry('Germany')
      }).toThrow(Lambdur.Error)

      expect(() => {
        CaseResourceController.validateCountry('Japan')
      }).toThrow(Lambdur.Error)
    })

    it('should throw error with correct error structure for invalid country', () => {
      try {
        CaseResourceController.validateCountry('Invalid Country')
        // Should not reach this line
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Lambdur.Error)
        expect(error.options.id).toBe('1a2b3c23')
        expect(error.options.statusCode).toBe(400)
        expect(error.options.message).toBe(
          'Invalid country field input, please check again',
        )
      }
    })

    it('should validate all acceptable countries from EulogiseCountry enum', () => {
      const acceptableCountries = [
        EulogiseCountry.AUSTRALIA,
        EulogiseCountry.CANADA,
        EulogiseCountry.EUROPEAN_UNION,
        EulogiseCountry.UNITED_KINGDOM,
        EulogiseCountry.UNITED_STATES,
        EulogiseCountry.CHILE,
        EulogiseCountry.COLOMBIA,
        EulogiseCountry.COSTA_RICA,
        EulogiseCountry.MEXICO,
        EulogiseCountry.NEW_ZEALAND,
        EulogiseCountry.PANAMA,
        EulogiseCountry.GUATEMALA,
        EulogiseCountry.THE_DOMINICAN_REPUBLIC,
        EulogiseCountry.THE_PHILIPPINES,
        EulogiseCountry.REST_OF_THE_WOLRD,
      ]

      acceptableCountries.forEach((country) => {
        expect(() => {
          CaseResourceController.validateCountry(country)
        }).not.toThrow()
      })
    })
  })
})

describe('CaseResourceController - Integration', () => {
  const deceasedFullName = 'Deceased Name'

  const customer1Email = 'customer1@email.com'
  const customer1FullName = 'customer full name 1'

  let customer1: any
  let error: any

  const caseStatus: any = 'paid'

  let results: any
  const mockCaseService = new CaseMockService()
  const mockBookletService = new MemorialProductMockService(bookletModel)

  describe('getProductByInviteRole()', () => {
    it('should be correct', () => {
      expect(
        CaseResourceController.getProductByInviteRole(
          EulogiseUserRole.VISITOR_BOOKLET,
        ),
      ).toEqual(EulogiseProduct.BOOKLET)
      expect(
        CaseResourceController.getProductByInviteRole(
          EulogiseUserRole.VISITOR_BOOKMARK,
        ),
      ).toEqual(EulogiseProduct.BOOKMARK)
      expect(
        CaseResourceController.getProductByInviteRole(
          EulogiseUserRole.VISITOR_SLIDESHOW,
        ),
      ).toEqual(EulogiseProduct.SLIDESHOW)
      expect(
        CaseResourceController.getProductByInviteRole(
          EulogiseUserRole.VISITOR_SIDED_CARD,
        ),
      ).toEqual(EulogiseProduct.SIDED_CARD)
      expect(
        CaseResourceController.getProductByInviteRole(
          EulogiseUserRole.VISITOR_THANKYOUCARD,
        ),
      ).toEqual(EulogiseProduct.THANK_YOU_CARD)
    })
  })

  describe('updateProductStatusIfNeeded()', () => {
    describe('newStatus with higher level (initial status: THEME_SELECTED, new status: EDITED)', () => {
      let case1: ICaseModel.Model
      const fromStatus = MemorialVisualStatus.THEME_SELECTED
      const toStatus = MemorialVisualStatus.EDITED

      beforeEach(async () => {
        case1 = await mockCaseService.createMockItem()
        await mockBookletService.createMockItem(case1.id, {
          status: fromStatus,
        })
        await CaseResourceController.updateProductStatusIfNeeded(
          case1.id!,
          EulogiseProduct.BOOKLET,
          toStatus,
        )
      })

      it('should be updated to EDITED', async () => {
        const updatedBooklet = await bookletModel.getActiveProductByCaseId(
          case1.id!,
        )
        expect(updatedBooklet?.status).toEqual(toStatus)
      })
    })

    describe('newStatus with lower level (initial status: COMPLETE, new status: EDITED)', () => {
      let case1: ICaseModel.Model
      const fromStatus = MemorialVisualStatus.COMPLETE
      const toStatus = MemorialVisualStatus.EDITED

      beforeEach(async () => {
        case1 = await mockCaseService.createMockItem()
        await mockBookletService.createMockItem(case1.id, {
          status: fromStatus,
        })
        await CaseResourceController.updateProductStatusIfNeeded(
          case1.id!,
          EulogiseProduct.BOOKLET,
          toStatus,
        )
      })

      it('should remain to COMPLETE', async () => {
        const updatedBooklet = await bookletModel.getActiveProductByCaseId(
          case1.id!,
        )
        expect(updatedBooklet?.status).toEqual(fromStatus)
      })
    })
  })

  beforeEach(async () => {
    customer1 = await userModel.create({
      email: customer1Email,
      fullName: customer1FullName,
      role: EulogiseUserRole.CUSTOMER,
      verified: true,
    })
    await caseModel.create({
      customer: customer1.id,
      inviteEmail: {
        content: '',
        image: {
          filestackHandle: '',
          url: '',
          filepath: '',
        },
        greeting: '',
      },
      status: caseStatus,
    })
  })

  afterEach(() => {
    error = undefined
  })

  describe('updateByCustomerId()', () => {
    describe('without a customer id', () => {
      beforeEach(async () => {
        try {
          results = await CaseResourceController.updateByCustomerId(
            undefined!,
            {
              deceased: {
                fullName: deceasedFullName,
              },
            },
          )
        } catch (ex) {
          error = ex
        }
      })

      it('should throw an "Customer ID" is required" error', () => {
        expect(error.message).toEqual('"Customer ID" is required')
      })
    })

    describe('customer id not associated with any cases', () => {
      beforeEach(async () => {
        try {
          results = await CaseResourceController.updateByCustomerId(
            'not-exist',
            {
              deceased: {
                fullName: deceasedFullName,
              },
            },
          )
        } catch (ex) {
          error = ex
        }
      })

      it('should throw "Case not found" exception', () => {
        expect(error.message).toEqual('Case not found')
      })
    })

    describe('with a customer id', () => {
      const newDeceasedFullName: string = 'new deceased full name'
      beforeEach(async () => {
        try {
          results = await CaseResourceController.updateByCustomerId(
            customer1.id,
            {
              deceased: {
                fullName: newDeceasedFullName,
              },
            },
          )
        } catch (ex) {
          error = ex
        }
      })

      it('should not throw any errors', () => {
        expect(error).toBeUndefined()
      })

      describe('Check database', () => {
        beforeEach(async () => {
          results = await caseModel.findOne({ customer: customer1.id })
        })

        describe('Case', () => {
          describe('Other fields', () => {
            it('should not be updated', () => {
              expect(results.customer.id).toEqual(customer1.id)
              expect(results.status).toEqual(caseStatus)
            })
          })

          describe('Decease full name', () => {
            it('should be updated', () => {
              expect(results.deceased.fullName).toEqual(newDeceasedFullName)
            })
          })
        })
      })
    })
  })
})
