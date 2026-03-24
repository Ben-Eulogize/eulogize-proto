import React from 'react'
import * as filestack from 'filestack-js'
import { PickerOptions } from 'filestack-js'
import { Notification } from '@eulogise/client-components'

import { EulogiseClientConfig } from '@eulogise/client-core'
import { useAssetState, useEulogiseDispatch } from '../../store/hooks'
import {
  saveImagesFromFilestack,
  updateIsFSOverlayPickerOpen,
} from '../../store/AssetState/actions'
import { EulogisePage } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'

const MAX_IMAGE_DIMENSIONS = 10000 * 10000
const GIF_MIME_TYPE = 'image/gif'
const GIF_FILE_EXTENSION = '.gif'
const GIF_NOT_SUPPORTED_ERROR_MESSAGE =
  'GIF files are not supported. Please upload a non-GIF image.'

const isGifFile = (file: filestack.PickerFileMetadata): boolean => {
  const mimetype = file.mimetype?.toLowerCase()
  if (mimetype === GIF_MIME_TYPE) {
    return true
  }

  const filename = (file.filename || '').toLowerCase().trim()
  return filename.endsWith(GIF_FILE_EXTENSION)
}

async function checkImageDimensions(
  file: filestack.PickerFileMetadata,
  maxDimension = MAX_IMAGE_DIMENSIONS,
): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    let url: string | null = null

    // Handle different file sources
    if (file.originalFile && file.originalFile instanceof Blob) {
      // Local file - use createObjectURL
      url = URL.createObjectURL(file.originalFile)
      img.src = url
    } else if (file.url) {
      // Remote file (Google Drive, etc.) - use the file URL directly
      // Google Drive images may have authentication in the URL
      img.src = file.url
    } else {
      console.warn('No valid image source found for dimension check')
      resolve(false) // Assume valid if we can't check
      return
    }

    img.onload = function () {
      if (url) {
        URL.revokeObjectURL(url) // Clean up memory only for blob URLs
      }
      const imgNaturalDimension =
        ((this as HTMLImageElement).naturalHeight ?? 1) *
        ((this as HTMLImageElement).naturalWidth ?? 1)
      const isOverLimit = imgNaturalDimension > maxDimension
      console.log(
        `Image dimensions: ${(this as HTMLImageElement).naturalHeight} x ${
          (this as HTMLImageElement).naturalWidth
        }`,
      )
      resolve(isOverLimit)
    }

    img.onerror = function () {
      if (url) {
        URL.revokeObjectURL(url) // Clean up memory only for blob URLs
      }
      console.error('Error loading image for dimension check:', file.filename)
      // For Google Drive images that fail due to rate limiting (429) or auth issues,
      // we'll assume they're valid to allow the upload to proceed
      resolve(false) // Assume valid if we can't check
    }
  })
}

interface IFSPickerImageOverlayProps {
  onUploadStarted?: () => void
  caseId: string | undefined
  locationPathname: string
}

const FS_API_KEY = EulogiseClientConfig.FILESTACK_API_KEY

const FSPickerImageOverlay: React.FunctionComponent<
  IFSPickerImageOverlayProps
> = ({ caseId, onUploadStarted, locationPathname }) => {
  const dispatch = useEulogiseDispatch()
  const {
    isFilestackOverlayPickerOpen,
    filestackOverlayPickerUploadAssetType,
  } = useAssetState()

  if (
    !FS_API_KEY ||
    !isFilestackOverlayPickerOpen ||
    !filestackOverlayPickerUploadAssetType ||
    !caseId
  ) {
    return null
  }

  const getOverlayImageUploaderProps = ({ caseId }: { caseId: string }) => {
    return {
      pickerOptions: {
        maxSize: 1024 * 1024 * 256, //256MB
        cleanupImageExif: {
          keepOrientation: true,
          keepICCandAPP: true,
        },
        disableAltText: true,
        accept: 'image/*',
        acceptFn: async (file: filestack.PickerFileMetadata) => {
          if (isGifFile(file)) {
            throw new Error(GIF_NOT_SUPPORTED_ERROR_MESSAGE)
          }

          return ''
        },
        maxFiles: 100,
        allowManualRetry: true,
        fromSources: [
          'local_file_system',
          'facebook',
          'instagram',
          'googledrive',
          'dropbox',
          'gmail',
          'picasa',
        ],
        storeTo: {
          location: 's3',
          path: `/cases/${caseId}/gallery/`,
          container: EulogiseClientConfig.AWS_S3_BUCKET,
          region: EulogiseClientConfig.AWS_REGION,
        },
        concurrency: 20,
        uploadInBackground: true,
        exposeOriginalFile: true,
        disableTransformer: false,
        onUploadStarted: () => {
          if (onUploadStarted) {
            onUploadStarted()
          }
        },
        onFileSelected: async (file: filestack.PickerFileMetadata) => {
          if (isGifFile(file)) {
            throw new Error(GIF_NOT_SUPPORTED_ERROR_MESSAGE)
          }

          // Early exit for non-image files (shouldn't happen with accept filter)
          if (file.mimetype && !file.mimetype.startsWith('image/')) {
            console.log('Not an image file')
            return
          }

          try {
            const isTooLarge = await checkImageDimensions(file)
            console.log('isTooLarge', isTooLarge)
            if (isTooLarge) {
              throw new Error(
                `Image (${file.filename}) dimensions exceed the maximum allowed size (10000 x 10000 pixels)`,
              )
            }
          } catch (error: unknown) {
            const message = (error as Error)?.message ?? ''
            console.warn(
              '[Image Uploader - Dimension Check Error]:',
              error,
              'file.filename',
              file.filename,
            )
            throw new Error(message)
          }
        },
        onClose: () => {
          dispatch(
            updateIsFSOverlayPickerOpen({
              isFilestackOverlayPickerOpen: false,
              filestackOverlayPickerUploadAssetType: null,
            }),
          )
        },
        onUploadDone: (result: filestack.PickerResponse) => {
          const { filesUploaded = [] } = result
          if (filesUploaded?.length > 0) {
            dispatch(
              saveImagesFromFilestack({
                caseId,
                files: filesUploaded,
                complete: () => {
                  Notification.success(
                    `${filesUploaded?.length} ${
                      filesUploaded?.length === 1 ? 'photo' : 'photos'
                    } uploaded.`,
                  )
                  if (/\/admin\/dashboard/.test(locationPathname)) {
                    NavigationHelper.navigate(EulogisePage.PHOTO_LIBRARY)
                  }
                  dispatch(
                    updateIsFSOverlayPickerOpen({
                      isFilestackOverlayPickerOpen: false,
                      filestackOverlayPickerUploadAssetType: null,
                    }),
                  )
                },
              }),
            )
          }
        },
      } as PickerOptions,
    }
  }

  const { pickerOptions } = getOverlayImageUploaderProps({
    caseId,
  })

  const client: filestack.Client = filestack.init(FS_API_KEY)
  client.picker(pickerOptions).open()
  return null
}

export default FSPickerImageOverlay
