import SecureLS from 'secure-ls'
import { isBrowser } from '../utils/is-browser'
import { ENCRYPTION_CONFIG } from '../constants/encryption'

class SecureStorage {
  private ls: SecureLS | null = null
  private readonly prefix: string = ENCRYPTION_CONFIG.PREFIX

  constructor() {
    if (isBrowser()) {
      this.ls = new SecureLS({
        encodingType: ENCRYPTION_CONFIG.ENCODING_TYPE,
        isCompression: ENCRYPTION_CONFIG.ENABLE_COMPRESSION,
        encryptionSecret: ENCRYPTION_CONFIG.SECRET_KEY
      })
    }
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  set<T>(key: string, value: T): void {
    try {
      if (!this.ls) {
        if (isBrowser()) {
          console.error('SecureStorage: Failed to initialize secure storage')
        }
        return
      }
      this.ls.set(this.getKey(key), value)
    } catch (error) {
      console.error('SecureStorage: Error setting item', error)
      // Optionally, you could emit an event or call an error tracking service here
    }
  }

  get<T>(key: string): T | null {
    try {
      if (!this.ls) {
        if (isBrowser()) {
          console.error('SecureStorage: Failed to initialize secure storage')
        }
        return null
      }
      return this.ls.get(this.getKey(key))
    } catch (error) {
      console.error('SecureStorage: Error getting item', error)
      return null
    }
  }

  remove(key: string): void {
    try {
      if (!this.ls) {
        if (isBrowser()) {
          console.error('SecureStorage: Failed to initialize secure storage')
        }
        return
      }
      this.ls.remove(this.getKey(key))
    } catch (error) {
      console.error('SecureStorage: Error removing item', error)
    }
  }

  clear(): void {
    try {
      if (!this.ls) {
        if (isBrowser()) {
          console.error('SecureStorage: Failed to initialize secure storage')
        }
        return
      }
      this.ls.clear()
    } catch (error) {
      console.error('SecureStorage: Error clearing storage', error)
    }
  }

  // Helper method to check if secure storage is available
  isAvailable(): boolean {
    return this.ls !== null && isBrowser()
  }
}

// Export a singleton instance
export const secureStorage = new SecureStorage()

