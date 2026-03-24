import dynamoose from 'dynamoose'
import * as uuid from 'uuid'
import { BaseModel } from './BaseModel'
import {
  GenericCardProductTypeOutputFormat,
  GenericCardProductTypeFoldType,
  IGenericCardProductTypeDimension,
} from '@eulogise/core'
import { IGenericCardProductTypeModel } from '../types/GenericCardProductType.types'

const UPDATABLE_FIELDS = [
  'name',
  'slug',
  'category',
  'dimensions',
  'foldType',
  'outputFormat',
  'minPages',
  'maxPages',
  'defaultPages',
  'generationConfig',
  'isLegacy',
  'legacyProductType',
  'createdBy',
  'notes',
  'productImage',
  'availability',
]

class GenericCardProductTypeModel extends BaseModel<
  IGenericCardProductTypeModel.Model,
  IGenericCardProductTypeModel.Schema
> {
  constructor() {
    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
          validate: (v: string) => v.length === 36,
          hashKey: true,
        },
        name: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          required: true,
          index: {
            type: 'global',
            name: 'slug-index',
          },
        },
        dimensions: {
          type: Array,
          schema: [
            {
              type: Object,
              schema: {
                name: {
                  type: String,
                  required: true,
                },
                width: {
                  type: Number,
                  required: true,
                },
                height: {
                  type: Number,
                  required: true,
                },
                pageMarginsX: {
                  type: Number,
                  required: true,
                },
                pageMarginsY: {
                  type: Number,
                  required: true,
                },
                overlayMarginX: {
                  type: Number,
                  required: true,
                },
                overlayMarginY: {
                  type: Number,
                  required: true,
                },
                heroImage: {
                  type: String,
                  required: false,
                },
              },
            },
          ],
          required: true,
          validate: (v: any[]) => Array.isArray(v) && v.length >= 1,
        },
        foldType: {
          type: String,
          enum: [
            GenericCardProductTypeFoldType.SINGLE_SIDE,
            GenericCardProductTypeFoldType.DOUBLE_SIDED,
            GenericCardProductTypeFoldType.BIFOLD,
            GenericCardProductTypeFoldType.TRIFOLD,
          ],
          required: true,
          default: GenericCardProductTypeFoldType.SINGLE_SIDE,
        },
        outputFormat: {
          type: String,
          enum: [
            GenericCardProductTypeOutputFormat.PDF,
            GenericCardProductTypeOutputFormat.JPEG,
          ],
          required: true,
        },
        pageMarginsX: Number,
        pageMarginsY: Number,
        minPages: Number,
        maxPages: Number,
        defaultPages: {
          type: Number,
          required: true,
        },
        isLegacy: {
          type: Boolean,
          default: false,
        },
        legacyProductType: {
          type: String,
          required: false,
        },
        createdBy: {
          type: String,
          required: false,
        },
        notes: {
          type: String,
          required: false,
        },
        productImage: {
          type: String,
          required: false,
        },
        availability: {
          type: Object,
          required: false,
          schema: {
            directUsers: {
              type: Object,
              schema: {
                available: { type: Boolean, default: false },
                default: { type: Boolean, default: false },
              },
            },
            funeralHomes: {
              type: Object,
              schema: {
                available: { type: Boolean, default: false },
                default: { type: Boolean, default: false },
              },
            },
          },
        },
      },
      {
        timestamps: true,
        saveUnknown: [],
      },
    )

    super('genericCardProductType', schema)
  }

  /**
   * Find GenericCardProductType by slug
   */
  public async findBySlug(
    slug: string,
  ): Promise<IGenericCardProductTypeModel.Model | undefined> {
    const results = await this.getModel().query({ slug }).exec()
    return results?.[0]
  }

  /**
   * Migrate legacy single dimension to array format
   * Converts { width: 210, height: 297 } → [{ name: "Default", width: 210, height: 297 }]
   */
  private migrateLegacyDimensions(
    dimensions: any,
  ): IGenericCardProductTypeDimension[] {
    // Already array format
    if (Array.isArray(dimensions)) {
      return dimensions
    }

    // Legacy single object format
    if (
      dimensions &&
      typeof dimensions === 'object' &&
      dimensions.width &&
      dimensions.height
    ) {
      console.log('Migrating legacy dimensions format to array', dimensions)
      return [
        {
          name: 'Default',
          width: dimensions.width,
          height: dimensions.height,
        },
      ]
    }

    throw new Error('Invalid dimensions format')
  }

  /**
   * Validate dimensions are within acceptable ranges
   */
  public validateDimensions(
    dimensions: IGenericCardProductTypeDimension[],
  ): boolean {
    const MIN_DIMENSION = 10 // 10mm minimum
    const MAX_DIMENSION = 10000 // 1000mm maximum

    if (!Array.isArray(dimensions) || dimensions.length < 1) {
      throw new Error('At least one dimension is required')
    }

    // Check for duplicate names (case-insensitive)
    const names = dimensions.map((d) => d.name.toLowerCase().trim())
    const uniqueNames = new Set(names)
    if (names.length !== uniqueNames.size) {
      throw new Error('Dimension names must be unique')
    }

    // Validate each dimension
    dimensions.forEach((dim, index) => {
      if (!dim.name || dim.name.trim().length === 0) {
        throw new Error(`Dimension ${index + 1}: Name is required`)
      }

      if (dim.width < MIN_DIMENSION || dim.width > MAX_DIMENSION) {
        throw new Error(
          `Dimension "${dim.name}": Width must be between ${MIN_DIMENSION}mm and ${MAX_DIMENSION}mm`,
        )
      }

      if (dim.height < MIN_DIMENSION || dim.height > MAX_DIMENSION) {
        throw new Error(
          `Dimension "${dim.name}": Height must be between ${MIN_DIMENSION}mm and ${MAX_DIMENSION}mm`,
        )
      }
    })

    return true
  }

  /**
   * Check if slug is unique (excluding current ID if updating)
   */
  public async checkSlugUniqueness(
    slug: string,
    excludeId?: string,
  ): Promise<boolean> {
    const existing = await this.findBySlug(slug)

    if (!existing) {
      return true // Slug is unique
    }

    if (excludeId && existing.id === excludeId) {
      return true // Same record, allowed
    }

    return false // Slug already exists
  }

  /**
   * Generate slug from name if not provided
   */
  public generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove duplicate hyphens
  }

  /**
   * Create new GenericCardProductType with validation
   */
  public async create(
    data: Omit<
      IGenericCardProductTypeModel.Schema,
      'id' | 'createdAt' | 'updatedAt' | 'slug'
    > &
      Partial<Pick<IGenericCardProductTypeModel.Schema, 'slug'>>,
  ): Promise<IGenericCardProductTypeModel.Model> {
    // Migrate dimensions if needed
    const migratedDimensions = this.migrateLegacyDimensions(data.dimensions)

    // Validate dimensions
    this.validateDimensions(migratedDimensions)

    // Generate slug if not provided
    const slug = data.slug || this.generateSlug(data.name)

    // Check slug uniqueness
    const isSlugUnique = await this.checkSlugUniqueness(slug)
    if (!isSlugUnique) {
      throw new Error(`Slug "${slug}" already exists`)
    }

    const createData: IGenericCardProductTypeModel.Schema = {
      id: uuid.v4(),
      ...data,
      dimensions: migratedDimensions,
      slug,
      isLegacy: data.isLegacy ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await this.getModel().create(createData)

    // Update Redis cache
    await this.createRedisIndexRecord(result)

    return result
  }

  /**
   * Update GenericCardProductType with validation
   */
  public async update(
    id: string,
    data: Partial<
      Omit<IGenericCardProductTypeModel.Schema, 'id' | 'createdAt'>
    >,
  ): Promise<IGenericCardProductTypeModel.Model> {
    // Validate dimensions if provided
    if (data.dimensions) {
      // Migrate dimensions if needed
      const migratedDimensions = this.migrateLegacyDimensions(data.dimensions)
      this.validateDimensions(migratedDimensions)
      data.dimensions = migratedDimensions
    }

    // Check slug uniqueness if slug is being updated
    if (data.slug) {
      const isSlugUnique = await this.checkSlugUniqueness(data.slug, id)
      if (!isSlugUnique) {
        throw new Error(`Slug "${data.slug}" already exists`)
      }
    }

    const updateData = UPDATABLE_FIELDS.reduce((acc, field) => {
      if (data.hasOwnProperty(field)) {
        acc[field] = (data as any)[field]
      }
      return acc
    }, {} as any)

    const result = await this.updateById(id, updateData)

    // Update Redis cache
    await this.updateRedisIndexRecordById(id, result)

    return result
  }

  /**
   * Duplicate a GenericCardProductType with a new name
   */
  public async duplicate(
    id: string,
    newName: string,
  ): Promise<IGenericCardProductTypeModel.Model> {
    // Find the original record
    const original = await this.findById(id)
    if (!original) {
      throw new Error(`GenericCardProductType with id "${id}" not found`)
    }

    // Generate a unique slug for the new record
    let newSlug = this.generateSlug(newName)
    let slugSuffix = 0

    while (!(await this.checkSlugUniqueness(newSlug))) {
      slugSuffix++
      newSlug = `${this.generateSlug(newName)}-${slugSuffix}`
    }

    // Create duplicate with new name and slug
    const duplicateData = {
      name: newName,
      slug: newSlug,
      category: original.category,
      dimensions: original.dimensions,
      foldType: original.foldType,
      outputFormat: original.outputFormat,
      pageMarginsX: original.pageMarginsX,
      pageMarginsY: original.pageMarginsY,
      minPages: original.minPages,
      maxPages: original.maxPages,
      generationConfig: original.generationConfig,
      isLegacy: false, // Duplicated records are not legacy
      legacyProductType: original.legacyProductType,
      notes: original.notes,
      productImage: original.productImage,
      availability: original.availability,
    }

    return this.create(duplicateData)
  }
}

export const genericCardProductTypeModel = new GenericCardProductTypeModel()
