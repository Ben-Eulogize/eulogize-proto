import {
  EXTERNAL_API_NAME_ARRAY,
  EXTERNAL_API,
  EXTERNAL_API_PATH_MAP,
  EXTERNAL_API_ROUTE_PATH_MAPPING,
} from '../functions/handler/v2/routes/utils/type'
import { match as urlMatch } from 'path-to-regexp'

export const ExternalAPIConfig = {
  FLAMINGO: {
    CLIENT_NAME: 'Flamingo',
    USER_ACCESS_VALIDATE_ENDPOINT_DEV:
      'https://dev.flamingolife.com.au/api/eulogise/validate-access/',
    USER_ACCESS_VALIDATE_ENDPOINT_SDM:
      'https://sdm.flamingolife.com.au/api/eulogise/validate-access',
    USER_ACCESS_VALIDATE_API_KEY: '3aaea3c9-d48b-4da4-b5c5-e4b8a291fc08',
  },
}

export const ExternalV2APIKeyConfigs = {
  staging: [
    {
      partner: 'staging-eulogize-admin',
      apiKey: '3c9d2d29-4753-457e-9480-40e09f987f84',
      enabledAPIs: EXTERNAL_API_NAME_ARRAY,
    },
    {
      partner: 'staging-eulogize-admin-only-create-case',
      apiKey: 'ea3b2d17-ca93-44fe-b311-26d724bd49f8',
      enabledAPIs: [EXTERNAL_API.CREATE_CASE, EXTERNAL_API.UPDATE_CASE],
    },
  ],
  production: [
    {
      partner: 'production-eulogize-admin',
      apiKey: '27b08297-6d03-4e0d-a2fa-6f34528e41bd',
      enabledAPIs: EXTERNAL_API_NAME_ARRAY,
    },
    {
      partner: 'unknown-production-partner-1',
      apiKey: '1c1a94a6-deb6-40b0-8876-1a6e1dc6ad69',
      enabledAPIs: EXTERNAL_API_NAME_ARRAY,
    },
    {
      partner: 'unknown-production-partner-2',
      apiKey: 'fd829073-6a56-43d3-82a1-c26aa8e3d984',
      enabledAPIs: [EXTERNAL_API.CREATE_CASE, EXTERNAL_API.UPDATE_CASE],
    },
    // Osiris, applied on 21 Jan 2025
    {
      partner: 'Osiris',
      apiKey: 'e5591112-431d-4f0c-a8cf-b6bbda5e7a70',
      enabledAPIs: [
        EXTERNAL_API.CREATE_CASE,
        EXTERNAL_API.CREATE_CASE_DEPRECATING,
        EXTERNAL_API.UPDATE_CASE,
      ],
    },
    // Leaf Cremations, applied on 4 Mar 2025
    {
      partner: 'Leaf Cremations',
      apiKey: '5a7e3041-b8d3-468e-9c58-a5b037d39997',
      enabledAPIs: [
        EXTERNAL_API.CREATE_CASE,
        EXTERNAL_API.CREATE_CASE_DEPRECATING,
        EXTERNAL_API.UPDATE_CASE,
      ],
    },
  ],
}

export const getExternalV2APIKeySets = ({ stage }: { stage: string }) => {
  if (stage === 'production-us') {
    return ExternalV2APIKeyConfigs.production
  }
  return ExternalV2APIKeyConfigs.staging
}

export const getExternalV2APIKeys = ({ stage }: { stage: string }) => {
  return getExternalV2APIKeySets({ stage }).map((keySet) => keySet.apiKey)
}

export const getExternalV2APIPartnerNameByAPIKey = ({
  stage,
  apiKey,
}: {
  stage: string | undefined
  apiKey: string | undefined
}) => {
  if (!apiKey || !stage) {
    return undefined
  }
  return getExternalV2APIKeySets({ stage }).find(
    (keySet) => apiKey === keySet.apiKey,
  )?.partner
}

export const getExternalV2APIEnabledAPIsByAPIKey = ({
  stage,
  apiKey,
}: {
  stage: string | undefined
  apiKey: string | undefined
}): string[] => {
  if (!apiKey || !stage) {
    return []
  }
  return (
    getExternalV2APIKeySets({ stage }).find(
      (keySet) => apiKey === keySet.apiKey,
    )?.enabledAPIs ?? []
  )
}

export const isAPIKeyValid = ({
  stage,
  apiKey,
}: {
  stage: string | undefined
  apiKey: string | undefined
}) => {
  if (!apiKey || !stage) {
    return false
  }
  const keys = getExternalV2APIKeys({ stage })
  if (!keys.includes(apiKey)) {
    return false
  }
  return true
}

export const isAPIKeyHasPermission = ({
  stage,
  apiKey,
  routePath,
}: {
  stage: string | undefined
  apiKey: string | undefined
  routePath: string | undefined
}) => {
  if (!apiKey || !stage || !routePath) {
    return false
  }

  const APIKeyPermissionList = getExternalV2APIEnabledAPIsByAPIKey({
    stage,
    apiKey,
  })
  const mappedAPIName = EXTERNAL_API_ROUTE_PATH_MAPPING?.[routePath]
  const pathMatchedAPIName =
    (Object.entries(EXTERNAL_API_PATH_MAP).find(
      ([, apiPath]) => !!urlMatch(apiPath)(routePath),
    )?.[0] as EXTERNAL_API | undefined) ?? undefined
  const apiName = mappedAPIName ?? pathMatchedAPIName
  const hasAccess = APIKeyPermissionList.includes(apiName)
  if (!hasAccess) {
    return false
  }
  return true
}
