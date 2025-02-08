'use client'

import { useState, useEffect } from "react"
import { User, Mail } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { EnterIcon, LockClosedIcon, PersonIcon } from "@radix-ui/react-icons"
import { RegistrationForm } from "../registration/registration-form"
import { useSecureStorage } from "@/lib/hooks/useSecureStorage"
import { STORAGE_KEYS } from "@/lib/storage/storage-keys"

interface UserData {
  email: string
  name: string
}

export function UserSection() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [showEmailInput, setShowEmailInput] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [saveMe, setSaveMe] = useState(false)

  const [currentUser, setCurrentUser, isStorageAvailable] = useSecureStorage<UserData | null>(
    STORAGE_KEYS.AUTH.USER,
    {
      defaultValue: null,
      sync: true, // Enable cross-tab sync
      errorCallback: (error) => {
        console.error('Storage error:', error)
        // You could show a toast notification here
      }
    }
  )
  const [rememberMe, setRememberMe] = useSecureStorage<boolean>(
    STORAGE_KEYS.AUTH.REMEMBER_ME,
    {
      defaultValue: false,
      sync: true,
      errorCallback: (error) => {
        console.error('Storage error:', error)
      }
    }
  )

  useEffect(() => {
    if (currentUser && rememberMe && isStorageAvailable) {
      setShowEmailInput(false)
    }
  }, [currentUser, rememberMe, isStorageAvailable])

  const handleSignIn = () => {
    if (email && password) {
      const userData: UserData = {
        email,
        name: email.split("@")[0],
      }
      
      if (isStorageAvailable) {
        setCurrentUser(userData)
        setRememberMe(saveMe)
      }
      
      setShowEmailInput(false)
      setPassword("")
    }
  }

  const handleChangeUser = () => {
    setShowEmailInput(true)
    if (isStorageAvailable) {
      setCurrentUser(null)
      setRememberMe(false)
    }
    setEmail("")
    setPassword("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        {showEmailInput ? (
          <div className="flex-1">
            <Input
              icon={<User className="h-5 w-5" color="#fff"/>}
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <h2 className="text-white font-medium">{currentUser?.name}</h2>
              <button
                className="text-gray-400 text-sm hover:text-gray-300"
                onClick={handleChangeUser}
              >
                Change User
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Input
            icon={<LockClosedIcon className="h-5 w-5" color="#fff" />}
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            isPassword
            className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="save-me" 
              checked={saveMe}
              onCheckedChange={(checked) => setSaveMe(checked as boolean)}
              className="border-gray-600 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
            <label 
              htmlFor="save-me" 
              className="text-sm text-gray-400 cursor-pointer select-none"
            >
              Save me
            </label>
          </div>
          <button className="text-sm text-secondary hover:text-secondary/80">
            Forgot?
          </button>
        </div>
        <Button
          className="w-full bg-secondary hover:bg-secondary/90 text-white flex-row-reverse"
          icon={<EnterIcon />}
          size="lg"
          onClick={handleSignIn}
        >
          Sign in
        </Button>
        <Button
          icon={<PersonIcon />}
          variant="outline"
          size="lg"
          className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          onClick={() => setIsSignUpOpen(true)}
        >
          Register now
        </Button>
      </div>

      <RegistrationForm
        open={isSignUpOpen}
        onOpenChange={setIsSignUpOpen}
      />
    </div>
  )
}

