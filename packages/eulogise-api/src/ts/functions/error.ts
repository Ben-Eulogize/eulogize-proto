export const resource = {
  find: {
    notAllowed: (resource: string) => ({
      id: 'a42c417',
      statusCode: 401,
      message: `Not allowed to find ${resource}.`,
    }),
    badRequest: (resource: string) => ({
      id: 'asdvz24',
      statusCode: 400,
      message: `Bad request to find ${resource}.`,
    }),
  },
  save: {
    notAllowed: (resource: string) => ({
      id: '4fe2b9c',
      statusCode: 401,
      message: `Not allowed to save ${resource}.`,
    }),
  },
  remove: {
    notAllowed: (resource: string) => ({
      id: '5615ac4',
      statusCode: 401,
      message: `Not allowed to remove ${resource}.`,
    }),
    notFound: (resource: string) => ({
      id: '0a54998',
      statusCode: 400,
      message: `Cannot find ${resource}.`,
    }),
  },
  invite: {
    send: {
      notAllowed: () => ({
        id: '80ab09a',
        statusCode: 401,
        message: `Not allowed to send invite.`,
      }),
    },
  },
  booklet: {
    generate: {
      notFound: () => ({
        id: '107c383',
        statusCode: 400,
        message: `Cannot find booklet.`,
      }),
      externalIssue: () => ({
        id: 'a5494fe',
        statusCode: 500,
        message: `Cannot process booklet.`,
      }),
      notPaid: () => ({
        id: '923efca',
        statusCode: 402,
        message: `booklet must be paid first.`,
      }),
    },
    sendPrint: {
      notFound: () => ({
        id: '203d3ea',
        statusCode: 400,
        message: `Cannot find booklet.`,
      }),
      notPaid: () => ({
        id: '910aee9',
        statusCode: 402,
        message: `Payment required to send booklet.`,
      }),
      notFoundCase: () => ({
        id: 'xsadv112',
        statusCode: 400,
        message: `Cannot find associated case.`,
      }),
    },
  },
  bookmark: {
    generate: {
      notFound: () => ({
        id: '3c2e383',
        statusCode: 400,
        message: `Cannot find bookmark.`,
      }),
      externalIssue: () => ({
        id: 'c5244fe',
        statusCode: 500,
        message: `Cannot process bookmark.`,
      }),
      notPaid: () => ({
        id: '924ecza',
        statusCode: 402,
        message: `bookmark must be paid first.`,
      }),
    },
    sendPrint: {
      notFound: () => ({
        id: '205deea',
        statusCode: 400,
        message: `Cannot find bookmark.`,
      }),
      notPaid: () => ({
        id: '952ffe9',
        statusCode: 402,
        message: `Payment required to send bookmark.`,
      }),
      notFoundCase: () => ({
        id: 'xsadv112',
        statusCode: 400,
        message: `Cannot find associated case.`,
      }),
    },
  },
  slideshow: {
    generate: {
      notFound: () => ({
        id: '0668ad6',
        statusCode: 400,
        message: `Cannot find slideshow.`,
      }),
      externalIssue: () => ({
        id: 'c38380a',
        statusCode: 500,
        message: `Cannot process slideshow.`,
      }),
    },
  },
  sidedCard: {
    generate: {
      notFound: () => ({
        id: '107e383',
        statusCode: 400,
        message: `Cannot find sided card.`,
      }),
      externalIssue: () => ({
        id: 'c5394fe',
        statusCode: 500,
        message: `Cannot process sided card.`,
      }),
      notPaid: () => ({
        id: '924efca',
        statusCode: 402,
        message: `sided card must be paid first.`,
      }),
    },
    sendPrint: {
      notFound: () => ({
        id: '205c3ea',
        statusCode: 400,
        message: `Cannot find sided card.`,
      }),
      notPaid: () => ({
        id: '950eee9',
        statusCode: 402,
        message: `Payment required to send sided card.`,
      }),
      notFoundCase: () => ({
        id: 'xsadv112',
        statusCode: 400,
        message: `Cannot find associated case.`,
      }),
    },
  },
  thankyouCard: {
    generate: {
      notFound: () => ({
        id: '14ys283',
        statusCode: 400,
        message: `Cannot find thankyouCard.`,
      }),
      externalIssue: () => ({
        id: 'c52vzfe',
        statusCode: 500,
        message: `Cannot process thankyouCard.`,
      }),
      notPaid: () => ({
        id: 've4efca',
        statusCode: 402,
        message: `thankyouCard must be paid first.`,
      }),
    },
    sendPrint: {
      notFound: () => ({
        id: '2sdfgea',
        statusCode: 400,
        message: `Cannot find thankyouCard.`,
      }),
      notPaid: () => ({
        id: '95sdfe9',
        statusCode: 402,
        message: `Payment required to send thankyouCard.`,
      }),
      notFoundCase: () => ({
        id: 'xsadv112',
        statusCode: 400,
        message: `Cannot find associated case.`,
      }),
    },
  },
  tvWelcomeScreen: {
    generate: {
      notFound: () => ({
        id: '14ys283',
        statusCode: 400,
        message: `Cannot find tvWelcomeScreen.`,
      }),
      externalIssue: () => ({
        id: 'c52vzfe',
        statusCode: 500,
        message: `Cannot process tvWecomeScreen.`,
      }),
      notPaid: () => ({
        id: 've4efca',
        statusCode: 402,
        message: `tvWecomeScreen must be paid first.`,
      }),
    },
    sendPrint: {
      notFound: () => ({
        id: '2sdfgea',
        statusCode: 400,
        message: `Cannot find tvWecomeScreen.`,
      }),
      notPaid: () => ({
        id: '95sdfe9',
        statusCode: 402,
        message: `Payment required to send tvWecomeScreen.`,
      }),
      notFoundCase: () => ({
        id: 'xsadv112',
        statusCode: 400,
        message: `Cannot find associated case.`,
      }),
    },
  },
  genericCardProduct: {
    generate: {
      notFound: () => ({
        id: 'gcp0001',
        statusCode: 400,
        message: `Cannot find generic card product.`,
      }),
      externalIssue: () => ({
        id: 'gcp0002',
        statusCode: 500,
        message: `Cannot process generic card product.`,
      }),
      notPaid: () => ({
        id: 'gcp0003',
        statusCode: 402,
        message: `Generic card product must be paid first.`,
      }),
    },
    sendPrint: {
      notFound: () => ({
        id: 'gcp0004',
        statusCode: 400,
        message: `Cannot find generic card product.`,
      }),
      notPaid: () => ({
        id: 'gcp0005',
        statusCode: 402,
        message: `Payment required to send generic card product.`,
      }),
      notFoundCase: () => ({
        id: 'gcp0006',
        statusCode: 400,
        message: `Cannot find associated case.`,
      }),
    },
  },
}

export const account = {
  sign: {
    in: {
      shadow: {
        invalidToken: () => ({
          id: 'a876580',
          statusCode: 400,
          message: 'Invalid token.',
        }),
      },
      user: {
        invalidEmail: () => ({
          id: 'b5f81e0',
          statusCode: 400,
          message: 'Invalid email address.',
        }),
        invalidPassword: () => ({
          id: '485ce87',
          statusCode: 400,
          message: 'Invalid password.',
        }),
      },
      invite: {
        invalidToken: () => ({
          id: '6585cd1',
          statusCode: 400,
          message: 'Invalid token.',
        }),
      },
      service: {
        invalidKey: () => ({
          id: '08fe80a',
          statusCode: 400,
          message: 'Invalid key.',
        }),
      },
    },
    up: {
      user: {
        missingParameters: () => ({
          id: '08fe038',
          statusCode: 400,
          message: 'Missing `fullName`, `email`, `password` or `type` param.',
        }),
        blockedEmail: () => ({
          id: '08fe039',
          statusCode: 400,
          message: 'Email is blocked.',
        }),
        invalidEmail: () => ({
          id: '08fe040',
          statusCode: 400,
          message: 'An account with this email already exists.',
        }),
        profanityWordsDetected: () => ({
          id: '08fe041',
          statusCode: 400,
          message: 'Please do not use inappropriate words.',
        }),
      },
    },
  },
  invalidToken: () => ({
    id: 'e039658',
    statusCode: 400,
    message: 'Invalid token.',
  }),
}

export const payment = {
  invalidProduct: (sku: string) => ({
    id: '80a5ef2',
    statusCode: 400,
    message: `Invalid Product SKU "${sku}".`,
  }),
  missingCountry: () => ({
    id: '2z6523c',
    statusCode: 400,
    message: 'Missing payment country.',
  }),
  missingOrderDetails: () => ({
    id: 'asdczs1',
    statusCode: 400,
    message: 'Missing order details.',
  }),
  create: {
    pendingPaymentExisting: () => ({
      id: '0665ac1',
      statusCode: 400,
      message:
        'Pending payment exists, please contact with Eulogize customer service.',
    }),
    duplicatePayment: () => ({
      id: '0665ac4',
      statusCode: 400,
      message: 'Payment already exists.',
    }),
    duplicateNonKeepsakePackagePayment: () => ({
      id: '0665ac5',
      statusCode: 400,
      message:
        'This package has already been purchased for this memorial. Please choose a different package.',
    }),
    stripeError: ({
      statusCode,
      message,
    }: {
      statusCode: number
      message: string
    }) => ({
      id: '08f980a',
      statusCode: statusCode || 500,
      message: message || 'Error creating payment with Stripe.',
    }),
    userNotFound: () => ({
      id: '01a023a',
      statusCode: 404,
      message: 'User Not Found',
    }),
    paymentFailed: () => ({
      id: '22e3v3a',
      statusCode: 404,
      message:
        'Payment failed, please contact Eulogize customer service, or try with anothe card.',
    }),
    initalPaymentIntentIdMissing: (stripeError: any) => ({
      id: 'asdzc1',
      statusCode: 500,
      message:
        stripeError ||
        'Initial Payment Intent id missing, please contact Eulogize customer service.',
    }),
    noStripeClient: (stripeError: any) => ({
      id: 'xcz123c1',
      statusCode: 500,
      message: stripeError || `No Stripe Client, StripeError: ${stripeError}`,
    }),
  },
  stripe: {
    product: {
      createProductFailed: (error: any) => ({
        id: 'productE1',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error creating product with Stripe. Error: ${error}`,
      }),
      noProductName: (error: any) => ({
        id: 'productE2',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          'Error creating product with Stripe, no product name',
      }),
      noProductId: (error: any) => ({
        id: 'productE3',
        statusCode: error.statusCode || 500,
        message:
          error.message || 'Error creating product with Stripe, no product id',
      }),
      retrieveProductFailed: (error: any) => ({
        id: 'productE4',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error retrieve product with Stripe. Error: ${error}`,
      }),
      retrieveOrCreateProductFailed: (error: any) => ({
        id: 'productE5',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error retrieve or creeate product with Stripe. Error: ${error}`,
      }),
    },
    price: {
      createPriceFailed: (error: any) => ({
        id: 'priceE1',
        statusCode: error.statusCode || 500,
        message:
          error.message || `Error creating price with Stripe. Error: ${error}`,
      }),
      noRequiredParameters: (error: any) => ({
        id: 'priceE2',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error creating price with Stripe, no required parameters: ${error}`,
      }),
      retrievePriceFailed: (error: any) => ({
        id: 'priceE3',
        statusCode: error.statusCode || 500,
        message:
          error.message || `Error retrieve price with Stripe. Error: ${error}`,
      }),
      noPackageFoundForPrice: (error: any) => ({
        id: 'priceE4',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error found package option for price with Stripe. Error: ${error}`,
      }),
      noKeepsakesFoundForPrice: (error: any) => ({
        id: 'priceE5',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error found keepsake product for price with Stripe. Error: ${error}`,
      }),
      noPrintingFoundForPrice: (error: any) => ({
        id: 'priceE6',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error found printing product for price with Stripe. Error: ${error}`,
      }),
      noShippingFoundForPrice: (error: any) => ({
        id: 'priceE7',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error found shipping product for price with Stripe. Error: ${error}`,
      }),
      updatePriceFailed: (error: any) => ({
        id: 'priceE8',
        statusCode: error.statusCode || 500,
        message:
          error.message || `Error update price with Stripe. Error: ${error}`,
      }),
      noKeepsakesFeeCaluclated: (error: any) => ({
        id: 'priceE9',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error calculate keepsake product for price with Stripe. Error: ${error}`,
      }),
    },
    customers: {
      createCustomerFailed: (error: any) => ({
        id: 'customerE1',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error creating customer with Stripe. Error: ${error}`,
      }),
      noRequiredParameters: (error: any) => ({
        id: 'customerE2',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error creating customer with Stripe, no required parameters: ${error}`,
      }),
      noCustomerEmailFound: (error: any) => ({
        id: 'customerE3',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error creating customer with Stripe, no customer'e email matched in the user table: ${error}`,
      }),
      retrieveCustomerFailed: (error: any) => ({
        id: 'customerE4',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error retrieve customer with Stripe. Error: ${error}`,
      }),
      searchCsutomerFailed: (error: any) => ({
        id: 'customerE5',
        statusCode: error.statusCode || 500,
        message:
          error.message || `Error search customer with Stripe. Error: ${error}`,
      }),
      noCustomerId: (error: any) => ({
        id: 'customerE6',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error retieve customer's id with Stripe. Error: ${error}`,
      }),
    },
    invoice: {
      createInvoiceFailed: (error: any) => ({
        id: 'invoiceE1',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error creating invoice with Stripe. Error: ${error}`,
      }),
      noRequiredParameters: (error: any) => ({
        id: 'invoiceE2',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error creating invoice with Stripe, no required parameters: ${error}`,
      }),
      createInvoiceItemFailed: (error: any) => ({
        id: 'invoiceE3',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error creating invoice item with Stripe. Error: ${error}`,
      }),
      finaliseInvoiceFailed: (error: any) => ({
        id: 'invoiceE4',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error finalise invoice with Stripe. Error: ${error}`,
      }),
      sendInvoiceFailed: (error: any) => ({
        id: 'invoiceE5',
        statusCode: error.statusCode || 500,
        message:
          error.message || `Error send invoice with Stripe. Error: ${error}`,
      }),
      payInvoiceFailed: (error: any) => ({
        id: 'invoiceE6',
        statusCode: error.statusCode || 500,
        message:
          error.message || `Error pay invoice with Stripe. Error: ${error}`,
      }),
    },
    paymentMethod: {
      attachpaymentMethodFailed: (error: any) => ({
        id: 'paymentMethodE1',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error attaching paymentMethod with Stripe. Error: ${error}`,
      }),
      noRequiredParameters: (error: any) => ({
        id: 'paymentMethodE2',
        statusCode: error.statusCode || 500,
        message:
          error.message ||
          `Error attaching paymentMethod with Stripe, no required parameters: ${error}`,
      }),
    },
  },
}

export const externalAPIErrors = {
  get: {
    externalCaseIdMissing: () => ({
      id: '0a2b3c001',
      statusCode: 400,
      message: 'externalCaseId is required.',
    }),
    clientIdMissing: () => ({
      id: '0a2b3c002',
      statusCode: 400,
      message: 'clientId is required.',
    }),
    syncError: () => ({
      id: '0a2b3c003',
      statusCode: 400,
      message: 'Error syncing with external data.',
    }),
  },
  create: {
    apiKeyMissing: () => ({
      id: '1a2b3c001',
      statusCode: 400,
      message: 'API Key is required',
    }),
    invalidApiKey: () => ({
      id: '1a2b3c002',
      statusCode: 400,
      message: 'Invalid API Key',
    }),
    clientNotFound: () => ({
      id: '1a2b3c03',
      statusCode: 403,
      message: 'No client found',
    }),
    invalidArrangerId: () => ({
      id: '1a2b3c04',
      statusCode: 403,
      message: 'Invalid arranger id, please check the arrangerId input',
    }),
    arrangerIdMissing: () => ({
      id: '1a2b3c05',
      statusCode: 400,
      message: 'Arranger id is missing',
    }),
    familyCaseEmailExists: () => ({
      id: '1a2b3c06',
      statusCode: 400,
      message: 'Family member email has been existed, case create failed.',
    }),
    clientHasNoArranger: () => ({
      id: '1a2b3c07',
      statusCode: 403,
      message:
        'Client does not have any arranger, please contact Eulogize admin',
    }),
    arrangerNotFoundInClient: () => ({
      id: '1a2b3c08',
      statusCode: 403,
      message:
        'Arranger is not found in client, please check the input arranger name and it is case sensitive, or you could leave it as blank',
    }),
    notValidClientArranger: () => ({
      id: '1a2b3c09',
      statusCode: 403,
      message:
        'Arranger is not valid in the associated client, please contact Eulogize admin',
    }),
    failedToCreateNewUser: () => ({
      id: '1a2b3c10',
      statusCode: 500,
      message: 'Failed to create a new user',
    }),
    invalidParameter: () => ({
      id: '1a2b3c11',
      statusCode: 400,
      message: 'Invalid parameter',
    }),
    invalidInvitedFamilyAs: () => ({
      id: '1a2b3c12',
      statusCode: 400,
      message: `Invalid invitedFamilyAs parameter, please choose one of each: editor, co-editor, contributor, customer, or omit it`,
    }),
    invalidEnabledProducts: () => ({
      id: '1a2b3c13',
      statusCode: 400,
      message: 'Invalid enabled products',
    }),
    invalidEnabledProductsPermission: () => ({
      id: '1a2b3c14',
      statusCode: 400,
      message: 'Invalid enabled product permission',
    }),
    invalidDateInput: ({ fieldName }: { fieldName?: string } = {}) => ({
      id: '1a2b3c15',
      statusCode: 400,
      message: fieldName
        ? `Invalid date input for field "${fieldName}", please check and follow the format YYYY-MM-DD`
        : 'Invalid date input, please check and follow the format YYYY-MM-DD',
    }),
    emailRecurstionExhausted: () => ({
      id: '1a2b3c16',
      statusCode: 500,
      message:
        'Email is taken and cannot be created, please contact with Eulogize admin',
    }),
    internalError: () => ({
      id: '1avd3c17',
      statusCode: 500,
      message: 'Something went wrong, please contract with Eulogize admin',
    }),
    invalidInviteToken: () => ({
      id: '1a2b3c18',
      statusCode: 500,
      message: `Invalid contributor token, please contract with Eulogize admin`,
    }),
    failedToGenerateCaseInviteOrLoginLink: ({
      errMsg,
    }: {
      errMsg: string
    }) => ({
      id: '1a2b3c19',
      statusCode: 500,
      message: `Failed to generate access link, please contract with Eulogize admin. message: ${errMsg}`,
    }),
    failedToCreateNewClient: () => ({
      id: '1a2b3c20',
      statusCode: 500,
      message: 'Failed to create a new client, please contact Eulogize Admin',
    }),
    missingFuneralDirectorInput: () => ({
      id: '1a2b3c21',
      statusCode: 400,
      message:
        'Invalid funeral director input, please add at least one funeral director details',
    }),
    invalidFuneralDirectorDetailsInput: () => ({
      id: '1a2b3c22',
      statusCode: 400,
      message:
        'Invalid funeral director input, please make sure that email and username are both valid',
    }),
    invalidCountryInput: () => ({
      id: '1a2b3c23',
      statusCode: 400,
      message: 'Invalid country field input, please check again',
    }),
    invalidFuneralDirectorEmail: () => ({
      id: '1a2b3c24',
      statusCode: 400,
      message:
        'Invalid funeral director email, please check it again and make sure the email is valid',
    }),
    funeralDirectorEmailExisted: () => ({
      id: '1a2b3c25',
      statusCode: 400,
      message:
        'The email of the new funeral director has been taken, please try another again',
    }),
    failedToCreateNewFuneralDirectorUser: () => ({
      id: '1a2b3c26',
      statusCode: 500,
      message:
        'Failed to create a new funeral director account, please contact Eulogize Admin',
    }),
    failedToAssignNewFuneralDirectorToClient: () => ({
      id: '1a2b3c27',
      statusCode: 500,
      message:
        'Failed to assign a new funeral director to the client, please contact Eulogize Admin',
    }),
    APIKeyNoPermission: () => ({
      id: '1a2b3c28',
      statusCode: 403,
      message: `API access denied, please contact Eulogize Admin`,
    }),
  },
  update: {
    caseNotFound: () => ({
      id: '1a2b3d01',
      statusCode: 404,
      message: 'Case not found',
    }),
    caseValidationFailed: () => ({
      id: '1a2b3d02',
      statusCode: 403,
      message:
        'The provided caseId, clientId, and email do not reference the same case.',
    }),
    noUpdatableFields: () => ({
      id: '1a2b3d03',
      statusCode: 400,
      message: 'No updatable fields were provided in the request body.',
    }),
    invalidDateInput: ({ fieldName }: { fieldName?: string } = {}) => ({
      id: '1a2b3d04',
      statusCode: 400,
      message: fieldName
        ? `Invalid date input for field "${fieldName}", please check and follow the format YYYY-MM-DD`
        : 'Invalid date input, please check and follow the format YYYY-MM-DD',
    }),
    failedToUpdateCase: () => ({
      id: '1a2b3d05',
      statusCode: 500,
      message:
        'Failed to update case. All changes were rolled back to the previous state.',
    }),
    failedToRollbackCase: () => ({
      id: '1a2b3d06',
      statusCode: 500,
      message:
        'Failed to update case and rollback failed. Please contact Eulogize admin.',
    }),
  },
}
