import expect from 'expect'
import { PuppeteerCardProductHelper } from '../core/PuppeteerCardProductHelper'
import { MOCK_BOOKLET_1 } from '@eulogise/mock'
import { BOOKLET_THEMES, EulogiseProduct } from '@eulogise/core'
import { GhostscriptHelper } from './GhostscriptHelper'

describe('GhostscriptHelper', () => {
  describe('convertPdfToPrintableFormat', () => {
    let filePath: string
    beforeEach(async () => {
      const themeId = 'grace'
      const results = await PuppeteerCardProductHelper.generateCardProduct({
        cardProduct: MOCK_BOOKLET_1,
        product: EulogiseProduct.BOOKLET,
        bleed: true,
        type: 'pdf',
        productTheme: BOOKLET_THEMES.find((theme) => theme.id === themeId)!,
      })
      filePath = results.filePath
    })

    it('should convert PDF to printable format', async () => {
      const { outputFilePath } = GhostscriptHelper.convertPdfToPrintableFormat({
        inputFilePath: filePath,
      })
      expect(outputFilePath).toMatch(/BOOKLET_bleed-converted\.pdf$/)
    })
  })
})
