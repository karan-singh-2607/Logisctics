import { CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Payments() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CreditCard className="h-6 w-6 text-gray-600" />
          <div>
            <div className="font-medium">Visa ending in 1234</div>
            <div className="text-sm text-gray-500">Expires 12/2024</div>
          </div>
        </div>
        <Button variant="outline" size="sm">Remove</Button>
      </div>
      <Button className="w-full">Add New Payment Method</Button>
    </div>
  )
}

