import React from 'react'
import styled from 'styled-components'
import GooglePhotoIcon from '../../assets/icons/google-photos.png'
import FacebookIcon from '../../assets/icons/facebook.png'
import InstagramIcon from '../../assets/icons/instagram.png'
import GoogleDriveIcon from '../../assets/icons/google-drive.png'
import UploadPhotoSupportIconListItem from './UploadPhotoSupportIconList/UploadPhotoSupportIconListItem'
import {
  MobileIcon,
  MyComputerIcon,
  ButtonSize,
  HeaderTextMD,
} from '@eulogise/client-components'
import UploadImageButton from '../Button/UploadImageButton'
import Logo from '../Logo/Logo'
import { COLOR, DEVICES, useBreakpoint } from '@eulogise/client-core'
import { useUserRole } from '../../store/hooks'
import { EulogiseUserRole } from '@eulogise/core'

const StyledContributorDashboardPageContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`

const UploadPhotoSupportIconList = styled.div`
  display: flex;
  margin: 1.4rem auto;
  flex-direction: row;
  flex-wrap: wrap;
`

const imageSize = 30

const StyledUploadImage = styled.img`
  height: ${imageSize}px;
  width: ${imageSize}px;
`

const UploadPhotoSupportIconListContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledUploadImageButton = styled(UploadImageButton).attrs({
  buttonSize: ButtonSize.LG,
})`
  margin: 2rem auto 3rem;
  display: block;
  width: 300px;
  max-width: none;
  padding: 1rem 0;
  height: auto;
`

const StyledLogo = styled(Logo)`
  margin-top: 1rem;
`

const StyledMyComputerIcon = styled(MyComputerIcon)`
  font-size: ${imageSize}px;
  color: ${COLOR.PRIMARY};
`

const StyledMobileIcon = styled(MobileIcon)`
  font-size: ${imageSize}px;
  color: ${COLOR.PRIMARY};
`

const HeaderHighlightDescription = styled(HeaderTextMD)`
  margin-bottom: 2rem;
  padding: 2rem 0;
  background-color: ${COLOR.CORE_PURPLE_10};
  width: 100%;
  text-align: center;
  display: block;
`

const HeaderDescription = styled(HeaderTextMD)`
  margin-bottom: 1rem;
  text-align: center;
`

const TopSection = styled.div`
  flex: 1;
`

const ScreenTooSmallPageContent = () => {
  const screenSize = useBreakpoint()
  const userRole = useUserRole()
  return (
    <StyledContributorDashboardPageContent>
      <TopSection>
        <StyledUploadImageButton />
        {userRole !== EulogiseUserRole.CONTRIBUTOR && (
          <HeaderHighlightDescription>
            In order to edit your memorials please log in using a larger screen
            size.
          </HeaderHighlightDescription>
        )}
        <HeaderDescription>
          Easily add your photos from almost anywhere.
        </HeaderDescription>
        <UploadPhotoSupportIconListContainer>
          <UploadPhotoSupportIconList>
            {screenSize === DEVICES.DESKTOP || screenSize === DEVICES.TABLET ? (
              <UploadPhotoSupportIconListItem
                icon={<StyledMyComputerIcon />}
                text="My Computer"
              />
            ) : null}
            {screenSize === DEVICES.MOBILE ? (
              <UploadPhotoSupportIconListItem
                icon={<StyledMobileIcon />}
                text="This Device"
              />
            ) : null}
            <UploadPhotoSupportIconListItem
              icon={<StyledUploadImage src={GooglePhotoIcon} />}
              text="Google Photos"
            />
            <UploadPhotoSupportIconListItem
              icon={<StyledUploadImage src={FacebookIcon} />}
              text="Facebook"
            />
            <UploadPhotoSupportIconListItem
              icon={<StyledUploadImage src={InstagramIcon} />}
              text="Instagram"
            />
            <UploadPhotoSupportIconListItem
              icon={<StyledUploadImage src={GoogleDriveIcon} />}
              text="Google Drive"
            />
          </UploadPhotoSupportIconList>
        </UploadPhotoSupportIconListContainer>
      </TopSection>

      <StyledLogo />
    </StyledContributorDashboardPageContent>
  )
}

export default ScreenTooSmallPageContent
