import { secureStorage } from '../storage/secure-storage'
import { CACHE_CONFIG } from '../constants/cache'
import { isBrowser } from '../utils/is-browser'

interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
  version: string
}

interface PendingRequest {
  promise: Promise<any>
  timestamp: number
}

class CacheManager {
  private memoryCache: Map<string, CacheItem<any>>
  private pendingRequests: Map<string, PendingRequest>

  constructor() {
    this.memoryCache = new Map()
    this.pendingRequests = new Map()
    
    // Clean up expired items periodically
    if (isBrowser()) {
      setInterval(() => this.cleanup(), 1000 * 60) // Every minute
    }
  }

  private getStorageKey(key: string): string {
    return `${CACHE_CONFIG.PREFIX}${key}`
  }

  private isExpired(item: CacheItem<any>): boolean {
    return Date.now() > item.timestamp + item.ttl || 
           item.version !== CACHE_CONFIG.VERSION
  }

  async get<T>(key: string): Promise<T | null> {
    // Check memory cache first
    const memoryItem = this.memoryCache.get(key)
    if (memoryItem && !this.isExpired(memoryItem)) {
      return memoryItem.data
    }

    // Then check storage
    if (isBrowser()) {
      try {
        const storageItem = secureStorage.get<CacheItem<T>>(this.getStorageKey(key))
        if (storageItem && !this.isExpired(storageItem)) {
          // Update memory cache
          this.memoryCache.set(key, storageItem)
          return storageItem.data
        }
      } catch (error) {
        console.warn('Cache storage read error:', error)
      }
    }

    return null
  }

  async set<T>(key: string, data: T, ttl: number): Promise<void> {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      version: CACHE_CONFIG.VERSION
    }

    // Update memory cache
    this.memoryCache.set(key, item)

    // Update storage
    if (isBrowser()) {
      try {
        secureStorage.set(this.getStorageKey(key), item)
      } catch (error) {
        console.warn('Cache storage write error:', error)
      }
    }

    // Cleanup if we've exceeded max items
    if (this.memoryCache.size > CACHE_CONFIG.MAX_ITEMS) {
      const oldestKey = Array.from(this.memoryCache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0]
      this.memoryCache.delete(oldestKey)
    }
  }

  async delete(key: string): Promise<void> {
    this.memoryCache.delete(key)
    if (isBrowser()) {
      try {
        secureStorage.remove(this.getStorageKey(key))
      } catch (error) {
        console.warn('Cache storage delete error:', error)
      }
    }
  }

  async clear(): Promise<void> {
    this.memoryCache.clear()
    if (isBrowser()) {
      try {
        // Clear only our cache items
        const allKeys = Object.keys(localStorage)
        allKeys
          .filter(key => key.startsWith(CACHE_CONFIG.PREFIX))
          .forEach(key => secureStorage.remove(key))
      } catch (error) {
        console.warn('Cache storage clear error:', error)
      }
    }
  }

  private cleanup(): void {
    // Cleanup memory cache
    for (const [key, item] of this.memoryCache.entries()) {
      if (this.isExpired(item)) {
        this.memoryCache.delete(key)
      }
    }

    // Cleanup pending requests
    const now = Date.now()
    for (const [key, request] of this.pendingRequests.entries()) {
      if (now - request.timestamp > 30000) { // 30 seconds timeout
        this.pendingRequests.delete(key)
      }
    }
  }

  // Request deduplication
  async dedupRequest<T>(
    key: string,
    request: () => Promise<T>,
    ttl: number
  ): Promise<T> {
    // Check if we have a cached response
    const cachedData = await this.get<T>(key)
    if (cachedData !== null) {
      return cachedData
    }

    // Check if we have a pending request
    const pending = this.pendingRequests.get(key)
    if (pending) {
      return pending.promise as Promise<T>
    }

    // Create new request
    const promise = request().then(async (data) => {
      await this.set(key, data, ttl)
      this.pendingRequests.delete(key)
      return data
    }).catch((error) => {
      this.pendingRequests.delete(key)
      throw error
    })

    this.pendingRequests.set(key, {
      promise,
      timestamp: Date.now()
    })

    return promise
  }
}

export const cacheManager = new CacheManager()

