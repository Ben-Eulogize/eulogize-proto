import {
  assetModel,
  bookletModel,
  bookmarkModel,
  caseModel,
  clientModel,
  inviteModel,
  invoiceModel,
  sidedCardModel,
  slideshowModel,
  thankyouCardModel,
  tvWelcomeScreenModel,
  userModel,
} from '../../database'
import { Parser } from '@json2csv/plainjs'
import { DateTimeHelper, SlideshowHelper } from '@eulogise/helpers'
import { IClientModel } from '../../database/types/ClientModel.types'
import { IUserModel } from '../../database/types/UserModel.types'
import {
  EulogiseCountry,
  GetImageObject,
  ICardProductContent,
  ISlideshowData,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'
import { IInvoiceModel } from '../../database/types/InvoiceModel.types'
import { IMemorialProductModel } from '../../database/types/MemorialProductModel.types'
import { ICaseModel } from '../../database/types/CaseModel.types'
import { IAssetModel } from '../../database/types/AssetModel.types'

type DownloadReportByCase = {
  caseId: string
  country?: EulogiseCountry
  didCaseGenerate: boolean
  customerFullName: string
  customerEmail: string
  deceasedFullName?: string
  caseCreated: string
  caseCreatedTime?: string
  paymentDate?: string
  paymentDateTime?: string
  serviceDate?: string
  serviceDateTime?: string
  funeralBusinessName?: string
  arrangerName?: string
  noOfPhotosUploaded: number
  noOfInvitesSent: number
  slideshowStatus: string
  slideshowTheme: string
  slideshowBackground: string
  slideshowLength: number
  titleSlideFront?: boolean
  titleSlideEnd?: boolean
  noOfImagesInSlideshow: number
  noOfTracksUploaded: number
  noOfTracksUsed: number
  bookletStatus: MemorialVisualStatus
  bookletTheme: string
  bookletBackground: string
  bookletNoOfPages: number
  sidedCardStatus: MemorialVisualStatus
  sidedCardTheme: string
  sidedCardBackground: string
  thankYouCardStatus: MemorialVisualStatus
  thankYouCardTheme: string
  thankYouCardBackground: string
  bookmarkStatus: MemorialVisualStatus
  bookmarkTheme: string
  bookmarkBackground: string
  tvWelcomeScreenStatus: MemorialVisualStatus
  tvWelcomeScreenTheme: string
  tvWelcomeScreenBackground: string
}

// Pre-aggregated counts by caseId for O(1) lookup
type AssetCountsByCase = Map<string, { photos: number; tracks: number }>
type InviteCountsByCase = Map<string, number>

// Index maps for O(1) lookups instead of O(n) .find() calls
interface DataIndexMaps {
  slideshowsByCase: Map<string, IMemorialProductModel.Schema>
  bookletsByCase: Map<string, IMemorialProductModel.Schema>
  sidedCardsByCase: Map<string, IMemorialProductModel.Schema>
  thankyouCardsByCase: Map<string, IMemorialProductModel.Schema>
  bookmarksByCase: Map<string, IMemorialProductModel.Schema>
  tvWelcomeScreensByCase: Map<string, IMemorialProductModel.Schema>
  usersById: Map<string, IUserModel.Schema>
  clientsById: Map<string, IClientModel.Schema>
  invoicesByCase: Map<string, IInvoiceModel.Schema>
  assetCountsByCase: AssetCountsByCase
  inviteCountsByCase: InviteCountsByCase
}

const getCardProductImageFromContent = (
  content: ICardProductContent,
): string => {
  return (
    (content?.pages?.[0]?.background?.image as GetImageObject)?.filepath ?? ''
  )
}

/**
 * Build Map indexes from arrays for O(1) lookups
 */
function buildDataIndexMaps(
  slideshows: IMemorialProductModel.Schema[],
  booklets: IMemorialProductModel.Schema[],
  sidedCards: IMemorialProductModel.Schema[],
  thankyouCards: IMemorialProductModel.Schema[],
  bookmarks: IMemorialProductModel.Schema[],
  tvWelcomeScreens: IMemorialProductModel.Schema[],
  users: IUserModel.Schema[],
  clients: IClientModel.Schema[],
  invoices: IInvoiceModel.Schema[],
  assets: IAssetModel.Schema[],
  inviteCounts: InviteCountsByCase,
): DataIndexMaps {
  // Build product maps by caseId
  const slideshowsByCase = new Map<string, IMemorialProductModel.Schema>()
  for (const s of slideshows) {
    if (s.case) slideshowsByCase.set(s.case, s)
  }

  const bookletsByCase = new Map<string, IMemorialProductModel.Schema>()
  for (const b of booklets) {
    if (b.case) bookletsByCase.set(b.case, b)
  }

  const sidedCardsByCase = new Map<string, IMemorialProductModel.Schema>()
  for (const s of sidedCards) {
    if (s.case) sidedCardsByCase.set(s.case, s)
  }

  const thankyouCardsByCase = new Map<string, IMemorialProductModel.Schema>()
  for (const t of thankyouCards) {
    if (t.case) thankyouCardsByCase.set(t.case, t)
  }

  const bookmarksByCase = new Map<string, IMemorialProductModel.Schema>()
  for (const b of bookmarks) {
    if (b.case) bookmarksByCase.set(b.case, b)
  }

  const tvWelcomeScreensByCase = new Map<string, IMemorialProductModel.Schema>()
  for (const t of tvWelcomeScreens) {
    if (t.case) tvWelcomeScreensByCase.set(t.case, t)
  }

  // Build user and client maps by id
  const usersById = new Map<string, IUserModel.Schema>()
  for (const u of users) {
    if (u.id) usersById.set(u.id, u)
  }

  const clientsById = new Map<string, IClientModel.Schema>()
  for (const c of clients) {
    if (c.id) clientsById.set(c.id, c)
  }

  // Build invoice map by caseId
  const invoicesByCase = new Map<string, IInvoiceModel.Schema>()
  for (const i of invoices) {
    if (i.case) invoicesByCase.set(i.case, i)
  }

  // Pre-aggregate asset counts by caseId (single pass through assets)
  const assetCountsByCase: AssetCountsByCase = new Map()
  for (const asset of assets) {
    if (!asset.case) continue
    const existing = assetCountsByCase.get(asset.case) || {
      photos: 0,
      tracks: 0,
    }
    if (asset.type === 'image') {
      existing.photos++
    } else if (asset.type === 'audio') {
      existing.tracks++
    }
    assetCountsByCase.set(asset.case, existing)
  }

  return {
    slideshowsByCase,
    bookletsByCase,
    sidedCardsByCase,
    thankyouCardsByCase,
    bookmarksByCase,
    tvWelcomeScreensByCase,
    usersById,
    clientsById,
    invoicesByCase,
    assetCountsByCase,
    inviteCountsByCase: inviteCounts,
  }
}

/**
 * Pre-aggregate invite counts by caseId (single pass)
 */
function buildInviteCountsByCase(
  invites: Array<{ case?: string }>,
): InviteCountsByCase {
  const counts: InviteCountsByCase = new Map()
  for (const invite of invites) {
    if (!invite.case) continue
    counts.set(invite.case, (counts.get(invite.case) || 0) + 1)
  }
  return counts
}

export class ReportController {
  // Fields
  // --------
  // Case ID
  // Country
  // Did Case Generate (Yes/No)
  // User Name
  // User Email
  // Deceased Name
  // Case Created Date
  // Case Created Time
  // Payment Date
  // Service Date
  // Funeral Business Name
  // Arranger Name
  // # Photos Uploaded
  // # Invites Sent
  // Video Status
  // Video Theme
  // Video Background
  // Video Length
  // Title slide front (yes/no)
  // Title slide end (yes/no)
  // Number of images in slideshow (Value)
  // Number of Track's used
  // # Tracks Uploaded
  // Booklet Status
  // Booklet Theme
  // Booklet Background
  // Booklet No of pages
  // Service Card Status
  // Service Card Theme
  // Service Card Background
  // ThankYou Status
  // ThankYou Theme
  // ThankYou Background
  // Bookmark Status
  // Bookmark Theme
  // Bookmark Background
  // TV Screen Status
  // TV Screen Theme
  // TV Screen Background

  /**
   * Generate report data for a single case using pre-built index maps
   * All lookups are O(1) instead of O(n)
   */
  public getOverviewReportByCaseReportOptimized(
    caseData: ICaseModel.Schema,
    indexMaps: DataIndexMaps,
  ): DownloadReportByCase | undefined {
    const caseId = caseData.id!
    const {
      country,
      customer: customerId,
      deceased,
      createdAt: caseCreated,
      client: clientId,
      funeralDirector: funeralDirectorId,
    } = caseData

    // O(1) Map lookups instead of O(n) .find() calls
    const slideshow = indexMaps.slideshowsByCase.get(caseId)
    const booklet = indexMaps.bookletsByCase.get(caseId)
    const sidedCard = indexMaps.sidedCardsByCase.get(caseId)
    const thankYouCard = indexMaps.thankyouCardsByCase.get(caseId)
    const bookmark = indexMaps.bookmarksByCase.get(caseId)
    const tvWelcomeScreen = indexMaps.tvWelcomeScreensByCase.get(caseId)

    // O(1) user lookup
    const funeralDirector = funeralDirectorId
      ? indexMaps.usersById.get(String(funeralDirectorId)) ?? null
      : null

    // O(1) client lookup
    const client = clientId ? indexMaps.clientsById.get(clientId) ?? null : null

    // O(1) pre-aggregated counts lookup (instead of O(n) reduce per case)
    const assetCounts = indexMaps.assetCountsByCase.get(caseId) || {
      photos: 0,
      tracks: 0,
    }
    const noOfPhotosUploaded = assetCounts.photos
    const noOfTracksUploaded = assetCounts.tracks
    const noOfInvitesSent = indexMaps.inviteCountsByCase.get(caseId) || 0

    // O(1) user lookup for customer
    const user = indexMaps.usersById.get(String(customerId))
    if (!user) {
      console.error(`User not found ${customerId}`)
      return
    }

    const { fullName, email } = user
    const serviceDate = caseData.service?.timeStart

    // O(1) invoice lookup
    const invoice = indexMaps.invoicesByCase.get(caseId)
    const deceasedFullName = deceased?.fullName
    const paymentDate = invoice?.createdAt

    const bookletContent = booklet?.content as ICardProductContent
    const sidedCardContent = sidedCard?.content
    const thankYouCardContent = thankYouCard?.content
    const bookmarkContent = bookmark?.content
    const tvWelcomeScreenContent = tvWelcomeScreen?.content

    const didCaseGenerate: boolean =
      booklet?.fileStatus === ResourceFileStatus.GENERATED ||
      slideshow?.fileStatus === ResourceFileStatus.GENERATED ||
      sidedCard?.fileStatus === ResourceFileStatus.GENERATED ||
      thankYouCard?.fileStatus === ResourceFileStatus.GENERATED ||
      bookmark?.fileStatus === ResourceFileStatus.GENERATED ||
      tvWelcomeScreen?.fileStatus === ResourceFileStatus.GENERATED

    return {
      caseId,
      country,
      didCaseGenerate,
      customerFullName: fullName,
      customerEmail: email,
      deceasedFullName,
      caseCreated: DateTimeHelper.formatDate(caseCreated),
      caseCreatedTime: caseCreated
        ? DateTimeHelper.formatTimeByDate(caseCreated as unknown as string)
        : undefined,
      paymentDate: paymentDate
        ? DateTimeHelper.formatDate(paymentDate)
        : undefined,
      paymentDateTime: paymentDate
        ? DateTimeHelper.formatTimeByDate(paymentDate as unknown as string)
        : undefined,
      serviceDate: serviceDate
        ? DateTimeHelper.formatDate(serviceDate)
        : undefined,
      serviceDateTime: serviceDate
        ? DateTimeHelper.formatTimeByDate(serviceDate as unknown as string)
        : undefined,
      funeralBusinessName: client?.title,
      arrangerName: funeralDirector?.fullName,
      noOfPhotosUploaded,
      noOfInvitesSent,
      slideshowStatus: slideshow?.status as MemorialVisualStatus,
      slideshowTheme: slideshow?.content?.theme,
      slideshowBackground: slideshow?.content?.slideshowBackground?.image?.url,
      slideshowLength: slideshow?.content?.duration,
      titleSlideFront: SlideshowHelper.hasStartTitleSlide(
        slideshow as ISlideshowData,
      ),
      titleSlideEnd: SlideshowHelper.hasEndTitleSlide(
        slideshow as ISlideshowData,
      ),
      noOfImagesInSlideshow: slideshow
        ? SlideshowHelper.getImageSlides(
            (slideshow as ISlideshowData).content.slides,
          ).length
        : 0,
      noOfTracksUploaded,
      noOfTracksUsed: SlideshowHelper.getAudioUrls(slideshow as ISlideshowData)
        .length,
      bookletStatus: booklet?.status as MemorialVisualStatus,
      bookletTheme: bookletContent?.theme,
      bookletBackground: getCardProductImageFromContent(bookletContent),
      bookletNoOfPages: bookletContent?.pages?.length ?? 0,
      sidedCardStatus: sidedCard?.status as MemorialVisualStatus,
      sidedCardTheme: sidedCardContent?.theme,
      sidedCardBackground: sidedCardContent?.background?.image?.url,
      thankYouCardStatus: thankYouCard?.status as MemorialVisualStatus,
      thankYouCardTheme: thankYouCardContent?.theme,
      thankYouCardBackground: thankYouCardContent?.background?.image?.url,
      bookmarkStatus: bookmark?.status as MemorialVisualStatus,
      bookmarkTheme: bookmarkContent?.theme,
      bookmarkBackground: bookmarkContent?.background?.image?.url,
      tvWelcomeScreenStatus: tvWelcomeScreen?.status as MemorialVisualStatus,
      tvWelcomeScreenTheme: tvWelcomeScreenContent?.theme,
      tvWelcomeScreenBackground: tvWelcomeScreenContent?.background?.image?.url,
    }
  }

  public async getOverviewReport(): Promise<Array<DownloadReportByCase>> {
    console.log('Starting parallel data fetch...')
    const fetchStartTime = Date.now()

    // Fetch all data in parallel instead of sequentially (major performance improvement)
    const [
      cases,
      slideshows,
      booklets,
      sidedCards,
      thankyouCards,
      bookmarks,
      tvWelcomeScreens,
      users,
      clients,
      assets,
      invites,
      invoices,
    ] = await Promise.all([
      caseModel.getAll({ cache: true }),
      slideshowModel.getAll({ cache: true }),
      bookletModel.getAll({ cache: true }),
      sidedCardModel.getAll({ cache: true }),
      thankyouCardModel.getAll({ cache: true }),
      bookmarkModel.getAll({ cache: true }),
      tvWelcomeScreenModel.getAll({ cache: true }),
      userModel.getAll({ cache: true }),
      clientModel.getAll({ cache: true }),
      assetModel.getAll({ cache: true }), // Added cache for assets
      inviteModel.getAll({ cache: true }),
      invoiceModel.getAll({ cache: true }),
    ])

    console.log(
      `Data fetch completed in ${Date.now() - fetchStartTime}ms. Cases: ${
        cases.length
      }, Users: ${users.length}, Assets: ${assets.length}`,
    )

    // Build index maps once (single pass through each array)
    // This converts O(n) .find() lookups to O(1) Map.get() lookups
    console.log('Building index maps...')
    const indexStartTime = Date.now()

    const inviteCountsByCase = buildInviteCountsByCase(invites)
    const indexMaps = buildDataIndexMaps(
      slideshows,
      booklets,
      sidedCards,
      thankyouCards,
      bookmarks,
      tvWelcomeScreens,
      users,
      clients,
      invoices,
      assets,
      inviteCountsByCase,
    )

    console.log(`Index maps built in ${Date.now() - indexStartTime}ms`)

    // Process all cases synchronously - no need for Bluebird concurrency
    // since all lookups are now O(1) Map operations
    console.log('Processing cases...')
    const processStartTime = Date.now()

    const report: Array<DownloadReportByCase | undefined> = []
    for (const caseData of cases) {
      try {
        const reportRow = this.getOverviewReportByCaseReportOptimized(
          caseData,
          indexMaps,
        )
        report.push(reportRow)
      } catch (ex) {
        console.log(`Error processing case ${caseData.id}:`, ex)
      }
    }

    console.log(
      `Case processing completed in ${Date.now() - processStartTime}ms`,
    )
    console.log(
      `Total report generation time: ${Date.now() - fetchStartTime}ms`,
    )

    return report.filter(Boolean) as Array<DownloadReportByCase>
  }

  public async exportOverviewReportToCsv(): Promise<string> {
    try {
      const data = await this.getOverviewReport()
      if (data.length === 0) {
        return ''
      }
      const parser = new Parser()
      return parser.parse(data)
    } catch (ex) {
      console.error(ex)
      throw new Error(ex)
    }
  }
}
