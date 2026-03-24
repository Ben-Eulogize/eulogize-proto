import expect from 'expect'
import { backgroundImageModel } from '../../../src/ts/database'
import {
  MOCK_BACKGROUND_IMAGE_CLIENT_CUSTOMER_SPECIFIC_DATA_1,
  MOCK_BACKGROUND_IMAGE_CLIENT_PUBLIC_DATA_1,
  MOCK_BACKGROUND_IMAGE_CUSTOMER_DATA_1,
  MOCK_BACKGROUND_IMAGE_DATA_1,
} from './mock/mockBackgroundImage'
import { BackgroundRestrictions } from '@eulogise/core'
import { IBackgroundImageModel } from '../../../src/ts/database/types/BackgroundImageModel.types'

describe('BackgroundImageModel', () => {
  let results: any
  let backgroundImageId: string

  const mockBackgroundImage = MOCK_BACKGROUND_IMAGE_DATA_1
  const mockPublicClientBackgroundImage =
    MOCK_BACKGROUND_IMAGE_CLIENT_PUBLIC_DATA_1
  const mockPrivateClientCustomerBackgroundImage =
    MOCK_BACKGROUND_IMAGE_CLIENT_CUSTOMER_SPECIFIC_DATA_1
  const mockPrivateCustomerBackgroundImage =
    MOCK_BACKGROUND_IMAGE_CUSTOMER_DATA_1
  const mockCustomerBackgroundImage = MOCK_BACKGROUND_IMAGE_CUSTOMER_DATA_1

  beforeEach(async () => {
    console.log('Mock Background Images', mockBackgroundImage)
    results = await backgroundImageModel.create(mockBackgroundImage)
    await backgroundImageModel.create(mockPublicClientBackgroundImage)
    await backgroundImageModel.create(mockPrivateClientCustomerBackgroundImage)
    await backgroundImageModel.create(mockPrivateCustomerBackgroundImage)
    await backgroundImageModel.create(mockCustomerBackgroundImage)
    backgroundImageId = results.id
  })

  describe('create', () => {
    it('should create the background image and return the background image with id', () => {
      expect(results).toEqual({
        ...mockBackgroundImage,
        id: expect.anything(),
        status: 'draft',
        updatedAt: expect.anything(),
        createdAt: expect.anything(),
      })
    })
  })

  describe('getAll', () => {
    beforeEach(async () => {
      results = await backgroundImageModel.getAll()
    })

    it('should return all background images', () => {
      console.log('Length', results.length)
      // global images, client background images, customer background images
      expect(results.length).toBeGreaterThan(3)
    })
  })

  describe('getAllGlobal', () => {
    beforeEach(async () => {
      results = await backgroundImageModel.getAllGlobal()
    })

    it('should return all global background images', () => {
      for (const result of results) {
        expect(result.clientId).toBeUndefined()
        expect(result.customerId).toBeUndefined()
      }
    })
  })

  describe('getAllByClientId', () => {
    const clientId = mockPublicClientBackgroundImage.clientId!
    describe('without customerId', () => {
      beforeEach(async () => {
        results = await backgroundImageModel.getAllByClientId(clientId)
      })

      it('should return all global background images and client background images', () => {
        // make sure there is at least one client background image
        expect(
          results.filter(
            (i: IBackgroundImageModel.Schema) =>
              i.restrictions === BackgroundRestrictions.CLIENT_BASE,
          ).length,
        ).toBeGreaterThan(0)

        expect(
          results.filter((i: IBackgroundImageModel.Schema) => i.customerId)
            .length,
        ).toEqual(0)

        for (const result of results) {
          if (result.restrictions === BackgroundRestrictions.CLIENT_BASE) {
            // clients background images
            expect(result.clientId).toEqual(clientId)
          } else {
            // global background images
            expect(result.clientId).toBeUndefined()
            expect(result.customerId).toBeUndefined()
          }
        }
      })
    })

    describe('with customerId', () => {
      const customerId = mockPrivateClientCustomerBackgroundImage.customerId
      beforeEach(async () => {
        results = await backgroundImageModel.getAllByClientId(
          clientId,
          customerId,
        )
      })

      it('should return all global background images, shared client background and customer background images', async () => {
        expect(results.length).toBeGreaterThanOrEqual(3)

        // make sure there is at least one client background image
        expect(
          results.filter(
            (i: IBackgroundImageModel.Schema) =>
              i.restrictions === BackgroundRestrictions.CLIENT_BASE,
          ).length,
        ).toBeGreaterThan(0)

        // make sure there is at least one customer background image
        expect(
          results.filter(
            (i: IBackgroundImageModel.Schema) =>
              i.restrictions === BackgroundRestrictions.CUSTOMER_BASE,
          ).length,
        ).toBeGreaterThan(0)

        for (const result of results) {
          if (result.restrictions === BackgroundRestrictions.CLIENT_BASE) {
            // clients background images
            expect(result.clientId).toEqual(clientId)
          } else if (
            result.restrictions === BackgroundRestrictions.CUSTOMER_BASE
          ) {
            // customers background images
            expect(result.clientId).toEqual(clientId)
            expect(result.customerId).toEqual(customerId)
          } else {
            // global background images
            expect(result.clientId).toBeUndefined()
            expect(result.customerId).toBeUndefined()
          }
        }
      })
    })
  })

  describe('getAllPublicByClientId', () => {
    const clientId = mockPublicClientBackgroundImage.clientId!
    beforeEach(async () => {
      results = await backgroundImageModel.getAllPublicByClientId(clientId)
    })

    it('should return public client background images', () => {
      expect(results.length).toBeGreaterThan(1)
      for (const result of results) {
        expect(result.clientId).toEqual(clientId)
        expect(result.restrictions).toEqual(BackgroundRestrictions.CLIENT_BASE)
      }
    })
  })

  describe('getAllByCustomerId', () => {
    const customerId = mockCustomerBackgroundImage.customerId!
    describe('without client id', () => {
      beforeEach(async () => {
        results = await backgroundImageModel.getAllByCustomerId(customerId)
      })

      it('should return all global background images and customer background images', async () => {
        expect(results.length).toBeGreaterThanOrEqual(2)
        for (const result of results) {
          if (result.customerId) {
            // customers background images
            expect(result.clientId).toBeUndefined()
            expect(result.customerId).toEqual(customerId)
          } else {
            // global background images
            expect(result.clientId).toBeUndefined()
            expect(result.customerId).toBeUndefined()
          }
        }
      })
    })

    describe('with client id', () => {
      const clientId = mockPublicClientBackgroundImage.clientId
      beforeEach(async () => {
        results = await backgroundImageModel.getAllByCustomerId(
          customerId,
          clientId,
        )
      })

      it('should return all global background images, shared client background and customer background images', async () => {
        console.log('results', results)
        expect(results.length).toBeGreaterThanOrEqual(3)

        // make sure there is at least one client background image
        expect(
          results.filter(
            (i: IBackgroundImageModel.Schema) =>
              i.restrictions === BackgroundRestrictions.CLIENT_BASE,
          ).length,
        ).toBeGreaterThan(0)

        for (const result of results) {
          if (result.restrictions === BackgroundRestrictions.CLIENT_BASE) {
            // clients background images
            expect(result.clientId).toEqual(clientId)
          } else if (result.customerId) {
            // customers background images
            expect(result.clientId).toBeUndefined()
            expect(result.customerId).toEqual(customerId)
          } else {
            // global background images
            expect(result.clientId).toBeUndefined()
            expect(result.customerId).toBeUndefined()
          }
        }
      })
    })
  })

  describe('findById', () => {
    beforeEach(async () => {
      results = await backgroundImageModel.findById(backgroundImageId)
    })

    it('should return created theme', () => {
      expect(results).toEqual({
        ...mockBackgroundImage,
        id: backgroundImageId,
        status: 'draft',
        updatedAt: expect.anything(),
        createdAt: expect.anything(),
      })
    })
  })

  describe('updateById', () => {
    const categoryIds = ['new-mock-category-1', 'new-mock-category-2']
    beforeEach(async () => {
      results = await backgroundImageModel.updateById(backgroundImageId, {
        ...mockBackgroundImage,
        categoryIds,
      })
    })

    it('should return updated theme', () => {
      const { updatedAt, createdAt, ...assertResults } = results
      expect(assertResults).toEqual({
        ...mockBackgroundImage,
        id: backgroundImageId,
        categoryIds,
        status: 'draft',
      })
    })
  })
})
