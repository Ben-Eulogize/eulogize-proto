import { GENERATOR_CONFIG } from '../config'
import { EXPORT_PRODUCT_NAME } from './constants'

const TMP_DIR = process.env.TMP_DIR
  ? process.env.TMP_DIR
  : process.env.STAGE === 'development'
  ? './output/tmp'
  : '/tmp'

export class FrameHelper {
  public static getHumanReadableTime(startTime: number): {
    humanTime: string
    totalTime: number
  } {
    const end: any = new Date()
    const totalTime = end - startTime
    const seconds = totalTime / 1000
    let humanTime = `${seconds} seconds`
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60)
      const rest = Math.floor(seconds % 60)
      humanTime = `${minutes} minute${
        minutes > 1 ? 's' : ''
      } and ${rest} second${rest > 1 ? 's' : ''}`
    }
    return { humanTime, totalTime }
  }

  public static logHumanTime(startTime: number) {
    const { totalTime, humanTime } = this.getHumanReadableTime(startTime)
    console.log(`🎥 Rendering took ${totalTime} ms`)
    console.log(`🕰 Or ${humanTime} in humanTime`)
  }

  public static getVideoBlockFilePaths({
    caseId,
    noOfBlocks,
  }: {
    caseId: string
    noOfBlocks: number
  }): Array<string> {
    return Array.from({ length: noOfBlocks }).map((_, blockIndex) => {
      return FrameHelper.getVideoBlockFilePath({
        caseId,
        blockIndex,
      })
    })
  }

  public static getVideoBlockFolder(caseId: string): string {
    const tmpOutputFolder = FrameHelper.getCaseTmpDir(caseId)
    return `${tmpOutputFolder}/slideshow-blocks`
  }

  public static getVideoBlockFilePath({
    caseId,
    blockIndex,
  }: {
    caseId: string
    blockIndex: number
  }) {
    return `${this.getVideoBlockFolder(caseId)}/Slideshow-${blockIndex}.mp4`
  }

  public static getSlideshowNoAudioTmpFilePath(caseId: string) {
    return `${this.getCaseTmpDir(caseId)}/Slideshow-without-audio.mp4`
  }

  public static getSlideshowTmpFilePath(caseId: string) {
    return `${this.getCaseTmpDir(caseId)}/Slideshow.mp4`
  }

  public static getCaseTmpDir(caseId: string) {
    return `${this.getTmpDir()}/${caseId}`
  }

  public static getSlideshowS3Key(caseId: string) {
    return `cases/${caseId}/${EXPORT_PRODUCT_NAME.SLIDESHOW}.mp4`
  }

  public static getFramesPath(caseId: string) {
    return `${this.getCaseTmpDir(caseId)}/frames`
  }

  public static getFramePath(
    caseId: string,
    fileName: string,
    generationId?: string,
  ) {
    return `${this.getBaseFrameFolder(caseId, generationId)}/${fileName}`
  }

  public static getTmpDir() {
    return TMP_DIR
  }

  /**
   * Returns the S3 folder path for frames.
   * When generationId is provided, uses timestamped folder to avoid conflicts
   * with previous generation's frames.
   */
  public static getBaseFrameFolder(caseId: string, generationId?: string) {
    if (generationId) {
      return `cases/${caseId}/${generationId}/frames`
    }
    return `cases/${caseId}/frames`
  }

  /**
   * Returns the S3 folder path for videos.
   * When generationId is provided, uses timestamped folder.
   */
  public static getBaseVideoFolder(caseId: string, generationId?: string) {
    if (generationId) {
      return `cases/${caseId}/${generationId}/videos`
    }
    return `cases/${caseId}/videos`
  }

  // return 000005
  public static getFrameKeyByFrameIndex(frameIndex: number) {
    return `${frameIndex}`.toString().padStart(6, '0')
  }

  public static getFrameKeyWithFileFormatByFrameIndex(frameIndex: number) {
    return `${this.getFrameKeyByFrameIndex(frameIndex)}.${
      GENERATOR_CONFIG.PUPPETEER_FILE_FORMAT
    }`
  }

  // return `cases/${caseId}/frames/${frameIndex}.jpg`
  public static getFrameKeyByCasesIdAndFrameIndex({
    caseId,
    frameIndex,
    generationId,
  }: {
    caseId: string
    frameIndex: number
    generationId?: string
  }) {
    return `${this.getBaseFrameFolder(
      caseId,
      generationId,
    )}/${this.getFrameKeyByFrameIndex(frameIndex)}.${
      GENERATOR_CONFIG.PUPPETEER_FILE_FORMAT
    }`
  }
}
