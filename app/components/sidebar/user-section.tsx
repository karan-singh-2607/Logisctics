"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { EnterIcon, LockClosedIcon, PersonIcon } from "@radix-ui/react-icons"
import { RegistrationForm } from "../registration/registration-form"
import { useToast } from "@/components/ui/use-toast"
import { useSecureStorage } from "@/lib/hooks/useSecureStorage"
import { STORAGE_KEYS } from "@/lib/storage/storage-keys"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { loginAsync, logout, selectAuthError, selectAuthStatus, selectUser } from "@/lib/redux/slice/auth-slice"
import { AUTH_CONSTANTS } from "@/lib/constants/auth"
import { toast } from "@/hooks/use-toast"

export function UserSection() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectUser)
  const status = useAppSelector(selectAuthStatus)
  const error = useAppSelector(selectAuthError)

  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [saveMe, setSaveMe] = useState(false)

  const [rememberMe, setRememberMe] = useSecureStorage<boolean>(STORAGE_KEYS.AUTH.REMEMBER_ME, {
    defaultValue: false,
    sync: true,
    errorCallback: (error) => {
      console.error("Storage error:", error)
    },
  })

  const isLoading = status === AUTH_CONSTANTS.STATUS.LOADING

  const validateForm = () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: AUTH_CONSTANTS.MESSAGES.VALIDATION.EMAIL_REQUIRED,
      })
      return false
    }

    if (!password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: AUTH_CONSTANTS.MESSAGES.VALIDATION.PASSWORD_REQUIRED,
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: AUTH_CONSTANTS.MESSAGES.VALIDATION.INVALID_EMAIL,
      })
      return false
    }

    return true
  }

  const handleSignIn = async () => {
    if (!validateForm()) return

    try {
      const resultAction = await dispatch(loginAsync({ email, password }))

      if (loginAsync.fulfilled.match(resultAction)) {
        if (saveMe) {
          setRememberMe(true)
        }

        toast({
          title: "Success",
          description: AUTH_CONSTANTS.MESSAGES.LOGIN_SUCCESS,
        })

        setPassword("")
      } else if (loginAsync.rejected.match(resultAction) && error) {
        console.log('error',error)
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error,
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: AUTH_CONSTANTS.MESSAGES.LOGIN_FAILED,
      })
    }
  }

  const handleChangeUser = () => {
    dispatch(logout())
    setEmail("")
    setPassword("")
    setSaveMe(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        {currentUser ? (
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
              {currentUser.image ? (
                <img
                  src={currentUser.image || "/placeholder.svg"}
                  alt={currentUser.full_name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div>
              <h2 className="text-white font-medium">{currentUser.full_name}</h2>
              <button className="text-gray-400 text-sm hover:text-gray-300" onClick={handleChangeUser}>
                Change User
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <Input
              icon={<User className="h-5 w-5" color="#fff" />}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
              disabled={isLoading}
            />
          </div>
        )}
      </div>
      {!currentUser && (
        <div className="space-y-4">
          <div className="relative">
            <Input
              icon={<LockClosedIcon className="h-5 w-5" color="#fff" />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              isPassword
              className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="save-me"
                checked={saveMe}
                onCheckedChange={(checked) => setSaveMe(checked as boolean)}
                className="border-gray-600 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                disabled={isLoading}
              />
              <label htmlFor="save-me" className="text-sm text-gray-400 cursor-pointer select-none">
                Save me
              </label>
            </div>
            <button className="text-sm text-secondary hover:text-secondary/80">Forgot?</button>
          </div>
          <Button
            className="w-full bg-secondary hover:bg-secondary/90 text-white flex-row-reverse"
            icon={<EnterIcon />}
            size="lg"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          <Button
            icon={<PersonIcon />}
            variant="outline"
            size="lg"
            className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            onClick={() => setIsSignUpOpen(true)}
            disabled={isLoading}
          >
            Register now
          </Button>
        </div>
      )}

      <RegistrationForm open={isSignUpOpen} onOpenChange={setIsSignUpOpen} />
    </div>
  )
}

