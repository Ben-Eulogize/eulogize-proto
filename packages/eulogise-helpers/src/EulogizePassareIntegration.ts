import { EulogizeIntegrationCase, IImageAssetContent } from '@eulogise/core'
import { PassareClient } from './PassareClient'
import { EulogizeBaseIntegration } from './EulogizeBaseIntegration'

export class EulogizePassareIntegration extends EulogizeBaseIntegration {
  public static async fetchCaseInfoByCaseId(
    passareCaseId: string,
  ): Promise<EulogizeIntegrationCase> {
    const passareCases = await PassareClient.getCaseById(passareCaseId)
    const passareCase = passareCases?.[0]
    const acquaintancesResp = await PassareClient.getCaseAcquaintancesByCaseId(
      passareCaseId,
    )
    const services = await PassareClient.getCaseServicesByCaseId(passareCaseId)

    const acquaintance = acquaintancesResp.acquaintances?.[0]
    const contactInformationResp = acquaintance?.contact_information_uuid
      ? await PassareClient.getContactInformationById(
          acquaintance?.contact_information_uuid,
        )
      : undefined
    const decedentPerson = passareCase?.decedent_person
    const deceasedPersonDetails = decedentPerson?.person
    const passareCaseEventFull = services?.[0]?.events?.[0]
    const locationAddress = passareCaseEventFull?.location_address

    const deceasedFullName = [
      deceasedPersonDetails?.first_name,
      deceasedPersonDetails?.last_name,
    ]
      .filter(Boolean)
      .join(' ')
    return {
      externalCaseId: passareCaseId,
      user: {
        email: contactInformationResp?.email,
        fullName: acquaintance?.display_name ?? `${deceasedFullName} Family`,
      },
      deceased: {
        gender: decedentPerson?.person?.gender,
        fullName: deceasedFullName,
        dateOfDeath: decedentPerson?.death
          ? new Date(passareCase?.decedent_person?.death).getTime()
          : undefined,
        dateOfBirth: deceasedPersonDetails?.birth_date
          ? new Date(deceasedPersonDetails?.birth_date).getTime()
          : undefined,
        primaryImage: {
          url: decedentPerson?.obituary?.primary_photo!,
        } as IImageAssetContent,
      },
      service: {
        location: [
          locationAddress?.address1,
          locationAddress?.address2,
          locationAddress?.city,
          locationAddress?.state,
        ]
          .filter(Boolean)
          .join(', '),
        timeStart: passareCaseEventFull?.date
          ? new Date(passareCaseEventFull?.date).getTime()
          : undefined,
        serviceStartTime: passareCaseEventFull?.start_time,
      },
    }
  }
}
