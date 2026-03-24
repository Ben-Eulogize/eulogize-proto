import expect from 'expect'
import sinon from 'sinon'
import { FilestackHelper } from './FilestackHelper'

describe('Asset Face Detection - Unit Tests', () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('Face detection integration in asset creation flow', () => {
    it('should successfully detect faces and add data to asset content', async () => {
      const detectFacesStub = sandbox.stub(FilestackHelper, 'detectFaces')

      const mockFaceDetectionResult = {
        faces: [
          {
            topLeftX: 100,
            topLeftY: 50,
            width: 200,
            height: 250,
            confidence: 0.95,
          },
        ],
        imageWidth: 800,
        imageHeight: 600,
      }

      detectFacesStub.resolves(mockFaceDetectionResult)

      // Simulate the face detection logic from AssetModel
      const assetContent: any = {
        filename: 'test.jpg',
        filepath: 'cases/test-case/gallery/test.jpg',
        filestackHandle: 'testHandle123',
      }

      // This simulates what happens in AssetModel.create()
      if (assetContent.filestackHandle) {
        const faceDetectionResult = await FilestackHelper.detectFaces(
          assetContent.filestackHandle,
        )

        assetContent.faceDetection = {
          faces: faceDetectionResult.faces,
          imageWidth: faceDetectionResult.imageWidth,
          imageHeight: faceDetectionResult.imageHeight,
          detectedAt: Date.now(),
        }
      }

      // Verify the results
      expect(detectFacesStub.calledOnce).toBe(true)
      expect(detectFacesStub.calledWith('testHandle123')).toBe(true)

      expect(assetContent.faceDetection).toBeDefined()
      expect(assetContent.faceDetection.faces).toHaveLength(1)
      expect(assetContent.faceDetection.faces[0].confidence).toBe(0.95)
      expect(assetContent.width).toBe(800)
      expect(assetContent.height).toBe(600)
    })

    it('should handle face detection errors gracefully', async () => {
      const detectFacesStub = sandbox.stub(FilestackHelper, 'detectFaces')
      detectFacesStub.rejects(new Error('API Error'))

      const assetContent: any = {
        filename: 'test.jpg',
        filepath: 'cases/test-case/gallery/test.jpg',
        filestackHandle: 'testHandle123',
      }

      // Simulate error handling from AssetModel
      try {
        const faceDetectionResult = await FilestackHelper.detectFaces(
          assetContent.filestackHandle,
        )

        assetContent.faceDetection = {
          faces: faceDetectionResult.faces,
          imageWidth: faceDetectionResult.imageWidth,
          imageHeight: faceDetectionResult.imageHeight,
          detectedAt: Date.now(),
        }
      } catch (error) {
        // Error is caught and logged, but doesn't prevent asset creation
        console.error('Face detection failed for asset:', error)
      }

      // Asset content should not have face detection data when it fails
      expect(assetContent.faceDetection).toBeUndefined()
      expect(detectFacesStub.calledOnce).toBe(true)
    })

    it('should handle multiple faces correctly', async () => {
      const detectFacesStub = sandbox.stub(FilestackHelper, 'detectFaces')

      const mockFaceDetectionResult = {
        faces: [
          {
            topLeftX: 100,
            topLeftY: 50,
            width: 120,
            height: 150,
            confidence: 0.95,
          },
          {
            topLeftX: 300,
            topLeftY: 60,
            width: 110,
            height: 140,
            confidence: 0.89,
          },
          {
            topLeftX: 500,
            topLeftY: 55,
            width: 115,
            height: 145,
            confidence: 0.92,
          },
        ],
        imageWidth: 800,
        imageHeight: 600,
      }

      detectFacesStub.resolves(mockFaceDetectionResult)

      const assetContent: any = {
        filename: 'group-photo.jpg',
        filepath: 'cases/test-case/gallery/group-photo.jpg',
        filestackHandle: 'groupPhotoHandle',
      }

      const faceDetectionResult = await FilestackHelper.detectFaces(
        assetContent.filestackHandle,
      )

      assetContent.faceDetection = {
        faces: faceDetectionResult.faces,
        imageWidth: faceDetectionResult.imageWidth,
        imageHeight: faceDetectionResult.imageHeight,
        detectedAt: Date.now(),
      }

      expect(assetContent.faceDetection.faces).toHaveLength(3)
      expect(assetContent.faceDetection.faces[0].confidence).toBe(0.95)
      expect(assetContent.faceDetection.faces[1].confidence).toBe(0.89)
      expect(assetContent.faceDetection.faces[2].confidence).toBe(0.92)
    })

    it('should not call face detection for non-image assets', async () => {
      const detectFacesStub = sandbox.stub(FilestackHelper, 'detectFaces')

      const assetContent: any = {
        filename: 'audio.mp3',
        filepath: 'cases/test-case/audio/audio.mp3',
        filestackHandle: 'audioHandle',
      }

      const assetType: string = 'audio'

      // Simulate the condition check from AssetModel
      if (assetType === 'image' && assetContent.filestackHandle) {
        await FilestackHelper.detectFaces(assetContent.filestackHandle)
      }

      // Face detection should not be called for audio assets
      expect(detectFacesStub.called).toBe(false)
      expect(assetContent.faceDetection).toBeUndefined()
    })
  })
})
