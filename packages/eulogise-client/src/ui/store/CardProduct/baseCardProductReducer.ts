import { EulogiseResourceHelper } from '../../helpers/EulogiseResourceHelper'
import { UndoHelper, UtilHelper } from '@eulogise/helpers'
import { CardProductHelper } from '@eulogise/helpers'
import {
  CardProductActionTypes,
  CardProductBorderPageType,
  CardProductPageColMode,
  CardProductPageOrientation,
  CaseResourcesSearchResponse,
  ConnectionActionTypes,
  EulogiseProduct,
  EulogiseRegion,
  GenericCardProductTypeFoldType,
  ICardProductAction,
  ICardProductActionPayload,
  ICardProductContent,
  ICardProductData,
  ICardProductPage,
  ICardProductRow,
  ICardProductState,
  IGenericCardProductContent,
  IGenericCardProductData,
  IGenericCardProductMetadata,
  IImageAssetContent,
  ResourceFileStatus,
} from '@eulogise/core'
import {
  UpdateCardProductDividerAssetByRowIdPayload,
  UpdateSelectedDimensionAction,
} from './actions'

export const baseCardProductInitialState: ICardProductState = {
  items: [],
  undoContentList: [],
  redoContentList: [],
  activeItem: null,
  activeProductTheme: undefined,
  isFetching: false,
  fontsLoading: false,
  leftPageIndex: -1,
  rightPageIndex: 0,
  leftPageContent: [],
  rightPageContent: [],
  currentPageIndex: 0,
  displayedModal: false,
  error: null,
  dirty: false,
  isUpdating: false,
}

export const BaseCardProductReducer =
  (product: EulogiseProduct | string) =>
  (
    state: ICardProductState = baseCardProductInitialState,
    action: ICardProductAction,
  ): ICardProductState => {
    // CAUTION: These actions are for ALL PRODUCT (no productType required in the payload)
    // Please refer to the switch statement below for product specific actions
    switch (action.type) {
      case CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID: {
        return {
          ...state,
          isFetching: !state.activeItem, // do not set isFetching to true again if activeItem already exists
        }
      }
      // CAUTION: These actions are for ALL PRODUCT (no productType required in the payload)
      // Please refer to the switch statement below for product specific actions
      case CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID_SUCCESS: {
        const resources: CaseResourcesSearchResponse =
          action.payload?.resources!
        const items: Array<ICardProductData> =
          resources[CardProductHelper.getResourceByProduct(product)]

        if (!items) {
          return {
            ...state,
            isFetching: false,
          }
        }

        const activeItem: ICardProductData =
          EulogiseResourceHelper.getLatestItem(items)

        return {
          ...state,
          items,
          activeItem,
          isFetching: false,
        }
      }
      case CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID_FAILED: {
        return {
          ...state,
          isFetching: false,
        }
      }
    }

    const productType = action.payload?.productType ?? action.payload?.product
    const region: EulogiseRegion = action.payload?.region ?? EulogiseRegion.AU
    if (product !== productType) {
      return state
    }
    // product specific actions
    switch (action.type) {
      case ConnectionActionTypes.PRODUCT_DATA_UPDATED: {
        const activeItem: ICardProductData = UtilHelper.mergeDeepRight(
          state.activeItem,
          action.payload?.productData,
        ) as ICardProductData

        return {
          ...state,
          activeItem,
        }
      }
      case CardProductActionTypes.UPDATE_BORDER_SETTINGS: {
        const newActiveItem: ICardProductData = UtilHelper.clone({
          ...state.activeItem,
        }) as ICardProductData
        const borderSettings = action.payload?.borderSettings!
        for (const [
          singleBorderSettingsType,
          singleBorderSettings,
        ] of Object.entries(borderSettings)) {
          if (
            singleBorderSettingsType === CardProductBorderPageType.FRONT_PAGE
          ) {
            let pageContent = newActiveItem.content
            if (
              CardProductHelper.getPageColModeByPageSize(
                pageContent.pageSize,
              ) === CardProductPageColMode.TWO_COLS
            ) {
              newActiveItem.content.pages[0].border = singleBorderSettings
              newActiveItem.content.pages[1].border = singleBorderSettings
            } else {
              newActiveItem.content.pages[0].border = singleBorderSettings
            }
          } else if (
            singleBorderSettingsType === CardProductBorderPageType.MIDDLE_PAGES
          ) {
            for (let i = 1; i < newActiveItem.content.pages.length - 1; i++) {
              newActiveItem.content.pages[i].border = singleBorderSettings
            }
          } else if (
            singleBorderSettingsType === CardProductBorderPageType.BACK_PAGE
          ) {
            newActiveItem.content.pages[
              newActiveItem.content.pages.length - 1
            ].border = singleBorderSettings
          }
        }
        return {
          ...state,
          activeItem: UtilHelper.clone(newActiveItem),
        }
      }
      case CardProductActionTypes.RESET_CARD_PRODUCT_STATE: {
        return baseCardProductInitialState
      }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_PAGES: {
        const { pages } = action.payload as ICardProductActionPayload
        return {
          ...state,
          activeItem: {
            ...state.activeItem,
            content: {
              ...state.activeItem?.content,
              pages: pages ?? state.activeItem?.content?.pages ?? [],
            } as ICardProductContent,
          } as ICardProductData,
        }
      }
      case CardProductActionTypes.SET_ACTIVE_PRODUCT_THEME: {
        const activeProductTheme = action.payload?.activeProductTheme
        return {
          ...state,
          activeProductTheme,
        }
      }
      case CardProductActionTypes.CLEAN_UP_CARD_PRODUCT_UNDO_HISTORY: {
        return {
          ...state,
          undoContentList: [],
          redoContentList: [],
        }
      }
      case CardProductActionTypes.UNDO_CARD_PRODUCT_CONTENT: {
        if (!state.undoContentList || state.undoContentList?.length === 0) {
          return state
        }
        const [undoContent, ...newUndoContentList] = state.undoContentList
        const existingContent = state.activeItem?.content

        return {
          ...state,
          activeItem: {
            ...state.activeItem,
            content: JSON.parse(JSON.stringify(undoContent)),
          } as ICardProductData,
          undoContentList: newUndoContentList,
          redoContentList: UndoHelper.createUndoContentListWithNewItem(
            state.redoContentList,
            existingContent!,
          ),
        }
      }
      case CardProductActionTypes.REDO_CARD_PRODUCT_CONTENT: {
        if (!state.redoContentList || state.redoContentList?.length === 0) {
          return state
        }
        const [redoContent, ...newRedoContentList] = state.redoContentList
        const existingContent = state.activeItem?.content
        return {
          ...state,
          activeItem: {
            ...state.activeItem,
            content: JSON.parse(JSON.stringify(redoContent)),
          } as ICardProductData,
          undoContentList: UndoHelper.createUndoContentListWithNewItem(
            state.undoContentList,
            existingContent!,
          ),
          redoContentList: newRedoContentList,
        }
      }
      case CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID_SUCCESS: {
        const items: Array<ICardProductData> = action.payload?.products!
        // const slug = action.payload?.slug
        const activeProductTheme = action.payload?.activeProductTheme
        const activeItem: ICardProductData =
          EulogiseResourceHelper.getLatestItem(items)

        return {
          ...state,
          items,
          activeItem,
          activeProductTheme,
          isFetching: false,
        }
      }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_SPACE_ASSET_BY_ROW_ID: {
        // @ts-ignore
        const { pageIndex, rowId, asset } = action.payload
        return CardProductHelper.getUpdateBookletRowState({
          // @ts-ignore
          cardProductState: UndoHelper.recordUndoContentList(state),
          pageIndex,
          rowId,
          rowData: {
            divider: {
              asset,
            },
          },
        })
      }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_DIVIDER_ASSET_BY_ROW_ID: {
        // @ts-ignore
        const { pageIndex, rowId, divider, color } =
          action.payload as unknown as UpdateCardProductDividerAssetByRowIdPayload
        return CardProductHelper.getUpdateBookletRowState({
          // @ts-ignore
          cardProductState: UndoHelper.recordUndoContentList(state),
          pageIndex,
          rowId,
          rowData: {
            divider: {
              asset: {
                id: divider,
              },
              color,
            },
          },
        })
      }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_ICON_ASSET_BY_ROW_ID: {
        // @ts-ignore
        const { pageIndex, rowId, icon, color } = action.payload
        return CardProductHelper.getUpdateBookletRowState({
          // @ts-ignore
          cardProductState: UndoHelper.recordUndoContentList(state),
          pageIndex,
          rowId,
          rowData: {
            icon: {
              icon,
              color,
            },
          },
        })
      }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_OVERLAY: {
        const { activeItem } = state
        return UtilHelper.mergeDeepRight(state, {
          activeItem: {
            ...state.activeItem,
            content: {
              ...activeItem?.content,
              pageOverlay: action.payload?.overlay,
            },
          },
        })
      }
      case CardProductActionTypes.ENABLE_CARD_PRODUCT_OVERLAY: {
        const pageIndexes = action.payload?.pageIndexes!
        const { activeItem } = state
        return UtilHelper.mergeDeepRight(state, {
          activeItem: {
            ...state.activeItem,
            content: {
              ...activeItem?.content,
              pages: activeItem?.content?.pages.map((page, index) => {
                if (pageIndexes.includes(index)) {
                  return {
                    ...page,
                    background: {
                      ...page.background,
                      overlayEnabled: true,
                    },
                  }
                }
                return page
              }),
            },
          },
        })
      }
      case CardProductActionTypes.TOGGLE_CARD_PRODUCT_OVERLAY: {
        const pageIndex = action.payload?.pageIndex!
        const { activeItem } = state
        return UtilHelper.mergeDeepRight(state, {
          activeItem: {
            ...state.activeItem,
            content: {
              ...activeItem?.content,
              pages: activeItem?.content?.pages.map((page, index) => {
                if (index === pageIndex) {
                  return {
                    ...page,
                    background: {
                      ...page.background,
                      overlayEnabled: !page.background?.overlayEnabled,
                    },
                  }
                }
                return page
              }),
            },
          },
        })
      }
      case CardProductActionTypes.ADD_CARD_PRODUCT_PAGE_ROW_SUCCESS: {
        // @ts-ignore
        const { pageIndex, row } = action.payload
        // @ts-ignore
        return CardProductHelper.getAddCardProductRowState(
          // @ts-ignore
          UndoHelper.recordUndoContentList(state),
          pageIndex,
          row,
        )
      }
      case CardProductActionTypes.ADD_CARD_PRODUCT_PAGES: {
        // @ts-ignore
        const { cardProductTheme } = action.payload
        const {
          // @ts-ignore
          activeItem: { content },
        } = state
        const { theme } = content
        let foldType: GenericCardProductTypeFoldType
        if ((content as IGenericCardProductContent)?.metadata) {
          foldType = content?.metadata?.foldType
        }
        return CardProductHelper.getAddCardProductPagesState({
          // @ts-ignore
          cardProductState: UndoHelper.recordUndoContentList(state),
          themeId: theme!,
          productTheme: cardProductTheme,
          product: productType,
          foldType: foldType!,
          region,
        })
      }
      case CardProductActionTypes.REMOVE_CARD_PRODUCT_PAGES: {
        const removePages = action.payload?.removePages!
        return CardProductHelper.getRemoveCardProductPagesState(
          // @ts-ignore
          UndoHelper.recordUndoContentList(state),
          removePages,
        )
      }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_IMAGE: {
        // @ts-ignore
        const { pageIndex, rowId, columnIndex, image, frameContentItemId } =
          action.payload

        if (frameContentItemId !== undefined) {
          return CardProductHelper.getUpdateBookletRowState({
            // @ts-ignore
            cardProductState: UndoHelper.recordUndoContentList(state),
            frameContentItemId,
            pageIndex,
            rowId,
            rowData: image,
          })
        }
        // multiple columns
        else if (columnIndex !== undefined) {
          // updating an image in a column
          const row: ICardProductRow = CardProductHelper.getCardProductRow(
            state.activeItem!,
            pageIndex,
            rowId,
          )
          // @ts-ignore
          const items = row.data?.items
          if (!items) {
            throw new Error('column items not found')
          }
          return CardProductHelper.getUpdateBookletRowState({
            // @ts-ignore
            cardProductState: UndoHelper.recordUndoContentList(state),
            pageIndex,
            rowId,
            rowData: {
              items: [
                ...items.slice(0, columnIndex),
                { data: image },
                ...items.slice(columnIndex + 1),
              ],
            },
          })
        }
        // update single image
        return CardProductHelper.getUpdateBookletRowState({
          // @ts-ignore
          cardProductState: UndoHelper.recordUndoContentList(state),
          pageIndex,
          rowId,
          rowData: image,
        })
      }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_IMAGES: {
        // @ts-ignore
        const { pageIndex, rowId, images } = action.payload
        return CardProductHelper.getUpdateBookletRowState({
          // @ts-ignore
          cardProductState: UndoHelper.recordUndoContentList(state),
          pageIndex,
          rowId,
          rowData: {
            items: images.map((img: IImageAssetContent) => ({
              data: img,
            })),
          },
        })
      }
      case CardProductActionTypes.GENERATE_CARD_PRODUCT: {
        return UtilHelper.mergeDeepRight(state, {
          activeItem: {
            ...state.activeItem,
            fileStatus: ResourceFileStatus.PROCESSING,
          },
        })
      }
      case CardProductActionTypes.GENERATE_CARD_PRODUCT_SUCCESS: {
        return state
        /*
        return UtilHelper.mergeDeepRight(state, {
          activeItem: {
            ...state.activeItem,
            fileStatus: ResourceFileStatus.GENERATED,
          },
        })
*/
      }
      case CardProductActionTypes.GENERATE_CARD_PRODUCT_FAILED: {
        return UtilHelper.mergeDeepRight(state, {
          activeItem: {
            ...state.activeItem,
            fileStatus: ResourceFileStatus.FAILED,
          },
        })
      }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT_SUCCESS_COMPLETE: {
        const isAddToUndoList = action.payload?.isAddToUndoList
        return UtilHelper.mergeDeepRight(
          {
            ...(isAddToUndoList
              ? UndoHelper.recordUndoContentList(
                  // @ts-ignore
                  state.notAddedTmpState ?? state,
                )
              : state),
            isUpdating: false,
          },
          {
            activeItem: {
              content: {
                pages: action.payload?.pages,
              },
            },
            notAddedTmpState: isAddToUndoList
              ? null
              : // @ts-ignore
                state.notAddedTmpState ?? state,
          },
        )
      }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_PAGE_SIZE: {
        return UtilHelper.mergeDeepRight(
          // @ts-ignore
          UndoHelper.recordUndoContentList(state),
          {
            activeItem: {
              content: {
                pageSize: action.payload?.pageSize,
              },
            },
          },
        )
      }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_PAGE_MARGIN: {
        return UtilHelper.mergeDeepRight(
          // @ts-ignore
          UndoHelper.recordUndoContentList(state),
          {
            activeItem: {
              content: {
                pageMargins: action.payload?.pageMargin,
              },
            },
          },
        )
      }
      case CardProductActionTypes.CARD_PRODUCT_CONTENT_LOAD_SUCCESS:
        return {
          ...state,
          isFetching: false,
        }
      case CardProductActionTypes.CARD_PRODUCT_CONTENT_LOAD_FAIL:
        return {
          ...state,
          isFetching: false,
          error: action.error,
        }
      case CardProductActionTypes.SAVE_CARD_PRODUCT: {
        return {
          ...state,
          isUpdating: true,
        }
      }
      case CardProductActionTypes.SAVE_CARD_PRODUCT_FAIL:
        return {
          ...state,
          isUpdating: false,
          error: action.error,
        }
      case CardProductActionTypes.SAVE_CARD_PRODUCT_SUCCESS: {
        const {
          product: productData,
          cardProductTheme,
          isUpdateActiveItemOnSuccess,
        } = action.payload as ICardProductActionPayload
        return {
          ...state,
          isFetching: false,
          isUpdating: false,
          /* do not update "activeItem" (especially when changing image).
             because there is delayed when the result return from the server
             this will overwrite the state that user is working on
             refer to https://trello.com/c/mReTVy47/1488-images-jump-resize-in-frame

             The only time that we should update the activeItem is when
             user change theme
             refer to https://trello.com/c/21hm0dsk/1514-booklet-editor-applying-theme-booklet-editor-is-not-updated-after-theme-applied
           */
          activeItem: isUpdateActiveItemOnSuccess
            ? productData
            : state.activeItem,
          activeProductTheme: cardProductTheme ?? state.activeProductTheme,
        }
      }
      case CardProductActionTypes.CREATE_CARD_PRODUCT_BY_CASE_ID:
        return {
          ...state,
        }
      case CardProductActionTypes.CREATE_CARD_PRODUCT_BY_CASE_ID_SUCCESS: {
        // @ts-ignore
        const { product: productData, cardProductTheme } = action.payload
        return {
          ...state,
          isFetching: false,
          activeItem: productData,
          activeProductTheme: cardProductTheme,
        }
      }
      case CardProductActionTypes.CREATE_CARD_PRODUCT_BY_CASE_ID_FAILED:
        return {
          ...state,
        }
      case CardProductActionTypes.UPDATE_CARD_PRODUCT_PAGE_BY_INDEX: {
        const pageIndex = action.payload?.pageIndex
        const page = action.payload?.page as ICardProductPage
        const activeItemContent = state.activeItem?.content
        return {
          ...state,
          activeItem: {
            ...state.activeItem,
            content: {
              ...activeItemContent,
              pages: activeItemContent?.pages.map((p, index) => {
                if (index === pageIndex) {
                  return page
                }
                return p
              }) as Array<ICardProductPage>,
            } as ICardProductContent,
          } as ICardProductData,
        }
      }
      case CardProductActionTypes.UPDATE_SELECTED_DIMENSION: {
        const typedAction = action as UpdateSelectedDimensionAction
        const selectedDimension = typedAction.payload?.selectedDimension
        const productType = typedAction.payload?.product
        if (!selectedDimension || !state.activeItem || !productType) {
          return state
        }
        const activeItemContent = state.activeItem
          ?.content as IGenericCardProductContent
        const productTheme = state.activeProductTheme
        const currentMetadata = activeItemContent?.metadata

        // Get current page content dimensions (before the change)
        const {
          width: currentPageContentWidth,
          height: currentPageContentHeight,
        } = CardProductHelper.getPageContentWidthAndHeight({
          product: productType,
          pageSize: activeItemContent?.pageSize,
          genericProductMetadata: currentMetadata,
          pageOrientation:
            activeItemContent?.pageOrientation ??
            CardProductPageOrientation.PORTRAIT,
          region: EulogiseRegion.USA,
        })

        // Create updated metadata with the new selectedDimension
        const updatedMetadata: IGenericCardProductMetadata = {
          ...currentMetadata,
          selectedDimension,
        }

        // Get new page content dimensions based on the new selected dimension
        const {
          width: targetPageContentWidth,
          height: targetPageContentHeight,
        } = CardProductHelper.getPageContentWidthAndHeight({
          product: productType,
          pageSize: activeItemContent?.pageSize,
          genericProductMetadata: updatedMetadata,
          pageOrientation:
            activeItemContent?.pageOrientation ??
            CardProductPageOrientation.PORTRAIT,
          region: EulogiseRegion.USA,
        })

        // Calculate scale factor: target height / current height
        const scaleFactor =
          currentPageContentHeight > 0
            ? targetPageContentHeight / currentPageContentHeight
            : 1

        // Refine pages to resize items proportionally to fit the new dimensions
        const refinedPages = productTheme
          ? CardProductHelper.refinePages({
              pages: activeItemContent?.pages ?? [],
              productTheme,
              pageContentWidth: targetPageContentWidth,
              pageContentHeight: targetPageContentHeight,
              product: productType,
              scaleFactor,
              originalPageWidth: currentPageContentWidth,
            })
          : activeItemContent?.pages ?? []

        return {
          ...state,
          activeItem: {
            ...state.activeItem,
            content: {
              ...activeItemContent,
              metadata: updatedMetadata,
              pages: refinedPages,
            },
          } as ICardProductData,
        }
      }
      default:
        return state ?? baseCardProductInitialState
    }
  }
