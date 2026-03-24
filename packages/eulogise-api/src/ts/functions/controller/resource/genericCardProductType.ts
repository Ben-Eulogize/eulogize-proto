import { Lambdur } from 'lambdur'
import * as Errors from '../../error'
import { Webtoken } from '../../../webtoken'
import { genericCardProductTypeModel } from '../../../database'
import { IGenericCardProductTypeModel } from '../../../database/types/GenericCardProductType.types'
import {
  EulogiseUserRole,
  IGenericCardProductTypeCreateRequest,
  IGenericCardProductTypeUpdateRequest,
} from '@eulogise/core'

/**
 * GenericCardProductType Resource Controller
 * Admin-only CRUD operations for managing generic card product types
 */
export class GenericCardProductTypeResourceController {
  /**
   * List all generic card product types with optional filtering
   */
  public static async list(
    accountObj: Webtoken.Payload.Account,
  ): Promise<Array<IGenericCardProductTypeModel.Model>> {
    const allTypes = await genericCardProductTypeModel.getAll()

    // Admin users see all product types
    if (accountObj.role === EulogiseUserRole.ADMIN) {
      return allTypes
    }

    // Client users (funeral homes): filter by funeralHomes availability
    if (accountObj.role === EulogiseUserRole.CLIENT) {
      return allTypes.filter(
        (type) => type.availability?.funeralHomes?.available !== false,
      )
    }

    // Direct users: filter by directUsers availability
    return allTypes.filter(
      (type) => type.availability?.directUsers?.available !== false,
    )
  }

  /**
   * Get a single generic card product type by ID
   */
  public static async getById(
    accountObj: Webtoken.Payload.Account,
    id: string,
  ): Promise<IGenericCardProductTypeModel.Model> {
    // Only admins can view generic card product types
    if (accountObj.role !== EulogiseUserRole.ADMIN) {
      throw new Lambdur.Error(
        Errors.resource.find.notAllowed('genericCardProductType'),
      )
    }

    console.log('GenericCardProductTypeResourceController.getById', id)

    const genericCardProductType = await genericCardProductTypeModel.findById(
      id,
    )

    if (!genericCardProductType) {
      throw new Lambdur.Error({
        statusCode: 404,
        id: 'GENERIC_CARD_PRODUCT_TYPE_NOT_FOUND',
        message: `GenericCardProductType with ID ${id} not found`,
      })
    }

    return genericCardProductType
  }

  /**
   * Get a single generic card product type by slug
   */
  public static async getBySlug(
    accountObj: Webtoken.Payload.Account,
    slug: string,
  ): Promise<IGenericCardProductTypeModel.Model | undefined> {
    // Only admins can view generic card product types
    if (accountObj.role !== EulogiseUserRole.ADMIN) {
      throw new Lambdur.Error(
        Errors.resource.find.notAllowed('genericCardProductType'),
      )
    }

    console.log('GenericCardProductTypeResourceController.getBySlug', slug)

    return genericCardProductTypeModel.findBySlug(slug)
  }

  /**
   * Create a new generic card product type
   */
  public static async create(
    accountObj: Webtoken.Payload.Account,
    data: IGenericCardProductTypeCreateRequest,
  ): Promise<IGenericCardProductTypeModel.Model> {
    // Only admins can create generic card product types
    if (accountObj.role !== EulogiseUserRole.ADMIN) {
      throw new Lambdur.Error(
        Errors.resource.save.notAllowed('genericCardProductType'),
      )
    }

    console.log('GenericCardProductTypeResourceController.create', data)

    try {
      // Add createdBy field from account
      const createData = {
        ...data,
        createdBy: accountObj.ref,
      }

      const genericCardProductType = await genericCardProductTypeModel.create(
        createData,
      )

      console.log(
        'GenericCardProductType created successfully',
        genericCardProductType.id,
      )

      return genericCardProductType
    } catch (error: any) {
      console.error('Error creating GenericCardProductType:', error)

      // Handle specific validation errors
      if (error.message?.includes('Slug')) {
        throw new Lambdur.Error({
          statusCode: 400,
          id: 'DUPLICATE_SLUG',
          message: error.message,
        })
      }

      if (error.message?.includes('dimensions')) {
        throw new Lambdur.Error({
          statusCode: 400,
          id: 'INVALID_DIMENSIONS',
          message: error.message,
        })
      }

      if (error.message?.includes('Primary format')) {
        throw new Lambdur.Error({
          statusCode: 400,
          id: 'INVALID_PRIMARY_FORMAT',
          message: error.message,
        })
      }

      throw new Lambdur.Error({
        statusCode: 500,
        id: 'CREATE_FAILED',
        message: `Failed to create GenericCardProductType: ${error.message}`,
      })
    }
  }

  /**
   * Update an existing generic card product type
   */
  public static async update(
    accountObj: Webtoken.Payload.Account,
    id: string,
    data: IGenericCardProductTypeUpdateRequest,
  ): Promise<IGenericCardProductTypeModel.Model> {
    // Only admins can update generic card product types
    if (accountObj.role !== EulogiseUserRole.ADMIN) {
      throw new Lambdur.Error(
        Errors.resource.save.notAllowed('genericCardProductType'),
      )
    }

    console.log('GenericCardProductTypeResourceController.update', id, data)

    try {
      const genericCardProductType = await genericCardProductTypeModel.update(
        id,
        data,
      )

      console.log(
        'GenericCardProductType updated successfully',
        genericCardProductType.id,
      )

      return genericCardProductType
    } catch (error: any) {
      console.error('Error updating GenericCardProductType:', error)

      // Handle specific validation errors
      if (error.message?.includes('Slug')) {
        throw new Lambdur.Error({
          statusCode: 400,
          id: 'DUPLICATE_SLUG',
          message: error.message,
        })
      }

      if (error.message?.includes('dimensions')) {
        throw new Lambdur.Error({
          statusCode: 400,
          id: 'INVALID_DIMENSIONS',
          message: error.message,
        })
      }

      if (error.message?.includes('Primary format')) {
        throw new Lambdur.Error({
          statusCode: 400,
          id: 'INVALID_PRIMARY_FORMAT',
          message: error.message,
        })
      }

      if (error.message?.includes('not found')) {
        throw new Lambdur.Error({
          statusCode: 404,
          id: 'GENERIC_CARD_PRODUCT_TYPE_NOT_FOUND',
          message: error.message,
        })
      }

      throw new Lambdur.Error({
        statusCode: 500,
        id: 'UPDATE_FAILED',
        message: `Failed to update GenericCardProductType: ${error.message}`,
      })
    }
  }

  /**
   * Delete a generic card product type by ID
   */
  public static async delete(
    accountObj: Webtoken.Payload.Account,
    id: string,
  ): Promise<void> {
    // Only admins can delete generic card product types
    if (accountObj.role !== EulogiseUserRole.ADMIN) {
      throw new Lambdur.Error(
        Errors.resource.save.notAllowed('genericCardProductType'),
      )
    }

    console.log('GenericCardProductTypeResourceController.delete', id)

    const genericCardProductType = await genericCardProductTypeModel.findById(
      id,
    )

    if (!genericCardProductType) {
      throw new Lambdur.Error({
        statusCode: 404,
        id: 'GENERIC_CARD_PRODUCT_TYPE_NOT_FOUND',
        message: `GenericCardProductType with ID ${id} not found`,
      })
    }

    await genericCardProductTypeModel.deleteById(id)

    console.log('GenericCardProductType deleted successfully', id)
  }

  /**
   * Duplicate a generic card product type with a new name
   */
  public static async duplicate(
    accountObj: Webtoken.Payload.Account,
    id: string,
    newName: string,
  ): Promise<IGenericCardProductTypeModel.Model> {
    // Only admins can duplicate generic card product types
    if (accountObj.role !== EulogiseUserRole.ADMIN) {
      throw new Lambdur.Error(
        Errors.resource.save.notAllowed('genericCardProductType'),
      )
    }

    console.log(
      'GenericCardProductTypeResourceController.duplicate',
      id,
      newName,
    )

    try {
      const genericCardProductType =
        await genericCardProductTypeModel.duplicate(id, newName)

      console.log(
        'GenericCardProductType duplicated successfully',
        genericCardProductType.id,
      )

      return genericCardProductType
    } catch (error: any) {
      console.error('Error duplicating GenericCardProductType:', error)

      if (error.message?.includes('not found')) {
        throw new Lambdur.Error({
          statusCode: 404,
          id: 'GENERIC_CARD_PRODUCT_TYPE_NOT_FOUND',
          message: error.message,
        })
      }

      if (error.message?.includes('Slug')) {
        throw new Lambdur.Error({
          statusCode: 400,
          id: 'DUPLICATE_SLUG',
          message: error.message,
        })
      }

      throw new Lambdur.Error({
        statusCode: 500,
        id: 'DUPLICATE_FAILED',
        message: `Failed to duplicate GenericCardProductType: ${error.message}`,
      })
    }
  }

  /**
   * Reindex Redis cache for all generic card product types
   */
  public static async reindexCache(
    accountObj: Webtoken.Payload.Account,
  ): Promise<void> {
    // Only admins can reindex cache
    if (accountObj.role !== EulogiseUserRole.ADMIN) {
      throw new Lambdur.Error(
        Errors.resource.save.notAllowed('genericCardProductType'),
      )
    }

    console.log('GenericCardProductTypeResourceController.reindexCache')

    await genericCardProductTypeModel.reindexRedisRecords()

    console.log('GenericCardProductType cache reindexed successfully')
  }
}
