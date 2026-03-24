import { ShareActionTypes, IShare } from '@eulogise/core'

type UpsertSharePayload = {
  caseId: string
  share: Omit<IShare, 'id' | 'createdBy' | 'case'>
  success?: (share: IShare) => void
  error?: (error: string) => void
}

export type UpsertShareAction = {
  type: ShareActionTypes.UPSERT_SHARE
  payload: UpsertSharePayload
}

export const upsertShare = (
  payload: UpsertSharePayload,
): UpsertShareAction => ({
  type: ShareActionTypes.UPSERT_SHARE,
  payload,
})

type FetchSharesByCaseIdPayload = {
  caseId: string
  success?: (shares: Array<IShare>) => void
  error?: (error: string) => void
  complete?: () => void
}

export type FetchSharesByCaseIdAction = {
  type: ShareActionTypes.FETCH_SHARES_BY_CASE_ID
  payload: FetchSharesByCaseIdPayload
}

export const fetchSharesByCaseId = (
  payload: FetchSharesByCaseIdPayload,
): FetchSharesByCaseIdAction => ({
  type: ShareActionTypes.FETCH_SHARES_BY_CASE_ID,
  payload,
})
