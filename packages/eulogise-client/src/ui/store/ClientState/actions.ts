import { ClientActionTypes, IClientHandleRouteResponse } from '@eulogise/core'

type FetchClientByHandlePayload = {
  handle: string
  onSuccess: (client: IClientHandleRouteResponse) => void
  onFailed: () => void
}

export type FetchClientByHandleAction = {
  type: ClientActionTypes.FETCH_CLIENT_BY_HANDLE
  payload: FetchClientByHandlePayload
}

export const fetchClientByHandle = (
  payload: FetchClientByHandlePayload,
): FetchClientByHandleAction => ({
  type: ClientActionTypes.FETCH_CLIENT_BY_HANDLE,
  payload,
})

export const fetchClients = () => ({
  type: ClientActionTypes.FETCH_CLIENT,
})

type CheckClientHandleAvailabilityPayload = {
  handle: string
  success: (exists: boolean) => void
}

export type CheckClientHandleAvailabilityAction = {
  type: ClientActionTypes.FETCH_CLIENT_HANDLE_AVAILABILITY
  payload: CheckClientHandleAvailabilityPayload
}

export const checkClientHandleAvailability = (
  payload: CheckClientHandleAvailabilityPayload,
): CheckClientHandleAvailabilityAction => ({
  type: ClientActionTypes.FETCH_CLIENT_HANDLE_AVAILABILITY,
  payload,
})

type DeleteClientPayload = {
  clientId: string
  success: () => void
  failed: () => void
}

export type DeleteClientAction = {
  type: ClientActionTypes.DELETE_CLIENT
  payload: DeleteClientPayload
}

export const deleteClient = (
  payload: DeleteClientPayload,
): DeleteClientAction => ({
  type: ClientActionTypes.DELETE_CLIENT,
  payload,
})
