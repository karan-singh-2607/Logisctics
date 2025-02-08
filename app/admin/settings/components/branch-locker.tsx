import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function BranchLocker() {
  return (
    <div className="space-y-6">
      <RadioGroup defaultValue="branch">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="branch" id="branch" />
          <Label htmlFor="branch">Branch Pickup</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="locker" id="locker" />
          <Label htmlFor="locker">Locker Pickup</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

