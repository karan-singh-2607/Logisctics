export const CACHE_CONFIG = {
  // Default TTL values in milliseconds
  TTL: {
    SHORT: 1000 * 60 * 5, // 5 minutes
    MEDIUM: 1000 * 60 * 30, // 30 minutes
    LONG: 1000 * 60 * 60 * 24, // 24 hours
  },
  // Maximum number of items to store in memory
  MAX_ITEMS: 100,
  // Storage keys prefix
  PREFIX: 'usa2georgia_cache_',
  // Cache version - bump this when cache structure changes
  VERSION: 'v1',
} as const

export type CacheTTL = keyof typeof CACHE_CONFIG.TTL

