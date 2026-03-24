import { ICardProductData } from '@eulogise/core'
import sinon from 'sinon'
import { ThankyouCardPdfHelper } from './ThankyouCardPdfHelper'
import { PdfTestHelper } from '../../test/helpers/PdfTestHelper'
import {
  STORIES_MOCK_THANKYOU_CARD_DATA_AURA,
  STORIES_MOCK_THANKYOU_CARD_DATA_CLASSIC,
  STORIES_MOCK_THANKYOU_CARD_DATA_GRACE,
  STORIES_MOCK_THANKYOU_CARD_DATA_GRANDEUR,
  STORIES_MOCK_THANKYOU_CARD_DATA_LINEN,
  STORIES_MOCK_THANKYOU_CARD_DATA_REFLECTION,
} from '@eulogise/client-components/dist/CardProductPage/CardProductPageThankyouCard.stories.data'
import { GeneratorAuthHelper } from '../helpers/GeneratorAuthHelper'
import { THANK_YOU_CARD_THEMES } from '@eulogise/core'

const pdfAssertion = async (cardProduct: ICardProductData, themeId: string) => {
  const productTheme = THANK_YOU_CARD_THEMES.find(
    (theme) => theme.id === themeId,
  )
  const { filePath: nonBleedPdf } = await ThankyouCardPdfHelper.generatePdfFile(
    {
      cardProduct,
      productTheme,
      bleed: false,
      useMock: true,
    },
  )
  const { filePath: bleedPdf } = await ThankyouCardPdfHelper.generatePdfFile({
    cardProduct,
    productTheme,
    bleed: true,
    useMock: true,
  })
  await PdfTestHelper.expectCorrectFile(
    `thankyoucard-${themeId}.pdf`,
    nonBleedPdf,
  )
  await PdfTestHelper.expectCorrectFile(
    `thankyoucard-${themeId}-bleed.pdf`,
    bleedPdf,
  )
}

describe('ThankyouCardPdfHelper', () => {
  describe('generatePdfFile', () => {
    let sandbox: any
    beforeEach(() => {
      sandbox = sinon.createSandbox()
      sandbox.stub(GeneratorAuthHelper, 'getApiToken').resolves('')
    })

    afterEach(() => sandbox.restore())

    it('aura', async () => {
      await pdfAssertion(STORIES_MOCK_THANKYOU_CARD_DATA_AURA, 'aura')
    })

    it('grandeur', async () => {
      await pdfAssertion(STORIES_MOCK_THANKYOU_CARD_DATA_GRANDEUR, 'grandeur')
    })

    it('reflection', async () => {
      await pdfAssertion(
        STORIES_MOCK_THANKYOU_CARD_DATA_REFLECTION,
        'reflection',
      )
    })

    it('linen', async () => {
      await pdfAssertion(STORIES_MOCK_THANKYOU_CARD_DATA_LINEN, 'linen')
    })

    it('grace', async () => {
      await pdfAssertion(STORIES_MOCK_THANKYOU_CARD_DATA_GRACE, 'grace')
    })

    it('classic', async () => {
      await pdfAssertion(STORIES_MOCK_THANKYOU_CARD_DATA_CLASSIC, 'classic')
    })
  })
})
