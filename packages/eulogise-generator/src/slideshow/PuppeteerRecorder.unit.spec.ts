import sinon from 'sinon'
import { PuppeteerRecorder } from './PuppeteerRecorder'
import { MOCK_SLIDESHOW_WITHOUT_AUDIO_1 } from '@eulogise/mock'

describe('PuppeteerRecorder', () => {
  let sandbox: any
  let results: any
  const caseId = '0555c20f-b4ed-4548-bf9d-4a379168a575'

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  afterEach(() => sandbox.restore())

  describe('prepareS3Bucket', () => {
    beforeEach(async () => {
      results = await PuppeteerRecorder.prepareS3Bucket(caseId)
    })

    it('should run properly', () => {
      console.log('results', results)
    })
  })

  describe('getCaseFolderByCaseId', () => {
    beforeEach(async () => {
      results = await PuppeteerRecorder.getCaseFolderByCaseId(caseId)
    })

    it('should return the case folder', () => {
      console.log('results', results)
    })
  })

  describe('cleanUpTmpFrameFolder', () => {
    const caseId = '2a4fb8d5-fbb1-4eab-8662-682a6153fcc2'
    beforeEach(async () => {
      await PuppeteerRecorder.cleanUpTmpFrameFolder({
        caseId,
        totalFrames: 1600,
      })
    })

    it.skip('should delete everything of the key', () => {})
  })

  describe('generateVideo()', () => {
    const slideshow = MOCK_SLIDESHOW_WITHOUT_AUDIO_1

    beforeEach(async () => {
      await PuppeteerRecorder.generateVideo(slideshow)
    })

    it('should generate a video', () => {})
  })

  /*
  describe('mergeAudio()', () => {
    const slideshow: ISlideshowData = MOCK_SLIDESHOW_WITH_MULTI_AUDIOS_1

    beforeEach(async () => {
      const audio = slideshow.content.audio.map((audioItem) => {
        return {
          url: AssetHelper.getAudioUrl(audioItem, {
            caseId: slideshow.case,
            bucketUrl: `https://${GENERATOR_CONFIG.AWS_S3_BUCKET}`,
          }),
          filetype: audioItem.filename.split('.')[1],
        }
      })
      await PuppeteerRecorder.mergeAudio(
        [audio[0]],
        `${FrameHelper.getCaseTmpDir(slideshow.case)}/output/slideshows/${
          slideshow.id
        }`,
      )
    })

    it('should merge audio', () => {})
  })
*/
})
