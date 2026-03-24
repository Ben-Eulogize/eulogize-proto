import { IUserModel } from '../database/types/UserModel.types'

export const filterUser = (user: IUserModel.Schema) => {
  const {
    id,
    fullName,
    email,
    phone,
    firstStreetAddress,
    secondStreetAddress,
    city,
    state,
    postcode,
  } = user
  return {
    id,
    fullName,
    email,
    phone,
    firstStreetAddress,
    secondStreetAddress,
    city,
    state,
    postcode,
  }
}
