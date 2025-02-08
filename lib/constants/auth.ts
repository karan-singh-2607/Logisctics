export const AUTH_CONSTANTS = {
    STORAGE_PREFIX: "usa2georgia_",
    ACTIONS: {
      LOGIN: "auth/login",
      LOGOUT: "auth/logout",
      SET_USER: "auth/setUser",
      SET_TOKEN: "auth/setToken",
    },
    STATUS: {
      IDLE: "idle",
      LOADING: "loading",
      SUCCEEDED: "succeeded",
      FAILED: "failed",
    },
    MESSAGES: {
      LOGIN_SUCCESS: "Login successful",
      LOGIN_FAILED: "Login failed",
      INVALID_CREDENTIALS: "Invalid login credentials",
      VALIDATION: {
        EMAIL_REQUIRED: "Please enter your email address",
        PASSWORD_REQUIRED: "Please enter your password",
        INVALID_EMAIL: "Please enter a valid email address",
      },
    },
  } as const
  
  export type AuthStatus = (typeof AUTH_CONSTANTS.STATUS)[keyof typeof AUTH_CONSTANTS.STATUS]
  
  