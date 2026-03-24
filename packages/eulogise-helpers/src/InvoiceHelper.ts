import {
  IInvoice,
  CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES,
  CHECKOUTS_SHIPPING_PRODUCTS,
  IDisplayedInvoiceShippingDetails,
  KEEPSAKE_PRODUCTS,
} from '@eulogise/core'

export const InvoiceHelper = {
  sortBy: ({
    invoices,
    sortByKey,
    mode,
  }: {
    invoices: IInvoice[] | undefined
    sortByKey: keyof IInvoice
    mode: 'ASC' | 'DESC'
  }) => {
    if (!sortByKey || !invoices || !mode) {
      return invoices
    }
    if (mode === 'DESC') {
      return [...invoices].sort((a: IInvoice, b: IInvoice) =>
        a?.[sortByKey] > b?.[sortByKey] ? -1 : 1,
      )
    }
    return [...invoices].sort((a: IInvoice, b: IInvoice) =>
      a?.[sortByKey] > b?.[sortByKey] ? 1 : -1,
    )
  },
  getDisplayedShippingDetailsByInvoice: ({
    invoice,
  }: {
    invoice: IInvoice
  }): Array<IDisplayedInvoiceShippingDetails> => {
    if (!invoice) {
      return []
    }
    let shippingAddresses = []

    // Keepsakes
    const keepsakesShippingAddressDetails =
      invoice?.details?.keepsakesDetails?.leatherVideoTributeBook
        ?.shippingAddressDetails
    const isKeepSakesShippingAddressValid: boolean =
      !!keepsakesShippingAddressDetails?.formattedAddress &&
      !!keepsakesShippingAddressDetails?.isValidAddress
    const keepsakesShippingMethod =
      invoice?.details?.keepsakesDetails?.leatherVideoTributeBook
        ?.shippingMethod

    // Printing
    const printingShippingAddressDetails =
      invoice.details?.printingDetails?.printingAddressDetails
    const isPrintingShippingAddressValid: boolean =
      !!printingShippingAddressDetails?.formattedAddress &&
      !!printingShippingAddressDetails?.isValidAddress
    const printingShippingMethod =
      invoice?.details?.printingDetails?.printingShippingMethod

    // PhotoBooks
    const photoBookShippingAddressDetails =
      invoice?.details?.keepsakesDetails?.photoBook?.shippingAddressDetails
    const isPhotoBookShippingAddressValid: boolean =
      !!photoBookShippingAddressDetails?.formattedAddress &&
      !!photoBookShippingAddressDetails?.isValidAddress
    const photoBookShippingMethod =
      invoice?.details?.keepsakesDetails?.photoBook?.shippingMethod

    if (isKeepSakesShippingAddressValid) {
      shippingAddresses.push({
        product:
          CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES[
            CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.VIDEO_BOOKS]
          ],
        address: keepsakesShippingAddressDetails?.formattedAddress ?? '',
        shippingMethod: keepsakesShippingMethod,
      })
    }

    if (isPrintingShippingAddressValid) {
      shippingAddresses.push({
        product:
          CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES[
            CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES
          ],
        address: printingShippingAddressDetails?.formattedAddress ?? '',
        shippingMethod: printingShippingMethod,
      })
    }

    if (isPhotoBookShippingAddressValid) {
      shippingAddresses.push({
        product:
          CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES[
            CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.PHOTO_BOOKS]
          ],
        address: photoBookShippingAddressDetails?.formattedAddress ?? '',
        shippingMethod: photoBookShippingMethod,
      })
    }
    return shippingAddresses
  },
}
