"use client"

import { useEffect } from "react"
import { Provider } from "react-redux"
import type React from "react" // Added import for React
import { store } from "@/lib/redux/store"
import { initializeAuth } from "@/lib/redux/slice/auth-slice"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initializeAuth())
  }, [])

  return <Provider store={store}>{children}</Provider>
}

