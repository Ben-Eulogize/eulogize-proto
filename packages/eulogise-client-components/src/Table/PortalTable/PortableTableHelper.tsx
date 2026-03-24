import {
  EulogisePage,
  EulogiseProduct,
  ICase,
  IPortalCaseResponseItem,
  MemorialVisualStatus,
  ModalId,
  ResourceFileStatus,
} from '@eulogise/core'
import { IPortalTableCellClickEvent, IPortalTableItem } from './PortalTable'
import {
  CardProductHelper,
  CaseHelper,
  NavigationHelper,
  UtilHelper,
} from '@eulogise/helpers'

const DEFAULT_PRODUCT_DATA = {
  activeId: null,
  status: MemorialVisualStatus.NOT_STARTED,
  id: null,
  fileStatus: ResourceFileStatus.NOT_STARTED,
  hasGeneratedBefore: false,
}

export class PortableTableHelper {
  public static transformCaseToPortableItem(
    icase: IPortalCaseResponseItem,
  ): IPortalTableItem {
    const { first: deceasedFirstName, last: deceasedLastName } =
      UtilHelper.parseFullName(icase.deceased?.fullName)
    const { first: funeralDirectorFirstName, last: funeralDirectorLastName } =
      UtilHelper.parseFullName(icase.funeralDirectorName)
    const { first: familyMemberFirstName, last: familyMemberLastName } =
      UtilHelper.parseFullName(icase.customerName)
    const iSlideshow = icase.slideshow ?? DEFAULT_PRODUCT_DATA
    const iPhotobook = icase.photobook ?? DEFAULT_PRODUCT_DATA
    const iBooklet = icase.booklet ?? DEFAULT_PRODUCT_DATA
    const iBookmark = icase.bookmark ?? DEFAULT_PRODUCT_DATA
    const iSidedCard = icase.sidedCard ?? DEFAULT_PRODUCT_DATA
    const iThankyouCard = icase.thankyouCard ?? DEFAULT_PRODUCT_DATA
    const isRetainOnCleanup = !!icase.retainOnCleanup
    return {
      key: icase.id,
      serviceDate: CaseHelper.getDateOfServiceDisplayInTime(
        icase as unknown as ICase,
      )!,
      caseId: icase.id,
      createdAt: icase.createdAt,
      clientName: icase.clientName,
      deceasedFirstName,
      deceasedLastName,
      deceasedFullName: icase.deceased?.fullName,
      customerEmail: icase.customerEmail,
      familyMemberFirstName,
      familyMemberLastName,
      familyMemberFullName: icase.customerName,
      funeralDirector: icase.funeralDirector,
      funeralDirectorFirstName,
      funeralDirectorLastName,
      funeralDirectorFullName: icase.funeralDirectorName,
      slideshowId: iSlideshow.activeId!,
      slideshowStatus: iSlideshow.status,
      slideshowFileStatus: iSlideshow.fileStatus,
      slideshowHasGeneratedBefore: iSlideshow.hasGeneratedBefore,
      photobookId: iPhotobook?.activeId!,
      photobookStatus: iPhotobook?.status!,
      photobookFileStatus: iPhotobook?.fileStatus!,
      photobookHasGeneratedBefore: iPhotobook?.hasGeneratedBefore!,
      bookletId: iBooklet.activeId!,
      bookletStatus: iBooklet.status,
      bookletFileStatus: iBooklet.fileStatus,
      bookletHasGeneratedBefore: iBooklet?.hasGeneratedBefore,
      bookmarkId: iBookmark.activeId!,
      bookmarkStatus: iBookmark.status,
      bookmarkFileStatus: iBookmark.fileStatus,
      bookmarkHasGeneratedBefore: iBookmark?.hasGeneratedBefore,
      sidedCardId: iSidedCard.activeId!,
      sidedCardStatus: iSidedCard.status,
      sidedCardFileStatus: iSidedCard.fileStatus,
      sidedCardHasGeneratedBefore: iSidedCard?.hasGeneratedBefore,
      thankyouCardId: iThankyouCard.activeId!,
      thankyouCardStatus: iThankyouCard.status,
      thankyouCardFileStatus: iThankyouCard.fileStatus,
      thankyouCardHasGeneratedBefore: iThankyouCard?.hasGeneratedBefore,
      country: icase.country,
      isRetainOnCleanup,
    }
  }

  public static transformCaseToPortableItems(
    cases: Array<IPortalCaseResponseItem>,
  ) {
    return cases.map((c) => this.transformCaseToPortableItem(c))
  }

  public static onCellClick(
    ev: IPortalTableCellClickEvent,
    {
      dispatch,
      setActiveCaseByCaseId,
      showModalAction,
      onSelectedCaseId,
      openThemeDrawer,
    }: {
      dispatch: any
      setActiveCaseByCaseId: any
      showModalAction: any
      openThemeDrawer: any
      onSelectedCaseId: (caseId: string) => void
    },
  ) {
    if (ev.columnKey === 'slideshowStatus') {
      dispatch(
        setActiveCaseByCaseId({
          caseId: ev.record.caseId,
          success: () => {
            if (
              ev.record.slideshowStatus === MemorialVisualStatus.COMPLETE ||
              ev.record.slideshowStatus === MemorialVisualStatus.DOWNLOAD
            ) {
              return dispatch(
                showModalAction(ModalId.SLIDESHOW_PREVIEW, {
                  showDownloadButton: true,
                }),
              )
            } else if (ev.record.slideshowId) {
              return NavigationHelper.navigate(EulogisePage.EDIT_SLIDESHOW, {
                slideshowId: ev.record.slideshowId,
              })
            } else {
              return dispatch(openThemeDrawer(EulogiseProduct.SLIDESHOW, true))
            }
          },
        }),
      )
    } else if (ev.columnKey === 'bookletStatus') {
      dispatch(
        setActiveCaseByCaseId({
          caseId: ev.record.caseId,
          success: () => {
            const product = EulogiseProduct.BOOKLET
            if (
              ev.record.bookletStatus === MemorialVisualStatus.COMPLETE ||
              ev.record.bookletStatus === MemorialVisualStatus.DOWNLOAD
            ) {
              return dispatch(
                showModalAction(
                  CardProductHelper.getPreviewModalIdByProduct(product)!,
                  {
                    product,
                    showDownloadButton: true,
                    showKeepEditingButton: true,
                  },
                ),
              )
            } else if (ev.record.bookletId) {
              return NavigationHelper.navigate(EulogisePage.EDIT_BOOKLET, {
                bookletId: ev.record.bookletId,
              })
            } else {
              return dispatch(openThemeDrawer(product, true))
            }
          },
        }),
      )
    } else if (ev.columnKey === 'settings') {
      onSelectedCaseId(ev.record.caseId)
    } else if (ev.columnKey === 'deceasedName') {
      dispatch(
        setActiveCaseByCaseId({
          caseId: ev.record.caseId,
          success: () => {
            NavigationHelper.navigate(EulogisePage.DASHBOARD)
          },
        }),
      )
    }
  }
}
