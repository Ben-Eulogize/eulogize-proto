/**
 * GenericCardProductType type definitions for dynamic product configuration
 * Enables admin users to create custom product types with configurable dimensions and formats
 */

// ============================================================================
// Enums
// ============================================================================

export enum GenericCardProductTypePageMode {
  NORMAL = 'NORMAL', // Multi-page product (e.g., Booklet)
  TWO_PAGES = 'TWO_PAGES', // Two-sided product (e.g., Bookmark, Sided Card)
  SINGLE_PAGE = 'SINGLE_PAGE', // Single page product (e.g., Thank You Card)
}

export enum GenericCardProductTypeOutputFormat {
  PDF = 'PDF',
  JPEG = 'JPEG',
}

export enum GenericCardProductTypeFoldType {
  SINGLE_SIDE = 'SINGLE_SIDE', // Flat/no fold
  DOUBLE_SIDED = 'DOUBLE_SIDED', // Front & back (no fold crease)
  BIFOLD = 'BIFOLD', // 2 panels
  TRIFOLD = 'TRIFOLD', // 3 panels
}

// ============================================================================
// Core Interfaces
// ============================================================================

export interface IGenericCardProductTypeDimension {
  name: string // e.g., "A4", "Letter", "Custom"
  width: number // in pixels
  height: number // in pixels
  pageMarginsX: number // in pixels
  pageMarginsY: number // in pixels
  overlayMarginX: number // percentage (used for both border and overlay positioning)
  overlayMarginY: number // percentage (used for both border and overlay positioning)
  heroImage?: string // Filename of the hero/preview image stored in S3 /productTypes
}

export interface IGenericCardProductTypeAvailability {
  directUsers: { available: boolean; default: boolean }
  funeralHomes: { available: boolean; default: boolean }
}

export interface IGenericCardProductTypeGenerationConfig {
  averageTimeMinutes?: number
  minPages?: number
  maxPages?: number
  bleedMm?: number
}

export interface IGenericCardProductTypeData {
  id: string
  name: string
  slug: string

  // Physical properties
  dimensions: IGenericCardProductTypeDimension[]
  foldType: GenericCardProductTypeFoldType

  // Output configuration
  outputFormat: GenericCardProductTypeOutputFormat
  minPages?: number
  maxPages?: number
  defaultPages: number

  // Generation settings
  generationConfig?: IGenericCardProductTypeGenerationConfig

  // Availability
  availability?: IGenericCardProductTypeAvailability

  // Status & metadata
  isLegacy?: boolean // Marks products migrated from hardcoded types
  legacyProductType?: string // Reference to EulogiseProduct enum value

  // Admin fields
  createdBy?: string
  notes?: string
  productImage?: string // Filename of the product image stored in S3 /productTypes

  // Timestamps
  createdAt: string
  updatedAt: string
}

// Request/Response types
export interface IGenericCardProductTypeCreateRequest {
  name: string
  slug?: string // Auto-generated if not provided
  dimensions: IGenericCardProductTypeDimension[]
  foldType: GenericCardProductTypeFoldType
  outputFormat: GenericCardProductTypeOutputFormat
  generationConfig?: IGenericCardProductTypeGenerationConfig
  availability?: IGenericCardProductTypeAvailability
  notes?: string
}

export interface IGenericCardProductTypeUpdateRequest
  extends Partial<IGenericCardProductTypeCreateRequest> {}

export interface IGenericCardProductTypeListResponse {
  genericCardProductTypes: IGenericCardProductTypeData[]
  total: number
}

export interface IGenericCardProductTypeResponse {
  genericCardProductType: IGenericCardProductTypeData
}

export interface IGenericCardProductTypeState {
  items: IGenericCardProductTypeData[]
  activeItem: IGenericCardProductTypeData | null
  filters: IGenericCardProductTypeFilters
  isFetching: boolean
  isFetched: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null
}

// ============================================================================
// Redux Action Types
// ============================================================================

export enum GenericCardProductTypeActionTypes {
  // Fetch list
  FETCH_GENERIC_CARD_PRODUCT_TYPES = 'FETCH_GENERIC_CARD_PRODUCT_TYPES',
  FETCH_GENERIC_CARD_PRODUCT_TYPES_SUCCESS = 'FETCH_GENERIC_CARD_PRODUCT_TYPES_SUCCESS',
  FETCH_GENERIC_CARD_PRODUCT_TYPES_FAILED = 'FETCH_GENERIC_CARD_PRODUCT_TYPES_FAILED',

  // Fetch single
  FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID = 'FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID',
  FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID_SUCCESS = 'FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID_SUCCESS',
  FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID_FAILED = 'FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID_FAILED',

  // Create
  CREATE_GENERIC_CARD_PRODUCT_TYPE = 'CREATE_GENERIC_CARD_PRODUCT_TYPE',
  CREATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS = 'CREATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS',
  CREATE_GENERIC_CARD_PRODUCT_TYPE_FAILED = 'CREATE_GENERIC_CARD_PRODUCT_TYPE_FAILED',

  // Update
  UPDATE_GENERIC_CARD_PRODUCT_TYPE = 'UPDATE_GENERIC_CARD_PRODUCT_TYPE',
  UPDATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS = 'UPDATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS',
  UPDATE_GENERIC_CARD_PRODUCT_TYPE_FAILED = 'UPDATE_GENERIC_CARD_PRODUCT_TYPE_FAILED',

  // Duplicate
  DUPLICATE_GENERIC_CARD_PRODUCT_TYPE = 'DUPLICATE_GENERIC_CARD_PRODUCT_TYPE',
  DUPLICATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS = 'DUPLICATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS',
  DUPLICATE_GENERIC_CARD_PRODUCT_TYPE_FAILED = 'DUPLICATE_GENERIC_CARD_PRODUCT_TYPE_FAILED',

  // Delete
  DELETE_GENERIC_CARD_PRODUCT_TYPE = 'DELETE_GENERIC_CARD_PRODUCT_TYPE',
  DELETE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS = 'DELETE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS',
  DELETE_GENERIC_CARD_PRODUCT_TYPE_FAILED = 'DELETE_GENERIC_CARD_PRODUCT_TYPE_FAILED',

  // UI state
  SET_ACTIVE_GENERIC_CARD_PRODUCT_TYPE = 'SET_ACTIVE_GENERIC_CARD_PRODUCT_TYPE',
  CLEAR_GENERIC_CARD_PRODUCT_TYPE_STATE = 'CLEAR_GENERIC_CARD_PRODUCT_TYPE_STATE',
  SET_GENERIC_CARD_PRODUCT_TYPE_FILTERS = 'SET_GENERIC_CARD_PRODUCT_TYPE_FILTERS',
}

export interface IGenericCardProductTypeFilters {
  searchQuery?: string
}

export interface IGenericCardProductTypeAction {
  type: GenericCardProductTypeActionTypes
  payload?: {
    genericCardProductTypes?: IGenericCardProductTypeData[]
    genericCardProductType?: IGenericCardProductTypeData
    genericCardProductTypeId?: string
    createData?: IGenericCardProductTypeCreateRequest
    updateData?: IGenericCardProductTypeUpdateRequest
    filters?: IGenericCardProductTypeFilters
    error?: string
    total?: number
  }
}

// ============================================================================
// Helper Types
// ============================================================================

export interface IGenericCardProductTypeFormValues {
  name: string
  dimensions: Array<{
    name: string
    width: number
    height: number
    pageMarginsX: number
    pageMarginsY: number
    overlayMarginX: number
    overlayMarginY: number
    heroImage?: string
  }>
  foldType: GenericCardProductTypeFoldType
  outputFormat: GenericCardProductTypeOutputFormat
  pageMarginsX?: number // Page margin X (horizontal) — fallback default
  pageMarginsY?: number // Page margin Y (vertical) — fallback default
  averageTimeMinutes?: number
  minPages?: number
  maxPages?: number
  bleedMm?: number
  availability?: IGenericCardProductTypeAvailability
  notes?: string
  productImage?: string // Filename of the product image stored in S3 /productTypes
}

export interface IGenericCardProductTypeTableData
  extends IGenericCardProductTypeData {
  key: string // For Ant Design Table
  dimensionsDisplay: string // Formatted string like "210x297mm (Portrait)"
  formatsDisplay: string // Formatted string like "PDF, JPEG"
}
