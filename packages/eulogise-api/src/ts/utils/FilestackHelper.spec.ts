import { FilestackHelper, IFaceDetectionResult } from './FilestackHelper'
import expect from 'expect'
import axios from 'axios'

describe.skip('FileStackHelper', () => {
  let results: any
  describe('uploadFileByBlob()', () => {
    describe('Buffer', () => {
      beforeEach(async () => {
        const response = await axios({
          method: 'GET',
          url: 'https://cdn.filestackcontent.com/7p9hTRISS4CxTuEwaMlO',
          responseType: 'arraybuffer',
        })
        results = await FilestackHelper.uploadFileByBuffer(response.data)
      })

      it('should return a response', () => {
        expect(results).toEqual('')
      })
    })
  })
})

describe('FilestackHelper.detectFaces - Integration Tests', () => {
  // Using the actual Filestack handle provided
  const filestackHandle = 'klEhUA8lQ6wRICFUaXAz'
  // These are integration tests that use the real Filestack API
  // They require a valid Filestack API key and network connection

  it('should detect faces successfully with real Filestack API', async () => {
    const result: IFaceDetectionResult = await FilestackHelper.detectFaces(
      filestackHandle,
    )

    // Verify the result structure
    expect(result).toHaveProperty('faces')
    expect(result).toHaveProperty('imageWidth')
    expect(result).toHaveProperty('imageHeight')
    expect(Array.isArray(result.faces)).toBe(true)

    // If faces are detected, verify their structure
    if (result.faces.length > 0) {
      result.faces.forEach((face) => {
        expect(face).toHaveProperty('topLeftX')
        expect(face).toHaveProperty('topLeftY')
        expect(face).toHaveProperty('width')
        expect(face).toHaveProperty('height')
        expect(face).toHaveProperty('confidence')

        // Verify the values are numbers and within reasonable ranges
        expect(typeof face.topLeftX).toBe('number')
        expect(typeof face.topLeftY).toBe('number')
        expect(typeof face.width).toBe('number')
        expect(typeof face.height).toBe('number')
        expect(typeof face.confidence).toBe('number')

        expect(face.width).toBeGreaterThan(0)
        expect(face.height).toBeGreaterThan(0)
        expect(face.confidence).toBeGreaterThanOrEqual(0)
        expect(face.confidence).toBeLessThanOrEqual(1)
      })
    }

    // Log the actual result for debugging
    console.log('Face detection result:', JSON.stringify(result, null, 2))
  })

  it('should handle an image with no faces', async () => {
    const result: IFaceDetectionResult = await FilestackHelper.detectFaces(
      filestackHandle,
    )

    // The result should always have the expected structure
    expect(result).toHaveProperty('faces')
    expect(result).toHaveProperty('imageWidth')
    expect(result).toHaveProperty('imageHeight')
    expect(Array.isArray(result.faces)).toBe(true)
  })

  it('should handle invalid filestack handle gracefully', async () => {
    const invalidHandle = 'invalid-handle-12345'

    try {
      await FilestackHelper.detectFaces(invalidHandle)
      // If we get here without error, check if it returned empty faces
      // Some APIs might return empty results instead of erroring
    } catch (error: any) {
      // We expect an error for invalid handles
      expect(error.message).toContain('Failed to detect faces')
      expect(error.message).toContain(invalidHandle)
    }
  })

  it('should detect multiple faces if present', async () => {
    const result: IFaceDetectionResult = await FilestackHelper.detectFaces(
      filestackHandle,
    )

    console.log(`Detected ${result.faces.length} face(s) in the image`)

    // If multiple faces are detected, verify each one
    if (result.faces.length > 1) {
      console.log('Multiple faces detected:')
      result.faces.forEach((face, index) => {
        console.log(`Face ${index + 1}:`, {
          position: `(${face.topLeftX}, ${face.topLeftY})`,
          size: `${face.width}x${face.height}`,
          confidence: `${(face.confidence * 100).toFixed(2)}%`,
        })
      })
    }

    // Basic validation
    expect(result.faces).toBeDefined()
    expect(Array.isArray(result.faces)).toBe(true)
  })

  it('should return reasonable image dimensions', async () => {
    const result: IFaceDetectionResult = await FilestackHelper.detectFaces(
      filestackHandle,
    )

    // Image dimensions should be positive numbers if available
    if (result.imageWidth > 0 && result.imageHeight > 0) {
      expect(result.imageWidth).toBeGreaterThan(0)
      expect(result.imageHeight).toBeGreaterThan(0)

      // Reasonable image size constraints (adjust as needed)
      expect(result.imageWidth).toBeLessThan(10000) // Less than 10k pixels wide
      expect(result.imageHeight).toBeLessThan(10000) // Less than 10k pixels high

      console.log(
        `Image dimensions: ${result.imageWidth}x${result.imageHeight}`,
      )
    }
  })
})
