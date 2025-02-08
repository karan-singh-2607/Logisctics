import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ChangePassword() {
  return (
    <div className="space-y-6">
      <Input type="password" placeholder="Current Password" />
      <Input type="password" placeholder="New Password" />
      <Input type="password" placeholder="Confirm New Password" />
      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">Change Password</Button>
    </div>
  )
}

