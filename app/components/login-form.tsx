'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <div className="space-y-4 p-6 bg-card rounded-lg border">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Login</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input id="login-password" type="password" placeholder="Enter your password" />
        </div>
        <Button className="w-full">
          Login
        </Button>
      </div>
    </div>
  )
}

