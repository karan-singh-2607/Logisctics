'use client'

import { useState, useEffect, useCallback } from 'react'
import { secureStorage } from '../storage/secure-storage'
import { isBrowser } from '../utils/is-browser'

interface UseSecureStorageOptions<T> {
  errorCallback?: (error: Error) => void
  defaultValue: T
  sync?: boolean // Whether to sync across tabs
}

export function useSecureStorage<T>(
  key: string,
  options: UseSecureStorageOptions<T>
): [T, (value: T) => void, boolean] {
  const { errorCallback, defaultValue, sync = false } = options

  // Initialize state with a function to avoid unnecessary computation
  const [state, setState] = useState<T>(() => {
    if (!isBrowser()) {
      return defaultValue
    }

    try {
      const stored = secureStorage.get<T>(key)
      return stored !== null ? stored : defaultValue
    } catch (error) {
      if (errorCallback) {
        errorCallback(error as Error)
      }
      return defaultValue
    }
  })

  // Track if storage is available
  const [isAvailable, setIsAvailable] = useState(() => 
    secureStorage.isAvailable()
  )

  // Update storage when state changes
  const persistValue = useCallback((newValue: T) => {
    try {
      if (secureStorage.isAvailable()) {
        secureStorage.set(key, newValue)
      }
    } catch (error) {
      if (errorCallback) {
        errorCallback(error as Error)
      }
    }
  }, [key, errorCallback])

  // Handle storage events for cross-tab sync
  useEffect(() => {
    if (!sync || !isBrowser()) return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          const newValue = secureStorage.get<T>(key)
          if (newValue !== null) {
            setState(newValue)
          }
        } catch (error) {
          if (errorCallback) {
            errorCallback(error as Error)
          }
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, sync, errorCallback])

  // Check storage availability on mount
  useEffect(() => {
    setIsAvailable(secureStorage.isAvailable())
  }, [])

  // Wrapper for setState that also persists
  const setValue = useCallback((value: T) => {
    setState(value)
    persistValue(value)
  }, [persistValue])

  return [state, setValue, isAvailable]
}

