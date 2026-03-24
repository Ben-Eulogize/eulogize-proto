import { Item } from 'dynamoose/dist/Item'
import {
  ICardProductContent,
  ICardProductData,
  MemorialVisualStatus,
} from './CardProduct.types'
import {
  GenericCardProductTypeFoldType,
  GenericCardProductTypeOutputFormat,
  IGenericCardProductTypeDimension,
} from './GenericCardProductType.types'
import { ResourceFileStatus } from './Resource.types'

/**
 * GenericCardProduct types for individual product instances
 * Each instance references a GenericCardProductType template and stores snapshot metadata
 */

// ============================================================================
// Metadata Snapshot
// ============================================================================

/**
 * Metadata snapshot captured when product is created
 * Preserves product configuration even if GenericCardProductType template changes
 */
export interface IGenericCardProductMetadata {
  // Reference to template (by slug for stability)
  slug: string
  name: string

  // Snapshot of configuration at creation time
  dimensions: IGenericCardProductTypeDimension[]
  selectedDimension?: IGenericCardProductTypeDimension // User's chosen dimension
  foldType: GenericCardProductTypeFoldType
  outputFormat: GenericCardProductTypeOutputFormat

  // Generation config snapshot
  averageTimeMinutes?: number
  minPages?: number
  maxPages?: number
  defaultPages?: number
  bleedMm?: number
}

// ============================================================================
// Content Structure
// ============================================================================

export interface IGenericCardProductContent extends ICardProductContent {
  metadata: IGenericCardProductMetadata
}

// ============================================================================
// Core Data Model
// ============================================================================

export interface IGenericCardProductData extends ICardProductData {
  productType: 'GENERIC_CARD_PRODUCT'
  //  slug: string // References GenericCardProductType.slug
  content: IGenericCardProductContent
  fileUrl?: string
  thumbnailUrl?: string
  generateUserId?: string
}

// ============================================================================
// Database Model Types
// ============================================================================

export namespace IGenericCardProductModel {
  export type Schema = IGenericCardProductData

  export type Model = Item & Schema
}

// ============================================================================
// Request/Response Types
// ============================================================================

export interface IGenericCardProductCreateRequest {
  caseId: string
  genericCardProductTypeSlug: string
  selectedDimensionName?: string // Optional: which dimension to use
  theme?: string
}

export interface IGenericCardProductUpdateRequest {
  content?: Partial<IGenericCardProductContent>
  status?: MemorialVisualStatus
  fileStatus?: ResourceFileStatus
}

export interface IGenericCardProductResponse {
  genericCardProduct: IGenericCardProductData
}

export interface IGenericCardProductListResponse {
  genericCardProducts: IGenericCardProductData[]
  total: number
}

// ============================================================================
// Redux Action Types
// ============================================================================

export enum GenericCardProductActionTypes {
  // Fetch by case
  FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID = 'FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID',
  FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID_SUCCESS = 'FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID_SUCCESS',
  FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID_FAILED = 'FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID_FAILED',

  // Fetch single
  FETCH_GENERIC_CARD_PRODUCT_BY_ID = 'FETCH_GENERIC_CARD_PRODUCT_BY_ID',
  FETCH_GENERIC_CARD_PRODUCT_BY_ID_SUCCESS = 'FETCH_GENERIC_CARD_PRODUCT_BY_ID_SUCCESS',
  FETCH_GENERIC_CARD_PRODUCT_BY_ID_FAILED = 'FETCH_GENERIC_CARD_PRODUCT_BY_ID_FAILED',

  // Create
  CREATE_GENERIC_CARD_PRODUCT = 'CREATE_GENERIC_CARD_PRODUCT',
  CREATE_GENERIC_CARD_PRODUCT_SUCCESS = 'CREATE_GENERIC_CARD_PRODUCT_SUCCESS',
  CREATE_GENERIC_CARD_PRODUCT_FAILED = 'CREATE_GENERIC_CARD_PRODUCT_FAILED',

  // Update
  UPDATE_GENERIC_CARD_PRODUCT = 'UPDATE_GENERIC_CARD_PRODUCT',
  UPDATE_GENERIC_CARD_PRODUCT_SUCCESS = 'UPDATE_GENERIC_CARD_PRODUCT_SUCCESS',
  UPDATE_GENERIC_CARD_PRODUCT_FAILED = 'UPDATE_GENERIC_CARD_PRODUCT_FAILED',

  // Delete
  DELETE_GENERIC_CARD_PRODUCT = 'DELETE_GENERIC_CARD_PRODUCT',
  DELETE_GENERIC_CARD_PRODUCT_SUCCESS = 'DELETE_GENERIC_CARD_PRODUCT_SUCCESS',
  DELETE_GENERIC_CARD_PRODUCT_FAILED = 'DELETE_GENERIC_CARD_PRODUCT_FAILED',

  // UI state
  SET_ACTIVE_GENERIC_CARD_PRODUCT = 'SET_ACTIVE_GENERIC_CARD_PRODUCT',
  CLEAR_GENERIC_CARD_PRODUCT_STATE = 'CLEAR_GENERIC_CARD_PRODUCT_STATE',
}

export interface IGenericCardProductAction {
  type: GenericCardProductActionTypes
  payload?: {
    genericCardProducts?: IGenericCardProductData[]
    genericCardProduct?: IGenericCardProductData
    genericCardProductId?: string
    caseId?: string
    createData?: IGenericCardProductCreateRequest
    updateData?: IGenericCardProductUpdateRequest
    error?: string
    total?: number
  }
}

// ============================================================================
// Redux State
// ============================================================================

export interface IGenericCardProductState {
  items: IGenericCardProductData[]
  activeItem?: IGenericCardProductData
  isFetching: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null
}
