import dynamoose from 'dynamoose'
import { Item } from 'dynamoose/dist/Item'
import { Model } from 'dynamoose/dist/Model'
import { CONFIG } from '../../config/Config'
import { EulogiseResourceName } from '@eulogise/core'
import BPPromise from 'bluebird'
import { RedisClient } from '../../utils/RedisClient'

type GetAllOptions = {
  cache?: boolean
}

export abstract class BaseModel<T extends { id?: string } & Item, S> {
  private readonly model: Model<T>
  private readonly redisClient: RedisClient
  protected readonly modelName: EulogiseResourceName

  protected constructor(modelName: EulogiseResourceName, schema: S | any) {
    console.log('BaseModel modelName', modelName)
    this.modelName = modelName
    const modelConfig = {
      // @ts-ignore
      throughput: CONFIG.DYNAMODB.THROUGHPUT,
      create: CONFIG.DYNAMODB.CREATE_TABLE_ON_START,
      waitForActive: {
        enabled: false,
      },
    }
    console.log('BaseModel config', modelName, modelConfig)
    this.model = dynamoose.model<T>(modelName, schema as any, {
      // @ts-ignore
      throughput: CONFIG.DYNAMODB.THROUGHPUT,
      create: CONFIG.DYNAMODB.CREATE_TABLE_ON_START,
      waitForActive: {
        enabled: false,
      },
    })
    console.log('CONFIG.REDIS_HOST', CONFIG.REDIS_HOST)
    this.redisClient = RedisClient.getInstance()
  }

  public getModel(): Model<T> {
    return this.model
  }

  public async findById(id: string): Promise<T> {
    return this.model.get(id)
  }

  public async updateById(id: string, data: Partial<S>): Promise<T> {
    console.log('updateById', id, data)
    return await this.model.update({ id }, data as S, { return: 'item' })
  }

  public async batchGetByIds(ids: Array<string>): Promise<Array<T>> {
    console.log('batchGetByIds', ids)
    const records = await this.model.batchGet(ids)
    console.log('batchGetByIds records.length', records.length)
    return records
  }

  public async upsertById(id: string, data: Partial<S>): Promise<T> {
    console.log('upsertById', id, data)
    const record = await this.findById(id)
    if (record) {
      console.log('record found: update record', record)
      // @ts-ignore
      const { id: recordId, ...recordData } = data
      const updatedRecord = await this.updateById(
        id,
        recordData as unknown as S,
      )
      console.log('updatedRecord', updatedRecord)
      return updatedRecord
    }
    return this.model.create(data as S)
  }

  public async isExists(query: any): Promise<boolean> {
    const { count } = await this.model.scan(query).count().exec()
    return count > 0
  }

  // @deprecated use deleteById instead
  public async remove(search: any): Promise<boolean> {
    const removeQuery = {
      ...search,
    }
    console.log(`Removing ${this.modelName}`, search)

    let removeResult: any

    try {
      if (!search.id) {
        throw new Error(
          `Failed to remove ${this.modelName} as the id of removedItem is missing!`,
        )
      }
      removeResult = await this.getModel().delete(removeQuery)
    } catch (error) {
      throw error
    }

    return removeResult
  }

  public async deleteById(id: string): Promise<void> {
    console.log(`Deleting ${this.modelName} by id`, id)
    await this.getModel().delete(id)
  }

  public async removeMultiple(search: any): Promise<boolean> {
    const removeIds = search?.ids
    console.log(`Removing ${this.modelName}`, search)

    let removeResults: any

    try {
      if (!removeIds) {
        throw new Error(
          `Failed to remove ${this.modelName} as the ids of removedItem is missing!`,
        )
      }
      removeResults = await BPPromise.map(
        search.ids,
        async (id: string) => await this.getModel().delete(id),
        {
          concurrency: 10,
        },
      )
    } catch (error) {
      throw error
    }

    return removeResults
  }

  private getAllRecordRedisKey(): string {
    return `${this.modelName}-allRecords`
  }

  public async reindexRedisRecords(): Promise<void> {
    console.log('reindexRedisRecords')
    const BATCH_SIZE = 500
    const allRecords: T[] = []
    let lastKey: any = undefined

    do {
      const scan = this.getModel().scan().limit(BATCH_SIZE)
      if (lastKey) {
        scan.startAt(lastKey)
      }
      const batch = await scan.exec()
      allRecords.push(...batch)
      lastKey = batch.lastKey
      console.log(
        `reindexRedisRecords: fetched batch of ${
          batch.length
        } ${this.getModelName()} records, total: ${allRecords.length}`,
      )
    } while (lastKey)

    console.log(
      `reindexRedisRecords: indexing ${
        allRecords.length
      } ${this.getModelName()} records`,
    )
    await this.updateAllRedisRecords(allRecords)
    console.log(
      'reindexRedisRecords: updated all redis indexes for',
      this.getModelName(),
    )
  }

  public async createRedisIndexRecord(record: T): Promise<void> {
    console.log('createRedisIndexRecord', record)
    const existingRecords = await this.getAll({ cache: true })
    await this.updateAllRedisRecords([...existingRecords, record])
    console.log(
      `createRedisIndexRecord completed ${record.id} for ${this.modelName}`,
    )
  }

  public async updateRedisIndexRecordById(
    id: string,
    record: T,
  ): Promise<void> {
    console.log('updateRedisIndexRecordById', id)
    if (!record || !record.id) {
      console.warn(
        `updateRedisIndexRecordById ${id} record is missing or invalid`,
      )
      return
    }
    if (!record) {
      console.warn(`updateRedisIndexRecordById ${id} not found for reindexing`)
      return
    }
    console.log(`updateRedisIndexRecordById ${id} for ${this.modelName}`)
    const existingRecords = await this.getAll({ cache: true })
    const updatedRecords = existingRecords.map((r) =>
      r.id === id ? record : r,
    )
    await this.updateAllRedisRecords(updatedRecords)
    console.log(
      `updateRedisIndexRecordById completed ${id} for ${this.modelName}`,
    )
  }

  private async updateAllRedisRecords(
    records: Array<T | S>,
  ): Promise<Array<T | S>> {
    console.log('updateAllRedisRecords')
    const redisRecordKey = this.getAllRecordRedisKey()
    console.log('records.length', records.length)

    await this.redisClient.set(redisRecordKey, JSON.stringify(records)) //
    return records
  }

  // option - cache - if true, it will check redis cache first
  public async getAll(options?: GetAllOptions): Promise<Array<T>> {
    const { cache } = options || {
      cache: false,
    }
    if (cache) {
      const redisRecordKey = this.getAllRecordRedisKey()
      if (this.redisClient.isRedisConnected()) {
        // Check Redis cache first
        console.log('getAll modelName', this.modelName, redisRecordKey)
        const cachedData = await this.redisClient.get(redisRecordKey)
        console.log('getAll cachedData', this.modelName)
        if (cachedData) {
          console.log(`✅ Cache hit from Redis!`, this.modelName)
          // console.log('results', cachedData)
          return JSON.parse(cachedData)
        }
        console.log('Cache miss - getAll modelName', this.modelName)
      }
    }
    const records = await this.getModel().scan().all().exec()
    // this update cache is created just in case if we don't have any redis cache available for fetching
    if (cache) {
      await this.updateAllRedisRecords(records)
    }

    return records
  }

  public getModelName(): EulogiseResourceName {
    return this.modelName
  }

  public async getAllWithAttributes(
    attributes: Array<string>,
  ): Promise<Array<Partial<T>>> {
    console.log('getAllWithAttributes modelName', this.modelName)
    const results = this.getModel().scan().attributes(attributes).all().exec()
    console.log('completed: getAllWithAttributes modelName', this.modelName)
    return results
  }

  public async getAllIndexesById(
    attributes: Array<string>,
  ): Promise<{ [key: string]: T }> {
    console.log('getAllIndexesById modelName', this.modelName)
    const records = await this.getAllWithAttributes(attributes)
    const results = records.reduce(
      (acc, curr) => ({
        ...acc,
        // @ts-ignore
        [curr.id]: curr,
      }),
      {} as any,
    )
    console.log('completed: getAllIndexesById modelName', this.modelName)
    return results
  }
}
