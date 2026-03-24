import React from 'react'
import styled from 'styled-components'
import { SwitchButton } from '../Switch'
import { CardProductBorderPageType } from '@eulogise/core'

const BorderPagesSwitchesContainer = styled.div`
  width: 10rem;
  padding-top: 5px;
`

// @ts-ignore
const StyledSwitchButton = styled(SwitchButton)`
  width: 100%;
`

type IBorderPagesSwitchesProps = {
  values: { [key: string]: boolean }
  onChange: (value: { [key: string]: boolean }) => void
}

export const BorderPagesSwitches = ({
  values,
  onChange,
}: IBorderPagesSwitchesProps) => {
  const handleChange = (
    fieldName: CardProductBorderPageType,
    value: boolean,
  ) => {
    onChange({
      ...values,
      [fieldName]: value,
    })
  }
  return (
    <BorderPagesSwitchesContainer>
      <StyledSwitchButton
        checked={values[CardProductBorderPageType.FRONT_PAGE]}
        onClick={(value: any) =>
          handleChange(CardProductBorderPageType.FRONT_PAGE, value as boolean)
        }
      >
        Front Page
      </StyledSwitchButton>
      <StyledSwitchButton
        checked={values[CardProductBorderPageType.MIDDLE_PAGES]}
        onClick={(value: any) =>
          handleChange(CardProductBorderPageType.MIDDLE_PAGES, value as boolean)
        }
      >
        Middle Pages
      </StyledSwitchButton>
      <StyledSwitchButton
        checked={values[CardProductBorderPageType.BACK_PAGE]}
        onClick={(value: any) =>
          handleChange(CardProductBorderPageType.BACK_PAGE, value as boolean)
        }
      >
        Back Page
      </StyledSwitchButton>
    </BorderPagesSwitchesContainer>
  )
}
