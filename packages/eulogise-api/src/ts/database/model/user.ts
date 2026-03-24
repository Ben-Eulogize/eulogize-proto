import dynamoose from 'dynamoose'
import * as uuid from 'uuid'
import bcrypt from 'bcryptjs'
import { IUserModel } from '../types/UserModel.types'
import { BaseModel } from './BaseModel'
import { EulogiseUserRole } from '@eulogise/core'
import { UtilHelper } from '@eulogise/helpers'

const UPDATABLE_FIELDS = [
  'fullName',
  'email',
  'clientRole',
  'password',
  'phone',
  'firstStreetAddress',
  'secondStreetAddress',
  'city',
  'state',
  'postcode',
  'token',
  'shadowToken',
  'verified',
  'role',
  'showOnBoardingHelperEveryTime',
  'acceptMarketing',
  'acceptTerms',
  'userGuideHelperConfig',
  'stripe',
]

class UserModel extends BaseModel<IUserModel.Model, IUserModel.Schema> {
  constructor() {
    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
          // validate: (v: string) => v.length === 36,
          hashKey: true,
        },
        fullName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          index: {
            type: 'global',
            name: 'email-index',
          },
        },
        clientRole: {
          type: String, // IClientRole: Admin / Operator (default: Operator)
        },
        phone: {
          type: String,
        },
        firstStreetAddress: {
          type: String,
        },
        secondStreetAddress: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        postcode: {
          type: String,
        },
        password: {
          type: String,
        },
        token: {
          type: String,
          index: {
            type: 'global',
            name: 'token-index',
          },
        },
        shadowToken: {
          type: String,
        },
        verified: {
          type: Boolean,
          required: true,
        },
        role: {
          type: String,
          enum: [
            EulogiseUserRole.CUSTOMER,
            EulogiseUserRole.CLIENT,
            EulogiseUserRole.ADMIN,
            EulogiseUserRole.COEDITOR,
            EulogiseUserRole.EDITOR,
          ],
        },
        showOnBoardingHelperEveryTime: {
          type: Boolean,
        },
        acceptTerms: {
          type: Boolean,
        },
        acceptMarketing: {
          type: Boolean,
        },
        userGuideHelperConfig: {
          type: Object,
        },
        stripe: {
          type: Object,
        },
      },
      {
        saveUnknown: ['userGuideHelperConfig.**', 'stripe.**'],
        timestamps: true,
      },
    )

    super('user', schema)
  }

  public async findOne(search: any): Promise<IUserModel.Schema | undefined> {
    const results = await this.query(search)
    if (!results) {
      return
    }
    return results[0]
  }

  public async query(
    search: any,
    attributes?: any,
  ): Promise<IUserModel.Schema[]> {
    return this.getModel().scan(search).attributes(attributes).all().exec()
  }

  public async findByToken(token: string): Promise<Array<IUserModel.Schema>> {
    return this.getModel().query({ token }).exec()
  }

  public async findOneByToken(token: string): Promise<IUserModel.Schema> {
    const users = await this.getModel().query({ token }).limit(1).exec()
    return users[0]
  }

  public async findByEmail(email: string): Promise<Array<IUserModel.Schema>> {
    const validEmail = this.getValidEmail(email)
    const [users, usersWithValidEmail] = await Promise.all([
      this.getModel().query({ email }).limit(1).exec(),
      this.getModel().query({ email: validEmail }).limit(1).exec(),
    ])
    return [...users, ...usersWithValidEmail]
  }

  private getValidEmail(email: string): string {
    return email.toLowerCase().trim()
  }

  public async isExists(query: any): Promise<boolean> {
    let newQuery = query
    if (query.email) {
      return !!(await this.findOneByEmail(query.email))
    }
    console.log('isExists', newQuery)
    return super.isExists(newQuery)
  }

  public async findById(id: string): Promise<IUserModel.Model> {
    const user = (await super.findById(id)) as IUserModel.Model
    if (user) {
      user.password = undefined
    }
    return user
  }

  public async findByPartialEmail(
    partialEmail: string,
  ): Promise<Array<IUserModel.Schema>> {
    const query = partialEmail.toLowerCase().trim()
    return this.getModel().scan().filter('email').contains(query).all().exec()
  }

  public async findOneByEmail(
    email: string,
  ): Promise<IUserModel.Schema | undefined> {
    const validEmail = this.getValidEmail(email)
    console.log('findOneByEmail', [email, validEmail])
    const [users, usersWithValidEmail] = await Promise.all([
      this.getModel().query({ email }).limit(1).exec(),
      this.getModel().query({ email: validEmail }).limit(1).exec(),
    ])
    const [user1] = users
    const [userWithValidEmail1] = usersWithValidEmail
    console.log('findOneByEmail users', users)
    if (!user1 && !userWithValidEmail1) {
      return undefined
    }
    return { password: undefined, ...(user1 ?? userWithValidEmail1) }
  }

  public async save(userObj: IUserModel.Schema): Promise<IUserModel.Schema> {
    if (!userObj.id) {
      return this.create(userObj)
    } else {
      return this.update(userObj)
    }
  }

  public async create(
    userObj: IUserModel.InputSchema,
  ): Promise<IUserModel.Schema> {
    let userResult: IUserModel.Schema

    const saveQuery = {
      id: uuid.v4(),
      fullName: userObj.fullName,
      email: this.getValidEmail(userObj.email),
      phone: userObj.phone,
      firstStreetAddress: userObj.firstStreetAddress,
      secondStreetAddress: userObj.secondStreetAddress,
      city: userObj.city,
      state: userObj.state,
      postcode: userObj.postcode,
      password: userObj.password,
      token: uuid.v4(),
      shadowToken: userObj.shadowToken,
      verified: false,
      role: userObj.role,
      showOnBoardingHelperEveryTime: userObj.showOnBoardingHelperEveryTime,
      acceptTerms: userObj.acceptTerms,
      acceptMarketing: userObj.acceptMarketing,
      userGuideHelperConfig: userObj.userGuideHelperConfig,
    }

    try {
      userResult = await this.getModel().create(saveQuery)
    } catch (error) {
      throw error
    }

    return userResult
  }

  public async update(userObj: IUserModel.Schema): Promise<IUserModel.Schema> {
    let userResult: IUserModel.Schema

    const saveQuery = UPDATABLE_FIELDS.reduce((query, key) => {
      if (userObj.hasOwnProperty(key)) {
        query[key] = (userObj as any)[key]
      } else {
        // Automatically update onboarding helper property
        if (key === 'showOnBoardingHelperEveryTime') {
          query[key] = true
        }
      }
      return query
    }, {} as { [key: string]: any })

    // Ensure email is always lowercase
    const email = saveQuery.email
    saveQuery.email = this.getValidEmail(email)

    console.log(`updating user ${email} userObj`, userObj)
    console.log(`updating user ${email} saveQuery`, saveQuery)
    try {
      // Make sure user password will not be removed by the update function
      if (!saveQuery.password) {
        console.log('USER-UPDATE - password should not be removed', email)
        delete saveQuery.password
      }
      await this.getModel().update({ id: userObj.id }, saveQuery)
      userResult = await this.getModel().get(userObj.id!)
    } catch (error) {
      throw error
    }

    return userResult
  }

  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  public async checkPassword(hash: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  public async queryByUserIdsGroupById(
    userIds: Array<string>,
    attributes: Array<string>,
  ): Promise<{ [key: string]: IUserModel.Schema }> {
    console.log('queryByUserIdsGroupById modelName', this.modelName, {
      userIds: UtilHelper.uniq(userIds),
      attributes,
    })
    const records = await this.getModel().batchGet(UtilHelper.uniq(userIds), {
      attributes,
    })

    console.log(
      'queryByUserIdsGroupById modelName complete',
      this.getModelName(),
      records.length,
    )

    const users = records.reduce((acc: any, user) => {
      acc[user.id!] = user
      return acc
    }, {})
    console.log('completed: queryByUserIdsGroupById modelName', this.modelName)
    return users
  }

  public scope(
    type: 'public',
    userObj: IUserModel.Schema,
  ): IUserModel.PublicSchema | undefined {
    if (type === 'public') {
      return {
        id: userObj.id!,
        fullName: userObj.fullName,
        email: this.getValidEmail(userObj.email),
        phone: userObj.phone,
        firstStreetAddress: userObj.firstStreetAddress,
        secondStreetAddress: userObj.secondStreetAddress!,
        city: userObj.city,
        state: userObj.state,
        postcode: userObj.postcode,
        verified: userObj.verified,
        role: userObj.role,
        createdAt: userObj.createdAt,
        updatedAt: userObj.updatedAt,
        showOnBoardingHelperEveryTime: userObj.showOnBoardingHelperEveryTime,
        acceptTerms: userObj.acceptTerms,
        acceptMarketing: userObj.acceptMarketing,
        userGuideHelperConfig: userObj.userGuideHelperConfig,
      } as IUserModel.PublicSchema
    }
    return
  }
}

export const userModel = new UserModel()
