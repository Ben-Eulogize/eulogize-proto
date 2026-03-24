import React, { useCallback } from 'react'
import { CheckoutHelper } from '@eulogise/helpers'
import {
  EulogiseCountry,
  EulogisePackageOptions,
  EulogiseUserRole,
  IInvoiceState,
  KEEPSAKE_PRODUCTS,
} from '@eulogise/core'
import { PackageCard } from '@eulogise/client-components'
import {
  useAuthState,
  useCaseState,
  useClientState,
  useEulogiseDispatch,
  useInvoiceState,
  usePhotobookState,
} from '../../store/hooks'
import {
  restoreCheckoutsState,
  updatePaymentOption,
  updatePendingKeepsakesDrawerProduct,
} from '../../store/CheckoutsState/action'

interface PackageCardContainerProps {
  country: EulogiseCountry
  packageOption: EulogisePackageOptions
}

export const PackageCardContainer = ({
  country,
  packageOption,
}: PackageCardContainerProps) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activePhotobook } = usePhotobookState()
  const { items: invoices = [] }: IInvoiceState = useInvoiceState()
  const { account } = useAuthState()
  const { activeItem: activeClient } = useClientState()
  const role = account?.role ?? null
  const { activeItem: activeCase = null } = useCaseState()
  const isCustomer = role === EulogiseUserRole.CUSTOMER

  const handleSelect = useCallback(() => {
    dispatch(restoreCheckoutsState())
    dispatch(updatePaymentOption(packageOption))

    const navigateFn = isCustomer
      ? CheckoutHelper.getOnContinueFnInPackagePageV2Customers({
          country,
          packageOption,
        })
      : CheckoutHelper.getOnContinueFnInPackagePageV2FuneralClientsOrEditors({
          country,
          packageOption,
          role,
          allowPurchasing: activeClient?.allowPurchasing,
          activeCase,
        })
    // Automatically open keepsakes drawer for photobook if selected package is ADD_ON_PREMIUM_PHOTO_BOOK
    if (packageOption === EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK) {
      dispatch(
        updatePendingKeepsakesDrawerProduct(KEEPSAKE_PRODUCTS.PHOTO_BOOKS),
      )
    }
    navigateFn()
  }, [country, dispatch, packageOption])

  return (
    <PackageCard
      country={country}
      packageOption={packageOption}
      invoices={invoices}
      activePhotobook={activePhotobook}
      onSelect={handleSelect}
    />
  )
}
