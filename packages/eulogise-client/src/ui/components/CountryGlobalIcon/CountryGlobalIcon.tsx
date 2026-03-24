import { COLOR, useIsNotDesktop } from '@eulogise/client-core'
import React from 'react'
import styled from 'styled-components'
import { EulogiseCountry } from '@eulogise/core'

// Country Icons
import AustraliaIcon from '../../assets/icons/countries/Australia.jpg'
import CanadaIcon from '../../assets/icons/countries/Canada.jpg'
import EuropeanUnionIcon from '../../assets/icons/countries/EuropeanUnion.jpg'
import NewZealandIcon from '../../assets/icons/countries/NewZealand.jpg'
import UnitedKingdomIcon from '../../assets/icons/countries/UnitedKingdom.jpg'
import UnitedStatesIcon from '../../assets/icons/countries/UnitedStates.jpg'
import ChileIcon from '../../assets/icons/countries/Chile.jpg'
import ColombiaIcon from '../../assets/icons/countries/Colombia.jpg'
import CostaRicaIcon from '../../assets/icons/countries/CostaRica.jpg'
import DominicanRepublicIcon from '../../assets/icons/countries/DominicanRepublic.jpg'
import GuatemalaIcon from '../../assets/icons/countries/Guatemala.jpg'
import MexicoIcon from '../../assets/icons/countries/Mexico.jpg'
import PanamaIcon from '../../assets/icons/countries/Panama.jpg'
import PhilippinesIcon from '../../assets/icons/countries/Philippines.jpg'
import RestOfTheWorldIcon from '../../assets/icons/countries/RestOfTheWorld.jpg'

export interface IEulogiseCountryGlobalIconProps {
  countryIcon: string | undefined
  countryFullName: string
  countryAbbr: string
}

const StyledEulogiseCountryIcon = styled.div`
  display: flex;
`

const StyledCountryName = styled.div`
  margin-left: 30px;
`

const StyledCountryIcon = styled.img`
  margin-top: -5px;
  height: 20px;
  width: 20px;
`

const StyledCountryIconContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const StyledPrimaryCountriesDivider = styled.div`
  border-top: 1px solid ${COLOR.BLACK};
`

const EulogiseCountryGlobalIcon = ({
  countryIcon,
  countryFullName,
  countryAbbr,
}: IEulogiseCountryGlobalIconProps) => {
  const isMobile = useIsNotDesktop()

  return (
    <StyledEulogiseCountryIcon>
      <StyledCountryIconContainer>
        {countryIcon && <StyledCountryIcon src={countryIcon} />}
      </StyledCountryIconContainer>
      <StyledCountryName>
        {isMobile ? countryAbbr : countryFullName}
      </StyledCountryName>
    </StyledEulogiseCountryIcon>
  )
}

export const EULOGIZE_COUNTRIES_ICON_MAPS = {
  [EulogiseCountry.AUSTRALIA]: AustraliaIcon,
  [EulogiseCountry.CANADA]: CanadaIcon,
  [EulogiseCountry.CHILE]: ChileIcon,
  [EulogiseCountry.COLOMBIA]: ColombiaIcon,
  [EulogiseCountry.COSTA_RICA]: CostaRicaIcon,
  [EulogiseCountry.EUROPEAN_UNION]: EuropeanUnionIcon,
  [EulogiseCountry.GUATEMALA]: GuatemalaIcon,
  [EulogiseCountry.MEXICO]: MexicoIcon,
  [EulogiseCountry.NEW_ZEALAND]: NewZealandIcon,
  [EulogiseCountry.PANAMA]: PanamaIcon,
  [EulogiseCountry.REST_OF_THE_WOLRD]: RestOfTheWorldIcon,
  [EulogiseCountry.THE_DOMINICAN_REPUBLIC]: DominicanRepublicIcon,
  [EulogiseCountry.THE_PHILIPPINES]: PhilippinesIcon,
  [EulogiseCountry.UNITED_KINGDOM]: UnitedKingdomIcon,
  [EulogiseCountry.UNITED_STATES]: UnitedStatesIcon,
}

export const EULOGISE_COUNTRIES_REGIONS_OPTIONS = [
  // ISO: https://en.wikipedia.org/wiki/ISO_3166-1#Officially_assigned_code_elements
  // Abbr: https://www.nationsonline.org/oneworld/country_code_list.htm
  {
    value: 'Australia',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.AUSTRALIA}
        countryAbbr="AUS"
        countryIcon={AustraliaIcon}
      />
    ),
  },
  {
    value: 'Canada',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.CANADA}
        countryAbbr="CAN"
        countryIcon={CanadaIcon}
      />
    ),
  },
  {
    value: 'European Union',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.EUROPEAN_UNION}
        countryAbbr="EU"
        countryIcon={EuropeanUnionIcon}
      />
    ),
  },
  {
    value: 'United Kingdom',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.UNITED_KINGDOM}
        countryAbbr="UK"
        countryIcon={UnitedKingdomIcon}
      />
    ),
  },
  {
    value: 'United States',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.UNITED_STATES}
        countryAbbr="USA"
        countryIcon={UnitedStatesIcon}
      />
    ),
  },
  {
    className: 'primary-countries-divider',
    value: '',
    disabled: true,
    label: <StyledPrimaryCountriesDivider />,
  },
  {
    value: 'Chile',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.CHILE}
        countryAbbr="CHL"
        countryIcon={ChileIcon}
      />
    ),
  },
  {
    value: 'Colombia',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.COLOMBIA}
        countryAbbr="COL"
        countryIcon={ColombiaIcon}
      />
    ),
  },
  {
    value: 'Costa Rica',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.COSTA_RICA}
        countryAbbr="CRI"
        countryIcon={CostaRicaIcon}
      />
    ),
  },
  {
    value: 'Mexico',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.MEXICO}
        countryAbbr="MEX"
        countryIcon={MexicoIcon}
      />
    ),
  },
  {
    value: 'New Zealand',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.NEW_ZEALAND}
        countryAbbr="NZ"
        countryIcon={NewZealandIcon}
      />
    ),
  },
  {
    value: 'Panama',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.PANAMA}
        countryAbbr="PA"
        countryIcon={PanamaIcon}
      />
    ),
  },
  {
    value: 'Guatemala',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.GUATEMALA}
        countryAbbr="GTM"
        countryIcon={GuatemalaIcon}
      />
    ),
  },
  {
    value: 'The Dominican Republic',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.THE_DOMINICAN_REPUBLIC}
        countryAbbr="DOM"
        countryIcon={DominicanRepublicIcon}
      />
    ),
  },
  {
    value: 'The Philippines',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.THE_PHILIPPINES}
        countryAbbr="PHL"
        countryIcon={PhilippinesIcon}
      />
    ),
  },
  {
    value: 'Rest of The World',
    label: (
      <EulogiseCountryGlobalIcon
        countryFullName={EulogiseCountry.REST_OF_THE_WOLRD}
        countryAbbr="Others"
        countryIcon={RestOfTheWorldIcon}
      />
    ),
  },
]
