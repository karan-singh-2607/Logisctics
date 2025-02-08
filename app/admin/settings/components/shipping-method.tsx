import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ShippingMethod() {
  return (
    <div className="space-y-6">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select shipping method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="air">Air Freight</SelectItem>
          <SelectItem value="sea">Sea Freight</SelectItem>
          <SelectItem value="express">Express Delivery</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

