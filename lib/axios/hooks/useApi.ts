'use client'

import { useState, useEffect } from 'react'
import { cacheManager } from '../../cache/cache-manager'
import { CACHE_CONFIG } from '../../constants/cache'

interface UseApiOptions {
  cacheKey?: string
  cacheTTL?: keyof typeof CACHE_CONFIG.TTL
  enabled?: boolean
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { cacheKey, cacheTTL = 'MEDIUM', enabled = true } = options

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        let result: T
        
        if (cacheKey) {
          result = await cacheManager.dedupRequest(
            cacheKey,
            apiCall,
            CACHE_CONFIG.TTL[cacheTTL]
          )
        } else {
          result = await apiCall()
        }
        
        setData(result)
        setError(null)
      } catch (err) {
        setError(err as Error)
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [apiCall, cacheKey, cacheTTL, enabled])

  return { data, error, isLoading }
}

