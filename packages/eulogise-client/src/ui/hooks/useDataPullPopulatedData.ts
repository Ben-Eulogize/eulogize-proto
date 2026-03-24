import { useCaseState } from '../store/hooks'
import { CaseHelper } from '@eulogise/helpers'

export const useDataPullPopulatedData = () => {
  const { activeItem: activeCase } = useCaseState()
  if (!activeCase) {
    return null
  }
  const { deceased, service } = activeCase
  const { fullName: deceasedName, primaryImage } = deceased ?? { fullName: '' }
  const dateOfBirth = CaseHelper.getDateOfBirth(activeCase) || ''
  const dateOfDeath = CaseHelper.getDateOfDeath(activeCase) || ''
  const { location, serviceStartTime } = service ?? {
    timeStart: '',
    location: '',
    serviceStartTime: '',
  }

  const dateOfService = CaseHelper.getDateOfService(activeCase) || ''

  return {
    primaryImage,
    location,
    serviceStartTime,
    deceasedName,
    dateOfDeath,
    dateOfService,
    dateOfBirth,
  }
}
