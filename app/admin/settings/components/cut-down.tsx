import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CutDown() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Cut-Down Percentage</label>
        <Input type="number" placeholder="Enter percentage" />
      </div>
      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">Apply Cut-Down</Button>
    </div>
  )
}

