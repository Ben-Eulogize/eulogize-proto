import { InviteMockService } from '../../mock/InviteMockService'
import { inviteModel } from '../../../src/ts/database'
import expect from 'expect'

describe('InviteModel - Integration', () => {
  let results: any

  const mockInviteService = new InviteMockService()

  describe('getInviteCountByCaseId()', () => {
    beforeEach(async () => {
      const invite = await mockInviteService.createMockItem()
      results = await inviteModel.getInviteCountByCaseId(invite.case!)
    })

    it('should return number of invites', () => {
      expect(results).toEqual(1)
    })
  })

  describe('findByToken', () => {
    beforeEach(async () => {
      const invite = await mockInviteService.createMockItem()
      results = await inviteModel.findByToken(invite.token)
    })

    it('should return the invite', () => {
      expect(results.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('findOneByToken', () => {
    let expectedInviteId: string
    beforeEach(async () => {
      const invite = await mockInviteService.createMockItem()
      expectedInviteId = invite.id!
      results = await inviteModel.findOneByToken(invite.token)
    })

    it('should return the invite', () => {
      expect(results.id).toEqual(expectedInviteId)
    })
  })

  describe('findByEmail', () => {
    beforeEach(async () => {
      const invite = await mockInviteService.createMockItem()
      results = await inviteModel.findByEmail(invite.email!)
    })

    it('should return the invite', () => {
      expect(results.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('findOneByEmail', () => {
    let expectedInviteId: string
    beforeEach(async () => {
      const invite = await mockInviteService.createMockItem()
      expectedInviteId = invite.id!
      results = await inviteModel.findOneByEmail(invite.email!)
    })

    it('should return the invite', () => {
      expect(results.id).toEqual(expectedInviteId)
    })
  })
})
