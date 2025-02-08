import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userService } from "../../axios/services/user.service"
import { secureStorage } from "../../storage/secure-storage"
import { STORAGE_KEYS } from "../../storage/storage-keys"
import { AUTH_CONSTANTS, type AuthStatus } from "../../constants/auth"
import type { User, LoginRequest, AuthState } from "../../axios/types"

const initialState: AuthState & { status: AuthStatus; error: string | null } = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: AUTH_CONSTANTS.STATUS.IDLE,
  error: null,
}

export const loginAsync = createAsyncThunk(AUTH_CONSTANTS.ACTIONS.LOGIN, async (credentials: LoginRequest) => {
  const response = await userService.login(credentials)
  if (!response.status || !response.token || !response.user) {
    throw new Error(response.message || AUTH_CONSTANTS.MESSAGES.LOGIN_FAILED)
  }
  return response
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      secureStorage.remove(STORAGE_KEYS.AUTH.TOKEN)
      secureStorage.remove(STORAGE_KEYS.AUTH.USER)
      return { ...initialState }
    },
    initializeAuth: (state) => {
      const token = secureStorage.get<string>(STORAGE_KEYS.AUTH.TOKEN)
      const user = secureStorage.get<User>(STORAGE_KEYS.AUTH.USER)

      if (token && user) {
        state.token = token
        state.user = user
        state.isAuthenticated = true
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = AUTH_CONSTANTS.STATUS.LOADING
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { token, user } = action.payload
        state.status = AUTH_CONSTANTS.STATUS.SUCCEEDED
        state.token = token || null
        state.user = user || null
        state.isAuthenticated = true
        state.error = null

        // Store in secure storage
        secureStorage.set(STORAGE_KEYS.AUTH.TOKEN, token)
        secureStorage.set(STORAGE_KEYS.AUTH.USER, user)
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = AUTH_CONSTANTS.STATUS.FAILED
        state.error = action.error.message || AUTH_CONSTANTS.MESSAGES.LOGIN_FAILED
      })
  },
})

export const { logout, initializeAuth } = authSlice.actions
export const authReducer = authSlice.reducer

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectAuthStatus = (state: { auth: AuthState & { status: AuthStatus } }) => state.auth.status
export const selectAuthError = (state: { auth: AuthState & { error: string | null } }) => state.auth.error

