import { ICardProductData } from '@eulogise/core'
import sinon from 'sinon'
import { PdfTestHelper } from '../../test/helpers/PdfTestHelper'
import { GeneratorAuthHelper } from '../helpers/GeneratorAuthHelper'
import { PHOTOBOOK_DEFAULT_THEME } from '@eulogise/core'
import { PhotobookPdfHelper } from './PhotobookPdfHelper'
import { STORIES_MOCK_PHOTOBOOK_DATA_DEFAULT } from '@eulogise/client-components/dist/CardProductPage/CardProductPagePhotobook.stories.data'

const pdfAssertion = async (cardProduct: ICardProductData, themeId: string) => {
  const productTheme = PHOTOBOOK_DEFAULT_THEME
  const { filePath: nonBleedPdf } = await PhotobookPdfHelper.generatePdfFile({
    cardProduct,
    productTheme,
    bleed: false,
    useMock: true,
  })
  const { filePath: bleedPdf } = await PhotobookPdfHelper.generatePdfFile({
    cardProduct,
    productTheme,
    bleed: true,
    useMock: true,
  })
  await PdfTestHelper.expectCorrectFile(`photobook-${themeId}.pdf`, nonBleedPdf)
  await PdfTestHelper.expectCorrectFile(
    `photobook-${themeId}-bleed.pdf`,
    bleedPdf,
  )
}

describe('PhotobookPdfHelper', () => {
  describe('generatePdfFile', () => {
    let sandbox: any
    beforeEach(() => {
      sandbox = sinon.createSandbox()
      sandbox.stub(GeneratorAuthHelper, 'getApiToken').resolves('')
    })

    afterEach(() => sandbox.restore())

    it('aura', async () => {
      await pdfAssertion(STORIES_MOCK_PHOTOBOOK_DATA_DEFAULT, 'aura')
    })
  })
})
