/**
 * Files with a `filestackHandle` must be user generated.
 * Files with _only_ a `filename & filepath` are static / default.
 */

import { createGlobalStyle } from 'styled-components'
import { GENERATOR_CONFIG } from '../config'
import { IFilestackImageEnhancePreset } from '@eulogise/core'

function getImageUrl(image: any, options: any) {
  if (image.filestackHandle) {
    let imageUrl = `${GENERATOR_CONFIG.FILESTACK_CDN}`
    const enhancePresetTask = `enhance=preset:${image.preset}`

    if (image.preset && image.preset !== IFilestackImageEnhancePreset.NULL) {
      imageUrl = imageUrl + `/${enhancePresetTask}`
    }
    if (options && options.width && options.height) {
      imageUrl =
        imageUrl +
        `/resize=width:${options.width},height:${options.height}/compress`
    }
    imageUrl = imageUrl + `/${image.filestackHandle}`

    return imageUrl
  }

  if (image.filepath) {
    return `${options.bucketUrl}/${image.filepath}`
  }

  /** static content */
  if (image.filename && !image.filepath) {
    return `${options.bucketUrl}/${image.filename}`
  }

  console.log('image', image)
  console.log('image.filename', image.filename)
  if (!image.filename && !image.filepath) {
    return
  }

  return `${options.bucketUrl}/cases/${options.caseId}/gallery/${image.filename}`
}

export const GeneratorMediaHelper = {
  getImageUrl,
  loadGoogleFonts: async () => {
    try {
      await createGlobalStyle`
      @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap'); 
    `
      console.log('✅ Google Fonts Loaded successfully!')
    } catch (error) {
      console.log('❌ Google Fonts Loading Failed! Error is ', error)
    }
  },
}

export default GeneratorMediaHelper
