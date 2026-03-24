import React from 'react'
import styled from 'styled-components'
import { Drawer } from 'antd'
import {
  Button,
  ButtonType,
  ButtonSize,
  Tooltip,
  DownloadProgressBar,
} from '@eulogise/client-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import { CreatePhotobookMethod } from '@eulogise/core'

interface IHowToAddPhotosDrawerProps {
  isOpen: boolean
  hasPhotos: boolean
  hasPhotosInTimeline: boolean
  isCreating: boolean
  onCancel: () => void
  onCreate: (method: CreatePhotobookMethod) => void
  progress: number
}

const StyledHeaderContainer = styled.div`
  width: 100%;
  padding-bottom: 50px;
  position: relative;
`

const StyledHeaderText = styled.div`
  ${STYLE.HEADING_MEDIUM};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`

const StyledCancelButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

const StyledContentParentContainer = styled.div`
  padding-top: 24px;
`

const StyledSection = styled.div<{ $highlighted?: boolean }>`
  background-color: ${COLOR.BEIGE_GREY};
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 2px solid
    ${({ $highlighted }) => ($highlighted ? COLOR.CORE_PURPLE : 'transparent')};
`

const StyledSectionTitle = styled.div`
  ${STYLE.HEADING_SMALL};
  margin-bottom: 1rem;
`

const StyledSectionDescription = styled.div`
  ${STYLE.TEXT_SMALL};
  margin-bottom: 1rem;
  line-height: 1.5;
`

const StyledButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const StyledDivider = styled.div`
  text-align: center;
  margin: 32px 0;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background-color: ${COLOR.DOVE_GREY};
    opacity: 0.3;
  }
`

const StyledDividerText = styled.span`
  background-color: ${COLOR.WHITE};
  padding: 0 16px;
  position: relative;
  ${STYLE.TEXT_MEDIUM};
  color: ${COLOR.DOVE_GREY};
  font-weight: ${STYLE.FONT_WEIGHT_BOLD};
`

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 40px;
  }
`

export const HowToAddPhotosDrawer = ({
  isOpen,
  hasPhotos,
  hasPhotosInTimeline,
  isCreating,
  onCancel,
  onCreate,
  progress,
}: IHowToAddPhotosDrawerProps) => {
  return (
    <StyledDrawer
      placement={'left'}
      open={isOpen}
      closable={false}
      key={`how-to-add-photos-drawer`}
      maskClosable={false}
      width={'900px'}
      onClose={onCancel}
    >
      <StyledHeaderContainer>
        <StyledHeaderText>
          {isCreating
            ? `Building your photobook`
            : `How would you like to add your photos?`}
        </StyledHeaderText>
        {!isCreating && (
          <StyledCancelButtonContainer>
            <Button
              buttonType={ButtonType.TRANSPARENT}
              buttonSize={ButtonSize.SM}
              onClick={onCancel}
              disabled={isCreating}
              noMarginLeft
              noMarginRight
            >
              Cancel
            </Button>
          </StyledCancelButtonContainer>
        )}
      </StyledHeaderContainer>

      <StyledContentParentContainer>
        {isCreating ? (
          <DownloadProgressBar percent={progress} />
        ) : (
          <>
            <StyledSection $highlighted>
              <StyledSectionTitle>
                Start with preloaded photos
              </StyledSectionTitle>
              <StyledSectionDescription>
                Import images to auto populate your Photo Book.
                <br />
                One click and you're ready to start arranging your layouts
              </StyledSectionDescription>
              <StyledButtonRow>
                <Tooltip
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  title={
                    !hasPhotos
                      ? 'Please upload photos first'
                      : 'Import from Photo Library'
                  }
                >
                  <Button
                    buttonType={ButtonType.SECONDARY}
                    buttonSize={ButtonSize.SM}
                    onClick={() =>
                      onCreate(CreatePhotobookMethod.IMPORT_FROM_LIBRARY)
                    }
                    disabled={!hasPhotos}
                    noMarginLeft
                    noMarginRight
                  >
                    Import from Library
                  </Button>
                </Tooltip>
                <Tooltip
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  title={
                    !hasPhotosInTimeline
                      ? 'Please add slides in Video Timeline'
                      : 'Copy from Video Timeline'
                  }
                >
                  <Button
                    buttonType={ButtonType.SECONDARY}
                    buttonSize={ButtonSize.SM}
                    disabled={!hasPhotosInTimeline}
                    onClick={() =>
                      onCreate(CreatePhotobookMethod.COPY_FROM_VIDEO_TIMELINE)
                    }
                    noMarginLeft
                    noMarginRight
                  >
                    Copy Video Timeline
                  </Button>
                </Tooltip>
              </StyledButtonRow>
            </StyledSection>

            <StyledDivider>
              <StyledDividerText>OR</StyledDividerText>
            </StyledDivider>

            <StyledSection>
              <StyledSectionTitle>Start with blank pages</StyledSectionTitle>
              <StyledSectionDescription>
                Start with blank pages and manually add your images and select
                your layouts.
              </StyledSectionDescription>
              <Button
                buttonType={ButtonType.SECONDARY}
                buttonSize={ButtonSize.SM}
                onClick={() => onCreate(CreatePhotobookMethod.START_FROM_BLANK)}
                disabled={isCreating}
                noMarginLeft
                noMarginRight
              >
                Start Blank
              </Button>
            </StyledSection>
          </>
        )}
      </StyledContentParentContainer>
    </StyledDrawer>
  )
}
