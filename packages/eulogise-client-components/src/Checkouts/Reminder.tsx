import React from 'react'
import styled from 'styled-components'

export const DEFAULT_REMINDER_TEXT_STYLE = `
  font-family: "Greycliff";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  padding: 8px 12px 8px 8px;
`

export interface IReminderProps {
  text: string
  backgroundColor?: string
  borderColor?: string
  margin?: string
  padding?: string
  textColor?: any
  iconComponent?: JSX.Element
}

const StyledContainer = styled.div<{
  $backgroundColor?: string
  $borderColor?: string
  $margin?: string
  $padding?: string
}>`
  ${({ $backgroundColor }) =>
    $backgroundColor &&
    `
    background-color: ${$backgroundColor};
  `}
  ${({ $borderColor }) =>
    $borderColor &&
    `
    border: 1px solid ${$borderColor};
  `}
  ${({ $margin }) =>
    $margin &&
    `
    margin: ${$margin};
  `}
  ${({ $padding }) =>
    $padding &&
    `
    padding: ${$padding};
  `}
  border-radius: 4px;
  width: fit-content;
  display: flex;
  justify-content: space-between;
`

const StyledText = styled.div<{ $textColor: any }>`
  ${DEFAULT_REMINDER_TEXT_STYLE}
  ${({ $textColor }) =>
    $textColor &&
    `
      color: ${$textColor}
    `};
`

export const Reminder: React.FC<IReminderProps> = ({
  text,
  backgroundColor,
  borderColor,
  margin,
  padding,
  textColor,
  iconComponent,
}) => {
  return (
    <StyledContainer
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $margin={margin}
      $padding={padding}
    >
      {iconComponent && iconComponent}
      <StyledText $textColor={textColor}>{text}</StyledText>
    </StyledContainer>
  )
}
