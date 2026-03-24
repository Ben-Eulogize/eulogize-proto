import { resourceFindHandler } from '../../resource/find'
import { resourceRemoveHandler } from '../../resource/remove'
import { resourceSaveHandler } from '../../resource/save'
import { resourceInviteSend } from '../../resource/invite/send'
import { resourceRemoveMultipleHandler } from '../../resource/remove-multiple'
import { resourceRemoveImageBackgroundHandler } from '../../resource/removeImageBackground'
import { resourceUserShadowTokenHandler } from '../../resource/user/shadow-token'
import { accountSignInHandler } from '../../account/sign/in'
import { accountSignUpHandler } from '../../account/sign/up'
import { accountSignUpCustomerAsClient } from '../../account/sign/up-customer-as-client'
import { accountSignCheckHandler } from '../../account/sign/check'
import { accountSaveHandler } from '../../account/save'
import { accountForgotPasswordHandler } from '../../account/forgot-password'
import { accountResetPasswordHandler } from '../../account/reset-password'
import { paymentCreateHandler } from '../../payment/create'
import { accountSignUpFuneralDirectorAsAdmin } from '../../account/sign/up-funeral-director-as-admin'
import { accountSignUpCoEditor } from '../../account/sign/up-co-editor'
import { resourceGeneratePreSignedUrlHandler } from '../../resource/asset/generatePreSignedUrl'
import { accountVerifyEmailHandler } from '../../account/verify-email'

export default {
  '/old/resource/find': {
    POST: resourceFindHandler,
  },
  '/old/resource/remove': {
    POST: resourceRemoveHandler,
  },
  '/old/resource/save': {
    POST: resourceSaveHandler,
  },
  '/old/resource/invite/send': {
    POST: resourceInviteSend,
  },
  '/old/resource/remove-multiple': {
    POST: resourceRemoveMultipleHandler,
  },
  '/old/resource/removeImageBackground': {
    POST: resourceRemoveImageBackgroundHandler,
  },
  '/old/resource/user/shadow-token': {
    POST: resourceUserShadowTokenHandler,
  },
  '/old/account/sign/in': {
    POST: accountSignInHandler,
  },
  '/old/account/sign/up': {
    POST: accountSignUpHandler,
  },
  '/old/account/sign/up-customer-as-client': {
    POST: accountSignUpCustomerAsClient,
  },
  '/old/account/sign/check': {
    POST: accountSignCheckHandler,
  },
  '/old/account/save': {
    POST: accountSaveHandler,
  },
  '/old/account/forgot-password': {
    POST: accountForgotPasswordHandler,
  },
  '/old/account/reset-password': {
    POST: accountResetPasswordHandler,
  },
  '/old/account/verify-email': {
    POST: accountVerifyEmailHandler,
  },
  '/old/payment/create': {
    POST: paymentCreateHandler,
  },
  '/old/account/sign/up-funeral-director-as-admin': {
    POST: accountSignUpFuneralDirectorAsAdmin,
  },
  '/old/account/sign/up-co-editor': {
    POST: accountSignUpCoEditor,
  },
  '/old/resource/asset/generatePreSignedUrl': {
    POST: resourceGeneratePreSignedUrlHandler,
  },
}
