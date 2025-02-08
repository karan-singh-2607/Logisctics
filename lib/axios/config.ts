import axios from 'axios'
import { secureStorage } from '../storage/secure-storage'
import { STORAGE_KEYS } from '../storage/storage-keys'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://stgapi.splitmeals.com/api'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from secure storage
    const token = secureStorage.get<string>(STORAGE_KEYS.AUTH.TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Clear auth data on unauthorized
          secureStorage.remove(STORAGE_KEYS.AUTH.TOKEN)
          secureStorage.remove(STORAGE_KEYS.AUTH.USER)
          break
        // Handle other cases...
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

