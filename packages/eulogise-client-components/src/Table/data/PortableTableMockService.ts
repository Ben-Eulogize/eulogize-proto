import moment from 'moment'
import { faker } from '@faker-js/faker'
import {
  EulogiseCountry,
  IPortalCaseResponseItem,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'
import { IPortalTableItem, PortableTableHelper } from '../PortalTable'
import { UtilHelper } from '@eulogise/helpers'

export class PortableTableMockService {
  public static createFakeCaseResponseItem(): IPortalCaseResponseItem {
    let caseId: string = faker.string.uuid() || ''
    // @ts-ignore
    caseId = caseId.toString().match(/[0-9a-zA-Z]+$/)[0]
    // Fake dates
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 30)
    const getMockDate = (): Date =>
      faker.datatype.datetime({
        min: startDate.getTime(),
        max: endDate.getTime(),
      })

    // Fake names
    const deceasedFirstName = faker.person.firstName()
    const deceasedLastName = faker.person.lastName()
    const familyMemberFirstName = faker.person.firstName()
    const familyMemberLastName = faker.person.lastName()
    const funeralDirectorFirstName = faker.person.firstName()
    const funeralDirectorLastName = faker.person.lastName()
    const slideshowStatus = faker.helpers.arrayElement(
      Object.values(MemorialVisualStatus),
    )
    const photobookStatus = faker.helpers.arrayElement(
      Object.values(MemorialVisualStatus),
    )
    const bookletStatus = faker.helpers.arrayElement(
      Object.values(MemorialVisualStatus),
    )
    const bookmarkStatus = faker.helpers.arrayElement(
      Object.values(MemorialVisualStatus),
    )
    const sidedCardStatus = faker.helpers.arrayElement(
      Object.values(MemorialVisualStatus),
    )
    const thankyouCardStatus = faker.helpers.arrayElement(
      Object.values(MemorialVisualStatus),
    )
    const timeStartDate = getMockDate()
    const timeStart = timeStartDate.getTime()
    const timeStartDisplay = moment(timeStartDate).format('YYYY-MM-DD')
    return {
      service: {
        timeEnd: getMockDate().getTime(),
        timeStart: timeStart,
        timeStartDisplay,
      },
      updatedAt: getMockDate().toISOString(),
      status: faker.helpers.arrayElement(['paid', 'unpaid']),
      createdAt: getMockDate().toISOString(),
      deceased: {
        fullName: `${deceasedFirstName} ${deceasedLastName}`,
      },
      customer: faker.string.uuid(),
      editors: [],
      id: faker.string.uuid(),
      customerName: `${familyMemberFirstName} ${familyMemberLastName}`,
      customerEmail: faker.internet.email(),
      funeralDirector: faker.string.uuid(),
      funeralDirectorName: `${funeralDirectorFirstName} ${funeralDirectorLastName}`,
      booklet: {
        ids: ['1bf2c546-e444-47bc-89ce-edcbba6358dd'],
        activeId: '1bf2c546-e444-47bc-89ce-edcbba6358dd',
        status: bookletStatus,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        hasGeneratedBefore: true,
      },
      bookmark: {
        ids: [],
        activeId: null,
        status: bookmarkStatus,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        hasGeneratedBefore: false,
      },
      sidedCard: {
        ids: [],
        activeId: null,
        status: sidedCardStatus,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        hasGeneratedBefore: false,
      },
      slideshow: {
        ids: ['3d9a0584-e899-4470-911e-71c22581c6ef'],
        activeId: '3d9a0584-e899-4470-911e-71c22581c6ef',
        status: slideshowStatus,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        hasGeneratedBefore: true,
      },
      thankyouCard: {
        ids: [],
        activeId: null,
        status: thankyouCardStatus,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        hasGeneratedBefore: false,
      },
      tvWelcomeScreen: {
        ids: [],
        activeId: null,
        status: thankyouCardStatus,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        hasGeneratedBefore: false,
      },
      photobook: {
        ids: [],
        activeId: null,
        status: photobookStatus,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        hasGeneratedBefore: false,
      },
      country: EulogiseCountry.AUSTRALIA,
    }
  }
  public static createFakeTableItem(): IPortalTableItem {
    return PortableTableHelper.transformCaseToPortableItem(
      PortableTableMockService.createFakeCaseResponseItem(),
    )
  }
  public static createFakeTableItems(
    noOfItems: number,
  ): Array<IPortalTableItem> {
    return UtilHelper.times(this.createFakeTableItem, noOfItems)
  }
}
