import React, { useState } from 'react'
import { ButtonType, Button, Notification } from '@eulogise/client-components'
import { ICopyLibraryCopy } from '@eulogise/core'
import { COLOR, STYLE } from '@eulogise/client-core'
import styled from 'styled-components'

interface ICopyLibraryCopyProps extends ICopyLibraryCopy {
  onClose: () => void
  onReplaceText: (replaceText: string) => void
}

const StyledCopyLibraryDropdownContainer = styled.div<{
  $isExpandable: boolean
}>`
  ${({ $isExpandable }) => ($isExpandable ? `min-height: 150px;` : '')}
  min-width: 100%;
  background-color: ${COLOR.WHITE};
  margin: 20px 0;
  border: 2px solid ${COLOR.BLACK};
  position: relative;
  border-radius: ${STYLE.SIDER_ITEM_BORDER_RADIUS};
`

const StyledCopyLibraryDropdownTitleContainer = styled.div<{
  $isExpandable: boolean
}>`
  align-items: center;
  display: flex;
  height: 50px;
  background-color: ${COLOR.CORE_PURPLE_10};
  justify-content: space-between;
  ${({ $isExpandable }) =>
    $isExpandable
      ? `
        border-radius: ${STYLE.SIDER_ITEM_BORDER_RADIUS} ${STYLE.SIDER_ITEM_BORDER_RADIUS} 0 0;
      `
      : `border-radius: ${STYLE.SIDER_ITEM_BORDER_RADIUS};`}
`

const StyledCopyLibraryDropdownTitle = styled.div`
  display: inline-block;
  font-weight: 700;
  margin: 0 20px 0 20px;
`

const StyledCopyLibraryDropdownCopyFrom = styled.div`
  display: inline-block;
`

const StyledButton = styled(Button)``

const StyledCopyLibraryDropdownLeftContainer = styled.div``

const StyledCopyLibraryDropdownRightContainer = styled.div``

const StyledCopyLibraryDropdownTextContainer = styled.div<{
  isExpanded?: boolean
}>`
  min-height: 50px;
  ${({ isExpanded }) => isExpanded && ` min-height: 200px`}
`

const StyledTextInsideButtonContainer = styled.div`
  min-height: 50px;
`

const StyledTextInsideButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 8px;
`

const StyledCopyLibraryDropdownText = styled.div<{ isExpanded?: boolean }>`
  margin: 20px;
  ${({ isExpanded }) =>
    !isExpanded &&
    `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  `}
`

const CopyToClipboard = ({ text }: { text: string }) => {
  try {
    navigator.clipboard.writeText(text)
    Notification.success(`Text copied to clipboard.`)
  } catch (error) {
    Notification.error('Text copied to clipboard failed.')
  }
}

const CopyLibraryContentComponent = ({
  title,
  copyFrom,
  text,
  onClose,
  onReplaceText,
}: ICopyLibraryCopyProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const copiedText = text ? `${title}\n\n` + text : title

  const combinedText = text?.split('\n').join(' ')

  const isExpandable = !!text
  return (
    <StyledCopyLibraryDropdownContainer $isExpandable={isExpandable}>
      <StyledCopyLibraryDropdownTitleContainer $isExpandable={isExpandable}>
        <StyledCopyLibraryDropdownLeftContainer>
          <StyledCopyLibraryDropdownTitle>
            {title}
          </StyledCopyLibraryDropdownTitle>
          {copyFrom && (
            <StyledCopyLibraryDropdownCopyFrom>
              {copyFrom}
            </StyledCopyLibraryDropdownCopyFrom>
          )}
        </StyledCopyLibraryDropdownLeftContainer>

        <StyledCopyLibraryDropdownRightContainer>
          <StyledButton
            buttonType={ButtonType.PRIMARY}
            noMarginRight
            onClick={() => {
              CopyToClipboard({ text: copiedText })
              onClose()
            }}
          >
            Copy
          </StyledButton>
          <StyledButton
            buttonType={ButtonType.PRIMARY}
            onClick={() => {
              onReplaceText(copiedText)
              onClose()
            }}
          >
            Replace
          </StyledButton>
        </StyledCopyLibraryDropdownRightContainer>
      </StyledCopyLibraryDropdownTitleContainer>

      {text && (
        <StyledCopyLibraryDropdownTextContainer isExpanded={isExpanded}>
          <StyledCopyLibraryDropdownText isExpanded={isExpanded}>
            {title}
          </StyledCopyLibraryDropdownText>
          <StyledCopyLibraryDropdownText isExpanded={isExpanded}>
            {combinedText}
          </StyledCopyLibraryDropdownText>
          {isExpanded && (
            <StyledCopyLibraryDropdownText isExpanded={isExpanded}>
              {copyFrom}
            </StyledCopyLibraryDropdownText>
          )}
          <StyledTextInsideButtonContainer>
            <StyledTextInsideButton
              onClick={() => setIsExpanded(!isExpanded)}
              buttonType={ButtonType.TRANSPARENT}
            >
              {isExpanded ? 'Close' : 'Expand'}
            </StyledTextInsideButton>
          </StyledTextInsideButtonContainer>
        </StyledCopyLibraryDropdownTextContainer>
      )}
    </StyledCopyLibraryDropdownContainer>
  )
}

export default CopyLibraryContentComponent
