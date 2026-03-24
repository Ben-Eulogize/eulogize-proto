import React, { useState } from 'react'
import styled from 'styled-components'
import { Card } from 'antd'
import {
  COLOR,
  STYLE,
  SCREEN_SIZE,
  useDetectClickOutside,
} from '@eulogise/client-core'
import SelectAnActionDropdown from './SelectAnActionDropdown'
import ServiceCardDisabledText from './ServiceCardDisabledText'
import {
  EulogiseProduct,
  IAuthState,
  GUIDE_SHOW_UP_PAGE,
  IGuideWalkThroughState,
  IGenericCardProductTypeData,
} from '@eulogise/core'
import {
  useAuthState,
  useProductState,
  useCaseState,
  useGuideWalkThroughState,
  useThemeState,
} from '../../../store/hooks'
import CardProductDropdownMenu from './CardProductServiceCard/CardProductDropdownMenu'
import { AccountHelper, CardProductHelper } from '@eulogise/helpers'
import { GuidePopover } from '../../../components/GuidePopover/GuidePopover'

interface IServiceCardProps {
  id: string
  icon: any
  product: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  isShowComingSoon?: boolean
  isUpgradeRequired?: boolean
}

const ServiceCardContainer = styled.div`
  margin: 16px;
  width: 100%;
  cursor: pointer;
  ${SCREEN_SIZE.TABLET} {
    width: 20rem;
  }
`

const StyledServiceCard = styled(Card)`
  border-radius: ${STYLE.BORDER_RADIUS};
  border: 1px solid ${COLOR.GREY};
  > * {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  height: 100%;
  .ant-card-body {
    padding: ${STYLE.GUTTER};
  }
  ${({ disabled }: { disabled: boolean }) =>
    disabled
      ? `
        &::before {
          content: ' ';
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #fff;
          opacity: 0.4;
          z-index: 1;
        }
        button:hover {
          color: currentColor;
          cursor: default;
        }
      `
      : `
      &:hover {
        border-color: ${COLOR.HOVER_BORDER_COLOR};
      }
  `}
`

const ServiceCardIconContainer = styled.div`
  text-align: center;
  margin-bottom: ${STYLE.GUTTER};
  padding: 1rem;
`

const ServiceCardIcon = styled.img`
  max-width: 11.25rem;
  max-height: 6.4rem;
`

const ServiceCardContent = styled.div`
  text-align: left;
  border-bottom: 1px solid ${COLOR.GREY};
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  flex: 1;
`

const ServiceCardTitle = styled.div`
  ${STYLE.HEADING_MEDIUM}
  margin-bottom: .5rem;
`

const ServiceCardSubTitle = styled.div<{
  $isVisible: boolean
  $textColor?: string
}>`
  ${STYLE.TEXT_MEDIUM}
  text-transform: capitalize;
  ${({ $isVisible, $textColor }) =>
    `
      ${$isVisible ? `opacity: 0;` : ''}
      ${$textColor ? `color: ${$textColor};` : `color: ${COLOR.BLACK};`}
  `}
`

const ServiceCardActionsContainer = styled.div`
  margin-top: 0.5rem;
`

const ComingSoonHeaderText = styled.div.attrs({
  className: 'coming-soon-header-text',
  children: 'Coming Soon',
})`
  color: ${COLOR.PRIMARY};
  ${STYLE.TEXT_MEDIUM}
  position: absolute;
  right: 1rem;
  top: 1rem;
`

const ProHeaderText = styled.div.attrs({
  className: 'pro-header-text',
  children: 'PRO',
})`
  color: ${COLOR.PRIMARY};
  ${STYLE.TEXT_MEDIUM}
  position: absolute;
  right: 1rem;
  top: 1rem;
`

const ServiceCard = ({
  id,
  icon,
  product,
  genericProductType,
  isShowComingSoon,
  isUpgradeRequired,
}: IServiceCardProps) => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const ref = useDetectClickOutside({
    onTriggered: () => setTimeout(() => setIsShowMenu(false), 500),
  })
  const { account }: IAuthState = useAuthState()
  const { activeItem, isFetching: isFetchingProduct } = useProductState({
    product,
    slug: genericProductType?.slug,
  })
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region
  const { themes, isFetching: isFetchingTheme } = useThemeState()
  const title: string = CardProductHelper.getProductName({
    product,
    genericProductType,
    region,
  })
  const hasProAccess: boolean = AccountHelper.hasProAccess(account!)
  const theme: string = activeItem?.content?.theme!
  const foundTheme = themes.find((t) => t.id === theme)
  const isFetching = isFetchingProduct || isFetchingTheme
  const isPhotobook = product === EulogiseProduct.PHOTOBOOK
  const subTitle = theme
    ? foundTheme?.name
    : !isPhotobook
    ? 'Select a theme to start'
    : ''

  const actionText = isFetching
    ? 'Loading...'
    : theme
    ? `Continue`
    : 'Start Creating'
  const disabled: boolean = ((isUpgradeRequired && !hasProAccess) ||
    isShowComingSoon)!

  const guideWalkThroughContext: IGuideWalkThroughState =
    useGuideWalkThroughState()
  const { guideShowAt, currentStep } = guideWalkThroughContext

  const isGuideWalkThroughHighlighted: boolean =
    guideShowAt === GUIDE_SHOW_UP_PAGE.DASHBOARD && currentStep === 3

  return (
    <ServiceCardContainer ref={ref}>
      <StyledServiceCard
        disabled={disabled}
        id={id}
        onClick={() => {
          if (isShowMenu === true) {
            setTimeout(() => setIsShowMenu(false), 500)
          } else {
            setIsShowMenu(true)
          }
        }}
      >
        <ServiceCardIconContainer>
          {isShowComingSoon && <ComingSoonHeaderText />}
          {isUpgradeRequired && !hasProAccess && <ProHeaderText />}
          <ServiceCardIcon src={icon} />
        </ServiceCardIconContainer>
        <ServiceCardContent>
          <ServiceCardTitle>{title}</ServiceCardTitle>
          <ServiceCardSubTitle
            $isVisible={disabled}
            $textColor={subTitle ? undefined : 'transparent;'}
          >
            {subTitle ?? 'No Title'}
          </ServiceCardSubTitle>
        </ServiceCardContent>
        <ServiceCardActionsContainer>
          {disabled ? (
            <ServiceCardDisabledText>
              {isUpgradeRequired && !hasProAccess
                ? 'Available With Pro'
                : 'Coming Soon'}
            </ServiceCardDisabledText>
          ) : (
            <SelectAnActionDropdown
              menu={CardProductDropdownMenu({
                product,
                genericProductType,
                isFetching,
                onTriggered: () => setIsShowMenu(false),
              })}
              text={actionText}
              isVisible={isShowMenu}
              isHighlighted={isGuideWalkThroughHighlighted}
            />
          )}
          {product === EulogiseProduct.BOOKLET && (
            <GuidePopover
              placedPage={GUIDE_SHOW_UP_PAGE.DASHBOARD}
              showUpStepIndex={3}
              width={430}
            />
          )}
        </ServiceCardActionsContainer>
      </StyledServiceCard>
    </ServiceCardContainer>
  )
}

export default ServiceCard
