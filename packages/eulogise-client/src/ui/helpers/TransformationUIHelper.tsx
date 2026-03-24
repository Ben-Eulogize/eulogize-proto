import {
  AssetType,
  EulogiseCardProducts,
  EulogiseProduct,
  IImageAsset,
  IImageAssetContent,
} from '@eulogise/core'
import {
  removeAsset,
  saveImageWithInsertIndex,
  uploadingEditedImageStart,
} from '../store/AssetState/actions'
import { client as filestack } from 'filestack-react'
import { EulogiseClientConfig } from '@eulogise/client-core'
import { IAllActiveCardProducts } from '@eulogise/core'

export interface ITransformationUIResponse {
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

export interface ITransofrmationUIUploadedResponse {
  container: string
  handle: string
  key: string
  status: string
  uploadTags: string | undefined
  url: string
  workflows: string | undefined
  _file: Record<string, any>
  _sanitizeOptions: string | undefined
  filename: string
  mimetype: string
  name: string
  size: number
  type: string
}

export interface ITranformationUIProps {
  image: IImageAsset
  caseId: string
  dispatch: any
  updatedCardProducts: Array<EulogiseProduct>
  needUpdateSlideshow: boolean
  needUpdatePrimaryImage?: boolean
  onChangePrimaryImage?: (image: IImageAsset) => void
  onReplaceAllProductsWithEditedImageContent?: ({
    updatedCardProducts,
    editingImageContent,
    newEditedImageContent,
    needUpdateSlideshow,
  }: {
    updatedCardProducts: Array<EulogiseCardProducts>
    editingImageContent: IImageAssetContent
    newEditedImageContent: IImageAssetContent
    needUpdateSlideshow: boolean
  }) => void
  originPhotoIndex?: number
  onSaveNewCustomisedImageOrderIds?: (
    newImageId: string,
    newImageInsertIndex: number,
  ) => void
}

export const TranformationUIHelper = {
  openTranformationUI: ({
    image,
    caseId,
    dispatch,
    updatedCardProducts,
    needUpdateSlideshow = false,
    needUpdatePrimaryImage = false,
    onChangePrimaryImage,
    onReplaceAllProductsWithEditedImageContent,
    originPhotoIndex = -1,
    onSaveNewCustomisedImageOrderIds,
  }: ITranformationUIProps) => {
    const imageId = image?.id
    const imageContent = image?.content
    const IMAGE_STORAGE_URL: string = `cases/${caseId}/gallery`
    const imageUrl: string = `${EulogiseClientConfig.FILESTACK_CDN}/${imageContent?.filestackHandle}`
    const client: filestack.Client = filestack.init(
      EulogiseClientConfig.FILESTACK_API_KEY!,
    )
    //@ts-ignore
    const tr = new FilestackTransform(EulogiseClientConfig.FILESTACK_API_KEY)

    tr.setConfig({
      output: {
        format: 'png',
        blob: true,
      },
    })

    tr.open(imageUrl).then((res: ITransformationUIResponse) => {
      dispatch(
        uploadingEditedImageStart({
          uploadingEditedImageIndex: originPhotoIndex,
        }),
      )
      client
        .upload(res as any)
        .then(async (uploadRes: ITransofrmationUIUploadedResponse) => {
          const newEditedImageContent: IImageAssetContent = {
            filename: uploadRes.key.split('/').pop()!,
            filepath: `${IMAGE_STORAGE_URL}/${uploadRes.key}`,
            filestackHandle: uploadRes.handle!,
          }

          const editedImage: IImageAsset = {
            content: newEditedImageContent,
            case: caseId,
            type: AssetType.IMAGE,
          }

          // Remove original image
          if (imageId) {
            dispatch(
              removeAsset({
                assetId: imageId,
                assetType: AssetType.IMAGE,
                onSuccess: () => {},
              }),
            )
          }

          // Save image and insert in the original position
          dispatch(
            saveImageWithInsertIndex({
              file: {
                content: newEditedImageContent,
                case: caseId,
                type: AssetType.IMAGE,
              },
              newImageInsertIndex: originPhotoIndex,
              onSaveNewCustomisedImageOrderIds,
            }),
          )

          // Editing image from Photo library
          if (onReplaceAllProductsWithEditedImageContent) {
            onReplaceAllProductsWithEditedImageContent({
              updatedCardProducts,
              editingImageContent: imageContent,
              newEditedImageContent,
              needUpdateSlideshow,
            })
          }
          // Update primary image if the edited image is a hero image
          if (needUpdatePrimaryImage && onChangePrimaryImage) {
            onChangePrimaryImage(editedImage)
          }
        })
    })
  },
  getAllUpdatedCardProducts: (
    allActiveCardProducts: IAllActiveCardProducts,
  ): Array<EulogiseCardProducts> => {
    if (!allActiveCardProducts) {
      return []
    }
    let updatedCardProducts = []
    for (const [product, data] of Object.entries(allActiveCardProducts)) {
      if (data) {
        updatedCardProducts.push(product as EulogiseCardProducts)
      }
    }
    return updatedCardProducts
  },
}
