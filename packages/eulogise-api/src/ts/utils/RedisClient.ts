import Redis from 'ioredis'
import { CONFIG } from '../config/Config'
import { EulogiseProduct } from '@eulogise/core'

export class RedisClient {
  private client: any
  private static instance: RedisClient

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient()
    }
    return RedisClient.instance
  }

  public constructor() {
    console.log('CONFIG.REDIS_HOST', CONFIG.REDIS_HOST)
    this.client = CONFIG.REDIS_HOST
      ? new Redis.Cluster(
          [
            {
              host: CONFIG.REDIS_HOST,
              port: 6379,
            },
          ],
          {
            dnsLookup: (address, callback) => callback(null, address),
            redisOptions: {
              tls: {},
            },
          },
        )
      : undefined
    if (!this.client) {
      return
    }
    this.client.on('error', (err: Error) =>
      console.error('Redis Client Error', err),
    )
    if (!this.isRedisConnected()) {
      console.log('RedisClient: connecting to Redis...')
      this.client.connect()
    } else {
      console.log('RedisClient: already connected to Redis')
    }
  }

  public isRedisConnected(): boolean {
    if (!this.client) {
      return false
    }
    console.log('this.client.status', this.client.status)
    return (
      this.client.status === 'connecting' ||
      this.client.status === 'ready' ||
      this.client.status === 'connect'
    )
  }

  /**
   * Ensures Redis connection is ready before proceeding.
   * If in 'reconnecting' state, destroys and recreates the connection.
   * Retries up to maxRetries times with a delay between attempts.
   */
  public async ensureConnected(
    maxRetries: number = 3,
    retryDelayMs: number = 1000,
  ): Promise<boolean> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const status = this.client?.status
      console.log(
        `ensureConnected attempt ${attempt}/${maxRetries}, status: ${status}`,
      )

      // If in reconnecting state, destroy and recreate connection
      if (status === 'reconnecting') {
        console.warn(
          'Redis client is in reconnecting state, destroying and recreating connection',
        )
        this.recreateConnection()
        // Wait for the new connection to establish
        await this.sleep(retryDelayMs)
        continue
      }

      // Check if connected
      if (this.isRedisConnected()) {
        console.log('Redis connection is ready')
        return true
      }

      // Wait before next retry
      if (attempt < maxRetries) {
        console.log(`Waiting ${retryDelayMs}ms before retry...`)
        await this.sleep(retryDelayMs)
      }
    }

    console.error(
      `Failed to establish Redis connection after ${maxRetries} attempts`,
    )
    return false
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private recreateConnection(): void {
    try {
      if (this.client) {
        this.client.disconnect()
        this.client = null
      }
    } catch (error) {
      console.error('Error destroying Redis connection:', error)
    }

    if (CONFIG.REDIS_HOST) {
      console.log('Recreating Redis connection...')
      this.client = new Redis.Cluster(
        [
          {
            host: CONFIG.REDIS_HOST,
            port: 6379,
          },
        ],
        {
          dnsLookup: (address, callback) => callback(null, address),
          redisOptions: {
            tls: {},
          },
        },
      )
      this.client.on('error', (err: Error) =>
        console.error('Redis Client Error', err),
      )
    }
  }

  public async set(key: string, value: string): Promise<void> {
    if (!this.isRedisConnected()) {
      console.warn('Redis client is not connected, cannot set value')
      return
    }
    try {
      await this.client.set(key, value, 'EX', 60 * 60 * 24 * 30) // expire in 30 days
    } catch (error) {
      console.error('Error setting value in Redis:', error)
    }
  }

  public async get(key: string): Promise<string | undefined> {
    if (!this.isRedisConnected()) {
      console.warn('Redis client is not connected, cannot get value')
      return ''
    }
    try {
      const value = await this.client.get(key)
      return value
    } catch (error) {
      console.error('Error getting value from Redis:', error)
      return undefined
    }
  }

  public static getProductFileStatusRedisKey({
    productId,
    product,
    fileStatusKey,
    slug,
  }: {
    productId: string
    product: EulogiseProduct
    fileStatusKey: string
    slug?: string
  }): string {
    if (slug) {
      return `${productId}:${product.toUpperCase()}-${slug}:${fileStatusKey}`
    }
    return `${productId}:${product.toUpperCase()}:${fileStatusKey}`
  }

  public async del(key: string): Promise<void> {
    await this.client.del(key)
  }
}
