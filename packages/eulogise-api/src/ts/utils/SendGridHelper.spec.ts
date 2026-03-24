import { DEFAULT_CLIENT_EULOGIZE_LOGO_URL } from '../types'
import { SendGridHelper } from './SendGridHelper'
import expect from 'expect'
import {
  ADDRESS_INPUT_MODE,
  CHECKOUT_PAYMENT_METHODS,
  CHECKOUTS_SHIPPING_METHOD,
  EulogiseCountry,
  EulogiseLeatherVideoTributeBookOptions,
  EulogisePackageOptions,
  EulogiseUserRole,
  LeatherVideoTributeMaterial,
  LeatherVideoTributeMaterialColor,
} from '@eulogise/core'

describe('SendGridHelper', () => {
  let results: any

  describe('sendShareInvite', () => {
    beforeEach(async () => {
      results = await SendGridHelper.sendShareInvite({
        customerName: 'Customer Name',
        recipient: {
          email: 'kakchan@gmail.com',
          name: 'Eric',
        },
        replyTo: { email: 'kakchan+replyto@gmail.com', name: 'Support' },
        caseId: '546517fa-8834-4190-992d-61ce787e573e',
        customerMessage: '<b>test</b>',
      })
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendAccountSignUp', () => {
    beforeEach(async () => {
      results = await SendGridHelper.sendAccountSignUp(
        {
          email: 'kakchan@gmail.com',
          fullName: 'Eric',
        },
        'test dead',
        'https://google.com',
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendForgotEmail', () => {
    beforeEach(async () => {
      results = await SendGridHelper.sendForgotEmail(
        {
          email: 'kakchan@gmail.com',
          fullName: 'Eric',
        },
        'https://google.com',
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendSlideshowGeneratedEmail', () => {
    beforeEach(async () => {
      results = await SendGridHelper.sendSlideshowGeneratedEmail(
        {
          email: 'kakchan@gmail.com',
          fullName: 'Eric',
        },
        { deceased: { fullName: 'Test User' } },
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendBookletPrintEmail', () => {
    beforeEach(async () => {
      process.env.SENDGRID_EMAIL_PRINT_ADDRESS = 'print@eulogizememorials.com'
      results = await SendGridHelper.sendBookletPrintEmail(
        {
          // @ts-ignore
          details: {
            packageOption:
              EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
            country: EulogiseCountry.UNITED_STATES,
            orderSummary: {
              digitalDownloadFee: 69,
              leatherVideoTributeBookFee: 150,
              shippingFee: 34,
              printingFee: 0,
              subtotalFee: 253,
              photoBookTributeFee: 3,
            },
            paymentDetails: {
              method: CHECKOUT_PAYMENT_METHODS.CREDIT_DEBIT_CARD,
              cardHolderName: 'SW',
            },
            keepsakesDetails: {
              photoBook: {
                option: null,
                shippingMethod: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
                metaData: {
                  bookStyle: {
                    style: null,
                    size: null,
                    numberOfPages: 10,
                  },
                  copyAmount: 3,
                  coverStyle: {
                    design: null,
                    coverMaterial: null,
                  },
                },
                shippingAddressDetails: {
                  formattedAddress: 'format st',
                  addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
                },
              },
              leatherVideoTributeBook: {
                option:
                  EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK,
                metaData: {
                  material: LeatherVideoTributeMaterial.LEATHER,
                  color: LeatherVideoTributeMaterialColor.WHITE,
                  copyAmount: 1,
                },
                shippingMethod: CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING,
                shippingAddressDetails: {
                  formattedAddress: 'esk st',
                  addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
                },
              },
            },
            currency: 'USD',
          },
        },
        '1234',
        'A4',
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendBookletGenerateEmail', () => {
    beforeEach(async () => {
      results = await SendGridHelper.sendBookletGeneratedEmail(
        {
          email: 'kakchan@gmail.com',
          fullName: 'Eric',
        },
        { deceased: { fullName: 'Test User' } },
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendBookmarkPrintEmail', () => {
    beforeEach(async () => {
      process.env.SENDGRID_EMAIL_PRINT_ADDRESS = 'print@eulogizememorials.com'
      results = await SendGridHelper.sendBookmarkPrintEmail(
        {
          // @ts-ignore
          details: {
            packageOption:
              EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
            country: EulogiseCountry.UNITED_STATES,
            orderSummary: {
              digitalDownloadFee: 69,
              leatherVideoTributeBookFee: 150,
              shippingFee: 34,
              printingFee: 0,
              subtotalFee: 253,
              photoBookTributeFee: 3,
            },
            paymentDetails: {
              method: CHECKOUT_PAYMENT_METHODS.CREDIT_DEBIT_CARD,
              cardHolderName: 'SW',
            },
            keepsakesDetails: {
              photoBook: {
                option: null,
                shippingMethod: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
                metaData: {
                  bookStyle: {
                    style: null,
                    size: null,
                    numberOfPages: 10,
                  },
                  copyAmount: 3,
                  coverStyle: {
                    design: null,
                    coverMaterial: null,
                  },
                },
                shippingAddressDetails: {
                  formattedAddress: 'format st',
                  addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
                },
              },
              leatherVideoTributeBook: {
                option:
                  EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK,
                metaData: {
                  material: LeatherVideoTributeMaterial.LEATHER,
                  color: LeatherVideoTributeMaterialColor.WHITE,
                  copyAmount: 1,
                },
                shippingMethod: CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING,
                shippingAddressDetails: {
                  formattedAddress: 'format st',
                  addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
                },
              },
            },
            currency: 'USD',
          },
        },
        '1234',
        'A4',
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendBookmarkGeneratedEmail', () => {
    beforeEach(async () => {
      results = await SendGridHelper.sendBookmarkGeneratedEmail(
        {
          email: 'kakchan@gmail.com',
          fullName: 'Eric',
        },
        { deceased: { fullName: 'Test User' } },
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendSidedCardPrintEmail', () => {
    beforeEach(async () => {
      process.env.SENDGRID_EMAIL_PRINT_ADDRESS = 'print@eulogizememorials.com'
      results = await SendGridHelper.sendSidedCardPrintEmail(
        {
          // @ts-ignore
          details: {
            packageOption:
              EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
            country: EulogiseCountry.UNITED_STATES,
            orderSummary: {
              digitalDownloadFee: 69,
              leatherVideoTributeBookFee: 150,
              shippingFee: 34,
              printingFee: 0,
              subtotalFee: 253,
              photoBookTributeFee: 3,
            },
            paymentDetails: {
              method: CHECKOUT_PAYMENT_METHODS.CREDIT_DEBIT_CARD,
              cardHolderName: 'SW',
            },
            keepsakesDetails: {
              photoBook: {
                option: null,
                metaData: {
                  bookStyle: {
                    style: null,
                    size: null,
                    numberOfPages: 10,
                  },
                  coverStyle: {
                    design: null,
                    coverMaterial: null,
                  },
                  copyAmount: 3,
                },
                shippingAddressDetails: {
                  formattedAddress: null,
                  addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
                },
                shippingMethod: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
              },
              leatherVideoTributeBook: {
                option:
                  EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK,
                metaData: {
                  material: LeatherVideoTributeMaterial.LEATHER,
                  color: LeatherVideoTributeMaterialColor.WHITE,
                  copyAmount: 1,
                },
                shippingMethod: CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING,
                shippingAddressDetails: {
                  formattedAddress: 'format st',
                  addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
                },
              },
            },
            currency: 'USD',
          },
        },
        '1234',
        'A4',
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendSidedCardGeneratedEmail', () => {
    beforeEach(async () => {
      results = await SendGridHelper.sendSidedCardGeneratedEmail(
        {
          email: 'kakchan@gmail.com',
          fullName: 'Eric',
        },
        { deceased: { fullName: 'Test User' } },
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendThankyouCardPrintEmail', () => {
    beforeEach(async () => {
      process.env.SENDGRID_EMAIL_PRINT_ADDRESS = 'print@eulogizememorials.com'
      results = await SendGridHelper.sendThankyouCardPrintEmail(
        {
          // @ts-ignore
          details: {
            packageOption:
              EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
            country: EulogiseCountry.UNITED_STATES,
            orderSummary: {
              digitalDownloadFee: 69,
              leatherVideoTributeBookFee: 150,
              shippingFee: 34,
              printingFee: 0,
              subtotalFee: 253,
              photoBookTributeFee: 3,
            },
            paymentDetails: {
              method: CHECKOUT_PAYMENT_METHODS.CREDIT_DEBIT_CARD,
              cardHolderName: 'SW',
            },
            keepsakesDetails: {
              photoBook: {
                option: null,
                shippingMethod: CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING,
                metaData: {
                  bookStyle: {
                    style: null,
                    size: null,
                    numberOfPages: 10,
                  },
                  coverStyle: {
                    design: null,
                    coverMaterial: null,
                  },
                  copyAmount: 10,
                },
                shippingAddressDetails: {
                  formattedAddress: 'format str',
                  addressInputMode: ADDRESS_INPUT_MODE.MANUAL_INPUT,
                },
              },
              leatherVideoTributeBook: {
                shippingAddressDetails: {
                  formattedAddress: 'format str',
                  addressInputMode: ADDRESS_INPUT_MODE.MANUAL_INPUT,
                },
                option:
                  EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK,
                metaData: {
                  material: LeatherVideoTributeMaterial.LEATHER,
                  color: LeatherVideoTributeMaterialColor.WHITE,
                  copyAmount: 1,
                },
                shippingMethod: CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING,
              },
            },
            currency: 'USD',
          },
        },
        '1234',
        'A4',
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('sendThankyouCardGeneratedEmail', () => {
    beforeEach(async () => {
      results = await SendGridHelper.sendThankyouCardGeneratedEmail(
        {
          email: 'kakchan@gmail.com',
          fullName: 'Eric',
        },
        { deceased: { fullName: 'Test User' } },
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  // INvite
  describe('sendInvite', () => {
    beforeEach(async () => {
      results = await SendGridHelper.sendInvite(
        process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_CLIENT!,
        {
          email: 'kakchan@gmail.com',
          fullName: 'Eric',
        },
        { fullName: 'Test User', magicInviteLink: 'https://google.com' },
      )
    })

    it('should send an sign up email', () => {
      expect(results).toEqual(true)
    })
  })

  // Invite as Admin
  describe('sendAdminInvite', () => {
    describe('Card product', () => {
      beforeEach(async () => {
        results = await SendGridHelper.sendAdminInvite(
          process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_VISITOR_BOOKLET!,
          'Eric',
          'kakchan@gmail.com',
          {
            fullName: 'Eric',
            deceasedName: 'Dead User',
            customerEmailAddress: 'kakchan+1000@gmail.com',
            magicInviteLink: 'https://google.com',
          },
        )
      })

      it('should send an sign up email', () => {
        expect(results).toEqual(true)
      })
    })

    describe('Slideshow', () => {
      beforeEach(async () => {
        results = await SendGridHelper.sendAdminInvite(
          process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_VISITOR_SLIDESHOW!,
          'Eric',
          'kakchan@gmail.com',
          {
            fullName: 'Eric',
            deceasedName: 'Dead User',
            customerEmailAddress: 'kakchan+1000@gmail.com',
            magicInviteLink: 'https://google.com',
          },
        )
      })

      it('should send an sign up email', () => {
        expect(results).toEqual(true)
      })
    })

    describe('Contributor', () => {
      beforeEach(async () => {
        results = await SendGridHelper.sendAdminInvite(
          process.env.SENDGRID_TEMPLATE_ACCOUNT_SIGNUP_CUSTOMER_AS_CLIENT!,
          'Eric',
          'kakchan@gmail.com',
          {
            inviteeName: 'Eric',
            deceasedName: 'Dead User',
            magicInviteLink: 'https://google.com',
            clientUser: 'Funeral Director Name',
            clientBrand: "Funeral Director's Title",
            clientEmail: 'fd@gmail.com',
          },
        )
      })

      it('should send an sign up email', () => {
        expect(results).toEqual(true)
      })
    })

    describe('Customer', () => {
      beforeEach(async () => {
        results = await SendGridHelper.sendAdminInvite(
          process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_CUSTOMER!,
          'Eric',
          'kakchan@gmail.com',
          {
            fullName: 'Eric',
            magicInviteLink: 'https://google.com',
          },
        )
      })

      it('should send an sign up email', () => {
        expect(results).toEqual(true)
      })
    })

    describe('Customer', () => {
      beforeEach(async () => {
        results = await SendGridHelper.sendAdminInvite(
          process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_CUSTOMER!,
          'Eric',
          'kakchan@gmail.com',
          {
            fullName: 'Eric',
            magicInviteLink: 'https://google.com',
          },
        )
      })

      it('should send an sign up email', () => {
        expect(results).toEqual(true)
      })
    })

    describe('Client', () => {
      beforeEach(async () => {
        results = await SendGridHelper.sendAdminInvite(
          process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_CLIENT!,
          'Eric',
          'kakchan@gmail.com',
          {
            fullName: 'Eric',
            magicInviteLink: 'https://google.com',
          },
        )
      })

      it('should send an sign up email', () => {
        expect(results).toEqual(true)
      })
    })
  })

  describe('sendCoEditorInviteAsCustomer', () => {
    beforeEach(async () => {
      results = await SendGridHelper.sendEditorOrCoEditorInviteAsCustomer({
        inviteeName: 'Invitee Name',
        inviteeEmail: 'kakchan+coedcustomer@gmail.com',
        inviteToken: 'some-token',
        invitorName: 'Invitor Name',
        deceasedName: 'Deceased Name',
        clientEmailAssetUrl: 'client-email-asset-123',
        role: EulogiseUserRole.COEDITOR,
      })
    })

    it('should send an invitation email', () => {
      expect(results).toEqual(true)
    })
  })

  describe('getClientEmailAssetUrl', () => {
    let results

    it('should return Eulogize default client email asset url if no email asset existed in client', async () => {
      results = await SendGridHelper.getClientEmailAssetUrl('')
      expect(results).toEqual(DEFAULT_CLIENT_EULOGIZE_LOGO_URL)
    })

    it('should return customised Eulogize client email asset url if there is an email asset existed in client', async () => {
      results = await SendGridHelper.getClientEmailAssetUrl('logoUrl')
      expect(results).toEqual(
        `${process.env.XAWS_S3_BUCKET}/clients/logos/logoUrl`,
      )
    })
  })
})
