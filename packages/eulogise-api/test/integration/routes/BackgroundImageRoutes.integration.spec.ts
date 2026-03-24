import expect from 'expect'
import { backgroundImageModel } from '../../../src/ts/database'
import { MOCK_BACKGROUND_IMAGE_DATA_1 } from '../model/mock/mockBackgroundImage'
import { TestRequestHelper } from '../../helpers/TestRequestHelper'
import {
  BackgroundRestrictions,
  EulogiseUserRole,
  ICardProductBackgroundImageBase,
  TestUserRole,
} from '@eulogise/core'
import { UtilHelper } from '@eulogise/helpers'
import {
  MOCK_CLIENT_CUSTOMER_ID_1,
  MOCK_CLIENT_ID_1,
  MOCK_CUSTOMER_ID_1,
} from '@eulogise/mock'

describe('BackgroundImageRoutes', () => {
  let results: any
  let backgroundImageId: string
  const mockBackgroundImageName = 'Mock background image'
  const mockBackgroundImage = MOCK_BACKGROUND_IMAGE_DATA_1

  beforeEach(async () => {
    results = await backgroundImageModel.create(mockBackgroundImage)
    backgroundImageId = results.id
  })

  describe('Admin', () => {
    const userType = EulogiseUserRole.ADMIN
    const mockCategoryIds = ['mock-category']

    beforeEach(async () => {
      results = (
        await TestRequestHelper.request('/v2/backgroundImages', {
          userType,
          method: 'POST',
          data: {
            backgroundImage: {
              name: mockBackgroundImageName,
              categoryIds: mockCategoryIds,
            },
          },
        })
      ).response
    })

    describe('POST /v2/backgroundImages', () => {
      it('should return status code 200 and background image with id', () => {
        console.log('results', results)
        expect(results.status).toEqual(200)

        // validate response background image
        const backgroundImage = results.data.backgroundImage
        console.log('backgroundImage', backgroundImage)
        // check if the id is uuid
        expect(backgroundImage.id.length).toEqual(36)
        expect(backgroundImage.name).toEqual(mockBackgroundImageName)
        expect(backgroundImage.categoryIds).toEqual(mockCategoryIds)
      })
    })

    describe('GET /v2/backgroundImages', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/backgroundImages', {
            userType,
            method: 'GET',
          })
        ).response
      })

      it('should return all background images', () => {
        const { backgroundImages } = results.data
        expect(backgroundImages.length).toBeGreaterThan(0)
      })
    })

    describe('GET /v2/backgroundImages/:id', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(
            `/v2/backgroundImages/${backgroundImageId}`,
            {
              userType,
              method: 'GET',
            },
          )
        ).response
      })

      it('should return the specified background image', () => {
        const { backgroundImage } = results.data
        // global background image
        expect(backgroundImage.id).toEqual(backgroundImageId)
        expect(backgroundImage.name).toEqual(mockBackgroundImage.name)
        expect(backgroundImage.clientId).toBeUndefined()
        expect(backgroundImage.customerId).toBeUndefined()
      })
    })

    describe('PUT /v2/backgroundImages/:id', () => {
      const newBackgroundName = 'New background name'
      const newCategoryId = ['new-category']

      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(
            `/v2/backgroundImages/${backgroundImageId}`,
            {
              userType,
              method: 'PUT',
              data: {
                backgroundImage: {
                  name: newBackgroundName,
                  categoryIds: newCategoryId,
                },
                status: 'published',
              },
            },
          )
        ).response
      })

      it('should return status code 200 and return updated background data', () => {
        console.log('results', results)
        expect(results.status).toEqual(200)

        // validate response background image
        const backgroundImage = results.data.backgroundImage
        console.log('backgroundImage', backgroundImage)
        // check if the id is uuid
        expect(backgroundImage.id).toEqual(backgroundImageId)
        expect(backgroundImage.name).toEqual(newBackgroundName)
        expect(backgroundImage.categoryIds).toEqual(newCategoryId)
      })
    })

    describe('DELETE /v2/backgroundImages/:id', () => {})
  })

  describe('Client Admin', () => {
    const userType = EulogiseUserRole.CLIENT
    let clientBackgroundImageId: string
    const mockClientId = MOCK_CLIENT_ID_1
    beforeEach(async () => {
      results = (
        await TestRequestHelper.request('/v2/backgroundImages', {
          userType,
          method: 'POST',
          data: {
            backgroundImage: {
              name: mockBackgroundImageName,
              restrictions: BackgroundRestrictions.CLIENT_BASE,
            },
          },
        })
      ).response
      clientBackgroundImageId = results.data.backgroundImage.id
    })

    describe('POST /v2/backgroundImages', () => {
      it('should return status code 200 and background image with id', () => {
        console.log('results', results)
        expect(results.status).toEqual(200)

        // validate response background image
        const backgroundImage = results.data.backgroundImage
        console.log('backgroundImage', backgroundImage)
        // check if the id is uuid
        expect(backgroundImage.id.length).toEqual(36)
        expect(backgroundImage.name).toEqual(mockBackgroundImageName)
        expect(backgroundImage.clientId).toEqual(mockClientId)
        expect(backgroundImage.customerId).toBeUndefined()
      })
    })

    describe('GET /v2/backgroundImages', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/backgroundImages', {
            userType,
            method: 'GET',
          })
        ).response
      })

      it('should return all global and clients background images', () => {
        const { backgroundImages } = results.data
        // check global background images
        const globalImages: Array<string> = backgroundImages.map(
          (i: ICardProductBackgroundImageBase) => !i.clientId && !i.customerId,
        )
        expect(globalImages.length).toBeGreaterThan(1)

        // check client base background images
        const clientImages: Array<string> = backgroundImages
          .map((i: ICardProductBackgroundImageBase) => i.clientId)
          .filter(Boolean)
        console.log('clientImages', backgroundImages)
        // it should return only image of one single client
        expect(UtilHelper.uniq(clientImages).length).toEqual(1)
      })
    })

    describe('GET /v2/backgroundImages/:id', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(
            `/v2/backgroundImages/${backgroundImageId}`,
            {
              userType,
              method: 'GET',
            },
          )
        ).response
      })

      it('should return the specified background image', () => {
        const { backgroundImage } = results.data
        // global background image
        expect(backgroundImage.id).toEqual(backgroundImageId)
        expect(backgroundImage.name).toEqual(mockBackgroundImage.name)
        expect(backgroundImage.clientId).toBeUndefined()
        expect(backgroundImage.customerId).toBeUndefined()
      })
    })

    describe('PUT /v2/backgroundImages/:id', () => {
      const newBackgroundName = 'New background name'
      const newCategoryId = ['new-category']

      describe('Updating Global Background image', () => {
        beforeEach(async () => {
          try {
            results = (
              await TestRequestHelper.request(
                `/v2/backgroundImages/${backgroundImageId}`,
                {
                  userType,
                  method: 'PUT',
                  data: {
                    backgroundImage: {
                      name: newBackgroundName,
                      categoryIds: newCategoryId,
                    },
                    status: 'published',
                  },
                },
              )
            ).response
          } catch (ex) {
            results = ex.response
          }
        })

        it('should return status code 400 and not allow user to update the background image', () => {
          console.log('results', results.data)
          expect(results.status).toEqual(400)
          expect(results.data.message).toEqual(
            'User is not allowed to update the global background image',
          )
        })
      })

      describe('Updating other client background image', () => {
        const otherClientId = 'other-client-id'
        beforeEach(async () => {
          // other client background image
          const otherClientBackgroundImage = await backgroundImageModel.create({
            clientId: otherClientId,
            name: 'Other client background image name',
          })

          try {
            results = (
              await TestRequestHelper.request(
                `/v2/backgroundImages/${otherClientBackgroundImage.id}`,
                {
                  userType,
                  method: 'PUT',
                  data: {
                    backgroundImage: {
                      name: newBackgroundName,
                      categoryIds: newCategoryId,
                    },
                    status: 'published',
                  },
                },
              )
            ).response
          } catch (ex) {
            results = ex.response
          }
        })

        it('should return status code 400 and not allow user to update the background image', () => {
          console.log('results', results.data)
          expect(results.status).toEqual(400)
          expect(results.data.message).toEqual(
            'Client is not allowed to update the background image',
          )
        })
      })

      describe('Updating its own background image', () => {
        beforeEach(async () => {
          expect(results.data.backgroundImage.status).toEqual('draft')
          results = (
            await TestRequestHelper.request(
              `/v2/backgroundImages/${clientBackgroundImageId}`,
              {
                userType,
                method: 'PUT',
                data: {
                  backgroundImage: {
                    name: newBackgroundName,
                  },
                  status: 'published',
                },
              },
            )
          ).response
        })

        it('should return status code 200 and return updated background data', () => {
          console.log('results', results)
          expect(results.status).toEqual(200)

          // validate response background image
          const backgroundImage = results.data.backgroundImage
          console.log('backgroundImage', backgroundImage)
          // check if the id is uuid
          expect(backgroundImage.id).toEqual(clientBackgroundImageId)
          expect(backgroundImage.name).toEqual(newBackgroundName)
          expect(backgroundImage.status).toEqual('published')

          // client Id should be remain same
          expect(backgroundImage.clientId).toEqual(mockClientId)
        })
      })
    })

    describe('DELETE /v2/backgroundImages/:id', () => {})
  })

  describe('Customer', () => {
    const userType = EulogiseUserRole.CUSTOMER
    let customerBackgroundImageId: string
    let mockCustomerId = MOCK_CUSTOMER_ID_1
    beforeEach(async () => {
      results = (
        await TestRequestHelper.request('/v2/backgroundImages', {
          userType,
          method: 'POST',
          data: {
            backgroundImage: {
              name: mockBackgroundImageName,
            },
          },
        })
      ).response
      customerBackgroundImageId = results.data.backgroundImage.id
    })

    describe('POST /v2/backgroundImages', () => {
      it('should return status code 200 and background image with id', () => {
        console.log('results', results)
        expect(results.status).toEqual(200)

        // validate response background image
        const backgroundImage = results.data.backgroundImage
        console.log('backgroundImage', backgroundImage)
        // check if the id is uuid
        expect(backgroundImage.id.length).toEqual(36)
        expect(backgroundImage.name).toEqual(mockBackgroundImageName)
        expect(backgroundImage.clientId).toBeUndefined()
        expect(backgroundImage.customerId).toEqual(mockCustomerId)
      })
    })

    describe('GET /v2/backgroundImages', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/backgroundImages', {
            userType,
            method: 'GET',
          })
        ).response
      })

      it('should return all global and customers background images', () => {
        const { backgroundImages } = results.data
        // check global background images
        const globalImages: Array<string> = backgroundImages.map(
          (i: ICardProductBackgroundImageBase) => !i.clientId && !i.customerId,
        )
        expect(globalImages.length).toBeGreaterThan(1)

        // check customer base background images
        const customerImages: Array<string> = backgroundImages
          .map((i: ICardProductBackgroundImageBase) => i.customerId)
          .filter(Boolean)
        console.log('customerImages', customerImages)
        // it should return only image of one single client
        expect(UtilHelper.uniq(customerImages).length).toEqual(1)
      })
    })

    describe('GET /v2/backgroundImages/:id', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(
            `/v2/backgroundImages/${backgroundImageId}`,
            {
              userType,
              method: 'GET',
            },
          )
        ).response
      })

      it('should return the specified background image', () => {
        const { backgroundImage } = results.data
        // global background image
        expect(backgroundImage.id).toEqual(backgroundImageId)
        expect(backgroundImage.name).toEqual(mockBackgroundImage.name)
        expect(backgroundImage.clientId).toBeUndefined()
        expect(backgroundImage.customerId).toBeUndefined()
      })
    })

    describe('PUT /v2/backgroundImages/:id', () => {
      const newBackgroundName = 'New background name'
      const newCategoryId = ['new-category']

      describe('Updating Global Background image', () => {
        beforeEach(async () => {
          try {
            results = (
              await TestRequestHelper.request(
                `/v2/backgroundImages/${backgroundImageId}`,
                {
                  userType,
                  method: 'PUT',
                  data: {
                    backgroundImage: {
                      name: newBackgroundName,
                      categoryIds: newCategoryId,
                    },
                  },
                },
              )
            ).response
          } catch (ex) {
            results = ex.response
          }
        })

        it('should return status code 400 and not allow user to update the background image', () => {
          console.log('results', results.data)
          expect(results.status).toEqual(400)
          expect(results.data.message).toEqual(
            'User is not allowed to update the global background image',
          )
        })
      })

      describe('Updating other client background image', () => {
        const otherClientId = 'other-client-id'

        beforeEach(async () => {
          // other client background image
          const otherClientBackgroundImage = await backgroundImageModel.create({
            clientId: otherClientId,
            name: 'Other client background image name',
          })

          try {
            results = (
              await TestRequestHelper.request(
                `/v2/backgroundImages/${otherClientBackgroundImage.id}`,
                {
                  userType,
                  method: 'PUT',
                  data: {
                    backgroundImage: {
                      name: newBackgroundName,
                    },
                  },
                },
              )
            ).response
          } catch (ex) {
            results = ex.response
          }
        })

        it('should return status code 400 and not allow user to update the background image', () => {
          console.log('results', results.data)
          expect(results.status).toEqual(400)
          expect(results.data.message).toEqual(
            'Customer is not allowed to update the background image',
          )
        })
      })

      describe('Updating other customer background image', () => {
        const otherCustomerId = 'other-customer-id'

        beforeEach(async () => {
          // other customer background image
          const otherCustomerBackgroundImage =
            await backgroundImageModel.create({
              customerId: otherCustomerId,
              name: 'Other client background image name',
            })

          try {
            results = (
              await TestRequestHelper.request(
                `/v2/backgroundImages/${otherCustomerBackgroundImage.id}`,
                {
                  userType,
                  method: 'PUT',
                  data: {
                    backgroundImage: {
                      name: newBackgroundName,
                    },
                  },
                },
              )
            ).response
          } catch (ex) {
            results = ex.response
          }
        })

        it('should return status code 400 and not allow user to update the background image', () => {
          console.log('results', results.data)
          expect(results.status).toEqual(400)
          expect(results.data.message).toEqual(
            'Customer is not allowed to update the background image',
          )
        })
      })

      describe('Updating its own background image', () => {
        beforeEach(async () => {
          results = (
            await TestRequestHelper.request(
              `/v2/backgroundImages/${customerBackgroundImageId}`,
              {
                userType,
                method: 'PUT',
                data: {
                  backgroundImage: {
                    name: newBackgroundName,
                  },
                },
              },
            )
          ).response
        })

        it('should return status code 200 and return updated background data', () => {
          console.log('results', results)
          expect(results.status).toEqual(200)

          // validate response background image
          const backgroundImage = results.data.backgroundImage
          console.log('backgroundImage', backgroundImage)
          // check if the id is uuid
          expect(backgroundImage.id).toEqual(customerBackgroundImageId)
          expect(backgroundImage.name).toEqual(newBackgroundName)
          // customer Id should be remain same
          expect(backgroundImage.customerId).toEqual(mockCustomerId)
        })
      })
    })
  })

  describe('Editor', () => {
    describe('Invited by Customer', () => {
      const userType = 'CUSTOMER_EDITOR'
      const mockCustomerId = MOCK_CUSTOMER_ID_1
      let customerBackgroundImageId: string

      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/backgroundImages', {
            userType,
            method: 'POST',
            data: {
              backgroundImage: {
                name: mockBackgroundImageName,
              },
            },
          })
        ).response
        customerBackgroundImageId = results.data.backgroundImage.id
      })

      describe('POST /v2/backgroundImages', () => {
        it('should return status code 200 and background image with id', () => {
          console.log('results', results)
          expect(results.status).toEqual(200)

          // validate response background image
          const backgroundImage = results.data.backgroundImage
          console.log('backgroundImage', backgroundImage)
          // check if the id is uuid
          expect(backgroundImage.id.length).toEqual(36)
          expect(backgroundImage.name).toEqual(mockBackgroundImageName)
          expect(backgroundImage.clientId).toBeUndefined()
          expect(backgroundImage.customerId).toEqual(mockCustomerId)
        })
      })

      describe('GET /v2/backgroundImages', () => {
        beforeEach(async () => {
          results = (
            await TestRequestHelper.request('/v2/backgroundImages', {
              userType,
              method: 'GET',
            })
          ).response
        })

        it('should return all global and customers background images', () => {
          const { backgroundImages } = results.data
          // check global background images
          const globalImages: Array<string> = backgroundImages.map(
            (i: ICardProductBackgroundImageBase) =>
              !i.clientId && !i.customerId,
          )
          expect(globalImages.length).toBeGreaterThan(1)

          // check customer base background images
          const customerImages: Array<string> = backgroundImages
            .map((i: ICardProductBackgroundImageBase) => i.customerId)
            .filter(Boolean)
          console.log('customerImages', customerImages)
          // it should return only image of one single client
          expect(UtilHelper.uniq(customerImages).length).toEqual(1)
        })
      })

      describe('GET /v2/backgroundImages/:id', () => {
        beforeEach(async () => {
          results = (
            await TestRequestHelper.request(
              `/v2/backgroundImages/${backgroundImageId}`,
              {
                userType,
                method: 'GET',
              },
            )
          ).response
        })

        it('should return the specified background image', () => {
          const { backgroundImage } = results.data
          // global background image
          expect(backgroundImage.id).toEqual(backgroundImageId)
          expect(backgroundImage.name).toEqual(mockBackgroundImage.name)
          expect(backgroundImage.clientId).toBeUndefined()
          expect(backgroundImage.customerId).toBeUndefined()
        })
      })

      describe('PUT /v2/backgroundImages/:id', () => {
        const newBackgroundName = 'New background name'
        const newCategoryId = ['new-category']

        describe('Updating Global Background image', () => {
          beforeEach(async () => {
            try {
              results = (
                await TestRequestHelper.request(
                  `/v2/backgroundImages/${backgroundImageId}`,
                  {
                    userType,
                    method: 'PUT',
                    data: {
                      backgroundImage: {
                        name: newBackgroundName,
                        categoryIds: newCategoryId,
                      },
                    },
                  },
                )
              ).response
            } catch (ex) {
              results = ex.response
            }
          })

          it('should return status code 400 and not allow user to update the background image', () => {
            console.log('results', results.data)
            expect(results.status).toEqual(400)
            expect(results.data.message).toEqual(
              'User is not allowed to update the global background image',
            )
          })
        })

        describe('Updating other client background image', () => {
          const otherClientId = 'other-client-id'

          beforeEach(async () => {
            // other client background image
            const otherClientBackgroundImage =
              await backgroundImageModel.create({
                clientId: otherClientId,
                name: 'Other client background image name',
              })

            try {
              results = (
                await TestRequestHelper.request(
                  `/v2/backgroundImages/${otherClientBackgroundImage.id}`,
                  {
                    userType,
                    method: 'PUT',
                    data: {
                      backgroundImage: {
                        name: newBackgroundName,
                      },
                    },
                  },
                )
              ).response
            } catch (ex) {
              results = ex.response
            }
          })

          it('should return status code 400 and not allow user to update the background image', () => {
            console.log('results', results.data)
            expect(results.status).toEqual(400)
            expect(results.data.message).toEqual(
              'CoEditor/Editor is not allowed to update the background image',
            )
          })
        })

        describe('Updating other customer background image', () => {
          const otherCustomerId = 'other-customer-id'

          beforeEach(async () => {
            // other customer background image
            const otherCustomerBackgroundImage =
              await backgroundImageModel.create({
                customerId: otherCustomerId,
                name: 'Other client background image name',
              })

            try {
              results = (
                await TestRequestHelper.request(
                  `/v2/backgroundImages/${otherCustomerBackgroundImage.id}`,
                  {
                    userType,
                    method: 'PUT',
                    data: {
                      backgroundImage: {
                        name: newBackgroundName,
                      },
                    },
                  },
                )
              ).response
            } catch (ex) {
              results = ex.response
            }
          })

          it('should return status code 400 and not allow user to update the background image', () => {
            console.log('results', results.data)
            expect(results.status).toEqual(400)
            expect(results.data.message).toEqual(
              'CoEditor/Editor is not allowed to update the background image',
            )
          })
        })

        describe('Updating its invitor background image', () => {
          beforeEach(async () => {
            results = (
              await TestRequestHelper.request(
                `/v2/backgroundImages/${customerBackgroundImageId}`,
                {
                  userType,
                  method: 'PUT',
                  data: {
                    backgroundImage: {
                      name: newBackgroundName,
                    },
                  },
                },
              )
            ).response
          })

          it('should return status code 200 and return updated background data', () => {
            console.log('results', results)
            expect(results.status).toEqual(200)

            // validate response background image
            const backgroundImage = results.data.backgroundImage
            console.log('backgroundImage', backgroundImage)
            // check if the id is uuid
            expect(backgroundImage.id).toEqual(customerBackgroundImageId)
            expect(backgroundImage.name).toEqual(newBackgroundName)
            // customer Id should be remain same
            expect(backgroundImage.customerId).toEqual(mockCustomerId)
          })
        })
      })
    })

    describe('Invited by Client', () => {
      const userType: TestUserRole = 'CLIENT_EDITOR'
      let customerBackgroundImageId: string
      const mockClientId = MOCK_CLIENT_ID_1

      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/backgroundImages', {
            userType,
            method: 'POST',
            data: {
              backgroundImage: {
                name: mockBackgroundImageName,
              },
            },
          })
        ).response
        customerBackgroundImageId = results.data.backgroundImage.id
      })

      describe('POST /v2/backgroundImages', () => {
        it('should return status code 200 and background image with id', () => {
          console.log('results', results)
          expect(results.status).toEqual(200)

          // validate response background image
          const backgroundImage = results.data.backgroundImage
          console.log('backgroundImage', backgroundImage)
          // check if the id is uuid
          expect(backgroundImage.id.length).toEqual(36)
          expect(backgroundImage.name).toEqual(mockBackgroundImageName)
          expect(backgroundImage.clientId).toEqual(mockClientId)
        })
      })

      describe('GET /v2/backgroundImages', () => {
        beforeEach(async () => {
          results = (
            await TestRequestHelper.request('/v2/backgroundImages', {
              userType,
              method: 'GET',
            })
          ).response
        })

        it('should return all global and clients background images', () => {
          const { backgroundImages } = results.data
          // check global background images
          const globalImages: Array<string> = backgroundImages.map(
            (i: ICardProductBackgroundImageBase) =>
              !i.clientId && !i.customerId,
          )
          expect(globalImages.length).toBeGreaterThan(1)

          // check client base background images
          const clientImages: Array<string> = backgroundImages
            .map((i: ICardProductBackgroundImageBase) => i.clientId)
            .filter(Boolean)
          console.log('clientImages', clientImages)
          // it should return only image of one single client
          expect(UtilHelper.uniq(clientImages).length).toEqual(1)
        })
      })

      describe('GET /v2/backgroundImages/:id', () => {
        beforeEach(async () => {
          results = (
            await TestRequestHelper.request(
              `/v2/backgroundImages/${backgroundImageId}`,
              {
                userType,
                method: 'GET',
              },
            )
          ).response
        })

        it('should return the specified background image', () => {
          const { backgroundImage } = results.data
          // global background image
          expect(backgroundImage.id).toEqual(backgroundImageId)
          expect(backgroundImage.name).toEqual(mockBackgroundImage.name)
          expect(backgroundImage.clientId).toBeUndefined()
          expect(backgroundImage.customerId).toBeUndefined()
        })
      })

      describe('PUT /v2/backgroundImages/:id', () => {
        const newBackgroundName = 'New background name'
        const newCategoryId = ['new-category']

        describe('Updating Global Background image', () => {
          beforeEach(async () => {
            try {
              results = (
                await TestRequestHelper.request(
                  `/v2/backgroundImages/${backgroundImageId}`,
                  {
                    userType,
                    method: 'PUT',
                    data: {
                      backgroundImage: {
                        name: newBackgroundName,
                        categoryIds: newCategoryId,
                      },
                    },
                  },
                )
              ).response
            } catch (ex) {
              results = ex.response
            }
          })

          it('should return status code 400 and not allow user to update the background image', () => {
            console.log('results', results.data)
            expect(results.status).toEqual(400)
            expect(results.data.message).toEqual(
              'User is not allowed to update the global background image',
            )
          })
        })

        describe('Updating other client background image', () => {
          const otherClientId = 'other-client-id'

          beforeEach(async () => {
            // other client background image
            const otherClientBackgroundImage =
              await backgroundImageModel.create({
                clientId: otherClientId,
                name: 'Other client background image name',
              })

            try {
              results = (
                await TestRequestHelper.request(
                  `/v2/backgroundImages/${otherClientBackgroundImage.id}`,
                  {
                    userType,
                    method: 'PUT',
                    data: {
                      backgroundImage: {
                        name: newBackgroundName,
                      },
                    },
                  },
                )
              ).response
            } catch (ex) {
              results = ex.response
            }
          })

          it('should return status code 400 and not allow user to update the background image', () => {
            console.log('results', results.data)
            expect(results.status).toEqual(400)
            expect(results.data.message).toEqual(
              'CoEditor/Editor is not allowed to update the background image',
            )
          })
        })

        describe('Updating other customer background image', () => {
          const otherCustomerId = 'other-customer-id'

          beforeEach(async () => {
            // other customer background image
            const otherCustomerBackgroundImage =
              await backgroundImageModel.create({
                customerId: otherCustomerId,
                name: 'Other client background image name',
              })

            try {
              results = (
                await TestRequestHelper.request(
                  `/v2/backgroundImages/${otherCustomerBackgroundImage.id}`,
                  {
                    userType,
                    method: 'PUT',
                    data: {
                      backgroundImage: {
                        name: newBackgroundName,
                      },
                    },
                  },
                )
              ).response
            } catch (ex) {
              results = ex.response
            }
          })

          it('should return status code 400 and not allow user to update the background image', () => {
            console.log('results', results.data)
            expect(results.status).toEqual(400)
            expect(results.data.message).toEqual(
              'CoEditor/Editor is not allowed to update the background image',
            )
          })
        })

        describe('Updating its invitor background image', () => {
          beforeEach(async () => {
            results = (
              await TestRequestHelper.request(
                `/v2/backgroundImages/${customerBackgroundImageId}`,
                {
                  userType,
                  method: 'PUT',
                  data: {
                    backgroundImage: {
                      name: newBackgroundName,
                    },
                  },
                },
              )
            ).response
          })

          it('should return status code 200 and return updated background data', () => {
            console.log('results', results)
            expect(results.status).toEqual(200)

            // validate response background image
            const backgroundImage = results.data.backgroundImage
            console.log('backgroundImage', backgroundImage)
            // check if the id is uuid
            expect(backgroundImage.id).toEqual(customerBackgroundImageId)
            expect(backgroundImage.name).toEqual(newBackgroundName)
            // customer Id should remain the same
            expect(backgroundImage.customerId).toEqual(
              MOCK_CLIENT_CUSTOMER_ID_1,
            )
            // customer id should remain the same
            expect(backgroundImage.clientId).toEqual(MOCK_CLIENT_ID_1)
          })
        })
      })
    })
  })

  describe('CoEditor', () => {
    describe('Invited by Customer', () => {
      const userType: TestUserRole = 'CUSTOMER_COEDITOR'
      let customerBackgroundImageId: string
      const mockCustomerId = MOCK_CUSTOMER_ID_1

      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/backgroundImages', {
            userType,
            method: 'POST',
            data: {
              backgroundImage: {
                name: mockBackgroundImageName,
              },
            },
          })
        ).response
        customerBackgroundImageId = results.data.backgroundImage.id
      })

      describe('POST /v2/backgroundImages', () => {
        it('should return status code 200 and background image with id', () => {
          console.log('results', results)
          expect(results.status).toEqual(200)

          // validate response background image
          const backgroundImage = results.data.backgroundImage
          console.log('backgroundImage', backgroundImage)
          // check if the id is uuid
          expect(backgroundImage.id.length).toEqual(36)
          expect(backgroundImage.name).toEqual(mockBackgroundImageName)
          expect(backgroundImage.clientId).toBeUndefined()
          expect(backgroundImage.customerId).toEqual(mockCustomerId)
        })
      })

      describe('GET /v2/backgroundImages', () => {
        beforeEach(async () => {
          results = (
            await TestRequestHelper.request('/v2/backgroundImages', {
              userType,
              method: 'GET',
            })
          ).response
        })

        it('should return all global and customers background images', () => {
          const { backgroundImages } = results.data
          // check global background images
          const globalImages: Array<string> = backgroundImages.map(
            (i: ICardProductBackgroundImageBase) =>
              !i.clientId && !i.customerId,
          )
          expect(globalImages.length).toBeGreaterThan(1)

          // check customer base background images
          const customerImages: Array<string> = backgroundImages
            .map((i: ICardProductBackgroundImageBase) => i.customerId)
            .filter(Boolean)
          console.log('customerImages', customerImages)
          // it should return only image of one single client
          expect(UtilHelper.uniq(customerImages).length).toEqual(1)
        })
      })

      describe('GET /v2/backgroundImages/:id', () => {
        beforeEach(async () => {
          results = (
            await TestRequestHelper.request(
              `/v2/backgroundImages/${backgroundImageId}`,
              {
                userType,
                method: 'GET',
              },
            )
          ).response
        })

        it('should return the specified background image', () => {
          const { backgroundImage } = results.data
          // global background image
          expect(backgroundImage.id).toEqual(backgroundImageId)
          expect(backgroundImage.name).toEqual(mockBackgroundImage.name)
          expect(backgroundImage.clientId).toBeUndefined()
          expect(backgroundImage.customerId).toBeUndefined()
        })
      })

      describe('PUT /v2/backgroundImages/:id', () => {
        const newBackgroundName = 'New background name'
        const newCategoryId = ['new-category']

        describe('Updating Global Background image', () => {
          beforeEach(async () => {
            try {
              results = (
                await TestRequestHelper.request(
                  `/v2/backgroundImages/${backgroundImageId}`,
                  {
                    userType,
                    method: 'PUT',
                    data: {
                      backgroundImage: {
                        name: newBackgroundName,
                        categoryIds: newCategoryId,
                      },
                    },
                  },
                )
              ).response
            } catch (ex) {
              results = ex.response
            }
          })

          it('should return status code 400 and not allow user to update the background image', () => {
            console.log('results', results.data)
            expect(results.status).toEqual(400)
            expect(results.data.message).toEqual(
              'User is not allowed to update the global background image',
            )
          })
        })

        describe('Updating other client background image', () => {
          const otherClientId = 'other-client-id'

          beforeEach(async () => {
            // other client background image
            const otherClientBackgroundImage =
              await backgroundImageModel.create({
                clientId: otherClientId,
                name: 'Other client background image name',
              })

            try {
              results = (
                await TestRequestHelper.request(
                  `/v2/backgroundImages/${otherClientBackgroundImage.id}`,
                  {
                    userType,
                    method: 'PUT',
                    data: {
                      backgroundImage: {
                        name: newBackgroundName,
                      },
                    },
                  },
                )
              ).response
            } catch (ex) {
              results = ex.response
            }
          })

          it('should return status code 400 and not allow user to update the background image', () => {
            console.log('results', results.data)
            expect(results.status).toEqual(400)
            expect(results.data.message).toEqual(
              'CoEditor/Editor is not allowed to update the background image',
            )
          })
        })

        describe('Updating other customer background image', () => {
          const otherCustomerId = 'other-customer-id'

          beforeEach(async () => {
            // other customer background image
            const otherCustomerBackgroundImage =
              await backgroundImageModel.create({
                customerId: otherCustomerId,
                name: 'Other client background image name',
              })

            try {
              results = (
                await TestRequestHelper.request(
                  `/v2/backgroundImages/${otherCustomerBackgroundImage.id}`,
                  {
                    userType,
                    method: 'PUT',
                    data: {
                      backgroundImage: {
                        name: newBackgroundName,
                      },
                    },
                  },
                )
              ).response
            } catch (ex) {
              results = ex.response
            }
          })

          it('should return status code 400 and not allow user to update the background image', () => {
            console.log('results', results.data)
            expect(results.status).toEqual(400)
            expect(results.data.message).toEqual(
              'CoEditor/Editor is not allowed to update the background image',
            )
          })
        })

        describe('Updating its invitor background image', () => {
          beforeEach(async () => {
            results = (
              await TestRequestHelper.request(
                `/v2/backgroundImages/${customerBackgroundImageId}`,
                {
                  userType,
                  method: 'PUT',
                  data: {
                    backgroundImage: {
                      name: newBackgroundName,
                    },
                  },
                },
              )
            ).response
          })

          it('should return status code 200 and return updated background data', () => {
            console.log('results', results)
            expect(results.status).toEqual(200)

            // validate response background image
            const backgroundImage = results.data.backgroundImage
            console.log('backgroundImage', backgroundImage)
            // check if the id is uuid
            expect(backgroundImage.id).toEqual(customerBackgroundImageId)
            expect(backgroundImage.name).toEqual(newBackgroundName)
            // customer Id should be remain same
            expect(backgroundImage.customerId).toEqual(mockCustomerId)
          })
        })
      })
    })

    describe('Invited by Client', () => {})
  })
})
