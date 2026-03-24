import React from 'react'
import styled from 'styled-components'
import BookletServiceCard from './ServiceCard/BookletServiceCard/BookletServiceCard'
import SlideshowServiceCard from './ServiceCard/SlideshowServiceCard/SlideshowServiceCard'
import WelcomeScreenServiceCard from './ServiceCard/WelcomeScreenServiceCard/WelcomeScreenServiceCard'
import MemorialServiceCard from './ServiceCard/MemorialServiceCard/MemorialServiceCard'
import ThankyouServiceCard from './ServiceCard/ThankyouServiceCard/ThankyouServiceCard'
import BookmarkServiceCard from './ServiceCard/BookmarkServiceCard/BookmarkServiceCard'
import { useAllGenericCardProductTypes, useCaseState } from '../../store/hooks'
import { CaseHelper } from '@eulogise/helpers'
import PhotobookServiceCard from './ServiceCard/PhotobookServiceCard/PhotobookServiceCard'
import { PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES } from '@eulogise/core'
import GenericCardProductTypeCard from './ServiceCard/GenericCardProductTypeCard'

const StyledServiceCards = styled.div`
  display: flex;
  justify-content: center;
`

const CardsContainer = styled.div<{ $isTwoColumns: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  ${({ $isTwoColumns }: { $isTwoColumns: boolean }) =>
    $isTwoColumns ? `max-width: 45rem;` : `max-width: 68rem;`}
`

const ServiceCards = () => {
  const caseState = useCaseState()
  const activeCase = caseState.activeItem!
  const country = caseState?.activeItem?.country
  const enabledProducts = CaseHelper.getEnabledProducts({ activeCase })
  const isTwoColumns = CaseHelper.getIsDisplayTwoColumns({ activeCase })

  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const isPhotobookShippable = country
    ? PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country)
    : false

  return (
    <StyledServiceCards>
      <CardsContainer $isTwoColumns={isTwoColumns}>
        {enabledProducts.BOOKLET === true && <BookletServiceCard />}
        {enabledProducts.SLIDESHOW === true && <SlideshowServiceCard />}
        {enabledProducts.SIDED_CARD === true && <MemorialServiceCard />}
        {enabledProducts.THANK_YOU_CARD === true && <ThankyouServiceCard />}
        {enabledProducts.BOOKMARK === true && <BookmarkServiceCard />}
        {enabledProducts.TV_WELCOME_SCREEN === true && (
          <WelcomeScreenServiceCard />
        )}
        {enabledProducts.PHOTOBOOK === true && isPhotobookShippable && (
          <PhotobookServiceCard />
        )}

        {/* Display Generic Card Product Types for all users */}
        {genericProductTypes.map((genericProductType: any) => (
          <GenericCardProductTypeCard
            key={genericProductType.id}
            genericProductType={genericProductType}
          />
        ))}
      </CardsContainer>
    </StyledServiceCards>
  )
}

export default ServiceCards
