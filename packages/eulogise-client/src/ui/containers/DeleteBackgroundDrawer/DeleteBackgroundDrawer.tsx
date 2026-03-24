import React from 'react'
import { Button, ButtonType, Drawer, Title } from '@eulogise/client-components'
import { openDrawerAction } from '../../store/DrawerState/actions'
import { DrawerId, EditBackgroundImageDrawerOptions } from '@eulogise/core'
import styled from 'styled-components'
import {
  useDrawerState,
  useEulogiseDispatch,
  useIsOpenDrawer,
} from '../../store/hooks'
import { STYLE } from '@eulogise/client-core'
import { deleteBackgroundImageByIdAction } from '../../store/BackgroundImageState/actions'

const StyledDeleteBackgroundDrawer = styled(Drawer)`
  .ant-drawer-header,
  .ant-drawer-content {
    background-color: rgb(243, 245, 247);
  }
  .ant-drawer-body {
    padding: 0 3rem;
  }
  .ant-card {
    background-color: transparent;
  }
`

const StyledTitle = styled(Title)`
  text-align: left;
`

const StyledDeleteBackgroundDrawerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 3rem;
  justify-content: center;
`

const StyledDeleteBackgroundDrawerContainerContent = styled.div`
  max-width: 100%;
  width: 30rem;
  ${STYLE.TEXT_MEDIUM}
`

const ButtonsContainer = styled.div`
  text-align: left;
  margin-top: 2rem;
`

export const DeleteBackgroundDrawer = () => {
  const dispatch = useEulogiseDispatch()
  const drawerState = useDrawerState()
  const drawerOptions =
    drawerState.drawerOptions as EditBackgroundImageDrawerOptions
  const backgroundImage = drawerOptions?.backgroundImage

  const isOpenDrawer: boolean = useIsOpenDrawer(
    DrawerId.DELETE_BACKGROUND_DRAWER,
  )
  const close = () => {
    dispatch(openDrawerAction(DrawerId.CHANGE_BACKGROUND_IMAGE_DRAWER))
  }
  return (
    <StyledDeleteBackgroundDrawer
      width="80%"
      title={<Title>Delete Background</Title>}
      closeIcon={
        <Button
          key="close"
          buttonType={ButtonType.TRANSPARENT}
          noMarginRight
          onClick={() => {
            close()
          }}
        >
          Cancel
        </Button>
      }
      isOpen={isOpenDrawer}
      onClose={() => {
        close()
      }}
    >
      <StyledDeleteBackgroundDrawerContainer>
        <StyledDeleteBackgroundDrawerContainerContent>
          <StyledTitle>
            Are you sure you want to delete the <b>"{backgroundImage?.name}"</b>{' '}
            background?
          </StyledTitle>
          <ButtonsContainer>
            <Button
              buttonType={ButtonType.DANGER}
              onClick={() => {
                dispatch(
                  deleteBackgroundImageByIdAction({
                    backgroundImageId: backgroundImage?.id!,
                  }),
                )
                close()
              }}
            >
              Delete
            </Button>
            <Button buttonType={ButtonType.TRANSPARENT} onClick={close}>
              Cancel
            </Button>
          </ButtonsContainer>
        </StyledDeleteBackgroundDrawerContainerContent>
      </StyledDeleteBackgroundDrawerContainer>
    </StyledDeleteBackgroundDrawer>
  )
}
