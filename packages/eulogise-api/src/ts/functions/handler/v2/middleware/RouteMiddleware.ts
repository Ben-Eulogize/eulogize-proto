import {
  EulogiseProduct,
  EulogiseUserRole,
  EULOGIZE_LOGGED_IN_USER_ROLES,
} from '@eulogise/core'
import { BaseProductResourceController } from '../../../controller/resource/BaseProductResourceController'
import { Lambdur } from 'lambdur'
import {
  bookletResourceController,
  bookmarkResourceController,
  genericCardProductResourceController,
  sidedCardResourceController,
  slideshowResourceController,
  slideshowTitleSlideResourceController,
  thankyouCardResourceController,
  tvWelcomeScreenResourceController,
} from '../../../controller'
import {
  V2RouteBaseRequestEvent,
  V2RouteContext,
} from '../../../../types/routes.types'
import {
  getExternalV2APIPartnerNameByAPIKey,
  isAPIKeyHasPermission,
  isAPIKeyValid,
} from '../../../../config/ExternalAPIConfig'
import * as Errors from '../../../error'
import { photobookResourceController } from '../../../controller/resource/photobook'
import { shareModel } from '../../../../database'
import { IShareModel } from '../../../../database/types/ShareModel.types'

export class RouteMiddleware {
  private static getProductController(
    product: EulogiseProduct,
  ): BaseProductResourceController {
    switch (product) {
      case EulogiseProduct.BOOKLET: {
        return bookletResourceController
      }
      case EulogiseProduct.BOOKMARK: {
        return bookmarkResourceController
      }
      case EulogiseProduct.SLIDESHOW: {
        return slideshowResourceController
      }
      case EulogiseProduct.SLIDESHOW_TITLE_SLIDE: {
        return slideshowTitleSlideResourceController
      }
      case EulogiseProduct.SIDED_CARD: {
        return sidedCardResourceController
      }
      case EulogiseProduct.THANK_YOU_CARD: {
        return thankyouCardResourceController
      }
      case EulogiseProduct.TV_WELCOME_SCREEN: {
        return tvWelcomeScreenResourceController
      }
      case EulogiseProduct.PHOTOBOOK: {
        return photobookResourceController
      }
      case EulogiseProduct.GENERIC_CARD_PRODUCT: {
        return genericCardProductResourceController
      }
      default:
        throw new Error(`"${product}" is not supported`)
    }
  }

  public static productMiddleware(
    fn: (
      req: V2RouteBaseRequestEvent,
      context: V2RouteContext,
      pathParams: object,
      productController: BaseProductResourceController,
      eulogiseProduct: EulogiseProduct,
    ) => Promise<any>,
  ) {
    return (
      req: V2RouteBaseRequestEvent,
      context: V2RouteContext,
      pathParams: { product: string; productId: string },
    ) => {
      const { product } = pathParams
      const eulogiseProduct = product.toUpperCase() as EulogiseProduct
      const productController = this.getProductController(eulogiseProduct)
      return fn(req, context, pathParams, productController, eulogiseProduct)
    }
  }

  public static authApiKeyMiddleware(
    fn: (
      req: V2RouteBaseRequestEvent,
      context: V2RouteContext,
      pathParams: any,
    ) => Promise<any>,
  ) {
    const stage = process.env.STAGE
    return (
      req: V2RouteBaseRequestEvent,
      context: V2RouteContext,
      pathParams: any,
    ) => {
      const {
        headers: { 'api-key': apiKey },
      } = req
      console.log(
        'auth - apiKey',
        apiKey,
        'partner',
        getExternalV2APIPartnerNameByAPIKey({
          stage,
          apiKey,
        }),
      )
      if (!apiKey) {
        throw new Lambdur.Error(Errors.externalAPIErrors.create.apiKeyMissing())
      }
      if (
        !isAPIKeyValid({
          stage,
          apiKey,
        })
      ) {
        throw new Lambdur.Error(Errors.externalAPIErrors.create.invalidApiKey())
      }

      const routePath = req?.requestContext?.path

      if (
        !isAPIKeyHasPermission({
          stage,
          apiKey,
          routePath,
        })
      ) {
        throw new Lambdur.Error(
          Errors.externalAPIErrors.create.APIKeyNoPermission(),
        )
      }

      return fn(req, context, pathParams)
    }
  }

  public static shareMiddleware(
    fn: (
      req: V2RouteBaseRequestEvent,
      context: V2RouteContext,
      pathParams: { caseId: string },
      share: IShareModel.Model,
    ) => Promise<any>,
  ) {
    return async (
      req: V2RouteBaseRequestEvent,
      context: V2RouteContext,
      pathParams: { caseId: string },
    ) => {
      const { caseId } = pathParams
      const share = await shareModel.findByCaseId(caseId)
      if (!share) {
        throw new Error(`case (${caseId}) has not been shared`)
      }
      return fn(req, context, pathParams, share?.[0])
    }
  }

  public static authMiddleware(
    permitRoles: Array<EulogiseUserRole>,
    fn: (
      req: V2RouteBaseRequestEvent,
      context: V2RouteContext,
      pathParams: any,
    ) => Promise<any>,
  ) {
    return (
      req: V2RouteBaseRequestEvent,
      context: V2RouteContext,
      pathParams: any,
    ) => {
      if (!permitRoles.includes(req.webtoken.role)) {
        throw new Error(
          `"${req.webtoken.role}" role does not have permission to use this endpoint`,
        )
      }
      return fn(req, context, pathParams)
    }
  }

  public static loggedInUserMiddleware(
    fn: (
      req: V2RouteBaseRequestEvent,
      context: V2RouteContext,
      pathParams: any,
    ) => Promise<any>,
  ) {
    return this.authMiddleware(EULOGIZE_LOGGED_IN_USER_ROLES, fn)
  }
}
