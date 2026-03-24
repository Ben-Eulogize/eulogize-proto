import fsExtra from 'fs-extra'
import ffmpeg from 'fluent-ffmpeg'
import { LambdaHelper } from '../helpers/LambdaHelper'
import BBPromise from 'bluebird'
import {
  GeneratorProcessJobTypes,
  SlaveFinaliseVideoProcessPayload,
  SlaveVideoBlockGenerationProcessPayload,
} from '../types/GeneratorProcessJob.types'
import { S3Helper } from '../core/S3Helper'
import { FrameHelper } from '../core/FrameHelper'
import { GENERATOR_CONFIG } from '../config'
import {
  ICardProductData,
  ICardProductTheme,
  ISlideshowData,
  ISlideshowTheme,
  SLIDESHOW_FPS,
  TimelineType,
} from '@eulogise/core'
import { AssetHelper, SlideshowHelper, UtilHelper } from '@eulogise/helpers'
import BluebirdPromise from 'bluebird'
import { CONFIG } from '@eulogise/api/src/ts/config/Config'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'
// DON'T ever add PuppeteerSlideshowHelper to this helper, it will make the bundle size too big
// import { PuppeteerSlideshowHelper } from '../core/PuppeteerSlideshowHelper'

const SLIDESHOW_VIDEO_BLOCK_SIZE = 5000 // 5000 = 2 minutes 46 seconds

export class PuppeteerRecorder {
  public static async getCaseFolderByCaseId(
    caseId: string,
  ): Promise<Array<string>> {
    return await S3Helper.listObjects({
      bucket: CONFIG.AWS_S3_BUCKET,
      folder: `cases/${caseId}`,
    })
  }

  public static async deleteCaseFolderByCaseId(
    caseId: string,
    subFolder: 'frames' | 'videos',
    generationId?: string,
  ) {
    const baseFolder = generationId
      ? `cases/${caseId}/${generationId}/${subFolder}`
      : `cases/${caseId}/${subFolder}`
    console.log('deleteCaseFolderByCaseId', {
      caseId,
      folder: baseFolder,
      generationId,
    })
    await S3Helper.deleteFolder(baseFolder)
  }

  /**
   * Cleans up temporary S3 folders after slideshow generation is complete.
   * When generationId is provided, only cleans up that specific generation's folders.
   * Also cleans up any old generation folders (gen-*) for this case.
   */
  public static async cleanupAfterGeneration(
    caseId: string,
    generationId?: string,
  ) {
    console.log('cleanupAfterGeneration', { caseId, generationId })
    const folder = `cases/${caseId}`
    console.log('CONFIG.AWS_S3_BUCKET', CONFIG.AWS_S3_BUCKET)

    try {
      if (generationId) {
        // Delete the specific generation's folders
        console.log(`Deleting generation folder: ${folder}/${generationId}`)
        await S3Helper.deleteFolder(`${folder}/${generationId}`)
      }

      // Also cleanup any old generation folders (gen-*) for this case
      console.log('Listing all generation folders to cleanup old ones')
      const allObjects = await S3Helper.listObjects({ folder })
      const generationPrefixes = new Set<string>()

      // Find all unique generation prefixes (cases/{caseId}/gen-{timestamp}/)
      allObjects.forEach((key) => {
        const match = key.match(new RegExp(`^${folder}/(gen-\\d+)/`))
        if (match && match[1] !== generationId) {
          generationPrefixes.add(`${folder}/${match[1]}`)
        }
      })

      // Delete old generation folders
      for (const prefix of generationPrefixes) {
        console.log(`Deleting old generation folder: ${prefix}`)
        await S3Helper.deleteFolder(prefix)
      }

      // Also delete legacy non-timestamped folders if they exist
      await Promise.all([
        this.deleteCaseFolderByCaseId(caseId, 'frames'),
        this.deleteCaseFolderByCaseId(caseId, 'videos'),
      ])
    } catch (ex) {
      console.log('Error cleaning up folders', ex)
    }
  }

  /**
   * @deprecated Use cleanupAfterGeneration instead.
   * Kept for backwards compatibility - now just calls cleanupAfterGeneration.
   */
  public static async prepareS3Bucket(caseId: string) {
    console.log(
      'prepareS3Bucket (deprecated, use cleanupAfterGeneration)',
      caseId,
    )
    await this.cleanupAfterGeneration(caseId)
  }

  public static mergeAudio(
    tracks: Array<any>,
    outputFolder: string,
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      console.log('mergeAudio tracks', tracks)
      console.log('mergeAudio outputFolder', outputFolder)
      fsExtra.ensureDirSync(outputFolder)
      const audioOutput = `${outputFolder}/audio.mp3`
      console.log('audioOutput', audioOutput)
      const listFilePath = `${outputFolder}/tracks.txt`
      let filenames = ''
      const urls = []
      let complexFilter = ''

      for (let i = 0; i < tracks.length; i++) {
        filenames += `file '${tracks[i].url}'\n`
        console.log('tracks[i]', tracks[i])
        urls.push(tracks[i].url)
        complexFilter += `[${i}:a]`
      }
      console.log('filenames', filenames)
      console.log('listFilePath', listFilePath)

      fsExtra.writeFileSync(listFilePath, filenames)

      console.log('outputFolder', outputFolder)
      const f = ffmpeg()

      /*if (this.onlyMP3(filetypes)) {
        console.log('onlyMP3', filetypes)
        f.input(listFilePath)
          .inputOptions([
            '-f concat',
            '-safe 0',
            '-protocol_whitelist file,https,tcp,tls,crypto',
          ])
          .outputOptions('-c copy')
      } else */ if (tracks.length === 1) {
        console.log('tracks.length', tracks)
        f.input(listFilePath)
          .inputOptions([
            '-f concat',
            '-safe 0',
            '-protocol_whitelist file,https,tcp,tls,crypto',
          ])
          .audioCodec('libmp3lame')
      } else {
        const options = {
          n: `${tracks.length}`,
          a: '1',
          v: '0',
        }
        urls.forEach((url) => {
          f.input(url)
        })
        f.complexFilter([
          {
            inputs: complexFilter,
            filter: 'concat',
            options,
            outputs: ['a'],
          },
        ])
          .outputOptions('-map [a]')
          .audioCodec('libmp3lame')
        console.log('filetypes options', options)
      }

      console.log('saving file', audioOutput)
      f.output(audioOutput)
        .on('error', function (err, stdout, stderr) {
          console.error('ffmpeg error: ', err)
          console.log('ffmpeg stdout:\n' + stdout)
          console.log('ffmpeg stderr:\n' + stderr)
          reject(err)
        })
        .on('end', () => {
          console.log(`🎙 Finished making noise`)
          fsExtra.remove(listFilePath)
          return resolve(audioOutput)
        })
        .run()
    })
  }

  public static ensureVideoBlockFolder({ caseId }: { caseId: string }) {
    const videoPathFolder = FrameHelper.getVideoBlockFolder(caseId)
    console.log('creating videoPathFolder', videoPathFolder)
    fsExtra.ensureDirSync(videoPathFolder)
  }

  public static async downloadAllVideoBlocks({
    caseId,
    noOfBlocks,
    generationId,
  }: {
    caseId: string
    noOfBlocks: number
    generationId?: string
  }) {
    console.log('downloadAllVideoBlocks', { caseId, noOfBlocks, generationId })
    this.ensureVideoBlockFolder({ caseId })
    return BluebirdPromise.map(
      Array(noOfBlocks),
      async (_, blockIndex) => {
        console.log('downloading block video', { caseId, blockIndex })
        const blockVideoS3Key = this.getVideoBlockS3Key({
          caseId,
          blockIndex,
          generationId,
        })
        const blockVideoFilePath = FrameHelper.getVideoBlockFilePath({
          caseId,
          blockIndex,
        })
        await S3Helper.downloadFile({
          key: blockVideoS3Key,
          filePath: blockVideoFilePath,
        })
      },
      { concurrency: 10 },
    )
  }

  public static async mergeSlideshowVideos({
    caseId,
    noOfBlocks,
  }: {
    caseId: string
    noOfBlocks: number
  }): Promise<string> {
    console.log('merging slideshow videos', { caseId, noOfBlocks })
    const videoPathFolder = FrameHelper.getVideoBlockFolder(caseId)
    console.log('creating videoPathFolder', videoPathFolder)
    fsExtra.ensureDirSync(videoPathFolder)
    const blockVideoFilePaths = FrameHelper.getVideoBlockFilePaths({
      caseId,
      noOfBlocks,
    })
    console.log('blockVideoFilePaths', blockVideoFilePaths)
    return new Promise((resolve, reject) => {
      const mergedVideoFile = FrameHelper.getSlideshowNoAudioTmpFilePath(caseId)
      const fileList = `${videoPathFolder}/slideshowVideos.txt`

      fsExtra.writeFileSync(
        fileList,
        blockVideoFilePaths.map((video) => `file '${video}'`).join('\n'),
      )

      console.log('merging video', mergedVideoFile)

      ffmpeg(fileList)
        .inputOptions(['-f concat', '-safe 0'])
        .outputOptions(['-c copy'])
        .save(mergedVideoFile)
        .on('end', () => {
          console.log('Videos have been merged successfully.')
          resolve(mergedVideoFile)
        })
        .on('error', (err) => {
          console.error(
            'ERROR occurred when merging block slideshow videos ' + err.message,
          )
          reject(err)
        })
    })
  }

  private static async framesToVideoWithoutAudio({
    outputFilePath,
    imagesFolder,
    fps,
  }: {
    outputFilePath: string
    imagesFolder: string
    fps: number
  }) {
    return new Promise(
      (vresolve: (v: string) => void, vreject: (e?: any) => void) => {
        console.log('generating video from frames')
        const imagesFileRegEx = `${imagesFolder}/%06d.${GENERATOR_CONFIG.PUPPETEER_FILE_FORMAT}`
        console.log('imagesFolder', imagesFileRegEx)

        ffmpeg(imagesFileRegEx)
          .inputFPS(fps)
          .format('mp4')
          .videoCodec('libx264')
          .videoBitrate(2500, false)
          .save(outputFilePath)
          .on('error', function (err, stdout, stderr) {
            console.log('video without audio failed')
            console.log('ffmpeg stdout:\n' + stdout)
            console.log('ffmpeg stderr:\n' + stderr)
            vreject(err)
          })
          .on('end', () => {
            console.log('video complete', outputFilePath)
            return vresolve(outputFilePath)
          })
      },
    )
  }

  private static async attachAudioToVideo({
    caseId,
    videoWithoutAudioFilePath,
    audioFilePath,
  }: {
    caseId: string
    videoWithoutAudioFilePath: string
    audioFilePath: string
  }): Promise<void> {
    console.log('attaching audio to video', {
      videoWithoutAudioFilePath,
      audioFilePath,
    })
    const tmpOutputFolder = FrameHelper.getCaseTmpDir(caseId)

    console.log('creating tmpOutputFolder', tmpOutputFolder)
    fsExtra.ensureDirSync(tmpOutputFolder)
    const outputFilePath = FrameHelper.getSlideshowTmpFilePath(caseId)

    console.log('attaching audio to video', {
      videoWithoutAudioFilePath,
      audioFilePath,
      outputFilePath,
    })
    return new Promise((resolve, reject) => {
      ffmpeg(videoWithoutAudioFilePath)
        .addInput(audioFilePath)
        .videoCodec('copy')
        .save(outputFilePath)
        .on('start', (commandLine) => {
          console.log('Spawned ffmpeg with command: ' + commandLine)
        })
        .on('error', function (err, stdout, stderr) {
          console.log('ffmpeg stdout:\n' + stdout)
          console.log('ffmpeg stderr:\n' + stderr)
          reject(err)
        })
        .on('end', () => {
          resolve()
        })
    })
  }

  public static async cleanUpTmpFrameFolder({
    caseId,
    totalFrames,
    generationId,
  }: {
    caseId: string
    totalFrames: number
    generationId?: string
  }): Promise<void> {
    const folderKey = FrameHelper.getBaseFrameFolder(caseId, generationId)
    console.log('cleaning up s3 tmp frame folder', folderKey)
    await BluebirdPromise.map(
      Array(totalFrames),
      async (_, frameIndex) => {
        // jpg/png
        const frameKey = `${folderKey}/${FrameHelper.getFrameKeyByFrameIndex(
          frameIndex,
        )}.${GENERATOR_CONFIG.PUPPETEER_FILE_FORMAT}`
        // console.log(`deleting frame key: ${frameKey}`)
        await S3Helper.deleteObject({
          key: frameKey,
        })

        if (GENERATOR_CONFIG.ENABLE_HTML_GENERATION) {
          // html
          const htmlFrameKey = `${folderKey}/${FrameHelper.getFrameKeyByFrameIndex(
            frameIndex,
          )}.${GENERATOR_CONFIG.PUPPETEER_FILE_FORMAT}`
          console.log(`deleting html frame key: ${htmlFrameKey}`)
          await S3Helper.deleteObject({
            key: htmlFrameKey,
          })
        }
      },
      { concurrency: 50 },
    )
  }

  public static async finaliseVideo({
    slideshow,
  }: {
    slideshow: ISlideshowData
  }) {
    const caseId = slideshow.case
    const hasAudio = slideshow.content.timelineType !== TimelineType.NO_AUDIO
    console.log('hasAudio', hasAudio)
    console.log('caseId', caseId)

    let finalPath
    if (hasAudio) {
      console.log('hasAudio is true')
      const audio = hasAudio
        ? slideshow.content.audio.filter(Boolean).map((audioItem) => {
            return {
              url: AssetHelper.getAudioUrl(audioItem, {
                caseId: slideshow.case,
                bucketUrl: `https://${GENERATOR_CONFIG.AWS_S3_BUCKET}`,
              }),
              filetype: audioItem.filename
                ? audioItem.filename.split('.')[1]
                : 'm4a',
            }
          })
        : []

      console.log('merging audio', { caseId })
      const outputFolder = this.getAudiosFolder(caseId)
      const audioFilePath: string = await this.mergeAudio(audio, outputFolder)
      const videoWithoutAudioFilePath =
        FrameHelper.getSlideshowNoAudioTmpFilePath(caseId)

      console.log('attaching audio to video', { caseId })
      await this.attachAudioToVideo({
        caseId,
        videoWithoutAudioFilePath,
        audioFilePath,
      })
      finalPath = FrameHelper.getSlideshowTmpFilePath(caseId)
    } else {
      console.log('hasAudio is false')
      finalPath = FrameHelper.getSlideshowNoAudioTmpFilePath(caseId)
    }

    if (GENERATOR_CONFIG.isLambdaGenerateSlideshow) {
      const key = FrameHelper.getSlideshowS3Key(caseId)
      console.log(`saving to s3 (key: ${key})`)
      await S3Helper.uploadToS3({ filePath: finalPath, s3Path: key })
      console.log(`saved to s3 (key: ${key})`)
    }
  }

  public static async cleanUpS3TmpVideoBlocksFolder({
    slideshow,
  }: {
    slideshow: ISlideshowData
  }) {
    const caseId = slideshow.case
    const generationId = slideshow.generationId
    const noOfBlocks = this.getNoOfBlocks(slideshow)
    console.log('cleaning up s3 tmp video blocks folder', {
      caseId,
      noOfBlocks,
      generationId,
    })
    await BluebirdPromise.map(
      Array(noOfBlocks),
      async (_, blockIndex) => {
        const blockVideoS3Key = this.getVideoBlockS3Key({
          caseId,
          blockIndex,
          generationId,
        })
        console.log(`deleting block video key: ${blockVideoS3Key}`)
        await S3Helper.deleteObject({
          key: blockVideoS3Key,
        })
      },
      { concurrency: 10 },
    )
  }

  public static async cleanUpS3TmpFrameFolder({
    slideshow,
  }: {
    slideshow: ISlideshowData
  }) {
    const caseId = slideshow.case
    console.log('start cleaning up S3 folder')
    const totalFrames = SlideshowHelper.getTotalFrames(slideshow)
    console.log('cleaning up tmp frame folder', { caseId, totalFrames })
    await this.cleanUpTmpFrameFolder({
      caseId,
      totalFrames,
    })
  }

  public static async triggerGenerateFrameProcess({
    slideshow,
    slideshowTheme,
    slideshowTitleSlide,
    slideshowTitleSlideTheme,
    slideshowTitleSlideUrl,
    frameIndex,
    retries = 0,
  }: {
    slideshow: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideshowTitleSlide: ICardProductData
    slideshowTitleSlideTheme: ICardProductTheme
    slideshowTitleSlideUrl: string
    frameIndex: number
    retries?: number
  }) {
    try {
      await LambdaHelper.invokeJob(
        GeneratorProcessJobTypes.CAPTURE_SCREENSHOT,
        {
          slideshow,
          slideshowTheme,
          slideshowTitleSlide,
          slideshowTitleSlideTheme,
          frameIndex,
          slideshowTitleSlideUrl,
        },
        false, // this need to be synchronised so that when we download the image, it's there
      )

      const fileName =
        FrameHelper.getFrameKeyWithFileFormatByFrameIndex(frameIndex)
      await S3Helper.checkExists(
        FrameHelper.getFramePath(
          slideshow.case,
          fileName,
          slideshow.generationId,
        ),
      )
      console.log(
        `successfully generate screenshot for frameIndex: ${frameIndex} fileName: ${fileName}`,
      )
    } catch (ex) {
      console.log('ex', ex)
      if (retries < 3) {
        console.log('wait for 1 second before retries', retries + 1)
        await UtilHelper.sleep(500)
        console.log('triggerGenerateFrameProcess failed retries', retries + 1)
        await this.triggerGenerateFrameProcess({
          slideshow,
          slideshowTheme,
          slideshowTitleSlide,
          slideshowTitleSlideTheme,
          frameIndex,
          retries: retries + 1,
          slideshowTitleSlideUrl,
        })
      } else {
        console.log('triggerGenerateFrameProcess failed No more tries', ex)
        throw new Error(ex)
      }
    }
  }

  public static async generateVideo(slideshow: ISlideshowData) {
    const caseId = slideshow.case
    const imagesPath = FrameHelper.getFramesPath(caseId)

    console.log(`creating video path: ${imagesPath}`)
    const key = FrameHelper.getSlideshowS3Key(caseId)
    console.log('key', key)

    // generate video only
    await this.generateNoAudioVideoBlocks(slideshow)

    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-MASTER-SLIDESHOW-VIDEO (${slideshow.case}). Completed All Video Blocks Generation. Finalising Video.`,
    })

    // finalise video (attach audio to the video file) - refer to the finaliseVideo below
    await LambdaHelper.invokeJob(
      GeneratorProcessJobTypes.SLAVE_FINALISE_VIDEO,
      {
        slideshow,
      } as SlaveFinaliseVideoProcessPayload,
      false,
    )

    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-MASTER-SLIDESHOW-VIDEO (${slideshow.case}). Completed Finalising Video.`,
    })
  }

  public static getNoOfBlocks(slideshow: ISlideshowData) {
    const totalFrames = SlideshowHelper.getTotalFrames(slideshow)
    return Math.ceil(totalFrames / SLIDESHOW_VIDEO_BLOCK_SIZE)
  }

  public static async generateNoAudioVideoBlocks(
    slideshow: ISlideshowData,
  ): Promise<void> {
    const caseId = slideshow.case
    const framesFolder = FrameHelper.getFramesPath(caseId)
    console.log('creating framesFolder', framesFolder)
    fsExtra.ensureDirSync(framesFolder)
    const noOfBlocks = this.getNoOfBlocks(slideshow)

    // generating block videos
    await BluebirdPromise.map(
      Array(noOfBlocks),
      async (_, blockIndex) => {
        console.log(
          `invoking job generator video (caseId: ${caseId} for block (${blockIndex})`,
        )
        await SlackWebhookHelper.sendToSlack({
          text: `GENERATOR-MASTER-SLIDESHOW-VIDEO (${slideshow.case}). Generating video block ${blockIndex}`,
        })
        await LambdaHelper.invokeJob(
          GeneratorProcessJobTypes.SLAVE_VIDEO_BLOCK_GENERATION,
          {
            slideshow,
            blockIndex,
          } as SlaveVideoBlockGenerationProcessPayload,
          false,
        )
        await SlackWebhookHelper.sendToSlack({
          text: `GENERATOR-MASTER-SLIDESHOW-VIDEO (${slideshow.case}). Generating video block ${blockIndex} completed.`,
        })
      },
      { concurrency: 10 },
    )
  }

  public static getAudiosFolder(caseId: string) {
    const tmpOutputFolder = FrameHelper.getCaseTmpDir(caseId)
    return `${tmpOutputFolder}/audios`
  }

  public static getVideoBlockS3Key({
    caseId,
    blockIndex,
    generationId,
  }: {
    caseId: string
    blockIndex: number
    generationId?: string
  }) {
    const baseFolder = FrameHelper.getBaseVideoFolder(caseId, generationId)
    return `${baseFolder}/block-${blockIndex}.mp4`
  }

  public static async generateNoAudioVideoBlock({
    blockIndex,
    slideshow,
  }: {
    blockIndex: number
    slideshow: ISlideshowData
  }): Promise<void> {
    const caseId = slideshow.case
    const framesFolder = FrameHelper.getFramesPath(caseId)
    const totalFrames = SlideshowHelper.getTotalFrames(slideshow)
    console.log('creating framesFolder', framesFolder)
    fsExtra.ensureDirSync(framesFolder)
    const tmpOutputFolder = FrameHelper.getCaseTmpDir(caseId)

    console.log('creating tmpOutputFolder', tmpOutputFolder)
    fsExtra.ensureDirSync(tmpOutputFolder)
    const slideshowId = slideshow.id
    const videoPathFolder = `${tmpOutputFolder}/${slideshowId}`
    console.log('creating videoPathFolder', videoPathFolder)
    fsExtra.ensureDirSync(videoPathFolder)

    const blockFrameFolder = `${framesFolder}/block-${blockIndex}`
    console.log('creating blockFrameFolder', blockFrameFolder)
    const startIndex = blockIndex * SLIDESHOW_VIDEO_BLOCK_SIZE
    let endIndex = startIndex + SLIDESHOW_VIDEO_BLOCK_SIZE - 1
    if (endIndex > totalFrames - 1) {
      endIndex = totalFrames - 1
    }
    console.log('startIndex', startIndex)
    console.log('endIndex', endIndex)
    try {
      await S3Helper.downloadFramesToFolder({
        caseId,
        startIndex,
        endIndex,
        folderPath: blockFrameFolder,
        generationId: slideshow.generationId,
      })
    } catch (error) {
      await SlackWebhookHelper.sendToSlack({
        text: `GENERATOR-SLAVE-VIDEO-BLOCK-ERROR (${slideshow.case}). Error downloadFramesToFolder. ${error.message}`,
        notifyChannel: true,
      })
      console.log(
        'GENERATOR-SLAVE-VIDEO-BLOCK-ERROR downloadFramesToFolder',
        {
          caseId,
          blockFrameFolder,
          startIndex,
          endIndex,
        },
        error,
      )
      throw new Error(error)
    }
    console.log(`downloaded block ${blockIndex}`, blockFrameFolder)

    this.ensureVideoBlockFolder({ caseId })
    // generating block video
    const blockVideoPath = FrameHelper.getVideoBlockFilePath({
      caseId,
      blockIndex,
    })

    try {
      await this.framesToVideoWithoutAudio({
        outputFilePath: blockVideoPath,
        fps: SLIDESHOW_FPS,
        imagesFolder: blockFrameFolder,
      })
    } catch (error) {
      await SlackWebhookHelper.sendToSlack({
        text: `GENERATOR-SLAVE-VIDEO-BLOCK-ERROR (${slideshow.case}). Error framesToVideoWithoutAudio. ${error.message}`,
        notifyChannel: true,
      })
      console.log(
        'GENERATOR-SLAVE-VIDEO-BLOCK-ERROR framesToVideoWithoutAudio',
        {
          blockVideoPath,
          fps: SLIDESHOW_FPS,
          blockFrameFolder,
        },
        error,
      )
      throw new Error(error)
    }
    console.log('generated block video and saved it to', blockVideoPath)

    console.log(`removing block index (${blockIndex}) images`, blockFrameFolder)
    fsExtra.removeSync(blockFrameFolder)
  }

  // For local environment
  public static async record({
    slideshow,
  }: {
    slideshow: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideshowTitleSlide: ICardProductData
    slideshowTitleSlideTheme: ICardProductTheme
  }): Promise<void> {
    try {
      const startTime: any = new Date()
      const caseId = slideshow.case
      const totalFrames = SlideshowHelper.getTotalFrames(slideshow)

      console.log('PuppeteerRecorder.record startTime', startTime.toISOString())
      console.log('PuppeteerRecorder.record totalFrames', totalFrames)
      console.log('PuppeteerRecorder.record caseId', caseId)

      /* // Enable this only if you want to generate local frames. Having PuppeteerSlideshowHelper will
   // make our lambda function bundle size to big and failed in deployment
      await Bluebird.map(
        Array(totalFrames),
        async (_, frameIndex: number) => {
          await PuppeteerSlideshowHelper.generateFrame({
            slideshow,
            slideshowTheme,
            slideShowTitleSlide,
            slideshowTitleSlideTheme,
            frameIndex,
          })
        },
        { concurrency: 5 },
      )
*/

      await this.generateVideo(slideshow)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      // Remove intermediary file
      //fsExtra.remove(screenCaptureRecordOption.output)
    }
  }
}
