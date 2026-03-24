import React, { useEffect } from 'react'
import styled from 'styled-components'
import ThemeSelectionList from '../ThemeSelectionList'
import {
  EulogiseProduct,
  ICaseState,
  IGenericCardProductTypeData,
  THEME_CATEGORIES,
} from '@eulogise/core'
import { ITheme } from '@eulogise/core'
import {
  useCaseState,
  useClientState,
  useEulogiseDispatch,
  useThemeState,
} from '../../../store/hooks'
import { LoadingMessage } from '../../../components/LoadingMessage/LoadingMessage'
import { fetchThemesAction } from '../../../store/ThemeState/actions'
import { fetchAudioAssetsByCaseId } from '../../../store/AssetState/actions'

interface ISelectThemeViewProps {
  onApply: (product: EulogiseProduct, theme: ITheme) => void
  onDelete?: (product: EulogiseProduct, theme: ITheme) => void
  genericProductType?: IGenericCardProductTypeData
}

const StyledSelectThemeView = styled.div`
  padding-top: 1rem;
`

const LoadingMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const SelectThemeView = ({
  onApply,
  onDelete,
  genericProductType,
}: ISelectThemeViewProps) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const { isFetching, themes } = useThemeState()
  const { activeItem: activeClient } = useClientState()
  useEffect(() => {
    dispatch(fetchThemesAction())
  }, [])
  useEffect(() => {
    if (!activeCase) {
      return
    }
    dispatch(fetchAudioAssetsByCaseId(activeCase.id))
  }, [activeCase])

  if (isFetching && themes.length === 0) {
    return (
      <LoadingMessageContainer>
        <LoadingMessage />
      </LoadingMessageContainer>
    )
  }
  return (
    <StyledSelectThemeView>
      <ThemeSelectionList
        isClientTheme
        genericProductType={genericProductType}
        category={{
          id: 'client-theme',
          name: `${activeClient?.title ?? 'Your'} Themes`,
        }}
        onApply={onApply}
        isDeletable
        onDelete={onDelete}
      />
      {THEME_CATEGORIES.map((category) => (
        <ThemeSelectionList
          key={category.id}
          genericProductType={genericProductType}
          category={category}
          onApply={onApply}
          isDeletable={false}
        />
      ))}
    </StyledSelectThemeView>
  )
}

export default SelectThemeView
