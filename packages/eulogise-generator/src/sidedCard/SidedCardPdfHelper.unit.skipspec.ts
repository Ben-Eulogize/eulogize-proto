import { ICardProductData } from '@eulogise/core'
import sinon from 'sinon'
import { SidedCardPdfHelper } from './SidedCardPdfHelper'
import { PdfTestHelper } from '../../test/helpers/PdfTestHelper'
import {
  STORIES_MOCK_BOOKLET_DATA_AURA,
  STORIES_MOCK_BOOKLET_DATA_CLASSIC,
  STORIES_MOCK_BOOKLET_DATA_GRACE,
  STORIES_MOCK_BOOKLET_DATA_GRANDEUR,
  STORIES_MOCK_BOOKLET_DATA_LINEN,
  STORIES_MOCK_BOOKLET_DATA_REFLECTION,
} from '@eulogise/client-components/dist/CardProductPage/CardProductPageBooklet.stories.data'
import { GeneratorAuthHelper } from '../helpers/GeneratorAuthHelper'
import { BOOKLET_THEMES } from '@eulogise/core'

const pdfAssertion = async (cardProduct: ICardProductData, themeId: string) => {
  const productTheme = BOOKLET_THEMES.find((theme) => theme.id === themeId)
  const { filePath: nonBleedPdf } = await SidedCardPdfHelper.generatePdfFile({
    cardProduct,
    productTheme,
    bleed: false,
    useMock: true,
  })
  const { filePath: bleedPdf } = await SidedCardPdfHelper.generatePdfFile({
    cardProduct,
    productTheme,
    bleed: false,
    useMock: true,
  })
  await PdfTestHelper.expectCorrectFile(`sidedCard-${themeId}.pdf`, nonBleedPdf)
  await PdfTestHelper.expectCorrectFile(
    `sidedCard-${themeId}-bleed.pdf`,
    bleedPdf,
  )
}

describe('SidedCardPdfHelper', () => {
  let sandbox: any
  beforeEach(() => {
    sandbox = sinon.createSandbox()
    sandbox.stub(GeneratorAuthHelper, 'getApiToken').resolves('')
  })

  afterEach(() => sandbox.restore())

  describe('generatePdfFile', () => {
    it('aura', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKLET_DATA_AURA, 'aura')
    })

    it('grandeur', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKLET_DATA_GRANDEUR, 'grandeur')
    })

    it('reflection', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKLET_DATA_REFLECTION, 'reflection')
    })

    it('linen', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKLET_DATA_LINEN, 'linen')
    })

    it('grace', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKLET_DATA_GRACE, 'grace')
    })

    it('classic', async () => {
      await pdfAssertion(STORIES_MOCK_BOOKLET_DATA_CLASSIC, 'classic')
    })
  })
})
