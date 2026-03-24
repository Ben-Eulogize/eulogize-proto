import { EulogiseResource } from '@eulogise/core'

export const requestTokenResponses = {
  existedUserId: {
    token: 'mockToken',
    expect: ['mockToken', null],
  },
  nonExistedUserId: {
    token: null,
    expect: [null, 'user not existed!'],
  },
}

const RequestHelper = {
  userShadowTokenRequest: (resource: EulogiseResource, userId: string) => {
    return new Promise((resolve, reject) => {
      if (userId === 'existedUserId') {
        return resolve({
          data: { token: requestTokenResponses.existedUserId.token },
        })
      } else if (userId === 'nonExistedUserId') {
        return reject('user not existed!')
      } else {
        throw Error('request token error!')
      }
    })
  },
}

export default RequestHelper
