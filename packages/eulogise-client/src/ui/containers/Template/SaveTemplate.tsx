import React, { useState } from 'react'
import {
  CardProductPageMode,
  CardProductViewDisplayMode,
  EulogiseProduct,
  ICardProductData,
  ICardProductRow,
  ICardProductState,
  ITheme,
  IThemeCommon,
  ICardProductDynamicDataFieldEvent,
  CardProductDynamicDataKey,
  ICardProductTextRow,
  DEFAULT_DATE_FORMAT,
  ICardProductTextRowData,
  TemplateDesignDetailsFormFields,
  CardProductContentItemType,
  IGenericCardProductTypeData,
  IGenericCardProductData,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import {
  useProductState,
  useCaseState,
  useEulogiseDispatch,
  useThemeState,
} from '../../store/hooks'
import styled from 'styled-components'
import { useIsNotDesktop, STYLE } from '@eulogise/client-core'
import CardProductWithPagination from '../../components/CardProduct/CardProductWithPagination'
import { produce } from 'immer'
import TemplateDesignDetails from './TemplateDesignDetails'
import { ThemeHelper } from '@eulogise/helpers'
import { upsertTheme } from '../../store/ThemeState/actions'

interface ISaveTemplateProps {
  product: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  onSaved: () => void
}

const StyledSaveTemplate = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const StyledDesignDetails = styled.div`
  margin: 0 auto;
`

const StyledTemplate = styled.div``

const StyledTemplateHeading = styled.div`
  font-size: ${STYLE.HEADING_FONT_SIZE_MEDIUM};
  text-align: center;
`

const SaveTemplate: React.FunctionComponent<ISaveTemplateProps> = ({
  product,
  genericProductType,
  onSaved,
}) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region!
  const slug = genericProductType?.slug
  const [fields, setFields] = useState<TemplateDesignDetailsFormFields>({
    name: '',
    categories: [],
    baseFont: '',
    dateFormat: DEFAULT_DATE_FORMAT,
    overwriteThumbnail: false,
  })
  const { activeItem, activeProductTheme } = useProductState({
    product,
    slug,
  }) as ICardProductState
  const { isCreating, isUpdating } = useThemeState()
  const cardProduct = activeItem as ICardProductData
  const genericProductMetadata = (cardProduct as IGenericCardProductData)
    ?.content?.metadata

  const [tempCardProduct, setTempCardProduct] = useState<ICardProductData>({
    ...cardProduct,
    content: {
      ...cardProduct.content,
      pages: ThemeHelper.applyDefaultDataToCardProductPages({
        cardProductPages: cardProduct.content.pages,
        dateFormat: fields.dateFormat,
        product,
      }),
    },
  })

  const isNotDesktop = useIsNotDesktop()
  const [pageCursor, setPageCursor] = useState(0)

  const pageMode: CardProductPageMode = CardProductHelper.getPageModeByPageSize(
    {
      pageSize: cardProduct.content?.pageSize,
      product,
      displayMode: CardProductViewDisplayMode.TEMPLATE,
    },
  )
  const noOfPageCursors: number = CardProductHelper.getTotalPageCursors({
    product,
    totalPages: cardProduct?.content?.pages?.length,
    foldType: genericProductMetadata?.foldType,
    pageMode,
    isMobile: isNotDesktop,
    displayMode: CardProductViewDisplayMode.TEMPLATE,
  })!

  const updateFields = (fields: Partial<IThemeCommon>) => {
    setFields(fields)
    setTempCardProduct({
      ...tempCardProduct,
      content: {
        ...tempCardProduct.content,
        pages: ThemeHelper.applyDefaultDataToCardProductPages({
          cardProductPages: tempCardProduct.content.pages,
          dateFormat: fields.dateFormat,
          product,
        }),
      },
    })
  }

  const onAssignDynamicData = (ev: ICardProductDynamicDataFieldEvent) => {
    const { pageIndex: eventPageIndex, rowId, dynamicDataId } = ev
    const pageIndex = eventPageIndex!
    const productRow = cardProduct.content.pages[pageIndex].rows.find(
      (row: ICardProductRow) => row.id === rowId,
    )
    const updatedCardProduct = produce(
      tempCardProduct,
      (draft: ICardProductData) => {
        const cardProductRow = draft.content.pages[pageIndex].rows.find(
          (r: ICardProductRow) => r.id === rowId,
        ) as ICardProductTextRow

        if (cardProductRow) {
          // on clear the field
          if (!dynamicDataId) {
            if (cardProductRow.type === CardProductContentItemType.TEXT) {
              cardProductRow.data.content.blocks = (
                productRow?.data as ICardProductTextRowData
              ).content.blocks
            }
          }

          cardProductRow.dynamicDataId =
            dynamicDataId as CardProductDynamicDataKey
        }
      },
    )
    const newCardProductData: ICardProductData = {
      ...tempCardProduct,
      content: {
        ...tempCardProduct.content,
        pages: ThemeHelper.applyDefaultDataToCardProductPages({
          cardProductPages: updatedCardProduct.content.pages,
          dateFormat: fields.dateFormat,
          product,
        }),
      },
    }
    setTempCardProduct(newCardProductData)
  }

  const onSave = () => {
    const themeProductKey =
      ThemeHelper.getEulogiseProductThemeMapValueByProduct({
        product,
        region: region!,
      })
    const pages = tempCardProduct.content.pages
    const newCardProductPages =
      ThemeHelper.convertCardProductDynamicContentToTemplate(pages)
    const newTheme: ITheme = {
      ...fields,
      // @ts-ignore
      products: {
        // @ts-ignore
        [themeProductKey]: {
          ...activeProductTheme,
          defaultContent: newCardProductPages,
        },
      },
    }
    dispatch(
      upsertTheme({
        theme: newTheme,
        product,
        cardProduct,
        overwriteThumbnail: fields.overwriteThumbnail,
        onCompleted: onSaved,
      }),
    )
  }

  const isVerticalMode =
    product === EulogiseProduct.TV_WELCOME_SCREEN ||
    product === EulogiseProduct.THANK_YOU_CARD

  return (
    <StyledSaveTemplate
      style={{
        flexDirection: isVerticalMode ? 'column' : 'row',
      }}
    >
      <StyledTemplate style={{ flex: 3 }}>
        <StyledTemplateHeading>Select Dynamic Assets</StyledTemplateHeading>
        <CardProductWithPagination
          pageCursor={pageCursor}
          genericProductType={genericProductType}
          onPageChange={(pCursor: number) => {
            if (pCursor > noOfPageCursors! - 1) {
              setPageCursor(noOfPageCursors! - 1)
            } else {
              setPageCursor(pCursor)
            }
          }}
          cardProduct={tempCardProduct}
          baseScaleRatio={isVerticalMode ? 0.5 : undefined}
          displayMode={CardProductViewDisplayMode.TEMPLATE}
          product={product}
          isEnabledScrolling={false}
          // below functions are not being used
          isShowBorderSettingModal={false}
          setIsShowBorderSettingModal={() => null}
          isShowRemoveCardProductPagesModal={false}
          setIsShowRemoveCardProductPagesModal={() => null}
          isShowImageLibrary={false}
          onIsShowImageLibrary={() => null}
          currentPageIndex={0}
          selectedFrameContentItemId={''}
          updatingImageDetails={undefined}
          onUpdatingImageDetails={() => null}
          onSelectedFrameContentItemId={() => null}
          setFocusedRowId={() => null}
          onChangeImageClick={() => null}
          dispatchAddRow={() => null}
          focusedRowId={''}
          bookletMagnifierSliderValue={0}
          onBookletMagnifierSliderChange={() => null}
          onAssignDynamicData={onAssignDynamicData}
        />
      </StyledTemplate>
      <StyledDesignDetails style={{ flex: 1 }}>
        <TemplateDesignDetails
          title="Design Details"
          region={region}
          isUpdating={isUpdating}
          isCreating={isCreating}
          onSaveClick={() => onSave()}
          fields={fields}
          onFieldsChange={(f) => {
            updateFields(f)
          }}
        />
      </StyledDesignDetails>
    </StyledSaveTemplate>
  )
}

export default SaveTemplate
