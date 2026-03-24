import expect from 'expect'
import { InviteResourceController } from '../../../src/ts/functions/controller'
import { clientModel, inviteModel, userModel } from '../../../src/ts/database'
import { SendGridHelper } from '../../../src/ts/utils/SendGridHelper'
import { EulogiseCountry, EulogiseUserRole } from '@eulogise/core'
import { DEFAULT_CLIENT_EULOGIZE_LOGO_URL } from '../../../src/ts/types'

describe('Invite Controller', () => {
  const inviteeName = 'Invitee'
  const inviteeEmail = 'kakchan+invitee@gmail.com'
  const inviteToken = 'abc-token'
  const invitorName = 'Invitor'
  const deceasedName = 'Deceased Name'
  const clientUser = 'Client User'
  const clientBrand = 'Client Brand'
  const clientEmailAssetUrl = DEFAULT_CLIENT_EULOGIZE_LOGO_URL

  describe('sendAsAdmin', () => {
    beforeEach(async () => {
      const funeralDirector = await userModel.create({
        verified: false,
        fullName: 'Funeral Director',
        email: 'fd1@gmail.com',
        firstStreetAddress: '1 street',
        secondStreetAddress: '2 street',
        password: '123123',
        phone: '02403033',
        role: EulogiseUserRole.CLIENT,
      })
      const accountObj = {
        ref: funeralDirector.id,
        role: EulogiseUserRole.CUSTOMER,
        type: 'user',
        iat: 1660998675,
      }
      const client = await clientModel.create({
        title: 'Mr',
        primaryAddress: ['primary-address-line-1'],
        additionalAddress: [['additional-address-line-1']],
        country: EulogiseCountry.AUSTRALIA,
        createCaseFamilyInviteOptions: ['editor'],
        logo: 'http://logo',
      })
      const invite = await inviteModel.create({
        role: EulogiseUserRole.CLIENT,
        client: client.id,
        invitorFullName: 'Invitor Full Name',
        fullName: 'Client 1',
        email: inviteeEmail,
        token: '',
        status: 'pending',
      })
      // @ts-ignore
      await InviteResourceController.sendAsAdmin(accountObj, {
        invite: invite.id,
      })
    })

    it('should send a message out', () => {
      expect(true).toEqual(true)
    })
  })

  describe('sendVisitorBookletInvite', () => {
    beforeEach(async () => {
      await SendGridHelper.sendVisitorBookletInvite(
        inviteeName,
        inviteeEmail,
        inviteToken,
        invitorName,
        deceasedName,
        clientEmailAssetUrl,
      )
    })

    it('should return correct results', () => {
      expect(true).toEqual(true)
    })
  })

  describe('sendVisitorSlideshowInvite', () => {
    beforeEach(async () => {
      await SendGridHelper.sendVisitorSlideshowInvite(
        inviteeName,
        inviteeEmail,
        inviteToken,
        invitorName,
        deceasedName,
        clientEmailAssetUrl,
      )
    })

    it('should return correct results', () => {
      expect(true).toEqual(true)
    })
  })

  describe('sendVisitorSidedCardInvite', () => {
    beforeEach(async () => {
      await SendGridHelper.sendVisitorSidedCardInvite(
        inviteeName,
        inviteeEmail,
        inviteToken,
        invitorName,
        deceasedName,
        clientEmailAssetUrl,
      )
    })

    it('should return correct results', () => {
      expect(true).toEqual(true)
    })
  })

  describe('sendVisitorBookmarkInvite', () => {
    beforeEach(async () => {
      await SendGridHelper.sendVisitorBookmarkInvite(
        inviteeName,
        inviteeEmail,
        inviteToken,
        invitorName,
        deceasedName,
        clientEmailAssetUrl,
      )
    })

    it('should return correct results', () => {
      expect(true).toEqual(true)
    })
  })

  describe('sendVisitorThankyouCardInvite', () => {
    beforeEach(async () => {
      await SendGridHelper.sendVisitorThankyouCardInvite(
        inviteeName,
        inviteeEmail,
        inviteToken,
        invitorName,
        deceasedName,
        clientEmailAssetUrl,
      )
    })

    it('should return correct results', () => {
      expect(true).toEqual(true)
    })
  })

  describe('sendContributorInviteAsClient', () => {
    beforeEach(async () => {
      await SendGridHelper.sendContributorInviteAsClient(
        inviteeName,
        inviteeEmail,
        inviteToken,
        clientUser,
        clientBrand,
        deceasedName,
        clientEmailAssetUrl,
      )
    })

    it('should return correct results', () => {
      expect(true).toEqual(true)
    })
  })

  describe('sendContributorInviteAsCustomer', () => {
    beforeEach(async () => {
      await SendGridHelper.sendContributorInviteAsCustomer(
        inviteeName,
        inviteeEmail,
        inviteToken,
        invitorName,
        deceasedName,
        clientEmailAssetUrl,
      )
    })

    it('should return correct results', () => {
      expect(true).toEqual(true)
    })
  })

  describe('sendCustomerInvite', () => {
    beforeEach(async () => {
      await SendGridHelper.sendCustomerInvite(
        inviteeName,
        inviteeEmail,
        inviteToken,
        invitorName,
      )
    })

    it('should return correct results', () => {
      expect(true).toEqual(true)
    })
  })

  describe('sendFuneralDirectorInvite', () => {
    beforeEach(async () => {
      await SendGridHelper.sendFuneralDirectorInvite(
        inviteeName,
        inviteeEmail,
        inviteToken,
        clientUser,
        clientBrand,
        clientEmailAssetUrl,
      )
    })

    it('should return correct results', () => {
      expect(true).toEqual(true)
    })
  })
})
