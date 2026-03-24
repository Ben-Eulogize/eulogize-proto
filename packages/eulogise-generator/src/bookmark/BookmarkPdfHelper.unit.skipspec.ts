import { ICardProductData } from '@eulogise/core'
import sinon from 'sinon'
import { BookmarkPdfHelper } from './BookmarkPdfHelper'
import { PdfTestHelper } from '../../test/helpers/PdfTestHelper'
import {
  STORIES_MOCK_BOOKMARK_DATA_AURA,
  STORIES_MOCK_BOOKMARK_DATA_CLASSIC,
  STORIES_MOCK_BOOKMARK_DATA_GRACE,
  STORIES_MOCK_BOOKMARK_DATA_GRANDEUR,
  STORIES_MOCK_BOOKMARK_DATA_LINEN,
  STORIES_MOCK_BOOKMARK_DATA_REFLECTION,
} from '@eulogise/client-components/dist/CardProductPage/CardProductPageBookmark.stories.data'
import { GeneratorAuthHelper } from '../helpers/GeneratorAuthHelper'
import { BOOKMARK_THEMES } from '@eulogise/core'

const pdfAssertion = async (cardProduct: ICardProductData, themeId: string) => {
  const productTheme = BOOKMARK_THEMES.find((theme) => theme.id === themeId)
  const { filePath: nonBleedPdf } = await BookmarkPdfHelper.generatePdfFile({
    cardProduct,
    productTheme,
    bleed: false,
    useMock: true,
  })
  const { filePath: bleedPdf } = await BookmarkPdfHelper.generatePdfFile({
    cardProduct,
    productTheme,
    bleed: true,
    useMock: true,
  })
  await PdfTestHelper.expectCorrectFile(`bookmark-${themeId}.pdf`, nonBleedPdf)
  await PdfTestHelper.expectCorrectFile(
    `bookmark-${themeId}-bleed.pdf`,
    bleedPdf,
  )
}
describe('BookmarkPdfHelper', () => {
  let sandbox: any
  beforeEach(() => {
    sandbox = sinon.createSandbox()
    sandbox.stub(GeneratorAuthHelper, 'getApiToken').resolves('')
  })

  afterEach(() => sandbox.restore())

  describe('generatePdfFile', () => {
    it('aura', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKMARK_DATA_AURA, 'aura')
    })

    it('grandeur', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKMARK_DATA_GRANDEUR, 'grandeur')
    })

    it('reflection', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKMARK_DATA_REFLECTION, 'reflection')
    })

    it('linen', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKMARK_DATA_LINEN, 'linen')
    })

    it('grace', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKMARK_DATA_GRACE, 'grace')
    })

    it('classic', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKMARK_DATA_CLASSIC, 'classic')
    })
  })
})
