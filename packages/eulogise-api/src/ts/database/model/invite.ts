import dynamoose from 'dynamoose'
import * as uuid from 'uuid'
import { IInviteModel } from '../types/InviteModel.types'
import { BaseModel } from './BaseModel'
import { EulogiseUserRole, NO_REPLY_EULOGISE_EMAIL } from '@eulogise/core'
import { userModel } from './user'

class InviteModel extends BaseModel<IInviteModel.Model, IInviteModel.Schema> {
  constructor() {
    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
          validate: (v: string) => v.length === 36,
          hashKey: true,
        },
        role: {
          type: String,
          enum: [
            EulogiseUserRole.VISITOR,
            EulogiseUserRole.VISITOR_BOOKLET,
            EulogiseUserRole.VISITOR_SLIDESHOW,
            EulogiseUserRole.VISITOR_SIDED_CARD,
            EulogiseUserRole.VISITOR_BOOKMARK,
            EulogiseUserRole.VISITOR_THANKYOUCARD,
            EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN,
            EulogiseUserRole.VISITOR_PHOTOBOOK,
            EulogiseUserRole.CONTRIBUTOR,
            EulogiseUserRole.EDITOR,
            EulogiseUserRole.CUSTOMER,
            EulogiseUserRole.COEDITOR,
            EulogiseUserRole.CLIENT,
          ],
          required: true,
        },
        // invitor name
        invitorFullName: {
          type: String,
        },
        fullName: {
          type: String,
        },
        email: {
          type: String,
          index: {
            type: 'global',
            name: 'email-index',
          },
        },
        case: {
          type: String,
          index: {
            type: 'global',
            name: 'case-index',
          },
        },
        client: {
          type: String,
        },
        token: {
          type: String,
          required: true,
          index: {
            type: 'global',
            name: 'token-index',
          },
        },
        status: {
          type: String,
          enum: ['pending', 'sent', 'error', 'accepted'],
          default: 'pending',
        },
        hasClientUserResetPassword: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
      },
    )

    super('invite', schema)
  }

  public async query(
    search: any,
    attributes?: any,
  ): Promise<IInviteModel.Schema[]> {
    console.log('model query', search, attributes)
    return this.getModel().scan(search).attributes(attributes).all().exec()
  }

  public async save(
    inviteObj: IInviteModel.Schema,
  ): Promise<IInviteModel.Schema> {
    if (!inviteObj.id) {
      return this.create(inviteObj)
    } else {
      return this.update(inviteObj)
    }
  }

  public async getInviteCountByCaseId(caseId: string): Promise<number> {
    const { count } = await this.getModel()
      .query({
        case: caseId,
        role: {
          in: [
            EulogiseUserRole.EDITOR,
            EulogiseUserRole.COEDITOR,
            EulogiseUserRole.CONTRIBUTOR,
          ],
        },
        email: { ne: NO_REPLY_EULOGISE_EMAIL },
      })
      .count()
      .all()
      .exec()
    return count
  }

  public async findByToken(token: string): Promise<Array<IInviteModel.Schema>> {
    return this.getModel().query({ token }).exec()
  }

  public async findOneByToken(token: string): Promise<IInviteModel.Schema> {
    const invites = await this.getModel().query({ token }).limit(1).exec()
    return invites[0]
  }

  private getValidEmail(email: string): string {
    return email.toLowerCase().trim()
  }

  public async findByEmail(email: string): Promise<Array<IInviteModel.Schema>> {
    const validEmail = this.getValidEmail(email)
    const [invites, invitesWithValidEmail] = await Promise.all([
      this.getModel().query({ email }).exec(),
      this.getModel().query({ email: validEmail }).exec(),
    ])
    return [...invites, ...invitesWithValidEmail]
  }

  public async findOneByEmail(email: string): Promise<IInviteModel.Schema> {
    const validEmail = this.getValidEmail(email)
    console.log('findOneByEmail', email)
    const [invites, invitesWithValidEmail] = await Promise.all([
      this.getModel().query({ email }).limit(1).exec(),
      this.getModel().query({ email: validEmail }).limit(1).exec(),
    ])
    console.log('find invites', { invites, invitesWithValidEmail })
    return invites[0] ?? invitesWithValidEmail[0]
  }

  public async findOneById(id: string): Promise<IInviteModel.Schema> {
    const invites = await this.getModel().query({ id }).limit(1).exec()
    return invites[0]
  }

  public async create(
    inviteObj: IInviteModel.Schema,
  ): Promise<IInviteModel.Schema> {
    let inviteResult: IInviteModel.Schema
    const saveQuery: IInviteModel.Schema = {
      id: uuid.v4(),
      invitorFullName: inviteObj.invitorFullName,
      fullName: inviteObj.fullName,
      email: inviteObj.email ? this.getValidEmail(inviteObj.email) : undefined,
      case: inviteObj.case,
      client: inviteObj.client,
      hasClientUserResetPassword: inviteObj.hasClientUserResetPassword,
      role: inviteObj.role,
      token: uuid.v4(),
      status: inviteObj.status
        ? inviteObj.status
        : ('pending' as IInviteModel.Status),
    }

    try {
      inviteResult = await this.getModel().create(saveQuery)
    } catch (error) {
      throw error
    }

    return inviteResult
  }

  public async update(
    inviteObj: IInviteModel.Schema,
  ): Promise<IInviteModel.Schema> {
    let inviteResult: IInviteModel.Schema

    const saveQuery = [
      'invitorFullName',
      'fullName',
      'email',
      'case',
      'client',
      'role',
      'status',
      'hasClientUserResetPassword',
    ].reduce((query, key) => {
      if (inviteObj.hasOwnProperty(key)) {
        query[key] = (inviteObj as any)[key]
      }
      return query
    }, {} as { [key: string]: any })
    if (inviteObj.email) {
      saveQuery.email = this.getValidEmail(inviteObj.email)
    }

    try {
      await this.getModel().update({ id: inviteObj.id }, saveQuery)
      inviteResult = await this.getModel().get(inviteObj.id!)
    } catch (error) {
      throw error
    }

    return inviteResult
  }

  public async findOneByUserId(userId: string): Promise<IInviteModel.Schema> {
    const userObj = await userModel.findById(userId)
    if (!userObj.id) {
      console.log('userObj is not found', userObj)
      throw new Error('userObj is not found')
    }
    return await this.findOneByEmail(userObj.email)
  }

  public scope(
    type: 'public',
    inviteObj: IInviteModel.Schema,
  ): IInviteModel.PublicSchema | undefined {
    if (type === 'public') {
      return {
        id: inviteObj.id,
        invitorFullName: inviteObj.invitorFullName,
        fullName: inviteObj.fullName,
        email: inviteObj.email
          ? this.getValidEmail(inviteObj.email)
          : undefined,
        case: inviteObj.case,
        client: inviteObj.client,
        hasClientUserResetPassword: inviteObj.hasClientUserResetPassword!,
        role: inviteObj.role,
        status: inviteObj.status,
        createdAt: inviteObj.createdAt,
        updatedAt: inviteObj.updatedAt,
      }
    }
    return
  }
}

export const inviteModel = new InviteModel()
