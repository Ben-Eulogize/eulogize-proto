import { BookletPdfHelper } from './BookletPdfHelper'
import { PdfTestHelper } from '../../test/helpers/PdfTestHelper'
import { BOOKLET_THEMES } from '@eulogise/core'
import { ICardProductData, ICardProductTheme } from '@eulogise/core'

describe('BookletPdfHelper Integration', () => {
  const existingStagingCardProduct = {
    content: {
      pageMargins: [30, 40],
      pageSize: 'A5',
      theme: 'grandeur',
      pageOrientation: 'portrait',
    },
    id: '71637251-d9e4-4a1d-ab1b-e4e88c7c3f99',
    case: 'a5d79550-76b9-4357-a15f-bdd20a22734d',
  } as ICardProductData

  const productTheme = BOOKLET_THEMES.find(
    (t) => t.id === existingStagingCardProduct.content.theme,
  ) as ICardProductTheme

  describe('generatePdfFile', () => {
    it('should generate pdf out from booklet data in the server', async () => {
      const { filePath } = await BookletPdfHelper.generatePdfFile({
        cardProduct: existingStagingCardProduct,
        productTheme,
        bleed: false,
      })
      await PdfTestHelper.expectCorrectFile(`booklet-for-staging.pdf`, filePath)
    })

    it('should generate bleed pdf out from booklet data in the server', async () => {
      const { filePath } = await BookletPdfHelper.generatePdfFile({
        // @ts-ignore
        cardProduct: existingStagingCardProduct,
        productTheme,
        bleed: true,
      })
      await PdfTestHelper.expectCorrectFile(
        `booklet-for-staging-bleed.pdf`,
        filePath,
      )
    })
  })
})
